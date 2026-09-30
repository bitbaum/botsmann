import { join } from 'node:path';
import { readCollection, readEntry, type CollectionEntry } from 'bip-kit/node';
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
 * content/knowledge/, committed and reviewed like code, read by bip-kit's
 * collection reader (one collection per folder). As on the blog, only
 * `published: true` ships. This replaced the runtime GitHub fetching of a separate content
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

const str = (v: string | string[] | undefined, fallback = ''): string =>
  typeof v === 'string' && v ? v : fallback;

const optStr = (v: string | string[] | undefined): string | undefined =>
  typeof v === 'string' && v ? v : undefined;

const list = (v: string | string[] | undefined): string[] => (Array.isArray(v) ? v : v ? [v] : []);

const isPublished = (entry: CollectionEntry) => entry.meta.published === 'true';

/** Published entries of one folder; a missing folder is empty. */
const readFolder = (dir: string): CollectionEntry[] => readCollection(dir).filter(isPublished);

/** One published entry of a folder by slug (bip-kit only looks up plain names). */
function readPublished(dir: string, slug: string): CollectionEntry | undefined {
  const entry = readEntry(dir, slug);
  return entry && isPublished(entry) ? entry : undefined;
}

const readTime = (entry: CollectionEntry) =>
  str(entry.meta.readTime, `${entry.readingMinutes} min`);

function guideMetadata(entry: CollectionEntry): GuideMetadata {
  const { meta } = entry;
  return {
    slug: entry.slug,
    title: entry.title,
    description: str(meta.description),
    difficulty: str(meta.difficulty, 'Beginner') as DifficultyLevel,
    readTime: readTime(entry),
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
    allGuides.push(...readFolder(join(GUIDES_DIR, difficulty)).map(guideMetadata));
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
  for (const difficulty of DIFFICULTY_DIRS) {
    const entry = readPublished(join(GUIDES_DIR, difficulty), slug);
    if (entry) return { metadata: guideMetadata(entry), content: entry.body };
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

function comparisonGuide(entry: CollectionEntry): ComparisonGuide {
  const { meta } = entry;
  return {
    slug: entry.slug,
    title: entry.title,
    description: str(meta.description),
    difficulty: str(meta.difficulty, 'Intermediate') as DifficultyLevel,
    readTime: readTime(entry),
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
  return readFolder(INFRA_DIR).map(comparisonGuide);
}

/**
 * Fetch a single infrastructure guide by slug
 */
export async function fetchInfrastructureGuideBySlug(
  slug: string,
): Promise<(ComparisonGuide & { content: string }) | null> {
  const entry = readPublished(INFRA_DIR, slug);
  return entry ? { ...comparisonGuide(entry), content: entry.body } : null;
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
