// Mesures type « Core Web Vitals » avec processeur ralenti (x4) et réseau 4G lent simulé.
const { chromium } = require('playwright-core');
const base = process.argv[2] || 'http://localhost:8833';
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  for (const [label, vp, mob] of [['mobile', { width: 390, height: 844 }, true], ['bureau', { width: 1440, height: 900 }, false]]) {
    for (const p of ['/', '/vehicules', '/vehicules/peugeot-3008-bluehdi-130-gt-2021', '/vendre-ma-voiture']) {
      const ctx = await browser.newContext({ viewport: vp, isMobile: mob, hasTouch: mob, deviceScaleFactor: mob ? 3 : 1 });
      const page = await ctx.newPage();
      const cdp = await ctx.newCDPSession(page);
      await cdp.send('Network.enable');
      await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6 * 1024 * 1024 / 8, uploadThroughput: 750 * 1024 / 8 });
      if (mob) await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
      await page.addInitScript(() => {
        window.__m = { lcp: 0, cls: 0, tbt: 0, lcpEl: '' };
        new PerformanceObserver(l => { for (const e of l.getEntries()) { window.__m.lcp = e.startTime; window.__m.lcpEl = (e.element && (e.element.className || e.element.tagName)) + ''; } }).observe({ type: 'largest-contentful-paint', buffered: true });
        new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__m.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
        new PerformanceObserver(l => { for (const e of l.getEntries()) window.__m.tbt += Math.max(0, e.duration - 50); }).observe({ type: 'longtask', buffered: true });
      });
      const t0 = Date.now();
      await page.goto(base + p, { waitUntil: 'load', timeout: 60000 });
      const loadMs = Date.now() - t0;
      await page.waitForTimeout(p === '/' ? 5000 : 3000);
      const m = await page.evaluate(() => { const n = performance.getEntriesByType('navigation')[0]; const fcp = performance.getEntriesByName('first-contentful-paint')[0]; return Object.assign({}, window.__m, { fcp: fcp ? fcp.startTime : 0, dcl: n.domContentLoadedEventEnd }); });
      console.log(`${label} ${p} : FCP ${(m.fcp / 1000).toFixed(2)} s, LCP ${(m.lcp / 1000).toFixed(2)} s (${m.lcpEl.slice(0, 30)}), CLS ${m.cls.toFixed(3)}, TBT ${Math.round(m.tbt)} ms, load ${(loadMs / 1000).toFixed(1)} s`);
      await ctx.close();
    }
  }
  await browser.close();
})();
