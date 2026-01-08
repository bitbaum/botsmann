import React from 'react';

const VisionSection: React.FC = () => {
  return (
    <section id="vision" className="scroll-mt-24 my-20">
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 sm:p-12 text-white">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Vision: Democratizing Financial Expertise</h2>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">The Problem</h3>
            <ul className="space-y-3 text-emerald-50">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span><strong>Gatekept:</strong> Wealth advisors require $100K-$1M minimum assets</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span><strong>Expensive:</strong> Advisory fees: 0.5%-2% AUM ($5K-$20K/year on $1M)</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span><strong>Fragmented:</strong> Managing multiple asset classes requires multiple tools</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">The RichCat Solution</h3>
            <ul className="space-y-3 text-emerald-50">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>AI handles 80%:</strong> Automated analysis, tax optimization, projections</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Human experts for 20%:</strong> Complex cases get matched with CFPs, CPAs</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0 text-emerald-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Total privacy:</strong> Self-host option, or encrypted cloud with your keys</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-3">Why This Matters</h3>
          <p className="text-emerald-50 leading-relaxed">
            90% of Americans can't afford personalized financial advice. They're making critical decisions about retirement, taxes, and investments without expert guidance. Meanwhile, financial advisors spend 60% of their time on routine analysis that AI can automate.
          </p>
          <p className="text-emerald-50 leading-relaxed mt-3">
            RichCat democratizes access to financial expertise while making human advisors more efficient. Everyone wins: individuals get affordable expert guidance, advisors can serve more clients with better outcomes, and the financial services industry becomes more accessible and fair.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
