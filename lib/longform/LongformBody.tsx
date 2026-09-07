import { ArticleBody, setHighlighterLoader } from 'bip-kit/react';
import { MermaidBlock } from 'bip-kit/react/mermaid';
import type { ContentBlock } from 'bip-kit';

/**
 * The server-side long-form body renderer — bip-kit's reference renderer with
 * Botsmann's wiring. Both /blog/[slug] and /knowledge/guides/[slug] render
 * through this component, so the two surfaces can no longer drift.
 *
 * The loader registration below is load-bearing for this app's
 * `output: "standalone"` build (next.config.js): bip-kit's zero-config shiki
 * load goes through a dynamic import that bundlers and Next's file tracer
 * cannot see, so a standalone build would silently ship WITHOUT shiki and
 * render the guides' ~130 code fences as the un-highlighted mono fallback,
 * while dev showed them highlighted. The literal `() => import('shiki')`
 * lives HERE, in our code, where the bundler resolves it into the server
 * chunk. Do not "clean up" this call.
 */
setHighlighterLoader(() => import('shiki'));

export default function LongformBody({ blocks }: { blocks: ContentBlock[] }) {
  return <ArticleBody blocks={blocks} components={{ mermaid: MermaidBlock }} />;
}
