// Front-matter policy shared by the one-off canonical migration and the
// re-runnable staging import. Line-based on purpose: the YAML stays exactly
// as written except for the keys this policy owns.
import config from '../../site.config.mjs';

const keyLine = (key) => new RegExp(`^${key}:.*$`, 'm');
const getKey = (fm, key) => fm.match(new RegExp(`^${key}:\\s*"?([^"\\n]*)"?\\s*$`, 'm'))?.[1] ?? null;
const setKey = (fm, key, value) => (keyLine(key).test(fm) ? fm.replace(keyLine(key), `${key}: ${value}`) : `${fm}\n${key}: ${value}`);
const dropKey = (fm, key) => fm.replace(new RegExp(`^${key}:.*\\n?`, 'm'), '');

// emin.de is the original. An external `canonical` becomes `original_url`;
// the canonical then defaults to the emin.de URL (set by the loader).
export function applyOriginPolicy(raw) {
	const m = raw.match(/^---\n([\s\S]*?)\n---(\n?[\s\S]*)$/);
	if (!m) return { text: raw, changed: false };
	let fm = m[1];
	const before = fm;
	const canonical = getKey(fm, 'canonical');
	if (canonical && !canonical.startsWith(config.origin)) {
		if (!getKey(fm, 'original_url')) fm = setKey(fm, 'original_url', JSON.stringify(canonical));
		fm = dropKey(fm, 'canonical');
	}
	return { text: `---\n${fm}\n---${m[2]}`, changed: fm !== before };
}

// Free speech: an import never hides a post. review_status is kept as a
// visible label only. Any `noindex`/`index` key an upstream tool wrote is
// removed; only `draft: true` (the author's own switch) survives.
export function applyNoGate(raw) {
	const m = raw.match(/^---\n([\s\S]*?)\n---(\n?[\s\S]*)$/);
	if (!m) return raw;
	let fm = m[1];
	fm = dropKey(fm, 'noindex');
	fm = dropKey(fm, 'index');
	fm = dropKey(fm, 'quarantine');
	return `---\n${fm}\n---${m[2]}`;
}

// Honest bylines: AI-generated text is published under the AI desk, never under
// a human byline (the voice rewrites set author: emin on ai_generated posts).
export function applyBylinePolicy(raw) {
	const m = raw.match(/^---\n([\s\S]*?)\n---(\n?[\s\S]*)$/);
	if (!m) return raw;
	let fm = m[1];
	if (getKey(fm, 'provenance') === 'ai_generated' && getKey(fm, 'author') === 'emin') fm = setKey(fm, 'author', '"ai-desk"');
	return `---\n${fm}\n---${m[2]}`;
}

export { getKey };
