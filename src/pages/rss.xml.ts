import { rssFeed } from '../lib/surfaces.mjs';
import { DEFAULT_LANG } from '../lib/paths.mjs';
import { textResponse } from '../lib/text-response.mjs';
export const GET = () => textResponse(rssFeed(DEFAULT_LANG), 'application/rss+xml');
