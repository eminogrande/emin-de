import { mirroredPaths, markdownForPath } from '../../content/pages.mjs';

// One route for every non-article Markdown mirror, so adding a page means adding
// one entry in src/content/pages.mjs rather than a new file here.
export function getStaticPaths() {
	return mirroredPaths.map((path) => ({ params: { page: path.replace(/^\//, '') } }));
}

export const GET = ({ params }: { params: { page: string } }) => {
	const body = markdownForPath(`/${params.page}`);
	if (!body) {
		return new Response('Not found', { status: 404 });
	}
	return new Response(body, {
		headers: {
			'content-type': 'text/markdown; charset=utf-8',
			'cache-control': 'public, max-age=600',
			vary: 'Accept',
		},
	});
};
