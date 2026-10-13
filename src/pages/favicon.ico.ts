// Browsers request /favicon.ico regardless of <link rel=icon>. A 32x32 PNG in
// an .ico path is accepted by every current browser.
import sharp from 'sharp';
import { svg } from './favicon.svg.ts';
export const GET = async () => new Response(await sharp(Buffer.from(svg)).resize(32, 32).png().toBuffer(), { headers: { 'content-type': 'image/x-icon' } });
