/**
 * Single source of truth for outbound links and the install command.
 *
 * NOTE on `pkg`: brand-and-business.md §1 specifies npm `@chouhan/copperhead`,
 * while website-content.md §8 shows the bare name `copperhead`. The bare name is
 * not publishable: npm returns 404 "Unpublished on 2022-05-28" and permanently
 * reserves unpublished names. `@chouhan/copperhead` is unregistered and free.
 * Change this one value if the bare name is ever recovered.
 */
export const pkg = '@chouhan/copperhead';

/** git remote of the copperhead repo (brand doc says animesh-chouhan; remote wins). */
export const repo = 'https://github.com/chouhanindustries/copperhead';

export const site = 'https://copperhead.chouhan.ai';

export const links = {
  repo,
  // The blog now lives on this site (spec §non-goals said chouhan.ai; superseded).
  // The docs are a separate VitePress site on GitHub Pages (source: repo
  // docs/). They cannot live at /docs here: this Worker owns the whole apex.
  blog: '/blog/',
  faq: '/blog/faq/',
  docs: 'https://docs.copperhead.sh/',
  demoVideo: '/copperhead-demo.mp4',
  telegraphRepo: 'https://github.com/animesh-chouhan/open-telegraph',
  buildStory: 'https://chouhan.ai/building-with-claude',
  // TODO(unverified): no Discord/X handle appears in any source doc. Confirm or
  // drop these two before launch; the CI link-check (spec §9) will flag them.
  discord: '',
  x: '',
  chouhan: 'https://chouhan.ai',
  kicad: 'https://www.kicad.org/',
  openspec: 'https://github.com/Fission-AI/OpenSpec',
  license: `${repo}/blob/main/LICENSE`,
};

/**
 * Quickstart block (acceptance W-3: the copy button copies exactly these lines).
 * Supersedes the website-content.md §8 `init`/`do` flow: this shows the
 * start-from-a-prompt pipeline (`copperhead create`, usecase-copperhead.md),
 * which scaffolds a new design from a brief rather than editing an existing repo.
 */
export const quickstart = [
  `npm i -g ${pkg}`,
  'export ANTHROPIC_API_KEY=<api-key>',
  'copperhead create --brief brief.md',
];
