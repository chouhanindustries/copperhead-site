// Render a diagram page to PNG in both themes at 2x.
//
//   node scripts/render-diagram.mjs                          diagrams/social-flow
//   node scripts/render-diagram.mjs <page.html> <out-prefix>
//
// Writes <out-prefix>-light.png and <out-prefix>-dark.png at 1600x900. The
// page declares its palette with light-dark(), so the theme is picked per
// pass with emulated prefers-color-scheme rather than a second stylesheet.
//
// social-flow.html carries three layouts selected by body class, and for that
// page this script renders all of them:
//   social (default) 1600x900  -> <out-prefix>-{theme}.png, the share render
//   post              800x1550 -> public/blog/create-pipeline-{theme}.png,
//                                 portrait so it stays legible in the post's
//                                 prose column (StageFlow.astro)
//   og               1200x630  -> public/blog/from-brief-to-gerbers-og.png,
//                                 the link preview card, designed at native
//                                 size instead of the whole diagram scaled
//                                 down past legibility
//
// Needs a Chromium, found the same way as shots.mjs.

import { chromium } from 'playwright-core';
import { existsSync } from 'node:fs';
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

// One screenshot: the page at `width`x`height` in `theme`, with the body
// class swapped to `variant` when one is named (generic diagram pages keep
// whatever class they load with).
async function shoot({ variant, width, height, theme, path }) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 2,
    colorScheme: theme,
  });
  try {
    const page = await ctx.newPage();
    await page.goto(pathToFileURL(html).href);
    if (variant) await page.evaluate((v) => { document.body.className = v; }, variant);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path });
  } finally {
    await ctx.close();
  }
  console.log(path);
}

try {
  for (const theme of ['light', 'dark']) {
    await shoot({ width: 1600, height: 900, theme, path: `${out}-${theme}.png` });

    // The blog embeds the portrait layout (StageFlow.astro), so the copies
    // under public/ have to track the source or the post quietly goes stale.
    if (isSocialFlow) {
      await shoot({
        variant: 'post', width: 800, height: 1550, theme,
        path: resolve(`public/blog/create-pipeline-${theme}.png`),
      });
    }
  }

  // The post's share card (ogImage in its frontmatter). Light only: link
  // previews do not follow the reader's theme.
  if (isSocialFlow) {
    await shoot({
      variant: 'og', width: 1200, height: 630, theme: 'light',
      path: resolve('public/blog/from-brief-to-gerbers-og.png'),
    });
  }
} finally {
  await browser.close();
}
