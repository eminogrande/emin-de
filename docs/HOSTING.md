# Hosting decision

**Decision: Cloudflare Workers + Static Assets, deployed by GitHub Actions on every push to `main`.** GitHub stays the single source of truth; every post is a Markdown file readable on github.com. Nobody deploys by hand.

## Options compared (evidence, 2026-10-06)

| Option | Link headers (RFC 8288) | `Accept: text/markdown` negotiation | problem+json vs Markdown 404 | Rate limit headers | Ops | Verdict |
| --- | --- | --- | --- | --- | --- | --- |
| A. Cloudflare Workers + Static Assets | Yes (Worker sets them) | Yes (Worker serves `<path>/index.md`, `Vary: Accept`) | Yes | Yes, enforced by the Workers Rate Limiting binding | No server, deploy from Action | **Chosen** |
| B. Node origin (`server.mjs`) on a VPS | Yes | Yes | Yes | Yes | A box to patch, TLS, uptime | Kept for local dev and as fallback |
| C. GitHub Pages | No: Pages has no custom response headers | No: one file per path, no negotiation | No: one 404 page for all paths | No | Zero | **Fails 100% agent readiness** |

Option C confirmed: GitHub Pages serves files only. It cannot add a `Link` header, cannot vary the body by `Accept`, and returns the same `404.html` for `/api/*` and page paths. Those are three scored checks (isitagentready `linkHeaders`, `markdownNegotiation`; is-agentic `json-error-responses`).

Local proof that A and B behave the same: `node scripts/verify-all.mjs` passes all 37 checks against both `node server.mjs` and `npx wrangler dev` (see PR description).

## What is prepared (not deployed)

- `wrangler.jsonc`: Worker `emin-de`, account `60aa4fd3b9c4c1c384a3234200f42672` (Emin@nuri.com's Account), assets from `dist/`, `run_worker_first: true`, rate limiter `API_RATE_LIMITER` (120 req / 60 s), custom domains `emin.de` and `www.emin.de`.
- `worker/index.mjs`: headers, negotiation, 404 bodies, robots.txt, and the same JSON API / MCP / x402 handlers as `server.mjs`.
- `.github/workflows/deploy.yml`: build + tests on every PR; deploy + smoke test + IndexNow ping on push to `main`.
- `.github/workflows/traffic-report.yml`: daily/weekly/monthly PostHog numbers (no LLM).
- `npx wrangler deploy --dry-run` bundles cleanly: 1.6 MB raw / 453 KB gzip Worker, 237 pages plus media as assets.

## Steps Emin must approve, in order

1. **GitHub secrets** (repo Settings, Secrets and variables, Actions):
   - `CLOUDFLARE_API_TOKEN`: custom token with *Account: Workers Scripts: Edit*, *Account: Account Settings: Read*, *Zone: Workers Routes: Edit* and *Zone: DNS: Edit* for `emin.de`.
   - `CLOUDFLARE_ACCOUNT_ID` = `60aa4fd3b9c4c1c384a3234200f42672`.
   - Optional for numbers: `POSTHOG_PROJECT_ID`, `POSTHOG_PERSONAL_API_KEY` (Query Read scope), `POSTHOG_HOST` (default `https://eu.posthog.com`), `TRAFFIC_WEBHOOK_URL`.
   - Create a GitHub environment named `production` (the deploy job uses it; add yourself as required reviewer if you want a manual gate).
2. **Add `emin.de` as a zone** in the Cloudflare account above (Free plan is enough). Cloudflare scans existing records; check them against the list below before continuing.
3. **Recreate DNS records in Cloudflare** before switching nameservers, so mail keeps working:

   | Type | Name | Content | Priority | Proxy |
   | --- | --- | --- | --- | --- |
   | MX | `emin.de` | `fwd1.porkbun.com` | 10 | DNS only |
   | MX | `emin.de` | `fwd2.porkbun.com` | 20 | DNS only |
   | TXT | `emin.de` | `v=spf1 include:_spf.porkbun.com ~all` | | DNS only |

   Do **not** recreate the old apex/`www` records pointing at the carrd redirect; the Worker custom domains create those.
4. **Switch nameservers at Porkbun** to the two Cloudflare nameservers shown in the dashboard. This ends the current `emin.de` 302 to `emin.carrd.co`. Propagation: minutes to 24 h.
5. **Merge the PR** to `main`. The Action builds, tests, deploys and smoke-tests `https://emin.de/health`. The Worker attaches `emin.de` and `www.emin.de` as custom domains.
6. **Verify email forwarding still works** after the nameserver move: send a test mail to an `@emin.de` address from an outside account, and confirm it arrives at the forwarding target. Porkbun forwarding depends only on the MX and SPF records above; if mail bounces, compare the records in Cloudflare with Porkbun's email forwarding page.
7. **Cloudflare dashboard checks**: Security, Bots: leave *Block AI bots* **off** and *Managed robots.txt* **off** (both override the repo's robots.txt and block the AI crawlers this site invites). Turn on DNSSEC (zone, DNS, Settings) and add the DS record at Porkbun; isitagentready's DNS-AID check needs it.
8. **Run the public scanners against the live URL** (isitagentready.com, PageSpeed Insights mobile + desktop, is-agentic.com, Circle Seller Readiness) and archive the reports. Local Lighthouse scores are not a substitute.

## Rollback

DNS: point the nameservers back to Porkbun's (`curitiba`, `fortaleza`, `maceio`, `salvador` `.ns.porkbun.com`) and the old carrd redirect returns. Code: `npx wrangler rollback` to the previous Worker version, or revert the commit on `main`.
