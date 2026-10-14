#!/usr/bin/env python3
"""Annotated crops for photo essays: crop a region, draw marks, save WebP.

Usage: python3 plugins/annotate_photo.py SPEC.json

SPEC is one object or a list of objects:
{
  "src": "public/photos/emino-7c8e65d5.jpg",
  "out": "public/photos/notes/<post-slug>/01-horizon.webp",
  "alt": "What the reader sees in this crop, plain English",
  "crop": [0.0, 0.3, 0.6, 0.9],          # optional, fractions of the ORIGINAL (x0, y0, x1, y1)
  "width": 1400,                          # optional output width, default 1400 (never upscales)
  "marks": [                              # all coordinates are fractions of the ORIGINAL photo
    {"type": "thirds"},                   # rule-of-thirds grid over the output
    {"type": "circle", "at": [0.42, 0.55], "r": 0.06, "label": "ferry stern"},
    {"type": "box", "box": [0.1, 0.2, 0.3, 0.5], "label": "open shade"},
    {"type": "arrow", "from": [0.9, 0.1], "to": [0.6, 0.4], "label": "sun direction"},
    {"type": "line", "points": [[0, 0.62], [1, 0.58]], "label": "horizon, tilted 1 degree"},
    {"type": "label", "at": [0.05, 0.05], "text": "1/500 s reading"}
  ]
}

Prints one HTML <img> line per output with width, height, alt and lazy loading,
ready to paste into the post body on its own line.
"""
import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ACCENT = (181, 137, 0)  # Solarized yellow, the site accent
RED = (220, 50, 47)
INK = (0, 43, 54)
PAPER = (253, 246, 227)
FONT_PATHS = ['/System/Library/Fonts/Supplemental/Arial Bold.ttf', '/Library/Fonts/Arial Bold.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf']


def font(size):
    for p in FONT_PATHS:
        if Path(p).exists():
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def render(spec, root):
    src = Image.open(root / spec['src']).convert('RGB')
    W, H = src.size
    x0, y0, x1, y1 = spec.get('crop') or [0, 0, 1, 1]
    if not (0 <= x0 < x1 <= 1 and 0 <= y0 < y1 <= 1):
        raise ValueError(f"bad crop {spec.get('crop')}")
    box = (round(x0 * W), round(y0 * H), round(x1 * W), round(y1 * H))
    img = src.crop(box)
    cw, ch = img.size
    out_w = min(int(spec.get('width', 1400)), cw)
    scale = out_w / cw
    img = img.resize((out_w, round(ch * scale)), Image.Resampling.LANCZOS)
    w, h = img.size

    def pt(p):  # original fraction -> output pixel
        return ((p[0] * W - box[0]) * scale, (p[1] * H - box[1]) * scale)

    stroke = max(3, round(w / 320))
    f = font(max(18, round(w / 42)))
    draw = ImageDraw.Draw(img, 'RGBA')

    def tag(xy, text, color=ACCENT):
        x, y = xy
        l, t, r, b = draw.textbbox((0, 0), text, font=f)
        tw, th = r - l, b - t
        pad = round(th * 0.45)
        x = min(max(x, pad), w - tw - 3 * pad)
        y = min(max(y, pad), h - th - 3 * pad)
        draw.rounded_rectangle([x, y, x + tw + 2 * pad, y + th + 2 * pad], radius=pad, fill=PAPER + (235,), outline=color + (255,), width=max(2, stroke // 2))
        draw.text((x + pad - l, y + pad - t), text, font=f, fill=INK)

    for m in spec.get('marks', []):
        kind = m['type']
        color = RED if m.get('color') == 'red' else ACCENT
        if kind == 'thirds':
            # dark under-stroke so the grid reads on white skies too
            for i in (1, 2):
                for col, wd in ((INK + (150,), max(4, stroke)), (PAPER + (220,), max(2, stroke // 2))):
                    draw.line([(w * i / 3, 0), (w * i / 3, h)], fill=col, width=wd)
                    draw.line([(0, h * i / 3), (w, h * i / 3)], fill=col, width=wd)
        elif kind == 'circle':
            cx, cy = pt(m['at'])
            r = m.get('r', 0.05) * W * scale
            draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=color, width=stroke)
            if m.get('label'):
                tag((cx + r * 0.75, cy + r * 0.75), m['label'], color)
        elif kind == 'box':
            a, b = pt(m['box'][:2]), pt(m['box'][2:])
            draw.rectangle([a, b], outline=color, width=stroke)
            if m.get('label'):
                tag((a[0], b[1] + stroke * 2), m['label'], color)
        elif kind == 'arrow':
            a, b = pt(m['from']), pt(m['to'])
            draw.line([a, b], fill=color, width=stroke)
            import math
            ang = math.atan2(b[1] - a[1], b[0] - a[0])
            size = stroke * 5
            left = (b[0] - size * math.cos(ang - 0.45), b[1] - size * math.sin(ang - 0.45))
            right = (b[0] - size * math.cos(ang + 0.45), b[1] - size * math.sin(ang + 0.45))
            draw.polygon([b, left, right], fill=color)
            if m.get('label'):
                tag((a[0], a[1]), m['label'], color)
        elif kind == 'line':
            pts = [pt(p) for p in m['points']]
            draw.line(pts, fill=color, width=stroke)
            if m.get('label'):
                tag((pts[0][0] + stroke * 4, pts[0][1] - stroke * 12), m['label'], color)
        elif kind == 'label':
            tag(pt(m['at']), m['text'], color)
        else:
            raise ValueError(f'unknown mark {kind}')

    out = root / spec['out']
    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, 'WEBP', quality=80, method=6)
    alt = spec.get('alt', '').replace('"', '&quot;')
    url = '/' + str(Path(spec['out'])).removeprefix('public/')
    return f'<img src="{url}" width="{w}" height="{h}" alt="{alt}" loading="lazy" decoding="async" />'


def main():
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(2)
    root = Path(__file__).resolve().parent.parent
    specs = json.loads(Path(sys.argv[1]).read_text())
    for s in specs if isinstance(specs, list) else [specs]:
        if not s.get('alt'):
            raise ValueError(f"alt text required for {s['out']}")
        print(render(s, root))


if __name__ == '__main__':
    main()
