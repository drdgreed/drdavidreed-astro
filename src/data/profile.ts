/**
 * Profile data — David Reed's positioning. Pulled from the MASTER and
 * Leadership resume revisions (Apr 2026). Edit when positioning changes;
 * every page that consumes this rebuilds.
 */

export const profile = {
  name: 'David Reed, PhD',
  honorificSuffixes: 'PhD, MBA, PMP', // for resume-style lockups
  title: 'Senior Director, Data Science & AI',
  organization: 'Cushman & Wakefield',

  /**
   * Headline used in the hero, share cards, and Ask-AI system context.
   * Sourced verbatim-flavored from the MASTER resume positioning.
   */
  elevatorPitch:
    'Senior AI/ML leader who designs, codes, and ships production agentic systems — not demos. 35+ years delivering complex platforms; current hands-on work in multi-agent architectures, LLM evaluation, RAG, and Model Context Protocol (MCP). Sole inventor of US Patent 6,850,988 (foundational to Amazon\'s recommendation engine). PhD CS, MBA, PMP, Wharton Fellow.',

  /** Company stages rendered as pills under the hero pitch. */
  availability: {
    targetStages: ['Series B', 'Series C', 'Growth-stage', 'Enterprise'],
  },

  /** Quick-fact bullets for the bio block + Ask-AI grounding. */
  highlights: [
    'Senior Director, Data Science & AI, Cushman & Wakefield (Aug 2026 – Present)',
    'Head of AI/ML & Agentic Delivery, Interview Kickstart (Jun 2024 – Jul 2026)',
    'Ex-Principal TPM-AI, Microsoft ($7M AI program portfolio)',
    'Former HP Master Technologist (IC-track Principal/Distinguished Engineer)',
    'Sole inventor, US Patent 6,850,988 (Amazon recommendation engine predecessor)',
    'Co-inventor, US Patent 6,839,229',
    '$70M cross-functional program at Trilogy/2U across six R1 universities',
    'Led 71-person distributed GenAI program at Omdena across 16 time zones',
    'PhD Computer Science (Sunderland, 2006); MBA (Heriot-Watt, 2000)',
    'PMP, Wharton Fellow (Strategic E-Commerce)',
  ],
} as const;

export type Profile = typeof profile;
