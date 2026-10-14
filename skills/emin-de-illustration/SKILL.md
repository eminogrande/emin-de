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

## The style (fixed, do not vary)

Black charcoal drawing combined with selective oil painting color elements, on a flat warm cream background matching the site paper color **#FDF6E3**.

Prompt skeleton (adapt only the SUBJECT sentence):

> Editorial illustration in mixed technique: expressive black charcoal drawing combined with selective oil painting color elements. Background is plain warm cream paper, exact color #FDF6E3, no texture gradient, flat even background. Subject: <one or two concrete sentences from the post's own content>. Loose visible charcoal strokes, smudged shading, sketchy construction lines. Only two or three areas carry thick oil paint color accents: <accent 1 placement and color>, <accent 2 placement and color>. Everything else stays monochrome charcoal on the cream paper. Editorial magazine style, clean composition, lots of empty cream space around the subject, no text, no letters, no words.

Rules:

1. One clear central subject, drawn from what the post is actually about (title + description). Never generic clip art.
2. Two or three oil paint accents maximum. Accent colors (orange, deep blue, green) sit on the most important subject element.
3. Flat #FDF6E3 background, empty space around the subject. Never dark, never textured background.
4. No text, no letters, no words in the image.
5. Landscape aspect. Minimum width 1024 px.

## Where the file goes

`content/media/<post-slug>/cover.png` in the emin-de worktree. The build finds it automatically (folder fallback in `scripts/lib/covers.mjs`), crops 3:2 and emits responsive WebP to `public/covers/`. No front matter change needed; `image: /media/<slug>/cover.png` in front matter is fine too.

## Procedure

1. Fresh worktree from origin/main (see emin-de-publishing skill).
2. Find posts without a cover: no `image:`/`cover:` front matter and no `content/media/<slug>/` folder. Photo posts (`format: photo`) keep their photo.
3. Generate with image_generate using the skeleton above, landscape.
4. Download to `content/media/<slug>/cover.png` (curl). Keep PNG.
5. Verify visually: the assistant model may not accept image inputs, so delegate a vision-capable subagent (delegate_task with `images: [path]`) to check background color, style, subject, no text. Regenerate if it fails.
6. `npm run build` and check the cover count line: raster covers must rise by the number added, generated typographic covers must fall accordingly.
7. Commit `content/media/**`, push to main, watch CI, prove `/health` commit == pushed SHA and a cover WebP exists on the live site.

## Pitfalls

- Do not put illustrations in `public/photos/` (that is the photo gallery; the gallery only reads its top level).
- Do not touch `content/posts/**` front matter for the folder-fallback path.
- The cover pipeline crops to 3:2 with attention positioning: keep the subject centered enough to survive a crop.
- Typographic SVG covers remain the fallback for posts with neither photo nor illustration. The goal is zero of them.
