import { articles, articlePath } from '../content/articles.mjs';
import { SITE_DEFINITION, SITE_ORIGIN, SITE_TAGLINE, AUTHOR_NAME } from '../lib/site.mjs';

const body = () => {
	const lines = [
		'# emin.de',
		'',
		`> ${SITE_DEFINITION}`,
		'',
		`${SITE_TAGLINE} Written by ${AUTHOR_NAME}.`,
		'',
		'## Articles',
		'',
		...[...articles]
			.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
			.map((article) => `- [${article.title}](${SITE_ORIGIN}${articlePath(article.slug)}): ${article.description}`),
		'',
		'## For agents',
		'',
		`- [llms.txt](${SITE_ORIGIN}/llms.txt): the site map for language models.`,
		`- [openapi.json](${SITE_ORIGIN}/openapi.json): typed public API.`,
		`- [MCP server](${SITE_ORIGIN}/mcp): Streamable HTTP, read-only, no credentials.`,
		`- [Developer docs](${SITE_ORIGIN}/developers): copy-paste examples.`,
		'',
	];
	return lines.join('\n');
};

export const GET = () =>
	new Response(body(), {
		headers: { 'content-type': 'text/markdown; charset=utf-8', 'cache-control': 'public, max-age=600', vary: 'Accept' },
	});
