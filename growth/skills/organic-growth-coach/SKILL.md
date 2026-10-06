---
name: organic-growth-coach
description: "Use when measuring and growing a site's organic and AI-search traffic daily. Query-traced numbers, weekly keyword gaps, monthly audit."
version: 0.1.0
license: MIT
metadata:
  hermes:
    tags: [seo, geo, aio, search-console, posthog, keyword-research, indexnow, learning-log]
    related_skills: [nuri-seo-loop, nuri-traffic-data, llmgateway-seo-teardown, ai-seo, seo-audit, marketing-loops]
---

# Organic Growth Coach

Generic loop for any site (first user: emin.de, next: nuri.com). Reference implementation: `growth/` in github.com/eminogrande/emin-de. Copy the folder, change `SITE`, `seeds.json`, `prompts.yml`.

## The one rule

Every number comes from one query, and the query is printed under the number. No credential = `not connected`, never an estimate. The scripts never call an LLM; the agent only runs them, reads the output and proposes actions.

## Files

| File | Role |
|---|---|
| `growth/daily.mjs` | Daily measurement: public probe + PostHog + GSC + Bing + Cloudflare. JSON + Markdown report. |
| `growth/keywords.mjs` | Weekly free keyword research: Google Autocomplete DE+EN, stem clusters, map to posts, gaps. |
| `growth/ai-visibility.mjs` | Weekly: monitored prompts against AI search APIs. PAID, every engine default off. |
| `growth/LEARNINGS.md` | Append-only learning log. Rules on top change only by owner or monthly review. |
| `growth/COACH.md` | Teaching guide for the owner. |
| `growth/CRON.md` | Proposed schedule. Owner approves before any cron exists. |

## Daily (5 min agent, 10 min owner)

1. `node growth/daily.mjs`. Never edit its output by hand.
2. Read the Sources table. Any `error` = fix credentials or report; do not rerun in a loop.
3. Pick at most one moved number. Map it with the table:
   - status not 200 / own host 0: hosting incident, tell owner now.
   - impressions up, CTR low: title/description rewrite proposal.
   - position 5-20 with impressions: expand that post (table, FAQ, sources).
   - AI referrals up: which page; propose a sibling.
   - clicks down more than 30 percent week over week: stop new content, run Monthly audit early.
4. The script appends 1-3 dated, source-linked lines to `LEARNINGS.md`. Agent may add one more line, same format, only with a source link.
5. Action = issue for the owner. No direct build without the owner's go.

## Weekly (Monday)

1. `node growth/keywords.mjs` (about 3 min, 1 request/second, free).
2. `node growth/ai-visibility.mjs` (does nothing until an engine is enabled with owner OK).
3. From `growth/keywords/<week>.md` take the top 10 gaps. Prefer in order: translation of an existing post, then GSC queries with impressions and no post, then autocomplete clusters with 3 or more hits.
4. Propose at most 3 posts: title, cluster, format, category, target query. Owner picks.

## Monthly (1st)

1. Load `seo-audit` and `ai-seo`. Check: robots AI bots, sitemap vs published posts, llms.txt vs posts, canonical and hreflang on 5 random posts, schema validity.
2. 4-week readback: every post shipped from a gap: impressions/clicks/position at ship, +4w.
3. Review `LEARNINGS.md`: a rule changes only when 3 or more observations agree. Date the change.
4. Write `growth/reports/audit-<YYYY-MM>.md`. Draft PR.

## Guardrails

- No automated `site:` queries or SERP scraping: Google spam policies call automated queries machine-generated traffic. Index counts come from Search Console.
- Autocomplete: polite rate (1/s), small seed set, weekly. It gives a relative signal, not volume.
- Paid APIs off by default; each one needs the owner's OK and a cap.
- No merge, deploy, cron, env or secret change without the owner's OK.

## Credentials (where they go)

| Source | Credential | Location |
|---|---|---|
| Search Console | service-account JSON with read access on the property | `~/.hermes/secrets/gsc.json` or `GSC_KEY_FILE`; property via `GSC_PROPERTY` (default `sc-domain:<host>`) |
| PostHog | personal API key, Query Read scope; project id | `POSTHOG_PERSONAL_API_KEY`, `POSTHOG_PROJECT_ID`, `POSTHOG_HOST` (EU default) |
| Bing Webmaster | API key | `BING_WEBMASTER_API_KEY` |
| Cloudflare Web Analytics | API token with Account Analytics Read, account id, site tag | `CLOUDFLARE_API_TOKEN`, `CF_ACCOUNT_ID`, `CF_WEB_ANALYTICS_SITE_TAG` |
| AI visibility | OpenAI / Perplexity / Gemini keys + `enabled: true` | env + `growth/ai-visibility.config.json` |

## Pitfalls

- A redirecting domain (e.g. to carrd) returns 200 after redirects. The probe checks the final host, not only the status.
- GSC data lags 2-3 days; the scripts query the 28 days ending 3 days ago.
- Matching gaps to posts must be per language; a DE post does not cover an EN query. Report it as "translate".
- Autocomplete drifts (e.g. "self custody movie"). Use `exclude` in `seeds.json`, not manual edits of the report.
