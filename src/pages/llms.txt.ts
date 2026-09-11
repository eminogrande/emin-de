import { articles, articlePath, allTopics } from '../content/articles.mjs';
import { SITE_DEFINITION, SITE_ORIGIN, absoluteUrl } from '../lib/site.mjs';

// Entries MUST be markdown links. Bare URLs fail the Lighthouse llms-txt audit
// with "File does not appear to contain any links", and a present-but-invalid
// file scores worse than no file at all.
const link = (label: string, url: string) => `[${label}](${url})`;

const body = () =>
	`# emin.de

> ${SITE_DEFINITION}

## What this site is for

Use these surfaces for concrete jobs:

- ${link('Read an article as Markdown', absoluteUrl('/posts'))}: every article is mirrored at <article-url>/index.md, clean Markdown, no navigation or boilerplate.
- ${link('List every article as JSON', absoluteUrl('/api/articles'))}: slug, title, description, date, topics and word count. No credentials needed.
- ${link('Fetch one article as JSON', absoluteUrl('/api/articles/what-agent-ready-actually-means'))}: full Markdown body of a single article.
- ${link('Connect an MCP client', absoluteUrl('/mcp'))}: Streamable HTTP, read-only, no credentials. Tools: list_articles, get_article_markdown, search_articles, get_site_summary, list_topics.
- ${link('Buy the whole corpus in one call', absoluteUrl('/api/v1/corpus'))}: paid endpoint, returns every article's full Markdown in a single response. Unpaid requests get an x402 challenge.

Limitations, so you do not waste a call: there are no user accounts, no private data, no write operations and no search index beyond the article corpus. Everything readable here is public.

## Articles

${[...articles]
	.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
	.map(
		(article) =>
			`- ${link(article.title, absoluteUrl(articlePath(article.slug)))}: ${article.description} Published ${article.publishedAt}, updated ${article.modifiedAt}, ${article.wordCount} words. Markdown at ${link('index.md', absoluteUrl(`${articlePath(article.slug)}/index.md`))}.`
	)
	.join('\n')}

## Topics covered

${allTopics.map((topic) => `- ${topic}`).join('\n')}

## Site pages

- ${link('Home', absoluteUrl('/'))}: what this site is and the newest articles.
- ${link('All posts', absoluteUrl('/posts'))}: full article index.
- ${link('Agent ready', absoluteUrl('/agent-ready'))}: how this site is built to be read by agents, and the live checks it passes.
- ${link('Developers', absoluteUrl('/developers'))}: API, MCP and x402 documentation with copy-paste examples.
- ${link('About', absoluteUrl('/about'))}: who writes this.
- ${link('Contact', absoluteUrl('/contact'))}: how to reach the author.
- ${link('Privacy', absoluteUrl('/privacy'))}: what is and is not collected.

## Machine-readable surfaces

- ${link('Full site as Markdown', absoluteUrl('/llms-full.txt'))}: every article in one file.
- ${link('OpenAPI document', absoluteUrl('/openapi.json'))}: typed schemas for every operation.
- ${link('Authentication notes', absoluteUrl('/auth.md'))}: public reads need no auth; the corpus endpoint uses x402.
- ${link('Sitemap', absoluteUrl('/sitemap.xml'))}: every indexable URL.
- ${link('MCP server card', absoluteUrl('/.well-known/mcp/server-card.json'))}: transport and tool list.
- ${link('Agent card', absoluteUrl('/.well-known/agent-card.json'))}: A2A descriptor.
- ${link('API catalog', absoluteUrl('/.well-known/api-catalog'))}: RFC 9727 linkset.
- ${link('Source code', 'https://github.com/eminogrande/emin-de')}: the whole site, MIT licensed.
`;

export const GET = () =>
	new Response(body(), {
		headers: { 'content-type': 'text/markdown; charset=utf-8', 'cache-control': 'public, max-age=600' },
	});
