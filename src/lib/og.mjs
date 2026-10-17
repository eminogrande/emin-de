// Open Graph share cards, 1200x630 PNG rendered with sharp at build time.
// No paid API, no network. Every post gets a card with its title and URL.
// Posts with an image (front-matter `image` / `cover`) use it as the background.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import config from '../../site.config.mjs';

// librsvg/Pango aborts the whole process on glyphs it has no font for (emoji),
// so the card keeps letters, digits and common punctuation only.
const clean = (s) => String(s).replace(/[^\p{L}\p{N}\p{P}\p{Zs}$€£+=<>|~^`]/gu, '').replace(/\s+/g, ' ').trim();
const esc = (s) => clean(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const SERIF = "Newsreader, Georgia, 'DejaVu Serif', 'Liberation Serif', serif";
const SANS = "Inter, Helvetica, Arial, 'DejaVu Sans', sans-serif";

function wrap(text, max = 28, lines = 4) {
	const out = [];
	let line = '';
	for (const word of String(text).split(/\s+/)) {
		if ((line + ' ' + word).trim().length > max) {
			out.push(line.trim());
			line = word;
		} else line += ` ${word}`;
	}
	if (line.trim()) out.push(line.trim());
	if (out.length > lines) out.splice(lines - 1, out.length, `${out[lines - 1]}…`);
	return out;
}

// Short display URL: the full path if it fits, else the bare domain.
export function displayUrl(path = '') {
	const host = new URL(config.origin || 'https://emin.de').host;
	const full = `${host}${path}`;
	return path && full.length <= 58 ? full : host;
}

export function ogSvg({ title, kicker = '', footer = '', url = '' }) {
	const lines = wrap(title);
	return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#fdf6e3"/>
<rect x="0" y="0" width="16" height="630" fill="#b58900"/>
<text x="80" y="110" font-family="${SANS}" font-size="28" fill="#b58900" font-weight="700">${esc(kicker)}</text>
${lines.map((l, i) => `<text x="80" y="${215 + i * 80}" font-family="${SERIF}" font-size="68" font-weight="600" fill="#002b36">${esc(l)}</text>`).join('\n')}
<text x="80" y="560" font-family="${SANS}" font-size="28" font-weight="700" fill="#002b36">${esc(url || config.name)}</text>
<text x="80" y="598" font-family="${SANS}" font-size="24" fill="#4f646b">${esc(footer)}</text>
</svg>`;
}

// Photo card: the image fills the frame, a dark band at the bottom carries
// the title and the URL, so the share preview reads as the post, not a stray photo.
function photoOverlaySvg({ title, url }) {
	const lines = wrap(title, 28, 3);
	const lh = 70;
	const top = 630 - 70 - lines.length * lh;
	return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#001b22" stop-opacity="0"/>
<stop offset="0.45" stop-color="#001b22" stop-opacity="0.72"/>
<stop offset="1" stop-color="#001b22" stop-opacity="0.92"/></linearGradient></defs>
<rect x="0" y="${top - 110}" width="1200" height="${630 - top + 110}" fill="url(#g)"/>
${lines.map((l, i) => `<text x="64" y="${top + 48 + i * lh}" font-family="${SERIF}" font-size="60" font-weight="600" fill="#fdf6e3">${esc(l)}</text>`).join('\n')}
<text x="64" y="598" font-family="${SANS}" font-size="26" font-weight="700" fill="#b58900">${esc(url)}</text>
</svg>`;
}

// Front-matter image paths are site paths (/photos/x.jpg, /media/...). Resolve them in public/.
export function localImage(sitePath) {
	if (!sitePath || /^https?:/i.test(sitePath)) return null;
	const file = join(process.cwd(), 'public', decodeURIComponent(sitePath.split('?')[0]));
	return existsSync(file) ? file : null;
}

export async function ogPng({ title, kicker, footer, url = '', image = null, cover = null }) {
	// Prefer the post's own picture, else its cover (house illustration or photo crop).
	// Old emino.app auto-covers are SVG text cards: never use an SVG as the share image.
	const file = localImage(image && !/\.svg(\?|$)/i.test(image) ? image : null) || localImage(cover);
	if (file) {
		try {
			// Transparent illustrations sit on the site paper colour.
			const base = await sharp(file).rotate().resize(1200, 630, { fit: 'cover', position: 'attention' }).flatten({ background: '#fdf6e3' }).toBuffer();
			// palette PNG keeps photo cards around 300-500 KB so chat apps show the preview
			return await sharp(base).composite([{ input: Buffer.from(photoOverlaySvg({ title, url })) }]).png({ compressionLevel: 9, palette: true, quality: 85, dither: 0.6 }).toBuffer();
		} catch {
			// unreadable image: fall through to the text card
		}
	}
	return sharp(Buffer.from(ogSvg({ title, kicker, footer, url }))).png({ compressionLevel: 9 }).toBuffer();
}
