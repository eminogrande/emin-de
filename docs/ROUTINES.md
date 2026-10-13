# emin.de routines (Hermes cron proposals)

Status: **proposals only. No cron job has been created, Post Bridge is not enabled.** Emin approves each routine individually; then it is created paused, run once by hand, and enabled.
Design: [CONTENT-MACHINE.md](./CONTENT-MACHINE.md).
Timezone for all schedules: Europe/Berlin.

## Shared rules for every routine

1. Work in a fresh git worktree of `eminogrande/emin-de` from `origin/main`. Never touch the main checkout.
2. Output is a **draft PR**, never a merge, never a deploy.
3. Never state a number that did not come from a tool call in this run. Missing credentials = stop and report which one.
4. No em dash in any output. No emoji in posts.
5. AI-desk content carries the AI-desk byline and label (CONTENT-MACHINE.md section 8). First-person content only from Emin's transcripts.
6. Paid generation (image, video, paid TTS, paid model above the cap) only if `CONTENT_BUDGET_OK=1` is set by Emin and the run estimate is under the per-run cap ($3). Otherwise use the free path or skip the media step.
7. Post Bridge: `is_draft: true`, `use_queue: false`, readback with `get_post`. Never publish.
8. If nothing to do, deliver `[SILENT]`.
9. Append one line per run to `docs/ops/runs.md` in the PR (date, routine, result, spend estimate).

## Create command template

How a routine would be created after approval (example, do not run before approval):

```text
cronjob(action="create",
  name="emin-de-daily-post",
  schedule="0 7 * * *",
  prompt="<prompt block below>",
  skills=["write-like-emin", "nuri-voice-blog-publishing", "ai-seo", "programmatic-seo", "schema", "humanizer"],
  deliver="telegram",
  paused=true)
```

Parameter names follow the Hermes cron tool; check `skill_view(name="hermes-agent")` for the current signature before creating.

---

## R1. emin-de-daily-post

| Field | Value |
|---|---|
| Schedule | `0 7 * * *` (daily 07:00) |
| Skills | `write-like-emin`, `nuri-voice-blog-publishing`, `ai-seo`, `programmatic-seo`, `schema`, `humanizer`, `grounded-citations` |
| Inputs | `docs/content/queue.md` (planned topics), latest GSC gap list, latest AIO prompt misses, transcript inbox |
| Outputs | one Markdown post under the engine's posts dir, draft PR `post: <slug>` |
| Gates | build green; voice gate (`check_draft.py`) for first-person posts; every number and claim has a source URL + retrieved date; no em dash; front matter complete (`category`, `format`, `author`, `provenance`, `sources`, `review`); max 10 new URLs per ISO week |
| Human | transcript posts and any page where Nuri is compared: Emin review required (PR label `needs-emin`) |

Prompt:

```text
You run the emin.de daily post. Load the listed skills.
1. Read docs/content/queue.md, docs/seo/data/<latest>/gaps.md and docs/aio/<latest>.csv.
   Pick today's slot from the week template in docs/CONTENT-MACHINE.md section 4.
   Priority: transcript waiting in inbox > queued item for today > GSC gap > AIO prompt miss.
2. Check docs/content/state.json: never ship a slug or target query twice. Count URLs this ISO week; if >= 10, stop with [SILENT].
3. Research only primary sources. Write a fact sheet (fact, URL, retrieved date) to the PR description.
4. Draft the post in Markdown with full front matter. AI-desk byline and label unless the source is Emin's transcript.
5. Run gates: npm run build, voice gate for first-person, number check (every digit sequence in the body appears in the fact sheet), no em dash, links resolve (HTTP 200).
6. Red gate: no PR, report the failing gate.
7. Green: open a draft PR "post: <slug>", label needs-emin when format is essay-transcript or a Nuri compare.
8. Report: PR URL, title, format, category, target query, gates passed.
```

## R2. emin-de-transcript-inbox

| Field | Value |
|---|---|
| Schedule | `*/30 8-22 * * *` (every 30 min, daytime) |
| Skills | `source-faithful-extraction`, `write-like-emin`, `nuri-voice-blog-publishing`, `voice-preserving-editing` |
| Inputs | transcript inbox folder agreed with Emin (proposal: `~/Transcripts/emin-de-inbox/`, or Telegram voice notes forwarded to Hermes) |
| Outputs | draft PR `transcript: <slug>` with raw transcript, extracted claims list, first-person draft; Telegram ping with PR link |
| Gates | `check_draft.py` voice gate (v0.3 when merged); claims list: each sentence in the draft maps to a transcript line or a cited source; no new facts |
| Human | **always** Emin review, 10 minutes. Never auto-ready |

Prompt:

```text
Check the transcript inbox for files not listed in docs/content/state.json.
For each new file: transcribe if audio (local first), extract only what Emin said (source-faithful-extraction),
draft a first-person post with write-like-emin, run the voice gate, open a draft PR labelled needs-emin.
Add the raw transcript (or a private-link note if Emin marked it private) and the claims-to-transcript map.
Send Emin: PR link, title, 3 lines on what the post claims. If no new file: [SILENT].
```

## R3. emin-de-shipped-changelog

| Field | Value |
|---|---|
| Schedule | `30 21 * * 1-5` (weekdays 21:30); weekly roll-up `0 16 * * 5` |
| Skills | `github-workflow`, `logs-update` |
| Inputs | `gh search prs --merged --author eminogrande --merged-at <today>` over the allow-listed public repos in `docs/content/shipped-repos.txt` |
| Outputs | `shipped/<yyyy-mm-dd>.md` (daily) or `shipped/<yyyy>-w<ww>.md` (Friday), draft PR |
| Gates | only merged PRs from allow-listed public repos; each line links to its PR; zero PRs = no page |
| Human | none (facts are GitHub's); Emin can veto in the PR |

Prompt:

```text
List PRs merged today in the repos in docs/content/shipped-repos.txt. Exclude anything not public.
If zero: [SILENT]. Else write shipped/<date>.md: one plain sentence per PR (what changed for a user), link, repo.
Group by product (Nuri, emin.de, agents, other). AI-desk byline "compiled from GitHub by the emin.de AI desk".
Open a draft PR "shipped: <date>". Report the PR URL and PR count.
```

## R4. emin-de-repurpose-drafts

| Field | Value |
|---|---|
| Schedule | `0 12 * * *` (daily 12:00, after merges) |
| Skills | `post-bridge-account-bootstrap`, `humanizer`, `talk-like-nous` (style reference only), `nuri-illustration-generation` (only with budget OK) |
| Inputs | posts merged to main in the last 24h |
| Outputs | Post Bridge **drafts**: X thread, LinkedIn post, IG carousel text, Shorts script, Bluesky/Threads post; all links with UTM per CONTENT-MACHINE.md section 9.2 |
| Gates | Post Bridge MCP must be enabled by Emin (today `enabled: false`: routine stops and reports); readback `get_post` for every draft; AI-desk posts keep the AI label in derivatives |
| Human | Emin publishes (phase 1). Phase 2 auto-schedule only for shipped/explainer derivatives on X and Bluesky after Emin writes that rule |

Prompt:

```text
Find posts merged to main in the last 24h. For each, build platform derivatives per docs/CONTENT-MACHINE.md section 6.
Refresh list_social_accounts, resolve exact account IDs. create_post with is_draft true, use_queue false.
Read back each with get_post. Never publish or schedule. Report: post slug, draft IDs per platform, any account needing reconnect.
If the post-bridge MCP is not available: stop and report "Post Bridge not enabled".
```

## R5. emin-de-weekly-traffic-report (deterministic)

| Field | Value |
|---|---|
| Schedule | `0 8 * * 1` (Monday 08:00) |
| Skills | `nuri-traffic-data` (method), `xlsx` not needed |
| Inputs | PostHog HogQL API (personal API key), GSC API, Post Bridge analytics (read), Cloudflare logs if available |
| Outputs | `docs/reports/YYYY-WW.md` with fixed tables, draft PR or Telegram message |
| Gates | same query text every week (committed in `scripts/report-queries/`); no LLM-written numbers, the table is rendered by a script from API JSON; missing source = row says `no data (missing <cred>)` |
| Human | read-only report |

Deterministic HogQL (north star, committed as a file, executed by script):

```sql
-- weekly organic + AI-referred visitors who reached a product
SELECT toStartOfWeek(timestamp, 1) AS week,
       count(DISTINCT person_id) AS north_star
FROM events
WHERE event IN ('product_click', 'product_page_reached')
  AND properties.referrer_class IN ('organic', 'ai_assistant')
  AND timestamp >= now() - INTERVAL 8 WEEK
GROUP BY week ORDER BY week
```

```sql
-- AI-assistant sessions by source
SELECT properties.$referring_domain AS source, count(DISTINCT properties.$session_id) AS sessions
FROM events
WHERE event = '$pageview'
  AND properties.referrer_class = 'ai_assistant'
  AND timestamp >= now() - INTERVAL 7 DAY
GROUP BY source ORDER BY sessions DESC
```

Note: `referrer_class` is set at session start by the engine. If the session-level property is only on the first pageview, the script joins on `$session_id`; the final query is fixed in the PR that adds the script, then never edited without a changelog line.

Prompt:

```text
Run scripts/weekly-report.mjs (it calls PostHog HogQL, GSC and Post Bridge analytics and renders Markdown tables).
Do not compute or rephrase numbers yourself. If a credential is missing the script prints "no data"; keep that.
Commit docs/reports/<yyyy-ww>.md in a draft PR and send Emin the north-star line plus the PR link.
```

## R6. emin-de-gsc-gap-to-posts

| Field | Value |
|---|---|
| Schedule | `0 9 * * 1` (Monday 09:00, after R5) |
| Skills | `nuri-seo-loop` (method), `programmatic-seo`, `content-strategy` |
| Inputs | GSC `searchanalytics.query` dims `query,page`, 28d vs prior 28d |
| Outputs | `docs/seo/data/YYYY-WW/gsc.csv`, `gaps.md`, appended items in `docs/content/queue.md`, draft PR |
| Gates | no GSC credentials = stop; max 10 queue items per week; no query already in `state.json` |
| Human | Emin can reorder the queue in the PR |

Prompt:

```text
Pull GSC for emin.de (28d vs prior 28d). Classify: expand (pos 5-20, impressions > 50), new page (impressions, no page), brand (mentions Emin/Nuri).
Write gsc.csv and gaps.md. Add at most 10 items to docs/content/queue.md with format, category, target query, evidence row.
Open draft PR "seo: gap list <yyyy-ww>". If credentials missing: report and stop.
```

## R7. emin-de-aio-prompt-watch

| Field | Value |
|---|---|
| Schedule | `0 10 * * 3` (Wednesday 10:00) |
| Skills | `geobench-nuri` (method), `browser-automation` |
| Inputs | prompt list in `docs/aio/prompts.md` (start set in CONTENT-MACHINE.md section 9.5) |
| Outputs | `docs/aio/YYYY-WW.csv` (prompt, assistant, named yes/no, cited URL, verbatim answer excerpt), draft PR |
| Gates | answers copied verbatim; logged-out or Emin's own accounts only as Emin approves; no paid API calls without budget OK |
| Human | none |

Prompt:

```text
For each prompt in docs/aio/prompts.md, ask ChatGPT (search on), Perplexity, Gemini, Claude and Copilot.
Record whether the answer names Emin Mahrt, emin.de, Nuri or nuri.com, and which URLs it cites. Copy excerpts verbatim.
Compute named_rate per assistant with a script. Commit the CSV in a draft PR. Prompts where nobody names us go to gaps.md as AIO misses.
```

## R8. emin-de-monthly-seo-aio-audit

| Field | Value |
|---|---|
| Schedule | `0 9 1 * *` (1st of month 09:00) |
| Skills | `seo-audit`, `ai-seo`, `schema`, `agent-ready`, `link-verify-before-send` |
| Inputs | live emin.de, sitemap, llms.txt, last 4 weekly reports, isitagentready scan |
| Outputs | `docs/audits/YYYY-MM.md` + fix PR(s) limited to content and metadata; engine changes go to an issue for the sibling owner |
| Gates | `npm run verify:all` green on the fix PR; schema validates; every finding has a URL and evidence |
| Human | Emin reviews the audit PR |

Prompt:

```text
Audit emin.de: crawl sitemap, check titles, descriptions, canonical, hreflang, schema per page type, internal links (every post 2 clicks from a product page), llms.txt coverage of every category and entity hub, Markdown mirrors, broken links.
Run the isitagentready scan: curl -sS -X POST https://isitagentready.com/api/scan -H 'Content-Type: application/json' -d '{"url":"https://emin.de"}' and read level.
Compare to last month. Write docs/audits/<yyyy-mm>.md. Open a draft PR with content-level fixes only; open issues for engine-level fixes.
```

## R9. emin-de-stale-fact-check

| Field | Value |
|---|---|
| Schedule | `0 11 * * 4` (Thursday 11:00) |
| Skills | `grounded-citations`, `link-verify-before-send` |
| Inputs | posts with `format: compare` or `sources` older than 90 days |
| Outputs | draft PR updating "facts as of" date and changed rows, or an issue when a fact changed and needs Emin |
| Gates | changed Nuri facts always need Emin |
| Human | Emin for Nuri rows |

## R10. emin-de-weekly-media (podcast + short)

| Field | Value |
|---|---|
| Schedule | `0 14 * * 6` (Saturday 14:00) |
| Skills | `pocket-tts-local`, `media-toolkit`, `ai-video-generation`, `nuri-illustration-generation` |
| Inputs | the week's best post by `read_75` rate (from R5) |
| Outputs | 2-voice podcast mp3 (local TTS by default), transcript page, short script; video only with budget OK |
| Gates | AI voice label spoken in first 5 s and in description; IPTC AI metadata on images; budget cap |
| Human | Emin listens before merge |

## R11. emin-de-newsletter-draft

| Field | Value |
|---|---|
| Schedule | `0 17 * * 0` (Sunday 17:00) |
| Skills | `write-like-emin`, `outbound-email-campaigns` |
| Outputs | newsletter draft Markdown in a PR; nothing is sent |
| Human | Emin sends |

---

## Rollout order (proposal)

1. R5 weekly report (read-only, proves credentials).
2. R3 shipped changelog (zero-risk facts).
3. R2 transcript inbox.
4. R1 daily post.
5. R6 GSC gaps, R7 AIO watch.
6. R4 repurpose drafts (after Post Bridge is enabled).
7. R8 monthly audit, R9 stale facts.
8. R10 media, R11 newsletter (after budget decision).

Kill switch: one env flag `EMIN_DE_ROUTINES=off` checked at the start of every prompt; any routine with two red runs in a row pauses itself and reports.
