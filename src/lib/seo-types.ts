/**
 * Shared SEO prop types. Lives in a `.ts` file so both BaseLayout.astro
 * and SEO.astro can import the same shape — `.astro` files cannot export
 * named types for cross-component import.
 */

export interface ArticleData {
  headline: string;
  datePublished: string | Date;
  dateModified?: string | Date;
  image?: string;
  description?: string;
}

export type PageType = 'website' | 'article' | 'profile';

export interface SeoProps {
  title: string;
  description?: string;
  /** Page path, e.g. '/blog/some-post'. Combined with SITE.url for canonical. */
  path: string;
  /** Override OG image (absolute URL or site-relative path). */
  ogImage?: string;
  /** When provided, an Article JSON-LD block is emitted alongside Person. */
  articleData?: ArticleData;
  /** Page type — affects og:type and JSON-LD structure. */
  pageType?: PageType;
}
