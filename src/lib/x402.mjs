// The one paid endpoint on emin.de: GET /api/v1/corpus — the complete article
// corpus (every article's full Markdown) as a single JSON document.
//
// HONESTY / VERIFICATION BOUNDARY — read this before enabling anything:
// This module issues a real x402 challenge and performs a STRUCTURAL-ONLY
// inspection of a presented payment header (see inspectPaymentHeader). It does
// not verify a signature against a facilitator, does not touch any chain, and
// does not settle anything. Therefore the paid path is CLOSED: a request that
// carries a well-formed payment header still receives HTTP 402 with
// error "payment_verification_unavailable". The corpus is never served for a
// payment that was not actually verified. Wire a facilitator
// (see docs/mcp-and-x402.md) before changing that.

import { AUTHOR_NAME, SITE_DEFINITION, SITE_NAME, absoluteUrl } from './site.mjs';
import { articleMarkdown, loadArticles, rateLimitHeaders, requestUrl, sendJson } from './articles-api.mjs';

export const CORPUS_PATH = '/api/v1/corpus';

// --- Payment facts. These MUST equal what /openapi.json declares. ---------
// x-payment-info: { price: { mode: 'fixed', amount: '0.05', currency: 'USDC' },
//                   protocols: [{ x402: { scheme: 'exact', network: 'eip155:8453' } }] }
export const X402_PRICE_USDC = '0.05'; // human amount, 6-decimal USDC
export const X402_AMOUNT_ATOMIC = '50000'; // 0.05 USDC = 50_000 atomic units
export const X402_SCHEME = 'exact';
export const X402_NETWORK = 'eip155:8453'; // Base mainnet, CAIP-2 (402 body + PAYMENT-REQUIRED)
export const X402_NETWORK_V1 = 'base'; // x402 v1 body label for the same network
export const X402_ASSET_LABEL = 'USDC';
export const X402_ASSET_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'; // USDC on Base
export const X402_MAX_TIMEOUT_SECONDS = 300;

// Recipient wallet. DEPLOYMENT MUST SET X402_RECIPIENT to the real receiving
// address. The default below is an all-zero placeholder: it is deliberately not
// a usable wallet, is NOT copied from any other project, and no private key
// exists or belongs anywhere in this repository.
export const X402_RECIPIENT_ENV = 'X402_RECIPIENT';
export const X402_RECIPIENT_PLACEHOLDER = '0x0000000000000000000000000000000000000000';

export function x402Recipient() {
	return process.env[X402_RECIPIENT_ENV] || X402_RECIPIENT_PLACEHOLDER;
}

export function isRecipientConfigured() {
	return Boolean(process.env[X402_RECIPIENT_ENV]);
}

export const CORPUS_DESCRIPTION =
	'The complete emin.de article corpus in one JSON document: every published article with its full Markdown body, topics, dates and word count. Bulk machine access for indexing, training-free retrieval and archival.';

export async function buildCorpus() {
	const { mod, articles, topics } = await loadArticles();
	return {
		site: SITE_NAME,
		definition: SITE_DEFINITION,
		author: AUTHOR_NAME,
		canonical: absoluteUrl('/'),
		count: articles.length,
		totalWords: articles.reduce((total, article) => total + (article.wordCount || 0), 0),
		topics,
		articles: articles.map((article) => ({
			slug: article.slug,
			title: article.title,
			description: article.description,
			tldr: article.tldr,
			publishedAt: article.publishedAt,
			modifiedAt: article.modifiedAt,
			topics: article.topics || [],
			wordCount: article.wordCount,
			url: absoluteUrl(article.path || `/posts/${article.slug}`),
			markdown: articleMarkdown(article, mod),
		})),
	};
}

// x402 v1 challenge body (the shape the 402 response body uses).
export function buildChallenge(url) {
	const payTo = x402Recipient();
	return {
		x402Version: 1,
		error: 'payment_required',
		resource: url,
		accepts: [
			{
				scheme: X402_SCHEME,
				network: X402_NETWORK_V1,
				asset: X402_ASSET_LABEL,
				maxAmountRequired: X402_AMOUNT_ATOMIC,
				payTo,
				resource: url,
				description: CORPUS_DESCRIPTION,
				mimeType: 'application/json',
				maxTimeoutSeconds: X402_MAX_TIMEOUT_SECONDS,
				extra: { name: X402_ASSET_LABEL, version: '2' },
			},
		],
		price: { amount: X402_PRICE_USDC, currency: X402_ASSET_LABEL, mode: 'fixed' },
		settlement: 'not_implemented',
		note: 'Challenge only. This server does not verify or settle payments yet, so the corpus is not released for any header. See /docs/mcp-and-x402. Recipient must be set via the X402_RECIPIENT environment variable before this endpoint can take money.',
	};
}

// x402 v2 payload, base64-encoded into the PAYMENT-REQUIRED response header.
export function buildPaymentRequiredHeader(url) {
	const payTo = x402Recipient();
	const paymentRequired = {
		x402Version: 2,
		error: 'payment_required',
		resource: { url, description: CORPUS_DESCRIPTION, mimeType: 'application/json' },
		accepts: [
			{
				scheme: X402_SCHEME,
				network: X402_NETWORK,
				amount: X402_AMOUNT_ATOMIC,
				asset: X402_ASSET_ADDRESS,
				payTo,
				maxTimeoutSeconds: X402_MAX_TIMEOUT_SECONDS,
				extra: { name: X402_ASSET_LABEL, version: '2' },
			},
		],
		extensions: {},
	};
	return Buffer.from(JSON.stringify(paymentRequired)).toString('base64');
}

function decode(raw) {
	try {
		return { value: JSON.parse(Buffer.from(raw.trim(), 'base64').toString('utf8')) };
	} catch {
		try {
			return { value: JSON.parse(raw) };
		} catch (error) {
			return { error: error.message };
		}
	}
}

// Structural inspection ONLY. Nothing here proves a payment exists, is funded,
// or was signed by the payer. Every check is shape-level.
export function inspectPaymentHeader(raw) {
	const inspection = { header_present: Boolean(raw), decoded: false, structurally_valid: false, checks: {}, reasons: [] };
	if (!raw) return inspection;

	const { value, error } = decode(raw);
	if (error || !value || typeof value !== 'object') {
		inspection.reasons.push('header is not base64-encoded JSON');
		return inspection;
	}
	inspection.decoded = true;

	const payload = value.payload ?? {};
	const authorization = payload.authorization ?? {};
	const checks = inspection.checks;
	checks.x402Version = value.x402Version === 1 || value.x402Version === 2;
	checks.scheme_exact = value.scheme === X402_SCHEME;
	checks.network_supported = value.network === X402_NETWORK || value.network === X402_NETWORK_V1;
	checks.signature_shape = typeof payload.signature === 'string' && /^0x[0-9a-fA-F]{130}$/.test(payload.signature);
	checks.pay_to_matches = String(authorization.to || '').toLowerCase() === x402Recipient().toLowerCase();
	checks.amount_sufficient = /^\d+$/.test(String(authorization.value ?? '')) && BigInt(authorization.value) >= BigInt(X402_AMOUNT_ATOMIC);

	inspection.structurally_valid = Object.values(checks).every(Boolean);
	for (const [name, passed] of Object.entries(checks)) if (!passed) inspection.reasons.push(`failed: ${name}`);
	inspection.note = 'Structural shape check only. No signature recovery, no facilitator call, no on-chain read: this does not prove payment.';
	return inspection;
}

function paymentHeader(req) {
	const value = req.headers['payment-signature'] || req.headers['x-payment'];
	return Array.isArray(value) ? value[0] : value;
}

export async function handleCorpus(req, res, ctx = {}) {
	const { pathname } = requestUrl(req, ctx);
	if (pathname !== CORPUS_PATH && pathname !== `${CORPUS_PATH}/`) return false;

	if (req.method !== 'GET' && req.method !== 'HEAD') {
		return sendJson(
			req,
			res,
			405,
			{ error: 'method_not_allowed', message: `${req.method} is not supported on ${CORPUS_PATH}; use GET.` },
			{ allow: 'GET, HEAD', ...rateLimitHeaders(ctx) }
		);
	}

	const url = absoluteUrl(CORPUS_PATH);
	const raw = paymentHeader(req);
	const header = { 'payment-required': buildPaymentRequiredHeader(url), ...rateLimitHeaders(ctx) };

	// No payment header at all: the honest, unpaid x402 challenge.
	if (!raw) return sendJson(req, res, 402, buildChallenge(url), header);

	// A payment header is present but CANNOT be verified by this server, so the
	// paid path stays closed. Same challenge, different error, inspection shown.
	const inspection = inspectPaymentHeader(raw);
	return sendJson(
		req,
		res,
		402,
		{
			...buildChallenge(url),
			error: 'payment_verification_unavailable',
			payment_inspection: inspection,
			note: 'A payment header was presented. This server has no facilitator or on-chain verifier wired, so no payment can be confirmed and the corpus is not released. The challenge is unchanged and valid to pay once verification exists.',
		},
		header
	);
}
