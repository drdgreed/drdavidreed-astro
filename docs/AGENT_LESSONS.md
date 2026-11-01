# Agent Lessons — drdavidreed-astro

## P-001 · Astro content layer caches rendered markdown across builds
- **Symptom:** a changed rehype plugin had no effect on `/papers/*` output; a link count stayed at its old value after rebuild.
- **Cause:** Astro 6 stores rendered collection entries in `.astro/data-store.json` and reuses them when the source `.md` is unchanged — config/plugin changes do not invalidate it.
- **Rule:** after changing anything in `astro.config.mjs` `markdown`, or a remark/rehype plugin, `rm -rf .astro/data-store.json` before building, and verify against a count you expect to change. (Vercel builds clean, so this bites local verification only.)

## P-002 · A root-owned npm cache silently drops optional packages from the lockfile
- **Symptom:** `npm ci` fails with `Missing: @img/sharp-darwin-arm64@ from lock file` (note the empty version); on Vercel the same lockfile failed as `Invalid Version:`, which is why the lockfile was untracked from May to November 2026.
- **Cause:** parts of `~/.npm` are owned by root (`EACCES` on cache reads). npm skips optional dependencies it cannot fetch and records them without a version, so the lockfile is missing Sharp's platform packages while `npm install` itself exits 0.
- **Rule:** regenerate the lockfile with a clean cache — `npm install --package-lock-only --cache <empty dir>` — then prove it with `npm ci` before committing. A clean exit from `npm install` is not evidence the lockfile is complete. (Permanent fix: `sudo chown -R 501:20 ~/.npm`, run by David.)
