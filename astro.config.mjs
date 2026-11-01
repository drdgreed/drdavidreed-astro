// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import tailwindcss from '@tailwindcss/vite';
import rehypeUnpublishedPapers from './src/lib/rehype-unpublished-papers.mjs';

// Production site URL — used by sitemap, RSS, and canonical links.
const SITE = 'https://drdavidreed.com';

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

  // Tailwind 4 through its Vite plugin, the setup Tailwind documents for Astro.
  // The PostCSS route failed under Astro 7's Vite: it resolved
  // `@import 'tailwindcss'` as a file path. (The Vite plugin broke on Vercel in
  // May 2026 under Astro 6; it builds there again under Astro 7.)
  vite: { plugins: [tailwindcss()] },

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/draft/'),
    }),
  ],
});
