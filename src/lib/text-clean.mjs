// Display-only text cleanup for titles and excerpts. Never applied to post
// bodies: the Markdown file stays the record, these only shape the cards,
// <title>, feeds and schema headline.

const NAMED = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—', hellip: '…', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“' };

// Decode HTML entities exactly once. Also repairs the broken "&x27;" form
// (an entity that lost its "#") that some importers produced.
export function decodeEntities(input) {
	return String(input ?? '')
		.replace(/&#?x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
		.replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
		.replace(/&([a-z]+);/gi, (m, name) => NAMED[name.toLowerCase()] ?? m);
}

const URL_RE = /<?https?:\/\/[^\s<>)\]]+>?/g;

export function stripMarkup(text) {
	return decodeEntities(
		String(text ?? '')
			.replace(/^\s*(```|~~~)[\s\S]*?^\s*\1\s*$/gm, ' ')
			.replace(/<!--[\s\S]*?-->/g, ' ')
			.replace(/<br\s*\/?>/gi, ' ')
			.replace(/<\/?[a-z][^>]*>/gi, ' ')
			.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
			.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
			.replace(/\{\{<[^>]*>\}\}/g, ' ')
			.replace(/^#{1,6}\s+/gm, '')
			.replace(/^>\s?/gm, '')
			.replace(/[*_`]+/g, '')
	);
}

const isUntitled = (t) => !t || /^\s*(untitled( post)?|ohne titel)\s*$/i.test(t);

// First heading of a body: a Markdown "# X" line, or a "# X" that an import
// buried inside raw HTML (e.g. "<div># Title<br>").
export function firstHeading(body) {
	const text = String(body ?? '');
	const md = text.match(/^#{1,2}\s+(.+)$/m)?.[1];
	if (md) return stripMarkup(md).trim();
	const html = text.match(/>\s*#{1,2}\s+([^<\n]+)/)?.[1];
	return html ? stripMarkup(html).trim() : '';
}

export function cleanTitle(raw, { fallback = '', lang = 'en', date = '', formatLabel = '' } = {}) {
	let title = decodeEntities(raw).replace(/\s+/g, ' ').trim();
	if (isUntitled(title)) title = fallback && !isUntitled(fallback) ? fallback : '';
	if (!title) {
		const d = date ? new Date(`${date}T00:00:00Z`).toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) : '';
		title = `${formatLabel || (lang === 'de' ? 'Notiz' : 'Note')}${d ? `, ${d}` : ''}`;
		// e.g. "Photo, 6 January 2026"; the label passed in is singular.
	}
	// Trailing colon/semicolon/comma/dash or a lone full stop is dangling.
	// Keep "?", "!", "…" and abbreviations like "A.M." / "U.S." intact.
	title = title.replace(/\s+[.,;:–—-]+$/, '').replace(/[,;:–—-]+$/, '');
	if (/[a-z0-9)”’"]\.$/i.test(title) && !/(?:\b[A-Z]\.){2,}$/.test(title) && !/\b(?:etc|vs|Inc|Ltd|Co|Dr|Mr|Mrs|St)\.$/.test(title)) title = title.slice(0, -1);
	return title.trim();
}

// Plain-text excerpt from a body, URLs removed.
export function bodyExcerpt(body, max = 180) {
	const text = stripMarkup(body).replace(URL_RE, ' ').replace(/\s+/g, ' ').trim();
	return clip(text, max);
}

function clip(text, max) {
	if (text.length <= max) return text;
	const cut = text.slice(0, max);
	return `${cut.slice(0, Math.max(cut.lastIndexOf(' '), max - 20)).replace(/[\s,;:–—-]+$/, '')}…`;
}

// Front-matter description for cards and meta: decoded, URLs removed, never
// empty, never just the title again, never a raw URL.
export function cleanExcerpt(raw, { body = '', title = '' } = {}) {
	const norm = (s) => s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '');
	const tidy = (s) => decodeEntities(s)
		.replace(/^\s*---[\s\S]*?---\s*/, ' ') // front matter pasted into a body
		.replace(/\[image:[^\]]*\]/gi, ' ')
		.replace(URL_RE, ' ')
		.replace(/\b(watch it here|watch here|link|video)\s*:\s*/gi, ' ')
		.replace(/(^|\s)>\s/g, '$1')
		.replace(/\s+/g, ' ')
		.trim()
		.replace(/^[:\-–—,;.\s]+/, '')
		.replace(/\s+\S{1,12}(\.\.\.|…)$/, '…')
		.replace(/:$/, '…')
		.replace(/\s+([.,;:])/g, '$1');
	const dropTitle = (s) => {
		if (!title) return s;
		const esc = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		return s.replace(new RegExp(`^[“"]?${esc}[.”"]*[\\s:.–—-]*`, 'i'), '').trim();
	};
	let text = dropTitle(tidy(raw));
	if (text.length < 25 || isUntitled(text) || norm(text) === norm(title) || /^(watch it here|video|link)[:.]?$/i.test(text)) {
		text = dropTitle(tidy(stripMarkup(body).replace(/^\s*---[\s\S]*?---\s*/, ' ')));
	}
	return clip(text || title, 200);
}

export function originLabel(url) {
	try {
		const host = new URL(url).hostname.replace(/^www\./, '');
		if (host === 'medium.com' || host.endsWith('.medium.com')) return 'Medium';
		if (host.endsWith('substack.com')) return 'Substack';
		return host;
	} catch {
		return null;
	}
}

// Display-only: English titles imported in Title Case Become Sentence case,
// so every headline on the site reads the same way. A word is lowered only
// when the post body itself uses it in lower case and never capitalised
// mid-sentence (so names like "Nuri", "Stockholm" or "Bitcoin" keep their
// capital). The first word and the word after ":" "." "?" "!" stay capitalised.
// Titles that are not Title Case are returned unchanged.
// Names that are always capitalised, whatever a body happens to do.
const PROPER = new Set(['emin', 'mahrt', 'bitcoin', 'ethereum', 'facebook', 'facebooks', 'google', 'apple', 'nuri', 'nostr', 'lightning', 'berlin', 'zanzibar', 'tanzania', 'africa', 'europe', 'german', 'germany', 'english', 'proud', 'medium', 'substack', 'explained']);

export function sentenceCaseTitle(title, body = '') {
	const words = title.split(/(\s+)/);
	const alpha = words.filter((w) => /^[A-Za-z]/.test(w));
	if (alpha.length < 4) return title;
	const capped = alpha.slice(1).filter((w) => /^[A-Z][a-z]/.test(w)).length;
	if (capped / Math.max(1, alpha.length - 1) < 0.7) return title;
	// The body is the evidence. Lines that repeat the title (an H1 copy) and
	// URLs/domains are ignored.
	const t = title.toLowerCase();
	const text = stripMarkup(body)
		.split('\n')
		.filter((line) => !line.toLowerCase().includes(t.slice(0, 30)))
		.join('\n')
		.replace(/\S*[./@_#]\S*[a-z]\S*/gi, (m) => (/^[A-Za-z]+[.,;:!?]?$/.test(m) ? m : ' '));
	const lower = new Map();
	const upper = new Map();
	const anyCap = new Set();
	// Names written as domains ("Nuri.com") still count as capitalised.
	for (const m of stripMarkup(body).matchAll(/\b([A-Z][a-z]+)\.(?:com|de|app|io|org)\b/g)) anyCap.add(m[1].toLowerCase());
	for (const m of text.matchAll(/(?<=^|[\s(“"‘'-])([A-Za-z][a-z'’]*)(?=[\s,.;:!?)”"’'-]|$)/gm)) {
		const w = m[1];
		const prev = text.slice(Math.max(0, m.index - 3), m.index);
		if (/^[a-z]/.test(w)) lower.set(w, (lower.get(w) || 0) + 1);
		else anyCap.add(w.toLowerCase());
		if (/^[a-z]/.test(w)) {
			// counted above
		} else if (/[\p{L}\p{N},;)]\s+$|[\p{L}]-$/u.test(prev)) upper.set(w.toLowerCase(), (upper.get(w.toLowerCase()) || 0) + 1);
	}
	// A capitalised title word stays capitalised only when the body itself
	// writes it that way mid-sentence more often than in lower case (names).
	// A word keeps its capital only when the body itself capitalises it
	// mid-sentence more often than not (names, places, products).
	const small = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'from', 'in', 'into', 'is', 'it', 'of', 'on', 'or', 'the', 'to', 'vs', 'with', 'how', 'why', 'what', 'who', 'when', 'your', 'my', 'our', 'their', 'can', 'are', 'was', 'be', 'has', 'have', 'not', 'no', 'its', 'that', 'this', 'than', 'about', 'after', 'before', 'over', 'under', 'up', 'out', 'more', 'most', 'do']);
	const keep = (core) => {
		const l = core.toLowerCase();
		if (PROPER.has(l)) return true;
		if (small.has(l)) return false;
		const lo = lower.get(l) || 0;
		const up = upper.get(l) || 0;
		// Unseen words follow the sentence-case default (lower); names show up
		// capitalised mid-sentence in the body and keep their capital.
		return up > lo || (lo === 0 && anyCap.has(l));
	};
	let start = true;
	return words
		.map((w) => {
			if (!w || /^\s+$/.test(w)) return w;
			let out = w;
			if (!start) {
				out = w.replace(/[A-Za-z][A-Za-z'’]*/g, (part) => (/^[A-Z][a-z'’]+$/.test(part) && !keep(part) ? part.toLowerCase() : part));
			} else {
				// First word of the title or a clause: keep it, lower later hyphen parts.
				out = w.replace(/-([A-Z][a-z'’]+)/g, (m, part) => (keep(part) ? m : `-${part.toLowerCase()}`));
			}
			start = /[:.?!]["”’)]?$/.test(w);
			return out;
		})
		.join('');
}
