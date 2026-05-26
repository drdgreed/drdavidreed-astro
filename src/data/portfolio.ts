/**
 * Portfolio items — projects, papers, patents.
 * Ported verbatim from the Lovable export.
 */

export type PortfolioCategory =
  | 'github'
  | 'whitepaper'
  | 'research'
  | 'guidance'
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
    id: 'github-1',
    title: '© PACCA: Healthcare Prior Authorization AI Platform',
    description:
      'Multi-agent LLM system automating healthcare prior authorization workflows with human oversight.',
    fullDescription:
      'Multi-agent LLM system automating healthcare prior authorization workflows. Built with Claude API, FastAPI, React, and ChromaDB RAG for evidence-based clinical decision support with human oversight. Reduces provider workload (34+ hrs/week) and treatment delays (2-3 days) through intelligent workflow automation. Features multi-agent orchestration, RAG-powered guideline retrieval, explainable decision reasoning, configurable escalation thresholds, and production-ready architecture.',
    category: 'github',
    tags: ['Python', 'FastAPI', 'Claude API', 'ChromaDB', 'React', 'Docker'],
    link: 'https://github.com/Chaos-6/pacca',
    metrics: 'Healthcare AI',
    featured: true,
  },
  {
    id: 'github-2',
    title: '© Adult Learning Coaching Agent (ALCA)',
    description:
      'AI-powered instructional coaching system that transforms distance learning video recordings into evidence-based coaching reports.',
    fullDescription:
      'The Adult Learning Coaching Agent (ALCA) is a production-ready AI system that analyzes video recordings of distance learning sessions to generate comprehensive, evidence-based coaching reports. Built with Claude 3.5 Sonnet agentic architecture, it delivers 85-90% time savings per evaluation cycle (from 10-14 hours down to 90-120 minutes). Features include AI-powered transcript generation via AssemblyAI with speaker diarization, multi-agent analysis pipeline evaluating pacing (WPM), engagement techniques, content structure, and adult learning principle application. Supports video files up to 6 hours/10GB with chunked upload and resume capability. Enterprise-ready with multi-tenant architecture, role-based access, and longitudinal tracking across 10+ sessions. Quantitative metrics include transparent WPM calculations, pause frequency analysis, and tangent detection. Pricing model targets corporate L&D departments, EdTech platforms, and professional development providers with projected break-even at 18 customers (month 9).',
    category: 'github',
    tags: ['Python', 'Claude API', 'AssemblyAI', 'Agentic AI', 'EdTech', 'FastAPI'],
    link: 'https://github.com/Chaos-6/adult-learning-coach',
    metrics: '85-90% Time Savings',
    featured: true,
  },
  {
    id: 'github-3',
    title: '© K-12 Lesson Planning Assistant (LPA)',
    description:
      'AI-powered pedagogical planning agent that assists K-12 teachers with lesson planning using a 4-Pass refinement workflow.',
    fullDescription:
      "The Lesson Planning Assistant (LPA) is a prototype AI system demonstrating how AI can assist K-12 teachers with lesson planning while maintaining teacher-centered pedagogical decision-making. Built with FastAPI, SQLite, and Claude 3.5 Sonnet, it generates standards-aligned lesson plans in 30-60 seconds that teachers refine via a structured 4-Pass Framework. Nine MVP features include pedagogical context input, standards alignment (14 samples), lesson plan generation, student worksheet creation, teacher guide generation, differentiation scaffolds, DOCX export, 4-Pass refinement workflow, and a 5-template library. Delivers 20-25% time savings (1.5-2 hrs/week per teacher), with 75% of plans rated as a 'usable foundation.' Targets 35-45% teacher adoption in Year 1 with a phased rollout: $45K Phase 0 validation, $88.4K Phase 1 pilot, and 18-24 month break-even.",
    category: 'github',
    tags: ['Python', 'FastAPI', 'Claude API', 'K-12 Education', 'SQLite', 'EdTech'],
    link: 'https://github.com/Chaos-6/lesson-planning-assistant',
    metrics: '20-25% Time Savings',
    featured: true,
  },
  {
    id: 'whitepaper-1',
    title: '© SOTA Agentic PRD: PACCA Healthcare AI',
    description:
      'Consolidated PRD v2.5 — Clinical Validation Edition (100-Case Milestone): production-targeted multi-agent platform for clinical prior authorization with observability-driven harness iteration and a statistically-grounded, FDA SaMD-aware clinical-validation roadmap.',
    fullDescription:
      "PACCA (Prior Authorization & Care Coordination Agent Platform) is a production-targeted, multi-agent AI system that automates clinical prior authorization for healthcare payers and providers. Architecture: hierarchical agents — DecisionSupportAgent (Tier 1), MedicalDirectorAgent (Tier 2), EvidenceAggregationAgent, ClinicalClassificationAgent, and a human-governed PolicyEvolutionAgent — on the Claude API, with a FastAPI backend, PostgreSQL 16 JSONB audit log, dual-collection ChromaDB RAG over real clinical guidelines and Medical Director precedent overrides, OpenTelemetry → Langfuse tracing, and JWT/bcrypt auth. A seven-branch deterministic escalation tree with pre-flight safety checks (experimental treatment, rare ICD-10, conflicting guidelines, prior denial, high-cost, pediatric-complex) fires before any LLM call; anti-hallucination is enforced via Claude tool-use and shared CLINICAL_SAFETY_GUIDELINES, with zero-tolerance sparse-notes traps. The v2.2.0 prototype scored 5.0/5.0 across eight engineering dimensions; v2.3 added a six-phase, manifest-bound harness-engineering cycle (after Lin et al., Agentic Harness Engineering, arXiv:2604.25850, 2026) and D9 — Harness Iteration Discipline — producing file-level diffs and verdict logs compliance work can build on. v2.4's defining contribution is a Clinical Validation Strategy aligned to the FDA and IMDRF SaMD clinical-evaluation framework: a three-pillar analytical-and-clinical validation breakdown, a 100-case SME-reviewed golden set passing the dual evaluation gate at 100% (per-case regression detection at 100% single-case sensitivity plus an aggregate ≥80% accuracy gate), binomial-CI statistical-power analysis (n=100 detects ≥10pp performance drops at 80% power), a Cohen's κ ≥ 0.80 inter-rater clinical-review-board process, and an explicit honest-claims matrix separating what the system can defend today from what the 100 → 300 → 500+ dataset roadmap unlocks. It distinguishes engineering maturity from clinical-validation sufficiency by intent — the posture healthcare deployment actually requires. Targets the $50–100B U.S. prior-authorization administrative-overhead market with sub-30-second decisions vs. a 6–12 hour manual baseline; HIPAA-conscious, FDA SaMD-aware change-control from the foundation.",
    category: 'whitepaper',
    tags: ['Claude API', 'Multi-Agent', 'RAG', 'Agentic AI', 'Healthcare', 'HIPAA', 'FDA SaMD', 'Clinical Validation'],
    link: 'https://docs.google.com/document/d/1OifHO-2_0yLzUxKFaKo3kdRDx4Ot0ERyGOsLPSRK4D8/edit?tab=t.0',
    metrics: '100% Eval-Gate Pass (100-case golden set) · SaMD Validation Roadmap',
    featured: true,
  },
  {
    id: 'whitepaper-3',
    title: '© Specification-Driven Design: PACCA Healthcare AI',
    description:
      'Multi-agent orchestration platform with Level 5 Agentic Maturity, deterministic escalation, and anti-hallucination architecture for healthcare prior authorization.',
    fullDescription:
      'Specification-Driven Design (SDD) document for a production clinical agentic AI system, applying four concurrent specification traditions: GitHub Spec-Kit/SPARC intent specification, Agent Behavioral Contracts (ABC, arXiv 2602.22302, 2026) for formal precondition/postcondition/invariant/prohibition contracts per agent, multi-agent Orchestration Protocol Invariants (arXiv 2512.09458) for message schema enforcement and compositionality proofs, and AGENTSAFE/POLARIS governance specification for design-time, runtime, and audit controls. Each of five agents carries a full ContractSpec: preconditions, postconditions, invariants, hard prohibitions (including hallucination prohibition enforced as a scored contract violation), resource bounds, and escalation triggers. Behavioral drift formally specified with detection thresholds, CI gate mechanism, and three-tier response protocol including a no-restart autonomy master switch. Termination conditions specified for all failure modes: API exhaustion, timeout, schema violation, and pre-flight trigger. Multi-agent compositionality theorems prove output-type preservation, pipeline-wide hallucination prohibition, and absorbing pre-flight invariants. HIPAA audit specifications map directly to 45 CFR provisions with verifiable acceptance criteria. Full traceability matrix: 50 REQ-IDs mapped to source artifact and verification test. Demonstrates Staff/Principal-level engineering discipline — specification rigor applied to agentic AI before formal IEEE standards for this domain exist.',
    category: 'whitepaper',
    tags: ['Claude API', 'Agentic AI', 'Healthcare', 'HIPAA', 'FDA SaMD', 'RAG'],
    link: 'https://docs.google.com/document/d/1gQ5x4WcZopXyaDI2an3Udez5hk2z4BVp/edit',
    metrics: 'Level 5 Agentic Maturity',
    featured: true,
  },
  {
    id: 'whitepaper-4',
    title: '© CRISP-AG: Enterprise Agentic AI Governance Framework',
    description:
      'Artifact-centered implementation framework for governed enterprise agentic AI deployment, extending CRISP-DM with agentic-specific phases and four core governance artifacts.',
    fullDescription:
      "CRISP-AG (v2.3, May 2026) is a practitioner white paper proposing an artifact-centered implementation framework for enterprise agentic AI governance. It addresses the gap between management-system standards (ISO/IEC 42001) and risk frameworks (NIST AI RMF) and the operational artifacts teams must actually produce to deploy multi-step, tool-calling, and multi-agent LLM systems safely. CRISP-AG extends CRISP-DM's lifecycle with three agentic-specific phases — Operational Context Assembly, Trust/Governance/Risk Architecture, and Iterative Refinement and Scale — yielding a nine-phase governed lifecycle with explicit decision gates. It formalizes four core artifacts under-specified in current AI governance and MLOps practice: (1) Delegation Authority Scoping (DAS), a five-class autonomy taxonomy with named cross-functional approval and Legal review calibrated per delegation class; (2) Contractor Access Governance (CAG), an explicit Contractor Access Profile that closes the agent-mediated data-access gap in mixed FTE/contractor/vendor workforces; (3) Orchestration Contracts, formal per-sub-agent specifications binding implementation, testing, and audit; and (4) Capability Frontier Classification, a threshold-framed taxonomy for high-risk capabilities. The framework adds first-class output gating as a security defense, coverage-based adversarial test minimums, per-class compressed lifecycle tracks, formula-based ROI guidance with explicit non-summing rationale, and an Appendix B Standards Mapping Matrix aligning every phase and artifact to ISO/IEC 42001, NIST AI RMF, EU AI Act, and OWASP LLM Top-10 controls. Strongest fit: Class 2–3 ReAct and orchestrated multi-agent enterprise systems with tool access; Class 4 code-executing agents require additional sandboxing and red-team validation. Positioned as design propositions and implementation guidance — not yet empirically validated — with an explicit validation agenda for multi-site case studies.",
    category: 'whitepaper',
    tags: ['AI Governance', 'Agentic AI', 'ISO 42001', 'NIST AI RMF', 'Multi-Agent', 'Enterprise'],
    link: 'https://docs.google.com/document/d/1EHvDCwNNVGyLs0m4kevjWabkfby0A8HogpBAbzNp5fI/edit?usp=sharing',
    metrics: '9-Phase Lifecycle',
    featured: true,
  },
  {
    id: 'whitepaper-2',
    title: '© Agentic AI Implementation Guide for K-12 Education',
    description:
      'Comprehensive framework for training teachers on AI management competencies with 619% ROI.',
    fullDescription:
      "Framework translating corporate '201-level AI management' competencies into pedagogical contexts. Establishes six essential teacher competencies: pedagogical context assembly, educational quality judgment, task decomposition, iterative refinement, workflow integration, and capability frontier recognition. Quantified impact: 50-62% time savings across lesson planning, assessment creation, and differentiation (7.4 hrs/week average); 6 weeks of capacity gains per school year. Features FERPA-compliant tiered data framework with three risk levels preventing 85% of privacy violations. Equity-first design includes proactive bias mitigation, multilingual support, and within-district equity monitoring. Implementation: 18-month phased rollout ($130K-$995K); 70% teacher adoption; 619% ROI for medium districts ($1.7M annual capacity value). 15-hour hybrid training curriculum reduces 80% abandonment rate to 20%.",
    category: 'whitepaper',
    tags: ['K-12 Education', 'AI Training', 'FERPA', 'Equity', 'ROI'],
    link: 'https://docs.google.com/document/d/1pA7CIldjqZ7nZRBIjm0OT815TEKRyiaIIvmFPq-Dojk/edit?usp=sharing',
    metrics: '619% ROI',
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
