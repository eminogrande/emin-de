// Markdown mirrors for the non-article pages. The HTML lives in .astro files
// for layout reasons, but the Markdown body for each one lives here so the
// mirror route is mechanical and cannot be forgotten when a page is added.
//
// Rule: if you add a page to STATIC_PATHS in src/lib/site.mjs, add its mirror
// here. scripts/verify-agent-ready.mjs fails the build if one is missing.

import { SITE, SITE_DEFINITION, SITE_ORIGIN, AUTHOR_NAME, KNOWS_ABOUT, AUTHOR_SAME_AS } from '../lib/site.mjs';
import { principlesMarkdown } from './principles.mjs';
import { DISCLOSURE } from '../lib/magazine.mjs';
import photoData from '../generated/photos.json' with { type: 'json' };

const analyticsOn = SITE.analytics.posthog.enabled || SITE.analytics.ga4.enabled;

export const pageMarkdown = {
	'/principles': () => principlesMarkdown('en'),
	'/de/principles': () => principlesMarkdown('de'),
	'/photos': () => `# Photos

> Photographs by ${AUTHOR_NAME}.

${photoData.photos.length ? photoData.photos.map((p) => `- ![${(p.alt.en || p.caption.en || '').replace(/[[\]]/g, '')}](${SITE_ORIGIN}${p.src})${p.caption.en ? ` ${p.caption.en}` : ''}${p.place ? ` (${p.place})` : ''}`).join('\n') : 'No photographs published yet.'}
`,
	'/agent-ready': () => `# Agent ready

> Agent readiness means a non-human client can discover and use your content without parsing your layout. Four public scanners grade it and they measure different things. Two checks, Link headers and Markdown negotiation, are response behaviour that no static host can provide.

This site implements agent readiness and links the evidence rather than describing it abstractly.

## Live machine-readable surfaces

| Surface | What it is for |
| --- | --- |
| [/llms.txt](${SITE_ORIGIN}/llms.txt) | Product definition plus every important page as a Markdown link. |
| [/llms-full.txt](${SITE_ORIGIN}/llms-full.txt) | Every article's complete text in one fetch. |
| [/openapi.json](${SITE_ORIGIN}/openapi.json) | Typed schemas and unique operationIds for every operation, errors included. |
| [/auth.md](${SITE_ORIGIN}/auth.md) | Public reads need no credentials; the corpus endpoint uses x402. |
| [/api/articles](${SITE_ORIGIN}/api/articles) | Unauthenticated JSON list of every article. |
| [/mcp](${SITE_ORIGIN}/mcp) | Streamable HTTP MCP server, five read-only tools, no credentials. |
| [/api/v1/corpus](${SITE_ORIGIN}/api/v1/corpus) | Paid bulk access. Unpaid requests return a real x402 challenge. |
| [/.well-known/ai-catalog.json](${SITE_ORIGIN}/.well-known/ai-catalog.json) | ARD manifest listing every machine entry point. |
| [/sitemap.xml](${SITE_ORIGIN}/sitemap.xml) | Every indexable URL with a lastmod date. |

**Basically,** A site claiming to be agent ready should let you fetch the proof, not read a badge.

## Try the Markdown negotiation

\`\`\`
curl -sI ${SITE_ORIGIN}/ | grep -i '^link:'
curl -s -H 'Accept: text/markdown' ${SITE_ORIGIN}/ | head -20
curl -sI -H 'Accept: text/markdown' ${SITE_ORIGIN}/ | grep -iE 'content-type|vary'
\`\`\`

## Key answers

- Agent readiness is a set of HTTP behaviours, not a plugin.
- A pure static host can never pass the Link header and Markdown negotiation checks, because both are per-request response behaviour.
- llms.txt entries must be Markdown links. Bare URLs fail the Lighthouse llms-txt audit, and a present-but-invalid file scores worse than no file.
- isitagentready.com grades discovery plumbing; is-agentic.com grades API honesty. Passing one says little about the other.
- Declaring tools or endpoints you have not implemented is the worst available move: an agent reads your metadata as a promise.
- Scanners add checks over time, so a score from last month is not evidence about today.

Full article: [What agent ready actually means](${SITE_ORIGIN}/posts/what-agent-ready-actually-means).
Source code: [github.com/eminogrande/emin-de](https://github.com/eminogrande/emin-de).
`,

	'/about': () => `# About

> ${AUTHOR_NAME} is a journalist and publisher (${SITE.publisher.publication.name}, Berlin) and builds Bitcoin self-custody and agent-payment infrastructure. This site is where it gets written down properly.

## Journalist and publisher

I published [${SITE.publisher.publication.name}](${SITE.publisher.publication.url}), a Berlin print magazine archived in the German National Library ([archive](${SITE.publisher.publication.archive})). The core rule of this site follows from that: free speech. Nothing here is censored. AI help is labelled, the words are mine. Details: [Principles](${SITE_ORIGIN}/principles).

${DISCLOSURE.en}

## What I work on

Wallets where the company holding the keys is not a dependency: passkeys carrying their own secret through the WebAuthn PRF extension, MuSig2 co-signing that decays to a single key on a Bitcoin timelock, and recovery tooling that works when the provider is gone.

Alongside that: x402 payments so software can pay for access without a signup flow, MCP servers so a model can call a system instead of scraping it, and making a website legible to both a search crawler and an agent.

## Topics

${KNOWS_ABOUT.map((topic) => `- ${topic}`).join('\n')}

## How these articles get written

Long-form, one subject per piece, only about things actually built or measured. Every article opens with a TL;DR, carries a standalone takeaway per section, and ends with real sources. Every article is also published as clean Markdown, in a public JSON API, and through an MCP server.

## Elsewhere

${AUTHOR_SAME_AS.map((url) => `- ${url}`).join('\n')}

## Who else writes here

Some posts may come from the [AI desk](${SITE_ORIGIN}/author/ai-desk): an openly named AI writing desk, not a person, labelled "AI-written, human-supervised" on every post and in the metadata.

Contact: hello@emin.de
`,

	'/contact': () => `# Contact

> Email is best for anything that needs more than one sentence.

## Email

hello@emin.de

Read: corrections to an article, a technical question about something published here, or work on self-custody, agent payments and agent-readiness engineering.

## Code

[github.com/eminogrande](https://github.com/eminogrande). This site's source is at [eminogrande/emin-de](https://github.com/eminogrande/emin-de); open an issue there for a site bug or a factual error in an article.

## Short replies

[x.com/eminogrande](https://x.com/eminogrande)

## What does not get a reply

Guest-post offers, link exchanges, paid placements and SEO outreach. Nothing here is for sale except bulk corpus access through the x402 endpoint, which needs no negotiation.
`,

	'/privacy': () => `# Privacy

> ${analyticsOn ? 'Analytics is switched on in a cookieless mode; see below.' : 'There is no tracking on this site, so there is not much to disclose.'}

## What is not collected

- ${SITE.analytics.posthog.enabled ? 'PostHog web analytics runs in cookieless mode: no cookies, no local or session storage, no person profiles, no session recording.' : 'No analytics product, first or third party.'}
- No cookies are set by this site${SITE.analytics.ga4.enabled ? ', unless you opt in to Google Analytics below' : ''}.
- No advertising or retargeting pixels.
- No account system, so no personal data is stored.

## What is collected

Standard edge or web server access logs: IP address, timestamp, requested path, response status, user agent and referrer. They exist to operate the site and to count how often AI crawlers fetch content. They are not sold or shared.
${SITE.analytics.ga4.enabled ? '\n## Google Analytics (opt-in only)\n\nGoogle Analytics 4 loads only after you opt in on this page. The choice is stored in your browser (localStorage key analytics-consent). You can withdraw it the same way.\n' : ''}
## If you email

Mail to ${SITE.email} is stored in a normal mailbox and kept as long as the conversation is useful. There is no marketing list.

## Agents and API requests

API and MCP requests are logged like page requests. The paid corpus endpoint processes an x402 challenge; settlement happens on a public blockchain outside this site's control.

Contact: ${SITE.email}
`,

	'/developers': () => `# Developers

> Every article on emin.de is available as Markdown, as JSON, through an MCP server, and in bulk through one paid x402 endpoint. No credentials are needed for anything except the bulk corpus.

See ${SITE_ORIGIN}/developers for the full page with copy-paste examples, ${SITE_ORIGIN}/openapi.json for typed schemas, and ${SITE_ORIGIN}/auth.md for the authentication notes.
`,
};

export function markdownForPath(path) {
	const builder = pageMarkdown[path];
	return builder ? builder() : null;
}

export const mirroredPaths = Object.keys(pageMarkdown);
