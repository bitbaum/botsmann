import React, { useState } from 'react';

interface FeaturesSectionProps {
  features: string[];
}

/**
 * Features Section Component
 * 
 * Features section component that displays the key capabilities of Imhotep
 * and how it can benefit different user groups.
 * 
 * @module FeaturesSection
 */
const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features }) => {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  // Enhanced features with detailed explanations
  const enhancedFeatures = [
    {
      title: "Medical Information",
      shortDescription: "Evidence-based health information when you need it",
      icon: "🩺"
    },
    {
      title: "Health Assessments",
      shortDescription: "Personalized analysis of your health concerns",
      icon: "📋"
    },
    {
      title: "Wellness Guidance",
      shortDescription: "Practical advice for everyday health",
      icon: "🍎"
    },
    {
      title: "Medication Information",
      shortDescription: "Understanding your prescriptions better",
      icon: "💊"
    },
    {
      title: "Mental Health Support",
      shortDescription: "Resources for emotional wellbeing",
      icon: "🧠"
    },
    {
      title: "Health Education",
      shortDescription: "Learn about conditions in simple terms",
      icon: "📚"
    }
  ];

  // Advanced upcoming features
  const advancedFeatures = [
    {
      title: "MedBox Integration",
      shortDescription: "Your personal health monitoring device",
      fullDescription: "The MedBox contains sensors that monitor vital signs, sleep patterns, and other health markers, sending real-time data to Imhotep for personalized insights.",
      consumerBenefit: "Get health insights based on your actual body data, not just general advice.",
      icon: "📦"
    },
    {
      title: "Health Regimens",
      shortDescription: "Personalized health plans for your goals",
      fullDescription: "Follow customized health programs like \"Don't Die\" that combine nutrition, exercise, and lifestyle recommendations specifically designed for your needs.",
      consumerBenefit: "Take the guesswork out of staying healthy with step-by-step guidance.",
      icon: "📝"
    },
    {
      title: "Health Professional Connect",
      shortDescription: "Find the right healthcare provider when needed",
      fullDescription: "Connect with qualified doctors, specialists, and other healthcare professionals who can provide in-person care when AI assistance isn't enough.",
      consumerBenefit: "Seamlessly transition from AI advice to human medical care when necessary.",
      icon: "🏥"
    }
  ];

  const toggleFeature = (index: number) => {
    if (expandedFeature === index) {
      setExpandedFeature(null);
    } else {
      setExpandedFeature(index);
    }
  };

  return (
    <section id="features" className="my-16 scroll-mt-24">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Key Features</h2>
      <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
        Imhotep offers these powerful tools to help you manage your health more effectively.
        Click on each feature to learn more.
      </p>
      
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {enhancedFeatures.map((feature, index) => (
          <div key={index} className="relative bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">{feature.icon}</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.shortDescription}</p>
          </div>
        ))}
      </div>
      
      {/* Advanced upcoming features */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Coming Soon</h2>
        <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
          We're working on these exciting features to make healthcare even more personalized and convenient.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {advancedFeatures.map((feature, index) => (
            <div key={index} className="relative">
              <button 
                onClick={() => toggleFeature(index + enhancedFeatures.length)}
                className={`w-full text-left bg-blue-50 p-6 rounded-lg border ${
                  expandedFeature === index + enhancedFeatures.length
                    ? 'border-blue-500 shadow-md' 
                    : 'border-blue-100 shadow-sm hover:shadow-md hover:border-blue-300'
                } transition-all duration-200`}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  Coming Soon
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.shortDescription}</p>
                
                {expandedFeature === index + enhancedFeatures.length && (
                  <div className="mt-4 pt-4 border-t border-blue-200 animate-fadeIn">
                    <h4 className="font-medium text-blue-700 mb-2">What this means for you:</h4>
                    <p className="text-gray-700 mb-3">{feature.fullDescription}</p>
                    <div className="bg-white p-3 rounded-md border border-blue-100">
                      <p className="text-gray-700"><strong>Benefit:</strong> {feature.consumerBenefit}</p>
                    </div>
                  </div>
                )}
                
                <div className={`absolute bottom-3 right-3 text-blue-600 transition-transform duration-200 ${
                  expandedFeature === index + enhancedFeatures.length ? 'transform rotate-180' : ''
                }`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 