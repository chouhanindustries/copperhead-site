# Antler Crackathon — Competition Details

Date: Saturday, July 18, 2026
Event page: https://offlyn.life/e/vFMflqU

## Event Overview

- **Aspire presents Antler Crackathon, powered by WorkHome** — hosted by Antler India
- Location: KHB Colony, 5th Block, Koramangala, Bengaluru (WorkHome)
- Day-long hackathon for builders ready to go from building products to founding global companies
- Bring a fresh idea or push further on something already built; solo or team both fine
- Judged on your product, and **more importantly, on your vision**
- Investors on ground; demo day ends with judge feedback + terrace afterparty

## Prize

- Winners get **fast-tracked to pitch Antler Partners directly**
- Chance at funding of **up to ₹4 crores**
- **4 weeks in San Francisco's inner circles** to crack US GTM

## Ecosystem Partners (free resources — use them today)

- **Dodo Payments** — payment gateway credits (judge Rishabh Goel's company; using it in your demo is a smart signal)
- **AI Grants India** — AI APIs and voice credits
- **AI Learn Circle & Hackculture** — builder community

## Our Project

Building on: https://chouhan.ai/building-with-claude (repo: https://github.com/animesh-chouhan/open-telegraph)

**The idea:** an AI co-designer for hardware. Claude Code works on the real KiCad repo — editing schematics and PCB layout, picking parts against every constraint at once (input range, current, quiescent draw, package, sourceability), propagating any change across all design docs/BOM/pinout, catching datasheet traps (strapping pins, leaking pullups), and verifying its own work with `kicad-cli` ERC/DRC. Proven on Open Telegraph, a real 40×40 mm ESP32-S3 Morse-key board designed to a 25 µA sleep budget.

**One-liner for registration:** "Cursor for circuit boards: an AI agent that designs, documents, and validates real PCBs from a prompt."

**Delta 4 argument:** hardware design today = months of a specialist holding a board's constraints in their head, with docs drifting from schematics and traps caught at bring-up (or after fab). With this workflow, one person goes from idea to manufacturable, ERC/DRC-clean files in days. That's a 10x+ time jump plus an error-rate collapse — once you've designed a board this way, going back feels broken.

**Live demo moment:** "cut the sleep current" or "move the key off GPIO4" → watch the change propagate across five docs + schematic, then ERC/DRC run and pass. A circuit board redesigned in one prompt.

**Judge fit:** hardware+AI is a standout vs. a room of SaaS wrappers; Himanshu Upreti (hardware-adjacent deep tech, patents) and Gaurav Dadhich (AI-native depth) will probe it well. Global on day 0: KiCad is worldwide, files are CERN-OHL-S open. US GTM: indie hardware builders, crowdfunded-device startups, and EE consultancies — land via the open-source repo + Hacker News/r/PrintedCircuitBoard, monetize as a design-agent SaaS.

## Competitors

| Competitor | What they do | Gap we exploit |
|---|---|---|
| **Flux.ai** | Browser-based ECAD rebuilt around an AI copilot; per-seat subscription | Walled garden — you must move into their editor. We work on your existing KiCad repo |
| **Quilter** | Physics-driven AI layout: schematic → fab-ready board; per-board pricing; supports KiCad/Altium | Layout/autorouting only — no design reasoning, part selection, or doc consistency |
| **DeepPCB** (InstaDeep) | RL placement/routing engine; pay per compute time | Same — routing only, pay even for bad results |
| **siliXon** | Text-to-PCB from natural language; $1.5M seed (early) | Generates from scratch; doesn't iterate on real existing designs |
| **Siemens Fuse** (2026) | Agentic AI copilot inside Xpedition EDA | Enterprise-only, locked to Siemens toolchain |

**Positioning:** competitors are autorouters, walled-garden editors, or enterprise EDA add-ons. We're the only agentic workflow on open, real files — the agent holds the entire design (schematic + PCB + BOM + pinout + docs), reasons about cross-cutting constraints and datasheet traps, propagates every change, and self-verifies with `kicad-cli` ERC/DRC. "Cursor on your repo" vs. "come use our IDE." Proof: a real, open-source, shipping board. Market context: $4.2B EDA market, 20 straight growth quarters, AI features driving premium pricing.

## Registration

- One line about what you're building (required)

## Timeline

| Time | Event |
|---|---|
| 5:30 PM | Submission form drops on the WhatsApp group — submit early |
| 6:00 PM | Hack ends, sharp |
| 6:30 PM | Top 10 demos begin |

## Submission (by 5:30 PM, form on WhatsApp group)

1. **GitHub repo** — codebase, public or shared access
2. **1-min pitch / demo** — short video showing what it does
3. **Team name** — as registered
4. **Members' names** — everyone on the team

## Judging Criterion: Delta 4

Every team is judged on one question: **Why is this a Delta 4 solution?**

Is your product at least 4x better than the way this problem is solved today? If the efficiency jump is real, users never go back. That is what gets you into the top 10.

## Top 10 Finals

- 5-minute pitch, directly to the judges
- Demos start at 6:30 PM

### Scoring

1. **Problem depth** — depth of problem identification and validation. Do you truly understand who hurts and why?
2. **What you built today** — working product over promises. Show what exists now that did not this morning.
3. **Globally relevant on day 0** — why does this matter beyond this room, from the very first day?
4. **Think US GTM** — initial thoughts on go-to-market in the US. How would you land your first users there?

## Judges

### Rishabh Goel — Founder & CEO, Dodo Payments

- SF-based; co-founded Dodo Payments (with Ayush Agarwal), a merchant-of-record platform simplifying global payments and compliance for solopreneurs, indie hackers, and micro-SaaS founders. 60,000+ builders across 220+ countries. London Business School.
- **What caters to him:** global-from-day-0 stories, monetization clarity, cross-border/US GTM thinking, products built for indie builders and developers. Show how you'd charge money and reach international users immediately.

### Gaurav Dadhich — Founder, Maximem AI

- SF-based founder of Maximem AI (AI context/memory solutions, small team). MBA from IIT Roorkee; ex-Razorpay. Has spoken on the "build vs buy" moment AI-native companies hit selling to enterprises.
- **What caters to him:** deep AI-native architecture, real technical differentiation (not a thin GPT wrapper), and a credible answer to "why won't the platform/enterprise just build this?" Show context/memory/agentic depth if you have it.

### Navneet Sharma — Co-Founder, Airtribe

- Bengaluru; co-founded Airtribe (2021, with Dhaval Trivedi) — outcome-focused upskilling for tech professionals. Ex-Product Director at Unacademy; owns product and growth.
- **What caters to him:** sharp product thinking — crisp user persona, problem validation, and a growth/community-led acquisition loop. He'll score "problem depth" hardest; show you talked to real users.

### Himanshu Upreti — Co-Founder & CTO, AI Palette

- Forbes 30 Under 30; IIT Guwahati (Maths & Computing); ex-Visa Data Labs. Scaled AI Palette (CPG innovation AI used by Nestlé, Coca-Cola, PepsiCo) to 27 geographies before its 2025 acquisition by GlobalData.
- **What caters to him:** defensible tech (he holds patents), enterprise-grade thinking, and scale/global relevance. He'll probe how the demo actually works under the hood — be ready for technical questions.

### Antler Investors (also in the room)

- **Himank Amar** — Analyst, Antler India (fintech investments and portfolio), Bengaluru
- **Anshul Tibrewala** — Marketing Director, Antler India; ISB MBA; runs Antler India's AI Residency comms
- **Raghav Chopra** — Operator at Antler (BD, GTM, founder's office), HKUST MBA, New Delhi
- **What caters to them:** fundability signals — big market, fast execution today, and a team that looks investable. Antler India's AI Residency is a natural next step; pitch like you're auditioning for it.

## Panel Read (overall)

Two SF-based AI/payments founders + two India product/AI-scale founders + Antler investors. The winning mix: **working AI product built today, real user pain validated, global + US monetization story, and technical depth that survives probing.** Avoid: vague promises, India-only framing, thin wrappers.

## Suggested 5-min Pitch Structure

1. Problem depth (~60s) — who hurts, how you know, quantify the pain
2. Live demo (~2 min) — built today, shown working
3. Delta 4 moment (~45s) — explicit before/after: "today this takes X, with us it takes X/4"
4. Global relevance (~45s) — why the pain exists in US/EU markets too
5. US GTM (~45s) — specific user segment, specific channel, first 10 users
