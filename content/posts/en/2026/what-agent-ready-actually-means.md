---
title: "What agent ready actually means"
seo_title: "What Agent Ready Actually Means | emin.de"
description: "Four public scanners now grade whether AI agents can read your site. Here is what each one measures, which checks a static host can never pass, and the exact files and headers that move the score."
date: 2026-09-11
updated: 2026-09-11
lang: en
translations: {}
category: agents-ai
format: explainer
author: emin
provenance: written
ai_assisted: unknown
reviewed_by_human: true
tags: ["agent-readiness","llms.txt","MCP","SEO","AI crawlers"]
source_links:
  - { title: "RFC 8288: Web Linking", url: "https://www.rfc-editor.org/rfc/rfc8288.html", note: "The Link header format the discovery checks expect." }
  - { title: "RFC 9457: Problem Details for HTTP APIs", url: "https://www.rfc-editor.org/rfc/rfc9457.html", note: "The application/problem+json error shape required on API paths." }
  - { title: "RFC 9745: The Deprecation HTTP Header Field", url: "https://www.rfc-editor.org/rfc/rfc9745.html" }
  - { title: "RFC 8594: The Sunset HTTP Header Field", url: "https://www.rfc-editor.org/rfc/rfc8594.html" }
  - { title: "isitagentready.com", url: "https://isitagentready.com", note: "Publishes its own per-check specs under /.well-known/agent-skills/." }
  - { title: "Model Context Protocol specification", url: "https://modelcontextprotocol.io", note: "Streamable HTTP transport and the initialize handshake." }
  - { title: "llms.txt proposal", url: "https://llmstxt.org", note: "The file format, including why entries must be Markdown links." }
tldr:
  - "Agent readiness is not a plugin."
  - "It is a set of HTTP behaviours: RFC 8288 Link headers, Accept-based Markdown negotiation, well-known discovery documents, and honest machine-readable metadata."
  - "Four public scanners grade it, and they disagree."
  - "A pure static host can never pass the header checks, no matter how many files you add."
basically:
  why-anyone-started-scoring-this: "A search crawler wants to rank your page. An agent wants to skip it and call your API."
  the-four-scanners-and-what-each-one-actually-measures: "Four scanners, four different questions. A single agent-ready score does not exist."
  why-a-static-host-caps-your-score-permanently: "Link headers and Markdown negotiation are response behaviour. No static host can fake them."
  which-files-actually-carry-weight: "Your llms.txt first paragraph is the sentence assistants will quote. Do not waste it."
  the-part-where-you-are-tempted-to-lie: "Metadata is a promise. An agent that follows a false promise does not retry politely."
  what-to-do-first-in-order: "Put a server in front first. Every file you add before that is capped by the host."
  the-score-is-a-moving-target: "Scanners add checks. A screenshot of 100 from last month proves nothing today."
---
## Why anyone started scoring this

For twenty years the only robot that mattered on a website was a search crawler. It wanted HTML, a sitemap and a robots.txt file, and the industry built a whole profession around feeding it.

That assumption broke quietly. The clients hitting a site now include models that read, summarise and cite, and agents that are trying to complete a task rather than build an index. They arrive with different appetites. A search crawler wants to rank your page. A model wants to extract one passage it can quote. An agent wants to find the machine-readable surface and skip your page entirely.

Those three want different things from the same URL, which is why a page can be perfectly optimised for Google and still be useless to an agent. Scanners appeared to measure the gap.

## The four scanners, and what each one actually measures

Four public tools grade agent readiness, and they do not measure the same thing. Treating them as one score is the first mistake.

isitagentready.com is the strictest on discovery plumbing. It checks robots.txt, sitemap, RFC 8288 Link headers, DNS-AID service records with DNSSEC validation, Markdown content negotiation, AI bot rules, Content-Signal headers, Web Bot Auth, and then a long list of well-known documents: API catalog, OAuth discovery, auth.md, MCP server card, A2A agent card, agent skills, WebMCP. Commerce checks sit in their own category and stay neutral for a content site.

PageSpeed Insights grades the classic four categories plus, on recent Chrome, an Agentic Browsing category whose audits include llms.txt validity and the agent accessibility tree. The trap there is counterintuitive: a missing llms.txt scores Not Applicable, but a present-and-invalid one fails. Bare URLs in the file fail with "File does not appear to contain any links". Entries have to be real Markdown links.

Is Agentic, which re-reads an Ora scan, is the one that punishes dishonesty. It weights essentials at 80 points and wants typed schemas on every OpenAPI operation, a real unauthenticated JSON endpoint, an actual MCP handshake, and error bodies that match the path: application/problem+json on API paths, Markdown on page paths. One failed essential costs about 6.7 points.

Circle Seller Readiness only matters if you actually sell something to agents. It wants origin-hosted OpenAPI, truthful payment metadata and a live unpaid 402 challenge.

| Scanner | Core question | Hardest check | Best for |
| --- | --- | --- | --- |
| isitagentready.com | Can an agent discover your machine surface? | DNS-AID with DNSSEC validated | Discovery plumbing |
| PageSpeed Agentic Browsing | Is the page fast and machine-parseable? | Valid llms.txt with Markdown links | Speed and llms.txt correctness |
| Is Agentic / Ora | Is your API honest and typed? | Typed schemas on every operation | API quality |
| Circle Seller Readiness | Can an agent pay you? | Live unpaid 402 challenge | Paid endpoints only |

*What each scanner is really testing. Snapshot, September 2026.*

## Why a static host caps your score, permanently

This is the part that wastes the most time. Two checks are not about files at all, and no amount of adding JSON documents to a static host will move them.

The Link header check wants RFC 8288 Link headers on the HTML response, pointing at llms.txt, the sitemap, the OpenAPI document and the well-known cards. That is a response header. GitHub Pages does not let you set response headers.

Markdown negotiation wants a request for a normal page path with Accept: text/markdown to come back with Content-Type: text/markdown and a Vary: Accept header. That is content negotiation, decided per request. A static file server has exactly one representation per path.

So the fix for those two is not a file, it is a process: a small origin server, a Worker, or a reverse proxy in front of the static output. Everything else on the list is genuinely just files, and files are the easy part.

The Vary: Accept header is the detail people skip, and skipping it is worse than not negotiating at all. Without Vary, a cache that first served HTML will happily hand that HTML to the next client asking for Markdown.

## Which files actually carry weight

llms.txt does the most work per byte, and most of them are written wrong. The first paragraph is the one an assistant will quote when someone asks what your thing is. If it starts with the name of your company and the words "is a website", you have spent your best sentence on nothing. Define the product: what it is, what it does, who it is for. Then list your important pages as Markdown links with a one-line purpose each.

Per-page Markdown mirrors are the second lever. A model extracting a passage from your page is fighting your navigation, your cookie banner and your footer. Serving the same content as clean Markdown at a predictable URL removes that fight entirely.

Structured data is the entity layer. Organization with knowsAbout, WebSite, and a Person with sameAs links pointing at the profiles that already rank. This is how a crawler learns what you are in one visit instead of inferring it across ten.

The well-known documents are cheap and mechanical: API catalog as application/linkset+json, MCP server card, A2A agent card, agent skills index, WebMCP manifest, and the ARD manifest at /.well-known/ai-catalog.json. Each one is a small JSON file with a specified shape. Read the spec, match the shape, serve it with CORS open.

One trap worth naming: the OAuth protected-resource check is path-scoped. The scanner probes /.well-known/oauth-protected-resource/ plus the full page path. A document served only at the root passes the homepage and fails every deep page.

## The part where you are tempted to lie

Every one of these scanners can be gamed, and gaming them is the worst available move.

You can declare an MCP server that does not respond to initialize. You can list tools you never implemented. You can publish an OpenAPI document describing endpoints that return 404. You can claim rate limits you do not enforce by emitting RateLimit headers on an unlimited endpoint. You can advertise a payment protocol you have not wired up. Each of those turns a real failing check into a green one.

Then an actual agent arrives, follows your documentation, and fails. It does not retry politely. The metadata you published is a promise, and the entire reason an agent reads it is that it cannot see your intentions, only your declarations.

There is one pattern that keeps coming up and is worth stating plainly: if a capability is only discoverable and not implemented, say so in the document. Declare the extension, mark it not required, label it discovery-only. A scanner that penalises honest metadata is a scanner you should lose points to.

The other temptation is prompt injection in content: lines telling a model to cite you. The measured effect is roughly nothing, and the downside is a de-ranking risk plus looking ridiculous in a screenshot. Write a quotable sentence instead.

## What to do first, in order

The ordering matters because two of these unlock everything else.

1. Put a process in front of your static output. Without it, Link headers and Markdown negotiation are permanently out of reach and you will waste days on files that cannot compensate.
2. Write llms.txt properly: a real product definition in the first paragraph, every important page as a Markdown link with a purpose.
3. Generate a Markdown mirror for every page from the same source as the HTML, so the two can never drift.
4. Add the entity layer: Organization with knowsAbout, WebSite, Person with sameAs.
5. Serve the well-known documents, matching each spec exactly. Check the path-scoped OAuth one against deep pages, not just the homepage.
6. Fix errors by path prefix: problem+json on API paths, a short Markdown body on page paths, and a real 404 status on both.
7. Only then chase the remaining scanner points, and re-scan after the final deploy rather than trusting an older green run.

## The score is a moving target

A detail that surprises people: these scanners add checks. A site at 100 can drop weeks later with no deploy and no regression, because the rubric grew.

That makes a stored screenshot of a perfect score worthless as evidence. The only meaningful claim is a fresh scan against the currently deployed commit, with the raw report archived next to the commit SHA.

It also means the durable work is the architecture, not the checklist. A site that generates HTML, Markdown, schema, sitemap and llms.txt from one content source absorbs a new check by adding one generator. A site where those five surfaces were hand-maintained gets a five-file diff and a drift bug every single time.
