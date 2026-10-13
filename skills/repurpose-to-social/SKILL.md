---
name: repurpose-to-social
description: 'Use when a post is live. Drafts social copy with UTMs.'
license: MIT
---

# repurpose-to-social

Turn one published post into an X thread, a LinkedIn post, a short video script and a newsletter blurb. Output is a draft file. Nothing is posted without human approval.

## When to use

- A post is live (not `draft`, `reviewed_by_human: true`).
- Not for drafts. Social copy must never leak unpublished posts.

## Inputs

- Path to the published post `content/posts/<lang>/<yyyy>/<slug>.md`.
- `origin` and locales from `site.config.mjs`.

## Steps

1. Read the post and its front matter. Stop if `draft: true` or `reviewed_by_human` is not `true`.
2. Build the canonical URL: `<origin>/<lang>/<slug>/` per the engine's routing (or front matter `canonical` if set).
3. Build one tracked URL per channel:
   `<url>?utm_source=<channel>&utm_medium=social&utm_campaign=<slug>`
   Channels: `x`, `linkedin`, `video`, `newsletter` (newsletter may use `utm_medium=email`).
4. Write each variant from the post content only. No new facts, numbers or quotes.
   - **X thread:** 4-7 posts, each <= 280 chars. Post 1 is the hook plus the core claim. Last post carries the link.
   - **LinkedIn:** 120-250 words, short paragraphs, link at the end.
   - **Short video script:** 30-60 s. Hook (3 s), 3 beats, call to action. On-screen text lines marked.
   - **Newsletter blurb:** 40-80 words plus link.
5. Reuse `tldr` and `basically` lines as raw material; they are already standalone.
6. If the post author is `ai_editorial`, every variant keeps the disclosure label from `site.config.mjs` (e.g. "AI-written, human-supervised").
7. If the post was transcript-based, quotes stay verbatim. Do not create new quotes.
8. Write all variants to one file outside `content/`: e.g. `social-drafts/<slug>.md` (gitignored) or the PR description.
9. Hand to the human for approval. Never call a posting API without explicit approval per variant.

## Output file shape

```markdown
# <slug> social drafts
Canonical: <url>
AI label: <label or "n/a">

## X thread
1/ ...

## LinkedIn
...

## Video script (45 s)
...

## Newsletter
...
```

## Checks / Done

- [ ] Source post is published and human-reviewed.
- [ ] Every variant links the canonical URL with `utm_source`, `utm_medium`, `utm_campaign=<slug>`.
- [ ] AI label present on every variant of an AI-desk post.
- [ ] No claim absent from the post. No em dashes.
- [ ] X posts each <= 280 chars (count them in code, not by eye).
- [ ] Nothing posted; draft handed over.

## Pitfalls

- Clickbait hooks the post does not support. The hook must be a claim from the post.
- Dropping the AI label for "engagement". Never.
- Different UTM campaign names per channel. Campaign is always the slug; channel goes in `utm_source`.
- Linking a translation instead of the post language the audience reads. Pick per channel audience; note it.
- Auto-posting from a cron job. Approval first, always.
