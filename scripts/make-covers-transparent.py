#!/usr/bin/env python3
"""Make the flat cream paper background of house illustration covers transparent.

Flood keying: only paper CONNECTED to the image border becomes transparent.
Enclosed light areas inside the drawing (faces, concrete, glow cores) stay
opaque. Soft alpha at the boundary avoids cream halos.
"""
import sys
from pathlib import Path
from PIL import Image
import numpy as np
from scipy import ndimage

T0, T1 = 18, 48  # distance band: below T0 fully paper, above T1 fully opaque


def paper_ref(a: np.ndarray) -> np.ndarray:
    corners = np.concatenate([
        a[:12, :12].reshape(-1, 3), a[:12, -12:].reshape(-1, 3),
        a[-12:, :12].reshape(-1, 3), a[-12:, -12:].reshape(-1, 3),
    ])
    return np.median(corners, axis=0)


def key(im: Image.Image) -> Image.Image:
    im = im.convert("RGB")
    a = np.asarray(im).astype(np.int16)
    ref = paper_ref(a)
    d = np.sqrt(((a - ref) ** 2).sum(axis=2))
    paperish = d < T1
    # connected paper regions that touch the border = background
    labels, _ = ndimage.label(paperish)
    border = set(labels[0, :]) | set(labels[-1, :]) | set(labels[:, 0]) | set(labels[:, -1])
    border.discard(0)
    bg = np.isin(labels, list(border)) if border else np.zeros(d.shape, bool)
    alpha = np.where(bg, np.clip((d - T0) / (T1 - T0), 0, 1), 1.0)
    out = np.dstack([a.astype(np.uint8), (alpha * 255).astype(np.uint8)])
    return Image.fromarray(out, "RGBA")


def main():
    files = sorted(Path("content/media").glob("*/cover.png"))
    if not files:
        sys.exit("no cover.png files found")
    for f in files:
        im = Image.open(f)
        if im.mode == "RGBA":
            # re-key from a flattened version so re-runs are idempotent
            bg = Image.new("RGB", im.size, (253, 246, 227))
            bg.paste(im, mask=im.split()[3])
            im = bg
        keyed = key(im)
        keyed.save(f, optimize=True)
        opaque = (np.asarray(keyed.split()[3]) > 10).mean()
        print(f"{f.parent.name}: opaque {opaque:.0%}")
    print(f"done: {len(files)} files")


if __name__ == "__main__":
    main()
