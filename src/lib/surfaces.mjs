// Text surfaces generated from the content graph: Markdown mirrors for listing
// pages, JSON-LD, RSS/Atom/JSON Feed, sitemap with hreflang, llms.txt and
// llms-full.txt. Pure functions, no I/O.
import config from '../../site.config.mjs';
import { displayAuthor, authorLabel } from './content-build-shared.mjs';
import { posts, postsIn, activeLangs, changelogMarkdown } from './corpus.mjs';
import { LIST_ROUTES, POST_ROUTES, hreflangLinks, isTalk } from './routes.mjs';
import { absoluteUrl, STATIC_PATHS, SITE_DEFINITION } from './site.mjs';
import { DEFAULT_LANG, feedPath, markdownMirrorPath, ogImagePath, t, label } from './paths.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const link = (text, url) => `[${text.replace(/[[\]]/g, '')}](${absoluteUrl(url)})`;

export function authorOf(post) {
	return config.authors[post.author];
}

// --- schema.org ---------------------------------------------------------------
export function authorSchema(id) {
	const author = config.authors[id];
	if (id === config.owner) return { '@id': absoluteUrl('/#person') };
	if (author.type === 'ai_editorial') {
		// An AI desk is not a person. Organization, openly labelled, no bio/photo.
		return {
			'@type': 'Organization',
			'@id': absoluteUrl(`/author/${id}#desk`),
			name: author.name,
			description: label(author.description, DEFAULT_LANG),
			url: absoluteUrl(`/author/${id}`),
			parentOrganization: { '@id': absoluteUrl('/#organization') },
		};
	}
	return { '@type': 'Person', name: author.name, url: absoluteUrl(author.url || `/author/${id}`), sameAs: author.sameAs || [] };
}

export function postSchema(post) {
	const url = absoluteUrl(post.path);
	const guest = config.authors[post.author].type === 'guest';
	const author = authorOf(post);
	const blog = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		'@id': `${url}#article`,
		mainEntityOfPage: { '@type': 'WebPage', '@id': url },
		url,
		headline: post.title,
		description: post.description,
		datePublished: post.publishedAt || post.date,
		dateModified: post.updated,
		inLanguage: post.lang,
		wordCount: post.wordCount,
		articleSection: label(config.categories[post.category], post.lang),
		genre: post.format,
		keywords: post.tags.join(', ') || undefined,
		image: absoluteUrl(post.image || ogImagePath(post)),
		author: guest ? { '@type': 'Person', name: post.originalAuthor } : authorSchema(post.author),
		publisher: { '@id': absoluteUrl('/#organization') },
		isAccessibleForFree: true,
		license: 'https://creativecommons.org/licenses/by/4.0/',
		citation: post.sourceLinks.map((s) => s.url),
	};
	if (author.type === 'ai_editorial') {
		blog.editor = { '@id': absoluteUrl('/#person') };
		blog.creativeWorkStatus = post.reviewedByHuman ? author.label.en : `${author.label.en}: not yet reviewed`;
		blog.disambiguatingDescription = authorLabel(post);
	}
	if (post.externalCanonical) blog.isBasedOn = post.canonical;
	const translations = Object.entries(post.translations).map(([lang, slug]) => posts.find((p) => p.lang === lang && p.slug === slug)).filter(Boolean);
	if (translations.length) blog.workTranslation = translations.map((p) => ({ '@id': `${absoluteUrl(p.path)}#article` }));
	const out = [
		blog,
		{
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: [
				{ '@type': 'ListItem', position: 1, name: t(post.lang, 'home'), item: absoluteUrl(post.lang === DEFAULT_LANG ? '/' : `/${post.lang}`) },
				{ '@type': 'ListItem', position: 2, name: label(config.categories[post.category], post.lang), item: absoluteUrl(`${post.lang === DEFAULT_LANG ? '' : `/${post.lang}`}/category/${post.category}`) },
				{ '@type': 'ListItem', position: 3, name: post.title, item: url },
			],
		},
	];
	if (post.video) out.push(videoSchema(post));
	return out;
}

export function youtubeId(url) {
	return String(url).match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/)?.[1] || null;
}

export function videoSchema(post) {
	const id = youtubeId(post.video.url);
	return {
		'@context': 'https://schema.org',
		'@type': 'VideoObject',
		name: post.video.title || post.title,
		description: post.description,
		uploadDate: post.video.upload_date || post.date,
		...(post.video.duration ? { duration: post.video.duration } : {}),
		thumbnailUrl: id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : absoluteUrl(ogImagePath(post)),
		contentUrl: post.video.url,
		...(id ? { embedUrl: `https://www.youtube-nocookie.com/embed/${id}` } : {}),
		inLanguage: post.lang,
		author: authorSchema(post.author),
	};
}

export function listSchema(route) {
	return {
		'@context': 'https://schema.org',
		'@type': 'CollectionPage',
		name: route.title,
		url: absoluteUrl(route.path),
		inLanguage: route.lang,
		mainEntity: {
			'@type': 'ItemList',
			numberOfItems: route.posts.length,
			itemListElement: route.posts.map((post, index) => ({ '@type': 'ListItem', position: index + 1, url: absoluteUrl(post.path), name: post.title })),
		},
	};
}

// --- Markdown mirrors for listing pages --------------------------------------
export function postLine(post) {
	const author = authorOf(post);
	const tag = author.type !== 'human' ? ` ${authorLabel(post)}.` : '';
	return `- ${link(post.title, post.path)} (${post.date}, ${post.format}, ${displayAuthor(post)}.${tag}) ${post.description} Markdown: ${link('index.md', post.markdownPath)}`;
}

export function listMarkdown(route) {
	const lines = [`# ${route.title}`, '', `> ${route.description}`, ''];
	if (route.kind === 'changelog' && route.lang === DEFAULT_LANG && changelogMarkdown) {
		lines.push(changelogMarkdown.replace(/^# .*\n/, '').trim(), '');
	}
	if (route.posts.length) lines.push(...route.posts.map(postLine), '');
	else if (route.kind !== 'changelog') lines.push('Nothing published here yet.', '');
	const others = route.alternates.filter((a) => a.lang !== route.lang);
	if (others.length) lines.push(`${t(route.lang, 'alsoIn')}: ${others.map((a) => link(a.lang, a.path)).join(', ')}`, '');
	return lines.join('\n');
}

// --- feeds ---------------------------------------------------------------------
const feedPosts = (lang) => postsIn(lang).slice(0, 50);

export function rssFeed(lang) {
	const items = feedPosts(lang)
		.map((post) => `<item><title>${esc(post.title)}</title><link>${absoluteUrl(post.path)}</link><guid isPermaLink="true">${absoluteUrl(post.path)}</guid><pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate><dc:creator>${esc(displayAuthor(post))}</dc:creator><category>${esc(post.category)}</category><description>${esc(post.description)}</description></item>`)
		.join('\n');
	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
<channel><title>${esc(config.name)}</title><link>${absoluteUrl(lang === DEFAULT_LANG ? '/' : `/${lang}`)}</link><description>${esc(config.tagline)}</description><language>${lang}</language><atom:link href="${absoluteUrl(feedPath(lang, 'rss'))}" rel="self" type="application/rss+xml"/>
${items}
</channel></rss>
`;
}

export function atomFeed(lang) {
	const list = feedPosts(lang);
	const updated = list.map((p) => p.updated).sort().at(-1) || '1970-01-01';
	const entries = list
		.map((post) => `<entry><title>${esc(post.title)}</title><link href="${absoluteUrl(post.path)}"/><link rel="alternate" type="text/markdown" href="${absoluteUrl(post.markdownPath)}"/><id>${absoluteUrl(post.path)}</id><published>${post.date}T00:00:00Z</published><updated>${post.updated}T00:00:00Z</updated><author><name>${esc(displayAuthor(post))}</name></author><category term="${esc(post.category)}"/><summary>${esc(post.description)}</summary></entry>`)
		.join('\n');
	return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${lang}"><title>${esc(config.name)}</title><subtitle>${esc(config.tagline)}</subtitle><link href="${absoluteUrl(lang === DEFAULT_LANG ? '/' : `/${lang}`)}"/><link rel="self" href="${absoluteUrl(feedPath(lang, 'atom'))}"/><id>${absoluteUrl(feedPath(lang, 'atom'))}</id><updated>${updated}T00:00:00Z</updated>
${entries}
</feed>
`;
}

export function jsonFeed(lang) {
	return JSON.stringify(
		{
			version: 'https://jsonfeed.org/version/1.1',
			title: config.name,
			home_page_url: absoluteUrl(lang === DEFAULT_LANG ? '/' : `/${lang}`),
			feed_url: absoluteUrl(feedPath(lang, 'json')),
			description: config.tagline,
			language: lang,
			items: feedPosts(lang).map((post) => ({
				id: absoluteUrl(post.path),
				url: absoluteUrl(post.path),
				title: post.title,
				summary: post.description,
				content_text: post.markdown,
				date_published: `${post.date}T00:00:00Z`,
				date_modified: `${post.updated}T00:00:00Z`,
				language: post.lang,
				tags: [post.category, post.format, ...post.tags],
				authors: [{ name: displayAuthor(post) }],
				image: absoluteUrl(post.image || ogImagePath(post)),
				_provenance: { provenance: post.provenance, ai_assisted: post.aiAssisted, reviewed_by_human: post.reviewedByHuman, author_type: post.authorType },
			})),
		},
		null,
		1
	);
}

// --- sitemap -------------------------------------------------------------------
// Indexable posts and real listing routes only. Posts with an external
// canonical are excluded: the sitemap must not list URLs that canonicalise
// elsewhere. noindex posts never appear (they are not in `posts`).
export function sitemapXml() {
	const entries = [];
	const seen = new Set();
	const push = (path, lastmod, alternates) => {
		if (seen.has(path)) return;
		seen.add(path);
		entries.push({ path, lastmod, alternates: hreflangLinks(alternates) });
	};
	for (const path of STATIC_PATHS) push(path, null, null);
	for (const route of LIST_ROUTES) push(route.path, route.posts[0]?.updated || null, route.alternates);
	for (const route of POST_ROUTES) {
		if (route.post.noindex || route.post.externalCanonical) continue;
		push(route.path, route.post.updated, route.alternates);
	}
	const body = entries
		.map(({ path, lastmod, alternates }) => `<url><loc>${absoluteUrl(path)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}${alternates.map((a) => `<xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${absoluteUrl(a.path)}"/>`).join('')}</url>`)
		.join('\n');
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;
}

// --- llms.txt ----------------------------------------------------------------------
// Entries MUST be Markdown links: bare URLs fail the Lighthouse llms-txt audit.
export function llmsTxt() {
	const sections = [];
	for (const lang of activeLangs) {
		sections.push(`## ${lang === DEFAULT_LANG ? 'Posts' : `Posts (${lang})`}`, '', ...postsIn(lang).map(postLine), '');
	}
	const facets = LIST_ROUTES.filter((r) => ['category', 'format', 'author'].includes(r.kind)).map((r) => `- ${link(`${r.kind}: ${r.title} (${r.lang})`, r.path)}: ${r.posts.length} post(s).`);
	const ai = Object.entries(config.authors).filter(([, a]) => a.type === 'ai_editorial');
	return `# ${config.name}

> ${SITE_DEFINITION}

## What this site is for

- ${link('Read any post as Markdown', '/posts')}: append /index.md to a post URL or send Accept: text/markdown.
- ${link('List every post as JSON', '/api/articles')}: slug, title, language, category, format, author, provenance. No credentials.
- ${link('Connect an MCP client', '/mcp')}: Streamable HTTP, read-only, no credentials.
- ${link('Subscribe', '/rss.xml')}: RSS, plus ${link('Atom', '/atom.xml')} and ${link('JSON Feed', '/feed.json')}.
- ${link('Source of every post', config.repo)}: each post is a Markdown file in a public GitHub repository.

Limitations: no user accounts, no write operations, no search endpoint beyond the MCP search tool.

## Authorship and AI disclosure

Every post states its provenance (transcript, written, ai_generated), whether AI assisted, and whether a human reviewed it. These fields appear on the page, in the Markdown mirror, in JSON-LD and in the JSON API.
${ai.map(([id, a]) => `- ${link(a.name, `/author/${id}`)}: ${label(a.label, DEFAULT_LANG)}. ${label(a.description, DEFAULT_LANG)}`).join('\n')}

${sections.join('\n')}
## Index pages

${facets.join('\n')}
- ${link('Archive', '/archive')}: every post by year.
- ${link('Talks and videos', '/talks')}: posts with a video.
- ${link('Changelog', '/changelog')}: what changed on this site.

## Site pages

- ${link('About', '/about')}: who writes this.
- ${link('Agent ready', '/agent-ready')}: how the site is built for agents.
- ${link('Developers', '/developers')}: API, MCP and x402 documentation.
- ${link('Contact', '/contact')}: how to reach the author.
- ${link('Privacy', '/privacy')}: what is and is not collected.

## Machine-readable surfaces

- ${link('Full text of every post', '/llms-full.txt')}: one fetch.
- ${link('Sitemap', '/sitemap.xml')}: indexable URLs with hreflang alternates.
- ${link('OpenAPI document', '/openapi.json')}: typed schemas.
- ${link('MCP server card', '/.well-known/mcp/server-card.json')}: transport and tools.
- ${link('API catalog', '/.well-known/api-catalog')}: RFC 9727 linkset.
`;
}

export function llmsFullTxt() {
	return [`# ${config.name}, complete text`, '', `> ${SITE_DEFINITION}`, '', `${posts.length} post(s). Generated from the Markdown files in ${config.repo}.`, '', '---', '', ...posts.map((post) => `${post.markdown}\n---\n`)].join('\n');
}

export { markdownMirrorPath, isTalk };
