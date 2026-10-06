# LEARNINGS (append-only)

This file is the system's whole memory. There is no hidden state, no vector store, no model memory.
Scripts append below the line. Nobody edits or deletes old lines; corrections are new lines.

## Rules (changed only by Emin or in an explicit monthly review, with date)

1. Every number comes from one query. The query is listed in the linked report. No query, no number.
2. Not connected means no number. Never estimate, never fill a gap with a guess.
3. Rankings move slowly. Judge a page change after 4 weeks, not after 4 days.
4. Paid calls (AI-visibility engines, any API with a bill) stay OFF until Emin says OK.
5. Nothing goes live (merge, deploy, cron, env, secrets) without Emin's OK.
6. One observation per line: date, number, source link, and if useful one next step.
7. A rule changes only when 3 or more dated observations below point the same way.

Rule changes log:
- 2026-10-06: rules 1-7 proposed in the growth-loop PR; awaiting Emin review.

---

## Observations (append below, newest last)

- 2026-10-06: baseline. https://emin.de answers HTTP 302 to https://emin.carrd.co/; sitemap 0 URLs, llms.txt 0 posts. Nothing can rank until the site serves its own host. Source: [growth/reports/2026-10-06.md](reports/2026-10-06.md)
- 2026-10-06: not connected: posthog, gsc, bing, cloudflare. No traffic numbers exist yet; every traffic claim waits for these. Source: [growth/reports/2026-10-06.md](reports/2026-10-06.md)
- 2026-10-06: keyword run 2026-W41: 110 gap clusters vs 190 posts; top 3: "self custody" (en, 12 hits), "self custody + wallet" (en, 8 hits), "x402" (en, 6 hits). EN "self custody" has only a DE post: translate first. Source: [growth/keywords/2026-W41.md](keywords/2026-W41.md)
