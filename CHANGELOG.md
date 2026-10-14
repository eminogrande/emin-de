# Changelog

## 2026-10-14 — [RELEASE] v0.1.1 — hermes-agent for emino

State of `main` at `f5a19928`. emin.de runs as the Cloudflare Worker `emin-de` and auto-publishes from `main` through `.github/workflows/deploy.yml`. First tagged release. Docs only in this entry, no code changed.

- `f5a19928` Post: How to make a Decathlon Riverside 500 E faster.
- `687b134f` Favicon: 🤔 on every surface, with `favicon.ico`, `apple-touch-icon.png`, `icon-[size].png` and `site.webmanifest` routes, cache-busted in `Base.astro`.
- `78dee553` OG: the share title is the post title; image size and alt are set; the HTML `<title>` stays searchable.
- `6dcd9361` OG: every post share card shows title and URL; photo posts use the photo as background (`src/lib/og.mjs`).
- `1d687fd0` Posts: proverb titles for the 13 photo notes, with source links.
- `f76edb2f` Posts: poetic titles for the 13 photo notes (replaced by `1d687fd0`).
- `c6f4990f` Posts: photo notes v2 with verified-quote Basically lines and 181 annotated crops; adds `plugins/annotate_photo.py`.
- `ee846d97` Posts: 13 long-form photo notes by the AI Desk, linked from `/photos`.
- README: added Logs, Status, User flow, Components, API / Endpoints and Run sections (docs PR `docs/repo-hygiene-2026-10-14`).

## 2026-10-13 (CI auto-publish, photos, contact)

- `556063c5` Photos: add mountain field.
- `a903d675` Photos: add window and stairwell (film).
- `c6cad0b4` Photos: add portrait.
- `a93aa95c` Photos: add twin domes.
- `11bc5931` Photos: add harbour sunset.
- `dbd3ddf2` CI: deploy with Wrangler 4, which reads `wrangler.jsonc`.
- `fbe50a8b` CI: install `xmllint` for the feed test.
- `19e72383` Merge #2: blog engine, design, content and CI auto-publish land on `main`.
- `c6f94f06` Photos: max 2 per row, bigger on desktop, 1920w variants.
- `ac946e63` CI: voice gate. Changed native posts must pass `plugins/check_draft.py` before deploy.
- `0782702d` Post: Can sound do what quantum particles do?
- `3a17c3d7` Content: privacy and free-speech motto replaces the footer slogan; wordmark dots in the accent colour.
- `c76ecc3a` Photos: remove 2 photos on request.
- `8bb88cc1` Content: bio, portrait and 9 photos; contact emin@emin.de, X, LinkedIn, Signal. No address, no phone.
- `19e09440` Favicon 🤔 (Twemoji CC-BY), wordmark `🤔.tk / emin.de`; hosting moved to Emin's private Cloudflare account (`wrangler.jsonc`).

## 2026-10-06 (long-read layout, article format refresh)

- `3ef92e79` `eac6e953` `0bdf1d75` `0bbcbc8a` `1dcd908f` `85020f48` `e4954c01` `da0a41b7` `389d2d1e` `99c761ca` Content: refresh batches 0 to 9 into article format (H2 sections, TL;DR, Basically lines), body text unchanged.
- `f23496d1` Style: Basically label uses the same face, size, weight and colour as the section heading.
- `5d0f4231` Style: article section headings at text size, bold.
- `2e46af1b` Style: text 19px, headline back to 32-52px.
- `1a355976` Style: mobile nav row gap, hero top space, line-height 1.6.
- `2869ba6d` Style: larger body text and headline, still exactly two sizes.
- `257c8292` Nuri-style long-read layout: centred hero, section bands split on H2, sticky Basically aside; exactly two font sizes site-wide; provenance becomes metadata only; 193 voice-v1 rewrites imported.

## 2026-10-06 (magazine redesign, emin.de as the original, free speech)

A bright personal magazine instead of a docs page, emin.de as the canonical home of every post, and free speech as the site's core rule.

- **Free speech is the core principle.** Nothing is hidden for its topic, its words, its provenance or a pending review. The provenance-based `noindex` policy (`indexing.noindexProvenance`) is gone; all 197 posts are indexable and in the sitemap, feeds and `llms.txt`. Only `draft: true`, written by the author, hides a post. A test fails if any content post is `noindex`. Why: Emin is a journalist and the publisher of proud magazine; "never ever again censor free speech".
- `/principles` and `/de/principles` (with Markdown mirrors and hreflang), a footer line "Free speech. Nothing here is censored. AI help is labelled, the words are mine.", and `publishingPrinciples` in Organization and BlogPosting schema.
- Publisher identity in `site.config.mjs` (`publisher`: journalist, publisher of proud magazine). Person schema: `jobTitle` "Journalist, publisher", `worksFor` proud magazine, `knowsAbout` journalism, `sameAs` GitHub, LinkedIn, X, Medium, Substack and proud.de (which 302-redirects to the Issuu archive).
- The 7 previously quarantined posts (Zanzibar land and solar guides, JustMusic Berlin, the flywheel and Lightning/Nostr pieces) are back, imported with their original text.
- **emin.de is the original.** Every imported post now has its canonical on emin.de. The first-published URL moved to `original_url` (189 files, front matter only, bodies untouched; `scripts/migrate-canonical.mjs`, idempotent). It appears in JSON-LD as `sameAs`/`isBasedOn`, in the Markdown mirror and as "First published on Medium/Substack/emino.app, <date>" under each post. `datePublished` stays the original date; `dateModified` is the rewrite date. The loader rejects any canonical off this origin.
- Sitemap lists every indexable post with `lastmod` and reciprocal hreflang where translations exist.
- Redirects: `redirects` map in `site.config.mjs` plus every old emino.app slug, generated into `src/generated/redirects.json` (served as 301 by the Worker and the Node origin), `public/_redirects`, and `docs/REDIRECTS-emino-app.md` (every emino.app URL to emin.de URL pair, plus the shared/ambiguous ones that need a decision).
- robots.txt adds `Applebot-Extended` to the welcomed crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, Google-Extended, Googlebot, Bingbot, PerplexityBot, ClaudeBot, CCBot and others).
- BlogPosting: author is a full Person with `sameAs`; `speakable` from the TL;DR (or headline + dek); BreadcrumbList kept.
- `verification: { google, bing }` slots in `site.config.mjs`; a meta tag is emitted only when filled.
- **Design.** Newsreader display serif, self-hosted from `@fontsource-variable/newsreader` (no third-party font request), system sans for UI. Warm paper `#FAF7F0`, ink `#141414`, one accent (`#D9481C`, darkened to `#B93C14` for text at 5.3:1). Masthead with a large wordmark; hero `clamp(3rem, 7vw, 6.5rem)`; lead story with a 3:2 cover; 3-column image grid; theme rows (Nuri & Bitcoin, Agents & AI, Building, Science, Culture); compact "More" list. Hairline rules, no boxed cards. Article body in serif at 1.2-1.3rem, line-height 1.6, ~68 characters per line, with a drop cap on prose-first posts. Dates read "16 September 2026" / "16. September 2026" with reading time. Every text is at least 17px (tested). Mobile: single column at 700px and below, no horizontal scroll.
- **Covers.** Each post's `image`/`cover`, or else the first image in its media folder, is cropped to 3:2 WebP at 480/960/1440px (`scripts/lib/covers.mjs`, attention-based crop). Without an image, a typographic SVG cover is generated at build time (no paid API, no network). 174 photo covers, 23 generated.
- **Photos.** `/photos` gallery from `public/photos/*.jpg|webp` with captions from `public/photos/photos.json` (schema in `photos.schema.json`, guide in `docs/PHOTOS.md`). A portrait slot on the home page and `/about` reads `public/photos/portrait.(jpg|webp)`; until it exists, a monogram fallback is shown (hidden on phones).
- **AI disclosure.** One small provenance badge per post (human-written / human + AI / AI-written) and one explainer line in the footer and on `/about`. The long "AI-written, human-supervised: not yet reviewed" sentence no longer repeats on cards; it stays on the post page footer, in the Markdown mirror and in schema (`creativeWorkStatus`), unchanged.
- **Bug fixes** (display only, bodies untouched): "Untitled" titles fall back to the first H1, or to "Photo, 6 January 2026"; entities decoded once (including the broken `&x27;`); URLs, `[image: ...]`, pasted front matter and blockquote markers stripped from excerpts; dangling colons and full stops trimmed from titles (abbreviations such as "A.M." kept); a paragraph that is only a YouTube/Vimeo URL renders as "Watch the video on YouTube" (same href); "supervised byEmin" spacing.
- `npm run import:staging -- <dir> [--dry-run]`: re-runnable import of posts and media (also from a `quarantine/` folder). It never drops or hides a post, removes `noindex`/`index`/`quarantine` keys, moves external canonicals to `original_url`, refuses to change a body, then runs the content validator and the word-preservation check. The Emin-voice rewrites are not imported yet.
- Tests: 26 engine tests (new: original/canonical, schema, free speech, import policy, redirects, robots, design gates, display cleanup). `scripts/screens.mjs` takes 1440px and 390px full-page screenshots with Playwright.

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
