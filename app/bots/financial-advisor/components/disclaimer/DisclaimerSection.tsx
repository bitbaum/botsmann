import React from 'react';

const DisclaimerSection: React.FC = () => {
  return (
    <section className="my-12">
      <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Important Financial Disclaimer</h3>
            <div className="text-sm text-amber-800 space-y-2">
              <p>
                <strong>RichCat is an educational AI tool, not a registered investment advisor.</strong> The information and analysis provided is for informational purposes only and should not be considered as personalized investment advice, tax advice, or legal advice.
              </p>
              <p>
                <strong>No Guarantees:</strong> Past performance does not guarantee future results. All investments carry risk, including the potential loss of principal. Financial projections and Monte Carlo simulations are probabilistic estimates, not guarantees.
              </p>
              <p>
                <strong>Consult Professionals:</strong> For personalized financial, tax, or legal advice, consult with licensed professionals (CFP, CPA, attorney). RichCat can help connect you with qualified human advisors for complex situations.
              </p>
              <p>
                <strong>Regulatory Compliance:</strong> Financial advice regulations vary by jurisdiction. RichCat aims to comply with all applicable regulations, but users are responsible for ensuring compliance in their specific situation.
              </p>
              <p className="font-semibold mt-3">
                By using RichCat, you acknowledge that AI-provided analysis is educational in nature and you will make financial decisions based on your own judgment or with guidance from licensed professionals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisclaimerSection;
