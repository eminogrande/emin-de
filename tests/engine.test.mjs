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
import * as policy from '../scripts/lib/front-matter-policy.mjs';

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

test('honest bylines: AI desk is machine-labelled, never a Person, and loader enforces it', () => {
	const html = read('posts/sample-post-for-tests/index.html');
	// Provenance lives in metadata only: no visible callout, badge or review note.
	const visible = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<head>[\s\S]*?<\/head>/, '');
	assert.ok(!/AI-written, human-supervised|not yet reviewed|class="badge|class="ai-label/.test(visible), 'no visible AI callout');
	const blog = ld(html).find((s) => s['@type'] === 'BlogPosting');
	assert.equal(blog.author['@type'], 'Organization');
	assert.equal(blog.creativeWorkStatus, 'AI-written, human-supervised: not yet reviewed');
	const desk = read('author/ai-desk/index.html');
	assert.ok(!/Not a person, no invented biography/.test(desk), 'no callout on the AI desk page');
	// No photo or portrait OF the desk (post covers in the list are fine).
	assert.ok(!/class="portrait"|class="monogram"|alt="Portrait/.test(desk));
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

test('emin.de is the original: self canonical, original_url as sameAs/isBasedOn, in the sitemap', () => {
	const html = read('posts/episode-1-what-is-bitcoin/index.html');
	assert.match(html, /<link rel="canonical" href="https:\/\/emin\.de\/posts\/episode-1-what-is-bitcoin">/);
	const blog = ld(html).find((s) => s['@type'] === 'BlogPosting');
	assert.deepEqual(blog.sameAs, ['https://emin.substack.com/p/episode-1-what-is-bitcoin']);
	assert.equal(blog.isBasedOn, 'https://emin.substack.com/p/episode-1-what-is-bitcoin');
	assert.equal(blog.datePublished, '2021-07-15');
	assert.match(html, /First published on <a href="https:\/\/emin\.substack\.com\/p\/episode-1-what-is-bitcoin"[^>]*>Substack<\/a>, 15 July 2021\./);
	assert.ok(read('sitemap.xml').includes('<loc>https://emin.de/posts/episode-1-what-is-bitcoin</loc><lastmod>'));
	assert.match(read('posts/episode-1-what-is-bitcoin/index.md'), /First published: https:\/\/emin\.substack\.com\/p\/episode-1-what-is-bitcoin \(2021-07-15\)/);
	// No content file may canonicalise away from this origin.
	const { problems } = loadContent({ dirs: ['content'] });
	assert.deepEqual(problems, []);
	for (const post of loadContent({ dirs: ['content'] }).posts) assert.ok(post.canonical.startsWith(config.origin), post.file);
});

test('post schema: Person author with sameAs, speakable, BreadcrumbList, publishing principles', () => {
	const html = read('posts/what-agent-ready-actually-means/index.html');
	const all = ld(html);
	const blog = all.find((s) => s['@type'] === 'BlogPosting');
	assert.equal(blog.author['@type'], 'Person');
	for (const url of config.authors.emin.sameAs) assert.ok(blog.author.sameAs.includes(url), url);
	assert.equal(blog.speakable['@type'], 'SpeakableSpecification');
	assert.ok(blog.publishingPrinciples.endsWith('/principles'));
	assert.ok(all.some((s) => s['@type'] === 'BreadcrumbList'));
	const person = ld(read('index.html')).find((s) => s['@type'] === 'Person');
	assert.equal(person.jobTitle, 'Journalist, publisher');
	assert.ok(person.knowsAbout.includes('journalism and publishing'));
});

test('FREE SPEECH: no content post is hidden; only draft: true by the author hides one', () => {
	const { posts } = loadContent({ dirs: ['content'] });
	const hidden = posts.filter((p) => p.noindex);
	assert.deepEqual(hidden.map((p) => `${p.file}: ${p.noindexReason}`), [], 'content posts must never be noindex (topic, words, provenance or review status are not reasons)');
	const sitemap = read('sitemap.xml');
	const llms = read('llms.txt');
	for (const post of graph.posts.filter((p) => !p.file.startsWith('tests/'))) {
		assert.ok(sitemap.includes(`<loc>https://emin.de${post.path}</loc>`), `${post.path} missing from sitemap`);
		assert.ok(llms.includes(`https://emin.de${post.path})`), `${post.path} missing from llms.txt`);
		assert.ok(!/<meta name="robots" content="noindex/.test(read(`${post.path.slice(1)}/index.html`)), `${post.path} is noindex`);
	}
	// The loader has no content gate: a provocative or sensitive post with
	// mixed/unknown provenance and an unreviewed status stays indexable.
	const dir = mkdtempSync(path.join(os.tmpdir(), 'engine-'));
	mkdirSync(path.join(dir, 'c/posts/en/2026'), { recursive: true });
	const fm = (prov, extra = '') => `---\ntitle: "Uncomfortable opinion"\ndescription: "A post about politics, drugs, religion and war with words some people dislike."\ndate: 2026-01-01\nlang: en\ncategory: notes\nformat: note\nauthor: emin\nprovenance: ${prov}\nai_assisted: unknown\nreviewed_by_human: false\nreview_status: draft-emin-voice\noriginal_url: "https://medium.com/@em/x"\n${extra}---\nBody with sensitive words.\n`;
	writeFileSync(path.join(dir, 'c/posts/en/2026/a.md'), fm('mixed'));
	writeFileSync(path.join(dir, 'c/posts/en/2026/b.md'), fm('unknown'));
	writeFileSync(path.join(dir, 'c/posts/en/2026/c.md'), fm('human', 'draft: true\n'));
	const out = loadContent({ dirs: ['c'], root: dir });
	assert.deepEqual(out.problems, []);
	assert.deepEqual(out.posts.map((p) => [p.slug, p.noindex]).sort(), [['a', false], ['b', false]]);
	// The only lever is draft: true (c is absent above).
	assert.equal(config.indexing, undefined, 'no provenance-based indexing policy may exist');
});

test('import:staging never drops or hides a post and never changes a body', () => {
	const dir = mkdtempSync(path.join(os.tmpdir(), 'stage-'));
	const site = mkdtempSync(path.join(os.tmpdir(), 'site-'));
	mkdirSync(path.join(dir, 'posts/en/2026'), { recursive: true });
	mkdirSync(path.join(dir, 'quarantine'), { recursive: true });
	const body = 'Sex, drugs, war, religion: words a filter might flag.\n';
	const fm = (extra) => `---\ntitle: "T"\ndescription: "D long enough to be a real description here."\ndate: "2026-01-02T00:00:00Z"\nlang: "en"\ncategory: "notes"\nformat: "note"\nauthor: "emin"\nprovenance: "mixed"\nai_assisted: true\nreviewed_by_human: false\ncanonical: "https://emino.app/posts/x/"\n${extra}---\n${body}`;
	writeFileSync(path.join(dir, 'posts/en/2026/x.md'), fm('noindex: true\nreview_status: "draft-emin-voice"\n'));
	writeFileSync(path.join(dir, 'quarantine/y.md'), fm('quarantine: "sensitive"\n'));
	const script = path.resolve('scripts/import-staging.mjs');
	execFileSync('node', [script, dir, '--dry-run'], { cwd: path.resolve('.') });
	// Real run in a scratch site so the repo content is untouched.
	mkdirSync(path.join(site, 'content/posts'), { recursive: true });
	const { applyOriginPolicy, applyNoGate } = policy;
	for (const f of ['posts/en/2026/x.md', 'quarantine/y.md']) {
		const raw = readFileSync(path.join(dir, f), 'utf-8');
		const out = applyNoGate(applyOriginPolicy(raw).text);
		assert.ok(out.endsWith(body), 'body unchanged');
		assert.ok(!/^noindex:|^quarantine:|^canonical:/m.test(out), 'gates removed');
		assert.match(out, /^original_url: "https:\/\/emino\.app\/posts\/x\/"$/m);
	}
});

test('redirects: old emino.app slugs 301 to emin.de; doc lists every pair', () => {
	const table = JSON.parse(readFileSync('src/generated/redirects.json', 'utf-8'));
	for (const [from, to] of Object.entries(table)) {
		assert.ok(from.startsWith('/') && from !== '/posts' && from !== '/', from);
		assert.ok(existsSync(dist(`${to.slice(1)}/index.html`)), `${from} -> ${to} has no page`);
	}
	const doc = readFileSync('docs/REDIRECTS-emino-app.md', 'utf-8');
	const emino = loadContent({ dirs: ['content'] }).posts.filter((p) => p.originalUrl?.includes('emino.app/posts/') && new URL(p.originalUrl).pathname.split('/').filter(Boolean).length >= 2);
	for (const post of emino) assert.ok(doc.includes(post.originalUrl.replace(/\/?$/, '/')) || doc.includes(`https://emin.de${post.path}`), post.slug);
});

test('robots welcomes every named AI and search crawler', async () => {
	const { robotsBody } = await import('../src/lib/http-headers.mjs');
	const body = robotsBody('https://emin.de');
	for (const bot of ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'Google-Extended', 'Googlebot', 'Bingbot', 'PerplexityBot', 'ClaudeBot', 'Applebot-Extended', 'CCBot']) {
		assert.match(body, new RegExp(`User-agent: ${bot}\\nAllow: /`), bot);
	}
	assert.ok(!/Disallow: \//.test(body));
});

test('magazine design: serif self-hosted, no third-party fonts, covers sized, footer principle, verification slots', () => {
	const home = read('index.html');
	assert.ok(!/fonts\.googleapis|fonts\.gstatic|use\.typekit/.test(home));
	assert.match(home, /rel="preload" href="\/fonts\/newsreader-latin-wght-normal\.woff2"/);
	assert.ok(existsSync(dist('fonts/newsreader-latin-wght-normal.woff2')));
	assert.match(home, /Free speech\. Nothing here is censored\. AI help is labelled, the words are mine\./);
	for (const img of home.match(/<img [^>]+>/g) || []) assert.match(img, /width="\d+"[^>]*height="\d+"|height="\d+"[^>]*width="\d+"/, img);
	assert.ok(!/AI-written|not yet reviewed|class="badge/.test(home.replace(/<script[\s\S]*?<\/script>/g, '')), 'no visible provenance on the home page');
	assert.ok(!/&amp;x27;|&x27;/.test(home));
	assert.ok(!/>Untitled</.test(read('posts/index.html')));
	assert.ok(!home.includes('google-site-verification'), 'empty verification slot emits nothing');
	assert.equal(typeof config.verification.google, 'string');
	assert.equal(typeof config.verification.bing, 'string');
	for (const p of ['principles', 'de/principles', 'photos']) {
		assert.ok(existsSync(dist(`${p}/index.html`)), p);
		assert.ok(existsSync(dist(`${p}/index.md`)), `${p}/index.md`);
	}
	const css = (existsSync(dist('_astro')) ? readdirSync(dist('_astro')).filter((f) => f.endsWith('.css')).map((f) => read(`_astro/${f}`)).join('') : '') + [...home.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('');
	const small = [...css.matchAll(/font-size:\s*(\d+(?:\.\d+)?)px/g)].filter((m) => Number(m[1]) < 17);
	assert.deepEqual(small.map((m) => m[0]), [], 'no text below 17px');
	assert.match(css, /--paper:\s*#fdf6e3/i, 'Solarized Paper background');
	assert.ok(!/#fff(fff)?\b/i.test(css), 'no white');
});

test('display cleanup: titles fall back to H1, entities decoded once, no URLs in excerpts, no dangling punctuation', async () => {
	const { cleanTitle, cleanExcerpt, decodeEntities } = await import('../src/lib/text-clean.mjs');
	assert.equal(decodeEntities('it&x27;s &amp;amp; ok'), "it's &amp; ok");
	assert.equal(cleanTitle('Untitled', { fallback: 'Real title' }), 'Real title');
	assert.equal(cleanTitle('From Dogs to AI:'), 'From Dogs to AI');
	assert.equal(cleanTitle('Adam Collins - Omni A.M.'), 'Adam Collins - Omni A.M.');
	assert.equal(cleanTitle('Why?'), 'Why?');
	assert.ok(!/https?:/.test(cleanExcerpt('Watch it here: https://www.youtube.com/watch?v=abc', { body: 'Real words come from the body of the post here, plenty of them.' })));
	for (const post of graph.posts) {
		assert.ok(!/https?:\/\//.test(post.description), `${post.slug} excerpt has a URL`);
		assert.ok(!/&(#x?[0-9a-f]+|x27|amp|quot);/i.test(post.title + post.description), `${post.slug} has an entity`);
		assert.ok(!/^untitled$/i.test(post.title), post.slug);
		assert.ok(!/[:;,]$/.test(post.title), `${post.slug} title ends with punctuation`);
	}
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

test('import policy: provenance is metadata, never a gate; ai_generated is machine-labelled, guests credited', () => {
	for (const post of graph.posts.filter((p) => !p.file.startsWith('tests/'))) {
		assert.equal(post.noindex, false, `${post.file}: provenance ${post.provenance} must not hide a post`);
		if (post.provenance === 'ai_generated') assert.equal(post.author, 'ai-desk', post.file);
	}
	const ai = graph.posts.find((p) => p.provenance === 'ai_generated' && !p.reviewedByHuman && !p.noindex);
	if (ai) {
		const html = read(`${ai.path.slice(1)}/index.html`);
		const blog = ld(html).find((x) => x['@type'] === 'BlogPosting');
		assert.equal(blog.creativeWorkStatus, 'AI-written, human-supervised: not yet reviewed', 'label stays in schema');
		assert.ok(!/not yet reviewed/.test(html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<head>[\s\S]*?<\/head>/, '')), 'never visible');
	}
	const mixed = graph.posts.find((p) => p.provenance === 'mixed');
	if (mixed) assert.match(read(`${mixed.path.slice(1)}/index.md`), /Provenance: mixed\./);
	const guest = graph.posts.find((p) => p.author === 'guest');
	if (guest) {
		const html = read(`${guest.path.slice(1)}/index.html`);
		assert.ok(html.includes(guest.originalAuthor), 'guest byline names the original author');
		assert.ok(!existsSync(dist('author/guest')), 'no profile page for guests');
	}
	const sitemap = read('sitemap.xml');
	for (const post of graph.posts.filter((p) => p.noindex)) assert.ok(!sitemap.includes(`${post.path}<`), `${post.path} in sitemap`);
});

test('type scale: exactly two font sizes (--fs-text, --fs-head), no component sets its own', () => {
	const pages = ['index.html', 'posts/what-agent-ready-actually-means/index.html', 'about/index.html', 'principles/index.html'];
	let css = existsSync(dist('_astro')) ? readdirSync(dist('_astro')).filter((f) => f.endsWith('.css')).map((f) => read(`_astro/${f}`)).join('') : '';
	for (const page of pages) css += [...read(page).matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('');
	for (const page of pages) assert.ok(!/style="[^"]*font-size/i.test(read(page)), `${page}: inline font-size`);
	const sizes = [...css.matchAll(/font-size:\s*([^;}]+)/g)].map((m) => m[1].trim());
	assert.ok(sizes.length > 0, 'stylesheet found');
	const bad = sizes.filter((v) => !['var(--fs-text)', 'var(--fs-head)', 'inherit', '100%'].includes(v));
	assert.deepEqual([...new Set(bad)], [], 'only var(--fs-text), var(--fs-head) or inherit');
	const shorthand = [...css.matchAll(/(?:^|[;{\s])font:\s*([^;}]+)/g)].map((m) => m[1].trim()).filter((v) => v !== 'inherit');
	assert.deepEqual(shorthand, [], 'no font shorthand with its own size');
	assert.match(css, /--fs-text:\s*1\.0625rem/, 'text size is 17px');
	const fams = new Set([...css.matchAll(/font-family:\s*'([^']+)'/g)].map((m) => m[1]).filter((f) => !/Fallback/.test(f)));
	assert.ok(fams.size <= 2, `at most two families, got ${[...fams]}`);
});

test('IndexNow key file exists and matches its name', () => {
	const key = readdirSync('public').find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
	assert.ok(key);
	assert.equal(readFileSync(`public/${key}`, 'utf-8').trim(), key.slice(0, -4));
});
