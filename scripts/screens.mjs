// Screenshots + layout checks for design review (Playwright with system Chrome).
//   node scripts/screens.mjs <base> <outDir> <prefix> <name=path>...
// Per page and width: horizontal overflow (scrollWidth vs innerWidth), text
// below 17px, and how many Basically asides render. Screenshots are viewport
// shots (top of page) plus a full-page shot.
import { chromium } from 'playwright';
const [base, out, prefix, ...pairs] = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
let bad = 0;
for (const pair of pairs) {
	const [name, path] = pair.split('=');
	for (const [label, opts] of [['1440', { viewport: { width: 1440, height: 900 } }], ['390', { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true }]]) {
		const ctx = await browser.newContext(opts);
		const page = await ctx.newPage();
		await page.goto(base + path, { waitUntil: 'load', timeout: 30000 });
		await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 25)); } window.scrollTo(0, 0); });
		await page.waitForTimeout(300);
		const m = await page.evaluate(() => ({
			sw: document.documentElement.scrollWidth,
			iw: innerWidth,
			wide: [...document.querySelectorAll('main *')].filter((e) => e.getBoundingClientRect().right > innerWidth + 1 && getComputedStyle(e).position !== 'absolute').map((e) => e.tagName + '.' + e.className).slice(0, 5),
			small: [...document.querySelectorAll('body *')].filter((e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && parseFloat(getComputedStyle(e).fontSize) < 17 && e.offsetParent !== null).map((e) => e.tagName + '.' + e.className + ':' + getComputedStyle(e).fontSize).slice(0, 5),
			basically: document.querySelectorAll('.art-story__basically').length,
			white: [...document.querySelectorAll('body, body *')].filter((e) => getComputedStyle(e).backgroundColor === 'rgb(255, 255, 255)').length,
		}));
		await page.screenshot({ path: `${out}/${prefix}-${name}-${label}.png`, fullPage: false });
		await page.screenshot({ path: `${out}/${prefix}-${name}-${label}-full.png`, fullPage: true });
		const ok = m.sw <= m.iw && !m.small.length && !m.white;
		if (!ok) bad += 1;
		console.log(ok ? 'OK  ' : 'FAIL', name, label, JSON.stringify(m));
		await ctx.close();
	}
}
await browser.close();
process.exit(bad ? 1 : 0);
