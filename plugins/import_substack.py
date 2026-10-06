#!/usr/bin/env python3
"""Import public Substack posts as Markdown files under content/posts/.

Usage: python3 plugins/import_substack.py https://NAME.substack.com [--lang en] [--author ID] [--out content/posts]
Needs: pip install markdownify (only for importing; the site build does not use Python).

What it does, deterministically:
- reads /api/v1/archive and /api/v1/posts/<slug> (public endpoints, no login)
- keeps the original date, sets canonical to the Substack URL, provenance: written
- strips Substack UI chrome (buttons, icons, subscribe widgets)
- turns YouTube embeds into a front-matter `video` block plus a plain link
- never overwrites an existing file (edit by hand after the first import)
Fields that need a human decision (category, format, ai_assisted) are written with
safe defaults and a TODO comment so `npm run check` forces a look.
"""
import argparse, json, os, re, sys, urllib.request
from markdownify import markdownify

UA = {'User-Agent': 'content-import/1.0 (+https://github.com)'}


def get(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
        return json.load(r)


def q(value):
    return json.dumps(value, ensure_ascii=False)


def clean_html(html):
    html = re.sub(r'<button\b.*?</button>', '', html, flags=re.S)
    html = re.sub(r'<svg\b.*?</svg>', '', html, flags=re.S)
    html = re.sub(r'<div class="subscription-widget.*?</div></div>', '', html, flags=re.S)
    html = re.sub(r'<source\b[^>]*>', '', html)
    html = re.sub(r'\s(srcset|sizes)="[^"]*"', '', html)
    videos = re.findall(r'youtube-nocookie\.com/embed/([\w-]{11})', html)
    html = re.sub(r'<div id="youtube2-([\w-]{11})".*?</iframe></div></div>',
                  lambda m: f'<p><a href="https://www.youtube.com/watch?v={m.group(1)}">Watch the video on YouTube</a></p>', html, flags=re.S)
    # Substack wraps images in a link to the full-size file; keep only the image.
    html = re.sub(r'<a class="image-link[^>]*>(.*?)</a>', r'\1', html, flags=re.S)
    html = re.sub(r'<div><hr></div>', '<hr>', html)
    return html, videos


def to_markdown(html):
    text = markdownify(html, heading_style='ATX', bullets='-', strong_em_symbol='*')
    # Substack bolds every H3; the heading already carries the weight.
    text = re.sub(r'(?m)^(#{1,6}) \*\*(.+?)\*\*\s*$', r'\1 \2', text)
    # Promote H3 to H2: Substack has no H2, the engine sections on H2.
    text = re.sub(r'(?m)^### ', '## ', text)
    text = re.sub(r'\u00a0', ' ', text)
    text = re.sub(r'[ \t]+\n', '\n', text)
    return re.sub(r'\n{3,}', '\n\n', text).strip() + '\n'


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('base')
    ap.add_argument('--lang', default='en')
    ap.add_argument('--author', default='emin')
    ap.add_argument('--out', default='content/posts')
    args = ap.parse_args()
    base = args.base.rstrip('/')
    archive = get(f'{base}/api/v1/archive?sort=new&limit=50')
    for item in archive:
        post = get(f"{base}/api/v1/posts/{item['slug']}")
        if post.get('audience') not in (None, 'everyone'):
            print('skip (not public):', post['slug'])
            continue
        date = post['post_date'][:10]
        path = os.path.join(args.out, args.lang, date[:4], f"{post['slug']}.md")
        if os.path.exists(path):
            print('exists, not overwritten:', path)
            continue
        html, videos = clean_html(post['body_html'])
        fm = [
            '---',
            f"title: {q(post['title'])}",
            f"description: {q((post.get('subtitle') or post.get('description') or post['title'])[:200])}",
            f'date: {date}',
            f"updated: {date}",
            f'lang: {args.lang}',
            'translations: {}',
            'category: notes  # TODO: pick from site.config.mjs categories',
            'format: essay  # TODO: pick from site.config.mjs formats',
            f'author: {args.author}',
            'provenance: written',
            'ai_assisted: unknown  # TODO: true / false / unknown',
            'reviewed_by_human: true',
            f"canonical: {q(post['canonical_url'])}",
            f"import_note: {q('Imported from Substack. Text unchanged except formatting; first published at the canonical URL.')}",
        ]
        if videos:
            fm.append(f'video: {{ url: {q("https://www.youtube.com/watch?v=" + videos[0])} }}')
        fm += ['tags: []', 'source_links: []', 'tldr: []', 'basically: {}', '---', '']
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, 'w', encoding='utf-8') as f:
            f.write('\n'.join(fm) + to_markdown(html))
        print('wrote', path)


if __name__ == '__main__':
    sys.exit(main())
