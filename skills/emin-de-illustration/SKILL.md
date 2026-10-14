---
name: emin-de-illustration
version: 1.0.0
description: "Use when an emin.de post needs a cover illustration."
tags: ["emin-de", "illustration", "covers", "image-generation"]
metadata:
  hermes:
    related_skills: ["emin-de-publishing"]
---

# emin.de house illustration style

Every non-photo post on emin.de gets a cover illustration in ONE house style. Photo posts keep their photo as the cover. Existing pictures inside post bodies stay untouched.

**The cover file must have a TRANSPARENT background (alpha), not a cream fill.** The site's own paper color shows through everywhere (cards, hero, share cards). Generate on flat cream, then key the paper to alpha with `scripts/make-covers-transparent.py` in the emin-de repo.

## The style (fixed, do not vary)

Black charcoal drawing combined with selective oil painting color elements, on a flat warm cream background matching the site paper color **#FDF6E3**.

Prompt skeleton (adapt only the SUBJECT sentence):

> Editorial illustration in mixed technique: expressive black charcoal drawing combined with selective oil painting color elements. Background is plain warm cream paper, exact color #FDF6E3, no texture gradient, flat even background. Subject: <one or two concrete sentences from the post's own content>. Loose visible charcoal strokes, smudged shading, sketchy construction lines. Only two or three areas carry thick oil paint color accents: <accent 1 placement and color>, <accent 2 placement and color>. Everything else stays monochrome charcoal on the cream paper. Editorial magazine style, clean composition, lots of empty cream space around the subject, no text, no letters, no words.

Rules:

1. One clear central subject, drawn from what the post is actually about (title + description). Never generic clip art.
2. Two or three oil paint accents maximum. Accent colors (orange, deep blue, green) sit on the most important subject element.
3. Flat #FDF6E3 cream background while GENERATING (the keying needs a uniform paper), empty space around the subject. Never dark, never textured background. The committed file is transparent afterwards.
4. No text, no letters, no words in the image.
5. Landscape aspect. Minimum width 1024 px.

## Where the file goes

`content/media/<post-slug>/cover.png` in the emin-de worktree. The build finds it automatically (folder fallback in `scripts/lib/covers.mjs`), crops 3:2 and emits responsive WebP to `public/covers/`. No front matter change needed; `image: /media/<slug>/cover.png` in front matter is fine too.

## Procedure

1. Fresh worktree from origin/main (see emin-de-publishing skill).
2. Find posts without a cover: no `image:`/`cover:` front matter and no `content/media/<slug>/` folder. Photo posts (`format: photo`) keep their photo.
3. Generate with image_generate using the skeleton above, landscape.
4. Download to `content/media/<slug>/cover.png` (curl). Keep PNG.
5. Make the background transparent: `python3 scripts/make-covers-transparent.py` from the repo root (keys all `content/media/*/cover.png` to alpha, idempotent). The cover pipeline and the WebP conversion keep the alpha; the site renders the drawing floating on its own paper color (`.cover` CSS backgrounds it, OG cards already draw a cream rect).
6. Verify visually: the assistant model may not accept image inputs, so delegate a vision-capable subagent (delegate_task with `images: [path]`) to composite the keyed PNG over cream and over dark grey and check for cream boxes, haze, or eaten subject parts. Regenerate or re-tune T0/T1 if it fails.
7. `npm run build` and check the cover count line: raster covers must rise by the number added, generated typographic covers must fall accordingly.
7. Commit `content/media/**`, push to main, watch CI, prove `/health` commit == pushed SHA and a cover WebP exists on the live site.

## Pitfalls

- Do not put illustrations in `public/photos/` (that is the photo gallery; the gallery only reads its top level).
- Do not touch `content/posts/**` front matter for the folder-fallback path.
- The cover pipeline crops to 3:2 with attention positioning: keep the subject centered enough to survive a crop.
- Generations love adding a fake artist signature scribble in a corner and tiny logo marks on objects. Both count as text: say "no signature, no logo marks" in every prompt and always check the corners in the vision pass.
- Editing the file via a local path fails (fal cannot download local files). Edit via a returned fal URL, and chain edits: each edit returns a new URL that becomes the input of the next pass. Expect 2-3 edit passes (signature, then faint lettering on object surfaces) before a cover is clean.
- Typographic SVG covers remain the fallback for posts with neither photo nor illustration. The goal is zero of them.
