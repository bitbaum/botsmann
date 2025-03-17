import React from 'react';

interface RegimensShowcaseProps {
  blueprintLink?: string;
}

/**
 * Health Regimens Showcase Component
 * 
 * This component showcases various health regimens, including Blueprint and
 * customized AI-driven protocols developed by Imhotep.
 * It allows users to compare different approaches and find one that best suits their needs.
 */
const RegimensShowcase: React.FC<RegimensShowcaseProps> = ({ 
  blueprintLink = 'https://blueprint.bryanjohnson.com/' 
}) => {
  // Sample regimen comparison data
  const regimenComparisonData = [
    { name: 'Blueprint', cost: 'High', timeRequired: '3+ hrs/day', complexity: 'High', customization: 'Limited' },
    { name: 'Imhotep Basic', cost: 'Low', timeRequired: '30 min/day', complexity: 'Low', customization: 'High' },
    { name: 'Imhotep Advanced', cost: 'Medium', timeRequired: '1-2 hrs/day', complexity: 'Medium', customization: 'High' },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Personalized Health Regimens</h3>
      <p className="text-gray-600 mb-6">
        Structured protocols tailored to your health goals, time availability, and budget.
        Compare different approaches and receive AI-customized recommendations.
      </p>

      <div className="mb-8">
        <h4 className="text-lg font-semibold mb-3 text-purple-700">Compare Health Approaches</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left text-gray-700">Regimen</th>
                <th className="py-3 px-4 text-left text-gray-700">Cost</th>
                <th className="py-3 px-4 text-left text-gray-700">Time Commitment</th>
                <th className="py-3 px-4 text-left text-gray-700">Complexity</th>
                <th className="py-3 px-4 text-left text-gray-700">Customization</th>
              </tr>
            </thead>
            <tbody>
              {regimenComparisonData.map((regimen, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-3 px-4 border-b border-gray-200 font-medium">{regimen.name}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{regimen.cost}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{regimen.timeRequired}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{regimen.complexity}</td>
                  <td className="py-3 px-4 border-b border-gray-200">{regimen.customization}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold mb-3 text-blue-700">Blueprint Reference</h4>
          <p className="text-gray-600 mb-4">
            Blueprint is Bryan Johnson's comprehensive anti-aging protocol designed to optimize biological systems:
          </p>
          <ul className="list-disc pl-5 text-gray-600 mb-4 space-y-1">
            <li>70+ daily supplements</li>
            <li>Precise meal timings and macronutrient ratios</li>
            <li>Extensive biomarker tracking</li>
            <li>Comprehensive exercise protocol</li>
            <li>Regular medical imaging and testing</li>
          </ul>
          <div className="mt-4">
            <a 
              href={blueprintLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:underline inline-flex items-center"
            >
              Learn about Blueprint
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </a>
          </div>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg">
          <h4 className="text-lg font-semibold mb-3 text-purple-700">Imhotep's AI Personalized Protocol</h4>
          <p className="text-gray-600 mb-4">
            Custom-designed health regimens based on your:
          </p>
          <ul className="list-disc pl-5 text-gray-600 mb-4 space-y-1">
            <li>Health goals and current conditions</li>
            <li>Available time commitment</li>
            <li>Budget considerations</li>
            <li>Dietary preferences and restrictions</li>
            <li>Access to equipment and resources</li>
          </ul>
          <p className="text-sm text-gray-500 mt-4">
            Imhotep analyzes thousands of research papers to create evidence-based protocols that fit your life, not the other way around.
          </p>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-gray-600 mb-1">Coming 2026: Full AI-powered regimen customization with supplement delivery and wearable integration</p>
      </div>
    </div>
  );
};

export default RegimensShowcase; 