---
name: blog-post
description: Write or edit a post for this site's blog or research collection, in the house voice. Use whenever the task is drafting a new post, rewriting an existing one, writing a section or intro for one, or reviewing a draft for tone. Enforces no em dashes, prose that reads as written by a person, and continuous argument rather than bullet scaffolding. Triggers on "blog post", "write a post", "draft an article", "research writeup", "make this sound less like AI", "rewrite this section".
---

# Writing a post

## Before drafting

Read the two existing posts closest in kind to the one you are writing. They are the
specification for the voice; this file only names what they do.

- `src/content/blog/` for argument posts. Frontmatter: `title`, `description`, `date`,
  `kind`, optional `deck`.
- `src/content/research/` for method and measurement. Same fields plus `status`, and
  `status` is load-bearing: an article about an unrun benchmark must not read like one
  reporting results.

Schema lives in [src/content.config.ts](src/content.config.ts). `description` is both
the index card blurb and the meta description, so write it as one or two full
sentences, not a fragment.

Prose is hard-wrapped at 88 columns. Frontmatter values, tables, component props and
code blocks are exempt and stay on one line. `copperhead` is lowercase everywhere,
including sentence-initial.

If the post needs numbers you were not given, ask for them. Never invent a token
count, a runtime, a price, or a benchmark result. Every number in these posts is read
off a real run and a reader may go check it.

## Rule 1: no em dashes

Not one, anywhere in prose. No `—`, no `–`, no ` - ` standing in for one. This holds
in MDX comments too, since those are read during review.

An em dash is nearly always a joint that a different piece of punctuation makes
better. Pick from these, in rough order of preference:

- **Comma pair** for an aside: `every observed failure in that run, provider error,
  budget exhaustion, stall, landed on one of them`
- **Colon** when the second half delivers what the first half promised: `Software has
  an answer to this: the build breaks.`
- **A full stop.** Two shorter sentences beat one hinged sentence most of the time:
  `That is drift. It is the default state of every hardware project past a certain
  size.`
- **Rewrite the clause** so the interruption is gone entirely.

Ranges in prose spell the word: `five to eight weeks`, `12V to 5V`. Hyphens are fine
inside tight technical references (`stages 1-6`, `rule-based`).

## Rule 2: language a person would actually use

Write like an engineer explaining something to another engineer who is smart but has
not seen this system. Plain words, concrete nouns, working verbs.

Never ship these:

- Openers: `In today's fast-paced world`, `In the world of`, `Imagine a scenario`,
  `Let's dive in`, `Have you ever wondered`
- Verbs and adjectives: `delve`, `leverage`, `utilize`, `unlock`, `harness`,
  `seamless`, `robust`, `powerful`, `cutting-edge`, `game-changing`, `revolutionary`,
  `comprehensive`, `myriad`, `plethora`
- Frames: `It's not just X, it's Y`, `X isn't just about Y`, `more than just`,
  `the key takeaway is`, `at the end of the day`, `it's worth noting that`
- Enthusiasm: `We're thrilled to`, `exciting`, `simply put`, exclamation marks
- Closers: `In conclusion`, `To sum up`, a final paragraph that restates each section

Also avoid the shapes that give a model away even when the words are fine:

- The abstract tricolon: `speed, scale, and simplicity`. Three concrete items are
  fine. Three abstractions are filler.
- The rhetorical question answered in the next sentence.
- Hedging stacks: `it could potentially be somewhat helpful`. Claim it or drop it.
- Symmetry as a tic: every paragraph the same length, every heading the same grammar,
  every list three items long.
- Explaining that you are about to explain: `Let's look at how this works.` Just work.

Contractions are allowed and rare. Roughly one per five hundred words, used when a
sentence needs to land lighter. Default to `it is`, `does not`, `cannot`.

Dry understatement is the house humour, and it is always attached to something real:
`It would keep the obligation open, refuse to finish, and eventually stop for a human,
correctly and uselessly.` Never a joke for its own sake.

## Rule 3: flow

The post is one continuous argument. Headings mark turns in it; they are not chapter
labels stuck on top of independent blocks.

- Open cold, on a specific situation or a claim with an edge. `There is a failure mode
  that looks like success.` No throat-clearing, no summary of what the post will
  cover, no restating the title.
- Vary sentence length on purpose. Let a six-word sentence land after a long one.
  `The circuit is the fun part.` `The absence was the engineering.` Uniform cadence is
  the single loudest AI tell.
- Carry the thread across the seam. Each section should follow from the one above it,
  and a heading should be readable as the next move in the argument: `Where the
  coordinates were coming from`, then `Intent in, geometry out`, then `Determinism is
  the whole point`.
- Headings are sentence case and say something. Not `Benefits`, not `Key Features`,
  not a gerund pileup.
- Prose over bullets. A list is correct for genuinely parallel items, such as the
  three defects a checker found. It is wrong for reasoning, which needs connective
  tissue that bullets delete. Look at any existing post: mostly paragraphs.
- Paragraphs run two to five sentences.
- Prefer the specific: `the board draws 800 microamps in sleep instead of 25 and the
  coin cell is dead in a week` over `power consumption issues`.
- Second person is welcome when the reader is the one acting: `you open it and the
  refdes text sits on top of a symbol body`.

## Close honestly

Every post here ends on a limit rather than a victory lap. `What this does not do
yet`, `What it refuses to claim`, `What it does not prove`. Name what is unfinished,
what the change cost, or what you would need to believe the claim. Then, if there is
a next post, one line linking to it.

That section is what makes the rest credible. Do not drop it.

## Check before finishing

```bash
f=<path to the post>   # .md or .mdx, under src/content/blog/ or src/content/research/
grep -n '—\|–' "$f"                                   # must be empty
grep -nEi 'delve|leverage|seamless|robust|cutting-edge|game-chang|plethora|myriad|in conclusion|dive in|not just|thrilled|it.s worth noting' "$f"
awk 'length > 88 {print FILENAME":"FNR": "length}' "$f"   # prose wrap, ignore tables/props
```

Then read the draft aloud in your head, start to finish. If any sentence has a rhythm
you would not use out loud, rewrite it. If a paragraph could be deleted without the
argument losing a step, delete it.
