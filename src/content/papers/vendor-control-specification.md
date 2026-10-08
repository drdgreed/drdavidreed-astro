---
title: "Vendor Control Specification"
subtitle: "Nine controls for the vendor services that enterprise agentic AI runs on"
series: "Agentic AI Governance in Practice"
seriesPart: 6
code: "VCS"
version: "1.0"
date: "2026-10"
author: "David Reed, PhD"
description: "Nine controls, VC-01 to VC-09, that make the vendor services behind enterprise agentic AI governable: spend caps where the vendor can refuse, model tiering, service profiles, an approved-service register, lifecycle change, configured-agent ceilings, exit and contracts."
keywords: ["agentic AI", "AI governance", "vendor management", "spend governor", "FinOps for AI", "model lifecycle", "configured agents", "EU Data Act", "third-party risk"]
readTime: 100
---

# Vendor Control Specification

<p class="paper-dek">Nine controls for the vendor services that enterprise agentic AI runs on</p>

<p class="paper-meta"><strong>Version 1.0</strong> · October 2026 · David Reed, PhD</p>

<nav class="series-nav" aria-label="Series"><p><strong>Agentic AI Governance in Practice</strong> — Part&nbsp;6&nbsp;of&nbsp;7</p><ol><li><a href="/papers/crisp-ag/">CRISP-AG</a></li><li><a href="/papers/agentic-prd-standard/">Agentic PRD Standard</a></li><li><a href="/papers/specification-driven-design/">Specification-Driven Design</a></li><li><a href="/papers/agentic-harness-specification/">Harness Specification</a></li><li><a href="/papers/agentic-security-specification/">Security Specification</a></li><li><span class="current" aria-current="page">Vendor Control Specification</span></li><li><a href="/papers/agentic-delivery-workflow/">Agentic Delivery Workflow</a></li></ol></nav>

## Abstract

Most enterprises buy, rather than build, the layers an agentic system runs on: the foundation model, the agent runtime, the gateway, the retrieval service and the meter that bills for all of them. Governance frameworks for agentic AI are strong on delegation authority, identity, evaluation and audit, and thin on the commercial and operational relationship with those vendors. A recurring failure pattern shows the cost of that gap. Agents configured on vendor agent-building platforms are deployed with no spend cap, no alerting and no model tiering, and consumption accrues unchecked while the controls that would stop it sit unused in the vendor's admin plane.

This paper presents the Vendor Control Specification. It makes five commitments checkable through nine controls, VC-01 to VC-09: a consumption and spend governor enforced in the layer that can actually refuse; a default to the smallest sufficient model tier; a Vendor Service Profile that records each service's terms; an Approved AI Service Register; a Vendor Change Register with a named successor for every pinned model; configured-agent profiles that turn missing vendor controls into autonomy ceilings; data-use and residency terms; a priced exit with concentration reporting; and a contract checklist that separates published policy from contractual commitment. Every enforcement claim carries a dated coverage grade per platform, and the controls are adopted in phases that observe before they enforce.

**Keywords:** agentic AI; AI governance; vendor management; spend governor; FinOps for AI; model lifecycle; configured agents; EU Data Act; third-party risk

## Key contributions

- **Enforce where the vendor can refuse.** The spend governor (VC-01, realized as HRN-12) is configured in the layer that can stop requests. Where a vendor plane can only alert, the specification says *alert-only* and records the consequence; it never describes an alert as a cap.
- **One record per vendor service.** The Vendor Service Profile gives each service's commercial, lifecycle, data-protection, contract and exit terms one schema, one owner and a refresh cadence; the Approved AI Service Register makes the list of permitted services a governed artifact.
- **Missing controls become autonomy ceilings.** Configured-agent profiles for Copilot Studio, Microsoft 365 Copilot, Salesforce Agentforce and ServiceNow Now Assist grade each harness control's coverage. A platform with no enforceable per-agent spend cap holds no agent above HITL-REQUIRED.
- **Vendor change is governed change.** Every vendor announcement is captured within five working days; every pinned model has a named successor and a substitution suite run before the notice window closes, and lifecycle is tracked per channel.
- **Policy is not contract.** A fourteen-clause checklist separates what vendors publish from what they commit to, with the EU AI Act Article 25(4) information set and the EU Data Act switching terms as floors.
- **Observe, then alert, then enforce.** A phased rollout sets every threshold from telemetry before any control is enforced, and logs a time-boxed exception for any product that cannot yet comply.

<!-- toc -->
## Contents

- [1. Introduction](#1-introduction)
- [2. Definitions](#2-definitions)
- [3. Placement principles](#3-placement-principles)
- [4. The nine controls](#4-the-nine-controls)
  - [VC-01 — Consumption and spend governor (realized as HRN-12)](#vc-01--consumption-and-spend-governor-realized-as-hrn-12)
  - [VC-02 — Model tiering and effort policy](#vc-02--model-tiering-and-effort-policy)
  - [VC-03 — Vendor Service Profile](#vc-03--vendor-service-profile)
  - [VC-04 — Approved AI Service Register](#vc-04--approved-ai-service-register)
  - [VC-05 — Vendor change and model lifecycle management](#vc-05--vendor-change-and-model-lifecycle-management)
  - [VC-06 — Vendor-configured agent profile](#vc-06--vendor-configured-agent-profile)
  - [VC-07 — Data-use, retention, residency and sub-processor terms](#vc-07--data-use-retention-residency-and-sub-processor-terms)
  - [VC-08 — Exit, portability and concentration](#vc-08--exit-portability-and-concentration)
  - [VC-09 — Contract clauses and governance seats](#vc-09--contract-clauses-and-governance-seats)
- [5. Approved AI Service Register — illustrative initial rows](#5-approved-ai-service-register--illustrative-initial-rows)
- [6. Roles and governance](#6-roles-and-governance)
- [7. Vendor Service Profile schema](#7-vendor-service-profile-schema)
- [8. Phased rollout](#8-phased-rollout)
- [9. Measures of success](#9-measures-of-success)
- [10. Standards mapping](#10-standards-mapping)
- [11. Risks to the rollout](#11-risks-to-the-rollout)
- [12. Discussion and limitations](#12-discussion-and-limitations)
- [13. Conclusion](#13-conclusion)
- [Acknowledgements](#acknowledgements)
- [How to cite](#how-to-cite)
- [References](#references)
- [Appendix A — Vendor Service Profile: minimum schema](#appendix-a--vendor-service-profile-minimum-schema)
- [Appendix B — Configured-agent equivalence profiles](#appendix-b--configured-agent-equivalence-profiles)
- [Appendix C — Contract clause checklist (VC-09)](#appendix-c--contract-clause-checklist-vc-09)
- [Appendix D — Glossary](#appendix-d--glossary)
<!-- /toc -->

## 1. Introduction

### 1.1 The buy-side problem

Many enterprises buy, rather than build, their technology estates. Every layer an agentic system runs on — the foundation model, the agent runtime, the gateway, the retrieval service and the meter that bills for all of them — is supplied by an outside vendor under terms the vendor publishes and can change. The four governing papers of this series — the Agentic PRD Standard [2], CRISP-AG [1], the Harness Specification [4] and Specification-Driven Design [3] — were written for systems an organization builds or materially configures. They are strong on delegation authority, identity, evaluation and audit, and thin on the commercial and operational relationship with the vendors those systems run on.

Vendor control, in this specification, means five things: the organization records the terms of every vendor service it depends on; it engineers the harness to enforce the caps the service offers, in the layer that can actually refuse; it defaults every agent to the smallest sufficient model tier; it treats a vendor's change to any of those terms as a governed change to its own systems; and it keeps a priced exit from every dependency. The nine controls in §4 are those five commitments made checkable.

### 1.2 The reference failure pattern

The failure this specification answers is a general pattern. Agents configured on a vendor's agent-building platform or productivity-suite assistant, and billed on a consumption meter, are deployed without harness engineering: no spend cap, no alerting, no model tiering and no working knowledge of how the vendor meters and enforces consumption. Consumption then accrues unchecked. The resulting cost can be significant, it is avoidable, and none of it is a model failure.

The mechanics are easiest to see on one widely documented pair of surfaces, used here as an illustration because the vendor publishes its meters in detail, not because the pattern is specific to that vendor. The meter facts, from Microsoft's own documentation for Copilot Studio and Microsoft 365 Copilot [7], are these. Copilot Studio's text and generative AI tools bill 1, 15 and 100 Copilot Credits per 10 responses for the basic, standard and premium model tiers (0.1, 1.5 and 10 credits per 1K tokens). A generative answer bills 2 credits, an agent action 5, tenant graph grounding 10, and agent flow actions 13 per 100. The premium tier therefore costs 50 times a single generative answer and approximately 6.7 times the standard model tier. Enforcement on prepaid capacity is triggered when a tenant reaches 125% of its prepaid pool, at which point custom agents are disabled and every subsequent invocation is rejected until capacity is increased or reset. Since 1 September 2025 the common currency for agents has been Copilot Credits, not messages [8].

The meter is also identity- and trigger-sensitive. Every row of Microsoft's billing table carries a third column, "Used by Microsoft 365 Copilot licensed user — No charge". Usage of a Copilot Studio agent by a user licensed for Microsoft 365 Copilot, acting under that user's own USL identity, is included in the license (subject to fair-use limits and, for agent flows, only through the "When an agent calls the flow" trigger). Autonomous triggers, unlicensed users, non-USL identities and agent flows started by other triggers consume credits at the published rates. Who invokes an agent, under which identity and through which trigger is therefore a design variable that changes the bill, and it is governed as one (VC-02, VC-06).

Microsoft 365 Copilot agents are metered on a different plane. Usage of Copilot Chat agents or SharePoint agents by users without a Microsoft 365 Copilot license is billed to an Azure subscription through the "Copilot Studio — $0.01 per message" meter; billing is set up by adding a billing policy in the Microsoft 365 admin center and connecting it to a Copilot service. An administrator can put a budget limit on a billing policy and receive email notifications at percentage milestones. There is no agent-level limit; the only hard stop is deleting or disconnecting the policy, which removes access for every user linked to it [10], [11]. It is easy to treat the two surfaces as one admin plane. They are two, with different cap semantics, and Appendix B profiles them in two columns.

In control terms the failure has three parts. First, there is no consumption governor: nothing outside the agent bounds what it can spend, and a governance set that treats OWASP Unbounded Consumption [75] as quota telemetry with no threshold does not supply one. Second, there is no model tiering: the highest-priced tier is the default for work that in most cases does not need it. Third, there is no awareness of the vendor's terms: the caps the vendor offers are never switched on, and the licensing rules that would zero part of the meter are not known. The controls that would prevent the loss exist in the product.

### 1.3 Scope

In scope is the organization's *use* of vendor services for agentic systems: every model endpoint family, agent runtime, gateway, retrieval service and SaaS agent platform on which a registered agent depends, whether the agent is built by the organization, configured by the organization inside a vendor product, or supplied by the vendor. The controls apply to agents in every CRISP-AG class and at every DAS position, with a reduced record for Class 1.

Three things are out of scope and remain so. Vendor *selection* stays outside the specification set, as CRISP-AG §12 states; this document governs the use of services the organization has chosen and the terms under which it keeps using them, and does not rank vendors or prescribe a multi-provider strategy. Liability allocation stays with General Counsel; the clause checklist in Appendix C records what the organization asks for and whether it obtained it, not what it is liable for. Enterprise-wide FinOps for non-AI cloud spend is not addressed; VC-01 is scoped to agentic and model consumption, and the FinOps Foundation's FinOps for AI practices are used as the reference rather than a new program.

### 1.4 Relationship to the other papers in the series

The Agentic Delivery Workflow [6] §2.2 states the precedence rule: CRISP-AG governs the definition of governance concepts and artifacts; the Standard governs the content and structure of the document set; SDD governs specification form; the Harness Specification governs controls and runtime; the Workflow binds them. A conflict is resolved by editing the non-owning document to cite the owner, never by redefining the concept locally. This specification enters that order as the owner of vendor-use controls and vendor-facing terms (series code VCS), and the other papers cite it by section.

CRISP-AG [1] defines governance artifacts. Its §5.8 (governing vendor-supplied agents) cites this document for consumption, cost and commercial terms and for the DAS ceiling that follows from an unenforceable cap. Its §5.9 is a pointer: it records the Vendor Service Profile's place among the artifacts, its phase and gate and its standards mapping, and states that the profile itself is defined in VCS §4 (VC-03).

The Standard [2] says what a PRD carries: S1.9 cites VSP IDs and register rows; S5.5 carries the budget, threshold, cap and owner and cites HRN-12 and VC-01/VC-02; S4.5 cites VC-07; S4.2 cites VC-09 clause status; S1.8 cites VC-08 for the exit ADR; S4.7 cites VC-05 for the vendor watch. The Harness Specification [4] owns HRN-12 as a control and cites VC-01 for its content; its §9 (vendor posture and the Approved AI Service Register) cites VC-04. SDD [3] owns Principle 11 (pin the binding) and CHG-05 (vendor-initiated change) and cites VC-05 and VC-08. The Workflow [6] binds the gate checks (W0, W2, W4 and W7 exit checks) and lists the Vendor Control Owner as the eleventh role.

This document does not restate a definition owned by another document. Where it uses a term another document owns — DAS position, agent class, AIR, control state, binding — it writes "per CRISP-AG §5.1", "per SEC §3", "per SDD Principle 11", and no more.

### 1.5 How to read this paper

Section 2 defines the terms this specification owns, and §3 states the placement principles that tie it to the rest of the series. Section 4 is the normative core: the nine controls, each with its rule, its verified reasons, an enforcement table per platform with a stated coverage grade, its owner, the evidence each gate requires and its rollout phase. Sections 5 to 7 give the Approved AI Service Register (with illustrative rows), the roles and the Vendor Service Profile schema. Section 8 sets out the phased rollout, §9 the measures of success, §10 the mapping to external standards — NIST AI RMF, ISO/IEC 42001, the EU AI Act and Data Act, OWASP, the CSA AI Controls Matrix, DORA and the FinOps Foundation — and §11 the risks to the rollout. Section 12 covers verification status, vendor facts that are easy to misstate, and the specification's weakest points. The appendices carry the full Vendor Service Profile schema, the configured-agent profiles, the contract clause checklist and a glossary.

Platform facts are dated. Prices, notice periods and admin features change; each enforcement table states the date on which its facts were read (September 2026), and the Vendor Service Profile is where the current value lives. Real platform names are used throughout, because each control depends on what a specific platform can and cannot do.

## 2. Definitions

The terms below are owned by this specification. Other papers in the series cite them rather than redefine them; Appendix D is the glossary.

| Term | Section | Definition |
|---|---|---|
| Vendor Service Profile (VSP) | §4 VC-03; §7; Appendix A | One controlled record per vendor service the organization depends on, in seven blocks: identity, commercial and metering, lifecycle, data protection, contract, exit and control. The record every other vendor control points at. |
| Approved AI Service Register | §4 VC-04; §5 | The governed list of vendor services approved for agentic use, each with a posture, approved and prohibited uses, the equivalence profile that applies and a link to its VSP. Harness Specification §9 cites it. |
| Vendor Change Register | §4 VC-05 | The five-working-day capture of vendor deprecations, retirements, meter and price changes, data-terms changes and availability changes, each with effective date, affected VSPs, pins and agents, decision and owner. |
| Substitution suite | §4 VC-05 | The S2.2 regression suite run against a pinned identifier's named successor before the vendor's notice window closes. |
| Model tier | §4 VC-02 | The declared model class per task class, pinned to an identifier and a successor. The default is the smallest tier that passes the S2 suite at threshold. |
| Metering unit | §4 VC-01 | The unit a vendor bills — tokens, credits, DBUs, messages, assists, seats — and its per-action rates, as recorded in the VSP. |
| Spend governor | §4 VC-01 (as HRN-12) | Owned and defined by the Harness Specification (HRN-12); this document specifies its content — the budget, threshold and cap values and the vendor planes that enforce them — in §4 (VC-01, VC-02). Alias: HRN-12. |
| Vendor-configured agent | §4 VC-06 | An agent the organization configures inside a vendor product (Copilot Studio, Microsoft 365 Copilot, Agent Bricks and the like). Distinct from CRISP-AG's vendor-supplied agent, which the vendor builds. |
| Configured-agent profile | §4 VC-06; Appendix B | The per-platform mapping of HRN-01 to HRN-12 and identity to the vendor's admin plane, with the coverage of each row and the DAS ceiling that follows from the gaps. |
| Exit path | §4 VC-08 | Per dependency: the binding abstraction, the export mechanism, the named substitute per tier, the estimated time to switch and the date and duration of the last drill. |
| Concentration report | §4 VC-08 | The annual share of production agents and of spend per model vendor and per underlying cloud provider, reported to the AIGB. |
| Vendor Control Owner | §6 | The role that owns the register, the VSPs and the Vendor Change Register; the eleventh role in the Workflow's RACI (WF §4). |

Terms used here and owned elsewhere: DAS positions PROHIBITED, HUMAN-ONLY, HITL-REQUIRED, AGENT-DIRECTED and FULLY-AUTONOMOUS, and the agent classes, per CRISP-AG §5.1; the Agent Identity and Registry Record (AIR) per CRISP-AG §5.5; demotion per CRISP-AG §5.1.3; binding (provider, surface, Geo and gateway on which a contract clause was verified) per SDD Principle 11; control state (specified / implemented / demonstrated) per SEC §3; the agent bill of materials (AgBOM) per SEC §5 (SEC-16); the W0 packet and the exit checks per the Workflow; the S-sections of a PRD per the Standard; HRN-01 to HRN-12 and Gates 0–4 per the Harness Specification.

## 3. Placement principles

The specification set already has a rule for where things go. CRISP-AG §10.1 states that the framework governs the definition of governance artifacts while the implementing instruments govern their content, form, controls and sequence. Six principles, derived from the documents themselves, govern how this specification is placed and how the other documents use it.

**Define once, reference everywhere.** Each vendor control is defined in this document and cited by section ID from the others. CRISP-AG records the VSP's place among its artifacts; the Standard says what a PRD must carry and in which S-section; the Harness Specification says which runtime control enforces it and cites this document for the per-platform equivalents; SDD says how to write the requirement so it is enforced rather than guided; the Workflow says at which gate it is checked. Nothing about a vendor service is defined twice.

**A control needs a schema, a phase, a gate and a standards mapping.** CRISP-AG §5 states the test for adding an artifact: a concern stated as a principle but with no schema, no phase, no gate entry and no standards mapping is a concern the framework does not actually govern. Without this specification, vendor control fails that test in every paper of the series. Each control in §4 states its evidence at gates and its phase; the VSP has a schema (Appendix A); §10 maps the whole to standards.

**Enforce over guide.** SDD Part A2 distinguishes mechanisms that can refuse from prompt guidance. A spend budget is a cap in the gateway or the vendor admin plane that stops requests; a model tier is a pinned identifier the agent cannot change; neither is a sentence in a system prompt. Where a vendor plane can only alert, this document says "alert-only" and records the DAS consequence; it never describes an alert as a cap. The enforcement tables in §4 carry an honest coverage column for that reason.

**Equivalence for configured agents.** Harness §4 gives every HRN control an equivalent on each vendor stack. For an agent the organization configures inside a vendor product, the vendor's admin controls are the harness. Appendix B profiles one vendor's configured-agent surfaces on two planes, so that agents configured there are held to the same twelve controls, and adds reference profiles for two further SaaS agent platforms an organization may adopt.

**Controls are earned, like autonomy.** CRISP-AG §5.1.3 promotes DAS positions on evidence and demotes them automatically. The rollout in §8 applies the same discipline to the controls: each is introduced in observe mode, then alerts, then enforces, with thresholds set from telemetry rather than guessed. The Harness Specification already re-baselines SLO thresholds after 90 days of production telemetry (§5).

**One coordinated release per phase, through each standard's own change control.** Each phase in §8 ships one coordinated release of the organization's own standards, as it has adopted them from this series: the harness standard by a pull request reviewed by two AIGB members, with AI Risk Officer sign-off where its control set changes (Harness §11); the PRD standard as a new version with its open items closed or carried; the governance framework as a revision with its record of what changed; the design standard with its shared vocabulary updated; and the delivery workflow in its machine-readable definition, which is the workflow's source of truth. Nothing is changed between phases.

> **Naming.** The body that governs AI is referred to as the AI Governance Board (AIGB), as in the Harness Specification and the Workflow. Architecture decisions are taken at architecture review, the Gate 1 review the Architect leads (Workflow W2); the split of decisions between architecture review and the AIGB is in §6.

## 4. The nine controls

This section specifies nine controls, VC-01 to VC-09. The first three answer the reference failure directly and land first. Each control states its rule, the verified reasons for it, what enforces it on each platform the organization uses or may use (with the coverage stated honestly as Full, Partial or Alert-only), who owns it, what evidence the gates require and the rollout phase from §8. Platform facts carry the date on which they were read; they change, and the VSP is where the current value lives.

The platforms in the enforcement tables are the ones on the illustrative register (§5): the Anthropic Console and API; Claude for Enterprise; Databricks Unity Gateway (with Foundation Model APIs and Agent Bricks behind it); Microsoft Copilot Studio administered through the Power Platform admin center (PPAC); Microsoft 365 Copilot agents administered through the Microsoft 365 admin center billing policy; Microsoft Foundry; OpenAI; Google; and AWS. The last three are reference postures: on the illustrative register no production agent depends on them, and their rows exist so that a proposal to use them starts from known coverage.

### `VC-01` — Consumption and spend governor (realized as HRN-12)

HRN-12 is owned by the Harness Specification §4; this section specifies its content. Its neighbor, HRN-11, is the isolation boundary (filesystem and network), specified in the Agentic Security Specification [5].

**Rule.** Every production agent, and every vendor service it consumes, runs under a declared monthly budget with an alert threshold and a hard cap enforced in a layer the agent cannot modify. The cap is configured in the layer that can actually refuse. Where the vendor plane can only alert, the enforcing step is an automation the organization wires and evidences, or, failing that, a documented DAS ceiling (VC-06). Spend is attributed to the product, the agent, the use case, the tier, the vendor and the billing plane so that it can be reported per unit of work (Standard S5.5). Every cap event produces a ledger entry (HRN-06). Client-side cost estimates are reconciled to the vendor's billing source of truth at least daily. A budget raised more than once in a quarter is an AIGB item.

The governor operates at two levels. Per run, the harness bounds a single execution. In Claude Code [40], the bounds are `-p --max-budget-usd <n>` (print mode, v2.1.217 or later; subagent spend counts toward the cap, and reaching it causes further subagent spawns to fail and stops running background subagents) and `--max-turns`; in the Agent SDK, the bound is `max_budget_usd` with result subtype `error_max_budget_usd` [41]. These are client-side estimates — Anthropic's documentation says not to bill end users or trigger financial decisions from them — so they are the first stop, not the authoritative one. Per agent, team and month, the platform budget is the authoritative cap, and it is the one the table below evaluates.

**Why.** This is the control whose absence produces the reference failure, and it is the cheapest in the set because most vendors offer some form of it. Databricks Unity Gateway budgets can be set per user, per use case (tag), per workspace or per account with a "Send alert" or "Block usage" action. Once a budget is exceeded, "Unity Gateway automatically stops further requests until you raise the limit or the next billing period begins" (announced 23 July 2026 [46], [47]; generally available 4 August 2026 [48]). Copilot Studio administrators can set a monthly limit for any agent from the PPAC Manage Agents page, receive alerts when usage approaches the limit and have the agent "automatically turned off once it hits the defined limit" [9]. Claude for Enterprise applies organization, group and per-user monthly caps that block further requests once reached [36].

Gartner's prediction that over 40% of agentic AI projects will be canceled by the end of 2027 names "escalating costs" first among three causes (25 June 2025) [84]. The FinOps Foundation's FinOps for AI guidance makes usage limits and quotas, anomaly detection, tagging for allocation and a showback model its core practices (updated 17 February 2026) [79]. In the OWASP LLM Top 10 2026, LLM06 Unbounded Consumption [75] is the item a harness without HRN-12 leaves least covered (Harness §6.1).

Three refinements from the vendor documentation shape the rule. First, enforcement precision varies. Unity Gateway "Block usage" thresholds "are enforced approximately" on a near-real-time estimate [49], so the configured cap carries headroom and the ledger records the estimated-versus-billed delta, reconciled monthly against `system.billing.usage`. PPAC reporting is daily, so the 80% alert is computed from the daily export, not from the product's own "approaching the limit" notification, whose threshold is Microsoft's. Azure Cost Management budgets are evaluated every 24 hours on data that arrives 8–24 hours late. Second, budgets on Azure and Google Cloud do not stop consumption at all — Microsoft's tutorial states "Resources aren't affected, and your consumption isn't stopped" [12] — so Foundry and Vertex coverage is Partial at best and Alert-only until an automation is wired. Third, the Anthropic Cost API reports at daily granularity only and excludes Priority Tier costs [30], which constrains what `harness_spend_vs_budget` can see for direct API use.

Vendor-neutral formats matter here because the evidence must outlive any one vendor (VC-08). The OpenTelemetry GenAI semantic conventions [82] are at Development stability and define token attributes (`gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens`) but no cost attribute; an organization-defined `org.cost.*` attribute set (currency, list price, discounted price, tier, vendor, billing plane) is therefore a documented, versioned extension in the harness repository. FOCUS v1.2 [80] offers generic consumed-unit and SKU columns and custom `x_` columns, but no AI-specific field. The Finance showback export uses `x_` columns for tokens and credits until FOCUS adds them; v1.3 is reported to add none [81] (unverified).

**Enforcement per platform, as of 19 September 2026.**

| Platform | Cap mechanism and semantics | Alert and reporting | Coverage |
|---|---|---|---|
| Anthropic Console / API | Organization and per-workspace spend limits (a workspace limit sits below the organization's; both are evaluated on every request) [35]; behavior at a workspace limit not stated (unverified). Spend Limits API [29]: user scope, monthly. Per run: `--max-budget-usd`, SDK `max_budget_usd` (estimates). | Email at a set workspace spend; Usage and Cost Admin API (daily cost; 80% computed client-side); OTel metric `claude_code.cost.usage` [42]. | Partial (org and workspace limits; behavior at the cap unconfirmed; per-agent scope only with one workspace per agent) |
| Claude for Enterprise | Monthly caps at organization, RBAC group and individual user, the narrower overriding the broader; at the cap, further requests are blocked until the monthly reset. Per-user overrides via the Spend Limits API. | Month-to-date spend per member; Enterprise Analytics API (about 4 h latency); Compliance API transcripts. | Full at identity granularity; per-agent granularity requires one identity per agent (VC-06) |
| Databricks Unity Gateway | Budgets per user, tagged use case, workspace and account; action Send alert or Block usage; thresholds enforced approximately on a near-real-time estimate and reconciled to the billing system table. External-model spend in budgets is Beta [50]. | Every request logged to Unity Catalog system tables with DBU costs; unified trace table in OpenTelemetry format (Beta, 21 August 2026). | Full (approximate) for Databricks-hosted models; Partial (Beta) for external providers routed through the gateway |
| Microsoft Copilot Studio (PPAC) | Per-agent monthly limit; the agent is turned off at the limit [9]. Prepaid environments stay within the allocated pool, with tenant enforcement at 125%; pay-as-you-go environments take any limit and bill to an Azure subscription. | Product-defined "approaching" alert to environment and tenant admins; daily consumption data per environment. | Full per agent (daily data; 80% alert computed from the PPAC export) |
| Microsoft 365 Copilot agents (M365 admin center) | Budget limit on a billing policy (a group of users), not on an agent; $0.01 per message to an Azure subscription. Hard stop only by deleting or disconnecting the policy, which removes access for all linked users. | Email at percentage milestones of the policy budget; Cost Management in the M365 admin center and the Azure portal. | Alert-only per policy; no per-agent cap |
| Microsoft Foundry | Azure Cost Management budgets [12]: alerts only, consumption not stopped; data 8–24 h late; evaluated every 24 h. Enforcing step: action group → deployment quota or TPM reduction, or key rotation. | Budget alerts (actual and forecast) within an hour of evaluation. | Alert-only; Partial once the action-group automation is wired and evidenced |
| OpenAI | Project budgets and usage limits (unverified). | Usage dashboard. | Not assessed (reference posture) |
| Google | Cloud Billing budgets are alert-only; Vertex AI quotas are rate limits, not spend caps; a hard stop requires customer automation (unverified). | Budget alert emails and Pub/Sub. | Alert-only |
| AWS | Bedrock cost allocation by IAM user and role through cost allocation tags (9 April 2026) [58] is attribution, not a cap; AWS Budgets actions unverified. | Cost Explorer; CUR 2.0. | Alert-only / attribution |

The vendor's own wording behind the Anthropic rows is as follows. On the Console, "Anthropic always evaluates all applicable limiters — at the Workspace and Organization level — for every request" [35], and a workspace limit defaults to the organization's. The Spend Limits API [29] accepts `scope.type: "user"` only, a monthly period only and amounts in minor units. The Usage and Cost Admin API reports cost at daily granularity only, with data typically available within 5 minutes and Priority Tier excluded, and has no server-side 80% filter, so the threshold is computed client-side. The Claude Code metric `claude_code.cost.usage` carries the `model`, `query_source` and `agent.name` attributes. In Claude for Enterprise, an individual cap overrides a group cap and a group cap overrides the organization default; at the cap, in-flight requests complete and further requests are blocked, users may "Request more usage", and caps reset at 00:00 UTC on the 1st of the month [36].

On Databricks, the Block usage action "Prevents the user from making further requests through Unity Gateway" [49], and `system.billing.usage` is the source of truth for reconciliation. "External Model Spend in Budgets" (Bedrock and Azure AI Foundry through the gateway) is Beta (release note 28 August 2026 [50]), and `system.ai_gateway.external_model_spend` updates hourly. The Unity Gateway API became generally available on 16 September 2026.

On the Microsoft planes, the Copilot Studio limit is set on Licensing › Copilot Studio › Manage Agents in PPAC [9]. Alerts go to environment and tenant admins when usage "approaches the defined limit", at a threshold the product defines. Consumption data is kept daily per environment for three months and monthly for twelve, and usage through Microsoft 365 Copilot Chat appears under a separate product. Pay-as-you-go Copilot Studio environments bill through a billing plan; Microsoft 365 Copilot agents bill on the "Copilot Studio — $0.01 per message" meter [11]. For Foundry, Microsoft's tutorial states: "Notifications are triggered when the budget thresholds are exceeded. Resources aren't affected, and your consumption isn't stopped." [12] Action groups exist only at subscription and resource-group scope; the enforcing step is specified by the platform operator; and Foundry Control Plane cost and token tracking is in preview.

**Owner.** The Harness Engineer configures the cap and the reconciliation job; the product's S5 owner (the platform operator) operates it; the Finance partner receives the monthly showback; the AIGB approves any budget raised more than once in a quarter.

**Evidence at gates.** Gate 1: budget, threshold, cap and enforcing layer declared in S5.5 with the VSP field that describes the layer's precision. Gate 2 (W4): configuration evidence from the enforcing plane (screenshot or API export with date), reconciliation job present, `org.cost.*` attributes emitted. Gate 4 (W7): one cap event or alert exercised end to end on the canary; `harness_spend_vs_budget` live.

**Phase.** 0 (switch on what exists; observe), 1 (define; metrics tracked), 2 (alerts at 80%), 3 (hard caps mandatory for every production agent, built or configured).

### `VC-02` — Model tiering and effort policy

**Rule.** Every agent declares, per task class, the model tier it uses by default and the predicate under which it escalates. The default is the smallest tier that passes the S2 suite for that task class at threshold; a premium or reasoning tier as the default for any task class is an exception justified at Gate 1 with eval evidence and a cost estimate per unit of work. Tier assignments and effort settings are pinned identifiers under change control, never a runtime choice the model makes about itself. Where a platform router is used, the router's mode, quality band and allowed model subset are the governed configuration. Meters that price agent design — a premium reasoning tier, a per-tool-count assist tier, an identity- or trigger-sensitive rate — are tier variables declared at Gate 1. A tier assignment records the retention class, residency options and sampling contract of the model it resolves to; a tier change that alters any of them is a DP-04 change and, where retention changes, a DPIA trigger.

**Why.** Missing tiering is the second cause in the reference failure, and tiering is where most of the recoverable spend lies. On the meter used as the illustration in §1.2, the premium tier bills 100 credits per 10 responses against 15 for the standard tier and 2 for a generative answer. The cascade and routing literature shows the principle holds beyond one meter: FrugalGPT reports matching the best individual model "with up to 98% cost reduction" through prompt adaptation, approximation and cascade [86]; RouteLLM reports routers that cut cost "by over 2 times in certain cases — without compromising the quality of responses" [87].

Vendor routers implement the same idea. In Balanced mode, Microsoft Foundry Model Router "considers all underlying models within a small quality range (for example, 1% to 2% compared with the highest-quality model for that prompt) and picks the most cost-effective model"; Cost mode uses a larger band of about 5–6%; and "when new base models become available, they're not included in your selection unless you explicitly add them to your deployment's inclusion list" [13]. Databricks Smart Routing (Beta, 13 August 2026) "matched frontier-level quality while cutting overall task cost by more than 30%". A router is permitted only with a pinned quality band and inclusion list, because an unpinned router is exactly the runtime self-selection the rule forbids. The Harness Specification already rejects at Gate 1 a set whose S1.1 lacks the "model and effort choice"; this control gives that clause its default.

Three couplings make tiering more than a price decision. Retention: on the API, in Claude for Enterprise and on Databricks Foundation Model APIs alike, Anthropic's Covered Models (Claude Fable 5 and 5.1, Claude Mythos 5 and 5.1) [38] require 30-day data retention and are not eligible for zero data retention unless Anthropic expressly authorizes it. A premium tier that resolves to a Covered Model changes the retention posture of the product (VC-07). Residency: US-only inference on the Anthropic API [31] is priced at 1.1× the standard rate and is available on Claude 4.6 and later models, so a residency decision is a cost-per-unit input (Standard S5.5). Sampling: on Claude Opus 4.7 and later, Sonnet 5 and the Fable models, a non-default `temperature`, `top_p` or `top_k` returns HTTP 400, while Haiku 4.5 still accepts them (Anthropic API release notes, 30 June and 24 July 2026 [33]). A tier change can therefore change the request contract, and the substitution suite must exercise it.

**Enforcement per platform.**

| Platform | Tier pinning and router governance | Tier variables the meter prices | Coverage |
|---|---|---|---|
| Anthropic Console / API and Claude for Enterprise | Pinned model identifiers in `config/model_pins.yaml` (edit-denied to agents, SDD C2.2); no vendor router. Workspace `allowed_inference_geos` pins residency. | `inference_geo: us` at 1.1×; Covered Models retention class; sampling contract by model generation. | Full (pins are configuration the agent cannot change) |
| Databricks Unity Gateway | Endpoint per tier in Unity Catalog; Smart Routing (Beta) permitted only with a pinned routing policy; tier-to-endpoint table in SDD C1.1. | DBU and external-model token cost; Covered Models retention on FMAPI. | Full for pinned endpoints; Smart Routing Partial until GA |
| Microsoft Copilot Studio (PPAC) | Model selection per agent is a maker setting; basic, standard and premium tools are distinct billing rows. Tier declared in the configured-agent profile and checked in the PPAC export. | Premium tools 100 vs standard 15 credits per 10 responses; identity- and trigger-sensitive "No charge" for M365 Copilot-licensed users under their own USL identity. | Partial (declared and audited; not technically pinned) |
| Microsoft 365 Copilot agents | Message meter is flat ($0.01 per message); tier is the underlying agent's. | Message count; licensed users excluded. | Not applicable at meter level |
| Microsoft Foundry | Model Router deployment: mode (Balanced / Quality / Cost) and inclusion list are governed configuration; router version 2025-11-18 GA (OpenAI, Anthropic, xAI, DeepSeek, Meta models). `versionUpgradeOption` pinned (VC-05). | Per-model list price; router quality band. | Full (inclusion list is stable configuration; new models not auto-added) |
| OpenAI / Google / AWS | Pinned identifiers; Google auto-updated aliases prohibited for pinned deployments (VC-05). | Per-model price. | Reference posture |

**Owner.** The AI Product Owner declares the tiers; the Eval Owner evidences the suite pass per tier; the Architect reviews at Gate 1 (architecture review); the AIGB approves tier changes as it approves model changes (SDD CHG-03).

**Evidence at gates.** Gate 1: S1.1 carries the tier per task class, the escalation predicate, the premium justification where applicable and the router configuration; S1.9 carries the pinned identifier and successor per tier and per Geo. Gate 3: suite results per tier. Gate 4: `harness_premium_tier_share` live.

**Phase.** 1 (define; pilot on one built agent — the Lease Administration Agent Set (LAAS) worked example [3]), 2 (Gate 1 requirement for new products), 3 (retrofit of existing agents; premium-tier ceiling per product).

### `VC-03` — Vendor Service Profile

**Rule.** Each vendor service the organization depends on — a model endpoint family, an agent runtime, a gateway, a retrieval service, a SaaS agent platform — has one record, in the schema of Appendix A, of the commercial and operational terms that govern the organization's use of it. The VSP is the single record the other controls point at: the Standard's S4.5 due-diligence record, SDD DP-04, the Harness §9 register row and the AIR provenance field become references to it. It is a controlled document in the shared store with a version and a next-review date; a stale VSP — past its review date, or with a Vendor Change Register entry unrecorded — fails the gate. Fields marked "Always" in Appendix A form the reduced Class 1 record.

**Why.** The third cause in the reference failure is that nobody knows the terms. CRISP-AG §5.8 lists what a deployer must obtain from a vendor, but on its own gives that list no home, no owner and no refresh cadence; SDD DP-04 holds the data-protection half of the same record, and its open items need a closure owner. The VSP passes CRISP-AG's own test for an artifact: it has a schema (Appendix A), a phase (produced in CRISP-AG lifecycle phase 2, Operational Context Assembly, alongside the AIR; refreshed at renewal, on any Vendor Change Register entry and at least annually), a gate (Gate 1 requires a current VSP for every dependency) and a standards mapping (§10).

No standard names a Vendor Service Profile. The VSP is the organization's instance of the third-party inventory NIST AI RMF MAP 4.1 [63] expects ("Inventory third-party materials (hardware, software, data, models)"), of the third-party risk policies of GOVERN 6.1 [62], of the supplier process ISO/IEC 42001 Annex A.10.3 describes [65], [66] (unverified), of the CSA AI Controls Matrix v1.1 STA domain (Supply Chain Management, Transparency and Accountability; 14 July 2026) [74], and, by analogy, of the DORA Article 28(3) register of information [72]. It is not a named artifact in any of them, and the AIGB should not be told otherwise.

Nine of the schema's fields go beyond a conventional vendor record, each forced by a verified vendor fact: the billing plane where the cap is set; the included-usage rules that zero a meter; the enforcement precision and latency of the cap; retention by model and tier including Covered Models and ZDR eligibility per platform; the residency controls and their price multiplier; the cross-Geo processing setting and its configured value; the IP indemnity's scope and the deployer-side conditions; the notice channels and programmatic lifecycle source; and the published-versus-contractual notice period. Section 7 describes them; Appendix A places them.

A VSP for a service sold on more than one plane needs internal structure. An Anthropic VSP, for example, carries three commercial sub-blocks — Console API, Claude for Enterprise, and Databricks Foundation Model APIs through Unity Gateway — because an organization may consume Anthropic on all three planes and each has its own cap semantics, reset rule and reporting latency. A Microsoft VSP carries two planes — PPAC for Copilot Studio and the M365 admin center billing policy for M365 Copilot agents — for the same reason.

**Source of record per platform, as of 19 September 2026.**

| Platform | Where the terms are published | Programmatic source |
|---|---|---|
| Anthropic | Model deprecations [26]; data residency [31]; data retention [32]; Spend Limits and Usage and Cost APIs [29], [30]; Console workspaces [35]; Enterprise consumption [36]; Covered models [38]; Commercial Terms [28]; Privacy Center [43], [44]; Trust Center sub-processors [45] (unverified) | Admin API (usage, cost, spend limits); email to active deployments |
| Databricks | Unity Gateway budgets [49]; release notes [50]; retired-models policy, 17 September 2026 [51]; supported models, 15 September 2026 [53]; Databricks Geos, 11 September 2026 [54] | Billing and gateway system tables; retired-models table |
| Microsoft Copilot Studio / M365 Copilot | Copilot Credits billing rates, 3 August 2026 [7]; capacity management, 19 August 2026 [9]; Pay-as-You-Go overview and meters, 18 August 2026 [10], [11]; geographic data residency [17]; security and governance, 4 August 2026 [16]; Customer Copyright Commitment [18] | PPAC daily exports; M365 admin center Cost Management |
| Microsoft Foundry | Model lifecycle, 24 July 2026 [14]; model router, 1 September 2026 [13]; Cost Management budgets [12] | Models API `lifecycleStatus` and `deprecation.inference`; Azure Service Health |
| OpenAI | Deprecations [55]; enterprise privacy, 8 January 2026 [56] | Email and documentation |
| Google | Model versions and lifecycle [57] | Release notes |
| AWS | What's New [58] | Cost Explorer, CUR 2.0 |

**Owner.** A named Vendor Control Owner per VSP; the DPO owns the data-protection block; Legal owns the contract block; the Finance partner owns the showback fields.

**Evidence at gates.** W0 (Gate 0): a VSP reference and register row for every vendor dependency in the packet. Gate 1: every VSP current (inside review date; no unrecorded register entry). Gate 4: VSP version recorded in the AIR provenance row.

**Phase.** 0 (draft VSPs for every service in the inventory, one sub-block per billing plane), 1 (schema ratified), 2 (gate requirement).

### `VC-04` — Approved AI Service Register

**Rule.** The Approved AI Service Register is a single governed list of vendor services approved for agentic use, each with its posture (approved; approved with conditions; pilot only; prohibited; reference posture), approved and prohibited uses, the equivalence profile that applies, its VSP ID, its exit path and the date of its last AIGB review. Harness Specification §9 (vendor posture and the Approved AI Service Register) cites this section. A service not on the register cannot appear in a PRD's S1.9. Where a platform supports an allow-list, the allow-list enforces the register. Illustrative initial rows are in §5.

**Why.** The Harness Specification's adoption roadmap (§10, days 0–30) says "freeze vendor list"; a list can be frozen only if it exists as a governed artifact, and a set of postures in prose is not one. In a buy environment the register is the control that stops the next adoption from happening outside the process: a business unit can configure agents only on a service whose terms are recorded and whose caps are known. It gives architecture review a concrete object to review architecture fit against and the AIGB an object to review risk posture against.

NIST MAP 4.1's inventory of third-party materials is the closest recognized description of the register. ISO/IEC 42001 A.10.3 [65] (unverified) expects a process ensuring supplier services align with the organization's responsible-AI approach, and the register is that process's output. DORA Article 28(3) requires financial entities to maintain a register of information on all contractual arrangements for ICT services; an organization outside DORA's scope may still serve clients within it, and a register in that shape answers their due-diligence requests.

**Allow-list mechanism per platform.**

| Platform | Mechanism that makes the register enforceable | Coverage |
|---|---|---|
| Anthropic Console / Claude for Enterprise | Workspace and organization structure; managed settings (MRB-1 per SEC §6) fixing the endpoint; per-workspace inference-geo allow-list | Partial (organizational) |
| Databricks Unity Gateway | Unity Catalog grants on endpoints; the gateway is the only permitted route (SDD Principle 11) | Full |
| Microsoft Copilot Studio (PPAC) | Power Platform DLP connector policies (business / non-business / blocked) at tenant and environment level; Managed Environments publish restrictions; Agent 365 as control plane | Full for connectors; Partial for models |
| Microsoft 365 Copilot agents | Billing policy connection to a Copilot service; Agent 365 registry | Partial |
| Microsoft Foundry | Model Router inclusion list; Azure Policy; Foundry Control Plane (preview — evidence, not control) | Partial |
| OpenAI / Google / AWS | Not enabled; a proposal to use them starts at "reference posture" | — |

**Owner.** The AIGB approves posture; architecture review (Gate 1) approves architecture fit and the equivalence profile; the Vendor Control Owner maintains rows.

**Evidence at gates.** W0: every dependency on the register. Gate 1: S1.9 cites only registered services. Quarterly: the AIGB reviews the register.

**Phase.** 1 (publish with current vendors), 2 (gate requirement).

### `VC-05` — Vendor change and model lifecycle management

**Rule.** Every vendor announcement affecting a registered service — deprecation, retirement, meter or price change, data-terms change, terms-of-service change, regional availability change, safety-policy version change — is captured in the Vendor Change Register within five working days, with the effective date, the affected VSPs, pins and agents, the decision (accept, substitute, hold) and the owner. Every pinned model identifier has a named successor and a substitution suite exercised before the notice window closes. Auto-upgrade is an explicit decision per deployment, never a default. Lifecycle is tracked per channel, because the same model retires on different dates on different platforms. Where a vendor exposes lifecycle metadata, preflight (HRN-02) reads it and fails a pin whose retirement date falls inside the substitution window. Preview models are prohibited in production unless the vendor's preview notice period is at least as long as the substitution window. Entries with an effective date inside 90 days are reported to the AIGB monthly, the rest quarterly.

**Why.** The series' other papers recognize the hazard — SDD Principle 9 notes the 9 October 2026 retirement of `databricks-claude-sonnet-4`; SDD's DRIFT-DEF-05 suspends autonomous routing when a vendor announces a change; CRISP-AG §5.8 makes model updates inside a vendor product a frontier re-evaluation trigger — but none of them supplies the operational loop.

The notice windows are short and differ by vendor, and the cadence of change is high. The primary record for 2026 reads as follows. Anthropic gives "at least 60 days' notice before model retirement for publicly released models" [26] and retired six identifiers between February and August 2026: `claude-3-7-sonnet-20250219` and `claude-3-5-haiku-20241022` (19 February), `claude-3-haiku-20240307` (20 April), `claude-sonnet-4-20250514` and `claude-opus-4-20250514` (15 June), `claude-opus-4-1-20250805` (5 August). OpenAI announced the retirement of the GPT-5 and o3 families on 11 June 2026 (shutdown scheduled for 11 December 2026) and of its legacy audio and realtime families on 20 July 2026 (shutdown scheduled for 20 January 2027), and shut down the Assistants API on 26 August 2026, a year after announcing it [55]. Databricks has scheduled the retirement of `databricks-claude-sonnet-4` for 9 October 2026, with `databricks-claude-sonnet-4-6` as the named replacement [51]. Google discontinues the Gemini 2.5 Pro, Flash and Flash-Lite models no earlier than 16 October 2026 [57]. An organization that pins identifiers (CHG-01) without a substitution loop turns every one of these into an incident.

Notice periods are not one number. OpenAI gives at least 6 months' notice for generally available models, 3 months for specialized variants and "much shorter notice, such as 2 weeks" for preview models. Databricks sets a retirement date "three months or more in the future"; deprecated models remain available only to workspaces already using them, and a temporary redirect to a replacement happens "only if the replacement model has the same price and is backwards compatible". Microsoft Foundry [14] gives at least 60 days' notice for GA models and 30 for preview models, and 15 days' notice for Fireworks per-token models; it applies an 18-month lifecycle to Microsoft and OpenAI models but a 12-month lifecycle to models from Anthropic, DeepSeek, Fireworks and Mistral AI. On Foundry, all inference returns 410 Gone at retirement, and preview deployments are force-upgraded. Google states that a retirement date "will be announced once the next stable version of the model is publicly released", and it blocks new access one month before retirement.

Anthropic's 60-day notice is a published policy, not a clause of the Commercial Terms, and those terms may be updated "to be effective 30 days after the updates are posted" [28]. Anthropic's commitment to preserve the weights of publicly released models [27] is information, not a legacy-access right the organization can plan on. VC-09 contractualizes what can be contractualized.

Auto-upgrade defaults are the clearest hazard. Google's auto-updated alias "always points to the latest stable model" and moves automatically when a new stable version ships. Foundry's `versionUpgradeOption` values [15] are `OnceNewDefaultVersionAvailable`, `OnceCurrentVersionExpired` and `NoAutoUpgrade` (under which "deployment stops working at retirement"), and auto-upgrade applies by default to Global Standard, Data Zone Standard and Standard deployments but not to Provisioned deployments. Both behaviors are turned off for any pinned deployment, and the chosen option is recorded in the VSP. Lifecycle also diverges by channel: Anthropic retired Claude Opus 4.1 on 5 August 2026, yet `databricks-claude-opus-4-1` was still listed on Databricks Foundation Model APIs without a deprecation entry in September 2026; the register tracks each channel's date, not the model's.

Programmatic sources make the loop automatable. Foundry's Models API exposes `lifecycleStatus` and `deprecation.inference`, and the retirement date is "set programmatically"; Azure Service Health advisories carry retirement notices with alert rules for email, SMS and webhook; Databricks publishes a retired-models table; Anthropic and OpenAI give notice by email to active deployments and in their documentation. The VSP records which channel the organization subscribes to and who receives it.

The register also carries vendor-posture attributes that are not model retirements. The version of Anthropic's Responsible Scaling Policy in force is one: v3.0 took effect on 24 February 2026, followed by v3.1 (2 April), v3.2 (29 April), v3.3 (26 May) and v3.4 (effective 8 July 2026) [34]. The Harness §9 posture cites the RSP, so a version change is a register entry with the AIGB as owner. Digital Omnibus amendments to the EU Data Act are another (VC-08).

**Lifecycle facts per platform.**

| Platform | Notice period (published) | Lifecycle and auto-upgrade default | Programmatic source and channel | Coverage of the five-day rule |
|---|---|---|---|---|
| Anthropic | ≥ 60 days for publicly released models (policy, not contract); terms change on 30 days' notice | Identifier retires; requests fail; no legacy access | Email to active deployments; deprecations page | Full (policy ≥ 60 days; announcement dates recorded in the VSP from the deprecations page) |
| Databricks FMAPI | ≥ 3 months | Deprecated model available only to existing workspaces; redirect only if same price and backwards compatible; partner-model dates lag Anthropic's | Retired-models policy page; system tables | Full |
| Microsoft Foundry | 60 days GA / 30 days preview; 15 days Fireworks per-token | 18 months (Microsoft, OpenAI); 12 months (Anthropic, DeepSeek, Fireworks, Mistral); 410 Gone; Standard-class deployments auto-upgrade by default — pin `versionUpgradeOption` to `NoAutoUpgrade` or `OnceCurrentVersionExpired` | Models API `deprecation.inference`; Service Health alert rules; subscription-owner email | Full (machine-readable) |
| Microsoft Copilot Studio / M365 Copilot | Meter and feature changes via Message Center and Learn page dates; model changes inside the product are the vendor's | Product-managed; model updates are frontier re-evaluation triggers (CRISP-AG §5.8) | Message Center (e.g., MC1297981); PPAC | Partial (no model-level pin) |
| OpenAI | ≥ 6 months GA; ≥ 3 months specialized; ~2 weeks preview | Identifier shutdown; Assistants API shut down 26 August 2026 | Email; deprecations page | Full |
| Google | Announced on next stable release; new access blocked one month before retirement | Auto-updated aliases move automatically — prohibited for pinned deployments; Gemini 2.5 family not before 16 October 2026 | Release notes | Partial (notice length not fixed) |

**Owner.** The Vendor Control Owner captures announcements; the Eval Owner runs the substitution suite; the AIGB (as Model Risk / AI Governance) approves the pin move under SDD CHG-03 and CHG-05; the Harness Engineer implements the preflight check.

**Evidence at gates.** Gate 1: successor named per pin in S1.9; substitution-suite date in the VSP. Gate 2: preflight reads lifecycle metadata where available. Change gate: CHG-05 record with the vendor notice attached; previous pin retained for rollback until the vendor's retirement date.

**Phase.** 0 (rehearsal on a live vendor retirement: a retirement that touches a pinned identifier), 2 (register live), 3 (substitution drill).

### `VC-06` — Vendor-configured agent profile

**Rule.** An agent the organization configures inside a vendor product follows a configured-agent profile that maps each of HRN-01 to HRN-12 and identity to the vendor's admin-plane equivalent, states the coverage of each row honestly, and treats the absence of an equivalent as a DAS ceiling. The profile records, per platform: the metering unit; whether a per-agent hard stop exists and at what granularity; the alert mechanism and its latency; loop and rate limits; the included-usage rules; and the DAS ceiling that follows. A configured agent for which the deployer cannot configure an enforceable spend cap cannot hold an AGENT-DIRECTED or FULLY-AUTONOMOUS position. One for which the deployer cannot obtain the action inventory, a distinct identity and update notice cannot exceed HITL-REQUIRED (CRISP-AG §5.8). Appendix B holds the Microsoft profiles on two planes and reference profiles for two other SaaS agent platforms.

**Why.** The agents in the reference failure pattern are exactly this class, and a specification set without this control has no profile for them. CRISP-AG §5.8 gets the ownership split right and §4 says provenance does not change class, but neither says what the harness is when the runtime is someone else's product. The Harness Specification solves the problem for built agents by giving every control an equivalent on each vendor stack; the same move for configured-agent platforms closes the gap. On Copilot Studio, Microsoft's own documentation supplies most of the equivalents: per-agent credit limits with notification and hard stop in PPAC; DLP policies governing "Actions, connectors, and skills; HTTP requests; Publication to channels"; maker audit logs in Microsoft Purview; Agent 365 as "a central control plane to observe, govern, and secure Copilot Studio agents" [16].

The generalizable fact is that SaaS agent platforms fall into three classes by what their consumption controls can do. In the first, a per-agent hard stop exists: Copilot Studio through PPAC. In the second, budgets alert and billing runs in arrears, so consumption is unbounded by the platform: Microsoft 365 Copilot agents on pay-as-you-go, and Salesforce Agentforce, whose Digital Wallet gives "proactive threshold alerts" and whose overage policy is "no overage penalty — your rate is your contracted rate billed monthly in arrears" [59]. In the third, rate and loop limits exist without a spend cap: ServiceNow Now Assist. There, an assist is the unit of consumption, and agents consume 25, 50 or 150 assists by tool count (0–4, 5–8, 9–20 tools). Its controls are rate-limit rules, trigger throttling through `kill_switch.mode` (`warn_only` or `enforce`) and recursion maxima, and spike alerts exist, but the documentation "remains silent on enforcement mechanisms post-exhaustion" [60].

The DAS ceiling rule turns that classification into a machine-checkable field: a profile with "per-agent hard stop: no" caps the position at HITL-REQUIRED. Now Assist's tool-count tiers are also, after Copilot Studio's premium tier, the second example of a meter that prices agent design, which VC-02 treats as a tier variable.

Microsoft re-platformed its agent estate during 2026, and the profile reflects the current names. Microsoft Entra Agent ID [22] reached general availability in April 2026 [23]; Agent 365 became the unified registry and control plane for agents on 1 May 2026 (included in Microsoft 365 E7, or $15 per user per month as an add-on) [25]; the Entra admin center's agent registry and agent collections blades retired on 1 May 2026; and the legacy agent-registry Graph API "will begin retirement on 15 June 2026", after which agents not re-registered "will stop functioning" [24]. That retirement has passed, so the profile treats re-registration as a completed-migration check, not a future task: an agent that is live is registered, and the check is that its Agent 365 record is complete.

For built agents on Microsoft, "Microsoft Foundry Agent Service" [20] is the runtime and Microsoft Agent Framework (.NET and Python generally available) [21] is the orchestration framework. Semantic Kernel and AutoGen, its predecessors, are legacy: no new builds, and existing code is migrated within the lifecycle window. The Foundry Control Plane is in preview, and preview features are "not recommended for production" [19], so until GA it is evidence, not control.

**Platform classes, as of 19 September 2026.**

| Class | Platform | Consumption control | Alert | Loop / rate limits | DAS ceiling from consumption control alone |
|---|---|---|---|---|---|
| Per-agent hard stop | Microsoft Copilot Studio (PPAC) | Per-agent monthly limit; agent turned off at limit; prepaid pool bounded, tenant enforcement at 125% | Product-defined "approaching" alert; daily data | Agent flow runs blocked when prepaid capacity exhausted; autonomous triggers governable | None from consumption; other rows in Appendix B apply |
| Alert-only, arrears billing | Microsoft 365 Copilot agents (M365 admin center PAYG); Salesforce Agentforce (Flex Credits, Digital Wallet) | Budget on a billing policy (M365); alerts only, "no overage penalty" (Agentforce) | Percentage-milestone emails; near-real-time Digital Wallet | None documented for spend | ≤ HITL-REQUIRED unless the organization wires an automated disconnect and evidences it |
| Rate and loop limits, no spend cap | ServiceNow Now Assist | Assists pool; no documented cap or post-exhaustion enforcement | Spike alerts (`alert.assist_spike_*`) | Rate-limit rules per hour, instance or user; `kill_switch.mode`; recursion maxima | ≤ HITL-REQUIRED |
| Gateway-governed (not SaaS-configured) | Databricks Agent Bricks behind Unity Gateway | Unity Gateway budget with Block usage | Send alert | Gateway rate limits | None from consumption |

**Owner.** The platform operator verifies the equivalence profile against the tenant's licenses and current admin documentation; the Harness Engineer owns the profile; Legal reviews the DAS ceiling; architecture review approves the profile.

**Evidence at gates.** W0: the profile named in the packet for any configured agent. Gate 1: DAS positions consistent with the ceiling. Gate 2: admin-plane configuration evidence per row (for example, a policy export, a dated screenshot of the per-agent limit, the agent-registry record). Gate 4: the platform's cost export connected to HRN-07.

**Phase.** 0 (per-agent limits on every live configured agent where the platform offers them; policy-level budgets where it does not), 1 (profile drafted, marked proposed), 2 (verified and normative for new configured agents), 3 (retrofit).

### `VC-07` — Data-use, retention, residency and sub-processor terms

**Rule.** For every vendor service the VSP records, per model and tier where the vendor differentiates: whether prompts and outputs are used for training and under which opt-out; the retention period and purpose, including model-specific minimums and zero-data-retention eligibility per platform; where inference runs, which residency controls exist, at what price, and whether requests are relayed to a further processor; the cross-Geo or cross-region processing setting and its configured value with evidence; the sub-processor chain; the transfer mechanism; and per-Geo model availability. Every open item has a named owner and a closure date, and an unfavorable answer has a defined consequence — hold, substitute or restrict the data tier — not a note. A DPIA is not final while an open item lacks an owner or a date.

**Why.** SDD DP-04 and C1.3 hold the right questions and the right legal anchors (EDPB Opinions 22/2024 and 28/2024; GDPR due diligence on providers' training lawfulness, SDD A6). What they need from this specification is a schema, an owner and a consequence. The verified vendor facts show why a single "Retention" field is not enough.

On Anthropic, inputs and outputs are deleted from the backend within 30 days by default, and flagged content may be retained for up to two years [32], [44]. Claude Fable 5.1, Claude Mythos 5.1, Claude Fable 5 and Claude Mythos 5 are designated Covered Models — models whose capabilities "represent a substantial step up from prior generations and create elevated risk if misused" (Fable 5 designated 9 June 2026; Fable 5.1 on 31 August 2026) — and "require 30-day data retention; ZDR is therefore not available for any of them unless expressly authorized by Anthropic." [38] An organization with a ZDR arrangement can make them available "in a specific workspace by enabling 30-day retention for that workspace only"; otherwise requests fail.

The retention requirement holds on the API, in Claude for Enterprise and on third-party platforms: Databricks' supported-models page [53] states that for Claude Fable models "prompts and responses are retained for 30 days for trust and safety purposes... Anthropic is a limited subprocessor for this safety retention purpose." That sentence answers half of the SDD C1.3 question of whether Claude inference on Foundation Model APIs stays inside the Databricks perimeter. For Covered Models, safety-retained data reaches Anthropic as a sub-processor; the residual question for non-Covered models is an open item for the vendors' account teams (§12.1).

Claude Code zero data retention [39] is available to qualified accounts on Claude for Enterprise, requires separate enablement by Anthropic, applies per organization, and does not cover claude.ai chat, Cowork or data sent to MCP servers and third parties.

On residency, the Anthropic API [31] offers `inference_geo` values `global` (default; "Inference may run in any available geography") and `us` ("Inference runs only in US-based infrastructure", priced at 1.1× the standard rate on input, output, cache write and cache read, supported on Claude 4.6 and later models). Workspace geo — which governs storage at rest and endpoint processing — is US-only, set at creation and immutable. Anthropic's Privacy Center [43] states that customer traffic may be routed to "select countries in the US, Europe, Asia and Australia, unless otherwise agreed upon" and that data is stored in the US. There is no EU inference geo. SDD DP-05 requires in-Geo processing or HELD. For EU-served work, the direct Anthropic API is therefore not an in-Geo option, and an in-Geo substitute is named at each tier — for example, a Databricks Foundation Model APIs endpoint in the Europe Geo or a regional hyperscaler endpoint (SDD DP-05's substitution rule).

Databricks Foundation Model APIs [52] is a Databricks Designated Service that "uses Databricks Geos to manage data residency"; customer content "is only processed in the same Geo as your workspace, except for certain Designated Services"; there are seven Geos including "Europe (EEA, Switzerland, UK)"; and cross-Geo processing "is enabled by default for all workspaces in Geos outside the US and EU that don't have a compliance security profile enabled" [54]. Copilot Studio "offers EU Data Boundary compliance" [17] when the tenant billing address is in the EU or EFTA and all environments are in-boundary, can be "configured to access generative AI features in other areas, including when capacity is constrained", and exposes the admin option "Disable data movement across geographic locations for Copilot Studio generative AI features outside the United States." OpenAI [56] does not use business data for training by default, may retain API inputs and outputs for up to 30 days, and offers zero data retention for eligible endpoints and qualifying use cases. Each of these is a configured setting with a value and evidence, not an assumption.

Intellectual-property indemnity belongs in this block because NIST GOVERN 6.1 names "infringement of a third party's intellectual property or other rights" as a third-party risk. Microsoft's Customer Copyright Commitment [18] applies to Azure OpenAI and to the "Configurable GAI Services" Copilot Studio and GitHub Copilot, conditional on required mitigations — a "Protected Material – Text" metaprompt and evaluations such as guided red teaming. For Copilot Studio bring-your-own-model, "Output Content from such model is not covered by the CCC unless such model runs in Azure OpenAI and meets the required mitigations." The indemnity is conditional on work the organization must do and evidence.

**Data terms per platform.**

| Platform | Training use | Retention (default / model-specific) | Residency controls | Cross-Geo setting | Indemnity |
|---|---|---|---|---|---|
| Anthropic API / Console | Not used for training under Commercial Terms (business data) | 30-day backend deletion; flagged up to 2 years; Covered Models 30-day minimum, ZDR only if authorized, per-workspace enablement | `inference_geo` `global` or `us` (`us` at 1.1×; models ≥ 4.6); workspace geo US-only; `allowed_inference_geos` per workspace | Global routing may include Europe, Asia, Australia unless agreed | Per Commercial Terms (Legal to record) |
| Claude for Enterprise | As above | As above; Claude Code ZDR by separate enablement, per organization; excludes chat, Cowork, MCP data | As above | As above | As above |
| Databricks FMAPI / Unity Gateway | Per Databricks terms | Covered Models: 30-day safety retention with Anthropic as limited sub-processor; others per Databricks | Databricks Geos (seven; Europe = EEA, Switzerland, UK); FMAPI is a Designated Service | Cross-Geo processing on by default outside US/EU without compliance security profile — record configured value | Per Databricks terms |
| Microsoft Copilot Studio | Per Microsoft product terms | Dataverse transcripts; Purview retention | EU Data Boundary when tenant and environments in-boundary | Option to disable cross-Geo data movement for generative AI outside the US — record value; capacity-constrained fallback | CCC conditional on metaprompt and evaluations; BYOM excluded |
| Microsoft 365 Copilot agents | Per Microsoft product terms | Per M365 retention | EU Data Boundary | As Copilot Studio | CCC as applicable |
| Microsoft Foundry | Per Azure OpenAI / Foundry terms | Per deployment type | Data Zone and regional deployments | Deployment type | CCC with required mitigations |
| OpenAI | Not used for training by default | Up to 30 days; ZDR for eligible endpoints | Regional projects per OpenAI | — | Per OpenAI terms |
| Google / AWS | Reference posture | Reference posture | Regional endpoints | — | — |

**Owner.** The DPO owns the block; the Vendor Control Owner maintains the record; Legal owns the transfer mechanism and the indemnity field; the vendors' account teams close the residual C1.3 items.

**Evidence at gates.** W0: data tier and Geo declared. Gate 1: VSP data-protection block populated for every dependency; open items owned and dated. Gate 3: DPIA final. Gate 4: configured cross-Geo values evidenced.

**Phase.** 1 (populate for the current vendors; close the C1.3 items), 2 (gate).

### `VC-08` — Exit, portability and concentration

**Rule.** Every vendor dependency has a recorded exit path: the abstraction the agent binds to instead of the vendor endpoint (the gateway; MCP for tools, already mandated by Harness §9; the registry), the vendor-neutral formats the organization's own evidence is kept in, the export mechanism for data held in the vendor's service, a named substitute at each model tier and the estimated time to switch. The binding — provider, surface, Geo and gateway — is pinned with the model and prompt per SDD Principle 11, and a binding change is a change-gate event. The exit path is exercised by a substitution drill: one production agent moved to its named substitute at one tier, timed, with the S2 suite as the pass condition and with the data held in the vendor service removed and transferred integrally. The drill is mandatory for dependencies of consequential-decision agents and of agents at FULLY-AUTONOMOUS, and annual thereafter for every registered service. Concentration is reported to the AIGB annually as the share of production agents and of spend per model vendor and per underlying cloud provider.

**Why.** A buy-side organization cannot avoid dependence, but it can avoid dependence it cannot price. SDD Principle 1 binds contracts to observable properties; Principle 11 extends that binding to endpoints. The evidence half is largely done — HRN-07 and HRN-09 are vendor-neutral by design — with two qualifications. First, the OpenTelemetry GenAI semantic conventions are at Development stability (the conventions moved to the semantic-conventions-genai repository; `gen_ai.provider.name` replaces `gen_ai.system`) [82], [83] and carry no cost attribute, so the organization's `org.cost.*` extension is portable only if its schema is published and versioned. Second, FOCUS gives no ready AI showback schema, so the Finance export is the organization's own, built on FOCUS v1.2 `x_` columns.

The regulatory backdrop is moving the same way, and the framing matters. The EU Data Act's switching provisions for data processing services have applied since 12 September 2025; providers may still charge for switching and egress costs until 12 January 2027, after which switching charges are removed entirely [70]. The obligations fall on providers of IaaS, PaaS and SaaS that serve customers in the EU, regardless of where the providers are established. They include a maximum two-month notice to initiate switching and a 30-day transition, with exceptions for services heavily customized for a specific customer or provided for testing [71].

The rights belong to the customer of the service. They apply to an organization because its EU-established entities are customers of the services — agent platforms, data platforms and model API platforms alike — not because it serves EU clients. Whether a model API is a "data processing service" is unsettled, so for the model layer the Data Act terms are a negotiating floor rather than an entitlement; for the platform layers they are stronger. The Digital Omnibus proposes amendments to the Data Act; the Vendor Change Register watches them.

The financial-sector analogues supply the most mature template for what this control asks. DORA [72] Article 28(3) requires a register of information on all ICT contractual arrangements; 28(6) requires assessing whether an arrangement "may contribute to reinforcing ICT concentration risk as referred to in Article 29"; 28(8) requires exit strategies for critical or important functions with transition plans "to remove the contracted ICT services and the relevant data... and to securely and integrally transfer them to alternative providers or reincorporate them in-house."

From 13 July 2026 [73] the Bank of England, PRA and FCA oversee Critical Third Parties designated by HM Treasury — Amazon Web Services EMEA SARL, Google Cloud EMEA Limited, Microsoft Ireland Operations Ltd and Oracle Corporation UK Limited — and the regime "makes no mention of artificial intelligence providers." An organization that is not a financial entity may still serve clients that are, and regulators treat the hyperscalers on which most model vendors and agent platforms run as the concentration point. The concentration report therefore counts the underlying cloud as well as the model vendor. NIST GOVERN 6.2's contingency duty [62] is scoped to third-party systems "deemed to be high-risk", which is why the drill is mandatory where the agent's decisions are consequential and elective elsewhere.

**Exit mechanism per platform.**

| Platform | Binding abstraction | Export mechanism | Substitute at tier | Switching terms |
|---|---|---|---|---|
| Anthropic API / Claude for Enterprise | Unity Gateway where routed; otherwise provider SDK behind the organization's model-pins layer; MCP for tools | Compliance API transcripts (Enterprise); ledger and telemetry held by the organization | Named per tier in the VSP; in-Geo substitute for EU via Databricks Europe Geo | Data Act applicability to model API unsettled — negotiating floor |
| Databricks Unity Gateway / FMAPI | The gateway is the abstraction; Unity Catalog for data | Delta tables; Unity Catalog export; system tables | Alternate FMAPI endpoint or external model through the gateway | PaaS — Data Act Ch. VI applies to EU-contracted entities |
| Microsoft Copilot Studio | Solutions (topics, tools, knowledge as components); Dataverse | Solution export; Dataverse export; Purview audit export | Rebuild on Foundry Agent Service or Agent Bricks (time to switch is the drill's output) | SaaS — Data Act Ch. VI applies; EU Data Boundary |
| Microsoft 365 Copilot agents | Agent 365 registry; declarative agent manifests | Manifest and Graph export | As Copilot Studio | SaaS |
| Microsoft Foundry | Model Router / deployment layer; Agent Framework | Application Insights export; storage account | Alternate model in inclusion list | PaaS |
| OpenAI / Google / AWS | Reference posture | — | — | — |

**Owner.** The Architect owns the exit ADR (architecture review); the Vendor Control Owner maintains the VSP exit block; the platform operator runs the drill; the AIGB receives the concentration report.

**Evidence at gates.** Gate 1: one exit ADR per vendor dependency in S1.8 (Phase 3 onward). Gate 4: binding pinned in configuration. Annually: drill record (date, duration, pass) and concentration report.

**Phase.** 3 (first drill on one tier; exit ADRs), 4 (annual cadence).

### `VC-09` — Contract clauses and governance seats

**Rule.** Legal and Procurement apply the clause checklist in Appendix C at every new agreement and renewal for a registered service. The checklist distinguishes what a vendor publishes as policy from what it commits to by contract, and each clause is recorded in the VSP as present, absent or waived with the exception reference.

The minimum set is:

- advance written notice of model retirement and of meter or price changes, not shorter than the vendor's published policy, as a contractual term;
- notice of changes to the terms themselves of not less than 30 days;
- the action inventory in the form of an agent bill of materials, and the mechanism that disables each action;
- a distinct, revocable identity per agent instance;
- security attestations and adversarial-test results at the coverage level CRISP-AG §7.1 sets for the agent's class;
- audit-log access and retention;
- training-use opt-out and retention terms, including model-specific minimums;
- regional processing commitments;
- intellectual-property indemnity, with its conditions stated;
- the EU AI Act Article 25(4) information set;
- export and switching terms, with the EU Data Act as the floor where it applies.

A named Vendor Control Owner holds a seat in the RACI, and Finance and Procurement hold a seat in the CRISP-AG approval matrix for budget and contract decisions.

**Why.** CRISP-AG §12 is explicit that "internal governance documentation is not a substitute for contractual liability terms", and §5.8 frames what must be obtained; without this control, nobody is assigned to obtain it. The vendor sources sharpen three points. First, the policy-versus-contract distinction: Anthropic's 60-day retirement notice appears in its documentation and not in its Commercial Terms, which contain no deprecation commitment and may be updated to take effect 30 days after posting. The checklist asks for both the published period and the 30-day terms-change notice as contractual terms.

Second, EU AI Act Article 25(4) [67], [68] binds "the provider of a high-risk AI system and the third party that supplies an AI system, tools, services, components, or processes" to specify by written agreement "the necessary information, capabilities, technical access and other assistance". The obligation falls on providers, and an organization that buys agentic services is normally a deployer. The organization uses the 25(4) contents as the floor of information it demands from every registered vendor. It also watches Article 25(1), under which a deployer becomes a provider by putting its name on a high-risk system, substantially modifying it or changing its intended purpose "particularly by integrating general-purpose AI systems". That is a real risk when a vendor's general-purpose agent is repurposed for an Annex III use, and it is an AISIA trigger.

The Commission-supported model contractual clauses MCC-AI-Light and MCC-AI-High-Risk (5 March 2025) [69] are the reference templates, "neither binding nor officially endorsed", and Legal adapts them: Light for the non-high-risk services that make up most of the register, and High-Risk where an agent is high-risk.

Third, the action inventory has a standard form: the OWASP Agent Control Standard v0.1 (public preview, 1 September 2026; originated by Zenity) [77] describes an agent bill of materials over CycloneDX, SPDX or SWID. The organization's AgBOM (per SEC §5, SEC-16) is a CycloneDX ML-BOM under the ACS profile, and the checklist asks vendors for their action inventory in the same form so that it can be diffed against the organization's own record. ACS is a vocabulary, not an enforcement mechanism.

The governance seats close the loop. An approval matrix with Legal, Operations, Executive and Responsible AI columns but no Finance, Procurement or Platform seat, and a RACI with no role for the vendor relationship, leave the vendor terms unowned; CRISP-AG §5.1.1 and the Workflow's RACI (WF §4) therefore carry both seats. Whether the Vendor Control Owner sits in Procurement, in a third-party-risk function or inside the AI organization is each adopting organization's choice (§12.4); the control needs the seat either way.

**Contract instrument per platform, as of 19 September 2026.**

| Platform | Governing instrument | Notice: published vs contractual | Reference clause set |
|---|---|---|---|
| Anthropic (API, Enterprise) | Commercial Terms of Service (effective 17 June 2025); enterprise agreement where negotiated | Published: ≥ 60 days retirement; terms change 30 days. Contractual: to be negotiated | MCC-AI-Light; Data Act as negotiating floor |
| Databricks | Master agreement; FMAPI terms | Published: ≥ 3 months retirement. Contractual: to be negotiated | MCC-AI-Light; Data Act Ch. VI (PaaS) |
| Microsoft (Copilot Studio, M365, Foundry) | Microsoft Product Terms; enterprise agreement; CCC | Published: Foundry 60/30 days; Message Center for product changes. Contractual: per EA | MCC-AI-Light; Data Act Ch. VI (SaaS and PaaS); EU Data Boundary |
| OpenAI | Business terms; enterprise agreement | Published: ≥ 6 months GA | MCC-AI-Light |
| Google / AWS | Cloud terms | Published per lifecycle page | Reference |

**Owner.** Legal owns the clauses; Procurement owns their application at renewal, or the Vendor Control Owner does where an organization has no Procurement function; the AIGB ratifies the checklist; Finance sits on the budget rows.

**Evidence at gates.** Gate 1: clause-checklist status per service cited in S4.2. Renewal: checklist applied and VSP contract block updated. Annually: exceptions for absent clauses reviewed.

**Phase.** 2 (checklist ratified), 3 (applied at the first renewals), 4 (all registered services covered or exception logged).

## 5. Approved AI Service Register — illustrative initial rows

The register is a governed table maintained by the Vendor Control Owner. The register uses these postures: approved; approved with conditions; pilot only; prohibited; and reference posture (no live dependency; the row exists so that a proposal starts from known coverage). The rows below are illustrative: they show the register as it would be proposed for AIGB approval in Phase 1 for an example multi-vendor estate, with some providers approved and others held at reference posture. VSP IDs are allocated when the VSPs are drafted in Phase 0. The equivalence profile column names the Harness §4 column (or Appendix B profile) that applies. The register also records the date of each row's last AIGB review, blank until the first review; that column is omitted here.

| Service | Posture | Approved uses | Prohibited uses / conditions | Equivalence profile | VSP ID | Exit path |
|---|---|---|---|---|---|---|
| Anthropic Console / API | Approved with conditions | Built agents via the organization's model-pins layer; direct API where Unity Gateway routing is not possible | Spend-limit, reconciliation, inference-geo and Covered Models conditions; EU data tiers requiring in-Geo processing prohibited; see note 1 | Harness §4 Anthropic column (Claude Code hooks reference implementation) | VSP-ANT-01 (Console sub-block) | Gateway binding; named substitute per tier; in-Geo substitute via Databricks Europe Geo |
| Anthropic Claude for Enterprise | Approved | Enterprise seats; Claude Code under managed settings (MRB-1 per SEC §6); SSO, RBAC, domain capture per Harness §9 | Conditions: organization, group and user monthly caps set; one identity per agent for per-agent attribution; ZDR by separate enablement where required | Harness §4 Anthropic column | VSP-ANT-01 (Enterprise sub-block) | As above; Compliance API export |
| Anthropic Claude Code (via Databricks Unity Gateway or Claude for Enterprise) | Approved with conditions | Coding agents under the Harness reference implementation; routed through Unity Gateway (using its support for Claude enterprise subscriptions) or under Claude for Enterprise | Conditions: `-p --max-budget-usd` and `--max-turns` on unattended runs; `dontAsk` with an allowed-tool list inside HRN-11 isolation per SEC; Console-to-Enterprise migration per Anthropic's guide [37] | Harness §4 Anthropic column; Databricks column where routed | VSP-ANT-01 / VSP-DBX-01 | Gateway binding |
| Anthropic Claude Managed Agents (beta) | Pilot only | Pilot under a written exception (Harness §2.1) | No production use while beta; VSP drafted and product facts verified before pilot | To be profiled | VSP-ANT-02 (to be drafted) | To be recorded |
| Databricks Foundation Model APIs / Unity Gateway / Agent Bricks | Approved | Built agents, such as the series' worked examples, the Portfolio Orchestration Engine (POE) [2] and LAAS [3]; FMAPI endpoints per tier; Unity Gateway as the governed route; Agent Bricks behind the gateway | Budget, reconciliation, external-provider, cross-Geo and retirement conditions; see note 2 | Harness §4 Databricks column | VSP-DBX-01 | Gateway is the abstraction; Unity Catalog export |
| Microsoft Copilot Studio | Approved with conditions | Configured agents for employee-facing use | Per-agent limit and hard stop before first use, with billing, tier, identity, registry, telemetry and DLP conditions; write-tool agents held below AGENT-DIRECTED; see note 3 | Appendix B, column 1 (PPAC) | VSP-MSFT-01 (PPAC plane) | Solution export; Dataverse export; rebuild path |
| Microsoft 365 Copilot agents | Pilot only pending equivalence verification | Pilot agents for licensed users | Billing-policy budget, pilot-only unlicensed access and a disconnect runbook; ceiling ≤ HITL-REQUIRED; see note 4 | Appendix B, column 2 (M365 admin center) | VSP-MSFT-01 (M365 plane) | Manifest export; Agent 365 registry |
| Microsoft Foundry Agent Service | Approved with conditions | Built agents where Microsoft is the natural platform; Microsoft Agent Framework (.NET / Python GA) as orchestration | Budget automation, upgrade and router pins, preview, legacy-framework and lifecycle conditions; see note 5 | Harness §4 Microsoft column | VSP-MSFT-02 | Application Insights export; alternate model in inclusion list |
| OpenAI Responses / Conversations APIs | Reference posture | None live; default no-training posture; Modified Abuse Monitoring or ZDR for Sensitive Personal Information per Harness §9 | Assistants API shut down 26 August 2026 — prohibited; preview models prohibited in production (~2 weeks' notice); GPT-5 and o3 families scheduled for shutdown on 11 December 2026 | Harness §4 OpenAI column | VSP-OAI-01 (to be drafted on first use) | — |
| Google Gemini Enterprise Agent Platform | Reference posture | None live; Vertex AI Agent Engine and SAIF alignment per Harness §9 | Auto-updated aliases prohibited for pinned deployments; Cloud Billing budgets alert-only; Gemini 2.5 family discontinued no earlier than 16 October 2026 | Harness §4 Google column | VSP-GCP-01 (to be drafted on first use) | — |
| AWS Bedrock AgentCore | Reference posture | None live | Bedrock cost allocation by IAM principal is attribution, not a cap; AWS Budgets enforcement not yet profiled | To be profiled | VSP-AWS-01 (to be drafted on first use) | — |

1. **Anthropic Console / API.** Conditions: organization and workspace spend limits set; daily Cost API reconciliation; `allowed_inference_geos` pinned; Covered Models only in workspaces with 30-day retention enabled and a DPIA note. Prohibited: EU data tiers requiring in-Geo processing (no EU inference geo).
2. **Databricks.** Conditions: budgets with Block usage and headroom; monthly reconciliation to `system.billing.usage`; external-provider caps treated as Beta; cross-Geo processing value recorded per workspace; pins moved before each announced retirement.
3. **Microsoft Copilot Studio.** Conditions: per-agent monthly limit, notification and hard stop configured in PPAC before first use; environment type (prepaid or PAYG) and billing plan recorded; tier declared; invoking identities and triggers documented (licensed-user "No charge" rule); Agent 365 record complete; PPAC daily export connected to HRN-07; DLP policies per Appendix B. Prohibited: AGENT-DIRECTED or FULLY-AUTONOMOUS positions for agents with write tools (no argument-level guard).
4. **Microsoft 365 Copilot agents.** Conditions: billing policy with budget limit and milestone emails; unlicensed-user access limited to the pilot policy; automated disconnect runbook drafted. Ceiling: ≤ HITL-REQUIRED (no per-agent cap).
5. **Microsoft Foundry Agent Service.** Conditions: Azure budget with evidenced action-group automation that reduces quota or TPM (alert-only otherwise; with the automation, HRN-12 coverage is Partial); `versionUpgradeOption` pinned; Model Router inclusion list pinned; Foundry Control Plane treated as evidence (preview). Legacy: Semantic Kernel and AutoGen — no new builds; migrate within the lifecycle window. Anthropic models on Foundry: 12-month lifecycle.

Two rules apply across the register. First, MCP servers the organization's agents connect to are registered as services with a reduced record (SEC cites this row set for tool-description integrity, SEC-19). Second, Salesforce Agentforce and ServiceNow Now Assist are not on the register; their Appendix B reference profiles exist so that a future proposal to use them starts from the class-based ceiling rather than from zero.

## 6. Roles and governance

**Vendor Control Owner.** Owns the Approved AI Service Register, every Vendor Service Profile and the Vendor Change Register; partners with Legal on the clause checklist and with Finance on budgets and showback; runs the monthly vendor-terms review; captures every vendor announcement within five working days. The role belongs in a Procurement or third-party-risk function where one exists; where an organization has no Procurement or third-party-risk function, the Vendor Control Owner role may sit with the Harness Engineer. The role's duties are defined by artifacts, so the seat can move without the controls changing. The Workflow lists it as the eleventh role (WF §4): Accountable for the register, the VSPs and the Vendor Change Register; Consulted on budgets and contracts; Responsible for the vendor watch in Standard S4.7.

**Finance partner.** Named in Phase 1; receives the monthly showback in the FOCUS-compatible export; owns the cost-per-unit target in S5.5 with the AI Product Owner; Consulted on every budget row and on any budget raised more than once in a quarter.

**Legal.** Owns the contract block of every VSP and the clause checklist; adapts MCC-AI-Light and MCC-AI-High-Risk; owns the transfer mechanism and the indemnity field; reviews the DAS ceiling that follows from a configured-agent profile; is consulted where Article 25(1) provider status is in question.

**Data Protection Officer.** Owns the data-protection block of every VSP; closes or assigns every open item with a date; holds the DPIA, which is not final while an open item lacks an owner or date; approves any tier change that alters retention class.

**Platform operator.** Operates the caps; verifies the configured-agent equivalence profiles against the organization's licenses; specifies and wires the enforcing automation where a vendor plane is alert-only (for example, a cloud-budget action group or a billing-policy disconnect runbook); runs the substitution drill.

**Harness Engineer.** Configures HRN-12 per agent; implements the reconciliation job and the lifecycle preflight check; owns the configured-agent profile; may hold the Vendor Control Owner role where the organization has no Procurement or third-party-risk function.

**The decision split between architecture review and the AIGB.** Architecture review owns architecture fit: tier design, gateway binding, exit paths and exit ADRs, and equivalence profiles. The AIGB owns risk posture: register postures, budgets raised repeatedly, exceptions, the clause checklist, vendor-change decisions with a DAS consequence, and the concentration report. A single item should not need both unless it changes a register posture and an architecture at once. The Finance / Procurement seat enters the CRISP-AG §5.1.1 approval matrix for any AGENT-DIRECTED or FULLY-AUTONOMOUS position whose actions consume metered vendor capacity, any budget above a threshold the AIGB sets, and any new registered service.

**RACI marks.** The Workflow's unified RACI carries the eleventh role with the following marks: W0 — Vendor Control Owner Consulted (VSP references, register rows); W2 (Gate 1) — Vendor Control Owner Consulted (VSP currency), Finance Consulted (budget); W4 (Gate 2) — Platform operator Responsible for cap configuration evidence; W7 (Gate 4) — Vendor Control Owner Consulted; change gate — Vendor Control Owner Responsible for CHG-05 capture. The Workflow's RACI (WF §4 and Appendix A) is authoritative.

## 7. Vendor Service Profile schema

The VSP has seven blocks: identity, commercial and metering, lifecycle, data protection, contract, exit and control. Appendix A is the full field table with the "Always" marking that defines the reduced Class 1 record. This section describes nine fields that go beyond a conventional vendor record, each made necessary by a verified vendor fact, and then states two structural rules.

**Billing plane (commercial; Always).** The admin console where the cap is set and the identity of the plane: PPAC for Copilot Studio; the Microsoft 365 admin center billing policy for M365 Copilot agents; Azure Cost Management for Foundry; the Console for the Anthropic API; the Enterprise admin plane for Claude for Enterprise; Unity Gateway for Databricks. A service with more than one plane has a sub-block per plane. Without this field, a schema cannot distinguish two planes of one vendor.

**Included-usage rules (commercial).** License entitlements that zero the meter and their conditions: on Copilot Studio, usage by a Microsoft 365 Copilot-licensed user under their own USL identity is "No charge", subject to fair-use limits and, for agent flows, to the "When an agent calls the flow" trigger. The field records which invoking identities and triggers of each configured agent fall inside the entitlement.

**Enforcement precision and latency (commercial; Always).** How exactly and how quickly the cap fires: "approximately, on a near-real-time estimate" (Unity Gateway Block usage); "daily consumption data" (PPAC); "8–24 h data latency, evaluated every 24 h, consumption not stopped" (Azure budgets); "blocks at cap, in-flight requests complete, reset 1st of month UTC" (Claude for Enterprise); "not stated" (Console workspace limit [35]; unverified). The headroom on the configured cap is derived from this field.

**Retention by model and tier (data protection; Always).** The default retention period and purpose, model-specific requirements (Anthropic Covered Models: 30-day minimum, ZDR unavailable unless authorized, workspace-level enablement), trust-and-safety retention for flagged content, ZDR eligibility per platform (API; Enterprise; Databricks FMAPI where Anthropic is a limited sub-processor for safety retention), and the platforms on which the terms apply. A single "Retention" field cannot hold the coupling between tier and retention that VC-02 depends on.

**Residency controls and price multiplier (data protection).** The residency controls actually available and their cost: Anthropic API `inference_geo` (`global` or `us`; `us` at 1.1×) on models 4.6 and later, workspace geo US-only, `allowed_inference_geos` per workspace; Databricks Geos; Copilot Studio EU Data Boundary; Foundry Data Zone and regional deployments. The multiplier flows into Standard S5.5 cost per unit.

**Cross-Geo processing setting (data protection).** The name of the setting and its configured value with evidence: Databricks cross-Geo processing (on by default outside the US and the EU without the compliance security profile); Copilot Studio "Disable data movement across geographic locations for Copilot Studio generative AI features outside the United States"; Anthropic `allowed_inference_geos`. The relay question of SDD DP-04 is answered by this field, not by assumption.

**IP indemnity scope and conditions (contract).** Scope, the conditions the deployer must meet and where the evidence lives. The Microsoft Customer Copyright Commitment, for example, applies to Copilot Studio conditional on the "Protected Material – Text" metaprompt and an evaluation report, and excludes bring-your-own-model output unless the model runs in Azure OpenAI with the required mitigations.

**Notice channels and programmatic lifecycle source (lifecycle).** How notices arrive and who receives them — Azure Service Health alert rules and subscription-owner email; Anthropic and OpenAI email to active deployments; Databricks retired-models page; Message Center for Microsoft product changes — and the machine-readable source where one exists (Foundry Models API `lifecycleStatus`, `deprecation.inference`). The preflight check reads the machine-readable source.

**Published-versus-contractual notice (contract).** For retirement, meter and price changes and for changes to the terms themselves: the vendor's published period, the contractual period if any, and which one currently applies. For Anthropic, the published period is 60 days, there is no contractual period under standard terms, and the terms themselves change on 30 days' notice.

**Structural rules.** A VSP with more than one billing plane or consumption channel carries a commercial sub-block per plane (for example, Anthropic: Console API, Claude for Enterprise, Databricks FMAPI via Unity Gateway; Microsoft: PPAC, M365 admin center billing policy). The reduced Class 1 record carries every "Always" field, which includes billing plane, enforcement precision and retention by model and tier.

## 8. Phased rollout

The schedule assumes an organization with two review bodies. Three rules keep the change measured. No control is enforced before it has been observed for at least one full billing cycle on a pilot, so thresholds come from telemetry. Each phase ships exactly one coordinated release of the organization's standards, with each standard passing through its own change control, and nothing changes between phases. Every control moves observe → alert → enforce, and a product that cannot meet an enforced control takes a written exception under Harness §2.1 (with a 90-day expiry and a compensating control) rather than an informal pass.

| Phase | Indicative length | Theme | What the organization's standards change | What becomes mandatory |
|---|---|---|---|---|
| 0 — Stabilize | Immediate; a few weeks | Switch on the caps that exist; inventory; baseline current spend; rehearse a retirement | Nothing normative. Open items registered; this specification reviewed by the AIGB and at architecture review | Nothing in the standards. Operationally: per-agent limits on every live configured agent where the platform offers them; budgets on every policy-level billing plane; gateway budgets in alert mode; spend limits on direct API and enterprise subscriptions |
| 1 — Define and observe | About one quarter | The artifacts exist; the metrics are tracked; two pilots run | This specification and the Security Specification adopted; vendor-control definitions added to the PRD template, the governance artifacts, the harness controls (HRN-12 in observe mode) and the design standard | VSPs for the current vendors; register published; tier declared for pilots; cost metrics tracked, not thresholded |
| 2 — Alert and gate | About one quarter | Gates check the artifacts; alerts fire; vendor changes are tracked | Gate checks added to the delivery workflow (W0, W2, W4 and W7 exit checks) and to the PRD, harness and design standards | For new products: VSP and register row at W0; tier justification at Gate 1; budget with 80% alert before production. Vendor Change Register live. Clause checklist ratified |
| 3 — Enforce and retrofit | About one quarter | Hard caps everywhere; retrofit; contracts; first drill | Thresholds set from Phase 1–2 telemetry and made normative in the PRD and harness standards | Hard cap and tier table on every production agent, built or configured; premium-tier ceiling per product; exit ADR per dependency; clause checklist at every renewal; substitution drill #1 |
| 4 — Sustain | About two months | Re-baseline; evidence pack; hand over | Small: SLO re-baseline; glossary settled | Annual cadence: VSP review, concentration report, substitution drill, re-tiering review. ISO/IEC 42001 A.10 alignment evidence pack assembled |

### 8.1 Phase 0 — Stabilize (immediate)

Nothing normative changes. The point of the phase is to stop unchecked consumption at once, while the specifications are being adopted, and to gather the facts the later phases need.

The operational actions are taken as an interim measure with AIGB approval, which is minuted. On every vendor admin plane that offers per-agent controls, every live configured agent gets a monthly limit, a notification and a hard stop. The overflow posture is decided per environment so that a hard stop does not become a service outage, and the environment type and billing plan are recorded. On planes that offer only policy-level budgets, every billing policy gets a budget limit with milestone notifications, and a written disconnect runbook names who may disconnect a policy and what that does to the users linked to it.

On model gateways, every endpoint gets a budget in alert mode, with the blocking headroom calculated from the estimated-versus-billed delta observed during the phase. On direct model APIs and enterprise assistant subscriptions, organization- and workspace-level spend limits are set, with per-group or per-user caps where offered. All direct API and coding-agent use is routed through a gateway or an enterprise agreement so that it is attributed, and data-residency and retention settings are checked per workspace, with a DPO note for any exception.

The inventory lists every agent running or configured on a vendor service, with its runtime, model tier in use, invoking identities and triggers (and, where a platform exempts licensed users from metering, which fall inside that entitlement), monthly spend for the last three months and whether a cap exists. It is the AIR completeness exercise CRISP-AG §5.5 recommends, done with a cost column. It includes a check that every live agent holds a complete record in its platform's current agent registry; where a vendor retires a registry API, agents not re-registered can stop functioning (VC-06).

The baseline is a short written record, in the incident form the Harness runbook uses, of current consumption and of any overrun that prompted adoption: what was spent, on which plane, at which tier, against which meter and under which identities and triggers, and which admin controls existed but went unused. It becomes the evidence line for VC-01 to VC-03 in every later review and the first exercise of the VSP schema.

Draft VSPs are written for every vendor service in the inventory: model APIs, model gateways, enterprise assistant subscriptions and configured-agent platforms. Each vendor's sub-processor list is read from its live trust page and recorded.

The retirement rehearsal uses the next vendor retirement that touches a pinned identifier — for example, a model gateway's scheduled retirement of a pinned model identifier, with the successor the vendor names in its retired-models policy. It is a live rehearsal of the Vendor Change Register: capture the announcement, name the successor, run the pilot product's suite against it (including the sampling-parameter contract, since the successor generation may differ), move the pin under CHG-05, retain the previous pin for rollback until the retirement date, and time the whole exercise. Other announced retirements are captured as register entries as they occur; a retirement reported only by secondary sources is entered as unconfirmed until the Vendor Control Owner confirms it against the vendor's primary deprecation page.

The decisions requested of the governance bodies in this phase are where the Vendor Control Owner role sits and which function applies the clause checklist at renewals, and whether to pursue ISO/IEC 42001 certification.

Exit criteria: every live configured agent capped on its own plane; inventory and baseline written; draft VSPs for the current vendors on every plane; the retirement rehearsal completed and timed; open items registered with owners; this specification reviewed by both bodies.

### 8.2 Phase 1 — Define and observe

The Phase 1 release lands the definitions in the organization's own standards. This specification and the Agentic Security Specification are adopted, and the governance framework's vendor-supplied-agent and VSP provisions (per CRISP-AG §5.8 and §5.9) cite this specification. The PRD template gains its S1.9, S4.5 and S5.5 content and glossary terms. The harness standard gains HRN-12 in observe mode, its vendor register (per Harness §9), the configured-agent equivalence profiles marked proposed, and the Vendor Control Owner role. The design standard gains the binding pin (SDD Principle 11), the DP-04 schema and CHG-05, and the pilot product's specification gains cost and tier requirements.

Two pilots run for the whole phase: one built agent behind a model gateway (gateway budgets, tier table, cost per unit of work) and one configured SaaS agent on a platform with per-agent limits (per-agent limit, the platform's daily consumption export fed to HRN-07). A third, smaller observation runs on one policy-level billing plane: one billing policy's milestone emails and cost data are compared with the per-agent platform's export to establish the plane's latency. The pilots produce the numbers from which the Phase 2 and 3 thresholds are set.

Capability building sits in this phase. The Vendor Control Owner reads each vendor's billing, deprecation and data-terms documentation against the VSP schema and closes the SDD C1.3 items with the vendors' account teams. A Finance partner is named and receives the first monthly showback in the FOCUS-compatible export. The FinOps Foundation's FinOps for AI material is the shared curriculum; a 30-minute monthly vendor-terms review begins and continues through Phase 4.

Exit criteria: the Phase 1 release merged through each standard's change control; register published with postures for all current services; VSPs current for the current vendors with data-protection blocks populated and open items owned; two pilots with three months of cost-per-unit, premium-tier-share and cap-event data; substitution suite run once on the pilot.

### 8.3 Phase 2 — Alert and gate

The Phase 2 release makes the gates check the artifacts for new products: VSP and register row in the W0 packet; tier justification at Gate 1; budget with an 80% alert before production. Alerts are turned on for all production agents; hard caps remain on pilots only. The Vendor Change Register goes live with its five-day capture rule and its monthly digest of changes inside 90 days. The clause checklist (Appendix C) is ratified by the AIGB with Legal, and the Finance / Procurement seat enters the CRISP-AG matrix. The EU Data Act's abolition of switching charges takes effect on 12 January 2027. For services contracted by the organization's EU-established entities, Legal uses it as the floor for the exit and export terms in the checklist, and records for each service whether the Act applies (platform layers) or is a negotiating position (model APIs).

Existing production agents are not yet held to the gates; they are listed with their gap against each control and a retrofit order agreed with their product owners, so that Phase 3 is a scheduled program rather than a surprise.

Exit criteria: the Phase 2 release merged; first product through W0 and Gate 1 with the new checks; alerts live on all production agents with at least one alert exercised end to end on each plane; Vendor Change Register with every announcement in the window captured on time; clause checklist ratified; retrofit list agreed; first quarterly AIGB review of the register held.

### 8.4 Phase 3 — Enforce and retrofit

The Phase 3 release sets the thresholds from the telemetry of Phases 1 and 2 and makes them normative: hard caps on every production agent, built or configured; a premium-tier ceiling per product in S5.5; exit ADRs per dependency; HRN-12 fully enforcing with `harness_spend_vs_budget` and `harness_premium_tier_share` thresholded. The retrofit program runs in the order agreed in Phase 2, one product at a time, each through the Harness §10 cutover pattern. The clause checklist is applied at the first renewals that fall in the window. The first substitution drill moves one production agent to its named substitute at one tier and is timed, with the S2 suite and integral data transfer as the pass conditions.

An agent that cannot meet an enforced control by the end of the phase takes a written exception under Harness §2.1 with a compensating control. For a configured agent with no enforceable cap, the compensating control is the DAS ceiling of VC-06. For a deployment on an alert-only plane whose enforcing automation is not yet wired, it is a documented alert-only posture with a manual runbook and an expiry. Exceptions are the measured-change valve: they make the gap visible and time-boxed instead of letting the control revert to advice.

Exit criteria: the Phase 3 release merged; every production agent capped and tiered or under a logged exception; premium-tier share within ceiling for two consecutive months per product; exit ADRs for all dependencies; substitution drill completed and timed; renewals in the window reviewed against the checklist.

### 8.5 Phase 4 — Sustain

The Phase 4 release is small: SLO thresholds re-baselined on 12 months of data, and the glossary settled. The annual cadence starts: VSP review, concentration report to the AIGB (per model vendor and per underlying cloud), substitution drill, and the re-tiering review of §9. The ISO/IEC 42001 Annex A.10 alignment evidence pack is assembled from the register, the VSPs and the Vendor Change Register; whether it is presented for certification is a separate AIGB decision (§12.4). Ownership passes from the change program to the steady-state roles.

Exit criteria: 12 months of cost telemetry with thresholds reset; all open items closed or carried with owners; evidence pack assembled; next-year calendar of reviews, renewals, drills and re-tiering published.

### 8.6 Change control

Each phase's release passes through the change control of every standard it touches, as the organization has adopted that standard. For the harness standard, this is a pull request reviewed by two AIGB members, with AI Risk Officer sign-off for changes to the controls it takes from Harness §4 or §7 and for exceptions under Harness §2.1. For the design standard, it is one owner per term in its shared vocabulary and CHG-01 to CHG-05 for the systems it specifies (per SDD). For the delivery workflow, it is an edit to its machine-readable definition, which is its source of truth. For the PRD standard and the governance framework, it is a new version with its record of what changed. The organization's vendor-control standard is revised when Phase 3 sets thresholds. The registers and the VSPs change under their own version fields, not by reissuing the standard.

## 9. Measures of success

These are the numbers the AIGB sees each quarter. Baselines come from Phase 0; targets are set in Phase 3 from Phase 1–2 telemetry and are indicative here.

| Measure | Definition | Phase 0 baseline | Indicative target by Phase 4 |
|---|---|---|---|
| Spend under cap | Share of agentic and model spend on services with an enforceable hard cap configured (alert-only planes count only once the enforcing automation is evidenced) | To be measured in Phase 0 | 100% of production agents; exceptions logged |
| Premium-tier share | Premium or reasoning-tier calls ÷ all calls, per product | To be measured in Phase 0 | Per-product ceiling met two months running |
| Cost per unit of work | Spend ÷ units of work, by tier and by vendor service, including residency multipliers (Standard S5.5) | From the pilots in Phase 1 | Within S5.5 target; alert on 2× 30-day baseline |
| Cap events | Hard-cap or hold events per agent per month, with estimated-versus-billed delta | — | Tracked; each has a ledger entry and a decision |
| VSP currency | Dependencies with a VSP inside its review date and with no unrecorded register entry ÷ all dependencies | To be measured in Phase 0 | 100% |
| Vendor change lead time | Days from vendor announcement to register entry; days from entry to substitution-suite pass | Retirement rehearsal (Phase 0) | ≤ 5 working days; suite passed before the notice window closes |
| Substitution drill | Time to move one production agent to its substitute at one tier, with integral data transfer | From the first drill (Phase 3) | Completed and timed annually |
| Concentration | Share of production agents and of spend per model vendor and per underlying cloud provider | From the inventory | Reported annually; no target — a decision input |
| Governance load | Vendor items per board meeting; exceptions open past 90 days | — | Exceptions past expiry: zero (Harness §2.1) |
| Re-tiering review | Tiers whose price-performance is dominated by a cheaper model that passes the S2 suite, found at the quarterly review against current list prices | — | Reviewed quarterly; each candidate re-tiered or the decision recorded |

The last measure exists because the more likely drift in a buy environment is not a rise in cost but a fall in list prices while the organization keeps paying for a pinned premium tier. The Stanford AI Index [85] (unverified) reports a fall of more than 280× in the cost of GPT-3.5-level performance between November 2022 and late 2024, and the 2026 Index reports that inference cost continues to decline across task tiers. This specification relies on the direction of the trend, not on any figure. The `harness_cost_per_unit` metric alerts on a rise; the re-tiering review catches the fall.

## 10. Standards mapping

The mapping is to the controls of this document. Where only a secondary source is available for a standard's text, the control is cited by number and marked unverified (§12.1).

| Standard / framework | Provision | VCS control(s) | Note |
|---|---|---|---|
| ISO/IEC 42001:2023 Annex A [65], [66] | A.10.2 allocating responsibilities across the AI life cycle; A.10.3 suppliers; A.10.4 customers | VC-03, VC-04, VC-09 (A.10.2, A.10.3); VC-06, VC-07 where an agent serves the organization's clients (A.10.4) | Control titles only (unverified). Alignment; certification is a separate AIGB decision |
| NIST AI RMF 1.0 [61], [62] | GOVERN 6.1 — "Policies and procedures are in place that address AI risks associated with third-party entities, including risks of infringement of a third party's intellectual property or other rights" | VC-03, VC-07 (IP indemnity field), VC-09 | IP infringement named as a third-party risk |
| NIST AI RMF 1.0 [61], [62] | GOVERN 6.2 — "Contingency processes are in place to handle failures or incidents in third-party data or AI systems deemed to be high-risk" | VC-05, VC-08 | Scoped to high-risk third parties; drill mandatory for consequential-decision and FULLY-AUTONOMOUS agents' dependencies |
| NIST AI RMF 1.0 [61], [63] | MAP 4.1 — mapping legal risks of third-party components; suggested action "Inventory third-party materials (hardware, software, data, models)" | VC-03, VC-04 | The register is the inventory; the VSP its row |
| NIST AI 600-1 [64] | §2.12 Value Chain and Component Integration (actions GV-6.1-001..010, GV-6.2-001..007, MP-4.1-006/007) | VC-03, VC-05, VC-07 | — |
| EU AI Act (Reg. 2024/1689 as amended by Reg. 2026/1744) [67], [68] | Art. 25(1) deployer becomes provider on repurposing or substantial modification; Art. 25(4) written agreement between high-risk provider and third-party supplier | VC-09 (25(4) as information floor); VC-06 (25(1) as AISIA trigger) | 25(4) binds providers; an adopting organization is normally a deployer. MCC-AI-Light / High-Risk (5 March 2025) as non-binding templates |
| EU Data Act (Reg. 2023/2854) [70], [71] | Chapter VI switching between data processing services; in application 12 September 2025; switching charges abolished 12 January 2027 | VC-08, VC-09 | Rights of the organization's EU-established entities as customers; platform layers in scope; model-API applicability unsettled; Digital Omnibus amendments watched (VC-05) |
| OWASP LLM Top 10 2026 (3 August 2026) [75] | LLM04 Supply Chain; LLM06 Unbounded Consumption | LLM04 → VC-03, VC-05, VC-09; LLM06 → VC-01 (HRN-12), VC-02, VC-06 | 2026 numbering with edition tag; Harness §6.1 map uses the 2026 numbering |
| OWASP Top 10 for Agentic Applications 2026 (9 December 2025) [76] | ASI04 Agentic Supply Chain Vulnerabilities | VC-03, VC-05, VC-09 (AgBOM demanded from vendors) | SEC owns the runtime side |
| OWASP Agent Control Standard v0.1 (1 September 2026, public preview) [77] | AgBOM via CycloneDX, SPDX or SWID | VC-09 (form of the vendor action inventory) | Vocabulary, not an enforcement mechanism |
| CSA AI Controls Matrix v1.1 (14 July 2026) [74] | STA domain — Supply Chain Management, Transparency and Accountability; shared-responsibility model | VC-03, VC-04, VC-06 | 247 control objectives across 18 domains; mapped by CSA to ISO 42001, NIST AI RMF, AI 600-1 and the EU AI Act |
| DORA (Reg. 2022/2554) [72] | Art. 28(3) register of information; 28(6) concentration assessment; 28(8) exit strategies; Art. 29 concentration risk | VC-04, VC-08 | Analogue only — for an organization that is not a financial entity; used for client due-diligence alignment |
| UK Critical Third Parties regime (live 13 July 2026) [73] | HM Treasury designations: AWS EMEA SARL, Google Cloud EMEA Ltd, Microsoft Ireland Operations Ltd, Oracle Corporation UK Ltd | VC-08 (concentration per underlying cloud) | No AI-model provider designated |
| FinOps Foundation — FinOps for AI (updated 17 February 2026) [79] | Usage limits and quotas; anomaly detection; tagging for allocation; showback; right-sizing models; cost per inference and per token | VC-01, VC-02, §9 measures | Reference practices, not a new program |
| FinOps Foundation — FOCUS v1.2 [80] | `ConsumedUnit`, `PricingUnit` and SKU columns; `x_` custom columns | VC-01 showback export; VC-08 evidence portability | No AI fields; FOCUS 1.3 [81] (unverified) |
| OpenTelemetry GenAI semantic conventions (Development stability) [82] | `gen_ai.usage.*`, `gen_ai.request.model`, `gen_ai.provider.name` | VC-01 telemetry; VC-08 | No cost attribute; `org.cost.*` is a versioned, organization-defined extension |
| Colorado SB 26-189 (effective 1 January 2027) [78] | Developer-to-deployer disclosures | VC-07 (evidenced in the VSP data-protection block via CRISP-AG §5.8) | No impact-assessment duty in the Act; the AISIA is CRISP-AG's requirement |

## 11. Risks to the rollout

| Risk | Handling |
|---|---|
| Over-control slows adoption and drives agents outside the process | The Lite form keeps four items always on (VSP reference, budget and cap, tier declaration, registry entry); every control is observed before it is enforced; caps are sized from the pilots; "approved with conditions" lets a service be used while its terms are completed |
| A vendor will not supply terms, action inventory or notice | CRISP-AG §5.8 and VC-06 turn that into a DAS ceiling rather than a blocked deployment; the register records the posture; the AIGB decides whether to live with the ceiling |
| Limited governance bandwidth | One coordinated release per phase; monthly digest limited to vendor changes inside 90 days; the architecture-review/AIGB split in §6 sends each item to one body |
| The Vendor Control Owner role has no natural home | Where an organization has no Procurement or third-party-risk function, the role may sit with the Harness Engineer; duties are defined by artifacts, so the seat can move later without the controls changing |
| Vendor admin controls are blunter than the harness (a hard stop that turns the agent off; daily data; approximate blocking; cloud budgets that do not stop consumption; a policy-level stop that removes user access; §12.3) | Alert thresholds before the stop; overflow posture per environment in Phase 0; headroom on approximate caps with monthly reconciliation; enforcing automations specified by the platform operator for alert-only planes; the equivalence profile states the limitation and the DAS consequence |
| Shadow adoption of a new vendor service | Register plus platform allow-lists (Unity Gateway endpoints; Power Platform DLP; Foundry inclusion lists); the shadow-AI amnesty pattern of CRISP-AG §5.7 applied once to vendor services in Phase 1 |
| Deprecation cadence outruns the process | Five-day capture; named successor per pin; programmatic lifecycle sources read by preflight; preview models excluded from production unless notice ≥ substitution window; a live vendor retirement rehearsed in Phase 0 |
| Lifecycle diverges by channel (Opus 4.1 retired at Anthropic, still served on Databricks) | Register tracks each channel's date; the VSP carries per-channel lifecycle fields |
| A tier change silently changes retention, residency or the request contract | VC-02 records retention class, residency options and sampling contract per tier; a change is a DP-04 change and, for retention, a DPIA trigger; the substitution suite exercises the request contract |
| Threshold set wrong | Thresholds are tracked-only until Phase 3 and re-baselined in Phase 4; a wrong threshold produces alerts, not outages, until then |
| Verification gaps in this specification (Console cap behavior; Anthropic sub-processors; Vertex and Bedrock caps) | Each is listed in §12.1 with its consequence and is closed in Phase 0 or Phase 1; coverage is written as Partial or Alert-only until closed |

## 12. Discussion and limitations

### 12.1 Verification status

Every external claim in this specification carries its publisher, title and date. The items below rest on no primary source, or only a partial one, as of September 2026; in the body they carry "(unverified)", and the reference list marks secondary sources. Each item's coverage is held at the lower grade until it is closed.

| Item | Status | Consequence |
|---|---|---|
| ISO/IEC 42001:2023 Annex A control text for A.10.2, A.10.3 and A.10.4 [65] | Control titles from a secondary source [66] | Controls are cited by number; no control wording is quoted |
| Anthropic sub-processor list [45] | Primary source not confirmed | The Anthropic VSP sub-processor field is populated by the Vendor Control Owner from the live page in Phase 0 |
| FOCUS specification v1.3 (ratified 5 December 2025) and its lack of AI fields [81] | Secondary source only | The showback export is built on FOCUS v1.2 [80] with `x_` custom columns |
| Google Cloud Billing budget and AWS Budgets cap behavior on Vertex AI and Bedrock | Primary source not confirmed | Both are recorded as alert-only until the platform operator confirms otherwise |
| Stanford AI Index inference-price figures (the 2025 280× figure and the 2026 trend) [85] | Report summary only; the 280× figure is from a secondary source | The direction of the trend is used; neither the 280× figure nor any 2026 figure is quoted as verified fact |
| Anthropic Console behavior when a workspace spend limit is reached [35] | Not stated in the vendor documentation | Console coverage for HRN-12 is "Partial" until confirmed |
| OpenAI project budgets and usage limits as an HRN-12 equivalent | Primary source not confirmed | OpenAI is a reference posture, not a live dependency |
| Unity Gateway "External Model Spend in Budgets" general availability date [50] | Beta (release note 28 August 2026) | External-provider caps are treated as Beta until general availability |
| Whether Claude inference on Databricks FMAPI for non-Covered models stays inside the Databricks perimeter | Open; the Covered-Model half is closed by the Databricks supported-models page [53] | Assigned to the DPO with the vendors' account teams |

### 12.2 Vendor facts that are easy to misstate

The following facts are easy to get wrong, and each changes what a control can claim. Except where marked unverified, they are stated here as the primary sources give them.

1. Azure Cost Management budgets alert but do not stop consumption; their data arrives 8–24 hours late and they are evaluated every 24 hours [12]. Google Cloud budgets are likewise alert-only (unverified).
2. Anthropic models on Microsoft Foundry run a 12-month lifecycle, not the 18 months that applies to Microsoft and OpenAI models; DeepSeek, Fireworks and Mistral AI models are also on 12 months [14].
3. The OpenAI Assistants API shut down on 26 August 2026; the Responses and Conversations APIs are the permitted surfaces [55].
4. The EU Data Act's switching rights apply because an organization's EU-established entities are customers of data processing services, not because the organization serves EU clients. Whether a model API is a data processing service is unsettled [70], [71].
5. Anthropic's 60-day retirement notice is a published policy, not a clause of its Commercial Terms; the Commercial Terms themselves change on 30 days' notice [26], [28].
6. Microsoft 365 Copilot agents are capped through Microsoft 365 admin center billing policies — a budget on a policy, with no per-agent limit — not through the per-agent limits of the Power Platform admin center [10], [11].
7. Unity Gateway "Block usage" thresholds are enforced approximately, on a near-real-time estimate, and spend caps for external providers routed through the gateway are Beta (28 August 2026) [49], [50].
8. The 100-credit premium rate and the 125% enforcement point on Copilot Studio are stated by Microsoft Learn (3 August 2026), which also carries the rule that usage by a Microsoft 365 Copilot-licensed user under that user's own identity is "No charge" [7].
9. On that meter the premium tier costs approximately 6.7 times the standard tier (100 ÷ 15 credits per 10 responses) and 50 times a single generative answer (2 credits). It does not cost 50 times the standard tier [7].
10. In the 2026 edition of the OWASP LLM Top 10, Supply Chain is LLM04 and Unbounded Consumption is LLM06; in the 2025 edition they were LLM03 and LLM10 [75].
11. Deprecation cadence is evidenced from the vendors' primary deprecation records only. A secondary claim that three providers retired models within the same 72 hours in July 2026 is not supported by OpenAI's deprecation record and is not relied on.

### 12.3 Weakest points

- **The configured-agent profiles are proposed, not verified.** Appendix B must be checked against a tenant's licenses and the current admin documentation before it becomes normative in Phase 2. For Salesforce Agentforce and ServiceNow Now Assist, only the consumption, alerting and rate-limit rows were verified.
- **Vendor admin controls are blunter than a harness.** A Copilot Studio hard stop turns the agent off; PPAC data is daily; Unity Gateway blocks approximately; Azure and Google budgets do not stop consumption; and the only Microsoft 365 Copilot hard stop removes access for every user linked to the policy. The specification states each limit and its DAS consequence rather than claiming more.
- **No standard names these artifacts.** The Vendor Service Profile and the register are instances of what NIST AI RMF MAP 4.1 and GOVERN 6.1, ISO/IEC 42001 A.10.3, the CSA AI Controls Matrix and DORA Article 28 expect. None of them names either artifact, and the specification does not claim otherwise.
- **Thresholds need telemetry.** Budgets, alert thresholds and the premium-tier ceiling are tracked, not enforced, until Phase 3, and are re-baselined in Phase 4. A number set before the data exists would be a guess presented as a standard.
- **The facts are dated.** Prices, notice periods and admin features were read in September 2026 and will change. The Vendor Service Profile holds the current value, and the Vendor Change Register is how it stays current.
- **Reference postures are not assessments.** The OpenAI, Google and AWS rows record what is known, so that a proposal to use those services starts from known coverage; they do not evaluate those platforms.

### 12.4 Open questions

- **Where the Vendor Control Owner sits.** Whether the role sits in a Procurement or third-party-risk function or in the AI organization is each adopting organization's choice. The role's duties are defined by artifacts, so the seat can move without the controls changing.
- **Certification.** Whether to pursue ISO/IEC 42001 certification is a separate governance decision. The Annex A.10 alignment evidence is assembled in Phase 4 either way.
- **The model layer under the EU Data Act.** Until it is settled whether a model API is a data processing service, the Act's switching terms are a negotiating floor for the model layer and an entitlement only for the platform layers.

## 13. Conclusion

An agentic system bought from vendors is governed only as far as the vendor's terms are known, recorded and enforced. The Vendor Control Specification makes that concrete in nine controls, each with a rule, an enforcement table that grades every platform's coverage honestly, an owner, gate evidence and a rollout phase. Its central discipline is the one the rest of the series applies to agents themselves — enforce rather than guide — carried into the commercial layer. A budget is a cap in a layer that can refuse; a model tier is a pinned identifier the agent cannot change; and where a vendor plane can only alert, the gap becomes an autonomy ceiling rather than an assumption. In the reference failure pattern, the controls that would prevent the loss already exist in the vendor's product. What is missing is a specification that requires someone to switch them on, records what they actually do, and names who owns them.

## Acknowledgements

Research and drafting assistance from Claude (Anthropic); all decisions and claims are the author's.

## How to cite

Reed, D. (2026). *Vendor Control Specification* (Version 1.0). Agentic AI Governance in Practice, Part 6. https://drdavidreed.com/papers/vendor-control-specification/

This paper is licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

## References

1. Reed, D. [*CRISP-AG: An Artifact-Centered Framework for Enterprise Agentic AI Governance*](/papers/crisp-ag/), v3.0. Agentic AI Governance in Practice, Part 1, 2026.
2. Reed, D. [*Agentic PRD Standard*](/papers/agentic-prd-standard/), v3.10.2. Agentic AI Governance in Practice, Part 2, 2026.
3. Reed, D. [*Specification-Driven Design for Agentic Systems*](/papers/specification-driven-design/), v1.0.3. Agentic AI Governance in Practice, Part 3, 2026.
4. Reed, D. [*Enterprise Agentic AI Harness Specification*](/papers/agentic-harness-specification/), v1.3. Agentic AI Governance in Practice, Part 4, 2026.
5. Reed, D. [*Agentic Security Specification*](/papers/agentic-security-specification/), v1.0. Agentic AI Governance in Practice, Part 5, 2026.
6. Reed, D. [*Agentic Delivery Workflow*](/papers/agentic-delivery-workflow/), v1.10. Agentic AI Governance in Practice, Part 7, 2026.
7. Microsoft Learn. [*Copilot Credits billing rates*](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-messages-management). 3 August 2026.
8. Microsoft Learn. [*Billing and licensing (Copilot Studio)*](https://learn.microsoft.com/en-us/microsoft-copilot-studio/billing-licensing). 3 August 2026.
9. Microsoft Learn. [*Manage Copilot Credits and capacity for Copilot Studio*](https://learn.microsoft.com/en-us/power-platform/admin/manage-copilot-studio-copilot-credits-capacity). 19 August 2026.
10. Microsoft Learn. [*Microsoft Copilot Pay-as-You-Go Service Overview*](https://learn.microsoft.com/en-us/microsoft-365/copilot/pay-as-you-go/overview). 18 August 2026.
11. Microsoft Learn. [*Meters for Microsoft 365 Copilot Pay-as-You-Go Services*](https://learn.microsoft.com/en-us/microsoft-365/copilot/pay-as-you-go/meters). 18 August 2026.
12. Microsoft Learn. [*Tutorial: Create and manage budgets*](https://learn.microsoft.com/en-us/azure/cost-management-billing/costs/tutorial-acm-create-budgets). Azure Cost Management.
13. Microsoft Learn. [*Model router for Microsoft Foundry*](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-router). 1 September 2026.
14. Microsoft Learn. [*Foundry Models lifecycle and support policy*](https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/model-retirements). 24 July 2026.
15. Microsoft Learn. [*Model lifecycle and retirement (Foundry)*](https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/model-lifecycle-retirement). 14 September 2026.
16. Microsoft Learn. [*Security and governance (Copilot Studio)*](https://learn.microsoft.com/en-us/microsoft-copilot-studio/security-and-governance). 4 August 2026.
17. Microsoft Learn. [*Geographic data residency in Copilot Studio*](https://learn.microsoft.com/en-us/microsoft-copilot-studio/geo-data-residency). 17 September 2025.
18. Microsoft Learn. [*Customer Copyright Commitment Required Mitigations*](https://learn.microsoft.com/en-us/legal/cognitive-services/openai/customer-copyright-commitment).
19. Microsoft Learn. [*What is Microsoft Foundry Control Plane?*](https://learn.microsoft.com/en-us/azure/foundry/control-plane/overview) 6 May 2026 (updated 13 August 2026).
20. Microsoft Learn. [*Microsoft Foundry Agent Service overview*](https://learn.microsoft.com/en-us/azure/ai-foundry/agents/overview). 11 September 2026.
21. Microsoft Learn. [*Microsoft Agent Framework overview*](https://learn.microsoft.com/en-us/agent-framework/overview/agent-framework-overview). 29 July 2026.
22. Microsoft Learn. [*What are agent identities?*](https://learn.microsoft.com/en-us/entra/agent-id/what-are-agent-identities) Microsoft Entra Agent ID documentation. 15 June 2026.
23. Microsoft Learn. [*Microsoft Entra releases and announcements*](https://learn.microsoft.com/en-us/entra/fundamentals/whats-new).
24. Microsoft. [*Message Center MC1297981*](https://mc.merill.net/message/MC1297981). 1 May 2026.
25. Microsoft Tech Community. [*Microsoft 365 E7 and Agent 365 are now generally available*](https://techcommunity.microsoft.com/blog/microsoft_365blog/microsoft-365-e7-and-agent-365-are-now-generally-available/4516295). 1 May 2026.
26. Anthropic. [*Model deprecations*](https://platform.claude.com/docs/en/about-claude/model-deprecations).
27. Anthropic. [*Commitments on Model Deprecation and Preservation*](https://www.anthropic.com/research/deprecation-commitments). 4 November 2025.
28. Anthropic. [*Commercial Terms of Service*](https://www.anthropic.com/legal/commercial-terms). Effective 17 June 2025.
29. Anthropic. [*Spend Limits API*](https://platform.claude.com/docs/en/manage-claude/spend-limits-api).
30. Anthropic. [*Usage and Cost Admin API*](https://platform.claude.com/docs/en/build-with-claude/usage-cost-api).
31. Anthropic. [*Data residency*](https://platform.claude.com/docs/en/manage-claude/data-residency).
32. Anthropic. [*API and data retention*](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention).
33. Anthropic. [*API release notes*](https://platform.claude.com/docs/en/release-notes/api). Entries of 30 June and 24 July 2026.
34. Anthropic. [*Responsible Scaling Policy*](https://www.anthropic.com/responsible-scaling-policy). Version 3.4, effective 8 July 2026.
35. Claude Help Center. [*Creating and managing Workspaces in the Claude Console*](https://support.claude.com/en/articles/9796807-creating-and-managing-workspaces-in-the-claude-console).
36. Claude Help Center. [*Claude Enterprise consumption guide*](https://support.claude.com/en/articles/14782391-claude-enterprise-consumption-guide).
37. Claude Help Center. [*Claude Code on Console to Enterprise migration*](https://support.claude.com/en/articles/14128775-claude-code-on-console-to-enterprise-migration).
38. Claude Help Center. [*Covered models*](https://support.claude.com/en/articles/15425695-covered-models).
39. Claude Code docs. [*Zero data retention*](https://code.claude.com/docs/en/zero-data-retention).
40. Claude Code docs. [*CLI reference*](https://code.claude.com/docs/en/cli-reference).
41. Claude Code docs. [*Track cost and usage*](https://code.claude.com/docs/en/agent-sdk/cost-tracking). Agent SDK.
42. Claude Code docs. [*Monitor Claude Code usage with OpenTelemetry*](https://code.claude.com/docs/en/monitoring-usage).
43. Anthropic Privacy Center. [*Where are your servers located? Do you host your models on EU servers?*](https://privacy.claude.com/en/articles/7996890-where-are-your-servers-located-do-you-host-your-models-on-eu-servers)
44. Anthropic Privacy Center. [*How long do you store my organization's data*](https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data).
45. Anthropic Trust Center. [*Sub-processors*](https://trust.anthropic.com/subprocessors) (unverified).
46. Databricks blog. [*Introducing AI Spend Controls with Unity AI Gateway*](https://www.databricks.com/blog/introducing-ai-spend-controls-unity-ai-gateway). 23 July 2026.
47. Databricks blog. [*How Databricks manages its own coding agent spend with Unity Gateway Budgets*](https://www.databricks.com/blog/how-databricks-manages-its-own-coding-agent-spend-unity-ai-gateway-budgets). 28 July 2026.
48. Databricks blog. [*Unity Gateway is Generally Available*](https://www.databricks.com/blog/unity-ai-gateway-generally-available). 4 August 2026.
49. Databricks docs. [*Manage budgets for Unity Gateway*](https://docs.databricks.com/aws/en/ai-gateway/budgets). 16 September 2026.
50. Databricks docs. [*Unity Gateway release notes*](https://docs.databricks.com/aws/en/release-notes/unity-gateway/).
51. Databricks docs. [*Retired models policy*](https://docs.databricks.com/aws/en/machine-learning/retired-models-policy). 17 September 2026.
52. Databricks docs. [*Foundation Model APIs*](https://docs.databricks.com/aws/en/machine-learning/foundation-model-apis/). 11 September 2026.
53. Databricks docs. [*Supported models (Foundation Model APIs)*](https://docs.databricks.com/aws/en/machine-learning/foundation-model-apis/supported-models). 15 September 2026.
54. Databricks docs. [*Databricks Geos*](https://docs.databricks.com/aws/en/resources/databricks-geos). 11 September 2026.
55. OpenAI. [*Deprecations*](https://developers.openai.com/api/docs/deprecations).
56. OpenAI. [*Enterprise privacy*](https://openai.com/enterprise-privacy/). Updated 8 January 2026.
57. Google Cloud. [*Model versions and lifecycle*](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/learn/model-versions).
58. AWS What's New. [*Amazon Bedrock now supports cost allocation by IAM user and role*](https://aws.amazon.com/about-aws/whats-new/2026/04/bedrock-iam-cost-allocation). 9 April 2026.
59. Salesforce. [*Agentforce Pricing*](https://www.salesforce.com/agentforce/pricing/). Accessed 19 September 2026.
60. ServiceNow Community. [*Best Practices in managing AI agents, skills, and assists in ServiceNow*](https://www.servicenow.com/community/now-assist-articles/best-practices-in-managing-ai-agents-skills-and-assists-in/ta-p/3569710). 7 July 2026.
61. NIST. [*Artificial Intelligence Risk Management Framework (AI RMF 1.0)*](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf). NIST AI 100-1, 2023.
62. NIST AIRC. [*AI RMF Playbook — Govern*](https://airc.nist.gov/airmf-resources/playbook/govern/).
63. NIST AIRC. [*AI RMF Playbook — Map*](https://airc.nist.gov/airmf-resources/playbook/map/).
64. NIST. [*NIST AI 600-1 Generative AI Profile*](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf).
65. ISO/IEC. [*ISO/IEC 42001:2023 — Artificial intelligence management system*](https://www.iso.org/standard/81230.html).
66. Control Stack. [*ISO 42001 Annex A Controls*](https://controlstack.au/frameworks/iso-iec-42001/) (secondary source).
67. European Parliament and Council. [*Regulation (EU) 2024/1689 (Artificial Intelligence Act)*](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R1689).
68. Future of Life Institute. [*Article 25: Responsibilities Along the AI Value Chain*](https://artificialintelligenceact.eu/article/25/). Marks the amendments made by Reg. 2026/1744.
69. Covington Inside Privacy. [*EU's Community of Practice Publishes Updated AI Model Contractual Clauses*](https://www.insideprivacy.com/artificial-intelligence/eus-community-of-practice-publishes-updated-ai-model-contractual-clauses/). April 2025.
70. European Commission. [*Data Act explained*](https://digital-strategy.ec.europa.eu/en/factpages/data-act-explained).
71. Latham & Watkins. [*EU Data Act: Significant New Switching Requirements Due to Take Effect for Data Processing Services*](https://www.lw.com/en/insights/eu-data-act-significant-new-switching-requirements-due-to-take-effect-for-data-processing-services). 19 August 2025.
72. Springlex. [*DORA Article 28*](https://www.springlex.eu/en/packages/dora/dora-regulation/article-28/).
73. Bank of England. [*UK financial regulators to begin overseeing Critical Third Parties announced by HMT*](https://www.bankofengland.co.uk/news/2026/july/uk-financial-regulators-to-begin-overseeing-critical-third-parties-announced-by-hmt). 13 July 2026.
74. Cloud Security Alliance. [*AI Controls Matrix v1.1*](https://cloudsecurityalliance.org/blog/2026/07/14/ai-controls-matrix-v1-1-strengthening-the-foundation-for-trustworthy-ai). 14 July 2026.
75. OWASP GenAI Security Project. [*OWASP GenAI LLM Top 10 2026*](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/). 3 August 2026.
76. OWASP GenAI Security Project. [*Top 10 for Agentic Applications 2026*](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/). 9 December 2025.
77. OWASP GenAI Security Project. [*Agent Control Standard (ACS)*](https://genai.owasp.org/resource/agent-control-standard-acs/). v0.1, public preview, 1 September 2026.
78. Colorado General Assembly. [*SB 26-189*](https://leg.colorado.gov/bills/sb26-189). Effective 1 January 2027.
79. FinOps Foundation. [*FinOps for AI Overview*](https://www.finops.org/wg/finops-for-ai-overview/). Updated 17 February 2026.
80. FinOps Foundation. [*FOCUS Specification v1.2*](https://focus.finops.org/focus-specification/v1-2/).
81. IAN Cloud. [*FinOps Foundation FOCUS specification 2026*](https://iancloud.ai/blog/finops-foundation-focus-specification-2026). Blog (secondary source).
82. OpenTelemetry. [*Semantic conventions for generative AI*](https://github.com/open-telemetry/semantic-conventions-genai).
83. OpenTelemetry. [*Inside the LLM Call: GenAI Observability with OpenTelemetry*](https://opentelemetry.io/blog/2026/genai-observability/). Blog, 14 May 2026 (modified 14 September 2026).
84. Gartner. [*Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027*](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027). Press release, 25 June 2025.
85. Stanford HAI. [*2026 AI Index Report*](https://hai.stanford.edu/ai-index/2026-ai-index-report). 2026 (unverified).
86. Chen, Zaharia, Zou. [*FrugalGPT: How to Use Large Language Models While Reducing Cost and Improving Performance*](https://arxiv.org/abs/2305.05176). arXiv:2305.05176, 9 May 2023.
87. Ong et al. [*RouteLLM: Learning to Route LLMs with Preference Data*](https://arxiv.org/abs/2406.18665). arXiv:2406.18665, rev. 23 February 2025.

Sources were read in September 2026 unless a page date is given; page dates are those shown on the page. Vendor prices, notice periods and admin features change, and every figure taken from them is rechecked when the Vendor Service Profiles are populated.

## Appendix A — Vendor Service Profile: minimum schema

The schema defines one record per vendor service. Fields marked "Yes" in the Always column form the reduced Class 1 record (CRISP-AG Appendix A). The data-protection block is owned by the DPO; the contract block by Legal; everything else by the Vendor Control Owner. Fields marked † are the nine fields described in §7. A service with more than one billing plane or consumption channel carries a commercial sub-block per plane.

| Block | Field | Content | Always? |
|---|---|---|---|
| Identity | Service and version family | Vendor; product; the endpoint or agent-runtime family covered; register row; planes or channels covered | Yes |
| Identity | Owners and contacts | Vendor Control Owner; vendor account contact; Finance partner; Legal contact; DPO contact | Yes |
| Commercial | Metering unit and price | What is billed (tokens, credits, DBUs, messages, assists, seats), per-action rates, pack versus pay-as-you-go, overage rule and enforcement point (e.g., 125% of prepaid capacity) | Yes |
| Commercial | Billing plane † | Admin console where the cap is set (PPAC; M365 admin center billing policy; Azure Cost Management; Console; Enterprise admin; Unity Gateway); one sub-block per plane | Yes |
| Commercial | Included-usage rules † | License entitlements that zero the meter and their conditions (e.g., M365 Copilot USL identity; "When an agent calls the flow" trigger); which invoking identities and triggers fall inside | No |
| Commercial | Caps and alerts | Which limits the service offers (per agent, per user, per group, per workspace, per policy, per account), which are configured, at what values, and where the evidence is | Yes |
| Commercial | Enforcement precision and latency † | How exactly and how quickly the cap fires (approximate / exact; real-time / hourly / daily / 8–24 h); headroom applied; reconciliation source and cadence | Yes |
| Commercial | Usage reporting | Where usage is reported, at what granularity and latency, what is excluded (e.g., Priority Tier), and how it reaches HRN-07 | No |
| Lifecycle | Deprecation and notice policy | Published notice period by class (GA / specialized / preview); lifecycle length by model family (e.g., 18 vs 12 months on Foundry); behavior at retirement (410 Gone; requests fail; existing-workspace availability) | Yes |
| Lifecycle | Notice channels and programmatic source † | How notices arrive (Service Health alert rule; subscription-owner email; vendor email to active deployments; Message Center; policy page) and who receives them; machine-readable lifecycle source (e.g., Foundry Models API `deprecation.inference`) read by preflight | No |
| Lifecycle | Auto-upgrade behavior | What the service does at retirement or new-version release by default (auto-updated aliases; `versionUpgradeOption`) and the option chosen per deployment | No |
| Lifecycle | Pins and successors | Pinned identifiers in use per tier, per Geo and per channel; named successor per pin; last substitution-suite date and result | No |
| Lifecycle | Vendor posture attributes | Safety-policy version in force (e.g., Anthropic RSP v3.4, 8 July 2026); framework status (GA / preview / legacy) | No |
| Data protection | Training use and opt-out | Whether inputs and outputs are used to train; the opt-out in force and its evidence | Yes |
| Data protection | Retention by model and tier † | Default period and purpose; model-specific minimums (Anthropic Covered Models 30 days); ZDR eligibility per platform and enablement status; trust-and-safety retention for flagged content; platforms on which the terms apply | Yes |
| Data protection | Residency controls and price multiplier † | Controls available (inference geo; workspace geo; Databricks Geo; EU Data Boundary; Data Zone deployment); configured value; price multiplier (e.g., 1.1× US-only inference); models supported | No |
| Data protection | Cross-Geo processing setting † | Name of the setting; default; configured value; evidence and date (Databricks cross-Geo processing; Copilot Studio cross-geographic generative AI; Anthropic `allowed_inference_geos`) | No |
| Data protection | Inference location and relay | Where inference runs; whether requests are relayed to a further processor and for what purpose (e.g., safety retention); per-Geo availability by model | No |
| Data protection | Sub-processors and transfer | Sub-processor chain; transfer mechanism; attestation dates (SOC 2, ISO 27001, ISO 42001) | No |
| Contract | Term and renewal | Agreement, term, renewal date, notice to terminate | No |
| Contract | Published versus contractual notice † | For retirement, meter and price changes, and for terms changes: published period; contractual period; which applies | No |
| Contract | Clause checklist status | Each Appendix C clause: present / absent / waived, with the exception reference | No |
| Contract | IP indemnity scope and conditions † | Scope; deployer-side conditions (e.g., CCC metaprompt and evaluation report; BYOM exclusion); evidence location | No |
| Contract | SLAs | Availability, support, incident notification; credits | No |
| Exit | Abstraction and export | What the organization binds to instead of the endpoint (gateway; MCP; registry); export mechanism and format for data held in the service; switching terms (EU Data Act where applicable, and whether it applies or is a negotiating floor) | No |
| Exit | Substitute and drill | Named substitute per tier (and in-Geo substitute per Geo); estimated time to switch; date, duration and result of the last drill | No |
| Control | Review | Version; last review; next review date; Vendor Change Register entries affecting this VSP | Yes |

## Appendix B — Configured-agent equivalence profiles

These profiles are proposed. The platform operator verifies everything here against the tenant's licenses and the current admin documentation before it becomes normative in Phase 2. Coverage is stated as Full, Substantial, Partial, Alert-only or None. The DAS ceiling column states the highest position a configured agent may hold on that row's evidence alone; the agent's ceiling is the lowest across rows.

### B.1 Microsoft — two planes

Column 1 covers Copilot Studio via PPAC; column 2 covers M365 Copilot agents via an M365 admin center billing policy.

| Control | Copilot Studio | Coverage (Copilot Studio) | DAS ceiling (Copilot Studio) | M365 Copilot agents | Coverage (M365 Copilot) | DAS ceiling (M365 Copilot) |
|---|---|---|---|---|---|---|
| HRN-01 Deny-Ask-Allow | Power Platform DLP policies classifying connectors (business / non-business / blocked) at tenant and environment level; agent-level enablement of tools, connectors and knowledge sources; Entra conditional access on the Agent ID; Agent 365 as control plane | Substantial (connector-level, not argument-level) | AGENT-DIRECTED for read-only tools | Agent 365 conditional access; SharePoint and Graph permissions of the invoking user; declarative agent manifest capabilities | Partial | HITL-REQUIRED |
| HRN-02 Session preflight | Managed Environments with solution checker and publish restrictions; no per-session preflight — the publish gate is the preflight | Partial | HITL-REQUIRED for write tools | Manifest validation at publish; admin approval of agents in the M365 admin center | Partial | HITL-REQUIRED |
| HRN-03 Pre-tool guard | DLP and connector policies decide by connector identity, not by arguments; no argument-level guard | Partial | HITL-REQUIRED for write tools | None at argument level | None | HITL-REQUIRED |
| HRN-04 Unattended limits | Autonomous triggers disabled unless approved; agent flow runs blocked when prepaid capacity is exhausted; per-agent monthly limit | Substantial for consumption; Partial for content limits | AGENT-DIRECTED for read-only | No autonomous triggers on the Copilot Chat surface; user-invoked only | Substantial by construction | HITL-REQUIRED |
| HRN-05 Claim auditor | None in the product; human review of outputs before reliance | None | HITL-REQUIRED for consequential outputs | None | None | HITL-REQUIRED |
| HRN-06 Immutable ledgers | Microsoft Purview audit log for admin, maker and agent activity; Dataverse conversation transcripts; export to write-once storage on the HRN-06 retention rule | Substantial once exported | — | Purview audit; export to write-once storage | Substantial once exported | — |
| HRN-07 Telemetry | Application Insights integration for conversation telemetry; PPAC capacity and credit reports (daily granularity; month-to-date and 12 months of history) exported with cost attributes; usage via M365 Copilot Chat shown under a separate product | Substantial; not real-time | — | M365 admin center Cost Management and Azure portal for the billing policy; no conversation-level telemetry export documented | Partial | — |
| HRN-08 Skills | Topics, tools, knowledge sources and prompts as solution components versioned in solutions; tested in a test environment before promotion | Substantial | — | Declarative agent manifest versioned in source control | Substantial | — |
| HRN-09 One-way distribution | Managed Environments; solution pipelines dev → test → prod; maker permissions restricted in prod | Substantial | — | Admin-approved publication; no maker self-publish to production | Substantial | — |
| HRN-10 Trace correlation | Conversation and session identifiers in transcripts correlated with Application Insights operation identifiers | Partial | — | Message identifiers in Purview audit | Partial | — |
| HRN-11 Isolation boundary | Vendor-hosted runtime; no customer-configurable OS boundary; connector and HTTP-request DLP as the egress control | Partial (vendor boundary) | Per SEC | Vendor-hosted; Graph permission boundary | Partial | Per SEC |
| HRN-12 Spend governor | Environment allocation of Copilot Credits; per-agent monthly limit with admin alerts and a hard stop that turns the agent off; PAYG billing plan to an Azure subscription; prepaid pool bounded, tenant enforcement at 125%; identity- and trigger-sensitive meter | Full per agent (daily data) | No ceiling from this row | Budget limit on the billing policy with percentage-milestone emails; $0.01 per message; no per-agent limit; hard stop only by disconnecting the policy (removes access for all linked users) | Alert-only | HITL-REQUIRED unless an automated disconnect is wired and evidenced |
| Identity (Standard S3.1) | Microsoft Entra Agent ID per agent (GA April 2026); Agent 365 registry record (unified registry from 1 May 2026; legacy Graph API retirement began 15 June 2026 — completed-migration check) | Full | — | Entra Agent ID and Agent 365 record per agent; Agent 365 license required for agents operating across M365 (E7 or add-on) | Full | — |

Rows whose ceiling is a dash (—) do not by themselves cap the DAS position; they are evidence rows. On column 1 the binding constraint for a Copilot Studio agent with write tools is HRN-03 (no argument-level guard), which caps it at HITL-REQUIRED; a read-only agent may reach AGENT-DIRECTED with the per-agent cap in place. On column 2 the binding constraint, in addition to HRN-03, is HRN-12 (alert-only), which caps every M365 Copilot agent at HITL-REQUIRED until an automated disconnect is wired and evidenced.

On the HRN-12 row of column 1, the admin alerts go to environment and tenant admins at a product-defined threshold, so the 80% alert is computed from the daily export. Each agent shows a billing status of within, nearing or over limit; the billing plan links pay-as-you-go environments to the Azure subscription; and usage by Microsoft 365 Copilot-licensed users under their own USL identity is "No charge".

### B.2 Reference classes — Salesforce Agentforce and ServiceNow Now Assist

These platforms are not on the register. The rows exist so that a proposal to use either starts from the class-based ceiling of VC-06. Only the consumption, alerting and rate-limit rows were verified; the other HRN rows are to be profiled if a proposal is made.

| Row | Salesforce Agentforce (Flex Credits) | Coverage (Agentforce) | ServiceNow Now Assist (assists) | Coverage (Now Assist) |
|---|---|---|---|---|
| Metering unit | Flex Credits; e.g., 60 Flex Credits for 3 actions (US$0.30) | — | Assists per skill or agentic workflow execution; agents consume 25 / 50 / 150 assists by tool count (0–4 / 5–8 / 9–20 tools) | — |
| HRN-12 Spend governor | Digital Wallet near-real-time usage and "proactive threshold alerts"; "no overage penalty — your rate is your contracted rate billed monthly in arrears"; no documented hard stop | Alert-only | Assists pool; no documented spend cap or post-exhaustion enforcement | None documented |
| HRN-04 Unattended / loop limits | Not verified | — | Rate-limit rules (max requests per hour, instance or user); trigger throttling via `kill_switch.mode` (`warn_only` / `enforce`); `recursive_check.*_max_executions`; spike alerts (`alert.assist_spike_*`) | Substantial for loops; none for spend |
| VC-02 tier variable | Per-action credit rates | — | Tool-count tiers price the agent's design | — |
| DAS ceiling from consumption control | ≤ HITL-REQUIRED | — | ≤ HITL-REQUIRED | — |

## Appendix C — Contract clause checklist (VC-09)

Legal and Procurement apply the checklist at every new agreement and renewal for a registered service, and record each clause's status in the VSP contract block as present, absent or waived, with the exception reference. The "Policy or contract" column distinguishes what the organization can expect to find as published policy from what it must obtain as a contractual term; a published policy is recorded as information and never counted as "present".

| Clause | Requirement | Policy or contract | Reference and floor |
|---|---|---|---|
| C1 | Advance written notice of model retirement not shorter than the vendor's published policy, as a contractual term (Anthropic 60 days; Databricks 3 months; OpenAI 6 months GA; Foundry 60 days GA); preview models excluded from production or their notice period stated | Contract (published policy is not enough) | Anthropic deprecations page; Commercial Terms contain no deprecation clause |
| C2 | Advance written notice of meter, price and rate-card changes; notice of changes to the terms themselves of not less than 30 days | Contract | Anthropic Commercial Terms: updates effective 30 days after posting |
| C3 | Action inventory in agent-bill-of-materials form (CycloneDX under the OWASP ACS profile, SPDX or SWID), with the configuration mechanism that disables each action; refreshed on each release | Contract | CRISP-AG §5.8 (DAS row); OWASP ACS v0.1; SEC-16 |
| C4 | A distinct, revocable identity per deployed agent instance; no shared vendor credential across customers or across the organization's own agents | Contract | CRISP-AG §5.8 (AIR row); Entra Agent ID |
| C5 | Security attestations (SOC 2, ISO 27001, ISO 42001 where held) and results of the vendor's adversarial testing at the CRISP-AG §7.1 coverage level for the agent's class | Contract | CRISP-AG §5.8 (threat-model row) |
| C6 | Audit-log access, contents and retention sufficient for HRN-06 export; export format | Contract | Harness HRN-06 |
| C7 | Training-use opt-out and retention terms, including model-specific minimums and ZDR eligibility and enablement conditions; sub-processor list and change notice | Contract (opt-out is often policy — record which) | Anthropic Covered Models 30-day minimum; OpenAI 30 days / ZDR |
| C8 | Regional processing commitments: inference and storage location; cross-Geo processing conditions and the organization's right to disable; residency price multiplier stated | Contract | Anthropic `inference_geo` (no EU pin); Databricks Geos; Copilot Studio EU Data Boundary |
| C9 | Intellectual-property indemnity: scope, the deployer-side conditions, and the evidence the vendor accepts | Contract (conditions documented as policy) | Microsoft Customer Copyright Commitment — metaprompt and evaluations; BYOM excluded |
| C10 | EU AI Act Art. 25(4) information set — necessary information, capabilities, technical access and other assistance — requested from every registered vendor as the floor; mandatory where the agent is high-risk or the organization is at risk of provider status under Art. 25(1) | Contract | MCC-AI-Light (non-high-risk services); MCC-AI-High-Risk (high-risk), 5 March 2025, non-binding templates adapted by Legal |
| C11 | Export and switching: data export mechanism and format; maximum two-month notice to initiate switching and 30-day transition; no switching or egress charges from 12 January 2027; see note 1 | Contract | EU Data Act Ch. VI |
| C12 | Notice of vendor safety-policy or acceptable-use changes that alter permitted uses (e.g., RSP version; Covered Model designation) | Contract where obtainable; otherwise register watch | VC-05 |
| C13 | Usage reporting at daily or better granularity by identity, agent and tier, and API access to it | Contract | CRISP-AG §5.8 |
| C14 | Colorado SB 26-189 developer-to-deployer disclosures and model provenance, training-data and limitation statements | Contract | CRISP-AG §5.8 (AISIA row) |

1. C11 is an entitlement where the service is a data processing service contracted by an EU-established entity of the organization, and a negotiating floor for model APIs (§12.4).

## Appendix D — Glossary

Terms owned by this paper are defined here. Terms owned by another paper in the series are cited, not redefined; the owning paper defines them.

### Terms owned by this paper

- **Approved AI Service Register** (§4 VC-04; §5) *(also: the register)* — The governed list of vendor services approved for agentic use, each with a posture (approved / with conditions / pilot / prohibited / reference posture), approved and prohibited uses, the equivalence profile that applies and a link to its VSP.
- **Concentration report** (§4 VC-08) — The annual share of production agents and of spend per model vendor and per underlying cloud provider, reported to the AIGB.
- **Configured-agent profile** (§4 VC-06; Appendix B) *(also: equivalence profile)* — The per-platform mapping of HRN-01 to HRN-12 and identity to the vendor's admin plane, with the coverage of each row (Full / Substantial / Partial / Alert-only / None) and the DAS ceiling that follows from the gaps.
- **Exit path** (§4 VC-08) *(also: substitution drill)* — Per dependency, the binding abstraction, the export mechanism, the named substitute per tier, the estimated time to switch and the date and duration of the last drill.
- **Metering unit** (§4 VC-01) — The unit a vendor bills — tokens, credits, DBUs, messages, assists, seats — and its per-action rates, including license entitlements that zero the meter, as recorded in the VSP.
- **Model tier** (§4 VC-02) *(also: tier)* — The declared model class per task class, pinned to an identifier and a successor; the default is the smallest tier that passes the S2 suite at threshold; the premium tier is an exception justified at Gate 1.
- **Substitution suite** (§4 VC-05) — The S2.2 regression suite run against a pinned identifier's named successor before the vendor's notice window closes.
- **Vendor Change Register** (§4 VC-05) — The five-working-day capture of vendor deprecations, retirements, meter and price changes, data-terms changes and availability changes, each with effective date, affected VSPs, pins and agents, decision and owner.
- **Vendor Control Owner** (§6) — The role that owns the Approved AI Service Register, the Vendor Service Profiles and the Vendor Change Register and partners with Legal on the clause checklist and with Finance on budgets and showback; the eleventh role in the Workflow's RACI.
- **Vendor Service Profile** (§4 VC-03; §7; Appendix A) *(also: VSP)* — One controlled record per vendor service the organization depends on, in seven blocks: identity, commercial and metering, lifecycle, data protection, contract, exit and control; the record every other vendor control points at.
- **Vendor-configured agent** (§4 VC-06) *(also: configured agent)* — An agent the organization configures inside a vendor product (Copilot Studio, Microsoft 365 Copilot, Agent Bricks and the like); distinct from CRISP-AG's vendor-supplied agent, which the vendor builds.

### Terms owned elsewhere and cited here

- **Agent bill of materials** → Agentic Security Specification, §5 SEC-16 — cited at VC-09
- **Agent identity record** → CRISP-AG, §5.5 — cited at VC-03, VC-06
- **Approval levels** → CRISP-AG, §5.1.1 — cited at §6
- **Binding** → Specification-Driven Design, Principle 11 (§A4) — cited at VC-08
- **Capability frontier** → CRISP-AG, §5.4 — cited at VC-02
- **DAS position** → CRISP-AG, §5.1 — cited at VC-06
- **Full / Lite** → Agentic PRD Standard, §9 — cited at VC-06
- **HRN controls** → Enterprise Agentic AI Harness Specification, §4 — cited at Appendix B
- **Materially configured** → Agentic PRD Standard, §1.2 — cited at VC-06
- **Roles (eleven)** → Agentic Delivery Workflow, §4 — cited at §6
- **Spend governor** → Enterprise Agentic AI Harness Specification, HRN-12 — cited at VC-01
- **Standards watch** → Agentic PRD Standard, S4.7 — cited at VC-05
- **Vendor-supplied agent** → CRISP-AG, §5.8 — cited at VC-06

<nav class="series-pager" aria-label="Series navigation"><a href="/papers/agentic-security-specification/">← Part 5: Security Specification</a><a href="/papers/">All papers in the series</a><a href="/papers/agentic-delivery-workflow/">Part 7: Agentic Delivery Workflow →</a></nav>
