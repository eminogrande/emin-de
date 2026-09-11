// Public MCP server for emin.de — Streamable HTTP transport, JSON-RPC 2.0,
// stateless, no authentication.
//
// server.mjs imports handleMcp and calls it before its own routes:
//   if (await handleMcp(req, res, ctx)) return;
//
// Response modes: `application/json` (no SSE stream is opened, nothing is
// pushed to the client). POST /mcp answers one JSON-RPC message per request,
// GET /mcp serves credential-free discovery for crawlers and scanners.

import { readJsonBody, requestUrl, sendJson } from './articles-api.mjs';
import { handleRpc, mcpDiscovery, rpcError } from './mcp-rpc.mjs';

export const MCP_PATH = '/mcp';

export async function handleMcp(req, res, ctx = {}) {
	const { pathname } = requestUrl(req, ctx);
	if (pathname !== MCP_PATH && pathname !== `${MCP_PATH}/`) return false;

	if (req.method === 'GET' || req.method === 'HEAD') {
		return sendJson(req, res, 200, mcpDiscovery(ctx.origin), { 'access-control-allow-origin': '*' });
	}

	if (req.method !== 'POST') {
		res.writeHead(405, {
			'content-type': 'application/json; charset=utf-8',
			allow: 'GET, HEAD, POST',
			'access-control-allow-origin': '*',
		});
		res.end(JSON.stringify(rpcError(null, -32600, `${req.method} is not supported on ${MCP_PATH}; use POST.`)));
		return true;
	}

	const parsed = await readJsonBody(req);
	if (!parsed.ok) {
		// Malformed JSON is the one case the MCP transport asks for HTTP 400.
		return sendJson(req, res, 400, rpcError(null, -32700, `Parse error: ${parsed.error}`), {
			'access-control-allow-origin': '*',
		});
	}

	const outcome = await handleRpc(parsed.value);
	if (outcome.notification) {
		res.writeHead(202, { 'access-control-allow-origin': '*' });
		res.end();
		return true;
	}

	return sendJson(req, res, 200, outcome.body, { 'access-control-allow-origin': '*' });
}
