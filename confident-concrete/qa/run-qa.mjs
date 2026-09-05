// Confident Concrete acceptance QA. Usage: node run-qa.mjs <baseUrl> <outDir> [--no-shots]
// Requires playwright (global install or node_modules) with Chromium.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require("playwright")); } catch { ({ chromium } = require("playwright-core")); }

const base = (process.argv[2] || "http://127.0.0.1:8787").replace(/\/$/, "");
const out = process.argv[3] || "./qa-output";
const noShots = process.argv.includes("--no-shots");
const exe = process.env.CHROMIUM_PATH;
fs.mkdirSync(path.join(out, "shots"), { recursive: true });

const ROUTES = ["/", "/about", "/services", "/portfolio", "/consultation", "/upload", "/contact", "/qr"];
const WIDTHS = [320, 375, 390, 414, 768, 1024, 1280, 1440];
const INTERNAL = ["/owner", "/portal", "/workflow", "/before-after", "/nope-not-a-page"];

const report = { base, startedAt: new Date().toISOString(), http: [], responsive: [], actions: [], a11y: [], notes: [] };
const browser = await chromium.launch(exe ? { executablePath: exe } : {});

// 1. HTTP status of every route + internal routes + assets
for (const r of [...ROUTES, ...INTERNAL, "/robots.txt", "/sitemap.xml", "/qr-code.svg", "/og.png", "/favicon.svg"]) {
  const res = await fetch(base + r, { redirect: "manual" });
  const text = res.headers.get("content-type")?.includes("text/html") ? await res.text() : "";
  report.http.push({
    route: r,
    status: res.status,
    location: res.headers.get("location") || "",
    contentType: res.headers.get("content-type") || "",
    hasSignIn: /sign[- ]?in|log[- ]?in/i.test(text) && !/Sign in with/i.test("") ? /sign in|log in/i.test(text) : false,
    title: (text.match(/<title>([^<]*)<\/title>/) || [])[1] || "",
  });
}

// 2. Responsive checks + screenshots
for (const width of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
  for (const route of ROUTES) {
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts?.ready);
    await page.waitForTimeout(1300); // let the hero pour finish
    const metrics = await page.evaluate(() => {
      const de = document.documentElement;
      const vw = window.innerWidth;
      const offenders = [];
      const overflowText = [];
      const all = document.querySelectorAll("body *");
      for (const el of all) {
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden") continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) continue;
        if (r.right > vw + 1 || r.left < -1) {
          if (!el.closest(".sr-only, .skip-link, [hidden]") && !el.classList.contains("skip-link") && cs.position !== "fixed") {
            offenders.push({ tag: el.tagName.toLowerCase(), cls: el.className?.toString().slice(0, 60), left: Math.round(r.left), right: Math.round(r.right) });
          }
        }
        if (/^(H1|H2|H3|H4|P|A|BUTTON|LABEL|SPAN|DT|DD|LI|STRONG)$/.test(el.tagName) && cs.overflow === "visible" && el.scrollWidth > el.clientWidth + 2 && el.clientWidth > 0) {
          overflowText.push({ tag: el.tagName.toLowerCase(), text: (el.textContent || "").trim().slice(0, 40), sw: el.scrollWidth, cw: el.clientWidth });
        }
      }
      // overlap check among headings/labels/buttons: any pair intersecting by more than 4px both ways
      const nodes = [...document.querySelectorAll("h1,h2,h3,.btn,.label,.lead,p")].filter((n) => n.getClientRects().length);
      const overlaps = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (nodes[i].contains(nodes[j]) || nodes[j].contains(nodes[i])) continue;
          const a = nodes[i].getBoundingClientRect(), b = nodes[j].getBoundingClientRect();
          const ix = Math.min(a.right, b.right) - Math.max(a.left, b.left);
          const iy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
          if (ix > 4 && iy > 4) overlaps.push({ a: (nodes[i].textContent || "").trim().slice(0, 30), b: (nodes[j].textContent || "").trim().slice(0, 30), ix: Math.round(ix), iy: Math.round(iy) });
        }
      }
      const minFont = Math.min(...[...document.querySelectorAll("p, a, button, label, span, dd, dt, li")].filter((n) => (n.textContent || "").trim()).map((n) => parseFloat(getComputedStyle(n).fontSize)));
      return { scrollWidth: de.scrollWidth, clientWidth: de.clientWidth, bodyScrollWidth: document.body.scrollWidth, offenders: offenders.slice(0, 12), overflowText: overflowText.slice(0, 12), overlaps: overlaps.slice(0, 12), minFont, h1Count: document.querySelectorAll("h1").length, hasMain: Boolean(document.querySelector("main")) };
    });
    const shot = `${route === "/" ? "home" : route.slice(1)}-${width}.jpg`;
    if (!noShots) await page.screenshot({ path: path.join(out, "shots", shot), fullPage: true, type: "jpeg", quality: 82 });
    report.responsive.push({ route, width, ok: metrics.scrollWidth <= metrics.clientWidth && metrics.bodyScrollWidth <= metrics.clientWidth && metrics.offenders.length === 0 && metrics.overflowText.length === 0 && metrics.overlaps.length === 0, ...metrics, errors, shot });
    await page.close();
  }
  await ctx.close();
}

// 3. Link + button matrix at 390 (mobile, menu) and 1280 (desktop)
async function actionMatrix(width) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  for (const route of ROUTES) {
    const page = await ctx.newPage();
    await page.goto(base + route, { waitUntil: "networkidle" });
    // open menu on mobile so its links are counted
    const menuBtn = page.locator("button.menu-btn[aria-expanded]");
    if (width < 900 && (await menuBtn.count())) {
      await menuBtn.first().click();
      const panel = page.locator("#site-menu");
      const opened = await panel.isVisible();
      report.actions.push({ width, route, kind: "button", label: "Menu (open)", expected: "opens site menu", result: opened ? "PASS" : "FAIL" });
      if (route === "/") { await page.waitForTimeout(400); await page.screenshot({ path: path.join(out, "shots", `menu-open-${width}.jpg`), type: "jpeg", quality: 82 }); }
      await page.keyboard.press("Escape");
      const closed = !(await panel.count()) || !(await panel.isVisible());
      report.actions.push({ width, route, kind: "key", label: "Escape closes menu", expected: "menu closes", result: closed ? "PASS" : "FAIL" });
      await menuBtn.first().click();
    }
    const links = await page.evaluate(() => [...document.querySelectorAll("a[href]")].filter((a) => a.getClientRects().length && getComputedStyle(a).visibility !== "hidden").map((a) => ({ href: a.getAttribute("href"), text: (a.getAttribute("aria-label") || a.textContent || "").trim().replace(/\s+/g, " ").slice(0, 50), download: a.hasAttribute("download"), where: a.closest("header") ? "header" : a.closest("footer") ? "footer" : a.closest("#site-menu") ? "menu" : "body" })));
    const seen = new Set();
    for (const l of links) {
      const key = `${l.where}|${l.href}|${l.text}`;
      if (seen.has(key)) continue;
      seen.add(key);
      let result = "PASS", detail = "";
      if (l.href.startsWith("#")) {
        const target = await page.evaluate((h) => Boolean(document.getElementById(h.slice(1))), l.href);
        result = target ? "PASS" : "FAIL"; detail = target ? "in-page target exists" : "missing target";
      } else if (l.download) {
        const res = await fetch(base + l.href); result = res.ok ? "PASS" : "FAIL"; detail = `download ${res.status} ${res.headers.get("content-type")}`;
      } else if (l.href.startsWith("/")) {
        const res = await fetch(base + l.href.split("#")[0], { redirect: "manual" });
        result = res.status === 200 || (res.status >= 300 && res.status < 400) ? "PASS" : "FAIL"; detail = `HTTP ${res.status}`;
        if (l.href.includes("#")) { const id = l.href.split("#")[1]; const p2 = await ctx.newPage(); await p2.goto(base + l.href.split("#")[0]); const ok = await p2.evaluate((i) => Boolean(document.getElementById(i)), id); await p2.close(); if (!ok) { result = "FAIL"; detail += " (anchor missing)"; } }
      } else { result = "SKIP"; detail = "external"; }
      report.actions.push({ width, route, kind: "link", where: l.where, label: l.text || l.href, href: l.href, expected: l.href.startsWith("#") ? "scrolls to section" : "navigates", result, detail });
    }
    await page.close();
  }
  await ctx.close();
}
await actionMatrix(390);
await actionMatrix(1280);

// 4. Interactive tools: consultation planner, upload prep, copy link, QR download
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, permissions: ["clipboard-read", "clipboard-write"] });
  const page = await ctx.newPage();
  await page.goto(base + "/consultation", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Build my request summary" }).click();
  const err = await page.locator(".field__error").count();
  report.actions.push({ width: 390, route: "/consultation", kind: "button", label: "Build my request summary (empty)", expected: "inline validation", result: err > 0 ? "PASS" : "FAIL", detail: `${err} errors shown` });
  await page.getByLabel("Your name").fill("Test Visitor");
  await page.getByLabel("Residential").check();
  await page.getByLabel("What are you working on?").fill("Cracked front walk, about 40 feet, wants replacement before winter.");
  await page.getByRole("button", { name: "Build my request summary" }).click();
  const summaryVisible = await page.locator(".summary").isVisible();
  report.actions.push({ width: 390, route: "/consultation", kind: "button", label: "Build my request summary (filled)", expected: "summary appears", result: summaryVisible ? "PASS" : "FAIL" });
  await page.getByRole("button", { name: "Copy summary" }).click();
  await page.waitForTimeout(300);
  const copiedLabel = await page.getByRole("button", { name: /Copied|Copy summary/ }).textContent();
  const clip = await page.evaluate(() => navigator.clipboard.readText().catch(() => ""));
  report.actions.push({ width: 390, route: "/consultation", kind: "button", label: "Copy summary", expected: "clipboard holds summary + feedback", result: clip.includes("CONSULTATION REQUEST") && /Copied/.test(copiedLabel || "") ? "PASS" : "FAIL", detail: `button reads "${(copiedLabel || "").trim()}"` });
  const [dl] = await Promise.all([page.waitForEvent("download", { timeout: 5000 }).catch(() => null), page.getByRole("button", { name: "Download as text" }).click()]);
  report.actions.push({ width: 390, route: "/consultation", kind: "button", label: "Download as text", expected: "text file download", result: dl ? "PASS" : "FAIL", detail: dl ? dl.suggestedFilename() : "no download event" });
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(200); await page.screenshot({ path: path.join(out, "shots", "consultation-summary-390.jpg"), fullPage: true, type: "jpeg", quality: 82 });

  await page.goto(base + "/upload", { waitUntil: "networkidle" });
  const png = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAF0lEQVR42mP8z8BQz0AEYBxVSF+FAAB2sQ7yI8QmpgAAAABJRU5ErkJggg==", "base64");
  await page.locator("input[type=file]").setInputFiles([{ name: "before-walk.png", mimeType: "image/png", buffer: png }, { name: "plan.pdf", mimeType: "application/pdf", buffer: Buffer.from("%PDF-1.4 test") }]);
  await page.waitForTimeout(300);
  const fileCount = await page.locator(".file").count();
  report.actions.push({ width: 390, route: "/upload", kind: "input", label: "Choose files", expected: "local previews appear", result: fileCount === 2 ? "PASS" : "FAIL", detail: `${fileCount} previews` });
  await page.locator(".file select").first().selectOption("After");
  const status = await page.locator(".status").first().textContent();
  report.actions.push({ width: 390, route: "/upload", kind: "select", label: "Capture stage", expected: "status updates", result: /1 after/.test(status || "") ? "PASS" : "FAIL", detail: status?.trim() });
  await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(200); await page.screenshot({ path: path.join(out, "shots", "upload-previews-390.jpg"), fullPage: true, type: "jpeg", quality: 82 });
  await page.getByRole("button", { name: "Remove" }).first().click();
  const afterRemove = await page.locator(".file").count();
  report.actions.push({ width: 390, route: "/upload", kind: "button", label: "Remove", expected: "preview removed", result: afterRemove === 1 ? "PASS" : "FAIL" });
  await page.getByRole("button", { name: "Clear all previews" }).click();
  const afterClear = await page.locator(".file").count();
  report.actions.push({ width: 390, route: "/upload", kind: "button", label: "Clear all previews", expected: "list empties", result: afterClear === 0 ? "PASS" : "FAIL" });

  await page.goto(base + "/qr", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Copy link" }).click();
  await page.waitForTimeout(300);
  const clip2 = await page.evaluate(() => navigator.clipboard.readText().catch(() => ""));
  report.actions.push({ width: 390, route: "/qr", kind: "button", label: "Copy link", expected: "clipboard holds /qr URL", result: clip2.endsWith("/qr") ? "PASS" : "FAIL", detail: clip2 });
  const [dl2] = await Promise.all([page.waitForEvent("download", { timeout: 5000 }).catch(() => null), page.getByRole("link", { name: "Download QR code" }).click()]);
  report.actions.push({ width: 390, route: "/qr", kind: "link", label: "Download QR code", expected: "SVG download", result: dl2 ? "PASS" : "FAIL", detail: dl2 ? dl2.suggestedFilename() : "no download event" });
  await page.goto(base + "/contact", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Copy site link" }).click();
  await page.waitForTimeout(300);
  const clip3 = await page.evaluate(() => navigator.clipboard.readText().catch(() => ""));
  report.actions.push({ width: 390, route: "/contact", kind: "button", label: "Copy site link", expected: "clipboard holds site URL", result: clip3 === base + "/" ? "PASS" : "FAIL", detail: clip3 });
  await ctx.close();
}

// 5. Keyboard + focus + reduced motion + 404
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(base + "/", { waitUntil: "networkidle" });
  const focusTrail = [];
  for (let i = 0; i < 9; i++) {
    await page.keyboard.press("Tab");
    focusTrail.push(await page.evaluate(() => { const el = document.activeElement; if (!el) return "none"; const cs = getComputedStyle(el); return `${el.tagName.toLowerCase()}:${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 24)}|outline=${cs.outlineStyle}/${cs.outlineWidth}`; }));
  }
  report.a11y.push({ check: "keyboard tab order (home, desktop)", result: focusTrail[0].startsWith("a:Skip") ? "PASS" : "FAIL", detail: focusTrail });
  await page.keyboard.press("Shift+Tab"); // no-op check
  const contrast = await page.evaluate(() => {
    function lum(rgb) { const c = rgb.match(/\d+/g).slice(0, 3).map((v) => v / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; }
    function bg(el) { let e = el; while (e) { const c = getComputedStyle(e).backgroundColor; if (c && !c.startsWith("rgba(0, 0, 0, 0)") && c !== "transparent") return c; e = e.parentElement; } return "rgb(237, 234, 228)"; }
    const bad = [];
    for (const el of document.querySelectorAll("p, a, button, h1, h2, h3, dt, dd, span.label, li")) {
      if (!(el.textContent || "").trim() || !el.getClientRects().length) continue;
      const cs = getComputedStyle(el); const fg = cs.color; const b = bg(el);
      const ratio = (Math.max(lum(fg), lum(b)) + 0.05) / (Math.min(lum(fg), lum(b)) + 0.05);
      const large = parseFloat(cs.fontSize) >= 24 || (parseFloat(cs.fontSize) >= 18.66 && parseInt(cs.fontWeight) >= 700);
      if (ratio < (large ? 3 : 4.5)) bad.push({ text: (el.textContent || "").trim().slice(0, 30), ratio: ratio.toFixed(2), fg, b });
    }
    return bad.slice(0, 10);
  });
  report.a11y.push({ check: "text contrast (home, computed, WCAG AA)", result: contrast.length === 0 ? "PASS" : "FAIL", detail: contrast });
  const rm = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const p3 = await rm.newPage();
  await p3.goto(base + "/", { waitUntil: "networkidle" });
  const anim = await p3.evaluate(() => document.getAnimations().length);
  await p3.screenshot({ path: path.join(out, "shots", "home-390-reduced-motion.jpg"), fullPage: false, type: "jpeg", quality: 82 });
  report.a11y.push({ check: "prefers-reduced-motion: no running animations", result: anim === 0 ? "PASS" : "FAIL", detail: `${anim} animations` });
  await rm.close();
  await page.goto(base + "/owner", { waitUntil: "networkidle" });
  const nf = await page.locator("h1").textContent();
  report.a11y.push({ check: "internal route /owner is a branded 404, no sign-in wall", result: /isn’t here|isn't here/.test(nf || "") ? "PASS" : "FAIL", detail: nf });
  await page.screenshot({ path: path.join(out, "shots", "404-owner-1280.jpg"), fullPage: true, type: "jpeg", quality: 82 });
  await ctx.close();
}

await browser.close();
report.finishedAt = new Date().toISOString();
const failures = { responsive: report.responsive.filter((r) => !r.ok), actions: report.actions.filter((a) => a.result === "FAIL"), a11y: report.a11y.filter((a) => a.result === "FAIL"), http: report.http.filter((h) => ROUTES.includes(h.route) && h.status !== 200) };
report.summary = { responsiveChecks: report.responsive.length, responsiveFailures: failures.responsive.length, actionChecks: report.actions.length, actionFailures: failures.actions.length, a11yFailures: failures.a11y.length, httpFailures: failures.http.length, consoleErrors: report.responsive.flatMap((r) => r.errors).length };
fs.writeFileSync(path.join(out, "report.json"), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report.summary));
if (failures.responsive.length) console.log("RESPONSIVE FAILURES:", JSON.stringify(failures.responsive.map((r) => ({ route: r.route, width: r.width, sw: r.scrollWidth, cw: r.clientWidth, off: r.offenders, ot: r.overflowText, ov: r.overlaps })), null, 1));
if (failures.actions.length) console.log("ACTION FAILURES:", JSON.stringify(failures.actions, null, 1));
if (failures.a11y.length) console.log("A11Y FAILURES:", JSON.stringify(failures.a11y, null, 1));
if (failures.http.length) console.log("HTTP FAILURES:", JSON.stringify(failures.http, null, 1));
const errs = report.responsive.filter((r) => r.errors.length).map((r) => ({ route: r.route, width: r.width, errors: r.errors.slice(0, 3) }));
if (errs.length) console.log("CONSOLE ERRORS:", JSON.stringify(errs.slice(0, 6), null, 1));
