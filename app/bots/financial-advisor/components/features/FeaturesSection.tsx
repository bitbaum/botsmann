import React from 'react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: '📊',
      title: 'Comprehensive Portfolio Analysis',
      description: 'AI analyzes all your assets across stocks, bonds, crypto, real estate, and cash. Get risk metrics, allocation analysis, and rebalancing recommendations.',
      color: 'emerald'
    },
    {
      icon: '💸',
      title: 'Tax Optimization',
      description: 'Identify tax loss harvesting opportunities, optimize asset location across accounts, evaluate Roth conversions, and plan charitable giving strategies.',
      color: 'blue'
    },
    {
      icon: '🎯',
      title: 'Retirement Planning',
      description: 'Monte Carlo simulations project your retirement outcomes with probabilistic forecasting. See success rates, worst/best case scenarios, and sensitivity analysis.',
      color: 'purple'
    },
    {
      icon: '🤝',
      title: 'Human Advisor Matching',
      description: 'AI identifies when you need human expertise (CFP, CPA, estate attorney) and matches you with the right professional. AI prepares all analysis to save advisor time.',
      color: 'amber'
    },
    {
      icon: '🔒',
      title: 'Privacy-First Architecture',
      description: 'Choose self-hosted (total privacy on your hardware), encrypted cloud (convenient but secure), or enterprise deployment. Your financial data, your choice.',
      color: 'gray'
    },
    {
      icon: '🏢',
      title: 'Enterprise White-Label',
      description: 'Wealth management firms can deploy RichCat under their brand. AI automates 80% of routine analysis, letting advisors focus on high-value client work.',
      color: 'indigo'
    }
  ];

  return (
    <section id="features" className="scroll-mt-24 my-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Powerful Features for Every Investor
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          From tax optimization to retirement planning, RichCat provides expert-level financial analysis
          while maintaining complete privacy and security.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Deployment Options */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Three Deployment Options</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-6">
            <div className="text-3xl mb-3">💻</div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Self-Hosted</h4>
            <p className="text-sm text-gray-700 mb-4">
              Run RichCat on your own hardware. Total privacy, your compute, your data never leaves your machine.
            </p>
            <p className="text-xs text-gray-600">
              <strong>Best for:</strong> High-net-worth individuals, privacy-conscious investors
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
            <div className="text-3xl mb-3">☁️</div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Cloud Encrypted</h4>
            <p className="text-sm text-gray-700 mb-4">
              Convenient cloud service with end-to-end encryption. You control the encryption keys, we can't read your data.
            </p>
            <p className="text-xs text-gray-600">
              <strong>Best for:</strong> Most individuals, convenient access from anywhere
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
            <div className="text-3xl mb-3">🏢</div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Enterprise</h4>
            <p className="text-sm text-gray-700 mb-4">
              White-label for wealth management firms. Automate analysis, enhance advisor productivity, improve client outcomes.
            </p>
            <p className="text-xs text-gray-600">
              <strong>Best for:</strong> Wealth management firms, RIAs, family offices
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
