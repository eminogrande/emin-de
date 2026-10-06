// OpenAPI 3.1 for the routes server.mjs / the Worker actually answer. Every
// operation has typed responses including errors, and a unique operationId.
import { SITE, SITE_DEFINITION, absoluteUrl } from '../lib/site.mjs';
import { textResponse } from '../lib/text-response.mjs';

const problem = { $ref: '#/components/schemas/Problem' };
const err = (description) => ({ description, content: { 'application/problem+json': { schema: problem } } });
const doc = {
	openapi: '3.1.0',
	info: {
		title: `${SITE.name} public API`,
		version: '1.0.0',
		description: `${SITE_DEFINITION} Read-only. No credentials for article reads; the bulk corpus answers with an x402 payment challenge.`,
		license: { name: 'MIT', identifier: 'MIT' },
		'x-deprecation-policy': 'Breaking changes ship under a new path. Deprecated operations are marked deprecated: true and announce the Deprecation (RFC 9745) and Sunset (RFC 8594) headers at least 90 days before removal.',
	},
	servers: [{ url: absoluteUrl('/') }],
	paths: {
		'/api/articles': {
			get: {
				operationId: 'listArticles',
				summary: 'List every published post',
				responses: {
					200: { description: 'All posts', content: { 'application/json': { schema: { $ref: '#/components/schemas/ArticleList' } } } },
					429: err('Rate limit exceeded'),
				},
			},
		},
		'/api/articles/{slug}': {
			get: {
				operationId: 'getArticle',
				summary: 'One post including its full Markdown',
				parameters: [{ name: 'slug', in: 'path', required: true, schema: { type: 'string' } }],
				responses: {
					200: { description: 'The post', content: { 'application/json': { schema: { $ref: '#/components/schemas/ArticleFull' } } } },
					404: err('No post with that slug'),
					429: err('Rate limit exceeded'),
				},
			},
		},
		'/api/v1/corpus': {
			get: {
				operationId: 'getCorpus',
				summary: 'Every post in one document (x402, paid)',
				responses: {
					402: { description: 'x402 payment challenge', content: { 'application/json': { schema: { type: 'object', additionalProperties: true } } } },
					429: err('Rate limit exceeded'),
				},
			},
		},
		'/mcp': {
			post: {
				operationId: 'mcpRpc',
				summary: 'MCP Streamable HTTP endpoint (JSON-RPC 2.0)',
				requestBody: { required: true, content: { 'application/json': { schema: { type: 'object', additionalProperties: true } } } },
				responses: {
					200: { description: 'JSON-RPC response', content: { 'application/json': { schema: { type: 'object', additionalProperties: true } } } },
					202: { description: 'Notification accepted, no body' },
					429: err('Rate limit exceeded'),
				},
			},
		},
	},
	components: {
		schemas: {
			Problem: {
				type: 'object',
				required: ['type', 'title', 'status'],
				properties: { type: { type: 'string' }, title: { type: 'string' }, status: { type: 'integer' }, detail: { type: 'string' }, instance: { type: 'string' } },
			},
			ArticleSummary: {
				type: 'object',
				required: ['slug', 'title', 'url'],
				properties: {
					slug: { type: 'string' },
					title: { type: 'string' },
					description: { type: 'string' },
					publishedAt: { type: 'string', format: 'date' },
					modifiedAt: { type: 'string', format: 'date' },
					lang: { type: 'string' },
					category: { type: 'string' },
					format: { type: 'string' },
					author: { type: 'string' },
					authorType: { type: 'string', enum: ['human', 'ai_editorial'] },
					provenance: { type: 'string', enum: ['transcript', 'written', 'ai_generated'] },
					topics: { type: 'array', items: { type: 'string' } },
					wordCount: { type: 'integer' },
					url: { type: 'string', format: 'uri' },
					markdownUrl: { type: 'string', format: 'uri' },
				},
			},
			ArticleList: { type: 'object', properties: { count: { type: 'integer' }, articles: { type: 'array', items: { $ref: '#/components/schemas/ArticleSummary' } } } },
			ArticleFull: { allOf: [{ $ref: '#/components/schemas/ArticleSummary' }, { type: 'object', properties: { markdown: { type: 'string' } } }] },
		},
	},
};

export const GET = () => textResponse(JSON.stringify(doc, null, 1), 'application/json');
