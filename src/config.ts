/** Single source of truth for outbound links and the install command. */
export const pkg = 'copperhead';

/** git remote of the copperhead repo (brand doc says animesh-chouhan; remote wins). */
export const repo = 'https://github.com/chouhanindustries/copperhead';

export const site = 'https://copperhead.sh';

export const links = {
  repo,
  // Primary navbar CTA ("Try for Free") — the docs quickstart.
  getStarted: 'https://docs.copperhead.sh/getting-started/quickstart/',
  // The blog now lives on this site (spec §non-goals said chouhan.ai; superseded).
  // The docs are a separate Astro Starlight site on GitHub Pages (source: repo
  // docs/). They cannot live at /docs here: this Worker owns the whole apex.
  blog: '/blog/',
  faq: '/blog/faq/',
  docs: 'https://docs.copperhead.sh/',
  demoVideo: '/copperhead-demo.mp4',
  telegraphRepo: 'https://github.com/animesh-chouhan/open-telegraph',
  buildStory: 'https://chouhan.ai/building-with-claude',
  // TODO(launch): confirm the real inbox before launch; copperhead.sh has no MX
  // record yet, so this address may bounce.
  contact: 'mailto:hello@copperhead.sh',
  discord: 'https://discord.gg/24zYXuR3Pq',
  x: 'https://x.com/copperheadhq',
  linkedin: 'https://www.linkedin.com/company/copperheadhq',
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
