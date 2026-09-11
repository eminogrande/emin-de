import { articles, articlePath } from '../../content/articles.mjs';
import { SITE_ORIGIN } from '../../lib/site.mjs';

const body = () => {
	const sorted = [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
	return [
		'# Posts',
		'',
		'> Every long-form article on emin.de, newest first.',
		'',
		...sorted.map(
			(article) =>
				`- [${article.title}](${SITE_ORIGIN}${articlePath(article.slug)}) (${article.publishedAt}, ${article.wordCount} words): ${article.description}`
		),
		'',
	].join('\n');
};

export const GET = () =>
	new Response(body(), {
		headers: { 'content-type': 'text/markdown; charset=utf-8', 'cache-control': 'public, max-age=600', vary: 'Accept' },
	});
