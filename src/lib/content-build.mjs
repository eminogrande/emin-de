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
import { cleanTitle, cleanExcerpt, decodeEntities, firstHeading, bodyExcerpt, originLabel, sentenceCaseTitle } from './text-clean.mjs';
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


// "Basically," lines. A paragraph inside a section that starts with
// "Basically," (en) or "Im Kern," (de) is the author's own summary of that
// section: it moves into the aside and is removed from the body, so it is
// never shown twice. Nothing is generated when a section has none.
const BASICALLY_RE = /^(?:\*\*|__)?(Basically|Im Kern)(?:\*\*|__)?\s*[,:]\s*(?:\*\*|__)?\s*/;
export function extractBasically(body) {
	const blocks = body.split(/\n{2,}/);
	let inFence = false;
	for (let i = blocks.length - 1; i >= 0; i -= 1) {
		// Skip blocks inside fenced code (count fences before this block).
		const before = blocks.slice(0, i).join('\n\n').match(/^(```|~~~)/gm) || [];
		inFence = before.length % 2 === 1;
		if (inFence) continue;
		const block = blocks[i].trim();
		if (!BASICALLY_RE.test(block) || block.includes('\n#')) continue;
		const text = block.replace(BASICALLY_RE, '').replace(/\s*\n\s*/g, ' ').trim();
		if (!text) continue;
		blocks.splice(i, 1);
		return { line: text, body: blocks.join('\n\n').trim() };
	}
	return { line: null, body };
}

// First real paragraph of a body as plain text (no image, heading, list,
// quote, table, code or raw HTML). Used verbatim as the "In short" line when a
// post has no TL;DR in its front matter. Never rewritten, never shortened.
export function firstParagraph(body) {
	let inFence = false;
	for (const raw of String(body).split(/\n{2,}/)) {
		const block = raw.trim();
		const fences = (block.match(/^(```|~~~)/gm) || []).length;
		if (inFence || fences) {
			if (fences % 2 === 1) inFence = !inFence;
			continue;
		}
		if (!block) continue;
		if (/^(#|!\[|<|>|\||[-*+] |\d+[.)] |\[!\[|---|\*\*\*)/.test(block)) continue;
		if (/^\[[^\]]*\]\([^)]*\)$/.test(block) || /^<?https?:\/\/\S+>?$/.test(block)) continue;
		return block;
	}
	return null;
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
	// emin.de is the original: a canonical, when given, must point at this origin.
	// The first-published URL lives in original_url instead.
	if (data.canonical && !String(data.canonical).startsWith(config.origin)) errors.push(`canonical must be on ${config.origin}; put the first-published URL in original_url`);
	if (data.original_url && !/^https?:\/\//.test(data.original_url)) errors.push('original_url must be an absolute URL');
	// Editorial contract (TL;DR + one Basically per section) applies to posts
	// first published here. Imports with an external canonical keep their text as is.
	if (!data.canonical && !data.original_url && !data.noindex) {
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
		...(post.originalUrl ? [`First published: ${post.originalUrl} (${post.date})`] : []),
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
		const line = post.basically[section.id || '_intro'];
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
			// Basically lines: front matter `basically` (map by section id) or
			// `sections[].basically` (by heading or by order), else a
			// "Basically," paragraph inside the section, moved to the aside.
			const basically = { ...(data.basically || {}) };
			const fmSections = Array.isArray(data.sections) ? data.sections : [];
			const headed = sections.filter((s) => s.heading);
			fmSections.forEach((entry, index) => {
				if (!entry?.basically) return;
				const target = entry.heading ? headed.find((s) => s.heading === entry.heading || s.id === entry.id) : headed[index];
				if (target && !basically[target.id]) basically[target.id] = String(entry.basically);
			});
			const basicallyFrom = {};
			for (const section of sections) {
				const key = section.id || '_intro';
				const found = extractBasically(section.body);
				if (!found.line) continue;
				section.body = found.body;
				if (!basically[key]) {
					basically[key] = found.line;
					basicallyFrom[key] = 'body';
				}
			}
			if (errors.length) {
				problems.push(...errors.map((e) => `${dir}/posts/${rel}: ${e}`));
				continue;
			}
			const slug = path.basename(file, '.md');
			const day = (value) => String(value).slice(0, 10);
			// Free speech: no provenance, topic or review gate. Only `draft: true`
			// (skipped above) hides a post; `noindex: true` is honoured for the
			// synthetic test fixtures and is rejected for real content by the tests.
			const noindexByPolicy = false;
			const toSitePath = (ref) => (ref ? String(ref).replace(/^(?:\.\.\/)+media\//, '/media/') : null);
			const p = postPath(data.lang, slug);
			// Display fixes, never touching the body: decode entities once, fall
			// back to the first H1 for empty/"Untitled" titles, trim dangling
			// punctuation, and keep URLs out of excerpts.
			const fmtLabel = ({ photo: { en: 'Photo', de: 'Foto' }, video: { en: 'Video', de: 'Video' }, note: { en: 'Note', de: 'Notiz' } }[data.format] || {})[data.lang] || '';
			const title = cleanTitle(data.title, { fallback: firstHeading(body), lang: data.lang, date: day(data.date), formatLabel: fmtLabel });
			const description = cleanExcerpt(data.description, { body, title });
			const displayTitle = data.lang === 'en' ? sentenceCaseTitle(title, body) : title;
			const originalUrl = data.original_url || null;
			const post = {
				id: `${data.lang}/${slug}`,
				slug,
				lang: data.lang,
				title: displayTitle,
				rawTitle: data.title,
				seoTitle: data.seo_title ? decodeEntities(data.seo_title) : null,
				description,
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
				reviewStatus: data.review_status || null,
				voiceRewrite: data.voice_rewrite || null,
				noindex: data.noindex === true || noindexByPolicy,
				noindexReason: data.noindex === true ? 'front matter' : null,
				originalAuthor: data.original_author || null,
				thirdPartySummary: data.third_party_summary === true,
				source: data.source || null,
				// emin.de is the original for every post. The first-published URL
				// is kept as provenance (JSON-LD sameAs/isBasedOn, "first published" line).
				externalCanonical: false,
				canonical: `${config.origin}${p}`,
				originalUrl,
				originalSite: originalUrl ? originLabel(originalUrl) : null,
				tags: data.tags || [],
				sourceLinks: data.source_links || [],
				tldr: Array.isArray(data.tldr) ? data.tldr.map(String) : data.tldr ? [String(data.tldr)] : [],
				tldrFromBody: null,
				tldrLabel: 'tldr',
				basically,
				basicallyFrom,
				image: toSitePath(data.image || data.cover),
				video: data.video || null,
				importNote: data.import_note || null,
				translations: data.translations || {},
				path: p,
				markdownPath: markdownMirrorPath(p),
				file: `${dir}/posts/${rel}`,
				sections,
			};
			// TL;DR: front matter (array or string). Without one, the post's own
			// first paragraph is shown as "In short" (verbatim, not generated).
			if (!post.tldr.length) {
				const firstSection = sections.find((s) => !s.heading) || null;
				const first = firstSection ? firstParagraph(firstSection.body) : null;
				if (first && first.length <= 600) {
					post.tldrFromBody = first;
					post.tldrLabel = 'inShort';
				}
			}
			const lead = bodyExcerpt(body, 220).toLowerCase();
			const dekProbe = description.replace(/(\.\.\.|…)$/, '').slice(0, 60).toLowerCase();
			post.dekRepeatsBody = Boolean(dekProbe) && lead.includes(dekProbe.slice(0, 40));
			// HTML view. The Markdown mirror keeps the body as written; the page
			// lifts two blocks of the intro into the hero instead of showing them
			// twice: a leading image (hero illustration) and, when it serves as the
			// "In short" line, the first paragraph.
			const lift = (body, block) => {
				const blocks = body.split(/\n{2,}/);
				const i = blocks.findIndex((b) => b.trim() === block.trim());
				if (i >= 0) blocks.splice(i, 1);
				return blocks.join('\n\n').trim();
			};
			post.heroHtml = null;
			post.html = sections.map((s) => {
				let view = s.body;
				if (!s.heading) {
					const lead = view.split(/\n{2,}/)[0]?.trim() || '';
					if (/^!\[[^\]]*\]\([^)\s]+\)$/.test(lead)) {
						post.heroHtml = renderHtml(lead, { sizes, srcsets }).replace(/^<p>|<\/p>\s*$/g, '').trim();
						view = lift(view, lead);
					}
					if (post.tldrFromBody) view = lift(view, post.tldrFromBody);
				}
				return { id: s.id, heading: s.heading, body: s.body, html: view ? renderHtml(view, { sizes, srcsets }) : '' };
			});
			if (post.tldrFromBody) post.tldrHtml = renderHtml(post.tldrFromBody).replace(/^<p>|<\/p>\s*$/g, '').trim();
			else post.tldrHtml = null;
			// The first image is the likely LCP element: load it eagerly.
			if (post.heroHtml) post.heroHtml = post.heroHtml.replace('loading="lazy"', 'loading="eager" fetchpriority="high"').replace(/sizes="[^"]*"/, 'sizes="(max-width: 64rem) calc(100vw - 2.5rem), 64rem"');
			else {
				const first = post.html.find((s) => s.html.includes('loading="lazy"'));
				if (first) first.html = first.html.replace('loading="lazy"', 'loading="eager" fetchpriority="high"');
			}
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
