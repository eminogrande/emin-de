import { articles, articleMarkdown } from '../content/articles.mjs';
import { SITE_DEFINITION, SITE_ORIGIN } from '../lib/site.mjs';

// Every article's full text in one file, so a model can ingest the whole site in
// a single fetch instead of crawling. Same source as the HTML pages.
const body = () =>
	[
		'# emin.de, complete text',
		'',
		`> ${SITE_DEFINITION}`,
		'',
		`Generated from the article source. ${articles.length} article(s).`,
		'',
		'---',
		'',
		...[...articles]
			.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
			.map((article) => `${articleMarkdown(article, SITE_ORIGIN)}\n---\n`),
	].join('\n');

export const GET = () =>
	new Response(body(), {
		headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=600' },
	});
