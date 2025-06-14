import React, { useState } from 'react';

interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

interface FeaturesSectionProps {
  features: FeatureItem[];
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features }) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggle = (index: number) => {
    if (expanded === index) setExpanded(null); else setExpanded(index);
  };

  return (
    <div className="my-16" id="features">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Key Capabilities</h2>
      <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
        Build a private AI node that keeps your confidential documents secure while providing powerful legal insights.
      </p>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="feature-card cursor-pointer"
            onClick={() => toggle(idx)}
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">{f.icon}</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-gray-600 mb-4">{f.description}</p>
            {expanded === idx && (
              <div className="mt-4 pt-4 border-t border-blue-100 animate-fadeIn">
                <p className="text-gray-700 text-sm">Securely deployed for individuals, lawyers, or entire firms with full control over your data.</p>
              </div>
            )}
            <div className="text-blue-600 text-sm mt-3 flex items-center">
              {expanded === idx ? 'Show less' : 'Learn more'}
              <svg className={`w-4 h-4 ml-1 transition-transform ${expanded === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
