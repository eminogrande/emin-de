#!/usr/bin/env node
// Daily growth measurement for emin.de. Deterministic, NEVER calls an LLM.
//
//   node growth/daily.mjs                 # measure, write data + report, append LEARNINGS
//   node growth/daily.mjs --date 2026-10-06 --no-learn --offline
//
// Sources (each optional; missing credentials = a 'not connected' line, never a fake number):
//   probe       public HTTP checks, no credentials (status, sitemap, llms.txt, robots AI rules, IndexNow log)
//   posthog     POSTHOG_PROJECT_ID + POSTHOG_PERSONAL_API_KEY (Query Read), POSTHOG_HOST default https://eu.posthog.com
//   gsc         service account JSON at ~/.hermes/secrets/gsc.json (or GSC_KEY_FILE), property GSC_PROPERTY (default sc-domain:emin.de)
//   bing        BING_WEBMASTER_API_KEY
//   cloudflare  CLOUDFLARE_API_TOKEN (Analytics Read) + CF_ACCOUNT_ID + CF_WEB_ANALYTICS_SITE_TAG
// Output: growth/data/daily/YYYY-MM-DD.json and growth/reports/YYYY-MM-DD.md
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
	AI_REFERRERS, SEARCH_REFERRERS, GROWTH_DIR, SITE, UA, GSC_PROPERTY, GSC_KEY_PATH,
	addDays, appendLearnings, arg, gscCredentials, gscQuery, gscQueryUrl, gscToken, mdTable, notConnected, today, writeFile,
} from './lib.mjs';

// ---------- pure parsers (unit-tested) ----------

export function countSitemapUrls(xml) {
	return (String(xml).match(/<loc>/gi) || []).length;
}

// llms.txt post count = Markdown links whose path contains /posts/ (engine convention).
export function countLlmsPosts(text) {
	const links = String(text).match(/\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)/g) || [];
	return links.filter((l) => /\/posts\//.test(l)).length;
}

export const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Googlebot', 'Bingbot'];

// Minimal robots.txt evaluation for path "/" per user agent (RFC 9309 group matching:
// the most specific matching group wins, else "*"; longest rule match wins, Allow wins ties).
export function robotsVerdicts(text, bots = AI_BOTS, path = '/') {
	const groups = [];
	let cur = null;
	let lastWasAgent = false;
	for (const raw of String(text).split(/\r?\n/)) {
		const line = raw.replace(/#.*/, '').trim();
		const m = /^([A-Za-z-]+)\s*:\s*(.*)$/.exec(line);
		if (!m) continue;
		const key = m[1].toLowerCase();
		const val = m[2].trim();
		if (key === 'user-agent') {
			if (!lastWasAgent) groups.push((cur = { agents: [], rules: [] }));
			cur.agents.push(val.toLowerCase());
			lastWasAgent = true;
		} else {
			lastWasAgent = false;
			if (cur && (key === 'allow' || key === 'disallow')) cur.rules.push({ allow: key === 'allow', path: val });
		}
	}
	const out = {};
	for (const bot of bots) {
		const b = bot.toLowerCase();
		const own = groups.filter((g) => g.agents.includes(b));
		const pick = own.length ? own : groups.filter((g) => g.agents.includes('*'));
		const rules = pick.flatMap((g) => g.rules).filter((r) => r.path !== '' && path.startsWith(r.path.replace(/\*.*$/, '')));
		if (!pick.length) { out[bot] = 'allowed (no group)'; continue; }
		rules.sort((x, y) => y.path.length - x.path.length || Number(y.allow) - Number(x.allow));
		out[bot] = !rules.length || rules[0].allow ? 'allowed' : 'blocked';
	}
	return out;
}

export function classifyReferrer(domain) {
	const d = String(domain || '').toLowerCase();
	if (!d || d === '$direct') return 'direct';
	if (AI_REFERRERS.some((a) => d === a || d.endsWith(`.${a}`))) return 'ai';
	if (SEARCH_REFERRERS.includes(d) || /(^|\.)google\.[a-z.]+$/.test(d)) return 'search';
	return 'other';
}

export function posthogQueries(host, day) {
	const w = `timestamp >= toDateTime('${day} 00:00:00') AND timestamp < toDateTime('${addDays(day, 1)} 00:00:00') AND properties.$host = '${host}'`;
	return {
		totals: `SELECT count() AS pageviews, count(DISTINCT distinct_id) AS visitors FROM events WHERE event = '$pageview' AND ${w}`,
		referrers: `SELECT properties.$referring_domain AS referrer, count() AS views FROM events WHERE event = '$pageview' AND ${w} GROUP BY referrer ORDER BY views DESC LIMIT 50`,
		topPages: `SELECT properties.$pathname AS path, count() AS views FROM events WHERE event = '$pageview' AND ${w} GROUP BY path ORDER BY views DESC LIMIT 10`,
		productClicks: `SELECT count() AS clicks FROM events WHERE event = 'product_click' AND ${w}`,
	};
}

// ---------- sources ----------

async function get(url, { redirect = 'follow', timeout = 15000 } = {}) {
	const r = await fetch(url, { redirect, headers: { 'user-agent': UA }, signal: AbortSignal.timeout(timeout) });
	return { status: r.status, url: r.url, location: r.headers.get('location') || '', text: redirect === 'manual' ? '' : await r.text() };
}

export async function probe(site = SITE) {
	const host = new URL(site).host;
	const res = { source: 'probe', status: 'ok', metrics: {}, facts: {}, queries: [] };
	const q = (metric, query) => res.queries.push({ metric, query });
	try {
		const home = await get(`${site}/`, { redirect: 'manual' });
		res.metrics.home_http_status = home.status;
		res.facts.home_redirect_location = home.location || null;
		q('home_http_status', `GET ${site}/ (redirect: manual)`);
		const followed = await get(`${site}/`);
		res.metrics.home_serves_own_host = new URL(followed.url).host === host ? 1 : 0;
		res.facts.home_final_url = followed.url;
		q('home_serves_own_host', `GET ${site}/ (follow redirects), final host == ${host}`);

		const sm = await get(`${site}/sitemap.xml`);
		const own = new URL(sm.url).host === host;
		res.metrics.sitemap_url_count = own && sm.status === 200 ? countSitemapUrls(sm.text) : 0;
		res.facts.sitemap_final_url = sm.url;
		q('sitemap_url_count', `GET ${site}/sitemap.xml, count <loc> (0 if served by another host or non-200)`);

		const llms = await get(`${site}/llms.txt`);
		const llmsOwn = new URL(llms.url).host === host && llms.status === 200 && !/<html/i.test(llms.text.slice(0, 500));
		res.metrics.llms_txt_post_count = llmsOwn ? countLlmsPosts(llms.text) : 0;
		q('llms_txt_post_count', `GET ${site}/llms.txt, count Markdown links containing /posts/ (0 if not a text file on ${host})`);

		const robots = await get(`${site}/robots.txt`);
		const robotsOwn = new URL(robots.url).host === host && robots.status === 200 && !/<html/i.test(robots.text.slice(0, 500));
		res.facts.robots = robotsOwn ? robotsVerdicts(robots.text) : 'no robots.txt on own host';
		res.metrics.robots_ai_bots_blocked = robotsOwn ? Object.values(res.facts.robots).filter((v) => v === 'blocked').length : 0;
		res.metrics.robots_txt_present = robotsOwn ? 1 : 0;
		q('robots_txt_present', `GET ${site}/robots.txt, 200 + text on ${host}`);
		q('robots_ai_bots_blocked', `robots.txt groups for ${AI_BOTS.join(', ')}, path / (RFC 9309)`);
	} catch (e) {
		res.status = 'error';
		res.error = String(e.message || e);
	}
	// IndexNow: the engine's plugins/indexnow.mjs is expected to append one JSON line per ping.
	const log = join(GROWTH_DIR, 'data/indexnow-pings.jsonl');
	if (existsSync(log)) {
		const lines = readFileSync(log, 'utf-8').trim().split('\n').filter(Boolean);
		const last = JSON.parse(lines.at(-1));
		res.metrics.indexnow_pings_total = lines.length;
		res.metrics.indexnow_last_ping_http = last.http ?? null;
		res.facts.indexnow_last_ping_at = last.at ?? null;
	} else {
		res.metrics.indexnow_pings_total = 0;
		res.facts.indexnow_last_ping_at = null;
	}
	q('indexnow_pings_total', 'count lines in growth/data/indexnow-pings.jsonl');
	// site: index count is NOT scraped: Google and Bing ToS forbid automated result queries.
	res.facts.site_index_count = 'skipped: automated queries to Google are machine-generated traffic under Google spam policies (developers.google.com/search/docs/essentials/spam-policies); use GSC Page indexing once connected';
	return res;
}

export async function posthog(day, env = process.env) {
	const project = env.POSTHOG_PROJECT_ID;
	const key = env.POSTHOG_PERSONAL_API_KEY;
	if (!project || !key) return notConnected('posthog', 'POSTHOG_PROJECT_ID + POSTHOG_PERSONAL_API_KEY (Query Read scope), EU host');
	const host = (env.POSTHOG_HOST || 'https://eu.posthog.com').replace(/\/$/, '');
	const qs = posthogQueries(new URL(SITE).host, day);
	const run = async (query) => {
		const r = await fetch(`${host}/api/projects/${project}/query/`, { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` }, body: JSON.stringify({ query: { kind: 'HogQLQuery', query } }) });
		if (!r.ok) throw new Error(`PostHog ${r.status}: ${(await r.text()).slice(0, 200)}`);
		return (await r.json()).results || [];
	};
	try {
		const [totals, refs, pages, clicks] = await Promise.all([run(qs.totals), run(qs.referrers), run(qs.topPages), run(qs.productClicks)]);
		const cls = { direct: 0, search: 0, ai: 0, other: 0 };
		const ai = {};
		for (const [d, v] of refs) {
			const c = classifyReferrer(d);
			cls[c] += v;
			if (c === 'ai') ai[d] = (ai[d] || 0) + v;
		}
		return {
			source: 'posthog', status: 'ok',
			metrics: { pageviews: totals[0]?.[0] ?? 0, visitors: totals[0]?.[1] ?? 0, views_direct: cls.direct, views_search: cls.search, views_ai: cls.ai, views_other_referrer: cls.other, product_clicks: clicks[0]?.[0] ?? 0 },
			top: { pages: pages.map(([p, v]) => ({ path: p, views: v })), ai_referrers: Object.entries(ai).map(([d, v]) => ({ domain: d, views: v })) },
			queries: [
				{ metric: 'pageviews, visitors', query: qs.totals },
				{ metric: 'views_direct/search/ai/other_referrer', query: `${qs.referrers}  -- classified by growth/daily.mjs classifyReferrer()` },
				{ metric: 'top pages', query: qs.topPages },
				{ metric: 'product_clicks', query: qs.productClicks },
			],
		};
	} catch (e) {
		return { source: 'posthog', status: 'error', error: String(e.message || e), metrics: {}, queries: [] };
	}
}

export async function gsc(day, keyPath = GSC_KEY_PATH) {
	let sa;
	try { sa = gscCredentials(keyPath); } catch (e) { return { source: 'gsc', status: 'error', error: String(e.message), metrics: {}, queries: [] }; }
	if (!sa) return notConnected('gsc', `service-account JSON at ${keyPath.replace(process.env.HOME || '~', '~')}, added as user on ${GSC_PROPERTY}`);
	// GSC data lags ~2-3 days; measure the 28 days ending 3 days ago.
	const end = addDays(day, -3);
	const start = addDays(end, -27);
	const url = gscQueryUrl();
	try {
		const token = await gscToken(sa);
		const totalsBody = { startDate: start, endDate: end, dimensions: [] };
		const qBody = { startDate: start, endDate: end, dimensions: ['query'], rowLimit: 250 };
		const pBody = { startDate: start, endDate: end, dimensions: ['page'], rowLimit: 50 };
		const [tot, qs, ps] = await Promise.all([gscQuery(token, totalsBody), gscQuery(token, qBody), gscQuery(token, pBody)]);
		const t = tot[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
		const round = (n, d = 2) => Math.round(n * 10 ** d) / 10 ** d;
		return {
			source: 'gsc', status: 'ok', window: { start, end },
			metrics: { clicks_28d: t.clicks, impressions_28d: t.impressions, ctr_28d_pct: round(t.ctr * 100), avg_position_28d: round(t.position, 1), queries_with_impressions_28d: qs.length },
			top: {
				queries: qs.slice(0, 25).map((r) => ({ query: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr_pct: round(r.ctr * 100), position: round(r.position, 1) })),
				pages: ps.slice(0, 10).map((r) => ({ page: r.keys[0], clicks: r.clicks, impressions: r.impressions, position: round(r.position, 1) })),
			},
			queries: [
				{ metric: 'clicks_28d, impressions_28d, ctr_28d_pct, avg_position_28d', query: `POST ${url} ${JSON.stringify(totalsBody)}` },
				{ metric: 'queries_with_impressions_28d, top queries', query: `POST ${url} ${JSON.stringify(qBody)}` },
				{ metric: 'top pages', query: `POST ${url} ${JSON.stringify(pBody)}` },
			],
		};
	} catch (e) {
		return { source: 'gsc', status: 'error', error: String(e.message || e), metrics: {}, queries: [] };
	}
}

export async function bing(env = process.env) {
	const key = env.BING_WEBMASTER_API_KEY;
	if (!key) return notConnected('bing', 'BING_WEBMASTER_API_KEY (Bing Webmaster Tools > Settings > API Access), site verified there');
	const url = `https://ssl.bing.com/webmaster/api.svc/json/GetRankAndTrafficStats?siteUrl=${encodeURIComponent(`${SITE}/`)}&apikey=`;
	try {
		const r = await fetch(url + encodeURIComponent(key));
		if (!r.ok) throw new Error(`Bing ${r.status}`);
		const rows = (await r.json()).d || [];
		const last = rows.at(-1) || {};
		return { source: 'bing', status: 'ok', metrics: { clicks_last_day: last.Clicks ?? 0, impressions_last_day: last.Impressions ?? 0 }, queries: [{ metric: 'clicks_last_day, impressions_last_day', query: `GET ${url}<key>  (last row)` }] };
	} catch (e) {
		return { source: 'bing', status: 'error', error: String(e.message || e), metrics: {}, queries: [] };
	}
}

export function cloudflareQuery(account, siteTag, day) {
	return `{ viewer { accounts(filter: { accountTag: "${account}" }) { rumPageloadEventsAdaptiveGroups(limit: 1, filter: { date_geq: "${day}", date_leq: "${day}", siteTag: "${siteTag}" }) { count sum { visits } } } } }`;
}

export async function cloudflare(day, env = process.env) {
	const token = env.CLOUDFLARE_API_TOKEN;
	const account = env.CF_ACCOUNT_ID;
	const siteTag = env.CF_WEB_ANALYTICS_SITE_TAG;
	if (!token || !account || !siteTag) return notConnected('cloudflare', 'CLOUDFLARE_API_TOKEN (Account Analytics Read) + CF_ACCOUNT_ID + CF_WEB_ANALYTICS_SITE_TAG');
	const query = cloudflareQuery(account, siteTag, day);
	try {
		const r = await fetch('https://api.cloudflare.com/client/v4/graphql', { method: 'POST', headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' }, body: JSON.stringify({ query }) });
		const j = await r.json();
		if (!r.ok || j.errors?.length) throw new Error(`Cloudflare ${r.status}: ${JSON.stringify(j.errors || '').slice(0, 200)}`);
		const g = j.data.viewer.accounts[0]?.rumPageloadEventsAdaptiveGroups[0] || { count: 0, sum: { visits: 0 } };
		return { source: 'cloudflare', status: 'ok', metrics: { pageloads: g.count, visits: g.sum.visits }, queries: [{ metric: 'pageloads, visits', query: `POST https://api.cloudflare.com/client/v4/graphql ${query}` }] };
	} catch (e) {
		return { source: 'cloudflare', status: 'error', error: String(e.message || e), metrics: {}, queries: [] };
	}
}

// ---------- report ----------

export function renderReport(data) {
	const lines = [`# emin.de daily growth report ${data.date}`, '', `Generated ${data.generatedAt} by growth/daily.mjs (deterministic, no LLM). Site: ${data.site}`, ''];
	lines.push('## Sources', '', mdTable(['Source', 'Status', 'Note'], data.sources.map((s) => [s.source, s.status, s.status === 'not_connected' ? `needs ${s.needs}` : s.error || (s.window ? `${s.window.start}..${s.window.end}` : '')])), '');
	lines.push('## Numbers', '');
	const rows = [];
	for (const s of data.sources) for (const [k, v] of Object.entries(s.metrics || {})) rows.push([s.source, k, v]);
	lines.push(mdTable(['Source', 'Metric', 'Value'], rows), '');
	const probeSrc = data.sources.find((s) => s.source === 'probe');
	if (probeSrc?.facts) {
		lines.push('## Probe facts', '');
		const f = probeSrc.facts;
		lines.push(`- home redirect: ${f.home_redirect_location || 'none'}`, `- home final URL: ${f.home_final_url || '-'}`, `- sitemap final URL: ${f.sitemap_final_url || '-'}`, `- IndexNow last ping: ${f.indexnow_last_ping_at || 'none recorded'}`, `- site: index count: ${f.site_index_count}`);
		if (typeof f.robots === 'object') lines.push('', mdTable(['Bot', 'robots.txt verdict for /'], Object.entries(f.robots)));
		else lines.push(`- robots: ${f.robots}`);
		lines.push('');
	}
	for (const s of data.sources) {
		if (!s.top) continue;
		for (const [name, list] of Object.entries(s.top)) {
			if (!list.length) continue;
			lines.push(`### ${s.source} top ${name}`, '', mdTable(Object.keys(list[0]), list.map((o) => Object.values(o))), '');
		}
	}
	lines.push('## Source query per number', '');
	for (const s of data.sources) for (const q of s.queries || []) lines.push(`- \`${s.source}.${q.metric}\`: \`${q.query}\``);
	lines.push('');
	return lines.join('\n');
}

// Deterministic observations: compare with the previous daily file. 1-3 lines.
export function observations(cur, prev) {
	const m = (d, src, k) => d?.sources?.find((s) => s.source === src)?.metrics?.[k];
	const rel = `reports/${cur.date}.md`; // relative to growth/LEARNINGS.md
	const link = `growth/${rel}`;
	const out = [];
	const p = cur.sources.find((s) => s.source === 'probe');
	if (!prev) {
		if (p?.metrics.home_serves_own_host === 0) out.push(`${cur.date}: baseline. ${cur.site} answers HTTP ${p.metrics.home_http_status} to ${p.facts.home_redirect_location}; sitemap ${p.metrics.sitemap_url_count} URLs, llms.txt ${p.metrics.llms_txt_post_count} posts. Nothing can rank until the site serves its own host. Source: [${link}](${rel})`);
		else if (p) out.push(`${cur.date}: baseline. sitemap ${p.metrics.sitemap_url_count} URLs, llms.txt ${p.metrics.llms_txt_post_count} posts. Source: [${link}](${rel})`);
		const nc = cur.sources.filter((s) => s.status === 'not_connected').map((s) => s.source);
		if (nc.length) out.push(`${cur.date}: not connected: ${nc.join(', ')}. No traffic numbers exist yet; every traffic claim waits for these. Source: [${link}](${rel})`);
		return out.slice(0, 3);
	}
	const watch = [['probe', 'home_http_status'], ['probe', 'sitemap_url_count'], ['probe', 'llms_txt_post_count'], ['posthog', 'pageviews'], ['posthog', 'views_ai'], ['gsc', 'impressions_28d'], ['gsc', 'clicks_28d']];
	for (const [src, k] of watch) {
		const a = m(prev, src, k);
		const b = m(cur, src, k);
		if (a !== undefined && b !== undefined && a !== b) out.push(`${cur.date}: ${src}.${k} ${a} -> ${b} (vs ${prev.date}). Source: [${link}](${rel})`);
		if (out.length === 3) break;
	}
	if (!out.length) out.push(`${cur.date}: no change in watched numbers vs ${prev.date}. Source: [${link}](${rel})`);
	return out;
}

export async function main() {
	const date = arg('date', today());
	const offline = arg('offline', false);
	const site = SITE;
	const sources = offline
		? [{ source: 'probe', status: 'skipped', metrics: {}, queries: [] }]
		: [await probe(site)];
	sources.push(await posthog(addDays(date, -1)), await gsc(date), await bing(), await cloudflare(addDays(date, -1)));
	const data = { date, site, generatedAt: new Date().toISOString(), sources };
	const dailyDir = join(GROWTH_DIR, 'data/daily');
	const prevFile = existsSync(dailyDir) ? readdirSync(dailyDir).filter((f) => f.endsWith('.json') && f < `${date}.json`).sort().at(-1) : null;
	const prev = prevFile ? JSON.parse(readFileSync(join(dailyDir, prevFile), 'utf-8')) : null;
	writeFile(join(dailyDir, `${date}.json`), `${JSON.stringify(data, null, 2)}\n`);
	writeFile(join(GROWTH_DIR, `reports/${date}.md`), renderReport(data));
	const learned = arg('no-learn', false) ? 0 : appendLearnings(observations(data, prev));
	console.log(`daily: wrote growth/data/daily/${date}.json and growth/reports/${date}.md; ${learned} learning line(s)`);
	for (const s of sources) console.log(`  ${s.source}: ${s.status}${s.status === 'not_connected' ? ` (needs ${s.needs})` : ''}`);
}

const isMain = process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url));
if (isMain) main().catch((e) => { console.error(e); process.exit(1); });
