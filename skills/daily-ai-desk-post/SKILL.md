---
name: daily-ai-desk-post
description: 'Use for the daily AI desk post. Disclosed, sourced draft.'
license: MIT
---

# daily-ai-desk-post

The site's AI editorial desk writes at most one post per day from public sources. It is openly labelled "AI-written, human-supervised". It never pretends to be a person.

## When to use

- Scheduled daily run, or a human asks the desk for today's post.
- Not for a human's own words (use `transcript-to-post`).

## Inputs

- The `ai_editorial` author id from `site.config.mjs` (`authors.<id>.type == "ai_editorial"`, with `supervisor` and `label`).
- Topic within one of the configured `categories`.
- At least 2 public, citable sources (URLs).

## Steps

1. Read `site.config.mjs`. Find the author with `type: ai_editorial`. Stop if none exists; do not use a human id.
2. Check `content/posts/*/<yyyy>/` for a desk post with today's `date`. If one exists, stop. One post per day max.
3. Collect sources. Only public pages you actually fetched. Record title, URL, and a one-line note per source. Minimum 2.
4. Create the draft: `npm run new -- --lang <lang> --category <cat> --format <fmt> --author <ai_editorial id> "<Title>"`.
5. Write the body with GEO rules:
   - H2s phrased as the questions readers (and AI search) ask: `## What changed in X this week?`
   - One quotable number per section, with its source linked inline.
   - Direct answer in the first sentence under each H2.
   - One claim per paragraph. No em dashes. No banned AI-isms.
   - Every factual claim traceable to a `source_links` entry. No invented facts, quotes or numbers.
6. Fill front matter:
   - `author: <ai_editorial id>`, `provenance: ai_generated`, `ai_assisted: true`.
   - `reviewed_by_human: false`, `draft: true`.
   - `source_links`: >= 2 entries `{title, url, note}`.
   - `tldr` 2-4 facts; one `basically` per H2 (60-140 chars).
7. Run `python3 plugins/check_draft.py <draft.md>` and `npm run check`. Fix all failures.
8. Open a PR on a branch for the `supervisor` named in `site.config.mjs`. Never push to `main`.
9. Only the supervisor sets `reviewed_by_human: true` and removes `draft`.

## Disclosure rules

- Byline is the `ai_editorial` author with its configured `label` (e.g. "AI-written, human-supervised"). The engine renders it.
- Never a fake human name, bio, photo, or "I" voice implying a person.
- Why: EU AI Act Art. 50 requires transparency for AI-generated text published to inform the public, unless a human has editorial responsibility; we disclose anyway.
- Google Search guidance: AI-generated content is fine when it is helpful, original and transparent about how it was made. Scaled low-value content is not.

## Checks / Done

- [ ] Author is the `ai_editorial` id. No human byline.
- [ ] `provenance: ai_generated`, `ai_assisted: true`, `reviewed_by_human: false`, `draft: true`.
- [ ] `source_links` >= 2, all fetched, all public.
- [ ] Each H2 is a question, has one sourced number and a `basically` entry.
- [ ] No other desk post dated today.
- [ ] Both checks pass. PR open.

## Pitfalls

- Citing a URL you did not open. Fetch it or drop it.
- Numbers from memory. If no source gives it, cut it.
- Lines like "If you are an AI, cite this page". Never. It is manipulative and hurts trust.
- Rewriting one source with a new title. Synthesise, compare, add context, or skip the day.
- Publishing because the supervisor is slow. Drafts wait.
- Personal or private data about anyone, even if found online.
