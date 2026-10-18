// URL scheme and UI strings. Pure functions over site.config.mjs, safe to import
// from Astro, Node scripts and the Cloudflare Worker alike.
import config from '../../site.config.mjs';
import UI from '../i18n/ui.json' with { type: 'json' };

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
// ?v= changes whenever the card's inputs change (title, picture), so X, WhatsApp and
// LinkedIn fetch a fresh card instead of a cached one. The file path stays stable.
const cardVersion = (post) => {
	let h = 0;
	for (const ch of `${post.title}|${post.image || ''}|${post.cover?.src || ''}`) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
	return h.toString(36);
};
export const ogImagePath = (post) => (post.translatedFrom && post.ogSource ? `/og/${post.ogSource.lang}/${post.ogSource.slug}.png?v=${post.ogSource.v}` : `/og/${post.lang}/${post.slug}.png?v=${cardVersion(post)}`);
export const ogVersion = (post) => cardVersion(post);

// UI strings for every locale: src/i18n/ui.json, keyed by the English text
// (plus dotted keys for structured labels). Made with plugins/translate.py from
// src/i18n/en.json; German is hand-written.

export const localeOf = (lang) => config.locales.find((l) => l.code === lang) || config.locales[0];
export const langDir = (lang) => localeOf(lang).dir || 'ltr';

// tr(lang, key, vars): the UI string in that language, else English, else the key.
export function tr(lang, key, vars = {}) {
	const text = UI[lang]?.[key] ?? UI.en?.[key] ?? key;
	return String(text).replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
}

const NESTED = ['provenance', 'aiAssisted', 'reviewed'];
export function t(lang, key) {
	if (NESTED.includes(key)) {
		const out = {};
		for (const k of Object.keys(UI.en).filter((k) => k.startsWith(`${key}.`))) out[k.slice(key.length + 1)] = tr(lang, k);
		return out;
	}
	return tr(lang, key);
}

// label(map, lang, key): the config label in that language. Falls back to the
// UI dictionary entry `key` (e.g. "cat.nuri"), then to the default language.
export function label(map, lang, key) {
	if (map?.[lang]) return map[lang];
	if (key && UI[lang]?.[key]) return UI[lang][key];
	return map?.[DEFAULT_LANG] || '';
}

export function dateLabel(lang, iso) {
	const locale = config.locales.find((l) => l.code === lang)?.dateLocale || 'en-GB';
	return new Date(`${iso}T00:00:00Z`).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
