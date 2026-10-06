# Changelog

## 2026-10-06

Markdown-first blog engine, usable as a template.

- Content moved from `src/content/articles.mjs` to Markdown files under `content/posts/<lang>/<yyyy>/<slug>.md`. Why: the owner wants every post public and readable on GitHub, and a Markdown file is the format both people and models already read.
- One config file, `site.config.mjs`, holds all site identity (origin, authors, locales, categories, formats, analytics, Cloudflare account). Why: emin.de is the template for further sites; forking should mean editing one file plus `content/`.
- One loader validates front matter and renders every surface from the same parse: HTML, `index.md` mirrors, JSON API, MCP, RSS/Atom/JSON Feed per language, sitemap with hreflang, `llms.txt`, `llms-full.txt`, OG cards. Invalid content fails the build.
- Listing routes per category, format, author, year archive, `/talks` (VideoObject schema) and `/changelog`, per language. A language route exists only where a post in that language exists; translations must link back.
- Authors registry with three honest types: `human`, `ai_editorial` (openly labelled AI desk, Organization in schema, no bio or photo) and `guest` (credited by `original_author`). The build rejects AI text under a human byline.
- Imported 3 Substack posts (canonical to Substack) and 186 staged posts from emino.app and Medium (canonical to the originals). `mixed` and `unknown` provenance render `noindex` until reviewed. Raw HTML in imports is sanitised, Hugo shortcodes become links, and a text-preservation test proves no word is dropped.
- Hosting decided: Cloudflare Workers + Static Assets, deployed by a GitHub Action on push to `main` (prepared, not deployed). GitHub Pages rejected: no response headers, no content negotiation.
- Analytics hooks, off by default: PostHog in `cookieless_mode: "always"`, GA4 only after explicit opt-in. Daily/weekly/monthly HogQL traffic report as a GitHub Action, no LLM.
- IndexNow ping for changed posts on deploy; key file in `public/`.
- `skills/` (transcript-to-post, daily AI-desk post, repurpose-to-social, weekly traffic report, monthly SEO/AIO audit) and `plugins/` (draft checker, traffic report, IndexNow, Substack import).
- Discovery documents that were advertised but missing (`/openapi.json`, `/auth.md`, `/.well-known/api-catalog`, `/.well-known/mcp/server-card.json`) are now generated from the code that serves them; links to never-implemented documents were removed from the Link header.
- Removed the stub `/.well-known/oauth-protected-resource/[...path]` route: it broke `astro build` on `main` and the site has no OAuth.

## 2026-09-11

Initial public scaffold.

- Content architecture: `src/content/articles.mjs` as the single source for HTML, Markdown mirrors, sitemap, `llms.txt`, `llms-full.txt`, the JSON API, MCP tool output and the x402 corpus. Why: hand-maintained parallel surfaces drift, and every new scanner check would otherwise be a multi-file diff.
- First article: *What agent ready actually means*, 1573 words, seven sections, each with a standalone `Basically,` takeaway, a scanner comparison table and real RFC sources.
- Flagship `/agent-ready` page: 10 FAQ entries with FAQPage schema, a HowTo, and a table of live machine surfaces that can be fetched as proof rather than claimed.
- Pages: home, posts index, article route, `/agent-ready`, `/developers`, `/about`, `/contact`, `/privacy`, each with a Markdown mirror.
- Entity layer: Organization with knowsAbout, WebSite with SearchAction, Person with sameAs, BlogPosting plus BreadcrumbList per article.
- `llms.txt` written with Markdown links only. Bare URLs fail the Lighthouse `llms-txt` audit, and a present-but-invalid file scores worse than no file at all.
