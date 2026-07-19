---
title: "Antler Crackathon submission"
description: "copperhead is an AI agent that designs, documents, and validates real PCBs from a prompt, working on your existing KiCad repository. Built and proven on a shipping open source board."
date: 2026-07-18
kind: "Submission"
---

**Cursor for circuit boards: an AI agent that designs, documents, and validates
real PCBs from a prompt.**

Everyone here is pointing an agent at code. copperhead points one at a circuit
board. It works on the KiCad files already in your repository: the schematic,
the layout, the bill of materials, the pinout, the design docs, and it does not
finish until KiCad's own checkers say the result is clean.

| Submission  |                                                                                     |
| ----------- | ----------------------------------------------------------------------------------- |
| Team        | Chouhan Industries                                                                  |
| Built by    | Animesh Chouhan                                                                     |
| Repo        | [chouhanindustries/copperhead](https://github.com/chouhanindustries/copperhead)     |
| Proof board | [animesh-chouhan/open-telegraph](https://github.com/animesh-chouhan/open-telegraph) |
| Demo        | [1-minute walkthrough](/copperhead-demo.mp4)                                        |

![Render of the Open Telegraph board, a 40 by 40 mm ESP32-S3 Morse key](/pcb.png)
_The Open Telegraph board, designed with copperhead_

## The problem, and who hurts

Hardware design is one specialist holding an entire board's constraints in their
head for months. Input range, quiescent current, package, sourceability, strapping
pins, antenna keepout, every part choice touches all of them at once, and every
change ripples into five documents that nobody updates in time.

So the docs drift from the schematic. The BOM drifts from both. And the traps get
caught at bring-up, or after the boards come back from fab, at $200 and three
weeks a spin.

This is not a guess. It is what building
[Open Telegraph](https://github.com/animesh-chouhan/open-telegraph) looked like
before the agent existed: a 40×40 mm ESP32-S3 Morse key with a 25 microamp deep
sleep budget, where one wrong regulator, a part whose quiescent draw alone eats
the entire budget, silently kills the product.

## What we built

An agent loop that leaves artifacts on disk, not advice in a chat window.

```
copperhead do "move the key input to a different RTC-capable pin"
```

It reads the MCU strapping table, picks an RTC-capable pin that is not a strapping
pin, edits the schematic, propagates the new pin into the pinout and subsystem
docs and the firmware scaffold, runs `kicad-cli` ERC until it is clean, and
commits with the reasoning attached.

The same loop runs from nothing: hand it a product brief and it produces a
specification with every assumption flagged, an architecture, part selection with
a justification per line, an ERC-clean schematic, a DRC-clean draft layout,
gerbers, renders, a BOM you can order, and a bring-up plan. Every stage is gated
by real validation tooling before the next one starts.

![copperhead routing a board](/routing.gif)

The draft layout is correct, not optimal, and it says so itself, in a
`LAYOUT.md` that lists exactly what a specialist should redo before fab.
Non-optimal is acceptable. Unlabeled non-optimal is not.

## Why this is a Delta 4

The honest before-and-after on a real board:

|                              | Today                 | With copperhead             |
| ---------------------------- | --------------------- | --------------------------- |
| Idea to manufacturable files | Weeks to months       | Days                        |
| Docs vs. schematic           | Drift by default      | Regenerated on every change |
| Datasheet traps              | Caught at bring-up    | Caught before commit        |
| Who can do it                | A hardware specialist | One person with a repo      |

That is a 10x jump in time plus a collapse in error rate. The second effect is the
one that makes it stick: once a change to your board propagates everywhere and
self-verifies, going back to updating five documents by hand feels broken.

## Where we sit against the field

| Competitor   | What they do                             | The gap                                    |
| ------------ | ---------------------------------------- | ------------------------------------------ |
| Flux.ai      | AI copilot inside their own browser ECAD | You must move into their editor            |
| Quilter      | Physics-driven AI layout, per board      | Routing only - no design reasoning or docs |
| DeepPCB      | RL placement and routing                 | Same, and you pay for bad results too      |
| siliXon      | Text to PCB from scratch                 | Doesn't iterate on designs that exist      |
| Siemens Fuse | Agentic copilot in Xpedition             | Enterprise-only, locked toolchain          |

Everyone else is an autorouter, a walled-garden editor, or an enterprise EDA
add-on. copperhead is the only agentic workflow that runs on open, real files in
the repo you already have. "Cursor on your repo," not "come use our IDE."

## Global on day zero

KiCad is the default open source ECAD tool worldwide, and the proof board is
published under CERN-OHL-S. There is nothing India-specific in the product: the
first user in Berlin and the first user in Bengaluru run the same npm install
against the same file formats. The EDA market is $4.2B and has grown for twenty
straight quarters, with AI features pulling premium pricing.

## US go-to-market

Three segments, in order: indie hardware builders, crowdfunded-device startups,
and small EE consultancies who bill by the board.

The channel is the product. copperhead is Apache-2.0 and Open Telegraph is fully
public, so the first hundred users land through the repo itself - Hacker News,
r/PrintedCircuitBoard, the KiCad community - with the board as the proof that
none of this is a demo. Monetization is a design-agent SaaS on top of the open
CLI: hosted runs, longer context over a design history, and team-level review.

## Try it

```
npm i -g @chouhan/copperhead
export ANTHROPIC_API_KEY=...
cd your-kicad-repo
copperhead init
copperhead do "add a second RGB LED on an RTC-capable pin"
```

Everything it writes is plain markdown, JSON, and KiCad source. There is no
proprietary format to get stuck in, and no editor to move into.

For the longer story of how this workflow came together, see
[building open hardware with Claude](https://chouhan.ai/building-with-claude).
