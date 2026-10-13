#!/usr/bin/env node
// IndexNow ping for URLs whose source changed. Deterministic and free.
//   node plugins/indexnow.mjs --since <git-ref>     (changed posts since ref)
//   node plugins/indexnow.mjs https://site/a https://site/b
// Key: the public/<key>.txt file (IndexNow requires it to be served at the
// site root). Exit 0 even when nothing changed. --dry-run prints only.
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import config from '../site.config.mjs';
import { allPosts } from '../src/lib/corpus.mjs';

const args = process.argv.slice(2);
const dry = args.includes('--dry-run');
const sinceAt = args.indexOf('--since');
const keyFile = readdirSync('public').find((name) => /^[a-f0-9]{32}\.txt$/.test(name));
if (!keyFile) {
	console.error('indexnow: no public/<32-hex>.txt key file found');
	process.exit(2);
}
const key = readFileSync(`public/${keyFile}`, 'utf-8').trim();

export function changedUrls(files) {
	const urls = new Set();
	for (const file of files) {
		const post = allPosts.find((p) => p.file === file);
		if (post && !post.noindex && !post.externalCanonical) urls.add(`${config.origin}${post.path}`);
	}
	if (urls.size) ['/', '/posts', '/sitemap.xml', '/llms.txt', '/rss.xml'].forEach((p) => urls.add(`${config.origin}${p}`));
	return [...urls];
}

let urls = args.filter((a) => /^https?:\/\//.test(a));
if (sinceAt !== -1) {
	const ref = args[sinceAt + 1];
	let files = [];
	try {
		files = execFileSync('git', ['diff', '--name-only', ref, 'HEAD', '--', 'content/'], { encoding: 'utf-8' }).split('\n').filter(Boolean);
	} catch {
		console.error(`indexnow: cannot diff against ${ref}; nothing pinged`);
		process.exit(0);
	}
	urls = changedUrls(files);
}
if (!urls.length) {
	console.log('indexnow: no changed URLs');
	process.exit(0);
}
const body = { host: new URL(config.origin).host, key, keyLocation: `${config.origin}/${keyFile}`, urlList: urls };
console.log(`indexnow: ${urls.length} URL(s)\n${urls.join('\n')}`);
if (dry) process.exit(0);
const response = await fetch('https://api.indexnow.org/indexnow', { method: 'POST', headers: { 'content-type': 'application/json; charset=utf-8' }, body: JSON.stringify(body) });
console.log(`indexnow: HTTP ${response.status}`);
process.exit(response.status < 300 ? 0 : 1);
