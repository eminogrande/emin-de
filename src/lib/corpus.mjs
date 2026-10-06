// Read-side of the content graph. Imports the JSON written by
// scripts/generate-content.mjs, so it runs unchanged in Astro, in Node
// (server.mjs, tests) and in the Cloudflare Worker (no fs needed).
import data from '../generated/content.json' with { type: 'json' };
import config from '../../site.config.mjs';
import { LANGS, postPath } from './paths.mjs';

export const allPosts = data.posts;
export const changelogMarkdown = data.changelog || '';

// Indexable = shown in sitemaps, feeds, llms.txt and listings. noindex posts
// (e.g. the synthetic test fixture) still render, but nowhere advertises them.
export const posts = allPosts.filter((post) => !post.noindex);

export const postsIn = (lang) => posts.filter((post) => post.lang === lang);
export const findPost = (lang, slug) => allPosts.find((post) => post.lang === lang && post.slug === slug) || null;
export const findBySlug = (slug) => allPosts.find((post) => post.slug === slug) || null;

// A language "exists" only when at least one indexable post is written in it.
export const activeLangs = LANGS.filter((lang) => postsIn(lang).length > 0);

// Facets with at least one post in the language. Empty facets produce no route.
function facet(lang, key, ids) {
	return ids
		.map((id) => ({ id, posts: postsIn(lang).filter((post) => post[key] === id) }))
		.filter((entry) => entry.posts.length);
}
export const categoriesIn = (lang) => facet(lang, 'category', Object.keys(config.categories));
export const formatsIn = (lang) => facet(lang, 'format', Object.keys(config.formats));
export const authorsIn = (lang) => facet(lang, 'author', Object.keys(config.authors));
export function yearsIn(lang) {
	const years = [...new Set(postsIn(lang).map((post) => post.date.slice(0, 4)))].sort().reverse();
	return years.map((year) => ({ year, posts: postsIn(lang).filter((post) => post.date.startsWith(year)) }));
}

// Alternate language versions of a post that really exist (no fallback).
export function alternatesFor(post) {
	const list = [{ lang: post.lang, path: post.path }];
	for (const [lang, slug] of Object.entries(post.translations || {})) {
		const other = findPost(lang, slug);
		if (other && !other.noindex) list.push({ lang, path: postPath(lang, slug) });
	}
	return list;
}

// The runtime API corpus (no HTML) lives in src/lib/api-corpus.mjs.
export { articles, articleMarkdown, getArticle, articlePath, allTopics } from './api-corpus.mjs';
