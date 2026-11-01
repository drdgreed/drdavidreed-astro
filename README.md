# drdavidreed.com — Astro

Personal site + blog for David Reed, PhD. Migrated from Lovable to Astro for SEO,
performance, and editorial control.

**Stack:** Astro 7 (static) · TypeScript strict · Tailwind 3 + PostCSS · MDX (blog) ·
`@astrojs/sitemap` · `@astrojs/rss` · deployed to Vercel.

---

## Run locally

```bash
npm install
npm run dev    # http://localhost:4321
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Astro dev server with HMR. |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve the built `dist/` |

## Project layout

```
src/
  data/
    profile.ts            ← positioning, credentials, availability
    experience.ts         ← career timeline (resume-sourced)
    skills.ts             ← strong / moderate / gap buckets
    portfolio.ts          ← projects, papers, patents
  content/blog/           ← .mdx posts go here
  content.config.ts       ← blog Zod schema (Astro v6 location + glob loader)
  components/
    SEO.astro             ← per-page meta + JSON-LD Person/Article
    BaseLayout.astro      ← html, sticky nav, footer
    ArticleCard.astro
    AuthorCard.astro
    ExperienceTimeline.astro
    SkillsMatrix.astro
    PullQuote.astro
    InlineCTA.astro
    NewsletterCapture.astro
  layouts/BaseLayout.astro
  lib/
    site-meta.ts          ← SITE + PERSON constants
    seo-types.ts
    categories.ts
  pages/
    index.astro           ← Home (hero)
    experience.astro      ← Timeline + Skills Matrix
    portfolio.astro       ← Bento grid + modal
    blog/index.astro
    blog/[...slug].astro
    rss.xml.js
  styles/global.css       ← @theme tokens + utilities

public/
  logo.png                ← site logo
  og-default.png          ← TODO: replace with a real 1200×630 share image
```

## Retired: Ask AI chat and Fit Check

The "Ask AI About Me" chat drawer and the Fit Check job-description analyzer
were retired in November 2026. Their code and docs are archived in the private
repo `drdgreed/drdavidreed-site-archive` (`ask-ai/`).

## Add a new article

1. Create `src/content/blog/<your-slug>.mdx` with frontmatter:
   ```mdx
   ---
   title: "Your title"
   description: "150–250 char summary used in meta + cards."
   category: "agentic-ai"           # or ml-engineering | career | case-study
   publishDate: 2026-05-09
   updatedDate: 2026-05-12          # optional
   coverImage: "/images/your-cover.png"   # optional, public/ path
   readTime: 9                      # estimated minutes
   featured: false                  # one true post becomes the listing hero
   draft: false
   ---

   Body in Markdown. Component imports work too:

   import PullQuote from '../../components/PullQuote.astro';
   <PullQuote attribution="Optional source">A meaningful quote.</PullQuote>
   ```
2. Drop any cover image into `public/images/`.
3. `npm run dev` → visit `/blog/your-slug/`.
4. (Optional) `npm run astro check` to validate frontmatter.

## Update profile / experience / skills

All hand-edited:
- `src/data/profile.ts` — name, title, pitch, target stages
- `src/data/experience.ts` — career timeline (sorted by date desc)
- `src/data/skills.ts` — strong / moderate / gap buckets
- `src/data/portfolio.ts` — projects, papers, patents
- `src/lib/site-meta.ts` — site URL, contact links, JSON-LD Person schema

## SEO infrastructure

- **Per-page meta** via `<SEO />` in `BaseLayout.astro`. Pages pass
  `title`, `description`, `path`, optional `ogImage` and `articleData`.
- **JSON-LD `Person`** sitewide (sitewide identity for recruiter parsing).
  **JSON-LD `Article`** on blog posts, with `author` / `publisher` refs to
  the Person `@id`.
- **Canonical URLs** absolute, derived from `astro.config.mjs` `site`.
- **Sitemap**: `@astrojs/sitemap` writes `dist/sitemap-index.xml`.
- **RSS**: `src/pages/rss.xml.js` produces `/rss.xml`, auto-discovered via
  `<link rel="alternate">` in `BaseLayout.astro`.
- **`vercel.json`** sets immutable cache for `_astro/*`, RSS content type,
  and security headers.

## Design tokens

Colors and fonts live in `src/styles/global.css` under `@theme`. Tailwind v4
generates utilities automatically. Both explicit tokens (`bg-bg-card`) and
Lovable-style aliases (`bg-card`, `text-foreground`) work.

## Deploy

```bash
# one-time
npx vercel link

# on push to main, Vercel auto-deploys.
# manual deploy:
npx vercel --prod
```

## What's pending

- Replace placeholder `public/og-default.png` (1200×630) with a real share image.
- Wire `NewsletterCapture` to a provider when chosen (Buttondown / ConvertKit / Substack).
- Optional: add real cover images for blog posts in `public/images/`.
