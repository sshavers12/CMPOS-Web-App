import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto("file:///home/user/CMPOS-Web-App/confident-concrete/qa/og-card.html");
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
await page.screenshot({ path: "/home/user/CMPOS-Web-App/confident-concrete/app/public/og.png", clip: { x: 0, y: 0, width: 1200, height: 630 } });
// 3:2 marketplace cover: same card letterboxed to 1200x800
await page.setViewportSize({ width: 1200, height: 800 });
await page.evaluate(() => { document.body.style.height = "800px"; document.querySelector(".wrap").style.top = "149px"; document.querySelector(".wrap").style.bottom = "149px"; document.querySelector(".loc").style.bottom = "149px"; });
await page.waitForTimeout(100);
await page.screenshot({ path: "/home/user/CMPOS-Web-App/confident-concrete/app/public/og-cover.png", clip: { x: 0, y: 0, width: 1200, height: 800 } });
for (const [name, size] of [["favicon.png", 64], ["apple-touch-icon.png", 180], ["icon-512.png", 512]]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<html><body style="margin:0;background:transparent"><img src="file:///home/user/CMPOS-Web-App/confident-concrete/app/public/favicon.svg" width="${size}" height="${size}" style="display:block"></body></html>`);
  await page.waitForTimeout(100);
  await page.screenshot({ path: "/home/user/CMPOS-Web-App/confident-concrete/app/public/" + name, omitBackground: true, clip: { x: 0, y: 0, width: size, height: size } });
}
await browser.close();
console.log("assets rendered");
