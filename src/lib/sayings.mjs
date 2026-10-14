// The sayings index: every proverb, poem line and quote used on emin.de, with
// the post it lives in. Built from the posts themselves (title proverbs from the
// "The title is a ... proverb, X." line, quotes from Basically asides), so it can
// never drift. It is also the writers' checklist: anything listed here is taken.
import { posts } from './corpus.mjs';

const QUOTE = /^\s*["\u201c](.{6,}?)["\u201d]\s*([^.]{2,80}?)\.(?:\s|$)/;
const TITLE_SOURCE = /^The title is an? ([^,]+?) proverb, (.+?)\.?$/m;

export function sayings() {
	const rows = [];
	for (const post of posts) {
		const at = { title: post.title, path: post.path, lang: post.lang };
		const src = post.markdown.match(TITLE_SOURCE);
		if (src) rows.push({ text: post.title, by: `${src[1]} proverb`, original: src[2], kind: 'title', ...at });
		for (const line of Object.values(post.basically || {})) {
			const m = String(line).match(QUOTE);
			if (m) rows.push({ text: m[1].trim(), by: m[2].trim().replace(/,?\s*(tr|self-translated)\.?$/i, ''), kind: 'aside', ...at });
		}
	}
	return rows.sort((a, b) => a.by.localeCompare(b.by) || a.text.localeCompare(b.text));
}

export function sayingsMarkdown() {
	const rows = sayings();
	const voices = new Set(rows.map((r) => r.by)).size;
	return `# Sayings

> Every proverb, poem line and quote used on emin.de, ${rows.length} lines from ${voices} voices. Each appears in exactly one post.

${rows.map((r) => `- "${r.text}" ${r.by}${r.original ? ` (${r.original})` : ''}. In [${r.title}](https://emin.de${r.path})`).join('\n')}
`;
}
