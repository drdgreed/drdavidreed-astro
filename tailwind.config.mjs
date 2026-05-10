/**
 * Tailwind v3 config — design tokens for the site.
 *
 * We previously used Tailwind v4's CSS-first `@theme` directive in
 * global.css. Migrated back to v3 + JS config because the v4 Vite plugin
 * had unresolvable rolldown/vite ABI issues on Vercel.
 *
 * Token names mirror the previous setup so the existing utility classes
 * across all pages keep working:
 *   - Lovable/Shadcn semantic aliases: bg-primary, text-foreground, etc.
 *   - Explicit token names:           bg-bg-primary, text-text-primary, etc.
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        // ── Explicit tokens (preferred for new code) ─────────────
        bg: {
          primary: '#000000',
          card: '#0a0a0a',
        },
        border: {
          // `border-DEFAULT` (= just `border-border`) maps to the subtle gray.
          // We keep the dotted-name shape for compatibility with existing markup.
          DEFAULT: '#1f1f1f',
          subtle: '#1f1f1f',
        },
        accent: {
          DEFAULT: '#34d399',
          dark: '#064e3b',
        },
        text: {
          primary: '#fafafa',
          secondary: '#a1a1aa',
          tertiary: '#71717a',
        },
        warning: '#d97706',

        // ── Lovable / Shadcn semantic aliases (for ported components) ──
        background: '#000000',
        foreground: '#fafafa',
        card: {
          DEFAULT: '#0a0a0a',
          foreground: '#fafafa',
        },
        muted: {
          DEFAULT: '#0a0a0a',
          foreground: '#a1a1aa',
        },
        input: '#0a0a0a',
        ring: '#34d399',
        primary: {
          DEFAULT: '#34d399',
          foreground: '#000000',
          hover: '#2db883',
        },
        secondary: {
          DEFAULT: '#d97706',
          foreground: '#fafafa',
        },
        // Rose / amber etc. for portfolio category badges — Tailwind ships
        // these by default, no need to redeclare.
      },
      fontFamily: {
        serif: [
          'Playfair Display',
          'Georgia',
          'Cormorant Garamond',
          'Times New Roman',
          'serif',
        ],
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgb(52 211 153 / 0.2)' },
          '50%': { boxShadow: '0 0 35px rgb(52 211 153 / 0.35)' },
        },
      },
    },
  },
  plugins: [],
};
