// RFC 9457 problem+json bodies for API paths, and the Markdown recovery body
// served on normal page 404s. Two audiences, two shapes, same status code.

// Paths that promise a machine-readable error body.
export function isApiPathname(pathname) {
	return /^\/(api|v1|graphql|mcp)(\/|$)/.test(pathname);
}

export function problemBody({ origin, pathname, status, title, detail, type }) {
	return {
		type: type || `${origin}/problems/${status === 404 ? 'not-found' : 'error'}`,
		title,
		status,
		detail,
		instance: pathname,
	};
}

export function notFoundProblem(origin, pathname) {
	return problemBody({
		origin,
		pathname,
		status: 404,
		title: 'Not Found',
		detail: `No resource exists at ${pathname} on this server. Machine-readable index: ${origin}/openapi.json`,
	});
}

export function badRequestProblem(origin, pathname, detail) {
	return problemBody({
		origin,
		pathname,
		status: 400,
		title: 'Bad Request',
		detail: detail || 'The request path is malformed.',
	});
}

export function tooManyRequestsProblem(origin, pathname, limit, windowSeconds) {
	return problemBody({
		origin,
		pathname,
		status: 429,
		title: 'Too Many Requests',
		detail: `Rate limit of ${limit} requests per ${windowSeconds} seconds exceeded. Retry after the reset interval.`,
	});
}

// Short Markdown recovery body for a missing page. Deliberately links the three
// entry points an agent should try next, and is short enough to stay cheap.
export function markdownNotFoundBody(origin, pathname) {
	return `# 404 — page not found

\`${pathname}\` does not exist on this site.

- [Sitemap](${origin}/sitemap.xml)
- [llms.txt](${origin}/llms.txt)
- [All posts](${origin}/posts)

Every page here has a Markdown mirror: append \`.md\` to its path, or send \`Accept: text/markdown\`.
`;
}
