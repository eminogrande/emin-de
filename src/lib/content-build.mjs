// Build-time content loader. Reads content/posts/<lang>/<yyyy>/<slug>.md,
// validates front matter against site.config.mjs, renders HTML and the
// canonical Markdown mirror, and returns one plain JSON graph. Every surface
// (HTML, .md mirror, JSON API, MCP, feeds, sitemap, llms.txt) reads that graph.
//
// Node only (uses fs). The Worker never runs this; it imports the generated JSON.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import GithubSlugger from 'github-slugger';
import config from '../../site.config.mjs';
import { postPath, markdownMirrorPath, t } from './paths.mjs';

// transcript/written/ai_generated for new posts; human/mixed/unknown appear on
// imported posts and are kept as recorded (never silently upgraded).
export const PROVENANCE = ['transcript', 'written', 'ai_generated', 'human', 'mixed', 'unknown'];
const BASICALLY_MAX = 140;

import { renderHtml, preprocess } from './markdown.mjs';
export { renderHtml };

function walk(dir) {
	if (!existsSync(dir)) return [];
	return readdirSync(dir).flatMap((name) => {
		const full = path.join(dir, name);
		return statSync(full).isDirectory() ? walk(full) : name.endsWith('.md') ? [full] : [];
	});
}

export function parseFile(file) {
	const raw = readFileSync(file, 'utf-8');
	const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
	if (!match) throw new Error(`${file}: missing front matter`);
	// JSON_SCHEMA keeps dates as strings instead of Date objects.
	return { data: yaml.load(match[1], { schema: yaml.JSON_SCHEMA }) || {}, body: match[2].trim() };
}

// Split the body at H2 headings. Text before the first H2 is the intro.
export function splitSections(body) {
	const slugger = new GithubSlugger();
	const sections = [];
	let current = { id: null, heading: null, lines: [] };
	let inFence = false;
	for (const line of body.split('\n')) {
		if (/^(```|~~~)/.test(line)) inFence = !inFence;
		const h2 = !inFence && line.match(/^## (.+)$/);
		if (h2) {
			sections.push(current);
			current = { id: slugger.slug(h2[1].trim()), heading: h2[1].trim(), lines: [] };
		} else current.lines.push(line);
	}
	sections.push(current);
	return sections
		.map(({ id, heading, lines }) => ({ id, heading, body: lines.join('\n').trim() }))
		.filter((section) => section.heading || section.body);
}

const words = (text) => text.replace(/[#*_>`|[\]()-]/g, ' ').split(/\s+/).filter(Boolean).length;

function errorList(file, data, sections, rel) {
	const errors = [];
	const need = ['title', 'description', 'date', 'lang', 'category', 'format', 'author', 'provenance'];
	for (const key of need) if (data[key] === undefined || data[key] === '') errors.push(`missing ${key}`);
	const author = config.authors[data.author];
	if (data.author && !author) errors.push(`unknown author "${data.author}" (site.config.mjs authors)`);
	if (data.category && !config.categories[data.category]) errors.push(`unknown category "${data.category}"`);
	if (data.format && !config.formats[data.format]) errors.push(`unknown format "${data.format}"`);
	if (data.lang && !config.locales.some((l) => l.code === data.lang)) errors.push(`unknown lang "${data.lang}"`);
	if (data.provenance && !PROVENANCE.includes(data.provenance)) errors.push(`provenance must be one of ${PROVENANCE.join('|')}`);
	if (![true, false, 'unknown', null].includes(data.ai_assisted)) errors.push('ai_assisted must be true, false or unknown');
	if (typeof data.reviewed_by_human !== 'boolean') errors.push('reviewed_by_human must be true or false');
	for (const key of ['date', 'updated']) if (data[key] && !/^\d{4}-\d{2}-\d{2}(T[\d:.]+Z?)?$/.test(data[key])) errors.push(`${key} must be YYYY-MM-DD or an ISO timestamp`);
	const [lang, year, name] = rel.split('/');
	if (data.lang && lang !== data.lang) errors.push(`file is under ${lang}/ but lang is ${data.lang}`);
	if (data.date && year !== data.date.slice(0, 4)) errors.push(`file is under ${year}/ but date is ${data.date}`);
	if (!/^[a-z0-9]+(-[a-z0-9]+)*\.md$/.test(name || '')) errors.push('slug must be lowercase-kebab-case');
	if (data.description && data.description.length > 200) errors.push(`description is ${data.description.length} chars (max 200)`);
	// Honest bylines: AI-generated text never carries a human byline, and an AI
	// desk never pretends its text was written by a person.
	if (author?.type === 'ai_editorial' && (data.provenance !== 'ai_generated' || data.ai_assisted !== true)) {
		errors.push('ai_editorial author requires provenance: ai_generated and ai_assisted: true');
	}
	if (data.provenance === 'ai_generated' && author?.type !== 'ai_editorial') errors.push('provenance ai_generated requires an ai_editorial author');
	if (author?.type === 'guest' && !data.original_author) errors.push('guest author requires original_author');
	// Editorial contract (TL;DR + one Basically per section) applies to posts
	// first published here. Imports with an external canonical keep their text as is.
	if (!data.canonical && !data.noindex) {
		if (!Array.isArray(data.tldr) || data.tldr.length < 2 || data.tldr.length > 4) errors.push('tldr needs 2-4 items');
		for (const section of sections.filter((s) => s.heading)) {
			const line = data.basically?.[section.id];
			if (!line) errors.push(`basically missing for section "${section.id}"`);
			else if (line.length > BASICALLY_MAX) errors.push(`basically "${section.id}" is ${line.length} chars (max ${BASICALLY_MAX})`);
		}
	}
	return errors;
}

import { displayAuthor, authorLabel } from './content-build-shared.mjs';
export { displayAuthor, authorLabel };

// Canonical Markdown rendering: the .md mirror, llms-full.txt, JSON API, MCP and
// the x402 corpus all serve exactly this string.
export function postMarkdown(post) {
	const author = config.authors[post.author];
	const lines = [`# ${post.title}`, ''];
	if (post.tldr.length) lines.push(...post.tldr.map((item) => `> - ${item}`), '');
	const byline = [`${t(post.lang, 'by')} ${displayAuthor(post)}`];
	if (author.type !== 'human') byline.push(authorLabel(post));
	lines.push(
		`${byline.join('. ')}. ${t(post.lang, 'published')} ${post.date}. ${t(post.lang, 'updated')} ${post.updated}.`,
		`Canonical: ${post.canonical}`,
		`Category: ${post.category}. Format: ${post.format}. Language: ${post.lang}.`,
		`Provenance: ${post.provenance}. AI-assisted: ${post.aiAssisted}. Reviewed by a human: ${post.reviewedByHuman}.${post.thirdPartySummary ? ' Summary of third-party material.' : ''}`,
		''
	);
	if (post.video) lines.push(`Video: [${post.video.title || post.title}](${post.video.url})`, '');
	// Mirror = the file's own text, with two resolvability fixes only: media paths
	// become absolute URLs and shortcodes become links. A body H1 (common in
	// imports) is demoted so the mirror has exactly one H1.
	const hasH1 = post.sections.some((s) => /^# /m.test(s.body));
	const mirrorBody = (body) => {
		let text = preprocess(body, config.origin);
		if (hasH1) {
			let fence = false;
			text = text.split('\n').map((line) => {
				if (/^(```|~~~)/.test(line)) fence = !fence;
				return !fence && /^#{1,5} /.test(line) ? `#${line}` : line;
			}).join('\n');
		}
		return text;
	};
	for (const section of post.sections) {
		if (section.heading) lines.push(`## ${section.heading}`, '');
		if (section.body) lines.push(mirrorBody(section.body), '');
		const line = section.id && post.basically[section.id];
		if (line) lines.push(`**${t(post.lang, 'basically')}** ${line}`, '');
	}
	if (post.sourceLinks.length) {
		lines.push(`## ${t(post.lang, 'sources')}`, '');
		for (const s of post.sourceLinks) lines.push(`- [${s.title}](${s.url})${s.note ? ` ${s.note}` : ''}`);
		lines.push('');
	}
	return lines.join('\n');
}

export function loadContent({ dirs = (process.env.CONTENT_DIRS || 'content').split(','), root = process.cwd(), sizes = {}, srcsets = {} } = {}) {
	const posts = [];
	const problems = [];
	for (const dir of dirs) {
		const base = path.resolve(root, dir, 'posts');
		for (const file of walk(base).sort()) {
			const rel = path.relative(base, file).split(path.sep).join('/');
			let parsed;
			try {
				parsed = parseFile(file);
			} catch (error) {
				problems.push(`${rel}: ${error.message}`);
				continue;
			}
			const { data, body } = parsed;
			if (data.draft === true) continue;
			const sections = splitSections(body);
			const errors = errorList(file, data, sections, rel);
			if (errors.length) {
				problems.push(...errors.map((e) => `${dir}/posts/${rel}: ${e}`));
				continue;
			}
			const slug = path.basename(file, '.md');
			const day = (value) => String(value).slice(0, 10);
			const noindexByPolicy = (config.indexing?.noindexProvenance || []).includes(data.provenance);
			const toSitePath = (ref) => (ref ? String(ref).replace(/^(?:\.\.\/)+media\//, '/media/') : null);
			const p = postPath(data.lang, slug);
			const post = {
				id: `${data.lang}/${slug}`,
				slug,
				lang: data.lang,
				title: data.title,
				seoTitle: data.seo_title || null,
				description: data.description,
				date: day(data.date),
				updated: day(data.updated || data.date),
				publishedAt: String(data.date),
				category: data.category,
				format: data.format,
				author: data.author,
				authorType: config.authors[data.author].type,
				provenance: data.provenance,
				aiAssisted: data.ai_assisted ?? 'unknown',
				reviewedByHuman: data.reviewed_by_human,
				noindex: data.noindex === true || noindexByPolicy,
				noindexReason: data.noindex === true ? 'front matter' : noindexByPolicy ? `provenance ${data.provenance} awaits human review` : null,
				originalAuthor: data.original_author || null,
				thirdPartySummary: data.third_party_summary === true,
				source: data.source || null,
				externalCanonical: Boolean(data.canonical),
				canonical: data.canonical || `${config.origin}${p}`,
				tags: data.tags || [],
				sourceLinks: data.source_links || [],
				tldr: data.tldr || [],
				basically: data.basically || {},
				image: toSitePath(data.image || data.cover),
				video: data.video || null,
				importNote: data.import_note || null,
				translations: data.translations || {},
				path: p,
				markdownPath: markdownMirrorPath(p),
				file: `${dir}/posts/${rel}`,
				sections,
			};
			post.html = sections.map((s) => ({ ...s, html: renderHtml(s.body, { sizes, srcsets }) }));
			// The first image is the likely LCP element: load it eagerly.
			const first = post.html.find((s) => s.html.includes('loading="lazy"'));
			if (first) first.html = first.html.replace('loading="lazy"', 'loading="eager" fetchpriority="high"');
			post.wordCount = words([post.tldr.join(' '), ...sections.map((s) => `${s.heading || ''} ${s.body}`), ...Object.values(post.basically)].join(' '));
			post.readingTimeMinutes = Math.max(1, Math.round(post.wordCount / 230));
			post.markdown = postMarkdown(post);
			posts.push(post);
		}
	}

	// Global slug uniqueness keeps /api/articles/{slug} unambiguous.
	const seen = new Map();
	for (const post of posts) {
		if (seen.has(post.slug)) problems.push(`duplicate slug "${post.slug}" in ${seen.get(post.slug)} and ${post.file}`);
		seen.set(post.slug, post.file);
	}
	// No-fallback rule: a translation link must point at a real post in that
	// language, and the link must be reciprocal. Nothing is ever generated for a
	// language that has no file.
	const byId = new Map(posts.map((post) => [post.id, post]));
	for (const post of posts) {
		for (const [lang, slug] of Object.entries(post.translations)) {
			const other = byId.get(`${lang}/${slug}`);
			if (lang === post.lang) problems.push(`${post.file}: translations lists its own language`);
			else if (!other) problems.push(`${post.file}: translation ${lang}/${slug} does not exist (no fallback pages)`);
			else if (other.translations[post.lang] !== post.slug) problems.push(`${post.file}: translation ${lang}/${slug} does not link back`);
		}
	}
	posts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
	return { posts, problems };
}
