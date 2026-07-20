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
      '29% of prior-authorization delays directly harm patient care. Delays average 2–3 days while providers lose 34+ hours a week to the paperwork. PACCA answers with a five-agent clinical platform whose 7-branch deterministic escalation tree overrides model confidence on experimental treatments, rare conditions, and conflicting guidelines — every ambiguous case routed to a Medical Director. Pre-production reference architecture; synthetic cases only.',
    fullDescription:
      'Multi-agent LLM system automating healthcare prior authorization workflows. Built with Claude API, FastAPI, React, and ChromaDB RAG for evidence-based clinical decision support with human oversight. Reduces provider workload (34+ hrs/week) and treatment delays (2-3 days) through intelligent workflow automation. Features multi-agent orchestration, RAG-powered guideline retrieval, explainable decision reasoning, configurable escalation thresholds, and audit-grade observability. Prior authorization consumes an estimated $50–100B annually in U.S. administrative overhead, with payers processing 200+ million requests a year, mostly manually. The engineering practices here are production-grade; the deployment is not. PACCA is pre-production: not HIPAA-validated, no Business Associate Agreements in place, and every clinical case in the repository is synthetic. Treat it as a reference architecture, not a turnkey product.',
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
      'The clinical-validation strategy behind PACCA: a 105-case SME-reviewed golden set, a dual evaluation gate, and an honest-claims matrix that separates what the system can defend today from what more data would unlock. Written for the reviewers who decide whether clinical AI gets anywhere near patients — FDA and IMDRF SaMD-aware, with the statistical power analysis to justify the sample size.',
    fullDescription:
      "PACCA (Prior Authorization & Care Coordination Agent Platform) is a production-targeted, multi-agent AI system that automates clinical prior authorization for healthcare payers and providers. Architecture: hierarchical agents — DecisionSupportAgent (Tier 1), MedicalDirectorAgent (Tier 2), EvidenceAggregationAgent, ClinicalClassificationAgent, and a human-governed PolicyEvolutionAgent — on the Claude API, with a FastAPI backend, PostgreSQL 16 JSONB audit log, dual-collection ChromaDB RAG over real clinical guidelines and Medical Director precedent overrides, OpenTelemetry → Langfuse tracing, and JWT/bcrypt auth. A seven-branch deterministic escalation tree with pre-flight safety checks (experimental treatment, rare ICD-10, conflicting guidelines, prior denial, high-cost, pediatric-complex) fires before any LLM call; anti-hallucination is enforced via Claude tool-use and shared CLINICAL_SAFETY_GUIDELINES, with zero-tolerance sparse-notes traps. The v2.2.0 prototype scored 5.0/5.0 across eight engineering dimensions; v2.3 added a six-phase, manifest-bound harness-engineering cycle (after Lin et al., Agentic Harness Engineering, arXiv:2604.25850, 2026) requiring every behavioral change to ship as a one-file diff with a falsifiable predicted-impact contract that the next evaluation round verifies — producing file-level diffs and verdict logs compliance work can build on. v2.4's defining contribution is a Clinical Validation Strategy aligned to the FDA and IMDRF SaMD clinical-evaluation framework: a three-pillar analytical-and-clinical validation breakdown, a 105-case SME-reviewed golden set governed by a dual evaluation gate (per-case regression detection at 100% single-case sensitivity plus an aggregate ≥80% accuracy gate), with the 20-case golden core currently passing 20/20, binomial-CI statistical-power analysis (n=100 detects ≥10pp performance drops at 80% power), a Cohen's κ ≥ 0.80 inter-rater clinical-review-board process, and an explicit honest-claims matrix separating what the system can defend today from what the 100 → 300 → 500+ dataset roadmap unlocks. It distinguishes engineering maturity from clinical-validation sufficiency by intent — the posture healthcare deployment actually requires. Targets the $50–100B U.S. prior-authorization administrative-overhead market with sub-30-second decisions vs. a 6–12 hour manual baseline; HIPAA-conscious, FDA SaMD-aware change-control from the foundation.",
    category: 'whitepaper',
    tags: ['Claude API', 'Multi-Agent', 'RAG', 'Agentic AI', 'Healthcare', 'HIPAA', 'FDA SaMD', 'Clinical Validation'],
    link: 'https://docs.google.com/document/d/1OifHO-2_0yLzUxKFaKo3kdRDx4Ot0ERyGOsLPSRK4D8/edit?tab=t.0',
    metrics: '105-Case SME-Reviewed Golden Set',
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
    title: '© Specification-Driven Design: PACCA Healthcare AI',
    description:
      'Specifies five clinical agents as formal behavioral contracts — preconditions, postconditions, invariants, and hard prohibitions — with hallucination banned as a scored contract violation rather than a hoped-for outcome. 72 requirement IDs traced to source artifact and verification test; HIPAA audit specifications mapped directly to 45 CFR provisions.',
    fullDescription:
      'Specification-Driven Design (SDD) document for a production clinical agentic AI system, applying four concurrent specification traditions: GitHub Spec-Kit/SPARC intent specification, Agent Behavioral Contracts (ABC, arXiv 2602.22302, 2026) for formal precondition/postcondition/invariant/prohibition contracts per agent, multi-agent Orchestration Protocol Invariants (arXiv 2512.09458) for message schema enforcement and compositionality proofs, and AGENTSAFE/POLARIS governance specification for design-time, runtime, and audit controls. Each of five agents carries a full ContractSpec: preconditions, postconditions, invariants, hard prohibitions (including hallucination prohibition enforced as a scored contract violation), resource bounds, and escalation triggers. Behavioral drift formally specified with detection thresholds, CI gate mechanism, and three-tier response protocol including a no-restart autonomy master switch. Termination conditions specified for all failure modes: API exhaustion, timeout, schema violation, and pre-flight trigger. Multi-agent compositionality theorems prove output-type preservation, pipeline-wide hallucination prohibition, and absorbing pre-flight invariants. HIPAA audit specifications map directly to 45 CFR provisions with verifiable acceptance criteria. Full traceability matrix: 72 REQ-IDs mapped to source artifact and verification test. Demonstrates Staff/Principal-level engineering discipline — specification rigor applied to agentic AI before formal IEEE standards for this domain exist.',
    category: 'whitepaper',
    tags: ['Claude API', 'Agentic AI', 'Healthcare', 'HIPAA', 'FDA SaMD', 'RAG'],
    link: 'https://docs.google.com/document/d/1gQ5x4WcZopXyaDI2an3Udez5hk2z4BVp/edit',
    metrics: 'Level 5 Agentic Maturity',
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
