/**
 * Portfolio items — projects, papers, patents.
 * Ported verbatim from the Lovable export.
 */

export type PortfolioCategory =
  | 'github'
  | 'whitepaper'
  | 'research'
  | 'guidance'
  | 'casestudy'
  | 'patent';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  category: PortfolioCategory;
  tags: string[];
  link?: string;
  metrics?: string;
  featured?: boolean;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'casestudy-1',
    title: '© Operating an Agentic OS: Unattended AI You Can Trust',
    description:
      'A fleet of Claude agents works these systems every night, unattended — and the autonomy ladder tops out below auto-merge on purpose, because the merge decision stays human. Four bounded loops, each with a contract and a named kill switch; 21 process lessons logged, every one priced by the failure that taught it. Read the full one-page case study →',
    fullDescription:
      "A staff-level case study in operating (not just building) agentic AI. It documents the permanent operating system behind a fleet of Claude agents that work unattended every night: a ~200-line constitution of identity, judgment principles, and six checkable hard limits; four bounded loops each with a contract and a named kill switch; a maker-is-never-the-grader discipline where verifier seats run as separate zero-tool processes that cannot be socially engineered; a reader/actor quarantine that treats all issue/log/web text as data, not instructions, to blunt prompt injection; a trust ledger that grants autonomy per category of work from logged evidence and demotes automatically and loudly — topping out below auto-merge, permanently, because the merge decision stays human; standing goals that convert finished work into invariants re-verified in CI daily, forever; and minimum-effective-intelligence model routing proven by a controlled benchmark in which a frontier-tier adversarial review caught a real concurrency defect a cheaper review had certified as safe. Demonstrates systems thinking, security judgment, evaluation rigor, cost governance, and operational honesty (receipts over trust). Full one-page case study linked below.",
    category: 'casestudy',
    tags: ['Agentic AI', 'AI Operations', 'Claude', 'AI Safety', 'Prompt Injection', 'Cost Governance', 'CI/CD'],
    link: '/agentic-os/',
    metrics: 'Production Agentic Operations',
    featured: true,
  },
  {
    id: 'github-1',
    title: '© PACCA: Healthcare Prior Authorization AI Platform',
    description:
      '29% of prior-authorization delays directly harm patient care. Delays average 2–3 days while providers lose 34+ hours a week to the paperwork. PACCA answers with a five-agent clinical platform whose seven deterministic pre-flight gates and three governance gates override model confidence on experimental treatments, rare conditions, and conflicting guidelines — every ambiguous case routed to a Medical Director. Pre-production; synthetic cases only.',
    fullDescription:
      'Multi-agent LLM system automating healthcare prior authorization workflows. Built with Claude API, FastAPI, React, and ChromaDB RAG for evidence-based clinical decision support with human oversight. Reduces provider workload (34+ hrs/week) and treatment delays (2-3 days) through intelligent workflow automation. Features multi-agent orchestration, RAG-powered guideline retrieval, explainable decision reasoning, seven deterministic pre-flight gates plus three P-3/P-4/P-5 governance gates and runtime short-circuits, and audit-grade observability. Prior authorization consumes an estimated $50–100B annually in U.S. administrative overhead, with payers processing 200+ million requests a year, mostly manually. The engineering practices here are production-grade; the deployment is not. PACCA is pre-production: not HIPAA-validated, no Business Associate Agreements in place, and every clinical case in the repository is synthetic. Treat it as a reference architecture, not a turnkey product.',
    category: 'github',
    tags: ['Python', 'FastAPI', 'Claude API', 'ChromaDB', 'React', 'Docker'],
    link: 'https://github.com/drdgreed/pacca',
    metrics: 'Patient-Safety Gated · Human Sign-Off',
    featured: true,
  },
  {
    id: 'github-2',
    title: '© Adult Learning Coaching Agent (ALCA)',
    description:
      'Cuts a coaching evaluation cycle from 10–14 hours to 90–120 minutes, and ties every observation to a timestamped transcript citation instead of a black-box score. A multi-agent pipeline on Claude Sonnet 4.5 evaluates pacing, engagement, content structure, and adult-learning principle application — the same rubric on every session, rather than quality drifting by evaluator. Baseline-versus-target figures; synthetic instructor data only.',
    fullDescription:
      'The Adult Learning Coaching Agent (ALCA) analyzes recordings of distance-learning sessions and produces evidence-based coaching reports. Built on Claude Sonnet 4.5 with AssemblyAI speaker-diarized transcription, it targets a 90–120 minute evaluation loop against a documented 10–14 hour manual baseline — figures the repository labels as documented-baseline-versus-target, not measured production results. A multi-agent pipeline scores pacing with transparent WPM math, engagement techniques, content structure, and adult-learning principle application, and every observation is backed by a timestamped citation from the transcript, so a coach can audit any claim the system makes. Uploads are chunked and resumable up to 10GB. A multi-tenant Organization model scopes data per customer, and longitudinal comparison runs across 2–10 evaluations. Authentication is scaffolded but not enforced — role-based access control is Phase 2 work, and the repository states plainly that it should not be deployed publicly as-is. Published as an engineering and evaluation artifact running on synthetic instructor data only; it is not certified for real learner or employee data. Analysis quality is currently asserted by 61 async integration tests against a live PostgreSQL instance rather than an LLM judge suite — a gap the repo documents rather than hides.',
    category: 'github',
    tags: ['Python', 'Claude API', 'AssemblyAI', 'Agentic AI', 'EdTech', 'FastAPI'],
    link: 'https://github.com/drdgreed/adult-learning-coach-showcase',
    metrics: '10–14 hrs → 90–120 min per evaluation',
    featured: true,
  },
  {
    id: 'whitepaper-1',
    title: '© SOTA Agentic PRD: PACCA Healthcare AI',
    description:
      'Prior authorization decides whether a patient gets treated. PACCA automates that decision with five AI agents, then refuses to trust them: three deterministic gates — a per-run intent contract, a minimum-necessary scope guard, and an evidence-grounding detector — stand between the model and any automated approval. Any gate trips, a human decides. 105 synthetic cases. Every limitation written down.',
    fullDescription:
      "Prior authorization is the process where a clinician must get an insurer's approval before treating a patient. It is document-heavy, rules-driven, and largely manual — exactly the shape of work language models are good at. The obstacle was never capability. It was accountability: a payer, a patient, or a regulator has to be able to ask why a decision was made and get an exact answer.\n\nPACCA is a multi-agent system that decides synthetic prior-authorization cases end to end — evidence aggregation, clinical classification, a Tier-1 decision agent, a Tier-2 medical director agent, and a policy-evolution agent that can propose guideline amendments but cannot deploy one without human approval. Retrieval runs over a governed clinical-guideline collection plus an institutional-memory collection of Medical Director overrides, so a human's correction changes future reasoning without retraining.\n\nThe differentiated part is what sits between the model and the decision. Most agentic systems treat a model's self-reported confidence as authority. PACCA does not. Three deterministic gates — ordinary code, no second model judging the first — run on every case: a per-run intent contract that declares what the run may touch and opens the audit trail, a fail-closed minimum-necessary scope guard that denies any write or retrieval outside that declaration, and an evidence-grounding detector that forces human review when a decision cites evidence absent from the submission. Seven deterministic pre-flight gates run before any model call at all. Eleven named escalation reasons mean \"why was this escalated?\" always has one exact answer in the audit log.\n\nWhat is verified: 784 automated tests collected with zero collection errors, 774 passing in the non-clinical suite, 15 valid change manifests across 15 harness iterations, a clean TypeScript frontend, and 12 passing end-to-end browser specs. The approved live clinical suite did run: the accuracy evaluation passed at 87.2% (34 of 39 cases) against an 80% threshold, with zero hallucinations and both sparse-notes hallucination traps clean. Every behavioral change ships as a one-file diff with a written, falsifiable prediction and a recorded verdict.\n\nWhat is calibrated about that: the run used a substituted model, because the pinned model was refused by the API gateway, so 87.2% is not directly comparable to the earlier pinned-model figure of 20 of 20 at a mean judge score of 4.9 out of 5. It was a single run with no tolerance band. Pinned-model revalidation is still pending.\n\nWhat is not green: one test stays red on purpose. After a Medical Director override is taught to the system, an identical weak spine case still routes to human review instead of auto-approving. Both the pre-repair and repaired retrieval paths escalate under the substituted model, and the repaired path escalates better — it retrieves the precedent, reasons over it explicitly, and declines to generalize it, because the override was justified by severe motor weakness that the new case does not document. That is the evidence-grounding invariant working as designed. Whether the demo expectation or the invariant is the correct contract is a human clinical-policy decision, so the assertion was left failing rather than weakened.\n\nWhat else is honest: Medical Director case resolution is unimplemented, and the server says so in its own response rather than letting the interface imply otherwise. A fresh deployment retrieves nothing until guidelines are ingested. There is no production deployment, no Business Associate Agreement, no HIPAA certification, and no real patient data — 105 synthetic cases support a narrow pilot argument, not the 500+ a Software-as-a-Medical-Device claim would require. The full requirements document carries an honest-claims matrix and a self-correction record listing every error found in the prior version and what it was corrected to.",
    category: 'whitepaper',
    tags: ['Agentic AI', 'AI Governance', 'Healthcare AI', 'Multi-Agent Systems', 'Clinical Validation', 'HIPAA / SaMD'],
    link: 'https://docs.google.com/document/d/1OifHO-2_0yLzUxKFaKo3kdRDx4Ot0ERyGOsLPSRK4D8/edit?tab=t.0',
    metrics: '784 tests · 105 cases · 3 gates',
    featured: true,
  },
  {
    id: 'whitepaper-4',
    title: '© CRISP-AG: Enterprise Agentic AI Governance Framework',
    description:
      'Closes the gap between what ISO/IEC 42001 and NIST AI RMF require and what teams must actually produce to deploy agentic AI safely: four concrete governance artifacts, a nine-phase lifecycle, and a five-class delegation taxonomy that decides what an agent may do without a human in the loop. Presented as design propositions and implementation guidance — explicitly not yet empirically validated.',
    fullDescription:
      "CRISP-AG (v2.3, May 2026) is a practitioner white paper proposing an artifact-centered implementation framework for enterprise agentic AI governance. It addresses the gap between management-system standards (ISO/IEC 42001) and risk frameworks (NIST AI RMF) and the operational artifacts teams must actually produce to deploy multi-step, tool-calling, and multi-agent LLM systems safely. CRISP-AG extends CRISP-DM's lifecycle with three agentic-specific phases — Operational Context Assembly, Trust/Governance/Risk Architecture, and Iterative Refinement and Scale — yielding a nine-phase governed lifecycle with explicit decision gates. It formalizes four core artifacts under-specified in current AI governance and MLOps practice: (1) Delegation Authority Scoping (DAS), a five-class autonomy taxonomy with named cross-functional approval and Legal review calibrated per delegation class; (2) Contractor Access Governance (CAG), an explicit Contractor Access Profile that closes the agent-mediated data-access gap in mixed FTE/contractor/vendor workforces; (3) Orchestration Contracts, formal per-sub-agent specifications binding implementation, testing, and audit; and (4) Capability Frontier Classification, a threshold-framed taxonomy for high-risk capabilities. The framework adds first-class output gating as a security defense, coverage-based adversarial test minimums, per-class compressed lifecycle tracks, formula-based ROI guidance with explicit non-summing rationale, and an Appendix B Standards Mapping Matrix aligning every phase and artifact to ISO/IEC 42001, NIST AI RMF, EU AI Act, and OWASP LLM Top-10 controls. Strongest fit: Class 2–3 ReAct and orchestrated multi-agent enterprise systems with tool access; Class 4 code-executing agents require additional sandboxing and red-team validation. Positioned as design propositions and implementation guidance — not yet empirically validated — with an explicit validation agenda for multi-site case studies.",
    category: 'whitepaper',
    tags: ['AI Governance', 'Agentic AI', 'ISO 42001', 'NIST AI RMF', 'Multi-Agent', 'Enterprise'],
    link: 'https://docs.google.com/document/d/1EHvDCwNNVGyLs0m4kevjWabkfby0A8HogpBAbzNp5fI/edit?usp=sharing',
    metrics: '9-Phase Lifecycle',
    featured: true,
  },
  {
    id: 'whitepaper-3',
    title: '© Specification-Driven Design: PACCA Healthcare AI (v3.0)',
    description:
      'Denial is now a human-only terminal state — derived, not preferred. CMS-0057-F, 42 CFR §422.101(c), and state AI statutes bar an algorithm from being the sole basis of an adverse determination, so agents may approve or escalate and never deny. v3.0 also retires the temperature-determinism contracts as unimplementable on current models, and makes confidence routing inoperative without a current calibration record. 175 requirement IDs, coverage computed rather than asserted: half carry a verification test, and the other half are named individually.',
    fullDescription:
      "Specification-Driven Design (SDD) document v3.0 for a multi-agent clinical prior-authorization system, revised in September 2026 after a research review of the specification's own evidence base, regulatory frame, and vendor substrate. It is as much a correction record as a specification.\n\nFour problem-statement figures from v2.4 were replaced against primary sources. The $50–100B administrative estimate conflated total drug utilization management with prior authorization; the 34-hours-per-week figure appears in no AMA survey year; the 29% figure measured physicians rather than authorizations; and an 18–35% reviewer-variability claim could not be located at all. The document now carries roughly $35B in annual prior-authorization administrative spend, about 13 physician-and-staff hours per week, 26% of physicians reporting a prior-authorization-related serious adverse event, and the HHS Office of Inspector General finding that 13% of sampled Medicare Advantage denials were for services that met Medicare coverage rules.\n\nThe compliance frame was rebuilt. FDA Software-as-a-Medical-Device framing was removed — software limited to determination of health benefit eligibility is excluded from the device definition by 21 U.S.C. §360j(o)(1)(A) — and replaced with the instruments that actually bind a coverage determination: CMS-0057-F, 42 CFR §422.101(c) and §422.566(d), Section 1557 nondiscrimination at 45 CFR §92.210, and state prior-authorization AI statutes including CA SB 1120 and TX SB 815. Each instrument is treated as a first-class specification input required to produce at least one enforceable invariant.\n\nThe consequence is architectural. PACCA does not make adverse determinations: agents may return AUTO_APPROVED or IN_REVIEW and never DENIED (C-HARD-06, PROHIB-DSA-04); a DENIED decision requires a non-null reviewer ID and a HUMAN review tier (SCHEMA-INV-03); the denial terminal state is unreachable from any agent transition (PROTO-INV-06); and the property is asserted pipeline-wide rather than per-agent (COMPOSE-06). A new user journey specifies the human denial path end to end.\n\nThree control families are new. A threat model (S6) treats evidence text as untrusted data and pairs that prompt-borne instruction with a deterministic injection screen that pre-escalates before any model call — on the stated reasoning that a specification only constrains an LLM where it is wired to a mechanism that can refuse (a schema validator, a pre-flight check, a permission rule, a CI gate), and that prose in a prompt is context, not enforcement. A calibration precondition (CAL-01) makes any confidence used for routing conditional on a current ECE and Brier calibration record for the pinned model identifier; absent that record the thresholds are inoperative and every case routes to human review. Nondiscrimination controls (G6) require an input inventory classifying every variable as protected characteristic, proxy, or neither, plus subgroup reporting and a named mitigation decision before autonomy resumes.\n\nModel and prompt change control (G8) pins the model identifier with no floating aliases, records model_id and prompt_version on every decision and every audit record, makes prompt versions immutable once referenced by a decision, and treats a vendor model change as a drift event requiring golden-set, calibration, and judge-validation re-runs before autonomous decisions resume. Two contracts were removed rather than weakened: the temperature-based determinism requirements are no longer implementable on current Claude models, and are replaced by observable consistency contracts — five independent runs per golden case agreeing on status in at least 95% of cases, under structured-output schema enforcement, with schema violations not retried.\n\nThe evaluation bar rose with the claims. The golden set requirement went from 20 cases to at least 100 stratified across every escalation group with at least five hallucination traps; the accuracy gate now reports a 95% confidence interval lower bound rather than a bare percentage; and the LLM judge may not gate CI until its agreement with at least two human clinician labels on at least 50 cases is reported at Cohen's κ ≥ 0.6 per judge-model version.\n\nThe traceability matrix is generated from a machine-readable requirements table, so coverage is computed rather than asserted: 175 requirement identifiers — 36 new in v3.0, 9 amended, 2 removed — of which 50% are verified by a named test. The document's most useful sentence is about itself. v2.4 stated that requirements without a verification test were flagged as gaps, and flagged none; in fact 65 of its 138 identifiers, 47%, had no matrix row at all. Those are now listed individually in a gap register, alongside 37 v3.0 requirements marked PENDING-AUDIT until verified against the repository. As the coverage note puts it: adding rows to a table does not add coverage.",
    category: 'whitepaper',
    tags: ['Agentic AI', 'AI Governance', 'Healthcare AI', 'CMS-0057-F', 'HIPAA', 'Prompt Injection', 'Calibration'],
    link: 'https://docs.google.com/document/d/1gQ5x4WcZopXyaDI2an3Udez5hk2z4BVp/edit',
    metrics: '175 REQ-IDs · Coverage Computed',
    featured: true,
  },
  {
    id: 'guidance-agentic-ops',
    title: '© Agentic Ops: Running AI Agents You Can Trust (Mini Course)',
    description:
      'The answer to the interview question most candidates cannot handle: what stops it from doing something destructive when nobody is watching? Five modules on rules that check themselves, bounded loops with named kill switches, verifiers that hold no tools and so cannot be talked into anything, autonomy earned from logged evidence, and cost-aware model routing. Agentic AI Mastery teaches you to build agents; this teaches you to operate the ones you cannot watch.',
    fullDescription:
      "Agentic Ops is a five-module mini course authored for CareerForge, positioned as the operations companion to the Agentic AI Mastery curriculum: Mastery teaches you to build agents, Agentic Ops teaches you to operate the ones you can't watch. The modules are OPS.1 Rules That Check Themselves (checkable floors vs. judgment shapers, the placement ladder, hard limits, lessons written in scar tissue), OPS.2 The Loop Is a Policy (the six mandatory parts of an unattended loop, the four exits in priority order, blast-radius isolation and named kill switches), OPS.3 The Maker Is Never the Grader (fresh-context verification, physical zero-tool graders, the reader/actor quarantine against prompt injection), OPS.4 Trust Is Earned, Done Is a State (per-category autonomy ledgers and standing goals re-verified in CI), and OPS.5 Minimum Effective Intelligence (model-tier routing, the effort dial, the barbell pattern, and the routing table as the real price tag). Each lesson ships with a lesson brief, a quiz bank, and a presenter-ready slide deck with hand-built diagrams. Written to Anthropic's agent-engineering standards and grounded throughout in a real production system.",
    category: 'guidance',
    tags: ['Agentic AI', 'AI Operations', 'Course', 'Claude', 'AI Safety', 'Loop Engineering'],
    link: '/agentic-ops/',
    metrics: '5 Modules · Operations Curriculum',
    featured: true,
  },
  {
    id: 'whitepaper-harness',
    title: '© The Production Harness: Engineering AI Agents You Can Walk Away From',
    description:
      "Anyone can prompt an agent. The engineering is everything around the model call. This white paper documents the seven-pillar discipline behind a production Claude Code harness — context layering priced by what it costs every call, an Evidence Ledger that ends false \"done,\" hooks that turn advisory rules into guarantees, and unattended loops whose autonomy tops out below auto-merge by design. Every practice traced to Anthropic's own engineering guidance; every pillar earned through a documented failure. Read the full white paper →",
    fullDescription:
      "A definitive, graphics-rich white paper on production harness engineering for autonomous AI agents, reorganized into seven capability pillars: (1) Context Engineering — a four-layer placement model where content lives at the cheapest layer that still gets it applied; (2) Evidence Over Assertion — a fixed Evidence Ledger schema that beat three prose rules after a 77-minute run reported \"fully verified\" work that wasn't; (3) Deterministic Enforcement — hooks and a permissions deny-floor that make \"always do X\" a guarantee, not a decaying sentence; (4) Institutional Memory & Learning — priced, append-only lessons and audited per-fact memory; (5) Unattended Autonomy — a six-part loop doctrine, four priority-ordered exits, and an earned-autonomy trust ledger that never reaches auto-merge; (6) Multi-Agent & Safety Discipline — fresh-context verification, a reader/actor quarantine against prompt injection, and multi-worktree hazard rules; (7) Governance & Honest Trade-offs — propose-only self-governance and an explicit solo-vs-team matrix. Closes with a Day-1/Week-1/Month-1 adoption path and a practice-to-primary-source citation map. Grounded throughout in Anthropic's published engineering guidance; complements the /agentic-os/ operations case study.",
    category: 'whitepaper',
    tags: ['Agentic AI', 'Harness Engineering', 'Claude Code', 'AI Safety', 'Verification', 'Context Engineering', 'AI Operations'],
    link: '/harness-engineering/',
    metrics: '7 Capability Pillars · Primary-Source Cited',
    featured: true,
  },
  {
    id: 'github-3',
    title: '© K-12 Lesson Planning Assistant (LPA)',
    description:
      'Returns 1.5–2 hours per lesson to teachers while keeping pedagogical authorship with them: a 4-Pass workflow where the teacher reviews the structure, customizes for their students, adds their own teaching style, then polishes the materials. Differentiation scaffolds for struggling learners, advanced learners, and ELL students generate with every plan. A prototype — its quality and adoption figures are stated targets, not measured results.',
    fullDescription:
      "The Lesson Planning Assistant (LPA) is a prototype demonstrating how AI can assist K-12 teachers while keeping pedagogical decision-making with the teacher. Built with FastAPI, SQLite, and Claude 3.5 Sonnet, it generates standards-aligned lesson plans in 30-60 seconds that teachers then refine through a structured 4-Pass Framework: review the structure (5-10 min), customize for their students (15-20 min), add their own teaching style (15-20 min), and polish the final materials (10-15 min) — roughly 45-70 minutes of teacher-directed refinement in which every pedagogical choice stays human. Implemented features include user authentication, standards-aligned generation against 14 sample standards, a 5-template library, differentiation scaffolds for struggling learners, advanced learners, and ELL students, saved plans, text export, and in-product 4-Pass workflow guidance. The repository is deliberately explicit about what the prototype does and does not establish: it demonstrates that structured drafts generate quickly and that net savings run 1.5-2 hours per lesson, while the 75% 'usable foundation' quality bar and the 35-45% Year-1 adoption rate remain stated targets the prototype does not prove.",
    category: 'github',
    tags: ['Python', 'FastAPI', 'Claude API', 'K-12 Education', 'SQLite', 'EdTech'],
    link: 'https://github.com/Chaos-6/lesson-planning-assistant',
    metrics: '1.5–2 hrs saved per lesson',
    featured: true,
  },
  {
    id: 'whitepaper-2',
    title: '© Agentic AI Implementation Guide for K-12 Education',
    description:
      'Translates corporate AI-management competency into the classroom: six teacher competencies, from pedagogical context assembly through recognizing where the capability frontier ends. FERPA-tiered data handling and equity-first design — proactive bias mitigation, multilingual support, within-district equity monitoring — are treated as requirements rather than afterthoughts.',
    fullDescription:
      "Framework translating corporate '201-level AI management' competencies into pedagogical contexts. Establishes six essential teacher competencies: pedagogical context assembly, educational quality judgment, task decomposition, iterative refinement, workflow integration, and capability frontier recognition. Addresses time recovered across lesson planning, assessment creation, and differentiation, and frames that time as instructional capacity returned to teachers rather than headcount to be removed. Features a FERPA-compliant tiered data framework whose three risk levels govern what student information may reach a model at all. Equity-first design includes proactive bias mitigation, multilingual support, and within-district equity monitoring. Implementation guidance covers a phased district rollout and a hybrid training curriculum built to counter the high abandonment rates typical of unsupported ed-tech adoption. Impact modeling, adoption targets, and district-level ROI figures are documented in the full white paper.",
    category: 'whitepaper',
    tags: ['K-12 Education', 'AI Training', 'FERPA', 'Equity', 'Professional Development'],
    link: 'https://docs.google.com/document/d/1pA7CIldjqZ7nZRBIjm0OT815TEKRyiaIIvmFPq-Dojk/edit?usp=sharing',
    metrics: 'Six Teacher Competencies',
    featured: true,
  },
  {
    id: 'patent-1',
    title: 'Dynamic E-Commerce Click Stream Analysis',
    description:
      'US Patent 6,850,988: System for interpreting navigation patterns to optimize e-commerce strategies.',
    fullDescription:
      'United States Patent 6,850,988 — System and method for dynamically evaluating an electronic commerce business model through click stream analysis. This technology enables companies to interpret navigation patterns and user behavior to optimize e-commerce strategies. It allows understanding customer decision-making, which is crucial for enhancing online user behavior analysis and improving personalized advertising campaigns.',
    category: 'patent',
    tags: ['E-Commerce', 'User Behavior', 'Analytics', 'Personalization'],
    metrics: 'US 6,850,988 • 2005',
    featured: true,
  },
  {
    id: 'patent-2',
    title: 'Large-Grained Database Concurrency Management',
    description:
      'US Patent 6,839,229: Log monitor with dynamically re-definable business logic for data sharing.',
    fullDescription:
      'United States Patent 6,839,229 — System and method for maintaining large-grained database concurrency with a log monitor incorporating dynamically re-definable business logic. This invention provides an advanced application programming mechanism and technique for managing and sharing large amounts of non-volatile data across different application processes on the same computer. This method is particularly useful for large data warehouses or planning data repositories, where it facilitates the sharing of data between different instances of an application and reduces the overall memory footprint required for shared data.',
    category: 'patent',
    tags: ['Database', 'Concurrency', 'Data Warehouses', 'Memory Management'],
    metrics: 'US 6,839,229',
    featured: true,
  },
];
