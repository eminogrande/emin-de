// iOS home-screen and share-sheet icon: 🤔 on the site's paper colour, 180x180.
import sharp from 'sharp';
import { svg } from './favicon.svg.ts';
export const GET = async () => {
	const emoji = await sharp(Buffer.from(svg)).resize(140, 140).png().toBuffer();
	const png = await sharp({ create: { width: 180, height: 180, channels: 4, background: '#fdf6e3' } }).composite([{ input: emoji, top: 20, left: 20 }]).png().toBuffer();
	return new Response(png, { headers: { 'content-type': 'image/png' } });
};
