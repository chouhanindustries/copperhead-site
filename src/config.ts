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
  // The docs live in the repo's docs/ directory.
  blog: '/blog/',
  faq: '/blog/faq/',
  docs: `${repo}/tree/main/docs`,
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

/** The exact five-line quickstart block (website-content.md §8, acceptance W-3). */
export const quickstart = [
  `npm i -g ${pkg}`,
  'export ANTHROPIC_API_KEY=...        # or OPENAI_API_KEY',
  'cd your-kicad-repo',
  'copperhead init',
  'copperhead do "add a second RGB LED on an RTC-capable pin"',
];
