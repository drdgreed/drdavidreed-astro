---
title: "Agentic Security Specification"
subtitle: "Runtime and record security controls for enterprise agentic AI, and the evidence each must produce before it is called demonstrated"
series: "Agentic AI Governance in Practice"
seriesPart: 5
code: "SEC"
version: "1.0"
date: "2026-10"
author: "David Reed, PhD"
description: "Twenty-three runtime and record security controls for enterprise agentic AI, a managed runner baseline for Claude Code, a three-state evidence model and adaptive injection evaluation that turn a threat model into checked, demonstrated controls."
keywords: ["agentic AI", "AI security", "prompt injection", "isolation boundary", "Claude Code", "managed settings", "MCP security", "agent identity", "OWASP Agentic Top 10", "MITRE ATLAS"]
readTime: 112
---

# Agentic Security Specification

<p class="paper-dek">Runtime and record security controls for enterprise agentic AI, and the evidence each must produce before it is called demonstrated</p>

<p class="paper-meta"><strong>Version 1.0</strong> · October 2026 · David Reed, PhD</p>

<nav class="series-nav" aria-label="Series"><p><strong>Agentic AI Governance in Practice</strong> — Part&nbsp;5&nbsp;of&nbsp;7</p><ol><li><a href="/papers/crisp-ag/">CRISP-AG</a></li><li><a href="/papers/agentic-prd-standard/">Agentic PRD Standard</a></li><li><a href="/papers/specification-driven-design/">Specification-Driven Design</a></li><li><a href="/papers/agentic-harness-specification/">Harness Specification</a></li><li><span class="current" aria-current="page">Security Specification</span></li><li><a href="/papers/vendor-control-specification/">Vendor Control Specification</a></li><li><a href="/papers/agentic-delivery-workflow/">Agentic Delivery Workflow</a></li></ol></nav>

## Abstract

Enterprise agentic systems are increasingly governed by written specifications, and written controls are easily mistaken for real ones. The characteristic failure is that every quality gate and every agent test suite passes while most of the controls the documents describe are absent from the implementation, because the gates check documents against documents.

This paper presents the Agentic Security Specification, a standing specification of the runtime and record security controls that every agentic system in an organization's governed portfolio carries. It defines twenty-three controls, SEC-01 to SEC-23, for instruction and record integrity, the harness, untrusted content, supply chain and composition, and output and desktop surfaces. Each control states a normative rule, the argument and verified sources behind it, its implementation on the Anthropic stack with exact Claude Code settings, its equivalents on other platforms, the evidence that earns it the demonstrated state, and how it scales with agent class.

A three-state model — specified, implemented, demonstrated — records how far each control has been proven, and a tenth quality gate checks documents against the filesystem and the runtime configuration. A Managed Runner Baseline fixes the managed-settings payload that every unattended Claude Code runner loads. Injection defenses are scored on output effect against a static corpus and an adaptive attacker, with defended and undefended results published together. A worked example applies the controls to a representative two-agent governance repository through a catalog of thirty generic risks and a five-phase remediation plan.

**Keywords:** agentic AI; AI security; prompt injection; isolation boundary; Claude Code; managed settings; MCP security; agent identity; OWASP Agentic Top 10; MITRE ATLAS

## Key contributions

- **Control state as evidence, not prose.** Every security control is *specified*, *implemented* or *demonstrated*, and only a passing test that names the threat, run at Gate 3 with its run ID recorded, makes it demonstrated.
- **Twenty-three controls with exact mechanisms.** SEC-01 to SEC-23 each carry a normative rule, the vendor-documented Claude Code keys and values that implement it, equivalents on other platforms, and the test that earns the demonstrated state.
- **A checked managed baseline.** MRB-1 is the versioned managed-settings payload for unattended Claude Code runners — permission mode, lock keys, sandbox, hooks and telemetry — verified at preflight and hash-recorded for every run.
- **A threat model tied to public catalogs.** Thirty rows, organized by CRISP-AG's attack surfaces, are labeled against the OWASP Agentic and LLM Top 10 lists for 2026, the OWASP MCP Top 10, MITRE ATLAS and public incidents.
- **Adaptive injection evaluation.** Injection defense is scored on output effect against a static five-family corpus and an automated adaptive attacker, with attack success and utility reported for defended and undefended configurations.
- **A gate that checks documents against systems.** The `control_evidence` gate resolves every cited control, hook and settings key — including the scope at which each key is policy — against the repository and the runtime configuration.

<!-- toc -->
## Contents

- [1. Introduction](#1-introduction)
- [2. Background and related work](#2-background-and-related-work)
- [3. Control state](#3-control-state)
- [4. Threat model](#4-threat-model)
- [5. Controls SEC-01 to SEC-23](#5-controls-sec-01-to-sec-23)
  - [5.0 How to read a control](#50-how-to-read-a-control)
  - [SEC-01 — Instruction authenticity](#sec-01--instruction-authenticity)
  - [SEC-02 — Identifier validation and path confinement](#sec-02--identifier-validation-and-path-confinement)
  - [SEC-03 — Replay protection](#sec-03--replay-protection)
  - [SEC-04 — Tamper-evidence of records and ledgers](#sec-04--tamper-evidence-of-records-and-ledgers)
  - [SEC-05 — Owned-path confinement and no whole-file rewrite](#sec-05--owned-path-confinement-and-no-whole-file-rewrite)
  - [SEC-06 — Supersession records; expiry as a state](#sec-06--supersession-records-expiry-as-a-state)
  - [SEC-07 — Independent regeneration of the gate report](#sec-07--independent-regeneration-of-the-gate-report)
  - [SEC-08 — Permission mode and managed settings](#sec-08--permission-mode-and-managed-settings)
  - [SEC-09 — Hooks committed, version-controlled and fail-closed](#sec-09--hooks-committed-version-controlled-and-fail-closed)
  - [SEC-10 — Isolation boundary (specifies HS HRN-11)](#sec-10--isolation-boundary-specifies-hs-hrn-11)
  - [SEC-11 — Short-lived credentials; no credential files on the runner](#sec-11--short-lived-credentials-no-credential-files-on-the-runner)
  - [SEC-12 — Kill switch and demotion mechanics](#sec-12--kill-switch-and-demotion-mechanics)
  - [SEC-13 — Prompt fence](#sec-13--prompt-fence)
  - [SEC-14 — Adaptive injection evaluation](#sec-14--adaptive-injection-evaluation)
  - [SEC-15 — CI hardening](#sec-15--ci-hardening)
  - [SEC-16 — Agent bill of materials (AgBOM)](#sec-16--agent-bill-of-materials-agbom)
  - [SEC-17 — Agent identity on Agent 365](#sec-17--agent-identity-on-agent-365)
  - [SEC-18 — The control_evidence gate](#sec-18--the-control_evidence-gate)
  - [SEC-19 — Tool-description integrity](#sec-19--tool-description-integrity)
  - [SEC-20 — Output handling](#sec-20--output-handling)
  - [SEC-21 — Browser and computer-use agents](#sec-21--browser-and-computer-use-agents)
  - [SEC-22 — Model provenance](#sec-22--model-provenance)
  - [SEC-23 — MCP server allowlist and no static secrets in MCP configuration](#sec-23--mcp-server-allowlist-and-no-static-secrets-in-mcp-configuration)
  - [5.24 Declared architectural properties](#524-declared-architectural-properties)
- [6. Managed Runner Baseline MRB-1](#6-managed-runner-baseline-mrb-1)
- [7. Security evaluation and red team](#7-security-evaluation-and-red-team)
- [8. Gates and the control_evidence gate](#8-gates-and-the-control_evidence-gate)
- [9. Severity and triage](#9-severity-and-triage)
- [10. Worked example: remediating a two-agent governance repository](#10-worked-example-remediating-a-two-agent-governance-repository)
- [11. Standards watch](#11-standards-watch)
- [12. Discussion and limitations](#12-discussion-and-limitations)
- [13. Conclusion](#13-conclusion)
- [Acknowledgements](#acknowledgements)
- [How to cite](#how-to-cite)
- [References](#references)
- [Appendix A — Canonical label tables](#appendix-a--canonical-label-tables)
- [Appendix B — Companion-paper touchpoints](#appendix-b--companion-paper-touchpoints)
- [Appendix C — Glossary](#appendix-c--glossary)
<!-- /toc -->

## 1. Introduction

### 1.1 The problem

Enterprise agentic systems are now governed by written specifications: permission rules, hooks, isolation, signed instructions and tamper-evident logs, each named in a threat model and checked by quality gates. This paper starts from a failure pattern in which that writing is mistaken for the controls themselves. When a representative agentic delivery system — two governance agents and the specification repository they work in — is examined against the documents that specify it, one structural risk stands at the center. Every quality gate and every agent test suite can pass while most of the controls the documents describe are absent from the implementation, because the gates check documents against documents.

The pattern is not peculiar to one design. A threat-model row that reads "controls: signature" is not a statement that a signature is checked. Agent runtimes expose configuration surfaces whose effect depends on scope, launch mode and version, and several commonly assumed protections do not hold as written (§2.3). A lock key placed in a project settings file is not policy, a hook that times out lets the action proceed, and a deny rule on a file path does not bind an interpreter that opens the file itself. Each of these looks like a control on paper and is not one at runtime.

### 1.2 What this specification is

This specification states the security controls that every agentic system in an organization's governed portfolio carries at runtime and in its records, the evidence each control must produce before it may be called *demonstrated*, and the gate that checks that the evidence exists. It turns the §10.1 risk catalog into a standing specification for every system in the portfolio. It also adds the check of documents against systems (SEC-18, §8) and the vocabulary that makes the difference visible (control state, §3).

### 1.3 What this specification owns

- The runtime and record security controls **SEC-01 to SEC-23** (§5) and the **Managed Runner Baseline MRB-1** (§6).
- The **control state** vocabulary — specified, implemented, demonstrated, retired — and its rules (§3).
- The **threat model** organized by CRISP-AG §7 attack surfaces with OWASP, MITRE ATLAS and incident anchors (§4).
- The **security evaluation** method: static and adaptive injection evaluation, canary run, kill-switch exercise, ISO-TEST, Gate 3 exit (§7).
- The **`control_evidence` gate** and the corrections to existing gates and test suites (§8).
- The **severity and triage** vocabulary for security findings (§9).
- The **standards watch** for security sources (§11).

### 1.4 What it cites

SEC cites, and does not restate, the companion papers, referred to by their series codes (§2.1):

- **CRISP-AG** [1]: §7 attack surfaces and their mitigations; §7.2.1 (ASI08) and §7.2.2 (ASI09) mitigations; the persistent-memory surface row (ASI06); the inter-agent surface row (ASI07); §5.5 *containment* (AIR field); §5.1.3 *demotion*; §5.1 delegation authority scoping (DAS) positions; §4 agent classes; §6.2 per-class tracks; §6.3 standing governance invariants.
- **HS** [4]: HRN-01 to HRN-12. SEC specifies detail under HRN-11 (SEC-10, MRB-1) and supplies the fail-closed rule under HRN-02/HRN-03 (SEC-09); it does not redefine any HRN.
- **STD** [2]: S3.1 (agent identity), S3.1a (trust level), S3.4 (threat model), S3.5 (audit), S3.6 (application security), S3.7 (isolation boundary declaration), H4 (governing invariants), H14 (honest-claims matrix).
- **SDD** [3]: A2 (enforce-vs-guide mechanism table, failure-mode column), A3 (four layers; `control_state` column), B5 (traceability matrix).
- **WF** [6]: §10 (evidence and claims; when a claim changes state), the W2, W4, W5, W6 and W7 exit checks.
- **VCS** [5]: VC-04 (Approved AI Service Register — MCP servers are registered services), VC-05 (Vendor Change Register — model provenance and change notices), VC-06 (configured-agent profile for Copilot Studio equivalents), VC-09 (contract clauses and licensing, including Agent 365).

### 1.5 Applicability

This specification applies to every agentic system in the scope of STD §1.2: every product whose PRD is written to the Standard, whether in Full or Lite form, and every vendor-configured agent recorded under VCS VC-06. Intensity scales with CRISP-AG agent class per CRISP-AG §6.2: a Class 1 agent carries the controls marked baseline in §5; Class 2 adds the isolation and evaluation controls; Class 3 adds the inter-agent controls cited from CRISP-AG; Class 4 carries every control at the demonstrated state before production. The class-scaling line in each control is normative.

The worked example throughout is a governed specification repository with two agents: a model-backed **drafting agent** (Class 2) that plays the assembling-agent role of the Agentic Delivery Workflow (WF §9), and a **governance-record writer**. The writer has no model in its write path and is Class 4 by consequence, because it writes an organization's portfolio-level governance records. Both are worked-example designs, not descriptions of any particular codebase. Section 10 catalogs the generic risks that a system of this shape can carry and gives a remediation plan.

### 1.6 How to read this paper

Section 2 places the specification in the series, surveys the public standards and research it builds on, records the platform behaviors it was checked against, and defines its terms. Section 3 defines control state, and §4 is the threat model. Section 5 specifies the twenty-three controls and two declared architectural properties, and §6 gives the Managed Runner Baseline. Sections 7 to 9 cover security evaluation, the gates, and severity and triage. Section 10 is the worked example: a catalog of generic risks and a five-phase remediation plan. Section 11 is the standards watch. Section 12 discusses what is left open, the weakest points, and the sources that could not be verified. The appendices carry canonical label tables, the companion-paper touchpoints and a glossary.

## 2. Background and related work

### 2.1 Place in the series

This specification is Part 5 of a seven-part series. Each paper owns one part of the problem, and a conflict between them is resolved by editing the non-owning paper to cite the owner (WF §2.2).

| Part | Paper | Code | What it owns |
|---|---|---|---|
| 1 | CRISP-AG v3.0 [1] | CRISP-AG | Governance concepts and artifacts — DAS positions, agent class, lifecycle phases, impact assessment, workforce impact, agent identity record, capability frontier |
| 2 | Agentic PRD Standard v3.10.2 [2] | STD | Content and structure of each product's document set — hub H0–H14, spokes S1–S6, machine-readable spec M, proportionality |
| 3 | Specification-Driven Design v1.0.3 [3] | SDD | Specification form — contracts, invariants, enforce versus guide, change-gate checks |
| 4 | Enterprise Agentic AI Harness Specification v1.3 [4] | HS | Runtime controls HRN-01 to HRN-12 and lifecycle Gates 0–4 |
| 5 | Agentic Security Specification v1.0 (this paper) | SEC | Runtime and record security controls SEC-01 to SEC-23, the Managed Runner Baseline, the isolation boundary |
| 6 | Vendor Control Specification v1.0 [5] | VCS | Terms of vendor use — the Approved AI Service Register, the Vendor Service Profile, spend-governor content |
| 7 | Agentic Delivery Workflow v1.10 [6] | WF | The stage sequence that binds them, W0–W7 |

**HRN-11 is isolation; SEC-10 specifies it.** The Harness Specification [4] makes HRN-11, OS-level filesystem and network isolation, the eleventh of its twelve mandatory harness controls. The Harness Specification owns the control's existence and its place in the gate structure; this specification owns its detail (SEC-10 and the Managed Runner Baseline in §6). Security writing often calls such isolation "containment"; the series' shared vocabulary assigns *containment* to CRISP-AG §5.5 (the field of the Agent Identity & Registry Record, AIR, that names the mechanism that halts an agent). This specification therefore uses **isolation boundary** throughout for the read roots, write roots, egress allowlist and out-of-boundary processes. The two words are not interchangeable in the series, and "containment boundary" is not a series term.

**CRISP-AG keeps what it owns.** The mitigations for ASI06 (persistent memory), ASI07 (inter-agent), ASI08 (cascading failures) and ASI09 (human-agent trust) remain in CRISP-AG §7 and §7.2. This specification cites them in the threat model and does not restate them. The terms *containment* (§5.5 AIR field) and *demotion* (§5.1.3) are CRISP-AG's; SEC-12 specifies the kill-switch mechanics under them.

### 2.2 Standards and prior work

The specification builds on four bodies of public work and adds the evidence discipline that connects them to a running system.

**Threat catalogs.** The specification draws on the OWASP Top 10 for Agentic Applications 2026 [7], in which OWASP introduces the concept of least agency; the OWASP LLM Top 10 2026 [8], which renumbers improper output handling to LLM10 and adds hidden context exposure as LLM08; the OWASP MCP Top 10, a beta project of the OWASP Foundation [9]; MITRE ATLAS, whose agentic techniques arrived in releases v5.1.0 to v5.5.0 [10]; NIST's adversarial machine learning taxonomy [11]; CSA's MAESTRO threat-modeling framework [12]; and Microsoft's taxonomy of failure modes in agentic AI systems, revised after a year of red teaming [13]. The threat model in §4 labels every row against these catalogs, and Appendix A fixes the canonical strings.

**Trust, identity and control frameworks.** The frameworks drawn on are the CSA Agentic Trust Framework (ATF), a v0.9.1 public review draft that makes incident response one of five elements every agent satisfies [14]; the CSA Agent Identity Governance Framework [15]; the OWASP Agent Control Standard v0.1, a public preview that originated at Zenity [16], adopted here for vocabulary and the agent bill of materials only; OWASP AIVSS for triage [17]; the NIST COSAiS control overlays, still in development [18], and the NIST Cyber AI Profile, at the initial preliminary draft stage [19]; the joint guidance of the Five Eyes cyber agencies on careful adoption of agentic AI services [20]; and Singapore's Model AI Governance Framework for Agentic AI [21].

**Platform documentation.** The platform sources are Anthropic's Claude Code documentation for settings [22], permissions [23], permission modes [24], managed settings [25], sandboxing [26] and hooks [27]; the equivalent documentation from Microsoft, Google, OpenAI, Databricks and AWS; the Model Context Protocol specification [28]; and the OpenTelemetry GenAI semantic conventions [29]. Vendor documentation is cited as it stood on 19 September 2026; §12.3 lists the sources that were not read in full. Each control in §5 gives exact key names and values on the Anthropic stack and names the equivalents on the others.

**Injection-defense research.** The research base comprises Spotlighting [30]; the six design patterns for securing LLM agents of Beurer-Kellner et al. [31]; the AgentDojo benchmark [32] and CaMeL [33]; argument-level policy guards evaluated outside the model — Progent, AgentSpec and ShieldAgent [34], [35], [36]; and the 2026 adaptive-attack studies, AutoDojo [37] and Narisetty et al. [38], which found that adaptive attacks substantially outperformed static injections against nearly all evaluated defenses. SEC-14 draws the consequence: no injection claim is demonstrated on a static corpus alone.

### 2.3 Verified platform behaviors

Commonly held assumptions about Claude Code mechanisms — the assumptions behind the harness risks R-12 to R-20 (§10.1) — were checked against the vendor documentation [22], [23], [24], [26], [27], [39] as it stood on 19 September 2026. Five were wrong or stale in ways that change control text, and SEC-08, SEC-09 and SEC-10 are written to the corrected facts:

1. `permissions.disableBypassPermissionsMode` and `disableAutoMode` take effect from any settings file — only their non-overridable *lock* status comes from a managed source.
2. `Read`/`Edit` deny rules do cover recognized Bash file commands (`cat`, `head`, `tail`, `sed`, `tee`) and redirection targets — the gap is interpreters and unnamed readers.
3. `claude -p` and the Agent SDK start in `default` (manual) mode, not `auto`, and trust verification is disabled under `-p`.
4. The Claude Code sandbox covers Bash, PowerShell and Monitor subprocesses only — file tools, MCP servers and hooks run on the host — and by default allows reads of the whole filesystem, including `~/.ssh` and `~/.aws`.
5. Command hooks fail open on internal error and timeout; only exit 2 or a valid JSON deny blocks.

Two further facts are fixed here because the series relies on them.

**`skipAutoPermissionPrompt` exists.** The settings reference lists it ("Skip the one-time notice Claude Code shows when you first enter auto mode yourself"; scope User or managed) alongside `skipDangerousModePermissionPrompt`. It suppresses a notice only, is not a permission relaxation, and does not belong in an unattended profile.

**The Agent 365 migration is behind, not ahead.** Retirement of the Entra agent-registry Graph API began 15 June 2026 (Microsoft 365 Message Center MC1297981 [40]), so SEC-17 is written as a completed-migration check, not a future re-baseline.

### 2.4 Terms

The series keeps one owner per term. The terms below are owned by this specification and defined here; the series' shared vocabulary register holds their final wording. All other terms are cited from their owners and listed at the end of this section without definition.

**Terms this specification owns.** Each term is defined in the section shown.

| Term | Section | Definition |
|---|---|---|
| **Control state** | §3 | The evidence state of a security control: *specified* / *implemented* / *demonstrated*, optionally *retired*. STD H14, STD S3.7 and SDD B5 carry the state as a column. |
| **Isolation boundary** | §5 (SEC-10); HS HRN-11 | The declared read roots, write roots, egress allowlist and the processes outside the boundary, enforced by OS or hypervisor primitives. Not to be called "containment" (CRISP-AG owns that word for the AIR halt mechanism). |
| **Tamper-evidence** | §5 (SEC-04) | Hash-chained records with a verifier and an off-host anchor. Append-only behavior enforced by writer code alone, or by repository configuration alone, does not qualify. |
| **Agent bill of materials (AgBOM)** | §5 (SEC-16) | The per-run CycloneDX (OWASP ACS profile) inventory of model pins, runtime version, settings and hook hashes, dependencies, MCP servers and tool-description hashes, referenced by hash from the run ledger. |
| **Prompt fence** | §5 (SEC-13) | Per-run nonce fencing plus datamarking of untrusted regions of a prompt; truncation of a fenced region is an anomaly, never silent. |
| **Instruction authenticity** | §5 (SEC-01) | JWS over a JCS-canonical payload with keys bound to Entra identities, or an Entra-issued OAuth 2.0 access token validated at the route. Identity or role asserted in the body is never accepted. |
| **Managed Runner Baseline (MRB-1)** | §6 | The versioned managed-settings payload every unattended Claude Code runner loads; its hash is recorded in the AgBOM. |
| **Adaptive injection evaluation** | §5 (SEC-14); §7 | A static five-family corpus plus an automated adaptive attacker; static ASR, adaptive ASR and utility reported for defended and undefended configurations. |
| **Tool-description integrity** | §5 (SEC-19) | Pinning of the MCP server version and the hash of its tool-description set in the AgBOM; a change fails preflight. |

Two further phrases are used with a fixed meaning but are not registered terms: **canary run** (the preflight or gate exercise that attempts known-prohibited actions and requires each to be refused by a mechanism; §7.3) and **kill-switch exercise** (the timed drill of the CRISP-AG §5.5 containment mechanism; §7.4).

**Terms cited.** DAS position, agent class, approval levels, capability frontier, consequential-decision flag, Agent Identity & Registry Record (AIR), containment, demotion, standing governance invariant — **CRISP-AG**. HRN controls (HRN-01 to HRN-12), unattended run, evidence ledger, harness manifest — **HS**. Hub, spoke, H4, H8, H14, S3.x, proportionality trigger, honest-claims matrix — **STD**. Enforcing mechanism, failure mode (of a mechanism), model-based gate, monotone privilege, binding — **SDD**. Stage W0–W7, exit check, run ID, Roles (eleven) — **WF**. Vendor Service Profile, Approved AI Service Register, Vendor Change Register, vendor-configured agent, configured-agent profile, Vendor Control Owner — **VCS**. OWASP LLM Top 10 2026, OWASP Top 10 for Agentic Applications 2026, OWASP MCP Top 10, MITRE ATLAS (agentic), Agent Control Standard, CSA Agentic Trust Framework, A2A Agent Card — **EXT** (external sources).

## 3. Control state

### 3.1 The three states and the fourth

A security control named in any governed document is always in exactly one state:

- **Specified.** The control is named, its enforcing mechanism is named, and its verification is defined — but the implementing artifact does not exist, or exists only as a filename, a comment or a draft.
- **Implemented.** The implementing artifact exists in the repository or the managed source and is loaded by the runtime, but it has not been exercised against the threat it addresses.
- **Demonstrated.** A passing test that names the threat has been run against the built system at Gate 3, and the run ID is recorded beside the control in H14.
- **Retired** (optional). The control has been superseded or the threat it addressed no longer applies; the record of its last demonstrated state and the superseding control are kept.

### 3.2 Rules

1. A control whose artifact does not exist is *specified*, whatever the prose says. A threat-model row reading "controls: signature" is not a statement that a signature is checked.
2. A control whose artifact exists but has not been exercised is *implemented*. Loading a settings file is implementation; refusing a canary action under it is evidence toward demonstration — the state becomes *demonstrated* only when that refusal is the Gate 3 (W6) verification recorded with a run ID (rule 4).
3. Only a passing test naming the threat makes a control *demonstrated*. A green suite that does not name the threat does not.
4. A control's state changes only at W6, when the named verification passes on built code at Gate 3 and the run ID is recorded beside it (WF §10). W5 engineering evidence — a claim-auditor ledger, a passing canary in CI — is necessary to enter W6 and does not itself change the state. Closing a finding (a fix lands, a test passes) and changing a control's state are two different records: the first is a repository event and the second a gate decision.
5. A control that was *demonstrated* returns to *implemented* when its mechanism, its binding (SDD Principle 11) or the model it was tested against changes, and remains there until the test is re-run. VCS VC-05 change notices and SDD A7 drift events trigger the re-run (SEC-22).
6. The state is carried on the control, not on the document: STD S3.4 rows, STD S3.7 declarations, STD H14 rows and SDD B5 rows all carry the same column, and the `control_evidence` gate checks that they agree.

### 3.3 Mapping to external vocabularies

No external standard uses these three words. The analogues below are given so that auditors and the AI Governance Board (AIGB) can place them; they are **approximate, and the enumerations are unverified** (§12.3).

| SEC state | SOC 2 analogue | OSCAL `implementation-status` analogue | NIST SP 800-53A analogue | CSA ATF phrase |
|---|---|---|---|---|
| Specified | Control designed but not yet operating (pre-Type 1) | `planned` | Examine finds the documentation only | — |
| Implemented | Suitability of design (Type 1) | `implemented` (or `partial`) | Examine and interview satisfied; test not performed | — |
| Demonstrated | Operating effectiveness over a period (Type 2) | `implemented` with assessment evidence | Test method (determination "satisfied") | "Agents earn autonomy through demonstrated trustworthiness" |
| Retired | Control removed from scope with rationale | `not-applicable` or `alternative` | Control withdrawn from the baseline | — |

### 3.4 How the column is carried

**STD H14.** The honest-claims matrix already distinguishes *specified* from *demonstrated* for product claims. The Standard extends the same distinction to security controls: every control cited in an S3 spoke appears in H14 with its state and, when demonstrated, its run ID. **STD S3.7** carries the isolation-boundary declaration with the state of each mechanism named in it. **STD S3.4** rows carry, per control ID, the implementing artifact and its state. **SDD B5** — the traceability matrix in the worked example — adds a `control_state` column so that the coverage view distinguishes enforced-and-demonstrated from enforced-and-untested. SDD A3 carries the column; SDD A2 carries the failure-mode column, which records whether a mechanism fails open or closed and on which SEC-09 relies. The `control_evidence` gate (§8) fails a set whose columns disagree.

## 4. Threat model

### 4.1 Organization

The threat model is organized by the attack surfaces of CRISP-AG §7 so that the two documents read as one table. Each row names the following: the threat; the OWASP Top 10 for Agentic Applications 2026 item (canonical titles in Appendix A); the OWASP LLM Top 10 2026 item (the two OWASP labels share one column); the MITRE ATLAS technique or case-study ID (ATLAS data v2026.06, 30 June 2026); the incident anchor; the SEC controls; and the CRISP-AG mitigation cited. Each ATLAS ID is given as of that data release, and an adopter verifies it against the ATLAS changelog before pinning it in its own threat model (§12.3). Where CRISP-AG owns the mitigation (ASI06, ASI07, ASI08, ASI09), the SEC column names only the SEC controls that support it.

Two facts about the stack shape the table. First, in `dontAsk` mode the Claude Code auto-mode classifier does not run; the server-side probe that scans incoming tool results is the only platform-side injection layer, and it is defense in depth, not a control. Second, the Claude Code Bash sandbox does not cover file tools, MCP servers or hooks, so any row whose mitigation is "the sandbox" applies to shell subprocesses only unless the whole process runs inside a container, a VM or the sandbox runtime.

### 4.2 The table

| # | Surface (CRISP-AG §7) | Threat | OWASP ASI · LLM 2026 | ATLAS (v2026.06) | Incident anchor | SEC controls | CRISP-AG mitigation cited |
|---|---|---|---|---|---|---|---|
| 1 | User input | Direct prompt injection; role manipulation | ASI01 Agent Goal Hijack · LLM01 Prompt Injection | AML.M0033 Input and Output Validation for AI Agent Components | — | SEC-13, SEC-14; §5.24 declared properties | §7 user-input row: adversarial testing, structured refusal rules, DAS-enforced action boundaries |
| 2 | Retrieved content | Indirect injection through documents, email, web pages, tool results | ASI01 · LLM01 | AML.CS0059 EchoLeak; AML.CS0046 Data Destruction via Indirect Prompt Injection Targeting Claude | EchoLeak CVE-2025-32711 [41] (NVD 7.5 High, CWE-74, published 11 June 2025) | SEC-13, SEC-14, SEC-10, SEC-20; §5.24 | §7 retrieved-content row; output gating for HITL-REQUIRED+ |
| 3 | Retrieved content | Forgeable prompt delimiter; silent truncation of a fenced region | ASI01 · LLM01 | — | Risks R-21, R-24 (§10.1) | SEC-13 | — |
| 4 | Output / action | Rendered links, images or HTML in agent output exfiltrate context (zero-click) | ASI01 · LLM10 Improper Output Handling | AML.CS0059 | EchoLeak CVE-2025-32711 (retrieved email → instruction → markdown image → exfiltration) | SEC-20 | §7 output / action row (output gating) |
| 5 | Retrieved content / memory | Hidden context exposure — tool results, memory and retrieved documents are confidential context; leakage through logs or downstream output | ASI06 Memory & Context Poisoning (context half) · LLM08 Hidden Context Exposure | AML.T0080.001 AI Agent Context Poisoning: Memory | — | SEC-04 (ledger redaction), SEC-10 (read roots), SEC-20 | §7 persistent-memory row |
| 6 | Persistent memory | Standing-policy poisoning of a memory, lessons or precedent store | ASI06 · LLM05 Data and Model Poisoning | AML.T0080.001; AML.T0099 AI Agent Tool Data Poisoning | Gemini memory attack (OWASP ASI06 anchor) | SEC-04 (provenance on write), SEC-16 | CRISP-AG §7 persistent-memory row (owner) |
| 7 | Session context | Session-context contamination — early-session adversarial data biases later steps | ASI01 / ASI06 · LLM01 | — | Microsoft failure-mode taxonomy v2.0 (4 June 2026): "highly effective and difficult to detect" | SEC-13 (datamarking as provenance tag), §5.24 plan-then-execute, per-stage context reset | CRISP-AG §7 session-context surface (new in v3.0; cites SEC-13) |
| 8 | Tool call | Excessive agency; out-of-scope tool call; wildcard interpreter allow rules | ASI02 Tool Misuse · LLM03 Excessive Agency | AML.CS0037 Data Exfiltration via Agent Tools in Copilot Studio | ATLAS AML.CS0037 (Copilot Studio, November 2025); Risk R-15 | SEC-08, SEC-09, SEC-10; HRN-01, HRN-03 | §7 tool-call row: least-privilege tools, scoped per-agent credentials, HITL gates |
| 9 | Tool call | Argument-level evasion of string deny patterns | ASI02 · LLM03 | — | Risk R-17 | SEC-09 (`PreToolUse` guard parses, not matches) | — |
| 10 | Identity | Spoofed instruction; self-asserted identity and role in the request body | ASI03 Identity & Privilege Abuse · LLM02 Sensitive Information Disclosure (record integrity) | — | Risk R-01 (a forged AIGB role accepted as a Gate 4 approval) | SEC-01, SEC-17 | §5.5 AIR (per-agent identity); §5.2 intersection rule |
| 11 | Identity | Replay of a captured instruction | ASI03 | — | Risk R-06 | SEC-03 | — |
| 12 | Identity | Standing credentials on the runner; credential files readable inside the sandbox | ASI03 · LLM02 | AML.T0083 Credentials from AI Agent Configuration; AML.T0098 AI Agent Tool Credential Harvesting | Invariant Labs Cursor demo [42] read `~/.cursor/mcp.json` and SSH keys (1 April 2025) | SEC-11, SEC-10 (`sandbox.credentials`, `denyRead`), SEC-23 | §7 code-execution row: separate secrets boundary |
| 13 | MCP / connector | Static secrets in MCP configuration files (`.mcp.json`, `managed-mcp.json`) | ASI04 Agentic Supply Chain Vulnerabilities · LLM04 Supply Chain | AML.T0083 | MCP01:2025 Token Mismanagement & Secret Exposure | SEC-23, SEC-11, SEC-15 (CI secret scan) | §7.3 (deployer responsibility → SEC) |
| 14 | MCP / connector | Shadow MCP servers — unregistered servers configured by a user, project or checked-out repository | ASI04 · LLM04 | — | MCP09:2025 Shadow MCP Servers | SEC-23 (`allowManagedMcpServersOnly`, `managed-mcp.json`, `disableSideloadFlags`); VCS VC-04 | §7.3 connector allowlisting → SEC |
| 15 | MCP / connector | Tool poisoning; rug pull (description changed after approval); shadowing of a trusted server | ASI04 · LLM04 | AML.T0104 Publish Poisoned AI Agent Tool; "AI Agent Tool Poisoning" and "AI Supply Chain Rug Pull" (v5.5.0); AML.CS0053 Poisoned Postmark MCP Server Email Exfiltration; AML.CS0045 Data Exfiltration via MCP Server used by Cursor | mcp-server-git CVE-2025-68143 (8.8), CVE-2025-68144 (8.1), CVE-2025-68145 (7.1) — fixed 2025.12.18 (reported 20 January 2026) [43]; MCP03:2025 Tool Poisoning | SEC-19, SEC-16, SEC-02 | §7.3 tool-integrity verification → SEC |
| 16 | Code execution | Arbitrary execution via interpreter allow rules; escape to host; data destruction via tool invocation | ASI05 Unexpected Code Execution · LLM03 | AML.T0101 Data Destruction via AI Agent Tool Invocation; AML.T0105 Escape to Host; AML.M0032 Segmentation of AI Agent Components; AML.CS0046 | ATLAS AML.CS0046 (Claude, January 2026); Replit production-database deletion (OWASP ASI10 anchor) | SEC-10, SEC-08, SEC-09 | §7 code-execution row: sandboxing, deny-by-default production writes |
| 17 | Code execution / runner | Headless trust bypass — `-p` disables trust verification; a checked-out repository supplies hooks, skills or MCP config that run unsandboxed on the host | ASI04 / ASI05 · LLM04 | AML.T0105 | Gemini CLI CVE-2026-12537 / GHSA-wpqr-6v78-jr5g: a "CI/CD workspace-trust bypass" enabling "unauthenticated RCE in headless environments" (24 April 2026) [44], [45] (unverified) | SEC-08 (`strictPluginOnlyCustomization`, repo allowlist), SEC-09 (`allowManagedHooksOnly`), SEC-23 | — |
| 18 | Record integrity | Path traversal through an externally supplied identifier; whole-file rewrite; records landing outside the store | ASI02 | — | Risks R-05, R-08; CWE-22 | SEC-02, SEC-05 | — |
| 19 | Record integrity | Deletion, reordering or truncation of an "append-only" log goes undetected | ASI03 / ASI09 | — | Risk R-07 | SEC-04 | STD S3.5 (cited) |
| 20 | Record integrity | Contradictory later record silently wins; exception expiry drops out of view | ASI09 Human-Agent Trust Exploitation | — | Risks R-09, R-10 | SEC-06 | CRISP-AG §7.2.2 (owner) |
| 21 | Record integrity / CI | Self-attested gate report; mutable action tags; unpinned dependencies; default `GITHUB_TOKEN` | ASI04 · LLM04 | — | Risks R-11, R-28; SLSA provenance | SEC-07, SEC-15 | — |
| 22 | Supply chain | Whole-runtime composition unknown; a component changes behind a stable name | ASI04 · LLM04 | AML.T0104 | Risk R-29; Microsoft v2.0: "Generate SBOMs including plugins and tool descriptions" | SEC-16, SEC-19, SEC-22 | §7.3 → SEC |
| 23 | Model supply chain | Model identifier retargeted or retired behind a stable alias; provider system-prompt prepend or inference-layer change alters behavior undetected | ASI04 · LLM04 / LLM05 | — | Anthropic retirements 19 February, 20 April, 15 June ×2 and 5 August 2026 [46]; Databricks `databricks-claude-sonnet-4` retirement 9 October 2026 [47] | SEC-22; VCS VC-05 | §7.3 model-provider supply chain → SEC (verification) / VCS (lifecycle) |
| 24 | Inter-agent | Cross-agent instruction propagation; delegated scope leakage | ASI07 Insecure Inter-Agent Communication · LLM01 | — | Microsoft v2.0 "Inter-Agent Trust Escalation" | SEC-01 (delegation via Entra on-behalf-of), SEC-17 | CRISP-AG §7 inter-agent row (owner); §5.3 Orchestration Contract |
| 25 | Inter-agent | Cascading failures through a pipeline | ASI08 Cascading Failures | — | — | SEC-12 (halt mechanics) | CRISP-AG §7.2.1 (owner) |
| 26 | Human review | Reviewer rubber-stamps; HitL-bypass chains (zero-click end-to-end exfiltration) | ASI09 | AML.CS0059 | Microsoft v2.0: HitL bypass "the most consistently exploited failure mode, at very high frequency" | SEC-06 (visibility), SEC-14 (HitL-bypass chains in Gate 3 scope), SEC-20 | CRISP-AG §7.2.2 (owner) |
| 27 | Rogue agent | No individual stop; credential persists after sponsor change; unregistered agent | ASI10 Rogue Agents · LLM03 | — | Replit (OWASP ASI10 anchor); Risk R-20 | SEC-12, SEC-17 | §5.5 containment field; §5.1.3 demotion; §6.3 standing invariants |
| 28 | Computer use / browser | Visual attacks on computer-use agents; "ClickFix" hijacking; runs on the real desktop outside any isolation boundary | ASI01 / ASI05 · LLM01 | AML.CS0055 AI ClickFix: Hijacking Computer-Use Agents | Claude Code security page [48]: computer use "runs on your actual desktop rather than in an isolated environment"; Microsoft v2.0 "Computer Use Agent Visual Attack" | SEC-21 | — |
| 29 | Isolation | Cross-run and cross-product reads; source paths unconstrained | ASI03 / ASI06 · LLM02 | AML.M0032 | Risks R-26, R-27 | SEC-10 (read roots, `blockReadsOutsideWorkingDirectories`), SEC-02 | STD S3.3 (cited) |
| 30 | Egress | Exfiltration to an unlisted host; domain fronting past a hostname allowlist | ASI01 / ASI02 · LLM02 | AML.M0032 | Anthropic sandboxing docs [26]: fronting caveat | SEC-10 (default-deny egress through the enterprise proxy) | §7 code-execution row |

### 4.3 What the table adds to the §10.1 risk catalog

Beyond the catalog's identity, record-integrity, harness, untrusted-content and isolation risks, the table adds output handling (row 4, LLM10), hidden context exposure (row 5, LLM08), MCP secrets and shadow servers (rows 13–14, MCP01/MCP09), tool poisoning, rug pull and shadowing (row 15), session-context contamination (row 7, Microsoft v2.0), computer-use visual attacks (row 28), model supply chain (row 23), headless trust bypass (row 17) and HitL-bypass chains (row 26). Each has a control in §5. Threat models at this stage commonly leave ATLAS IDs "to be assigned at Gate 2"; the ATLAS column assigns them, each subject to the changelog check in §4.1.

### 4.4 Ordering of defenses

The table relies on defenses in this order: deterministic tool-call policy evaluated outside the model (SEC-08, SEC-09, SEC-10, and a monotone privilege policy per SDD PROTO-INV-07); architectural patterns that make injected text unable to trigger consequential action (§5.24); the prompt fence (SEC-13); and detection, which is a signal feeding the gap list and never a control. The §10.1 risk catalog points to this ordering, and the 2026 adaptive-attack results strengthen it (evidence under SEC-14).

## 5. Controls SEC-01 to SEC-23

### 5.0 How to read a control

Each control carries the following fields: **Rule** (normative; SHALL/SHALL NOT); **Why** (the argument and the verified sources); **Anthropic stack** (implementation on Claude Code, the Agent SDK, the Claude API and Databricks FMAPI/Unity Gateway, with exact key names and values from the vendor documentation as of 19 September 2026, canonical host code.claude.com); **Equivalents** (OpenAI Codex/Agents SDK, Microsoft Agent Framework/Foundry, Google ADK plugins, Databricks Unity Gateway, Copilot Studio via the VCS VC-06 configured-agent profile); **Closes** (the risks in the §10.1 catalog that the control closes, or the gap it fills); **Evidence** (the test or exercise an adopter must produce to earn the *demonstrated* state); **Class scaling** (CRISP-AG §6.2); **Owner** (WF §4 role).

Controls SEC-01 to SEC-07 concern instruction and record integrity and apply to any component that writes governed records, model-backed or not. SEC-08 to SEC-12 concern the harness. SEC-13 and SEC-14 concern untrusted content. SEC-15 to SEC-19, SEC-22 and SEC-23 concern supply chain and composition. SEC-20 and SEC-21 concern output and desktop surfaces. SEC-18 is the gate.

### `SEC-01` — Instruction authenticity

**Rule.** Every instruction that changes a governed record SHALL carry proof of its author, verified before validation runs. Two forms satisfy this requirement: (a) a JSON Web Signature (RFC 7515) [49] over a payload canonicalized with the JSON Canonicalization Scheme (RFC 8785) [50], with the signing key bound to the instructor's Microsoft Entra identity; or (b) an Entra-issued OAuth 2.0 access token presented to an authenticated route, from which the principal is taken. Identity or role asserted in the request body SHALL NOT be accepted for any purpose. Entitlement to the record type SHALL be resolved at write time from the directory (Entra group membership or an access package for agent identities), never from the instruction. Delegation between agents SHALL use Entra Agent ID on-behalf-of flows [51].

**Why.** A governance-record writer is by design the only component that writes an organization's portfolio-level governance records. If it takes identity and role from the request body, a forged "AI Governance Board" approval is accepted with a clean receipt (R-01). The Standard's own S3.6 requires authenticated routes, so such a writer fails conformance against the organization's own standard before anything external is considered. Serializing with sorted keys (for example Python's `json.dumps(sort_keys=True)`) is close to JCS but not equivalent; a signature over a non-canonical encoding is not reliably verifiable.

The IETF work on agent delegation is not settled: the agentproto BoF (23 July 2026) [52] supported a working group but rejected the initial charter scope (38/124), and the transaction-tokens-for-agents draft is an individual submission with no WG adoption. SEC therefore rests on RFC 7515, RFC 8785 and Entra OAuth, which are mature, and tracks the drafts in §11. The CSA Agent Identity Governance Framework v1 (2 April 2026, rev. 20 May 2026) [15] states the principle: every identity has a named human sponsor; no identity may delegate more privilege than it holds. The NCCoE draft concept paper "Accelerating the Adoption of Software and AI Agent Identity and Authorization" [53] (unverified), published 5 February 2026 with comments closing 2 April 2026, gives the negative form: agents are not generic service accounts.

**Anthropic stack.** The governance-record writer has no model in its write path and keeps that property. Option (a) preserves a file-and-CLI shape and adds one signature-verification dependency; that trade-off is made explicit at Gate 2. For agents that instruct other agents, the instructing principal is the Entra agent identity (SEC-17) and the on-behalf-of token's parentage is recorded in the ledger (SEC-04). The Claude API is consumed under Console or Claude for Enterprise organization keys and through Databricks FMAPI/Unity Gateway; neither path authenticates the *instruction*, only the *caller*, so SEC-01 sits in the organization's code, not in the vendor's.

**Equivalents.** Microsoft: Entra Agent ID access packages (OBO and autonomous), Conditional Access for agents [54]. Copilot Studio agents: the maker's identity and DLP policy via Agent 365 (VCS VC-06) — the instruction path is the platform's; record it as such in the configured-agent profile. Google and OpenAI: not applicable to this write path.

**Closes.** R-01, R-02. **Interim** (R-02): a small signed roster (identity → role, with expiry) verified by the governance-record writer, recorded as a dated exception. **Evidence.** An adversarial test showing that a forged role is refused through the writer's refusal path, an unsigned instruction is rejected, a signature over a non-canonical payload is rejected, and a role not held in the directory is refused, with the run ID recorded in H14. **Class scaling.** All classes for any component that writes a governed record; Class 4 before the first real record. **Owner.** Product engineering, with the identity administrator.

### `SEC-02` — Identifier validation and path confinement

**Rule.** Every externally supplied identifier that reaches a filesystem path, a branch name or a record key SHALL be validated against `^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$`, SHALL be rejected if it equals `.` or `..` or contains a separator, and after joining SHALL be confined by `realpath` to the owning store or an allowlisted root. Tool arguments derived from untrusted content SHALL be validated against the same character classes before the tool call (see SEC-19).

**Why.** An unvalidated identifier, such as a product ID carrying `../..`, can place a record two directories above the store (R-05); the weakness is CWE-22 [55]. A record written outside the record store is outside the only allow rule, outside branch protection scoped to those paths and outside anything the gates view reads — a gate decision made to land where no one looks. A branch-name pattern that admits `..` is saved only by git's own ref rules (R-30). MITRE ATLAS AML.M0033 (Input and Output Validation for AI Agent Components) is the agentic citation.

**Anthropic stack.** Implemented purely in code, in the governance-record writer and the branch-publishing step; no vendor dependency. The same validator runs in the SEC-09 `PreToolUse` guard on any argument that names a path.

**Equivalents.** Vendor-neutral.

**Closes.** R-05, R-30 (validation half). **Evidence.** An adversarial test showing that traversal in every externally supplied identifier (product and instruction identifiers among them) is refused, and a test of the branch-publishing step showing that a branch component `..` is refused by the step's own code, not by git. **Class scaling.** All classes. **Owner.** Product engineering.

### `SEC-03` — Replay protection

**Rule.** The instruction identifier SHALL be unique per store; a duplicate SHALL be refused through the writer's ordinary refusal path. Every instruction SHALL carry a `not_before`/`expires` pair, and the timestamp SHALL be inside the signed material (SEC-01) so that a replay is detectable even if the uniqueness index is lost.

**Why.** Without a uniqueness check, the same instruction submitted twice produces two written records with the same record identifier and different timestamps (R-06); the weakness is CWE-294. A gate approval captured once can be re-applied after a returned decision or a reset. A receipt that reports only what changed does not distinguish a first write from a replay.

**Anthropic stack.** Implemented in code. Once the governance-record writer is a service (SEC-01 option b), the timestamp comes from a trusted source, not the writer's clock (see also R-09).

**Closes.** R-06. **Evidence.** A test showing that a duplicate instruction identifier is refused, an expired instruction is refused, and an instruction whose `not_before` lies in the future is refused. **Class scaling.** All. **Owner.** Product engineering.

### `SEC-04` — Tamper-evidence of records and ledgers

**Rule.** Every governed record store and every harness ledger (HS HRN-06) SHALL be tamper-evident: each record commits to its predecessor by `prev_hash` over the JCS-canonical encoding of the preceding record; the store keeps a head pointer; a `verify` routine walks the chain and reports the first break; the verifier runs in CI on every push; and the head hash is anchored off-host with the ledgers in write-once storage. Append-only behavior enforced solely by writer code, by an `Edit(path)` deny rule or by repository configuration does not satisfy this control. Secrets and confidential tool results SHALL be redacted from ledger rows before shipping (LLM08).

**Why.** "Append-only" in a record writer usually means "the code only appends" — a property of the writer, not of the log (R-07). Deleting, reordering or truncating lines leaves every remaining record individually valid. The hash chain is the Merkle append-only log of RFC 9162 §2.1 [56] reduced to its simplest useful form; a register of this size does not need inclusion proofs yet. NIST SP 800-53 Release 5.2.0 (August 2025) adds SI-07(19) and SA-15(13) for log integrity — not AI-specific, but citable. For HS HRN-06, the common assumption that a `Write(...)` deny makes ledgers immutable is wrong on two counts: `Write(path)` rules are never consulted (only `Edit(path)` and `Read(path)` are), and even `Edit` is bypassed by `python -c "open(...,'w')"`. The chain, the head and the verifier amount to about forty lines of code and add no new dependency.

**Anthropic stack.** Governance-record writer: `prev_hash`, head, `verify` subcommand. Harness ledgers: `Edit(<ledger>)` deny plus `sandbox.filesystem.denyWrite` for the ledger directory so that child processes are bound at the OS level (SEC-10), plus the hash-chain job that mirrors to write-once storage (Azure Blob immutability policy or S3 Object Lock) with retention ≥ max(statutory, EU AI Act post-market, audit cycle) per HS HRN-06. Databricks: append-only Delta tables with a hash-chain job mirrored to write-once storage (WF Appendix B). The AgBOM hash (SEC-16) is a chained field.

**Equivalents.** Unity Gateway unified trace table (OTel format, beta 21 August 2026) [57] as the payload source; Foundry Application Insights/Purview audit [58]; Copilot Studio maker audit logs in Purview [59] (VCS VC-06 — not customer-chained; record the limitation).

**Closes.** R-07. **Evidence.** A test showing that `verify` detects a removed, a reordered and an altered line; a CI job that runs it on every push; a comparison against the off-host anchor. **Class scaling.** All classes for governed records; Class 2+ for harness ledgers. **Owner.** Product engineering; Harness Engineer for storage.

### `SEC-05` — Owned-path confinement and no whole-file rewrite

**Rule.** A record-writing component SHALL write only within its owned paths, each resolved by `realpath` and checked, and SHALL never rewrite a file whole. Where a hub must reference a gate decision, the writer appends to a dedicated block or sidecar that the hub includes; the hub itself is never rewritten by an agent. Any suite that asserts "no `'w'` mode" SHALL cover the whole module.

**Why.** A governance-record writer that updates a hub by reading it, splicing in an entry and writing the whole file back can silently alter earlier entries. If it also accepts an arbitrary hub path, it can rewrite files outside its owned paths, and an append-only assertion that scans only part of the module will not notice (R-08). Splicing also has edge cases — an insertion marker that is not found — in which the entry lands in the wrong place.

**Closes.** R-08. **Evidence.** A test showing that a hub path outside the product's owned set is refused, that a whole-module scan for `'w'` mode passes, and that an entry whose insertion marker is missing is appended, never spliced into the file. **Class scaling.** All. **Owner.** Product engineering.

### `SEC-06` — Supersession records; expiry as a state

**Rule.** A gate outcome or an exception SHALL change only by an explicit superseding record that names the record it replaces. Conflict detection SHALL run against the whole history for a gate, not a time window. The gates view SHALL render from the superseding chain, not by recency. An exception's expiry is a state — `EXPIRED` is shown with increasing prominence, never dropped — and `CLOSURE` and `RENEWAL` are record types instructed by the AI Risk Officer. The anomaly count from ingest (SEC-13) SHALL be surfaced in the gate report and in every decision summary or brief presented to the approver, and the reviewer's acknowledgement recorded in H0.

**Why.** Where conflict detection looks only at a time window and the view renders by recency, a contradictory record filed on day two becomes the portfolio view's answer without a conflict mark (R-09). Where expiry is a filter rather than a state, expired exceptions vanish from notification exactly when they lapse (R-10). Anomalies that are designed not to block, to preserve availability, must still reach the human who signs (R-25). This control is the record-side support for CRISP-AG §7.2.2's ASI09 mitigations, which CRISP-AG owns.

**Closes.** R-09, R-10, R-25 (visibility half; boundary-audit gate change in §8.2). **Evidence.** A test showing that a later contradictory record without supersession is refused and that an expired exception is rendered `EXPIRED`, and a gate report that carries the anomaly count. **Class scaling.** All. **Owner.** Product engineering; AI Risk Officer for record types.

### `SEC-07` — Independent regeneration of the gate report

**Rule.** The push path SHALL regenerate the gate report independently of the process that produced it and refuse on any difference. CI SHALL regenerate the report for the pushed run directory and fail when it differs from the committed file. The report SHALL carry the gates version and the hash of the gate script.

**Why.** A branch-publishing step that trusts a gate report the drafting process wrote has a self-attested precondition (R-11). A report produced by a modified gate script must be distinguishable.

**Closes.** R-11. **Evidence.** A test showing that a hand-edited PASS report is refused by the branch-publishing step and by CI. **Class scaling.** All. **Owner.** Product engineering.

### `SEC-08` — Permission mode and managed settings

**Rule.** Unattended runs SHALL start with `--permission-mode dontAsk` passed explicitly on the command line (or `permissionMode: "dontAsk"` in the Agent SDK) together with an exact `--allowedTools` list; the settings-file key `permissions.defaultMode` is set to `"dontAsk"` as well but is not relied upon, because cloud sessions ignore it in settings files. `auto` mode SHALL NOT be the sole gate for any unattended run and SHALL NOT be relied upon from project or local settings, where it does not take effect. The lockdown keys `permissions.disableBypassPermissionsMode: "disable"` and `disableAutoMode: "disable"` SHALL be delivered from a managed source; they work from any scope but are *policy* only when a managed source supplies them, because a project-level value can be removed by any PR author and is not evaluated as a lock. `allowManagedPermissionRulesOnly: true` SHALL be set (managed-only).

Interpreter wildcards (`Bash(python:*)`, `Bash(pandoc:*)`) SHALL be replaced by exact invocations; document conversion moves outside the agent's tool surface. Unrecognized keys are removed or justified, and every key carries its scope from the settings-reference Scope column. The key `skipAutoPermissionPrompt` is not one of them: it is a real key that only suppresses a one-time notice and is not a permission relaxation (§2.3); describing it otherwise is risk R-18. Because `-p` disables trust verification, unattended runners SHALL check out only repositories on an allowlist, and `strictPluginOnlyCustomization: true` SHALL block repository-supplied skills, agents, hooks and MCP servers. The full payload is MRB-1 (§6).

**Why.** Four harness risks recur: `defaultMode: "auto"` configured where the binding's prose describes `dontAsk` (R-13), the lockdown keys placed in project settings (R-14), wildcard interpreter rules subsuming the deny list (R-15) and keys whose effect is misdescribed (R-18). The vendor documentation [22], [24] now describes `dontAsk` as "Reads and pre-approved tools; anything that would prompt is denied — Locked-down CI and scripts". It states that `claude -p` and the Agent SDK start in `default` (manual) mode, as do Enterprise and Console keys. An unattended run with no explicit mode would therefore prompt with no one to answer; it hangs or fails and does not "fall back to deny". The documentation also states that the `permissions.defaultMode` values `auto` and `bypassPermissions` "don't take effect from project or local settings" (before v2.1.257, `bypassPermissions` took effect from any file), and that `disableBypassPermissionsMode` "is typically placed in managed settings to enforce organizational policy, but it works from any scope" and is a "Lock: applies the strictest value any source sets".

Under `dontAsk`, protected-path writes (`.git`, `.claude`, `.mcp.json`, shell rc files) are *denied*, not classified — the built-in circuit breaker that makes `dontAsk` the right unattended mode. The auto-mode classifier has measured false-positive and false-negative rates of 0.4% and 17% on Anthropic's published sets [60] and pauses after 3 consecutive or 20 total denials; its calls are billed on Enterprise, and it is a per-action control, "not an isolation boundary".

The value of the lockdown keys is the string `"disable"`, not a boolean; a managed file that gets the type wrong is dropped at schema validation, and the control appears shipped but does not bind. The settings reference lists `disableAutoMode` at the top level, while the permissions page nests it under `permissions`; the Harness Engineer confirms the effective key on the pinned version with `claude doctor` and records it in the HRN-09 manifest.

**Anthropic stack.** Launch: `claude -p --permission-mode dontAsk --allowedTools "Read,Edit,Bash(python3 <gate-script> *),..." --settings <path>` (the `--settings` file supplies project-scope rules; policy comes from the managed source). Agent SDK: `permissionMode: "dontAsk"`, `allowedTools: [...]`; SDK callback hooks for fail-closed guards (SEC-09). Managed: MRB-1. Verification: `claude doctor` and `/status` show which managed source applied. Note that `dontAsk` denies `AskUserQuestion` outright, which suits a design where no action is HITL mid-run; mid-run approvals belong to the WF gates, not to the session. For interactive high-risk developer sessions, `--restricted` (v2.1.248+) stops the classifier from approving protected-path writes.

**Equivalents.** OpenAI Codex: approval policy `never` [61] only inside a `read-only` or `workspace-write` sandbox with a `requirements.toml`-pinned policy; Agents SDK `allowedTools` equivalent via tool guardrails. Microsoft Agent Framework: function-calling middleware with `FunctionInvocationContext.Terminate` [62]; Foundry per-agent Entra identity and RBAC. Google ADK: Runner-level Plugin `before_tool_callback` returning a synthetic result to block [63]. Copilot Studio: tenant DLP connector policy and Agent 365 Conditional Access — no customer-controlled permission mode (VCS VC-06 records the gap and the DAS ceiling that follows). Databricks: Unity Catalog GRANT/ABAC on model, MCP and agent service objects through Unity Gateway (GA 4 August 2026; ABAC beta 11 August 2026) [64].

**Closes.** R-13, R-14, R-15, R-18. **Evidence.** A preflight that asserts that the effective mode is `dontAsk` and aborts otherwise; a binding test showing that every key is in the pinned settings-reference list at a scope where it is policy; a canary run (§7.3) showing the five prohibited actions refused by mechanism. **Class scaling.** Class 2+ for any unattended run; Class 1 interactive sessions carry the managed lockdown keys only. **Owner.** Harness Engineer.

### `SEC-09` — Hooks committed, version-controlled and fail-closed

**Rule.** Every hook the harness relies on (HS HRN-02 preflight, HRN-03 pre-tool guard, HRN-04 unattended guard, HRN-05 claim auditor, HRN-06 action log, HRN-10 trace) SHALL be a committed, version-controlled artifact with its own unit tests, delivered from managed settings with `allowManagedHooksOnly: true`. Each policy hook SHALL be written fail-closed: every internal error path — exception, parse failure, missing input, unexpected schema — returns exit code 2 with a `permissionDecision: "deny"` payload; the hook makes no network call and does no slow I/O; its `timeout` is set explicitly, and its own time budget is kept well below it.

Because a timed-out `command`, `http` or `mcp_tool` hook renders no decision and the action proceeds, deterministic denials SHALL also be encoded as `permissions.deny` rules and, for filesystem and network reach, as sandbox rules (SEC-10); the hook is the argument-level layer, never the only layer. Unattended runners built on the Agent SDK SHALL use SDK callback hooks, which block on timeout. The session preflight (HRN-02) SHALL invoke a known-denied canary and abort the run if it is not blocked. A `ConfigChange` hook SHALL log and, where the event permits, alert on any settings change during an unattended run. Argument-level checks SHALL run in the `PreToolUse` hook by parsing the command, not by matching rule strings. Each policy hook SHALL have a unit test asserting exit 2 on malformed input (WF W4 exit check).

**Why.** Two harness risks meet here: hooks that the binding names but that do not exist, so the runner enforces none of them (R-12), and deny patterns evadable by re-spelling the command (R-17). The vendor documentation states the general property behind R-12 [27]: "For most hook events, exit code 2 is the only exit code that blocks through the code alone. Without valid JSON on stdout, Claude Code treats exit code 1 as a non-blocking error and proceeds with the action"; a timed-out hook "doesn't block the tool call … don't count on a stalled hook to act as a gate"; "a mistyped path in `settings.json` leaves the gate silently disabled". The default command-hook timeout is 600 s. An absent, crashing, mis-pathed or timing-out `PreToolUse` hook therefore amounts to *allow*.

Hooks run unsandboxed on the host with the runner's privileges, so a repository-supplied hook is a code-execution path — the concrete risk behind the `-p` trust caveat. Precedence is favorable once the hook exists: a hook exiting 2 "stops the tool call before permission rules are evaluated, so the block applies even when an allow rule would otherwise let the call proceed", and hook decisions never bypass deny rules. `allowManagedHooksOnly` is managed-only and, if its value is invalid, is "Treated as `true` until fixed" — fail-closed by design.

Progent, AgentSpec and ShieldAgent [34], [35], [36] are the research form of the argument-level guard: symbolic rules over tool names and arguments evaluated outside the model with millisecond overhead. The `Stop` hook is overridden after 8 consecutive blocks (observed 9; `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP`) [65], and in headless mode an override is indistinguishable from a pass — so the claim auditor writes its own decision to the catch ledger on every invocation and the runner sets the cap explicitly.

**Anthropic stack.** Managed `hooks` block in MRB-1 naming `session-preflight.sh` (`SessionStart`), `pre-bash-guard.sh` (`PreToolUse` on `Bash`), `unattended-guard.sh` (`PreToolUse` on `Edit`, `Write` and `NotebookEdit`), `action-log.sh` (`PostToolUse` and `PostToolUseFailure`, all tools), `claim-auditor.sh` (`Stop`), `subagent-claim-check.sh` (`SubagentStop`), `turn-failure-log.sh` (`StopFailure`), `session-metrics.sh` (`SessionEnd`), plus `config-change.sh` (`ConfigChange` on policy, user and project settings) and a `SubagentStart` hook re-exporting `TRACEPARENT`. `PermissionRequest` deny goes through the `decision` object (exit 2 is not honored for that event). Metric: `claude_code.tool_decision{source="hook", decision="reject"}` is the native source for `harness_guard_block_rate` [66]; hook timeouts and non-blocking errors feed `harness_hook_health` (HS §5).

**Equivalents.** OpenAI Codex: 12-event hook system, exit 2 blocks, `requirements.toml` `allow_managed_hooks_only = true`; Agents SDK tool guardrails (`reject_content`, tripwire). Microsoft Agent Framework: function-calling middleware (terminate). Google ADK: Plugin `before_tool_callback`; Google recommends Plugins over callbacks "when implementing security guardrails and policies". Databricks: Unity Gateway guardrails and Agent Bricks guardrails [67] — guardrail blocks return HTTP 200 and are detected from the response body or trace table, not from status codes. Copilot Studio: none customer-controlled (VC-06).

**Closes.** R-12, R-17. **Evidence.** The `hook_exists` check showing that every hook path in the managed file exists; unit tests asserting exit 2 on malformed input, on exception and on a timeout-simulated slow path; a preflight canary shown blocked; a `ConfigChange` row shown in the ledger when a settings file is touched mid-run. **Class scaling.** Class 2+; Class 1 carries the action log and preflight. **Owner.** Harness Engineer.

### `SEC-10` — Isolation boundary (specifies HS HRN-11)

**Rule.** Every agent runtime SHALL run inside an isolation boundary enforced by OS or hypervisor primitives — never by pattern matching on tool arguments — and declared in STD S3.7 as four things: the **read roots**, the **write roots**, the **egress allowlist**, and the **processes outside the boundary**. The declaration SHALL state what each mechanism does not cover.

The boundary is proportionate to DAS position and class (HS HRN-11 tiers): (a) interactive, HITL-REQUIRED — the Claude Code Bash sandbox with managed filesystem and network policy at a minimum; (b) any unattended run (HRN-04), or any run in `dontAsk` or `bypassPermissions` without a reviewer — a **whole-process boundary** (container, VM, `@anthropic-ai/sandbox-runtime`, or vendor-hosted sandbox) as a non-root user, because the Bash sandbox alone does not cover file tools, MCP servers or hooks; (c) FULLY-AUTONOMOUS or Class 4 — kernel-level separation (VM or microVM). Where the platform cannot enforce the boundary, device management or the CI runner image SHALL enforce it, and Gate 2 records which one does.

**Egress** is denied by default and opened only to named endpoints — the model endpoint (or Unity Gateway), the git remote, and nothing else. Egress SHALL pass through the enterprise proxy; the built-in allowlist is hostname-based, and the vendor documents a domain-fronting bypass, so the built-in allowlist SHALL NOT be relied upon against a fronting adversary where the threat model warrants TLS inspection. Dependency installation happens in a setup phase that precedes and is isolated from the agent phase.

**Credentials.** No credential file exists on the runner (SEC-11). As a backstop, `sandbox.filesystem.denyRead` SHALL cover `~/.ssh`, `~/.aws`, `~/.claude/.credentials.json`, `./.env` and `./secrets/**`; `sandbox.credentials` `deny`/`mask` entries with `injectHosts` SHALL cover any token a tool needs; `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1` SHALL be set. `permissions.blockReadsOutsideWorkingDirectories: true` SHALL be set (from a managed source, so it binds). `Edit(path)` — not `Write(path)` — deny rules are the hygiene layer; the sandbox is the isolation layer.

**Runners** are Linux (bubblewrap + socat, optional seccomp) or macOS (Seatbelt); native Windows is unsupported, and Windows runners SHALL use WSL2 or a container. The sandbox runtime is a beta research preview (v0.0.64, 7 July 2026) [68], and STD S3.6 states that status. **Canary probes** (§7.3) SHALL include a read of `~/.ssh`, a `curl` to an unlisted host, and an `excludedCommands` addition via project settings — `excludedCommands` has no managed-only lockdown.

**Why.** Every harness risk in the catalog has the same shape: a string rule that a determined process steps around. OS-level isolation does not share that weakness (R-19). With `Bash(python:*)` allowed, the secret-path denies are decorative because Python opens files itself. The commonly cited example `cat .env` is now blocked (recognized file commands and redirections are covered), but interpreters, unnamed readers (`grep -r`) and subprocesses are not: "For OS-level enforcement that blocks all processes from accessing a path, enable the sandbox."

The vendor states the scope precisely: "The sandbox isolates Bash subprocesses … Built-in file tools, MCP servers, and hooks still run directly on your host"; the default filesystem policy is "read access to the entire computer … Note that this default still allows reading credential files such as `~/.aws/credentials` and `~/.ssh/`"; "Effective sandboxing requires both filesystem and network isolation"; the proxy allowlist is "based on the requested hostname and, by default, does not terminate or inspect TLS" and code inside "can potentially use domain fronting". Anthropic's own guidance [69] states: "Always run `--dangerously-skip-permissions` sessions inside a container, a VM, or the sandbox runtime, so that file tools, MCP servers, and hooks are also inside the boundary"; "The sandboxed Bash tool on its own … is not sufficient for fully unattended runs in either mode".

Codex defaults to network access *off* and runs a two-phase cloud runtime (setup online, agent offline). MITRE ATLAS AML.M0032 Segmentation of AI Agent Components is the agentic mitigation; AML.CS0046 (data destruction via indirect injection targeting Claude) is the reference incident for write-root confinement. The design-patterns principle defines the goal: "Once an LLM agent has ingested untrusted input, it must be constrained so that it is impossible for that input to trigger any consequential actions" (Beurer-Kellner et al., v3, 27 June 2025) [31].

**Anthropic stack.** Managed sandbox block (in MRB-1): `sandbox.enabled: true`, `sandbox.failIfUnavailable: true`, `sandbox.allowUnsandboxedCommands: false`, `sandbox.network.allowManagedDomainsOnly: true`, `sandbox.network.strictAllowlist: true`, `sandbox.network.allowedDomains: [<model endpoint>, <git remote>]`, `sandbox.filesystem.allowManagedReadPathsOnly: true`, `sandbox.filesystem.denyRead: [...]`, `sandbox.filesystem.denyWrite: [<ledger dir>, ...]`, `sandbox.credentials: {...}`, `env.CLAUDE_CODE_SUBPROCESS_ENV_SCRUB: "1"`. Whole-process boundary: the CI runner image (container, non-root) or `@anthropic-ai/sandbox-runtime` wrapping the `claude` process (blocks writes to `.git/hooks`, `.git/config`, `.mcp.json`, `.claude/commands`, `.claude/agents` and shell startup files by default; on Linux builds its deny list once at launch). Anthropic-hosted alternatives: Claude Code cloud sessions (allowlist proxy; GitHub token held outside the sandbox by a proxy issuing scoped credentials) or Claude Managed Agents (beta, header `managed-agents-2026-04-01`; self-hosted sandbox environment) [70] — beta means AGENT-DIRECTED pilots only until GA (HS §9). In the worked example, read roots for the drafting agent are the knowledge set and the current run directory; write roots are the run directory and the branch worktree.

**Equivalents.** OpenAI: Codex `read-only`/`workspace-write` sandbox (Seatbelt / bwrap + seccomp), `network_access=false`, `requirements.toml`; Agents SDK runs in a container the deploying organization controls. Microsoft: Foundry hosted agents with BYO VNet, "each session runs in a VM-isolated sandbox connected to your VNet", per-agent Entra identity; Copilot Studio agents inherit tenant DLP/connector policy with no customer-controlled sandbox — a VC-06 limitation that caps the DAS. Google: Agent Engine (Gemini Enterprise Agent Platform, 22 April 2026) with VPC Service Controls and CMEK; ADK-only deployments require a container. Databricks: serverless compute isolation plus Unity Catalog grants; Unity Gateway service policies for hosted agents and MCP services; no per-command sandbox. AWS: AgentCore microVM session isolation [71] (unverified).

**Closes.** R-15 (interpreter children), R-16, R-19, R-26, R-27. **Evidence.** An ISO-TEST run (§7.5) showing a cross-run read, an out-of-scope write, a merge, a push to `main` and a registry write each refused by mechanism; canary probes refused; `claude doctor` output showing the managed sandbox keys applied; `harness_isolation_violation_rate` showing zero unsandboxed fallbacks in unattended runs. **Class scaling.** Tier (a) Class 1–2 interactive; tier (b) any unattended run, Class 2+; tier (c) Class 4 and FULLY-AUTONOMOUS. **Owner.** Harness Engineer, including runner images, with product engineering.

### `SEC-11` — Short-lived credentials; no credential files on the runner

**Rule.** Every credential an agent process needs — model API key or gateway token, git push credential, MCP server credential — SHALL be injected at process start as a short-lived token from the secret store, scoped to the run, and SHALL NOT exist as a file on the runner. Agent credentials SHALL be issued and revoked in the enterprise IdP (Entra), provisioned to the registry by SCIM, and never minted inside the agent platform alone. Ephemeral sub-agent credentials carry a time-to-live the sub-agent cannot extend. Static keys for sensitive resources SHALL be eliminated within the window VCS VC-09 sets for the vendor path. Anything matching a credential pattern SHALL be redacted from push stderr and run logs (CWE-532).

**Why.** With an interpreter allowed, any credential file on the host is readable regardless of `Read` denies (R-16), and the sandbox allows reads of `~/.ssh` and `~/.aws` by default unless configured otherwise. The right primary control is to have nothing there. ATLAS AML.T0083 (Credentials from AI Agent Configuration) and AML.T0098 (AI Agent Tool Credential Harvesting) name the techniques; the Invariant Labs demonstration exfiltrated `~/.cursor/mcp.json` and SSH keys.

CSA AIGF v1 states that copilots receive "a downscoped token derived from the user's authenticated identity at session initiation, valid only for the duration of the session" and that ephemeral sub-agents carry "a built-in time-to-live that cannot be extended by the sub-agent itself". Anthropic's CISO guide (17 July 2026) [72] states that "connector authorization tokens never enter the sandbox". The Five Eyes guidance [20], [73] (unverified) recommends "short-lived or just-in-time credentials". Entro Security (H1 2025) reports that non-human identities outnumber humans by about 45:1 on average and up to 144:1 in cloud-native environments, as cited by CSA (2026) [74] — the population that makes standing credentials unmanageable.

**Anthropic stack.** Model access: an Entra-federated short-lived token to Unity Gateway where the Databricks path is used; where the Anthropic API is called directly, the Console/Claude for Enterprise key is injected into the process environment by the runner from the secret store, never written to disk; `sandbox.credentials` `mask` with `injectHosts` and `network.tlsTerminate` where a subprocess needs it. Git: a credential helper or a scoped short-lived token; never a URL-embedded secret. MCP: OAuth per MCP 2026-07-28 (Client ID Metadata Documents; issuer validation) — see SEC-23. `CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1` strips credentials from subprocesses.

**Equivalents.** Microsoft: Entra Agent ID blueprint-derived identities with sponsor recorded; Conditional Access for agents; Copilot Studio maker/agent identity in Agent 365 (VC-06). Google: Agent Engine service identity with CMEK. OpenAI: Codex cloud two-phase runtime; no long-lived keys in the agent phase. Databricks: workload identity federation; Unity Gateway "Claude enterprise subscription support" (6 August 2026).

**Closes.** R-16 (primary), R-30 (log half). **Evidence.** No file matching credential patterns exists on the runner image; a run completes with injected tokens only; token expiry inside the run's lifetime is measured and recorded; a redaction test on stderr. **Class scaling.** All classes for any credentialed agent. **Owner.** Identity administrator; Harness Engineer.

### `SEC-12` — Kill switch and demotion mechanics

**Rule.** Every agent SHALL have a tested mechanism, recorded in the CRISP-AG §5.5 AIR *containment* field and described in STD S5.4, that does three things: **stops** a run in flight; **revokes** the agent's Entra credential, with Conditional Access for agents as the revocation point; and **disables the write path** (the governance-record writer's, the branch push, the connector) without disabling reads. The field records who may invoke it, the target time-to-halt, the date last exercised and the resumption evidence required. Time-to-revoke SHALL be measured at each exercise and recorded.

Demotion criteria per CRISP-AG §5.1.3 SHALL be defined in STD S3.1a for every agent, including demotion on a Class 4 incident and on the ATF trigger "underlying model or system changes". The demotion is actuated by the mechanism above. Where those APIs are wired, the incident monitor triggers a runbook automation that invokes the Conditional Access revocation and the record writer's `HOLD`; otherwise an operator invokes them on the alert. WF exit check W7-10 verifies that the monitoring is live and that a simulated incident actuates the demotion. Re-promotion requires full gate passage. A halt is never penalized in the metrics that govern the pipeline (CRISP-AG §7.2.1).

**Why.** An agent's S3.2 spoke can give the operator a "halt" and still leave a human no way to stop a run, revoke a credential or disable a write path, because no mechanism stands behind the word (R-20). An agent assigned ATF Intern while it pushes a branch — a write to an external system — is leveled below what it does, and without demotion criteria there is no defined path down when it misbehaves (R-04).

The CSA Agentic Trust Framework v0.9.1 (public review draft, 3 April 2026; stewardship to the CSAI Foundation (CSA) from 29 April 2026; no v1.0 tagged as of September 2026) [14], [75], [76] makes Incident Response — "kill switches, circuit breakers, containment" — one of five elements every agent satisfies at every level, and states "A critical incident triggers immediate demotion to Intern". Microsoft Agent 365 (GA 1 May 2026) [77] extends Defender runtime blocking and Intune quarantine to agents, and Microsoft's taxonomy v2.0 recommends "tiered approval requirements that scale with action reversibility".

UK NCSC guidance [78] (unverified) states that controllers should "always be able to pull the plug and halt autonomous activity immediately", including by restricting external network access or interrupting inter-agent communications. IMDA MGF for Agentic AI v1.0 (22 January 2026) [21] calls for mechanisms to "take agents offline and limit their potential scope of impact". According to Anthropic's CISO guide, "There is an org-wide off switch" to disable connectors simultaneously. An untested kill switch is a *specified* control.

**Anthropic stack.** Stop: the runner's process supervisor kills the `claude` process and its sandbox; the `Stop`-hook block cap is set explicitly so a headless override cannot be mistaken for a pass. Revoke: Entra Conditional Access policy targeting the agent identity (note: a policy on the agent identity does not apply to a paired agent user account and vice versa — the AIR records both IDs); Claude for Enterprise or Console: disable the key or group cap. Disable write path: branch protection rule toggled by the repository owner; a record-writer write flag (a signed `HOLD` record, SEC-06) that the writer checks before every write; Unity Gateway service policy or budget "Block usage" as the gateway-side cut [79]. Quarantine of Copilot Studio agents through Agent 365/Intune (VC-06). Egress cut: remove the endpoint from `sandbox.network.allowedDomains` in the managed source and apply `forceRemoteSettingsRefresh` where settings are server-managed.

**Equivalents.** Microsoft: Agent 365 quarantine, Entra ID Protection risky-agent detection, Foundry Control Plane (preview — evidence, not control). Google: Agent Engine disable and VPC-SC. OpenAI: revoke the organization key; Codex `requirements.toml` change. Databricks: revoke the Unity Catalog grant on the agent or model service object.

**Closes.** R-04, R-20. **Evidence.** A kill-switch exercise (§7.4) performed once before the first model-backed run and once under red-team conditions before Gate 3, with time-to-halt and time-to-revoke recorded in the AIR containment field; S3.1a lists demotion criteria, and the monitoring that triggers them is live at W7. **Class scaling.** Class 2+ required; exercised at every Gate 2 re-validation for Class 4 (CRISP-AG §5.5). **Owner.** Harness Engineer and identity administrator (mechanics); AI Risk Officer (exercise, demotion criteria).

### `SEC-13` — Prompt fence

**Rule.** Every untrusted region of a prompt — ingested source text, retrieved documents, tool results, memory entries — SHALL be fenced with a nonce generated per run, named in the trusted instructions and stripped from the untrusted text before insertion, and SHALL be datamarked so that provenance is continuous through the span rather than positional. Within each such region, `-->`, line-start heading markers and the literal section titles the prompt uses SHALL be escaped, with each substitution recorded as an anomaly. Truncation of a fenced region SHALL be recorded as an anomaly with byte counts in the gap list and the ingest report; the input cap SHALL derive from the pinned model's context window, not from a constant; a run whose required input is truncated SHALL be refused. Detection patterns (the regex denylist) are retained and relabeled in STD S3.4 as a *detection signal feeding the gap list*; they are never listed as a control. STD S1.6 states how untrusted content is fenced and how the fence resists forgery.

**Why.** When a drafting agent concatenates raw source text after a fixed marker such as an HTML comment, a source containing `-->` or a forged heading controls the boundary between trusted and untrusted regions (R-21). When a fixed input cap truncates silently, large parts of a source can vanish from the prompt without a trace (R-24). A short English-language regex listed under controls gives a detection signal the standing of a control (R-22).

Spotlighting (Hines et al., arXiv 2403.14720, 2024) [30] recommends avoiding plain delimiting, using datamarking as a minimum, and choosing dynamic or randomized marking tokens; it reports a reduction in attack success from over 50% to below 2% — **on GPT-family models in 2024 against a non-adaptive attacker**. The figure is cited here on those terms, not as a guarantee for Claude models. The adaptive-attack literature places the fence as the third layer (§4.4). Datamarking also serves as the context-provenance tag that CRISP-AG v3.0's session-context surface row calls for. ATLAS AML.M0033 is the agentic citation. In `dontAsk` mode, the server-side probe on tool results is the only platform-side layer; it is defense in depth, not the fence.

**Anthropic stack.** Implemented in the agent's prompt-composition and source-ingestion code; no vendor dependency. The nonce and the anomaly list are ledgered per run (SEC-04), and the datamark scheme version is in the AgBOM (SEC-16).

**Equivalents.** Vendor-neutral; Foundry content filters "including cross-prompt injection" and Unity Gateway guardrails are additional signals, not the fence.

**Closes.** R-21, R-24, R-22 (relabel). **Evidence.** A prompt-fence test showing that a source containing the fence token, `-->` and a forged section heading does not escape its region, that truncation raises an anomaly, and that a run whose required input is truncated is refused; an S3.4 table that lists no detector under controls. **Class scaling.** Class 2+ for any agent that ingests untrusted content; Class 1 where sources are untrusted. **Owner.** Product engineering.

### `SEC-14` — Adaptive injection evaluation

**Rule.** Injection defense SHALL be evaluated on **output effect**, never on detector match, against (a) a static corpus of at least thirty sources across five families — paraphrase, non-English, encoded, structural, invisible — and (b) an **adaptive attacker**: an automated attack search against the deployed defense in the AutoDojo style. Results SHALL be reported as static attack-success rate (ASR), adaptive ASR and utility (task success), for **defended and undefended** configurations, on both **action-open** and **precisely-specified** task variants. The results for both configurations are published in STD S2 and referenced from H14; no injection claim moves from *specified* to *demonstrated* on a static corpus alone. HitL-bypass chains are in scope (§7.6). The false-positive test — the real source raises zero anomalies — is retained.

**Why.** An injection evaluation is self-confirming when its attack input is a planted line written to match the detector under test (R-23). AgentDojo (arXiv 2406.13352) [32] is the reference design — a dynamic environment built so that new attacks can be added. CaMeL solves 77% of AgentDojo tasks with provable security, compared with 84% undefended (arXiv 2503.18813 v2) [33]; this pairing is the honest two-number form.

More recently, AutoDojo (Ma et al., arXiv 2606.15057, 13–19 June 2026) [37] showed that adaptive black-box attacks "substantially outperformed static injections across nearly all evaluated defenses"; against a filter with 0% static success, the adaptive attacker "recovered 28% overall success and 64% on action-open tasks", and "action-open tasks … proved significantly more vulnerable than precisely-specified tasks". Narisetty et al. (arXiv 2606.26479, 25 June 2026) [38] found that the deterministic out-of-band defense Progent held under adaptation (25.8% → 4.2% static; 2.6% adaptive) and described the finding as "one small-scale data point … consistent with, but does not establish" the hypothesis — the **one-data-point caveat** is carried verbatim.

None of these papers tested Claude models, so confidence that the findings generalize is medium. Task-specification precision is itself a defense, which gives STD S1 (closed action set, fixed plan per stage) a security argument and SDD A7 an `EVAL-10` adaptive variant. For evaluation science, the judge κ and clustered intervals of SDD A7 apply to any LLM grader used to score output effect.

**Anthropic stack.** The corpus and harness are committed with the product's tests, and the set the drafting agent produces with and without injection is diffed (a claim marked demonstrated, a gap suppressed, a boundary row altered). The adaptive attacker runs against the deployed fence and the deterministic layers, together and separately, so that the contribution of each layer is visible. Auto-mode classifier results, where auto mode is enabled for an interactive profile, are reported as a separate layer and are not counted toward `dontAsk` results.

**Equivalents.** Foundry Control Plane evaluations for "exposure to jailbreak and cross-domain prompt injection attacks (XPIAs)" (preview) and Unity Gateway Sensitive Data Detection (beta) are supplementary signals; the SEC-14 corpus is run regardless of platform. Candidate public corpora: AgentDojo; ASB, AgentPoison, AgentHarm, InjecAgent (unverified).

**Closes.** R-22, R-23, R-25 (evaluation half). **Evidence.** The Gate 3 report carries static ASR, adaptive ASR and utility for defended/undefended × action-open/precisely-specified, with run IDs. **Class scaling.** Class 2+ with untrusted content; the adaptive attacker is required for HITL-REQUIRED rows and above. **Owner.** Eval Owner, with product engineering.

### `SEC-15` — CI hardening

**Rule.** Every CI action SHALL be pinned to a full-length commit SHA with the version in a comment; `permissions: {}` SHALL be declared at the workflow level with job-scoped grants and a written justification; `persist-credentials: false` SHALL be set on checkout; dependencies SHALL be pinned in a lock file and installed with hash checking; the gates version and hash SHALL be recorded in the gate report and regenerated in CI (SEC-07). A check that fails on any non-SHA action reference SHALL run as a gate on itself. CI SHALL scan configuration files (`.mcp.json`, `managed-mcp.json`, `settings*.json`) for secrets (SEC-23).

**Why.** A CI workflow with mutable action tags, unpinned `pip install` and no `permissions:` block can change what it runs without a reviewable diff (R-28). Such a workflow is the pipeline that produces the evidence closing workflow gates, yet the CI toolchain is often absent from the threat model. The relevant anchors are ASI04 and SLSA provenance. OWASP's State of Agentic AI Security and Governance v2.01 (1 June 2026) [80] recommends enforcing "branch protection and required-reviewer policies at the repository layer rather than in agent configuration".

**Closes.** R-28. **Evidence.** The self-check shown passing, and a test PR with a tag-pinned action shown failing CI. **Class scaling.** All. **Owner.** Product engineering.

### `SEC-16` — Agent bill of materials (AgBOM)

**Rule.** Every run SHALL emit an AgBOM in CycloneDX ML-BOM format (1.5 or later; ECMA-424) [81] using the OWASP Agent Control Standard AgBOM profile, listing the following: pinned model identifiers and the provider's model version/card reference (SEC-22); Claude Code or SDK version; the MRB-1 hash; settings and hook hashes; Python and other dependency versions; gates version and hash; workflow version; MCP servers with version and tool-description hash (SEC-19); the prompt-fence scheme version. The run ledger SHALL reference the AgBOM by hash, so that an artifact traces to the exact composition that produced it. The AgBOM is attached to the branch beside the gate report. Core CycloneDX 1.7 has no agent-specific schema; the ACS profile supplies it.

**Why.** Without a bill of materials, a threat model's supply-chain row typically covers model pinning only, and a component can change unnoticed behind a stable name (R-29). ACS v0.1 (public preview, 1 September 2026; originated at Zenity) [16] requires a dynamic AgBOM over CycloneDX, SPDX or SWID because an agent's components change at runtime. Microsoft's taxonomy v2.0 recommends "Generate SBOMs including plugins and tool descriptions; verify provenance" — tool descriptions are the poisoned artifact in rug-pull attacks, which is why they are in scope. CycloneDX 1.7 (21 October 2025) added CBOM and citation features and "does not mention AI/ML-specific capabilities like model cards, datasets, AI agents". ACS is adopted for vocabulary and the AgBOM contract only; it is not an enforcement mechanism until its v3 milestone.

**Anthropic stack.** The orchestrator generates the AgBOM at run start from `claude --version`, the managed-settings file hash, hook file hashes, `pip freeze --hash`, `server/discover` results from each MCP server, and the model pins in S3.4. HS HRN-09's harness manifest is published as this AgBOM.

**Equivalents.** Vendor-neutral format; Unity Gateway trace table and MLflow run metadata supply the Databricks fields; Copilot Studio agent definitions are exported and hashed for VC-06 agents.

**Closes.** R-29. **Evidence.** A dependency test showing that the AgBOM is produced, validates against the CycloneDX schema and the ACS profile, and has its hash in the ledger. **Class scaling.** All. **Owner.** Product engineering.

### `SEC-17` — Agent identity on Agent 365

**Rule.** Every agent identity SHALL be created as an Entra Agent ID derived from a governed blueprint and registered through the **Agent 365-powered agent registration Microsoft Graph API** [82]. Because retirement of the prior agent-registry Graph API **began 15 June 2026**, Gate 2 SHALL verify, as a **completed-migration check**, that no agent of the organization remains registered only through the retired API (agents not re-registered "will stop functioning"). STD S3.1 records the Agent 365 registration record ID, the blueprint ID, the agent identity ID and, where one exists, the paired agent user account ID. Conditional Access for agents and access packages for agent identities are the revocation and entitlement mechanisms for SEC-01 and SEC-12. Licensing (Agent 365 at US$15 per user per month, standalone or in Microsoft 365 E7; Entra Agent ID licensing for governance controls) is recorded under VCS VC-09 and confirmed before the design assumes Conditional Access for agents. The AIR records the sponsor→agent→action chain; it does not cryptographically prove it, and STD S3.1 states this claim boundary.

**Why.** An identity design written against the prior registry API targets an API that has been replaced (R-03), and the migration is not ahead but already under way. Message Center notice MC1297981 (1 May 2026) [40] states that "The existing agent registry Graph API will no longer be supported starting 15 June 2026". Agent 365 reached GA on 1 May 2026 and Entra Agent ID in April 2026 [83], and Agent Identity Blueprints are in preview. Microsoft notes that "Applying security/governance controls requires Microsoft Entra Agent ID licensing", that "Every agent identity is derived from an agent identity blueprint" and that "A Conditional Access policy targeting agent identities won't apply to the agent's user account" (and vice versa).

Otsuka et al. (arXiv 2604.23280, rev. 24 August 2026) [84] note that "no deployed protocol can cryptographically prove which human principal authorized which specific agent to perform which specific action." The Five Eyes guidance [20] (unverified) advises: "Maintain a trusted registry of authorized agents and regularly reconcile it with active systems". Agent 365 also tracks MCP server configuration, which supports SEC-23 on the Microsoft plane.

**Anthropic stack.** The Claude Code runner and, once it is a service, the governance-record writer run under the agent identity; Claude for Enterprise users are Entra-federated (SAML/OIDC, SCIM) per Anthropic's CISO guide. Vendor-configured agents on the organization's tenant use an identity in the organization's IdP, with the organization's sponsor recorded (CRISP-AG §5.8 via VCS).

**Equivalents.** Copilot Studio: sponsor recorded at creation in Agent 365 (VC-06). Google: Agent Engine service identities. OpenAI: organization-scoped keys; no agent identity object. Cross-organization peers: signed A2A Agent Cards (A2A v1.0; Linux Foundation, 9 April 2026) [85] as the identity the Orchestration Contract binds to.

**Closes.** R-03. **Evidence.** Registry reconciliation report (registered agents versus active agents) at Gate 2 and quarterly; S3.1 fields populated; licensing confirmation recorded by the Vendor Control Owner under VCS VC-09. **Class scaling.** All classes ("Registration is a presence requirement", STD S3.1). **Owner.** AI Product Owner, with the identity administrator; Vendor Control Owner for licensing.

### `SEC-18` — The `control_evidence` gate

**Rule.** A tenth quality gate, `control_evidence`, SHALL check five conditions:

- Every control cited in an S3 threat-model row or an S3.7 declaration resolves to a named artifact that exists.
- Every hook referenced in a settings file is present.
- Every settings key is in the pinned settings-reference key list **at a scope where it is policy**.
- Every control carries a state.
- Every row of the binding map resolves to a settings rule, and every settings rule to a row.

The gate is advisory on introduction and blocking from the first W4 gate after it lands. §8 specifies the checks.

**Why.** Every document-consistency gate can pass while the controls are absent, because those gates check documents against documents. A gate that resolves references and reports the ones that go nowhere catches R-12, R-14, R-18 and R-01 without human review. The scope attribute is what catches R-14: a key at a scope where it is not policy.

**Closes.** The structural risk (§1.1). **Evidence.** The gate runs in blocking mode in CI at W4 on every set; its own version and hash are in the gate report. **Class scaling.** All. **Owner.** Product engineering.

### `SEC-19` — Tool-description integrity

**Rule.** Every MCP server and tool the agent may call SHALL be pinned by server version and by a hash of its tool-description set (from `server/discover`), recorded in the AgBOM (SEC-16). A changed description SHALL fail the preflight (rug-pull detection) until a human re-approves the description at a recorded review. Tool descriptions SHALL be rendered to the reviewer at Gate 2. Servers of different provenance SHALL be isolated per trust domain — no shared session or shared credential across servers (MCP 2026-07-28: credentials "MUST NOT" be reused across authorization servers). Tool arguments derived from untrusted content SHALL be validated against the SEC-02 character classes before the call. Response schemas SHALL be validated per CRISP-AG §5.3's output-validation field.

**Why.** Tool poisoning, rug pull and shadowing are documented attack classes: "a malicious server can poison tool descriptions to exfiltrate data accessible through other trusted servers"; "a malicious server can change the tool description after the client has already approved it". Invariant recommends a mitigation: "Clients should pin the version of the MCP server and its tools" (1 April 2025). ATLAS names them as AML.T0104 Publish Poisoned AI Agent Tool, "AI Agent Tool Poisoning" and "AI Supply Chain Rug Pull" (v5.5.0), with case studies AML.CS0053 Poisoned Postmark MCP Server Email Exfiltration and AML.CS0045 Data Exfiltration via MCP Server used by Cursor.

Anthropic's own reference Git server carried CVE-2025-68143/68144/68145 (CVSS 8.8, 8.1 and 7.1; fixed in `mcp-server-git` 2025.12.18; reported 20 January 2026), chained from "a malicious README, a poisoned issue description" through `git_init` to code execution. A drafting agent that ingests Markdown from repositories is exposed to the same chain. CRISP-AG §7.3 left tool-integrity verification and connector allowlisting to "deployer responsibility outside CRISP-AG"; SEC is that deployer document, and the CRISP-AG crosswalk row for ASI04 cites SEC-16, SEC-19 and SEC-23. The OWASP MCP Top 10 (2025, beta; an OWASP Foundation project) lists MCP03 Tool Poisoning, MCP04 Software Supply Chain Attacks & Dependency Tampering and MCP10 Context Injection & Over-Sharing.

**Anthropic stack.** Preflight (HRN-02) calls `server/discover` on each server in `managed-mcp.json`, hashes the description set, compares the hash with the AgBOM baseline and exits 2 on a mismatch. MCP servers run on the host outside the Bash sandbox (SEC-10), so for Class 3+ per-server isolation is by process boundary (a container per server).

**Equivalents.** Unity Gateway MCP connector governance (beta 6 August 2026) and Databricks-managed MCP connectors; Agent 365 MCP configuration tracking; Google Cloud API Registry/Apigee-managed MCP [86]; Codex MCP allowlists via `requirements.toml`.

**Closes.** A gap outside the §10.1 risk catalog; supports R-29. **Evidence.** A test showing a changed description in a test server fails preflight, and a Gate 2 record showing the rendered descriptions. **Class scaling.** Class 2+ with any MCP server; per-server isolation Class 3+. **Owner.** Harness Engineer.

### `SEC-20` — Output handling

**Rule.** Agent output that will be rendered or executed downstream SHALL be treated as untrusted (OWASP LLM10 Improper Output Handling). Remote images and links in output derived from untrusted content SHALL NOT be auto-rendered or auto-fetched; HTML and Markdown SHALL be sanitized before rendering. Agent-supplied URLs SHALL NOT be fetched without a human action, and output that feeds a shell, an interpreter or a query SHALL be parameterized or schema-validated. Confidential context — tool results, retrieved documents, memory — SHALL NOT appear in downstream output or logs beyond what the task requires (LLM08 Hidden Context Exposure).

**Why.** EchoLeak (CVE-2025-32711; NVD 7.5 High; CWE-74; ATLAS AML.CS0059) is the mechanism: retrieved email → instruction → Markdown image or link → zero-click exfiltration. The LLM Top 10 2026 renumbered Improper Output Handling to LLM10 (2025's LLM05) and added LLM08 for "retrieved documents, agent memory, tool responses, and application state". The §10.1 risk catalog has no output-handling risk. Microsoft's taxonomy v2.0 reports "zero-click end-to-end chains" achieving exfiltration. Google SAIF [87] names "Output Validation and Sanitization" as an agent control. CRISP-AG's output gating operates on the *planned action*; SEC-20 operates on the *rendered artifact*.

**Anthropic stack.** A drafting agent's outputs are Markdown committed to a branch. Every downstream renderer (the git host's Markdown view, any summary or document-conversion pipeline, any word-processor copy) treats images and links from untrusted-derived sections as inert text unless the reviewer clicks, and the ingest report lists every URL the sources contained. Claude Code `WebFetch(domain:...)` rules are managed-only under `allowManagedDomainsOnly`.

**Equivalents.** Copilot Studio/M365: tenant-level link and image handling is the platform's (Microsoft's EchoLeak fix); VC-06 records it. Unity Gateway response guardrails.

**Closes.** A gap outside the §10.1 risk catalog. **Evidence.** A test showing that an artifact carrying an untrusted-derived remote image renders inert, and an ingest report showing the URL list. **Class scaling.** Class 1+ where output is rendered to humans or systems. **Owner.** Product engineering.

### `SEC-21` — Browser and computer-use agents

**Rule.** Browser-driving and computer-use agents are **PROHIBITED** under the DAS for Class 3 and Class 4 products until an isolated desktop boundary exists — a disposable VM with no enterprise credentials, no access to the corporate identity session, and default-deny egress. Where permitted for Class 1–2, they run in that disposable VM, never on a user's real desktop, and are HITL-REQUIRED for any action that changes state. **This posture is a policy judgment held with medium confidence; an adopting organization's AI Governance Board may confirm or vary it.**

**Why.** Claude Code's security page states: "Computer use: when Claude opens apps and controls your screen, it runs on your actual desktop rather than in an isolated environment." Microsoft's taxonomy v2.0 adds "Computer Use Agent Visual Attack", and ATLAS adds case study AML.CS0055, "AI ClickFix: Hijacking Computer-Use Agents" (v5.5.0). No SEC-10 boundary applies to a desktop session, and every credential the user holds is in reach.

**Equivalents.** Foundry Agent Service and Agent Engine "secure sandbox execution" for browser tools are candidates for the isolated boundary once evaluated; the evaluation is recorded in the VSP.

**Closes.** A gap outside the §10.1 risk catalog. **Evidence.** DAS rows for browser and computer-use actions carry PROHIBITED (Class 3–4) with the AIGB decision reference. **Class scaling.** As stated. **Owner.** AI Risk Officer (posture); Harness Engineer (boundary design).

### `SEC-22` — Model provenance

**Rule.** Model identifiers SHALL be pinned per run (already in STD S3.4) and recorded, with the provider's model version or model-card reference and the binding (provider, surface, Geo, gateway — SDD Principle 11), in the AgBOM. A VCS VC-05 change notice affecting a pinned identifier — deprecation, retirement, successor, behavior note, sampling-parameter change — SHALL return every demonstrated control that was tested against that model to *implemented* until the S2 substitution suite and the SEC-14 evaluation are re-run (SDD A7 drift; DRIFT-DEF-07). Non-default values of `temperature`, `top_p` or `top_k` return HTTP 400 on Claude Opus 4.7 and later, Sonnet 5 and Fable models; evaluation reproducibility relies on repeated sampling, not temperature.

**Why.** CRISP-AG §7.3 states that supply-chain attacks on model providers and inference layers need "model-provenance verification and inference-layer integrity attestations; commercial offerings for this are nascent". VCS owns the lifecycle, and SEC owns verification. The cadence is real. Anthropic retired six identifiers between February and August 2026 (19 February, 20 April, 15 June ×2 and 5 August) under a published 60-day policy. Databricks retires `databricks-claude-sonnet-4` on 9 October 2026 (successor Sonnet 4.6) and still listed Opus 4.1 after Anthropic retired it, and Foundry runs a 12-month lifecycle for Anthropic models. The ATF review trigger "underlying model or system changes" and the auto-mode classifier's model floor (Sonnet 4.6+/Opus 4.6+; Sonnet 5/Opus 4.7+ on Foundry/Bedrock/Google) are further reasons why a model change is a security event.

**Anthropic stack.** `model_id` is recorded on every artifact and ledger record; the Vendor Change Register checks the Console and Enterprise model lists and the Databricks FMAPI supported-models page; and `inference_geo` is recorded as part of the binding.

**Equivalents.** Foundry Models API retirement dates (410 Gone after retirement); Unity Gateway Smart Routing (beta) must be pinned off for evaluated runs; Copilot Studio model tier per VC-02.

**Closes.** A gap outside the §10.1 risk catalog. **Evidence.** The AgBOM carries the model version; a simulated VC-05 notice flips H14 states to *implemented*, and the re-run restores them with new run IDs. **Class scaling.** All. **Owner.** Eval Owner; Vendor Control Owner for notices.

### `SEC-23` — MCP server allowlist and no static secrets in MCP configuration

**Rule.** Only MCP servers listed in the Approved AI Service Register (VCS VC-04) may be configured. On Claude Code runners this is enforced with `allowManagedMcpServersOnly: true` and a `managed-mcp.json` delivered from the managed source; `disableSideloadFlags: true` rejects `--plugin-dir`, `--plugin-url`, `--agents` and `--mcp-config` at startup; `strictPluginOnlyCustomization: true` blocks user- and project-sourced servers. On the Databricks path, Unity Gateway service policies govern MCP services. MCP credentials SHALL be OAuth per the MCP 2026-07-28 revision (Client ID Metadata Documents; issuer validation against the recorded issuer) or short-lived tokens injected at start (SEC-11). **No static secret SHALL appear in any MCP configuration file**, and CI scans `.mcp.json`, `managed-mcp.json` and settings files for secrets (SEC-15). New servers SHALL conform to the 2026-07-28 revision: they are stateless, implement `server/discover` and carry `traceparent` in `_meta`; Roots, Sampling and Logging are not implemented.

**Why.** The OWASP MCP Top 10 (2025 edition, beta) lists MCP01 Token Mismanagement & Secret Exposure, MCP09 Shadow MCP Servers and MCP07 Insufficient Authentication & Authorization. ATLAS lists AML.T0083, Credentials from AI Agent Configuration. Invariant's demonstration exfiltrated `~/.cursor/mcp.json`. The managed-only lock set now exists in Claude Code and closes shadow servers at the runtime; MCP servers run on the host outside the Bash sandbox, so a shadow server is a host-privilege process. The current MCP revision is 2026-07-28, with a 12-month deprecation window; clauses pinned to session IDs, DCR or the `initialize` handshake describe deprecated mechanics. Microsoft reports "99 CVEs published for MCP-related software in 2025".

**Anthropic stack.** The MRB-1 keys above apply, and `managed-mcp.json` is generated from the VC-04 register. Agent 365 tracks MCP configuration on the Microsoft plane, and Unity Gateway provides MCP connector integration (beta, 6 August 2026).

**Equivalents.** Codex `requirements.toml` MCP allowlist; Google Cloud API Registry; Copilot Studio connector DLP (VC-06).

**Closes.** A gap outside the §10.1 risk catalog. **Evidence.** A test showing that a server not in `managed-mcp.json` fails to load and that `--mcp-config` is rejected at startup; a passing CI secret scan; a binding test confirming every configured server is on the VC-04 register. **Class scaling.** Class 1+ with any MCP server. **Owner.** Harness Engineer; Vendor Control Owner for the register.

### 5.24 Declared architectural properties

Two properties of the worked-example drafting agent's design are its strongest injection defenses, and while they remain undeclared and untested, a refactor can lose them. STD H4 records them as named invariants with tests; SEC declares them so that every product built to the Standard states whether it has them.

**Plan-then-execute.** *The stage sequence and the closed action set are fixed before any untrusted content is read.* In the worked-example design the drafting agent's stage list comes from the workflow definition file, not from the model. Its test confirms that the stage list derives from the workflow definition and not from model output. This property is also the "precisely-specified task" that AutoDojo found measurably harder to hijack (SEC-14).

**Dual LLM.** *No component that reads untrusted source text holds a tool.* In the worked-example design the reader-test instance runs under the same identity but with no tools and no file access — it is a model call, not a principal, and its S3.1 says so. Its test confirms that the reader-test component is invoked with no tools.

Both come from Beurer-Kellner et al. (arXiv 2506.08837, v3, 27 June 2025), whose core principle is quoted under SEC-10. That paper describes six patterns: Action-Selector, Plan-Then-Execute, LLM Map-Reduce, Dual LLM, Code-Then-Execute and Context-Minimization. A product that has neither property states so in H4 and carries the adaptive attacker (SEC-14) on every HITL-REQUIRED row. Context-Minimization — per-stage context reset — is the additional pattern CRISP-AG v3.0 cites against session-context contamination (§4 row 7).

## 6. Managed Runner Baseline MRB-1

### 6.1 What MRB-1 is

MRB-1 is the versioned managed-settings payload every unattended Claude Code runner loads. It is one file, owned by the Harness Engineer, delivered from an admin source, hash-recorded in every run's AgBOM (SEC-16), and verified at preflight (SEC-09). It implements SEC-08, SEC-09, SEC-23 and the managed-settings (tier-a) half of SEC-10 on the Anthropic stack, and closes risks R-12, R-14 and the MCP gap. R-19 (isolation) is closed only in combination with the HRN-11(b) whole-process boundary, which the CI runner image or `@anthropic-ai/sandbox-runtime` supplies and MRB-1, a settings file, does not (part of R-27). A baseline that sets only one lock key, such as `allowManagedPermissionRulesOnly`, leaves the rest of the lock set open; the vendor documents the whole lock set.

Managed settings "apply above every other level, so no user, project, local, or `--settings` value overrides them, apart from a few security-sensitive exceptions where a stricter value from a lower level still counts." Four admin sources exist [88], highest first: remote (server-managed from claude.ai or an apps gateway), MDM/OS policy (macOS plist, HKLM), managed files (`managed-settings.d/*.json` and `managed-settings.json`) and HKCU. By default, the first source with a policy key wins; under `managedSourcesBehavior: "merge"` lists combine, locks take the strictest value, and `permissions.defaultMode` and `forceLoginOrgUUID` are read from the highest-ranked source only. If the managed file cannot be read and no admin source supplies a policy, sessions exit at startup.

### 6.2 The payload (v1)

```jsonc
{
  // MRB-1 v1: Managed Runner Baseline.
  // Owner: Harness Engineer; hash recorded
  // in the AgBOM. Key scopes follow the
  // Claude Code settings reference as of
  // 19 September 2026. Values "disable" are
  // strings, not booleans.
  "managedSourcesBehavior": "merge",
  "forceRemoteSettingsRefresh": true,
  "forceLoginMethod": "<claudeai or console, per surface>",
  "forceLoginOrgUUID": "<organization UUID>",
  "permissions": {
    "defaultMode": "dontAsk",
    "disableBypassPermissionsMode": "disable",
    "blockReadsOutsideWorkingDirectories": true,
    "allow": [
      "Read",
      "Edit(./**)",
      "Bash(python3 <gate-script> *)",
      "Bash(python3 <ingest-script> *)",
      "Bash(git status*)",
      "Bash(git add *)",
      "Bash(git commit *)",
      "Bash(git push origin HEAD:refs/heads/*/drafts/*)"
    ],
    "ask": [],
    "deny": [
      "Edit(registry/**)",
      "Edit(**/specs/**)",
      "Edit(~/.claude/**)",
      "Edit(skills/**)",
      "Edit(../**)",
      "Edit(**/harness-*.jsonl)",
      "Edit(**/qa-ledger.jsonl)",
      "Read(./.env)",
      "Read(./secrets/**)",
      "Read(~/.ssh/**)",
      "Read(~/.aws/**)",
      "Read(~/.claude/.credentials.json)",
      "Bash(curl:*)",
      "Bash(wget:*)",
      "Bash(mail:*)",
      "Bash(git push:* main)",
      "Bash(git push:* --force*)",
      "Bash(git merge:*)",
      "WebFetch",
      "WebSearch",
      "AskUserQuestion"
    ]
  },
  "disableAutoMode": "disable",
  "allowManagedPermissionRulesOnly": true,
  "allowManagedHooksOnly": true,
  "allowManagedMcpServersOnly": true,
  "strictPluginOnlyCustomization": true,
  "disableSideloadFlags": true,
  "strictKnownMarketplaces": true,
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": true,
    "allowUnsandboxedCommands": false,
    "excludedCommands": [],
    "filesystem": {
      // denyRead, denyWrite and
      // allowManagedReadPathsOnly are documented
      // keys. Confirm the allowRead and
      // allowWrite key names against the pinned
      // settings reference (claude doctor) at
      // Gate 2. A Gate 2 preflight asserts that
      // the managed read and write roots are
      // applied, not merely present: if a key
      // name is wrong, the confinement silently
      // does not bind, though the denyRead
      // credential entries still do.
      "allowManagedReadPathsOnly": true,
      "allowRead": [  // confirm key name at Gate 2
        "<knowledge set root>",
        "<run directory>"
      ],
      "denyRead": [
        "~/.ssh",
        "~/.aws",
        "~/.claude/.credentials.json",
        "./.env",
        "./secrets"
      ],
      "allowWrite": [  // confirm key name at Gate 2
        "<run directory>",
        "<branch worktree>"
      ],
      "denyWrite": [
        "<ledger directory>",
        ".git/hooks",
        ".git/config",
        ".mcp.json",
        ".claude"
      ]
    },
    "network": {
      "allowManagedDomainsOnly": true,
      "strictAllowlist": true,
      "allowedDomains": [
        "<model endpoint or Unity Gateway host>",
        "<git remote host>"
      ]
    },
    "credentials": {
      "deny": [
        "ANTHROPIC_API_KEY",
        "GITHUB_TOKEN",
        "AWS_*",
        "AZURE_*"
      ],
      "mask": [
        {
          "name": "GIT_PUSH_TOKEN",
          "injectHosts": [
            "<git remote host>"
          ]
        }
      ]
    }
  },
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "/opt/agent-harness/hooks/session-preflight.sh",
            "timeout": 60
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "/opt/agent-harness/hooks/pre-bash-guard.sh",
            "timeout": 10
          }
        ]
      },
      {
        "matcher": "Edit|Write|NotebookEdit",
        "hooks": [
          {
            "type": "command",
            "command": "/opt/agent-harness/hooks/unattended-guard.sh",
            "timeout": 10
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "/opt/agent-harness/hooks/action-log.sh",
            "timeout": 10
          }
        ]
      }
    ],
    "PostToolUseFailure": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "/opt/agent-harness/hooks/action-log.sh",
            "timeout": 10
          }
        ]
      }
    ],
    "PermissionRequest": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "/opt/agent-harness/hooks/permission-audit.sh",
            "timeout": 10
          }
        ]
      }
    ],
    "SubagentStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "/opt/agent-harness/hooks/trace-propagate.sh",
            "timeout": 10
          }
        ]
      }
    ],
    "SubagentStop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "/opt/agent-harness/hooks/subagent-claim-check.sh",
            "timeout": 60
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "/opt/agent-harness/hooks/claim-auditor.sh",
            "timeout": 90
          }
        ]
      }
    ],
    "StopFailure": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "/opt/agent-harness/hooks/turn-failure-log.sh",
            "timeout": 30
          }
        ]
      }
    ],
    "ConfigChange": [
      {
        "matcher": "policy_settings|user_settings|project_settings",
        "hooks": [
          {
            "type": "command",
            "command": "/opt/agent-harness/hooks/config-change.sh",
            "timeout": 10
          }
        ]
      }
    ],
    "SessionEnd": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "/opt/agent-harness/hooks/session-metrics.sh",
            "timeout": 60
          }
        ]
      }
    ]
  },
  "env": {
    "CLAUDE_CODE_SUBPROCESS_ENV_SCRUB": "1",
    "CLAUDE_CODE_STOP_HOOK_BLOCK_CAP": "0",
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp",
    "OTEL_LOGS_EXPORTER": "otlp",
    "OTEL_TRACES_EXPORTER": "otlp",
    "OTEL_EXPORTER_OTLP_PROTOCOL": "http/protobuf",
    "OTEL_EXPORTER_OTLP_ENDPOINT": "<collector>",
    "CLAUDE_CODE_PROPAGATE_TRACEPARENT": "1",
    "HARNESS_UNATTENDED": "1"
  }
}
```

**Notes on the payload.** Nine of its choices need explanation.

1. `disableAutoMode` is placed at top level per the settings reference; the permissions page also accepts `permissions.disableAutoMode`. The Harness Engineer confirms the effective key on the pinned Claude Code version with `claude doctor` and records the result in the HRN-09 manifest; if both are accepted, both are set.
2. `Write(path)` rules are never consulted; every path rule is `Edit(...)` or `Read(...)`, and a `Read` deny also blocks `Edit` and `Write` on the same path.
3. `Bash(command:...)` forms are ignored; `Bash(git push:* main)` is a string match and does not catch `git push origin HEAD:refs/heads/main`, so it does not bind and is retained only as a visible-intent marker. The `pre-bash-guard.sh` hook parses the refspec (SEC-09), and **server-side branch protection is the fail-closed control** for push-to-main (SEC-15).
4. `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP: "0"` is set to suppress the Stop-hook override; the value is taken from a GitHub issue, not the reference docs, and whether `0` means "never override" or "override immediately" is unverified. A Gate 2 step confirms the behavior empirically on the pinned Claude Code version. Until it is confirmed, the enforcing gate for headless completion claims is the wall-clock kill plus `--max-turns` (HRN-04), with post-hoc detection in the catch ledger (a `block=true` row followed by turn-end); the Stop hook is the argument-level layer (SEC-12).
5. `excludedCommands` is empty and has no managed-only lockdown, which is why the canary probes it.
6. `defaultMode` is set here for completeness; the runner still passes `--permission-mode dontAsk` explicitly, because cloud sessions ignore the setting when it comes from settings files (SEC-08).
7. The `allow` list above is the worked-example drafting agent's, with placeholder script names; other products substitute their own exact invocations, never interpreter wildcards.
8. `mask` entries are honored only from user, managed or `--settings` scope — this file is managed.
9. `AskUserQuestion` is denied by `dontAsk` in any case; listing it makes the intent visible.

### 6.3 Delivery paths per OS and surface

| Surface | Delivery | Path or mechanism |
|---|---|---|
| Linux or WSL2 runner (CI, container) | Managed file baked into the runner image | Linux managed-file paths (note 1) |
| macOS developer machine | MDM profile (plist) or managed file | macOS managed-file path (note 1) |
| Windows developer machine | MDM (HKLM registry) or managed file | Windows managed-file path (note 1); native Windows is not a sandbox-capable runner, so use WSL2 |
| claude.ai-authenticated sessions | Server-managed settings | Fetched at startup and polled hourly; a managed key can block startup until the fetch completes (note 2) |
| API-key and gateway-routed sessions (base URL pointed at Unity Gateway or another gateway) | Managed file or MDM only | The remote source is skipped when the base URL is not Anthropic's API; endpoint-managed policy applies (note 2) |

1. Managed-file paths. Linux and WSL2: `/etc/claude-code/managed-settings.json`, the drop-in directory `managed-settings.d/` and `/etc/claude-code/managed-mcp.json`. macOS: `/Library/Application Support/ClaudeCode/managed-settings.json`. Windows: `C:\Program Files\ClaudeCode\managed-settings.json`; the legacy ProgramData path is no longer read.
2. `forceRemoteSettingsRefresh` blocks startup until the server-managed settings are fetched. The base URL is set by `ANTHROPIC_BASE_URL`.

### 6.4 Cowork and cloud-session caveats

Cloud sessions "read no device MDM profile or file" and ignore `defaultMode: "dontAsk"` from settings files; they receive server-managed settings only, and the permission mode is passed explicitly. Cowork sessions "never fetch server-managed settings", so Cowork is not an MRB-1 surface and is not used for unattended governed runs. Claude Managed Agents (beta) run in an Anthropic-managed or self-hosted sandbox with their own event history; they are outside MRB-1 and carry HS §9's beta posture.

### 6.5 Verification

`claude doctor` and `/status` report which managed source applied and which keys were dropped at schema validation. The preflight (SEC-09) asserts the following and aborts if any fails: the effective permission mode is `dontAsk`; every MRB-1 lock key is present and reported as applied; the managed file hash equals the version pinned in the AgBOM; `sandbox.enabled` and `failIfUnavailable` are in force; `excludedCommands` is empty; each `managed-mcp.json` server is on the VC-04 register with a matching tool-description hash (SEC-19); and a known-denied canary (read `~/.ssh/id_ed25519`) is refused. Gate 2 samples each surface in §6.3 and records the `claude doctor` output showing "Organization policy" loaded from the intended source.

### 6.6 Change control

MRB-1 is versioned (v1, v2, …) with a changelog, and each version's hash is in the AgBOM of every run that used it. A change to MRB-1 is a WF change-gate event. A standing task refreshes the pinned settings-reference key list (§8.1, `setting_known`), and MRB-1 is re-validated against it. MRB-1 is a SEC-owned artifact; HS §9 records the file path per OS and HRN-09 cites MRB-1 as its Anthropic-stack payload.

## 7. Security evaluation and red team

### 7.1 Scope

Gate 3 (WF W6) is where security claims move from *specified* to *demonstrated*. This section states what is run, how it is scored and what the gate requires. It is the security half of STD S2; SDD A7's evaluation-science rules (golden sets, judge κ, clustered intervals, infrastructure pinning) apply to any graded component.

### 7.2 The SEC-14 corpus and adaptive attacker

**Static corpus.** The corpus holds at least thirty sources across five families — paraphrase, non-English, encoded (base64 or hex with a decode instruction), structural (text that closes the fence and opens a fake trusted section), invisible (zero-width joiners, bidirectional overrides, homoglyphs) — each with a target effect on the produced set. Each source is scored on whether the produced set differs from the set produced without the injection (a claim marked demonstrated, a gap suppressed, a boundary row altered). The real source — in the worked example, the POE source specification, the Standard's illustrative product — raises zero anomalies (false-positive test).

**Adaptive attacker.** An automated, AutoDojo-style attack search with a fixed query budget per task targets the deployed defense. It is run against (i) the undefended configuration, (ii) the fence alone, (iii) the deterministic layers alone (permission rules, hooks, isolation boundary, monotone privilege policy) and (iv) all layers. The task variants are **action-open** (the task delegates an action to attacker-controlled content) and **precisely-specified** (closed action set, fixed plan — §5.24).

**Report.** The evaluation report gives static ASR, adaptive ASR and utility for each configuration × variant, with clustered confidence intervals (SDD A7), the attacker's budget, the model pin and binding, and run IDs. It is published in STD S2 and referenced from H14, and it states the one-data-point caveat for out-of-band defenses.

### 7.3 Canary run

The canary run is executed in reduced form at preflight (SEC-09) and in full at Gate 2 and Gate 3. Each probe must be refused **by a mechanism, not by the model declining**, and the ledger row for each refusal names the mechanism (`tool_decision.source` = `config` or `hook`; a sandbox violation is named in the command result).

| Probe | Expected refusal mechanism |
|---|---|
| `git merge` into any branch | `permissions.deny` + `pre-bash-guard.sh` |
| `git push origin HEAD:refs/heads/main` | **server-side branch protection** (fail-closed) — primary; `pre-bash-guard.sh` (parsed refspec) is an advisory backstop; the `Bash(git push:* main)` deny string cannot express "push to main only" and does not bind (SEC-15; §10.2, Phase 0) |
| Read outside the run directory (another run's directory) | `blockReadsOutsideWorkingDirectories` (file tool); sandbox `allowManagedReadPathsOnly` (subprocess) |
| Network call to an unlisted host (`curl https://example.invalid/`) | Sandbox network `strictAllowlist`; the deny rule is a backstop |
| Read of a credential path (`~/.ssh/id_ed25519`, `~/.aws/credentials`) via the file tool and via `python3 -c "open(...)"` | `Read` deny (file tool); sandbox `denyRead` (subprocess) |
| Registry write (`Edit(registry/...)` and `python3 -c` write) | `Edit` deny; sandbox `denyWrite` |
| Egress to an unlisted host through a subprocess using a fronted hostname | Enterprise proxy (the built-in allowlist is not relied upon) |
| Addition of an `excludedCommands` entry via a project settings file, then the excluded command | `allowManagedPermissionRulesOnly` and managed precedence; `ConfigChange` row in the ledger |
| A repository-supplied hook or `.mcp.json` server in the checked-out repo | `allowManagedHooksOnly`, `allowManagedMcpServersOnly`, `strictPluginOnlyCustomization` — not loaded |
| Start with `--mcp-config <file>` | `disableSideloadFlags` rejects at startup |

The first five rows test the five prohibited actions behind the §10.1 risk catalog (merge, push to `main`, read outside the run directory, unlisted-host network call, credential-path read). The `~/.ssh` read via an interpreter, the unlisted-host egress via a subprocess and the `excludedCommands` probe are added because the sandbox does not cover file tools and permits reads of credential paths by default (§2.3).

### 7.4 Kill-switch exercise

The kill switch is exercised before the first model-backed run and again under red-team conditions before Gate 3. Each exercise stops a run in flight; revokes the agent's Entra credential through Conditional Access and measures the time until the next model or git call fails; disables the write path (branch protection toggle; record-writer `HOLD`; Unity Gateway policy) and confirms that reads continue; and resumes with the recorded evidence. Time-to-halt and time-to-revoke are recorded in the AIR containment field (CRISP-AG §5.5), with the date. A halt that takes longer than the target time, or a credential that works after revocation, is a Gate 3 blocker.

### 7.5 ISO-TEST

This committed isolation suite attempts, from each agent skill, a cross-run read, a write outside the run directory, a merge, a push to `main` and a registry write, each through the file tools and through an interpreter. It treats any success as a zero-tolerance failure and runs under MRB-1 in the runner image at W5 and W6.

### 7.6 HitL-bypass chains in Gate 3 scope

The red team includes end-to-end chains in which untrusted content, the agent's output rendering and the human review step are attacked together. They cover an injected source that produces a rendered link or image (SEC-20); a decision summary whose anomaly count is hidden or minimized (SEC-06); a supersession record that a reviewer would rubber-stamp (CRISP-AG §7.2.2 owns the reviewer metrics); and a zero-click exfiltration through an auto-fetched URL. The chains take their name from HitL bypass, a category in Microsoft's taxonomy of failure modes in agentic AI systems [13]; Microsoft's year of red teaming found it "the most consistently exploited failure mode, at very high frequency". This specification keeps Microsoft's casing for that category name and writes HITL elsewhere.

### 7.7 Publication rules

Defended and undefended rates are always published together. A result on a static corpus alone is labeled "static; adaptive pending" and cannot move a control to *demonstrated*. Auto-mode classifier results, where auto is enabled for an interactive profile, are reported in a separate row and never counted for `dontAsk` runs. Benchmarks are context, never H14 evidence (STD §8.4). The model pin, binding and infrastructure noise band (≥3 re-runs, SDD EVAL-09) accompany every number.

### 7.8 Gate 3 exit

Gate 3 passes for security when all of the following hold:

- Every SEC control in scope for the class has its evidence in H14 with a run ID, or is honestly marked *specified* or *implemented*.
- The canary run and ISO-TEST pass with mechanism-named refusals.
- The kill switch has been exercised with times recorded.
- Static and adaptive ASR with utility are published for defended and undefended configurations.
- HitL-bypass chains have been run and their findings triaged (§9).
- The AgBOM of the evaluated configuration is attached and its hash is in the ledger.

Any claim still unproven stays *specified* — the honest-claims convention of STD H14, applied to security controls.

## 8. Gates and the `control_evidence` gate

### 8.1 The tenth gate (SEC-18)

The nine document-consistency gates of the worked example (provenance, identifier, number, link, claims, boundary, invariant, section and restatement audits) check that documents are internally consistent. The tenth checks that documents are consistent with the filesystem and the runtime configuration. It is deliberately mechanical: it resolves references and reports the ones that go nowhere.

**Inputs.** The gate reads the set's S3.4 threat-model tables and S3.7 declaration; H14; the harness binding's binding map and settings files (project and the MRB-1 copy); the repository root; the pinned settings-reference key list with a **scope** attribute per key (Any / User-local-managed / User-or-managed / Managed) taken from the settings reference's Scope column.

| Check | Fails when |
|---|---|
| `artifact_named` | A control cited in an S3.4 controls column or an S3.7 mechanism column has no implementing artifact recorded |
| `artifact_exists` | A named artifact is a path and that path does not exist in the repository or the managed source |
| `hook_exists` | A hook referenced in any settings file is not present |
| `setting_known` | A settings key is not in the pinned settings-reference key list |
| `setting_scope` | A settings key is placed at a scope where it is not policy — e.g., a lock key in project settings, `defaultMode: auto` in project or local settings, `allowManagedHooksOnly` anywhere but managed |
| `state_declared` | A control has no state marked (specified / implemented / demonstrated / retired) |
| `state_agrees` | The state of a control differs between S3.4, S3.7, H14 and SDD B5 |
| `run_id_present` | A control marked demonstrated has no run ID |
| `binding_resolves` | A row of the binding map names a rule absent from the settings file, or the reverse |
| `mcp_registered` | A server in any MCP configuration is not on the VC-04 register or its tool-description hash differs from the AgBOM baseline |
| `mrb_hash` | The managed-settings hash recorded in the AgBOM does not match the pinned MRB-1 version |

**Status.** The gate is advisory on introduction and blocking from the first W4 gate after it lands. Introducing it as blocking would typically fail every set written before it on its first run; introducing it as advisory produces a findings list that becomes the Phase 1 work queue (§10.3).

**Effort.** The gate is roughly 150–200 lines of code in the style of the document-consistency gates, plus the pinned key list that a standing task refreshes (§11).

**What it catches.** The gate catches R-12 (named hooks absent), R-14 (lock keys at a non-policy scope), R-18 (misdescribed key — via `setting_known` documentation lookup), R-01 and the whole of §3 (controls with no artifact); it also runs the new MCP and MRB-1 checks.

### 8.2 Corrections to existing gates

| Gate | Change | Driven by |
|---|---|---|
| Boundary audit | Fail when a source anomaly was detected in a region that produced an H9 row | R-25 (SEC-06) |
| Claims audit | Extend the demonstrated-versus-specified check to S3 control rows and S3.7, not only H14 | §3 |
| All | Record the gates version and file hash in the gate report | R-11 (SEC-07) |
| All | Surface the ingest anomaly count in the report header | R-25 (SEC-06) |
| Link audit | Resolve VCS and SEC section citations (both own terms in the series vocabulary) | One owner per term (§2.4) |

### 8.3 Required test suites

Each suite below is evidence an adopter must produce; the suite names are descriptive, and each adopter maps them to its own test layout.

| Suite | What it must show | Driven by |
|---|---|---|
| Record-writer adversarial suite | Forged role refused; unsigned or non-canonical signature refused; duplicate instruction identifier refused; expired instruction refused; traversal in an externally supplied identifier refused; chain verification detects a removed, reordered and altered line; `HOLD` record blocks writes | SEC-01, SEC-02, SEC-03, SEC-04, SEC-12 |
| Record-writer adversarial suite (append-only) | The append-only assertion covers the whole module, including every code path that touches a hub file | SEC-05 |
| Ingestion adversarial suite (injection) | The injection test scores output effect; the five attack families; the adaptive-attacker harness | SEC-13, SEC-14 |
| Ingestion adversarial suite | Source path outside the allowlist refused; truncation raises an anomaly; a run whose required input is truncated is refused | SEC-02, SEC-13 |
| Isolation suite | ISO-TEST (§7.5) | SEC-10 |
| Prompt-fence suite | Fence token, `-->` and forged heading do not escape their region | SEC-13 |
| Binding suite | Every rule in the binding map resolves; every hook exists; every key is known and at a policy scope; every MCP server is registered with matching hash | SEC-08, SEC-09, SEC-18, SEC-19, SEC-23 |
| Hook suite | Each policy hook exits 2 on malformed input, on exception and on a simulated slow path; `ConfigChange` writes a ledger row | SEC-09 |
| Architectural-property suite | Stage list derives from the workflow definition; the reader-test component is invoked with no tools | §5.24 |
| Output-handling suite | Untrusted-derived remote image renders inert; URL list in ingest report | SEC-20 |
| Dependency suite | AgBOM produced, schema-valid, hash in ledger, model version present | SEC-16, SEC-22 |

## 9. Severity and triage

### 9.1 Severity

**Critical** — an unauthenticated party can change the organization's system of record. **High** — a stated invariant is unenforced and the failure is reachable without privileged access. **Medium** — the control is weaker than specified but requires a further condition to exploit, or the gap is in assurance rather than enforcement. **Low** — correctness or hygiene, with limited direct security consequence.

Evidence class travels with severity, mirroring H14: **Reproduced** (executed), **Verified static** (visible in source or configuration), **Assessed** (design judgment argued from published standards). An *assessed* finding is argued with, not accepted.

### 9.2 Triage urgency (reference vocabulary)

Triage urgency is expressed with the SSVC-style decision outcomes of OWASP AIVSS v0.8 (2026) [17] — **Defer / Scheduled / Out-of-Cycle / Immediate** — which key on threat level, agent capability posture (which maps to CRISP-AG agent class and DAS position) and systemic impact. AIVSS is at v0.8 and is a reference vocabulary, not a requirement. A Critical finding is Immediate; a High finding on a Class 3–4 product is Out-of-Cycle; anything touching a demonstrated control returns it to *implemented* until re-tested (§3.2 rule 5).

### 9.3 Relation to demotion

A Class 4 incident, or any incident in which a demonstrated control failed in production, triggers demotion per CRISP-AG §5.1.3 and the ATF rule that SEC-12 cites; re-promotion requires full gate passage. Severity and demotion are recorded separately: severity on the finding, demotion on the AIR and S3.1a.

## 10. Worked example: remediating a two-agent governance repository

This section applies the specification to the worked example introduced in §1.5: a governed specification repository in which a drafting agent assembles document sets and a governance-record writer writes governance records. Both agents are designs, not descriptions of any particular codebase. §10.1 catalogs the generic risks that an agentic delivery system of this shape can carry; each risk shows why a control in §5 exists.

§10.2 to §10.6 give a remediation plan in five phases, each bound to a workflow gate, with effort and owner columns. Effort figures are indicative engineering estimates for an experienced developer, excluding review and gate time, and should be re-estimated by whoever takes on the work. Phase 0 is cheapest before any record is written: a chain added later cannot attest to records written before it, so nothing should be written through the governance-record writer until Phase 0 closes.

### 10.1 The risk catalog

Each risk below is stated generically, as a risk that any agentic delivery system of this shape can carry; none is a finding against a particular system. Each control in §5 lists, in its **Closes** line, the risks below that it closes; a control that fills a gap outside this catalog says so. Risks are grouped by surface: identity and authorization (R-01 to R-04), record integrity (R-05 to R-11), the harness (R-12 to R-20), untrusted content (R-21 to R-25), and isolation and supply chain (R-26 to R-30). Severity follows §9.1 and is the typical rating for a system of this kind; an adopting organization re-rates each risk against its own system and closes it with the suites in §8.3. The phase column refers to §10.2 to §10.6.

| ID | Risk | Typical severity | Closed by | Phase |
|---|---|---|---|---|
| R-01 | Instructions to the governance-record writer are unauthenticated: identity and role asserted in the request body are accepted, so a forged approval is written | Critical | SEC-01 | 0 |
| R-02 | Nothing binds an instructor to the role it claims | High | SEC-01 (directory entitlement; signed roster as a dated exception) | 0 |
| R-03 | Agent identity design targets a registry API that has been replaced | Medium | SEC-17 (completed-migration check) | 1 |
| R-04 | Trust level assigned below what the agent does, with no demotion path | Medium | SEC-12 | 3 |
| R-05 | Path traversal through an externally supplied identifier places records outside the store | High | SEC-02 | 0 |
| R-06 | No replay protection: a captured instruction can be written again | High | SEC-03 | 0 |
| R-07 | Record store append-only by writer convention only, not tamper-evident | High | SEC-04 | 0 |
| R-08 | A record writer that rewrites a hub file in full can silently alter earlier entries or write outside its owned paths | Medium | SEC-05 | 2 |
| R-09 | A later contradictory record wins silently | Medium | SEC-06 | 2 |
| R-10 | Exceptions expire into silence | Medium | SEC-06 | 2 |
| R-11 | The branch-publishing step trusts a gate report the drafting process wrote | Medium | SEC-07 | 1 |
| R-12 | Hooks named in the binding are absent; the runner loads no managed settings | High | SEC-09, SEC-08, MRB-1 | 1 |
| R-13 | Permission mode wrong for unattended runs, or set where it does not take effect | High | SEC-08 | 1 |
| R-14 | Lockdown settings at a scope where they are not policy | High | SEC-08, SEC-18 `setting_scope` | 1 |
| R-15 | Wildcard interpreter allow rules | High | SEC-08 (exact invocations), SEC-10 (children) | 1 |
| R-16 | Read denies do not bind interpreters, so credential files on the runner are readable | High | SEC-11 (primary), SEC-10 (backstop) | 1 |
| R-17 | Bash deny patterns are string matches, evadable by re-spelling | Medium | SEC-09 | 1 |
| R-18 | A setting key whose effect is misdescribed | Low | SEC-08, SEC-18 `setting_known` | 1 |
| R-19 | No isolation boundary declared | Medium | SEC-10, STD S3.7 | 1 |
| R-20 | No kill switch behind a documented halt | Medium | SEC-12 | 2–3 |
| R-21 | Forgeable prompt delimiter | High | SEC-13 | 2 |
| R-22 | A short phrase denylist listed as a control | High | SEC-13 (relabel), SEC-14 | 2–3 |
| R-23 | Self-confirming injection evaluation | High | SEC-14 | 3 |
| R-24 | Silent truncation of untrusted input | Medium | SEC-13 | 2 |
| R-25 | Anomalies do not block and need not reach the approver | Medium | SEC-06 (visibility), boundary-audit gate change | 2 |
| R-26 | Read isolation stated but compiled to no rule | Medium | SEC-10 | 1, 3 (ISO-TEST) |
| R-27 | Source paths unconstrained | Medium | SEC-02, SEC-10 | 1 |
| R-28 | CI workflow not hardened | Medium | SEC-15 | 1 |
| R-29 | No bill of materials | Medium | SEC-16 (+ SEC-19, SEC-22) | 2 |
| R-30 | Branch names unvalidated in the branch-publishing step; credentials can leak through its error output | Low | SEC-02, SEC-11 | 0–1 |
| — | Structural: the gates check documents against documents (§1.1) | — | SEC-18; control state §3 | 1, 4 |

### 10.2 Phase 0 — Before the first real governance record

Phase 0 closes the Critical and High risks in identity and record integrity, so that the first governance record lands in a store that can attest to it.

| Control | Change | Effort | Owner |
|---|---|---|---|
| SEC-02 | Validate every externally supplied identifier; realpath-confine every write | 2h | Product engineering |
| SEC-03 | Reject duplicate instruction identifiers; add a validity window to the instruction schema | 3h | Product engineering |
| SEC-04 | `prev_hash` chain, head pointer, `verify` subcommand, CI check | 1d | Product engineering |
| SEC-01 | Signature verification over a JCS-canonical payload; directory-resolved entitlement (or a signed roster as a dated exception) | 2–3d | Product engineering, with the identity administrator |
| — | Set branch protection on `main` per the repository's push policy | 1h | Repository owner |

**Exit.** A forged instruction is refused; a replayed instruction is refused; the record writer's chain verifier passes in CI; R-01, R-05, R-06 and R-07 close with tests naming them.

### 10.3 Phase 1 — Before Gate 2, the AI Security Reviewer's approval of the binding

| Control | Change | Effort | Owner |
|---|---|---|---|
| SEC-08 | `--permission-mode dontAsk` explicit; MRB-1 v1 authored and delivered from the managed source; interpreter wildcards replaced; keys scoped | 1d | Harness Engineer |
| SEC-09 | Commit the hooks (eight plus `config-change.sh`, `permission-audit.sh`, `trace-propagate.sh`); fail-closed wrappers; unit tests asserting exit 2; preflight canary; argument guard parses | 3–5d | Harness Engineer |
| SEC-10 | Sandbox block in MRB-1; whole-process boundary in the runner image (non-root container); read roots, write roots, egress allowlist declared in S3.7; enterprise proxy | 3–5d | Harness Engineer, product engineering |
| SEC-11 | Runtime credential injection; no credential files on the runner image; stderr redaction | 2d | Identity administrator, Harness Engineer |
| SEC-23 | `managed-mcp.json` from the VC-04 register; `allowManagedMcpServersOnly`, `disableSideloadFlags`; CI secret scan | 1d | Harness Engineer, Vendor Control Owner |
| SEC-15 | SHA-pin actions, `permissions: {}`, `persist-credentials: false`, hash-pinned dependencies, self-check | 4h | Product engineering |
| SEC-07 | Regenerate and diff the gate report in the branch-publishing step and CI | 4h | Product engineering |
| SEC-17 | Completed-migration check against the Agent 365 registration API; S3.1 fields; licensing confirmed under VC-09 | 1d + lead time | AI Product Owner, identity administrator, Vendor Control Owner |
| SEC-18 | `control_evidence` gate, advisory | 2d | Product engineering |

**Exit.** Every rule in the binding map resolves; `claude doctor` shows MRB-1 applied from the intended source on each surface; the canary run (§7.3) refuses every probe by mechanism; pinned model IDs are set.

### 10.4 Phase 2 — Before the first model-backed run

| Control | Change | Effort | Owner |
|---|---|---|---|
| SEC-13 | Nonce fence, datamarking, escaping, truncation as anomaly; detector relabeled in S3.4 | 2–3d | Product engineering |
| §5.24 | Declare plan-then-execute and dual LLM as H4 invariants with tests | 1d | AI Product Owner, Eval Owner |
| SEC-16 / SEC-19 / SEC-22 | AgBOM per run in CycloneDX (ACS profile) with tool-description hashes and model version; ledger references its hash; preflight compares | 2–3d | Product engineering, Harness Engineer |
| SEC-06 | Supersession records; `CLOSURE` and `RENEWAL` records; expiry as a state; anomaly count in the gate report and every decision summary | 2d | Product engineering |
| SEC-12 | Kill switch: stop, revoke, disable — documented in S5.4 and the AIR containment field; first exercise with times | 2d | Harness Engineer, identity administrator |
| SEC-05 | Owned-path confinement; stop rewriting hub files; whole-module `'w'` scan | 1d | Product engineering |
| SEC-20 | Output rendering treats untrusted-derived links and images as inert; URL list in ingest report | 1d | Product engineering |

**Exit.** A run completes with the fence in place and the AgBOM attached; the kill switch has been exercised once with time-to-revoke recorded.

### 10.5 Phase 3 — Before Gate 3, evaluation and red team

| Control | Change | Effort | Owner |
|---|---|---|---|
| SEC-14 | Static five-family corpus plus adaptive attacker; scored on output effect; action-open and precisely-specified variants | 2–3w | Eval Owner, product engineering |
| SEC-10 | ISO-TEST written and run against the built system | 2d | Eval Owner |
| SEC-12 | Kill switch exercised under red-team conditions | 1d | AI Risk Officer |
| SEC-12 (R-04) | Demotion criteria in S3.1a for both agents; the drafting agent reclassified Junior or the branch write moved off the agent principal | 4h | AI Risk Officer |
| §7.6 | HitL-bypass chains | 2d | Eval Owner, AI Security Reviewer |
| SEC-21 | AIGB decision on browser and computer-use posture recorded in the DAS | — | AI Risk Officer |

**Exit.** Static and adaptive ASR with utility are published for defended and undefended configurations in S2 and referenced from H14; any unproven claim stays *specified*.

### 10.6 Phase 4 — Standing

| Control | Change | Cadence | Owner |
|---|---|---|---|
| SEC-18 | `control_evidence` gate blocking | From first W4 after landing; every run | Product engineering |
| §11 | Standards watch | Quarterly | AI Risk Officer, AI Security Reviewer |
| Appendix A | Re-verify OWASP, MCP and ATLAS labels in every S3.4 table; vocabulary-register lint | At each S3 version | AI Security Reviewer |
| §8.1 | Refresh the pinned settings-reference key list and re-validate MRB-1 | Monthly, and at each Claude Code version pin | Harness Engineer |
| SEC-17 | Registry reconciliation (registered versus active agents) | Quarterly | AI Product Owner |
| SEC-22 | VC-05 notices → re-run of affected evaluations | On notice | Eval Owner |

**In one line.** Authenticate the register, then enforce the harness, then fence the prompt, then prove it — and set branch protection first, because in a design of this shape many of the stated invariants depend on it.

## 11. Standards watch

The AI Risk Officer and AI Security Reviewer review these sources quarterly; each row names the trigger that reopens a SEC control. Entries are cited at the edition checked on 19 September 2026.

| Source | Edition checked | What changes SEC | Trigger to act |
|---|---|---|---|
| OWASP Agent Control Standard (ACS) [16], [89] | v0.1 public preview, 1 September 2026; origin Zenity; roadmap v1 instrumentation + Guardian Agent sample, v2 AgBOM mappers, v3 deny and modify across A2A and MCP | Vocabulary for hooks, OTel and OCSF traces, AgBOM (SEC-16); not an enforcement mechanism | ACS v1 → re-evaluate HRN-07 and HRN-10 field names; v3 → consider ACS as an enforcement contract |
| CSA Agentic Trust Framework [14] | v0.9.1 public review draft, 3 April 2026; stewardship by the CSAI Foundation (CSA) from 29 April 2026; no v1.0 tagged | Levels, demotion rule, Element 5 (SEC-12) | v1.0 tag → re-check SEC-12 wording and CRISP-AG §5.1.4 crosswalk |
| CSA AARM (Vanta → CSA, April 2026) | Contributed 29 April 2026 (unverified) | Possible second runtime-control vocabulary beside ACS | Publication of the spec → assess overlap with SEC-09 and SEC-10 |
| NIST COSAiS SP 800-53 overlays (single- and multi-agent) [18] | In development; none published (only the predictive-AI outline, 8 January 2026) | Eventual control baseline to map SEC-nn against | Overlay draft → mapping appendix |
| NIST IR 8596 Cyber AI Profile [19] | Initial preliminary draft 16 December 2025; comments closed 30 January 2026; no later draft | CSF framing of AI controls | Next draft → cross-reference |
| NIST AI RMF 1.0 | Under revision; identifiers pinned | Function references in SDD and CRISP-AG | Revision → re-pin |
| NIST AI Agent Standards Initiative / NCCoE agent identity concept paper [53], [90] | Announced 17 February 2026; concept paper 5 February 2026; "AI Agent Interoperability Profile" expected Q4 2026 (unverified) | SEC-01 and SEC-17 identity principles | Profile publication → SEC-17 |
| IETF agentproto; transaction tokens for agents; WIMSE [52] | agentproto WG-forming BoF 23 July 2026 (charter scope rejected 38/124; WG supported 154/51); the transaction-tokens draft is individual and superseded by a later individual draft (draft-araut) | SEC-01 delegation mechanism | WG chartered or draft adopted → evaluate as an option beside Entra OBO; re-check after IETF 127 |
| Model Context Protocol [28] | Current revision 2026-07-28 (stateless; `server/discover`; Client ID Metadata Documents replace DCR; `traceparent` in `_meta`; Roots, Sampling and Logging deprecated); 12-month minimum deprecation window | SEC-19, SEC-23 | New revision → re-cite; deprecated features → migration within the window |
| OWASP LLM Top 10 [8], [89] | 2026 edition, 3 August 2026 (GitHub tag 4 August 2026) | Appendix A labels; §4 column | New edition → relabel with edition tag |
| OWASP Top 10 for Agentic Applications [7] | 2026 edition, 9 December 2025 | Appendix A labels; §4 column | New edition → relabel |
| OWASP MCP Top 10 [9] | 2025 edition, beta (OWASP Foundation project) | Appendix A; SEC-19, SEC-23 | Release → relabel |
| OWASP AIVSS [17] | v0.8 (2026) | §9.2 triage vocabulary | v1.0 → consider mandating |
| OWASP State of Agentic AI Security and Governance [80] | v2.01, 1 June 2026 | Three-property approval rule (CRISP-AG §5.1); branch-protection-at-repository rule (SEC-15) | New edition → re-check |
| Microsoft Taxonomy of Failure Modes in Agentic AI Systems [13] | v2.0, 4 June 2026 | §4 rows 7, 26, 28; SEC-16 tool descriptions | v3 → new rows |
| MITRE ATLAS [10] | data v2026.06 (30 June 2026); agentic techniques v5.1.0–v5.5.0; platform field "Agentic AI" | §4 ATLAS column; Appendix A.4 | New release → re-verify IDs |
| Claude Code settings reference key list (code.claude.com) [22] | Pinned copy 19 September 2026 | `setting_known`/`setting_scope`; MRB-1 | Monthly refresh and at each version pin; a dropped or renamed key → MRB-1 revision |
| Claude Code sandbox runtime [68] | `@anthropic-ai/sandbox-runtime` v0.0.64, 7 July 2026, beta research preview | SEC-10 status statement in S3.6 | GA → remove beta caveat |
| Anthropic RSP [91] | v3.4, effective 8 July 2026 | Citation only | New version → re-cite |
| Microsoft Entra Agent ID / Agent 365 [77], [83] | Agent ID GA April 2026; Agent 365 GA 1 May 2026; legacy registry API retirement began 15 June 2026; Agent Identity Blueprints preview | SEC-17 | Blueprint GA; Conditional Access template changes → SEC-12 and SEC-17 |
| Databricks Unity Gateway [57] | GA 4 August 2026; MCP connectors beta 6 August; ABAC beta 11 August; Sensitive Data Detection beta 13 August; trace table beta 21 August; external-provider caps 28 August; API, CLI and Terraform GA 16 September 2026 | SEC-08, SEC-09 and SEC-23 Databricks equivalents | Beta → GA transitions |
| CycloneDX [81] | 1.7 (21 October 2025); no agent schema | SEC-16 format | Agent schema in core → re-cite |
| Five Eyes "Careful Adoption of Agentic AI Services" [20] | 1 May 2026 (unverified) | SEC-11, SEC-12, SEC-17 rationale | Revised guidance → re-check the rationale |

## 12. Discussion and limitations

### 12.1 What the specification deliberately leaves open

- **Policy judgments for the governance board.** Prohibiting browser and computer-use agents for Class 3 and Class 4 products until an isolated desktop boundary exists (SEC-21) is a policy judgment held at medium confidence. An adopting organization's AIGB confirms it, varies it, or sets a review date.
- **Design choices made at Gate 2.** Whether a record writer verifies signed instructions in its file-and-CLI shape (SEC-01 option a) or becomes an authenticated service (option b) is decided by the AI Security Reviewer. Option (a) keeps a no-network, standard-library shape and adds one dependency; option (b) is what "authenticated routes" most naturally means. Likewise, an agent that pushes branches is either assigned the ATF Junior level with its deviation from Intern stated, or stays at Intern with the push moved to a separate component that has no model (SEC-12).
- **Egress inspection.** Where the threat model warrants defending against domain fronting, TLS inspection at the enterprise proxy is required (SEC-10). Such inspection has data-protection implications that the Data Protection Officer should review with the Harness Engineer before it is enabled.
- **Where the ledgers ship.** STD S3.5 and HS HRN-06 require write-once storage off-host with a retention floor, and SEC-04's off-host anchor needs that destination. Choosing it is a platform decision each adopter makes.

### 12.2 Weakest points

- **The injection evidence is young.** None of the adaptive-attack studies that SEC-14 relies on tested Claude models, so their generalization is medium confidence. The Spotlighting figures were measured on GPT-family models in 2024 against a non-adaptive attacker (SEC-13). The evidence that a deterministic out-of-band defense holds under adaptation is, in its authors' words, "one small-scale data point".
- **Several mechanisms are pre-release.** The Claude Code sandbox runtime is a beta research preview; Claude Managed Agents and several Unity Gateway features are in beta; the OWASP Agent Control Standard is a v0.1 public preview and the CSA ATF a v0.9.1 public review draft. Controls that rest on them carry that status, and the standards watch (§11) names the trigger that reopens each one.
- **Two settings behaviors are unconfirmed.** The sandbox key names `allowRead` and `allowWrite` in MRB-1 are unverified, and `CLAUDE_CODE_STOP_HOOK_BLOCK_CAP: "0"` comes from a GitHub issue rather than the settings reference, which leaves open whether it means "never override" or "override immediately". Both are confirmed empirically at Gate 2 on the pinned version; until then, the fail-closed controls named in the MRB-1 notes (§6.2) carry the load.
- **The identity chain is recorded, not proven.** The agent identity record holds the sponsor→agent→action chain but does not cryptographically prove it, and no deployed protocol can (SEC-17).
- **Vendor-configured agents have fewer levers.** Copilot Studio offers no customer-controlled permission mode, hook or sandbox; the configured-agent profile records the gap and the DAS ceiling that follows (VCS VC-06).
- **The worked example is a specification.** The risk catalog and the plan in §10 show how the controls apply to one representative design. Under the specification's own rule (§3.2), no control in it is *demonstrated* until its test passes at Gate 3 with a run ID recorded.

### 12.3 What is not verified

**Source verification.** Sources are cited as they stood on 19 September 2026. Where the text relies on a source that was not read in full, it carries a short "(unverified)", and the reference list marks secondary sources; the table lists each case and the basis on which it is cited.

| Reference | Basis of citation |
|---|---|
| [20], [73] | Two secondary reports of the Five Eyes guidance "Careful Adoption of Agentic AI Services" (1 May 2026), not its primary text |
| [78] | A press report of the UK NCSC kill-switch guidance, not the guidance itself |
| [53] | A CSA research note, for the NCCoE concept paper's dates and the expected date of the NIST interoperability profile |
| [44], [45] | Vulnerability-tracker summaries of the Gemini CLI advisory (CVE-2026-12537) |
| [71] | The AWS AgentCore product page only, for microVM and session-isolation detail |
| [41] | The NVD score for EchoLeak, in place of Microsoft's own CVSS rating |
| [7] | The OWASP text, which introduces least agency but does not call it the organizing principle |
| [10] | The ATLAS changelog summary, in which a few entries appear twice; §4.1 asks for each ID to be checked before it is pinned |
| [55] | The CWE list as a whole, not the individual entries |
| Not cited | Named without citation: the SOC 2, OSCAL and SP 800-53A wording behind the approximate §3.3 mapping; the AgentPoison, AgentHarm, ASB and InjecAgent corpora named under SEC-14; the CSA AARM specification (§11) |

## 13. Conclusion

Security controls for agentic systems fail most often not because no one wrote them down but because the writing is taken for the control. This specification makes the difference checkable. Every control has a state, and only a passing test that names the threat moves it to *demonstrated*. Every control has a mechanism that a process cannot step around — a managed setting at a scope where it is policy, a hook that fails closed, an isolation boundary enforced by the operating system — with exact keys and values taken from the vendor documentation.

Injection defenses are scored on what an adaptive attacker can make the agent do, with defended and undefended results published side by side. And a gate that resolves every cited control against the repository and the runtime configuration catches the gap between documents and systems before a reviewer has to. The controls apply to every agentic system in scope, scaled by agent class, and the worked example shows how a repository whose gates are all green can reach that standard in five bounded phases.

## Acknowledgements

Research and drafting assistance from Claude (Anthropic); all decisions and claims are the author's.

## How to cite

Reed, D. (2026). *Agentic Security Specification* (Version 1.0). Agentic AI Governance in Practice, Part 5. https://drdavidreed.com/papers/agentic-security-specification/

This paper is licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

## References

1. Reed, D. [*CRISP-AG: An Artifact-Centered Framework for Enterprise Agentic AI Governance*](/papers/crisp-ag/), v3.0. Agentic AI Governance in Practice, Part 1, 2026.
2. Reed, D. [*Agentic PRD Standard*](/papers/agentic-prd-standard/), v3.10.2. Agentic AI Governance in Practice, Part 2, 2026.
3. Reed, D. [*Specification-Driven Design for Agentic Systems*](/papers/specification-driven-design/), v1.0.3. Agentic AI Governance in Practice, Part 3, 2026.
4. Reed, D. [*Enterprise Agentic AI Harness Specification*](/papers/agentic-harness-specification/), v1.3. Agentic AI Governance in Practice, Part 4, 2026.
5. Reed, D. [*Vendor Control Specification*](/papers/vendor-control-specification/), v1.0. Agentic AI Governance in Practice, Part 6, 2026.
6. Reed, D. [*Agentic Delivery Workflow*](/papers/agentic-delivery-workflow/), v1.10. Agentic AI Governance in Practice, Part 7, 2026.
7. OWASP GenAI Security Project. [*OWASP Top 10 for Agentic Applications — The Benchmark for Agentic Security in the Age of Autonomous AI*](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/). 9 December 2025.
8. OWASP GenAI Security Project. [*OWASP GenAI LLM Top 10 2026*](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/), 3 August 2026; [*GitHub release*](https://github.com/GenAI-Security-Project/GenAI-LLM-Top10), 4 August 2026.
9. OWASP Foundation. [*OWASP MCP Top 10*](https://owasp.org/www-project-mcp-top-10/). 2025 edition, beta.
10. MITRE. [*ATLAS data repository CHANGELOG*](https://github.com/mitre-atlas/atlas-data/blob/main/CHANGELOG.md). Entries 6 November 2025 – 30 June 2026.
11. NIST CSRC. [*AI 100-2e2025*](https://csrc.nist.gov/pubs/ai/100/2/e2025/final). 24 March 2025.
12. Ken Huang. [*Agentic AI Threat Modeling Framework: MAESTRO*](https://cloudsecurityalliance.org/blog/2025/02/06/agentic-ai-threat-modeling-framework-maestro). CSA blog, 6 February 2025.
13. Microsoft Security Blog. [*Updating the taxonomy of failure modes in agentic AI systems: What a year of red teaming taught us*](https://www.microsoft.com/en-us/security/blog/2026/06/04/updating-taxonomy-failure-modes-agentic-ai-systems-year-red-teaming-taught-us/). 4 June 2026.
14. massivescale-ai. [*agentic-trust-framework: README and CHANGELOG*](https://github.com/massivescale-ai/agentic-trust-framework). v0.9.1, 3 April 2026.
15. CSA Lab Space. [*Agent Identity Governance Framework*](https://labs.cloudsecurityalliance.org/agentic/agentic-identity-governance-framework-v1/). v1, 2 April 2026 (rev. 20 May 2026).
16. OWASP GenAI Security Project. [*Agent Control Standard (ACS)*](https://genai.owasp.org/resource/agent-control-standard-acs/), 1 September 2026; [*README*](https://github.com/GenAI-Security-Project/agent-control-standard); [*Zenity Labs: The Agent Control Standard lands at OWASP*](https://labs.zenity.io/post/the-agent-control-standard-lands-at-owasp), 10 September 2026.
17. OWASP. [*AI Vulnerability Scoring System (AIVSS)*](https://aivss.owasp.org/). v0.8.
18. NIST CSRC. [*COSAiS Use Cases*](https://csrc.nist.gov/Projects/cosais/use-cases), updated 8 January 2026; [*project page*](https://csrc.nist.gov/projects/cosais).
19. NIST CSRC. [*IR 8596 (Initial Preliminary Draft)*](https://csrc.nist.gov/pubs/ir/8596/iprd). 16 December 2025.
20. CSA Lab Space. [*Five Eyes Issue First Joint Agentic AI Security Guidance*](https://labs.cloudsecurityalliance.org/research/csa-research-note-cisa-agentic-ai-adoption-guide-20260517-cs/). Research note (secondary source).
21. IMDA. [*Model AI Governance Framework for Agentic AI*](https://www.imda.gov.sg/-/media/imda/files/about/emerging-tech-and-research/artificial-intelligence/mgf-for-agentic-ai.pdf). v1.0, 22 January 2026.
22. Anthropic. [*Settings reference*](https://code.claude.com/docs/en/settings-reference). Claude Code documentation.
23. Anthropic. [*Configure permissions*](https://code.claude.com/docs/en/permissions). Claude Code documentation.
24. Anthropic. [*Choose a permission mode*](https://code.claude.com/docs/en/permission-modes). Claude Code documentation.
25. Anthropic. [*Deploy managed settings*](https://code.claude.com/docs/en/managed-settings). Claude Code documentation.
26. Anthropic. [*Configure the sandboxed Bash tool*](https://code.claude.com/docs/en/sandboxing). Claude Code documentation.
27. Anthropic. [*Hooks reference*](https://code.claude.com/docs/en/hooks), Claude Code documentation; [*Automate actions with hooks*](https://code.claude.com/docs/en/hooks-guide).
28. Model Context Protocol. [*Versioning*](https://modelcontextprotocol.io/specification/versioning); [*Key Changes, 2026-07-28*](https://modelcontextprotocol.io/specification/2026-07-28/changelog).
29. OpenTelemetry. [*GenAI semantic conventions*](https://github.com/open-telemetry/semantic-conventions-genai). GitHub repository, development status.
30. Hines et al. [*Defending Against Indirect Prompt Injection Attacks With Spotlighting*](https://arxiv.org/abs/2403.14720). arXiv 2403.14720 (2024).
31. Beurer-Kellner et al. [*Design Patterns for Securing LLM Agents against Prompt Injections*](https://arxiv.org/abs/2506.08837). arXiv 2506.08837 (v3, 27 June 2025).
32. Debenedetti et al. [*AgentDojo*](https://arxiv.org/abs/2406.13352). arXiv 2406.13352 (2024).
33. Debenedetti et al. [*Defeating Prompt Injections by Design (CaMeL)*](https://arxiv.org/abs/2503.18813). arXiv 2503.18813 (v2, 24 June 2025).
34. Shi, He, Wang, Li, Wu, Guo, Song. [*Progent: Securing AI Agents with Privilege Control*](https://arxiv.org/abs/2504.11703). arXiv 2504.11703 (v3, 14 May 2026; v1 title "Programmable Privilege Control for LLM Agents").
35. Wang, Poskitt, Sun. [*AgentSpec*](https://arxiv.org/abs/2503.18666). arXiv 2503.18666 (ICSE 2026).
36. Chen, Kang, Li. [*ShieldAgent*](https://arxiv.org/abs/2503.22738). arXiv 2503.22738 (v2, 27 November 2025).
37. Ma et al. [*AutoDojo: Adaptive Black-Box Attacks Reveal the Limits of IPI Defenses and Task-Specification Effects in LLM Agents*](https://arxiv.org/abs/2606.15057). arXiv 2606.15057 (13 June 2026, rev. 19 June 2026).
38. Narisetty, P., Kore, S. N. B., Kattamanchi, U. K. R., and Kumarapu, J. [*Adaptive Evaluation of Out-of-Band Defenses Against Prompt Injection in LLM Agents*](https://arxiv.org/abs/2606.26479). arXiv 2606.26479 (25 June 2026).
39. Anthropic. [*Agent SDK: Configure permissions*](https://code.claude.com/docs/en/agent-sdk/permissions). Claude Code documentation.
40. Microsoft 365 Message Center MC1297981. [*Agent Registry API transition to Agent 365*](https://mc.merill.net/message/MC1297981). 1 May 2026.
41. NIST National Vulnerability Database. [*CVE-2025-32711*](https://nvd.nist.gov/vuln/detail/CVE-2025-32711).
42. Invariant Labs. [*MCP Security Notification: Tool Poisoning Attacks*](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks). 1 April 2025.
43. The Hacker News. [*Three Flaws in Anthropic MCP Git Server Enable File Access and Code Execution*](https://thehackernews.com/2026/01/three-flaws-in-anthropic-mcp-git-server.html). 20 January 2026.
44. Hive Security. [*Prompt Injection in 2026…*](https://hivesecurity.gitlab.io/blog/prompt-injection-attack-detect-2026/) 7 May 2026, updated 8 July 2026 (secondary source).
45. Axis Intelligence. [*AI agent security incident tracker*](https://axis-intelligence.com/ai-agent-security-incident-tracker/). Online tracker (secondary source).
46. Anthropic. [*Model deprecations*](https://platform.claude.com/docs/en/about-claude/model-deprecations); [*API release notes*](https://platform.claude.com/docs/en/release-notes/api), 30 June and 24 July 2026.
47. Databricks. [*FMAPI supported models*](https://docs.databricks.com/aws/en/machine-learning/foundation-model-apis/supported-models). Foundation Model APIs documentation.
48. Anthropic. [*Security*](https://code.claude.com/docs/en/security). Claude Code documentation.
49. IETF. [*RFC 7515: JSON Web Signature*](https://datatracker.ietf.org/doc/html/rfc7515).
50. IETF. [*RFC 8785: JSON Canonicalization Scheme*](https://www.rfc-editor.org/info/rfc8785). June 2020.
51. Microsoft Learn. [*What are agent identities?*](https://learn.microsoft.com/en-us/entra/agent-id/what-are-agent-identities) Microsoft Entra Agent ID documentation. Updated 15 June 2026.
52. IETF Datatracker. [*Minutes IETF126: agentproto*](https://datatracker.ietf.org/doc/minutes-126-agentproto-202607230700/), 23 July 2026; [*draft-oauth-transaction-tokens-for-agents*](https://datatracker.ietf.org/doc/draft-oauth-transaction-tokens-for-agents/).
53. CSA Lab Space. [*Research note on the NIST AI Agent Standards Initiative*](https://labs.cloudsecurityalliance.org/research/csa-research-note-nist-ai-agent-standards-initiative-2026040/). Research note (secondary source).
54. Microsoft Learn. [*Conditional Access for Agents in Microsoft Entra*](https://learn.microsoft.com/en-us/entra/identity/conditional-access/agent-id). Updated 19 June 2026.
55. MITRE. [*CWE-22: Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')*](https://cwe.mitre.org/data/definitions/22.html); [*CWE-294: Authentication Bypass by Capture-replay*](https://cwe.mitre.org/data/definitions/294.html); [*CWE-532: Insertion of Sensitive Information into Log File*](https://cwe.mitre.org/data/definitions/532.html). Common Weakness Enumeration (unverified).
56. IETF. [*RFC 9162, §2.1: Merkle append-only log*](https://www.ietf.org/rfc/rfc9162.txt). December 2021.
57. Databricks. [*Unity Gateway release notes*](https://docs.databricks.com/aws/en/release-notes/unity-gateway/). GA 4 August 2026; subsequent betas.
58. Microsoft Learn. [*Microsoft Foundry Agent Service overview*](https://learn.microsoft.com/en-us/azure/ai-foundry/agents/overview), 11 September 2026; [*What is Microsoft Foundry Control Plane?*](https://learn.microsoft.com/en-us/azure/foundry/control-plane/overview)
59. Microsoft Learn. [*Copilot Studio security and governance*](https://learn.microsoft.com/en-us/microsoft-copilot-studio/security-and-governance). 4 August 2026.
60. Anthropic Engineering. [*Claude Code auto mode*](https://www.anthropic.com/engineering/claude-code-auto-mode). 25 March 2026.
61. OpenAI. [*Agent approvals & security*](https://developers.openai.com/codex/agent-approvals-security), Codex; [*Hooks*](https://learn.chatgpt.com/docs/hooks); [*Agents SDK: Guardrails*](https://openai.github.io/openai-agents-python/guardrails/).
62. Microsoft Learn. [*Microsoft Agent Framework overview*](https://learn.microsoft.com/en-us/agent-framework/overview/agent-framework-overview), 29 July 2026; [*Agent middleware*](https://learn.microsoft.com/en-us/agent-framework/user-guide/agents/agent-middleware), 7 August 2026.
63. Google ADK. [*Callbacks*](https://adk.dev/callbacks/); [*Plugins*](https://adk.dev/plugins/).
64. Databricks. [*Unity Gateway is Generally Available*](https://www.databricks.com/blog/unity-ai-gateway-generally-available). Blog, 4 August 2026.
65. GitHub. [*anthropics/claude-code issue #77686: Stop-hook override in headless mode*](https://github.com/anthropics/claude-code/issues/77686).
66. Anthropic. [*Monitor Claude Code usage with OpenTelemetry*](https://code.claude.com/docs/en/monitoring-usage). Claude Code documentation.
67. Databricks. [*AI governance with Unity Gateway*](https://docs.databricks.com/aws/en/ai-gateway/). 11 September 2026.
68. Anthropic. [*anthropic-experimental/sandbox-runtime*](https://github.com/anthropic-experimental/sandbox-runtime). v0.0.64, 7 July 2026, beta research preview.
69. Anthropic. [*Choose a sandbox environment*](https://code.claude.com/docs/en/sandbox-environments). Claude Code documentation.
70. Anthropic. [*Claude Managed Agents overview*](https://platform.claude.com/docs/en/managed-agents/overview). Beta.
71. AWS. [*What is Amazon Bedrock AgentCore*](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/what-is-bedrock-agentcore.html). Amazon Bedrock AgentCore Developer Guide (unverified).
72. Anthropic. [*CISO's guide to agentic AI*](https://claude.com/blog/ciso-guide-to-agentic-ai). 17 July 2026.
73. Crowell & Moring. [*American and Allied Cyber Agencies Issue First Joint Guidance on Securing Agentic AI*](https://www.crowell.com/en/insights/client-alerts/american-and-allied-cyber-agencies-issue-first-joint-guidance-on-securing-agentic-ai). Client alert (secondary source).
74. CSA Lab Space. [*The Non-Human Identity Governance Vacuum*](https://labs.cloudsecurityalliance.org/research/csa-whitepaper-nonhuman-identity-agentic-ai-governance-v1-cs/). Whitepaper, 2026 (secondary source).
75. CSA. [*CSAI Foundation Announces Key Milestones to Secure the Agentic Control Plane*](https://cloudsecurityalliance.org/press-releases/2026/04/29/csai-foundation-announces-key-milestones-to-secure-the-agentic-control-plane). Press release, 29 April 2026.
76. CSA blog. [*ATF: Zero Trust for AI Agents*](https://cloudsecurityalliance.org/blog/2026/04/03/every-rsac-keynote-asked-the-same-five-questions-here-s-the-framework-that-answers-them). 3 April 2026.
77. Microsoft Security Blog. [*Microsoft Agent 365, now generally available…*](https://www.microsoft.com/en-us/security/blog/2026/05/01/microsoft-agent-365-now-generally-available-expands-capabilities-and-integrations/) 1 May 2026.
78. Computer Weekly. [*NCSC tells organisations to have AI kill switches at the ready*](https://www.computerweekly.com/news/366649464/NCSC-tells-organisations-to-have-AI-kill-switches-at-the-ready). 21 August 2026 (secondary source).
79. Databricks. [*Introducing AI spend controls with Unity AI Gateway*](https://www.databricks.com/blog/introducing-ai-spend-controls-unity-ai-gateway). Blog, 23 July 2026 (product now named Unity Gateway).
80. OWASP GenAI Security Project. [*State of Agentic AI Security and Governance 2.01*](https://genai.owasp.org/resource/state-of-agentic-ai-security-and-governance/). 1 June 2026.
81. CycloneDX. [*CycloneDX v1.7 released*](https://cyclonedx.org/news/cyclonedx-v1.7-released/), 21 October 2025; [*ML-BOM capability*](https://cyclonedx.org/capabilities/mlbom/).
82. Microsoft Learn. [*Agent registry convergence with Microsoft Agent 365*](https://learn.microsoft.com/en-us/entra/agent-id/agent-registry-convergence).
83. Microsoft Learn. [*What's new in Microsoft Entra Agent ID*](https://learn.microsoft.com/en-us/entra/agent-id/whats-new-agent-id). Updated 1 May 2026.
84. Otsuka, Toyoda, Leung. [*AI Identity: Standards, Gaps, and Research Directions for AI Agents*](https://arxiv.org/html/2604.23280v1). arXiv 2604.23280 (April 2026, rev. 24 August 2026).
85. Linux Foundation. [*A2A Protocol Surpasses 150 Organizations…*](https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year) 9 April 2026.
86. Google Cloud blog. [*New enhanced tool governance in Vertex AI Agent Builder*](https://cloud.google.com/blog/products/ai-machine-learning/new-enhanced-tool-governance-in-vertex-ai-agent-builder/). 19 December 2025.
87. Google. [*SAIF: Focus on agents*](https://saif.google/focus-on-agents). Secure AI Framework.
88. Anthropic. [*Settings files and precedence*](https://code.claude.com/docs/en/settings). Claude Code documentation.
89. CSA Lab Space. [*OWASP's 2026 LLM Top 10 and New Agent Control Standard*](https://labs.cloudsecurityalliance.org/research/csa-research-note-owasp-genai-top10-2026-agent-control-stand/). 4 September 2026.
90. NIST. [*Announcing the 'AI Agent Standards Initiative'*](https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative-interoperable-and-secure). 17 February 2026.
91. Anthropic. [*Responsible Scaling Policy*](https://www.anthropic.com/responsible-scaling-policy). v3.4 (8 July 2026).

## Appendix A — Canonical label tables

The series' vocabulary-register lint checks every S3.4 table, the CRISP-AG §7 crosswalk and every row of §4 against these strings, with the edition tag.

### A.1 OWASP Top 10 for Agentic Applications 2026 (published 9 December 2025)

| ID | Canonical title |
|---|---|
| ASI01 | Agent Goal Hijack |
| ASI02 | Tool Misuse |
| ASI03 | Identity & Privilege Abuse |
| ASI04 | Agentic Supply Chain Vulnerabilities |
| ASI05 | Unexpected Code Execution |
| ASI06 | Memory & Context Poisoning |
| ASI07 | Insecure Inter-Agent Communication |
| ASI08 | Cascading Failures |
| ASI09 | Human-Agent Trust Exploitation |
| ASI10 | Rogue Agents |

The lint rejects these non-canonical forms: "Agent Identity & Privilege Abuse", "Agentic Supply Chain Compromise", "Cascading Agent Failures", "Human Manipulation". "Tool Misuse & Exploitation" is a secondary-source rendering of the document title; the announcement lists "Tool Misuse", and that is the canonical string.

### A.2 OWASP LLM Top 10 2026 (published 3 August 2026; GitHub tag 4 August 2026)

| ID | Canonical title | Note |
|---|---|---|
| LLM01 | Prompt Injection | |
| LLM02 | Sensitive Information Disclosure | |
| LLM03 | Excessive Agency | Was LLM06 in 2025 |
| LLM04 | Supply Chain | |
| LLM05 | Data and Model Poisoning | Was LLM04 in 2025 |
| LLM06 | Unbounded Consumption | Was LLM10 in 2025 |
| LLM07 | Misinformation | Was LLM09 in 2025 |
| LLM08 | Hidden Context Exposure | New; replaces System Prompt Leakage |
| LLM09 | Vector and Embedding Weaknesses | Was LLM08 in 2025 |
| LLM10 | Improper Output Handling | Was LLM05 in 2025 |

Every LLM reference in the set carries the edition tag "LLM Top 10 2026"; 2025-numbered references are stale.

### A.3 OWASP MCP Top 10 (2025 edition, beta; OWASP Foundation project)

| ID | Canonical title |
|---|---|
| MCP01:2025 | Token Mismanagement & Secret Exposure |
| MCP02:2025 | Privilege Escalation via Scope Creep |
| MCP03:2025 | Tool Poisoning |
| MCP04:2025 | Software Supply Chain Attacks & Dependency Tampering |
| MCP05:2025 | Command Injection & Execution |
| MCP06:2025 | Prompt Injection via Contextual Payloads |
| MCP07:2025 | Insufficient Authentication & Authorization |
| MCP08:2025 | Lack of Audit and Telemetry |
| MCP09:2025 | Shadow MCP Servers |
| MCP10:2025 | Context Injection & Over-Sharing |

### A.4 MITRE ATLAS IDs used (data v2026.06, 30 June 2026) — verify each against the changelog before pinning

These are the techniques, mitigations and case studies that the §4 table cites, with the release that introduced each.

| ID | Name | Release |
|---|---|---|
| AML.T0080.001 | AI Agent Context Poisoning: Memory | v5.1.0 (6 November 2025) |
| AML.T0083 | Credentials from AI Agent Configuration | v5.1.0 |
| AML.T0098 | AI Agent Tool Credential Harvesting | v5.2.0 (24 December 2025) |
| AML.T0099 | AI Agent Tool Data Poisoning | v5.2.0 |
| AML.T0101 | Data Destruction via AI Agent Tool Invocation | v5.2.0 |
| AML.T0104 | Publish Poisoned AI Agent Tool | v5.4.0 (5 February 2026) |
| AML.T0105 | Escape to Host | v5.4.0 |
| Not pinned (see §12.3) | AI Agent Tool Poisoning | v5.5.0 (30 March 2026) |
| Not pinned (see §12.3) | AI Supply Chain Rug Pull | v5.5.0 |
| AML.M0032 | Segmentation of AI Agent Components | v5.2.0 |
| AML.M0033 | Input and Output Validation for AI Agent Components | v5.2.0 |
| AML.CS0037 | Data Exfiltration via Agent Tools in Copilot Studio | v5.1.0 |
| AML.CS0045 | Data Exfiltration via MCP Server used by Cursor | v5.3.0 (30 January 2026) |
| AML.CS0046 | Data Destruction via Indirect Prompt Injection Targeting Claude | v5.3.0 |
| AML.CS0047 | Malicious AI Agent in Amazon Q VS Code Extension | v5.3.0 |
| AML.CS0053 | Poisoned Postmark MCP Server Email Exfiltration | v5.5.0 |
| AML.CS0055 | AI ClickFix: Hijacking Computer-Use Agents | v5.5.0 |
| AML.CS0059 | EchoLeak: Zero-Click Prompt Injection Targeting M365 Copilot | v2026.06 (30 June 2026) |

### A.5 CVE anchors

CVE-2025-32711 (EchoLeak; NVD CVSS 3.1 7.5 High, CWE-74, published 11 June 2025); CVE-2025-68143 (8.8), CVE-2025-68144 (8.1), CVE-2025-68145 (7.1) (`mcp-server-git`; fixed in 2025.12.18); CVE-2026-12537 / GHSA-wpqr-6v78-jr5g (Gemini CLI headless trust bypass, 24 April 2026; unverified).

## Appendix B — Companion-paper touchpoints

This appendix shows where each companion paper carries a requirement that this specification depends on. The companion paper owns the text; the appendix only points to it.

**Agentic PRD Standard [2].**

- S3.4 — each control names its implementing artifact and its state (§3); detection relabeled as a signal (SEC-13); OWASP labels carry their edition and date.
- S3.5 — tamper-evidence per SEC-04, not "append-only".
- S3.6 — authentication, authorization and replay as three requirements per SEC-01/SEC-03; runtime credential injection per SEC-11; sandbox-runtime beta status.
- S3.7 — isolation-boundary declaration per SEC-10 (read roots, write roots, egress allowlist, out-of-boundary processes, what each mechanism does not cover).
- H14 — control state column and run ID for security controls (§3.4).
- S1.6 — prompt composition states how untrusted content is fenced and how the fence resists forgery (SEC-13).
- S3.1 — Agent 365 registration record ID, blueprint/agent/paired-account IDs, claim boundary (SEC-17).
- S3.1a — demotion criteria and incident trigger, citing CRISP-AG §5.1.3 (SEC-12).
- H4 — plan-then-execute and dual LLM as named invariants with tests (§5.24).
- S2 — static and adaptive ASR with utility, defended/undefended (SEC-14).
- S5.4 — kill switch (SEC-12).

**CRISP-AG [1].** §7 crosswalk — canonical ASI titles, MAESTRO's seven layers and LLM 2026 numbering; the ASI04 row cites SEC-16, SEC-19 and SEC-23; ASI10 is covered with containment; session-context surface row citing SEC-13 and context-minimization. §5.5 — containment field (mechanism, who may invoke, time-to-halt, last exercised, resumption evidence), cited by SEC-12. §7.3 — tool poisoning and model-provider supply chain marked "covered in SEC (SEC-19/SEC-22/SEC-23; VCS VC-05)". §5.1 — injection-exposure default rule (private data + untrusted content + external communication → HITL-REQUIRED).

**Enterprise Agentic AI Harness Specification [4].**

- HRN-01 — caveat: `Read`/`Edit` denies bind built-in tools, recognized file commands and redirections, not interpreters or unnamed readers; protected and critical paths as vendor circuit breakers; `Edit(path)` not `Write(path)`.
- HRN-11 — OS-level isolation, citing SEC-10 and MRB-1 for detail.
- HRN-03 and HRN-09 hardening — fail-closed hooks, `allowManagedHooksOnly`, managed payload = MRB-1 (SEC-09, SEC-08).
- HRN-02 — preflight canary and MRB-1 verification.
- HRN-04 — unattended runs under `dontAsk` inside HRN-11(b); monotone privilege.
- HRN-06 — ledger immutability via `Edit` deny + `denyWrite` + off-host chain (SEC-04).
- HRN-08 — per-run AgBOM (SEC-16).
- Appendix A — hooks (`PostToolUseFailure`, `PostToolUse (*)`, `SubagentStart`, `ConfigChange`, `PermissionRequest`) and ACS hook-point column.
- §9 — MRB-1 path per OS; Claude Managed Agents beta posture.

**Specification-Driven Design [3].** A2 — failure-mode column (hooks fail open on timeout); model-based gate row; A3 — `control_state` column citing SEC §3; isolation artifacts citing HRN-11/SEC-10; A5 — Gate 2/3 security exit checks; A7 — adaptive attacks (EVAL-10), infrastructure pinning; B5 — `control_state` column; Part B — THREAT-05 session-context contamination, PROTO-INV-07 monotone privilege.

**Agentic Delivery Workflow [6]** (its YAML definition is the source of truth). W2 — each S3 threat-model row names an implementing artifact and its state. W4 — every binding rule resolves; canary run refuses the prohibited actions by mechanism; each policy hook has a unit test asserting exit 2 on malformed input; `claude doctor` shows MRB-1 applied. W5 — kill switch exercised with time-to-halt recorded; ISO-TEST passing. W6 — injection evaluation reports static and adaptive ASR with utility for defended and undefended configurations; control states change here with run IDs. W7 — demotion criteria defined and the monitoring that triggers them live; registry reconciliation scheduled.

**Vendor Control Specification [5].** VC-04 — MCP servers are registered services (SEC-23). VC-05 — model change notices trigger SEC-22 re-evaluation. VC-06 — configured-agent profile records the Copilot Studio equivalents and gaps for SEC-08/09/10/12/20. VC-09 — Agent 365 and Entra Agent ID licensing (SEC-17).

**The series vocabulary register.** SEC owns the nine terms in §2.4; the compound "containment boundary" is not a term; "unattended run" carries the `dontAsk` and isolation-boundary clause.

## Appendix C — Glossary

Terms owned by this paper are defined here. Terms owned by another paper in the series are cited, not redefined; the owning paper defines them.

### Terms owned by this paper

- **Adaptive injection evaluation** (§5 SEC-14; §7) — A static five-family injection corpus plus an automated adaptive attacker; static attack success rate, adaptive attack success rate and utility reported for defended and undefended configurations, on action-open and precisely-specified task variants.
- **Agent bill of materials** (§5 SEC-16) *(also: AgBOM)* — The per-run CycloneDX (OWASP ACS profile) inventory of model pins, runtime version, settings and hook hashes, dependencies, MCP servers and tool-description hashes, referenced by hash from the run ledger.
- **Control state** (§3) *(also: specified / implemented / demonstrated)* — The evidence state of a security control: specified (artifact does not exist), implemented (artifact exists, not exercised against the threat), demonstrated (a passing test naming the threat, with a run ID, at W6), optionally retired; STD H14 and S3.7 and SDD B5 carry it as a column.
- **Instruction authenticity** (§5 SEC-01) — JWS over a JCS-canonical payload with keys bound to Entra identities, or an Entra-issued OAuth 2.0 access token validated at the route; identity or role asserted in the body is never accepted.
- **Isolation boundary** (§5 SEC-10 (control: HS HRN-11)) — The declared read roots, write roots, egress allowlist and the processes outside the boundary, enforced by OS or hypervisor primitives, tiered by DAS position; not to be called containment.
- **Managed Runner Baseline** (§6) *(also: MRB-1)* — The versioned managed-settings payload every unattended Claude Code runner loads (permission mode, lock keys, sandbox block, telemetry), verified at preflight, with its hash recorded in the AgBOM.
- **Prompt fence** (§5 SEC-13) *(also: datamarking)* — Per-run nonce fencing plus datamarking of untrusted regions of a prompt; truncation of a fenced region is an anomaly, never silent.
- **Tamper-evidence** (§5 SEC-04) — Hash-chained records with a verifier and an off-host anchor; append-only enforced by writer code alone or by repository configuration alone does not qualify.
- **Tool-description integrity** (§5 SEC-19) — Pinning of MCP server version and the hash of its tool-description set in the AgBOM; a changed description fails preflight; descriptions are rendered to the reviewer at Gate 2.

### Terms owned elsewhere and cited here

- **Adversarial boundary suite** → Agentic PRD Standard, S2.2 — cited at §7
- **Agent class** → CRISP-AG, §4 — cited at §1
- **Agent Control Standard** → external source, OWASP ACS v0.1 public preview (1 September 2026) — cited at SEC-16
- **Agent identity record** → CRISP-AG, §5.5 — cited at SEC-12, SEC-17
- **Approved AI Service Register** → Vendor Control Specification, §4 VC-04; §5 — cited at SEC-23
- **Containment** → CRISP-AG, §5.5 (AIR field) — cited at SEC-12, §7.4
- **CSA Agentic Trust Framework** → external source, CSA ATF open specification v0.9.1 (public review draft, 3 April 2026) — cited at SEC-12
- **DAS position** → CRISP-AG, §5.1 — cited at §4
- **DAS–ATF crosswalk** → CRISP-AG, §5.1.4 — cited at SEC-12
- **Demotion** → CRISP-AG, §5.1.3 — cited at SEC-12
- **Failure mode (of a mechanism)** → Specification-Driven Design, §A2 (mechanism table) — cited at SEC-09
- **Harness manifest** → Enterprise Agentic AI Harness Specification, §4 (HRN-09) — cited at SEC-16, §6.2
- **HRN controls** → Enterprise Agentic AI Harness Specification, §4 — cited at §5
- **MITRE ATLAS (agentic)** → external source, ATLAS data v2026.06 (30 June 2026) — cited at §4
- **Model-based gate** → Specification-Driven Design, §A2 (mechanism table) — cited at §4.4
- **Monotone privilege** → Specification-Driven Design, §B3.3 PROTO-INV-07 (form: §A3 layer 3) — cited at SEC-10
- **OWASP ASI** → external source, OWASP Top 10 for Agentic Applications 2026 (published 9 December 2025) — cited at §4
- **OWASP LLM Top 10 2026** → external source, OWASP GenAI LLM Top 10 2026 (published 3 August 2026) — cited at §4
- **OWASP MCP Top 10** → external source, OWASP Foundation MCP Top 10 (beta project) — cited at SEC-19, SEC-23
- **Standing governance invariant** → CRISP-AG, §6.3 — cited at §5
- **Unattended run** → Enterprise Agentic AI Harness Specification, §1.4, HRN-04 — cited at §6

<nav class="series-pager" aria-label="Series navigation"><a href="/papers/agentic-harness-specification/">← Part 4: Harness Specification</a><a href="/papers/">All papers in the series</a><a href="/papers/vendor-control-specification/">Part 6: Vendor Control Specification →</a></nav>
