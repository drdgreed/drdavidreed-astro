/**
 * Category metadata — labels and descriptions for the four blog categories.
 * Kept here so listing chips, post pages, and any future taxonomy page agree.
 */
import type { BlogCategory } from '../content.config';

export const CATEGORY_META: Record<BlogCategory, { label: string; tagline: string }> = {
  'agentic-ai': {
    label: 'Agentic AI',
    tagline: 'Multi-agent systems, LLM orchestration, evaluation patterns',
  },
  'ml-engineering': {
    label: 'ML Engineering',
    tagline: 'Production ML, infra, observability, scaling',
  },
  career: {
    label: 'Career',
    tagline: 'Senior IC paths, hiring signals, technical leadership',
  },
  'case-study': {
    label: 'Case Study',
    tagline: 'Real-world systems and the lessons from shipping them',
  },
};
