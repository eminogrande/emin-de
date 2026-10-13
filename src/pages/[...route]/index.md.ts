// Markdown mirror for every generated route (posts, listings) and every static
// page in src/content/pages.mjs. One file, so a page cannot ship without one.
import { CATCHALL_LIST_ROUTES, POST_ROUTES } from '../../lib/routes.mjs';
import { listMarkdown } from '../../lib/surfaces.mjs';
import { mirroredPaths, markdownForPath } from '../../content/pages.mjs';
import { textResponse } from '../../lib/text-response.mjs';

export function getStaticPaths() {
	const generated = [...POST_ROUTES, ...CATCHALL_LIST_ROUTES];
	const taken = new Set(generated.map((r) => r.path));
	return [
		...generated.map((route) => ({ params: { route: route.path.slice(1) }, props: { body: route.kind === 'post' ? route.post.markdown : listMarkdown(route) } })),
		...mirroredPaths.filter((p) => !taken.has(p)).map((p) => ({ params: { route: p.slice(1) }, props: { body: markdownForPath(p) } })),
	];
}

export const GET = ({ props }: { props: { body: string } }) => textResponse(props.body, 'text/markdown');
