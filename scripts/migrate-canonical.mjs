#!/usr/bin/env node
// One-off, idempotent: emin.de becomes the original for every post.
// Moves an external `canonical:` to `original_url:` in each content file.
// Bodies are untouched. Re-running changes nothing.
//   node scripts/migrate-canonical.mjs [contentDir]
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';
import { applyOriginPolicy } from './lib/front-matter-policy.mjs';

const root = process.argv[2] || 'content';
const walk = (dir) => (existsSync(dir) ? readdirSync(dir).flatMap((n) => (statSync(path.join(dir, n)).isDirectory() ? walk(path.join(dir, n)) : n.endsWith('.md') ? [path.join(dir, n)] : [])) : []);
let changed = 0;
for (const file of walk(path.join(root, 'posts'))) {
	const raw = readFileSync(file, 'utf-8');
	const { text, changed: did } = applyOriginPolicy(raw);
	if (!did) continue;
	if (raw.split('\n---')[1]?.length && text.slice(text.indexOf('\n---', 4)) !== raw.slice(raw.indexOf('\n---', 4))) throw new Error(`${file}: body would change`);
	writeFileSync(file, text);
	changed += 1;
}
console.log(`migrate-canonical: ${changed} file(s) updated`);
