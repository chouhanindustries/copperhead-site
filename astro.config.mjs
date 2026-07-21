// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://copperhead.sh',
  integrations: [mdx()],
  build: {
    // one small page: keep the CSS inline rather than paying for a second
    // round trip (spec §7 budget)
    inlineStylesheets: 'always',
  },
});
