# copperhead-site

Website for copperhead, the open source AI agent for PCB design.
Live at [copperhead.chouhan.ai](https://copperhead.chouhan.ai/).

Single static page. Astro, vanilla CSS, no client framework, no CMS, no backend.
Built to [website-spec.md](website-spec.md); copy is verbatim from
[website-content.md](website-content.md).

## Develop

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
```

## Assets that are still placeholders

The page gates on these at build time, so nothing renders broken while they are
missing. Drop the file into `public/` and it appears on the next build.

| File | Effect when added |
| --- | --- |
| `copperhead-demo.mp4` | the `#demo` section appears, and the hero's secondary button switches back to "Watch the demo" |
| `demo-poster.png` | poster frame on the video |
| `copperhead-demo.vtt` | captions track (narration script is in `pitch-script.md`) |
| `open-telegraph.webp` | replaces the placeholder panel in the proof card |
| `og.png` | currently a generated wordmark card; replace with the 1200x630 board render |

## Typography

Three self-hosted families, all subset with `pyftsubset` to the glyphs the page
actually uses, which is why five faces still cost only ~51 KB:

| Face | Role |
| --- | --- |
| Space Grotesk 700 / 500 | headings (700) and subheads (500) |
| IBM Plex Sans 400 / 500 | body text and buttons |
| JetBrains Mono 400 | code, wordmark, section indices, terminal |

Space Grotesk reads as drafting-adjacent next to a mono, and IBM Plex is an
engineering face with the right heritage; brand-and-business.md §1 already names
Plex Mono as the alternate mono. To re-subset after a copy change that
introduces new glyphs, widen the `--unicodes` range and rerun `pyftsubset`.

## Deviations from website-spec.md

The layout was reworked toward a minimal, cursor.com-style treatment. Where that
conflicts with the spec, the visual direction won:

- **Sticky header.** Spec §4 says none in v1, just a floating GitHub link. There
  is now a fixed bar with section links and a GitHub CTA. It satisfies W-2 more
  directly and is CSS-only, so it still works with JS disabled.
- **Trace dividers.** Spec §3 uses them between every section. They appear once,
  above the footer; section boundaries are negative space instead. The via motif
  still carries identity through the wordmark, the favicon, and the OG image.
- **Cards.** Spec §4 calls for cards on the invariants and proof sections. Both
  are borderless now.
- **Headings** are plain text rather than copper, and the invariants closing line
  is plain rather than gold. Copper is reserved for CTAs, links, the eyebrow
  labels, and the terminal prompt. This also sidesteps the AA large-text-only
  caveat on copper noted in spec §8.
- **Hero visual.** Added a terminal showing a `copperhead check` run. Every line
  is the literal output format from `src/commands/check.ts` in the copperhead
  repo, so it stays inside the W-5 rule. `check` prints those five lines and
  nothing else, so do not add a summary line to it.
- **Hero layout.** Left-aligned and asymmetric rather than centered, with the
  install and requirements shown as a small spec table instead of a badge strip.

## Before launch

- **The install line is not publishable as written.** `src/config.ts` sets the
  package to `@chouhan/copperhead`, per the naming convention in
  brand-and-business.md §1. The bare name in website-content.md §8 cannot be
  used: npm returns 404 "Unpublished on 2022-05-28" and permanently reserves
  unpublished names. Publish the scoped package, or change `pkg` in one place if
  the bare name is ever recovered.
- No Discord or X handle appears in any source doc, so those two footer links
  from website-content.md §9 are omitted rather than guessed. Fill them into
  `links` in `src/config.ts` and they render.

## Deploy

Static output in `dist/`. Same host as chouhan.ai (GitHub Pages or Cloudflare
Pages), DNS `CNAME copperhead` to the host, HTTPS enforced. CI builds on push to
main and fails the build on em-dashes, dead links, or a transfer budget over
100 KB.

## License

[MIT](LICENSE)
