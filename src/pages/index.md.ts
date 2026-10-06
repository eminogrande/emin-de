import { postsIn } from '../lib/corpus.mjs';
import { postLine } from '../lib/surfaces.mjs';
import { SITE, SITE_DEFINITION, SITE_TAGLINE, AUTHOR_NAME, absoluteUrl } from '../lib/site.mjs';
import { DEFAULT_LANG } from '../lib/paths.mjs';
import { textResponse } from '../lib/text-response.mjs';

const body = [
	`# ${SITE.name}`,
	'',
	`> ${SITE_DEFINITION}`,
	'',
	`${SITE_TAGLINE} Written by ${AUTHOR_NAME}.`,
	'',
	'## Latest posts',
	'',
	...postsIn(DEFAULT_LANG).slice(0, 10).map(postLine),
	'',
	'## For agents',
	'',
	`- [llms.txt](${absoluteUrl('/llms.txt')}): the site map for language models.`,
	`- [RSS](${absoluteUrl('/rss.xml')}), [Atom](${absoluteUrl('/atom.xml')}), [JSON Feed](${absoluteUrl('/feed.json')}).`,
	`- [JSON API](${absoluteUrl('/api/articles')}): every post, no credentials.`,
	`- [Developer docs](${absoluteUrl('/developers')}): API, MCP and examples.`,
	'',
].join('\n');

export const GET = () => textResponse(body, 'text/markdown');
