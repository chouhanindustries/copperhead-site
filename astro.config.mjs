// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://copperhead.sh',
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      // Shiki defaults to github-dark, which was invisible against the old dark
      // page and is now a black slab in the middle of a light one. github-light
      // puts the token colours on the right side of the theme.
      theme: 'github-light',
      transformers: [
        {
          // Shiki writes its background as an inline style, which no stylesheet
          // rule can outrank. Strip it so blog code blocks take --surface like
          // every other code surface on the site, and keep only the token
          // colours the theme is actually here for.
          pre(node) {
            node.properties.style = String(node.properties.style ?? '').replace(
              /background-color:[^;]*;?/,
              '',
            );
          },
        },
      ],
    },
  },
  build: {
    // one small page: keep the CSS inline rather than paying for a second
    // round trip (spec §7 budget)
    inlineStylesheets: 'always',
  },
});
