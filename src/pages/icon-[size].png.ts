// PWA / Android icons from the same 🤔 SVG.
import sharp from 'sharp';
import { svg } from './favicon.svg.ts';
export const getStaticPaths = () => [{ params: { size: '192' } }, { params: { size: '512' } }];
export const GET = async ({ params }: { params: { size: string } }) => {
	const n = Number(params.size);
	return new Response(await sharp(Buffer.from(svg)).resize(n, n).png().toBuffer(), { headers: { 'content-type': 'image/png' } });
};
