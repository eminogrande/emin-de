// Cloudflare Worker in front of the static Astro build (Workers Static Assets).
//
// Static files cannot carry per-request behaviour, so this Worker adds exactly
// what server.mjs adds on the Node origin:
//   - RFC 8288 Link discovery header + Content-Signal + Vary: Accept everywhere
//   - Accept: text/markdown negotiation on page URLs (serves <path>/index.md)
//   - generated robots.txt
//   - RFC 9457 problem+json 404 on API paths, Markdown 404 on page paths
//   - enforced rate limit on API paths (Workers Rate Limiting binding, 120/60s)
//   - the JSON API, MCP server and x402 challenge, reusing the same Node
//     handlers as server.mjs through a tiny req/res adapter (nodejs_compat)
import { EventEmitter } from 'node:events';
import { baseHeaders, contentTypeFor, robotsBody } from '../src/lib/http-headers.mjs';
import { isApiPathname, markdownNotFoundBody, notFoundProblem, tooManyRequestsProblem, badRequestProblem } from '../src/lib/problem-json.mjs';
import { handleMcp } from '../src/lib/mcp.mjs';
import { handleCorpus } from '../src/lib/x402.mjs';
import { handleArticlesApi } from '../src/lib/articles-api.mjs';
import { redirectTarget } from '../src/lib/redirects.mjs';

const RATE_LIMIT_MAX = 120;
const RATE_LIMIT_WINDOW = 60;
const RATE_LIMIT_PREFIXES = ['/api', '/v1', '/graphql', '/mcp'];

export function acceptQuality(accept, type) {
	return String(accept || '')
		.split(',')
		.map((part) => {
			const [range, ...params] = part.trim().split(';');
			const q = params.find((p) => p.trim().startsWith('q='));
			return { range: range.trim().toLowerCase(), q: q ? Number(q.split('=')[1]) || 0 : 1 };
		})
		.reduce((best, { range, q }) => (range === type || range === '*/*' || range === `${type.split('/')[0]}/*` ? Math.max(best, q) : best), 0);
}
export const prefersMarkdown = (accept) => acceptQuality(accept, 'text/markdown') > acceptQuality(accept, 'text/html');
const prefersJson = (accept) => acceptQuality(accept, 'application/json') > acceptQuality(accept, 'text/html');

function withHeaders(response, pathname, origin, extra = {}) {
	const type = response.headers.get('content-type') || contentTypeFor(pathname, pathname);
	const headers = new Headers(response.headers);
	for (const [name, value] of Object.entries(baseHeaders({ contentType: type, pathname, origin, extra }))) headers.set(name, value);
	return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

const problemResponse = (problem, pathname, origin, extra = {}) =>
	new Response(JSON.stringify(problem, null, 2), {
		status: problem.status,
		headers: baseHeaders({
			contentType: 'application/problem+json; charset=utf-8',
			pathname,
			origin,
			extra: { 'cache-control': 'no-store', 'x-robots-tag': 'noindex, nofollow', 'access-control-allow-origin': '*', ...extra },
		}),
	});

// Minimal Node http adapter: enough surface for mcp.mjs, x402.mjs and
// articles-api.mjs (headers, method, url, data/end events, writeHead/end).
async function runNodeHandler(handler, request, ctx) {
	const body = ['GET', 'HEAD'].includes(request.method) ? null : new Uint8Array(await request.arrayBuffer());
	const req = new EventEmitter();
	Object.assign(req, { method: request.method, url: ctx.url, headers: Object.fromEntries(request.headers), destroy() {} });
	let status = 200;
	const headers = {};
	let chunks = [];
	let done;
	const finished = new Promise((resolve) => (done = resolve));
	const res = {
		headersSent: false,
		setHeader: (name, value) => (headers[name.toLowerCase()] = String(value)),
		getHeader: (name) => headers[name.toLowerCase()],
		writeHead(code, extra = {}) {
			status = code;
			for (const [name, value] of Object.entries(extra)) headers[name.toLowerCase()] = String(value);
			this.headersSent = true;
			return this;
		},
		write: (chunk) => chunks.push(typeof chunk === 'string' ? new TextEncoder().encode(chunk) : chunk),
		end(chunk) {
			if (chunk) res.write(chunk);
			done();
		},
	};
	const pending = handler(req, res, ctx);
	queueMicrotask(() => {
		if (body?.length) req.emit('data', Buffer.from(body));
		req.emit('end');
	});
	const handled = await pending;
	if (!handled) return null;
	await finished;
	const size = chunks.reduce((n, c) => n + c.length, 0);
	const out = new Uint8Array(size);
	let at = 0;
	for (const c of chunks) {
		out.set(c, at);
		at += c.length;
	}
	return new Response(status === 202 || status === 204 || request.method === 'HEAD' ? null : out, { status, headers });
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const origin = url.origin;
		let pathname;
		try {
			pathname = decodeURIComponent(url.pathname);
		} catch {
			return problemResponse(badRequestProblem(origin, url.pathname, 'The request path could not be decoded.'), url.pathname, origin);
		}
		if (/(^|\/)\.\.(\/|$)/.test(pathname) || pathname.includes('\0')) {
			return problemResponse(badRequestProblem(origin, pathname, 'Path traversal is not allowed.'), pathname, origin);
		}
		pathname = pathname.replace(/\/+$/, '') || '/';
		const accept = request.headers.get('accept');

		const moved = redirectTarget(pathname, origin);
		if (moved) return new Response(null, { status: 301, headers: baseHeaders({ contentType: 'text/plain; charset=utf-8', pathname, origin, extra: { location: moved, 'cache-control': 'public, max-age=86400' } }) });

		if (pathname === '/robots.txt') {
			return new Response(robotsBody(origin), { headers: baseHeaders({ contentType: 'text/plain; charset=utf-8', pathname, origin, extra: { 'access-control-allow-origin': '*' } }) });
		}
		if (pathname === '/health') {
			return new Response(JSON.stringify({ ok: true, commit: env.GIT_SHA || 'dev', runtime: 'cloudflare-worker' }), { headers: baseHeaders({ contentType: 'application/json; charset=utf-8', pathname, origin, extra: { 'cache-control': 'no-store' } }) });
		}

		let rateLimit = {};
		if (RATE_LIMIT_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
			const policy = { 'ratelimit-policy': `${RATE_LIMIT_MAX};w=${RATE_LIMIT_WINDOW}`, ratelimit: `limit=${RATE_LIMIT_MAX}` };
			if (env.API_RATE_LIMITER) {
				const key = request.headers.get('cf-connecting-ip') || 'anonymous';
				const { success } = await env.API_RATE_LIMITER.limit({ key });
				if (!success) return problemResponse(tooManyRequestsProblem(origin, pathname, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW), pathname, origin, { ...policy, 'retry-after': String(RATE_LIMIT_WINDOW) });
			}
			rateLimit = { policy };
		}

		if (request.method === 'OPTIONS') {
			return new Response(null, {
				status: 204,
				headers: baseHeaders({ contentType: 'text/plain; charset=utf-8', pathname, origin, extra: { 'access-control-allow-origin': '*', 'access-control-allow-methods': 'GET, HEAD, OPTIONS, POST', 'access-control-allow-headers': 'Content-Type, Authorization', allow: 'GET, HEAD, OPTIONS, POST' } }),
			});
		}

		const ctx = { origin, pathname, url: url.pathname + url.search, rateLimit: {} };
		if (pathname === '/mcp' || isApiPathname(pathname)) {
			for (const handler of [handleMcp, handleCorpus, handleArticlesApi]) {
				const response = await runNodeHandler(handler, request, ctx);
				if (response) return withHeaders(response, pathname, origin, rateLimit.policy);
			}
			return problemResponse(notFoundProblem(origin, pathname), pathname, origin, rateLimit.policy);
		}

		if (!['GET', 'HEAD'].includes(request.method)) {
			return problemResponse({ type: `${origin}/problems/error`, title: 'Method Not Allowed', status: 405, detail: `${request.method} is not supported here.`, instance: pathname }, pathname, origin, { allow: 'GET, HEAD, OPTIONS' });
		}

		// Markdown negotiation: same URL, Markdown body, Vary: Accept.
		if (!pathname.endsWith('.md') && prefersMarkdown(accept)) {
			const mirror = await env.ASSETS.fetch(new URL(pathname === '/' ? '/index.md' : `${pathname}/index.md`, origin));
			if (mirror.ok) return withHeaders(new Response(mirror.body, { headers: { 'content-type': 'text/markdown; charset=utf-8' } }), pathname, origin);
		}
		// <path>.md alias for <path>/index.md
		if (pathname.endsWith('.md') && !pathname.endsWith('/index.md')) {
			const mirror = await env.ASSETS.fetch(new URL(`${pathname.slice(0, -3)}/index.md`, origin));
			if (mirror.ok) return withHeaders(new Response(mirror.body, { headers: { 'content-type': 'text/markdown; charset=utf-8' } }), pathname, origin);
		}

		const asset = await env.ASSETS.fetch(request);
		if (asset.status === 404) {
			if (prefersJson(accept)) return problemResponse(notFoundProblem(origin, pathname), pathname, origin);
			return new Response(request.method === 'HEAD' ? null : markdownNotFoundBody(origin, pathname), {
				status: 404,
				headers: baseHeaders({ contentType: 'text/markdown; charset=utf-8', pathname, origin, extra: { 'cache-control': 'no-store', 'x-robots-tag': 'noindex, nofollow' } }),
			});
		}
		if (asset.status >= 300 && asset.status < 400) return asset;
		// Static hosts only know extensions; fix types for extensionless and feed paths.
		const type = contentTypeFor(pathname, pathname);
		const fixed = type !== 'application/octet-stream' && !pathname.match(/\.(png|webp|avif|jpe?g|svg|ico|woff2?|css|js)$/) ? new Response(asset.body, { status: asset.status, headers: { ...Object.fromEntries(asset.headers), 'content-type': type } }) : asset;
		return withHeaders(fixed, pathname, origin);
	},
};
