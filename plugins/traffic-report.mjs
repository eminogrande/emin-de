#!/usr/bin/env node
// Deterministic traffic report from PostHog HogQL. No LLM, no guessing: fixed
// queries, fixed table layout, same input = same output.
//
//   POSTHOG_HOST=https://eu.posthog.com POSTHOG_PROJECT_ID=12345 \
//   POSTHOG_PERSONAL_API_KEY=phx_... node plugins/traffic-report.mjs --days 7
//
// Options: --days N (default 7), --compare (adds the previous period),
//          --json (machine output), --webhook URL (POST {text} after printing).
// The personal API key needs only the "Query Read" scope. Never commit it.
// Exit codes: 0 ok, 2 missing configuration, 1 query failure.
import config from '../site.config.mjs';

const args = process.argv.slice(2);
const opt = (name, fallback) => {
	const i = args.indexOf(`--${name}`);
	return i === -1 ? fallback : args[i + 1];
};
const days = Math.max(1, Number(opt('days', 7)) || 7);
const asJson = args.includes('--json');
const webhook = opt('webhook', process.env.TRAFFIC_WEBHOOK_URL || '');
const host = (process.env.POSTHOG_HOST || 'https://eu.posthog.com').replace(/\/$/, '');
const project = process.env.POSTHOG_PROJECT_ID;
const key = process.env.POSTHOG_PERSONAL_API_KEY;

// Referrer domains of AI assistants and answer engines. Extend as new ones appear.
export const AI_REFERRERS = ['chatgpt.com', 'chat.openai.com', 'perplexity.ai', 'claude.ai', 'gemini.google.com', 'copilot.microsoft.com', 'you.com', 'phind.com', 'kagi.com', 'duckduckgo.com/chat'];

const host_ = new URL(config.origin).host;
const window = (from, to) => `timestamp >= now() - INTERVAL ${from} DAY AND timestamp < now() - INTERVAL ${to} DAY AND properties.$host = '${host_}'`;

export function queries(period = days, offset = 0) {
	const w = window(period + offset, offset);
	const aiList = AI_REFERRERS.map((d) => `'${d}'`).join(', ');
	return {
		totals: `SELECT count() AS pageviews, count(DISTINCT distinct_id) AS visitors FROM events WHERE event = '$pageview' AND ${w}`,
		topPaths: `SELECT properties.$pathname AS path, count() AS views FROM events WHERE event = '$pageview' AND ${w} GROUP BY path ORDER BY views DESC LIMIT 10`,
		referrers: `SELECT properties.$referring_domain AS referrer, count() AS views FROM events WHERE event = '$pageview' AND ${w} GROUP BY referrer ORDER BY views DESC LIMIT 10`,
		ai: `SELECT properties.$referring_domain AS assistant, count() AS views FROM events WHERE event = '$pageview' AND ${w} AND properties.$referring_domain IN (${aiList}) GROUP BY assistant ORDER BY views DESC`,
		languages: `SELECT if(match(properties.$pathname, '^/([a-z]{2})(/|$)'), extract(properties.$pathname, '^/([a-z]{2})'), '${config.locales[0].code}') AS lang, count() AS views FROM events WHERE event = '$pageview' AND ${w} GROUP BY lang ORDER BY views DESC`,
	};
}

async function hogql(query) {
	const response = await fetch(`${host}/api/projects/${project}/query/`, {
		method: 'POST',
		headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
		body: JSON.stringify({ query: { kind: 'HogQLQuery', query }, name: 'traffic-report' }),
	});
	if (!response.ok) throw new Error(`PostHog ${response.status}: ${(await response.text()).slice(0, 300)}`);
	const data = await response.json();
	return data.results || [];
}

export function table(headers, rows) {
	const lines = [`| ${headers.join(' | ')} |`, `| ${headers.map(() => '---').join(' | ')} |`];
	for (const row of rows) lines.push(`| ${row.map((cell) => String(cell ?? '(none)').replace(/\|/g, '\\|')).join(' | ')} |`);
	if (!rows.length) lines.push(`| ${headers.map(() => '-').join(' | ')} |`);
	return lines.join('\n');
}

const pct = (a, b) => (b ? `${(((a - b) / b) * 100).toFixed(1)}%` : 'n/a');

async function main() {
	if (!project || !key) {
		console.error('traffic-report: set POSTHOG_PROJECT_ID and POSTHOG_PERSONAL_API_KEY (and POSTHOG_HOST for non-EU). Nothing queried.');
		process.exit(2);
	}
	const now = queries();
	const prev = queries(days, days);
	const [totals, topPaths, referrers, ai, languages, prevTotals] = await Promise.all([
		hogql(now.totals),
		hogql(now.topPaths),
		hogql(now.referrers),
		hogql(now.ai),
		hogql(now.languages),
		hogql(prev.totals),
	]);
	const [pv = 0, uv = 0] = totals[0] || [];
	const [ppv = 0, puv = 0] = prevTotals[0] || [];
	const aiViews = ai.reduce((sum, [, views]) => sum + views, 0);
	const report = { site: config.origin, days, generatedAt: new Date().toISOString().slice(0, 10), pageviews: pv, visitors: uv, previous: { pageviews: ppv, visitors: puv }, aiReferredViews: aiViews, topPaths, referrers, ai, languages };
	if (asJson) {
		console.log(JSON.stringify(report, null, 2));
	} else {
		const md = [
			`## ${config.name} traffic, last ${days} day(s) (generated ${report.generatedAt})`,
			'',
			table(['Metric', 'This period', 'Previous', 'Change'], [
				['Pageviews', pv, ppv, pct(pv, ppv)],
				['Visitors (cookieless, daily-salted)', uv, puv, pct(uv, puv)],
				['Views referred by AI assistants', aiViews, '', pv ? `${((aiViews / pv) * 100).toFixed(1)}% of all` : 'n/a'],
			]),
			'',
			'### Top paths',
			'',
			table(['Path', 'Views'], topPaths),
			'',
			'### Referrers',
			'',
			table(['Referrer', 'Views'], referrers),
			'',
			'### AI assistants',
			'',
			table(['Assistant', 'Views'], ai),
			'',
			'### Languages',
			'',
			table(['Language', 'Views'], languages),
			'',
		].join('\n');
		console.log(md);
		if (webhook) {
			const r = await fetch(webhook, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text: md }) });
			if (!r.ok) console.error(`webhook returned ${r.status}`);
		}
	}
}

import { realpathSync } from 'node:fs';
const entry = process.argv[1] ? realpathSync(process.argv[1]) : '';
if (entry.endsWith('traffic-report.mjs')) {
	main().catch((error) => {
		console.error(`traffic-report: ${error.message}`);
		process.exit(1);
	});
}
