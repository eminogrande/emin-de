#!/usr/bin/env python3
"""Mechanical gate for a post draft in this repo's Markdown format.

Usage: python3 plugins/check_draft.py DRAFT.md [TRANSCRIPT.txt]
Exit 0 = all mechanical checks pass, 1 = fix needed.

It does not judge truth or voice. A human still reads the draft against the
source. With a transcript, every "quoted phrase" in the body must appear
verbatim in it (the quote ledger rule).
"""
import re, sys

BANNED = ['delve', 'landscape', 'testament', 'crucial', 'seamless', 'leverage', 'game-changer',
          'in order to', 'it is important to note', 'let us dive in', 'at the end of the day',
          'when it comes to', 'tapestry', 'pivotal', 'vibrant', 'showcase', 'underscore',
          'moreover', 'furthermore', 'in conclusion']


def front_matter(text):
    m = re.match(r'^---\n(.*?)\n---\n?(.*)$', text, re.S)
    return (m.group(1), m.group(2)) if m else ('', text)


def slug(heading):
    s = re.sub(r'[^\w\- ]', '', heading.strip().lower(), flags=re.U)
    return re.sub(r' ', '-', s)


def main(draft_path, transcript_path=None):
    raw = open(draft_path, encoding='utf-8').read()
    fm, body = front_matter(raw)
    fails = []
    if not fm:
        fails.append('no front matter')
    if transcript_path:
        src = ' '.join(open(transcript_path, encoding='utf-8').read().split())
        for q in re.findall(r'"([^"]+)"', body):
            if ' '.join(q.split()) not in src:
                fails.append(f'quote not verbatim in transcript: "{q[:60]}"')
    if '\u2014' in body:
        fails.append(f'em dash x{body.count(chr(0x2014))}')
    low = body.lower()
    fails += [f'banned word: {b}' for b in BANNED if re.search(r'\b' + re.escape(b) + r'\b', low)]
    tldr = re.search(r'(?ms)^tldr:\n((?:\s+- .*\n?)+)', fm)
    n_tldr = len(re.findall(r'(?m)^\s+- ', tldr.group(1))) if tldr else 0
    if not 2 <= n_tldr <= 4:
        fails.append(f'tldr needs 2-4 items (found {n_tldr})')
    headings = re.findall(r'(?m)^## (.+)$', body)
    block = re.search(r'(?ms)^basically:\n((?:\s+[\w-]+: .*\n?)+)', fm)
    basically = dict(re.findall(r'(?m)^\s+([\w-]+): "?(.*?)"?\s*$', block.group(1))) if block else {}
    for h in headings:
        line = basically.get(slug(h))
        if not line:
            fails.append(f'no basically line for section "{slug(h)}"')
        elif len(line) > 140:
            fails.append(f'basically "{slug(h)}" over 140 chars ({len(line)})')
    words = len(re.findall(r"[^\W\d_]+", re.sub(r'(?m)^#.*$', '', body)))
    print(f'words={words} sections={len(headings)} basically={len(basically)} tldr={n_tldr}')
    for f in fails:
        print('FAIL', f)
    print('PASS' if not fails else f'{len(fails)} to fix')
    return 0 if not fails else 1


if __name__ == '__main__':
    if len(sys.argv) not in (2, 3):
        sys.exit(__doc__)
    sys.exit(main(*sys.argv[1:]))
