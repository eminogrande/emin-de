// node --test growth/tests/
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateKeyPairSync, createVerify } from 'node:crypto';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { countSitemapUrls, countLlmsPosts, robotsVerdicts, classifyReferrer, posthogQueries, posthog, gsc, bing, cloudflare, renderReport, observations } from '../daily.mjs';
import { parseSuggest, stem, clusterKey, relevant, buildClusters, matchPost, rankGaps, diversify, intentOf, suggestTitle } from '../keywords.mjs';
import { parsePromptsYaml, engineState, scoreAnswer } from '../ai-visibility.mjs';
import { isoWeek, parseFrontmatter, gscJwt, mdTable } from '../lib.mjs';

test('sitemap and llms.txt counters', () => {
	assert.equal(countSitemapUrls('<urlset><url><loc>a</loc></url><url><loc>b</loc></url></urlset>'), 2);
	assert.equal(countSitemapUrls('<html>carrd</html>'), 0);
	assert.equal(countLlmsPosts('# x\n- [A](https://emin.de/posts/a)\n- [B](/de/posts/b)\n- [About](https://emin.de/about)'), 2);
});

test('robots verdicts: specific group wins, longest rule wins', () => {
	const txt = 'User-agent: *\nAllow: /\n\nUser-agent: GPTBot\nDisallow: /\n\nUser-agent: ClaudeBot\nUser-agent: PerplexityBot\nDisallow: /private\n';
	const v = robotsVerdicts(txt, ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Googlebot']);
	assert.deepEqual(v, { GPTBot: 'blocked', ClaudeBot: 'allowed', PerplexityBot: 'allowed', Googlebot: 'allowed' });
	assert.equal(robotsVerdicts('', ['GPTBot']).GPTBot, 'allowed (no group)');
});

test('referrer classes incl. AI', () => {
	assert.equal(classifyReferrer('chatgpt.com'), 'ai');
	assert.equal(classifyReferrer('www.perplexity.ai'), 'ai');
	assert.equal(classifyReferrer('gemini.google.com'), 'ai');
	assert.equal(classifyReferrer('www.google.de'), 'search');
	assert.equal(classifyReferrer('$direct'), 'direct');
	assert.equal(classifyReferrer('news.ycombinator.com'), 'other');
});

test('posthog queries are fixed and day-bounded', () => {
	const q = posthogQueries('emin.de', '2026-10-05');
	assert.match(q.totals, /2026-10-05 00:00:00.*2026-10-06 00:00:00/);
	assert.match(q.productClicks, /event = 'product_click'/);
});

test('not connected paths return no numbers', async () => {
	const ph = await posthog('2026-10-05', {});
	assert.equal(ph.status, 'not_connected');
	assert.deepEqual(ph.metrics, {});
	const g = await gsc('2026-10-06', '/nonexistent/gsc.json');
	assert.equal(g.status, 'not_connected');
	assert.equal((await bing({})).status, 'not_connected');
	assert.equal((await cloudflare('2026-10-05', {})).status, 'not_connected');
	const bad = join(mkdtempSync(join(tmpdir(), 'gsc-')), 'gsc.json');
	writeFileSync(bad, '{"type":"authorized_user"}');
	assert.equal((await gsc('2026-10-06', bad)).status, 'error');
});

test('gsc JWT is a valid RS256 signature', () => {
	const { privateKey, publicKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
	const jwt = gscJwt({ client_email: 'x@y.iam.gserviceaccount.com', private_key: privateKey.export({ type: 'pkcs8', format: 'pem' }) }, 1000);
	const [h, c, s] = jwt.split('.');
	const claim = JSON.parse(Buffer.from(c, 'base64url'));
	assert.equal(claim.scope, 'https://www.googleapis.com/auth/webmasters.readonly');
	assert.equal(claim.exp, 4600);
	const v = createVerify('RSA-SHA256');
	v.update(`${h}.${c}`);
	assert.ok(v.verify(publicKey, Buffer.from(s, 'base64url')));
});

test('report lists a source query under every number', () => {
	const data = { date: '2026-10-06', site: 'https://emin.de', generatedAt: 'x', sources: [
		{ source: 'probe', status: 'ok', metrics: { home_http_status: 302 }, facts: { home_redirect_location: 'https://emin.carrd.co/', robots: 'no robots.txt on own host', site_index_count: 'skipped' }, queries: [{ metric: 'home_http_status', query: 'GET https://emin.de/' }] },
		{ source: 'gsc', status: 'not_connected', needs: 'key', metrics: {}, queries: [] },
	] };
	const md = renderReport(data);
	assert.match(md, /\| probe \| home_http_status \| 302 \|/);
	assert.match(md, /`probe.home_http_status`: `GET https:\/\/emin.de\/`/);
	assert.match(md, /\| gsc \| not_connected \| needs key \|/);
	const obs = observations({ ...data, sources: [{ ...data.sources[0], metrics: { home_http_status: 302, home_serves_own_host: 0, sitemap_url_count: 0, llms_txt_post_count: 0 } }, data.sources[1]] }, null);
	assert.ok(obs.length >= 1 && obs.length <= 3);
	assert.match(obs[0], /baseline/);
	assert.match(obs[0], /Source: \[growth\/reports\/2026-10-06.md\]/);
});

test('observations compare with previous day', () => {
	const mk = (date, v) => ({ date, site: 's', sources: [{ source: 'probe', metrics: { home_http_status: v } }] });
	assert.match(observations(mk('2026-10-07', 200), mk('2026-10-06', 302))[0], /home_http_status 302 -> 200/);
	assert.match(observations(mk('2026-10-07', 302), mk('2026-10-06', 302))[0], /no change/);
});

test('keyword parsers', () => {
	assert.deepEqual(parseSuggest('["x402",["x402","x402 protocol"],[],{}]'), ['x402', 'x402 protocol']);
	assert.deepEqual(parseSuggest('{}'), []);
	assert.equal(stem('wallets'), 'wallet');
	assert.equal(stem('Payments'), 'payment');
	assert.equal(clusterKey('x402', 'what is x402 protocol'), 'x402 + protocol');
	assert.equal(clusterKey('x402', 'x402 explained'), 'x402');
	assert.ok(relevant('nuri wallet', 'nuri wallet app'));
	assert.ok(!relevant('nuri wallet', 'daiqisi wallet price'));
	assert.equal(intentOf('x402 vs mpp', 'en'), 'compare');
	assert.equal(intentOf('beste bitcoin wallet', 'de'), 'best');
	assert.equal(intentOf('how to self custody bitcoin', 'en'), 'howto');
	assert.equal(suggestTitle({ head: 'was ist x402', lang: 'de' }), 'Was ist x402?');
});

test('clusters map to same-language posts or become gaps', () => {
	const raw = [
		{ seed: 'x402', lang: 'en', category: 'payments', suggestions: ['x402', 'x402 protocol', 'x402 vs mpp'], exclude: [] },
		{ seed: 'x402', lang: 'en', category: 'payments', suggestions: ['what is x402 protocol'], exclude: [] },
		{ seed: 'self custody', lang: 'en', category: 'bitcoin', suggestions: ['self custody movie', 'self custody'], exclude: ['movie'] },
	];
	const clusters = buildClusters(raw);
	const proto = clusters.find((c) => c.cluster === 'x402 + protocol');
	assert.equal(proto.hits, 2);
	assert.ok(!clusters.some((c) => /movie/.test(c.cluster)));
	const posts = [{ path: 'content/posts/de/2026/self-custody.md', lang: 'de', slug: 'self-custody', title: 'Self Custody' }, { path: 'content/posts/en/2026/x402.md', lang: 'en', slug: 'x402-explained', title: 'x402' }];
	assert.ok(matchPost(clusters.find((c) => c.cluster === 'x402'), posts));
	const gaps = rankGaps(clusters, posts);
	const sc = gaps.find((g) => g.cluster === 'self custody');
	assert.ok(sc, 'EN cluster with only a DE post is a gap');
	assert.equal(sc.translate, 'content/posts/de/2026/self-custody.md');
	assert.equal(gaps[0].cluster, 'x402 + protocol');
});

test('diversify caps one seed in the shortlist', () => {
	const g = [1, 2, 3, 4].map((i) => ({ lang: 'en', seed: 'a', i })).concat([{ lang: 'en', seed: 'b', i: 5 }]);
	assert.deepEqual(diversify(g, 3).map((x) => x.i), [1, 2, 3, 5, 4]);
});

test('prompts.yml parser and paid-engine gate', () => {
	const y = 'targets:\n  - emin.de\n  - nuri.com\nprompts:\n  - id: de-01\n    lang: de\n    prompt: beste Bitcoin Wallet mit Passkey\n  - id: en-01\n    lang: en\n    prompt: who is Emin Mahrt\n';
	const p = parsePromptsYaml(y);
	assert.deepEqual(p.targets, ['emin.de', 'nuri.com']);
	assert.equal(p.prompts.length, 2);
	assert.equal(p.prompts[0].prompt, 'beste Bitcoin Wallet mit Passkey');
	assert.equal(engineState('openai', { enabled: false }, { OPENAI_API_KEY: 'k' }).run, false);
	assert.match(engineState('openai', { enabled: true }, {}).reason, /not connected/);
	assert.equal(engineState('openai', { enabled: true }, { OPENAI_API_KEY: 'k' }).run, true);
});

test('real prompts.yml has 30 prompts, DE and EN, unique ids', async () => {
	const { readFileSync } = await import('node:fs');
	const p = parsePromptsYaml(readFileSync(new URL('../prompts.yml', import.meta.url), 'utf-8'));
	assert.equal(p.prompts.length, 30);
	assert.equal(new Set(p.prompts.map((x) => x.id)).size, 30);
	assert.equal(p.prompts.filter((x) => x.lang === 'de').length, 15);
	const cfg = JSON.parse(readFileSync(new URL('../ai-visibility.config.json', import.meta.url), 'utf-8'));
	for (const e of Object.values(cfg.engines)) assert.equal(e.enabled, false, 'paid engines default OFF');
});

test('citation scoring is a string match', () => {
	const v = scoreAnswer('See nuri.com for details', ['https://www.emin.de/posts/x', 'https://example.com'], ['emin.de', 'nuri.com', 'foo.com']);
	assert.deepEqual(v, { 'emin.de': 'cited', 'nuri.com': 'mentioned', 'foo.com': 'absent' });
});

test('helpers', () => {
	assert.equal(isoWeek('2026-10-06'), '2026-W41');
	assert.equal(isoWeek('2027-01-01'), '2026-W53');
	assert.deepEqual(parseFrontmatter('---\ntitle: "A: b"\nlang: de\n---\nbody'), { title: 'A: b', lang: 'de' });
	assert.match(mdTable(['a'], [['x|y']]), /x\\\|y/);
});
