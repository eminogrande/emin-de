import { llmsFullTxt } from '../lib/surfaces.mjs';
import { textResponse } from '../lib/text-response.mjs';
export const GET = () => textResponse(llmsFullTxt(), 'text/plain');
