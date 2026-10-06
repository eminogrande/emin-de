// Every listing route the site generates, as data. Astro pages, Markdown
// mirrors and the sitemap all iterate this one list, so a route either exists
// on every surface or on none. Routes are only produced for facets that have at
// least one indexable post in that language (no empty or fallback pages).
import config from '../../site.config.mjs';
import { posts, postsIn, activeLangs, categoriesIn, formatsIn, authorsIn, yearsIn, allPosts, alternatesFor } from './corpus.mjs';
import { DEFAULT_LANG, homePath, postsIndexPath, categoryPath, formatPath, authorPath, archivePath, join, t, label } from './paths.mjs';

const isTalk = (post) => Boolean(post.video);

function listRoutes() {
	const routes = [];
	for (const lang of activeLangs) {
		const add = (kind, id, path, title, description, list) => routes.push({ kind, id, lang, path, title, description, posts: list });
		if (lang !== DEFAULT_LANG) add('home', null, homePath(lang), `${config.name} (${lang})`, config.tagline, postsIn(lang));
		add('posts', null, postsIndexPath(lang), t(lang, 'allPosts'), `${t(lang, 'allPosts')}, ${config.name}`, postsIn(lang));
		for (const { id, posts: list } of categoriesIn(lang)) {
			add('category', id, categoryPath(lang, id), label(config.categories[id], lang), `${t(lang, 'categories')}: ${label(config.categories[id], lang)}`, list);
		}
		for (const { id, posts: list } of formatsIn(lang)) {
			add('format', id, formatPath(lang, id), label(config.formats[id], lang), `${t(lang, 'formats')}: ${label(config.formats[id], lang)}`, list);
		}
		// Author pages: every registered author gets a page in the default
		// language (the registry is the disclosure), other languages only when
		// that author has posts there.
		const authorIds = new Set(authorsIn(lang).map((a) => a.id));
		if (lang === DEFAULT_LANG) Object.keys(config.authors).forEach((id) => authorIds.add(id));
		for (const id of authorIds) {
			if (config.authors[id].type === 'guest') continue; // credited per post, no profile page
			const list = postsIn(lang).filter((post) => post.author === id);
			const author = config.authors[id];
			const desc = author.type === 'ai_editorial' ? label(author.description, lang) : `${t(lang, 'posts')}: ${author.name}`;
			add('author', id, authorPath(lang, id), author.name, desc, list);
		}
		const years = yearsIn(lang);
		add('archive', null, archivePath(lang), t(lang, 'archive'), `${t(lang, 'archive')}, ${config.name}`, postsIn(lang));
		for (const { year, posts: list } of years) add('year', year, archivePath(lang, year), `${t(lang, 'archive')} ${year}`, `${t(lang, 'archive')} ${year}`, list);
		const talks = postsIn(lang).filter(isTalk);
		if (talks.length || lang === DEFAULT_LANG) add('talks', null, join(lang, '/talks'), t(lang, 'talks'), t(lang, 'talks'), talks);
		const changes = postsIn(lang).filter((post) => post.format === 'changelog');
		if (changes.length || lang === DEFAULT_LANG) add('changelog', null, join(lang, '/changelog'), t(lang, 'changelog'), `${t(lang, 'changelog')}, ${config.name}`, changes);
	}
	// Same kind+id in another language = hreflang alternate. Only real routes.
	for (const route of routes) {
		route.alternates = routes
			.filter((other) => other.kind === route.kind && other.id === route.id)
			.map((other) => ({ lang: other.lang, path: other.path }));
	}
	return routes;
}

export const LIST_ROUTES = listRoutes();
// The English home is src/pages/index.astro; everything else is in the catch-all.
export const CATCHALL_LIST_ROUTES = LIST_ROUTES.filter((route) => route.path !== '/');

export const POST_ROUTES = allPosts.map((post) => ({ kind: 'post', lang: post.lang, path: post.path, post, alternates: alternatesFor(post) }));

export function hreflangLinks(alternates) {
	if (!alternates || alternates.length < 2) return [];
	const fallback = alternates.find((a) => a.lang === DEFAULT_LANG) || alternates[0];
	return [...alternates.map((a) => ({ hreflang: config.locales.find((l) => l.code === a.lang).hreflang, path: a.path })), { hreflang: 'x-default', path: fallback.path }];
}

export { posts, isTalk };
