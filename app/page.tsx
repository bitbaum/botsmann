import Link from 'next/link';
import { professionals } from '@/data/professionals';
import { ProfessionalCard } from '@/components/shared/ProfessionalCard';
import { HowItWorks } from '@/components/shared/HowItWorks';
import { PrivacySection } from '@/components/shared/PrivacySection';
import { EnterpriseSection } from '@/components/shared/EnterpriseSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-paper">
      <main className="relative max-w-screen-xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <section className="text-center mb-24 pt-8">
          <div className="inline-flex items-center gap-2 border border-edge bg-surface text-ink-muted px-4 py-1.5 rounded-full text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 bg-action rounded-full" />
            <span>Free to try — no credit card required</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-semibold mb-8 leading-[1.05] tracking-tight text-ink">
            Your Private
            <br />
            <span className="text-action italic">AI Professionals</span>
          </h1>

          <p className="text-xl md:text-2xl text-ink-muted mb-12 max-w-2xl mx-auto leading-relaxed font-sans">
            Considered counsel from AI specialists in law, health, research and more.
            <span className="block mt-2 text-lg">
              Available around the clock. Wholly private. At a fraction of the cost.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link
              href="/try"
              className="group inline-flex items-center justify-center gap-2 bg-action text-white px-8 py-4 rounded-btn text-lg font-semibold shadow-card hover:bg-action-hover hover:shadow-card-hover transition-colors"
            >
              Try Now — Free
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href="#professionals"
              className="group inline-flex items-center justify-center gap-2 border border-edge bg-surface px-8 py-4 rounded-btn text-lg font-semibold text-ink hover:border-action hover:text-action transition-colors"
            >
              Meet Your Professionals
              <svg
                className="w-5 h-5 group-hover:translate-y-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </Link>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-edge rounded-card overflow-hidden border border-edge max-w-4xl mx-auto">
            <div className="bg-surface p-6 text-left">
              <div className="font-serif font-semibold text-ink mb-1">Complete privacy</div>
              <div className="text-sm text-ink-muted">Your data never leaves your control.</div>
            </div>
            <div className="bg-surface p-6 text-left">
              <div className="font-serif font-semibold text-ink mb-1">Always available</div>
              <div className="text-sm text-ink-muted">Expert guidance whenever you need it.</div>
            </div>
            <div className="bg-surface p-6 text-left">
              <div className="font-serif font-semibold text-ink mb-1">Personalised</div>
              <div className="text-sm text-ink-muted">Upload documents for tailored advice.</div>
            </div>
          </div>
        </section>

        {/* Professionals Grid - THE MAIN PRODUCT */}
        <section id="professionals" className="mb-20 scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-semibold mb-4 text-ink">
              Meet Your AI Professionals
            </h2>
            <p className="text-lg text-ink-muted max-w-2xl mx-auto">
              Choose the expert advisor that matches your needs. Each professional brings
              specialized knowledge and a unique approach.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {professionals.map((professional) => (
              <ProfessionalCard key={professional.slug} professional={professional} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/professionals"
              className="inline-flex items-center gap-2 text-action hover:text-action-hover font-medium"
            >
              View All Professionals
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </section>

        {/* How It Works */}
        <div id="how-it-works" className="scroll-mt-24">
          <HowItWorks />
        </div>

        {/* Privacy Section */}
        <PrivacySection />

        {/* Enterprise Section */}
        <EnterpriseSection />
      </main>
    </div>
  );
}

// Static marketing page; generate at build and revalidate periodically.
export const dynamic = 'force-static';
export const revalidate = 3600; // seconds
