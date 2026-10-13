import { SITE, absoluteUrl } from '../lib/site.mjs';
import { textResponse } from '../lib/text-response.mjs';

const body = `# Authentication on ${SITE.name}

> Public reads need no credentials. There are no accounts, API keys or OAuth flows.

- Pages, Markdown mirrors, feeds, [llms.txt](${absoluteUrl('/llms.txt')}), the [JSON API](${absoluteUrl('/api/articles')}) and the [MCP server](${absoluteUrl('/mcp')}): anonymous, rate limited to 120 requests per 60 seconds per client on API paths.
- [Bulk corpus](${absoluteUrl('/api/v1/corpus')}): answers with an x402 payment challenge (HTTP 402). Payment verification is not wired yet, so the corpus is not released for any payment header.
`;
export const GET = () => textResponse(body, 'text/markdown');
