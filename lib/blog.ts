import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseFrontmatter } from 'bip-kit';

/**
 * The blog's content collection: markdown files in content/blog/, committed
 * and reviewed like code (bip-kit's content contract). This replaced the
 * runtime GitHub fetching of a separate content repo — no API rate limits,
 * no ISR staleness, no dependency on a renamed GitHub handle redirecting,
 * and generateStaticParams sees every post at build time.
 *
 * A post ships when its frontmatter says `published: true`; anything else
 * stays out of the index and 404s, exactly like the old remote flow.
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

const asList = (v: string | string[] | undefined): string[] =>
  Array.isArray(v) ? v : v ? [v] : [];

function readPost(file: string): BlogPost | null {
  const raw = readFileSync(join(CONTENT_DIR, file), 'utf8');
  const { meta, body } = parseFrontmatter(raw);
  if (meta.published !== 'true') return null;

  const slug = file.replace(/\.md$/, '');
  return {
    slug,
    title: typeof meta.title === 'string' && meta.title ? meta.title : slug,
    date: typeof meta.date === 'string' ? meta.date : '',
    author: typeof meta.author === 'string' && meta.author ? meta.author : 'Botsmann Team',
    excerpt: typeof meta.excerpt === 'string' ? meta.excerpt : '',
    content: body,
    tags: asList(meta.tags),
    featuredImage:
      typeof meta.featuredImage === 'string' && meta.featuredImage ? meta.featuredImage : undefined,
  };
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  let files: string[];
  try {
    files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));
  } catch {
    return [];
  }
  return files
    .map(readPost)
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  // Slugs come from the URL; only plain names may reach the filesystem.
  if (!slug || !/^[a-z0-9-]+$/i.test(slug)) return null;
  try {
    return readPost(`${slug}.md`);
  } catch {
    return null;
  }
}
