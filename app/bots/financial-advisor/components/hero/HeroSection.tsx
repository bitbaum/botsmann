import React from 'react';

interface HeroSectionProps {
  title: string;
  overview: string;
  getTryLink: () => string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, overview, getTryLink }) => {
  return (
    <section className="mb-12 sm:mb-16 pt-8 sm:pt-12">
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
        <div>
          <div className="mb-3 sm:mb-4 inline-flex items-center px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs sm:text-sm font-medium">
            <span className="mr-1">🚧</span> Proof of Concept - AI Features in Development
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            {title}: Your AI Financial Advisor
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-4">
            {overview}
          </p>
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
            <p className="text-sm text-emerald-800">
              <strong>Current Status:</strong> Demo UI showcasing our vision. Full AI capabilities with 5M financial embeddings, tax optimization, Monte Carlo simulations, and advisor matching are documented in our <a href="https://github.com/g-but/botsmann/blob/main/app/bots/financial-advisor/README.md" className="underline hover:text-emerald-900" target="_blank" rel="noopener noreferrer">technical roadmap</a>.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a href={getTryLink()} className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors shadow-sm" target="_blank" rel="noopener noreferrer">
              <span>Join Waitlist</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 12h15" />
              </svg>
            </a>
            <a href="#features" className="inline-flex items-center justify-center px-6 py-3 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-semibold rounded-lg transition-colors">
              Explore Features
            </a>
          </div>
        </div>
        <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">RichCat</h3>
              <p className="text-sm text-gray-600">AI Financial Advisor</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded-lg shadow-sm ml-auto max-w-[80%]">
              <p className="text-gray-800 text-sm">How can I help optimize your financial strategy today?</p>
            </div>
            <div className="bg-emerald-50 p-3 rounded-lg shadow-sm max-w-[80%]">
              <p className="text-gray-800 text-sm">I have $200K in crypto gains. How do I minimize taxes in California?</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm ml-auto max-w-[80%]">
              <p className="text-gray-800 text-sm">Let me analyze tax optimization strategies including tax loss harvesting, timing of sales, and potential deductions...</p>
            </div>
          </div>

          {/* Key privacy features */}
          <div className="mt-4 pt-4 border-t border-emerald-200">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="font-medium">Privacy-First:</span>
              <span>Self-host or encrypted cloud</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
