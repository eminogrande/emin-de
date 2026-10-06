#!/usr/bin/env node
// Weekly AI-visibility check: is emin.de / nuri.com cited when people ask AI search?
//
//   node growth/ai-visibility.mjs            # runs only engines enabled in ai-visibility.config.json
//   node growth/ai-visibility.mjs --dry-run  # prints what would be sent, no network
//
// PAID: every engine call costs money. All engines default OFF ("needs Emin OK").
// An engine runs only when enabled:true in growth/ai-visibility.config.json AND its key
// env var exists. No LLM judges the answer: citation = target domain appears in the
// returned citation URLs (cited) or in the answer text (mentioned). Pure string checks.
// Output: growth/data/ai-visibility/YYYY-WW.json + growth/reports/ai-visibility-YYYY-WW.md
import { readFileSync, realpathSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { GROWTH_DIR, appendLearnings, arg, isoWeek, mdTable, today, writeFile } from './lib.mjs';

// Flat YAML subset used by prompts.yml: top-level keys, "- scalar" lists, "- key: v" maps.
export function parsePromptsYaml(text) {
	const out = { targets: [], prompts: [] };
	let section = null;
	let cur = null;
	for (const raw of String(text).split(/\r?\n/)) {
		if (/^\s*(#|$)/.test(raw)) continue;
		const top = /^([a-z_]+):\s*$/.exec(raw);
		if (top) { section = top[1]; cur = null; continue; }
		const item = /^\s*-\s+(.*)$/.exec(raw);
		const field = /^\s+([a-z_]+):\s*(.*)$/.exec(raw);
		if (item) {
			const kv = /^([a-z_]+):\s*(.*)$/.exec(item[1]);
			if (section === 'prompts' && kv) { cur = { [kv[1]]: kv[2].trim() }; out.prompts.push(cur); }
			else if (section === 'targets') out.targets.push(item[1].trim());
		} else if (field && cur) cur[field[1]] = field[2].trim();
	}
	return out;
}

const ENV = { openai: 'OPENAI_API_KEY', perplexity: 'PERPLEXITY_API_KEY', gemini: 'GEMINI_API_KEY' };

export function engineState(name, cfg, env = process.env) {
	if (!cfg?.enabled) return { name, run: false, reason: 'off (paid, needs Emin OK)' };
	if (!env[ENV[name]]) return { name, run: false, reason: `not connected (${ENV[name]} missing)` };
	return { name, run: true, reason: 'enabled' };
}

const host = (u) => { try { return new URL(u).host.replace(/^www\./, ''); } catch { return ''; } };

export function scoreAnswer(answer, citations, targets) {
	const res = {};
	for (const t of targets) {
		const cited = citations.some((u) => host(u) === t || host(u).endsWith(`.${t}`));
		const mentioned = String(answer).toLowerCase().includes(t.toLowerCase());
		res[t] = cited ? 'cited' : mentioned ? 'mentioned' : 'absent';
	}
	return res;
}

// Engine adapters. Each returns { answer, citations[] }.
const ENGINES = {
	async openai(prompt, cfg, env) {
		const r = await fetch('https://api.openai.com/v1/chat/completions', { method: 'POST', headers: { authorization: `Bearer ${env.OPENAI_API_KEY}`, 'content-type': 'application/json' }, body: JSON.stringify({ model: cfg.model, web_search_options: {}, messages: [{ role: 'user', content: prompt }] }) });
		if (!r.ok) throw new Error(`openai ${r.status}`);
		const m = (await r.json()).choices[0].message;
		return { answer: m.content || '', citations: (m.annotations || []).map((a) => a.url_citation?.url).filter(Boolean) };
	},
	async perplexity(prompt, cfg, env) {
		const r = await fetch('https://api.perplexity.ai/chat/completions', { method: 'POST', headers: { authorization: `Bearer ${env.PERPLEXITY_API_KEY}`, 'content-type': 'application/json' }, body: JSON.stringify({ model: cfg.model, messages: [{ role: 'user', content: prompt }] }) });
		if (!r.ok) throw new Error(`perplexity ${r.status}`);
		const j = await r.json();
		return { answer: j.choices[0].message.content || '', citations: j.citations || (j.search_results || []).map((s) => s.url) };
	},
	async gemini(prompt, cfg, env) {
		const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${cfg.model}:generateContent`, { method: 'POST', headers: { 'x-goog-api-key': env.GEMINI_API_KEY, 'content-type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], tools: [{ google_search: {} }] }) });
		if (!r.ok) throw new Error(`gemini ${r.status}`);
		const c = (await r.json()).candidates?.[0] || {};
		return { answer: (c.content?.parts || []).map((p) => p.text).join(''), citations: (c.groundingMetadata?.groundingChunks || []).map((g) => g.web?.uri).filter(Boolean) };
	},
};

export async function main() {
	const date = arg('date', today());
	const week = isoWeek(date);
	const dry = arg('dry-run', false);
	const { targets, prompts } = parsePromptsYaml(readFileSync(join(GROWTH_DIR, 'prompts.yml'), 'utf-8'));
	const cfg = JSON.parse(readFileSync(join(GROWTH_DIR, 'ai-visibility.config.json'), 'utf-8')).engines;
	const states = Object.keys(ENGINES).map((n) => engineState(n, cfg[n]));
	const results = [];
	for (const st of states.filter((s) => s.run)) {
		for (const p of prompts) {
			if (dry) { results.push({ engine: st.name, id: p.id, dry: true }); continue; }
			try {
				const { answer, citations } = await ENGINES[st.name](p.prompt, cfg[st.name], process.env);
				results.push({ engine: st.name, id: p.id, lang: p.lang, prompt: p.prompt, verdict: scoreAnswer(answer, citations, targets), citations });
			} catch (e) {
				results.push({ engine: st.name, id: p.id, error: String(e.message) });
			}
		}
	}
	const ran = results.filter((r) => r.verdict);
	const count = (t, v) => ran.filter((r) => r.verdict[t] === v).length;
	const lines = [
		`# AI visibility ${week}`, '',
		`Generated ${new Date().toISOString()} by growth/ai-visibility.mjs. Prompts: ${prompts.length} (growth/prompts.yml). Targets: ${targets.join(', ')}.`, '',
		'## Engines', '', mdTable(['Engine', 'Ran', 'Reason'], states.map((s) => [s.name, s.run ? 'yes' : 'no', s.reason])), '',
	];
	if (ran.length) {
		lines.push('## Totals', '', mdTable(['Target', 'Cited', 'Mentioned', 'Absent', 'Answers'], targets.map((t) => [t, count(t, 'cited'), count(t, 'mentioned'), count(t, 'absent'), ran.length])), '');
		lines.push('## Per prompt', '', mdTable(['Engine', 'Prompt', ...targets], ran.map((r) => [r.engine, `${r.id} ${r.prompt}`, ...targets.map((t) => r.verdict[t])])), '');
	} else {
		lines.push('No engine ran. No visibility numbers exist for this week. Enabling any engine is a paid call and needs Emin OK.', '');
	}
	lines.push('## Source', '', '- Verdict = string match of target domain in returned citation URLs (cited) or answer text (mentioned). No model judges the answer.', '');
	writeFile(join(GROWTH_DIR, `data/ai-visibility/${week}.json`), `${JSON.stringify({ week, targets, states, results }, null, 1)}\n`);
	writeFile(join(GROWTH_DIR, `reports/ai-visibility-${week}.md`), lines.join('\n'));
	if (ran.length && !arg('no-learn', false)) {
		const link = `growth/reports/ai-visibility-${week}.md`;
		appendLearnings(targets.map((t) => `${date}: AI visibility ${t}: cited ${count(t, 'cited')}/${ran.length}, mentioned ${count(t, 'mentioned')}/${ran.length}. Source: [${link}](reports/ai-visibility-${week}.md)`).slice(0, 3));
	}
	console.log(`ai-visibility: ${states.map((s) => `${s.name}=${s.run ? 'on' : 'off'}`).join(' ')}; ${ran.length} answers; wrote growth/reports/ai-visibility-${week}.md`);
}

const isMain = process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url));
if (isMain) main().catch((e) => { console.error(e); process.exit(1); });
