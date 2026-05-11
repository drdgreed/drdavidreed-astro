/**
 * /rss.xml — Atom-flavored RSS for the blog.
 *
 * Includes all non-draft posts ordered by publishDate descending.
 * The link in BaseLayout.astro auto-advertises this URL to feed readers.
 */
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../lib/site-meta.ts';

export async function GET(context) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
  );

  return rss({
    title: `${SITE.name} — Writing`,
    description: SITE.description,
    site: context.site ?? SITE.url,
    // Browser-only stylesheet — feed readers ignore this directive.
    // Turns the raw XML into a styled HTML page for humans visiting /rss.xml
    // directly in a browser, while preserving valid RSS for readers.
    stylesheet: '/rss.xsl',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      // v6: post.id replaces removed post.slug.
      link: `/blog/${post.id}/`,
      categories: [post.data.category],
    })),
    customData: `<language>${SITE.language}</language>`,
  });
}
