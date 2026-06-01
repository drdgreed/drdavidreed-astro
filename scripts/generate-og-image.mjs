/**
 * Generate the default Open Graph share card → public/og-default.png (1200×630).
 *
 * Why a script (not a checked-in mystery binary): the card mirrors the
 * homepage positioning (name + specialty). When that wording changes,
 * re-run `node scripts/generate-og-image.mjs` and the artifact rebuilds.
 *
 * Rendering path: SVG → PNG via sharp (libvips). Fonts must resolve through
 * the OS (librsvg can't fetch web fonts), so we use Georgia/Helvetica, which
 * approximate the site's Playfair/Inter and ship on macOS + most CI images.
 *
 * Brand tokens mirror tailwind.config.mjs:
 *   bg #000000 · accent #34d399 · text #fafafa / #a1a1aa / #71717a
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public', 'og-default.png');

const W = 1200;
const H = 630;

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="22%" r="75%">
      <stop offset="0%" stop-color="#34d399" stop-opacity="0.16" />
      <stop offset="55%" stop-color="#34d399" stop-opacity="0.04" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Backdrop -->
  <rect width="${W}" height="${H}" fill="#000000" />
  <rect width="${W}" height="${H}" fill="url(#glow)" />

  <!-- Accent rule, top-left -->
  <rect x="80" y="120" width="64" height="5" rx="2.5" fill="#34d399" />

  <!-- Name -->
  <text x="78" y="250" font-family="Georgia, 'Times New Roman', serif"
        font-size="92" font-weight="700" fill="#fafafa">David Reed, PhD</text>

  <!-- Specialty line -->
  <text x="80" y="322" font-family="Helvetica, Arial, sans-serif"
        font-size="44" font-weight="600" fill="#34d399">AI/ML Engineer · Agentic AI Systems</text>

  <!-- Credentials line -->
  <text x="80" y="392" font-family="Helvetica, Arial, sans-serif"
        font-size="29" font-weight="400" fill="#a1a1aa">Production multi-agent architectures · LLM evaluation · RAG · MCP</text>

  <!-- Footer: domain + patents -->
  <rect x="80" y="500" width="40" height="3" rx="1.5" fill="#71717a" />
  <text x="80" y="552" font-family="Helvetica, Arial, sans-serif"
        font-size="28" font-weight="600" fill="#fafafa">drdavidreed.com</text>
  <text x="${W - 80}" y="552" text-anchor="end" font-family="Helvetica, Arial, sans-serif"
        font-size="26" font-weight="400" fill="#71717a">Two US patents · PhD · MBA · PMP</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(OUT);
console.log(`Wrote ${OUT} (${W}×${H})`);
