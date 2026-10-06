// URL scheme and UI strings. Pure functions over site.config.mjs, safe to import
// from Astro, Node scripts and the Cloudflare Worker alike.
import config from '../../site.config.mjs';

export const DEFAULT_LANG = config.locales[0].code;
export const LANGS = config.locales.map((l) => l.code);

// Default language lives at the root; every other language gets a prefix.
export const langPrefix = (lang) => (lang === DEFAULT_LANG ? '' : `/${lang}`);
export const join = (lang, rest = '') => `${langPrefix(lang)}${rest}` || '/';

export const postPath = (lang, slug) => join(lang, `/posts/${slug}`);
export const postsIndexPath = (lang) => join(lang, '/posts');
export const homePath = (lang) => join(lang, '');
export const categoryPath = (lang, id) => join(lang, `/category/${id}`);
export const formatPath = (lang, id) => join(lang, `/format/${id}`);
export const authorPath = (lang, id) => join(lang, `/author/${id}`);
export const archivePath = (lang, year) => join(lang, year ? `/archive/${year}` : '/archive');
export const feedPath = (lang, kind) => join(lang, `/${{ rss: 'rss.xml', atom: 'atom.xml', json: 'feed.json' }[kind]}`);
export const markdownMirrorPath = (path) => (path === '/' ? '/index.md' : `${path}/index.md`);
export const ogImagePath = (post) => `/og/${post.lang}/${post.slug}.png`;

const STRINGS = {
	en: {
		by: 'By',
		published: 'Published',
		updated: 'Updated',
		basically: 'Basically,',
		sources: 'Sources',
		tldr: 'TL;DR',
		posts: 'Posts',
		allPosts: 'All posts',
		categories: 'Categories',
		formats: 'Formats',
		authors: 'Authors',
		archive: 'Archive',
		minRead: 'min read',
		words: 'words',
		readMarkdown: 'Read this post as Markdown',
		alsoIn: 'Also available in',
		originallyAt: 'First published at',
		provenance: { transcript: 'From a spoken transcript', written: 'Written by the author', ai_generated: 'AI-generated', human: 'Written by a person', mixed: 'Human and AI mixed', unknown: 'Origin not recorded' },
		aiAssisted: { true: 'AI-assisted', false: 'No AI assistance', unknown: 'AI assistance not recorded' },
		reviewed: { true: 'Reviewed by a human', false: 'Not yet reviewed by a human' },
		watch: 'Watch the video',
		feeds: 'Feeds',
		home: 'Home',
		latest: 'Latest posts',
		talks: 'Talks and videos',
		changelog: 'Changelog',
	},
	de: {
		by: 'Von',
		published: 'Veröffentlicht',
		updated: 'Aktualisiert',
		basically: 'Im Kern:',
		sources: 'Quellen',
		tldr: 'Kurz gesagt',
		posts: 'Beiträge',
		allPosts: 'Alle Beiträge',
		categories: 'Kategorien',
		formats: 'Formate',
		authors: 'Autoren',
		archive: 'Archiv',
		minRead: 'Min. Lesezeit',
		words: 'Wörter',
		readMarkdown: 'Diesen Beitrag als Markdown lesen',
		alsoIn: 'Auch verfügbar auf',
		originallyAt: 'Zuerst erschienen bei',
		provenance: { transcript: 'Aus einem gesprochenen Transkript', written: 'Vom Autor geschrieben', ai_generated: 'KI-generiert', human: 'Von einem Menschen geschrieben', mixed: 'Mensch und KI gemischt', unknown: 'Herkunft nicht erfasst' },
		aiAssisted: { true: 'KI-unterstützt', false: 'Ohne KI-Unterstützung', unknown: 'KI-Unterstützung nicht erfasst' },
		reviewed: { true: 'Von einem Menschen geprüft', false: 'Noch nicht von einem Menschen geprüft' },
		watch: 'Video ansehen',
		feeds: 'Feeds',
		home: 'Start',
		latest: 'Neueste Beiträge',
		talks: 'Vorträge und Videos',
		changelog: 'Changelog',
	},
};

export function t(lang, key) {
	return (STRINGS[lang] || STRINGS.en)[key] ?? STRINGS.en[key];
}

export function label(map, lang) {
	return map?.[lang] || map?.[DEFAULT_LANG] || '';
}

export function dateLabel(lang, iso) {
	const locale = config.locales.find((l) => l.code === lang)?.dateLocale || 'en-GB';
	return new Date(`${iso}T00:00:00Z`).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
