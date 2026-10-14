#!/usr/bin/env python3
"""Generate house-style section illustrations for emin.de posts.

Input: a JSON list of {"k": "<post-slug>/<section-id>", "subject": "...", "accents": "..."}.
Output: content/media/<post-slug>/sections/<section-id>.webp, transparent background
(paper keyed to alpha by connectivity, same as scripts/make-covers-transparent.py).
Existing files are kept (re-runs only fill gaps). Run from the emin-de repo root with
the Hermes venv python (it calls Hermes' image_generate_tool):

  ~/.hermes/hermes-agent/venv/bin/python skills/emin-de-illustration/section-art.py batch.json
"""
import io
import json
import sys
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

sys.path.insert(0, str(Path.home() / ".hermes/hermes-agent"))
from tools.image_generation_tool import image_generate_tool  # noqa: E402

SKELETON = (
    "Editorial illustration in mixed technique: expressive black charcoal drawing combined with selective "
    "oil painting color elements. Background is plain warm cream paper, exact color #FDF6E3, no texture "
    "gradient, flat even background. Subject: {subject} Loose visible charcoal strokes, smudged shading, "
    "sketchy construction lines. Only two or three areas carry thick oil paint color accents: {accents}. "
    "Everything else stays monochrome charcoal on the cream paper. Editorial magazine style, clean "
    "composition, subject centered, lots of empty cream space around the subject, no text, no letters, "
    "no words, no numbers, no signature, no logo marks."
)
T0, T1 = 18, 48


def key(im: Image.Image) -> Image.Image:
    a = np.asarray(im.convert("RGB")).astype(np.int16)
    c = np.concatenate([a[:12, :12].reshape(-1, 3), a[:12, -12:].reshape(-1, 3),
                        a[-12:, :12].reshape(-1, 3), a[-12:, -12:].reshape(-1, 3)])
    d = np.sqrt(((a - np.median(c, axis=0)) ** 2).sum(axis=2))
    labels, _ = ndimage.label(d < T1)
    border = (set(labels[0, :]) | set(labels[-1, :]) | set(labels[:, 0]) | set(labels[:, -1])) - {0}
    bg = np.isin(labels, list(border)) if border else np.zeros(d.shape, bool)
    alpha = np.where(bg, np.clip((d - T0) / (T1 - T0), 0, 1), 1.0)
    return Image.fromarray(np.dstack([a.astype(np.uint8), (alpha * 255).astype(np.uint8)]), "RGBA")


def one(item):
    slug, sid = item["k"].split("/", 1)
    out = Path("content/media") / slug / "sections" / f"{sid}.webp"
    if out.exists():
        return item["k"], "kept"
    prompt = SKELETON.format(subject=item["subject"].strip().rstrip(".") + ".", accents=item["accents"].strip().rstrip("."))
    err = "no attempt"
    for attempt in range(3):
        try:
            r = json.loads(image_generate_tool(prompt=prompt, aspect_ratio="landscape"))
            if not r.get("success"):
                raise RuntimeError(r.get("error"))
            raw = urllib.request.urlopen(r["image"], timeout=60).read()
            im = key(Image.open(io.BytesIO(raw)))
            out.parent.mkdir(parents=True, exist_ok=True)
            im.save(out, "WEBP", quality=80, method=6)
            return item["k"], "ok"
        except Exception as e:  # retry transient gateway errors
            err = str(e)[:120]
    return item["k"], f"FAIL {err}"


def main():
    items = json.load(open(sys.argv[1]))
    with ThreadPoolExecutor(max_workers=4) as ex:
        for k, status in ex.map(one, items):
            print(status, k, flush=True)


if __name__ == "__main__":
    main()
