// Single source of truth for identity, URLs and the agent-discovery surface.
// Every route, schema block, sitemap entry and llms.txt line reads from here,
// so there is exactly one place to change a fact.

export const SITE_ORIGIN = 'https://emin.de';
export const SITE_NAME = 'emin.de';
export const AUTHOR_NAME = 'Emin Mahrt';
export const AUTHOR_URL = 'https://emin.de/about';
export const AUTHOR_SAME_AS = [
	'https://github.com/eminogrande',
	'https://x.com/eminogrande',
	'https://www.linkedin.com/in/eminmahrt',
];

// What this site IS, in one sentence. Used verbatim as the llms.txt opener and
// the Organization/WebSite description. Never "emin.de is a website".
export const SITE_DEFINITION =
	'emin.de publishes long-form written work by Emin Mahrt on Bitcoin self-custody, payment rails, AI agents and the engineering behind them. Every article is machine-readable: Markdown mirrors, structured data, a public MCP server and paid x402 endpoints for agents that want bulk access.';

export const SITE_TAGLINE = 'Long-form engineering writing, built to be read by people and agents.';

export const KNOWS_ABOUT = [
	'Bitcoin self-custody',
	'passkeys and WebAuthn PRF',
	'MuSig2 co-signing',
	'x402 agent payments',
	'Model Context Protocol',
	'agent-readiness engineering',
	'SEO and generative engine optimization',
	'payment rails and SEPA',
];

export function absoluteUrl(path = '/') {
	if (/^https?:\/\//.test(path)) return path;
	return `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
}

// Routes that exist as HTML pages and belong in the sitemap.
export const STATIC_PATHS = [
	'/',
	'/posts',
	'/about',
	'/contact',
	'/developers',
	'/agent-ready',
	'/privacy',
];

// The machine-facing surface, advertised in Link headers and <head>.
// rel values follow RFC 8288 and the respective specs.
export const DISCOVERY_LINKS = [
	{ href: '/llms.txt', rel: 'alternate', type: 'text/markdown', title: 'llms.txt' },
	{ href: '/llms-full.txt', rel: 'alternate', type: 'text/plain', title: 'Full site Markdown context' },
	{ href: '/sitemap.xml', rel: 'sitemap', type: 'application/xml' },
	{ href: '/openapi.json', rel: 'service-desc', type: 'application/json' },
	{ href: '/auth.md', rel: 'service-desc', type: 'text/markdown' },
	{ href: '/.well-known/api-catalog', rel: 'api-catalog', type: 'application/linkset+json' },
	{ href: '/.well-known/api-catalog', rel: 'service-desc', type: 'application/linkset+json' },
	{ href: '/.well-known/mcp/server-card.json', rel: 'describedby', type: 'application/json' },
	{ href: '/.well-known/agent-card.json', rel: 'describedby', type: 'application/json' },
	{ href: '/.well-known/agent-skills/index.json', rel: 'service-desc', type: 'application/json' },
	{ href: '/.well-known/webmcp.json', rel: 'service-desc', type: 'application/json' },
	{ href: '/.well-known/ai-catalog.json', rel: 'ai-catalog', type: 'application/json' },
	{ href: '/.well-known/ucp', rel: 'describedby', type: 'application/json' },
	{ href: '/.well-known/acp.json', rel: 'describedby', type: 'application/json' },
	{ href: '/.well-known/agentic-commerce.json', rel: 'describedby', type: 'application/json' },
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
		founder: { '@type': 'Person', name: AUTHOR_NAME, url: AUTHOR_URL },
		knowsAbout: KNOWS_ABOUT,
		sameAs: AUTHOR_SAME_AS,
		contactPoint: {
			'@type': 'ContactPoint',
			contactType: 'editorial',
			email: 'hello@emin.de',
			url: absoluteUrl('/contact'),
			availableLanguage: ['en', 'de'],
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
		jobTitle: 'Engineer and writer',
	};
}

export function websiteSchema() {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': absoluteUrl('/#website'),
		name: SITE_NAME,
		url: absoluteUrl('/'),
		description: SITE_DEFINITION,
		inLanguage: 'en',
		publisher: { '@id': absoluteUrl('/#organization') },
		potentialAction: {
			'@type': 'SearchAction',
			target: { '@type': 'EntryPoint', urlTemplate: `${SITE_ORIGIN}/posts?q={search_term_string}` },
			'query-input': 'required name=search_term_string',
		},
	};
}
