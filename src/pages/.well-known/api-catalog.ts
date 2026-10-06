// RFC 9727 API catalog as an RFC 9264 linkset.
import { absoluteUrl } from '../../lib/site.mjs';
import { textResponse } from '../../lib/text-response.mjs';
const body = {
	linkset: [
		{
			anchor: absoluteUrl('/api/articles'),
			'service-desc': [{ href: absoluteUrl('/openapi.json'), type: 'application/json' }],
			'service-doc': [{ href: absoluteUrl('/developers'), type: 'text/html' }, { href: absoluteUrl('/auth.md'), type: 'text/markdown' }],
		},
	],
};
export const GET = () => textResponse(JSON.stringify(body, null, 1), 'application/linkset+json');
