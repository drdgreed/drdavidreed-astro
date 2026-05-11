# Deploy runbook — drdavidreed.com

Operational runbook for the live portfolio at **https://drdavidreed.com**.

This doc assumes the site is already deployed and you're maintaining it. For the
initial deploy history, see git log; for the deferred AI features, see Appendix A.

---

## What's deployed today

| Aspect | Value |
|---|---|
| Live URL | **https://drdavidreed.com** (apex primary) |
| WWW URL | https://www.drdavidreed.com → 308 → apex |
| Stack | Astro 6 (static) · Tailwind 3 + PostCSS · React 19 (unused islands) · MDX |
| Host | Vercel (Hobby plan), project **`drdavidreed-astro-qkw6`** |
| Repo | https://github.com/drdgreed/drdavidreed-astro (public, `main` branch) |
| DNS | IONOS — A `@` → `216.198.79.1`, CNAME `www` → `ef57219ee060f05f.vercel-dns-017.com` |
| SSL | Auto Let's Encrypt via Vercel (auto-renews) |
| CI | Push to `main` → Vercel auto-deploys in ~90 s |
| AI features | **Deferred** — see Appendix A |

---

## Day-to-day: editing content

```bash
cd /Users/davidreed/David_Portfolio/drdavidreed-astro

# 1) Edit content
$EDITOR src/data/experience.ts        # Experience timeline + skills matrix
$EDITOR src/data/portfolio.ts         # Portfolio cards
$EDITOR src/data/profile.ts           # Hero pitch, target stages, availability
$EDITOR src/lib/site-meta.ts          # SITE constants + Person JSON-LD

# 2) Preview locally
npm run dev                            # http://localhost:4321 — fast hot reload

# 3) Build to validate (catches type errors before push)
npm run build                          # ~10–15 s; bails on any error

# 4) Ship
git add -A
git commit -m "Update experience timeline"
git push                               # Vercel deploys in ~90 s
```

Vercel emails you when the production deploy lands.

---

## Adding a new blog post

```bash
# 1) Create the MDX file
$EDITOR src/content/blog/your-slug.mdx
```

Required frontmatter (enforced at build — typos break the build):

```mdx
---
title: "Your title here"
description: "1–2 sentence summary used as meta description + RSS"
publishedAt: 2026-05-15
category: "engineering"          # see src/lib/categories.ts for valid values
tags: ["agents", "production"]
featured: false                  # set true for one current article
---

Body here in MDX. You can import components if needed.
```

```bash
# 2) Preview at http://localhost:4321/blog/your-slug/
npm run dev

# 3) Ship
git add src/content/blog/your-slug.mdx
git commit -m "Add post: <title>"
git push
```

The article auto-appears in:
- `/blog/` listing (sorted by date, featured pinned)
- `/rss.xml`
- `/sitemap-index.xml`
- Related-posts grid on other articles in the same category

---

## DNS reference (IONOS)

> ⚠️ **Email-critical records** — do not touch any of these. Touching them breaks email.

### Vercel records (the ones we own)

| Type | Host | Value | Purpose |
|---|---|---|---|
| A | `@` | `216.198.79.1` | Apex → Vercel edge |
| CNAME | `www` | `ef57219ee060f05f.vercel-dns-017.com` | www subdomain → Vercel (project-scoped CNAME used for ownership verification) |

### Email-stack records (DO NOT TOUCH)

| Type | Host | Service |
|---|---|---|
| MX | `@` (×2) | mx00.ionos.com, mx01.ionos.com |
| TXT | `@` | SPF: `v=spf1 include:_spf-us.ionos.com ~all` |
| CNAME | `s1-ionos._domainkey`, `s2-ionos._domainkey`, `s42582890._domainkey` | DKIM signing |
| CNAME | `_dmarc` | DMARC policy at IONOS |
| CNAME | `autodiscover` | Outlook/iOS Mail autoconfig |
| CNAME | `_domainconnect` | IONOS Domain Connect |

If you ever need to move email off IONOS, those records get swapped — but as a unit, not piecemeal.

### Verifying DNS

```bash
dig +short drdavidreed.com              # → 216.198.79.1
dig +short www.drdavidreed.com          # → CNAME chain ending at Vercel edge
curl -I https://drdavidreed.com         # → HTTP/2 200, server: Vercel
curl -I https://www.drdavidreed.com     # → HTTP/2 308, location: https://drdavidreed.com/
```

Global propagation check: https://www.whatsmydns.net/#A/drdavidreed.com

---

## Environment variables

Currently the deployed site needs **zero** env vars (no API endpoints, no analytics SDK).

The local `.env.development.local` holds an `ANTHROPIC_API_KEY` left over from the
deferred AI features. It's gitignored and unused in production. Leave it for the
day we re-introduce AI features (Appendix A).

---

## Vercel configuration

```jsonc
// vercel.json — installed-as-is on every deploy
{
  "buildCommand": "npm run build",
  "installCommand": "npm install --no-package-lock",   // bypasses upstream lockfile bug
  "outputDirectory": "dist",
  "framework": "astro",
  "trailingSlash": true,                                // /blog → /blog/ everywhere
  "headers": [
    // Site-wide: nosniff, referrer policy, locked-down permissions
    // /_astro/(.*): long cache for hashed assets
    // /rss.xml: short cache + correct MIME
  ]
}
```

> **Why `--no-package-lock`?** A specific Vercel + npm interaction surfaced
> `npm error Invalid Version:` errors during installs that resolved fresh from
> `package.json`. Skipping the lockfile sidesteps it. Re-add the lockfile if/when
> the upstream fix is identified.

---

## Troubleshooting

### Build fails on Vercel

| Symptom | Cause | Fix |
|---|---|---|
| `npm error Invalid Version:` | Lockfile issue | We bypass via `installCommand`. If it returns, check `package.json` for `^` ranges that resolved to a malformed version. |
| `LegacyContentConfigError` | Astro v6 expects `src/content.config.ts` at project root, not `src/content/config.ts` | Move/rename the config file. |
| TypeScript error in MDX frontmatter | Schema mismatch | Check the frontmatter against `src/content.config.ts` |
| Tailwind classes don't apply | PostCSS misconfigured | Verify `postcss.config.mjs` exports both `tailwindcss` and `autoprefixer` plugins |

### Site is live but something's wrong

| Symptom | Likely cause | Fix |
|---|---|---|
| 404 on a page that should exist | Build skipped the route | Check `dist/` after `npm run build` — is the HTML file there? If not, frontmatter or file-naming issue. |
| RSS feed empty | All posts have `featured: false` AND no `publishedAt` | Check frontmatter dates. |
| OG image broken on social previews | Path to image is relative, not absolute | Use absolute URLs starting with `https://drdavidreed.com/...` for share images |
| Mobile nav missing links | Expected — nav collapses on `md:` breakpoint and only shows logo + Book a Call button |

### DNS / SSL

| Symptom | Cause | Fix |
|---|---|---|
| Vercel shows "Invalid Configuration" | DNS hasn't propagated | Wait 5–15 min, click Refresh. Use whatsmydns.net to verify globally. |
| SSL cert error | Provisioning lag | Vercel auto-issues Let's Encrypt within minutes of DNS verifying. If stuck > 1 h, click Refresh in Vercel domains; rare cases need Vercel support ticket. |
| Email stopped working | Accidentally edited an MX or DKIM record in IONOS | Restore the record. The "DNS reference" section above lists every email-critical row. |

### Local dev

```bash
# Hot-reload preview (Astro pages only, no API functions)
npm run dev                              # http://localhost:4321

# Production build smoke test
npm run build                            # outputs to dist/
npm run preview                          # serves dist/ at http://localhost:4321
```

---

## Rolling back a bad deploy

Vercel keeps every previous deploy live at a unique `*.vercel.app` URL. To
promote an older deploy back to production:

1. Vercel dashboard → Project → **Deployments**
2. Find the last known-good deploy (sort by date)
3. Click the **⋯** menu on its row → **Promote to Production**

The custom domain swaps over in seconds. No git work required.

For a git-side rollback (preferred if you want main to reflect reality):

```bash
git revert <bad-commit-sha>
git push
```

Vercel auto-deploys the revert.

---

## File map

```
drdavidreed-astro/
├── src/
│   ├── pages/                       file-based routes
│   │   ├── index.astro              /  (hero + CTAs)
│   │   ├── experience.astro         /experience/
│   │   ├── portfolio.astro          /portfolio/
│   │   ├── blog/
│   │   │   ├── index.astro          /blog/  (listing)
│   │   │   └── [slug].astro         /blog/<slug>/  (article template)
│   │   └── rss.xml.ts               /rss.xml
│   ├── content/blog/                MDX articles
│   ├── content.config.ts            blog frontmatter schema
│   ├── components/                  Astro + React components
│   │   ├── AskAIDrawer.tsx          ⚠️ preserved, unused (see Appendix A)
│   │   └── FitCheck.tsx             ⚠️ preserved, unused (see Appendix A)
│   ├── layouts/BaseLayout.astro     html scaffold, nav, footer, SEO
│   ├── data/                        profile, experience, portfolio, skills
│   ├── lib/                         site-meta, seo-types, categories
│   └── styles/global.css            Tailwind directives + design tokens
├── public/                          static assets (favicon, logo, og-default)
├── api/                             ⚠️ gitignored — see Appendix A
├── astro.config.mjs                 integrations: react, mdx, sitemap
├── postcss.config.mjs               Tailwind via PostCSS
├── tailwind.config.mjs              theme tokens, content globs
├── vercel.json                      build + install + headers
└── package.json                     no scripts beyond standard astro ones
```

---

## Appendix A — Re-introducing AI features (deferred)

The original plan included two AI features that are removed from the live site
but preserved on disk:

| Feature | Component | Endpoint |
|---|---|---|
| "Ask AI About Me" drawer | `src/components/AskAIDrawer.tsx` | `api/chat.ts` (streaming SSE) |
| Fit Check JD analyzer | `src/components/FitCheck.tsx` | `api/analyze.ts` (JSON verdict) |

### Why they're not deployed today

Top-level `api/` directory + Astro v6 **without** the `@astrojs/vercel` adapter
doesn't route Vercel functions reliably. We diagnosed this by deploying a
five-line `api/ping.ts` hello-world — it timed out at 300 s with no console
output, proving the bug is infrastructure, not Anthropic SDK code.

### What to do when re-introducing

1. **Install the Vercel adapter:**

   ```bash
   npx astro add vercel
   ```

   This:
   - Adds `@astrojs/vercel` to dependencies
   - Modifies `astro.config.mjs` to set `adapter: vercel()` and `output: 'server'` (or `'hybrid'`)
   - Wires up Vercel's runtime properly

2. **Move handlers into Astro's endpoint convention:**

   ```
   api/chat.ts      →    src/pages/api/chat.ts
   api/analyze.ts   →    src/pages/api/analyze.ts
   api/_lib/...     →    src/lib/server/...  (or wherever fits)
   ```

   In Astro, an endpoint is just a `.ts` file under `src/pages/` exporting
   `GET`/`POST` functions. The adapter packages each as a Vercel function.

3. **Re-mount the React islands in `BaseLayout.astro`:**

   - Add `<AskAIDrawer client:load />` mount (and the trigger button)
   - Add `/fit-check/` route as `src/pages/fit-check.astro`

4. **Add the env var in Vercel:** `ANTHROPIC_API_KEY` for Production + Preview.

5. **Remove `api/` from `.gitignore`** (or just delete the top-level `api/`
   since handlers now live in `src/pages/api/`).

6. **Verify end-to-end before pushing:** `npm run build` should produce both
   static pages AND function bundles in `.vercel/output/`.

The `AskAIDrawer.tsx` and `FitCheck.tsx` components are kept on disk because
they encode the streaming UI + UX, which is the non-trivial part. Swapping the
fetch URLs to the new Astro endpoint paths is the only client-side change.

---

## Appendix B — Cost & monitoring

| Component | Pricing | Expected |
|---|---|---|
| Vercel Hobby | Free up to 100 GB bandwidth/month | $0 |
| Domain (drdavidreed.com, IONOS) | ~$15/year | already paid |
| SSL certificate | Free via Let's Encrypt | $0 |
| Anthropic API (when AI features return) | ~$3/M input, ~$15/M output tokens | $1–10/month at low volume |

**Enable Vercel Web Analytics**: Project → Analytics tab → Enable. Privacy-
friendly, no cookies, free on Hobby.

**SEO monitoring**: submit `https://drdavidreed.com/sitemap-index.xml` to Google
Search Console and Bing Webmaster Tools after the first week. Check weekly for
the first month to catch indexing issues early.

---

## Appendix C — Useful commands

```bash
# Domain + SSL health
curl -I https://drdavidreed.com
dig +short drdavidreed.com

# Production smoke test (run on any major content change)
curl -s https://drdavidreed.com | grep -oE '<title>[^<]*</title>'
curl -s https://drdavidreed.com/rss.xml | head -5
curl -s https://drdavidreed.com/sitemap-index.xml | head -5

# Git state check
git log --oneline -5
git status

# What's in the latest build?
ls -la dist/
ls -la dist/blog/

# Latest deployments
npx vercel ls drdavidreed-astro-qkw6
```

---

*Updated after initial deploy stabilized. Keep this doc in sync with reality — if
you change vercel.json, DNS, or the file layout, edit this file in the same
commit.*
