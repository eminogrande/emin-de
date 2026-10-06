// Covers for cards and lead stories, built at build time. No paid API, no
// network.
//  1. The post's `image`/`cover`, or else the first raster image in its
//     media folder, is cropped to 3:2 and written as WebP in three widths.
//  2. Without any image, a typographic SVG cover is generated.
// Output lives in public/covers/ (generated, gitignored), cached by mtime.
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

export const COVER_WIDTHS = [480, 720, 960, 1440];
const RASTER = /\.(png|jpe?g|webp)$/i;

// Bright, warm tints per category; ink stays near-black for contrast.
const TINTS = {
	nuri: ['#F6E3D3', '#C2410C'],
	bitcoin: ['#F7E7C6', '#9A5B00'],
	payments: ['#F3E9D2', '#8A5A12'],
	'agents-ai': ['#E3EAF4', '#1F4E8C'],
	building: ['#E6EEE3', '#2F6B3A'],
	science: ['#E9E5F3', '#5B3F99'],
	culture: ['#F4E1E4', '#A3304A'],
	notes: ['#EFEBE3', '#5C5A55'],
};

const xml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function sourceFor(post, dirs) {
	if (post.image && RASTER.test(post.image)) {
		for (const dir of dirs) {
			const file = path.join(dir, post.image.replace(/^\/media\//, 'media/'));
			if (existsSync(file)) return file;
		}
	}
	for (const dir of dirs) {
		const folder = path.join(dir, 'media', post.slug);
		if (!existsSync(folder)) continue;
		const first = readdirSync(folder).filter((f) => RASTER.test(f) && !/\.w\d+\./.test(f)).sort()[0];
		if (first) return path.join(folder, first);
	}
	return null;
}

export function svgCover(post, label) {
	const [bg, accent] = TINTS[post.category] || TINTS.notes;
	const letter = ([...post.title.replace(/^[^\p{L}\p{N}]+/u, '')][0] || '·').toUpperCase();
	return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" aria-label="${xml(label)}">
<rect width="1200" height="800" fill="${bg}"/>
<g stroke="${accent}" stroke-opacity=".18" stroke-width="2">${Array.from({ length: 9 }, (_, i) => `<line x1="0" y1="${120 + i * 70}" x2="1200" y2="${120 + i * 70}"/>`).join('')}</g>
<circle cx="880" cy="400" r="250" fill="${accent}" fill-opacity=".1"/>
<text x="880" y="560" text-anchor="middle" font-family="Newsreader, Georgia, 'Times New Roman', serif" font-style="italic" font-size="460" fill="${accent}">${xml(letter)}</text>
<text x="72" y="720" font-family="Helvetica, Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="6" fill="#141414">${xml(label.toUpperCase())}</text>
<rect x="72" y="80" width="64" height="6" fill="${accent}"/>
</svg>
`;
}

const fresh = (out, src) => existsSync(out) && statSync(out).mtimeMs >= statSync(src).mtimeMs;

export async function buildCovers(posts, { dirs, labelFor, outDir = 'public/covers' }) {
	mkdirSync(outDir, { recursive: true });
	let raster = 0;
	let generated = 0;
	for (const post of posts) {
		const base = `${post.lang}-${post.slug}`;
		const src = sourceFor(post, dirs);
		if (src) {
			try {
				const meta = await sharp(src).metadata();
				if ((meta.width || 0) >= 320) {
					const widths = COVER_WIDTHS.filter((w) => w <= Math.max(meta.width, COVER_WIDTHS[0]));
					for (const w of widths) {
						const out = path.join(outDir, `${base}.w${w}.webp`);
						if (!fresh(out, src)) await sharp(src).rotate().resize({ width: w, height: Math.round((w * 2) / 3), fit: 'cover', position: sharp.strategy.attention }).webp({ quality: w > 1000 ? 68 : 66, effort: 5 }).toFile(out);
					}
					const largest = widths.at(-1);
					post.cover = {
						src: `/covers/${base}.w${largest}.webp`,
						srcset: widths.map((w) => `/covers/${base}.w${w}.webp ${w}w`).join(', '),
						width: largest,
						height: Math.round((largest * 2) / 3),
						generated: false,
						// The post body shows this same picture already: no second copy on the post page.
						inBody: post.image ? post.html.some((s) => s.html.includes(post.image)) : true,
					};
					raster += 1;
					continue;
				}
			} catch {
				// Unreadable image: fall through to a generated cover.
			}
		}
		const file = path.join(outDir, `${base}.svg`);
		writeFileSync(file, svgCover(post, labelFor(post)));
		post.cover = { src: `/covers/${base}.svg`, srcset: null, width: 1200, height: 800, generated: true, inBody: false };
		generated += 1;
	}
	return { raster, generated };
}
