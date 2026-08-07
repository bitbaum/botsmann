/**
 * Site Configuration
 *
 * SSOT for site metadata used in layout, meta tags, and throughout the app.
 */

export const site = {
  name: 'Botsmann',
  // ONE headline value prop — must match the hero H1 and footer.
  tagline: 'Your Private AI Professionals',
  description:
    'Private AI that works with your data. Upload documents, ask questions, get answers with citations. Pre-built assistants for legal, medical, research, and more.',
  // Where the site ACTUALLY serves. botsmann.com has no DNS A record, so
  // everything derived from this — canonical URL, og:image, sitemap entries —
  // pointed at a host that does not resolve. Point it back only once that
  // domain is live.
  url: 'https://botsmann.orangecat.ch',
  author: 'Botsmann AI',
  social: {
    github: 'https://github.com/g-but',
    twitter: 'https://twitter.com/AithelionV',
  },
} as const;

export type SiteConfig = typeof site;
