---
name: transcript-to-post
description: 'Use when a transcript becomes a post. Voice, quotes, PR.'
license: MIT
---

# transcript-to-post

Turn a human's recording (talk, voice memo, interview, podcast) into a post in their own voice. The speaker is the author. The agent is an editor, not a co-author.

## When to use

- A transcript file exists and the speaker wants it published as a post.
- Not for AI-desk posts (use `daily-ai-desk-post`) or social cut-downs (use `repurpose-to-social`).

## Inputs

- `TRANSCRIPT.txt` with timestamps or line numbers.
- Speaker's author id from `site.config.mjs` (`authors.<id>.type` must be `human`).
- Target `lang` (one of `site.config.mjs` locales), `category`, `format`.
- Optional: notes from the speaker on what is off the record.

## Steps

1. Read `site.config.mjs`. Confirm author id, locale, category and format exist. Stop if not.
2. Read the full transcript once before writing. Mark candidate sections and every phrase worth quoting.
3. Apply the publication boundary (see below). Build a `withheld` list of everything cut.
4. Create the draft: `npm run new -- --lang <lang> --category <cat> --format <fmt> --author <id> "<Title>"`.
5. Write the body in first person, in the speaker's words and rhythm:
   - Reuse their phrasing; tighten, do not rewrite into generic prose.
   - One claim per paragraph.
   - Sections as `## ` headings. Prefer headings a reader would search for.
   - No em dashes. No AI-isms (the banned list lives in `plugins/check_draft.py`).
   - Never add a fact, number, name or opinion the speaker did not say.
6. Fill front matter:
   - `provenance: transcript`, `author: <human id>`, `ai_assisted: true`, `reviewed_by_human: false`, `draft: true`.
   - `description` max 160 chars. `tldr`: 2-4 short facts, all from the transcript.
   - `basically`: one entry per H2 slug, one standalone sentence, 60-140 chars.
   - `translations`: only slugs that already exist.
   - `source_links`: anything the speaker referenced that has a public URL.
7. Build the quote ledger (step below). Every phrase in quotation marks in the post must appear verbatim in the transcript.
8. Run checks:
   - `python3 plugins/check_draft.py <draft.md> <TRANSCRIPT.txt>`
   - `npm run check`
   Fix every failure. Do not weaken the checker.
9. Open a PR on a new branch. PR body contains: quote ledger, `withheld` list, open questions. Never push to `main`.
10. Hand off to the speaker. Only they set `reviewed_by_human: true` and remove `draft`.

## Quote ledger

Keep in the PR body (not in the post):

| Quote in post | Transcript location | Verbatim? |
| --- | --- | --- |
| "exact words" | 00:12:31 or line 214 | yes |

- Any row not `yes` is removed or paraphrased without quotation marks.
- Do not "fix" grammar inside quotes. Cut the quote instead.

## Publication boundary

Publish only what the speaker said for publication. Strip by default:

- Private names of people who are not public figures in that context.
- Private numbers: revenue, balances, salaries, user counts not already public.
- Unannounced deals, partners, launches, hires, legal matters.
- Third parties' private data (contact details, health, addresses, internal messages).
- Anything prefixed by the speaker with "off the record", "don't publish", or similar.

When unsure, leave it out and list it under `withheld` for the human. Silence is cheap; a leak is not.

## Checks / Done

- [ ] `check_draft.py` passes with the transcript argument.
- [ ] `npm run check` passes.
- [ ] Ledger covers every quoted phrase; all `yes`.
- [ ] `withheld` list present (empty list stated explicitly if nothing cut).
- [ ] `tldr` and one `basically` per H2 present.
- [ ] `provenance: transcript`, `reviewed_by_human: false`, `draft: true`.
- [ ] PR open; nothing on `main`.

## Pitfalls

- Polishing into generic blog voice. Readers came for the speaker. Keep their words.
- Merging two transcript statements into one "quote". That is fabrication.
- Filling gaps with plausible context. If the transcript does not say it, ask.
- Speech-to-text errors on names and numbers. Flag them as questions; never guess.
- Translating quotes for another locale and keeping quotation marks. Mark translated quotes as translations or paraphrase.
- Setting `reviewed_by_human: true` yourself. Never.
