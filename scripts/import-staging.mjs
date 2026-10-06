#!/usr/bin/env node
// Re-runnable staging import: copies (or overwrites) posts and media from a
// staging tree into content/, then validates and proves no word was dropped.
//   npm run import:staging -- <dir> [--dry-run]
// <dir> holds posts/<lang>/<yyyy>/<slug>.md (and optionally media/<slug>/...).
// When <dir> is .../voice-v1, media is also taken from the sibling ../media.
//
// Rules (CORE PRINCIPLE: free speech):
//  - Never drops, skips or hides a post because of its topic or its words.
//    Every file under posts/ is imported. A `quarantine/` folder next to
//    posts/ is imported too.
//  - An external `canonical` becomes `original_url`; emin.de is the original.
//  - `noindex`/`index`/`quarantine` keys are removed. Only `draft: true`,
//    set by the author, hides a post.
//  - The body is copied byte for byte. The script fails if a body changed.
//  - Afterwards the content validator and the word-preservation check run.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync, copyFileSync } from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { applyOriginPolicy, applyNoGate, applyBylinePolicy } from './lib/front-matter-policy.mjs';

const args = process.argv.slice(2);
const dry = args.includes('--dry-run');
const src = args.find((a) => !a.startsWith('--'));
if (!src || !existsSync(src)) {
	console.error('usage: npm run import:staging -- <staging-dir> [--dry-run]');
	process.exit(2);
}
const walk = (dir) => (existsSync(dir) ? readdirSync(dir).flatMap((n) => (statSync(path.join(dir, n)).isDirectory() ? walk(path.join(dir, n)) : [path.join(dir, n)])) : []);
const body = (text) => text.slice(text.indexOf('\n---', 4) + 4);
const words = (s) => (s.toLowerCase().match(/[\p{L}\p{N}]{2,}/gu) || []).length;

const postFiles = [];
for (const file of walk(path.join(src, 'posts')).filter((f) => f.endsWith('.md'))) postFiles.push({ file, rel: path.relative(path.join(src, 'posts'), file) });
// Quarantined files are flat (<slug>.md): place them by their own lang/date.
for (const file of walk(path.join(src, 'quarantine')).filter((f) => f.endsWith('.md') && !f.includes(`${path.sep}media${path.sep}`))) {
	const raw = readFileSync(file, 'utf-8');
	const lang = raw.match(/^lang:\s*"?(\w+)"?/m)?.[1];
	const year = raw.match(/^date:\s*"?(\d{4})/m)?.[1];
	if (!lang || !year) throw new Error(`${file}: cannot place (missing lang/date); refusing to skip it silently`);
	postFiles.push({ file, rel: path.join(lang, year, path.basename(file)) });
}

let written = 0;
let unchanged = 0;
let wordsIn = 0;
for (const { file, rel } of postFiles) {
	const raw = readFileSync(file, 'utf-8');
	const text = applyBylinePolicy(applyNoGate(applyOriginPolicy(raw).text));
	if (body(text) !== body(raw)) throw new Error(`${file}: body changed during import`);
	wordsIn += words(body(raw));
	const out = path.join('content/posts', rel);
	if (existsSync(out) && readFileSync(out, 'utf-8') === text) {
		unchanged += 1;
		continue;
	}
	if (!dry) {
		mkdirSync(path.dirname(out), { recursive: true });
		writeFileSync(out, text);
	}
	written += 1;
}

let media = 0;
const mediaRoots = [path.join(src, 'media'), path.join(src, 'quarantine', 'media'), path.join(src, '..', 'media')].filter((d) => existsSync(d));
const slugs = new Set(postFiles.map(({ rel }) => path.basename(rel, '.md')));
for (const root of mediaRoots) {
	for (const file of walk(root)) {
		const rel = path.relative(root, file);
		if (!slugs.has(rel.split(path.sep)[0])) continue;
		const out = path.join('content/media', rel);
		// Existing media is never overwritten: committed files may be re-encoded to fit
		// the 25 MB Workers asset limit.
		if (existsSync(out)) continue;
		if (!dry) {
			mkdirSync(path.dirname(out), { recursive: true });
			copyFileSync(file, out);
		}
		media += 1;
	}
}

console.log(`import:staging ${dry ? '(dry run) ' : ''}${postFiles.length} post file(s): ${written} written, ${unchanged} unchanged; ${media} media file(s); ${wordsIn} words in source bodies`);
if (dry) process.exit(0);
// Validators: front matter + build graph, then the word-preservation proof.
execFileSync('node', ['scripts/generate-content.mjs'], { stdio: 'inherit' });
execFileSync('node', ['tests/text-preservation.mjs'], { stdio: 'inherit' });
