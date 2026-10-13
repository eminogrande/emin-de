// Generated from the live tool list, so the card cannot declare a tool the
// server does not answer.
import { listTools, SERVER_INFO, SERVER_INSTRUCTIONS } from '../../../lib/mcp-rpc.mjs';
import { absoluteUrl } from '../../../lib/site.mjs';
import { textResponse } from '../../../lib/text-response.mjs';
const card = {
	name: SERVER_INFO.name,
	version: SERVER_INFO.version,
	description: SERVER_INSTRUCTIONS,
	transport: { type: 'streamable-http', url: absoluteUrl('/mcp') },
	authentication: { type: 'none' },
	capabilities: { tools: { listChanged: false } },
	tools: listTools().map((tool) => ({ name: tool.name, description: tool.description })),
};
export const GET = () => textResponse(JSON.stringify(card, null, 1), 'application/json');
