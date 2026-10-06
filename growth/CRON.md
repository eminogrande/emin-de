# Proposed schedule (NOT active)

Status: proposal for Emin's approval. No cron job, GitHub Action schedule or Hermes cron exists for this.
Nothing here runs until Emin says OK. Paid steps stay off even after the schedule is approved.

| When (Europe/Berlin) | Command | Cost | Writes |
|---|---|---|---|
| Daily 07:00 | `node growth/daily.mjs` | free | `growth/data/daily/<date>.json`, `growth/reports/<date>.md`, 1-3 lines in `LEARNINGS.md` |
| Monday 07:15 | `node growth/keywords.mjs` | free (Google Autocomplete, 160 requests at 1/s, about 3 min) | `growth/keywords/<YYYY-Www>.md`, raw `growth/data/keywords/<YYYY-Www>.json` |
| Monday 07:30 | `node growth/ai-visibility.mjs` | free while all engines are off; PAID per engine once enabled (needs Emin OK) | `growth/reports/ai-visibility-<YYYY-Www>.md` |
| 1st of month 08:00 | Monthly audit (skill `organic-growth-coach`, section Monthly) | free | `growth/reports/audit-<YYYY-MM>.md`, rule review in `LEARNINGS.md` |

## Option A: Hermes cron (runs on Emin's Mac, has ~/.hermes/secrets/gsc.json)

Proposed, not created:

```
hermes cron add --name emin-de-growth-daily     --schedule "0 7 * * *" --tz Europe/Berlin --workdir ~/Developer/emin-de \
  --prompt "Run: node growth/daily.mjs. Commit growth/data growth/reports growth/LEARNINGS.md on branch growth/data. Report the Sources table only."
hermes cron add --name emin-de-growth-weekly    --schedule "15 7 * * 1" --tz Europe/Berlin --workdir ~/Developer/emin-de \
  --prompt "Run: node growth/keywords.mjs && node growth/ai-visibility.mjs. Commit outputs. Report the top 10 gaps."
hermes cron add --name emin-de-growth-monthly   --schedule "0 8 1 * *" --tz Europe/Berlin --workdir ~/Developer/emin-de \
  --prompt "Load skill organic-growth-coach. Run the Monthly audit. Draft PR only."
```

Check exact flags with `hermes cron --help` before creating; the agent runs only the deterministic scripts, it does not write numbers.

## Option B: GitHub Actions (repo secrets instead of local files)

```yaml
on:
  schedule:
    - cron: '0 5 * * *'   # 07:00 Berlin in summer (CEST), 06:00 in winter: GitHub cron is UTC only
    - cron: '15 5 * * 1'
```

GitHub cron is UTC, so Berlin time drifts by one hour with daylight saving. Secrets needed: `POSTHOG_PROJECT_ID`, `POSTHOG_PERSONAL_API_KEY`, `GSC_SERVICE_ACCOUNT_JSON` (written to a temp file, `GSC_KEY_FILE`), optional `BING_WEBMASTER_API_KEY`, `CLOUDFLARE_API_TOKEN`, `CF_ACCOUNT_ID`, `CF_WEB_ANALYTICS_SITE_TAG`. The engine branch already has a `traffic-report.yml` stub for PostHog; merge them after both PRs land, do not run two daily jobs.

## What Emin approves

1. Option A or B.
2. The daily job may commit to a data branch (`growth/data`) without review: yes or no.
3. AI-visibility engines: stay off (default) or enable one, with a monthly cap.
