import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseContentBlocks, parseFrontmatter, readingTime } from 'bip-kit';
import type {
  Guide,
  GuideMetadata,
  GuideCategory,
  DifficultyLevel,
  GuideFilters,
  ComparisonGuide,
} from '@/types/knowledge';
import { toDateString } from './format';

/**
 * The Knowledge Center's content collection: markdown files under
 * content/knowledge/, committed and reviewed like code (bip-kit's content
 * contract). This replaced the runtime GitHub fetching of a separate content
 * repo — no API rate limits, no ISR staleness, and every guide is visible to
 * generateStaticParams at build time.
 *
 * This module answers "what guides exist and what do they say about
 * themselves". Rendering — blocks, TOC — belongs to lib/longform, which the
 * detail page calls; deriving a second TOC here would be a second source of
 * truth for the same anchors.
 */

const GUIDES_DIR = join(process.cwd(), 'content', 'knowledge', 'guides');
const INFRA_DIR = join(process.cwd(), 'content', 'knowledge', 'infrastructure');
const DIFFICULTY_DIRS = ['beginner', 'intermediate', 'advanced'] as const;

const SLUG_RE = /^[a-z0-9-]+$/i;

const str = (v: string | string[] | undefined, fallback = ''): string =>
  typeof v === 'string' && v ? v : fallback;

const optStr = (v: string | string[] | undefined): string | undefined =>
  typeof v === 'string' && v ? v : undefined;

const list = (v: string | string[] | undefined): string[] => (Array.isArray(v) ? v : v ? [v] : []);

interface ParsedFile {
  meta: Record<string, string | string[]>;
  content: string;
  readTime: string;
}

function readContentFile(path: string): ParsedFile | null {
  let raw: string;
  try {
    raw = readFileSync(path, 'utf8');
  } catch {
    return null;
  }
  const { meta, body } = parseFrontmatter(raw);
  if (meta.published !== 'true') return null;
  // Only for the word count that the index/hero show; the detail page parses
  // again through lib/longform for the blocks it actually renders.
  const blocks = parseContentBlocks(body);
  return {
    meta,
    content: body,
    readTime: `${readingTime(blocks).minutes} min`,
  };
}

function guideMetadata(slug: string, file: ParsedFile): GuideMetadata {
  const { meta } = file;
  return {
    slug,
    title: str(meta.title, slug),
    description: str(meta.description),
    difficulty: str(meta.difficulty, 'Beginner') as DifficultyLevel,
    readTime: str(meta.readTime, file.readTime),
    author: optStr(meta.author),
    publishedAt: str(meta.publishedAt, toDateString()),
    updatedAt: optStr(meta.updatedAt),
    tags: list(meta.tags),
    prerequisites: meta.prerequisites === undefined ? undefined : list(meta.prerequisites),
    icon: optStr(meta.icon),
    category: str(meta.category, 'getting-started') as GuideCategory,
    published: true,
  };
}

/**
 * Fetch all guides from the content collection
 */
export async function fetchAllGuides(): Promise<GuideMetadata[]> {
  const allGuides: GuideMetadata[] = [];

  for (const difficulty of DIFFICULTY_DIRS) {
    let files: string[];
    try {
      files = readdirSync(join(GUIDES_DIR, difficulty)).filter((f) => f.endsWith('.md'));
    } catch {
      continue;
    }
    for (const f of files) {
      const parsed = readContentFile(join(GUIDES_DIR, difficulty, f));
      if (parsed) allGuides.push(guideMetadata(f.replace(/\.md$/, ''), parsed));
    }
  }

  // Sort by date (newest first)
  return allGuides.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

/**
 * Fetch a single guide by slug
 */
export async function fetchGuideBySlug(slug: string): Promise<Guide | null> {
  if (!slug || !SLUG_RE.test(slug)) return null;

  for (const difficulty of DIFFICULTY_DIRS) {
    const parsed = readContentFile(join(GUIDES_DIR, difficulty, `${slug}.md`));
    if (!parsed) continue;
    return {
      metadata: guideMetadata(slug, parsed),
      content: parsed.content,
    };
  }

  return null;
}

/**
 * Fetch guides filtered by difficulty level
 */
export async function fetchGuidesByDifficulty(
  difficulty: DifficultyLevel,
): Promise<GuideMetadata[]> {
  const allGuides = await fetchAllGuides();
  return allGuides.filter((guide) => guide.difficulty === difficulty);
}

/**
 * Fetch guides filtered by category
 */
export async function fetchGuidesByCategory(category: GuideCategory): Promise<GuideMetadata[]> {
  const allGuides = await fetchAllGuides();
  return allGuides.filter((guide) => guide.category === category);
}

/**
 * Fetch guides with multiple filters
 */
export async function fetchGuidesWithFilters(filters: GuideFilters): Promise<GuideMetadata[]> {
  let guides = await fetchAllGuides();

  if (filters.difficulty) {
    guides = guides.filter((g) => g.difficulty === filters.difficulty);
  }

  if (filters.category) {
    guides = guides.filter((g) => g.category === filters.category);
  }

  if (filters.tags && filters.tags.length > 0) {
    guides = guides.filter((g) => filters.tags!.some((tag) => g.tags.includes(tag)));
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    guides = guides.filter(
      (g) =>
        g.title.toLowerCase().includes(searchLower) ||
        g.description.toLowerCase().includes(searchLower) ||
        g.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
    );
  }

  return guides;
}

function comparisonGuide(slug: string, file: ParsedFile): ComparisonGuide {
  const { meta } = file;
  return {
    slug,
    title: str(meta.title, slug),
    description: str(meta.description),
    difficulty: str(meta.difficulty, 'Intermediate') as DifficultyLevel,
    readTime: str(meta.readTime, file.readTime),
    publishedAt: str(meta.publishedAt, toDateString()),
    tags: list(meta.tags),
    category: 'infrastructure',
    published: true,
    comparisonType: str(meta.comparisonType, 'tools') as ComparisonGuide['comparisonType'],
    // `options` is a list of structured ComparisonOption objects — nested
    // records that frontmatter never carried. The gray-matter version read
    // `data.options || []` and every one of the three infrastructure files
    // fell through to `[]`, so this preserves the behaviour exactly rather
    // than inventing a string→object coercion. bip-kit's frontmatter parser
    // is scalars and string lists by design; when these guides grow real
    // options they belong in a typed module, not in YAML.
    options: [],
    recommendation: optStr(meta.recommendation),
  };
}

/**
 * Fetch all infrastructure comparison guides
 */
export async function fetchInfrastructureGuides(): Promise<ComparisonGuide[]> {
  let files: string[];
  try {
    files = readdirSync(INFRA_DIR).filter((f) => f.endsWith('.md'));
  } catch {
    return [];
  }
  const guides: ComparisonGuide[] = [];
  for (const f of files) {
    const parsed = readContentFile(join(INFRA_DIR, f));
    if (parsed) guides.push(comparisonGuide(f.replace(/\.md$/, ''), parsed));
  }
  return guides;
}

/**
 * Fetch a single infrastructure guide by slug
 */
export async function fetchInfrastructureGuideBySlug(
  slug: string,
): Promise<(ComparisonGuide & { content: string }) | null> {
  if (!slug || !SLUG_RE.test(slug)) return null;
  const parsed = readContentFile(join(INFRA_DIR, `${slug}.md`));
  if (!parsed) return null;
  return {
    ...comparisonGuide(slug, parsed),
    content: parsed.content,
  };
}

/**
 * Get unique tags from all guides
 */
export async function fetchAllTags(): Promise<string[]> {
  const guides = await fetchAllGuides();
  const tagSet = new Set<string>();

  for (const guide of guides) {
    for (const tag of guide.tags) {
      tagSet.add(tag);
    }
  }

  return Array.from(tagSet).sort();
}
