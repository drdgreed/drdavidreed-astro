// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Production site URL — used by sitemap, RSS, and canonical links.
const SITE = 'https://drdavidreed.com';

export default defineConfig({
  site: SITE,

  vite: {
    plugins: [tailwindcss()],
  },

  // Sitemap is generated at build time. Drafts are excluded by the blog
  // listing logic; the filter below also defends against accidental /draft/
  // routes in the future.
  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/draft/'),
    }),
  ],
});
