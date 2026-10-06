// Permanent redirects (old slugs -> current URLs). Generated JSON, shared by
// the Cloudflare Worker and the Node origin.
import table from '../generated/redirects.json' with { type: 'json' };

export function redirectTarget(pathname, origin) {
	const to = table[pathname] || table[`${pathname}/`];
	if (!to) return null;
	return /^https?:\/\//.test(to) ? to : `${origin}${to}`;
}
