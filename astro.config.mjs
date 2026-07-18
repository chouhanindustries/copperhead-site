// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://copperhead.chouhan.ai',
  build: {
    // one small page: keep the CSS inline rather than paying for a second
    // round trip (spec §7 budget)
    inlineStylesheets: 'always',
  },
});
