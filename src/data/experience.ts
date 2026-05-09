/**
 * Career timeline — from the MASTER resume (Apr 2026 revision).
 * Sorted by startDate descending; render order matches the resume.
 *
 * Two roles are concurrent with Interview Kickstart:
 *   - Stealth GenAI Startup (Oct 2023 – Jan 2025, ended)
 *   - Deep Advisors (Jan 2018 – Present, ongoing advisory)
 * Both are kept in the timeline so the full record is visible.
 */

export interface Experience {
  id: string;
  company: string;
  title: string;
  /** Optional progression label (e.g., "→ Sr. Director"). */
  titleProgression?: string;
  /** ISO date string (YYYY-MM-DD). */
  startDate: string;
  /** ISO date string. Null when isCurrent is true. */
  endDate: string | null;
  isCurrent: boolean;
  /** Bulleted achievements, terse, one impact per line. */
  bulletPoints: string[];
}

export const experiences: Experience[] = [
  {
    id: 'ik',
    company: 'Interview Kickstart',
    title: 'Head of AI/ML & Agentic Delivery',
    startDate: '2024-06-01',
    endDate: null,
    isCurrent: true,
    bulletPoints: [
      'Designed, coded, and shipped a production agentic AI evaluation system from scratch (FastAPI + AssemblyAI + Claude + structured-rubric LLM scoring). Processes 100+ live coaching sessions weekly; drove 22% instructor performance lift and 4.71/5.0 NPS across 400+ MAANG-level instructors.',
      'Lead cross-functional delivery team including FAANG subject-matter expert working groups in agentic AI; coordinate architecture reviews, evaluation standards, and curriculum roadmap.',
      'Built a DeepEval-based LLM evaluation suite with instructor-sourced golden test cases, LLM-as-judge scoring, and production quality gates — directly addressing the "ships but can\'t measure" failure mode.',
      'Deployed Open Brain (OB1), a production Model Context Protocol (MCP) knowledge-base server on Supabase: integrates Claude with Drive, Gmail, Calendar, and a seven-category knowledge schema. Working MCP implementation predating broad enterprise adoption.',
      'Researched, specified, designed, built, and tested PACCA v2.2.0, a public multi-agent healthcare prior-authorization platform: PRD + SDD applying four agentic design traditions across FastAPI/ChromaDB/PostgreSQL/React, plus HIPAA compliance docs.',
      '61.4% FAANG placement rate across 10,000+ graduates vs. 5% industry baseline (2024 internal data); Fortune 500 and federal government clients.',
    ],
  },
  {
    id: 'omdena',
    company: 'Omdena',
    title: 'Generative AI Product Manager',
    titleProgression: 'part-time',
    startDate: '2024-01-01',
    endDate: '2025-01-31',
    isCurrent: false,
    bulletPoints: [
      'Led a 71-person distributed GenAI program across 16 time zones with no formal authority — coordinated POC architecture, customer vision, and full product lifecycle for a film-industry GenAI app adopted by industry stakeholders.',
      'Operated through influence and technical credibility rather than reporting structure — pattern applicable to matrixed enterprise AI programs at scale.',
    ],
  },
  {
    id: 'stealth',
    company: 'Stealth GenAI Startup',
    title: 'Principal Performance Architect',
    titleProgression: 'advisory, under NDA',
    startDate: '2023-10-01',
    endDate: '2025-01-31',
    isCurrent: false,
    bulletPoints: [
      'Designed production ML architecture for high-concurrency vector similarity search and LangGraph-based multi-agent orchestration — patterns now standard across the agentic AI ecosystem.',
      'Implemented LLM evaluation pipelines with version control, A/B testing, quality gates, and observability. Designed automated prompt-engineering workflows to scale agent behavior tuning across use cases.',
      'Led technical solutioning for LLM productionization: architecture selection, dependency mapping, risk mitigation, and sequencing under latency and cost constraints.',
    ],
  },
  {
    id: 'microsoft',
    company: 'Microsoft',
    title: 'Principal Technical Program Manager — AI',
    startDate: '2021-07-01',
    endDate: '2023-03-31',
    isCurrent: false,
    bulletPoints: [
      'Owned $7M program budget across an AI initiative portfolio; drove planning, forecasting, and delivery accountability across 10+ engineering and research teams in a highly matrixed organization.',
      'Drove high-priority AI programs across engineering, research, product, compliance, and legal: planning, forecasting, scheduling, dependency management.',
      'Identified and championed early-stage AI capabilities (LLMs, pre-mainstream GenAI features) ahead of enterprise adoption; translated emerging research into product roadmaps and infrastructure to ship at enterprise scale.',
      'Led model performance evaluation for AI features: offline benchmarks, online A/B experiment frameworks, and quality KPIs for LLM-powered enterprise products.',
      'Communicated program goals, status, and trade-offs to senior executives and technical audiences; defined roadmap and long-term strategy in partnership with engineering leadership.',
    ],
  },
  {
    id: 'medalogix',
    company: 'Medalogix',
    title: 'Principal Data Scientist / Senior Director',
    startDate: '2020-11-01',
    endDate: '2021-05-31',
    isCurrent: false,
    bulletPoints: [
      'Owned production AI/ML system delivery end-to-end in a regulated healthcare context: NLP modeling, inference pipelines, data governance, and model lifecycle management under direct business accountability.',
      'Directed a team of 6 data scientists and ML engineers to define, build, and validate production predictive models for critical healthcare outcomes in a regulated clinical environment.',
      'Performed technical AI due diligence contributing to a $250M acquisition — evaluated scalability, model quality, and long-term system maintainability.',
    ],
  },
  {
    id: 'trilogy',
    company: 'Trilogy Education (acquired by 2U)',
    title: 'Lead AI Curriculum Architect / Product Manager',
    startDate: '2019-06-01',
    endDate: '2020-11-30',
    isCurrent: false,
    bulletPoints: [
      'Delivered a $70M cross-functional technical program across six R1 universities (Columbia, Penn, UC Berkeley, UT Austin, UNC, Toronto); managed 100+ stakeholders across engineering, content, operations, legal, and executive leadership.',
      'Led a cross-functional team of 8 (engineers, curriculum architects, operations) across program delivery; managed alignment across 100+ contacts at six R1 universities.',
    ],
  },
  {
    id: 'deep-advisors',
    company: 'Deep Advisors (Independent Practice)',
    title: 'Deep Learning Consultant',
    titleProgression: 'part-time advisory',
    startDate: '2018-01-01',
    endDate: null,
    isCurrent: true,
    bulletPoints: [
      'Delivered 20+ end-to-end AI/ML programs for Fortune 500, federal, healthcare, and R1 university clients — NLP, computer vision, recommendation systems, and GenAI/agentic systems.',
      'Translated business goals into executable ML program plans: scope definition, dependency mapping, risk mitigation, KPI frameworks for use cases with significant ambiguity and regulatory constraints.',
    ],
  },
  {
    id: 'oracle',
    company: 'Oracle Corporation',
    title: 'Senior Technical Director — Data Warehousing / AI',
    startDate: '1997-01-01',
    endDate: '1999-12-31',
    isCurrent: false,
    bulletPoints: [
      'Led a 16-person engineering team to rebuild Amazon\'s middle-tier e-commerce platform on Oracle infrastructure — managed a $1.25M program budget, milestones, and Oracle/Amazon dependencies.',
      'Architectural patterns from that system (real-time behavioral signals, intent modeling, large-scale distributed inference, continuous model improvement) are direct predecessors of modern ads ranking and agentic retrieval systems.',
      'During this engagement: sole inventor of US Patent 6,850,988 — clickstream personalization algorithm foundational to modern recommendation and behavioral-signal systems.',
    ],
  },
  {
    id: 'earlier-career',
    company: 'Earlier Career',
    title: 'Master Technologist · VP Technical Services · Strategist · Graduate Faculty',
    startDate: '1999-01-01',
    endDate: '2018-12-31',
    isCurrent: false,
    bulletPoints: [
      'Master Technologist, Hewlett-Packard — IC-track equivalent to Principal/Distinguished Engineer; global consumer data warehouse architecture.',
      'VP Technical Services, VisionCompass — 125-person offshore software organization.',
      'Strategist / Product Manager, BPM Northwest — AI/ML digital transformation consulting, C-suite advisory.',
      'Graduate faculty: Walden, Capella, Kaplan (2009 – 2018).',
    ],
  },
];
