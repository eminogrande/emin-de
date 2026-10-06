// JSON-RPC 2.0 plumbing + the five public MCP tools for emin.de.
//
// Tool names are frozen: /.well-known/mcp/server-card.json declares exactly
// list_articles, get_article_markdown, search_articles, get_site_summary,
// list_topics and any extra or renamed tool breaks that declaration.

import { SITE_DEFINITION, absoluteUrl } from './site.mjs';
import {
	articleMarkdown,
	articleSummary,
	articleView,
	loadArticles,
	searchArticles,
	siteSummary,
	topicIndex,
} from './articles-api.mjs';

export const SERVER_INFO = { name: 'emin.de public articles', version: '1.0.0' };

export const SERVER_INSTRUCTIONS =
	'Read-only public server for emin.de. Exposes long-form engineering articles by Emin Mahrt on Bitcoin self-custody, passkeys, MuSig2, x402, MCP and agent-readiness. No account, no writes and no personal data: every tool reads published articles only. Use list_articles or list_topics to browse, search_articles to find text, get_article_markdown for one full article, and get_site_summary for the site overview and endpoint list. Bulk machine access to every article at once is a paid x402 resource at /api/v1/corpus for 0.05 USDC on Base.';

const MAX_LIMIT = 100;

export class ParamsError extends Error {}

function intOr(value, fallback, max = MAX_LIMIT) {
	if (value === undefined) return fallback;
	if (!Number.isInteger(value) || value < 1 || value > max) {
		throw new ParamsError(`"${value}" is not an integer between 1 and ${max}`);
	}
	return value;
}

const toolDefinitions = [
	{
		name: 'list_articles',
		title: 'List articles',
		description:
			'List published emin.de articles with slug, title, description, publish/update dates, topics, word count and canonical URL. Optionally filter by topic and cap the result count.',
		inputSchema: {
			type: 'object',
			properties: {
				topic: { type: 'string', description: 'Only return articles carrying this topic (see list_topics).' },
				limit: { type: 'integer', minimum: 1, maximum: MAX_LIMIT, description: 'Maximum number of articles to return.' },
			},
			additionalProperties: false,
		},
		annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
		handle: async ({ topic, limit }) => {
			const { articles } = await loadArticles();
			const max = intOr(limit, MAX_LIMIT);
			const list = topic ? articles.filter((article) => (article.topics || []).includes(topic)) : articles;
			const summaries = list.slice(0, max).map(articleSummary);
			return {
				content: [
					{
						type: 'text',
						text: summaries.length
							? summaries
									.map((entry) => `- ${entry.title} — ${entry.slug} (${entry.publishedAt || 'undated'}, ${entry.wordCount || '?'} words) ${entry.url}`)
									.join('\n')
							: `No articles${topic ? ` with topic "${topic}"` : ''}.`,
					},
				],
				structuredContent: { count: summaries.length, total: list.length, topic: topic ?? null, articles: summaries },
			};
		},
	},
	{
		name: 'get_article_markdown',
		title: 'Get article Markdown',
		description:
			'Return one complete emin.de article as Markdown, by slug (from list_articles or search_articles). Includes the full body text, topics and dates.',
		inputSchema: {
			type: 'object',
			properties: { slug: { type: 'string', description: 'Article slug, e.g. "bitcoin-self-custody-passkeys".' } },
			required: ['slug'],
			additionalProperties: false,
		},
		annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
		handle: async ({ slug }) => {
			if (typeof slug !== 'string' || !slug.trim()) throw new ParamsError('"slug" must be a non-empty string');
			const view = await articleView(slug);
			if (!view) {
				return {
					content: [{ type: 'text', text: `No article with slug "${slug}". Use list_articles to see available slugs.` }],
					isError: true,
				};
			}
			return {
				content: [{ type: 'text', text: view.markdown }],
				structuredContent: { ...view.summary, markdown: view.markdown },
			};
		},
	},
	{
		name: 'search_articles',
		title: 'Search articles',
		description:
			'Full-text keyword search across every emin.de article (title, topics, description, TL;DR and body). Returns ranked matches with a text snippet.',
		inputSchema: {
			type: 'object',
			properties: {
				query: { type: 'string', description: 'Search terms, e.g. "musig2 key aggregation" or "x402 402 challenge".' },
				limit: { type: 'integer', minimum: 1, maximum: MAX_LIMIT, description: 'Maximum number of matches to return.' },
			},
			required: ['query'],
			additionalProperties: false,
		},
		annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
		handle: async ({ query, limit }) => {
			if (typeof query !== 'string' || !query.trim()) throw new ParamsError('"query" must be a non-empty string');
			const { articles } = await loadArticles();
			const results = searchArticles(articles, query, intOr(limit, 10));
			return {
				content: [
					{
						type: 'text',
						text: results.length
							? results.map((entry) => `- ${entry.title} (${entry.slug})\n  ${entry.snippet}`).join('\n')
							: `No articles matched "${query}".`,
					},
				],
				structuredContent: { query, count: results.length, results },
			};
		},
	},
	{
		name: 'get_site_summary',
		title: 'Get site summary',
		description:
			'Return what emin.de is, who writes it, how many articles and topics exist, the date range, and the machine-readable endpoints (JSON API, MCP, paid x402 corpus).',
		inputSchema: { type: 'object', properties: {}, additionalProperties: false },
		annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
		handle: async () => {
			const summary = await siteSummary();
			return {
				content: [
					{
						type: 'text',
						text: `${summary.definition}\n\n${summary.counts.articles} articles, ${summary.counts.topics} topics, ${summary.counts.words} words. MCP: ${summary.endpoints.mcp} · JSON API: ${summary.endpoints.articles} · paid corpus: ${summary.endpoints.corpus}`,
					},
				],
				structuredContent: summary,
			};
		},
	},
	{
		name: 'list_topics',
		title: 'List topics',
		description: 'List every topic covered on emin.de with how many articles carry it and which slugs they are. Use it to drive list_articles(topic=…).',
		inputSchema: { type: 'object', properties: {}, additionalProperties: false },
		annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
		handle: async () => {
			const { articles } = await loadArticles();
			const topics = topicIndex(articles);
			return {
				content: [{ type: 'text', text: topics.map((entry) => `- ${entry.topic} (${entry.count}): ${entry.articles.join(', ')}`).join('\n') }],
				structuredContent: { count: topics.length, topics },
			};
		},
	},
];

export function listTools() {
	return toolDefinitions.map(({ name, title, description, inputSchema, annotations }) => ({
		name,
		title,
		description,
		inputSchema,
		annotations,
	}));
}

export function rpcResult(id, result) {
	return { jsonrpc: '2.0', id, result };
}

export function rpcError(id, code, message, data) {
	return { jsonrpc: '2.0', id: id ?? null, error: { code, message, ...(data === undefined ? {} : { data }) } };
}

export async function callTool(name, args) {
	const tool = toolDefinitions.find((entry) => entry.name === name);
	if (!tool) throw new ParamsError(`Unknown tool: ${name}`);
	if (args !== undefined && args !== null && (typeof args !== 'object' || Array.isArray(args))) {
		throw new ParamsError('"arguments" must be a JSON object');
	}
	return tool.handle(args || {});
}

// Returns either { notification: true } (HTTP 202, no body) or
// { body } with the JSON-RPC response object. Never throws.
export async function handleRpc(payload) {
	if (!payload || typeof payload !== 'object' || Array.isArray(payload) || payload.jsonrpc !== '2.0' || typeof payload.method !== 'string') {
		return { body: rpcError(null, -32600, 'Invalid Request') };
	}

	const { method, params = {} } = payload;
	const isNotification = !Object.hasOwn(payload, 'id');
	const id = payload.id ?? null;

	if (isNotification) return { notification: true };

	if (method === 'notifications/initialized' || method.startsWith('notifications/')) return { notification: true };

	if (method === 'ping') return { body: rpcResult(id, {}) };

	if (method === 'initialize') {
		return {
			body: rpcResult(id, {
				protocolVersion: typeof params.protocolVersion === 'string' ? params.protocolVersion : '2025-11-05',
				// Only tools are implemented; claiming resources/prompts here would be a lie.
				capabilities: { tools: { listChanged: false } },
				serverInfo: SERVER_INFO,
				instructions: SERVER_INSTRUCTIONS,
			}),
		};
	}

	if (method === 'tools/list') {
		return { body: rpcResult(id, { tools: listTools() }) };
	}

	if (method === 'tools/call') {
		if (typeof params.name !== 'string' || !params.name) {
			return { body: rpcError(id, -32602, 'Invalid params: "name" is required') };
		}
		try {
			return { body: rpcResult(id, await callTool(params.name, params.arguments)) };
		} catch (error) {
			if (error instanceof ParamsError) return { body: rpcError(id, -32602, error.message) };
			return { body: rpcError(id, -32603, error instanceof Error ? error.message : 'Internal error') };
		}
	}

	// Resources and prompts are advertised as empty capabilities, so these are
	// the correct empty lists rather than "method not found".
	if (method === 'resources/list') return { body: rpcResult(id, { resources: [] }) };
	if (method === 'prompts/list') return { body: rpcResult(id, { prompts: [] }) };

	return { body: rpcError(id, -32601, `Method not found: ${method}`) };
}

export function mcpDiscovery(origin) {
	return {
		name: SERVER_INFO.name,
		version: SERVER_INFO.version,
		protocol: 'mcp',
		transport: { type: 'streamable-http', url: absoluteUrl('/mcp'), methods: ['POST', 'GET'], authentication: 'none' },
		description: SITE_DEFINITION,
		instructions: SERVER_INSTRUCTIONS,
		capabilities: { tools: { listChanged: false } },
		tools: listTools().map((tool) => ({ name: tool.name, description: tool.description })),
		serverCard: absoluteUrl('/.well-known/mcp/server-card.json'),
		openapi: absoluteUrl('/openapi.json'),
	};
}
