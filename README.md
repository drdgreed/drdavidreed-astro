# drdavidreed.com — Astro

Personal site + blog for David Reed, PhD. Migrated from Lovable to Astro for SEO,
performance, and editorial control.

**Stack:** Astro 6 · TypeScript strict · Tailwind v4 (CSS-first) · React 19 (islands) ·
MDX (blog) · `@astrojs/sitemap` · `@astrojs/rss` · Anthropic SDK · deployed to Vercel.

---

## Run locally

```bash
npm install
npm run dev    # http://localhost:4321 — Astro pages only

# To exercise the /api/* Vercel functions locally:
npx vercel dev # http://localhost:3000 — Astro + functions
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Astro dev server with HMR. Functions return 404 (use `vercel dev` for those). |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve the built `dist/` (no functions) |
| `npx vercel dev` | Astro + Vercel Edge functions — required for `/api/chat` and `/api/analyze` |

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
    AskAIDrawer.tsx       ← React island — chat (calls /api/chat)
    FitCheck.tsx          ← React island — JD analyzer (calls /api/analyze)
    SEO.astro             ← per-page meta + JSON-LD Person/Article
    BaseLayout.astro      ← html, sticky nav, footer, mounts AskAIDrawer
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
    fit-check.astro       ← <FitCheck client:load />
    blog/index.astro
    blog/[...slug].astro
    rss.xml.js
  styles/global.css       ← @theme tokens + utilities

api/                      ← Vercel Edge functions (NOT bundled into static dist/)
  _lib/profile-context.ts ← shared David context for both endpoints
  chat.ts                 ← POST /api/chat — streaming SSE Claude responses
  analyze.ts              ← POST /api/analyze — JD analyzer (Claude tool use)

public/
  logo.png                ← site logo
  og-default.png          ← TODO: replace with a real 1200×630 share image
```

## Vercel functions

Two Edge functions live under `api/`. Both run on Vercel's V8 isolate runtime
(fast cold starts, geographic distribution). Both use the Anthropic SDK and
share `api/_lib/profile-context.ts` for grounding context about David.

### `POST /api/chat` — streaming chat

Request:

```json
{ "messages": [{ "role": "user", "content": "What's your biggest weakness?" }] }
```

Response: `text/event-stream`

```
data: {"text":"My biggest "}
data: {"text":"weakness is..."}
data: [DONE]
```

The `AskAIDrawer` island parses this format. Errors come through as
`data: {"error":"..."}` followed by `[DONE]`.

### `POST /api/analyze` — JD fit assessment

Request:

```json
{ "jobDescription": "Staff Engineer — Real-time collab. Requires..." }
```

Response (200 JSON):

```json
{
  "verdict": "worth_conversation",
  "headline": "Strong leadership match, infra not core depth.",
  "opening": "I've shipped production agentic systems...",
  "gaps": [
    {
      "requirement": "Distributed systems at scale",
      "gap_title": "Pure-play distributed infra",
      "explanation": "I've supervised but not personally shipped..."
    }
  ],
  "transfers": "I bring deep eval-driven dev practice and...",
  "recommendation": "Worth a conversation — let's talk through..."
}
```

Implementation uses Claude tool-use to enforce the JSON shape. The model is
forced to call `submit_fit_check` with the schema; we extract the tool input
and return it directly.

### Required env vars (Vercel project settings)

| Variable | Required | Default | Notes |
| --- | --- | --- | --- |
| `ANTHROPIC_API_KEY` | yes | — | Anthropic console key. Server-side only. |
| `CLAUDE_MODEL` | no | `claude-sonnet-4-5` | Pin to a specific snapshot if you want deterministic behavior. |
| `PUBLIC_CHAT_URL` | no | `/api/chat` | Override if you host the chat backend elsewhere. |
| `PUBLIC_ANALYZE_URL` | no | `/api/analyze` | Override if you host the analyzer elsewhere. |

Set them in the Vercel dashboard:

```bash
# via CLI
vercel env add ANTHROPIC_API_KEY production
vercel env add ANTHROPIC_API_KEY preview
vercel env add ANTHROPIC_API_KEY development   # used by `vercel dev`
```

For local dev with `vercel dev`, also create `.env.development.local`:

```
ANTHROPIC_API_KEY=sk-ant-...
CLAUDE_MODEL=claude-sonnet-4-5
```

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

When you change `src/data/*` or `src/lib/site-meta.ts`, **also mirror the
narrative changes in `api/_lib/profile-context.ts`**. That file is the
grounding context Claude sees on every chat / analyze call. The data files
drive the visual UI; the context file drives the AI's mouth.

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
  no-cache for `/api/*`, and security headers.

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
- Optional: switch to a logged backend (Vercel KV / Postgres) if you want to
  capture chat transcripts for review.
