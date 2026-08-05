// Render a fixed-size 1600x900 diagram page to PNG in both themes at 2x.
//
//   node scripts/render-diagram.mjs                          diagrams/social-flow
//   node scripts/render-diagram.mjs <page.html> <out-prefix>
//
// Writes <out-prefix>-light.png and <out-prefix>-dark.png. The page declares
// its palette with light-dark(), so the theme is picked per pass with
// emulated prefers-color-scheme rather than a second stylesheet.
//
// Needs a Chromium, found the same way as shots.mjs.

import { chromium } from 'playwright-core';
import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

function findChromium() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  // Playwright's own resolution respects PLAYWRIGHT_BROWSERS_PATH, XDG_CACHE_HOME
  // and the platform cache locations; it reports where the browser would live
  // whether or not it is installed, hence the existsSync.
  try {
    const p = chromium.executablePath();
    if (p && existsSync(p)) return p;
  } catch {}
  for (const p of [
    '/usr/bin/google-chrome-stable', '/usr/bin/google-chrome', '/usr/bin/chromium',
    '/usr/bin/chromium-browser', '/snap/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ]) if (existsSync(p)) return p;
  throw new Error('No Chromium found. Set CHROME_PATH to a Chrome/Chromium binary.');
}

const html = resolve(process.argv[2] ?? 'diagrams/social-flow.html');
const out = resolve(process.argv[3] ?? html.replace(/\.html$/, ''));
if (!existsSync(html)) throw new Error(`No such page: ${html}`);
const isSocialFlow = out === resolve('diagrams/social-flow');

const browser = await chromium.launch({ executablePath: findChromium() });
try {
  for (const theme of ['light', 'dark']) {
    const ctx = await browser.newContext({
      viewport: { width: 1600, height: 900 },
      deviceScaleFactor: 2,
      colorScheme: theme,
    });
    try {
      const page = await ctx.newPage();
      await page.goto(pathToFileURL(html).href);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `${out}-${theme}.png` });
    } finally {
      await ctx.close();
    }
    console.log(`${out}-${theme}.png`);

    // The blog embeds this diagram (StageFlow.astro), so the copies under
    // public/ have to track the render or the post quietly goes stale.
    if (isSocialFlow) {
      const site = resolve(`public/blog/create-pipeline-${theme}.png`);
      copyFileSync(`${out}-${theme}.png`, site);
      console.log(site);
    }
  }

  // The post's share card (ogImage in its frontmatter): the light render scaled
  // into the 1200x630 OG frame, letterboxed 40px a side to bridge 16:9 to 1.91:1.
  if (isSocialFlow) {
    const ctx = await browser.newContext({
      viewport: { width: 1200, height: 630 },
      deviceScaleFactor: 2,
      colorScheme: 'light',
    });
    const og = resolve('public/blog/from-brief-to-gerbers-og.png');
    try {
      const page = await ctx.newPage();
      await page.goto(pathToFileURL(html).href);
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => {
        const c = document.querySelector('.canvas');
        c.style.transformOrigin = 'top left';
        c.style.transform = 'translateX(40px) scale(0.7)';
      });
      await page.screenshot({ path: og });
    } finally {
      await ctx.close();
    }
    console.log(og);
  }
} finally {
  await browser.close();
}
