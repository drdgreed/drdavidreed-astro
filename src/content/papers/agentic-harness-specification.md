---
title: "Enterprise Agentic AI Harness Specification"
subtitle: "Twelve mandatory out-of-model controls and five lifecycle gates for enterprise AI agents, across the major agent stacks"
series: "Agentic AI Governance in Practice"
seriesPart: 4
code: "HS"
version: "1.3"
date: "2026-10"
author: "David Reed, PhD"
description: "Twelve mandatory harness controls (HRN-01 to HRN-12) and five lifecycle gates that keep enterprise AI agents inside out-of-model enforcement, with a Claude Code reference implementation, cross-stack equivalents, and a map to NIST, ISO/IEC 42001, the EU AI Act, OWASP and MITRE ATLAS."
keywords: ["agentic AI", "AI governance", "agent harness", "harness engineering", "Claude Code", "runtime controls", "lifecycle gates", "EU AI Act", "NIST AI RMF", "ISO/IEC 42001", "OWASP Agentic Top 10", "MITRE ATLAS"]
readTime: 75
---

# Enterprise Agentic AI Harness Specification

<p class="paper-dek">Twelve mandatory out-of-model controls and five lifecycle gates for enterprise AI agents, across the major agent stacks</p>

<p class="paper-meta"><strong>Version 1.3</strong> · October 2026 · David Reed, PhD</p>

<nav class="series-nav" aria-label="Series"><p><strong>Agentic AI Governance in Practice</strong> — Part&nbsp;4&nbsp;of&nbsp;7</p><ol><li><a href="/papers/crisp-ag/">CRISP-AG</a></li><li><a href="/papers/agentic-prd-standard/">Agentic PRD Standard</a></li><li><a href="/papers/specification-driven-design/">Specification-Driven Design</a></li><li><span class="current" aria-current="page">Harness Specification</span></li><li><a href="/papers/agentic-security-specification/">Security Specification</a></li><li><a href="/papers/vendor-control-specification/">Vendor Control Specification</a></li><li><a href="/papers/agentic-delivery-workflow/">Agentic Delivery Workflow</a></li></ol></nav>

## Abstract

An AI agent that plans, calls tools and acts on behalf of people cannot be governed by its instructions alone. The controls that bound what it may do, record what it did and test what it claims must run outside the model, in a harness. This paper specifies that harness for the enterprise. It prescribes twelve mandatory controls, HRN-01 to HRN-12: a deny-ask-allow permission model, a session preflight, an argument-level pre-tool guard, enforced unattended-run limits, a turn-end claim auditor, tamper-evident ledgers, OpenTelemetry-first observability, versioned skills, one-way harness distribution, trace correlation, an OS-level isolation boundary and a spend governor. Each control has a normative rule, a reference implementation on Claude Code, and its equivalent — or a recorded coverage gap — on the OpenAI, Google, Microsoft and Databricks stacks.

Five lifecycle gates, from intent and risk classification to continuous monitoring, ensure that no agent reaches or remains in production without them. The specification adds twelve metrics with service-level objectives, further obligations for agents that are high-risk under the EU AI Act, and the vendor posture each control assumes. It maps every control to the NIST AI RMF, ISO/IEC 42001, the EU AI Act, the OWASP LLM and Agentic Top 10 lists and MITRE ATLAS. An illustrative commercial real estate overlay shows how an industry’s data changes the defaults.

**Keywords:** agentic AI; AI governance; agent harness; harness engineering; Claude Code; runtime controls; lifecycle gates; EU AI Act; NIST AI RMF; ISO/IEC 42001; OWASP Agentic Top 10; MITRE ATLAS

## Key contributions

- **Twelve controls, enforced outside the model.** Each HRN control has a normative rule, a vendor-neutral pattern, a Claude Code reference implementation, and the equivalent — or a recorded coverage gap — on the OpenAI, Google, Microsoft and Databricks stacks.
- **Five gates no agent may skip.** Gates 0–4 run from intent and risk classification to continuous monitoring. Agent class and Full or Lite form adjust the depth of a gate, never its presence, and a control’s state moves from *specified* to *implemented* to *demonstrated* only at the gate that requires it.
- **Enforcement in layers, with failure modes stated.** The specification records how each mechanism fails — a hook that times out, a path rule an interpreter bypasses, a sandbox that covers only shell commands — and requires a second layer wherever the first fails open.
- **Spend as a safety control.** HRN-12 sets a hard, reconciled spend ceiling per run and per month. An action that consumes metered vendor capacity cannot hold an AGENT-DIRECTED position on an alert-only budget.
- **One control set, many frameworks.** Every control is mapped to the NIST AI RMF and its Generative AI Profile, ISO/IEC 42001, the EU AI Act, the OWASP LLM Top 10 2026 and Agentic Top 10, MITRE ATLAS, and the current agentic frameworks.
- **Evidence by construction.** Ledgers, trace correlation and the claim auditor tie every completion claim to the run that produced it.

<!-- toc -->
## Contents

- [1. Introduction](#1-introduction)
- [2. Governance and roles (NIST AI RMF GOVERN)](#2-governance-and-roles-nist-ai-rmf-govern)
- [3. Lifecycle gates (NIST MAP and MEASURE)](#3-lifecycle-gates-nist-map-and-measure)
- [4. The twelve mandatory harness controls](#4-the-twelve-mandatory-harness-controls)
  - [HRN-01 — Deny-Ask-Allow permission model, enforced outside the model](#hrn-01--deny-ask-allow-permission-model-enforced-outside-the-model)
  - [HRN-02 — Session preflight](#hrn-02--session-preflight)
  - [HRN-03 — Pre-tool-use guard on every action](#hrn-03--pre-tool-use-guard-on-every-action)
  - [HRN-04 — Unattended-run limits, enforced](#hrn-04--unattended-run-limits-enforced)
  - [HRN-05 — Claim auditor at turn-end](#hrn-05--claim-auditor-at-turn-end)
  - [HRN-06 — Immutable ledgers of what happened](#hrn-06--immutable-ledgers-of-what-happened)
  - [HRN-07 — OpenTelemetry-first observability](#hrn-07--opentelemetry-first-observability)
  - [HRN-08 — Skills as versioned, testable capability modules](#hrn-08--skills-as-versioned-testable-capability-modules)
  - [HRN-09 — Curated, one-way harness distribution](#hrn-09--curated-one-way-harness-distribution)
  - [HRN-10 — Trace correlation and evidence for every claim](#hrn-10--trace-correlation-and-evidence-for-every-claim)
  - [HRN-11 — OS-level isolation boundary for every agent runtime](#hrn-11--os-level-isolation-boundary-for-every-agent-runtime)
  - [HRN-12 — Spend and consumption governor, enforced outside the model](#hrn-12--spend-and-consumption-governor-enforced-outside-the-model)
- [5. Observability, metrics, and SLOs](#5-observability-metrics-and-slos)
- [6. Threat model and cross-framework control map](#6-threat-model-and-cross-framework-control-map)
- [7. Additional obligations for high-risk agents](#7-additional-obligations-for-high-risk-agents)
- [8. Industry overlay: commercial real estate (illustrative)](#8-industry-overlay-commercial-real-estate-illustrative)
- [9. Vendor posture and the Approved AI Service Register](#9-vendor-posture-and-the-approved-ai-service-register)
- [10. Adoption roadmap](#10-adoption-roadmap)
- [11. Change control](#11-change-control)
- [12. Discussion and limitations](#12-discussion-and-limitations)
- [13. Conclusion](#13-conclusion)
- [Acknowledgements](#acknowledgements)
- [How to cite](#how-to-cite)
- [References](#references)
- [Appendix A — Prescribed hooks inventory (reference implementation)](#appendix-a--prescribed-hooks-inventory-reference-implementation)
- [Appendix B — Prescribed ledgers](#appendix-b--prescribed-ledgers)
- [Appendix C — Glossary](#appendix-c--glossary)
<!-- /toc -->

## 1. Introduction

### 1.1 The problem

Every AI agent an organization deploys — whether built on Anthropic Claude, OpenAI, Google Gemini, or Microsoft Foundry — must run inside a **harness**: an out-of-model enforcement layer that constrains what the agent can do, records what it did, and proves it did what it claims. Anthropic states this directly: “Permission rules are enforced by Claude Code, not by the model” [8]. Anthropic also states that the auto-mode classifier “is a per-action control, not an isolation boundary” [44] — which is why this specification separates the permission model (HRN-01) from the isolation boundary (HRN-11) and the spend governor (HRN-12). Microsoft frames the same problem for **Microsoft Foundry Agent Service**: without “visibility, policy enforcement, and orchestration,” models can “drift, be incorrect, and lack accountability” [9]. OWASP ranks **Excessive Agency** (LLM03:2026, up from sixth in 2025) and **Prompt Injection** (LLM01:2026) among the top ten risks of LLM applications [10]. NIST’s voluntary AI Risk Management Framework organizes risk management into four durable functions — GOVERN, MAP, MEASURE, MANAGE — with GOVERN “infused throughout AI risk management” [11].

### 1.2 What this specification prescribes

This specification prescribes twelve controls that satisfy those requirements simultaneously across the major agent stacks, then maps them to the NIST AI RMF and its Generative AI Profile, ISO/IEC 42001, the EU AI Act, the OWASP LLM Top 10 (2026), and MITRE ATLAS. An illustrative commercial real estate overlay in §8 adjusts for tenant PII, valuation comparables, physical building-access data, and cross-border data flows across the many jurisdictions a multinational operates in.

Around the controls (§4), the specification sets the roles that own them (§2), five lifecycle gates that every agent passes (§3), twelve metrics with service-level objectives (§5), additional obligations for high-risk agents (§7), and the vendor posture that each control’s equivalents assume (§9).

### 1.3 Scope

The specification applies to any large multinational enterprise that builds or buys agentic systems, in every jurisdiction where the enterprise operates. It covers all agentic AI systems that plan, call tools, and act on behalf of employees, clients, or automated workflows — including internal productivity agents, customer-facing agents, and agents that participate in decisions that qualify as **high-risk** under the EU AI Act (Regulation (EU) 2024/1689) Annex III [12]. The AI Governance Board (AIGB) owns the specification (§2).

### 1.4 Definitions

- **Agent.** A system that “plan[s], call[s] tools, collaborate[s] across specialists, and keep[s] enough state to complete multi-step work” [13]. The term includes single-agent tool users and multi-agent orchestrations (manager-worker, evaluator-optimizer, graph) as defined in Anthropic’s *Building Effective Agents* [14] and OpenAI’s *A Practical Guide to Building Agents* [15].
- **Harness.** The out-of-model enforcement, telemetry, and audit layer surrounding an agent — hooks, permission rules, guards, evaluators, ledgers, the **isolation boundary** and the **spend governor**. It is analogous to Anthropic’s Claude Code hooks, permissions and sandbox [16], OpenAI Agents SDK Guardrails and the Codex sandbox [17], Google ADK Plugins on Agent Engine [18], and Microsoft Foundry Agent Service with Microsoft Agent Framework middleware [9]. Semantic Kernel and AutoGen are legacy.
- **Skill.** A “reusable, filesystem-based resource that gives Claude domain-specific expertise,” loaded on demand through progressive disclosure [19]. The vendor-neutral equivalent is a versioned, testable capability module with metadata, instructions, and executable assets. Skills and the MCP servers they call are register entries (VCS VC-04).
- **Unattended run.** Any agent invocation without an interactive human reviewer in the loop for each tool call, including cron jobs, CI runners, background subagents, and long-running orchestrations. It runs under `dontAsk` with an explicit allowed-tool list inside an isolation boundary (HRN-11).
- **High-risk agent.** An agent whose use case falls under EU AI Act Annex III (biometrics; critical infrastructure; education and vocational training; employment and worker management; access to essential services; law enforcement; migration/border; administration of justice and democratic processes) [12, Annex III].
- **Vendor-configured agent.** As defined in the Vendor Control Specification §4 (VC-06); this specification cites the term and does not redefine it. CRISP-AG §5.8 owns the distinct term *vendor-supplied agent*.

### 1.5 Place in the series

This is Part 4 of *Agentic AI Governance in Practice*. The Harness Specification owns controls and runtime: the twelve HRN controls and lifecycle Gates 0–4. It cites, and does not restate, the following:

- the governance concepts of CRISP-AG [1] — delegation authority scope (DAS) positions, agent class, and the agent identity and registry record (AIR);
- the document set defined by the Agentic PRD Standard [2] — hub sections H0–H14 and spokes S1–S6;
- the specification form of Specification-Driven Design [3];
- the runtime and record security controls of the Agentic Security Specification [4] — SEC-01 to SEC-23 and the Managed Runner Baseline;
- the terms of vendor use in the Vendor Control Specification [5] — the Approved AI Service Register, the Vendor Service Profiles and the phased rollout of vendor controls;
- the stage sequence of the Agentic Delivery Workflow [6], which binds them.

Citations use each paper’s code and section: CRISP-AG §5.1, STD H8, SDD A7, SEC §5 (SEC-10), VCS §4 (VC-04), Workflow W0.

**Reference implementation.** The author’s Claude Code harness, described in *The Production Harness* [7], is the reference implementation. The patterns in this specification are prescribed as the enterprise baseline; deviations require a written exception approved by the AI Governance Board (§2.1).

### 1.6 How to read this paper

Section 2 sets out governance and roles, and §3 the five lifecycle gates. Section 4 is the core: the twelve mandatory controls, each with its rule, its rationale, its Claude Code reference implementation and its equivalents on the other stacks. Section 5 defines the metrics and SLOs. Section 6 maps the controls to the OWASP, NIST, EU AI Act, MITRE ATLAS, ISO/IEC 42001 and agentic-framework catalogs, and serves as this paper’s survey of the standards landscape and related work. Section 7 adds the obligations for high-risk agents, §8 an illustrative commercial real estate overlay, §9 the vendor posture each control assumes, and §10 and §11 the adoption roadmap and change control. Section 12 discusses limitations and what remains unverified. Appendices A to C list the prescribed hooks, the prescribed ledgers and the glossary.

## 2. Governance and roles (NIST AI RMF GOVERN)

The AI Governance Board (AIGB) owns this specification. According to NIST, GOVERN “cultivates and implements a culture of risk management” and “is a cross-cutting function that is infused throughout AI risk management” [11]. The organization shall operate an AI Management System (AIMS) that meets ISO/IEC 42001:2023 — which ISO describes as the world’s first AI management system standard, built around a Plan-Do-Check-Act process [20].

Required roles:

- **AI Product Owner** — owns each agent’s intended-use statement (NIST MAP).
- **AI Risk Officer** — signs off on risk classification, EU AI Act tier, and Annex III determinations.
- **Harness Engineer** — implements and maintains hooks, guards, and evaluators.
- **Legal** — is consulted on every delegation-authority classification at Gate 0; approves PROHIBITED and HUMAN-ONLY rows that rest on regulatory or contractual exposure (CRISP-AG §5.1.1; Workflow §4).
- **AI Security Reviewer** — applies the OWASP LLM Top 10 2026, the OWASP Top 10 for Agentic Applications 2026 ([10], [60]; mapping in §6.1) and MITRE ATLAS [21] threat models before launch.
- **Data Protection Officer** — signs off on the DPIA and TIA for personal-data flows (GDPR/UK GDPR, CCPA/CPRA, PIPEDA, LGPD, PDPA — selected for the many jurisdictions a multinational operates in).
- **Business Line Owner** — is accountable for the business outcomes of the line the agent serves.
- **Architect** — owns the orchestration pattern and the architecture record reviewed at Gate 1 (Workflow §4).
- **Eval Owner** — owns the task and adversarial eval suites and their thresholds at Gate 3 (Workflow §4).
- **Vendor Control Owner** — owns the Approved AI Service Register, the Vendor Service Profiles and the Vendor Change Register per VCS §4 (VC-03, VC-04, VC-05) and VCS §6; partners with Legal on the contract clause checklist (VCS VC-09) and with Finance on budgets and showback (HRN-12). The role sits in the Procurement or third-party risk function and is accountable for the vendor gate checks of §3.1 and §3.2.

The Agentic Delivery Workflow’s §4 and Appendix A carry the authoritative RACI for these roles and the AIGB — eleven in all. The Business-line Technology Lead, a business line’s technology leader, is distinct from the Business Line Owner.

Every production agent has a named human in each role. The RACI is captured in the product’s hub **H0** (Agentic PRD Standard) and the registry record (CRISP-AG §5.5 AIR); the model card is a rendering of these records, not a separate source (Workflow conflict 9).

### 2.1 Exceptions and waivers

Any deviation from this specification — relaxing a control, skipping a gate deliverable, or shipping an agent outside the twelve HRN controls — requires a written exception approved by the AIGB. Every exception SHALL carry, on the face of the approval record: (a) the specific clause being waived, (b) the business justification, (c) a named accountable owner, (d) a fixed expiry date not more than 90 days out (renewable only by re-approval), and (e) the compensating controls in force during the waiver. Exceptions are logged to the HRN-06 immutable ledger and surface in the AIGB’s quarterly review. An exception whose expiry date passes without renewal is a violation of this specification, and the agent SHALL be taken out of production. Verbal or informal exceptions have no force under this specification.

## 3. Lifecycle gates (NIST MAP and MEASURE)

Each agent passes through five gates. A gate cannot be skipped; a failed gate is a stop, not a warning. **No agent may deploy to production, and no already-deployed agent may remain in production, without passing all five gates.** A gate failure blocks launch; a gate failure discovered after launch triggers immediate rollback pending remediation. The AIGB is the single approver for any exception (§2.1).

**Class and form never remove a gate.** CRISP-AG §6.2 compresses phase work by agent class and lets a Class 1 agent run with no CRISP-AG phase gates; sequence belongs to the implementation (CRISP-AG §10.1), and under this specification every class passes all five gates. The Agentic PRD Standard’s Full / Lite rule (STD §9) adjusts ownership, versioning, approval and depth at each gate, never its presence.

### 3.1 Gate 0 — Intent and risk classification (MAP)

Deliverables:

- **Intended-use statement**, following Microsoft’s Responsible AI Standard v2 Goal A3 (Fit for Purpose) [22].
- **EU AI Act tier determination** using the four-tier framework (unacceptable, high-risk, limited, minimal) and the Annex III checklist [23].
- **NIST GAI risk applicability review** against the twelve GAI risks defined in NIST AI 600-1 — CBRN, Confabulation, Dangerous/Violent/Hateful Content, Data Privacy, Environmental, Human-AI Configuration, Information Integrity, Information Security, Intellectual Property, Obscene/Degrading, Value Chain and Component Integration, Harmful Bias and Homogenization [24].
- **Impact Assessment (Microsoft RAI Goal A1)** for any consequential agent [22].

These deliverables are submitted as one bundle, the **W0 packet** (Agentic Delivery Workflow, stage W0). Alongside them, the packet carries the proportionality worksheet, the DAS draft, the Eval Owner assignment, the conflict-handling declaration, the registry pre-entry, a current Vendor Service Profile reference for every vendor dependency (VCS §4, VC-03), the Approved AI Service Register row for each dependency (VCS §4, VC-04), the decision log, the exception log, and the scored exit checklist. A dependency with no register row, or with a row whose posture is “prohibited” for the intended use, fails Gate 0. Gate 0 is closed on the packet, not on the four deliverables alone.

The packet declares the **control state** of every HRN control: *specified*, *implemented* or *demonstrated* (optionally *retired*), per SEC §3. Gate 0 accepts *specified* only, Gate 2 requires *implemented*, and Gate 3 requires *demonstrated* with a run ID (STD H14, S3.7; SDD B5).

**Cost fields at Gate 0.** For every product entering W0 from VCS Phase 2, the DAS draft names the Finance or Procurement approver — the Vendor Control Owner where no Finance or Procurement function exists — for every position whose actions consume metered vendor capacity (CRISP-AG §5.1.1). The registry pre-entry carries the AIR *Cost and tier* field for every class (CRISP-AG §5.5; STD S5.5, an item present in both Full and Lite per STD §9.1). **A pre-entry with no budget ceiling, cap owner or named enforcing layer fails Gate 0.** Agents already in production are retrofitted in VCS Phase 3 (VCS §8.4).

Agents classified as **high-risk** trigger the §7 obligations.

### 3.2 Gate 1 — Architecture review

Start with the simplest pattern that solves the problem. Anthropic’s *Building Effective Agents* explicitly recommends “finding the simplest solution possible, and only increasing complexity when needed,” warning that frameworks “often create extra layers of abstraction that can obscure the underlying prompts and responses, making them harder to debug” [14]. OpenAI’s practical guide recommends maximizing a single agent with tools before orchestrating multiple agents [15].

Patterns are approved in this order of preference: augmented single agent → prompt chaining → routing → parallelization → orchestrator-workers → evaluator-optimizer [14]. Multi-agent graphs and the manager pattern are permitted when a single agent has been demonstrated to be insufficient. Any document set whose S1.1 (Agentic PRD Standard §5.1) lacks the Orchestration content is rejected at this gate (Workflow exit check W2-1). That content comprises the pattern chosen from the order above; the justification for anything beyond a single agent; the verification approach; the model and effort choice, stated as the smallest model tier that passes the S2 suite, together with the escalation rule; and the justification for any premium-tier default (VCS §4, VC-02). The check mirrors the pattern preflight that the reference harness runs before cycle 1 of any unattended workflow.

### 3.3 Gate 2 — Harness implementation review

The twelve mandatory controls in §4 are checked in place. Missing controls block deployment.

### 3.4 Gate 3 — Evaluation and red team (MEASURE)

- **Task evals** — the agent is measured on the tasks it will do in production. OpenAI defines evals as tests of “model outputs to ensure they meet style and content criteria that you specify,” calling them “an essential component to building reliable applications” [25]. Anthropic provides a Console Evaluation tool with variable-driven test sets [26]. The Gemini Enterprise Agent Platform’s Agent Engine provides an Evaluation Service and Example Store for continuous quality evaluation [27].
- **Adversarial evals** — the OWASP LLM Top 10 2026 (LLM01 Prompt Injection, LLM02 Sensitive Information Disclosure, LLM03 Excessive Agency, LLM06 Unbounded Consumption, LLM07 Misinformation, LLM08 Hidden Context Exposure, LLM10 Improper Output Handling) and the Top 10 for Agentic Applications 2026 (ASI01–ASI10), each mapped to the controls of §6.1 [10], [60].
- **Boundary tasks graded by code** — every H9 *no*, every DAS row and every declared property has a negative task graded on the trajectory by code — tools called, arguments passed, positions respected, approvals obtained — and never by an LLM judge (STD S2.4). Where an LLM judge gates any release decision, S2 is promoted to a separately owned artifact (STD §9.3) and the judge is validated per SDD A7. Evidence is a run of the product’s own suite on the product’s own binding (STD §8.4; SDD Principle 11); a vendor’s evaluation result is context, not evidence.
- **HitL-bypass chains** — scripted sequences that attempt to reach a HUMAN-ONLY or HITL-REQUIRED action without the human of record (ASI09), including Stop-hook exhaustion (HRN-05), classifier-pause exploitation (HRN-03) and `excludedCommands` widening (HRN-11).
- **Adaptive injection evaluation** — per SEC §5 (SEC-14), a static five-family corpus plus an automated adaptive attacker, reporting static ASR, adaptive ASR and utility for defended and undefended configurations; a control that holds only against the static corpus is recorded as *implemented*, not *demonstrated*.
- **ATLAS-mapped red team** — the agentic techniques of ATLAS data v2026.06 and the case studies of §6.4, replayed against the agent’s boundary (HRN-11) and guard (HRN-03) [21].
- **High-risk agents** — documented adversarial testing per the EU AI Act GPAI systemic-risk obligations (Art. 55) is applied as internal best practice regardless of whether the organization is itself a GPAI provider [12].

### 3.5 Gate 4 — Deployment and continuous monitoring (MANAGE)

According to NIST, MANAGE “entails allocating risk resources to mapped and measured risks on a regular basis” and includes “plans to respond to, recover from, and communicate about incidents or events” [11]. Deployment requires a canary rollout, an incident runbook, an on-call rotation, quarterly re-evaluation, and the §5 observability stack live before the first production traffic.

## 4. The twelve mandatory harness controls

The controls are prescriptive. Each has a control ID (HRN-01 to HRN-12), a normative rule, a vendor-neutral pattern, a concrete reference implementation in the author’s Claude Code harness [7], and the equivalent in the OpenAI, Google, Microsoft (Foundry; Copilot Studio; Microsoft 365 Copilot) and Databricks stacks. Where a stack offers no enforcing equivalent, the paragraph for that stack says so, and the coverage is recorded on the VCS Appendix B scale — Full, Substantial, Partial, Alert-only or None — in the Approved AI Service Register (VCS §4, VC-04).

For agents the organization configures inside a vendor product — Copilot Studio, Microsoft 365 Copilot, Agent Bricks — the per-control equivalent is the **configured-agent profile** per VCS §4 (VC-06), held in VCS Appendix B (one column per platform; two for Microsoft). Where the profile records no enforcing equivalent for a control, the DAS ceiling that results (CRISP-AG §5.8) is recorded in the Approved AI Service Register row and enforced at Gate 0. The profiles are marked “proposed” until the organization’s platform engineers verify them, and they become normative at VCS Phase 2. For Lite-form agents built in Copilot Studio, the profile is operationalized by a platform-specific profile of this specification, whose maker and administrator requirements are cited, not restated, here. A Lite-form product holds no position above HITL-REQUIRED (STD §9.2, T1), so the effective ceiling for such an agent is the lower of HITL-REQUIRED and the profile’s ceiling.

### `HRN-01` — Deny-Ask-Allow permission model, enforced outside the model

**Rule.** Every tool the agent can invoke — shell command, file write, HTTP call, MCP tool, connector — is governed by explicit rules evaluated in the order **deny → ask → allow**, with the first match winning. The rule engine is code, not prompt guidance.

**Injection-exposure default.** The capability declaration in the agent’s AIR (CRISP-AG §5.5) records whether the agent holds (a) non-public data, (b) exposure to content the organization does not control, and (c) a channel that communicates outside the organization. An action in a session holding all three is positioned at HITL-REQUIRED or higher and enforced as an *ask* rule under this control, unless the architecture removes one of the three (CRISP-AG §5.1). Prompt fencing and isolation (SEC-13, SEC-10; HRN-11) reduce (b) and (c) but do not remove them for the purposes of this rule.

**Why.** Anthropic states plainly that Claude Code permissions “are enforced by Claude Code, not by the model,” that they are evaluated in the deny → ask → allow order, and that rules cannot be relaxed by prompt or `CLAUDE.md` content [8]. The control addresses OWASP LLM03:2026 Excessive Agency [10] and MITRE ATLAS abuse-of-tool techniques [21]. Two vendor-native circuit breakers are inherited and cannot be overridden by an allow rule or a hook. **Protected paths** (`.git`, `.claude`, `.mcp.json`, shell rc files, `.pre-commit-config.yaml` and similar) are never auto-approved except in `bypassPermissions`: they are denied in `dontAsk` and routed to the classifier in `auto`. For **critical paths**, no `permissions.allow` rule and no `PreToolUse` hook returning `"allow"` can approve an `rm` or `rmdir` that targets one. Deny rules block in every mode, including `bypassPermissions`.

**Reference implementation.** `settings.json` in the reference harness enumerates allowed shell binaries (`Bash(npm:*)`, `Bash(git:*)`, `Bash(python:*)`, …), denies reads of `./.env`, `./secrets/**`, `~/.ssh/**`, `~/.aws/**` and `~/.claude/.credentials.json` with `Read(path)` rules, denies ledger edits with `Edit(path)` rules (HRN-06), and puts `rm -rf`, `git push --force` and `dropdb` behind an *ask* rule.

**Reach of path rules.** Claude Code checks file permissions against `Edit(path)` and `Read(path)` rules only; a rule written for `Write`, `NotebookEdit`, `Glob` or the legacy `MultiEdit` is accepted but never consulted (a startup warning is shown). A `Read` deny also blocks `Edit` and `Write` on the same path. `Read` and `Edit` deny rules bind the built-in file tools, the file commands Claude Code recognizes in Bash (`cat`, `head`, `tail`, `sed`, `tee`) and the targets of Bash redirections. They do **not** bind a command that reads without naming a path (`grep -r pattern .`) or an interpreter, script or program that opens files itself. Wherever `Bash(python:*)` or any interpreter is allowed, a path deny is therefore a hygiene control, not an isolation control; isolation is the role of HRN-11.

**Bash rule forms.** `Bash(prefix:*)` is the supported wildcard; `Bash(command:...)` forms are ignored because a compound command would bypass them; the wrappers `timeout`, `time`, `nice`, `nohup` and `stdbuf` are stripped before matching; a deny on `rm *` does not match `/bin/rm`.

**Lock keys.** Enterprise deployments ship the rule set from a **managed source** — server-managed settings, MDM or OS policy, `managed-settings.json` (with `managed-settings.d/*.json`) or the HKCU key, in that order of precedence — and set `permissions.disableBypassPermissionsMode` and `disableAutoMode` to the string `"disable"` [28]. Both keys are accepted from any settings file; only delivery from a managed source makes them non-overridable (lock semantics: the strictest value any source sets applies). `allowManagedPermissionRulesOnly: true` (managed-only) makes managed settings the only source of permission rules, so no user or project file can add an allow rule (HRN-09 specifies the full managed payload). The Harness Engineer confirms the effective key spelling of `disableAutoMode` on the pinned Claude Code version with `claude doctor` and records it in the HRN-09 manifest.

**OpenAI equivalent.** Agents SDK tool guardrails (per-tool, before and after execution) and the Codex sandbox mode and approval policy, pinned by `requirements.toml`, with `allow_managed_hooks_only` [29].

**Google equivalent.** ADK Runner-level Plugins (`before_tool_callback` blocking by returning a synthetic result) [18], Cloud API Registry or Apigee tool allowlisting, and Agent Engine VPC Service Controls.

**Microsoft equivalent.** Foundry Agent Service per-agent Entra identity and RBAC, content filters and BYO VNet [9]; Microsoft Agent Framework function-calling middleware; for Copilot Studio agents, tenant DLP connector policy with Agent 365 Conditional Access per the configured-agent profile (VCS Appendix B).

**Databricks equivalent.** Unity Catalog GRANT and ABAC policies on model, model-provider, MCP and agent service objects as the permission plane; ABAC on Unity Gateway resource types is in Beta (11 August 2026). Unity Gateway (GA 4 August 2026; previously marketed as Mosaic AI Gateway, then AI Gateway and Unity AI Gateway during the 2026 previews) holds the service policies [30].

**Copilot Studio / Microsoft 365 Copilot.** Per the configured-agent profile, VCS Appendix B.

### `HRN-02` — Session preflight

**Rule.** Every agent session runs a preflight hook at start that verifies the environment, credentials, current working directory, lesson files, and rate-limit posture. A failing preflight blocks the session.

**Reference implementation.** `hooks/session-preflight.sh` is wired to Claude Code’s `SessionStart` hook event [16]. The reference `CLAUDE.md` requires reading `~/tasks/lessons.md` and any project’s `docs/AGENT_LESSONS.md` at session start, so that mistakes do not recur across sessions.

**Cross-vendor.** OpenAI: on-start Guardrails in the Agents SDK. Google ADK: pre-run graph nodes. Microsoft: Agent Framework agent-run middleware registered at agent construction, which ends the run before execution (MiddlewareTermination) [36].

**Databricks equivalent.** Job or notebook init as the preflight; the manifest and budget declarations are read from the workspace at task start.

**Copilot Studio / Microsoft 365 Copilot.** Per the configured-agent profile, VCS Appendix B.

### `HRN-03` — Pre-tool-use guard on every action

**Rule.** Before **every** tool call, a guard evaluates the specific command or action against classification rules (destructive, credential-touching, network-egress, cross-boundary), rejects blocked actions with exit code 2, and emits an audit record. The guard is stricter than the vendor deny list because it inspects arguments, not just tool identity.

**Failure mode.** Guard hooks are written **fail-closed**: every internal error path — exception, parse failure, missing dependency, unexpected input — exits 2 with a `permissionDecision: deny` payload. The guard performs no network or slow I/O, `timeout` is set explicitly, and the guard’s own budget is kept well below it (the default is 600 s for `command`, `http` and `mcp_tool` hooks). Claude Code treats exit 1 or invalid JSON as a non-blocking error and lets the action proceed, and a timed-out `command`, `http` or `mcp_tool` hook does not block. The hook is therefore the **argument-level layer, not the only layer**: every deterministic denial is also encoded as a `permissions.deny` rule (HRN-01) and, for filesystem and network reach, as a sandbox rule (HRN-11). Unattended runners built on the Agent SDK use SDK callback hooks, which block on timeout.

Hooks are delivered from managed settings with `allowManagedHooksOnly: true` (an invalid value is treated as `true` until fixed). The session preflight (HRN-02) invokes a known-denied canary and aborts if it is not blocked, and each guard has a unit test asserting exit 2 on malformed input (Workflow W4 exit check). A `ConfigChange` hook ledgers and, in unattended runs, blocks settings changes mid-session.

**Why.** Progent (“Securing AI Agents with Privilege Control”; Berkeley; arXiv 2504.11703, v3 14 May 2026; v1 title “Programmable Privilege Control for LLM Agents”) [31] states privilege as “symbolic rules over tool names and arguments” evaluated outside the model, with an SMT solver classifying policy updates as automatic narrowings or expansions requiring approval. AgentSpec (arXiv 2503.18666, ICSE 2026) [32] is a DSL of triggers, predicates and enforcement that prevents unsafe executions in over 90% of code-agent cases with millisecond overhead. Both embody the design this control prescribes; ShieldAgent (arXiv 2503.22738) [33] is the academic form of the guardian-agent second layer.

**Model-based second layer.** Where available, auto-mode classification (or an equivalent guardian model in the OWASP ACS sense) MAY run in addition to the deterministic guard; it SHALL NOT be the sole gate for HITL-REQUIRED or higher rows, and it is a model-based gate in the SDD A2 sense — it can refuse probabilistically. Anthropic’s published figures for the full pipeline are a 0.4% false-positive rate (n = 10,000 benign actions) and a 17% false-negative rate (n = 52 overeager actions). The pipeline strips assistant text and tool outputs from what the classifier sees and pauses after 3 consecutive or 20 total denials (not configurable); in a `-p` run without `--permission-prompt-tool`, the denied action simply does not run [34]. Enterprise deployments configure `autoMode.environment` (trusted repositories, buckets, services, sensitive-data locations) from the AIR, MAY set `autoMode.classifyAllShell`, and budget the classifier’s token cost under HRN-12 (classifier calls count toward token usage on Enterprise plans). In `dontAsk` the classifier is not active; only the server-side probe of incoming tool results remains as a platform-side layer.

**Reference implementation.** `hooks/pre-bash-guard.sh` is bound to Claude Code’s `PreToolUse` event with matcher `Bash`. According to Anthropic, a `PreToolUse` hook exiting with code 2 blocks the tool call before the permission prompt, though hook decisions do not bypass explicit deny rules [8]. The reference harness also binds `unattended-guard.sh` to `Edit|Write|MultiEdit`, so that file writes, not just shell commands, are guarded.

**Cross-vendor.** OpenAI: Agents SDK **tool** input/output guardrails (per-tool, before and after execution, `reject_content` or tripwire exception) — not the parallel input guardrails, which may fire after the agent “may have already consumed tokens” [29]; Codex `PreToolUse` hook exiting 2, pinned by `requirements.toml` [35]. Google: ADK Plugin `before_tool_callback` returning a synthetic result to block, registered once on the Runner so it applies to every agent, tool and model call [18]. Microsoft: Agent Framework function-calling middleware setting `FunctionInvocationContext.Terminate` [36]; Foundry content filters; Copilot Studio per VCS Appendix B.

**Databricks equivalent.** Unity Gateway guardrails (safety filters; Sensitive Data Detection, Beta 13 August 2026) and Databricks-managed MCP connector governance (Beta 6 August 2026), plus Agent Bricks guardrails. A guardrail block returns HTTP 200 and is detected from the response body and trace table, never from the status code.

**Copilot Studio / Microsoft 365 Copilot.** Per the configured-agent profile, VCS Appendix B.

### `HRN-04` — Unattended-run limits, enforced

**Rule.** Any agent invoked without an interactive reviewer for each tool call runs under an **unattended profile** that mechanically enforces: a maximum of ~200 changed lines per commit; no edits to auth, billing, payments, migrations, prod-config or deploy files; no new dependency installs; no weakening of existing tests; no invention of secrets or endpoints; verification output required before any completion claim. The set of actions eligible for the unattended profile is the HUMAN-ONLY and HITL-REQUIRED rows of the product’s delegation authority scope (Agentic PRD Standard H8; CRISP-AG §5.1): under the profile, the agent prepares such an action and never executes it (Workflow exit check W4-3). AGENT-DIRECTED and FULLY-AUTONOMOUS rows require §7 treatment or are refused; PROHIBITED rows have no tool path (HRN-01).

**Mode.** Unattended runs start with `--permission-mode dontAsk` passed explicitly [37] (or `permissionMode: "dontAsk"` in the Agent SDK) together with an explicit `allowedTools` list. A settings-file `defaultMode` is not relied on: cloud sessions ignore `dontAsk` from settings files, and `defaultMode` values `auto` and `bypassPermissions` do not take effect from project or local settings. The preflight (HRN-02) asserts the effective mode and aborts if the assertion fails. `auto` is permitted only as an additional layer (HRN-03), never as the sole gate: in a session that cannot prompt, the classifier’s pause leaves the action unexecuted without stopping the run. In `dontAsk`, protected-path writes are denied outright.

**Boundary.** Every unattended run executes inside a whole-process isolation boundary per HRN-11(b), as a non-root user, with default-deny egress. Because `-p` disables trust verification, the runner checks out only allowlisted repositories, and `strictPluginOnlyCustomization` and `allowManagedHooksOnly` block repository-supplied hooks, skills and MCP servers.

**Monotone privilege.** Within an unattended run, the effective tool and argument space may only narrow: the guard (HRN-03) may narrow it as the task proceeds, and any expansion requires a named human approval recorded in the ledger (HRN-06). The rule follows Progent, and SDD PROTO-INV-07 carries the invariant.

**Per-run ceilings.** `--max-turns`, `--max-budget-usd` (HRN-12) and `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` (HRN-05) are set on every unattended launch.

**Interactive high-risk sessions.** Where a §7 agent is operated interactively in `auto`, the session is started with `--restricted` (Claude Code v2.1.248 or later), which prevents the classifier from approving protected-path writes.

**Rationale.** The rule mirrors the reference `CLAUDE.md` “Hard Limits” section, which states that the enforcement is “mechanical, not advisory: `~/.claude/hooks/unattended-guard.sh` denies the protected-file, commit-size, and new-dependency limits above in any session launched with `HARNESS_UNATTENDED=1`. Every unattended/loop runner MUST export that variable.” A runner that omits `HARNESS_UNATTENDED=1`, starts in a mode other than `dontAsk`, or runs outside an HRN-11(b) boundary silently demotes these limits back to prose.

**Why it matters at enterprise scale.** OWASP LLM03:2026 Excessive Agency (LLM06 in the 2025 edition) is precisely the risk of an autonomous agent taking a destructive action no reviewer sanctioned [10]. Anthropic’s Usage Policy separately prohibits “critical-infrastructure disruption” and creating persistent-access tooling [38]; an unattended profile keeps an inattentive agent inside that line by construction rather than by good intent.

**Cross-vendor.** OpenAI: Codex `approval_policy = never` only inside `workspace-write` with network off and a `requirements.toml` pin; Agents SDK runs in a controlled container. Google: Agent Engine deployment with Plugin guardrails. Microsoft: Foundry hosted agent with BYO VNet; Copilot Studio per VCS Appendix B. Escalation to a human remains a first-class guardrail action [15].

**Databricks equivalent.** Workload identity with staging-only writes as the unattended profile.

**Copilot Studio / Microsoft 365 Copilot.** Per the configured-agent profile, VCS Appendix B.

### `HRN-05` — Claim auditor at turn-end

**Rule.** At the end of each agent turn, an auditor evaluates the assistant’s completion claims against the observable artifacts (files written, commands run, HTTP responses, git state). Claims of “done,” “passing” or “deployed” that lack an evidence ledger are rejected and returned for correction.

**Reference implementation.** `hooks/claim-auditor.sh` is wired to Claude Code’s `Stop` event, `hooks/subagent-claim-check.sh` is bound to `SubagentStop`, and `hooks/turn-failure-log.sh` is bound to `StopFailure` [16]. The reference `CLAUDE.md` requires an **Evidence Ledger** for any completion claim, with the fields Implemented (yes/partial), Compiled & ran (command + pasted output or “no”), Scenarios tested (named list), Not tested (boundaries and error paths), Domain validity (named review or ILLUSTRATIVE) and Production ready (specific external gate). The words banned from status reports that lack a backing ledger are “verified, proven, fully, complete, independent.”

**Override handling.** `claim-auditor.sh` writes its own decision (block or pass), the iteration count derived from `stop_hook_active`, and the trace ID (HRN-10) to `harness-catch-ledger.jsonl` on **every** invocation, so that a platform override is detectable after the fact as a ledger row with `block=true` followed by a turn end with no subsequent pass. Unattended runners set `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP` explicitly: either `0` (never override; the wall-clock and `--max-turns` ceilings of HRN-04 end the run instead) or `N` with an alert at `N−1`. A turn that ends after N−1 or more consecutive blocks is treated as a **rejected claim**, and the artifact is not accepted as reviewable (HRN-10). The count of such turns is `harness_stop_override_count` (§5).

The documented cap is 8 consecutive blocks, and the runtime message has been observed at 9; the Harness Engineer records the observed value on the pinned version. A `Stop` hook that reaches its timeout renders no decision (HRN-03 failure mode); the 90 s timeout in Appendix A is kept and the auditor’s own budget is held well below it. The Codex equivalent is a `Stop` hook; Codex has no `StopFailure` event (it has `Interrupt`).

**Why.** OWASP LLM07:2026 Misinformation (LLM09 in the 2025 edition) and NIST AI 600-1’s “Confabulation” risk (confidently stated but erroneous content, “colloquially ‘hallucinations’”) are the failure modes this control targets [24].

**Cross-vendor.** OpenAI: post-run Guardrails plus tracing in the Agents SDK. Google: Agent Engine tracing and the Evaluation Service [27]. Microsoft: Foundry audit logs; MLflow 3 in the Databricks reference variant [39].

**Databricks equivalent.** MLflow 3 evaluation runs as the evidence ledger.

**Copilot Studio / Microsoft 365 Copilot.** Per the configured-agent profile, VCS Appendix B.

### `HRN-06` — Immutable ledgers of what happened

**Rule.** Every agent action, every guard decision, every metric, every turn failure, and every claim-auditor result is appended to a tamper-evident JSONL ledger. Ledgers are outside the agent’s write scope.

**Reference implementation.** The ledgers are `harness-metrics.jsonl`, `harness-failures.jsonl`, `harness-actions.jsonl`, `harness-guard-health.jsonl`, `harness-catch-ledger.jsonl` and `qa-ledger.jsonl`. Three layers keep the agent from rewriting its own history, and the first, on its own, is advisory:

1. `Edit(<ledger path>)` deny rules in managed settings. A `Write(path)` rule is never consulted, and an `Edit` deny does not bind interpreters or subprocesses that open files themselves.
2. `sandbox.filesystem.denyWrite` on the ledger directory (HRN-11), which binds every child process at the OS level.
3. Off-host shipping to write-once storage with **tamper-evidence** per SEC §5 (SEC-04): hash-chained rows with a verifier and an off-host anchor. Append-only behavior enforced by writer code alone does not qualify.

The writers are `session-metrics.sh` (`SessionEnd`), `action-log.sh` bound to `PostToolUse (*)` and `PostToolUseFailure (*)` — covering every tool, on success and on failure, so that `harness_tool_success_rate` is computable from the ledger — and `turn-failure-log.sh` (`StopFailure`). Every ledger row carries the W3C `traceparent` and `HARNESS_TRACE_ID` (HRN-10) and is mappable to an OCSF class per the OWASP Agent Control Standard’s Trace pillar, so that ledgers from Claude Code, Foundry (Application Insights), Agent Engine (Cloud Trace) and Unity Gateway (unified trace table) join in one schema. Unity Gateway guardrail blocks return HTTP 200 and are ledgered from the response body and trace table, not the status code.

**Enterprise requirement.** Ledgers must be shipped off-host to write-once storage (e.g., an S3 or Azure Blob bucket with an Object Lock or immutability policy), with a retention period per Appendix B and with tamper-evidence per SEC §5 (SEC-04); this specification does not restate the hash chain. Ledgers are the primary evidence for NIST MEASURE and MANAGE and for ISO/IEC 42001 audit [20].

**Databricks equivalent.** Append-only Delta tables with a hash-chain job mirrored to write-once storage as the ledgers, and the Unity Gateway unified trace table in OpenTelemetry format (Beta, 21 August 2026) alongside MLflow 3 tracing.

**Copilot Studio / Microsoft 365 Copilot.** Per the configured-agent profile, VCS Appendix B.

### `HRN-07` — OpenTelemetry-first observability

**Rule.** All agent telemetry (metrics, spans and events) is emitted via OpenTelemetry using the GenAI semantic conventions, so that a single observability plane covers Claude, OpenAI, Gemini, Foundry and Databricks agents identically [40]. The attributes used are `gen_ai.provider.name` (which replaces the deprecated `gen_ai.system`), `gen_ai.operation.name` (`invoke_agent`, `execute_tool`, `invoke_workflow`, `plan`, `create_agent`), `gen_ai.agent.id` (equal to the registry ID), `gen_ai.agent.name`, `gen_ai.agent.version`, `gen_ai.conversation.id`, `gen_ai.request.model`, `gen_ai.tool.name` and `gen_ai.tool.call.id`, plus the opt-in, redacted `gen_ai.tool.call.arguments`, `gen_ai.tool.call.result` and `gen_ai.tool.definitions`.

The GenAI conventions are at **Development** stability (as of September 2026) in the `open-telemetry/semantic-conventions-genai` repository; the harness pins one semconv release in the collector, maps legacy `gen_ai.system` (which Claude Code still emits, with the value `anthropic`) to `gen_ai.provider.name`, and re-baselines at each §11 quarterly review. Vendor SDKs (Claude Code, MLflow, Foundry) may lag or diverge; the collector, not the emitter, is where the schema is enforced.

**Reference implementation.** The reference `settings.json` sets `CLAUDE_CODE_ENABLE_TELEMETRY=1`, `OTEL_METRICS_EXPORTER=otlp`, `OTEL_LOGS_EXPORTER=otlp`, `OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf`, and a 60-second metric export interval, aligning with Claude Code’s documented OTLP support for time-series metrics, logs and events, and optional distributed traces [41].

**Known caveat.** “Claude Code does not pass `OTEL_*` environment variables to the subprocesses it spawns, including the Bash tool, hooks, MCP servers, and language servers” [41]. Enterprise deployments MUST export `OTEL_*` at process launch (systemd unit, container entrypoint, launchd plist) so that subprocess telemetry is not silently lost. The following also apply:

- Behind a gateway (`ANTHROPIC_BASE_URL` set to anything other than Anthropic’s API), trace propagation is off unless `CLAUDE_CODE_PROPAGATE_TRACEPARENT=1` is set.
- When managed settings set the OTLP endpoint and credentials, Claude Code removes conflicting developer-set variables at startup.
- Tracing is in beta (`CLAUDE_CODE_ENHANCED_TELEMETRY_BETA=1`, `OTEL_TRACES_EXPORTER=otlp`), with the span tree `claude_code.interaction` → `claude_code.llm_request` / `claude_code.hook` / `claude_code.tool` → `claude_code.tool.blocked_on_user`, `claude_code.tool.execution`.
- The event `claude_code.tool_decision` (`decision` accept or reject; `source` `config`, `hook`, `user_permanent`, `user_temporary`, `user_abort`, `user_reject`) is the native source for `harness_guard_block_rate`; `claude_code.cost.usage` is the native source for HRN-12 (§5).

**Cross-vendor.** OpenAI Agents SDK built-in tracing [17]; Google Agent Engine’s serverless runtime with built-in observability [27]; Google ADK’s Logging plugin and `on_tool_error_callback` into Cloud Trace with OTel; Microsoft Agent Framework and Foundry Agent Service OpenTelemetry tracing into Application Insights [9]; Purview audit for Copilot Studio; Databricks MLflow 3 tracing and the Unity Gateway unified trace table.

**Databricks equivalent.** MLflow Tracing with `gen_ai.*` attributes, and the Unity Gateway unified trace table in OpenTelemetry format (Beta, 21 August 2026), as telemetry.

**Copilot Studio / Microsoft 365 Copilot.** Per the configured-agent profile, VCS Appendix B.

### `HRN-08` — Skills as versioned, testable capability modules

**Rule.** Domain expertise ships as **Skills** — filesystem-based, versioned modules with (a) always-loaded metadata, (b) instructions loaded on demand, and (c) bundled executable assets. Skills are unit-tested with fixtures before publication; deprecations are announced with a migration window.

**Reference implementation.** Anthropic’s Skills use exactly this three-level progressive-disclosure pattern [19]. The reference harness ships `skills/_fixture-kit` and per-skill fixtures (see `skills/graph-orchestration/fixtures/` and `skills/clean-my-ai-harness/scripts/`). Enterprise deployments publish Skills to a private registry gated on the same code-review and eval workflow used for shipped software.

**Cross-vendor.** The cross-vendor tool integration standard is MCP at the 2026-07-28 revision, as specified in §9 (stateless; `server/discover`; Client ID Metadata Documents; `traceparent` in `_meta`; Roots, Sampling and Logging deprecated) [42]. Skills and MCP servers are register entries (VCS VC-04) with their version and tool-description hash pinned per SEC §5 (SEC-19); a change fails preflight (HRN-02). OpenAI: Responses/Conversations tools plus MCP (the Assistants API has been shut down). Google: ADK tools via `ApiRegistry`. Microsoft: Agent Framework tools and the Foundry tool catalog; Copilot Studio connectors per VCS Appendix B.

**Databricks equivalent.** Unity Catalog functions and the model registry as skills, with agent skills a first-class Unity Catalog securable (28 August 2026).

**Copilot Studio / Microsoft 365 Copilot.** Per the configured-agent profile, VCS Appendix B.

### `HRN-09` — Curated, one-way harness distribution

**Rule.** The harness itself — hooks, skills, permission rules, telemetry configuration — is distributed as **read-only** to every runtime. There is one publisher (the Harness Engineer) and one canonical manifest. Consumers do not edit their local harness; they resync.

**Reference implementation.** The reference repository enforces the rule: `README.md` warns “Never edit this repo directly (including on GitHub) — the publisher stops on foreign commits,” and `bin/harness-sync` mirrors from publisher to consumer with `MANIFEST.txt` and `MANIFEST.sha256`. `settings.json` sets `defaultMode: "auto"` — effective only from **user or managed** settings, never from project or local settings, and only for **interactive** developer sessions (unattended runs are `dontAsk`, HRN-04) — and `skipAutoPermissionPrompt: true`, which suppresses the one-time first-use notice and has no effect on what runs. Both settings are acceptable only because deny rules, ask rules and hooks are managed centrally.

**Enterprise requirement: delivery per surface.** Four admin sources exist, in descending order of precedence: (1) remote settings — server-managed from claude.ai or a Claude apps gateway, fetched at startup and polled hourly; (2) MDM or OS policy — macOS plist or HKLM registry; (3) `managed-settings.d/*.json` and `managed-settings.json` (`/Library/Application Support/ClaudeCode/` on macOS; `/etc/claude-code/` on Linux and WSL; `C:\Program Files\ClaudeCode\` on Windows — the legacy ProgramData path is no longer read); (4) the HKCU registry [28]. By default the first source with a policy key wins; under `managedSourcesBehavior: "merge"` lists combine, locks take the strictest value, and `permissions.defaultMode` and `forceLoginOrgUUID` are read from the highest-ranked source only.

Anthropic-hosted cloud sessions read no device MDM profile or file; **Cowork sessions never fetch server-managed settings**; when `ANTHROPIC_BASE_URL` points at a gateway, the remote source is skipped. The Harness Engineer therefore names the delivery mechanism per surface — server-managed for claude.ai-authenticated and cloud sessions; MDM or file for API-key and gateway sessions — sets `managedSourcesBehavior` deliberately, and Gate 2 checks that `claude doctor` reports the organization policy loaded from the intended source on a sample of each surface.

**Minimum managed payload.** The minimum payload is the versioned **Managed Runner Baseline (MRB-1)** per SEC §6, hash-recorded in the AgBOM. It comprises:

- `permissions.disableBypassPermissionsMode: "disable"` and `disableAutoMode: "disable"`, both accepted from any scope and locked only from a managed source;
- the managed-only keys:
  - `allowManagedPermissionRulesOnly: true`;
  - `allowManagedHooksOnly: true`;
  - `allowManagedMcpServersOnly: true`, with `managed-mcp.json`;
  - `strictPluginOnlyCustomization: true`, which blocks skills, agents, hooks and MCP servers from user and project sources;
  - `disableSideloadFlags: true`, which rejects `--plugin-dir`, `--plugin-url`, `--agents` and `--mcp-config` at startup;
  - `forceRemoteSettingsRefresh: true`, where server-managed settings are used, so that startup blocks until fresh settings are fetched and exits if the fetch fails;
- the HRN-11 sandbox locks `sandbox.filesystem.allowManagedReadPathsOnly` and `sandbox.network.allowManagedDomainsOnly`.

`permissions.blockReadsOutsideWorkingDirectories`, `skipDangerousModePermissionPrompt` and `skipAutoPermissionPrompt` are **not** managed-only and bind as policy only when delivered from a managed source. If the managed file cannot be read and no admin source supplies a policy, sessions exit at startup. `forceLoginMethod` and `forceLoginOrgUUID` pin logins to the enterprise Anthropic organization.

**Manifest as AgBOM.** `MANIFEST.txt` and `MANIFEST.sha256` are published as an **agent bill of materials** per SEC §5 (SEC-16), in CycloneDX ML-BOM form with the OWASP ACS AgBOM profile (CycloneDX core has no agent schema as of 1.7 [43]). The AgBOM lists model pins, the runtime version, settings and hook hashes, dependencies, MCP servers and tool-description hashes, and the ledger references it by hash. A `ConfigChange (policy_settings)` hook ledgers any mid-session change to the managed source (Appendix A). The Codex equivalent is an enterprise `requirements.toml` with inline `[hooks]` and `allow_managed_hooks_only = true`; for Copilot Studio, see VCS Appendix B.

**Databricks equivalent.** Declarative Automation Bundles (renamed from Databricks Asset Bundles, 16 March 2026) as one-way distribution.

**Copilot Studio / Microsoft 365 Copilot.** Per the configured-agent profile, VCS Appendix B.

### `HRN-10` — Trace correlation and evidence for every claim

**Rule.** The workflow trace ID is a W3C `traceparent`. Runners export `TRACEPARENT` and `TRACESTATE` before launching `claude -p` or the Agent SDK (interactive sessions ignore inbound `TRACEPARENT`). Claude Code propagates `TRACEPARENT` to Bash and PowerShell children while tracing is active, and `SubagentStart` hooks re-export it. Hooks write both `HARNESS_TRACE_ID` (equal to the trace-id field) and the full `traceparent` to every ledger row (HRN-06), and MCP tool calls carry `traceparent`, `tracestate` and `baggage` in `_meta` per the 2026-07-28 revision so that MCP server spans join the run. Metrics, failure records and action-ledger entries join on that ID across the parent, its subagents, MCP servers and platform traces (MLflow, Foundry, Agent Engine). Every reviewable artifact carries the ledger of the run that produced it; the Databricks `correlation_id` equals the trace-id field when a Claude Code agent initiated the run (Workflow Appendix B).

**Reference implementation.** The reference `CLAUDE.md` carries the **Correlate the fan-out** rule, and the harness’s `session-metrics.sh` and `action-log.sh` write `HARNESS_TRACE_ID` alongside each record.

**Why.** ISO/IEC 42001 audit and EU AI Act post-market monitoring both require the ability to reconstruct, after the fact, why an agent took a particular action [20], [12]. Trace correlation provides that ability.

**Databricks equivalent.** `correlation_id` as the trace ID; it equals the W3C trace-id field when a Claude Code agent initiated the run (Workflow Appendix B).

**Copilot Studio / Microsoft 365 Copilot.** Per the configured-agent profile, VCS Appendix B.

### `HRN-11` — OS-level isolation boundary for every agent runtime

**Rule.** Every agent runtime runs inside an **isolation boundary** per SEC §5 (SEC-10) — declared read roots, write roots, egress allowlist and the processes outside the boundary — enforced by OS or hypervisor primitives, never by tool-argument matching alone. The boundary is proportionate to the DAS position of the actions the runtime may take:

- **(a)** interactive sessions and HITL-REQUIRED rows — at minimum, the platform’s per-command sandbox with managed filesystem and network policy;
- **(b)** unattended runs (HRN-04) and any session in `dontAsk` or `bypassPermissions` without a reviewer — a **whole-process boundary** (container, VM, sandbox runtime or vendor-hosted sandbox) as a non-root user, with default-deny egress and an explicit endpoint allowlist, so that file tools, MCP servers and hooks are inside the boundary;
- **(c)** FULLY-AUTONOMOUS rows and high-risk agents (§7) — kernel-level separation (VM or microVM).

Where the agent platform cannot enforce the boundary itself, device management, software allowlisting or the CI runner image enforces it, and Gate 2 records which. Dependency installation happens in a setup phase that precedes and is isolated from the agent phase. Credential files and variables are absent from the boundary or masked; the ledger directory (HRN-06) is write-denied inside it. Isolation violations, unsandboxed fallbacks and boundary overrides are ledgered and measured (`harness_isolation_violation_rate`, §5). The detail (boundary declaration, canary probes, egress proxy and runner OS) is specified in SEC §5 (SEC-10) and SEC §6 (MRB-1); this control does not restate it.

**Why.** The control addresses OWASP ASI05 Unexpected Code Execution and ASI10 Rogue Agents, as well as LLM02:2026 and LLM03:2026. The relevant MITRE ATLAS mitigation is AML.M0032 Segmentation, and case studies CS0046 (Claude data destruction) and CS0045 (Cursor MCP) are runs whose blast radius was the host, not the tool. Anthropic states: “Always run `--dangerously-skip-permissions` sessions inside a container, a VM, or the sandbox runtime, so that file tools, MCP servers, and hooks are also inside the boundary”; “The sandboxed Bash tool on its own constrains only shell commands, so it is not sufficient for fully unattended runs in either mode” [44].

**Reference implementation (Claude Code).** *Tier (a):* the built-in sandbox — Seatbelt on macOS; bubblewrap plus socat on Linux and WSL2; optional seccomp Unix-socket blocking via `@anthropic-ai/sandbox-runtime` (beta research preview, v0.0.64, 7 July 2026); native Windows is unsupported, so Windows hosts use WSL2 or a container. Managed settings (SEC MRB-1) set the following:

- `sandbox.enabled: true`;
- `sandbox.failIfUnavailable: true`, so that absence is a hard failure;
- `sandbox.allowUnsandboxedCommands: false`, which closes the unsandboxed-retry escape hatch; anything that must run outside is named in `excludedCommands`, which has no managed-only lock and is therefore canary-probed;
- `sandbox.network.allowManagedDomainsOnly: true`, with the enterprise `allowedDomains` list and `strictAllowlist` (deny rather than prompt);
- `sandbox.filesystem.allowManagedReadPathsOnly: true`;
- `sandbox.filesystem.denyRead` for `~/.ssh`, `~/.aws`, `~/.claude/.credentials.json`, `./.env` and `./secrets/**` (otherwise, the default grants read access to the whole filesystem, including `~/.ssh` and `~/.aws`);
- `sandbox.filesystem.denyWrite` for the ledger directory;
- `sandbox.credentials` `deny` and `mask` entries, with `injectHosts` for the tokens that tools need;
- `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1`, in the managed `env` block [45].

**Coverage limit.** The built-in sandbox applies only to Bash, PowerShell and Monitor commands and their children; the built-in file tools, MCP servers and hooks run on the host, which is why tier (a) is the interactive floor, not the unattended boundary.

**Egress caveat.** The sandbox’s allowlist is hostname-based and does not terminate TLS by default, and the vendor documents a domain-fronting bypass. Unattended egress therefore passes through the enterprise proxy (SEC-10), and the built-in list serves as defense in depth.

*Tier (b):* the whole process — Claude Code, its file tools, hooks and MCP servers — inside a container, a VM or the sandbox runtime, running as a non-root user, or in an Anthropic-hosted cloud session. The sandbox runtime wraps an entire process in the same Seatbelt or bubblewrap isolation and by default blocks writes to `.git/hooks`, `.git/config`, `.mcp.json`, `.claude/commands`, `.claude/agents` and shell startup files; on Linux it builds the deny list once at launch. Claude Code refuses `--dangerously-skip-permissions` as root on Linux and macOS. In an Anthropic-hosted cloud session, a network proxy enforces a default allowlist, and a separate proxy holds the GitHub token outside the sandbox. Runners are Linux (SEC MRB-1).

*Tier (c):* a VM or microVM per session; Docker Sandboxes, a microVM with its own Docker daemon, is one vendor-named option [44].

**OpenAI equivalent.** Codex sandbox `read-only` or `workspace-write` (Seatbelt via `sandbox-exec` on macOS; bubblewrap plus seccomp on Linux) with `network_access=false` (network off by default), approval policy pinned by enterprise `requirements.toml` [46]. Codex cloud uses a two-phase runtime (setup online, agent phase offline by default), and Agents SDK runs are hosted in a container the organization controls.

**Google equivalent.** Agent Engine (Gemini Enterprise Agent Platform) with VPC Service Controls and CMEK; ADK-only deployments require a container.

**Microsoft equivalent.** Foundry hosted agents with BYO Azure Virtual Network — each session in a VM-isolated sandbox connected to the VNet — and a per-agent Entra identity. Copilot Studio agents inherit tenant DLP and connector policy with no customer-controlled sandbox, which is recorded as a limitation in the configured-agent profile (VCS Appendix B) together with the DAS ceiling it implies.

**Databricks equivalent.** Serverless compute isolation plus Unity Catalog grants; Unity Gateway service policies govern model, MCP and agent services (request and response guardrails, rate limits); no per-command sandbox.

**AWS equivalent (reference posture).** Bedrock AgentCore Runtime and Harness [47]: each session in an isolated microVM with filesystem and shell access.

**Anthropic-hosted.** Claude Code cloud sessions (allowlist proxy) or Claude Managed Agents [48] (beta; Anthropic-managed or self-hosted sandbox environment) per the §9 posture.

**Copilot Studio / Microsoft 365 Copilot.** Per the configured-agent profile, VCS Appendix B.

### `HRN-12` — Spend and consumption governor, enforced outside the model

**Rule.** Every agent runs under a hard spend ceiling, enforced at two levels in a layer the agent cannot modify. **(1) Per run:** a budget and a turn cap that terminate the run when reached. **(2) Per agent and vendor service, per month:** a declared budget with an alert threshold (default 80%) and a hard cap (100%) in the vendor’s or gateway’s enforcing plane. Every model call and tool call carries cost attribution — product, agent, use case, model tier, vendor service, `inference_geo` — in telemetry (HRN-07) and in the action ledger (HRN-06). Every pinned model identifier has a named successor (VCS VC-05). The premium-tier share of calls is tracked against the ceiling declared in the product’s S5.5 (VCS VC-02).

Client-side cost estimates are reconciled to the vendor’s authoritative usage data **at least daily**. On a reconciled overrun of the monthly ceiling, the reconciliation job sets the agent to the HUMAN-ONLY posture of HRN-04 until the AI Product Owner and the Vendor Control Owner re-authorize it. The job applies the posture through the gateway policy or a registry `HOLD` where the plane exposes one; otherwise, an operator applies it on the alert. The demotion is recorded as a ledger row. Where the vendor plane’s hard-stop behavior is unverified or alert-only (the direct Anthropic Console path today, per VCS §5), the agent SHALL either route through an enforcing gateway (Unity Gateway) or the Enterprise cap, or carry the VC-06 DAS ceiling; the per-run `--max-budget-usd` estimate is not by itself the monthly ceiling.

The budget, alert threshold, cap, metering unit and reconciliation source for each vendor service are specified in VCS §4 (VC-01), and tiering and the smallest-sufficient-tier default in VCS §4 (VC-02). This control states the harness obligation; it does not restate those specifications.

**Why.** The control addresses OWASP LLM06:2026, Unbounded Consumption. Gartner names escalating costs first among the causes of agentic-project cancellation (25 June 2025: “over 40% of agentic AI projects will be canceled by the end of 2027, due to escalating costs, unclear business value or inadequate risk controls”) [49]. The FinOps Foundation’s FinOps for AI guidance (overview updated 17 February 2026) makes limits, quotas, anomaly detection and allocation core practices [50]. A budget that only alerts is not a governor: an overrun can be visible in a dashboard long before it is stopped.

**Reference implementation (Claude Code).** The budget is declared in the harness manifest (HRN-09) and read by the preflight (HRN-02), which fails when the budget, the tier declaration or the pin successor is missing. Unattended runs launch as `claude -p --max-budget-usd <n> --max-turns <m>` (print mode; `--max-budget-usd` requires Claude Code v2.1.217 or later; subagent spend counts toward the cap, a further subagent fails with `Budget limit reached`, and running background subagents are stopped), or through the Agent SDK with `max_budget_usd` or `maxBudgetUsd` (result subtype `error_max_budget_usd`) [51], [52]. **Both are client-side estimates, not billing data**; the vendor’s documentation warns against using them for billing or to trigger financial decisions. The `PostToolUse` ledger (HRN-06) records the cost fields; `claude_code.cost.usage` (USD, attributes `model`, `query_source`, `effort`, `agent.name`, `skill.name`, `plugin.name`, `mcp_server.name`) and `gen_ai.usage.*`, plus an `org.cost.*` attribute set, are emitted on every span (HRN-07). Auto-mode classifier calls count toward token usage on Enterprise plans and are budgeted under this control.

**Anthropic equivalents.** Spend control spans three planes, plus reporting, and the Anthropic Vendor Service Profile carries all three planes per VCS VC-03. *Console API:* an organization spend limit and per-workspace spend limits (a workspace limit may only be lower than the organization’s; an email notification is sent at a set amount; the behavior at the workspace cap is unverified). *Claude for Enterprise:* organization, RBAC-group and per-user monthly caps; at the cap, in-flight requests complete and further requests are blocked; users may “Request more usage”; caps reset at 00:00 UTC on the 1st of the month; individual limits override group limits, and group limits override organization defaults; per-user overrides are set through the Spend Limits API [53] (scope `user` only; monthly is the only period; the 80% ratio is computed client-side). *Reporting:* the Usage and Cost Admin API [54] (cost at daily granularity only; Priority Tier costs excluded; data typically within 5 minutes). *Via Databricks:* Unity Gateway is the enforcing plane for FMAPI-routed Anthropic traffic.

**OpenAI equivalent.** Project-level budgets and usage limits are set in the platform’s organization settings; Codex `requirements.toml` pins cannot cap spend. Coverage: Partial until the organization’s platform engineers confirm the hard-stop semantics in the VSP.

**Google equivalent.** Cloud Billing budgets are **alert-only**; Vertex AI (Gemini Enterprise Agent Platform) quotas are rate limits, not spend caps; a hard stop requires customer automation. Coverage: Partial. Budget actions can serve as a hard stop (unverified).

**AWS equivalent (reference posture).** Bedrock cost allocation by IAM user or role and by inference profile provides attribution (9 April 2026) [55]; AWS Budgets actions can serve as a stop (unverified). Coverage: Partial.

**Microsoft equivalents.** Spend control spans three planes, and VCS Appendix B carries the Copilot Studio and Microsoft 365 Copilot columns. *Foundry:* Azure Cost Management budgets are alert-only: “Resources aren’t affected, and your consumption isn’t stopped” [56]. Cost data lands within 8–24 hours and budgets are evaluated every 24 hours, so the enforcing step is an action-group automation (a webhook or Function that reduces deployment quota or TPM, or rotates the key), which the organization’s platform engineers specify. Foundry Model Router in balanced or cost mode provides tiering; Foundry Control Plane (preview) [57] provides cost and token tracking as evidence, not control. Coverage: Partial until the automation is wired.

*Copilot Studio:* text and generative AI tools bill 1, 15 or 100 Copilot Credits per 10 responses for basic, standard or premium models, respectively (0.1, 1.5 or 10 credits per 1K tokens); a generative answer bills 2 credits and an agent action 5. Premium is about 6.7× the standard tier and, per response, 5× a generative answer. The per-agent monthly consumption limit, with notification and hard stop, is set in the Power Platform admin center before first use, and prepaid enforcement disables custom agents at 125% of prepaid capacity. Use by a Microsoft 365 Copilot-licensed user under their own USL identity is “No charge” ([58], 3 August 2026). Coverage: Full per agent.

*Microsoft 365 Copilot agents:* usage is metered through the Microsoft 365 admin center billing policy at US$0.01 per message; the budget limit sends percentage-milestone emails; there is no per-agent limit, and the only hard stop is disconnecting the billing policy. Coverage: Partial; the resulting DAS ceiling is recorded in the configured-agent profile (VCS VC-06).

**Databricks equivalent.** Unity Gateway supports budgets per user, use case (tag), workspace or account, with “Send alert” or “Block usage” actions ([59], 23 July 2026; budgets GA). Block thresholds are enforced approximately, on a near-real-time estimate, so the cap is configured with headroom and reconciled monthly against `system.billing.usage`, the source of truth; `system.ai_gateway.external_model_spend` updates hourly, and external-provider spend caps (Amazon Bedrock, Azure AI Foundry) are in beta (28 August 2026). Coverage: Full for Databricks-routed traffic, including FMAPI Anthropic models.

**Governance consequence.** An action that consumes metered vendor capacity cannot hold an AGENT-DIRECTED or FULLY-AUTONOMOUS position unless an enforcing cap exists at level (2); an alert-only budget does not qualify (CRISP-AG §5.8), and the Finance or Procurement approver, or the Vendor Control Owner, confirms the cap at initial approval (CRISP-AG §5.1.1). For Class 3 and above, level (1) is the pipeline policy’s consumption budget per run and per period (CRISP-AG §5.3): exhausting it is a halt-the-line condition under CRISP-AG §7.2 — the run is held with its cost visible and escalated, not retried. The AIR *Cost and tier* field (CRISP-AG §5.5) records the budget, the cap owner, the enforcing layer and whether it is a hard stop; an AIR whose ceiling has no enforcing cap is out of compliance with its own record. Configuration of the caps themselves is phased in per VCS §8: observation in Phase 1, alerting in Phase 2 and hard caps on every production agent in Phase 3.

**Gate and metric bindings.** Gate 2 verifies that the two levels are configured for every vendor service on the register row; Gate 4 monitors `harness_spend_vs_budget`, `harness_premium_tier_share` and `harness_cost_per_unit` (§5).

## 5. Observability, metrics, and SLOs

Twelve metrics are mandatory. Each is emitted through OpenTelemetry per HRN-07 and, where a native signal exists, derived from the one named below:

| Metric | Definition | Native source | SLO (enterprise baseline) |
|---|---|---|---|
| `harness_guard_block_rate` | Guard blocks ÷ tool calls | `claude_code.tool_decision` (source `hook`, decision `reject`); else `harness-guard-health.jsonl` | Tracked, not thresholded; alert on 10× 30-day baseline |
| `harness_claim_rejection_rate` | Claim-auditor rejections ÷ turns claiming “done” | `harness-catch-ledger.jsonl` | < 5% steady-state; > 15% triggers agent recall |
| `harness_unattended_violation_rate` | Unattended-guard denials ÷ unattended tool calls | — | < 0.5%; > 2% triggers unattended-profile audit |
| `harness_tool_success_rate` | `PostToolUse` ÷ (`PostToolUse` + `PostToolUseFailure`), per tool | Appendix A binding | ≥ 95% per tool |
| `harness_eval_score` | Automated eval suite pass rate | — | ≥ 95% for production agents; new agents launch ≥ 90% |
| `harness_incident_ttr` | Time-to-resolution for a P1 agent incident | — | < 24 h |
| `harness_spend_vs_budget` | Month-to-date reconciled spend ÷ declared budget, per agent and per vendor service; plus per-run spend ÷ per-run budget | — | Alert at 80%; hard cap at 100% (HRN-12); zero runs exceeding the per-run budget; reconciled estimate-to-billed delta tracked |
| `harness_premium_tier_share` | Premium-tier calls ÷ calls, per agent | — | Tracked in Phase 1; thresholded per product from Phase 3 against the S5.5 ceiling |
| `harness_cost_per_unit` | Reconciled spend ÷ units of work, by tier and agent | — | Tracked; alert on 2× the 30-day baseline |
| `harness_isolation_violation_rate` | (sandbox denials + unsandboxed fallbacks + `excludedCommands` additions + boundary-absent starts) ÷ tool calls | Sandbox violations named in the blocked command’s result; the “Bash command (unsandboxed)” prompt; `failIfUnavailable` failures | Unsandboxed fallbacks = 0 in unattended runs; any boundary-absent unattended start pages |
| `harness_hook_health` | (hook timeouts + non-blocking errors) ÷ hook invocations | `claude_code.hook` spans in detailed beta tracing; “hook error” notices | < 0.1%; any guard-hook timeout or non-2 error in an unattended run pages |
| `harness_stop_override_count` | Turns ending after ≥ N−1 consecutive Stop-hook blocks (HRN-05) | — | 0 in unattended runs; any occurrence is a rejected claim and a P2 incident |

Dashboard rules require a named owner for every metric and a runbook link for every alert. Native sources are preferred to ledger parsing because they survive a hook failure; where a native source is used, the ledger row is still written (HRN-06), and the two are reconciled at Gate 4. SLO thresholds are re-baselined after 90 days of production telemetry (§12).

**Standing governance invariants.** For every agent of Class 2 and above, HRN-06 and HRN-07 telemetry feeds the seven default standing governance invariants of CRISP-AG §6.3. Each routes to a human and never closes itself. Invariants (1), (2), (5) and (6) may invoke the agent’s containment (CRISP-AG §5.5) automatically at the policy-enforcement layer, with mechanics per SEC §5 (SEC-12); resumption is a recorded human decision. The cost and registry metrics that CRISP-AG §8 names — premium-tier share, cap events, registry completeness — are reported per VCS §9 and are not redefined here.

**Residency multiplier.** Where a product pins `inference_geo: us` on Anthropic models (≥ 4.6), the list price is 1.1× the global price; `harness_cost_per_unit` is baselined per geography so that a residency decision is not read as drift.

**Quarterly price review.** Vendor meter and price changes are captured in the Vendor Change Register (VCS VC-05), and the baselines for both cost metrics are reset at the AIGB quarterly review; a price change is never absorbed silently into a “cost drift” alert.

## 6. Threat model and cross-framework control map

### 6.1 OWASP mapping — LLM Top 10 2026 and Top 10 for Agentic Applications 2026

| OWASP ID (2026) | Threat | Primary harness controls |
|---|---|---|
| LLM01:2026 | Prompt Injection | HRN-01, HRN-03, HRN-05, HRN-11; prompt fence and adaptive injection evaluation per SEC §5 (SEC-13, SEC-14) |
| LLM02:2026 | Sensitive Information Disclosure | HRN-01, HRN-03, HRN-06, HRN-07, HRN-11 (`denyRead`, credential masking) |
| LLM03:2026 | Excessive Agency | HRN-01, HRN-03, HRN-04, HRN-11; DAS per CRISP-AG §5.1 |
| LLM04:2026 | Supply Chain | HRN-08, HRN-09; Vendor Service Profile and Vendor Change Register per VCS §4 (VC-03, VC-05); AgBOM and tool-description integrity per SEC §5 (SEC-16, SEC-19) |
| LLM05:2026 | Data and Model Poisoning | HRN-08, Gate 3 evals; model provenance per SEC §5 (SEC-22) and VCS VC-05 |
| LLM06:2026 | Unbounded Consumption | HRN-12, HRN-04, HRN-07 |
| LLM07:2026 | Misinformation | HRN-05, HRN-10, Gate 3 evals |
| LLM08:2026 | Hidden Context Exposure | HRN-01, HRN-06; prompt fence per SEC §5 (SEC-13); `InstructionsLoaded` evidence (Appendix A) |
| LLM09:2026 | Vector and Embedding Weaknesses | HRN-01 (retrieval-tool scoping), Gate 3 evals |
| LLM10:2026 | Improper Output Handling | HRN-03, HRN-05; output handling per SEC §5 (SEC-20) |

The Agentic Top 10 maps as follows:

| ASI ID (2026) | Threat (canonical title) | Primary harness controls |
|---|---|---|
| ASI01 | Agent Goal Hijack | HRN-01, HRN-03, HRN-05; instruction authenticity and prompt fence per SEC (SEC-01, SEC-13) |
| ASI02 | Tool Misuse and Exploitation | HRN-01, HRN-03 (argument-level guard), HRN-04 (monotone privilege) |
| ASI03 | Identity & Privilege Abuse | HRN-01, HRN-04; short-lived credentials and Agent 365 identity per SEC (SEC-11, SEC-17); AIR per CRISP-AG §5.5 |
| ASI04 | Agentic Supply Chain Vulnerabilities | HRN-08, HRN-09; VSP and Vendor Change Register per VCS; AgBOM per SEC-16 |
| ASI05 | Unexpected Code Execution (RCE) | HRN-11, HRN-03, HRN-04 |
| ASI06 | Memory & Context Poisoning | HRN-06, HRN-08; mitigations remain CRISP-AG §7’s |
| ASI07 | Insecure Inter-Agent Communication | HRN-10 (trace in `_meta`), HRN-08 (MCP 2026-07-28 conformance); mitigations remain CRISP-AG §7’s; A2A signed AgentCards (STD S1.10) |
| ASI08 | Cascading Failures | HRN-04, HRN-12 (spend cap as a circuit breaker), HRN-05; mitigations remain CRISP-AG §7.2’s |
| ASI09 | Human-Agent Trust Exploitation | HRN-05 (claim auditor), Gate 3 HitL-bypass chains; disclosed principal per STD H8 |
| ASI10 | Rogue Agents | HRN-11, HRN-12, HRN-06; kill switch and demotion per SEC §5 (SEC-12) citing CRISP-AG §5.5 containment field and §5.1.3 |

Sources: OWASP GenAI Security Project, “OWASP Top 10 for LLM Applications 2026”, 3 August 2026 [10], which supersedes the 2025 edition and changes its numbering; and “OWASP Top 10 for Agentic Applications 2026”, 9 December 2025 [60]. The Agent Control Standard v0.1 (public preview, 1 September 2026) [61] supplies the hook, trace and AgBOM vocabulary used in Appendix A and SEC-16; this specification uses it as vocabulary, not as an enforcement mechanism (v0.1 already specifies deny and modify dispositions; its v3 extends them to A2A and MCP). The OWASP MCP Top 10 is an OWASP Foundation project in beta (2025 edition), not a GenAI Security Project deliverable. OWASP GenAI’s “Agentic AI — Threats and Mitigations” [62] is retained as a secondary source.

### 6.2 NIST AI RMF function mapping

| NIST Function | Where satisfied |
|---|---|
| GOVERN | §2 governance and roles; ISO/IEC 42001 AIMS; HRN-09 curated distribution |
| MAP | Gate 0 intent and risk classification; NIST GAI Profile applicability review |
| MEASURE | Gate 3 evals + red team; HRN-05 claim auditor; HRN-06 ledgers; HRN-07 telemetry |
| MANAGE | Gate 4 monitoring; §5 SLOs; incident runbooks; quarterly re-evaluation |

NIST AI RMF 1.0 (AI 100-1) is under revision; this specification pins the 1.0 function and category identifiers until the revision is published. NIST AI 600-1 (GAI Profile) is current. The NIST AI Agent Standards Initiative (17 February 2026), the NCCoE agent identity and authorization concept paper (comments closed 2 April 2026) and the COSAiS control overlays for single- and multi-agent systems have been announced, but **no agent overlay has been published** as of September 2026. NIST IR 8596, the Cyber AI Profile [63], is an initial preliminary draft (iprd, 16 December 2025; comments closed 30 January 2026). None is cited as a requirement.

Sources: NIST AI 100-1 [11]; NIST AI 600-1 [24]; NIST COSAiS [64].

### 6.3 EU AI Act mapping (high-risk agents)

This mapping applies to any agent whose use case falls under Annex III [12]. The obligations most relevant to an adopting organization’s business lines, and how the harness satisfies them, are as follows:

- **Risk management system** — Gate 0 and Gate 3.
- **Data governance** — HRN-01 permission model; DPO signoff at Gate 0; the processing basis declared in the organization’s privacy notice honored at agent scope.
- **Technical documentation and record-keeping** — HRN-06 ledgers; HRN-10 trace correlation.
- **Transparency to deployers and users** — model cards per agent; Microsoft-style Transparency Notes for platform services [22].
- **Human oversight** — the HRN-04 unattended profile and escalation to a human.
- **Accuracy, robustness, cybersecurity** — Gate 3 evals; HRN-01/03 guards; adherence to Google SAIF controls [65]; Anthropic RSP-aligned model selection [66].
- **Post-market monitoring** — §5 SLOs; HRN-06 ledgers.

**Timeline.** An adopting organization must plan against these dates: prohibitions and AI-literacy obligations from 2 February 2025; GPAI obligations from 2 August 2025; Article 50 transparency from 2 August 2026; the new Article 5(1)(ba)/(bb) prohibitions from 2 December 2026; Annex III high-risk obligations from 2 December 2027 and Annex I from 2 August 2028 under Regulation (EU) 2026/1744 (in force 27 July 2026) [67]; GPAI models placed on the market before 2 August 2025 comply by 2 August 2027.

Sources differ on the application date of the new Art. 5(1)(ba)/(bb) prohibitions (entry into force, 27 July 2026, per one reading of EUR-Lex; 2 December 2026 per law-firm commentary and the AI Act Explorer reading of amended Art. 113). This specification uses 2 December 2026, per amended Art. 113. Article 50(2) marking for systems already on the market before 2 August 2026 has a grace period to 2 December 2026. High-risk systems placed on the market before the applicable date are caught only on significant changes in their design, and those intended for use by public authorities must comply by 2 August 2030 (Art. 111(2) as amended). The Article 4 literacy obligation as amended is to “take measures to support the development of AI literacy” — an adopting organization’s literacy program is expected to exceed that floor. The AI Act Explorer implementation timeline is kept as a secondary citation [68]. The Agentic PRD Standard’s §5.4 dates govern where this section and the Standard differ.

**Penalty exposure.** Fines reach up to €35M or 7% of worldwide turnover for prohibited-practice breaches, up to €15M or 3% for breaches of other operator or notified-body obligations, and up to €7.5M or 1% for incorrect or misleading information; Commission fines on GPAI providers reach up to 3% of worldwide turnover or €15M [12, Arts. 99 and 101]. Because the ceiling scales with worldwide turnover, a 7% exposure can exceed typical cyber-incident loss reserves for a large multinational.

### 6.4 MITRE ATLAS

ATLAS is “a globally accessible, living knowledge base of adversary tactics and techniques involving AI,” with entries marked “&” indicating techniques adapted from MITRE ATT&CK [21]. The AI Security Reviewer role (§2) applies ATLAS at Gate 3 as a required checklist alongside OWASP; findings feed HRN-06 ledgers. The Gate 3 checklist uses ATLAS data v2026.06, including the agentic techniques and the agent case studies CS0037 (Copilot Studio), CS0045 (Cursor MCP), CS0046 (Claude data destruction), CS0053 (Postmark MCP), CS0055 (AI ClickFix) and CS0059 (EchoLeak). It cites the mitigations AML.M0032 Segmentation (HRN-11) and AML.M0033 Input/Output Validation (HRN-03; SEC-02, SEC-13, SEC-20).

### 6.5 ISO/IEC 42001

ISO/IEC 42001:2023 specifies requirements for establishing, implementing, maintaining, and continually improving an Artificial Intelligence Management System [20]. This specification is the harness layer of the organization’s AI management system and is written for **alignment** with ISO/IEC 42001:2023; **certification is a separate AIGB decision**. ISO/IEC 42001 has been adopted as EN ISO/IEC 42001:2026 (18 March 2026) but is not cited in the Official Journal as a harmonized standard, so alignment or certification creates **no presumption of conformity** with the EU AI Act [69]; the harmonized QMS standard in preparation is prEN 18286 (Art. 17). ISO/IEC 42005:2025 (AI system impact assessment) [70] is the reference for the AISIA per CRISP-AG.

### 6.6 Agentic frameworks map

| Framework | Status (19 September 2026) | Map to this specification |
|---|---|---|
| CSA Agentic Trust Framework (ATF) [71] | v0.9.1 public review draft (3 April 2026); no v1.0 tagged; stewardship transferred to the CSAI Foundation 29 April 2026; project site brands the text “ATF v1” | Five elements: **Identity** → HRN-01, HRN-09, SEC-01, SEC-11, SEC-17; **Behavior** → HRN-05, HRN-06, HRN-07; **Data Governance** → HRN-01, HRN-06, VCS VC-07; **Segmentation** → HRN-11; **Incident Response** → HRN-12, SEC-12 (kill switch), CRISP-AG §5.1.3 demotion. |
| OWASP Agent Control Standard (ACS) | v0.1 public preview (1 September 2026; origin Zenity; Apache-2.0); OTel + OCSF traces; AgBOM via CycloneDX, SPDX or SWID; deny and modify dispositions in v0.1, extended to A2A and MCP at v3 | Instrument → Appendix A hook points; Trace → HRN-06 and HRN-07 OCSF-mappable rows; Inspect → HRN-09 AgBOM (SEC-16). Vocabulary, not an enforcement mechanism; not a compliance target. |
| CSA MAESTRO [87] | Seven layers: Foundation Models; Data Operations; Agent Frameworks; Deployment and Infrastructure; Evaluation and Observability; Security and Compliance (vertical); Agent Ecosystem | L1 → §9 posture, VCS VC-05; L2 → HRN-01, HRN-08; L3 → HRN-03, HRN-04; L4 → HRN-11, HRN-09; L5 → HRN-05, HRN-07, Gate 3; L6 → all HRN, SEC; L7 → HRN-10 (MCP `_meta`), VCS VC-04. |
| CISA and ASD’s ACSC with international partners, “Careful Adoption of Agentic AI Services” | 1 May 2026 | Guidance; this specification cross-reads it at Gate 0 for vendor-hosted agents (§9). |
| OWASP, “State of Agentic AI Security and Governance” | v2.01, 1 June 2026 | Context for §6.1; not normative. |
| CSA AI Controls Matrix | v1.1, 14 July 2026 | This specification’s control crosswalk, maintained by the SEC standards watch. |

In the ATF row, the levels Intern, Junior, Senior and Principal and the “underlying model or system changes” review trigger are CRISP-AG’s to map (§5.1.3).

## 7. Additional obligations for high-risk agents

This section applies to any agent whose Gate 0 classification places it in EU AI Act Annex III, and to any agent the organization elects to hold to that bar for consequential decisions regardless of jurisdiction. High-risk systems already placed on the market or put into service before the applicable date are caught only on **significant changes in their design**, and those intended for use by public authorities must comply by **2 August 2030** (Art. 111(2) as amended by Regulation (EU) 2026/1744); the change gate (§11; Workflow §8) records whether a change is substantial, with Legal’s determination. The obligations are as follows:

1. **Human oversight is a required control**, not a design option. The HRN-04 unattended profile is prohibited for tool calls that materially change a high-risk outcome; a named human decision-maker approves each such action. The Commission’s draft high-risk classification guidelines (19 May 2026; final due by 1 August 2027) [72] state that human adoption of a per-individual recommendation does not remove high-risk status and that terms-of-service disclaimers are insufficient; the §8.1 tier column is read accordingly.
2. **Adversarial testing** — documented, versioned, reproducible; artifacts stored in the HRN-06 ledger.
3. **Post-market monitoring plan** — the §5 SLOs plus a use-case-specific monitoring plan approved by the AI Risk Officer.
4. **Serious incident reporting** — a documented process to notify the Commission and national authorities “without undue delay” for incidents that meet the EU AI Act threshold [12]; Legal owns the notification path.
5. **Cybersecurity of model weights and infrastructure** — where the organization fine-tunes or hosts foundation models, adequate cybersecurity per the GPAI obligations and Anthropic RSP-analogous internal standards [66].
6. **Bias monitoring and mitigation** — Microsoft RAI Fairness goals [22]; ATLAS “harmful autonomous behavior” checks [21].
7. **Transparency to natural persons (Art. 50(1))** — where an agent interacts directly with a natural person and that interaction is reasonably likely (the statutory scope, per STD S4.5), it discloses that it is an AI system and the **disclosed principal** per STD H8 (the legal entity or person on whose behalf it acts) at first contact and at each new interaction; the disclosure is a fixed string in the harness manifest (HRN-09), not model output, and its presence is a Gate 2 check. As a control exceeding the Art. 50(1) floor (mirroring the Art. 4 literacy treatment), the organization extends the disclosure to employee-facing agents and to non-high-risk agents. The Commission’s Art. 50 Guidelines (final 20 July 2026) and the Code of Practice (adequacy July 2026) are the reference; the Code is not a safe harbor. Marking of synthetic content under Art. 50(2) applies from 2 August 2026 with a grace period to 2 December 2026 for systems already on the market.

In the United States, Colorado SB 26-189 [73] (effective 1 January 2027) imposes no impact-assessment duty — the AISIA is a CRISP-AG and ISO/IEC 42005 requirement, not Colorado’s — and “organize or present information for human review” is excluded from its scope.

## 8. Industry overlay: commercial real estate (illustrative)

> **Illustrative overlay.** This section shows how one industry’s data reshapes the harness defaults, using commercial real estate as the example. The agents and register rows are illustrative; they describe no particular organization’s portfolio.

Commercial real estate work generates data with characteristics that reshape harness defaults:

- **Tenant, occupier, borrower, and counterparty PII** flows across the parties to commercial real estate work — agents, purchasers, vendors, borrowers, lenders, architects, engineers, surveyors, developers, landlords, tenants and financial institutions — and can include PEP/KYC screening that may surface criminal convictions, political activity or religious affiliation. These categories are Sensitive Personal Information under multiple regimes; agents that touch them require DPO signoff (§2), HRN-01 deny lists on their storage, and the high-risk profile of §7 when they influence access decisions.
- **Building-security-relevant data.** Property operations generate CCTV imagery and building-access records. Agents that read these systems are within an EU AI Act biometrics-adjacent scope; Annex III applies to biometric categorization and identification. Access is denied by default and allowed only with explicit AI Risk Officer signoff.
- **Valuation comparables and confidential lease terms.** Even where they are not personal data, these are the trade secrets of the organization’s clients, and their unlawful disclosure is business-ending. HRN-01 must scope the retrieval indexes an agent can read to the deal team; HRN-06 must log every read; HRN-07 must alert on cross-team access.
- **Cross-border data flows.** A multinational operates in many jurisdictions. Agent architectures must respect the EU AI Act, GDPR and UK GDPR, PIPEDA, LGPD, PDPA-SG, DPDP-India, PIPL-China and UAE PDPL. Region-scoped model endpoints and region-scoped retrieval indexes are the default; global endpoints require Gate 0 DPO signoff and a DPIA/TIA.
- **Illustrative business-line agents.** Five illustrative agents show how the overlay applies; §8.1 registers them.
  - *Deal-abstraction agent* — internal-only, LLM06- and LLM02-heavy; HRN-01 scopes retrieval to the deal room; classified high-risk where outputs feed underwriting.
  - *Leasing chat agent for tenant reps* — customer-facing, LLM01- and LLM09-heavy; escalation-to-human required; not high-risk while it only surfaces market comps.
  - *Valuation support agent* — outputs feed regulated valuation reports; classified high-risk; MEASURE with paired human-valuer benchmarks.
  - *Facilities operations agent* — touches building systems and access; **prohibits** any tool call that changes physical-security state without a named human approver; Annex III critical-infrastructure category applies.
  - *Portfolio-analytics agent* — bulk client data across geographies; cross-border overlay is decisive.

### 8.1 Use-case register (illustrative)

The Use-Case Register is the AI Risk Officer’s operational artifact: every production agent has a row, and the row is refreshed at each quarterly re-evaluation (Gate 4). An illustrative initial portfolio for a commercial real estate organization:

| Agent | Owner business line | EU AI Act tier | Primary GAI risks (NIST AI 600-1) | Load-bearing HRN controls | Human-oversight posture |
|---|---|---|---|---|---|
| Deal abstraction | Transaction advisory | High-risk where outputs feed underwriting; otherwise Limited | Confabulation; Data Privacy; Information Security; Intellectual Property | HRN-01 (deal-room retrieval scope), HRN-03, HRN-05, HRN-06 | Deal-team reviewer on every abstract before it leaves the deal room |
| Leasing chat for tenant reps | Leasing | Limited (customer-facing chat surfacing market comps) | Confabulation; Information Integrity; Harmful Bias | HRN-01, HRN-03, HRN-05, HRN-04 (customer-facing rate limits) | Escalation-to-human path required; no autonomous commitments |
| Valuation support | Valuation | High-risk (feeds regulated valuation reports) | Confabulation; Information Integrity; Harmful Bias; Intellectual Property | HRN-01, HRN-05, HRN-06, HRN-10 (traceable to input evidence) | Named human valuer signs every deliverable; paired human-valuer eval benchmarks (Gate 3); RICS “Responsible use of artificial intelligence in surveying practice” (mandatory 9 March 2026) [74] and ASB Advisory Opinion 41 (23 April 2026) — responsibility remains with the appraiser |
| Facilities operations | Property and facilities management | High-risk under Annex III §2 (critical infrastructure) for any physical-security-state change | Information Security; Data Privacy; Human-AI Configuration; Dangerous Content | HRN-01 (deny-by-default on control systems), HRN-03, HRN-04 (unattended profile prohibited for state-changing calls), HRN-06 | Named human approver required for every physical-security-state change; on-call rotation |
| Portfolio analytics | Portfolio services | High-risk where analytics inform occupier hiring or access decisions; otherwise Limited | Data Privacy; Harmful Bias; Value Chain and Component Integration | HRN-01 (region-scoped retrieval), HRN-06, HRN-07 (cross-border access alerts), HRN-10 | DPO signoff on cross-border flows; account lead reviews recommendations |

Sources: EU AI Act tier framework and Annex III [12]; the twelve GAI risks [24].

Each row links to the product’s hub H0 and its registry record, which carry the intended-use statement, the AISIA (CRISP-AG), the eval suite and the incident runbook required by Gates 0–4.

Copilot Studio agents and Microsoft 365 Copilot agents are within the register’s scope as vendor-configured agents (VCS VC-06): each has a row with owner business line, tier, load-bearing controls per the configured-agent profile, human-oversight posture and the configured HRN-12 limit.

## 9. Vendor posture and the Approved AI Service Register

The **Approved AI Service Register** lists the vendor services approved for agentic use, with each service’s posture (approved, with conditions, pilot or prohibited), approved and prohibited uses, equivalence profile, Vendor Service Profile link, exit path and last AIGB review. VCS §4 (VC-04) defines the register and VCS §5 supplies its initial rows; the Vendor Control Owner (§2) maintains it. No agent consumes a vendor service without a register row (Gate 0, §3.1). This section records the **technical posture** of each stack that the §4 equivalents assume, as of 19 September 2026; a change to any row is a Vendor Change Register entry (VCS VC-05) and a §11 review trigger.

**Anthropic (direct).** The posture is Claude for Enterprise with SSO, domain capture, RBAC and managed settings, and Claude Code managed settings delivered per surface (server-managed for claude.ai-authenticated sessions; MDM or `/etc/claude-code/managed-settings.json` for API-key and gateway sessions; Cowork sessions never fetch server-managed settings), with the Managed Runner Baseline per SEC §6 (MRB-1). Responsible Scaling Policy **v3.4** (effective 8 July 2026) is the reference this specification adopts for model-selection posture; the RSP itself does not address customer model selection. **Covered Models** (Fable 5/5.1, Mythos 5/5.1) carry a 30-day retention requirement, and Zero Data Retention is unavailable for them unless authorized — including on Databricks FMAPI, where Anthropic is a limited sub-processor for safety retention; the DPO’s Gate 0 signoff records these terms.

For data residency, `inference_geo` is `global` or `us` (US at 1.1× the price, on models ≥ 4.6); there is no EU pin. For sampling, a non-default `temperature`, `top_p` or `top_k` returns HTTP 400 on Opus 4.7 and later, Sonnet 5, Opus 4.8, Opus 5 and the Fable models (Haiku 4.5 still accepts them); determinism comes from prompt design and repeated sampling. For model retirement, the published policy gives at least 60 days’ notice [75] (not a Commercial Terms clause); terms change on 30 days’ notice; there is no legacy-access right; and six identifiers were retired between February and August 2026. **Claude Managed Agents** (beta; header `managed-agents-2026-04-01`; Anthropic-managed or self-hosted sandbox; server-side event history) MAY be piloted for AGENT-DIRECTED rows only, in a self-hosted sandbox environment, with its event history ingested into HRN-06 ledgers; GA is required before HITL-REQUIRED use.

**OpenAI (reference posture).** API use relies on the default no-training posture [76]; agents processing Sensitive Personal Information apply for Modified Abuse Monitoring or Zero Data Retention. **The Assistants API was shut down on 26 August 2026** (announced 26 August 2025); the Responses and Conversations APIs are the only permitted surfaces. The Agents SDK supplies tool guardrails (HRN-03) and blocking input guardrails (HRN-02). Codex runs in `read-only` or `workspace-write` sandbox mode with network access off by default and an enterprise-managed `requirements.toml` (approval policy, inline hooks, `allow_managed_hooks_only`). Deprecation notice [77] is at least 6 months for GA models and 3 months for specialized variants, but as little as 2 weeks for preview models; retirement of the GPT-5/o3 family was announced on 11 June 2026 (shutdown 11 December 2026).

**Google (reference posture).** **Gemini Enterprise Agent Platform** (announced 22 April 2026 as the evolution of Vertex AI) provides Agent Engine as the managed runtime (Sessions, Memory Bank, Example Store, Evaluation Service, sandboxed code execution, CMEK, VPC Service Controls). ADK supplies Runner-level **Plugins** for guardrails (`before_tool_callback` blocks by returning a synthetic result), and `ApiRegistry` and Apigee provide tool governance. The posture aligns with Google’s Secure AI Framework (SAIF), including its agent controls (Agent User Control, Agent Permissions, Agent Observability) and the Output Validation and Sanitization control it applies to agent risks [78]. Auto-updated Gemini aliases are pinned off for production (VCS VC-05); the Gemini 2.5 family is discontinued no earlier than 16 October 2026 [79].

**Microsoft.** **Microsoft Foundry Agent Service** is the enterprise runtime (per-agent Entra identity; BYO VNet with VM-isolated session sandboxes; content filters including cross-prompt-injection; Application Insights/OTel tracing). **Microsoft Agent Framework** (.NET and Python GA) [80] is the approved orchestration framework, with function-calling middleware (`FunctionInvocationContext.Terminate`) as the HRN-03 point; **Semantic Kernel and AutoGen are legacy — no new builds**; existing code follows Microsoft’s migration guides within the VCS lifecycle window. **Foundry Control Plane is preview** — evidence, not control, until GA.

**Microsoft Agent 365** (GA 1 May 2026; in M365 E7 or US$15/user/month) is the control plane and unified registry for Copilot Studio and Microsoft 365 Copilot agents; Entra Agent ID reached GA in April 2026 [81]. Retirement of the legacy agent-registry Graph API began on 15 June 2026 (MC1297981), so re-registration is a completed-migration check, not a future task (SEC-17). Copilot Studio governance is tenant DLP over actions, connectors, skills, HTTP requests and publication channels, with Purview maker audit logs [82]. Under the Foundry model lifecycle [83], notice is 60 days for GA models and 30 days for preview models; the lifecycle is 18 months for Microsoft and OpenAI models and **12 months for Anthropic, DeepSeek, Fireworks and Mistral models**; retired endpoints return 410 Gone; and retirement dates are readable from the Models API.

**Databricks.** **Unity Gateway** (GA 4 August 2026; API, CLI and Terraform GA 16 September 2026) [84] is the governance plane for model, model-provider, MCP and agent services, with service policies, rate limits, budgets, payload logging and a unified OTel trace table (beta). Agent Bricks and the Mosaic AI Agent Framework are the runtime; MLflow 3 serves evaluation and tracing; Unity Catalog is the permission plane, with **agent skills as a first-class Unity Catalog securable (28 August 2026)**; and Declarative Automation Bundles handle distribution. The partner-model lifecycle diverges from Anthropic’s (deprecation announced ≥ 3 months ahead [85]; `databricks-claude-sonnet-4` retires 9 October 2026, successor `databricks-claude-sonnet-4-6`; Opus 4.1 still listed after Anthropic’s 5 August 2026 retirement) and is tracked per channel in the Vendor Change Register. “Claude enterprise subscription support” on Unity Gateway (6 August 2026) is the second Anthropic consumption plane.

**Cross-vendor tool integration standard: MCP.** All internal tool integrations SHALL expose an MCP server conforming to the 2026-07-28 revision of the Model Context Protocol (or the later current revision): stateless requests (no protocol-level sessions or `Mcp-Session-Id`; no `initialize` handshake — protocol version and client capabilities travel in `_meta`), `server/discover` implemented, authorization via **Client ID Metadata Documents** with issuer validation (Dynamic Client Registration is deprecated), and `traceparent`/`tracestate`/`baggage` propagated in `_meta` (HRN-10) [42]. New servers SHALL NOT implement the deprecated Roots, Sampling or Logging features (use OpenTelemetry in place of Logging). Direct in-process function calling is permitted only where MCP is technically inadequate and the exception is approved. MCP servers an agent may reach are register entries (VCS VC-04) on the allowlist per SEC §5 (SEC-23), and their version and tool-description hash are pinned in the AgBOM per SEC §5 (SEC-19).

## 10. Adoption roadmap

- **Days 0–30.** Stand up the AIGB; ratify this specification; freeze the vendor list; publish the curated harness (HRN-09) with managed settings; begin the ISO/IEC 42001 gap analysis.
- **Days 30–90.** Cut over any existing agents to the twelve controls; deploy OTel and the ledgers (HRN-06/07); launch the first business-line agent through all five gates; run the initial OWASP and ATLAS red team.
- **Days 90–180.** Launch the second wave of business-line agents; complete the first quarterly re-evaluation; publish public model cards for customer-facing agents; complete the EU AI Act tier determination for the full agent portfolio; complete a DPIA/TIA for every cross-border agent.
- **Days 180–365.** Conduct the ISO/IEC 42001 alignment review (certification is a separate AIGB decision); formalize the serious-incident reporting path; run the annual RAI and impact-assessment cycle; begin external assurance conversations with clients. Run the **first substitution drill**: one production agent is moved to its named substitute at one tier (VCS §4, VC-08) and timed, with the S2.2 substitution suite (VCS VC-05) as the pass condition and the drill’s ledger rows as evidence. The drill demonstrates that the agent’s data, ledgers and evaluation artifacts are **removed from the exiting service and transferred integrally** to the substitute, in the sense of Regulation (EU) 2022/2554 (DORA) Art. 28(8) [86] (unverified); that wording is adopted as a reference, and the organization need not itself be in DORA’s scope. The drill is repeated annually, with results reported in the concentration report (VCS VC-08).

## 11. Change control

- This specification is versioned under change control. Every change is a pull request reviewed by two AIGB members; a change to §4 (the twelve controls) or §7 (high-risk obligations) additionally requires the AI Risk Officer’s signoff.
- The AIGB reviews the specification quarterly against changes in NIST AI RMF, ISO/IEC 42001, EU AI Act guidance, OWASP LLM Top 10 and Agentic Top 10, MITRE ATLAS, and the OWASP Agent Control Standard. Vendor changes are not held for the quarter: they enter the **Vendor Change Register** per VCS §4 (VC-05). The Vendor Control Owner captures every vendor announcement affecting a registered service (deprecation, retirement, meter, price, data terms, regional availability) within 5 working days, recording the effective date, the affected Vendor Service Profiles, pins and agents, the decision and the owner. Entries with an effective date within 90 days are reported to the AIGB **monthly**, and the rest quarterly. An entry that changes a §9 posture row, a §4 equivalent or a cited source URL (References) is a change to this specification under the first bullet.
- A platform-specific profile of this specification, such as the profile for Lite-form Copilot Studio agents (§4), is versioned with it. A change to §4 that alters a Copilot Studio equivalent is reflected in that profile in the same pull request; a change that alters a coverage rating is also a change to VCS Appendix B.
- All exceptions are logged with an expiry date, an owner, and a compensating control.

## 12. Discussion and limitations

### 12.1 Weakest points

- **Tier adjudication needs a legal read.** The high-risk-agent obligations in §7 and the §8.1 Use-Case Register tier assignments read cleanly, but the final EU AI Act Annex III adjudication for each deployment requires a legal read on facts specific to that deployment; this specification proposes the tier per agent but does not substitute for legal signoff.
- **SLO thresholds are starting points.** The SLO thresholds in §5 are enterprise-typical starting points; they should be re-baselined after 90 days of production telemetry per the reference metric `harness_guard_block_rate`.
- **Vendor posture is a snapshot.** The vendor-selection posture in §9 assumes each vendor’s current documented enterprise posture; a material change (e.g., an OpenAI data-controls change) requires re-review.
- **Beta and preview dependencies.** HRN-11 and HRN-12 depend on vendor features that are beta or preview on several stacks (sandbox runtime; Unity Gateway external caps and ABAC; Foundry Control Plane; Managed Agents); their coverage is recorded honestly in the Approved AI Service Register and re-checked quarterly.
- **A gap between papers.** The Gate 0 cost-field requirement of §3.1, which applies from VCS Phase 2, has no matching exit check in the current Agentic Delivery Workflow [6]: its W0-13 covers the Approved AI Service Register and the Vendor Service Profile only. An adopter closes the gap by adding a matching W0 exit check to its own delivery workflow.

### 12.2 The load-bearing assumption

The specification assumes that every Claude Code surface an adopting organization uses loads the Managed Runner Baseline (SEC §6, MRB-1) from a **managed source** — server-managed settings, MDM/OS policy or `managed-settings.json` — and that unattended runs execute inside an HRN-11(b) boundary. If that assumption fails, HRN-01 through HRN-04 revert to advisory and every downstream control weakens. The lock keys `permissions.disableBypassPermissionsMode` and `disableAutoMode` (value: the string `"disable"`) are accepted from any settings file; what makes them policy is delivery from a managed source, together with the managed-only keys `allowManagedPermissionRulesOnly`, `allowManagedHooksOnly`, `allowManagedMcpServersOnly`, `strictPluginOnlyCustomization` and `disableSideloadFlags` (HRN-09).

The assumption is confirmed on day one and at every Gate 2 by running `claude doctor` (or `/status`) on a sample of each surface and checking that the organization policy is reported as loaded from the intended source with no dropped keys; the result is recorded in the AgBOM. Cowork sessions never fetch server-managed settings and gateway-routed sessions skip the remote source, so those surfaces are confirmed against the file or MDM source [28].

### 12.3 What is not yet verified

**Source verification.** Vendor and regulatory statements reflect their sources as of September 2026, and the stack posture in §9 and the framework status in §6.6 reflect them as of 19 September 2026. A statement whose basis is a secondary source rather than the primary text carries “(unverified)”. This applies to the DORA Art. 28(8) wording adopted in §10 [86], which rests on a secondary source rather than the regulation text; and to the behavior of an Anthropic Console **workspace** spend limit at the cap, and to Google Cloud budget and AWS Budgets **actions** as a hard stop, in HRN-12, which rest on secondary sources rather than the vendors’ own documentation.

The following also rest on partial or secondary sources: (a) the ISO/IEC 42001 clause structure (4–10), which is inferred from the standard’s Plan-Do-Check-Act management-system architecture because the publisher’s summary does not give the clause numbering [20]; (b) the Skills claims, which rest on the Agent Skills documentation [19] rather than the launch announcement; (c) the ATF version label “v0.9.1” [71], which is not confirmed on the CSA page; (d) the mitigation guidance of the OWASP Top 10 for Agentic Applications, which rests on the publisher’s summary rather than the full document; and (e) the description of Foundry Control Plane as one of “two control planes”, which comes from a Microsoft community blog post rather than the product documentation.

### 12.4 What an adopter must still verify

An adopting organization needs legal review (in-house AI counsel and external EU AI Act counsel) of the tier determinations proposed in §8 and the penalty exposure in §6.3; DPO review of the cross-border data-flow overlay; and an ISO/IEC 42001 lead-auditor engagement to confirm that this specification is fit for AIMS certification.

## 13. Conclusion

An agent’s instructions tell it what to do; a harness decides what it can do, records what it did, and checks what it claims. This specification makes that layer mandatory and concrete. Twelve controls — permissions evaluated outside the model, a session preflight, an argument-level guard, enforced unattended limits, a claim auditor, tamper-evident ledgers, OpenTelemetry telemetry, versioned skills, one-way distribution, trace correlation, an isolation boundary and a spend governor — are specified once and given an equivalent, or an honestly recorded gap, on each major stack. Five gates ensure that no agent reaches or stays in production without them, and that a control’s state advances from specified to demonstrated only on evidence. The mappings in §6 let one set of controls answer to NIST, ISO/IEC 42001, the EU AI Act, OWASP and MITRE ATLAS at once. The specification’s strength rests on one assumption that it states plainly: that the baseline arrives from a managed source and that unattended runs execute inside a real isolation boundary. Confirming that assumption on every surface is the first task for any adopter.

## Acknowledgements

Research and drafting assistance from Claude (Anthropic); all decisions and claims are the author's.

## How to cite

Reed, D. (2026). *Enterprise Agentic AI Harness Specification* (Version 1.3). Agentic AI Governance in Practice, Part 4. https://drdavidreed.com/papers/agentic-harness-specification/

This paper is licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

## References

1. Reed, D. [*CRISP-AG: An Artifact-Centered Framework for Enterprise Agentic AI Governance*](/papers/crisp-ag/), v3.0. Agentic AI Governance in Practice, Part 1, 2026.
2. Reed, D. [*Agentic PRD Standard*](/papers/agentic-prd-standard/), v3.10.2. Agentic AI Governance in Practice, Part 2, 2026.
3. Reed, D. [*Specification-Driven Design for Agentic Systems*](/papers/specification-driven-design/), v1.0.3. Agentic AI Governance in Practice, Part 3, 2026.
4. Reed, D. [*Agentic Security Specification*](/papers/agentic-security-specification/), v1.0. Agentic AI Governance in Practice, Part 5, 2026.
5. Reed, D. [*Vendor Control Specification*](/papers/vendor-control-specification/), v1.0. Agentic AI Governance in Practice, Part 6, 2026.
6. Reed, D. [*Agentic Delivery Workflow*](/papers/agentic-delivery-workflow/), v1.10. Agentic AI Governance in Practice, Part 7, 2026.
7. Reed, D. [*The Production Harness: Engineering AI Agents You Can Walk Away From*](/harness-engineering/). 2026.
8. Anthropic. [*Claude Code: permissions*](https://code.claude.com/docs/en/permissions).
9. Microsoft Learn. [*Microsoft Foundry Agent Service overview*](https://learn.microsoft.com/en-us/azure/ai-foundry/agents/overview).
10. OWASP GenAI Security Project. [*OWASP Top 10 for LLM Applications 2026*](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/), 3 August 2026.
11. NIST. [*Artificial Intelligence Risk Management Framework (AI RMF 1.0)*](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf), NIST AI 100-1, 2023.
12. European Parliament and Council. [*Regulation (EU) 2024/1689 (Artificial Intelligence Act)*](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R1689).
13. OpenAI. [*Agents guide*](https://platform.openai.com/docs/guides/agents).
14. Anthropic. [*Building effective agents*](https://www.anthropic.com/engineering/building-effective-agents). Engineering blog, 19 December 2024.
15. OpenAI. [*A Practical Guide to Building Agents*](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf).
16. Anthropic. [*Claude Code: hooks reference*](https://code.claude.com/docs/en/hooks).
17. OpenAI. [*OpenAI Agents SDK*](https://openai.github.io/openai-agents-python/).
18. Google. [*Agent Development Kit: plugins*](https://adk.dev/plugins/).
19. Anthropic. [*Agent Skills overview*](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview).
20. ISO/IEC. [*ISO/IEC 42001:2023 — Artificial intelligence management system*](https://www.iso.org/standard/81230.html).
21. MITRE. [*ATLAS — Adversarial Threat Landscape for Artificial-Intelligence Systems*](https://atlas.mitre.org/), data v2026.06 (30 June 2026); [ATLAS data changelog](https://github.com/mitre-atlas/atlas-data/blob/main/CHANGELOG.md).
22. Microsoft. [*Microsoft Responsible AI Standard, v2: General Requirements*](https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/final/en-us/microsoft-brand/documents/Microsoft-Responsible-AI-Standard-General-Requirements.pdf).
23. AI Act Explorer. [*The EU Artificial Intelligence Act*](https://artificialintelligenceact.eu/).
24. NIST. [*Generative Artificial Intelligence Profile*](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf), NIST AI 600-1, 2024.
25. OpenAI. [*Evals guide*](https://platform.openai.com/docs/guides/evals).
26. Anthropic. [*Evaluation tool*](https://docs.claude.com/en/docs/test-and-evaluate/eval-tool). Claude Console documentation.
27. Google Cloud. [*Vertex AI Agent Engine overview*](https://cloud.google.com/vertex-ai/generative-ai/docs/agent-engine/overview).
28. Anthropic. [*Claude Code: deploy managed settings*](https://code.claude.com/docs/en/managed-settings).
29. OpenAI. [*Agents SDK: guardrails*](https://openai.github.io/openai-agents-python/guardrails/).
30. Databricks. [*AI governance with Unity Gateway*](https://docs.databricks.com/aws/en/ai-gateway/).
31. Shi, T., He, J., Wang, Z., Li, H., Wu, L., Guo, W., and Song, D. [*Progent: Securing AI Agents with Privilege Control*](https://arxiv.org/abs/2504.11703). arXiv:2504.11703, v3, 14 May 2026; v1 titled “Programmable Privilege Control for LLM Agents”.
32. Wang, H., Poskitt, C. M., and Sun, J. [*AgentSpec: Customizable Runtime Enforcement for Safe and Reliable LLM Agents*](https://arxiv.org/abs/2503.18666). arXiv:2503.18666, 2025; ICSE 2026.
33. Chen, Z., Kang, M., and Li, B. [*ShieldAgent: Shielding Agents via Verifiable Safety Policy Reasoning*](https://arxiv.org/abs/2503.22738). arXiv:2503.22738, 2025.
34. Anthropic. [*Claude Code auto mode*](https://www.anthropic.com/engineering/claude-code-auto-mode). Engineering blog, 25 March 2026.
35. OpenAI. [*Codex: hooks*](https://learn.chatgpt.com/docs/hooks).
36. Microsoft Learn. [*Microsoft Agent Framework: agent middleware*](https://learn.microsoft.com/en-us/agent-framework/user-guide/agents/agent-middleware).
37. Anthropic. [*Claude Code: permission modes*](https://code.claude.com/docs/en/permission-modes).
38. Anthropic. [*Usage Policy*](https://www.anthropic.com/legal/aup).
39. Databricks. [*Build generative AI apps with Agent Framework*](https://docs.databricks.com/aws/en/generative-ai/agent-framework/build-genai-apps).
40. OpenTelemetry. [*Semantic conventions for generative AI*](https://github.com/open-telemetry/semantic-conventions-genai).
41. Anthropic. [*Claude Code: monitoring usage*](https://code.claude.com/docs/en/monitoring-usage).
42. Model Context Protocol. [*Specification 2026-07-28: changelog*](https://modelcontextprotocol.io/specification/2026-07-28/changelog).
43. CycloneDX. [*CycloneDX v1.7 released*](https://cyclonedx.org/news/cyclonedx-v1.7-released/).
44. Anthropic. [*Claude Code: choose a sandbox environment*](https://code.claude.com/docs/en/sandbox-environments).
45. Anthropic. [*Claude Code: configure the sandboxed Bash tool*](https://code.claude.com/docs/en/sandboxing).
46. OpenAI. [*Codex: agent approvals and security*](https://developers.openai.com/codex/agent-approvals-security).
47. Amazon Web Services. [*Amazon Bedrock AgentCore developer guide*](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html).
48. Anthropic. [*Claude Managed Agents: overview*](https://platform.claude.com/docs/en/managed-agents/overview).
49. Gartner. [*Gartner predicts over 40% of agentic AI projects will be canceled by end of 2027*](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027). Press release, 25 June 2025.
50. FinOps Foundation. [*FinOps for AI overview*](https://www.finops.org/wg/finops-for-ai-overview/). Updated 17 February 2026.
51. Anthropic. [*Claude Code: CLI reference*](https://code.claude.com/docs/en/cli-reference).
52. Anthropic. [*Claude Agent SDK: track cost and usage*](https://code.claude.com/docs/en/agent-sdk/cost-tracking).
53. Anthropic. [*Spend Limits API*](https://platform.claude.com/docs/en/manage-claude/spend-limits-api).
54. Anthropic. [*Usage and Cost Admin API*](https://platform.claude.com/docs/en/build-with-claude/usage-cost-api).
55. Amazon Web Services. [*Amazon Bedrock IAM cost allocation*](https://aws.amazon.com/about-aws/whats-new/2026/04/bedrock-iam-cost-allocation). What’s New, 9 April 2026.
56. Microsoft Learn. [*Azure Cost Management: create and manage budgets*](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-acm-create-budgets).
57. Microsoft Learn. [*Foundry Control Plane overview*](https://learn.microsoft.com/en-us/azure/foundry/control-plane/overview).
58. Microsoft Learn. [*Copilot Credits management*](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management). Copilot Studio documentation, 3 August 2026.
59. Databricks. [*Introducing AI spend controls with Unity AI Gateway*](https://www.databricks.com/blog/introducing-ai-spend-controls-unity-ai-gateway). Blog, 23 July 2026.
60. OWASP GenAI Security Project. [*OWASP Top 10 for Agentic Applications 2026*](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/), 9 December 2025.
61. OWASP GenAI Security Project. [*Agent Control Standard (ACS)*](https://genai.owasp.org/resource/agent-control-standard-acs/), v0.1 public preview, 1 September 2026. Also on the [project site](https://agentcontrolstandard.org/).
62. OWASP GenAI Security Project. [*Agentic AI — Threats and Mitigations*](https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/).
63. NIST. [*NIST IR 8596: Cyber AI Profile*](https://csrc.nist.gov/pubs/ir/8596/iprd), initial preliminary draft, 16 December 2025.
64. NIST. [*COSAiS: control overlays for securing AI systems*](https://csrc.nist.gov/projects/cosais).
65. Google. [*Secure AI Framework (SAIF)*](https://saif.google/).
66. Anthropic. [*Responsible Scaling Policy*](https://www.anthropic.com/responsible-scaling-policy), v3.4 (effective 8 July 2026).
67. European Parliament and Council. [*Regulation (EU) 2026/1744 (Digital Omnibus on AI)*](https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng). In force 27 July 2026.
68. AI Act Explorer. [*EU AI Act implementation timeline*](https://artificialintelligenceact.eu/implementation-timeline/).
69. Law & Technology. [*ISO/IEC 42001 and the AI Act: why certification is not (yet) a presumption of conformity*](https://lawandtechnology.eu/en/iso-iec-42001-and-the-ai-act-why-certification-is-not-yet-a-presumption-of-conformity/). lawandtechnology.eu, 4 July 2026.
70. ISO/IEC. [*ISO/IEC 42005:2025 — AI system impact assessment*](https://www.iso.org/standard/44545.html).
71. Cloud Security Alliance. [*Agentic Trust Framework*](https://github.com/massivescale-ai/agentic-trust-framework), v0.9.1 public review draft, 3 April 2026.
72. European Commission. [*Draft Commission guidelines on the classification of high-risk AI systems*](https://digital-strategy.ec.europa.eu/en/library/draft-commission-guidelines-classification-high-risk-ai-systems), 19 May 2026.
73. Finnegan. [*Colorado replaces landmark AI Act: an overview of the new SB 26-189 framework*](https://www.finnegan.com/en/insights/articles/colorado-replaces-landmark-ai-act-an-overview-of-the-new-sb-26-189-framework.html).
74. RICS. [*Responsible use of artificial intelligence in surveying practice*](https://www.rics.org/profession-standards/rics-standards-and-guidance/conduct-competence/responsible-use-of-ai). Mandatory from 9 March 2026.
75. Anthropic. [*Model deprecations*](https://platform.claude.com/docs/en/about-claude/model-deprecations).
76. OpenAI. [*How we use your data*](https://platform.openai.com/docs/guides/your-data).
77. OpenAI. [*Deprecations*](https://developers.openai.com/api/docs/deprecations).
78. Google. [*SAIF: focus on agents*](https://saif.google/focus-on-agents).
79. Google Cloud. [*Model versions and lifecycle*](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/model-versions).
80. Microsoft Learn. [*Microsoft Agent Framework overview*](https://learn.microsoft.com/en-us/agent-framework/overview/agent-framework-overview).
81. Microsoft Learn. [*What are agent identities?*](https://learn.microsoft.com/en-us/entra/agent-id/what-are-agent-identities) Microsoft Entra Agent ID documentation.
82. Microsoft Learn. [*Copilot Studio security and governance*](https://learn.microsoft.com/en-us/microsoft-copilot-studio/security-and-governance).
83. Microsoft Learn. [*Model lifecycle and retirement*](https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/model-lifecycle-retirement). Microsoft Foundry documentation.
84. Databricks. [*Unity Gateway release notes*](https://docs.databricks.com/aws/en/release-notes/unity-gateway/).
85. Databricks. [*Retired models policy*](https://docs.databricks.com/aws/en/machine-learning/retired-models-policy).
86. European Parliament and Council. [*Regulation (EU) 2022/2554 (Digital Operational Resilience Act)*](https://eur-lex.europa.eu/eli/reg/2022/2554/oj/eng), Art. 28(8). (unverified)
87. Ken Huang. [*Agentic AI Threat Modeling Framework: MAESTRO*](https://cloudsecurityalliance.org/blog/2025/02/06/agentic-ai-threat-modeling-framework-maestro). Cloud Security Alliance blog, 6 February 2025.

## Appendix A — Prescribed hooks inventory (reference implementation)

| Vendor event | Reference hook | Purpose | Control | ACS hook point |
|---|---|---|---|---|
| `SessionStart` | `hooks/session-preflight.sh` | Environment, lessons, mode, boundary and managed-source preflight; known-denied canary | HRN-02 | Lifecycle |
| `PreToolUse` (Bash) | `hooks/pre-bash-guard.sh` | Argument-level guard for shell (fail-closed) | HRN-03 | Tool call / Code execution |
| `PreToolUse` (Bash, Edit, Write, MultiEdit) | `hooks/unattended-guard.sh` | Unattended-profile limits; monotone privilege | HRN-04 | Tool call |
| `PostToolUse` (`*`) | `hooks/action-log.sh` | Action ledger append, every tool | HRN-06 | Tool response |
| `PostToolUseFailure` (`*`) | `hooks/action-log.sh` | Failed-call ledger append; feeds `harness_tool_success_rate` | HRN-06 | Tool response |
| `PermissionRequest` | `hooks/permission-audit.sh` | Audit record of every prompt-equivalent; deny via the `decision` object (exit 2 is not honored for this event) | HRN-06 | Tool call |
| `SubagentStart` | `hooks/trace-propagate.sh` | Re-export `TRACEPARENT` and `HARNESS_TRACE_ID` to the subagent | HRN-10 | Sub-agent invocation |
| `ConfigChange` (`policy_settings`, `user_settings`, `project_settings`, `local_settings`, `skills`) | `hooks/config-change-log.sh` | Ledger and alert on settings change mid-session; cannot block by itself — the unattended runner aborts on the event | HRN-09 | Lifecycle |
| `Stop` | `hooks/claim-auditor.sh` (timeout 90 s) | Turn-end claim verification; own decision row every invocation | HRN-05 | Output |
| `StopFailure` | `hooks/turn-failure-log.sh` | Failure ledger append | HRN-06 | Lifecycle |
| `SubagentStop` | `hooks/subagent-claim-check.sh` | Subagent claim verification (a `Stop` hook in subagent frontmatter is converted to `SubagentStop`) | HRN-05, HRN-10 | Sub-agent invocation |
| `SessionEnd` | `hooks/session-metrics.sh` | Session metrics rollup | HRN-07 | Lifecycle |

The Claude Code hook lifecycle has **33 events** in the September 2026 documentation (`SessionStart`, `Setup`, `UserPromptSubmit`, `UserPromptExpansion`, `PreToolUse`, `PermissionRequest`, `PermissionDenied`, `PostToolUse`, `PostToolUseFailure`, `PostToolBatch`, `Notification`, `MessageDisplay`, `SubagentStart`, `SubagentStop`, `TaskCreated`, `TaskCompleted`, `Stop`, `StopFailure`, `TeammateIdle`, `InstructionsLoaded`, `ConfigChange`, `CwdChanged`, `DirectoryAdded`, `FileChanged`, `WorktreeCreate`, `WorktreeRemove`, `PreCompact`, `PostCompact`, `PreModelSwitch`, `PostModelSwitch`, `Elicitation`, `ElicitationResult`, `SessionEnd`) [16]; hook types are `command`, `http`, `mcp_tool`, `prompt` and `agent`; all matching hooks run in parallel; default timeouts are 600 s (`command`/`http`/`mcp_tool`), 30 s (`prompt`) and 60 s (`agent`).

The twelve bindings above are the enterprise baseline. The following are recommended for high-risk agents (§7): `PermissionDenied` (auto-mode denials, where `auto` is layered); `PreCompact` (matcher `manual` or `auto`), which snapshots the context before compaction; and `InstructionsLoaded`, which records which `CLAUDE.md` and `.claude/rules/*.md` files were in force (evidence for HRN-10 and LLM08:2026). Hooks are delivered from managed settings (`allowManagedHooksOnly`) and every guard hook is fail-closed (HRN-03). The ACS column maps each binding to the OWASP Agent Control Standard v0.1 hook points (Input, Output, Tool call, Tool response, Memory operations, Code execution, Sub-agent invocation, Lifecycle events) for portability; ACS is vocabulary, not enforcement. Codex has direct equivalents for every baseline event except two: `StopFailure`, for which Codex has only an `Interrupt` event (HRN-05), and `ConfigChange`.

## Appendix B — Prescribed ledgers

| Ledger file | Written by | Retention | Tamper-evidence |
|---|---|---|---|
| `harness-metrics.jsonl` | `session-metrics.sh` (`SessionEnd`) | At least the longest applicable period (note 1) | hash-chained (RFC 9162 structure) with off-host anchor and verifier per SEC §5 (SEC-04); AgBOM hash of the run referenced (SEC-16) |
| `harness-failures.jsonl` | `turn-failure-log.sh` (`StopFailure`) | as above | as above |
| `harness-actions.jsonl` | `action-log.sh` (`PostToolUse *`, `PostToolUseFailure *`) | as above | as above |
| `harness-guard-health.jsonl` | `pre-bash-guard.sh`, `unattended-guard.sh` | as above | as above |
| `harness-catch-ledger.jsonl` | `claim-auditor.sh`, `subagent-claim-check.sh` | as above | as above |
| `harness-permissions.jsonl` | `permission-audit.sh` (`PermissionRequest`) | as above | as above |
| `harness-config-change.jsonl` | `config-change-log.sh` (`ConfigChange`) | as above | as above |
| `qa-ledger.jsonl` | `qa-capture` skill | as above | as above |
| Unity Gateway unified trace table | Unity Gateway (Databricks-native agents) | as above | Delta hash-chain job mirrored to write-once storage; per SEC-04 |

**Notes to the ledger table.**

1. **Retention.** At least the longest of the applicable statutory limitation period; EU AI Act post-market record retention for high-risk agents; the Colorado SB 26-189 three-year record duty, where applicable; and the internal audit cycle. Lite-form products may adopt a shorter floor where statute permits (Workflow §7.2).

Ledger enforcement is the three-layer rule of HRN-06: `Edit(<ledger>)` deny rules in managed settings (a `Write(path)` rule is never consulted and an `Edit` deny does not bind subprocesses); `sandbox.filesystem.denyWrite` on the ledger directory (HRN-11); off-host write-once storage with hash-chained tamper-evidence per SEC §5 (SEC-04).

## Appendix C — Glossary

Terms owned by this paper are defined here. Terms owned by another paper in the series are cited, not redefined; the owning paper defines them.

### Terms owned by this paper

- **Evidence ledger** (HRN-05) *(also: claim auditor)* — the record a completion claim must carry: implemented, compiled and ran, scenarios tested, not tested, domain validity, production readiness.
- **Harness** (§1.4) — the out-of-model enforcement, telemetry, audit, isolation and spend-governance layer around an agent: hooks, permission rules, guards, evaluators, ledgers, the isolation boundary and the spend governor.
- **Harness manifest** (§4, HRN-09) *(also: manifest)* — the versioned, one-way-distributed record of what a harness ships — permission rules, hooks, skills, MCP servers, managed settings and the pinned tool versions — curated by the Harness Engineer and consumed unchanged; the per-run bill of materials extends it (SEC AgBOM).
- **HRN controls** (§4) *(also: HRN-01–12)* — the twelve mandatory harness controls HRN-01 to HRN-12. HRN-11 is OS-level isolation (detail in SEC SEC-10 and MRB-1); HRN-12 is the spend and consumption governor (detail in VCS VC-01 and VC-02).
- **Lifecycle gate** (§3) *(also: Gate 0–4)* — harness Gates 0–4: intent and risk classification; architecture review; harness implementation review; evaluation and red team; deployment and monitoring.
- **Skill** (§1.4, HRN-08) — a versioned, fixture-tested capability module with metadata, instructions, and executable assets.
- **Spend governor** (HRN-12) — the out-of-model monthly budget, alert threshold and hard cap per agent and per vendor service, enforced per run and per period; content specified in VCS §4 (VC-01, VC-02).
- **Unattended run** (§1.4, HRN-04) *(also: unattended profile, HRN-04)* — an agent invocation without an interactive human reviewer for each tool call; runs in `dontAsk` mode with an explicit allowed-tool list inside an isolation boundary (HRN-11), under monotone privilege.

### Terms owned elsewhere and cited here

- **Adaptive injection evaluation** → Agentic Security Specification, §5 (SEC-14) and §7 — cited at §3.4.
- **Agent bill of materials** → Agentic Security Specification, §5 (SEC-16) — cited at HRN-09 and §6.1.
- **Agent Control Standard** → external source, OWASP ACS v0.1 public preview (1 September 2026) — cited at §6.1 and Appendix A.
- **Approved AI Service Register** → Vendor Control Specification, §4 (VC-04) and §5 — cited at §9.
- **Binding** → Specification-Driven Design, §A4 (Principle 11) — cited at §3.4.
- **Configured-agent profile** → Vendor Control Specification, §4 (VC-06) and Appendix B — cited at §4.
- **Containment** → CRISP-AG, §5.5 (AIR field) — cited at §5 and §6.1.
- **Control state** → Agentic Security Specification, §3 — cited at §3.1.
- **DAS position** → CRISP-AG, §5.1 — cited at HRN-04 and HRN-11.
- **Demotion** → CRISP-AG, §5.1.3 — cited at HRN-12 and §6.1.
- **Disclosed principal** → Agentic PRD Standard, H8 — cited at §7.
- **Exit path** → Vendor Control Specification, §4 (VC-08) — cited at §10.
- **Failure mode (of a mechanism)** → Specification-Driven Design, §A2 (mechanism table) — cited at HRN-03.
- **Isolation boundary** → Agentic Security Specification, §5 (SEC-10); the control is HRN-11 in this paper — cited at HRN-11.
- **Managed Runner Baseline** → Agentic Security Specification, §6 — cited at HRN-09 and HRN-11.
- **Metering unit** → Vendor Control Specification, §4 (VC-01) — cited at HRN-12.
- **MITRE ATLAS (agentic)** → external source, ATLAS data v2026.06 (30 June 2026) — cited at §6.4.
- **Model tier** → Vendor Control Specification, §4 (VC-02) — cited at §3.2.
- **Model-based gate** → Specification-Driven Design, §A2 (mechanism table) — cited at HRN-03.
- **Monotone privilege** → Specification-Driven Design, §B3.3 (PROTO-INV-07; form: §A3 layer 3) — cited at HRN-04.
- **OWASP ASI** → external source, OWASP Top 10 for Agentic Applications 2026 (published 9 December 2025) — cited at §3.4 and §6.1.
- **OWASP LLM Top 10 2026** → external source, OWASP GenAI LLM Top 10 2026 (published 3 August 2026) — cited at §3.4 and §6.1.
- **OWASP MCP Top 10** → external source, OWASP Foundation MCP Top 10 (beta project) — cited at §6.1.
- **Roles (eleven)** → Agentic Delivery Workflow, §4 and Appendix A — cited at §2.
- **Standards watch** → Agentic PRD Standard, S4.7 — cited at §6.6.
- **Substitution suite** → Vendor Control Specification, §4 (VC-05) — cited at §10.
- **Tamper-evidence** → Agentic Security Specification, §5 (SEC-04) — cited at HRN-06.
- **Tool-description integrity** → Agentic Security Specification, §5 (SEC-19) — cited at HRN-08.
- **Vendor Change Register** → Vendor Control Specification, §4 (VC-05) — cited at §11.
- **Vendor Control Owner** → Vendor Control Specification, §6 — cited at §2.
- **Vendor Service Profile** → Vendor Control Specification, §4 (VC-03), §7 and Appendix A — cited at §2 and §9.
- **Vendor-configured agent** → Vendor Control Specification, §4 (VC-06) — cited at §1.4 and §4.
- **W0 packet** → Agentic Delivery Workflow, W0 — cited at §3.1.

<nav class="series-pager" aria-label="Series navigation"><a href="/papers/specification-driven-design/">← Part 3: Specification-Driven Design</a><a href="/papers/">All papers in the series</a><a href="/papers/agentic-security-specification/">Part 5: Security Specification →</a></nav>
