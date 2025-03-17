import React, { useState } from 'react';

/**
 * Future vision and development timeline component with a realistic
 * roadmap for the Dr. Imhotep health assistant.
 */
const FutureVisionSection: React.FC = () => {
  const [applicationType, setApplicationType] = useState('developer');
  
  const roadmapItems = [
    {
      title: "AI Health Assistant Launch",
      description: "Initial release of Dr. Imhotep with core health information capabilities and personalized guidance.",
      timeframe: "2024",
      icon: "🚀",
      completed: true
    },
    {
      title: "Patient Portal & Personalized AI-Advice",
      description: "Launch of comprehensive patient portal with highly personalized health recommendations and insights.",
      timeframe: "2025",
      icon: "👤",
      completed: false
    },
    {
      title: "Health Regimens & Tracking",
      description: "Introduction of structured health protocols like Blueprint and advanced progress tracking systems.",
      timeframe: "2026",
      icon: "📊",
      completed: false
    },
    {
      title: "Health Provider Portal",
      description: "Platform for medical professionals to integrate with patient care and provide oversight.",
      timeframe: "2026",
      icon: "👨‍⚕️",
      completed: false
    },
    {
      title: "MedBox & Advanced Health Monitoring",
      description: "Launch of the MedBox device for home biomarker tracking and real-time health analysis.",
      timeframe: "2027",
      icon: "📦",
      completed: false
    },
    {
      title: "Health Marketplace",
      description: "Connecting users with supplements, medications, health products, and professional services in one integrated platform.",
      timeframe: "2027",
      icon: "🏪",
      completed: false
    },
    {
      title: "Global Health Initiative",
      description: "Expanding access to preventative health technologies in underserved regions worldwide.",
      timeframe: "2028",
      icon: "🌎",
      completed: false
    }
  ];

  return (
    <section id="future-vision" className="my-16 scroll-mt-24">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Development Timeline</h2>
      <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
        Our step-by-step plan to make Dr. Imhotep the most comprehensive health assistant, bringing advanced
        health monitoring and personalized care to everyone.
      </p>

      <div className="relative">
        {/* Center line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-200"></div>
        
        <div className="relative z-10">
          {roadmapItems.map((item, index) => (
            <div key={index} className={`mb-12 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  item.completed 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {item.timeframe} {item.completed && '✓'}
                </span>
              </div>
              
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                <div className={`w-12 h-12 rounded-full border-4 border-white flex items-center justify-center shadow-sm ${
                  item.completed ? 'bg-green-400 text-white' : 'bg-green-100'
                }`}>
                  <span className="text-xl">{item.icon}</span>
                </div>
              </div>
              
              <div className="w-1/2"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 bg-green-50 p-8 rounded-xl border border-green-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Our Ultimate Vision</h3>
        <div className="prose prose-lg max-w-none text-gray-700">
          <p>
            We're creating a comprehensive health ecosystem that makes preventative healthcare accessible to everyone. 
            Dr. Imhotep will evolve into a health companion that makes maintaining optimal health effortless.
          </p>
          <p>
            The MedBox will provide a collection of health monitoring devices for tracking biomarkers, allowing you 
            to optimize your health with precision like health pioneers such as Bryan Johnson.
          </p>
          <p>
            Our marketplace will connect you with health regimens, supplements, and healthcare professionals when needed. 
            We'll also offer subscription services for medications and supplements, making it easier to stay consistent 
            with your health protocols.
          </p>
          <p>
            Through a combination of AI, biomarker tracking, and optional human expertise, we'll make preventative 
            healthcare both accessible and personalized, helping you achieve optimal health with less effort.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-xl font-semibold text-green-800 mb-4">The Integrated Health Marketplace</h4>
          <p className="text-gray-700 mb-4">
            Our Health Marketplace will connect users with everything they need to maintain optimal health: 
            supplements formulated for specific health goals, medical devices for home monitoring, 
            medications with automatic refills, and direct access to healthcare professionals.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-start">
              <div className="bg-green-100 rounded-full p-2 mr-3 flex-shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 text-sm">Personalized Supplements</h5>
                <p className="text-xs text-gray-600">Based on your biomarker data</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-green-100 rounded-full p-2 mr-3 flex-shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 text-sm">Health Devices</h5>
                <p className="text-xs text-gray-600">MedBox and compatible sensors</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-green-100 rounded-full p-2 mr-3 flex-shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 text-sm">Medication Management</h5>
                <p className="text-xs text-gray-600">Automatic refills and reminders</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-green-100 rounded-full p-2 mr-3 flex-shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h5 className="font-medium text-gray-900 text-sm">Provider Services</h5>
                <p className="text-xs text-gray-600">Connect with health professionals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureVisionSection; 