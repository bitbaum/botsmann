import { type FC } from 'react';
import Link from 'next/link';

/**
 * Enterprise CTA section for the homepage
 * Targets law firms, medical practices, and businesses
 */
export const EnterpriseSection: FC = () => {
  return (
    <section className="py-20">
      <div className="bg-brand rounded-card p-8 md:p-12 text-paper relative overflow-hidden">
        <div className="relative text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-white/15 px-4 py-1.5 rounded-full text-sm font-medium mb-6 text-paper/80">
            <span className="w-1.5 h-1.5 bg-action rounded-full" />
            <span>For Law Firms, Medical Practices &amp; Businesses</span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4 text-paper">
            AI Professionals for Your Organisation
          </h2>
          <p className="text-lg text-paper/70 mb-8 max-w-2xl mx-auto">
            Deploy private AI assistants on your own infrastructure, answering from your own
            documents.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/enterprise"
              className="bg-action text-white px-8 py-4 rounded-btn font-semibold hover:bg-action-hover transition-colors inline-flex items-center justify-center gap-2"
            >
              Learn About Enterprise
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="border border-white/30 text-paper px-8 py-4 rounded-btn font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              Schedule a Demo
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
