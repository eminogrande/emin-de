#!/usr/bin/env node
// Free keyword research for emin.de. Deterministic, no LLM, no paid API.
//
//   node growth/keywords.mjs                       # real run: autocomplete for growth/seeds.json, DE+EN
//   node growth/keywords.mjs --from-cache <json>   # rebuild the report from a saved raw file (no network)
//
// Method:
//   1. Google Autocomplete (suggestqueries.google.com, client=firefox), one request per
//      second, for each seed plus question/comparison modifiers ("People Also Ask" style).
//   2. Normalise + light stemming, cluster by seed + distinguishing stems.
//   3. Map each cluster to an existing post (title/slug stem overlap) or mark it a gap.
//   4. If Search Console is connected: add queries with impressions but no ranking post
//      (position > 20 or landing page is not a post): the LLM Gateway "gap to posts" loop.
// Output: growth/keywords/YYYY-WW.md (top 20 gaps) + growth/data/keywords/YYYY-WW.json (raw).
// Volume signal = how many distinct autocomplete expansions surfaced the cluster
// (Google returns no volumes; this is a relative popularity proxy, not searches/month).
import { existsSync, readFileSync, realpathSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { GROWTH_DIR, UA, addDays, appendLearnings, arg, gscCredentials, gscQuery, gscQueryUrl, gscToken, isoWeek, loadPosts, mdTable, sleep, today, writeFile } from './lib.mjs';

export const MODIFIERS = {
	de: ['', 'was ist ', 'wie ', 'warum ', 'beste ', ' vs', ' erfahrungen', ' sicher', ' kosten', ' deutschland'],
	en: ['', 'what is ', 'how to ', 'why ', 'best ', ' vs', ' review', ' safe', ' fees', ' explained'],
};

const STOP = new Set(('a an the and or of for to in on with is are was what how why which who best vs von der die das und oder mit ist was wie warum welche wer beste bester besten ein eine einen im in zu auf für fur bei den dem des 2025 2026 review reviews erfahrungen explained safe sicher kosten fees deutschland germany my me i you your').split(' '));

export function stem(word) {
	let w = word.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
	if (w.length > 4) w = w.replace(/ies$/, 'y').replace(/(es|en|er|s)$/, '');
	return w;
}

export function tokens(text) {
	return String(text).toLowerCase().split(/[^a-z0-9äöüß]+/i).filter(Boolean);
}

export const contentStems = (text) => [...new Set(tokens(text).filter((t) => !STOP.has(t)).map(stem).filter((s) => s.length > 1))];

// Parse a suggestqueries client=firefox response: ["q", ["s1","s2",...], ...]
export function parseSuggest(body) {
	const j = typeof body === 'string' ? JSON.parse(body) : body;
	return Array.isArray(j) && Array.isArray(j[1]) ? j[1].map(String) : [];
}

export function queryFor(seed, mod) {
	return mod.startsWith(' ') ? `${seed}${mod}` : `${mod}${seed}`;
}

export function intentOf(s, lang) {
	const t = s.toLowerCase();
	if (/\bvs\.?\b|versus|alternative|oder\b/.test(t)) return 'compare';
	if (/^(best|beste|bester|besten|top)\b/.test(t) || /\b(best|beste)\b/.test(t)) return 'best';
	if (/^(how|wie)\b|\b(how to|anleitung|tutorial|einrichten|setup)\b/.test(t)) return 'howto';
	if (/^(what|was|why|warum|who|wer|is|ist)\b|\b(meaning|bedeutung|explained)\b/.test(t)) return 'explain';
	return lang === 'de' ? 'explain' : 'explain';
}

// Cluster: seed stems + up to 2 extra content stems, sorted. Same key = same cluster.
export function clusterKey(seed, suggestion) {
	const seedS = new Set(contentStems(seed));
	const extra = contentStems(suggestion).filter((s) => !seedS.has(s)).sort().slice(0, 2);
	return [...seedS].sort().join(' ') + (extra.length ? ` + ${extra.join(' ')}` : '');
}

// Readable label: original words of the suggestion that carry the cluster stems.
export function clusterLabel(seed, suggestion) {
	const seedS = new Set(contentStems(seed));
	const words = tokens(suggestion).filter((t) => !STOP.has(t));
	const extra = words.filter((t) => !seedS.has(stem(t)));
	return extra.length ? `${seed} + ${[...new Set(extra)].slice(0, 2).join(' ')}` : seed;
}

// Relevance gate: a suggestion must keep every seed stem (seeds of 1-2 stems) or all
// but one (seeds of 3+ stems). Drops drift like "daiqisi wallet price" for "nuri wallet"
// and "ai software for contract review" for "ai agent payments".
export function relevant(seed, suggestion) {
	const want = contentStems(seed);
	const have = new Set(contentStems(suggestion));
	const hit = want.filter((s) => have.has(s)).length;
	return want.length <= 2 ? hit === want.length : hit >= want.length - 1;
}

export function buildClusters(raw) {
	// raw: [{ seed, lang, category, query, suggestions[] }]
	const map = new Map();
	for (const r of raw) {
		for (const [rank, s] of r.suggestions.entries()) {
			if (!relevant(r.seed, s)) continue;
			if ((r.exclude || []).some((x) => s.toLowerCase().includes(x))) continue;
			const key = `${r.lang}|${clusterKey(r.seed, s)}`;
			const c = map.get(key) || { key, lang: r.lang, seed: r.seed, category: r.category, cluster: clusterLabel(r.seed, s), suggestions: new Map(), hits: 0, bestRank: 99, gscImpressions: 0, gscQueries: [] };
			c.hits += 1;
			c.bestRank = Math.min(c.bestRank, rank + 1);
			c.suggestions.set(s, (c.suggestions.get(s) || 0) + 1);
			map.set(key, c);
		}
	}
	return [...map.values()].map((c) => {
		const sorted = [...c.suggestions.entries()].sort((a, b) => b[1] - a[1] || a[0].length - b[0].length || a[0].localeCompare(b[0]));
		return { ...c, suggestions: sorted.map(([s]) => s), head: sorted[0][0] };
	});
}

// Best post for a cluster: share of the cluster's stems found in post title + slug.
// Only posts in the cluster's language count; a post in the other language is
// returned as `translate` so the report can say "translate X" instead of "covered".
export function matchPost(cluster, posts, { sameLang = true } = {}) {
	const want = contentStems(`${cluster.seed} ${cluster.head}`);
	let best = null;
	for (const p of posts) {
		if (sameLang && p.lang && cluster.lang && p.lang !== cluster.lang) continue;
		const have = new Set(contentStems(`${p.title} ${p.slug.replace(/-/g, ' ')}`));
		const score = want.filter((s) => have.has(s)).length / (want.length || 1);
		if (!best || score > best.score) best = { post: p, score };
	}
	return best && best.score >= 0.6 ? best : null;
}

export const translateCandidate = (cluster, posts) => matchPost(cluster, posts, { sameLang: false });

const FORMAT = { compare: 'guide (comparison table)', best: 'guide (dated "best for" table)', howto: 'guide (steps)', explain: 'explainer (TL;DR + FAQ)' };

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Deterministic title from the head suggestion. Emin edits; no LLM writes it.
export function suggestTitle(cluster) {
	const h = cluster.head.trim();
	const intent = intentOf(h, cluster.lang);
	const year = '2026';
	if (intent === 'compare') return `${cap(h.replace(/\bvs\.?\b/i, 'vs'))}: ${cluster.lang === 'de' ? 'der ehrliche Vergleich' : 'an honest comparison'}`;
	if (intent === 'best') return `${cap(h)} ${h.includes(year) ? '' : year}`.trim();
	if (/^(what|was|why|warum|who|wer|how|wie|is|ist|which|welche)\b/i.test(h)) return `${cap(h)}?`;
	if (intent === 'explain') return cluster.lang === 'de' ? `${cap(h)}: einfach erklärt` : `${cap(h)}, explained`;
	return cap(h);
}

export function rankGaps(clusters, posts) {
	return clusters
		.map((c) => ({ ...c, match: matchPost(c, posts), intent: intentOf(c.head, c.lang) }))
		.filter((c) => !c.match)
		.map((c) => {
			const t = translateCandidate(c, posts);
			return { ...c, translate: t ? t.post.path : null, score: c.hits + Math.ceil(c.gscImpressions / 10) + (c.bestRank <= 3 ? 1 : 0), title: suggestTitle(c), format: t ? `translation of existing post` : FORMAT[c.intent] };
		})
		.sort((a, b) => b.score - a.score || a.bestRank - b.bestRank || a.cluster.localeCompare(b.cluster));
}

// Diversity: at most `perSeed` gaps per seed+language in the shortlist, so one
// busy seed (self custody) cannot fill the whole top 20.
export function diversify(gaps, perSeed = 3) {
	const seen = new Map();
	const head = [];
	const tail = [];
	for (const g of gaps) {
		const k = `${g.lang}|${g.seed}`;
		const n = seen.get(k) || 0;
		(n < perSeed ? head : tail).push(g);
		seen.set(k, n + 1);
	}
	return [...head, ...tail];
}

async function suggest(q, lang) {
	const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=${lang}&gl=${lang === 'de' ? 'de' : 'us'}&q=${encodeURIComponent(q)}`;
	const r = await fetch(url, { headers: { 'user-agent': UA }, signal: AbortSignal.timeout(10000) });
	if (!r.ok) throw new Error(`suggest ${r.status}`);
	return { url, suggestions: parseSuggest(await r.text()) };
}

async function gscGaps(posts, day) {
	const sa = gscCredentials();
	if (!sa) return { status: 'not_connected', rows: [] };
	const end = addDays(day, -3);
	const body = { startDate: addDays(end, -27), endDate: end, dimensions: ['query', 'page'], rowLimit: 1000 };
	const rows = await gscQuery(await gscToken(sa), body);
	const postSlugs = posts.map((p) => p.slug);
	const byQuery = new Map();
	for (const r of rows) {
		const [query, page] = r.keys;
		const isPost = postSlugs.some((s) => page.includes(s));
		const cur = byQuery.get(query) || { query, impressions: 0, bestPos: 999, onPost: false };
		cur.impressions += r.impressions;
		if (isPost && r.position <= 20) cur.onPost = true;
		cur.bestPos = Math.min(cur.bestPos, r.position);
		byQuery.set(query, cur);
	}
	return { status: 'ok', query: `POST ${gscQueryUrl()} ${JSON.stringify(body)}`, rows: [...byQuery.values()].filter((q) => !q.onPost && q.impressions > 0) };
}

export function renderKeywordReport({ week, generatedAt, postsSource, postCount, requests, gaps, covered, gsc }) {
	const top = gaps.slice(0, 20);
	const lines = [
		`# Keyword gaps ${week}`, '',
		`Generated ${generatedAt} by growth/keywords.mjs (deterministic, no LLM, no paid API).`,
		`Posts compared: ${postCount} from ${postsSource}. Autocomplete requests: ${requests}. Search Console: ${gsc.status}.`, '',
		'Volume signal = autocomplete hits (how many of the seed/modifier requests surfaced this cluster) plus best rank in the suggestion list. Google publishes no volumes here; treat it as relative, not as searches per month.', '',
		'## Top 20 gaps (no matching post yet)', '',
		mdTable(['#', 'Suggested title', 'Cluster', 'Lang', 'Volume signal', 'Format', 'Category', 'Example queries'],
			top.map((g, i) => [i + 1, g.title, g.cluster, g.lang, `${g.hits} hits, best rank ${g.bestRank}${g.gscImpressions ? `, GSC ${g.gscImpressions} impr` : ''}`, g.translate ? `${g.format}: ${g.translate}` : g.format, g.category, g.suggestions.slice(0, 3).join('; ')])),
		'',
		'## Already covered by a post', '',
		mdTable(['Cluster', 'Lang', 'Hits', 'Post', 'Match'], covered.slice(0, 15).map((c) => [c.cluster, c.lang, c.hits, c.match.post.path, `${Math.round(c.match.score * 100)}%`])),
		'',
		'## Sources', '',
		'- Suggestions: `GET https://suggestqueries.google.com/complete/search?client=firefox&hl=<lang>&gl=<de|us>&q=<seed+modifier>`, 1 request/second; raw responses in the matching growth/data/keywords/<week>.json.',
		`- Posts: ${postsSource}, matched by stem overlap of title + slug (>= 60 percent).`,
		gsc.status === 'ok' ? `- Search Console: \`${gsc.query}\`` : '- Search Console: not connected (needs service-account JSON at ~/.hermes/secrets/gsc.json). Once connected, queries with impressions and no post in the top 20 join this list.',
		'',
	];
	return lines.join('\n');
}

export async function main() {
	const date = arg('date', today());
	const week = isoWeek(date);
	const seedsFile = join(GROWTH_DIR, 'seeds.json');
	const seeds = JSON.parse(readFileSync(seedsFile, 'utf-8'));
	const cache = arg('from-cache', null);
	const { source: postsSource, posts } = loadPosts();
	let raw;
	if (cache) {
		const bySeed = new Map(seeds.flatMap((x) => ['de', 'en'].map((l) => [`${l}|${x[l]}`, x])));
		raw = JSON.parse(readFileSync(cache, 'utf-8')).raw.map((r) => ({ ...r, exclude: bySeed.get(`${r.lang}|${r.seed}`)?.exclude || r.exclude || [] }));
	} else {
		raw = [];
		for (const s of seeds) {
			for (const lang of ['de', 'en']) {
				const seed = s[lang];
				for (const mod of MODIFIERS[lang]) {
					const q = queryFor(seed, mod);
					try {
						const { url, suggestions } = await suggest(q, lang);
						raw.push({ seed, lang, category: s.category, exclude: s.exclude || [], query: q, url, suggestions });
					} catch (e) {
						raw.push({ seed, lang, category: s.category, query: q, error: String(e.message), suggestions: [] });
					}
					await sleep(1000); // polite: 1 request per second
				}
			}
		}
	}
	const clusters = buildClusters(raw);
	let gsc = { status: 'not_connected', rows: [] };
	try { gsc = await gscGaps(posts, date); } catch (e) { gsc = { status: `error: ${e.message}`, rows: [] }; }
	for (const r of gsc.rows) {
		const lang = /[äöüß]|\b(der|die|das|und|wie|was|mit)\b/i.test(r.query) ? 'de' : 'en';
		clusters.push({ key: `${lang}|gsc ${r.query}`, lang, seed: r.query, category: '', cluster: `gsc: ${r.query}`, suggestions: [r.query], head: r.query, hits: 0, bestRank: Math.round(r.bestPos), gscImpressions: r.impressions, gscQueries: [r.query] });
	}
	const withMatch = clusters.map((c) => ({ ...c, match: matchPost(c, posts) }));
	const covered = withMatch.filter((c) => c.match).sort((a, b) => b.hits - a.hits);
	const gaps = diversify(rankGaps(clusters, posts));
	const generatedAt = new Date().toISOString();
	const requests = raw.length;
	if (!cache) writeFile(join(GROWTH_DIR, `data/keywords/${week}.json`), `${JSON.stringify({ week, generatedAt, raw }, null, 1)}\n`);
	writeFile(join(GROWTH_DIR, `keywords/${week}.md`), renderKeywordReport({ week, generatedAt, postsSource, postCount: posts.length, requests, gaps, covered, gsc }));
	if (!cache && !arg('no-learn', false) && gaps.length) {
		const t = gaps.slice(0, 3).map((g) => `"${g.cluster}" (${g.lang}, ${g.hits} hits)`).join(', ');
		appendLearnings([`${date}: keyword run ${week}: ${gaps.length} gap clusters vs ${posts.length} posts; top 3: ${t}. Source: [growth/keywords/${week}.md](keywords/${week}.md)`]);
	}
	const errors = raw.filter((r) => r.error).length;
	console.log(`keywords: ${requests} requests (${errors} errors), ${clusters.length} clusters, ${gaps.length} gaps, ${covered.length} covered; wrote growth/keywords/${week}.md`);
	return { week, gaps, covered };
}

const isMain = process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url));
if (isMain) main().catch((e) => { console.error(e); process.exit(1); });
