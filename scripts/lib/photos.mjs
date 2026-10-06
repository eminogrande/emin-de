// Photos for /photos, the home page and /about. Reads public/photos/*.jpg|webp
// plus captions from public/photos/photos.json, writes responsive WebP
// variants to public/photos/_v/ (generated) and src/generated/photos.json.
// The portrait slot reads public/photos/portrait.(jpg|webp) when present.
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const DIR = 'public/photos';
const OUT = path.join(DIR, '_v');
const WIDTHS = [640, 1280];
const RASTER = /\.(jpe?g|webp)$/i;

export async function buildPhotos() {
	mkdirSync(OUT, { recursive: true });
	const meta = existsSync(path.join(DIR, 'photos.json')) ? JSON.parse(readFileSync(path.join(DIR, 'photos.json'), 'utf-8')) : { photos: {} };
	const files = existsSync(DIR) ? readdirSync(DIR).filter((f) => RASTER.test(f)).sort() : [];
	const photos = [];
	let portrait = null;
	for (const file of files) {
		const src = path.join(DIR, file);
		const info = await sharp(src).rotate().metadata();
		const rotated = (info.orientation || 1) >= 5;
		const w = rotated ? info.height : info.width;
		const h = rotated ? info.width : info.height;
		const base = file.replace(RASTER, '');
		const widths = WIDTHS.filter((x) => x < w).concat(w <= WIDTHS.at(-1) ? [w] : []).slice(0, 3);
		const variants = [];
		for (const width of widths) {
			const out = path.join(OUT, `${base}.w${width}.webp`);
			if (!existsSync(out) || statSync(out).mtimeMs < statSync(src).mtimeMs) await sharp(src).rotate().resize({ width }).webp({ quality: 76 }).toFile(out);
			variants.push({ src: `/photos/_v/${base}.w${width}.webp`, width });
		}
		const largest = variants.at(-1);
		const entry = meta.photos?.[file] || {};
		const item = {
			file,
			src: largest.src,
			srcset: variants.map((v) => `${v.src} ${v.width}w`).join(', '),
			width: largest.width,
			height: Math.round((h * largest.width) / w),
			alt: entry.alt || {},
			caption: entry.caption || {},
			date: entry.date || null,
			place: entry.place || null,
		};
		if (/^portrait$/i.test(base)) portrait = item;
		else if (entry.hidden !== true) photos.push(item);
	}
	// Order: photos.json order first, then the rest by file name.
	const order = Object.keys(meta.photos || {});
	photos.sort((a, b) => ((order.indexOf(a.file) + 1 || 1e9) - (order.indexOf(b.file) + 1 || 1e9)) || a.file.localeCompare(b.file));
	mkdirSync('src/generated', { recursive: true });
	writeFileSync('src/generated/photos.json', JSON.stringify({ portrait, photos }));
	return { count: photos.length, portrait: Boolean(portrait) };
}
