#!/usr/bin/env node
// Reads content/**/*.md, validates it, writes src/generated/content.json, and
// publishes content/media/ to public/media/ (raster images above 300 KB are
// re-encoded at max 1600px wide; everything else is copied). Runs before every
// build. Exit 1 on any content error, so broken front matter never deploys.
//   CONTENT_DIRS=content,tests/fixtures/sample node scripts/generate-content.mjs
import { mkdirSync, writeFileSync, readFileSync, existsSync, readdirSync, statSync, copyFileSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { loadContent } from '../src/lib/content-build.mjs';
import { buildRedirects, redirectsFile, redirectsDoc } from './lib/redirects.mjs';
import { buildCovers } from './lib/covers.mjs';
import { buildPhotos } from './lib/photos.mjs';
import config from '../site.config.mjs';

const MAX_ASSET_BYTES = 25 * 1024 * 1024; // Cloudflare Workers static asset limit per file
const RASTER = /\.(png|jpe?g|webp)$/i;

function walk(dir) {
	if (!existsSync(dir)) return [];
	return readdirSync(dir).flatMap((name) => {
		const full = path.join(dir, name);
		return statSync(full).isDirectory() ? walk(full) : [full];
	});
}

const sizes = {};
const srcsets = {};
const tooBig = [];
for (const dir of (process.env.CONTENT_DIRS || 'content').split(',')) {
	const base = path.join(dir, 'media');
	for (const file of walk(base)) {
		const rel = path.relative(base, file).split(path.sep).join('/');
		const out = path.join('public/media', rel);
		const key = `/media/${rel}`;
		mkdirSync(path.dirname(out), { recursive: true });
		const fresh = existsSync(out) && statSync(out).mtimeMs >= statSync(file).mtimeMs;
		if (RASTER.test(file)) {
			try {
				const meta = await sharp(file).metadata();
				const width = Math.min(meta.width, 1600);
				sizes[key] = [width, Math.round((meta.height * width) / meta.width)];
				if (!fresh) {
					if (statSync(file).size > 300 * 1024 || meta.width > 1600) {
						const img = sharp(file).rotate().resize({ width: 1600, withoutEnlargement: true });
						await (/\.png$/i.test(file) ? img.png({ palette: true, quality: 80, compressionLevel: 9 }) : /\.webp$/i.test(file) ? img.webp({ quality: 78 }) : img.jpeg({ quality: 80, mozjpeg: true })).toFile(out);
					} else copyFileSync(file, out);
				}
				// Small variant for phones: <img srcset> picks it, so mobile LCP stays low.
				if (meta.width > 800) {
					const small = out.replace(/(\.\w+)$/, '.w800.webp');
					if (!existsSync(small) || statSync(small).mtimeMs < statSync(file).mtimeMs) await sharp(file).rotate().resize({ width: 800 }).webp({ quality: 72 }).toFile(small);
					srcsets[key] = `${key.replace(/(\.\w+)$/, '.w800.webp')} 800w, ${key} ${width}w`;
				}
				continue;
			} catch {
				// Unreadable image: copy as is, no size hint.
			}
		}
		if (!fresh) copyFileSync(file, out);
		if (statSync(out).size > MAX_ASSET_BYTES) tooBig.push(`${key} (${(statSync(out).size / 1048576).toFixed(1)} MB)`);
	}
}

const { posts, problems } = loadContent({ sizes, srcsets });
if (tooBig.length) problems.push(...tooBig.map((f) => `media file over 25 MB (Workers asset limit): ${f}`));
if (problems.length) {
	console.error(`Content check failed (${problems.length}):\n- ${problems.join('\n- ')}`);
	process.exit(1);
}
// Covers for cards and lead stories (3:2 WebP crops, or a generated SVG).
const coverStats = await buildCovers(posts, {
	dirs: (process.env.CONTENT_DIRS || 'content').split(','),
	labelFor: (post) => config.categories[post.category]?.[post.lang] || config.categories[post.category]?.en || post.category,
});
console.log(`covers: ${coverStats.raster} photo cover(s), ${coverStats.generated} generated typographic cover(s)`);
const photoStats = await buildPhotos();
console.log(`photos: ${photoStats.count} gallery photo(s), portrait ${photoStats.portrait ? 'present' : 'not present (fallback monogram)'}`);
// Self-hosted display serif (Newsreader, OFL), copied from @fontsource: no
// third-party font request.
mkdirSync('public/fonts', { recursive: true });
for (const style of ['normal', 'italic']) {
	const from = `node_modules/@fontsource-variable/newsreader/files/newsreader-latin-wght-${style}.woff2`;
	if (existsSync(from)) copyFileSync(from, `public/fonts/newsreader-latin-wght-${style}.woff2`);
}
// Text face (Inter, OFL), same rule: self-hosted.
if (existsSync('node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2')) copyFileSync('node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2', 'public/fonts/inter-latin-wght-normal.woff2');
// The site changelog stream also includes the repo CHANGELOG.md, verbatim.
const changelog = existsSync('CHANGELOG.md') ? readFileSync('CHANGELOG.md', 'utf-8') : '';
mkdirSync('src/generated', { recursive: true });
writeFileSync('src/generated/content.json', JSON.stringify({ generatedFrom: process.env.CONTENT_DIRS || 'content', posts, changelog }));
// Slim graph for the runtime (Worker / Node API, MCP): no rendered HTML, no
// section copies. Indexable posts only; noindex posts are not served by the API.
const slim = posts.filter((p) => !p.noindex).map(({ html, sections, ...rest }) => ({ ...rest, sections: sections.map((s) => ({ heading: s.heading, body: '' })) }));
writeFileSync('src/generated/api.json', JSON.stringify({ posts: slim }));
// Redirects: config.redirects + old emino.app slugs -> emin.de. One JSON for
// the Worker and the Node origin, a _redirects table, and a doc for emino.app.
const redirects = buildRedirects(posts, config);
writeFileSync('src/generated/redirects.json', JSON.stringify(redirects.map));
writeFileSync('public/_redirects', redirectsFile(redirects.map));
mkdirSync('docs', { recursive: true });
if (!(process.env.CONTENT_DIRS || 'content').includes('tests/fixtures')) writeFileSync('docs/REDIRECTS-emino-app.md', redirectsDoc(redirects, config));
const idx = posts.filter((p) => !p.noindex);
console.log(`content: ${posts.length} post(s), ${idx.length} indexable, ${posts.length - idx.length} noindex, ${Object.keys(sizes).length} sized image(s), ${Object.keys(redirects.map).length} redirect(s) -> src/generated/content.json`);
