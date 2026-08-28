import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchAllGuides } from '@/lib/knowledge';
import { GuideCard, DifficultyBadge } from '@/components/knowledge';
import type { DifficultyLevel, GuideCategory } from '@/types/knowledge';
import { categoryConfig } from '@/types/knowledge';

export const metadata: Metadata = {
  title: 'Guides | Botsmann Knowledge Center',
  description:
    'Step-by-step tutorials for building AI bots, infrastructure setup, and integrations.',
};

interface GuidesPageProps {
  searchParams: Promise<{ difficulty?: string; category?: string }>;
}

export default async function GuidesPage({ searchParams }: GuidesPageProps) {
  const { difficulty, category } = await searchParams;
  const allGuides = await fetchAllGuides();

  // Filter by difficulty if specified
  let guides = allGuides;
  const difficultyFilter = difficulty as DifficultyLevel | undefined;
  const categoryFilter = category as GuideCategory | undefined;

  if (difficultyFilter) {
    guides = guides.filter((g) => g.difficulty === difficultyFilter);
  }

  if (categoryFilter) {
    guides = guides.filter((g) => g.category === categoryFilter);
  }

  const difficulties: DifficultyLevel[] = ['Beginner', 'Intermediate', 'Advanced'];
  const categories = Object.entries(categoryConfig);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/knowledge" className="hover:text-action">
              Knowledge
            </Link>
            <span>/</span>
            <span className="text-gray-900">Guides</span>
          </nav>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">Guides & Tutorials</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Learn to build AI bots, set up infrastructure, and deploy to production with
            step-by-step tutorials for all skill levels.
          </p>
        </div>
      </div>

      {/* Filters and Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-gray-200">
          {/* Difficulty Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Difficulty:</span>
            <div className="flex gap-2">
              <Link
                href="/knowledge/guides"
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  !difficultyFilter
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </Link>
              {difficulties.map((level) => (
                <Link
                  key={level}
                  href={`/knowledge/guides?difficulty=${level}${categoryFilter ? `&category=${categoryFilter}` : ''}`}
                  className={`transition-colors ${
                    difficultyFilter === level ? '' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <DifficultyBadge level={level} size="md" />
                </Link>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Category:</span>
            <div className="flex flex-wrap gap-2">
              <Link
                href={
                  difficultyFilter
                    ? `/knowledge/guides?difficulty=${difficultyFilter}`
                    : '/knowledge/guides'
                }
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  !categoryFilter
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </Link>
              {categories.map(([key, config]) => (
                <Link
                  key={key}
                  href={`/knowledge/guides?category=${key}${difficultyFilter ? `&difficulty=${difficultyFilter}` : ''}`}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors flex items-center gap-1 ${
                    categoryFilter === key
                      ? 'bg-action text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{config.icon}</span>
                  <span>{config.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="ml-auto text-sm text-gray-500">
            {guides.length} {guides.length === 1 ? 'guide' : 'guides'}
          </div>
        </div>

        {/* Guides Grid */}
        {guides.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No guides found</h3>
            <p className="text-gray-600 mb-6">
              {difficultyFilter || categoryFilter
                ? 'Try adjusting your filters to see more guides.'
                : 'Check back soon for new content!'}
            </p>
            {(difficultyFilter || categoryFilter) && (
              <Link
                href="/knowledge/guides"
                className="inline-flex items-center px-4 py-2 bg-action text-white rounded-lg hover:bg-action-hover transition-colors"
              >
                Clear filters
              </Link>
            )}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 rounded-2xl bg-action p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-paper mb-6 max-w-xl mx-auto">
            Can&apos;t find what you&apos;re looking for? Our team is here to help you build your AI
            infrastructure.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-white text-action font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
