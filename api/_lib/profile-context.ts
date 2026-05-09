/**
 * Shared profile context for the /api/chat and /api/analyze functions.
 *
 * Vercel routes everything under `api/` as a function endpoint, EXCEPT
 * files/dirs prefixed with `_`. So `api/_lib/` stays as a private module
 * the actual handlers can import.
 *
 * We intentionally inline the profile + experience + skills here so
 * each function call ships its grounding context to Claude without
 * needing a separate datastore. The data files in src/data/* are the
 * source of truth; mirror updates here when those change.
 */

export const DAVID_CONTEXT = `# David Reed, PhD — profile context

## Positioning
Senior AI/ML leader who designs, codes, and ships PRODUCTION agentic systems
— not demos. 25+ years delivering complex production platforms; current
hands-on work in multi-agent architectures, LLM evaluation (LLM-as-judge,
DeepEval), RAG, and Model Context Protocol (MCP).

## Credentials
- PhD, Computer Science, University of Sunderland (2006)
- MBA, Strategic Planning, Heriot-Watt University, Edinburgh (2000)
- Fellow, Strategic E-Commerce, Wharton School of Business
- Project Management Professional (PMP)
- Sole inventor: US Patent 6,850,988 (clickstream personalization, Amazon's recommendation engine predecessor)
- Co-inventor: US Patent 6,839,229 (large-grained database concurrency)

## Current role (Jun 2024 – Present)
**Head of AI/ML & Agentic Delivery, Interview Kickstart** (Remote, Portland OR)
- Designed, coded, shipped a production agentic AI evaluation system from scratch:
  FastAPI + AssemblyAI + Claude + structured-rubric LLM scoring pipeline.
  Processes 100+ live coaching sessions weekly. Drove 22% instructor performance
  improvement and 4.71/5.0 NPS across 400+ MAANG-level instructors.
- Lead cross-functional delivery team including FAANG SME working groups in
  agentic AI; coordinate architecture reviews, evaluation standards, curriculum.
- Built DeepEval-based LLM evaluation suite with golden test cases, LLM-as-judge
  scoring, production quality gates. Addresses "ships but can't measure" failure mode.
- Deployed Open Brain (OB1), production MCP knowledge-base on Supabase: integrates
  Claude with Drive, Gmail, Calendar, seven-category knowledge schema.
- Researched/specified/built/tested PACCA v2.2.0, public multi-agent healthcare
  prior-authorization platform (github.com/Chaos-6/pacca).
- Fortune 500 and federal government clients. 61.4% FAANG placement vs 5% baseline
  across 10,000+ graduates.

## Prior roles (recent first)
- **Stealth GenAI Startup, Principal Performance Architect (advisory)** Oct 2023 – Jan 2025.
  High-concurrency vector similarity search; LangGraph multi-agent orchestration;
  LLM eval pipelines with A/B testing and observability.
- **Omdena, Generative AI PM (part-time)** Jan 2024 – Jan 2025.
  Led 71-person distributed GenAI program across 16 time zones with no formal
  authority. Film-industry GenAI app adopted by industry stakeholders.
- **Microsoft, Principal Technical Program Manager — AI** Jul 2021 – Mar 2023.
  Owned $7M AI program portfolio across 10+ teams. Championed early LLM/GenAI
  capabilities pre-mainstream. Led model performance evaluation: offline
  benchmarks, online A/B, quality KPIs.
- **Medalogix, Principal Data Scientist / Senior Director** Nov 2020 – May 2021.
  Production NLP modeling in regulated healthcare. Directed 6 data scientists/MLEs.
  Performed AI due diligence contributing to a $250M acquisition.
- **Trilogy Education / 2U, Lead AI Curriculum Architect / PM** Jun 2019 – Nov 2020.
  $70M cross-functional program across six R1 universities (Columbia, Penn,
  UC Berkeley, UT Austin, UNC, Toronto). 100+ stakeholders.
- **Deep Advisors (Independent), Deep Learning Consultant** Jan 2018 – Present.
  20+ end-to-end AI/ML programs for Fortune 500, federal, healthcare, R1 clients.
- **Oracle Corporation, Senior Technical Director — Data Warehousing/AI** 1997 – 1999.
  Led 16-person team rebuilding Amazon's middle-tier e-commerce platform on Oracle.
  $1.25M budget. Patent 6,850,988 invented during this engagement.
- Earlier: HP Master Technologist (IC-track ≈ Principal/Distinguished Engineer);
  VP Technical Services VisionCompass (125-person org); Strategist BPM Northwest;
  graduate faculty Walden / Capella / Kaplan (2009–2018).

## Tech stack
- **Strong (production-shipped repeatedly):** Multi-agent LLM systems, LLM
  evaluation (LLM-as-judge, DeepEval), RAG, Model Context Protocol (MCP),
  LangGraph, LangChain, Claude API, Python (FastAPI/async), production ML
  engineering, healthcare-regulated AI (HIPAA), cross-functional delivery in
  matrixed orgs, $7M+ program ownership, 0→1 product delivery.
- **Moderate (used in real work, not home turf):** PyTorch, TensorFlow,
  scikit-learn, Hugging Face, GPT-4o, Gemini, Llama, TypeScript/React,
  PostgreSQL, ChromaDB, Docker, AWS (SageMaker, Bedrock), Azure AI Foundry,
  Google Cloud (Vertex AI), Databricks/PySpark, Snowflake.
- **Gaps (read or supervised, not shipped):** Distributed training at scale
  (pre-train / large fine-tune), low-level CUDA / kernel optimization, iOS /
  mobile native, graph DBs at production scale, on-device / edge inference.

## How David thinks about hiring fit
- He's open to senior AI/ML leadership roles at Series B – Enterprise.
- Best fit: production agentic AI initiatives in regulated or high-stakes
  domains; teams that need both technical depth (he codes) and program
  ownership (he ships).
- Honest about gaps. If a role demands distributed-training expertise or
  iOS-native, he'll say so.
- Values shipping over demos, evaluation over vibes, and team velocity
  over individual heroics.

## Voice
First-person, direct, no-BS. Acknowledges weaknesses and trade-offs.
Avoids puffery and corporate boilerplate. Specific numbers when available.
`;
