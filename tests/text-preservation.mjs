// Checks that rendering keeps the words of every post: every word token in the
// Markdown source (minus markup, URLs and HTML tags) must appear in the rendered
// HTML text. Run after a build: node tests/text-preservation.mjs
import { readFileSync } from 'node:fs';
import { fromHtml } from 'hast-util-from-html';
import { toText } from 'hast-util-to-text';
const graph = JSON.parse(readFileSync('src/generated/content.json', 'utf-8'));
const words = (s) => s.toLowerCase().normalize('NFC').match(/[\p{L}\p{N}]{3,}/gu) || [];
const strip = (md) => md
	.replace(/^\s*(```|~~~)\S*/gm, ' ') // fence info strings (```bash) are not text
	.replace(/<!--[\s\S]*?-->/g, ' ')
	.replace(/<\/?[a-zA-Z][^>]*>/g, ' ')
	.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1 ')
	.replace(/https?:\/\/\S+/g, ' ')
	.replace(/\{\{<[^>]*>\}\}/g, ' ')
	.replace(/&[a-z]+;|&#x?[0-9a-f]+;/gi, ' ');
let bad = 0;
for (const post of graph.posts) {
	const src = post.sections.map((s) => `${s.heading || ''}\n${strip(s.body)}`).join('\n');
	const html = post.html.map((s) => `${s.heading || ''}\n${s.html}`).join('\n');
	const out = new Map();
	for (const w of words(toText(fromHtml(html, { fragment: true })) + ' ' + html.replace(/<[^>]+>/g, ' ') + ' ' + [...html.matchAll(/\b(?:alt|src|href)="([^"]*)"/g)].map((m) => m[1]).join(' '))) out.set(w, true);
	const missing = [...new Set(words(src))].filter((w) => !out.has(w));
	if (missing.length) {
		bad += 1;
		console.log(`DROPPED ${post.file}: ${missing.slice(0, 12).join(', ')}${missing.length > 12 ? ` (+${missing.length - 12})` : ''}`);
	}
}
console.log(`${graph.posts.length} posts checked, ${bad} with dropped words`);
process.exit(bad ? 1 : 0);
