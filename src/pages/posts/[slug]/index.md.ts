import { articles, getArticle, articleMarkdown } from '../../../content/articles.mjs';
import { SITE_ORIGIN } from '../../../lib/site.mjs';

export function getStaticPaths() {
	return articles.map((article) => ({ params: { slug: article.slug } }));
}

export const GET = ({ params }: { params: { slug: string } }) => {
	const article = getArticle(params.slug);
	if (!article) {
		return new Response('Not found', { status: 404 });
	}
	return new Response(articleMarkdown(article, SITE_ORIGIN), {
		headers: {
			'content-type': 'text/markdown; charset=utf-8',
			'cache-control': 'public, max-age=600',
			vary: 'Accept',
		},
	});
};
