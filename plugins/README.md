# Plugins

Code the skills in `skills/` run. Every tool is deterministic (same input, same output), reads site identity from `site.config.mjs`, and keeps secrets in environment variables only.

| Tool | Run | What it does |
| --- | --- | --- |
| `check_draft.py` | `python3 plugins/check_draft.py DRAFT.md [TRANSCRIPT.txt]` | Mechanical gate: TL;DR present, one Basically line per H2 (max 140 chars), no em dashes, no banned AI-isms, and with a transcript every quoted phrase must be verbatim in it. |
| `traffic-report.mjs` | `npm run traffic -- --days 7` | PostHog HogQL report: pageviews, visitors, top paths, referrers, AI-assistant referrals, languages, change vs previous period. Markdown table or `--json`. Optional `--webhook URL`. |
| `indexnow.mjs` | `npm run indexnow -- --since <git-ref>` | Pings IndexNow for posts changed since a commit. Key file lives in `public/<key>.txt`. `--dry-run` prints only. |
| `import_substack.py` | `python3 plugins/import_substack.py https://NAME.substack.com` | Imports public Substack posts as Markdown with original date and canonical URL. Never overwrites. Needs `pip install markdownify`. |

Environment for the traffic report: `POSTHOG_HOST` (default `https://eu.posthog.com`), `POSTHOG_PROJECT_ID`, `POSTHOG_PERSONAL_API_KEY` (Query Read scope only).
