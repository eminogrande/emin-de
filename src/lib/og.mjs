// Fallback Open Graph card: 1200x630 SVG rendered to PNG with sharp at build
// time. No paid API, no network. A post's front-matter `image` wins when set.
import sharp from 'sharp';
import config from '../../site.config.mjs';

// librsvg/Pango aborts the whole process on glyphs it has no font for (emoji),
// so the card keeps letters, digits and common punctuation only.
const clean = (s) => String(s).replace(/[^\p{L}\p{N}\p{P}\p{Zs}$€£+=<>|~^`]/gu, '').replace(/\s+/g, ' ').trim();
const esc = (s) => clean(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

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

export function ogSvg({ title, kicker = '', footer = '' }) {
	const lines = wrap(title);
	return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#fffdf7"/>
<rect x="0" y="0" width="16" height="630" fill="#4f46e5"/>
<text x="80" y="110" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#4f46e5" font-weight="700">${esc(kicker)}</text>
${lines.map((l, i) => `<text x="80" y="${210 + i * 78}" font-family="Helvetica, Arial, sans-serif" font-size="64" font-weight="700" fill="#18181b">${esc(l)}</text>`).join('\n')}
<text x="80" y="570" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#52525b">${esc(footer || config.name)}</text>
</svg>`;
}

export const ogPng = (opts) => sharp(Buffer.from(ogSvg(opts))).png({ compressionLevel: 9 }).toBuffer();
