// Origin server for emin.de.
//
// Static hosts cannot set the headers an agent-ready site needs, so this plain
// Node http server (zero dependencies) fronts dist/ and adds:
//   - RFC 8288 Link discovery headers on every response
//   - Accept-driven Markdown negotiation (Vary: Accept)
//   - Content-Signal + generated robots.txt
//   - RFC 9457 problem+json 404s on API paths, Markdown 404s on page paths
//   - enforced IETF RateLimit headers on API entry points
//   - GET /health
//
// Optional sibling modules (owned elsewhere) are imported defensively so this
// server boots even when they do not exist yet. Their contract:
//   ./src/lib/mcp.mjs           handleMcp(request, response, ctx) -> boolean
//   ./src/lib/x402.mjs          handleCorpus(request, response, ctx) -> boolean
//   ./src/lib/articles-api.mjs  handleArticlesApi(request, response, ctx) -> boolean
// where ctx = { origin, pathname, url, rateLimit: { remaining, reset } }.
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_ORIGIN, absoluteUrl } from './src/lib/site.mjs';
import { baseHeaders, CONTENT_SIGNAL, contentTypeFor, DISCOVERY_LINK_HEADER, getOrigin, robotsBody } from './src/lib/http-headers.mjs';
import { badRequestProblem, isApiPathname, markdownNotFoundBody, notFoundProblem, tooManyRequestsProblem } from './src/lib/problem-json.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = process.env.DIST_DIR ? path.resolve(process.env.DIST_DIR) : path.join(__dirname, 'dist');
const PORT = Number(process.env.PORT || 4321);
const GIT_SHA = process.env.GIT_SHA || 'dev';

// --- optional sibling modules -------------------------------------------------
async function optionalImport(specifier, exportName) {
	try {
		const mod = await import(specifier);
		if (typeof mod[exportName] === 'function') return mod[exportName];
		console.warn(`[server] ${specifier} has no exported function ${exportName} — that route returns 501.`);
	} catch (error) {
		if (error?.code !== 'ERR_MODULE_NOT_FOUND') throw error;
		console.warn(`[server] ${specifier} not present — that route returns 501 until it lands.`);
	}
	return null;
}

const handleMcp = await optionalImport('./src/lib/mcp.mjs', 'handleMcp');
const handleCorpus = await optionalImport('./src/lib/x402.mjs', 'handleCorpus');
const handleArticlesApi = await optionalImport('./src/lib/articles-api.mjs', 'handleArticlesApi');
const apiHandlers = [handleCorpus, handleArticlesApi].filter(Boolean);

// --- rate limiting ------------------------------------------------------------
// Token bucket per client IP. Only API entry points are limited; pages are not.
const RATE_LIMIT_PREFIXES = ['/api', '/v1', '/graphql', '/mcp'];
const RATE_LIMIT_MAX = 120;
const RATE_LIMIT_WINDOW = 60; // seconds
const RATE_LIMIT_RATE = RATE_LIMIT_MAX / RATE_LIMIT_WINDOW; // tokens per second
const buckets = new Map();

function isRateLimitedPath(pathname) {
	return RATE_LIMIT_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function clientIp(request) {
	const forwarded = String(request.headers['x-forwarded-for'] || '').split(',')[0].trim();
	return forwarded || request.socket.remoteAddress || 'unknown';
}

// ponytail: unbounded map keyed by IP; add an LRU eviction if this ever runs
// behind a wide-open proxy where spoofing x-forwarded-for could grow it.
function takeToken(ip) {
	const now = Date.now();
	const bucket = buckets.get(ip) || { tokens: RATE_LIMIT_MAX, at: now };
	bucket.tokens = Math.min(RATE_LIMIT_MAX, bucket.tokens + ((now - bucket.at) / 1000) * RATE_LIMIT_RATE);
	bucket.at = now;
	const allowed = bucket.tokens >= 1;
	bucket.tokens = allowed ? bucket.tokens - 1 : bucket.tokens;
	buckets.set(ip, bucket);
	return {
		allowed,
		remaining: Math.max(0, Math.floor(bucket.tokens)),
		reset: Math.max(0, Math.ceil((RATE_LIMIT_MAX - bucket.tokens) / RATE_LIMIT_RATE)),
		retryAfter: allowed ? 0 : Math.max(1, Math.ceil((1 - bucket.tokens) / RATE_LIMIT_RATE)),
	};
}

function rateLimitHeaders(state) {
	return {
		'ratelimit': `limit=${RATE_LIMIT_MAX}, remaining=${state.remaining}, reset=${state.reset}`,
		'ratelimit-policy': `${RATE_LIMIT_MAX};w=${RATE_LIMIT_WINDOW}`,
	};
}

// --- negotiation --------------------------------------------------------------
function acceptQuality(accept, type) {
	const ranges = String(accept || '')
		.split(',')
		.map((part) => {
			const [range, ...params] = part.trim().split(';');
			const q = params.find((p) => p.trim().startsWith('q='));
			return { range: range.trim().toLowerCase(), q: q ? Number(q.split('=')[1]) || 0 : 1 };
		});
	return ranges.reduce((best, { range, q }) => {
		const wildcard = `${range.split('/')[0]}/*`;
		const matches = range === type || range === '*/*' || range === wildcard;
		return matches ? Math.max(best, q) : best;
	}, 0);
}

function prefersMarkdown(accept) {
	return acceptQuality(accept, 'text/markdown') > acceptQuality(accept, 'text/html');
}

function prefersJson(accept) {
	return acceptQuality(accept, 'application/json') > acceptQuality(accept, 'text/html');
}

// --- filesystem ---------------------------------------------------------------
async function isFile(candidate) {
	try {
		const info = await stat(candidate);
		return info.isFile() ? candidate : null;
	} catch {
		return null;
	}
}

function safeJoin(pathname) {
	const resolved = path.resolve(DIST_DIR, `.${pathname}`);
	return resolved.startsWith(DIST_DIR + path.sep) || resolved === DIST_DIR ? resolved : null;
}

async function resolveFile(pathname) {
	const candidates = path.extname(pathname)
		? [safeJoin(pathname)]
		: [safeJoin(`${pathname}/index.html`), safeJoin(`${pathname}.html`), safeJoin(pathname)];
	for (const candidate of candidates) {
		if (candidate && (await isFile(candidate))) return candidate;
	}
	return null;
}

// A page path maps to its Markdown mirror: <path>/index.md, or <path>.md.
// /posts/index.md and /posts.md are accepted as explicit aliases.
async function resolveMarkdown(pathname) {
	const candidates = [];
	if (pathname.endsWith('/index.md')) {
		candidates.push(safeJoin(pathname));
	} else if (pathname.endsWith('.md')) {
		candidates.push(safeJoin(pathname), safeJoin(`${pathname.slice(0, -3)}/index.md`));
	} else {
		candidates.push(safeJoin(`${pathname}/index.md`), safeJoin(`${pathname}.md`));
	}
	for (const candidate of candidates) {
		if (candidate && (await isFile(candidate))) return candidate;
	}
	return null;
}

// --- responses ----------------------------------------------------------------
function send(request, response, status, headers, body) {
	response.writeHead(status, headers);
	response.end(request.method === 'HEAD' || body === undefined ? undefined : body);
}

function sendBody(request, response, status, { contentType, pathname, origin, extra = {} }, body) {
	send(request, response, status, baseHeaders({ contentType, pathname, origin, extra }), body);
}

function sendProblem(request, response, origin, pathname, problem, extra = {}) {
	sendBody(request, response, problem.status, {
		contentType: 'application/problem+json; charset=utf-8',
		pathname,
		origin,
		extra: { 'cache-control': 'no-store', 'x-robots-tag': 'noindex, nofollow', 'access-control-allow-origin': '*', ...extra },
	}, JSON.stringify(problem, null, 2));
}

async function serveStatic(request, response, pathname, origin) {
	const filePath = await resolveFile(pathname === '/' ? '/index.html' : pathname);
	if (!filePath) {
		if (isApiPathname(pathname) || prefersJson(request.headers.accept)) {
			sendProblem(request, response, origin, pathname, notFoundProblem(origin, pathname));
			return;
		}
		sendBody(request, response, 404, {
			contentType: 'text/markdown; charset=utf-8',
			pathname,
			origin,
			extra: { 'cache-control': 'no-store', 'x-robots-tag': 'noindex, nofollow' },
		}, markdownNotFoundBody(origin, pathname));
		return;
	}

	const contentType = contentTypeFor(pathname, filePath);
	const body = await readFile(filePath);
	if (contentType.startsWith('text/') || contentType.startsWith('application/json') || contentType.startsWith('application/xml') || contentType.startsWith('application/linkset')) {
		sendBody(request, response, 200, { contentType, pathname, origin }, body.toString('utf-8').replaceAll(SITE_ORIGIN, origin));
		return;
	}
	send(request, response, 200, baseHeaders({ contentType, pathname, origin }), request.method === 'HEAD' ? undefined : body);
}

async function serveMarkdown(request, response, filePath, pathname, origin, status = 200) {
	const body = (await readFile(filePath, 'utf-8')).replaceAll(SITE_ORIGIN, origin);
	sendBody(request, response, status, { contentType: 'text/markdown; charset=utf-8', pathname, origin }, body);
}

// --- routing ------------------------------------------------------------------
const server = http.createServer(async (request, response) => {
	const origin = getOrigin(request, PORT);

	try {
		const rawPath = (request.url || '/').split('?')[0];
		const hasTraversal = (value) => value.includes('\0') || /(^|\/)\.\.(\/|$)/.test(value) || /%2e%2e/i.test(value);
		if (hasTraversal(rawPath)) {
			sendProblem(request, response, origin, rawPath, badRequestProblem(origin, rawPath, 'Path traversal is not allowed.'));
			return;
		}

		let url;
		try {
			url = new URL(request.url || '/', origin);
		} catch {
			sendProblem(request, response, origin, rawPath, badRequestProblem(origin, rawPath, 'The request URL could not be parsed.'));
			return;
		}

		let pathname;
		try {
			pathname = decodeURIComponent(url.pathname);
		} catch {
			sendProblem(request, response, origin, rawPath, badRequestProblem(origin, rawPath, 'The request path could not be decoded.'));
			return;
		}
		if (hasTraversal(pathname)) {
			sendProblem(request, response, origin, pathname, badRequestProblem(origin, pathname, 'Path traversal is not allowed.'));
			return;
		}
		pathname = pathname.replace(/\/+$/, '') || '/';

		// Baseline headers on EVERY response, including ones written by sibling
		// modules that call writeHead themselves (setHeader values are merged
		// into writeHead, so these survive).
		response.setHeader('content-signal', CONTENT_SIGNAL);
		response.setHeader('link', DISCOVERY_LINK_HEADER);
		response.setHeader('vary', 'Accept');

		if (request.method === 'OPTIONS') {
			send(request, response, 204, {
				...baseHeaders({ contentType: 'text/plain; charset=utf-8', pathname, origin }),
				'access-control-allow-origin': '*',
				'access-control-allow-methods': 'GET, HEAD, OPTIONS, POST',
				'access-control-allow-headers': 'Content-Type, Authorization',
				allow: 'GET, HEAD, OPTIONS, POST',
			});
			return;
		}

		// Rate limit before any API work: the headers describe a limit this
		// process actually enforces, and the 429 below is the proof.
		let rateLimitState = {};
		if (isRateLimitedPath(pathname)) {
			const state = takeToken(clientIp(request));
			const limited = rateLimitHeaders(state);
			if (!state.allowed) {
				sendProblem(request, response, origin, pathname, tooManyRequestsProblem(origin, pathname, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW), {
					...limited,
					'retry-after': String(state.retryAfter),
				});
				return;
			}
			Object.assign(request, { rateLimitHeaders: limited });
			for (const [name, value] of Object.entries(limited)) response.setHeader(name, value);
			rateLimitState = { remaining: state.remaining, reset: state.reset };
		}

		if (pathname === '/health' && ['GET', 'HEAD'].includes(request.method)) {
			sendBody(request, response, 200, { contentType: 'application/json; charset=utf-8', pathname, origin }, JSON.stringify({ ok: true, commit: GIT_SHA }));
			return;
		}

		if (pathname === '/robots.txt' && ['GET', 'HEAD'].includes(request.method)) {
			sendBody(request, response, 200, {
				contentType: 'text/plain; charset=utf-8',
				pathname,
				origin,
				extra: { 'access-control-allow-origin': '*' },
			}, robotsBody(origin));
			return;
		}

		const ctx = { origin, pathname, url: request.url, rateLimit: rateLimitState };

		if (pathname === '/mcp') {
			if (handleMcp && (await handleMcp(request, response, ctx))) return;
			sendProblem(request, response, origin, pathname, notFoundProblem(origin, pathname), { allow: 'GET, HEAD, POST, OPTIONS' });
			return;
		}

		if (isApiPathname(pathname)) {
			for (const handler of apiHandlers) {
				if (await handler(request, response, ctx)) return;
			}
			await serveStatic(request, response, pathname, origin);
			return;
		}

		if (['GET', 'HEAD'].includes(request.method)) {
			const markdownPath = await resolveMarkdown(pathname);
			if (markdownPath && (pathname.endsWith('.md') || prefersMarkdown(request.headers.accept))) {
				await serveMarkdown(request, response, markdownPath, pathname, origin);
				return;
			}
		}

		await serveStatic(request, response, pathname, origin);
	} catch (error) {
		console.error('[server] unhandled error:', error);
		if (!response.headersSent) {
			sendProblem(request, response, origin, '/', { type: `${origin}/problems/internal`, title: 'Internal Server Error', status: 500, detail: 'The server failed to handle this request.', instance: request.url || '/' });
		} else {
			response.end();
		}
	}
});

server.listen(PORT, () => {
	console.log(`emin.de origin server on http://localhost:${PORT} (dist: ${DIST_DIR}, commit: ${GIT_SHA})`);
	console.log(`SITE_ORIGIN for canonical URLs: ${absoluteUrl('/')}`);
	if (!handleMcp) console.log('/mcp is registered but src/lib/mcp.mjs is missing — that route 404s for now.');
});
