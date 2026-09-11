# Changelog

## 2026-09-11

Initial public scaffold.

- Content architecture: `src/content/articles.mjs` as the single source for HTML, Markdown mirrors, sitemap, `llms.txt`, `llms-full.txt`, the JSON API, MCP tool output and the x402 corpus. Why: hand-maintained parallel surfaces drift, and every new scanner check would otherwise be a multi-file diff.
- First article: *What agent ready actually means*, 1573 words, seven sections, each with a standalone `Basically,` takeaway, a scanner comparison table and real RFC sources.
- Flagship `/agent-ready` page: 10 FAQ entries with FAQPage schema, a HowTo, and a table of live machine surfaces that can be fetched as proof rather than claimed.
- Pages: home, posts index, article route, `/agent-ready`, `/developers`, `/about`, `/contact`, `/privacy`, each with a Markdown mirror.
- Entity layer: Organization with knowsAbout, WebSite with SearchAction, Person with sameAs, BlogPosting plus BreadcrumbList per article.
- `llms.txt` written with Markdown links only. Bare URLs fail the Lighthouse `llms-txt` audit, and a present-but-invalid file scores worse than no file at all.
