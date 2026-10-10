---
title: "Agentic PRD Standard"
subtitle: "A hub-and-spoke requirements and evidence standard for enterprise agentic systems"
series: "Agentic AI Governance in Practice"
seriesPart: 2
code: "STD"
version: "3.10.2"
date: "2026-10"
author: "David Reed, PhD"
description: "A normative standard for the documents behind an agentic system: a fifteen-section hub that alone makes claims, six evidence spokes, a machine-readable spec, a Full/Lite rule with seven triggers, and gates that test the documents themselves."
keywords: ["agentic AI", "product requirements document", "AI governance", "requirements engineering", "AI evaluation", "action boundaries", "proportionality", "EU AI Act", "OpenSpec"]
readTime: 74
---

# Agentic PRD Standard

<p class="paper-dek">A hub-and-spoke requirements and evidence standard for enterprise agentic systems</p>

<p class="paper-meta"><strong>Version 3.10.2</strong> · October 2026 · David Reed, PhD</p>

<nav class="series-nav" aria-label="Series"><p><strong>Agentic AI Governance in Practice</strong> — Part&nbsp;2&nbsp;of&nbsp;7</p><ol><li><a href="/papers/crisp-ag/">CRISP-AG</a></li><li><span class="current" aria-current="page">Agentic PRD Standard</span></li><li><a href="/papers/specification-driven-design/">Specification-Driven Design</a></li><li><a href="/papers/agentic-harness-specification/">Harness Specification</a></li><li><a href="/papers/agentic-security-specification/">Security Specification</a></li><li><a href="/papers/vendor-control-specification/">Vendor Control Specification</a></li><li><a href="/papers/agentic-delivery-workflow/">Agentic Delivery Workflow</a></li></ol></nav>

## Abstract

A conventional product requirements document describes features a user operates. An agentic system must also declare what it may decide, what it may do, what it must never do, who is accountable when it acts, how its correctness is measured when its behavior varies between runs, and how it is identified and permissioned as a principal in enterprise systems. None of these has a home in a conventional PRD.

This paper presents the Agentic PRD Standard, a normative standard for the requirements and evidence set of an agentic system. The set is hub-and-spoke: a fifteen-section hub (H0–H14), the only artifact that makes claims about the product; six spokes (S1–S6) for design, evaluation, identity and security, risk and jurisdiction, operations, and change; and a machine-readable specification (M) generated from the hub and S2 and read by agents and CI. Every requirement carries an enforcement-mechanism class, and the share carried by mechanisms that can refuse is reported. Six fixed action boundaries are recorded as prohibited positions unless answered yes with a source, and each is traced to a negative evaluation task graded on the trajectory. A proportionality rule with seven triggers (T1–T7) selects a Full or Lite form that changes ownership and depth but never presence. The documents themselves are tested by a completeness test, a reader test taken by a fresh model and a human panel, and a change gate. The Standard records which of its own claims are demonstrated and which are only specified.

**Keywords:** agentic AI; product requirements document; AI governance; requirements engineering; AI evaluation; action boundaries; proportionality; EU AI Act; OpenSpec

## Key contributions

- **A hub-and-spoke document set.** A fifteen-section hub (H0–H14) is the only artifact that makes claims; six separately owned spokes (S1–S6) supply the evidence; a machine-readable specification (M) is generated from the hub and S2, so that agents and CI read what humans approved.
- **Boundaries written as requirements.** The hub states a safety property, one to three governing invariants, a delegation authority scope with a position for every action, and six fixed action boundaries — each a PROHIBITED row unless answered yes with a source, and each traced to a negative evaluation task graded on the trajectory by code.
- **Enforcement made measurable.** Every requirement carries an enforcement-mechanism class; every prompt-only clause names a deterministic backstop; the enforcing share is reported in the honest-claims matrix beside each claim's control state.
- **Evaluation as acceptance criteria.** Acceptance criteria are evaluation tasks agreed before the work begins; boundary tasks never depend on an LLM judge; a judge gates nothing until its agreement with at least two human experts reaches κ ≥ 0.6; vendor benchmarks are context, never evidence.
- **Proportionality that never omits.** Seven triggers select a Full or a Lite form; the two differ in ownership, versioning, approval and depth, never presence. T7, the enterprise-critical trigger, is the first trigger concerned with reach over time rather than reach in one action.
- **Gates that test the documents.** The gates are a completeness test; a reader test in which a fresh model and a human panel must answer fifteen role-based questions from the set alone; and a change gate through which every spec delta passes.

<!-- toc -->
## Contents

- [1. Introduction](#1-introduction)
- [2. Principles of the Standard](#2-principles-of-the-standard)
- [3. The document set](#3-the-document-set)
- [4. The hub — the Agentic PRD](#4-the-hub--the-agentic-prd)
  - [4.1 H0 — Document control and claims discipline](#41-h0--document-control-and-claims-discipline)
  - [4.2 H1 — Press release and FAQ](#42-h1--press-release-and-faq)
  - [4.3 H2 — Problem statement and business context](#43-h2--problem-statement-and-business-context)
  - [4.4 H3 — Purpose, safety property, and measurable objectives [M: objectives]](#44-h3--purpose-safety-property-and-measurable-objectives-m-objectives)
  - [4.5 H4 — Governing invariants [M]](#45-h4--governing-invariants-m)
  - [4.6 H5 — Users and stakeholders](#46-h5--users-and-stakeholders)
  - [4.7 H6 — User journeys [M: as scenarios]](#47-h6--user-journeys-m-as-scenarios)
  - [4.8 H7 — Product principles](#48-h7--product-principles)
  - [4.9 H8 — Delegation authority and accountability [M]](#49-h8--delegation-authority-and-accountability-m)
  - [4.10 H9 — Non-goals and action boundaries [M]](#410-h9--non-goals-and-action-boundaries-m)
  - [4.11 H10 — Requirements [M]](#411-h10--requirements-m)
  - [4.12 H11 — Success and release criteria [M]](#412-h11--success-and-release-criteria-m)
  - [4.13 H12 — Constraints, assumptions, and open questions [M: constraints]](#413-h12--constraints-assumptions-and-open-questions-m-constraints)
  - [4.14 H13 — Release scope and target window](#414-h13--release-scope-and-target-window)
  - [4.15 H14 — Spoke manifest and honest-claims matrix [M: manifest]](#415-h14--spoke-manifest-and-honest-claims-matrix-m-manifest)
- [5. The spokes](#5-the-spokes)
- [6. The machine-readable spec (M)](#6-the-machine-readable-spec-m)
- [7. IDs and traceability](#7-ids-and-traceability)
- [8. Process gates](#8-process-gates)
- [9. Proportionality rule — Full and Lite forms](#9-proportionality-rule--full-and-lite-forms)
- [10. Roles and ownership](#10-roles-and-ownership)
- [11. Discussion and limitations](#11-discussion-and-limitations)
- [12. Conclusion](#12-conclusion)
- [Acknowledgements](#acknowledgements)
- [How to cite](#how-to-cite)
- [References](#references)
- [Appendix A — Glossary](#appendix-a--glossary)
- [Appendix B — Illustrative worked example: the Portfolio Orchestration Engine](#appendix-b--illustrative-worked-example-the-portfolio-orchestration-engine)
- [Appendix C — Reader-test protocol and question set](#appendix-c--reader-test-protocol-and-question-set)
- [Appendix D — Claims this Standard makes about itself](#appendix-d--claims-this-standard-makes-about-itself)
<!-- /toc -->

## 1. Introduction

### 1.1 Why a conventional PRD is not enough

Enterprises now build systems in which a model plans, selects tools, holds state across steps, and produces output that people rely on for decisions and facts. The companion papers in this series govern such systems from several sides. CRISP-AG [1] defines the governance concepts and artifacts; *Specification-Driven Design for Agentic Systems* [2], the form of an enforceable specification; the Harness Specification [3], the runtime controls; the Security [4] and Vendor Control [5] Specifications, the security controls and the terms of vendor use; and the Agentic Delivery Workflow [6], the order in which they apply. Each depends on a product's own documents to say what the product is, what it may do, and what evidence stands behind each claim. This paper defines those documents.

Conventional product requirements describe features a user operates. An agentic system also has to declare what it may decide, what it may do, what it must never do, who is accountable when it acts, how its correctness is measured when its behavior varies between runs, and how it is identified and permissioned as a principal in enterprise systems. None of those has a home in a conventional PRD. The elements this Standard adds — a safety property, governing invariants, action boundaries, an autonomy declaration, an accountable human and a human of record, an evaluation specification with an adversarial boundary suite, an agent identity record, an enforcement-mechanism class on every requirement, and a jurisdictional procedure — exist because the product is an agent.

Two properties of agents make the gap more than a matter of extra sections. An agent's behavior varies between runs, so a requirement means something only when an agreed test decides whether it holds; and instruction text can be ignored or overridden by injected content, while a gate, a type or a permission cannot (§2, principles 2 and 3). A requirements document for an agent therefore has to carry its tests and its enforcement mechanisms, not only its intentions.

**What this Standard is.** This Standard defines how an organization specifies an agentic system before and while it is built: what documents exist, what each must contain, who owns each, how they are versioned and changed, how their claims are tied to evidence, and how much of the apparatus a given product must carry. It is a standard for the *requirements and evidence set*. It does not prescribe platform or coding choices. It requires the architecture to be recorded, and it imposes one architectural constraint: properties that must hold are enforced by code and types, not by a model's choice (S1.1).

### 1.2 What it applies to

The Standard applies to any system built or materially configured by the organization in which a model plans, selects tools, holds state across steps, or produces output that a human relies on for a decision or a client relies on for a fact. It applies whether the model is Claude, another provider's model, or a platform-hosted agent (for example, a Databricks Agent Bricks supervisor), and whether the system is built in-house or assembled from third-party agents. *Materially configured* means configured in a way that changes an agent's tools, permissions, prompts, autonomy level, or the data it may reach.

An agent that the organization configures on a vendor service listed in the Approved AI Service Register (VCS §4, VC-04) — a *vendor-configured agent* in VCS's sense (VC-06) — is materially configured for the purposes of this Standard. Its set may take the Lite form where §9 allows, but the vendor items that VCS marks *always* apply in either form: a current Vendor Service Profile reference in S1.9, a budget and cap in S5.5, a model-tier declaration in S1.1, and the S3.1 registration (§9.1, "Never changes").

### 1.3 What it does not apply to

The Standard does not apply to non-agentic analytics and reporting; to models with no tool use, no state, and no downstream reliance; or to third-party SaaS agents that the organization does not configure and for whose outputs it is not accountable. Where a third-party agent is configured or relied upon, the Standard applies to the organization's configuration and reliance.

### 1.4 Design principles

Six design decisions define the Standard's character; §2 states its ten principles in full, each with the clauses that carry it.

- **Hub-and-spoke form.** One short hub makes every claim about the product; separately owned spokes supply the evidence (§3).
- **Evaluation is part of the requirements.** Acceptance criteria are evaluation tasks agreed before the work begins (H11, S2).
- **Non-goals stand on their own.** Non-goals are a standalone section that doubles as the agent's action boundaries and is mirrored in should and should-not testing (H9, S2.1).
- **Agent identity is a presence requirement.** On the Microsoft stack, every agent is registered, in Lite form as well (S3.1).
- **The machine-readable specification follows OpenSpec.** It uses the OpenSpec convention [26], so that agents and CI read what humans approved (§6).
- **Proportionality scales ownership and depth, never presence.** A Full/Lite rule decides how much apparatus a product carries; every product answers the same questions (§9).

### 1.5 Where this sits — the series and reading paths

*This section is informative.* This Standard is one of the six specifications in the seven-part series *Agentic AI Governance in Practice* that together govern an organization's agentic systems, bound into one delivery process by the Agentic Delivery Workflow [6]. It governs the **documents** — what a product writes down and the evidence behind it. It does not set governance policy, runtime controls, vendor controls or security controls; those live in the companions below, and this Standard cites them by section rather than restating them. A *PRD* in this Standard's sense is the hub (§4) of one product's set. This document is the standard for writing one, not a PRD itself.

| Part | Document | The question it answers | What it owns (examples) |
|---|---|---|---|
| 1 | CRISP-AG v3.0 [1] | Why, and which governance applies | DAS positions, agent class, the Agent Identity Record, the Workflow & Workforce Impact Record |
| 2 | **Agentic PRD Standard** v3.10.2 (this paper) | What a product documents, and the evidence behind it | Hub H0–H14, spokes S1–S6, the machine-readable spec, the Full and Lite triggers |
| 3 | Specification-Driven Design for Agentic Systems v1.0.3 [2] | How a specification is written so it can be enforced | Enforce versus guide, the four layers, governing invariant, evaluation science |
| 4 | Enterprise Agentic AI Harness Specification v1.3 [3] | What binds at run time | HRN-01 to HRN-12, Gates 0–4, ledgers, telemetry |
| 5 | Agentic Security Specification v1.0 [4] | Which security controls an agent carries | SEC-01 to SEC-23, control state, Managed Runner Baseline |
| 6 | Vendor Control Specification v1.0 [5] | How vendor services are used and controlled | Spend governor values, model tier, Vendor Service Profile, approved-service register, exit path |
| 7 | Agentic Delivery Workflow v1.10 [6] | What to do in what order, and who approves | Stages W0–W7, eleven roles, exit checks, precedence between documents |
| — | The series glossary | What each term means | One owning document per term; every paper's glossary follows it |

**Reading paths.** Each kind of reader starts in a different place:

- **Building a product:** the Workflow from W0; then this Standard §4–§9; an assembly kit's playbook and templates; SDD for how to write S1, S3 and S4.
- **Sponsoring or funding a product:** this Standard §1, H1–H3 and H8–H9; the Workflow's W0 and W7.
- **Reviewing risk, legal or privacy:** CRISP-AG §5; this Standard S4 and §9; VCS and SEC.
- **Engineering the platform:** the Harness, SEC and VCS; this Standard S3, S5 and §6.

Precedence between the documents is set by the Workflow (§2.2), and conflicts between them are resolved in Workflow §11.

### 1.6 How to read this Standard — verbal forms

This Standard uses the verbal forms of the ISO/IEC Directives, Part 2 (9th edition, 2021), clause 7:

| Form | Meaning |
|---|---|
| **shall** / **shall not** | A requirement. A conforming set meets it. |
| **should** / **should not** | A recommendation. |
| **may** / **need not** | A permission. |
| **can** / **cannot** | A possibility or capability — not a provision. |
| **must** | An external constraint, such as a legal obligation — not a requirement of this Standard. "Must-have" in H10 is the name of a requirement class. |

Text marked *Note* or *Why*, and every clause marked informative, contains no requirements. §2–§4 are written in these forms; §5 onward uses descriptive wording and is read under this rule: "must" and other imperative wording outside §2–§4 that states what a conforming set contains or does is read as "shall", and "may not" as "shall not".

### 1.7 How this Standard was developed

The Standard was developed in three passes.

**From a consolidated agentic PRD.** It was first derived by abstracting a consolidated, single-author agentic PRD — the author's [*PACCA — Prior Authorization & Care Coordination Agent Platform*](https://docs.google.com/document/d/1OifHO-2_0yLzUxKFaKo3kdRDx4Ot0ERyGOsLPSRK4D8/edit) (2026) — into a generic outline. The table below lists the elements the Standard carries from that source and where they now live.

| Source element | Standard location |
|---|---|
| Honesty disclaimer and reconciliation against the repository | H0; §2 principle 1 |
| Separated maturity axes (engineering versus domain validation) | H14; S2.7 |
| Release-versioned features with a measurable next-release trigger | S6.4 |
| Agent roster with tier, human analogy, invocation condition | S1.2 |
| Deterministic preflight guardrails; confidence-gated routing | S1.3 |
| Tiered knowledge collections; institutional memory | S1.5 |
| Universal safety constraints; prompt registry with versions in audit | S1.6 |
| Per-call spans; runtime configuration; master autonomy switch | S5.1, S5.2 |
| Golden dataset; judge rubric; CI gate; zero-tolerance cases | S2.1, S2.4 |
| Governed self-improvement — propose, never deploy; immutable change log | S6.2; H8 |
| Harness iteration discipline — surfaces, manifests, verdicts | S6.1, S6.3 |
| Statistical power; coverage matrix; SME review; claim unlocks | S2.5, S2.7 |
| Honest-claims matrix | H14 |
| Configuration and API references; glossary; change log | S5.2; Appendix A; S6.4 |

**From external practice.** The outline was then tested against published practice, which yielded forty amendments in six themes — product-management canon [7]–[9]; evaluation [10], [23], [28]; autonomy and guardrails [11], [13], [22]; identity and security [14], [24]; risk and compliance [15]–[18]; and machine-readability and context engineering [25]–[27] — each with its citation. All were accepted. Later versions added the evaluation-science, security, vendor and regulatory sources cited in the body.

**From a first worked example.** Applying the outline to the Portfolio Orchestration Engine (POE; Appendix B) supplied fourteen additions that the external literature did not: the safety property; conflict handling as a method — deterministic keys, typed conflict status, human resolution with precedent memory (now S1.7 §C); governing invariants with their subtle violations; enforcement-mechanism class and enforcing share; prompt-only clauses with backstops; constraints that carry their source; negative user journeys; the adversarial boundary suite; success criteria with verification method and target in one table; the regulatory frame as instrument → what bites → IDs produced; the composition section; refusal to invent figures; the role-capability matrix; and the human of record enforced by type or protocol.

### 1.8 How to read this paper

Section 2 states the principles and names the clauses that carry each. Sections 3 to 7 define the document set, the hub, the spokes, the machine-readable specification, and the ID scheme with its traceability matrix. Section 8 sets the process gates, §9 the proportionality rule and §10 the roles. Section 11 discusses limitations and verification status. Appendix A is the glossary, Appendix B the illustrative worked example, Appendix C the reader-test question set, and Appendix D the claims the Standard makes about itself. Section numbers, the hub and spoke identifiers, and Appendix C are stable: the other papers in the series cite them.

## 2. Principles of the Standard

> **Informative.** This clause explains why the Standard asks for what it asks for. Each principle names the clauses that give it effect; the requirements are in those clauses, not here.

1. **Claims discipline.** Only the hub makes claims about the product, and each claim is recorded in H14 as defensible or not, with its evidence; figures that cannot be defended are not invented. *Carried by:* §3.1 rule 4, H2, H14, §8.4. *Why:* an agentic system is easy to over-describe. A reviewer needs one place to see what the product is claimed to do and what backs each claim.
2. **Evaluation is part of the requirements.** Acceptance criteria are evaluation tasks agreed before the work starts, not inferred from it afterward, as Anthropic's generator and evaluator agents agree what "done" means before code is written [35]; a requirement with no verification is an intention and is logged as an open question. *Carried by:* H11, S2.1, §7 (traceability matrix; rules). *Why:* an agent's behavior varies between runs, so a requirement means something only when an agreed test decides whether it holds.
3. **Boundaries are enforced by mechanisms that can refuse.** Every requirement carries its enforcement-mechanism class, every prompt-only clause names a deterministic backstop, and the enforcing share is reported. *Carried by:* H10, H14, S1.2. *Why:* instruction text can be ignored or overridden by injected content; a gate, a type or a permission cannot. The enforcing share shows how much of the product rests on instruction text alone.
4. **Humans are accountable by construction.** Each agent has an accountable sponsor, and each consequential output has a human of record bound to it by type or protocol rather than by policy. *Carried by:* H8, S3.1. *Why:* accountability that rests on policy alone erodes under volume; a named person carried in the data or the protocol can be audited.
5. **Autonomy is a design decision, declared per action and earned.** Every action has a DAS position (CRISP-AG §5.1), enters at the lowest position consistent with its purpose, and is promoted only on evidence. Least agency is the default posture. *Carried by:* H8, S2.10, §8.3. *Why:* autonomy is separate from what the model can do; granting it action by action, on evidence, limits the reach of an error.
6. **Proportionality scales depth and ownership, never presence.** *Carried by:* §9. *Why:* a small product carries less process, but every product answers the same questions, so nothing essential is skipped.
7. **One statement, one place, one ID.** Spokes cite the hub; the hub cites spokes; a requirement ID is assigned once and used everywhere, including code and audit records. *Carried by:* §3.1 rules 2 and 3, §7. *Why:* repeated statements drift apart, and one ID from requirement to code to audit record makes traceability something a machine can compute.
8. **The specification is machine-readable where it is operative.** Agents and CI read the same requirements, scenarios and boundaries that humans approve. *Carried by:* §6. *Why:* what is approved is then what is tested and what the agent is instructed with.
9. **Regulation is a procedure and a table, not a mapping.** Each product answers the jurisdictional questions for each geography it touches. *Carried by:* S4.1, S4.2. *Why:* a multinational operates in many jurisdictions, and a fixed cross-reference would be out of date on publication.
10. **The reader test is a gate.** A document that a fresh reader — human or model — cannot answer questions from is not finished. *Carried by:* §8.2, Appendix C. *Why:* a set that cannot be read correctly will not be built from, or audited against, correctly.

## 3. The document set

The set has one hub, six spokes and a machine-readable specification:

```
HUB — the Agentic PRD
  (one owner; short; human-readable;
   the only artifact that makes claims)
 │
 ├── S1  Design record
 ├── S2  Evaluation specification
 ├── S3  Identity, access & security
 ├── S4  Risk, jurisdiction & compliance
 ├── S5  Operations
 ├── S6  Iteration & change record
 │
 └── M   Machine-readable spec
         (generated from hub + S2;
          read by agents and CI)

Cross-cutting: the ID scheme and the
traceability matrix (§7)
```

### 3.1 Rules of the set

1. Each artifact shall carry its own version. The hub's manifest (H14) shall list each spoke's current version. The version of the set is the version of the hub.
2. Each requirement shall have one ID, assigned once and never reused. That ID shall be used in the hub, the spokes, eval tasks, code and audit records.
3. A statement shall appear in one place only. Spokes shall cite hub requirements by ID, and the hub shall cite spokes by section. Where two products share a control, the second shall cite the first and shall not restate it.
4. Only the hub shall make claims; spokes supply evidence. Whether a claim is defensible shall be marked in H14 and nowhere else.
5. A change to any artifact is a spec delta (§6) and shall pass the change gate (§8.3) before the set's version advances.
6. The form of the set — Full or Lite — shall be decided by the proportionality rule (§9), recorded in H0, and re-run at every change gate and annually.

### 3.2 Length

H1, the press release and FAQ in Amazon's PR/FAQ form [9], shall not exceed six pages; two pages is typical. The hub body shall not exceed fifteen pages. So that the cap can hold, H10 shall list the load-bearing requirements only and shall carry the full set by reference to `traceability.csv`, and H14's claims matrix may reference eval run IDs instead of reproducing results. H6, H9 and H11 shall always be given in full. Spokes have no page limit; they are subject to the reader test (§8.2).

## 4. The hub — the Agentic PRD

Every hub section shall be present in full in both Full and Lite forms. Sections marked **M** have a machine-readable form (§6).

### 4.1 `H0` — Document control and claims discipline

H0 shall contain:

- version and lineage; audiences; what the document does and does not claim;
- reconciliation against the system of record (repository, registry);
- the registry identity of each agent and **the organization's role for that agent** — developer (built), deployer (configured or relied upon), or both — in the EU AI Act's provider/deployer sense [17], Colorado's developer/deployer sense [39] and the Microsoft/IMDA developer/deployer sense [42], with the Vendor Service Profile (VCS VC-03) cited where the developer is a vendor;
- the proportionality worksheet (§9.5), with the form selected, the T6 screen answered and the CRISP-AG agent class recorded;
- the roster of role holders for this product: AI Product Owner, Eval Owner (accountable holder and responsible engineer), AI Risk Officer and Legal contact;
- the **conflict-handling applicability declaration**, decided at W0: *applies* (two or more sources can assert the same fact; S1.7 §C is binding) or *not applicable* (single-source);
- the completeness-test and reader-test records (§8);
- the **four-line self-check** drawn from Singapore's Model AI Governance Framework for Agentic AI [18], each line answered yes or no with a pointer to where it is evidenced:
  1. Risks assessed and bounded upfront (→ H4, H9, S4)
  2. Meaningful human accountability (→ H8, S3.2)
  3. Technical controls and processes in place (→ H10 enforcing share, S1–S6)
  4. End-user responsibility enabled (→ H6, S5.3)

### 4.2 `H1` — Press release and FAQ

H1 shall be present in both forms. It shall contain a one-page press release written as of launch day in the customer's language — heading, subheading, the problem, the solution, the customer benefit — and an FAQ in two parts: external (what a customer would ask) and internal (feasibility, cost, risk, metrics, and "why not X?"). H1 shall not use jargon or internal acronyms.

### 4.3 `H2` — Problem statement and business context

H2 shall contain: the workflow as it is today, step by step, with durations where they can be defended; the failure modes, named specifically; the business lever (margin, win rate, retention, time, trust); why an agentic system addresses the causes; and an explicit statement of which figures are and are not defensible. A number that cannot be sourced shall not be written.

### 4.4 `H3` — Purpose, safety property, and measurable objectives [M: objectives]

H3 shall contain one paragraph of purpose; one sentence — the **safety property** — to which every design decision shall be traceable; and the release's objectives, each with its measurement method and its priority. Where no business objective is yet defensible, H3 shall say so explicitly and shall not be left blank.

### 4.5 `H4` — Governing invariants [M]

H4 shall state the one to three properties the system exists to hold, each expressed as a boundary, given an invariant ID, and traced to its source (law, licensing, professional standard, client contract, or policy). Each invariant shall name its subtle violations — for example, recommending through the ordering or emphasis of what is surfaced — and the enforcement mechanisms that carry it at the type, scope and protocol layers.

Where an architectural property of the kind named in SEC §5.24 holds — plan-then-execute (tool calls are committed before untrusted data is read), dual LLM (the component that reads untrusted text holds no tools and is not a principal), or another of the Beurer-Kellner et al. patterns [36] — H4 shall record it as an invariant with an ID, the mechanism that carries it, and the S2.2 test that would detect its loss.

> **Note.** An undeclared property is not protected by the change gate.

### 4.6 `H5` — Users and stakeholders

H5 shall characterize the few primary personas in detail, each with goals and tasks, and shall contain a stakeholder table: role, role in the product, primary interaction, quality-attribute priority.

H5 shall also contain a **role-impact summary** (CRISP-AG §5.7 WWIR): for each user role, the as-is and to-be tasks, the interaction mode (operator / collaborator / consultant / approver / observer, per Feng, McDonald & Zhang [22] — the only place in this Standard where these descriptors appear), and the reviewer-capacity figure. The full Workflow & Workforce Impact Record is S5.6.

### 4.7 `H6` — User journeys [M: as scenarios]

H6 shall contain named journeys (J1…Jn), each walked step by step and each ending in a stated success condition. It shall contain **at least one negative journey per governing invariant** — the system refuses, flags, or abstains — so that the boundary is shown holding, not only described. Where conflict handling applies, H6 shall contain **one negative journey for source disagreement**: two sources conflict, the system surfaces both with provenance, routes to a human, and modifies no source (S1.7 §C). Where a conflict is resolved by a precedence rule, that journey shall show the rule applied.

### 4.8 `H7` — Product principles

H7 shall list the short set of domain-specific decision criteria the team uses for trade-offs. Where an enterprise method supplies principles, H7 shall cite them and shall add only product-specific ones. SDD's eleven principles (SDD §A4) are cited here, not restated.

### 4.9 `H8` — Delegation authority and accountability [M]

H8 shall contain the following.

- **Delegation authority scope (DAS)**, per CRISP-AG §5.1. Every action the system can technically perform shall be listed once. For each action, H8 shall give its position — PROHIBITED · HUMAN-ONLY · HITL-REQUIRED · AGENT-DIRECTED · FULLY-AUTONOMOUS — the mechanism that enforces the position (an H10 enforcement class), the approvers and their review levels (Legal, Operations, Executive, Responsible AI / Privacy, per CRISP-AG §5.1.1), and the evidence-review cadence. The six fixed categories of H9 shall be the first rows, and each shall be PROHIBITED unless answered yes with a source. *Note: the position is a design decision, separate from the model's capability.*
  - **Ceiling.** No action in a task flagged under T6 shall be positioned above HITL-REQUIRED (CRISP-AG §5.4.3), and every irreversible high-consequence action shall be positioned at HUMAN-ONLY (CRISP-AG §5.1.2).
  - **Interaction modes.** In this Standard, the Feng, McDonald & Zhang task-type descriptors appear only in the H5 role-impact summary; the crosswalk is CRISP-AG §5.1.4 (operator and collaborator → HUMAN-ONLY; consultant → HITL-REQUIRED; approver → HITL-REQUIRED (for consequential actions); observer → FULLY-AUTONOMOUS).
- **Least agency and graduation.** Every action shall enter at the lowest position consistent with its purpose and shall be promoted only on evidence recorded in S2.10 (CRISP-AG §5.1.3, §5.4).
- **Accountable human.** The accountable human — the sponsor (owner) of each agent identity — shall be named.
- **Human of record.** Each consequential output — a recommendation, a client communication, a release, an action — shall carry a named human of record, enforced by type or protocol. For any task flagged under T6, the human of record shall hold **overturn authority**: the person can interpret the output, sees the other relevant information, and has authority to change the outcome (the CPPA ADMT human-review test [40]; Colorado's right to human reconsideration [39]). The S5.6 reviewer-capacity model shall show the time this review takes. A T6 task whose human of record lacks overturn authority shall not be positioned above HUMAN-ONLY.
- **Disclosed principal.** The entity or person on whose behalf the agent acts shall be disclosed under EU AI Act Art. 50(1) [17] at first contact and at each new interaction with a natural person (S4.5). The disclosed principal is the accountable human or the legal entity that human represents. It shall be a field in the S1.7 message schema for every outbound communication and a row in the S3.1 identity record.
  - **Claim boundary.** The disclosed principal is a transparency attribution under Art. 50(1); naming it does not determine whether, or how, the agent's actions legally bind that entity. Allocation of legal responsibility is out of scope (CRISP-AG §12; IMDA Discussion Paper on the Allocation of Legal Responsibility for AI Agents, May 2026 [42], which holds that agents are not legal persons).

### 4.10 `H9` — Non-goals and action boundaries [M]

H9 shall contain two parts. The fixed categories are the six mandatory DAS rows of H8, and each answer of *no* shall be recorded there as a PROHIBITED position.

**Fixed categories.** Each shall be answered yes or no with its source, and each *no* shall be traced to a negative eval task in S2:

| Category | Is the system permitted to… |
|---|---|
| Recommend | issue a recommendation, evaluation, ranking-by-judgment, or opinion of value? |
| Act in a source system | write to, or trigger an action in, any system of record? |
| Communicate externally | send anything outside the platform — email, notice, message to a counterparty or client? |
| Cross tenants | let one tenant's data reach another, in detail or in aggregate? |
| Process personal data | evaluate, score, or profile a natural person? |
| Self-modify | change its own prompts, policies, tools, or parameters without a human approval gate? |

**Free-form exclusions.** H9 shall list the scope the product deliberately leaves out, each with a reason.

### 4.11 `H10` — Requirements [M]

Each requirement shall carry:

- an ID;
- the need, not the solution;
- a description at interaction or use-case level — what a user or system does and what is true afterward, not the internal mechanism;
- a class — **must-have** (the product does not ship if it is missing), **high-want**, or **nice-to-have** — and a rank within class (*note: "must-have" is the name of a class, not a verbal form; see §1.6*);
- a trace to an H3 objective;
- an **enforcement-mechanism class** from the following set:

| Class | Can refuse? |
|---|---|
| Gate (deterministic pre-check) | Yes |
| Type / schema | Yes |
| Permission | Yes |
| Protocol | Yes |
| Test | Yes |
| Monitor | No — acts after the fact |
| Process | No — depends on people |
| Prompt-only | No — instruction text alone |

A prompt-only requirement shall name its deterministic backstop. The **enforcing share** — the proportion of requirements carried by mechanisms that can refuse — shall be reported in H14. It is reported, not gated: no threshold applies until a three-product baseline exists.

### 4.12 `H11` — Success and release criteria [M]

Acceptance criteria shall be eval tasks (S2.1), agreed before the work begins and not inferred from it. H11 shall contain success criteria as a table: ID, criterion, verification method, target. Where conflict handling applies, one criterion shall follow the conflict-surfacing pattern of the worked example (Appendix B): injected conflicts surface with the conflict status, 100%; silent resolutions, zero. H11 shall also contain release criteria covering performance, scalability, reliability, usability, supportability and localizability, each with its true minimum.

### 4.13 `H12` — Constraints, assumptions, and open questions [M: constraints]

H12 shall contain hard constraints, each with its legal, professional, contractual or policy source; soft constraints; numbered assumptions, each with what depends on it; and a running open-questions log. Constraints shall be classed hard or soft, and requirements must-have, high-want or nice-to-have (H10); the two schemes shall not be mixed.

### 4.14 `H13` — Release scope and target window

H13 shall state this release's scope, the target window with its context and motivation, and the engineering-foundation allocation reserved for the release. H13 shall cover one release only; strategy and the multi-year roadmap shall be separate documents, linked from H13.

### 4.15 `H14` — Spoke manifest and honest-claims matrix [M: manifest]

H14 shall contain:

- each spoke with its owner and current version;
- for each vendor service in S1.9, the Vendor Service Profile version relied on (VCS VC-03);
- the enforcing share (H10);
- the honest-claims matrix — claim / defensible? / evidence by requirement or eval ID / **control state** (*specified* / *implemented* / *demonstrated*, per SEC §3) for every claim that rests on a control.

The honest-claims matrix shall be present in every hub, in both forms. It shall carry the fixed row **"Vendor claims relied upon — none are evidence (§8.4)"**, listing any vendor benchmark, model-card figure, certification or contractual assurance the product took into account, and the S2 run ID or S3.7 entry that stands as evidence in its place. A vendor claim with no evidence of the organization's own beside it shall be marked *not defensible*.

## 5. The spokes

In Full form each spoke is a separately owned, separately versioned artifact with its own approver. In Lite form the same content appears as appendices A–F of the hub with the same section IDs (§9).

### 5.1 `S1` — Design record

| ID | Section | Must contain |
|---|---|---|
| S1.1 | Architecture | Components, their responsibilities and persistence; the orchestration pattern and why; the model tier per task class; router pinning; why more than one agent, if more than one (note 1) |
| S1.2 | Agent roster and behavioral contracts | Per agent: tier (its place in the pipeline — orchestration, assembly, drafting, or conversational; product-specific tiers allowed if defined here), human-role analogy, invocation condition, typed inputs and outputs, preconditions, postconditions, invariants, prohibitions; prompt-only clauses marked and backstopped |
| S1.3 | Guardrails and routing | Deterministic preflight checks before any model call; confidence-gated routing with numeric thresholds and the action at each band; layered guardrails — rules-based, model-based, moderation — on input and output; tool actions rated by risk with pause or escalation before high-risk functions |
| S1.4 | Tools | Inventory with standardized, versioned definitions, classified data / action / orchestration; the allow-list per agent, including the deliberate absence of write or outbound tools where a boundary requires it |
| S1.5 | Knowledge and retrieval | Collections with trust tier, source, update cadence, versioning and rollback; an explicit precedence rule between tiers meeting S1.7 §C-5, or an explicit "no precedence — conflicts surface"; institutional-memory mechanism; poisoning controls; tenant partitioning of every index |
| S1.6 | Prompts | Universal safety constraints; a prompt registry whose versions flow into audit records; byte-identity checks; the prompt composition, with each untrusted region fenced per SEC-13 (note 2) |
| S1.7 | Message schemas and protocol invariants | Typed message schemas; the decision or assembly protocol as a state machine with the audit write and check at each transition; staleness, termination, and compositionality invariants; **conflict handling (§C below)** where H0 declares it applicable |
| S1.8 | Key design decisions | ADR-style records — decision, options considered, choice, rationale — with one exit-path ADR per vendor dependency, reviewed by the Architect at Gate 1 (note 3) |
| S1.9 | Technology stack | Layer, technology, version and notes; each vendor service's profile ID and register row; pinned model identifiers with successors and retirement dates; the binding the S2 suite ran on (note 4) |
| S1.10 | Composition | What is consumed from and supplied to other agentic systems; the terms of each seam; the counterpart's agent card; sprawl and collaborative-failure risks per seam (note 5) |

**Notes to the S1 table.** Each note gives the full content of the row that cites it; the cell summarizes it.

1. **S1.1 Architecture.** Component → responsibility → persistence; the orchestration pattern and *why*: a deterministic orchestrator wherever a property must hold, a supervisor agent only where routing is a convenience, and the rule that properties that must hold are enforced by code and types, not a model's choice of what to call.
   - **Model tier.** The model tier per task class (VCS §4, VC-02), chosen as the smallest tier that passes the S2 suite at threshold; the escalation rule to the next tier and its predicate; where the premium or reasoning tier is the default for any task class, the S2.6 evidence and the cost per unit of work that justify it.
   - **Router.** Where a platform router is used, the router mode and its model inclusion list are pinned as governed configuration (S6.2); a router that adds models without a change is not permitted.
   - **Number of agents.** Why more than one agent, if more than one — a single agent with tools is the default [13] — and whether coordination is by a manager calling agents as tools or by peer handoff, and why.
2. **S1.6 Prompts.** Universal safety constraints applied to every agent; a prompt registry whose versions flow into audit records; a byte-identity check at iteration boundaries; and the prompt composition. For the composition, S1.6 gives the order of trusted and untrusted regions and how each untrusted region is fenced per SEC §5 (SEC-13) — per-run nonce, datamarking, escaping of the source text, and the rule that a truncated or malformed fence is an anomaly recorded in S3.5, never silently accepted — and how the fence resists forgery by content that mimics the composition's own markers. Prompt-only clauses remain marked and backstopped (S1.2).
3. **S1.8 Key design decisions.** ADR-style: decision / options considered / choice / rationale. One ADR per vendor dependency, in the exit-path form of VCS §4 (VC-08): the abstraction the product binds to (gateway, MCP, registry), the export mechanism for data held in the service, the named substitute at each tier, the estimated time to switch, and the date of the last substitution drill. Each exit-path ADR is reviewed by the Architect at Gate 1 and feeds the annual concentration report (VC-08).
4. **S1.9 Technology stack.** Layer / technology / version / notes. For every vendor service: its Vendor Service Profile ID (VCS §4, VC-03) and its row in the Approved AI Service Register (VC-04) — a service absent from the register may not appear here. Pinned model identifiers per tier (VC-02) and per deployment Geo; for each pin, the named successor identifier and the vendor's published retirement date or notice term, taken from the Vendor Change Register (VC-05). The binding — provider, surface, Geo and gateway — on which the S2 suite was run (SDD Principle 11).
5. **S1.10 Composition.** What is consumed from and supplied to other agentic systems; the terms of each seam; what is shared by reference and what differs in kind (SDD A3 four layers, cited).
   - **Agent card.** Per seam, the counterpart's agent card — an A2A v1.0 AgentCard [33] or a mapped equivalent for Copilot Studio, Agent Bricks or other platform agents — recording provider, version, skills consumed or supplied, security schemes, and whether the card is signed and the signature verified; where the counterpart is a vendor's agentic system, its Vendor Service Profile (VCS VC-03). A seam whose counterpart has no card, or whose signature is unverified, records *unverified counterpart* and is a T7 and §9.3 S1-promotion consideration.
   - **The seam's message schema** is an S1.7 schema; the disclosed principal (H8) crosses the seam as a field.
   - **Sprawl and collaborative-failure risks** per seam, after IMDA v1.5 [18] (unverified): who owns the counterpart, what happens when both sides retry, what emergent behavior the adversarial boundary suite probes, and the inter-agent controls by reference to CRISP-AG §7 (ASI07, ASI08).

**§C — Conflict handling: the required method.** The method is adopted from the Portfolio Orchestration Engine (Appendix B) and is binding wherever H0 declares it applicable — that is, wherever two or more sources can assert the same fact; single-source products record *not applicable*.

| # | Requirement |
|---|---|
| C-1 | **Deterministic matching.** Facts from different sources are matched only on deterministic keys; near-matches are flagged for review, never merged on similarity |
| C-2 | **Typed status on every consolidated fact.** *Consolidated*, *conflict* or *single-source*; *reconciled* or *variance* for computed values (note 1) |
| C-3 | **No silent resolution.** No agent chooses between conflicting values and no source of record is modified; a conflict routes to a human queue with a stated SLA |
| C-4 | **Typed human resolution.** Resolution is a typed record with a required reviewer identifier, the resolved value, and an optional precedent note that becomes retrievable institutional memory within the tenant's partition (S1.5) |
| C-5 | **Precedence rules.** A product may declare a rule that resolves a class of conflicts automatically only under the conditions in note 2 |
| C-6 | **Provenance or abstention.** Every fact carries a source reference or is marked *unavailable*; nothing is inferred or defaulted |
| C-7 | **Staleness cannot resolve.** A stale critical input neither resolves a conflict nor drives an escalation by itself (S1.7 staleness) |
| C-8 | **Verified.** A golden set with injected conflicts, graded by code: 100% surface with the conflict status; zero silent resolutions; the H6 negative journey and the S2.1 task family exist |

**Notes to the §C table.** Each note gives the full requirement the cell summarizes.

1. **C-2 Typed status.** *Consolidated* (sources agree), *conflict* (sources differ — every value retained with its source, record identifier, and as-of timestamp), *single-source*; for computed values, *reconciled* or *variance* with a proposed classification the agent never resolves. A product may use an equivalent vocabulary if S1.7 maps each of its statuses to these canonical ones.
2. **C-5 Precedence rules.** A product may declare a rule that resolves a class of conflicts automatically only if the rule is deterministic, its source is stated (system of record, contract, policy), it is versioned as governed configuration under the change gate, every application is audited, and the conflict is still recorded with the rule and the resolution shown. A precedence-resolved conflict is a resolved conflict, not a non-conflict.

**Sources of the method.** The method draws on one of POE's hard constraints, three postconditions of its agents, its typed review decision with a precedent note, a staleness invariant, an evaluation requirement and a success criterion (Appendix B). **Multiple source documents** — the case of the assembling agent (Workflow §9) — are conflicts under §C: both statements are surfaced and tagged, and the disagreement is recorded in the gap list and never reconciled by the agent.

### 5.2 `S2` — Evaluation specification

**Owner.** A named eval owner is assigned per product at W0. The accountable holder is named; any role is eligible, and the holder is often the Business-line Technology Lead (the business line's technology leader, distinct from the Business Line Owner who accepts the outcome at W7). A named engineer is responsible for building and running the suites, calibrating judges, and versioning the harness. The permissiveness is about who, never whether: both are named. The suite is a living artifact with clear ownership; product teams contribute tasks.

| ID | Section | Must contain |
|---|---|---|
| S2.1 | Eval tasks as acceptance criteria | The initial suite of 20 to 50 tasks with reference solutions; a negative task for every H9 boundary; conflict-injection tasks where conflict handling applies; balanced sets; a task validity audit per task (note 1) |
| S2.2 | Suites | Capability suite; regression suite; the graduation rule; the adversarial boundary suite with its injection sub-suite; the conflict-injection and substitution suites (note 2) |
| S2.3 | Consistency and reliability | pass<sup>k</sup> for client-facing or action-taking agents, pass@k otherwise; prompt robustness, fault robustness and calibration where autonomy or client exposure requires them (note 3) |
| S2.4 | Graders | Per task: code-based, model-based or human; capability tasks graded on the outcome, boundary tasks on the trajectory by code; judge validity and independence (note 4) |
| S2.5 | Dataset sufficiency and statistical power | Size versus target; what drop each gate can detect at stated power; stratification; provenance per case; coverage matrix and gaps; a holdout set |
| S2.6 | Cost-controlled evaluation | Dollar cost per task, tokens, and latency tracked alongside accuracy; the accuracy-versus-cost curve |
| S2.7 | Milestone roadmap and claim unlocks | Which claims each dataset or validation milestone permits |
| S2.8 | Drift definitions and response | Named drift conditions with thresholds; detection cadence; response — halt, block deployment, roll back, page |
| S2.9 | Measurement plan | Automated evals in CI; production monitoring; A/B tests; feedback triage; transcript sampling; judge-calibration studies; a versioned eval harness with its measured noise band (note 5) |
| S2.10 | Capability frontier and graduation | Per CRISP-AG §5.4: for every DAS action above PROHIBITED — current position, evidence (pass<sup>k</sup>, holdout, adversarial results), the graduation rule to the next position, the demotion trigger, and the re-evaluation cadence. A DAS position changes only through this section and the change gate (§8.3) |

**Notes to the S2 table.** Each note gives the full content of the row that cites it; the cell summarizes it.

1. **S2.1 Eval tasks as acceptance criteria.** The initial suite: 20 to 50 tasks drawn from real failures is a valid start — a starting size, not a ceiling; S2.5 governs growth. Each task is passable by an instruction-following agent, with a reference solution, and unambiguous enough that two domain experts reach the same verdict; every H9 boundary has a negative task graded on the trajectory (S2.4); where conflict handling applies, a conflict-injection task family graded by code (S1.7 §C-8); balanced sets — where behavior should occur and where it should not. Every task carries a **task validity audit**: its reference solution and tests checked by a second expert, neither over-strict nor asserting undocumented behavior, recorded in S2.5 provenance; tasks drawn from public datasets are marked as such and assumed contaminated for model and tier selection (S1.1), as OpenAI found for SWE-bench Verified [37].
2. **S2.2 Suites.** Capability suite (low pass rate, a hill to climb); regression suite (near 100%); the graduation rule; and the adversarial boundary suite. The adversarial boundary suite's purpose is to make the system violate its governing invariants and declared properties (H4); it gates CI on every change, is sampled in production, and includes an **injection sub-suite** per SEC §5 (SEC-14): utility under attack, static attack success rate and adaptive attack success rate, reported per H9 boundary for the defended and the undefended configuration, with results carried in S3.7. Where conflict handling applies, the conflict-injection suite is part of the regression suite. The substitution suite (VCS VC-05) is the same regression and adversarial pair run against a pinned identifier's named successor.
3. **S2.3 Consistency and reliability.** pass<sup>k</sup> (τ-bench [28]) is required for any client-facing or action-taking agent; pass@k is acceptable otherwise; k, the trial count and the sampling unit are stated, with intervals clustered on that unit (method: SDD A7). Where any DAS position is AGENT-DIRECTED or above, or the product is client-facing, the suite also reports **prompt robustness** (pass rate under format and wording perturbation of the same task), **fault robustness** (pass rate under injected tool and infrastructure faults), and **calibration** of any confidence the product uses for routing (S1.3) — robustness and predictability metrics from the four-dimension reliability decomposition of Rabanser et al. [29]. S2.10 names which of these each graduation relies on; S2.8 may define drift on any of them.
4. **S2.4 Graders.** Per task: code-based, model-based, or human.
   - **Capability tasks** grade the outcome, not the path, so valid alternative approaches are not penalized; partial credit is given where tasks have components.
   - **Boundary tasks** — every H9 *no*, every DAS row (H8), every S1.4 absent-tool check, every H4 declared property — grade the trajectory by code: the tool calls made, the arguments passed, the positions respected, the approvals obtained. A boundary task never depends on an LLM judge.
   - **Judge validity.** An LLM judge gates nothing until its agreement with at least two human experts is recorded at Cohen's κ ≥ 0.6 on a calibration set of at least 50 items with at least 30% negatives, drawn from the product's own traces. The record also shows test–retest agreement across two independent judge runs, a position-bias check (AB/BA swap) where the judge compares candidates, and the measurement protocol — judgment scale, handling of abstentions, cases retained, pooling of verdicts, positive-class prevalence — under which κ was computed (method: SDD A7; [30], [31]). Raw percent agreement is not accepted. Where the positive class is rare, the record adds the confusion matrix and the recall for the harmful class. The judge is recalibrated whenever the judge model, prompt or rubric changes (S6.2 governed configuration).
   - **Judge independence.** A model-based grader runs outside the system under test, because agents skew positive when grading their own work [35] — a separate prompt, a separate context and, where feasible, a different model family; a self-assessment step inside the pipeline is a guardrail (S1.3), not a grader, and its verdicts are not S2 evidence.
5. **S2.9 Measurement plan.** Automated evals in CI; production monitoring; A/B tests for significant changes; user-feedback triage; transcript sampling cadence; human–AI interaction studies [34]; periodic human studies for judge calibration (S2.4).
   - **Harness versioning.** The eval harness itself is versioned, because infrastructure noise alone moves scores [12]: the harness version records, per task, the guaranteed and hard-limit compute (memory, CPU, wall-clock), the enforcement mode, the runner class and per-call timeouts, and the binding (SDD Principle 11); a change to any of them is a drift event (S2.8).
   - **Noise band.** The harness's run-to-run noise band is measured by repeated runs of the pinned configuration on separate days and recorded with the baseline (method: SDD A7). A score movement smaller than that band is neither a pass nor a fail at the change gate; it is reported as "no evidence of change" and re-run before a decision rests on it.

### 5.3 `S3` — Identity, access & security

| ID | Section | Must contain |
|---|---|---|
| S3.1 | Agent identity | Every new agent has its own Microsoft Entra Agent ID [14] — not a shared service principal — with a sponsor, lifecycle rules and its Agent 365 registration record ID (note 1) |
| S3.1a | Trust level and sponsor lifecycle | CSA ATF [43] trust level with demotion criteria and incident trigger; the containment mechanism; the sponsor's lifecycle obligations; the retirement trigger (note 2) |
| S3.2 | Role-capability matrix | Per role, agents and humans alike: data scope in context, read sources, write targets, cross-tenant, external communication, recommend, act in source — with the scope invariants that follow |
| S3.3 | Tenant isolation and aggregation confidentiality | Partitioning, row filters, entitlement resolution, no shared index; aggregation only by deterministic job, minimum cohort, suppression rules — mandatory where the product serves parties that compete |
| S3.4 | Threat model | Threat, vector, impact and controls by ID, each control with its implementing artifact and control state; every row labeled to the OWASP agentic and LLM lists and, where anchored, ATLAS (note 3) |
| S3.5 | Audit and logging | Tamper-evident, correlation-linked audit per SEC-04; provenance on every record; the per-run agent bill of materials; the declared logging level; boundary events audited (note 4) |
| S3.6 | Application security | Secrets injected at process start; startup validation; every state-changing route authenticates, authorizes and rejects replay; external identifiers validated and path-confined (note 5) |
| S3.7 | Control state, isolation boundary and adversarial evidence | The isolation boundary; the control-state table; adversarial evidence from the injection sub-suite and the containment exercise; the AgBOM pins (note 6) |

**Notes to the S3 table.** Each note gives the full content of the row that cites it; the cell summarizes it.

1. **S3.1 Agent identity.** Every new agent has its own Microsoft Entra Agent ID [14] — not a shared service principal — with blueprint inheritance, a sponsor, lifecycle and deprovisioning rules, Conditional Access for agents, and its **Agent 365 registration record ID** (SEC §5, SEC-17). Retirement of the prior agent-registry Graph API began on 15 June 2026; any agent registered only through it is re-registered or is not running.
   - **AIR fields and licensing.** The identity type, delegation chain and capability declaration fields of the AIR (CRISP-AG §5.5) are recorded here or cited. Licensing prerequisites are a VCS matter (VC-09).
   - **Migration and registration.** Existing service-principal agents migrate to their own agent identities by a date the organization sets. Registration is a presence requirement: Lite products register too. The field schema of the Agent 365 registration record is not specified here; the Harness Engineer supplies it.
2. **S3.1a Trust level and sponsor lifecycle.** CSA ATF [43] level (Intern / Junior / Senior / Principal) per CRISP-AG §5.1.4 and §5.5, with the demotion criteria and the incident trigger per CRISP-AG §5.1.3 — including the model- or system-change review trigger of ATF v0.9.1 — and the statement that re-promotion requires full gate passage; the containment mechanism recorded in the AIR (CRISP-AG §5.5), with SEC §5 (SEC-12) as the enforcing specification and the monitoring that fires it, live before W7; the sponsor's lifecycle obligations; the retirement trigger. S3.1a is part of the S3.1 identity record.
3. **S3.4 Threat model.** Threat / vector / impact / controls by ID, and for each control its implementing artifact and its control state — *specified*, *implemented* or *demonstrated* per SEC §3 — with the evidence ID (S2.2 run, SEC-14 result or test) for every *demonstrated* control. A control cited here that resolves to no artifact fails the W2 exit check.
   - **Taxonomies.** Every row is labeled to the OWASP Top 10 for Agentic Applications 2026 (ASI01–ASI10, published 9 December 2025) [20] and cross-referenced to the OWASP LLM Top 10 2026 [19] (3 August 2026; LLM01–LLM10 as renumbered in that edition, including LLM08 Hidden Context Exposure and LLM10 Improper Output Handling); ATLAS [21] technique IDs where an incident anchor exists (SEC threat model).
   - **Explicit treatment** of indirect prompt injection via ingested content, of output handling (LLM10) where agent output is rendered or executed downstream, and of memory, inter-agent and cascading-failure surfaces by reference to CRISP-AG §7 and §7.2.
4. **S3.5 Audit and logging.** Tamper-evident, correlation-linked audit per SEC §5 (SEC-04): each record commits to its predecessor, a verifier can establish that no record has been removed, reordered or altered, and the head of the record is anchored outside the system that writes it. An append-only guarantee enforced solely by the writer's code or by repository configuration does not satisfy this requirement.
   - **What is logged.** Pre-write, actor, model and prompt provenance on every record; the per-run agent bill of materials referenced by hash (SEC-16); the logging detail level declared as a design decision proportional to risk; boundary events — refusals, suite failures, spend halts (S5.2), fence truncations (S1.6) — audited so the boundary is monitorable.
   - **Reference form:** the evidence ledger of Harness Specification HRN-05 and HRN-06.
5. **S3.6 Application security.** Secrets and short-lived credentials injected at process start with no credential file on the runner (SEC-11); startup validation; hashing. Every route that changes state meets three separate requirements: it **authenticates** the principal from a credential the request cannot forge (SEC §5, SEC-01 — instruction authenticity); it **authorizes** the request against an entitlement resolved outside the request (S3.2 role-capability matrix; Entra Conditional Access for agents); and it **rejects replay** (SEC-03 — unique instruction identifiers and validity windows). Identity or role asserted in the request body satisfies none of the three. Externally supplied identifiers are validated and path-confined before use (SEC-02).
6. **S3.7 Control state, isolation boundary and adversarial evidence.** The section has three parts and one rule:
   - **Isolation boundary** (Harness Specification HRN-11; SEC §5, SEC-10): the read roots, the write roots, the egress allowlist, and the processes that run outside the boundary (hooks, MCP servers, file tools where the platform runs them on the host), each with the mechanism that enforces it — OS or hypervisor primitive, gateway, or pattern match on tool arguments — and, where the mechanism is a pattern match, what it does not cover; the Managed Runner Baseline version (SEC §6, MRB-1) where the runtime is Claude Code.
   - **Control state table**: every S3 control by ID with its state — *specified* / *implemented* / *demonstrated* / *retired* per SEC §3 — its implementing artifact, and the evidence ID behind each *demonstrated* entry; the same states appear in H14.
   - **Adversarial evidence**: the injection sub-suite of the S2.2 adversarial boundary suite (SEC §5, SEC-14 for the method) — utility under attack, static attack success rate and adaptive attack success rate, reported per H9 boundary for the defended and the undefended configuration — with the last run IDs; the last exercise of the containment mechanism recorded in the AIR (CRISP-AG §5.5) with time-to-halt; the tool-description and MCP-server pins of the AgBOM (SEC-19, SEC-16).
   - A control in state *specified* for longer than one change gate is an H12 open question with an owner.

### 5.4 `S4` — Risk, jurisdiction & compliance

| ID | Section | Must contain |
|---|---|---|
| S4.1 | Regulatory and professional frame | Table: instrument → what applies to this product specifically → which requirement IDs it produces |
| S4.2 | Jurisdictional applicability | Per deployment geography: jurisdiction, data-protection regime, contract constraints, the AI-specific regime and its applicability test, the classification, status and owner (note 1) |
| S4.3 | Risk management | **By reference** to the enterprise AI governance document (CRISP-AG or its successor) for the NIST AI RMF [15] mapping (GOVERN / MAP / MEASURE / MANAGE; Generative AI Profile risk categories); S4 records only this product's deltas; MEASURE is satisfied by S2 |
| S4.4 | Impact assessment | ISO/IEC 42005:2025 guidance on AI system impact assessment [16], made **mandatory in Full form** by this Standard; DPIA where personal data is processed; ISO/IEC 42001 alignment statement where pursued |
| S4.5 | Data protection and residency | Minimization before model calls; residency per Geo; vendor due diligence by reference to each Vendor Service Profile; transparency notices naming the disclosed principal (note 2) |
| S4.6 | Domain controls | Financial-reporting, professional-standards, or sector controls the product touches — for example SOC 1 evidence, licensing deny-lists |
| S4.7 | Standards watch | The standards watch, owned by the AI Risk Officer / AI Governance Board, and the vendor watch, owned by the Vendor Control Owner (note 3) |

**Notes to the S4 table.** Each note gives the full content of the row that cites it; the cell summarizes it.

1. **S4.2 Jurisdictional applicability.** Per deployment geography: jurisdiction; data-protection regime; contract constraints; AI-specific regime and its applicability test; classification; status; owner; and contract-clause status per VCS VC-09.
   - **Applicability test.** For the EU, Article 2 [17]: a provider placing on the market in the Union, a deployer in the Union, or output used in the Union; for Singapore, the IMDA framework [18]; for the United States, the state statutes below; for other geographies, the regime that applies.
   - **US state statutes**, per geography where a T6 task or personal data is present, are set out in the four items that follow.
   - **Colorado SB 26-189** [39] (signed 14 May 2026; effective 1 January 2027; repeals SB 24-205): covered ADMT processes personal data and materially influences a consequential decision in employment, education, housing, financial or lending, insurance, health care or essential government services; tools used only to organize or present information for human review are excluded. The duties are pre-use notice, adverse-decision explanation within 30 days, separate rights to correct data and to human reconsideration, and three-year record retention. Developers supply a statement of intended uses, known risks and limitations, and training-data categories (recorded in the Vendor Service Profile, VCS VC-03). Enforcement is by the Attorney General only, with a 60-day cure period until 1 January 2030 that is not available for knowing or repeated violations. There is no impact-assessment duty.
   - **California CPPA ADMT regulations** [40] (effective 1 January 2026; ADMT duties from 1 January 2027; first risk-assessment attestation 1 April 2028): significant decisions in financial or lending services, housing, education, employment or independent contracting, and health care. The duties are a pre-use notice that states the purpose, the right to opt out and the alternative process, and an opt-out, which is not required where the appeal is to a human reviewer with authority to overturn the decision (H8).
   - **Illinois HB 3773** [41] (P.A. 103-0804, effective 1 January 2026): AI in employment decisions under the Human Rights Act.
   - **Texas TRAIGA** [41] (HB 149, effective 1 January 2026).
   - **Classification.** For the EU, whether the product is Annex III high-risk, relies on an Article 6(3) condition, or is subject only to Article 50 transparency. Where Art. 6(3) is relied on, the assessment is documented in S4 before deployment and registered where Art. 49(2) applies; a vendor's terms excluding high-risk use are not evidence of the organization's position. The Commission's draft classification guidelines [17] of 19 May 2026 state that human adoption of per-individual recommendations does not remove high-risk status, that a multi-purpose system's intended purpose is deemed to cover high-risk uses unless they are coherently excluded, and that a terms-of-service disclaimer is insufficient. The guidelines are a draft: consultation closed 23 July 2026, the Commission states the final guidelines will be adopted by the end of 2026, and they remain an S4.7 watch item until adopted.
   - **Current EU dates** (Regulation (EU) 2026/1744 of 8 July 2026, OJ 24 July 2026, in force 27 July 2026): Article 50 has applied since 2 August 2026, read with the Commission Guidelines on transparency obligations (final 20 July 2026) and the Code of Practice on transparency (adequacy July 2026, unverified; see §11.2). Signing the Code is not a safe harbor. A grace period for Art. 50(2) marking runs to 2 December 2026 for systems on the market before 2 August 2026; the new Art. 5 prohibitions apply from 2 December 2026 (per amended Art. 113); Annex III applies from 2 December 2027 and Annex I from 2 August 2028; high-risk systems already on the market come into scope on substantial modification, and those intended for use by public authorities comply by 2 August 2030 (Art. 111(2)).
2. **S4.5 Data protection and residency.** Minimization or tokenization before model calls; residency and in-Geo processing rules per deployment Geo, naming the in-Geo substitute at each tier where the primary service has none.
   - **Vendor due diligence** by reference to the data-protection block of the Vendor Service Profile (VCS §4, VC-07) of every service in S1.9 — data use, retention by model and tier, sub-processors, transfers, inference location and per-Geo availability — with S4 recording only this product's deltas. Any open item in that block carries an owner and a closure date; the DPIA (S4.4) is not final while an open item lacks either.
   - **Transparency notices** meeting Art. 50(1) as read by the Commission Guidelines of 20 July 2026: the AI nature of the system *and the disclosed principal* (H8) — the entity or person on whose behalf the agent acts — at first contact and at each new interaction, on every surface where direct interaction with a natural person is reasonably likely. For outbound communications (H9 "Communicate externally" answered yes), the disclosure is carried in the message by protocol (H10 class Protocol), not by instruction. Where AI-generated text is published to inform the public, S4.2 records whether Art. 50(4) editorial responsibility is genuinely exercised — routine review by the human of record does not qualify. Equivalent notice duties in other geographies (Colorado pre-use notice; CPPA pre-use notice) are recorded in the S4.2 row for that geography.
3. **S4.7 Standards watch.** Owned by the AI Risk Officer / AI Governance Board: the deliverables of the NIST AI Agent Standards Initiative (launched 17 February 2026) [15]; EU harmonized standards (noting that EN ISO/IEC 42001:2026 is not an OJEU-cited harmonized standard and carries no presumption of conformity); the Commission's high-risk classification guidelines until adopted; anything that would change S3 or S4 when it lands. **Vendor watch**, owned by the Vendor Control Owner (VCS §6): deprecation, retirement, meter, price, data-terms and regional-availability announcements for every service in S1.9, captured in the Vendor Change Register (VCS §4, VC-05) within five working days with the affected pins and the decision; a captured change that touches a pin opens a "vendor change absorbed" delta (S6.2).

> **Note for the S4 owner (not normative text).** The VC-07 block must be able to carry at least the following: a model-specific retention requirement that overrides an organization's ZDR arrangement (the Covered Models case, on the API, in Claude for Enterprise and on Databricks FMAPI); a per-surface inference-location control (set `inference_geo` to `global` or `us`; US-only routing costs 1.1×, and no EU pin is available) and the consequence that an EU in-Geo requirement is met on Databricks FMAPI in the Europe Geo or a regional hyperscaler endpoint, not on the direct API; and the cost multiplier a residency decision carries into S5.5.

### 5.5 `S5` — Operations

| ID | Section | Must contain |
|---|---|---|
| S5.1 | Observability | One span per agent call — model, tokens, duration, retries; per-step trajectory logs; the trace platform |
| S5.2 | Runtime controls | Restart-free configuration; the master autonomy off-switch and per-function halt switches; bounded parameters, including the spend cap and tier ceiling; configuration audit and rollback (note 1) |
| S5.3 | Human-intervention triggers | Failure-rate thresholds and high-risk actions that hand control to a human; graceful handoff behavior; who is paged for what |
| S5.4 | Runbook | Incident response; halt and resume; rollback to the last passing configuration. Owned by the S5 owner; halt authority rests with the platform or runner operator, and the AI Risk Officer may order a halt |
| S5.5 | Cost and capacity | Operating cost per unit of work; the monthly budget, alert threshold and hard cap per agent and vendor service, with the enforcing layer and owners; the model tier per agent; capacity (note 2) |
| S5.6 | Workflow & Workforce Impact Record | The full WWIR per CRISP-AG §5.7, including the reviewer-capacity model, training plan, adoption scorecard and reviewer-monitoring disclosure; summarized in H5 (note 3) |

**Notes to the S5 table.** Each note gives the full content of the row that cites it; the cell summarizes it.

1. **S5.2 Runtime controls.** Restart-free configuration; the master autonomy off-switch and per-function halt switches; bounded parameters that refuse out-of-range values; configuration audit and rollback. The spend cap and the tier ceiling (S5.5) are bounded parameters under this section: exceeding the cap halts the agent or holds the unit of work with a recorded reason, the halt is audited (S3.5), and resumption is a recorded human action. Where the vendor plane cannot halt (alert-only), the halt is implemented in the orchestrator or gateway and named here.
2. **S5.5 Cost and capacity.** Operating cost per unit of work, by tier and by vendor service, including any residency multiplier (S4.5).
   - **Budget and cap.** The monthly budget per agent and per vendor service under the spend governor (Harness Specification HRN-12; VCS §4, VC-01), its alert threshold and its hard cap; the layer that enforces the cap (gateway budget, vendor admin limit, provider spend limit, or "none — alert only") and the evidence that it is configured; the named budget owner and the Finance recipient of the monthly showback. A budget raised more than once in a quarter is an AIGB item. Where the enforcing layer is alert-only, S5.2 records the compensating halt and H14 marks the cap *specified*, not *demonstrated*.
   - **Tier and capacity.** The model tier per agent (VC-02), the premium-tier share of calls and its ceiling, and the cost–accuracy curve from S2.6; capacity limits; load-test status.
3. **S5.6 Workflow & Workforce Impact Record.** The full WWIR per CRISP-AG §5.7: as-is and to-be workflow with DAS positions, role-impact table, reviewer-capacity model — including the human override rate, the active review time (from evidence displayed to decision, not elapsed queue time) and, for T6 tasks, the time the overturn-authority review takes (H8) — training plan with capability measures, adoption scorecard and baseline, reviewer-monitoring disclosure with the reviewer-behavior metrics CRISP-AG §7.2.2 names (streak length; active review time). The record is summarized in H5.

### 5.6 `S6` — Iteration & change record

| ID | Section | Must contain |
|---|---|---|
| S6.1 | Editable surfaces | The harness surfaces on which engineering effort accumulates — prompts, memory, sub-agents, tools, evaluation, skills, middleware, and product-specific surfaces |
| S6.2 | Change control | Pinned identifiers and their successors; provenance on every output; the change gate; the governed configuration that counts as a change; change classes, including vendor change absorbed (note 1) |
| S6.3 | Spec deltas and archive | Every behavioral change as a delta — ADDED / MODIFIED / REMOVED requirement or scenario — with predicted fix and predicted risk; verdict recorded at the next iteration; archived by date |
| S6.4 | Release history | Per release: theme, headline change, features delivered, next-release trigger |

**Notes to the S6 table.** Each note gives the full content of the row that cites it; the cell summarizes it.

1. **S6.2 Change control.** Pinned identifiers and their named successors; provenance on every output; the change gate — which suites must pass, who approves, what stays deployable for rollback; the governed configuration that counts as a change: ordering rules, thresholds, cohort parameters, model tier and effort per task class, router mode and inclusion list, budget, alert threshold and cap, the binding (SDD Principle 11), and any judge model, prompt or rubric (S2.4). Change classes include **vendor change absorbed**: a vendor-initiated deprecation, retirement, meter, price or terms change captured in the Vendor Change Register (VCS §4, VC-05). Such a change is gated on the substitution suite (VC-05 — the S2.2 regression and adversarial boundary suites run against the successor on the same binding) and on AI Risk Officer approval; it is recorded as an S6.3 delta with the vendor notice attached and is completed before the vendor's notice window closes.

## 6. The machine-readable spec (M)

**Convention.** The OpenSpec folder layout and delta format are this Standard's convention, pinned to OpenSpec 1.13 (v1.13.1, 17 September 2026) [26]; the OpenSpec tool itself is optional, and adopting a later major version of the convention is a spec delta to this section. The convention is platform-neutral: it is a set of files in a git repository and works on any git host.

**Location.** M lives in each product repository and points at a shared store in a governed specification repository, so that requirements one team owns and others consume have one home.

**Layout and mapping.** Each human-readable source maps to one machine-readable form.

| Human-readable source | Machine-readable form |
|---|---|
| H4 governing invariants; H9 boundaries | Scenarios in which behavior must **not** occur |
| H8 delegation authority scope | `specs/<capability>/das.yaml` — one row per action: `action`, `position`, `enforced_by`, `approvers[{role, level}]`, `evidence_cadence`, `t6_flag`; `traceability.csv` gains a `das_position` column |
| H6 journeys | Scenarios in which behavior must occur |
| H10 requirements | `specs/<capability>/spec.md` — requirement plus scenarios, carrying ID, class, and mechanism |
| H11 success criteria; S2 tasks | Eval task definitions, one per scenario |
| S1.7 schemas | Schema files |
| S6.3 deltas | `changes/<name>/` containing proposal, delta specs (ADDED / MODIFIED / REMOVED), design, tasks; on completion, deltas merge into `specs/` and the change moves to `changes/archive/YYYY-MM-DD-<name>/` |
| H14 manifest | The shared store index that product repositories reference |
| Standing instructions to agents | `AGENTS.md` or the platform equivalent |

**Format.** A `spec.md` is a sequence of `### Requirement: <name> (<IDs>)` headings, each followed by `#### Scenario: <name> [positive|negative]` blocks in bulleted **GIVEN** / **WHEN** / **THEN** (and **AND**) form, as OpenSpec ≥ 1.13 validates. The `[positive|negative]` tag is an extension of this Standard; it is appended to the scenario name and is inert to the tool. *Positive* means that behavior must occur (H6 journeys, H11 criteria); *negative* means that behavior must not occur (H4 invariants, H9 boundaries, declared properties). A delta file uses the headings `## ADDED Requirements`, `## MODIFIED Requirements`, `## REMOVED Requirements`, with the same structure beneath each; a change folder may carry `.openspec.yaml`. `AGENTS.md` is prose and carries instructions only: the boundaries as numbered rules, how to change the system, and the provenance discipline. It carries no repository overview [32] or restated design. Its effect on the regression suite is measured like any other S6.1 surface. Where a team uses Spec Kit, a `constitution.md` may carry H7 by reference.

**Rules.** M is generated from the hub and S2, never authored independently; a discrepancy between M and the hub is a defect in M. Narrative sections — H1, H2, H5, H7, H13 — have no machine-readable form. Archiving happens after the change's pull request merges, so `specs/` advances only with work that has shipped. A merge conflict in `specs/` means that two changes disagree about how the system should behave; it is resolved by keeping the requirement that reflects reality.

## 7. IDs and traceability

- **ID scheme.** One prefix per artifact family — for example `REQ-`, `INV-`, `SC-`, `C-HARD-`, `C-SOFT-`, `EVAL-`, `DRIFT-`, `ISO-`, `CONF-`, `CHG-`, `RUN-` — unique across the set, assigned once, never reused.
- **Traceability matrix.** Generated, not hand-maintained: requirement ID → objective (H3) → enforcement-mechanism class → verification (eval task or test ID) → source. Before code exists, the computed quantity is the enforcing share; once code exists, the verification column carries pass/fail against the same IDs.
- **Rules.** A prompt-only requirement names a deterministic backstop. A requirement with no verification is an intention and goes to H12's open-questions log until it has one.

## 8. Process gates

### 8.1 Completeness test

Before the hub is approved, the test asks three questions. Can an engineer build from the hub? Can the eval owner write the task suite from it? Can a compliance reviewer locate every obligation's evidence? The test is signed by the **AI Product Owner, the Eval Owner, and the AI Risk Officer** (Workflow §4) and recorded in H0.

### 8.2 Reader test

Both parts are required. **(a) Model reader:** the hub and spokes are given to a fresh model instance with no other context, and the instance answers the questions in Appendix C in the roles of a Business-line Technology Lead, an architect, and a compliance reviewer. Every wrong or uncertain answer is a defect in the document, not in the reader. **(b) Human panel:** at least one reader from each of the three roles reads the hub and answers the same questions. The test is recorded in H0. **Pass condition:** zero wrong answers after one repair loop, in both halves; uncertain answers are adjudicated by the AI Product Owner and one reviewer from another role; anything unresolved is logged in H12 with an owner. When the document under test is the Standard itself, each question is asked as "where must a conforming set answer this?" and the pass condition is the crosswalk in Appendix C.

### 8.3 Change gate

A change to any artifact is a spec delta. Before the set's version advances, all of the following hold: the deltas are validated; the regression suite and the adversarial boundary suite pass on the new configuration (S2.2); any S3, S4, or S6 change has its spoke owner's approval; the proportionality worksheet is re-run; and the previous configuration stays deployable for rollback.

### 8.4 Claims rule

No artifact other than the hub asserts what the product does. A claim not present in H14 with a defensible marking and an evidence ID is not a claim the product makes. **Benchmark rule.** A vendor's, a platform's or a public leaderboard's benchmark result, model-card figure, certification or contractual assurance is context, never evidence for a claim in H14 — this Standard's rule, prompted by contamination of SWE-bench Verified [37] and benchmark reliability and gaming concerns [38]; evidence is a run ID of the product's own S2 suite on the product's own binding, or an S3.7 entry. H14 records the vendor claims that were taken into account so that the rule is visibly applied.

## 9. Proportionality rule — Full and Lite forms

### 9.1 What the rule decides

| Element | Full | Lite |
|---|---|---|
| Hub | All 15 sections (H0–H14) | All 15 sections (H0–H14) |
| Spoke content | Six separately owned, separately versioned artifacts, each with its own approver | Same content as appendices A–F of the hub, same section IDs, one version, one owner — with S2 and S3 appendices reviewed by the eval owner and the AI Security Reviewer respectively |
| Machine-readable spec | Required | Required |
| Change gate | Per-spoke approval; all suites run | Single approval; floor suites run — the regression suite and every adversarial boundary suite; the capability suite optional |
| Traceability | Generated; enforcing share reported | Generated; enforcing share reported |
| Registry | Registered | Registered |

**Never changes:** every hub section; every spoke's sections; the ID scheme; the traceability matrix; the honest-claims matrix; non-goals and action boundaries; the evaluation sections and their evidence floor; the agent-identity record; and the vendor items VCS marks *always* — S1.9 with Vendor Service Profile IDs, tiers, successors and retirement dates; S5.5 budget, threshold, cap and owner; S3.1 registration; and, where the runtime is a vendor product, the configured-agent profile (VCS §4, VC-06) with the DAS ceiling that follows from any control the platform cannot enforce. The rule adjusts ownership, versioning, approval, and depth — not presence.

### 9.2 Global triggers — any one selects Full

| # | Trigger | Rationale |
|---|---|---|
| T1 | **Autonomy.** Any action positioned at AGENT-DIRECTED or FULLY-AUTONOMOUS — the agent executes and a human reviews afterward or not at all. HUMAN-ONLY and HITL-REQUIRED positions do not trigger it | Once the human is downstream of the action, oversight, audit, and change control need their own owners |
| T2 | **Action capability.** Any agent holds a tool that writes to a system of record, communicates outside the platform, moves money, or creates a legal or contractual obligation | An action in an external system cannot be undone by a rollback |
| T3 | **External reach.** Output is client-facing, public-facing, or feeds a regulated report. Internal output that feeds the decisions of another part of the same organization does not trigger it | A client-facing output carries the organization's name and, where licensed activity is involved, a human of record |
| T4 | **Regulatory position.** EU Annex III high-risk; *or reliance on a boundary to stay out of high-risk* (for example the Article 6(3) preparatory-task exemption); or any regime requiring an impact assessment or conformity evidence | A boundary that keeps a system out of a regime is itself a control that must be evidenced and re-verified at every change |
| T5 | **Sensitive personal data.** Special-category personal data (GDPR Art. 9 or an equivalent regime) processed at scale — above the DPO's DPIA threshold for the geography, or, absent one, any systematic processing. Ordinary personal data is an S3 promotion, not a global trigger | Impact on individuals is the harm regulators weigh most heavily |
| T6 | **Consequential decision about a person.** Any task that materially influences a decision affecting a person's access to or terms of employment, housing, credit or lending, insurance, education, health care, legal status, or essential government services (CRISP-AG §5.4.3; Colorado SB 26-189 [39]; EU AI Act Annex III [17]) | The harm is to the affected person and the failure mode is human deferral (note 1) |
| T7 | **Enterprise-critical.** Any system whose outputs are consumed as inputs to the governance of other agentic systems (note 2) | A single run is harmless; a thousand runs shape every boundary in the enterprise (note 3) |

**Notes to the trigger table.** Each note completes the cell that cites it.

1. **T6 consequences.** The trigger brings the HITL-REQUIRED ceiling (H8) with overturn authority for the human of record, a mandatory impact assessment (S4.4 — this Standard's policy per ISO/IEC 42005 and CRISP-AG §5.6; not a Colorado requirement after SB 26-189, which removed it), a Responsible AI / Privacy approver, and the notice, adverse-decision explanation and human-reconsideration duties of the geographies in S4.2.
2. **T7 scope.** Examples include a PRD or specification assembler, a registry or classification agent, an intake coach, and a policy or DAS compiler. Monitoring, reporting, and analytics over agents do not trigger it; the test is whether the output *constrains or configures* another system, not whether it describes one.
3. **T7 rationale.** The harm is reach over time — a defect propagates into every system the output governs — so the evidence for such a system needs separate owners and separate approvals from the start. T7 is the first trigger about reach over time rather than reach in one action; it is this Standard's own contribution to the cited practice (Appendix D).

### 9.3 Per-spoke promotion — a Lite product still gives one spoke Full treatment when its condition holds

| Spoke | Promoted when |
|---|---|
| S1 Design record | More than one agent with delegation; a supervisor pattern; a composition seam with another agentic system; a seam with an *unverified counterpart* (S1.10) |
| S2 Evaluation | **Floor — minimum evidence, all sections present:** every S2.1–S2.9 section exists in Lite (S2.5–S2.7 and S2.9 may be brief); the evidence floor is a task suite, a regression suite, and a negative task for every action boundary. Promoted to a separately owned artifact when an LLM judge gates any release decision |
| S3 Identity & security | Any personal data; more than one tenant; tenants that compete; any agent permission beyond read-only on its own scope |
| S4 Risk & jurisdiction | Deployed in, or output used in, more than one jurisdiction; or any jurisdiction with an AI-specific regime |
| S5 Operations | Scheduled or unattended operation; a halt switch is a required control |
| S6 Change record | A formal approver is required for model, prompt, or judge changes |

### 9.4 Size — a re-run condition, not a trigger

The following are recorded: the number of agents and whether any delegates; the tenants served; the jurisdictions touched; the volume per period; and the distinct user roles. A Lite product that grows past **three agents, one tenant, or one jurisdiction** re-runs the worksheet at its next change gate. The CRISP-AG agent class (CRISP-AG §4) is recorded here. Class does not select the form — the triggers do — but Class 4 (can alter production state) always fires T2, and Class 3 (hierarchical multi-agent) always promotes S1. An agent whose writes are confined to staging under the Class 4 write controls is not Class 4; it records "Class 4 write controls carried" and answers T2 on its own terms.

### 9.5 Worksheet

The worksheet is recorded in H0, signed by the **AI Product Owner and the AI Risk Officer** (Workflow §4), and re-run at **every change gate and annually**.

```
Proportionality worksheet
Product: _______  Version: ____
Date: ________

Global triggers (T1–T7)
                      Yes / No  Evidence
                                (ID or note)
T1 Any action at
   AGENT-DIRECTED or above
                      [ ]       ______
T2 Write / outbound / money /
   obligation tool    [ ]       ______
T3 Client-, public-, or
   regulated-report-facing
                      [ ]       ______
T4 Annex III, exemption-reliant,
   or IA-required     [ ]       ______
T5 Sensitive personal data
   at scale           [ ]       ______
T6 Consequential decision
   about a person     [ ]       ______
T7 Enterprise-critical (governs
   other agentic systems)
                      [ ]       ______

CRISP-AG class (1–4): ___
  (Class 4 = production-state writes ⇒ T2;
   Class 3 ⇒ S1 promotion)
Class 4 write controls carried
  (staging-only writes): [ ]

Form selected:  FULL  /  LITE

Per-spoke promotion (Lite only)
  S1 [ ]   S2 floor always; promoted [ ]
  S3 [ ]   S4 [ ]   S5 [ ]   S6 [ ]

Size: agents ___  delegating? ___
      tenants ___  jurisdictions ___
      volume/period ___  roles ___

Signed: AI Product Owner ________
        AI Risk Officer  ________
Next re-run: change gate for ________
             or annual on ________
```

### 9.6 Worked application

POE (Appendix B) answers No to T1 and T2 by design, Yes to T3 and T4, and No to T5, T6 and T7, so it takes the **Full** form (POE's H0 worksheet). An internal drafting assistant with no tools, one team, one jurisdiction, no personal data, no decision about a person and no output that configures another agentic system answers No to all seven, so it takes the **Lite** form, with the S2 floor still applying.

## 10. Roles and ownership

This section names role types only. People and organizational functions bind per product at W0 and are recorded in that product's H0 and registry entry.

| Artifact | Owner (role type) |
|---|---|
| Hub | AI Product Owner |
| S1 Design record | Architect |
| S2 Evaluation spec | Named eval owner — assigned per product at W0; the accountable holder is often the Business-line Technology Lead, and a named engineer is responsible |
| S3 Identity & security | Security / identity |
| S4 Risk, jurisdiction & compliance | Compliance / Data Protection, with Model Risk / AI Governance |
| S5 Operations | Platform operator |
| S6 Iteration & change record | Product engineering |
| M | Generated; product engineering maintains the pipeline |
| Standards watch (S4.7) | AI Risk Officer / AI Governance Board |
| DAS rows (H8) — PROHIBITED and HUMAN-ONLY positions sourced to a regulatory waiver, statutory exposure, contract decision, negotiation position, or executory commitment | Legal |
| Proportionality signatories | AI Product Owner + AI Risk Officer |
| Completeness signatories | AI Product Owner + Eval Owner + AI Risk Officer |
| Vendor Service Profile references (S1.9, S4.5) and vendor watch (S4.7) | Vendor Control Owner (VCS §6; Workflow §4) |
| Budget, cap and showback (S5.5) | Named budget owner (product) with the Vendor Control Owner; Finance recipient named |
| Control-state table and isolation boundary (S3.7) | Security / identity (AI Security Reviewer), with the Harness Engineer for the boundary |
| Judge validation record (S2.4) | Named eval owner — the responsible engineer |

The role types in this table are reconciled with the Agentic Delivery Workflow's eleven roles (Workflow §4). Names the table shares with the Workflow, such as AI Product Owner, Architect, Legal and Vendor Control Owner, need no mapping. The other role types map as follows: Named eval owner → Eval Owner; Security / identity → AI Security Reviewer; Compliance / Data Protection → Data Protection Officer; Model Risk / AI Governance → AI Risk Officer (gate approvals and signatures) and AI Governance Board (ratification and exceptions); Platform operator → Harness Engineer. Product engineering is not one of the eleven roles; the Workflow's RACI gives it a row of its own (Workflow Appendix A). Named individuals enter per product at W0.

## 11. Discussion and limitations

### 11.1 What the Standard deliberately leaves open

- **Thresholds that need data.** The enforcing share is reported, not gated: no minimum applies until a three-product baseline exists (H10, §7).
- **Role types, not people.** The Standard names role types. People and organizational functions bind per product at W0 (§10).
- **Legal responsibility.** Naming a disclosed principal is a transparency attribution. It does not decide whether, or how, an agent's actions bind the entity it acts for; allocation of legal responsibility is out of scope (H8).
- **Platform choices.** The Standard requires the architecture to be recorded and imposes one architectural constraint — properties that must hold are enforced by code and types, not by a model's choice — but prescribes no platform or coding choice (§1.1).
- **Adoption.** Dates, owners and resourcing for adopting the Standard belong to an adopting organization's own plan. Section 11.3 gives the order of work the Standard assumes.

### 11.2 Verification status and weakest points

Appendix D records each claim the Standard makes about itself and the evidence behind it. The Standard's weakest points are these.

- **The reader test has been run on the Standard only in part.** It was run on an earlier version with the model half only. The human-panel half is not reported in this version, and the test has not been re-run on the current version. Until both halves pass, the Standard has not met its own gate (§8.2).
- **The worked examples are specifications, not results.** POE (Appendix B) and the assembling agent of the Agentic Delivery Workflow [6] are specified at Full form. They show how a set is assembled under the Standard; showing conformance needs each to pass its own reader test and to carry the vendor and security items of the current version.
- **Hub-and-spoke scaling is reasoned, not measured.** No measurement yet shows that the hub-and-spoke form scales better than a consolidated document.
- **T7 has no external precedent.** The enterprise-critical trigger is this Standard's own contribution; no external source supplies a trigger for reach over time (§9.2).
- **Verbal forms are applied in part.** Sections 2 to 4 are drafted in shall / should / may form; §5 onward is written in descriptive form and is read under the rule in §1.6.
- **Regulation moves faster than the text.** The regulatory content of S4.2 is current to September 2026. The Commission's high-risk classification guidelines are a draft and remain an S4.7 watch item until adopted. The mapping of the control-state vocabulary to external audit vocabularies is the Security Specification's to verify and remains unverified.

**Source verification.** Citations that rest on secondary sources are marked *(unverified)* in the text or *(secondary source)* in the References. The following rest on secondary sources or summaries rather than on the primary text: the field schema of the Agent 365 registration record (S3.1); the enrolled text of Colorado SB 26-189 [39], cited from two law-firm summaries; IMDA's discussion paper on legal responsibility [42], cited from a law-firm summary; the content of IMDA's framework v1.5 [18]; the full text of [27]; the exact publication day of the A2A v1.0 specification [33]; and the Illinois and Texas statutes [41], cited from law-firm summaries. Two dates differ between sources: the adequacy date of the EU Code of Practice on transparency [17] and the application date of the new Art. 5(1)(ba) and (bb) prohibitions of the AI Act, which sources give as either entry into force or 2 December 2026. S4.2 uses 2 December 2026, per amended Art. 113.

### 11.3 Standing the regime up

The Standard does not carry dates, owners or resourcing for its own adoption. The order of work it assumes is:

1. **Governance.** Charter the AI Governance Board (AIGB), which ratifies the Standard and grants exceptions, and hold the AI Product Owner and AI Risk Officer roles in separate hands.
2. **Platform foundations.** Establish a governed specification repository, a registration path for agent identity (on the Microsoft stack, Entra Agent ID with Agent 365 registration), the managed harness on every runner, and an enforcing layer for spend caps (VCS VC-01).
3. **One pilot.** Take one product through W0–W7, with the assembling agent (Workflow §9) drafting the set and a deterministic recorder (with no model in it) logging gate decisions and exceptions, and measure the effort per set.
4. **Scale.** After three products, set the enforcing-share threshold (H10) and re-run the reader test on the Standard with the human panel.

### 11.4 Change control for the Standard itself

Changes to the Standard follow the change control of the enterprise governance document, and the AI Governance Board ratifies each version. A superseding version names what it replaces and the migration window; a withdrawn version stays readable in the repository with its status marked. Within each product's set, the standards watch (S4.7) tracks the external developments — regulatory, standards and vendor — that would change S3 or S4 when they land.

## 12. Conclusion

A conventional PRD tells a team what to build. An agentic system also needs its documents to say what it may decide and do, what it must never do, who answers for it, and what evidence stands behind each claim. The Agentic PRD Standard gives each of those statements one place: a short hub that alone makes claims, six spokes that supply the evidence, and a machine-readable twin that agents and CI read. It ties every requirement to a mechanism class and every boundary to a negative test; it scales ownership and depth by seven triggers without removing a section; and it treats the documents themselves as testable, through a completeness test, a reader test and a change gate. The Standard applies its own claims discipline: what it has demonstrated, what it has only specified, and what is its own contribution are recorded side by side in Appendix D.

## Acknowledgements

Research and drafting assistance from Claude (Anthropic); all decisions and claims are the author's.

## How to cite

Reed, D. (2026). *Agentic PRD Standard* (Version 3.10.2). Agentic AI Governance in Practice, Part 2. https://drdavidreed.com/papers/agentic-prd-standard/

This paper is licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

## References

1. Reed, D. [*CRISP-AG: An Artifact-Centered Framework for Enterprise Agentic AI Governance*](/papers/crisp-ag/), v3.0. Agentic AI Governance in Practice, Part 1, 2026.
2. Reed, D. [*Specification-Driven Design for Agentic Systems*](/papers/specification-driven-design/), v1.0.3. Agentic AI Governance in Practice, Part 3, 2026.
3. Reed, D. [*Enterprise Agentic AI Harness Specification*](/papers/agentic-harness-specification/), v1.3. Agentic AI Governance in Practice, Part 4, 2026.
4. Reed, D. [*Agentic Security Specification*](/papers/agentic-security-specification/), v1.0. Agentic AI Governance in Practice, Part 5, 2026.
5. Reed, D. [*Vendor Control Specification*](/papers/vendor-control-specification/), v1.0. Agentic AI Governance in Practice, Part 6, 2026.
6. Reed, D. [*Agentic Delivery Workflow*](/papers/agentic-delivery-workflow/), v1.10. Agentic AI Governance in Practice, Part 7, 2026.
7. Cagan, M. [*How To Write a Good PRD*](https://www.svpg.com/assets/Files/goodprd.pdf). Silicon Valley Product Group, 2005.
8. Cagan, M. [*Discovery vs. Documentation*](https://www.svpg.com/discovery-vs-documentation/). Silicon Valley Product Group, 25 August 2021.
9. Bryar, C., and Carr, B. [*Working Backwards PR/FAQ Instructions & Template*](https://workingbackwards.com/resources/working-backwards-pr-faq/); [*The Amazon Working Backwards PR/FAQ Process*](https://workingbackwards.com/concepts/working-backwards-pr-faq-process/). Working Backwards, 2026.
10. Anthropic. [*Demystifying evals for AI agents*](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents). Engineering blog, 9 January 2026.
11. Anthropic. [*Building effective agents*](https://www.anthropic.com/engineering/building-effective-agents). Engineering blog, 19 December 2024.
12. Anthropic. [*Quantifying infrastructure noise in agentic coding evals*](https://www.anthropic.com/engineering/infrastructure-noise). Engineering blog, 5 February 2026.
13. OpenAI. [*A practical guide to building agents*](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf). 2025.
14. Microsoft. [*What are agent identities?*](https://learn.microsoft.com/en-us/entra/agent-id/what-are-agent-identities) Microsoft Learn, Entra Agent ID documentation, 15 June 2026; [*Agent registry convergence with Microsoft Agent 365*](https://learn.microsoft.com/en-us/entra/agent-id/agent-registry-convergence). Microsoft Learn; *Agent Registry API transition to Agent 365*. Microsoft 365 Message Center MC1297981, 1 May 2026; [*Microsoft Agent 365, now generally available, expands capabilities and integrations*](https://www.microsoft.com/en-us/security/blog/2026/05/01/microsoft-agent-365-now-generally-available-expands-capabilities-and-integrations/). Microsoft Security Blog, 1 May 2026; *What's New in Agent 365: May 2026*. Microsoft Community Hub, 8 June 2026.
15. NIST. [*Artificial Intelligence Risk Management Framework (AI RMF 1.0)*](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf), NIST AI 100-1, 2023; [*Generative Artificial Intelligence Profile*](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf), NIST AI 600-1, 2024; [*Announcing the "AI Agent Standards Initiative"*](https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure), 17 February 2026.
16. ISO/IEC. [*ISO/IEC 42001:2023 — Artificial intelligence management system*](https://www.iso.org/standard/81230.html); [*ISO/IEC 42005:2025 — AI system impact assessment*](https://www.iso.org/standard/44545.html).
17. European Parliament and Council. [*Regulation (EU) 2024/1689 (Artificial Intelligence Act)*](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R1689), Article 2 (scope), Articles 6(3) and 50, Annex III; [*Regulation (EU) 2026/1744 of 8 July 2026 (Digital Omnibus on AI)*](https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng), OJ L 2026/1744, 24 July 2026, in force 27 July 2026. European Commission, [*Guidelines on transparency obligations for providers and deployers of certain AI systems*](https://digital-strategy.ec.europa.eu/en/policies/guidelines-ai-transparency-obligations), final 20 July 2026; *Code of Practice on transparency of AI-generated content*, adequacy July 2026; [*Draft Commission guidelines on the classification of high-risk AI systems*](https://digital-strategy.ec.europa.eu/en/library/draft-commission-guidelines-classification-high-risk-ai-systems), 19 May 2026 (draft; consultation closed 23 July 2026).
18. Infocomm Media Development Authority (Singapore). [*Model AI Governance Framework for Agentic AI*](https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf), v1.0, 22 January 2026; [*Updated Model AI Governance Framework for Agentic AI*](https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/updated-model-ai-governance-framework-for-agentic-ai), press release (v1.5), 20 May 2026 (unverified).
19. OWASP GenAI Security Project. [*OWASP GenAI LLM Top 10 2026*](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/), 3 August 2026 (GitHub release 4 August 2026).
20. OWASP GenAI Security Project. [*OWASP Top 10 for Agentic Applications for 2026*](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/), 9 December 2025.
21. MITRE. [*ATLAS — Adversarial Threat Landscape for Artificial-Intelligence Systems*](https://atlas.mitre.org/).
22. Feng, K. J. K., McDonald, D. W., and Zhang, A. X. [*Levels of Autonomy for AI Agents*](https://arxiv.org/abs/2506.12469). arXiv:2506.12469, 2025.
23. Kapoor, S., Stroebl, B., Siegel, Z. S., Nadgir, N., and Narayanan, A. [*AI Agents That Matter*](https://arxiv.org/abs/2407.01502). arXiv:2407.01502, 2024 (TMLR).
24. Chan, A., et al. [*Visibility into AI Agents*](https://arxiv.org/abs/2401.13138). FAccT '24; arXiv:2401.13138, 2024.
25. Linux Foundation. [*Formation of the Agentic AI Foundation (AAIF)*](https://aaif.io/), December 2025. Hosted projects: AGENTS.md, MCP, goose, agentgateway, Agent2Agent (A2A), Agent Router.
26. Fission-AI. [*OpenSpec*](https://github.com/Fission-AI/OpenSpec), v1.13.1, 17 September 2026. Documentation: overview, concepts, team workflow, releases.
27. Bui. [*Building Effective AI Coding Agents for the Terminal: Scaffolding, Harness, Context Engineering, and Lessons Learned*](https://arxiv.org/abs/2603.05344). arXiv:2603.05344, 5 March 2026; v3 13 March 2026 (unverified).
28. Yao, S., Shinn, N., Razavi, P., and Narasimhan, K. [*τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains*](https://arxiv.org/abs/2406.12045). arXiv:2406.12045, 17 June 2024. Defines pass<sup>k</sup>.
29. Rabanser, Kapoor, Kirgis, Liu, Utpala, and Narayanan. [*Towards a Science of AI Agent Reliability*](https://arxiv.org/abs/2602.16666). arXiv:2602.16666, 2026 (v3 2 June 2026).
30. Norman, Rivera, and Hughes. [*Reliability without Validity: A Systematic, Large-Scale Evaluation of LLM-as-a-Judge Models Across Agreement, Consistency, and Bias*](https://arxiv.org/abs/2606.19544). arXiv:2606.19544, 17 June 2026.
31. Rao, D., and Callison-Burch, C. [*Agreement Metrics for LLM-as-Judge Evaluation: What to Report and Why*](https://arxiv.org/abs/2606.00093). arXiv:2606.00093, 2026.
32. Gloaguen, T., Mündler-Sasahara, N., Müller, M. N., Raychev, V., and Vechev, M. [*Evaluating AGENTS.md: Are Repository-Level Context Files Helpful for Coding Agents?*](https://arxiv.org/abs/2602.11988) arXiv:2602.11988, 12 February 2026 (revised 29 September 2026, v3).
33. Linux Foundation / Agentic AI Foundation. [*Agent2Agent (A2A) Protocol Specification*](https://a2a-protocol.org/v1.0.0/specification/), v1.0.0, March 2026; *A2A joins AAIF's open agentic stack*, 17 August 2026 (unverified).
34. Weidinger, L., et al. [*Toward an Evaluation Science for Generative AI Systems*](https://arxiv.org/abs/2503.05336). arXiv:2503.05336, March 2025.
35. Anthropic. [*Harness design for long-running application development*](https://www.anthropic.com/engineering/harness-design-long-running-apps). Engineering blog, 24 March 2026.
36. Beurer-Kellner, L., et al. [*Design Patterns for Securing LLM Agents against Prompt Injections*](https://arxiv.org/abs/2506.08837). arXiv:2506.08837, 2025.
37. OpenAI. [*Why SWE-bench Verified no longer measures frontier coding capabilities*](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/). 23 February 2026.
38. Stanford HAI. [*AI Index Report 2026*](https://hai.stanford.edu/ai-index/2026-ai-index-report), chapter 2, Technical Performance. 14 April 2026.
39. Colorado General Assembly. [*SB 26-189*](https://leg.colorado.gov/bills/sb26-189), signed 14 May 2026, effective 1 January 2027; Seyfarth Shaw, *Colorado Enacts Artificial Intelligence Replacement Law*, 2026; Crowell & Moring, *Colorado Hits Reset on AI Regulation*, 2026 (secondary source).
40. California Privacy Protection Agency. [*California Finalizes Regulations to Strengthen Consumers' Privacy*](https://www.cppa.ca.gov/announcements/2025/20250923.html), 23 September 2025; White & Case, *CPPA finalizes rules on ADMT, risk assessments, and cybersecurity audits requirements under the CCPA*, 2025.
41. Illinois General Assembly. *Public Act 103-0804 (HB 3773)*, effective 1 January 2026; Texas Legislature. *HB 149 (Texas Responsible Artificial Intelligence Governance Act)*, effective 1 January 2026; summaries by Baker Hostetler, August 2024, and K&L Gates, 24 June 2025 (secondary source).
42. Infocomm Media Development Authority (Singapore). [*Discussion Paper on the Allocation of Legal Responsibility for AI Agents*](https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/agents-legal-responsibility.pdf), May 2026; Rajah & Tann Asia, [*IMDA Issues Discussion Paper on Allocation of Legal Responsibility for AI Agents*](https://www.rajahtannasia.com/viewpoints/imda-issues-discussion-paper-on-allocation-of-legal-responsibility-for-ai-agents/), 22 June 2026 (secondary source).
43. Woodruff, J. [*Agentic Trust Framework (ATF)*](https://github.com/massivescale-ai/agentic-trust-framework), open specification v0.9.1, public-review draft, 3 April 2026; originally published through the Cloud Security Alliance.

Where a secondary source (law-firm alert, research note) was used to establish a date or a summary of a standard, the primary instrument is listed above.

## Appendix A — Glossary

Terms owned by this paper are defined here. Terms owned by another paper in the series, or by an external source, are cited, not redefined; the owning document defines them.

### Terms owned by this paper

- **Accountable human** (H8) *(also: sponsor)* — The sponsor of an agent identity.
- **Action boundary** (H9) *(also: non-goals)* — A non-goal that constrains what an agent may do; the six fixed categories are PROHIBITED DAS rows unless answered yes with a source; each is traced to a negative eval task graded on the trajectory by code.
- **Adversarial boundary suite** (S2.2) — The eval suite whose purpose is to make the system violate its invariants; its injection sub-suite reports utility under attack and static and adaptive attack success rate per H9 boundary (method in SEC SEC-14).
- **Agent tier** (S1.2) — The agent's place in the pipeline: orchestration, assembly, drafting, or conversational. Not to be confused with VCS's model tier.
- **Agentic PRD** (§1) — The hub-and-spoke document set the Standard defines for an agentic system.
- **Backstop** (H10) — The deterministic mechanism paired with a prompt-only requirement.
- **Completeness test** (§8.1) — Can an engineer build from it; can the eval owner write the suite; can a compliance reviewer locate every obligation — signed by the AI Product Owner, the Eval Owner, and the AI Risk Officer.
- **Conflict handling** (S1.7 §C) — The required method when two or more sources can assert the same fact: deterministic matching, typed conflict status, no silent resolution, typed human resolution with precedent memory, audited precedence rules, provenance or abstention, verified by injected conflicts.
- **Disclosed principal** (H8) — The entity or person on whose behalf an agent acts, disclosed with the agent's AI nature at first contact and at each new interaction (EU AI Act Art. 50(1) as interpreted by the Commission Guidelines of 20 July 2026); carried by protocol on outbound communications.
- **Enforcing share** (§7) — The proportion of requirements carried by mechanisms that can refuse; reported, not gated; reported together with control state.
- **Full / Lite** (§9) *(also: form)* — The two forms of the set, selected by the proportionality triggers; they differ in ownership, versioning, approval, and depth, never presence. Vendor items marked "always" in VCS apply in both forms.
- **Hub** (§4) — The PRD proper (H0–H14); the only artifact that makes claims about the product.
- **Human of record** (H8) — The named human on a consequential output, enforced by type or protocol; for a communication to a natural person in the Union, the disclosed principal under Article 50(1); for a T6 task, a person with overturn authority.
- **Interaction level** (H10) — A requirement stated as what a user or system does and what must be true afterward, not the internal mechanism.
- **Interaction mode** (H5) *(also: Feng levels (retired as an autonomy scale))* — The Feng, McDonald & Zhang descriptors — operator, collaborator, consultant, approver, observer — used only in the H5 role-impact summary; crosswalk in CRISP-AG §5.1.4.
- **Machine-readable spec** (§6) *(also: M)* — The structured twin of the hub and S2 — specs, scenarios (GIVEN / WHEN / THEN, OpenSpec 1.13 convention), deltas, `das.yaml`, `AGENTS.md` — read by agents and CI.
- **Materially configured** (§1.2) — Configured in a way that changes an agent's tools, permissions, prompts, autonomy level, or the data it may reach; an agent configured on a service in the Approved AI Service Register is materially configured.
- **Overturn authority** (H8) — For a T6 task, the human of record can interpret the output, sees the other relevant information and has authority to change the outcome (the CPPA ADMT human-review test); the S5.6 reviewer-capacity model shows the time it takes.
- **pass@k / pass<sup>k</sup>** (S2.3) — Probability of at least one success in k trials / of success in all k trials (τ-bench, arXiv 2406.12045); pass<sup>k</sup> is one of the four reliability dimensions S2.3 reports.
- **Precedence rule** (S1.7 §C-5) — A deterministic, sourced, versioned, audited rule that resolves a class of conflicts automatically; the conflict is still recorded with the rule and the resolution shown.
- **Proportionality triggers** (§9.2) *(also: T1–T7)* — T1 autonomy at AGENT-DIRECTED or above; T2 write, outbound, money, obligation; T3 external reach; T4 regulatory position; T5 sensitive personal data at scale; T6 consequential decision about a person; T7 enterprise-critical (outputs govern other agentic systems).
- **Reader test** (§8.2) — The gate in which fresh readers — a model with no context and a human panel — answer the fifteen Appendix C questions from the document alone; it passes with zero wrong answers after one repair loop.
- **Safety property** (H3) — The single sentence every design decision must trace to.
- **Sensitive personal data; at scale** (§9.2 T5) — Special-category data under GDPR Art. 9 or an equivalent regime; at scale means above the DPO's DPIA threshold for the geography, or, absent one, any systematic processing.
- **Spec delta** (§6) — An ADDED / MODIFIED / REMOVED change to a requirement or scenario, archived by date on completion.
- **Spoke** (§5) — A separately owned artifact (S1–S6) that supplies the evidence the hub cites.
- **Standards watch** (S4.7) — The Standard's watch on external regulatory and standards change, and on vendor change — the section that names which external instruments the set tracks and cites the Vendor Change Register (VCS VC-05) as the mechanism for vendor deprecations and meter and price changes.
- **Task validity audit** (S2.1) — A second expert's check of each eval task's reference solution and tests — neither over-strict nor asserting undocumented behavior — recorded in S2.5 provenance; tasks drawn from public datasets are marked as such and assumed contaminated for model selection.

### Terms owned elsewhere and cited here

- **Adaptive injection evaluation** → Agentic Security Specification, §5 (SEC-14); §7 — cited at S2.2, S3.7
- **Agent card** → external source, A2A Protocol v1.0 AgentCard (March 2026; AAIF from 17 August 2026) — cited at S1.10
- **Agent class** → CRISP-AG, §4 — cited at H0, §9.4
- **Agent identity record** → CRISP-AG, §5.5 — cited at S3.1, S3.1a
- **AI system impact assessment** → CRISP-AG, §5.6 — cited at S4.4
- **Approval levels** → CRISP-AG, §5.1.1 — cited at H8
- **Approved AI Service Register** → Vendor Control Specification, §4 (VC-04); §5 — cited at S1.9, §1.2
- **Binding** → Specification-Driven Design for Agentic Systems, §A4 Principle 11 — cited at S1.9
- **Business-line Technology Lead** → Agentic Delivery Workflow, §4 — cited at §5.2, §8.2, §10 and Appendix C
- **Capability frontier** → CRISP-AG, §5.4 — cited at S2.10
- **Change gate** → Agentic Delivery Workflow, §8 — cited at §8.3
- **Cohen's κ** → external source, statistics — cited at S2.4
- **Consequential-decision flag** → CRISP-AG, §5.4.3 — cited at §9.2 T6, H8
- **Containment** → CRISP-AG, §5.5 (AIR field) — cited at S5.4, S3.1a
- **Control state** → Agentic Security Specification, §3 — cited at H14, S3.4, S3.7
- **CSA Agentic Trust Framework** → external source, CSA ATF open specification v0.9.1 (public-review draft, 3 April 2026) — cited at S3.1a
- **DAS position** → CRISP-AG, §5.1 — cited at H8, T1, M
- **DAS–ATF crosswalk** → CRISP-AG, §5.1.4 — cited at H5, H8, S3.1a
- **Demotion** → CRISP-AG, §5.1.3 — cited at S3.1a, S2.10
- **Eleven principles** → Specification-Driven Design for Agentic Systems, §A4 — cited at H7
- **Enforce versus guide** → Specification-Driven Design for Agentic Systems, §A2 — cited at H10, §7
- **Evidence ledger** → Enterprise Agentic AI Harness Specification, HRN-05 — cited at H14
- **Exit path** → Vendor Control Specification, §4 (VC-08) — cited at S1.8
- **Failure mode (of a mechanism)** → Specification-Driven Design for Agentic Systems, §A2 (mechanism table) — cited at H10
- **Four layers** → Specification-Driven Design for Agentic Systems, §A3 — cited at S1, S3, S4
- **Governing invariant** → Specification-Driven Design for Agentic Systems, §A3 — cited at H4
- **Harness** → Enterprise Agentic AI Harness Specification, §1.4 — cited at §5.5
- **Harness manifest** → Enterprise Agentic AI Harness Specification, §4 (HRN-09)
- **Instruction authenticity** → Agentic Security Specification, §5 (SEC-01) — cited at S3.6
- **Isolation boundary** → Agentic Security Specification, §5 (SEC-10) (control: Harness Specification HRN-11) — cited at S3.7
- **Metering unit** → Vendor Control Specification, §4 (VC-01) — cited at S5.5
- **Model tier** → Vendor Control Specification, §4 (VC-02) — cited at S1.1, S1.9, S5.5
- **OWASP ASI** → external source, OWASP Top 10 for Agentic Applications 2026 (published 9 December 2025) — cited at S3.4
- **OWASP LLM Top 10 2026** → external source, OWASP GenAI LLM Top 10 2026 (published 3 August 2026) — cited at S3.4
- **Prompt fence** → Agentic Security Specification, §5 (SEC-13) — cited at S1.6
- **Roles (eleven)** → Agentic Delivery Workflow, §4 — cited at §8.1, §9.5, §10
- **Skill** → Enterprise Agentic AI Harness Specification, §1.4, HRN-08 — cited at S6.1
- **Spend governor** → Enterprise Agentic AI Harness Specification, HRN-12 — cited at S5.5, S5.2
- **Stages W0–W7** → Agentic Delivery Workflow, §3
- **Substitution suite** → Vendor Control Specification, §4 (VC-05) — cited at S6.2
- **Tamper-evidence** → Agentic Security Specification, §5 (SEC-04) — cited at S3.5
- **Unattended run** → Enterprise Agentic AI Harness Specification, §1.4, HRN-04
- **Vendor Change Register** → Vendor Control Specification, §4 (VC-05) — cited at S4.7
- **Vendor Control Owner** → Vendor Control Specification, §6 — cited at §10
- **Vendor Service Profile** → Vendor Control Specification, §4 (VC-03); §7; Appendix A — cited at S1.9, S4.5
- **Vendor-configured agent** → Vendor Control Specification, §4 (VC-06) — cited at §1.2
- **Vendor-supplied agent** → CRISP-AG, §5.8 — cited at §1.3
- **W0 packet** → Agentic Delivery Workflow, W0 — cited at H0
- **Workflow & Workforce Impact Record** → CRISP-AG, §5.7 — cited at H5, S5.6

## Appendix B — Illustrative worked example: the Portfolio Orchestration Engine

The Portfolio Orchestration Engine (POE) is an illustrative portfolio engine for a commercial real estate occupier. It assembles a multinational occupier's portfolio state from lease abstracts and operational feeds and never crosses from assembling evidence into recommending or acting. It is written as a product specification in the form of *Specification-Driven Design for Agentic Systems* [2]. It illustrates how a set is assembled under this Standard; it is specified, not built.

### B.1 Proportionality: Full (T3, T4)

T3 and T4 fire; T1, T2, T5, T6 and T7 do not (§9.6).

### B.2 Domain counterparts

| Generic element | POE counterpart | Status |
|---|---|---|
| Data regulation | GDPR / UK GDPR; client confidentiality; SOC 1 | Adopted; not independently evidenced |
| External validation framework | EU AI Act Art. 6(3) preparatory-task position; state licensing law; RICS AI standard; USPAP AO-41 | Adopted; not independently evidenced |
| Ground-truth expert panel (analog of a clinical-review board) | Candidates: licensed account leads; a model risk / AI governance board; an external auditor; a new SME panel | Chosen per deployment |
| Authoritative knowledge corpus | LAAS released abstracts and derived critical dates; FM, transaction, project, and GL feeds | Adopted; not independently evidenced |
| Human approver | Licensed account lead (human of record) | Adopted; not independently evidenced |
| Workflow being attacked | The quarterly portfolio review | Adopted; not independently evidenced |
| Business lever | Candidates: account-team time; client retention and renewal (trust); business-line margin | Chosen per deployment |

### B.3 H3 business objective

**No business objective is defensible in the example**, so its H3 says so explicitly, as H3 requires. The candidate objectives are analyst hours per quarterly review; report cycle time; reconciliation exception volume and trend; client retention.

### B.4 Crosswalk

> **Ratings and locations.** "Exemplary" below is the author's judgment during the crosswalk, not evidence. Locations are given by chapter of POE's specification, which follows SDD's form — intent, behavioral contracts, protocol invariants, governance, traceability [2].

| Standard element | Where POE carries it | Status |
|---|---|---|
| H0 | Front matter; traceability chapter | Partial — no claims matrix, no reader-test record, no worksheet |
| H1 | Executive summary | Gap — not a customer-language PR/FAQ |
| H2 | Intent chapter | Covered — exemplary; refuses to invent a cost figure |
| H3 | Intent chapter | Partial — safety property exemplary; no defensible business objective (B.3) |
| H4 | Intent chapter (the recommendation invariant) | Covered — exemplary |
| H5 | Intent chapter | Partial — stakeholders strong; personas with goals and tasks absent |
| H6 | Intent chapter (journeys) | Covered — negative journeys present |
| H7 | SDD's principles (§A4) | By reference |
| H8 | A hard constraint and a scope invariant | Partial — human of record present; DAS positions and per-agent sponsor not stated |
| H9 | Intent and governance chapters (the action invariant) | Covered — exemplary |
| H10 | Traceability chapter (requirement IDs with mechanism class) | Partial — no must-have, high-want or nice-to-have class or rank |
| H11 | Intent chapter (success criteria; soft constraints) | Partial — release criteria beyond performance absent |
| H12 | Intent chapter | Partial — no open-questions log |
| H13 | — | Gap |
| H14 | Traceability chapter | Partial — enforcing share present; claims matrix absent |
| S1 | Contracts, protocol and sixth chapters; SDD's Part C playbook | Covered |
| S2 | Governance and contracts chapters | Partial — capability and regression split, pass<sup>k</sup>, cost per task, holdout not stated |
| S3 | Protocol, governance and intent chapters | Partial — service principal per agent (pre-Agent-ID); threat model not OWASP-labeled |
| S4 | Intent and governance chapters; references | Partial — no per-geography table; no ISO 42005; no IMDA self-check; no standards-watch note |
| S5 | Governance chapter (drift response) | Covered |
| S6 | Governance chapter; requirements file | Partial — no spec-delta and archive process |
| M | Requirements file; protocol chapter (message schemas) | Partial — no scenario and delta convention |

Each Gap or Partial row shows what a pre-Standard specification must add.

## Appendix C — Reader-test protocol and question set

**Protocol.** Give the hub and spokes — nothing else — to (a) a fresh model instance with no prior context and (b) a human reader from each role. Ask the questions below in role. Record the answer, whether anything was ambiguous, and what knowledge the document assumed. Every wrong or uncertain answer is a defect in the document.

**As a Business-line Technology Lead.** Questions 1 to 5:

1. What does this product do, in one sentence, and what does it never do?
2. What is the measurable objective of this release, and how will we know it was met?
3. Who is accountable when the system produces a wrong output that reaches a client?
4. What would make us stop it, and who can?
5. What is it costing us per unit of work?

**As an architect.** Questions 6 to 10:

6. At what autonomy level does each task type run, and what enforces that?
7. Which requirements are enforced by mechanisms that can refuse, and which depend on a prompt?
8. What tools does each agent hold, and which tools are deliberately absent?
9. What happens when two sources disagree, or an input is stale?
10. How is a change to a prompt, model, or threshold approved and rolled back?

**As a compliance reviewer.** Questions 11 to 15:

11. In which jurisdictions does this run or is its output used, and what applies in each?
12. What is its EU AI Act position, and what evidence keeps it there?
13. Where is personal data minimized, and where is residency enforced?
14. Which threats are mitigated, and how is each mapped to a control ID?
15. Which claims in the document are marked defensible, and where is the evidence for each?

**When the document under test is the Standard itself.** Each question is asked as "where must a conforming set answer this?", and the test passes when every question has an unambiguous home:

| Q | Home in a conforming set |
|---|---|
| 1 | H3 purpose; H9 boundaries |
| 2 | H3 objectives; H11 criteria |
| 3 | H8 accountable human and human of record; S3.1 sponsor; H8 disclosed principal and overturn authority |
| 4 | S5.2 controls; S5.3 triggers; S2.8 drift; S5.4 runbook |
| 5 | S5.5; S2.6; S5.5 budget, cap and enforcing layer |
| 6 | H8 DAS positions; H10 mechanism class; S5.2 switch |
| 7 | H10 classes; H14 enforcing share |
| 8 | S1.4 |
| 9 | S1.7 staleness and conflict handling; S1.5 precedence |
| 10 | §8.3; S6.2; S6.3; S5.2, S5.4 |
| 11 | S4.2 |
| 12 | S4.2 classification; T4; S4.2 Art. 6(3) documentation; S4.7 watch |
| 13 | S4.5; S3.3; S4.4; H9 personal-data row; T5; S4.5 VSP data-protection block by reference |
| 14 | S3.4 (threat → control ID → state); S3.7 (control-state table; isolation boundary; adversarial evidence); S1.5 (poisoning controls) |
| 15 | H14; §8.4 |

**Additional checks (model reader only).** The model reader is also asked:

- What in this document is ambiguous?
- What does it assume the reader already knows?
- Are there internal contradictions?

## Appendix D — Claims this Standard makes about itself

The Standard applies its own claims discipline (§8.4) to itself.

| Claim | Defensible? | Evidence |
|---|---|---|
| Forty research-backed amendments were applied | Reported, not evidenced here | Evidence not published; the cited sources are in the References (§1.7) |
| EU AI Act dates in S4.2: Regulation (EU) 2026/1744 in force 27 July 2026; Article 50 from 2 August 2026; Art. 50(2) grace to 2 December 2026; Annex III from 2 December 2027; Annex I from 2 August 2028; the Art. 111(2) legacy rule | Yes | EUR-Lex text of Regulation (EU) 2026/1744; Commission Guidelines page [17]; the Code of Practice adequacy date is unverified (§11.2) |
| The control-state vocabulary (*specified* / *implemented* / *demonstrated* / *retired*) used in H14, S3.4 and S3.7 is SEC's; this Standard uses it and does not define it | Yes | SEC §3 [4]; the series glossary names SEC as owner. Its mapping to external audit vocabularies is SEC's to verify (unverified) |
| Vendor facts in S1.9, S4.5, S5.5 are cited from VCS and not restated | Yes | VCS §4, VC-01 to VC-09 [5]; the series glossary; §3.1 rule 3 |
| Three terms are this Standard's own: disclosed principal, overturn authority, task validity audit | Yes — the constructs are drawn from Art. 50(1), the CPPA ADMT test and OpenAI's SWE-bench Verified post; the names and their placement in H8 and S2.1 are this Standard's | The series glossary (owner: this Standard); Appendix A |
| The worked examples conform to the Standard — POE (Appendix B) and the assembling agent (Workflow §9) | Specified, not demonstrated | Both sets are specified at Full form; showing conformance needs each to pass its own reader test and to carry the vendor and security items of the current version |
| Hub-and-spoke form scales better than a consolidated document | Reasoned, not demonstrated | Evidence not published; no measurement yet |
| This is a state-of-the-art definition of an agentic PRD | Not claimed | The Standard claims conformance to the cited practice as of September 2026, not superiority |
| “Exemplary” ratings in Appendix B.4 | Author's judgment | Not evidence |
| The reader test was run on the Standard | Reported, not evidenced here — on an earlier version, model half only; human-panel half not reported in this version; not yet re-run on the current version | Evidence not published; defects found were repaired in the next version |
| Each glossary term has one owning document in the series | Yes | Appendix A defines the terms this paper owns and cites the owner of every other term |
| T7, the enterprise-critical trigger, reflects cited practice | **No — it is this Standard's own contribution** | No external source supplies a trigger for reach over time; the rationale is in §9.2 |

<nav class="series-pager" aria-label="Series navigation"><a href="/papers/crisp-ag/">← Part 1: CRISP-AG</a><a href="/papers/">All papers in the series</a><a href="/papers/specification-driven-design/">Part 3: Specification-Driven Design →</a></nav>
