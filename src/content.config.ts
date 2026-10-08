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
    // Substantive alt text for the cover image, used by the blog template's
    // <img alt>. Required (in spirit) whenever coverImage is set — empty alt
    // is only correct for purely decorative images, which cover graphics
    // typically aren't. Kept optional in the schema so older posts don't
    // break the build; new posts should always provide it.
    coverImageAlt: z.string().optional(),
    // Read time in minutes. We compute it offline and store it in frontmatter
    // so the listing page doesn't need to parse the body to estimate.
    readTime: z.number().int().positive(),
    featured: z.boolean(),
    draft: z.boolean().default(false),
  }),
});

// White-paper series ("Agentic AI Governance in Practice"). Each paper's body
// carries its own title, dek, version line and series nav, so the route only
// adds the page chrome. Frontmatter mirrors the series metadata header.
const papers = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/papers' }),
  schema: z.object({
    title: z.string().min(1),
    subtitle: z.string().min(1),
    series: z.string().min(1),
    seriesPart: z.number().int().positive(),
    code: z.string().min(1),
    version: z.string().min(1),
    date: z.string().regex(/^\d{4}-\d{2}$/),
    author: z.string().min(1),
    description: z.string().min(1).max(300),
    keywords: z.array(z.string()),
    readTime: z.number().int().positive(),
  }),
});

export const collections = { blog, papers };
