#!/usr/bin/env node
// Live gate against a running origin (Node server.mjs or `wrangler dev`).
//   node scripts/verify-all.mjs [http://localhost:4321]
// Checks the agent-ready response behaviour a static host cannot provide.
// Exit 1 on any failure. Prints one PASS/FAIL line per check.
const base = (process.argv[2] || process.env.VERIFY_BASE || 'http://localhost:4321').replace(/\/$/, '');
let failures = 0;
const check = (label, ok, detail = '') => {
	console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail && !ok ? ` (${detail})` : ''}`);
	if (!ok) failures += 1;
};
const get = (path, headers = {}, init = {}) => fetch(`${base}${path}`, { headers, redirect: 'manual', ...init });

const home = await get('/');
check('home 200 text/html', home.status === 200 && home.headers.get('content-type').startsWith('text/html'));
check('Link header present on HTML', (home.headers.get('link') || '').includes('rel="sitemap"'));
check('Content-Signal header', Boolean(home.headers.get('content-signal')));
check('Vary: Accept on HTML', /accept/i.test(home.headers.get('vary') || ''));
check('Cache-Control on HTML', Boolean(home.headers.get('cache-control')));
const homeHtml = await home.text();
check('home has Organization + WebSite + Person schema', ['"Organization"', '"WebSite"', '"Person"'].every((s) => homeHtml.includes(s)));

const md = await get('/', { accept: 'text/markdown' });
check('Accept: text/markdown on / -> text/markdown', md.headers.get('content-type')?.startsWith('text/markdown'), md.headers.get('content-type'));
check('Vary: Accept on Markdown', /accept/i.test(md.headers.get('vary') || ''));

const llms = await get('/llms.txt');
const llmsBody = await llms.text();
check('llms.txt 200 with H1', llms.status === 200 && /^# /m.test(llmsBody));
check('llms.txt uses Markdown links only', /\]\(https?:\/\//.test(llmsBody) && !/^- https?:\/\//m.test(llmsBody));

const robots = await (await get('/robots.txt')).text();
for (const bot of ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended']) {
	check(`robots allows ${bot}`, new RegExp(`User-agent: ${bot}\\nAllow: /`).test(robots));
}
check('robots has Sitemap', /^Sitemap: /m.test(robots));

const sitemap = await (await get('/sitemap.xml')).text();
check('sitemap has <loc>', sitemap.includes('<loc>'));

const api = await get('/api/articles');
const apiBody = await api.json().catch(() => ({}));
check('/api/articles 200 JSON with articles', api.status === 200 && Array.isArray(apiBody.articles) && apiBody.articles.length > 0);
check('RateLimit headers on /api', Boolean(api.headers.get('ratelimit')) && Boolean(api.headers.get('ratelimit-policy')));
const first = apiBody.articles?.[0];
if (first) {
	const page = await get(new URL(first.url).pathname);
	const pageHtml = await page.text();
	check('post page 200 with BlogPosting schema', page.status === 200 && pageHtml.includes('"BlogPosting"'));
	const mirror = await get(new URL(first.markdownUrl).pathname);
	check('post Markdown mirror 200 text/markdown', mirror.status === 200 && mirror.headers.get('content-type').startsWith('text/markdown'));
	const neg = await get(new URL(first.url).pathname, { accept: 'text/markdown' });
	check('post negotiates Markdown', neg.headers.get('content-type')?.startsWith('text/markdown'));
}

const apiMissing = await get('/api/does-not-exist');
check('API 404 is application/problem+json', apiMissing.status === 404 && apiMissing.headers.get('content-type').startsWith('application/problem+json'));
const pageMissing = await get('/does-not-exist');
check('page 404 is Markdown', pageMissing.status === 404 && pageMissing.headers.get('content-type').startsWith('text/markdown'));

const corpus = await get('/api/v1/corpus');
check('x402 corpus answers 402 unpaid', corpus.status === 402 && Boolean(corpus.headers.get('payment-required')));

const init = await get('/mcp', { 'content-type': 'application/json', accept: 'application/json, text/event-stream' }, { method: 'POST', body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'verify', version: '1' } } }) });
const initBody = await init.json().catch(() => ({}));
check('MCP initialize handshake', init.status === 200 && Boolean(initBody.result?.serverInfo));
const tools = await get('/mcp', { 'content-type': 'application/json', accept: 'application/json, text/event-stream' }, { method: 'POST', body: JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'tools/list' }) });
const toolNames = ((await tools.json().catch(() => ({}))).result?.tools || []).map((t) => t.name);
const card = await (await get('/.well-known/mcp/server-card.json')).json().catch(() => ({}));
check('MCP server card matches live tools', JSON.stringify((card.tools || []).map((t) => t.name).sort()) === JSON.stringify([...toolNames].sort()) && toolNames.length > 0);

for (const path of ['/rss.xml', '/atom.xml', '/feed.json', '/openapi.json', '/auth.md', '/.well-known/api-catalog', '/llms-full.txt', '/og/default.png']) {
	const r = await get(path);
	check(`${path} 200`, r.status === 200, String(r.status));
}

console.log(failures ? `\n${failures} check(s) failed against ${base}` : `\nAll checks passed against ${base}`);
process.exit(failures ? 1 : 0);
