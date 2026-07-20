# Harness Engineering White Paper — Design Spec

**Date:** 2026-07-20
**Owner:** David Reed
**Repo:** `drdavidreed-astro` (deploys to drdavidreed.com via Vercel)
**Status:** Approved outline → spec (this doc) → implementation plan (next)

---

## 1. Purpose & audience

A definitive, graphics-rich white paper documenting David Reed's production Claude Code
harness practices, published as a portfolio centerpiece. Two audiences, one document:

- **Recruiters** skim the value propositions, receipt stats, and diagrams — and come away
  with "this person builds *and* operates production AI-agent systems."
- **Technical managers** drill into the mechanism, the war stories, and the primary-source
  citations — and come away convinced the rigor is real, not asserted.

**Dual-track thesis (the through-line of every section):** the rare combination of *frontier
agentic-AI fluency* (the mechanism) and *classical staff-engineer judgment* (the trade-off).
Every pillar must demonstrate both.

**Source of truth for content:** `~/claude-harness/tasks/HARNESS_HANDBOOK.md` (the
engineer-facing handbook — 7 parts, fully cited against Anthropic docs, with real incident
case studies). The white paper *reorganizes and re-voices* that material for this audience;
it does not invent new claims.

---

## 2. Relationship to existing site content (the key design decision)

Three pieces of adjacent content already exist. The white paper must be **canonical and
comprehensive without duplicating them**:

| Existing piece | What it is | Relationship to the white paper |
|---|---|---|
| `/agentic-os/` (`src/pages/agentic-os.astro`) | Punchy **operations case study** — receipts, kill switches, the "nobody's watching" story. Covers four-layer model, maker-never-grader, reader/actor quarantine, trust ledger, model routing. | The white paper is the **comprehensive reference**; agentic-os is the **vivid narrative**. Where they overlap (Pillars 6–7), the white paper **summarizes and cross-links to `/agentic-os/`** rather than re-narrating. They point at each other. |
| Blog: `harness-engineering-production-agentic-ai.mdx` ("Stop Iterating Prompts…") | 5-min conceptual intro to harness engineering as a *discipline* (Lin et al.), PACCA-framed. | The white paper is the **applied, personal, full-system** treatment. Blog post gets a closing cross-link to the white paper as "the complete system." |
| Blog: `pacca-iter-0-harness-engineering.mdx` | PACCA-specific harness iteration log. | Tangential; no change required. May earn a cross-link. |

**Differentiators the white paper owns exclusively** (nothing else on the site has these):
the full **seven-pillar** treatment, **file-by-file architecture**, the **adoption path**
(Day 1 / Week 1 / Month 1), the **honest solo-vs-team trade-off matrix**, and the
**primary-source citation map**. These are the "transferable engineering discipline" and
"teachable" signals — the staff/lead/mentor half of the dual track.

**Rule of thumb during drafting:** if a paragraph would read nearly identically on
`/agentic-os/`, cut it to two sentences and link. The white paper's job is *breadth +
transfer + citation*, not re-telling the operations story.

---

## 3. Deliverables & architecture

Three artifacts, one source:

### 3.1 The full paper — `src/pages/harness-engineering.astro`
A standalone Astro page following the **established pattern** (`agentic-os.astro`,
`agentic-ops.astro`): `BaseLayout` (nav + footer + SEO) wrapping an `<article>` with a
**page-scoped `<style>` block**. Site typography (Playfair Display + Inter) and color tokens.
Route: **`/harness-engineering/`**.

### 3.2 The portfolio card — one entry in `src/data/portfolio.ts`
A new `PortfolioItem`:
- `category: 'whitepaper'`
- `title`: e.g. `"© The Production Harness: Engineering AI Agents You Can Walk Away From"`
- `description`: the card summary (2–4 sentences, value-forward — matches the voice of the
  existing cards)
- `fullDescription`: the modal long-form (one dense paragraph)
- `link: '/harness-engineering/'`
- `metrics`: e.g. `"7 Capability Pillars · Primary-Source Cited"`
- `featured: true`
- Placed near the top of the array (after the agentic-os case study) so it reads as a
  flagship. The existing modal + "View Project →" button already implement the
  "summary card → button → full paper" mechanic with **zero new code**.

### 3.3 The downloadable PDF — from the same page source
See §6. Single-source: the Astro page carries a **print stylesheet** so the same DOM renders
as a clean light-background paper. The PDF is produced from that page (mechanism decided in §6).

---

## 4. Content specification — the seven pillars

Structure (approved outline). Each pillar opens with a **one-line value proposition** (bold,
recruiter-legible), then **mechanism** (how it works), then a **war story** callout
(concrete, named), then its **graphic**. Word budgets are targets, not limits.

**Front matter**
- **Hero** — title, dek, byline (match agentic-os byline format), a **receipts strip**
  (real stats: e.g. lessons logged, loops in production, sources verified). Dual-track badge
  line. *Graphic 1: harness system map.*
- **Executive summary** (~200 words) — what a harness is; the headline outcome ("walk away
  from an autonomous run and trust the receipt"); the dual-track claim stated plainly.
  *Graphic 2: at-a-glance stat strip (can share DOM with the receipts strip).*

**Part I — The problem**
1. **Why agentic coding needs a harness** (~250 words) — the demo-to-production gap:
   assurance inflation, silent failures, context bloat, unattended drift. *Graphic 3: "demo
   → production" gap.* (Keep tight — overlaps agentic-os's "problem nobody demos"; take a
   *different angle*: the engineering-substrate framing, not the operations framing.)

**Part II — The seven capability pillars**
2. **Context Engineering** — *VP: an agent that stays accurate and cheap at scale.*
   Four-layer placement model, CLAUDE.md concision + placement test, counts-as-pointers,
   per-fact memory stores. *War story: the 59→141 endpoint-count drift.* *Graphic 4:
   four-layer pyramid + cost model.*
3. **Evidence Over Assertion** *(crown jewel)* — *VP: the end of false "done."*
   The Evidence Ledger schema, verification-first, `make verify`, prove-it-fails-correctly,
   the blind oracle. *War story: the 77-minute run that reported "fully verified" — and the
   schema fix that beat three prose rules.* *Graphic 5: Evidence Ledger before/after.*
4. **Deterministic Enforcement** — *VP: advisory rules become guarantees.*
   Hooks over prose, the SessionStart preflight, the permissions deny-floor + scope
   precedence. *War story: the launchd PATH silent failure ("opened draft PR" while `gh`
   never ran).* *Graphic 6: prose-decay vs hook.*
5. **Institutional Memory & Learning** — *VP: a system that compounds and stops repeating
   mistakes.* Lessons files (Symptom→Cause→Rule, priced), the self-improvement loop, memory
   audit + provenance, anti-poisoning scan. *War story: the audit that found one memory
   store empty and another schema-violating — both silently.* *Graphic 7: lesson lifecycle.*
6. **Unattended Autonomy** *(flagship AI capability)* — *VP: run it overnight; wake to a
   receipt you can trust.* Six-part loop doctrine, the safe ramp, four exits (priority
   order), earned-autonomy trust ledger, BLOCKED-not-DONE receipts. **Summarize + cross-link
   `/agentic-os/` for the lived story.** *Graphic 8: six-part loop flow (centerpiece).
   Graphic 9: the safe-autonomy ramp.*
7. **Multi-Agent & Safety Discipline** — *VP: parallelism and untrusted input without
   foot-guns.* Fresh-context verification, reader/actor quarantine, multi-worktree
   shared-state hazards, prompt-injection hygiene, the tool ladder. **Cross-link agentic-os
   for quarantine narrative.** *Graphic 10: reader/actor trust boundary. Graphic 11: tool
   ladder.*
8. **Governance & Honest Trade-offs** — *VP: staff-level judgment — knows exactly what to
   change at scale.* Propose-only self-governance; the solo-vs-team trade-off table verbatim
   from the handbook (it's already recruiter-gold). *Graphic 12: solo→team matrix.*

**Part III — Transfer & credibility**
9. **Adoption path** — *VP: transferable and teachable (the mentor/lead signal).* Day 1 /
   Week 1 / Month 1, each step provable before the next. *Graphic 13: adoption timeline.*
10. **Grounded in primary sources** — *VP: rigor, not invention.* Every practice tied to
    Anthropic's own engineering docs; the §7 "rejected-practices" discipline. *Graphic 14:
    practice → source citation map.*

**Back matter**
11. **About the author / role fit** — short bridge; which roles this evidences (AI-platform
    eng, staff/lead, agentic QA). Pull identity facts from the `reference_drdgreed_identity`
    memory; David confirms final copy.
- **Appendix A** — file-by-file inventory table (technical-manager proof layer).
- **Appendix B** — source index + **known gaps** (intellectual honesty = credibility; port
  the handbook's Part 7 honestly).

---

## 5. Graphics — build approach

~14 graphics. **No Mermaid** in this project → all graphics are **hand-authored inline SVG**
or **styled HTML/CSS blocks** (the agentic-os `.layers` pattern is the reference for the
latter). Both render identically on web and in the print/PDF path.

**Technique per graphic type:**
- *Structural/hierarchical* (four-layer pyramid, adoption timeline, trade-off matrix, stat
  strips): styled **HTML/CSS** — accessible, text-selectable, easy to theme for print.
- *Flow/relationship* (six-part loop, safe ramp, reader/actor boundary, tool ladder,
  citation map, before/after ledger, prose-decay curve): inline **SVG** with `<title>`/
  `role="img"` + `aria-label` for accessibility.
- **Color:** use the site's existing token palette (teal/blue/purple/amber/rose per
  category, matching `portfolio.astro`'s `categoryColor`) so the paper feels native.
- **Print rule:** every graphic must be legible on white at print DPI — SVGs use
  `currentColor` / token vars that the print stylesheet remaps to dark-on-light.
- **Accessibility floor:** every SVG graphic has a text alternative; no information is
  conveyed by color alone (pair color with label/shape).

A per-graphic sketch (rough layout + data) belongs in the **implementation plan**, not this
spec.

---

## 6. PDF export — decision required

Goal: "downloadable PDF recruiters can save/forward," **from the single page source**.
Two viable mechanisms — **this is an open decision for the review gate (§9):**

- **Option A — Print stylesheet + `window.print()` (recommended for v1).** A "Download /
  Print PDF" button calls `window.print()`; an `@media print` block restyles the page to a
  light, paginated paper (hide nav/footer, dark→light, avoid page-break-inside on graphics).
  *Gain:* zero new dependencies, truly single-source, ships immediately, always in sync with
  the page. *Give up:* no pre-hosted `.pdf` URL to paste into an email — the recruiter
  generates the file via their browser's "Save as PDF."
- **Option B — Headless-render to a static `public/harness-engineering-whitepaper.pdf`.** A
  build/export script (Playwright or Puppeteer — **a new dev dependency**) renders the
  print-optimized page to a committed PDF; the button is a normal download link. *Gain:* a
  real forwardable file at a stable URL. *Give up:* a new dependency + an export step that
  can drift from the page if not run; per CLAUDE.md, a new dep is proposed, not silently
  installed.

**Recommendation:** ship **Option A** with the print stylesheet built to paper quality, and
treat **Option B** as a fast follow *iff* David wants a hosted PDF URL. Either way the print
stylesheet is required work, so A is a strict prerequisite of B — no wasted effort.

---

## 7. Design system, SEO, and conventions

- **Layout:** `BaseLayout` with `title`, `description`, `path="/harness-engineering/"`,
  `pageType="article"` (matches agentic-os).
- **Typography/colors:** reuse site tokens; page-scoped `<style>` for paper-specific
  classes (eyebrow, dek, receipts, pillar, vp, war-story callout, graphic figures).
- **SEO:** descriptive `<title>`/meta; the page is a first-class route (in sitemap
  automatically; not under `/draft/`). Consider an OG image (existing
  `scripts/generate-og-image.mjs` pattern) — optional, flag in plan.
- **Copyright/voice:** match the existing "©"-prefixed, receipts-over-claims voice. Honest
  hedging where the handbook hedges (e.g., gaps appendix) — it *builds* credibility with this
  audience.
- **No React island needed** — the paper is static content; any interactivity (e.g., the PDF
  button, section anchors) is a small inline `<script>`, matching portfolio.astro's approach.

---

## 8. Verification (definition of done)

- `npm run build` succeeds; `/harness-engineering/` renders in `npm run preview`.
- The portfolio card appears, filters under "White Papers," opens the modal, and the button
  navigates to `/harness-engineering/`.
- Every graphic renders on web **and** in print preview (Cmd-P) — legible on white, no
  clipped/page-broken diagrams.
- Accessibility smoke: each SVG has a text alternative; headings nest correctly (single
  `h1`); tab/anchor navigation works.
- Cross-links resolve: paper ↔ `/agentic-os/`, blog post → paper.
- **Content integrity:** every factual claim and citation traces to
  `HARNESS_HANDBOOK.md`; no stat is invented. War stories match the handbook's incidents.
- No broken internal links; Vercel preview deploy clean.

---

## 9. Open decisions for the review gate

1. **PDF mechanism (§6):** Option A (print-to-PDF, zero deps, recommended) vs Option B
   (hosted static PDF, +Playwright/Puppeteer dep). Default: A now, B as fast-follow if wanted.
2. **agentic-os overlap resolution (§2):** confirm the "white paper = canonical reference,
   agentic-os = narrative, they cross-link" split — vs a stronger stance (e.g., re-point the
   agentic-os card, or fold operations content differently).
3. **NDA check (fully-concrete case studies):** confirm none of the named projects (Career
   Foundry, Timecone, FOS, PACCA) are under a client NDA that forbids public reference. If
   any are, genericize *only* those war stories.
4. **Author bio copy (§4.11):** pull from `reference_drdgreed_identity` memory and draft, or
   David supplies final copy.
5. **Branch:** the astro repo is currently on `portfolio/agentic-os-cards`. Confirm whether
   this work lands on a fresh branch off `main` or continues here.

---

## 10. Out of scope (YAGNI)

- No CMS/content-collection migration — a page + a data entry is the right weight.
- No new design system or component library — reuse existing tokens/patterns.
- No interactive/animated diagrams beyond CSS hover — static SVG serves both media.
- No changes to the existing blog posts beyond a single closing cross-link each.
