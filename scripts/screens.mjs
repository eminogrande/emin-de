// Full-page screenshots for design review (Playwright with system Chrome).
//   node scripts/screens.mjs <base> <outDir> <name:path>...
import { chromium } from 'playwright';
const [base, out, ...pairs] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
for (const pair of pairs) {
	const [name, path] = pair.split('=');
	for (const [label, opts] of [['1440', { viewport: { width: 1440, height: 900 } }], ['390', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }]]) {
		const ctx = await browser.newContext(opts);
		const page = await ctx.newPage();
		await page.goto(base + path, { waitUntil: 'networkidle', timeout: 30000 });
		await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } window.scrollTo(0, 0); });
		await page.waitForTimeout(400);
		const m = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth, small: [...document.querySelectorAll('body *')].filter((e) => e.childNodes.length && [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && parseFloat(getComputedStyle(e).fontSize) < 17 && e.offsetParent !== null).map((e) => e.tagName + '.' + e.className + ':' + getComputedStyle(e).fontSize).slice(0, 5) }));
		await page.screenshot({ path: `${out}/v2-${name}-${label}.png`, fullPage: true });
		console.log(name, label, JSON.stringify(m));
		await ctx.close();
	}
}
await browser.close();
