#!/usr/bin/env python3
"""Machine-translate every original post into every site locale.

Reads src/generated/content.json (run `npm run content` first), writes
content/posts/<lang>/<yyyy>/<slug>.md with `translated_from: <lang>/<slug>`.
Same slug in every language, so /hi/posts/<slug> mirrors /posts/<slug>.
Existing files are kept (re-runs only fill gaps). A post the model will not
translate keeps no page in that language (no-fallback rule), it is never cut.

  KIMI_API_KEY=... python3 plugins/translate.py [--only slug,slug] [--langs hi,ar] [--workers 32]

Model: Kimi (api.kimi.com/coding, OpenAI-compatible). Fallback: Gemini if
GOOGLE_API_KEY is set. Chunks are cached in $TRANSLATE_CACHE (default
~/.cache/emin-de-translate) so an interrupted run resumes.
"""
import argparse, hashlib, json, os, re, sys, time, threading, urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

LANGS = {
    'en': 'English', 'de': 'German', 'zh': 'Simplified Chinese (Mandarin)', 'hi': 'Hindi', 'es': 'Spanish',
    'ar': 'Modern Standard Arabic', 'fr': 'French', 'bn': 'Bengali', 'pt': 'Portuguese', 'id': 'Indonesian', 'ur': 'Urdu',
}
CACHE = Path(os.environ.get('TRANSLATE_CACHE', Path.home() / '.cache/emin-de-translate'))
MAX_WORDS = 1400
RULES = (
    "Rules: Translate everything a reader sees, including headings and image alt text. Keep the Markdown exactly: "
    "the same '## ' headings in the same order, the same paragraphs, lists, tables and quotes. Keep URLs, image paths, "
    "HTML tags and attributes, code blocks and inline code unchanged. Keep names of people, companies, products and "
    "technical terms (Bitcoin, Nuri, passkey, MuSig2, x402, L402, Lightning) as they are. Keep the author's voice: "
    "first person, plain words, short sentences, informal tone; swear words stay swear words. This is a free-speech "
    "publication: never censor, soften, summarize, skip or comment, whatever the topic. Never use the em dash "
    "character; use a comma or a full stop instead. Output only the translation, no preface, no code fence around it."
)


def env_key(name):
    if os.environ.get(name):
        return os.environ[name]
    env = Path.home() / '.hermes/.env'
    if env.exists():
        for line in env.read_text(errors='ignore').splitlines():
            m = re.match(rf'^{name}=(.*)$', line.strip())
            if m:
                return m.group(1).strip().strip('"\'')
    return None


KIMI = env_key('KIMI_API_KEY')
GOOGLE = env_key('GOOGLE_API_KEY')
stats = {'calls': 0, 'fallback': 0, 'fail': 0}
lock = threading.Lock()


def post_json(url, body, headers, timeout=600):
    req = urllib.request.Request(url, data=json.dumps(body).encode(), headers={'content-type': 'application/json', **headers})
    return json.load(urllib.request.urlopen(req, timeout=timeout))


def kimi(system, user):
    d = post_json('https://api.kimi.com/coding/v1/chat/completions',
                  {'model': 'k3', 'messages': [{'role': 'system', 'content': system}, {'role': 'user', 'content': user}],
                   'max_tokens': 24000, 'thinking': {'type': 'disabled'}},
                  {'authorization': f'Bearer {KIMI}', 'user-agent': 'claude-code/1.0'})
    return d['choices'][0]['message'].get('content') or ''


GEMINI_MODELS = ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-3-flash-preview', 'gemini-3.1-flash-lite', 'gemini-flash-lite-latest']
dead = set()  # lanes that hit a hard quota this run


def gemini(system, user, model):
    d = post_json(f'https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent',
                  {'systemInstruction': {'parts': [{'text': system}]}, 'contents': [{'parts': [{'text': user}]}],
                   'generationConfig': {'thinkingConfig': {'thinkingBudget': 0}}}, {'x-goog-api-key': GOOGLE})
    return ''.join(p.get('text', '') for p in d['candidates'][0]['content']['parts'])


def clean(text):
    text = text.strip()
    text = re.sub(r'^```(?:markdown|md|json)?\n(.*)\n```$', r'\1', text, flags=re.S)
    return text.replace(' \u2014 ', ', ').replace('\u2014', ', ')


def complete(system, user, check):
    """Translate with Kimi, retry, then Gemini. check(out) -> error string or None."""
    key = hashlib.sha256((system + '\0' + user).encode()).hexdigest()
    cached = CACHE / key[:2] / key
    if cached.exists():
        return cached.read_text()
    errors = []
    lanes = [('kimi', None)] + ([('gemini', m) for m in GEMINI_MODELS] if GOOGLE else [])
    for attempt in range(4):
      for name, model in lanes:
        lane_id = f'{name}:{model}'
        if lane_id in dead:
            continue
        try:
            out = clean(kimi(system, user) if name == 'kimi' else gemini(system, user, model))
            problem = check(out)
            if problem:
                raise ValueError(problem)
            cached.parent.mkdir(parents=True, exist_ok=True)
            cached.write_text(out)
            with lock:
                stats['calls'] += 1
                stats['fallback'] += name != 'kimi'
            return out
        except Exception as e:  # rate limit, refusal, broken structure: next lane
            code = getattr(e, 'code', '')
            body = e.read().decode()[:200] if hasattr(e, 'read') else str(e)[:160]
            if code == 403 and 'usage limit' in body or code == 429 and 'quota' in body and 'per day' in body.lower():
                dead.add(lane_id)
            errors.append(f'{lane_id}: {code} {body[:100]}')
      time.sleep(20 * (attempt + 1))
    raise RuntimeError(' | '.join(errors[-3:]))


def h2s(md):
    return [l for l in md.split('\n') if l.startswith('## ')]


def body_check(src):
    n = len(h2s(src))
    def check(out):
        if len(out) < 0.3 * len(src):
            return f'too short ({len(out)} vs {len(src)} chars), likely refused'
        if len(h2s(out)) != n:
            return f'heading count {len(h2s(out))} != {n}'
        return None
    return check


def pieces(sections):
    """Split long sections at blank lines (outside code fences) into pieces of
    at most MAX_WORDS. Yields (heading|None, text, is_continuation)."""
    for h, b in sections:
        paras, buf, fence = [], [], False
        for block in b.split('\n\n'):
            buf.append(block)
            if block.count('```') % 2:
                fence = not fence
            if not fence:
                paras.append('\n\n'.join(buf))
                buf = []
        if buf:
            paras.append('\n\n'.join(buf))
        part, words, first = [], 0, True
        for p in paras:
            if part and words + len(p.split()) > MAX_WORDS:
                yield (h if first else None, '\n\n'.join(part), not first)
                part, words, first = [], 0, False
            part.append(p)
            words += len(p.split())
        yield (h if first else None, '\n\n'.join(part), not first)


def translate_body(sections, src, tgt):
    """sections: [(heading|None, body)] -> same list translated, chunked by words."""
    chunks, cur, words = [], [], 0
    for item in pieces(sections):
        w = len(item[1].split()) + 10
        if cur and (words + w > MAX_WORDS or item[2]):
            chunks.append(cur)
            cur, words = [], 0
        cur.append(item)
        words += w
    if cur:
        chunks.append(cur)
    system = f"You are a literary translator. Translate the user's Markdown from {LANGS[src]} into {LANGS[tgt]}. {RULES}"
    out = []  # [heading|None, body]
    for chunk in chunks:
        md = '\n\n'.join((f'## {h}\n\n{b}' if h else b) for h, b, _ in chunk).strip()
        if not md:
            continue
        tr = complete(system, md, body_check(md))
        parts = re.split(r'(?m)^## (.+)$', tr)
        lead, rest = parts[0].strip(), parts[1:]
        if lead:
            if chunk[0][2] and out:  # continuation of the previous section
                out[-1][1] = (out[-1][1] + '\n\n' + lead).strip()
            else:
                out.append([None, lead])
        out.extend([rest[i].strip(), rest[i + 1].strip()] for i in range(0, len(rest), 2))
    return out


def translate_meta(meta, src, tgt):
    payload = json.dumps(meta, ensure_ascii=False)
    def check(out):
        try:
            d = json.loads(out)
        except Exception as e:
            return f'bad json {e}'
        for k, v in meta.items():
            if k not in d or (isinstance(v, list) and (not isinstance(d[k], list) or len(d[k]) != len(v))):
                return f'key {k} missing or wrong length'
        return None
    system = (f"Translate every string value of the user's JSON from {LANGS[src]} into {LANGS[tgt]}. Keep all keys, "
              f"array lengths and order. {RULES} Output only the JSON object.")
    return json.loads(complete(system, payload, check))


def yq(s):
    return json.dumps(s, ensure_ascii=False)


def build_file(post, tgt):
    src = post['lang']
    headed = [s for s in post['sections'] if s['heading']]
    secs = [(s['heading'], s['body']) for s in post['sections']]
    meta = {'title': post['title'],
            'description': post['description'], 'tldr': post['tldr'],
            'basically': [post['basically'].get(s['id'], '') for s in headed]}
    intro_b = post['basically'].get('_intro')
    if intro_b:
        meta['intro_basically'] = intro_b
    m = translate_meta(meta, src, tgt)
    body = translate_body(secs, src, tgt)
    desc = m['description'].strip()
    if len(desc) > 200:
        desc = desc[:197].rsplit(' ', 1)[0] + '…'
    fm = [
        '---', f'title: {yq(m["title"].strip())}', f'description: {yq(desc)}', f'date: {yq(post["publishedAt"])}',
        f'updated: {yq(post["updated"])}', f'lang: {tgt}', f'translated_from: {yq(src + "/" + post["slug"])}',
        f'source_sections: {yq([s["id"] for s in headed])}', f'category: {post["category"]}', f'format: {post["format"]}',
        f'author: {post["author"]}', f'provenance: {post["provenance"]}', 'ai_assisted: true', 'reviewed_by_human: false',
    ]
    for key, field in (('image', 'image'), ('video', 'video'), ('original_author', 'originalAuthor')):
        if post.get(field):
            fm.append(f'{key}: {yq(post[field])}')
    if post.get('thirdPartySummary'):
        fm.append('third_party_summary: true')
    if post.get('tags'):
        fm.append(f'tags: {yq(post["tags"])}')
    if post.get('sourceLinks'):
        fm.append(f'source_links: {yq(post["sourceLinks"])}')
    if m.get('tldr'):
        fm.append(f'tldr: {yq([t.strip() for t in m["tldr"]])}')
    if m.get('intro_basically'):
        fm.append(f'basically: {yq({"_intro": m["intro_basically"].strip()})}')
    lines = [b for b in m['basically']]
    if any(lines):
        fm.append(f'sections: {yq([{"basically": b.strip()} if b else {} for b in lines])}')
    fm.append('---')
    text = '\n\n'.join((f'## {h}\n\n{b}' if h else b) for h, b in body if h or b)
    return '\n'.join(fm) + '\n' + text.strip() + '\n'


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--only', default='')
    ap.add_argument('--langs', default=','.join(LANGS))
    ap.add_argument('--workers', type=int, default=32)
    a = ap.parse_args()
    graph = json.load(open('src/generated/content.json'))
    posts = [p for p in graph['posts'] if not p['noindex'] and not p.get('translatedFrom')]
    # A human translation pair (translations: {de: ...}) counts once: the English side is the source.
    paired = {f'{l}/{s}' for p in posts if p['lang'] == 'en' for l, s in p['translations'].items()}
    posts = [p for p in posts if p['id'] not in paired]
    if a.only:
        posts = [p for p in posts if p['slug'] in a.only.split(',')]
    jobs = []
    for p in posts:
        have = set(p['translations']) | {p['lang']}
        for tgt in a.langs.split(','):
            out = Path('content/posts') / tgt / p['date'][:4] / f'{p["slug"]}.md'
            if tgt not in have and not out.exists():
                jobs.append((p, tgt, out))
    print(f'{len(posts)} source posts, {len(jobs)} translations to write', flush=True)
    done = failed = 0
    with ThreadPoolExecutor(a.workers) as ex:
        futs = {ex.submit(build_file, p, tgt): (p, tgt, out) for p, tgt, out in jobs}
        for f in as_completed(futs):
            p, tgt, out = futs[f]
            try:
                text = f.result()
                out.parent.mkdir(parents=True, exist_ok=True)
                out.write_text(text)
                done += 1
            except Exception as e:
                failed += 1
                print(f'FAIL {tgt}/{p["slug"]}: {str(e)[:200]}', flush=True)
            if (done + failed) % 25 == 0:
                print(f'{done} written, {failed} failed, {len(jobs) - done - failed} left, {stats}', flush=True)
    print(f'done: {done} written, {failed} failed, {stats}', flush=True)


if __name__ == '__main__':
    sys.exit(main())
