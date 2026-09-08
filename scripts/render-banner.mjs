// Render the LinkedIn company page cover to PNG in both themes at 2x.
//
//   node scripts/render-banner.mjs
//
// Writes branding/png/copperhead-linkedin-banner.png (dark) and
// copperhead-linkedin-banner-light.png at 2256x382 from
// diagrams/linkedin-banner.html. LinkedIn wants 1128x191; 2x keeps the
// hairline traces crisp after its recompression.
//
// Same shape as render-cards.mjs: the page declares its palette with
// light-dark(), so the theme is picked per pass with an emulated
// prefers-color-scheme rather than a second stylesheet.

import { chromium } from 'playwright-core';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

function findChromium() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
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

const html = resolve('diagrams/linkedin-banner.html');
if (!existsSync(html)) throw new Error(`No such page: ${html}`);

const outDir = resolve('branding/png');
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ executablePath: findChromium() });

for (const theme of ['dark', 'light']) {
  const ctx = await browser.newContext({
    viewport: { width: 1200, height: 260 },
    deviceScaleFactor: 2,
    colorScheme: theme,
  });
  const page = await ctx.newPage();
  await page.goto(pathToFileURL(html).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const el = await page.$('#banner');
  const path = `${outDir}/copperhead-linkedin-banner${theme === 'dark' ? '' : '-light'}.png`;
  await el.screenshot({ path });
  console.log(`  ${path.replace(process.cwd() + '/', '')}`);
  await ctx.close();
}

await browser.close();
