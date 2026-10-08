# Agent Lessons — drdavidreed-astro

## P-001 · Astro content layer caches rendered markdown across builds
- **Symptom:** a changed rehype plugin had no effect on `/papers/*` output; a link count stayed at its old value after rebuild.
- **Cause:** Astro 6 stores rendered collection entries in `.astro/data-store.json` and reuses them when the source `.md` is unchanged — config/plugin changes do not invalidate it.
- **Rule:** after changing anything in `astro.config.mjs` `markdown`, or a remark/rehype plugin, `rm -rf .astro/data-store.json` before building, and verify against a count you expect to change. (Vercel builds clean, so this bites local verification only.)
