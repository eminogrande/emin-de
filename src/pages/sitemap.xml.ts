import { sitemapXml } from '../lib/surfaces.mjs';
import { textResponse } from '../lib/text-response.mjs';
export const GET = () => textResponse(sitemapXml(), 'application/xml');
