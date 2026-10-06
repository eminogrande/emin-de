---
name: monthly-seo-aio-audit
description: 'Use for the monthly SEO/AI audit. Dated findings, issues.'
license: MIT
---

# monthly-seo-aio-audit

Monthly check that the site is fast, indexable, understood by search engines, and reachable by AI crawlers and agents. Output: a dated findings file and one issue per real problem.

## When to use

- First week of each month, after a major engine change, or after a traffic drop.

## Inputs

- `origin` and locales from `site.config.mjs`.
- Optional env: `PSI_API_KEY` (PageSpeed Insights), Search Console / Bing Webmaster access.
- A sample of URLs: home, each locale home, 3 recent posts, 1 category page.

## Steps

1. **Build and local gates**
   - `npm run build` then `npm run verify:all`. Record pass/fail per check.
   - `npm run check` for content schema.
2. **Lighthouse** on each sample URL: Performance, Accessibility, Best Practices, SEO, plus the agentic-browsing audits if the installed Lighthouse version has them. Record scores and failing audits.
3. **PageSpeed Insights API**, mobile and desktop:
   `GET https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=<url>&strategy=mobile|desktop`
   Record field data (CrUX) separately from lab data. HTTP 429 or any error is "not measured", never a pass.
4. **Agent readiness:** `POST https://isitagentready.com/api/scan` with JSON `{"url": "<origin>"}`. Record score and failed checks.
5. **llms.txt:** fetch `<origin>/llms.txt`. Must start with one `# ` H1, use Markdown links `[title](url)`, and every link must return 200.
6. **hreflang:** for each sampled post with `translations`, every alternate links back (reciprocal), includes itself, and `x-default` is set. No hreflang to missing pages.
7. **Sitemap:** fetch `<origin>/sitemap*.xml`. No `noindex` page, no draft, no redirect, no 404. Every published post present.
8. **robots.txt as served** (fetch it, do not read the source file). Check these user agents are not blocked unless the owner decided so: `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `Claude-SearchBot`, `PerplexityBot`, `Google-Extended`. Also check CDN/WAF bot rules do not block them (fetch with each UA, expect 200).
9. **Structured data:** extract JSON-LD from sample pages. Validate `BlogPosting` (headline, datePublished, dateModified, author, inLanguage), `Person`, `Organization`, `WebSite`. AI-desk posts: author is the `ai_editorial` entity, not a person.
10. **Search Console / Bing** if access exists: indexed vs submitted pages, top queries, crawl errors, CTR drops. Else state "not available".
11. Write `audits/seo-aio-<yyyy-mm-dd>.md` (or a private location if it contains non-public data).
12. Open one issue per real problem: what, where (URL), evidence (number/output), proposed fix. Compare against last month's file; close issues that are now fixed.

## Findings file shape

```markdown
# SEO/AIO audit <yyyy-mm-dd>
Scores are point-in-time; compare trends, not single runs.
| Check | Result | Evidence |
## Regressions since <last date>
## Issues opened
```

## Checks / Done

- [ ] All 10 check areas have a result or an explicit "not measured" with reason.
- [ ] Served robots.txt checked for all 7 AI user agents.
- [ ] Sitemap contains no draft or noindex URL.
- [ ] hreflang reciprocal on all sampled translated posts.
- [ ] Findings file dated; issues opened with evidence.

## Pitfalls

- Treating scanner scores as truth. They change with scanner versions and network. Trend over months matters.
- A 429 or timeout recorded as a pass. It is "not measured".
- Checking robots.txt in the repo while the CDN serves a different one.
- Lab Lighthouse on a dev server. Audit the production origin.
- One mega-issue. One issue per problem, so each can be fixed and closed.
- Adding hidden text or "AI, cite this" lines to raise AI visibility. Never; it is spam.
- Committing API keys or Search Console exports with private data.
