// Runtime corpus for the JSON API, MCP and x402 handlers (Worker and Node).
// Built from src/generated/api.json: indexable posts only, no rendered HTML,
// so the Worker bundle stays small. Same shape as src/lib/corpus.mjs#articles.
import data from '../generated/api.json' with { type: 'json' };
import config from '../../site.config.mjs';
import { displayAuthor } from './content-build-shared.mjs';

export const articles = data.posts.map((post) => ({
	slug: post.slug,
	lang: post.lang,
	title: post.title,
	description: post.description,
	tldr: post.tldr.join(' '),
	publishedAt: post.date,
	modifiedAt: post.updated,
	topics: [post.category, post.format, ...post.tags],
	category: post.category,
	format: post.format,
	author: displayAuthor(post),
	authorType: config.authors[post.author].type,
	provenance: post.provenance,
	url: post.canonical,
	path: post.path,
	markdownPath: post.markdownPath,
	// Search runs over the full Markdown, which already contains every section.
	sections: [{ heading: null, body: post.markdown }],
	wordCount: post.wordCount,
	readingTimeMinutes: post.readingTimeMinutes,
	markdown: post.markdown,
}));

export const articleMarkdown = (article) => article.markdown;
export const getArticle = (slug) => articles.find((article) => article.slug === slug) || null;
export const articlePath = (slug) => getArticle(slug)?.path || `/posts/${slug}`;
export const allTopics = [...new Set(articles.flatMap((article) => article.topics))].sort();
