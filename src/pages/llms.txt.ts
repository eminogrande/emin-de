import { llmsTxt } from '../lib/surfaces.mjs';
import { textResponse } from '../lib/text-response.mjs';
export const GET = () => textResponse(llmsTxt(), 'text/markdown');
