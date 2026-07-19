# Pitch Scripts - Antler Crackathon

## 1-Minute Submission Video Script

**[0:00–0:10] Hook**
"Every AI demo today is software. This one is a circuit board. I'm building Cursor for circuit boards - an AI agent that designs, documents, and validates real PCBs from a prompt."

**[0:10–0:40] Demo (screen recording)**
"This is a real board - an ESP32-S3 Morse key with a 25 microamp sleep budget. Watch: I tell the agent 'cut the sleep current.' It reasons through every part on the board, edits the actual KiCad schematic, propagates the change across the BOM, pinout, and all five design docs, then runs KiCad's own ERC and DRC checks and fixes what they flag. A board redesigned in one prompt."

**[0:40–1:00] Delta 4 + close**
"Hardware design today takes a specialist months, and docs drift from schematics until errors ship to fab. This takes one person days, with checks passing at every step. Everything's open source - the board and the workflow. Chouhan Industries. [Team name, members.]"

---

## 5-Minute Judge Pitch

### 1. Problem depth (~60s)

"Designing a circuit board isn't drawing a circuit. It's holding fifty constraints in your head at once - this regulator's quiescent current, that GPIO's boot-strapping behavior, whether a pullup leaks 33 microamps and kills your battery budget. One change touches the schematic, the BOM, the pinout, and every doc. They drift. Errors surface at bring-up - or after you've paid for fabrication.

That's why hardware takes a specialist months and why most software builders never touch it. I know because I design hardware in the open - every mistake I've caught is documented publicly in my repo."

### 2. What we built today (~2 min, live demo)

"This is Open Telegraph - a real, open-source ESP32-S3 board. And this is the agent working on its actual KiCad repo.

[Live] 'Move the key input off GPIO4 to another RTC-capable pin.' Watch it: reads the design docs, checks the ESP32-S3 strapping table so it doesn't pick a boot pin, edits the schematic, updates the pinout doc, the subsystem doc, and the placement plan - same net names everywhere - then runs `kicad-cli` ERC and reads the violations back.

[Point at screen] That's not autocomplete. It caught a datasheet trap, kept five documents consistent, and verified its own work with the industry's own tools. Built on top of this today: [whatever you shipped today - e.g., the agent harness, constraint checker, web UI]."

### 3. Delta 4 (~45s)

"Today: months of specialist time, plus fab respins at $500-5,000 per mistake. With this: one person, idea to manufacturable, ERC/DRC-clean files in days. That's not 4x - on time alone it's 10x, and it converts an entire population of software engineers into people who can ship hardware. Once you've redesigned a board with one prompt, opening a schematic editor alone feels broken. Nobody goes back."

### 4. Globally relevant on day 0 (~30s)

"KiCad is the world's most-used open PCB tool - millions of installs, every country. Our agent works on existing repos, so day-0 market is everyone already designing hardware, plus everyone who wanted to and couldn't. The EDA market is $4.2B and 20 straight quarters of growth, with AI features already commanding premium pricing. Competitors - Flux, Quilter, Siemens Fuse - are walled gardens or autorouters. Nobody does agentic design on open files."

### 5. US GTM (~45s)

"The US is where indie hardware lives: crowdfunded device startups, YC hardware companies, defense-tech primes hiring EEs they can't find. Wedge: the open-source repo itself. Hardware people trust what they can inspect - we launch the workflow on Hacker News and r/PrintedCircuitBoard with the board as proof, convert repo users to a hosted design-agent SaaS, priced per design seat. First 10 users: hardware builders in the KiCad and Hackaday communities we're already part of. Monetization from day one via [Dodo Payments - free credits from this event, and it handles global merchant-of-record]."

### Close (~15s)

"The Morse key is just what the workflow made first. The product is the workflow: hardware design at software speed, fully open. We're Chouhan Industries."

---

## Anticipated Judge Questions

- **"Why won't Flux/Siemens add this?"** - They're closed editors; our wedge is the world's existing open KiCad file base. No migration, no lock-in. And the docs-as-memory loop can't retrofit into a walled garden.
- **"Isn't this just Claude with KiCad CLI?"** (Gaurav will ask) - The value is the harness: design-doc memory structure, constraint propagation, datasheet-trap checks, and the ERC/DRC verification loop. Same reason Cursor isn't "just GPT with a file API."
- **"How do you know the AI's designs are safe to fab?"** (Himanshu will ask) - Nothing is done until KiCad's own ERC/DRC pass; human stays engineer of record for bench work. Verification is the product's core loop, not an afterthought.
- **"How do you make money?"** (Rishabh will ask) - Hosted agent SaaS per seat; free on open-source repos (funnel), paid for private repos. Global payments via merchant-of-record from day one.
- **"What if the AI hallucinates a part or a value and it ships to fab?"** — Three layers: every decision cites its datasheet reasoning inline, ERC/DRC must pass before anything is "done", and the human signs off as engineer of record. The workflow makes errors *more* visible than manual design, where reasoning lives in one engineer's head.
- **"ERC/DRC don't catch everything — what about signal integrity, EMC, thermal?"** (Himanshu) - Correct, and neither does a human at schematic stage. Roadmap: plug in open simulation (ngspice, openEMS) as additional verification loops - same pattern, more checkers. The architecture is checker-agnostic.
- **"What's your moat? Anthropic/OpenAI could do this."** - Foundation models won't build EDA-specific harnesses; that's an application layer. Our moat compounds: a corpus of open designs with machine-readable rationale (why each part was chosen) is training data nobody else is collecting. Every user's public design makes the agent better.
- **"You're one person / a tiny team. Why you?"** — I've shipped a real board with this workflow and documented every trap it caught, in public. Domain + AI + proof. The judges can clone the repo tonight and check.
- **"Everything's open source — how do you defend a paid product?"** - Same as GitLab/Cursor: the designs are open, the hosted agent, private-repo support, and team features are paid. Open source is the distribution engine, not the product.
- **"Why now?"** — Two curves crossed in the last 12 months: models got good enough at long-horizon tool use to run a full ERC/DRC loop, and kicad-cli made KiCad fully scriptable. This workflow was impossible in 2024.
- **"What's the TAM beyond hobbyists?"** — Entry: KiCad's millions of users. Expansion: same agent harness ports to Altium/Cadence file formats — the $4.2B EDA market plus the far larger engineering-services market (design consultancies bill $150–300/hr for exactly the work this compresses).
- **"How do you handle Altium/proprietary formats?"** — Start where files are open and users are underserved (KiCad). Altium has an open JSON-ish format and APIs; that's a sequencing decision, not a wall.
- **"What does traction look like in 90 days?"** — GitHub stars → workflow adoptions (forks running the loop on their own boards) → hosted waitlist. Metric that matters: boards taken to fab through the agent. Target: 10 real boards fabbed by strangers in 90 days.
- **"Who is the first paying customer?"** — A crowdfunded-device startup with 1–3 EEs facing a respin. They lose $5–50K and 6–8 weeks per board respin; a $200/mo seat that catches one trap pays for itself 25x over.
- **"Isn't hardware design too risky to trust an agent?"** (vision-level) — We're not removing the engineer, we're removing the drudgery: consistency, propagation, datasheet lookups, verification runs. The same objection was made about compilers, autorouters, and Copilot. Delta 4 says users never go back — they haven't.
