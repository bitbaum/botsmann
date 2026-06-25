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
            Deploy private AI assistants on your infrastructure. Full data sovereignty, team
            accounts, custom training, and enterprise-grade security.
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

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-paper/60">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>SOC 2 Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"
                />
              </svg>
              <span>On-Premises Available</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
