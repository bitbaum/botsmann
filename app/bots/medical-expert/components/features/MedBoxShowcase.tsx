import React from 'react';

/**
 * MedBox showcase component
 * 
 * Highlights the comprehensive home health lab capabilities of MedBox,
 * which brings clinical-grade diagnostics into the home and integrates
 * with AI analysis to automate healthcare monitoring and reduce the need
 * for in-person medical visits.
 */
const MedBoxShowcase: React.FC = () => {
  // Core sensors and measurement devices included in MedBox
  const sensors = [
    { name: "Continuous Glucose Monitor", description: "Real-time blood glucose tracking without finger pricks", icon: "📈" },
    { name: "12-Lead ECG Monitor", description: "Clinical-grade heart monitoring and arrhythmia detection", icon: "❤️" },
    { name: "Blood Chemistry Analyzer", description: "Complete blood count, lipid panels, and metabolic testing", icon: "🧪" },
    { name: "Blood Pressure System", description: "Continuous monitoring with physician-grade accuracy", icon: "🩸" },
    { name: "Sleep & Recovery Monitor", description: "Tracks deep sleep, REM, HRV, and respiratory patterns", icon: "😴" },
    { name: "Body Composition Scanner", description: "Measures muscle mass, visceral fat, and bone density", icon: "⚖️" }
  ];
  
  // Lab tests that can be performed at home with MedBox
  const homeLabTests = [
    "Comprehensive Metabolic Panel",
    "Complete Blood Count",
    "Lipid Panel",
    "Thyroid Function",
    "Hormonal Assays",
    "Vitamin & Mineral Levels",
    "Inflammation Markers",
    "Gut Microbiome Analysis"
  ];

  return (
    <section id="medbox" className="my-16 scroll-mt-24 bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-xl">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">MedBox: Your Home Health Laboratory</h2>
        <p className="text-gray-700 text-center mb-8">
          Bringing clinical-grade diagnostics into your home, MedBox automates health monitoring and 
          puts the power of a medical lab at your fingertips
        </p>

        <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
          <div className="md:w-1/2">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 aspect-square flex items-center justify-center">
              <div className="relative">
                <div className="w-48 h-48 bg-green-100 rounded-lg flex items-center justify-center border-4 border-white shadow-md">
                  <span className="text-6xl">📦</span>
                </div>
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs animate-pulse">
                  <span>❤️</span>
                </div>
                <div className="absolute -bottom-3 -left-3 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-xs animate-pulse delay-300">
                  <span>🩸</span>
                </div>
                <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs animate-pulse delay-700">
                  <span>🧪</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">A Complete Laboratory In Your Home</h3>
            <p className="text-gray-700 mb-4">
              MedBox revolutionizes healthcare by bringing clinical diagnostics into your home. Using microfluidics, 
              lab-on-chip technology, and AI analysis, MedBox enables you to perform tests that once required 
              hospital visits and expensive lab equipment.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-green-600 mr-2 mt-1">✓</span>
                <span className="text-gray-700">Run comprehensive lab tests from your home with minimal training</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 mt-1">✓</span>
                <span className="text-gray-700">AI automatically analyzes results and alerts physicians when needed</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 mt-1">✓</span>
                <span className="text-gray-700">Continuous monitoring for early detection of health issues</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 mt-1">✓</span>
                <span className="text-gray-700">Reduce doctor visits by up to 60% through remote monitoring</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 mt-1">✓</span>
                <span className="text-gray-700">Healthcare providers receive organized, analyzed data for review</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Core Health Sensors</h3>
            <div className="grid grid-cols-1 gap-4">
              {sensors.map((sensor, index) => (
                <div key={index} className="flex items-start p-3 border-l-4 border-green-400 bg-green-50 rounded-r-lg">
                  <div className="mr-3 text-xl">{sensor.icon}</div>
                  <div>
                    <h4 className="font-medium text-gray-900">{sensor.name}</h4>
                    <p className="text-sm text-gray-600">{sensor.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Home Lab Tests</h3>
            <p className="text-gray-700 mb-4">
              MedBox can perform these lab tests with just a small blood sample, which would typically require 
              a clinic visit, lab processing, and days of waiting.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {homeLabTests.map((test, index) => (
                <div key={index} className="bg-blue-50 p-3 rounded-lg text-blue-800 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {test}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">The Human-AI Healthcare Partnership</h3>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <h4 className="font-medium text-blue-700 mb-2">How It Works</h4>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
                <li>Run tests at home using MedBox's simple, guided procedures</li>
                <li>AI analyzes your results against baseline and medical standards</li>
                <li>Imhotep provides immediate insights based on your data</li>
                <li>Critical or concerning results are flagged for physician review</li>
                <li>Your doctor can view trends and make informed decisions remotely</li>
              </ol>
            </div>
            
            <div className="md:w-1/2">
              <h4 className="font-medium text-green-700 mb-2">Benefits to You</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Catch health issues before they become serious problems</li>
                <li>Optimize medication dosing based on your body's actual response</li>
                <li>Track the effectiveness of lifestyle changes with objective data</li>
                <li>Reduce healthcare costs through prevention and early intervention</li>
                <li>Gain peace of mind with continuous health monitoring</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-100 to-green-100 p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3 text-center">The Future of Healthcare Is In Your Home</h4>
          <p className="text-gray-700 mb-4 text-center">
            MedBox is bringing laboratory-grade diagnostics into your home, democratizing access to high-quality 
            health monitoring and reducing dependence on in-person medical visits. With AI analysis and physician oversight, 
            this represents the next evolution in preventative healthcare.
          </p>
          <div className="text-center">
            <button className="px-5 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors">
              Join MedBox Waitlist
            </button>
            <p className="text-sm text-gray-500 mt-2">Launch scheduled for 2027</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MedBoxShowcase; 