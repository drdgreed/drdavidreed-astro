# Deploy runbook — drdavidreed.com

End-to-end procedure to take this codebase from "works on my laptop" to a
publicly accessible site at **https://drdavidreed.com** with working
chat + JD-analyzer endpoints.

Time budget if everything goes smoothly: **~30 minutes of active work**, plus
DNS-propagation wait (5 min – 24 h depending on TTLs).

---

## TL;DR (commands only)

After you have an Anthropic API key, the entire flow is:

```bash
# 1) Local test
cd /Users/davidreed/David_Portfolio/drdavidreed-astro
cp .env.example .env.development.local
# → edit .env.development.local, paste your sk-ant-... key
npx vercel dev                              # http://localhost:3000
                                            # (npx auto-fetches the CLI; no
                                            # global install required)

# 2) Push to GitHub (already authed as Chaos-6)
gh repo create drdavidreed-astro --public \
  --source=. --remote=origin \
  --description "Personal portfolio + blog at drdavidreed.com"
git push -u origin main

# 3) Import on Vercel dashboard:  https://vercel.com/new
#    - Pick Chaos-6/drdavidreed-astro
#    - Add env var: ANTHROPIC_API_KEY = sk-ant-... (all 3 environments)
#    - Click Deploy — wait ~90 s

# 4) Smoke-test the *.vercel.app URL Vercel gives you

# 5) Add custom domain in Vercel → Settings → Domains:
#       drdavidreed.com  (apex, primary)
#       www.drdavidreed.com (redirects to apex)

# 6) Update DNS at your registrar to match what Vercel shows:
#    A      @      76.76.21.21              (or whatever IP Vercel assigns)
#    CNAME  www    cname.vercel-dns.com

# 7) Wait for SSL ✓, verify https://drdavidreed.com works
```

If you've never deployed to Vercel before, skip the TL;DR and follow the full
walkthrough below.

---

## Prerequisites

You need:

- [ ] **macOS / Linux terminal** with `npm`, `git`, and `gh` (GitHub CLI) installed.
      You already have all three; the `gh` CLI is authed as `Chaos-6`.
- [ ] **An Anthropic Console account** at https://console.anthropic.com with at
      least $5 of credit (the chat + JD analyzer cost fractions of a cent per call).
- [ ] **A Vercel account** at https://vercel.com (free Hobby plan is fine for personal sites).
      Sign in with GitHub so it can read your repos.
- [ ] **Access to the DNS panel** for `drdavidreed.com` at whatever registrar holds it.
      You'll need permission to edit `A` and `CNAME` records.

You do **not** need:

- A separate VPS or server — Vercel handles hosting.
- A separate database — content lives in `src/data/*.ts` and `src/content/blog/*.mdx`.
- An SSL certificate — Vercel provisions Let's Encrypt automatically.

---

## Status checklist

Tick each box as you complete it. Keep this doc open in a tab while deploying.

- [x] **Step 0** — Initial commit on `main` (already done)
- [ ] **Step 1** — Get Anthropic API key
- [ ] **Step 2** — Test locally with `vercel dev`
- [ ] **Step 3** — Create GitHub repo + push
- [ ] **Step 4** — Import to Vercel + first deploy
- [ ] **Step 5** — Smoke-test the `*.vercel.app` URL
- [ ] **Step 6** — Add custom domain in Vercel
- [ ] **Step 7** — Update DNS records at registrar
- [ ] **Step 8** — Verify SSL + public access at `https://drdavidreed.com`

---

## Step 0 — Initial commit on `main` ✅ (already done)

A fresh git repo was initialized inside `drdavidreed-astro/` (not a parent
directory), 44 files committed, build verified passing. Verify state with:

```bash
cd /Users/davidreed/David_Portfolio/drdavidreed-astro
git log --oneline -1                # should show the initial commit
git status                          # should show "nothing to commit"
git remote -v                       # should be EMPTY until step 3
```

---

## Step 1 — Get an Anthropic API key

1. Open **https://console.anthropic.com** in your browser.
2. Sign in (or create an account).
3. Pick (or create) a workspace. A solo account ships with one.
4. Optionally: open **Plans & Billing** → add at least $5 of credit and turn on
   auto-reload at $5. New workspaces have small trial credit; running out
   mid-day surfaces as confusing 402 errors.
5. Open **API Keys** → **Create Key**.
6. Name it `drdavidreed.com-prod` (or similar). Naming pays off later — when
   you rotate keys you can revoke the right one.
7. **Copy the key immediately** (starts with `sk-ant-...`). It's only shown
   once. Paste into your password manager **right now**.

> **Cost note**: chat (~500 input + 500 output tokens) is roughly $0.005–0.015
> per turn at Sonnet pricing. Even high traffic stays under $10/month for a
> personal portfolio.

> **Security**: never paste this key into source code, this document, or chat.
> The only places it should ever live are: your password manager, the
> `.env.development.local` file (gitignored), and Vercel's environment-variable
> store (encrypted).

**Done? Move to Step 2.**

---

## Step 2 — Test locally with `vercel dev`

Catches every bug *before* it reaches the public site.

### 2.1 Vercel CLI: use `npx`, don't install globally

You don't need to install Vercel CLI globally. `npx` (which ships with npm)
will fetch and cache the latest version on demand. Verify:

```bash
npx vercel --version       # should print 32.x or higher
                           # first run downloads + caches; subsequent runs are instant
```

> **Why not `npm install -g vercel`?** On macOS where Node was installed via
> the official `.pkg` installer, `/usr/local/lib/node_modules/` is owned by
> `root` and global installs error with EACCES. You can work around with `sudo`,
> but that creates downstream permission tangles when other tools try to write
> there as your user. `npx` is functionally identical and avoids the whole
> issue. If you really want a global install, switch to a Node version
> manager (fnm / nvm / volta) so global packages land in your home directory.

In every command below, substitute `npx vercel` wherever you see `vercel`.

### 2.2 Create the local env file

```bash
cd /Users/davidreed/David_Portfolio/drdavidreed-astro
cp .env.example .env.development.local
```

Open `.env.development.local` in your editor and replace the placeholder with
your real key:

```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> **Why this filename?** Vercel CLI auto-loads `.env.development.local` for
> `vercel dev`. The filename is in our `.gitignore` so the key can never
> reach the repo even if you `git add -A`.

### 2.3 Start the dev server

```bash
npx vercel dev
```

First time only:

- It opens a browser to log into Vercel. Use your GitHub Chaos-6 account.
- Asks "Set up and develop?" → **Yes**.
- Asks which scope (your username or a team). Pick your personal scope.
- Asks "Link to existing project?" → **No** (we haven't created it yet).
- Asks the project name → keep `drdavidreed-astro` (default).
- Asks the code root → `./` (default).
- Auto-detects Astro → accepts default build/dev/install settings.

After setup, you'll see:

```
> Ready! Available at http://localhost:3000
```

A `.vercel/` directory is created with the project link metadata. Already gitignored.

### 2.4 Smoke test

Open each URL in your browser. Each should load cleanly with no console errors.

| URL | What to verify |
|---|---|
| http://localhost:3000/ | Hero with status pill, name, title, "Ask AI" button |
| http://localhost:3000/experience/ | 9-entry timeline + Skills Matrix (Strong/Moderate/Gaps) |
| http://localhost:3000/portfolio/ | Bento grid; click a card → modal opens with full description |
| http://localhost:3000/blog/ | Listing page with the starter article featured |
| http://localhost:3000/blog/production-patterns-multi-agent-llm-systems/ | Article renders with byline, MDX body, related-posts grid |
| http://localhost:3000/fit-check/ | Click "Strong fit JD" example, then "Analyze fit" → wait ~5 s → real verdict from Claude |
| Click **Ask AI** in nav | Drawer opens; click "What's your biggest weakness?" → streaming response |
| http://localhost:3000/sitemap-index.xml | Returns XML |
| http://localhost:3000/rss.xml | Returns RSS XML |

### 2.5 Stop the dev server

When everything works, press `Ctrl+C` in the terminal.

### Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `npm install -g vercel` errors with EACCES | Node installed system-wide as root | Don't install globally — use `npx vercel ...` everywhere instead. See § 2.1. |
| `/api/chat` returns 500 with "ANTHROPIC_API_KEY not configured" | Key not loaded | Verify `.env.development.local` exists and has no extra whitespace; restart `npx vercel dev` |
| `/api/analyze` returns 500 with `auth error` | Invalid key or insufficient credits | Double-check key in Anthropic Console; add credit |
| Chat drawer says "couldn't reach the chat backend" | Network or backend error | Check terminal logs from `npx vercel dev`; the function error appears there |
| Page loads but is unstyled | Tailwind didn't compile | Run `npm install` again, then restart `npx vercel dev` |

**Done? Move to Step 3.**

---

## Step 3 — Create GitHub repo + push

You're already authed as `Chaos-6`. One command does everything:

```bash
cd /Users/davidreed/David_Portfolio/drdavidreed-astro

gh repo create drdavidreed-astro \
  --public \
  --source=. \
  --remote=origin \
  --description "Personal portfolio + blog at drdavidreed.com"

git push -u origin main
```

What this does:

1. `gh repo create` creates `github.com/Chaos-6/drdavidreed-astro` (public, empty).
2. `--source=.` tells `gh` to use the current directory.
3. `--remote=origin` sets the new repo as the `origin` remote in your local clone.
4. `git push -u origin main` uploads the 44 files on the `main` branch.

Verify:
```bash
git remote -v                       # should show origin → github.com/Chaos-6/drdavidreed-astro
gh repo view --web                  # opens the repo in your browser
```

> **Public vs private**: replace `--public` with `--private` if you'd rather
> hide the source. Vercel deploys from either; recruiters often appreciate
> seeing a real engineer's code, so I'd keep it public.

**Done? Move to Step 4.**

---

## Step 4 — Import to Vercel + first deploy

### 4.1 Open the Vercel import page

Go directly to **https://vercel.com/new**.

If this is your first project, Vercel walks you through GitHub OAuth so it can
list your repos. Grant access to the `Chaos-6` organization (or just the
`drdavidreed-astro` repo if you prefer least-privilege).

### 4.2 Import the repo

You'll see a list of repos. Find `Chaos-6/drdavidreed-astro` and click **Import**.

### 4.3 Configure the project

You'll land on a "Configure Project" page. Most fields auto-detect correctly:

| Field | Value |
|---|---|
| Project Name | `drdavidreed-astro` (default) |
| Framework Preset | Astro (auto-detected) |
| Root Directory | `.` (default) |
| Build Command | inherited from `vercel.json` (`npm run build`) |
| Output Directory | inherited from `vercel.json` (`dist`) |
| Install Command | leave default |
| Node.js Version | 22.x (current default) is fine |

### 4.4 Add the environment variable BEFORE deploying

This is the only field that matters and the only one Vercel can't infer.

1. Expand **Environment Variables**.
2. Add a new variable:
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: paste your `sk-ant-...` key
   - **Environments**: leave all three checked (Production, Preview, Development)
3. (Optional) Add `CLAUDE_MODEL` with the value `claude-sonnet-4-5` if you
   want to lock the model version explicitly. Otherwise the default is used.

> **Why all three environments?** Production is the live site. Preview is
> auto-generated for every non-`main` branch and pull request. Development
> is what `vercel dev` uses if you `vercel env pull` later. Leaving all three
> means the function works regardless of which deploy serves it.

### 4.5 Deploy

Click **Deploy**.

Vercel runs:
1. `git clone` of your GitHub repo
2. `npm install`
3. `npm run build` (Astro static build + bundles the `api/*` Edge functions)
4. Uploads `dist/` and the function bundles to Vercel's edge network

First deploy: ~60–90 seconds. You'll watch logs stream live.

When done you'll see "Congratulations 🎉" and a URL like
`drdavidreed-astro-abc123-chaos-6.vercel.app`. Click it.

### Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Build fails at `npm install` | Lockfile mismatch | Locally run `npm install`, commit the updated `package-lock.json`, push |
| Build fails at `npm run build` | TypeScript or Astro error | Check the deploy log; same error you'd see locally with `npm run build`. Fix locally and push. |
| Deploy succeeds but `/api/chat` returns 500 | Env var missing | Go to **Project → Settings → Environment Variables**; verify `ANTHROPIC_API_KEY` is present for Production. Click **Redeploy** on the latest deployment. |
| 404 on `/api/chat` | Function file wasn't recognized | Confirm `api/chat.ts` is at the **repo root** (not under `src/`), and the file is in git (`git ls-files api/`) |

**Done? Move to Step 5.**

---

## Step 5 — Smoke-test the `*.vercel.app` URL

Same checklist as Step 2.4, but at the live Vercel URL. The URL is permanent
for that deployment; future deploys get new URLs but the old one keeps
working too (rollback safety).

| URL on your `*.vercel.app` | Verify |
|---|---|
| `/` | Hero, animations, nav |
| `/experience/` | Timeline + skills |
| `/portfolio/` | Cards + modal |
| `/blog/` | Listing |
| `/blog/production-patterns-multi-agent-llm-systems/` | Article |
| `/fit-check/` | Real Claude verdict on a pasted JD |
| Ask AI button | Streaming chat response |
| `/sitemap-index.xml` | XML returned |
| `/rss.xml` | RSS XML |
| View source on `/` | Search for `application/ld+json` — Person schema should list both patents and all credentials |

### Bonus checks

- Test on mobile (open the URL on your phone). The nav collapses on small
  screens; verify the Ask AI button is still tappable.
- Run https://pagespeed.web.dev/ on the URL. Astro static + zero runtime JS
  on most pages should give you 95+ on Performance and a green "passes"
  on Core Web Vitals.
- Run https://search.google.com/test/rich-results on the article URL.
  It should detect the `Article` schema and the `Person` schema.

**Done? Move to Step 6.**

---

## Step 6 — Add `drdavidreed.com` in Vercel

### 6.1 Open Domains settings

In Vercel: **Project (drdavidreed-astro) → Settings → Domains**.

### 6.2 Add the apex domain

Type `drdavidreed.com` in the input → click **Add**.

### 6.3 Choose redirect direction

Vercel asks: should `www.drdavidreed.com` redirect to `drdavidreed.com`, or
the other way around?

Pick **`drdavidreed.com` (apex) as primary**. Both URLs will resolve, but the
non-`www` form is what gets shared and indexed.

### 6.4 Note the DNS records

Vercel now displays a "DNS Records to add" section. It looks like:

```
Type   Name    Value
A      @       76.76.21.21               ← exact IP shown by Vercel
CNAME  www     cname.vercel-dns.com
```

**Use the exact values Vercel shows you** — they may differ slightly from
the example above. Take a screenshot. You'll need these in the next step.

The status next to your domain will say **"Invalid Configuration"** until
you complete Step 7. That's expected.

**Done? Move to Step 7.**

---

## Step 7 — Update DNS records at your registrar

This is the step where things either go smoothly or get fiddly. The fiddly
part is finding the right DNS panel; once you're there, the changes are
trivial.

### 7.1 Identify the registrar

```bash
whois drdavidreed.com | grep -i "registrar:"
```

Most likely: GoDaddy, Namecheap, Squarespace (formerly Google Domains),
Cloudflare, or AWS Route 53.

### 7.2 Find the DNS panel

| Registrar | Path |
|---|---|
| GoDaddy | My Products → click domain → DNS → Manage DNS |
| Namecheap | Domain List → Manage → Advanced DNS |
| Squarespace | Domains → click domain → DNS Settings |
| Cloudflare | Domain → DNS → Records |
| Route 53 | Hosted zones → drdavidreed.com |

### 7.3 Audit existing records (DO THIS FIRST)

Before changing anything, **screenshot or copy the current records**. You'll
need to identify and KEEP:

- Any `MX` records (your email — Google Workspace, Fastmail, etc. routing)
- Any `TXT` records for `SPF`/`DKIM`/`DMARC` (email auth)
- Any `TXT` records for domain verification (Google, Microsoft, etc.)

You'll be REPLACING:

- The current `A` record on `@` (apex) — currently points to Lovable
- The current `CNAME` on `www` — likely also Lovable

### 7.4 Make the changes

Replace the apex `A` record with Vercel's IP:

```
Type:  A
Name:  @     (or "drdavidreed.com" or blank — depends on registrar UI)
Value: 76.76.21.21      ← USE THE IP VERCEL SHOWED YOU
TTL:   3600 (1 hour) is fine
```

Replace the `www` `CNAME`:

```
Type:  CNAME
Name:  www
Value: cname.vercel-dns.com
TTL:   3600
```

> **TTL tip**: if you can lower TTLs to 300s **a day before** flipping, the
> cutover is fast. For an immediate flip, just go — caches will pick up the
> new records within the old TTL window.

Save the changes.

### 7.5 Verify propagation

In your terminal:

```bash
dig drdavidreed.com +short                # should return Vercel's IP
dig www.drdavidreed.com +short            # should return the cname.vercel-dns.com chain
```

Or use https://dnschecker.org/ to see propagation worldwide.

If the dig still returns the OLD IP, propagation is in progress. Wait
5–15 min and re-run.

**Done (records updated)? Move to Step 8.**

---

## Step 8 — Verify SSL and public access

### 8.1 Wait for Vercel to verify + provision SSL

Back in Vercel → **Project → Settings → Domains**. The status next to
`drdavidreed.com` cycles through:

1. **Invalid Configuration** (DNS hasn't propagated yet from Vercel's vantage)
2. **Valid Configuration / Pending SSL** (DNS verified; Let's Encrypt cert issuing)
3. **Valid Configuration ✅** (SSL provisioned, domain live)

Each transition takes a couple of minutes. Refresh the page or click **Refresh**
next to the domain.

### 8.2 Test in incognito

Open an **incognito / private** window. Visit:

- https://drdavidreed.com → site loads, padlock is green
- https://www.drdavidreed.com → redirects to `https://drdavidreed.com`
- http://drdavidreed.com → redirects to `https://drdavidreed.com` (auto HTTP→HTTPS)

Why incognito? Browser DNS caches and HSTS state can lie about whether DNS
has propagated for *you*. A fresh session is the cleanest test.

### 8.3 Re-run smoke tests on the live domain

Same as Step 5 — but now at `https://drdavidreed.com/...`. Pay special
attention to:

- `/api/chat` works (Ask AI button streams a real response)
- `/api/analyze` works (Fit Check returns a verdict)
- View-source on the home page shows JSON-LD with Person + credentials
- Sitemap and RSS return XML

### 8.4 Set up monitoring (recommended, ~3 min)

- **Vercel Web Analytics**: in Vercel project → Analytics tab → Enable.
  Free for the Hobby plan, gives you a privacy-friendly view of traffic
  without GA cookies.
- **Anthropic usage**: bookmark https://console.anthropic.com/usage. Check
  weekly to catch surprise spikes (= someone hammering your chat endpoint).
- **GitHub Actions email**: ensure GitHub emails you on failed
  deploys (Vercel emails by default; double-check at
  Vercel → Account Settings → Notifications).

**🎉 You're live.**

---

## Post-deploy operations

### Day-to-day: editing content

```bash
cd /Users/davidreed/David_Portfolio/drdavidreed-astro

# 1) Make changes locally — for example, edit experience.ts
$EDITOR src/data/experience.ts

# 2) Test
npm run dev    # http://localhost:4321 — Astro pages only
# OR
npx vercel dev # http://localhost:3000 — Astro + functions

# 3) Commit + push — Vercel auto-deploys on push to main
git add -A
git commit -m "Update experience timeline"
git push
```

A push to `main` triggers a production deploy in ~60 seconds. Vercel emails
you when it lands.

### Branching workflow (for bigger changes)

```bash
git checkout -b new-blog-post
# ... edits ...
git push -u origin new-blog-post
```

Vercel auto-creates a **preview deployment** at a unique URL. Test there
before merging back to `main`.

### Adding a new blog post

See `README.md` → "Add a new article". The frontmatter schema is enforced at
build time; typos break the build before they reach prod.

### Rotating the Anthropic API key

Recommended every 6–12 months, or immediately if you suspect leak.

```bash
# 1) Anthropic Console: create new key (name with date, e.g. "drdavidreed.com-prod-2026-11")
# 2) Vercel: Project → Settings → Environment Variables
#    - Edit ANTHROPIC_API_KEY → paste new value → Save
# 3) Trigger redeploy: Project → Deployments → click "..." on latest → Redeploy
# 4) Verify chat + fit-check still work on production
# 5) Anthropic Console: revoke the OLD key
# 6) (Optional) update .env.development.local locally
```

### Keeping `vercel dev` working after the project is linked

If you blow away `.vercel/` or work from a fresh checkout:

```bash
cd /Users/davidreed/David_Portfolio/drdavidreed-astro
npx vercel link                          # re-creates .vercel/ with the linked project ID
npx vercel env pull .env.development.local  # downloads current env vars
npx vercel dev
```

`npx vercel env pull` fetches the same `ANTHROPIC_API_KEY` you set in the
dashboard, so you don't have to re-paste it.

### Cost monitoring

| Component | Pricing | Expected for personal traffic |
|---|---|---|
| Vercel Hobby | Free up to 100 GB bandwidth/month | $0 |
| Anthropic Claude Sonnet 4.5 | ~$3/M input tokens, ~$15/M output | ~$1–10/month for low-volume chat |
| Domain (drdavidreed.com) | $12–20/year at most registrars | already paid |
| SSL certificate | Free via Let's Encrypt | $0 |

For a portfolio site that gets 1k visitors/month with 5% trying the chat,
expect under $5/month total in Anthropic costs.

---

## Troubleshooting reference

### Build / deploy issues

| Error | Likely fix |
|---|---|
| `LegacyContentConfigError` in build | Astro v6 requires `src/content.config.ts` (not `src/content/config.ts`). Already fixed in this repo; if it returns, check the file location. |
| `Error: ANTHROPIC_API_KEY not configured` in function logs | Env var missing in that environment (Production / Preview / Development). Add via Vercel dashboard, then trigger redeploy. |
| `Error: HTTP 401` from `/api/*` | Invalid key. Re-create key in Anthropic Console, update env var, redeploy. |
| `Error: HTTP 429` from `/api/*` | Rate limit. Wait a minute, retry. If chronic, contact Anthropic to raise rate limit. |
| Build succeeds but pages render blank | Tailwind v4 not loading. Verify `@import "tailwindcss";` is the first line of `src/styles/global.css`. |
| 404 on `/api/chat` in production | Function file wasn't bundled. Confirm `api/chat.ts` exists, is in git, and the file is at repo root (not nested). |

### DNS / domain issues

| Symptom | Cause | Fix |
|---|---|---|
| Vercel keeps showing "Invalid Configuration" hours after DNS change | Old DNS still cached at Vercel's vantage | Wait. DNS propagation is asynchronous; can take up to 24 h for full global. Use https://dnschecker.org/ to inspect. |
| `https://drdavidreed.com` shows a cert error | SSL hasn't provisioned yet | Wait 5–15 min after DNS verifies. If stuck > 1 h, click "Refresh" on the domain in Vercel; if still stuck, contact Vercel support. |
| `https://drdavidreed.com` works but `https://www.drdavidreed.com` doesn't | Missing or wrong CNAME on `www` | Verify the `www` CNAME points to `cname.vercel-dns.com` |
| Email broke after DNS change | You overwrote MX or SPF/DKIM records | Restore those records from your screenshot. Vercel only needs A and CNAME — DON'T touch MX/TXT for email. |

### `vercel dev` issues

| Symptom | Fix |
|---|---|
| `vercel: command not found` | Use `npx vercel ...` instead of `vercel ...` (no global install needed). See § 2.1. |
| Login prompt every time | The `.vercel/` directory may be ignored or wiped. Run `npx vercel link` once. |
| `/api/*` returns 500 in `npx vercel dev` only | Check `.env.development.local` has the key; restart `npx vercel dev` after editing env file (no hot-reload of env). |
| Browser shows old build | Vercel dev caches aggressively. Hard-refresh with `Cmd+Shift+R`. |

### Where to get help

- **Vercel issues**: https://vercel.com/help (good; they reply within hours)
- **Anthropic issues**: https://support.anthropic.com
- **Astro issues**: https://docs.astro.build or https://astro.build/chat (Discord)
- **DNS issues**: your registrar's support — they own the resolver

---

## Appendix A — File map (what lives where)

```
/Users/davidreed/David_Portfolio/drdavidreed-astro/
├── api/                              ← Vercel Edge functions
│   ├── _lib/profile-context.ts       ← Claude grounding context (mirror of resume)
│   ├── chat.ts                       ← POST /api/chat — streaming SSE
│   └── analyze.ts                    ← POST /api/analyze — JD verdict JSON
├── public/                           ← static assets served as-is
│   ├── logo.png
│   ├── favicon.svg
│   └── og-default.png                ← TODO: replace with real 1200×630
├── src/
│   ├── content/blog/                 ← .mdx posts
│   ├── data/                         ← profile, experience, skills, portfolio
│   ├── components/                   ← Astro + React (islands)
│   ├── layouts/BaseLayout.astro      ← html scaffold + nav + footer + AskAIDrawer mount
│   ├── lib/                          ← site-meta, seo-types, categories
│   ├── pages/                        ← file-based routing
│   └── styles/global.css             ← Tailwind v4 @theme tokens + utilities
├── .env.example                      ← template (real key in .env.development.local)
├── .gitignore
├── astro.config.mjs                  ← integrations + site URL + sitemap config
├── package.json
├── tsconfig.json
├── vercel.json                       ← framework + cache headers
├── README.md                         ← project overview, conventions
└── DEPLOY.md                         ← THIS FILE
```

## Appendix B — What changes in production vs. local

| Aspect | `npm run dev` | `vercel dev` | Vercel production |
|---|---|---|---|
| Astro pages | ✅ | ✅ | ✅ static at edge |
| `/api/*` functions | ❌ (404) | ✅ on localhost | ✅ at edge |
| `ANTHROPIC_API_KEY` | n/a (no functions) | from `.env.development.local` | from Vercel env |
| Hot reload | ✅ pages | ✅ pages, functions cold-restart | n/a (it's a deploy) |
| Build optimizations | ❌ | ❌ | ✅ minified, hashed |
| URL | localhost:4321 | localhost:3000 | drdavidreed.com |

Use `npm run dev` for fast iteration on UI/content; use `vercel dev` only
when testing the AI features end-to-end.

---

*Last updated alongside initial deploy. Keep this file in sync with reality —
if a step changes, update the doc in the same commit.*
