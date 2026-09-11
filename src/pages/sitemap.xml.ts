import { articles, articlePath } from '../content/articles.mjs';
import { absoluteUrl, STATIC_PATHS } from '../lib/site.mjs';

const entries = [
	...STATIC_PATHS.map((path) => ({ path, priority: path === '/' ? '1.0' : '0.8', lastmod: null })),
	...articles.map((article) => ({ path: articlePath(article.slug), priority: '0.9', lastmod: article.modifiedAt })),
];

const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
	.map(
		({ path, priority, lastmod }) =>
			`<url><loc>${absoluteUrl(path)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}<changefreq>weekly</changefreq><priority>${priority}</priority></url>`
	)
	.join('\n')}
</urlset>`;

export const GET = () =>
	new Response(body, {
		headers: { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=3600' },
	});
