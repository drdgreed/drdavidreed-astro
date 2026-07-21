# Harness Engineering White Paper — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a graphics-rich, dual-track (recruiter + technical-manager) white paper of David Reed's production Claude Code harness practices as a standalone `/harness-engineering/` page, a portfolio card, and a print/PDF path.

**Architecture:** One standalone Astro page (`src/pages/harness-engineering.astro`) using `BaseLayout` + a page-scoped `<style>` block, following the established `agentic-os.astro` pattern. Content is authored from the single source of truth `~/claude-harness/tasks/HARNESS_HANDBOOK.md`, reorganized into seven capability pillars. ~14 graphics are hand-authored inline SVG + styled HTML/CSS (no Mermaid). A portfolio.ts data entry drives the summary card → modal → button-into-paper. A print stylesheet + `window.print()` button produces the PDF from the same DOM.

**Tech Stack:** Astro 6, Tailwind 3 (via PostCSS — utilities available but the paper uses page-scoped CSS like agentic-os), TypeScript, deploys to Vercel. Node/npm.

**Source of truth for all content:** `/Users/davidreed/claude-harness/tasks/HARNESS_HANDBOOK.md`. Every factual claim, war story, and citation must trace to it. Do not invent stats.

**Spec:** `docs/superpowers/specs/2026-07-20-harness-engineering-whitepaper-design.md`

## Global Constraints

- **Route:** `/harness-engineering/`. `pageType="article"`.
- **Layout:** `BaseLayout` provides nav/footer/global CSS/SEO — never re-add chrome.
- **Typography/color:** reuse site tokens (Playfair Display for headings, Inter for body; category token colors teal/blue/purple/amber/rose). Page-scoped `<style>` for paper classes.
- **Omit Timecone entirely** — it appears nowhere in the paper. Career Foundry, FOS, PACCA may be named.
- **Voice:** receipts-over-claims; keep the handbook's honest hedging (gaps appendix builds credibility). Match the existing `©`-prefixed card voice on the portfolio.
- **agentic-os overlap:** Pillars 6 & 7 **summarize + cross-link** `/agentic-os/`, they do NOT re-narrate it.
- **PDF = Option A only:** print stylesheet + `window.print()`. No Playwright/Puppeteer, no new dependencies.
- **Accessibility floor:** single `<h1>`; every SVG graphic has `role="img"` + `aria-label` (or `<title>`); no meaning by color alone (pair color with a label/shape); graphics legible on white at print DPI.
- **No new dependencies.** No React island — interactivity via one small inline `<script>`.
- **Commit style:** end messages with the repo's Co-Authored-By + Claude-Session trailers (see existing commits).
- **Branch:** `feat/harness-engineering-whitepaper` (already checked out, fresh off `origin/main`).

**Verification loop (every task, replacing TDD):** author → `npm run build` (must exit 0, no errors) → `npm run preview` and load the route → confirm the named expected result → commit. Build failure or a missing element = task fails.

---

## File Structure

- **Create:** `src/pages/harness-engineering.astro` — the whole paper: frontmatter import, `<article class="paper">…`, page-scoped `<style>`, one inline `<script>` for the PDF button + smooth anchors. One file by design (matches agentic-os's single-file page); it will be long (~800–1100 lines) but is content, not logic.
- **Modify:** `src/data/portfolio.ts` — add one `PortfolioItem` (the card). No other change.
- **Modify:** `src/content/blog/harness-engineering-production-agentic-ai.mdx` — add one closing cross-link line.
- **Modify:** `src/content/blog/pacca-iter-0-harness-engineering.mdx` — add one closing cross-link line.

No CSS/component files are created — the paper is self-contained via its scoped `<style>`.

---

## Graphic data reference (used across tasks)

Concrete data pulled from `HARNESS_HANDBOOK.md`, so tasks below reference it without re-deriving:

- **Four layers (Part 1):** `0 Always-on` (every turn, every subagent — `~/CLAUDE.md`, project CLAUDE.md, memory index — "paid on EVERY call"); `1 Auto-triggered` (trigger-phrase match — skills — "paid only when relevant"); `2 On-demand` (explicitly opened — operating reference, lessons, memory bodies — "~free until needed"); `3 Unattended` (on schedule — nightly loops, cloud routines — "governed by loop policy"). Placement rule: *content lives at the cheapest layer that still gets it applied.*
- **Six-part loop doctrine (Part 4):** 1 trigger → 2 rules-load (quarantine-scan lessons first) → 3 executor (ONE bounded goal, scoped tools, isolated worktree) → 4 verifier (separate fresh-context zero-tool model grades the diff) → 5 memory write (append-only ledgers, committed) → 6 stop check (green+verified → draft PR; else BLOCKED receipt).
- **Four exits (priority order):** success condition · retry ceiling (same step failing 3× stops) · verifier-disagreement ceiling (3 consecutive maker/verifier splits pauses) · budget ceiling per cycle.
- **Safe ramp:** one reliable manual run → skill → STATE/receipts → hard binary gate → schedule (never skip).
- **Tool ladder:** CLI/API → headless script → browser (browser is fallback, 2–3 attempt cap).
- **Adoption path:** Day 1 (≤200-line `~/CLAUDE.md`; settings deny-floor; empty lessons.md) → Week 1 (SessionStart hook; per-repo lean CLAUDE.md + AGENT_LESSONS.md; `make verify` + prove-it-fails) → Month 1 (3 skills; one nightly loop through the full ramp; schedule memory audit + harness re-audit).
- **Trade-off matrix (Part 5):** broad allow / propose-only governance / prose+hook hybrid / per-project memory / curl allowed / no agent teams — each with solo-why and team-alternative (copy the handbook table verbatim).
- **War stories (concrete):** 59→141 endpoint count-drift; the 77-minute run that reported "fully verified" (schema beat 3 prose rules, adopted 2026-07-16); the launchd PATH silent failure ("opened draft PR" while `gh` never ran); the memory audit that found one store empty + one schema-violating, both silently.
- **Citation sources (Part 6/index):** best-practices, costs, settings/permissions, headless, agent-teams (code.claude.com); effective-harnesses, effective-context-engineering, memory-tool/context-management (anthropic.com). Verified live 2026-07-16.

---

## Task 1: Page scaffold, hero, receipts strip, and base scoped CSS

**Files:**
- Create: `src/pages/harness-engineering.astro`

**Interfaces:**
- Produces: the route `/harness-engineering/`; the `.paper` scoped-CSS system (CSS custom props `--paper-bg`, `--paper-fg`, `--paper-muted`, `--paper-accent`, plus `.eyebrow`, `.dek`, `.byline`, `.receipts`, `.receipt`, `.pillar`, `.vp`, `.war`, `figure.graphic`) that all later tasks reuse.

- [ ] **Step 1: Create the page with BaseLayout, hero, and receipts strip.**

```astro
---
/**
 * /harness-engineering — "The Production Harness" white paper.
 * Standalone page (nav+footer+SEO via BaseLayout) built from
 * ~/claude-harness/tasks/HARNESS_HANDBOOK.md, reorganized into seven
 * capability pillars. All graphics are inline SVG / styled HTML — no Mermaid.
 * PDF via print stylesheet + window.print() (see the <script> at the bottom).
 */
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout
  title="The Production Harness — Engineering AI Agents You Can Walk Away From"
  description="David Reed's production Claude Code harness: the seven-pillar engineering discipline — context, verification, deterministic enforcement, memory, unattended autonomy, multi-agent safety, and governance — that makes autonomous AI agents trustworthy. Grounded in Anthropic's own guidance."
  path="/harness-engineering/"
  pageType="article"
>
  <article class="paper">
    <p class="eyebrow">White Paper · Harness Engineering</p>
    <h1>The Production Harness</h1>
    <p class="dek">Anyone can prompt an agent. The engineering is everything <em>around</em> the model call — the layer that lets a frontier model work on your production systems unattended <strong>and be trusted to</strong>. This is that layer: seven capability pillars, each earned through a documented failure, each grounded in Anthropic's own guidance.</p>
    <p class="byline">David Reed, PhD · AI/ML engineering leader · <a href="https://drdavidreed.com">drdavidreed.com</a> · <a href="https://github.com/drdgreed">github.com/drdgreed</a></p>

    <!-- Dual-track badge -->
    <p class="dualtrack"><span>Frontier agentic-AI fluency</span><span>×</span><span>Classical staff-engineer judgment</span></p>

    <div class="receipts" role="group" aria-label="Harness at a glance">
      <div class="receipt"><div class="num"><em>4</em></div><div class="lbl">context layers, each priced by what it costs every call</div></div>
      <div class="receipt"><div class="num"><em>7</em></div><div class="lbl">capability pillars, each with a value proposition and a war story</div></div>
      <div class="receipt"><div class="num"><em>100%</em></div><div class="lbl">of practices traced to primary sources (Anthropic engineering docs)</div></div>
      <div class="receipt"><div class="num"><em>0</em></div><div class="lbl">auto-merges — autonomy tops out below merge, by design</div></div>
    </div>
    <p class="receipts-note">Figures reflect the live harness as of July 2026. <a href="#pdf" data-print-link>Save this paper as PDF ↓</a></p>

    <!-- Subsequent tasks append their sections here, before </article>. -->
  </article>
</BaseLayout>
```

- [ ] **Step 2: Add the page-scoped base stylesheet.** Append a `<style>` block after `</BaseLayout>`. Define the paper color system as CSS variables so the print stylesheet (Task 12) can flip them in one place. Use site fonts.

```astro
<style>
  .paper {
    --paper-bg: #0b0f14;          /* on-screen: native to the dark site */
    --paper-fg: #e7edf3;
    --paper-muted: #9fb0c0;
    --paper-accent: #2dd4bf;      /* teal token */
    --paper-rule: rgba(159,176,192,0.18);
    max-width: 860px; margin: 0 auto; padding: 4rem 1.25rem 6rem;
    color: var(--paper-fg);
    font-family: Inter, system-ui, sans-serif; line-height: 1.7;
  }
  .paper h1, .paper h2, .paper h3 { font-family: "Playfair Display", Georgia, serif; line-height: 1.15; }
  .paper h1 { font-size: clamp(2.4rem, 6vw, 3.6rem); margin: .25rem 0 1rem; }
  .paper h2 { font-size: clamp(1.6rem, 4vw, 2.1rem); margin: 3.5rem 0 1rem; }
  .paper h3 { font-size: 1.2rem; margin: 2rem 0 .5rem; }
  .eyebrow { text-transform: uppercase; letter-spacing: .12em; font-size: .8rem; color: var(--paper-accent); font-weight: 600; }
  .dek { font-size: 1.25rem; color: var(--paper-fg); margin: 0 0 1.25rem; }
  .byline { color: var(--paper-muted); font-size: .95rem; }
  .byline a, .paper a { color: var(--paper-accent); }
  .dualtrack { display: flex; flex-wrap: wrap; gap: .6rem; align-items: center; margin: 1.5rem 0; }
  .dualtrack span { border: 1px solid var(--paper-rule); border-radius: 999px; padding: .35rem .8rem; font-size: .85rem; color: var(--paper-muted); }
  .dualtrack span:nth-child(2) { border: 0; color: var(--paper-accent); font-weight: 700; }
  .receipts { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px,1fr)); gap: 1rem; margin: 2rem 0 .5rem; }
  .receipt { border: 1px solid var(--paper-rule); border-radius: 12px; padding: 1rem; }
  .receipt .num em { font-style: normal; font-size: 2rem; font-weight: 800; color: var(--paper-accent); }
  .receipt .lbl { color: var(--paper-muted); font-size: .85rem; margin-top: .35rem; }
  .receipts-note { color: var(--paper-muted); font-size: .85rem; }
  .paper .muted { color: var(--paper-muted); }
  /* Pillar + value-prop + war-story primitives (used by Tasks 3–9) */
  .pillar { border-top: 1px solid var(--paper-rule); padding-top: .5rem; }
  .vp { font-size: 1.15rem; color: var(--paper-fg); font-weight: 600; border-left: 3px solid var(--paper-accent); padding-left: 1rem; margin: .5rem 0 1.25rem; }
  .war { border: 1px solid var(--paper-rule); border-left: 3px solid #f59e0b; border-radius: 8px; padding: 1rem 1.1rem; margin: 1.25rem 0; background: rgba(245,158,11,0.05); }
  .war b { color: #f59e0b; }
  figure.graphic { margin: 1.75rem 0; border: 1px solid var(--paper-rule); border-radius: 12px; padding: 1.25rem; }
  figure.graphic figcaption { color: var(--paper-muted); font-size: .82rem; margin-top: .75rem; text-align: center; }
</style>
```

- [ ] **Step 3: Build.** Run: `npm run build`. Expected: exit 0, no errors; output lists `/harness-engineering/index.html`.
- [ ] **Step 4: Visual check.** Run: `npm run preview`, open `http://localhost:4321/harness-engineering/`. Expected: site nav/footer present; hero title in Playfair; dual-track badge; four receipt tiles; teal accents on dark background.
- [ ] **Step 5: Commit.**

```bash
git add src/pages/harness-engineering.astro
git commit -m "feat(whitepaper): scaffold harness-engineering page — hero, receipts, base CSS

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01W1zkFQeiJbPnD24nJx8VPu"
```

---

## Task 2: Executive summary + Part I (the problem) + "demo→production" graphic

**Files:**
- Modify: `src/pages/harness-engineering.astro` (insert before the `</article>` marker comment)

**Interfaces:**
- Consumes: `.paper`, `.muted`, `figure.graphic` from Task 1.

- [ ] **Step 1: Write the executive summary (~200 words).** Author from HANDBOOK Part 1 intro + Purpose. Content must state: what a harness is (everything around the model call that's editable/versioned/verifiable); the headline outcome ("walk away from an autonomous run and trust the receipt"); the dual-track claim. Insert an `<h2>Executive summary</h2>` + 2–3 `<p>`.

- [ ] **Step 2: Write Part I "Why agentic coding needs a harness" (~250 words).** Angle = the engineering-substrate framing (NOT the operations framing agentic-os uses). Cover: assurance inflation, silent failures, context bloat, unattended drift. Ground in HANDBOOK 2.1 (Evidence Ledger rationale) and Part 1.

- [ ] **Step 3: Add Graphic 3 — "demo → production gap."** Styled HTML (two columns: "The demo" vs "Production", with the gap items between). Accessible: it's text, no SVG needed.

```html
<figure class="graphic gap-graphic" role="img" aria-label="The gap between a demo that impresses and a system that survives production: assurance inflation, silent failures, context bloat, and unattended drift.">
  <div class="gap-cols">
    <div><h4>The demo</h4><ul><li>Impresses in 5 minutes</li><li>Happy path, watched</li><li>"It works"</li></ul></div>
    <div class="gap-mid"><span>assurance inflation</span><span>silent failures</span><span>context bloat</span><span>unattended drift</span></div>
    <div><h4>Production</h4><ul><li>Runs unwatched at 3am</li><li>Fails in ways the demo hid</li><li>"Show me the receipt"</li></ul></div>
  </div>
  <figcaption>The harness is what closes this gap.</figcaption>
</figure>
```
Add scoped CSS for `.gap-cols` (3-col grid, stacks on mobile) and `.gap-mid span` (amber chips) to the `<style>` block.

- [ ] **Step 4: Build + visual check.** `npm run build` (exit 0); preview shows the summary, Part I prose, and the 3-column gap graphic (stacks on narrow width).
- [ ] **Step 5: Commit** (`feat(whitepaper): executive summary + the problem + demo→production graphic`).

---

## Task 3: Pillar 2 — Context Engineering + four-layer pyramid graphic

**Files:**
- Modify: `src/pages/harness-engineering.astro`

**Interfaces:**
- Consumes: `.pillar`, `.vp`, `.war`, `figure.graphic`.
- Produces: `.layers` CSS (reused visual language for stacked-tier graphics).

- [ ] **Step 1: Write the pillar section.** `<section class="pillar">` with `<h2>2 · Context Engineering</h2>`, a `<p class="vp">` value prop ("An agent that stays accurate and cheap at scale."), then mechanism prose from HANDBOOK Part 1 + 2.1/2.2/2.5: four-layer placement model, the placement test ("Would removing this cause Claude to make mistakes?"), CLAUDE.md concision, counts-as-pointers, per-fact memory stores.

- [ ] **Step 2: Add the war story.**

```html
<div class="war"><b>War story · count drift.</b> A project CLAUDE.md hard-coded "59 endpoints." The real number drifted to 141 while the file still said 59. The fix became a rule: <em>counts are pointers, not numbers</em> — never write the count, write the command that counts them. (HANDBOOK 2.2.)</div>
```

- [ ] **Step 3: Add Graphic 4 — four-layer pyramid + cost model.** Styled HTML using the four-layer data from the Graphic-data reference. Each row: tier name, "loaded when", contents, cost model. Color intensity decreases from Layer 0 (hot) down. `role="img"` + aria-label naming all four layers and the placement rule.

```html
<figure class="graphic" role="img" aria-label="Four-layer context placement model. Layer 0 Always-on: loaded every turn and inherited by every subagent, paid on every call. Layer 1 Auto-triggered: on trigger match, paid only when relevant. Layer 2 On-demand: when opened, free until needed. Layer 3 Unattended: on schedule, governed by loop policy. Rule: content lives at the cheapest layer that still gets it applied.">
  <div class="layers">
    <div class="layer l0"><div class="tier">0 · ALWAYS-ON</div><div class="what"><b>~/CLAUDE.md, project CLAUDE.md, memory index</b> — every turn, inherited by every subagent. <span class="cost">Paid on EVERY call — keep ruthlessly lean.</span></div></div>
    <div class="layer l1"><div class="tier">1 · AUTO-TRIGGERED</div><div class="what"><b>Skills</b> — load on trigger-phrase match. <span class="cost">Paid only when relevant.</span></div></div>
    <div class="layer l2"><div class="tier">2 · ON-DEMAND</div><div class="what"><b>Operating reference, lessons, memory bodies</b> — when explicitly opened. <span class="cost">~Free until needed.</span></div></div>
    <div class="layer l3"><div class="tier">3 · UNATTENDED</div><div class="what"><b>Nightly loops, cloud routines</b> — on schedule. <span class="cost">Governed by loop policy.</span></div></div>
  </div>
  <figcaption>Placement rule: content lives at the cheapest layer that still gets it applied.</figcaption>
</figure>
```
Add `.layers`, `.layer`, `.tier`, `.what`, `.cost`, and `.l0/.l1/.l2/.l3` (decreasing accent opacity) to the `<style>` block.

- [ ] **Step 4: Build + visual check.** Pillar renders; four tiers show a clear hot→cool gradient; war-story callout has the amber left border.
- [ ] **Step 5: Commit** (`feat(whitepaper): pillar 2 context engineering + four-layer graphic`).

---

## Task 4: Pillar 3 — Evidence Over Assertion (crown jewel) + Ledger before/after graphic

**Files:**
- Modify: `src/pages/harness-engineering.astro`

- [ ] **Step 1: Write the pillar.** `<h2>3 · Evidence Over Assertion</h2>`, `<p class="vp">The end of false "done."</p>`. Mechanism from HANDBOOK 2.1 (Evidence Ledger schema fields), 2.3 (verification top practice), 2.9 (`make verify`, prove-it-fails-correctly, declared tolerances), and the blind-oracle floor (2.3). List the Ledger fields verbatim: Implemented / Compiled & ran (paste the line) / Scenarios tested (named, never counts) / Not tested / Domain validity / Production ready; and the banned words (verified, proven, fully, complete, independent).

- [ ] **Step 2: Add the war story.**

```html
<div class="war"><b>War story · the 77-minute run.</b> The harness had three prose rules against assurance inflation. A 77-minute run still reported "fully verified" work that wasn't. The lesson: dispositional instructions ("be calibrated") lose to fill-the-schema instructions. The Evidence Ledger — a fixed schema you must complete — replaced the prose and was adopted 2026-07-16. (HANDBOOK 2.1.)</div>
```

- [ ] **Step 3: Add Graphic 5 — Evidence Ledger before/after.** Two-panel styled HTML: left "Assertion" (a red ✗ "fully verified ✓" bubble), right "Evidence" (the Ledger schema as a checklist with one field filled in as example). aria-label describing both panels.

- [ ] **Step 4: Build + visual check.** Two-panel graphic legible; ledger fields listed; banned-words line present.
- [ ] **Step 5: Commit** (`feat(whitepaper): pillar 3 evidence over assertion + ledger graphic`).

---

## Task 5: Pillar 4 — Deterministic Enforcement + prose-decay-vs-hook graphic

**Files:**
- Modify: `src/pages/harness-engineering.astro`

- [ ] **Step 1: Write the pillar.** `<h2>4 · Deterministic Enforcement</h2>`, `<p class="vp">Advisory rules become guarantees.</p>`. Mechanism from HANDBOOK 2.7 (hooks over prose; the SessionStart preflight's five checks, exception-based), 2.8 (permissions deny-floor, scope precedence deny-first, secrets floor at user scope). Key line: "anything 'always do X' is a hook, not a sentence."

- [ ] **Step 2: Add the war story.**

```html
<div class="war"><b>War story · the silent PATH failure.</b> A nightly loop's receipt said "opened draft PR" — but the <code>gh</code> call had failed (<code>command not found</code>, launchd's bare PATH) and the receipt asserted success without checking the exit code. Rules earned: gate every success message on the actual exit code; never <code>2&gt;/dev/null</code> a step whose failure you'd want to know about. (HANDBOOK 3.1.)</div>
```

- [ ] **Step 3: Add Graphic 6 — prose decay vs hook.** Inline SVG: a decaying curve ("instruction adherence") falling as context length grows, versus a flat line at 100% labeled "hook (deterministic)." Axis labels: x = "context length", y = "probability rule fires". `role="img"` + aria-label. Keep it a simple 2-path SVG (~120px tall) using `currentColor`/var for strokes so print flips cleanly.

```html
<figure class="graphic" role="img" aria-label="A prose instruction's probability of firing decays as context length grows, while a hook stays flat at 100 percent because it is deterministic.">
  <svg viewBox="0 0 600 200" width="100%" height="auto">
    <line x1="50" y1="170" x2="580" y2="170" stroke="var(--paper-rule)"/>
    <line x1="50" y1="20" x2="50" y2="170" stroke="var(--paper-rule)"/>
    <path d="M50,40 C200,45 380,120 580,160" fill="none" stroke="#f59e0b" stroke-width="3"/>
    <line x1="50" y1="35" x2="580" y2="35" stroke="var(--paper-accent)" stroke-width="3"/>
    <text x="560" y="30" fill="var(--paper-accent)" font-size="13" text-anchor="end">hook (deterministic)</text>
    <text x="300" y="110" fill="#f59e0b" font-size="13">prose instruction (decays)</text>
    <text x="315" y="192" fill="var(--paper-muted)" font-size="12" text-anchor="middle">context length →</text>
  </svg>
  <figcaption>Sentences are probabilistic; the probability decays with context length. Hooks don't.</figcaption>
</figure>
```

- [ ] **Step 4: Build + visual check.** SVG renders; two labeled paths; preview legible.
- [ ] **Step 5: Commit** (`feat(whitepaper): pillar 4 deterministic enforcement + prose-vs-hook graphic`).

---

## Task 6: Pillar 5 — Institutional Memory & Learning + lesson-lifecycle graphic

**Files:**
- Modify: `src/pages/harness-engineering.astro`

- [ ] **Step 1: Write the pillar.** `<h2>5 · Institutional Memory & Learning</h2>`, `<p class="vp">A system that compounds — and stops repeating its mistakes.</p>`. Mechanism from HANDBOOK 2.4 (lessons files: ID · Date · Cost · Symptom→Cause→Rule→Recovery; cost field load-bearing; append-only IDs) and 2.5 (per-fact memory + provenance + periodic audit + anti-poisoning scan). Cite the structured-note-taking grounding + the 84%/39% memory figures.

- [ ] **Step 2: Add the war story.**

```html
<div class="war"><b>War story · the audit that found the gaps.</b> A memory audit found one project's store completely empty and another violating its own schema wholesale — both silently, both for active projects. The discipline isn't optional: memory that isn't audited quietly rots. (HANDBOOK 2.5.)</div>
```

- [ ] **Step 3: Add Graphic 7 — lesson lifecycle loop.** Inline SVG or styled HTML ring: Correction → Symptom → Cause → Rule (mechanical) → priced with Cost → recalled at session start → prevents recurrence → (loop). aria-label naming the stages.

- [ ] **Step 4: Build + visual check.** Lifecycle graphic renders; the Symptom→Cause→Rule format is shown; cost field called out.
- [ ] **Step 5: Commit** (`feat(whitepaper): pillar 5 memory & learning + lesson-lifecycle graphic`).

---

## Task 7: Pillar 6 — Unattended Autonomy (flagship) + six-part loop + safe-ramp graphics + agentic-os cross-link

**Files:**
- Modify: `src/pages/harness-engineering.astro`

- [ ] **Step 1: Write the pillar (summarize, do NOT re-narrate agentic-os).** `<h2>6 · Unattended Autonomy</h2>`, `<p class="vp">Run it overnight. Wake to a receipt you can trust.</p>`. Cover, tightly (HANDBOOK Part 4): the six-part loop doctrine, the four exits in priority order, the earned-autonomy trust ledger (tops out below auto-merge), BLOCKED-not-DONE receipts. Keep the *lived operations story* short and cross-link:

```html
<p class="muted">I run this every night. The full operations story — live receipts, named kill switches, the trust ledger in action — is its own case study: <a href="/agentic-os/">Operating an Agentic OS →</a>. Here I focus on the engineering doctrine that makes it safe.</p>
```

- [ ] **Step 2: Add Graphic 8 — six-part loop flow (centerpiece).** Inline SVG horizontal flow, 6 nodes with arrows, using the six-part data. Each node: number + label. Node 4 (verifier) visually emphasized (accent border) as the maker-is-never-grader gate. `role="img"` + full aria-label naming all six parts.

```html
<figure class="graphic" role="img" aria-label="The six-part unattended loop: 1 trigger, 2 rules-load (quarantine-scan lessons first), 3 executor (one bounded goal, scoped tools, isolated worktree), 4 verifier (separate fresh-context zero-tool model grades the diff), 5 memory write (append-only ledgers committed to git), 6 stop check (green and verified opens a draft PR, anything else emits a BLOCKED receipt).">
  <div class="loop6">
    <div class="node"><em>1</em>Trigger<span>launchd / cron / cloud routine</span></div>
    <div class="node"><em>2</em>Rules-load<span>quarantine-scan lessons first</span></div>
    <div class="node"><em>3</em>Executor<span>one bounded goal · scoped tools · isolated worktree</span></div>
    <div class="node verifier"><em>4</em>Verifier<span>separate fresh-context zero-tool model grades the diff</span></div>
    <div class="node"><em>5</em>Memory write<span>append-only ledgers, committed</span></div>
    <div class="node"><em>6</em>Stop check<span>green+verified → draft PR · else → BLOCKED</span></div>
  </div>
  <figcaption>One bounded unit per cycle. The maker is never the grader.</figcaption>
</figure>
```
Add `.loop6` (responsive flex row → column, arrows via `::after` on `.node`) and `.node.verifier` (accent border) to `<style>`.

- [ ] **Step 2b: Add Graphic 9 — the safe-autonomy ramp.** Styled HTML stepped bar: manual run → skill → STATE/receipts → hard binary gate → schedule. Caption: "Each step's value is provable before the next step's complexity." Include the four-exits as a small inline list beside/below it.

- [ ] **Step 3: Build + visual check.** Six-node loop renders (node 4 emphasized); ramp renders; agentic-os link resolves in preview.
- [ ] **Step 4: Commit** (`feat(whitepaper): pillar 6 unattended autonomy + loop & ramp graphics`).

---

## Task 8: Pillar 7 — Multi-Agent & Safety + reader/actor-boundary + tool-ladder graphics + cross-link

**Files:**
- Modify: `src/pages/harness-engineering.astro`

- [ ] **Step 1: Write the pillar.** `<h2>7 · Multi-Agent & Safety Discipline</h2>`, `<p class="vp">Parallelism and untrusted input — without the foot-guns.</p>`. Mechanism from HANDBOOK 3.4 (fresh-context verification, ask-for-all-findings-then-filter), 3.5 (reader/actor quarantine), 3.3 (multi-worktree shared-state hazards — never stash, own worktrees for parallel implementers), 3.6 (tool ladder). Cross-link agentic-os once for the quarantine narrative (short).

- [ ] **Step 2: Add Graphic 10 — reader/actor trust boundary.** Inline SVG or styled HTML: left "Reader agent (read-only)" ingests untrusted content (scraped pages, emails, vendored bundles); a dashed **trust boundary**; right "Actor agent (write/deploy)" never parses raw untrusted input. Arrow of *sanitized data only* crossing. aria-label describing the boundary.

- [ ] **Step 2b: Add Graphic 11 — tool ladder.** Styled HTML 3-rung ladder: CLI/API (preferred) → headless script → browser (fallback, 2–3 attempt cap). Caption: "Probe with CLIs before dashboards; never describe another product's UI from memory."

- [ ] **Step 3: Build + visual check.** Both graphics render; trust boundary visually distinct (dashed); ladder ordered top-preferred.
- [ ] **Step 4: Commit** (`feat(whitepaper): pillar 7 multi-agent & safety + boundary/ladder graphics`).

---

## Task 9: Pillar 8 — Governance & Honest Trade-offs + solo→team matrix graphic

**Files:**
- Modify: `src/pages/harness-engineering.astro`

- [ ] **Step 1: Write the pillar.** `<h2>8 · Governance & Honest Trade-offs</h2>`, `<p class="vp">Staff-level judgment: knowing exactly what to change at scale.</p>`. Mechanism from HANDBOOK 2.1 (propose-only self-governance — model drafts diffs to governing files, human approves) + Part 5 framing (context determines correctness; solo velocity vs team blast-radius).

- [ ] **Step 2: Add Graphic 12 — solo→team trade-off matrix.** An HTML `<table>` (accessible, print-friendly) copying HANDBOOK Part 5 verbatim: columns "Choice here | Why (solo) | Team alternative"; rows: broad allow list; propose-only governance; prose+hook hybrid; per-project memory; curl allowed; no agent teams. Wrap in `figure.graphic` with a caption; table scrolls horizontally on mobile (`overflow-x:auto`).

- [ ] **Step 3: Build + visual check.** Table renders all six rows; horizontal scroll works on narrow width; no page overflow.
- [ ] **Step 4: Commit** (`feat(whitepaper): pillar 8 governance & trade-offs + matrix`).

---

## Task 10: Part III — Adoption path (timeline) + citation map

**Files:**
- Modify: `src/pages/harness-engineering.astro`

- [ ] **Step 1: Write "9 · Adoption path."** `<h2>9 · Adoption Path</h2>`, `<p class="vp">Transferable and teachable — the mentor's signal.</p>`. Prose from HANDBOOK Part 6 (Day 1 / Week 1 / Month 1), each step provable before the next.

- [ ] **Step 2: Add Graphic 13 — adoption timeline.** Styled HTML 3-column timeline (Day 1 / Week 1 / Month 1) with the bullet items from the Graphic-data reference. aria-label summarizing the ramp.

- [ ] **Step 3: Write "10 · Grounded in primary sources."** `<h2>10 · Grounded in Primary Sources</h2>`, `<p class="vp">Rigor, not invention.</p>`. Explain the §7 rejected-practices discipline (every new article triaged DUPLICATE/REJECTED/CONFLICT/NEW).

- [ ] **Step 4: Add Graphic 14 — practice→source citation map.** Styled HTML two-column mapping: left = practice (Context layering, Evidence Ledger, Hooks, Memory, Loop doctrine, Permissions, Tool ladder); right = the linked Anthropic source(s) from the Graphic-data reference. Real `<a>` links (open in new tab). aria-label describing it as a citation map.

- [ ] **Step 5: Build + visual check.** Timeline + citation map render; all citation links valid (spot-check 2–3 resolve).
- [ ] **Step 6: Commit** (`feat(whitepaper): part III adoption path + citation map`).

---

## Task 11: Back matter — author bio + Appendix A (inventory) + Appendix B (sources & gaps)

**Files:**
- Modify: `src/pages/harness-engineering.astro`

- [ ] **Step 1: Write "About the author / role fit."** `<h2>About the author</h2>`. Draft from the `reference_drdgreed_identity` memory (handles, patents, prior roles). State which roles this evidences: AI-platform engineering, staff/lead, agentic QA. Mark with an HTML comment `<!-- DRAFT BIO — David to confirm/edit -->` so it's flagged at review.

- [ ] **Step 2: Add Appendix A — file-by-file inventory table.** HTML `<table>` from HANDBOOK Part 2: file | layer | purpose (one row per file: ~/CLAUDE.md, project CLAUDE.md, CLAUDE_SETUP.md, lessons files, memory stores, skills, hooks, settings.json, make verify). Wrap in `overflow-x:auto`.

- [ ] **Step 3: Add Appendix B — source index + known gaps.** The source table (HANDBOOK source index) as links, plus an honest "Known gaps" list ported from HANDBOOK Part 7 (e.g., no deterministic Stop-hook gate yet; blind-oracle policy-not-yet-practiced). Honesty is the credibility play — keep it.

- [ ] **Step 4: Build + visual check.** Bio present with DRAFT comment; both appendix tables render and scroll on mobile.
- [ ] **Step 5: Commit** (`feat(whitepaper): back matter — bio, inventory, sources & gaps`).

---

## Task 12: Print stylesheet + "Save as PDF" button (the PDF, Option A)

**Files:**
- Modify: `src/pages/harness-engineering.astro`

**Interfaces:**
- Consumes: the `--paper-*` CSS variables (Task 1) — the print override flips them in one place.

- [ ] **Step 1: Add the print button + anchor.** In the hero (or a fixed corner), add a real control. Reuse the `#pdf`/`data-print-link` anchor already placed in Task 1's receipts-note.

```html
<button type="button" id="pdf" data-print-btn class="printbtn" aria-label="Save this white paper as PDF">⬇ Save as PDF</button>
```

- [ ] **Step 2: Add the inline `<script>`** (single, at the end of the page).

```astro
<script>
  // PDF via the browser's native print-to-PDF. Zero dependencies (spec §6, Option A).
  const print = () => window.print();
  document.querySelector('[data-print-btn]')?.addEventListener('click', print);
  document.querySelector('[data-print-link]')?.addEventListener('click', (e) => { e.preventDefault(); print(); });
</script>
```

- [ ] **Step 3: Add the `@media print` block** to the `<style>`. Flip the paper to light; hide interactive chrome; keep graphics unbroken.

```css
@media print {
  .paper { --paper-bg:#fff; --paper-fg:#111; --paper-muted:#444; --paper-accent:#0f766e; --paper-rule:#ccc; max-width:100%; padding:0; }
  .printbtn, .dualtrack { display:none; }
  .paper a { color:#0f766e; text-decoration:underline; }
  figure.graphic, .war, .receipt, table { break-inside: avoid; page-break-inside: avoid; }
  h2 { break-after: avoid; }
  body { background:#fff; }
  /* BaseLayout nav/footer are outside .paper; hide site chrome for the paper PDF */
  header, footer, nav { display:none !important; }
}
.printbtn { background: var(--paper-accent); color:#04201c; border:0; border-radius:8px; padding:.6rem 1rem; font-weight:700; cursor:pointer; margin:1rem 0; }
```

- [ ] **Step 4: Build + PRINT check.** `npm run build` (exit 0); preview, click "Save as PDF" (or Cmd-P). Expected in the print preview: white background, dark text, teal accents preserved, nav/footer gone, no graphic split across a page break, all 14 graphics legible. This is the core acceptance test for the PDF deliverable.
- [ ] **Step 5: Commit** (`feat(whitepaper): print stylesheet + Save-as-PDF button (Option A)`).

---

## Task 13: Portfolio card

**Files:**
- Modify: `src/data/portfolio.ts`

**Interfaces:**
- Consumes: `PortfolioItem` type (existing); the portfolio page's modal (existing, no change).

- [ ] **Step 1: Add the card entry.** Insert a new object into `portfolioItems`, placed second (right after the `casestudy-1` agentic-os entry) so it reads as a flagship. Match the existing voice (© prefix, value-forward, honest).

```ts
{
  id: 'whitepaper-harness',
  title: '© The Production Harness: Engineering AI Agents You Can Walk Away From',
  description:
    'Anyone can prompt an agent. The engineering is everything around the model call. This white paper documents the seven-pillar discipline behind a production Claude Code harness — context layering priced by what it costs every call, an Evidence Ledger that ends false "done," hooks that turn advisory rules into guarantees, and unattended loops whose autonomy tops out below auto-merge by design. Every practice traced to Anthropic’s own engineering guidance; every pillar earned through a documented failure. Read the full white paper →',
  fullDescription:
    'A definitive, graphics-rich white paper on production harness engineering for autonomous AI agents, reorganized into seven capability pillars: (1) Context Engineering — a four-layer placement model where content lives at the cheapest layer that still gets it applied; (2) Evidence Over Assertion — a fixed Evidence Ledger schema that beat three prose rules after a 77-minute run reported "fully verified" work that wasn’t; (3) Deterministic Enforcement — hooks and a permissions deny-floor that make "always do X" a guarantee, not a decaying sentence; (4) Institutional Memory & Learning — priced, append-only lessons and audited per-fact memory; (5) Unattended Autonomy — a six-part loop doctrine, four priority-ordered exits, and an earned-autonomy trust ledger that never reaches auto-merge; (6) Multi-Agent & Safety Discipline — fresh-context verification, a reader/actor quarantine against prompt injection, and multi-worktree hazard rules; (7) Governance & Honest Trade-offs — propose-only self-governance and an explicit solo-vs-team matrix. Closes with a Day-1/Week-1/Month-1 adoption path and a practice-to-primary-source citation map. Grounded throughout in Anthropic’s published engineering guidance; complements the /agentic-os/ operations case study.',
  category: 'whitepaper',
  tags: ['Agentic AI', 'Harness Engineering', 'Claude Code', 'AI Safety', 'Verification', 'Context Engineering', 'AI Operations'],
  link: '/harness-engineering/',
  metrics: '7 Capability Pillars · Primary-Source Cited',
  featured: true,
},
```

- [ ] **Step 2: Build + visual check.** `npm run build` (exit 0); preview `/portfolio/`. Expected: the card appears second; filters under "White Papers"; clicking opens the modal with the full description; the "View Project →" button navigates to `/harness-engineering/`.
- [ ] **Step 3: Commit** (`feat(whitepaper): add portfolio card linking to the white paper`).

---

## Task 14: Cross-links + final acceptance pass

**Files:**
- Modify: `src/content/blog/harness-engineering-production-agentic-ai.mdx`
- Modify: `src/content/blog/pacca-iter-0-harness-engineering.mdx`

- [ ] **Step 1: Add a closing cross-link to each blog post.** Append one line near the end of each (do not restructure the posts):

`> **The complete system:** this discipline, applied end-to-end and grounded in Anthropic's own guidance, is documented in [The Production Harness white paper](/harness-engineering/).`

- [ ] **Step 2: Full build.** Run: `npm run build`. Expected: exit 0; `/harness-engineering/index.html`, `/portfolio/index.html`, and both blog pages emit with no broken-link/MDX errors.
- [ ] **Step 3: Acceptance pass (preview).** Run `npm run preview` and verify the spec §8 checklist:
  - `/harness-engineering/` renders end-to-end; single `<h1>`; all seven pillars + both appendices present.
  - All 14 graphics render on screen **and** in Cmd-P print preview (white bg, legible, unbroken).
  - Portfolio card → modal → button → paper works.
  - Cross-links resolve both ways: paper→`/agentic-os/`; both blog posts→paper.
  - No `Timecone` anywhere: `grep -ri timecone src/pages/harness-engineering.astro src/data/portfolio.ts` returns nothing.
  - No horizontal page overflow on mobile width (tables/graphics scroll inside their own container).
- [ ] **Step 4: Content-integrity spot check.** Pick 3 stats/war-stories in the page and confirm each matches `~/claude-harness/tasks/HARNESS_HANDBOOK.md`. Fix any drift.
- [ ] **Step 5: Commit** (`feat(whitepaper): cross-links from blog posts + final acceptance pass`).
- [ ] **Step 6: Open PR** (if the workflow calls for it) off `feat/harness-engineering-whitepaper` → `main`, body summarizing the deliverable and linking the spec.

---

## Self-Review

**Spec coverage:** Every spec section maps to a task — §3.1 page → T1–T12; §3.2 card → T13; §3.3 PDF → T12; §4 pillars → T2–T11 (front matter T1–T2, pillars 2–8 → T3–T9, Part III → T10, back matter → T11); §5 graphics → distributed across T2–T11 (all 14 named); §6 PDF Option A → T12; §7 design/SEO → T1; §8 verification → T14; §2 agentic-os cross-links → T7/T8; blog cross-links → T14. No gaps.

**Placeholder scan:** War-story callouts, the four graphics with the most structure (four-layer, ledger, prose-decay SVG, six-part loop, trade-off table, card data) carry real content/code. Prose-heavy steps name the exact HANDBOOK section to author from rather than transcribing full paragraphs — deliberate (the handbook is the source of truth; transcribing it into the plan would duplicate and risk drift). Graphics 5, 7, 10, 11, 13 give concrete structure + data + accessibility requirements rather than full SVG; acceptable because their build technique is fixed and their data is in the Graphic-data reference. No "TBD/TODO/handle edge cases."

**Type/name consistency:** CSS class names are consistent across tasks (`.paper`, `.pillar`, `.vp`, `.war`, `figure.graphic`, `.layers`, `.loop6`, `.printbtn`); `--paper-*` variables defined in T1 and only re-flipped in T12; `id="pdf"`/`data-print-btn`/`data-print-link` defined in T1 and wired in T12; `PortfolioItem` fields match the existing type; route `/harness-engineering/` identical everywhere.
