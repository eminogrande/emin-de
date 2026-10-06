// Presentation helpers for the magazine layout. Pure functions over a post
// from the content graph; no I/O.
import config from '../../site.config.mjs';
import { label, t } from './paths.mjs';

export function longDate(lang, iso) {
	const d = new Date(`${iso}T00:00:00Z`);
	if (lang === 'de') return d.toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
	return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export const readTime = (post) => (post.lang === 'de' ? `${post.readingTimeMinutes} Min. Lesezeit` : `${post.readingTimeMinutes} min read`);

export const categoryLabel = (post) => label(config.categories[post.category], post.lang);

// Honest provenance, one word: AI-written, mixed, or human. Never a gate.
export function provenanceBadge(post) {
	const de = post.lang === 'de';
	if (post.provenance === 'ai_generated' || post.authorType === 'ai_editorial') return { kind: 'ai', text: de ? 'KI-geschrieben' : 'AI-written' };
	if (post.provenance === 'mixed' || post.aiAssisted === true) return { kind: 'mixed', text: de ? 'Mensch + KI' : 'Human + AI' };
	if (post.provenance === 'unknown') return null;
	return { kind: 'human', text: de ? 'Von Hand' : 'Human-written' };
}

// One-line explainer, shown once in the footer and on /about, never per card.
export const DISCLOSURE = {
	en: 'Badges on each post say how it was made: human-written, human + AI, or AI-written under my supervision. The words are mine either way, and every label is also in the page metadata.',
	de: 'Die Plaketten an jedem Beitrag sagen, wie er entstanden ist: von Hand, Mensch + KI, oder KI-geschrieben unter meiner Aufsicht. Die Worte sind so oder so meine, und jede Kennzeichnung steht auch in den Metadaten.',
};

export function firstPublishedLine(post) {
	if (!post.originalUrl) return null;
	const site = post.originalSite || 'elsewhere';
	return post.lang === 'de' ? { prefix: 'Zuerst erschienen auf', site, suffix: `, ${longDate('de', post.date)}.` } : { prefix: 'First published on', site, suffix: `, ${longDate('en', post.date)}.` };
}

// Pick posts for the home page: lead + grid + theme rows + more, no repeats.
export function homeSections(list, lang) {
	const used = new Set();
	const take = (pred, n) => {
		const out = [];
		for (const p of list) {
			if (out.length >= n) break;
			if (used.has(p.id) || !pred(p)) continue;
			out.push(p);
			used.add(p.id);
		}
		return out;
	};
	const hasPhoto = (p) => p.cover && !p.cover.generated;
	const recent = new Set(list.slice(0, 12).map((p) => p.id));
	const lead = take((p) => recent.has(p.id) && hasPhoto(p) && p.provenance !== 'ai_generated', 1)[0] || take(hasPhoto, 1)[0] || take(() => true, 1)[0];
	const grid = take(hasPhoto, 6);
	const themes = (config.themes || [])
		.map((theme) => ({ ...theme, title: label(theme.label, lang), posts: take((p) => theme.categories.includes(p.category), 3) }))
		.filter((theme) => theme.posts.length);
	const more = take(() => true, 12);
	return { lead, grid, themes, more, rest: list.length - used.size };
}

export { t };
