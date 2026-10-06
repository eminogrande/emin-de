import config from '../../../../site.config.mjs';
import { allPosts } from '../../../lib/corpus.mjs';
import { ogPng } from '../../../lib/og.mjs';
import { label } from '../../../lib/paths.mjs';

export const getStaticPaths = () => allPosts.map((post) => ({ params: { lang: post.lang, slug: post.slug }, props: { post } }));

export const GET = async ({ props }: { props: { post: any } }) => {
	const { post } = props;
	const author = config.authors[post.author];
	const kicker = `${label(config.categories[post.category], post.lang)} / ${label(config.formats[post.format], post.lang)}`;
	const footer = `${config.name} / ${author.name}${author.type === 'ai_editorial' ? ` / ${label(author.label, post.lang)}` : ''} / ${post.date}`;
	return new Response(await ogPng({ title: post.title, kicker, footer }), { headers: { 'content-type': 'image/png' } });
};
