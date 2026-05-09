/**
 * Site-wide constants used by the SEO component, JSON-LD generators,
 * the RSS feed, and the AuthorCard / Footer. Centralized so updating
 * once cascades to every meta surface.
 */

export const SITE = {
  url: 'https://drdavidreed.com',
  name: 'David Reed, PhD',
  description:
    'Head of AI/ML & Agentic Delivery. Production agentic systems, ML engineering at scale, and writing for senior technical leaders.',
  /** Default share image — used when a page does not provide its own. */
  defaultOgImage: '/og-default.png',
  twitterHandle: undefined, // no Twitter / X presence
  email: 'drdgreed@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/drdgreed/',
  calendlyUrl: 'https://calendly.com/drdgreed/30min',
  language: 'en-US',
} as const;

/**
 * Schema.org Person — emitted as JSON-LD on every page.
 * Recruiters' parsing tooling and Google's knowledge graph stitch
 * mentions across the site to this entity via @id.
 *
 * Credentials encoded as separate CreativeWork / EducationalOccupationalCredential
 * entries so each is independently inspectable.
 */
export const PERSON = {
  '@type': 'Person',
  '@id': `${SITE.url}/#person`,
  name: 'David Reed',
  honorificSuffix: 'PhD, MBA, PMP',
  url: SITE.url,
  jobTitle: 'Head of AI/ML & Agentic Delivery',
  worksFor: {
    '@type': 'Organization',
    name: 'Interview Kickstart',
  },
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'University of Sunderland',
      sameAs: 'https://en.wikipedia.org/wiki/University_of_Sunderland',
      // PhD, Computer Science (2006)
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'Heriot-Watt University, Edinburgh',
      sameAs: 'https://en.wikipedia.org/wiki/Heriot-Watt_University',
      // MBA, Strategic Planning (2000)
    },
    {
      '@type': 'EducationalOrganization',
      name: 'The Wharton School, University of Pennsylvania',
      sameAs: 'https://en.wikipedia.org/wiki/Wharton_School_of_the_University_of_Pennsylvania',
      // Fellow, Strategic E-Commerce
    },
  ],
  hasCredential: [
    {
      '@type': 'CreativeWork',
      name: 'US Patent 6,850,988',
      description:
        'Sole inventor — clickstream personalization algorithm; foundational to Amazon\'s recommendation engine.',
      url: 'https://patents.google.com/patent/US6850988B1/',
    },
    {
      '@type': 'CreativeWork',
      name: 'US Patent 6,839,229',
      description:
        'Co-inventor — large-grained database concurrency with dynamically re-definable business logic.',
      url: 'https://patents.google.com/patent/US6839229B1/',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'PhD, Computer Science',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'MBA, Strategic Planning',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Project Management Professional (PMP)',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Fellow, Strategic E-Commerce — Wharton',
    },
  ],
  email: 'drdgreed@gmail.com',
  sameAs: ['https://www.linkedin.com/in/drdgreed/'],
} as const;
