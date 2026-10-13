// Byline helpers shared by the build loader, Astro components and surfaces.
import config from '../../site.config.mjs';

export function displayAuthor(post) {
	return config.authors[post.author].type === 'guest' && post.originalAuthor ? post.originalAuthor : config.authors[post.author].name;
}

export function authorLabel(post) {
	const author = config.authors[post.author];
	const base = author.label?.[post.lang] || author.label?.en || '';
	if (author.type === 'ai_editorial' && !post.reviewedByHuman) return `${base}${post.lang === 'de' ? ': noch nicht geprüft' : ': not yet reviewed'}`;
	return base;
}

