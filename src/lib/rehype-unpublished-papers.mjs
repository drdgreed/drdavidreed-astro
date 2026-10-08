/**
 * Rehype plugin: links to series papers that are not yet published render as
 * plain text instead of 404ing.
 *
 * The series is rolled out hub-first, so the hub cites spokes that do not
 * exist yet. A link to `/papers/<slug>/` stays a link only when
 * `src/content/papers/<slug>.md` exists; adding a paper re-enables every link
 * to it with no edit to the papers that cite it. Scope is that one URL prefix.
 */
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const PAPERS_DIR = fileURLToPath(new URL('../content/papers/', import.meta.url));
const PAPER_LINK = /^\/papers\/([a-z0-9-]+)\/?(#.*)?$/;

function isPublished(href) {
  const m = PAPER_LINK.exec(href);
  return !m || existsSync(`${PAPERS_DIR}${m[1]}.md`);
}

// Inline HTML in the markdown (the series nav and pager) reaches rehype as
// `raw` text, not as elements, so its anchors are rewritten as strings.
const RAW_ANCHOR = /<a href="([^"]*)">([\s\S]*?)<\/a>/g;

function walk(node) {
  if (!node.children) return;
  node.children = node.children.map((child) => {
    if (child.type === 'raw') {
      child.value = child.value.replace(RAW_ANCHOR, (a, href, text) =>
        isPublished(href) ? a : `<span class="unpublished">${text}</span>`);
      return child;
    }
    walk(child);
    const href = child.type === 'element' && child.tagName === 'a' ? child.properties?.href : undefined;
    if (typeof href === 'string' && !isPublished(href)) {
      return { type: 'element', tagName: 'span', properties: { className: ['unpublished'] }, children: child.children };
    }
    return child;
  });
}

export default function rehypeUnpublishedPapers() {
  return (tree) => walk(tree);
}
