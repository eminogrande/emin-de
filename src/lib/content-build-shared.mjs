// Byline helpers shared by the build loader, Astro components and surfaces.
import config from '../../site.config.mjs';
import { tr, label } from './paths.mjs';

export function displayAuthor(post) {
	return config.authors[post.author].type === 'guest' && post.originalAuthor ? post.originalAuthor : config.authors[post.author].name;
}

export function authorLabel(post) {
	const author = config.authors[post.author];
	const base = label(author.label, post.lang, `author.${post.author}.label`);
	if (author.type === 'ai_editorial' && !post.reviewedByHuman) return `${base}${tr(post.lang, ': not yet reviewed')}`;
	return base;
}

