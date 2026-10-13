// Content-type, cache and discovery-header helpers for the origin server.
// Kept out of server.mjs so the routing logic stays readable.
import { linkHeaderValue } from './site.mjs';

// Content Signals policy: this site is searchable and usable as AI input,
// but its text is not training data. Mirror this exact string in robots.txt.
export const CONTENT_SIGNAL = 'search=yes, ai-train=no, ai-input=yes';
export const ROBOTS_TAG = 'index, follow, max-snippet:-1, max-image-preview:large';

// The RFC 8288 discovery Link header. Exported so server.mjs can set it as a
// baseline header on responses written by sibling modules (which bypass
// baseHeaders and call writeHead themselves).
export const DISCOVERY_LINK_HEADER = linkHeaderValue();

export const MIME_TYPES = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.mjs': 'text/javascript; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.webmanifest': 'application/manifest+json; charset=utf-8',
	'.xml': 'application/xml; charset=utf-8',
	'.txt': 'text/plain; charset=utf-8',
	'.md': 'text/markdown; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.png': 'image/png',
	'.avif': 'image/avif',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.webp': 'image/webp',
	'.ico': 'image/x-icon',
	'.woff': 'font/woff',
	'.woff2': 'font/woff2',
	'.mp4': 'video/mp4',
	'.pdf': 'application/pdf',
};

// Extensionless agent endpoints that are not plain text/json by name.
export const PATH_MIME_TYPES = {
	'/auth.md': 'text/markdown; charset=utf-8',
	'/.well-known/api-catalog': 'application/linkset+json; charset=utf-8',
	'/rss.xml': 'application/rss+xml; charset=utf-8',
	'/atom.xml': 'application/atom+xml; charset=utf-8',
	'/feed.json': 'application/feed+json; charset=utf-8',
	'/llms.txt': 'text/markdown; charset=utf-8',
};

// Per-language feeds (/de/rss.xml) get the same types.
export function pathMimeType(pathname) {
	return PATH_MIME_TYPES[pathname] || PATH_MIME_TYPES[pathname.replace(/^\/[a-z]{2}(?=\/)/, '')];
}

const IMMUTABLE_EXTENSIONS = /\.(css|js|mjs|woff2?|avif|webp|png|jpe?g|svg|mp4|ico)$/;

export function getOrigin(request, port) {
	const forwarded = request.headers['x-forwarded-proto'];
	const proto = typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : 'http';
	const host = request.headers.host || `localhost:${port}`;
	return `${proto}://${host}`;
}

export function contentTypeFor(pathname, filePath) {
	return pathMimeType(pathname) || MIME_TYPES[(String(filePath).match(/\.[a-z0-9]+$/i)?.[0] || '').toLowerCase()] || 'application/octet-stream';
}

export function cacheControlFor(pathname, contentType) {
	if (pathname.startsWith('/_astro/') || IMMUTABLE_EXTENSIONS.test(pathname) || /^(image|font|video)\//.test(contentType)) {
		return 'public, max-age=31536000, immutable';
	}
	if (contentType.startsWith('text/html') || contentType.startsWith('text/markdown')) {
		return 'public, max-age=300';
	}
	return 'public, max-age=3600';
}

// Every response carries the RFC 8288 discovery Link header, Content-Signal and
// Vary: Accept (without Vary a shared cache can hand HTML to a Markdown client).
export function baseHeaders({ contentType, pathname, origin, extra = {} }) {
	const headers = {
		'content-type': contentType,
		'content-signal': CONTENT_SIGNAL,
		link: DISCOVERY_LINK_HEADER,
		vary: 'Accept',
		'cache-control': cacheControlFor(pathname, contentType),
		'x-origin-host': origin,
	};
	if (contentType.startsWith('text/html')) headers['x-robots-tag'] = ROBOTS_TAG;
	return { ...headers, ...extra };
}

// Citation and search bots this site explicitly welcomes. Nothing is disallowed;
// the allow rules exist so an auditor can see intent per user-agent.
export const AI_BOTS = [
	'GPTBot',
	'OAI-SearchBot',
	'ChatGPT-User',
	'ClaudeBot',
	'Claude-SearchBot',
	'Claude-User',
	'PerplexityBot',
	'Perplexity-User',
	'Google-Extended',
	'Googlebot',
	'Bingbot',
	'Applebot',
	'Applebot-Extended',
	'Amazonbot',
	'meta-externalagent',
	'CCBot',
];

export function robotsBody(origin) {
	const blocks = AI_BOTS.map((bot) => `User-agent: ${bot}\nAllow: /`).join('\n\n');
	return `# ${origin}
# This site welcomes search engines, AI crawlers and AI citation agents.
# Nothing here is disallowed. Markdown mirrors: append .md to any page path.

Content-Signal: ${CONTENT_SIGNAL}

User-agent: *
Allow: /
Disallow:

${blocks}

Sitemap: ${origin}/sitemap.xml
`;
}
