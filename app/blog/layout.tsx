import React from 'react';

/**
 * A bare shell. The `prose prose-gray` wrapper that used to live here was
 * doing two wrong jobs at once: it styled the blog INDEX (a card grid, not
 * prose) and it fought the article renderer for control of article
 * typography. bip-kit's stylesheet now owns the article (`.bp-article`,
 * measured ~70ch, its own vertical rhythm), and each page owns its own
 * container — so the shell stays out of the way.
 */
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-paper">{children}</div>;
}
