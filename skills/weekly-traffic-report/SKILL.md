---
name: weekly-traffic-report
description: 'Use for weekly/daily traffic. PostHog stats, 3 actions.'
license: MIT
---

# weekly-traffic-report

Pull traffic from PostHog with `plugins/traffic-report.mjs`, compare with the previous period, and end with three concrete actions.

## When to use

- Weekly review (default, 7 days).
- Daily check: `--days 1`.

## Inputs

Environment variables (never in the repo, never in chat logs):

- `POSTHOG_HOST` (e.g. `https://eu.posthog.com`)
- `POSTHOG_PROJECT_ID`
- `POSTHOG_PERSONAL_API_KEY` with **Query Read** scope only

Analytics settings live in `site.config.mjs` (`analytics.posthog`).

## Steps

1. Check env is set. If `node plugins/traffic-report.mjs` exits 2, report the missing variable names and stop. Do not guess numbers.
2. Run the current period:
   - Weekly: `node plugins/traffic-report.mjs`
   - Daily: `node plugins/traffic-report.mjs --days 1`
3. Load the previous report for comparison (same mode). If none exists, say "no baseline" instead of inventing deltas.
4. Compute deltas in code, not by eye: pageviews, uniques, per-language split, AI referrer visits.
5. Write the report:
   - Totals with week-over-week (or day-over-day) change in % and absolute.
   - Top 5 posts by pageviews, with change.
   - AI referrer share: visits from AI assistants (`chatgpt.com`, `perplexity.ai`, `claude.ai`, `gemini.google.com`, `copilot.microsoft.com`, ...) divided by all referred visits.
   - By language (from `site.config.mjs` locales).
   - 404s: from server or CDN logs if available; else state "404 data not available".
   - 3 actions, each one line, each tied to a number above (e.g. "Post X lost 40% after title change: revert title").
6. Save the report outside the public repo (private notes, dashboard, or a private repo). Name: `traffic-<yyyy>-W<ww>.md` or `traffic-<yyyy-mm-dd>.md`.
7. Publish numbers only if the site owner cleared them for publishing.

## Report shape

```markdown
# Traffic <period>
| Metric | This | Prev | Change |
| Pageviews | ... |
| Uniques | ... |
| AI referrer share | ... |

## Top 5 posts
## By language
## 404s
## Actions
1. ...
2. ...
3. ...
```

## Checks / Done

- [ ] Numbers come from the script output, not memory.
- [ ] Deltas computed against a stored previous report, or "no baseline" stated.
- [ ] Exactly 3 actions, each tied to a number.
- [ ] Report stored outside the public repo.
- [ ] No API key, project id or host token in any committed file or report.

## Pitfalls

- Committing `.env` or pasting the key into a report. Keys belong in the environment only.
- Reading one day of a weekly trend as a signal. Daily mode is for anomalies (outage, spike), not strategy.
- Counting bots and preview crawlers as readers. Note if PostHog bot filtering is off.
- AI referrers hide behind `direct` traffic when assistants strip the referrer. Treat AI share as a lower bound.
- Actions like "write more content". Every action names a page, a change and the number it should move.
