/**
 * DevelopmentRoadmap.tsx
 * 
 * This component showcases the development timeline, vision, and collaboration
 * opportunities for Nerd - the AI Research Assistant. It provides users with information 
 * about future plans and how they can contribute to the project.
 */

import React, { useState } from 'react';
import styles from '../../styles.module.css';

type CollaborationType = 'developer' | 'researcher' | 'domain-expert';

/**
 * Combined section for vision, development timeline, and collaboration
 */
const DevelopmentRoadmap: React.FC = () => {
  const [collaborationType, setCollaborationType] = useState<CollaborationType>('developer');
  
  const roadmapItems = [
    {
      title: "Concept Development",
      description: "Initial concept development and research on AI-powered research assistants",
      timeframe: "2025 Q1",
      icon: "🧪",
      completed: true
    },
    {
      title: "Alpha Research Organizer",
      description: "First internal prototype focusing on research organization and tagging",
      timeframe: "2025 Q3",
      icon: "📁",
      completed: false
    },
    {
      title: "Beta Testing Program",
      description: "Limited beta with researchers for research organization and updates features",
      timeframe: "2026 Q1",
      icon: "🔍",
      completed: false
    },
    {
      title: "Content Creation Engine",
      description: "Development of AI-powered content creation capabilities for research papers and social media",
      timeframe: "2026 Q3",
      icon: "✍️",
      completed: false
    },
    {
      title: "Engagement & Discovery Mode",
      description: "Implementation of research engagement features and discovery mode for breakthrough insights",
      timeframe: "2026 Q4",
      icon: "💡",
      completed: false
    },
    {
      title: "Collaboration Platform",
      description: "Building tools for researcher collaboration and integration with existing tools",
      timeframe: "2027 Q1",
      icon: "👥",
      completed: false
    },
    {
      title: "Independent Research Features",
      description: "Final development of tools for anonymous research, fundraising, and collaboration",
      timeframe: "2027 Q2",
      icon: "🔒",
      completed: false
    },
    {
      title: "Nerd Full Launch",
      description: "Official public launch of the complete Nerd platform with all core features",
      timeframe: "2027 Q3",
      icon: "🚀",
      completed: false
    }
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Vision Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              Nerd envisions a future where humans and machines collaborate fluidly in pursuit of truth and knowledge. 
              We're building a platform that transcends traditional barriers of credentialism and institutional gatekeeping, 
              while leveraging the power of AI to accelerate research and discovery toward technological singularity.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-5 rounded-lg vision-card">
                <h4 className="text-xl font-semibold text-blue-700 mb-3">Human-AI Symbiosis</h4>
                <p className="text-gray-600">Developing intelligent systems that enhance human creativity and analytical capabilities, creating a symbiotic relationship that elevates research beyond current limitations.</p>
              </div>
              
              <div className="bg-purple-50 p-5 rounded-lg vision-card">
                <h4 className="text-xl font-semibold text-purple-700 mb-3">Decentralized Access</h4>
                <p className="text-gray-600">Democratizing research through blockchain-based systems, alternative funding mechanisms like DAOs, and removing institutional barriers that prevent brilliant minds from contributing.</p>
              </div>
              
              <div className="bg-green-50 p-5 rounded-lg vision-card">
                <h4 className="text-xl font-semibold text-green-700 mb-3">Accelerated Discovery</h4>
                <p className="text-gray-600">Creating systems that identify promising connections across disciplines, surface overlooked research, and generate novel hypotheses—dramatically speeding the path to breakthrough discoveries.</p>
              </div>
            </div>
            
            <p className="text-gray-700">
              By our 2027 launch, Nerd will provide a comprehensive platform where anyone with intellectual curiosity can contribute 
              to human knowledge advancement, regardless of formal credentials. We're building a future where AI amplifies human potential, 
              decentralized structures remove traditional gatekeepers, and collaborative intelligence drives us toward
              an unprecedented acceleration of scientific and technological progress.
            </p>
          </div>
        </div>

        {/* Timeline Section - Mobile Responsive */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Development Timeline to 2027 Launch</h3>
          
          {/* Mobile Timeline (visible on small screens) */}
          <div className="md:hidden">
            <div className="space-y-8">
              {roadmapItems.map((item, index) => (
                <div key={index} className="border-l-4 border-blue-200 pl-4 relative">
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full flex items-center justify-center shadow-sm" 
                    style={{backgroundColor: item.completed ? '#3B82F6' : '#DBEAFE'}}>
                    <span className="text-sm">{item.icon}</span>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      item.completed ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
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
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
            <div className="relative z-10">
              {roadmapItems.map((item, index) => (
                <div key={index} className={`mb-16 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-2">{item.description}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      item.completed ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {item.timeframe} {item.completed && '✓'}
                    </span>
                  </div>
                  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className={`w-12 h-12 rounded-full border-4 border-white flex items-center justify-center shadow-sm ${
                      item.timeframe.includes('2026') ? 'bg-blue-500 text-white' : (item.completed ? 'bg-blue-400 text-white' : 'bg-blue-100')
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

        {/* Collaboration Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 md:p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Collaborate With Nerd</h3>
          <p className="text-gray-700 mb-8 max-w-3xl mx-auto text-center">
            Join our collaborative community of engineers, researchers, and domain experts working together
            to redefine what's possible in research. Help shape the future of Nerd before our 2026 launch.
          </p>
          
          <div className="mb-10">
            <div className="flex flex-wrap justify-center border-b border-gray-200 mb-6">
              <button
                onClick={() => setCollaborationType('developer')}
                className={`px-4 md:px-6 py-3 focus:outline-none transition-colors ${
                  collaborationType === 'developer' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
                }`}
              >
                Engineers
              </button>
              <button
                onClick={() => setCollaborationType('researcher')}
                className={`px-4 md:px-6 py-3 focus:outline-none transition-colors ${
                  collaborationType === 'researcher' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
                }`}
              >
                Researchers
              </button>
              <button
                onClick={() => setCollaborationType('domain-expert')}
                className={`px-4 md:px-6 py-3 focus:outline-none transition-colors ${
                  collaborationType === 'domain-expert' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
                }`}
              >
                Domain Experts
              </button>
            </div>
            
            {collaborationType === 'developer' && (
              <div className="space-y-4 bg-white rounded-lg p-6 shadow-sm">
                <h4 className="text-xl font-semibold text-blue-800">Engineering Collaboration</h4>
                <p className="text-gray-700">
                  Help build Nerd's AI-powered tools that will transform how knowledge is discovered, organized, and shared.
                </p>
                <div className="text-left max-w-2xl mx-auto mt-4">
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>Develop advanced knowledge graph systems for research organization</li>
                    <li>Create intuitive interfaces for real-time research updates</li>
                    <li>Build AI content creation systems for research papers and social media</li>
                    <li>Design engagement features and discovery mode algorithms</li>
                    <li>Implement secure systems for anonymous and independent research</li>
                  </ul>
                </div>
              </div>
            )}
            
            {collaborationType === 'researcher' && (
              <div className="space-y-4 bg-white rounded-lg p-6 shadow-sm">
                <h4 className="text-xl font-semibold text-purple-800">Academic Collaboration</h4>
                <p className="text-gray-700">
                  Partner with us to ensure Nerd addresses real research challenges and fits seamlessly into academic workflows.
                </p>
                <div className="text-left max-w-2xl mx-auto mt-4">
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>Test our research organization systems with your own materials</li>
                    <li>Provide feedback on real-time update relevance and quality</li>
                    <li>Evaluate content creation tools for research papers</li>
                    <li>Help refine the engagement questions and discovery mode</li>
                    <li>Advise on collaboration tools and independent research features</li>
                  </ul>
                </div>
              </div>
            )}
            
            {collaborationType === 'domain-expert' && (
              <div className="space-y-4 bg-white rounded-lg p-6 shadow-sm">
                <h4 className="text-xl font-semibold text-green-800">Specialized Knowledge</h4>
                <p className="text-gray-700">
                  Bring your unique expertise to help us develop Nerd's capabilities across different fields and disciplines.
                </p>
                <div className="text-left max-w-2xl mx-auto mt-4">
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>Guide field-specific research organization approaches</li>
                    <li>Identify key sources for real-time updates in your domain</li>
                    <li>Provide templates and standards for research content creation</li>
                    <li>Share domain-specific research questions for engagement</li>
                    <li>Outline collaboration patterns specific to your field</li>
                  </ul>
                </div>
              </div>
            )}
            
            <div className="mt-8 text-center">
              <p className="mb-6 text-gray-700 max-w-2xl mx-auto">
                Our 2027 launch will be shaped by collaborative input from experts across fields.
                Join the Nerd community today to influence the development of tomorrow's research tools.
              </p>
              <a 
                href="mailto:collaborate@nerd.ai" 
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Join Our Beta Program
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentRoadmap; 