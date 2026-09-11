// Article data layer + shared HTTP helpers for every machine-facing route.
//
// One place loads src/content/articles.mjs (written by another agent), so the
// MCP server, the x402 corpus endpoint and the plain JSON API all serve the
// same bytes. The content module is imported dynamically: it may not exist yet
// during early scaffolding, and it must fail with a readable error, not a
// bare MODULE_NOT_FOUND.

import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

import { AUTHOR_NAME, SITE_DEFINITION, SITE_ORIGIN, SITE_NAME, SITE_TAGLINE, absoluteUrl } from './site.mjs';

const DEFAULT_ARTICLES_MODULE = new URL('../content/articles.mjs', import.meta.url);

// Matches server.mjs: 120 requests per minute on /api*. Never advertise a
// different number here.
export const RATE_LIMIT = { limit: 120, windowSeconds: 60 };

let loaded;

export async function loadArticles() {
	if (!loaded) loaded = loadArticlesModule();
	return loaded;
}

async function loadArticlesModule() {
	const spec = process.env.EMIN_ARTICLES_MODULE
		? pathToFileURL(resolve(process.env.EMIN_ARTICLES_MODULE))
		: DEFAULT_ARTICLES_MODULE;

	let mod;
	try {
		mod = await import(spec.href);
	} catch (error) {
		throw new Error(
			`Article content module unavailable at ${spec.href}: ${error.message}. ` +
				'Expected src/content/articles.mjs exporting `articles`; set EMIN_ARTICLES_MODULE to test another module.'
		);
	}

	const articles = Array.isArray(mod.articles) ? mod.articles : [];
	if (!articles.length) throw new Error(`Article content module ${spec.href} exports no articles.`);

	const topics = [...new Set(articles.flatMap((article) => article.topics || []))].sort();
	return { mod, articles, topics };
}

// Sections may be {heading, body}, {title, markdown} or plain strings.
export function articleSections(article) {
	const sections = Array.isArray(article.sections) ? article.sections : [];
	return sections.map((section) =>
		typeof section === 'string'
			? { heading: null, body: section }
			: { heading: section?.heading ?? section?.title ?? null, body: String(section?.body ?? section?.markdown ?? '') }
	);
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
		url: absoluteUrl(`/posts/${article.slug}`),
		markdownUrl: absoluteUrl(`/posts/${article.slug}/index.md`),
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
	// Limit/Policy always match server.mjs. Remaining and Reset are only sent
	// when the caller actually knows them; guessing them would be a lie.
	const headers = {
		'RateLimit-Policy': `${RATE_LIMIT.limit};w=${RATE_LIMIT.windowSeconds}`,
		'RateLimit-Limit': String(RATE_LIMIT.limit),
	};
	const { remaining, reset } = ctx.rateLimit || {};
	if (Number.isInteger(remaining)) headers['RateLimit-Remaining'] = String(Math.max(0, remaining));
	if (Number.isInteger(reset)) headers['RateLimit-Reset'] = String(Math.max(0, reset));
	return headers;
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

// RFC 9457 problem details. `type` is a URN so no documentation URL has to exist.
export function sendProblem(req, res, status, title, detail, extra = {}) {
	return sendJson(
		req,
		res,
		status,
		{ type: `urn:emin.de:problem:${title.toLowerCase().replaceAll(' ', '-')}`, title, status, detail, ...extra },
		{ 'content-type': 'application/problem+json; charset=utf-8' }
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
		return sendProblem(req, res, 405, 'Method Not Allowed', `${req.method} is not supported; use GET.`, {
			allow: 'GET, HEAD',
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
		return sendProblem(req, res, 404, 'Article Not Found', `No article with slug "${slug}".`, {
			...headers,
			instance: `/api/articles/${slug}`,
			availableSlugs: articles.map((entry) => entry.slug),
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
