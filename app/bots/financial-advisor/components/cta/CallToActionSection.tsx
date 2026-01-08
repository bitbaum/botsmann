import React from 'react';

interface CallToActionSectionProps {
  getTryLink: () => string;
}

const CallToActionSection: React.FC<CallToActionSectionProps> = ({ getTryLink }) => {
  return (
    <section className="my-20">
      <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 rounded-3xl shadow-2xl overflow-hidden">
        <div className="px-8 py-16 md:px-16 md:py-20 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
            <span className="mr-2">💰</span>
            Join the Waitlist
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Democratize Your Financial Future?
          </h2>
          <p className="text-xl text-emerald-50 mb-10 max-w-3xl mx-auto">
            Be among the first to experience AI-powered financial advisory with complete privacy.
            Whether you want to self-host or use our encrypted cloud service, RichCat adapts to your needs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={getTryLink()}
              className="px-10 py-5 bg-white text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 inline-flex items-center text-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Waitlist
              <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <span className="text-emerald-100 text-sm">Early access • Developer preview in Q1 2025</span>
          </div>

          {/* Value Props */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">🔒</div>
              <div className="text-sm font-semibold text-white mb-1">Privacy First</div>
              <div className="text-xs text-emerald-100">Self-host or encrypted cloud</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">🤖</div>
              <div className="text-sm font-semibold text-white mb-1">AI + Human Experts</div>
              <div className="text-xs text-emerald-100">Best of both worlds</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl mb-2">💡</div>
              <div className="text-sm font-semibold text-white mb-1">Expert-Level Analysis</div>
              <div className="text-xs text-emerald-100">5M financial embeddings</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enterprise CTA */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">
          <strong>Wealth Management Firm?</strong> Learn about our enterprise white-label solution.
        </p>
        <a
          href="mailto:enterprise@botsmann.com"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold"
        >
          Contact Enterprise Sales
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default CallToActionSection;
