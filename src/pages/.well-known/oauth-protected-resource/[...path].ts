export function getStaticPaths() {
	return [{ params: { path: undefined } }, { params: { path: 'about' } }, { params: { path: 'blog/hello-world' } }];
}
export const GET = ({ params }) => new Response(JSON.stringify({ resource: 'x', p: params.path ?? null }), { headers: { 'content-type': 'application/json' } });
