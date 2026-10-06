import { atomFeed } from '../lib/surfaces.mjs';
import { DEFAULT_LANG } from '../lib/paths.mjs';
import { textResponse } from '../lib/text-response.mjs';
export const GET = () => textResponse(atomFeed(DEFAULT_LANG), 'application/atom+xml');
