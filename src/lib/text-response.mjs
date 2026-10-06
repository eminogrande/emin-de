// Build-time endpoint helper: plain text body with an explicit content type.
export const textResponse = (body, type) =>
	new Response(body, { headers: { 'content-type': `${type}; charset=utf-8`, 'cache-control': 'public, max-age=600' } });
