// Shared helpers for the growth loop. Node built-ins only, no dependencies.
// Every number written by these scripts carries the query that produced it,
// so a report line can always be traced back to one request.
import { createSign } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync, appendFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

export const GROWTH_DIR = dirname(fileURLToPath(import.meta.url));
export const REPO_DIR = dirname(GROWTH_DIR);
export const SITE = process.env.GROWTH_SITE || 'https://emin.de';
export const UA = 'emin.de-growth-loop/1.0 (+https://github.com/eminogrande/emin-de)';

// Referrer domains of AI assistants. Used for the PostHog referrer class.
export const AI_REFERRERS = ['chatgpt.com', 'chat.openai.com', 'perplexity.ai', 'www.perplexity.ai', 'gemini.google.com', 'claude.ai', 'copilot.microsoft.com'];
export const SEARCH_REFERRERS = ['www.google.com', 'google.com', 'www.bing.com', 'bing.com', 'duckduckgo.com', 'search.brave.com', 'www.ecosia.org', 'yandex.com', 'search.yahoo.com'];

export function arg(name, fallback) {
	const args = process.argv.slice(2);
	const i = args.indexOf(`--${name}`);
	if (i === -1) return fallback;
	const next = args[i + 1];
	return next === undefined || next.startsWith('--') ? true : next;
}

export const today = () => new Date().toISOString().slice(0, 10);
export function addDays(iso, n) {
	const d = new Date(`${iso}T00:00:00Z`);
	d.setUTCDate(d.getUTCDate() + n);
	return d.toISOString().slice(0, 10);
}

// ISO 8601 week label, e.g. 2026-W41.
export function isoWeek(iso) {
	const d = new Date(`${iso}T00:00:00Z`);
	const day = d.getUTCDay() || 7;
	d.setUTCDate(d.getUTCDate() + 4 - day);
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	const week = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
	return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

export function writeFile(path, text) {
	mkdirSync(dirname(path), { recursive: true });
	writeFileSync(path, text);
}

export function mdTable(headers, rows) {
	const esc = (c) => String(c ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
	const out = [`| ${headers.join(' | ')} |`, `| ${headers.map(() => '---').join(' | ')} |`];
	for (const r of rows) out.push(`| ${r.map(esc).join(' | ')} |`);
	if (!rows.length) out.push(`| ${headers.map(() => '-').join(' | ')} |`);
	return out.join('\n');
}

// A source result. status: ok | not_connected | error | skipped.
export const notConnected = (source, needs) => ({ source, status: 'not_connected', needs, metrics: {}, queries: [] });

// ---------- Google Search Console (service account, RS256 JWT, node:crypto) ----------

export const GSC_KEY_PATH = process.env.GSC_KEY_FILE || join(homedir(), '.hermes/secrets/gsc.json');
export const GSC_PROPERTY = process.env.GSC_PROPERTY || 'sc-domain:emin.de';

export function gscCredentials(path = GSC_KEY_PATH) {
	if (!existsSync(path)) return null;
	const sa = JSON.parse(readFileSync(path, 'utf-8'));
	if (!sa.client_email || !sa.private_key) throw new Error(`${path} is not a service-account JSON (client_email/private_key missing)`);
	return sa;
}

const b64url = (buf) => Buffer.from(buf).toString('base64').replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');

export function gscJwt(sa, now = Math.floor(Date.now() / 1000)) {
	const head = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
	const claim = b64url(JSON.stringify({ iss: sa.client_email, scope: 'https://www.googleapis.com/auth/webmasters.readonly', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 }));
	const signer = createSign('RSA-SHA256');
	signer.update(`${head}.${claim}`);
	return `${head}.${claim}.${b64url(signer.sign(sa.private_key))}`;
}

export async function gscToken(sa) {
	const body = new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: gscJwt(sa) });
	const r = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', body });
	if (!r.ok) throw new Error(`GSC token ${r.status}: ${(await r.text()).slice(0, 200)}`);
	return (await r.json()).access_token;
}

export function gscQueryUrl(property = GSC_PROPERTY) {
	return `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/searchAnalytics/query`;
}

export async function gscQuery(token, body, property = GSC_PROPERTY) {
	const r = await fetch(gscQueryUrl(property), { method: 'POST', headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' }, body: JSON.stringify(body) });
	if (!r.ok) throw new Error(`GSC ${r.status}: ${(await r.text()).slice(0, 200)}`);
	return (await r.json()).rows || [];
}

// ---------- Post inventory ----------
// Posts live in content/posts/<lang>/<year>/<slug>.md on the engine branch.
// Source order: local content/posts, else a git ref (default origin/feat/blog-engine)
// read with `git show`, never checked out. Returns [{ path, lang, slug, title, category }].

export function parseFrontmatter(text) {
	const m = /^---\n([\s\S]*?)\n---/.exec(text);
	const fm = {};
	if (!m) return fm;
	for (const line of m[1].split('\n')) {
		const kv = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(line);
		if (!kv) continue;
		let v = kv[2].trim();
		if (/^".*"$/.test(v) || /^'.*'$/.test(v)) v = v.slice(1, -1);
		fm[kv[1]] = v;
	}
	return fm;
}

function toPost(path, text) {
	const fm = parseFrontmatter(text);
	const [, lang, , file] = path.replace(/^content\/posts\//, '').match(/^([a-z]{2})\/(\d{4})\/(.+)\.md$/) || [];
	return { path, lang: fm.lang || lang, slug: file, title: fm.title || file, category: fm.category || '' };
}

export function loadPosts({ ref = process.env.GROWTH_POSTS_REF || 'origin/feat/blog-engine' } = {}) {
	const local = join(REPO_DIR, 'content/posts');
	if (existsSync(local)) {
		const out = [];
		const walk = (dir) => {
			for (const e of readdirSync(dir, { withFileTypes: true })) {
				const p = join(dir, e.name);
				if (e.isDirectory()) walk(p);
				else if (e.name.endsWith('.md')) out.push(toPost(p.slice(REPO_DIR.length + 1), readFileSync(p, 'utf-8')));
			}
		};
		walk(local);
		return { source: 'content/posts (working tree)', posts: out };
	}
	try {
		const files = execFileSync('git', ['ls-tree', '-r', '--name-only', ref, '--', 'content/posts'], { cwd: REPO_DIR, encoding: 'utf-8' }).split('\n').filter((f) => f.endsWith('.md'));
		const posts = files.map((f) => toPost(f, execFileSync('git', ['show', `${ref}:${f}`], { cwd: REPO_DIR, encoding: 'utf-8', maxBuffer: 1 << 26 })));
		return { source: `git ${ref}:content/posts`, posts };
	} catch {
		return { source: 'none (no content/posts and git ref missing)', posts: [] };
	}
}

export function appendLearnings(lines, file = join(GROWTH_DIR, 'LEARNINGS.md')) {
	if (!lines.length) return 0;
	appendFileSync(file, lines.map((l) => `- ${l}\n`).join(''));
	return lines.length;
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
