// Article data layer + shared HTTP helpers for every machine-facing route.
//
// One place loads src/content/articles.mjs (written by another agent), so the
// MCP server, the x402 corpus endpoint and the plain JSON API all serve the
// same bytes. The content module is imported dynamically: it may not exist yet
// during early scaffolding, and it must fail with a readable error, not a
// bare MODULE_NOT_FOUND.


import { AUTHOR_NAME, SITE_DEFINITION, SITE_ORIGIN, SITE_NAME, SITE_TAGLINE, absoluteUrl } from './site.mjs';
import { problemBody } from './problem-json.mjs';


// Matches server.mjs: 120 requests per minute on /api*. Never advertise a
// different number here.
export const RATE_LIMIT = { limit: 120, windowSeconds: 60 };

let loaded;

export async function loadArticles() {
	if (!loaded) loaded = loadArticlesModule();
	return loaded;
}

async function loadArticlesModule() {
	// Default: static import, so bundlers (the Cloudflare Worker) include the
	// content graph. EMIN_ARTICLES_MODULE swaps in a fixture for Node tests.
	const override = globalThis.process?.env?.EMIN_ARTICLES_MODULE;
	let mod;
	if (!override) {
		mod = await import('../content/articles.mjs');
	} else {
		const { pathToFileURL } = await import('node:url');
		const { resolve } = await import('node:path');
		const spec = pathToFileURL(resolve(override));
		try {
			mod = await import(spec.href);
		} catch (error) {
			throw new Error(`Article content module unavailable at ${spec.href}: ${error.message}.`);
		}
	}
	const spec = { href: override || 'src/content/articles.mjs' };

	const articles = Array.isArray(mod.articles) ? mod.articles : [];
	if (!articles.length) throw new Error(`Article content module ${spec.href} exports no articles.`);

	const topics = [...new Set(articles.flatMap((article) => article.topics || []))].sort();
	return { mod, articles, topics };
}

// Sections may be {heading, body}, {heading, paragraphs}, {title, markdown} or
// plain strings — src/content/articles.mjs uses paragraphs.
export function articleSections(article) {
	const sections = Array.isArray(article.sections) ? article.sections : [];
	return sections.map((section) => {
		if (typeof section === 'string') return { heading: null, body: section };
		const raw = section?.body ?? section?.markdown ?? section?.paragraphs ?? '';
		return { heading: section?.heading ?? section?.title ?? null, body: Array.isArray(raw) ? raw.join('\n\n') : String(raw) };
	});
}

export function articleMarkdown(article, mod) {
	// Prefer the content module's own renderer when it ships one, so the MCP
	// output cannot drift from the site's Markdown mirrors.
	const render = mod?.articleMarkdown || mod?.renderArticleMarkdown;
	if (typeof render === 'function') return render(article);

	const lines = [`# ${article.title}`, ''];
	if (article.description) lines.push(article.description, '');
	if (article.tldr) lines.push('## TL;DR', '', article.tldr, '');
	for (const section of articleSections(article)) {
		if (section.heading) lines.push(`## ${section.heading}`, '');
		if (section.body) lines.push(section.body, '');
	}
	if (article.topics?.length) lines.push(`Topics: ${article.topics.join(', ')}`, '');
	if (article.publishedAt) lines.push(`Published: ${article.publishedAt}`, '');
	if (article.modifiedAt) lines.push(`Updated: ${article.modifiedAt}`, '');
	return lines.join('\n').trim();
}

export function articleSummary(article) {
	return {
		slug: article.slug,
		title: article.title,
		description: article.description,
		publishedAt: article.publishedAt,
		modifiedAt: article.modifiedAt,
		topics: article.topics || [],
		wordCount: article.wordCount,
		url: absoluteUrl(article.path || `/posts/${article.slug}`),
		markdownUrl: absoluteUrl(article.markdownPath || `/posts/${article.slug}/index.md`),
		lang: article.lang,
		category: article.category,
		format: article.format,
		author: article.author,
		authorType: article.authorType,
		provenance: article.provenance,
	};
}

export function articleBySlug(articles, slug) {
	return articles.find((article) => article.slug === slug) || null;
}

export async function articleView(slug) {
	const { mod, articles } = await loadArticles();
	const article = articleBySlug(articles, slug);
	if (!article) return null;
	return { article, markdown: articleMarkdown(article, mod), summary: articleSummary(article) };
}

// Plain keyword search over title, topics, description, tldr and body text.
// ponytail: linear scan, ~dozens of articles; add an index when that stops being true.
export function searchArticles(articles, query, limit) {
	const terms = String(query).toLowerCase().split(/\s+/).filter(Boolean);
	if (!terms.length) return [];

	const scored = articles.map((article) => {
		const title = String(article.title || '').toLowerCase();
		const topics = (article.topics || []).join(' ').toLowerCase();
		const lead = `${article.description || ''} ${article.tldr || ''}`.toLowerCase();
		const body = articleSections(article)
			.map((section) => `${section.heading || ''} ${section.body}`)
			.join(' ')
			.toLowerCase();

		let score = 0;
		for (const term of terms) {
			if (title.includes(term)) score += 3;
			if (topics.includes(term)) score += 2;
			if (lead.includes(term)) score += 2;
			if (body.includes(term)) score += 1;
		}
		const snippet = body.includes(terms[0]) ? body : lead;
		const at = snippet.indexOf(terms[0]);
		return {
			...articleSummary(article),
			score,
			snippet: (at > 0 ? `…${snippet.slice(Math.max(0, at - 80), at + 160)}` : snippet.slice(0, 240)).trim(),
		};
	});

	return scored
		.filter((entry) => entry.score > 0)
		.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
		.slice(0, limit);
}

export function topicIndex(articles) {
	const map = new Map();
	for (const article of articles) {
		for (const topic of article.topics || []) {
			if (!map.has(topic)) map.set(topic, []);
			map.get(topic).push(article.slug);
		}
	}
	return [...map.entries()]
		.map(([topic, slugs]) => ({ topic, count: slugs.length, articles: slugs.sort() }))
		.sort((a, b) => b.count - a.count || a.topic.localeCompare(b.topic));
}

export async function siteSummary() {
	const { articles, topics } = await loadArticles();
	const words = articles.reduce((total, article) => total + (article.wordCount || 0), 0);
	const published = articles.map((article) => article.publishedAt).filter(Boolean).sort();
	return {
		name: SITE_NAME,
		definition: SITE_DEFINITION,
		tagline: SITE_TAGLINE,
		author: AUTHOR_NAME,
		url: absoluteUrl('/'),
		counts: { articles: articles.length, topics: topics.length, words },
		dateRange: { first: published[0] ?? null, latest: published.at(-1) ?? null },
		topics,
		endpoints: {
			articles: absoluteUrl('/api/articles'),
			article: absoluteUrl('/api/articles/{slug}'),
			corpus: absoluteUrl('/api/v1/corpus'),
			mcp: absoluteUrl('/mcp'),
			markdown: absoluteUrl('/llms-full.txt'),
			openapi: absoluteUrl('/openapi.json'),
		},
	};
}

// --- HTTP helpers shared by mcp.mjs, x402.mjs and this module -------------

export function requestUrl(req, ctx = {}) {
	if (ctx.url) return new URL(ctx.url, SITE_ORIGIN);
	return new URL(req.url || '/', ctx.origin || SITE_ORIGIN);
}

export function rateLimitHeaders(ctx = {}) {
	// Exactly the two fields server.mjs emits for the same 120 req/min bucket,
	// so a client never sees two competing limits. remaining/reset are only
	// reported when the caller supplies them.
	const { remaining, reset } = ctx.rateLimit || {};
	const state = [`limit=${RATE_LIMIT.limit}`];
	if (Number.isInteger(remaining)) state.push(`remaining=${Math.max(0, remaining)}`);
	if (Number.isInteger(reset)) state.push(`reset=${Math.max(0, reset)}`);
	return {
		'ratelimit-policy': `${RATE_LIMIT.limit};w=${RATE_LIMIT.windowSeconds}`,
		ratelimit: state.join(', '),
	};
}

export function sendJson(req, res, status, body, headers = {}) {
	const payload = JSON.stringify(body, null, 2);
	res.writeHead(status, {
		'content-type': 'application/json; charset=utf-8',
		'cache-control': 'no-store',
		...headers,
	});
	res.end(req.method === 'HEAD' ? undefined : payload);
	return true;
}

// RFC 9457 problem details, built with the site-wide problem shape so every
// /api error body on emin.de looks the same.
export function sendProblem(req, res, status, { origin, pathname, title, detail, type, extra = {}, headers = {} }) {
	return sendJson(
		req,
		res,
		status,
		{ ...problemBody({ origin: origin || SITE_ORIGIN, pathname, status, title, detail, type }), ...extra },
		{ 'content-type': 'application/problem+json; charset=utf-8', ...headers }
	);
}

export function readJsonBody(req, limit = 262144) {
	return new Promise((resolvePromise) => {
		let size = 0;
		const chunks = [];
		req.on('data', (chunk) => {
			size += chunk.length;
			if (size > limit) {
				req.destroy();
				resolvePromise({ ok: false, error: 'request body too large' });
				return;
			}
			chunks.push(chunk);
		});
		req.on('end', () => {
			const raw = Buffer.concat(chunks).toString('utf8');
			if (!raw.trim()) return resolvePromise({ ok: true, value: null });
			try {
				resolvePromise({ ok: true, value: JSON.parse(raw) });
			} catch (error) {
				resolvePromise({ ok: false, error: error.message });
			}
		});
		req.on('error', (error) => resolvePromise({ ok: false, error: error.message }));
	});
}

// --- Plain JSON read API --------------------------------------------------

const API_PREFIX = '/api/articles';

export async function handleArticlesApi(req, res, ctx = {}) {
	const { pathname } = requestUrl(req, ctx);
	if (pathname !== API_PREFIX && !pathname.startsWith(`${API_PREFIX}/`)) return false;
	if (req.method !== 'GET' && req.method !== 'HEAD') {
		return sendProblem(req, res, 405, {
			origin: ctx.origin,
			pathname,
			title: 'Method Not Allowed',
			detail: `${req.method} is not supported; use GET.`,
			extra: { allow: 'GET, HEAD' },
			headers: rateLimitHeaders(ctx),
		});
	}

	const headers = rateLimitHeaders(ctx);
	const { mod, articles } = await loadArticles();

	if (pathname === API_PREFIX || pathname === `${API_PREFIX}/`) {
		return sendJson(
			req,
			res,
			200,
			{ count: articles.length, articles: articles.map(articleSummary) },
			{ ...headers, link: `<${absoluteUrl('/api/v1/corpus')}>; rel="payment"; title="Full corpus"` }
		);
	}

	const slug = decodeURIComponent(pathname.slice(`${API_PREFIX}/`.length)).replace(/\/$/, '');
	const article = articleBySlug(articles, slug);
	if (!article) {
		return sendProblem(req, res, 404, {
			origin: ctx.origin,
			pathname,
			title: 'Article Not Found',
			detail: `No article with slug "${slug}". Machine-readable index: ${absoluteUrl('/api/articles')}`,
			extra: { instance: `/api/articles/${slug}`, availableSlugs: articles.map((entry) => entry.slug) },
			headers,
		});
	}

	return sendJson(
		req,
		res,
		200,
		{ ...articleSummary(article), markdown: articleMarkdown(article, mod) },
		headers
	);
}
