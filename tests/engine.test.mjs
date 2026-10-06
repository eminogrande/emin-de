// Engine tests against the TEST build (npm run build:test), which includes the
// synthetic fixtures in tests/fixtures/ (a noindex sample post and a de/en
// translation pair). Run: npm run build:test && npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { loadContent } from '../src/lib/content-build.mjs';
import { DISCOVERY_LINKS } from '../src/lib/site.mjs';
import config from '../site.config.mjs';

const dist = (p) => path.join('dist', p);
const read = (p) => readFileSync(dist(p), 'utf-8');
const graph = JSON.parse(readFileSync('src/generated/content.json', 'utf-8'));
const isTestBuild = graph.generatedFrom.includes('tests/fixtures');
const ld = (html) => [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => JSON.parse(m[1]));

test('test build is in place', () => {
	assert.ok(existsSync(dist('index.html')), 'run npm run build:test first');
	assert.ok(isTestBuild, 'src/generated/content.json must come from npm run build:test');
});

test('content files all validate', () => {
	const { problems } = loadContent({ dirs: ['content'] });
	assert.deepEqual(problems, []);
});

test('every post has HTML, Markdown mirror, OG image', () => {
	for (const post of graph.posts) {
		assert.ok(existsSync(dist(`${post.path.slice(1)}/index.html`)), post.path);
		assert.ok(existsSync(dist(`${post.path.slice(1)}/index.md`)), `${post.path}/index.md`);
		assert.ok(existsSync(dist(`og/${post.lang}/${post.slug}.png`)), `og for ${post.slug}`);
		const md = read(`${post.path.slice(1)}/index.md`);
		assert.match(md, new RegExp(`^# ${post.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`));
		assert.match(md, /Provenance: (transcript|written|ai_generated|human|mixed|unknown)\./);
	}
});

test('noindex sample post: rendered, but absent from sitemap, feeds, llms.txt, API list', () => {
	const sample = graph.posts.find((p) => p.slug === 'sample-post-for-tests');
	assert.ok(sample?.noindex);
	assert.match(read('posts/sample-post-for-tests/index.html'), /<meta name="robots" content="noindex, nofollow">/);
	for (const file of ['sitemap.xml', 'rss.xml', 'atom.xml', 'feed.json', 'llms.txt', 'llms-full.txt', 'posts/index.html', 'posts/index.md']) {
		assert.ok(!read(file).includes('sample-post-for-tests'), `${file} leaks the noindex fixture`);
	}
});

test('production content never contains the synthetic fixtures', () => {
	const { posts } = loadContent({ dirs: ['content'] });
	assert.ok(!posts.some((p) => p.slug.includes('sample-post-for-tests') || p.slug.includes('synthetic')));
});

test('hreflang: reciprocal with x-default, in HTML and sitemap', () => {
	const en = read('posts/synthetic-translation-test/index.html');
	const de = read('de/posts/synthetischer-uebersetzungstest/index.html');
	for (const html of [en, de]) {
		assert.match(html, /hreflang="en" href="https:\/\/emin\.de\/posts\/synthetic-translation-test"/);
		assert.match(html, /hreflang="de" href="https:\/\/emin\.de\/de\/posts\/synthetischer-uebersetzungstest"/);
		assert.match(html, /hreflang="x-default" href="https:\/\/emin\.de\/posts\/synthetic-translation-test"/);
	}
	assert.match(de, /<html lang="de"/);
	assert.match(de, /Im Kern:/);
	const sitemap = read('sitemap.xml');
	assert.match(sitemap, /<loc>https:\/\/emin\.de\/de\/posts\/synthetischer-uebersetzungstest<\/loc>.*hreflang="en"/);
});

test('no-fallback rule: posts without a translation emit no hreflang and no foreign route', () => {
	const html = read('posts/what-agent-ready-actually-means/index.html');
	assert.ok(!/<link rel="alternate" hreflang=/.test(html), 'single-language post must not claim alternates');
	assert.ok(!existsSync(dist('de/posts/what-agent-ready-actually-means')));
	// German listing pages exist only for facets that have German posts.
	const deCats = new Set(graph.posts.filter((p) => p.lang === 'de' && !p.noindex).map((p) => p.category));
	for (const id of Object.keys(config.categories)) {
		assert.equal(existsSync(dist(`de/category/${id}/index.html`)), deCats.has(id), `de/category/${id}`);
	}
	const locs = [...read('sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
	for (const loc of locs) {
		const file = loc === '/' ? 'index.html' : `${loc.slice(1)}/index.html`;
		assert.ok(existsSync(dist(file)), `sitemap lists ${loc} but no page was built`);
	}
});

test('loader rejects a translation that does not exist, and non-reciprocal links', () => {
	const dir = mkdtempSync(path.join(os.tmpdir(), 'engine-'));
	mkdirSync(path.join(dir, 'c/posts/en/2026'), { recursive: true });
	const fm = (extra) => `---\ntitle: "T"\ndescription: "D"\ndate: 2026-01-01\nlang: en\ncategory: notes\nformat: note\nauthor: emin\nprovenance: written\nai_assisted: false\nreviewed_by_human: true\ntldr: ["a", "b"]\nbasically: {}\n${extra}\n---\nBody.\n`;
	writeFileSync(path.join(dir, 'c/posts/en/2026/a.md'), fm('translations: { de: missing }'));
	const { problems } = loadContent({ dirs: ['c'], root: dir });
	assert.ok(problems.some((p) => p.includes('does not exist (no fallback pages)')), problems.join('\n'));
});

test('honest bylines: AI desk is labelled, never a Person, and loader enforces it', () => {
	const html = read('posts/sample-post-for-tests/index.html');
	assert.match(html, /AI-written, human-supervised/);
	const blog = ld(html).find((s) => s['@type'] === 'BlogPosting');
	assert.equal(blog.author['@type'], 'Organization');
	assert.equal(blog.creativeWorkStatus, 'AI-written, human-supervised: not yet reviewed');
	const desk = read('author/ai-desk/index.html');
	assert.match(desk, /Not a person, no invented biography, no photo/);
	assert.ok(!/<img/.test(desk));
	const dir = mkdtempSync(path.join(os.tmpdir(), 'engine-'));
	mkdirSync(path.join(dir, 'c/posts/en/2026'), { recursive: true });
	writeFileSync(path.join(dir, 'c/posts/en/2026/x.md'), `---\ntitle: "T"\ndescription: "D"\ndate: 2026-01-01\nlang: en\ncategory: notes\nformat: note\nauthor: emin\nprovenance: ai_generated\nai_assisted: true\nreviewed_by_human: true\nnoindex: true\n---\nBody.\n`);
	const { problems } = loadContent({ dirs: ['c'], root: dir });
	assert.ok(problems.some((p) => p.includes('requires an ai_editorial author')));
});

test('schema: valid JSON-LD with required properties on posts and home', () => {
	const home = ld(read('index.html'));
	for (const type of ['Organization', 'WebSite', 'Person']) assert.ok(home.some((s) => s['@type'] === type), type);
	for (const post of graph.posts) {
		const blog = ld(read(`${post.path.slice(1)}/index.html`)).find((s) => s['@type'] === 'BlogPosting');
		for (const key of ['headline', 'datePublished', 'dateModified', 'author', 'publisher', 'inLanguage', 'image', 'mainEntityOfPage']) assert.ok(blog[key], `${post.slug} BlogPosting.${key}`);
		assert.match(blog.datePublished, /^\d{4}-\d{2}-\d{2}(T[\d:.]+Z)?$/);
	}
	const talk = ld(read('posts/episode-1-what-is-bitcoin/index.html')).find((s) => s['@type'] === 'VideoObject');
	for (const key of ['name', 'description', 'uploadDate', 'thumbnailUrl', 'contentUrl']) assert.ok(talk?.[key], `VideoObject.${key}`);
});

test('imports keep external canonical and stay out of the sitemap', () => {
	const html = read('posts/episode-1-what-is-bitcoin/index.html');
	assert.match(html, /<link rel="canonical" href="https:\/\/emin\.substack\.com\/p\/episode-1-what-is-bitcoin">/);
	assert.ok(!read('sitemap.xml').includes('/posts/episode-1-what-is-bitcoin<'));
	assert.match(read('posts/episode-1-what-is-bitcoin/index.md'), /Published 2021-07-15/);
});

test('feeds are well-formed', () => {
	for (const file of ['rss.xml', 'atom.xml', 'sitemap.xml', 'de/rss.xml', 'de/atom.xml']) {
		execFileSync('xmllint', ['--noout', dist(file)]);
	}
	const feed = JSON.parse(read('feed.json'));
	assert.equal(feed.version, 'https://jsonfeed.org/version/1.1');
	assert.ok(feed.items.length > 0 && feed.items.every((i) => i.id && i.url && i.content_text && i.date_published));
	const de = JSON.parse(read('de/feed.json'));
	assert.ok(de.items.every((i) => i.language === 'de'));
});

test('llms.txt: H1, product definition first, Markdown links only, every indexable post', () => {
	const body = read('llms.txt');
	assert.match(body, /^# /);
	assert.match(body.split('\n').find((l) => l.startsWith('> ')), /publishes/);
	assert.ok(!/^\s*-\s+https?:\/\//m.test(body), 'bare URL entry');
	for (const post of graph.posts.filter((p) => !p.noindex)) assert.ok(body.includes(`https://emin.de${post.path})`), post.path);
	const full = read('llms-full.txt');
	for (const post of graph.posts.filter((p) => !p.noindex)) assert.ok(full.includes(`# ${post.title}`));
});

test('listing routes: category, format, author, archive, talks, changelog each have HTML + Markdown', () => {
	for (const p of ['posts', 'category/bitcoin', 'format/explainer', 'author/emin', 'author/ai-desk', 'archive', 'archive/2021', 'talks', 'changelog', 'de', 'de/posts']) {
		assert.ok(existsSync(dist(`${p}/index.html`)), `${p}/index.html`);
		assert.ok(existsSync(dist(`${p}/index.md`)), `${p}/index.md`);
	}
	assert.match(read('talks/index.html'), /Crypto Explained #1/);
	assert.match(read('changelog/index.html'), /2026-09-11/);
});

test('every advertised discovery link is a built file', () => {
	for (const { href } of DISCOVERY_LINKS) assert.ok(existsSync(dist(href.slice(1))), href);
});

test('analytics off by default: no third-party script in any page', () => {
	assert.equal(config.analytics.posthog.enabled, false);
	assert.equal(config.analytics.ga4.enabled, false);
	const html = readdirSync('dist', { recursive: true }).filter((f) => String(f).endsWith('.html'));
	for (const file of html) {
		const body = read(String(file));
		assert.ok(!/posthog|googletagmanager/.test(body), `${file} contains an analytics tag`);
	}
});

test('images in post HTML carry width and height (no layout shift)', () => {
	const html = read('posts/episode-1-what-is-bitcoin/index.html');
	assert.match(html, /<img[^>]+width="1200"[^>]+height="694"/);
});

test('import policy: mixed/unknown are noindex, ai_generated is labelled, guests credited', () => {
	for (const post of graph.posts) {
		if (['mixed', 'unknown'].includes(post.provenance)) assert.ok(post.noindex, `${post.file} must be noindex`);
		if (post.provenance === 'ai_generated') assert.equal(post.author, 'ai-desk', post.file);
	}
	const ai = graph.posts.find((p) => p.provenance === 'ai_generated' && !p.reviewedByHuman && !p.noindex);
	if (ai) assert.match(read(`${ai.path.slice(1)}/index.html`), /AI-written, human-supervised: not yet reviewed/);
	const guest = graph.posts.find((p) => p.author === 'guest');
	if (guest) {
		const html = read(`${guest.path.slice(1)}/index.html`);
		assert.ok(html.includes(guest.originalAuthor), 'guest byline names the original author');
		assert.ok(!existsSync(dist('author/guest')), 'no profile page for guests');
	}
	const sitemap = read('sitemap.xml');
	for (const post of graph.posts.filter((p) => p.noindex)) assert.ok(!sitemap.includes(`${post.path}<`), `${post.path} in sitemap`);
});

test('IndexNow key file exists and matches its name', () => {
	const key = readdirSync('public').find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
	assert.ok(key);
	assert.equal(readFileSync(`public/${key}`, 'utf-8').trim(), key.slice(0, -4));
});
