#!/usr/bin/env node
// One command for a new post:
//   npm run new -- --lang en --category bitcoin --format essay --author emin "My title"
// Writes content/posts/<lang>/<yyyy>/<slug>.md as draft: true with every
// required front-matter field. Validation runs at build (npm run check).
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import config from '../site.config.mjs';

const args = process.argv.slice(2);
const opt = (name, fallback) => {
	const i = args.indexOf(`--${name}`);
	return i === -1 ? fallback : args[i + 1];
};
const flagValues = new Set(['lang', 'category', 'format', 'author', 'date'].map((n) => opt(n)));
const title = args.filter((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--') && flagValues.has(a))).join(' ').trim();
if (!title) {
	console.error('usage: npm run new -- --lang en --category notes --format note --author <id> "Title"');
	process.exit(2);
}
const lang = opt('lang', config.locales[0].code);
const author = opt('author', config.owner);
const date = opt('date', new Date().toISOString().slice(0, 10));
const category = opt('category', 'notes');
const format = opt('format', 'note');
const ai = config.authors[author]?.type === 'ai_editorial';
for (const [field, ok] of [['lang', config.locales.some((l) => l.code === lang)], ['author', config.authors[author]], ['category', config.categories[category]], ['format', config.formats[format]]]) {
	if (!ok) {
		console.error(`unknown ${field}; see site.config.mjs`);
		process.exit(2);
	}
}
const slug = title.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
const file = `content/posts/${lang}/${date.slice(0, 4)}/${slug}.md`;
if (existsSync(file)) {
	console.error(`exists: ${file}`);
	process.exit(1);
}
mkdirSync(file.slice(0, file.lastIndexOf('/')), { recursive: true });
writeFileSync(
	file,
	`---
title: ${JSON.stringify(title)}
description: ""
date: ${date}
updated: ${date}
lang: ${lang}
translations: {}
category: ${category}
format: ${format}
author: ${author}
provenance: ${ai ? 'ai_generated' : 'written'}
ai_assisted: ${ai ? 'true' : 'false'}
reviewed_by_human: false
draft: true
tags: []
source_links: []
tldr:
  - ""
  - ""
basically:
  first-section: ""
---
## First section

Write here. Remove draft: true and set reviewed_by_human: true when a human approved it.
`
);
console.log(file);
