/**
 * Content collection schemas.
 *
 * Astro reads this file at build time and validates every MDX/MD file in
 * `src/content/<collection>/` against the corresponding schema. Frontmatter
 * typos surface as build errors; in editors, `post.data.*` is fully typed.
 *
 * Querying:
 *   import { getCollection } from 'astro:content';
 *   const posts = await getCollection('blog', ({ data }) => !data.draft);
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const BLOG_CATEGORIES = [
  'agentic-ai',
  'ml-engineering',
  'career',
  'case-study',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

const blog = defineCollection({
  // v6: every collection must declare a loader. `glob` picks up md/mdx files.
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(1).max(120),
    description: z.string().min(1).max(300),
    category: z.enum(BLOG_CATEGORIES),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    coverImage: z.string().optional(),
    // Read time in minutes. We compute it offline and store it in frontmatter
    // so the listing page doesn't need to parse the body to estimate.
    readTime: z.number().int().positive(),
    featured: z.boolean(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
