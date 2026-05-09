/**
 * Skills matrix — three-bucket honest assessment.
 *
 * - strong:   "I've shipped this in production multiple times"
 * - moderate: "I've used it in real systems but it's not my home turf"
 * - gap:      "I've read about it / supervised it / haven't shipped it"
 *
 * Sourced from the MASTER resume Tech Stack + the leadership context.
 * Honesty is the differentiator on the page — don't move things up to
 * "strong" unless you've actually shipped them in production.
 */

export type SkillCategory = 'strong' | 'moderate' | 'gap';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
}

export const skills: Skill[] = [
  // ─── Strong: shipped in production multiple times ────────────────
  { id: 's1', name: 'Multi-agent LLM systems', category: 'strong' },
  { id: 's2', name: 'Agentic AI delivery & governance', category: 'strong' },
  { id: 's3', name: 'LLM evaluation (LLM-as-judge, DeepEval)', category: 'strong' },
  { id: 's4', name: 'Retrieval-Augmented Generation (RAG)', category: 'strong' },
  { id: 's5', name: 'Model Context Protocol (MCP)', category: 'strong' },
  { id: 's6', name: 'LangGraph', category: 'strong' },
  { id: 's7', name: 'LangChain', category: 'strong' },
  { id: 's8', name: 'Claude API (Anthropic)', category: 'strong' },
  { id: 's9', name: 'Python (FastAPI, async)', category: 'strong' },
  { id: 's10', name: 'Production ML engineering', category: 'strong' },
  { id: 's11', name: 'Cross-functional delivery (matrixed orgs)', category: 'strong' },
  { id: 's12', name: 'Healthcare-regulated AI (HIPAA)', category: 'strong' },
  { id: 's13', name: 'Senior IC / staff leadership', category: 'strong' },
  { id: 's14', name: '0→1 product delivery', category: 'strong' },
  { id: 's15', name: 'Program & budget ownership ($7M+)', category: 'strong' },
  { id: 's16', name: 'Stakeholder & executive communication', category: 'strong' },

  // ─── Moderate: used in real work, not home turf ──────────────────
  { id: 'm1', name: 'PyTorch', category: 'moderate' },
  { id: 'm2', name: 'TensorFlow', category: 'moderate' },
  { id: 'm3', name: 'scikit-learn', category: 'moderate' },
  { id: 'm4', name: 'Hugging Face', category: 'moderate' },
  { id: 'm5', name: 'GPT-4o / OpenAI APIs', category: 'moderate' },
  { id: 'm6', name: 'Gemini', category: 'moderate' },
  { id: 'm7', name: 'Llama / open-weights models', category: 'moderate' },
  { id: 'm8', name: 'TypeScript / React', category: 'moderate' },
  { id: 'm9', name: 'PostgreSQL', category: 'moderate' },
  { id: 'm10', name: 'ChromaDB', category: 'moderate' },
  { id: 'm11', name: 'Docker', category: 'moderate' },
  { id: 'm12', name: 'AWS (SageMaker, Bedrock, EMR, Kinesis)', category: 'moderate' },
  { id: 'm13', name: 'Azure AI Foundry', category: 'moderate' },
  { id: 'm14', name: 'Google Cloud (Vertex AI)', category: 'moderate' },
  { id: 'm15', name: 'Databricks / PySpark', category: 'moderate' },
  { id: 'm16', name: 'Snowflake', category: 'moderate' },

  // ─── Gaps: read / supervised / haven't shipped ───────────────────
  { id: 'g1', name: 'Distributed training at scale (pre-train / large fine-tune)', category: 'gap' },
  { id: 'g2', name: 'Low-level CUDA / kernel optimization', category: 'gap' },
  { id: 'g3', name: 'iOS / mobile native development', category: 'gap' },
  { id: 'g4', name: 'Graph databases (Neo4j) at production scale', category: 'gap' },
  { id: 'g5', name: 'On-device ML / edge inference deployment', category: 'gap' },
];
