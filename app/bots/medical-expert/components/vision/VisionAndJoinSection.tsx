/**
 * Vision and Join Section Component
 * 
 * This component displays the vision for the future of the platform
 * and provides information about joining the team or community.
 * 
 * @module VisionAndJoinSection
 */

import React, { useState } from 'react';
import Image from 'next/image';

/**
 * Combined section for development timeline, vision, and recruitment
 */
const VisionAndJoinSection: React.FC = () => {
  const [applicationType, setApplicationType] = useState('developer');
  
  const roadmapItems = [
    {
      title: "AI Health Assistant Launch",
      description: "Initial release of Imhotep with core health information capabilities and personalized guidance.",
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
      description: "Integrated platform for health products, supplements, and services recommended by Imhotep.",
      timeframe: "2027",
      icon: "🏪",
      completed: false
    },
    {
      title: "Global Health Initiative",
      description: "Expanding access to underserved communities worldwide with localized health guidance.",
      timeframe: "2028",
      icon: "🌎",
      completed: false
    },
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Vision Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision for Healthcare</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              Imhotep represents a fundamental reimagining of healthcare delivery—making evidence-based health 
              guidance accessible to everyone, everywhere, at any time.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-5 rounded-lg">
                <h4 className="text-xl font-semibold text-blue-700 mb-3">Democratizing Health</h4>
                <p className="text-gray-600">Making world-class medical knowledge available to everyone regardless of location or economic status.</p>
              </div>
              
              <div className="bg-green-50 p-5 rounded-lg">
                <h4 className="text-xl font-semibold text-green-700 mb-3">Prevention First</h4>
                <p className="text-gray-600">Shifting from reactive disease treatment to proactive health optimization and prevention.</p>
              </div>
              
              <div className="bg-purple-50 p-5 rounded-lg">
                <h4 className="text-xl font-semibold text-purple-700 mb-3">Personalized Care</h4>
                <p className="text-gray-600">Moving beyond one-size-fits-all guidance to truly individualized health protocols.</p>
              </div>
            </div>
            
            <p className="text-gray-700">
              We believe healthcare should be continuous, not episodic. By combining AI with the latest medical research, 
              we're creating a system that guides health decisions, monitors progress, and adapts to changing conditions—all 
              while working alongside traditional healthcare providers.
            </p>
          </div>
        </div>

        {/* Timeline Section - Mobile Responsive */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Development Timeline</h3>
          
          {/* Mobile Timeline (visible on small screens) */}
          <div className="md:hidden">
            <div className="space-y-8">
              {roadmapItems.map((item, index) => (
                <div key={index} className="border-l-4 border-green-200 pl-4 relative">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full flex items-center justify-center shadow-sm" 
                    style={{backgroundColor: item.completed ? '#34D399' : '#D1FAE5'}}>
                    <span className="text-sm">{item.icon}</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      item.completed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.timeframe} {item.completed && '✓'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Desktop Timeline (visible on medium screens and up) */}
          <div className="hidden md:block relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-green-200"></div>
          <div className="relative z-10">
            {roadmapItems.map((item, index) => (
              <div key={index} className={`mb-16 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      item.completed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
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
        </div>
        
        {/* Join Us Section - Updated for better flow and collaboration emphasis */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 md:p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Collaborate With Us</h3>
          <p className="text-gray-700 mb-8 max-w-3xl mx-auto text-center">
            We're building a collaborative community of engineers, medical researchers, and healthcare experts
            working together to create the next generation of AI-powered healthcare solutions.
          </p>
          
          <div className="mb-10">
            <div className="flex flex-wrap justify-center border-b border-gray-200 mb-6">
              <button 
                onClick={() => setApplicationType('developer')}
                className={`px-4 md:px-6 py-3 focus:outline-none transition-colors ${
                  applicationType === 'developer' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
                }`}
              >
                Engineers
              </button>
              <button 
                onClick={() => setApplicationType('medical')}
                className={`px-4 md:px-6 py-3 focus:outline-none transition-colors ${
                  applicationType === 'medical' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
                }`}
              >
                Researchers
              </button>
              <button 
                onClick={() => setApplicationType('operations')}
                className={`px-4 md:px-6 py-3 focus:outline-none transition-colors ${
                  applicationType === 'operations' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
                }`}
              >
                Healthcare Experts
              </button>
            </div>
            
            {applicationType === 'developer' && (
              <div className="space-y-4 bg-white rounded-lg p-6 shadow-sm">
                <h4 className="text-xl font-semibold text-blue-800">Engineering Collaboration</h4>
                <p className="text-gray-700">
                  Join our engineering community to build cutting-edge AI systems that make healthcare more accessible and effective.
                </p>
                <div className="text-left max-w-2xl mx-auto mt-4">
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>Contribute to AI models for medical information processing</li>
                    <li>Build intuitive, accessible interfaces for health management</li>
                    <li>Work on our open-source healthcare components</li>
                    <li>Design data visualization for complex health metrics</li>
                    <li>Collaborate on architecture for secure health data systems</li>
                  </ul>
                </div>
              </div>
            )}
            
            {applicationType === 'medical' && (
              <div className="space-y-4 bg-white rounded-lg p-6 shadow-sm">
                <h4 className="text-xl font-semibold text-green-800">Research Collaboration</h4>
                <p className="text-gray-700">
                  Partner with us to bridge the gap between cutting-edge medical research and practical AI applications.
                </p>
                <div className="text-left max-w-2xl mx-auto mt-4">
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>Help validate and improve our health recommendation algorithms</li>
                    <li>Contribute to research on AI-assisted health interventions</li>
                    <li>Design studies to measure efficacy of digital health solutions</li>
                    <li>Work with engineers to translate research into practical features</li>
                    <li>Help prioritize evidence-based medicine in our approaches</li>
                  </ul>
                </div>
              </div>
            )}
            
            {applicationType === 'operations' && (
              <div className="space-y-4 bg-white rounded-lg p-6 shadow-sm">
                <h4 className="text-xl font-semibold text-purple-800">Healthcare Expertise</h4>
                <p className="text-gray-700">
                  Lend your clinical expertise to ensure our solutions integrate seamlessly with healthcare workflows.
                </p>
                <div className="text-left max-w-2xl mx-auto mt-4">
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>Advise on how AI can best support clinical decision-making</li>
                    <li>Help design patient education content and protocols</li>
                    <li>Share insights on healthcare delivery challenges and opportunities</li>
                    <li>Contribute to ethical frameworks for AI healthcare applications</li>
                    <li>Test and provide feedback on our health guidance features</li>
                  </ul>
                </div>
              </div>
            )}
            
            <div className="mt-8 text-center">
              <p className="mb-6 text-gray-700 max-w-2xl mx-auto">
                Together, we can create healthcare tools that combine the best of human expertise with the power
                of AI. Join our open collaboration community to help shape the future of healthcare.
              </p>
              <a 
                href="mailto:collaborate@imhotep.health" 
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Join Our Collaboration Network
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionAndJoinSection; 