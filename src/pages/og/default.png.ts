import config from '../../../site.config.mjs';
import { ogPng } from '../../lib/og.mjs';
export const GET = async () => new Response(await ogPng({ title: config.tagline, kicker: config.name }), { headers: { 'content-type': 'image/png' } });
