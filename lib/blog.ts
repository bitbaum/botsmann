import { join } from 'node:path';
import { readCollection, readEntry, type CollectionEntry } from 'bip-kit/node';

/**
 * The blog's content collection: markdown files in content/blog/, committed
 * and reviewed like code, read by bip-kit's collection reader. This replaced
 * the runtime GitHub fetching of a separate content repo — no API rate limits,
 * no ISR staleness, no dependency on a renamed GitHub handle redirecting,
 * and generateStaticParams sees every post at build time.
 *
 * A post ships only when its frontmatter says `published: true` (stricter than
 * bip-kit's default, which publishes anything not marked as a draft); anything
 * else stays out of the index and 404s. A `date:` that is not YYYY-MM-DD fails
 * the build and names the file.
 */
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  tags?: string[];
  featuredImage?: string;
}

const CONTENT_DIR = join(process.cwd(), 'content', 'blog');

const isPublished = (entry: CollectionEntry) => entry.meta.published === 'true';

function toPost(entry: CollectionEntry): BlogPost {
  const { featuredImage, excerpt } = entry.meta;
  return {
    slug: entry.slug,
    title: entry.title,
    date: entry.date,
    author: entry.author ?? 'Botsmann Team',
    excerpt: typeof excerpt === 'string' ? excerpt : '',
    content: entry.body,
    tags: entry.tags,
    featuredImage: typeof featuredImage === 'string' && featuredImage ? featuredImage : undefined,
  };
}

/** Published posts, newest first. */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  return readCollection(CONTENT_DIR).filter(isPublished).map(toPost);
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const entry = readEntry(CONTENT_DIR, slug);
  return entry && isPublished(entry) ? toPost(entry) : null;
}
