// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Production site URL — used by sitemap, RSS, and canonical links.
const SITE = 'https://drdavidreed.com';

// Tailwind is wired in via `postcss.config.mjs` (Astro auto-detects it).
// We avoided @astrojs/tailwind (doesn't support Astro 6) and @tailwindcss/vite
// (rolldown ABI issues breaking Vercel builds). The PostCSS path is the
// boring, stable one.
export default defineConfig({
  site: SITE,

  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/draft/'),
    }),
  ],
});
