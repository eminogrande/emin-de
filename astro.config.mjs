// @ts-check
import { defineConfig } from 'astro/config';

// Static output, served by server.mjs. The Node server is what makes
// Link headers, Accept-based markdown negotiation and x402 possible;
// a pure static host can never pass those agent-readiness checks.
export default defineConfig({
	site: 'https://emin.de',
	build: { inlineStylesheets: 'never' },
	vite: { build: { assetsInlineLimit: 0 } },
});
