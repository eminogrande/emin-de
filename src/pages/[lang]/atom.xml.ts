// Per-language feed, only for non-default languages that have posts.
import { atomFeed } from '../../lib/surfaces.mjs';
import { activeLangs } from '../../lib/corpus.mjs';
import { DEFAULT_LANG } from '../../lib/paths.mjs';
import { textResponse } from '../../lib/text-response.mjs';
export const getStaticPaths = () => activeLangs.filter((l) => l !== DEFAULT_LANG).map((lang) => ({ params: { lang } }));
export const GET = ({ params }: { params: { lang: string } }) => textResponse(atomFeed(params.lang), 'application/atom+xml');
