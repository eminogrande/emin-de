// Identity, URLs, discovery links and entity schema. Every value is derived
// from site.config.mjs; this file holds no site-specific facts of its own.
import config from '../../site.config.mjs';

export const SITE = config;
export const SITE_ORIGIN = config.origin;
export const SITE_NAME = config.name;
const owner = config.authors[config.owner];
export const AUTHOR_NAME = owner.name;
export const AUTHOR_URL = `${config.origin}${owner.url || '/about'}`;
export const AUTHOR_SAME_AS = owner.sameAs || [];
export const SITE_DEFINITION = config.definition;
export const SITE_TAGLINE = config.tagline;
export const KNOWS_ABOUT = config.knowsAbout;

export function absoluteUrl(path = '/') {
	if (/^https?:\/\//.test(path)) return path;
	return `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
}

// Non-post HTML pages in the default language that belong in the sitemap.
export const STATIC_PATHS = ['/', '/posts', '/about', '/contact', '/developers', '/agent-ready', '/privacy', '/talks', '/changelog', '/archive'];

// The machine-facing surface, advertised in Link headers and <head>. Only
// documents this repo actually serves are listed: tests/engine.test.mjs fetches
// every href from the built output and fails on a missing file.
export const DISCOVERY_LINKS = [
	{ href: '/llms.txt', rel: 'alternate', type: 'text/markdown', title: 'llms.txt' },
	{ href: '/llms-full.txt', rel: 'alternate', type: 'text/plain', title: 'Full site Markdown context' },
	{ href: '/sitemap.xml', rel: 'sitemap', type: 'application/xml' },
	{ href: '/rss.xml', rel: 'alternate', type: 'application/rss+xml', title: 'RSS feed' },
	{ href: '/atom.xml', rel: 'alternate', type: 'application/atom+xml', title: 'Atom feed' },
	{ href: '/feed.json', rel: 'alternate', type: 'application/feed+json', title: 'JSON Feed' },
	{ href: '/openapi.json', rel: 'service-desc', type: 'application/json' },
	{ href: '/auth.md', rel: 'service-doc', type: 'text/markdown' },
	{ href: '/.well-known/api-catalog', rel: 'api-catalog', type: 'application/linkset+json' },
	{ href: '/.well-known/mcp/server-card.json', rel: 'describedby', type: 'application/json' },
];

export function linkHeaderValue() {
	return DISCOVERY_LINKS.map(({ href, rel, type }) => `<${href}>; rel="${rel}"; type="${type}"`).join(', ');
}

export function organizationSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'@id': absoluteUrl('/#organization'),
		name: SITE_NAME,
		url: absoluteUrl('/'),
		description: SITE_DEFINITION,
		founder: { '@id': absoluteUrl('/#person') },
		knowsAbout: KNOWS_ABOUT,
		sameAs: AUTHOR_SAME_AS,
		contactPoint: {
			'@type': 'ContactPoint',
			contactType: 'editorial',
			email: config.email,
			url: absoluteUrl('/contact'),
			availableLanguage: config.locales.map((l) => l.code),
		},
	};
}

export function personSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'Person',
		'@id': absoluteUrl('/#person'),
		name: AUTHOR_NAME,
		url: AUTHOR_URL,
		sameAs: AUTHOR_SAME_AS,
		knowsAbout: KNOWS_ABOUT,
		jobTitle: owner.jobTitle,
	};
}

// No SearchAction: the site has no search results page, and declaring one
// would send agents to a URL that ignores the query.
export function websiteSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': absoluteUrl('/#website'),
		name: SITE_NAME,
		url: absoluteUrl('/'),
		description: SITE_DEFINITION,
		inLanguage: config.locales.map((l) => l.code),
		publisher: { '@id': absoluteUrl('/#organization') },
	};
}
