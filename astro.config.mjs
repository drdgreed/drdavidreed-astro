// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';

import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypeUnpublishedPapers from './src/lib/rehype-unpublished-papers.mjs';

// Production site URL — used by sitemap, RSS, and canonical links.
const SITE = 'https://drdavidreed.com';

// Tailwind is wired in via `postcss.config.mjs` (Astro auto-detects it).
// We avoided @astrojs/tailwind (doesn't support Astro 6) and @tailwindcss/vite
// (rolldown ABI issues breaking Vercel builds). The PostCSS path is the
// boring, stable one.
export default defineConfig({
  site: SITE,

  // Links to series papers that are not yet published render as plain text.
  // Astro 7 defaults to a Markdown processor without rehype support, so the
  // unified (remark/rehype) processor is selected explicitly to keep the plugin.
  markdown: { processor: unified({ rehypePlugins: [rehypeUnpublishedPapers] }) },

  // Keep Astro 6's HTML-aware whitespace handling. Astro 7's default ('jsx')
  // drops the space between adjacent inline elements, e.g. a title and its
  // version label.
  compressHTML: true,

  // Paper figures are SVG and need no optimization; passthrough avoids a
  // sharp dependency. Revisit if raster images are added to content.
  image: { service: passthroughImageService() },

  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/draft/'),
    }),
  ],
});
