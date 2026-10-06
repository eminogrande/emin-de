import config from '../../site.config.mjs';
const letter = config.name.replace(/^www\./, '')[0].toUpperCase();
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#4f46e5"/><text x="32" y="44" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="36" font-weight="700" fill="#fff">${letter}</text></svg>`;
export const GET = () => new Response(svg, { headers: { 'content-type': 'image/svg+xml' } });
export { svg };
