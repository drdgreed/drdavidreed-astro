# Portfolio Card Copy — Design & Accuracy Ledger

**Date:** 2026-07-19
**File under change:** `src/data/portfolio.ts`, `src/pages/portfolio.astro`
**Audience decided:** Head of AI / Agentic Delivery hiring managers
**Status:** design approved for PACCA; accuracy findings pending David's decisions

---

## 1. Design decisions (approved)

**Copy formula** — every `description` follows three beats, in order:

1. **Human stakes + number.** Who is harmed or helped, quantified. Never market size or dollars.
2. **What it actually is.** Architecture in one phrase, so a technical reader knows it's real.
3. **Basis label.** What backs the number (~4 words), so opening the artifact confirms rather than deflates.

**Governing principle (David, 2026-07-19):** *"Recruiters and hiring managers are looking for mission
alignment. Health care and education should not be treated primarily as businesses."* Dollar figures,
ROI, market size, break-even, and phase costs move to `fullDescription` (modal-only). They never lead.

**Claim framing:** label the basis inline. A number whose backing is stated survives the reader opening
the artifact; a bare number does not.

**Sourcing rule:** every number on a card must exist in that item's own source of truth. No inventing,
no rounding, no borrowing figures between entries.

**Layout:** category badge on its own line; metrics pill on a second full-width line beneath it
(~285px vs ~154px). `truncate` retained as a never-fires safety net. All three previously-shortened
`metrics` strings revert to their originals.

---

## 2. Approved copy

**PACCA (`github-1`)** — harm-led, approved verbatim:

> 29% of prior-authorization delays directly harm patient care. Delays average 2–3 days while providers
> lose 34+ hours a week to the paperwork. PACCA answers with a five-agent clinical platform whose
> 7-branch deterministic escalation tree overrides model confidence on experimental treatments, rare
> conditions, and conflicting guidelines — every ambiguous case routed to a Medical Director.
> Pre-production reference architecture; synthetic cases only.

Link repoints to `https://github.com/drdgreed/pacca` (was `Chaos-6/pacca`).

---

## 3. Accuracy ledger

Verified 2026-07-19 by four parallel read-only agents against local sources. Verdicts below are the
agents' findings, spot-checked against quoted file:line.

### 3.1 Claims the source CONTRADICTS (must change)

| # | Card | Claim | Source says | Severity |
|---|---|---|---|---|
| A1 | `github-2` ALCA | "Built with Claude 3.5 Sonnet" | `claude-sonnet-4-5-20250929` (Sonnet 4.5) | High — understates currency |
| A2 | `github-2` ALCA | "multi-tenant architecture, role-based access" | RBAC **not built**; "Auth is scaffolded, not enforced… Do not deploy publicly as-is" | **Critical — claims a capability that does not exist** |
| A3 | `github-2` ALCA | "video files up to 6 hours/10GB" | 10GB enforced in code; **no 6-hour limit exists** (it's a context-window note) | Medium |
| A4 | `github-3` LPA | "Nine MVP features" | README enumerates **7**; the words "nine"/"MVP" appear nowhere | Medium |
| A5 | `github-3` LPA | "1.5-2 hrs/week per teacher" | README says 1.5–2 hours **per lesson** | High — wrong unit |
| A6 | `whitepaper-1` PRD | "Consolidated PRD v2.5" | Active spec is **v2.4**; v2.5 is "planned", unreleased. Card contradicts itself (desc says v2.5, fullDescription says v2.4) | High |
| A7 | `whitepaper-1` PRD | "100-case … golden set" (×2) | **105 cases** on disk as of `7cb49de` | High |
| A8 | `whitepaper-3` SDD | "50 REQ-IDs" | **72** rows in the current traceability matrix | Medium |
| A9 | `casestudy-1` | "~200-line constitution of checkable hard limits" | Page: "identity, judgment principles, and **six** hard limits" — not all hard limits | Low |
| A10 | `guidance-agentic-ops` | "five-lesson" (desc) vs "five-module" (fullDescription) | Page uses "module" throughout | Low — internal inconsistency |

### 3.2 Claims with NO source anywhere (decide: source them or cut)

| # | Card | Claim | Search result |
|---|---|---|---|
| B1 | `github-2` ALCA | "break-even at 18 customers (month 9)" | Zero hits across entire `~/IK/ALCA` tree |
| B2 | `github-3` LPA | "$45K Phase 0, $88.4K Phase 1, 18-24 month break-even" | Zero hits in the LPA repo |
| B3 | `whitepaper-1` PRD | "D9 — Harness Iteration Discipline" | String "D9" occurs nowhere in the PACCA repo |
| B4 | `github-2` ALCA | "85-90% time savings" | Figure appears nowhere; derived from 10–14h→90–120min (true range ~80–89%) |
| B5 | `github-3` LPA | "20-25% time savings" | Figure appears nowhere in the repo |
| B6 | `whitepaper-2` K-12 guide | **All ten** numeric claims (619% ROI, 50-62%, 7.4 hrs/wk, 85% privacy violations, $130K-$995K, 70% adoption, 15-hour curriculum, 80%→20% abandonment, six competencies, 6 weeks capacity) | No local source of any kind — only an external Google Doc |

### 3.3 True but mis-framed (source labels these as targets, card presents as fact)

| # | Card | Claim | Source framing |
|---|---|---|---|
| C1 | `github-3` LPA | "75% of plans rated as a 'usable foundation'" | README "Realistic Expectations" lists this under **"What This Does NOT Prove"** |
| C2 | `github-3` LPA | "35-45% teacher adoption in Year 1" | Stated as a "realistic target", not a result |
| C3 | `github-2` ALCA | "10-14 hours down to 90-120 minutes" | Showcase labels it *documented baseline vs. **target***, not measured |
| C4 | `whitepaper-1` PRD | "dual evaluation gate at 100%" | The 100% pass is measured on the **20-case golden core** (20/20), not the 100/105-case set |

### 3.4 Missing disclaimers present in source but absent from card

| # | Card | Source carries | Card says |
|---|---|---|---|
| D1 | `github-2` ALCA | "synthetic instructor data only… not a production service"; "not certified for processing real learner or employee data" | Nothing |
| D2 | `github-3` LPA | Repo is a "prototype"; README separates proven from unproven | "prototype" appears in fullDescription only |

### 3.5 Confirmed clean

- **`whitepaper-4` CRISP-AG** — every claim (v2.3 May 2026, nine-phase lifecycle, three agentic phases,
  four artifacts, five-class DAS taxonomy, standards matrix, Class 2-3 vs Class 4 fit, "not yet
  empirically validated") matches the source exactly. No changes needed.
- **`casestudy-1`** — five of six major claims confirmed verbatim against `agentic-os.astro`; only A9 above.
- **`guidance-agentic-ops`** — module titles, per-lesson deliverables, CareerForge attribution all
  confirmed; free OPS.1 deck verified present on disk (433,983 bytes).
- **Patents** — numbers internally consistent across all fields in both entries.

---

## 4. Open decisions for David

1. **B6 (K-12 white paper):** ten unverifiable numbers, no local source. Provide the doc, soften to
   unquantified claims, or leave as-is at known risk?
2. **B1/B2 (break-even and phase costs):** absent from repos. Do these live in a business doc elsewhere,
   or should they be cut? Under the mission-first principle they leave the card regardless — the question
   is whether they stay in `fullDescription`.
3. **A2 (ALCA RBAC):** the honest fix is to stop claiming role-based access. Confirm.
4. **C1–C4:** relabel as targets/documented-baseline rather than results. Confirm.
5. **A6 (PRD version):** confirm v2.4 is what should be published, not v2.5.

---

## 5. Verification plan

After implementation, re-run at 1440/900/500px:
- row order matches the approved grid
- zero wrapped metrics pills, zero clipped pills, zero rows with title-top spread > 2px
- every number on every card traceable to a file:line in this ledger
