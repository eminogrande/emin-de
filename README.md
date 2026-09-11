# emin.de

Long-form engineering writing by Emin Mahrt, built so that people and AI agents can both read it properly.

The site is the worked example of its own flagship article: every machine-readable surface an agent-readiness scanner looks for is implemented here and linked from [/agent-ready](https://emin.de/agent-ready).

## Why this repo is public

Most writing about agent readiness is a checklist with no implementation behind it. This is the implementation. If a claim is made on the site, the code producing it is in this repo.

## Architecture

```
src/content/articles.mjs     one article module, the single source of truth
src/content/pages.mjs        Markdown mirrors for non-article pages
src/lib/site.mjs             identity, URLs, discovery links, entity schema
src/pages/                   Astro routes: HTML pages + machine endpoints
server.mjs                   Node origin server: headers a static host cannot do
scripts/verify-*.mjs         gates that must pass before a deploy
```

The rule that makes the rest work: **every surface is generated from one content source.** HTML, the Markdown mirror, the JSON API, the MCP tool output, the sitemap, `llms.txt` and `llms-full.txt` all read from `src/content/articles.mjs`. They cannot drift, and a new requirement costs one generator instead of a seven-file diff.

## Why a Node server and not pure static hosting

Two agent-readiness requirements are response behaviour, not files, and no static host can provide them:

1. **RFC 8288 `Link` headers** on HTML responses, pointing at the machine surface.
2. **`Accept: text/markdown` negotiation** on normal page URLs, with `Vary: Accept` so caches keep the representations apart.

Everything else is files. `server.mjs` exists for those two, plus path-aware error bodies (`application/problem+json` on API paths, Markdown on page paths) and real rate limiting.

## Machine-readable surfaces

| Surface | Purpose |
| --- | --- |
| `/llms.txt` | Product definition plus every important page as a Markdown link |
| `/llms-full.txt` | Every article's complete text in one fetch |
| `/openapi.json` | Typed schemas, unique operationIds, error responses |
| `/auth.md` | Public reads need no credentials; the corpus endpoint uses x402 |
| `/api/articles` | Unauthenticated JSON list |
| `/api/articles/{slug}` | One article including full Markdown |
| `/mcp` | Streamable HTTP MCP server, five read-only tools |
| `/api/v1/corpus` | Paid bulk access, real x402 402 challenge when unpaid |
| `/.well-known/*` | ARD manifest, MCP card, agent card, agent skills, API catalog, WebMCP |
| `<any-page>/index.md` | Markdown mirror of that page |

## Local development

```bash
npm install
npm run dev                  # Astro dev server
npm run build                # static output into dist/
npm start                    # serve dist/ through the origin server on :4321
npm run verify:all           # every gate against a running server
```

## Honesty rules in this repo

These are enforced in review, not just aspirational:

- No declared capability without an implementation behind it. A tool in the MCP card that the server does not answer is a lie an agent will act on.
- No metadata claiming a limit, a protocol or an endpoint that is not real. Discovery-only support is labelled discovery-only.
- No fabricated numbers, dates, studies or quotes in an article. If it is in here, there is a source or a run behind it.
- No prompt-injection lines asking models to cite the site. Measured effect is nothing, downside is real.

## Licence

Article text: CC BY 4.0. Code: MIT. Quote, translate and train on the writing with attribution to emin.de.
