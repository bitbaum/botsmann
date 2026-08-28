import { type Metadata } from 'next';
import Link from 'next/link';
import { professionals } from '@/data/professionals';
import { ProfessionalCard } from '@/components/shared/ProfessionalCard';

export const metadata: Metadata = {
  title: 'AI Professionals | Botsmann',
  description:
    'Meet your AI advisors: legal, health, research, language, creative, and business professionals. Get expert guidance 24/7.',
};

/**
 * Professionals Overview Page
 * Browse all 6 AI professionals
 */
export default function ProfessionalsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-action-tint">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-action rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-action to-action-hover rounded-full opacity-10 blur-3xl" />
      </div>

      <main className="relative max-w-screen-xl mx-auto px-6 py-20">
        {/* Hero */}
        <section className="text-center mb-16 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-ink">Choose Your AI Professional</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Each professional brings specialized knowledge, expert guidance, and a unique approach
            to help you with your specific needs.
          </p>
        </section>

        {/* Filter Tabs (future enhancement - for now just show all) */}
        <div className="flex justify-center gap-2 mb-12">
          <button className="px-4 py-2 rounded-full bg-action text-white font-medium">All</button>
          <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-colors">
            Advisory
          </button>
          <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-colors">
            Creative
          </button>
          <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-colors">
            Research
          </button>
        </div>

        {/* Professionals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {professionals.map((professional) => (
            <ProfessionalCard key={professional.slug} professional={professional} size="large" />
          ))}
        </div>

        {/* CTA Section */}
        <section className="mt-20 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Not Sure Which to Choose?</h2>
            <p className="text-gray-600 mb-6">
              Start a conversation with any professional - they can help direct you to the right
              expert if needed.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/professionals/legal"
                className="inline-flex items-center justify-center gap-2 bg-action text-white px-6 py-3 rounded-xl font-semibold hover:bg-action-hover transition-colors"
              >
                <span>⚖️</span>
                Start with Legal
              </Link>
              <Link
                href="/professionals/health"
                className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
              >
                <span>⚕️</span>
                Start with Health
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export const dynamic = 'force-static';
export const revalidate = 3600;
