/**
 * PostCSS pipeline — Astro discovers this file automatically and runs every
 * CSS file through it during build/dev. We use it to invoke Tailwind v3 and
 * autoprefixer.
 *
 * No Vite plugin involved → no rolldown ABI surface → boring + stable.
 */
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
