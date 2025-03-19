'use client';

import React, { useState } from 'react';

// Core features data
const coreFeatures = [
  {
    title: "Project Management",
    description: "Organizes and drives projects from conception to completion with intelligent task planning",
    icon: "📊",
    details: "Trident acts as your AI-powered product manager, organizing tasks, setting milestones, and keeping projects on track. It identifies dependencies, suggests resource allocation, and helps prioritize work for maximum efficiency."
  },
  {
    title: "Development Guidance",
    description: "Provides technical direction and implementation suggestions for Cursor development",
    icon: "⚙️",
    details: "Beyond documentation, Trident offers specific technical guidance for implementing features in Cursor. It suggests code approaches, identifies potential technical challenges, and recommends optimal implementation strategies."
  },
  {
    title: "Multi-AI Collaboration",
    description: "Combines the unique perspectives of multiple AI models to create more comprehensive solutions",
    icon: "🔄",
    details: "By leveraging the diverse strengths of multiple AI models, Trident produces solutions that are more thorough, balanced, and insightful than any individual AI could create alone."
  },
  {
    title: "Comprehensive Documentation",
    description: "Generates clear, actionable documentation with all essential components",
    icon: "📋",
    details: "Every document follows a consistent structure including system overview, functional requirements, technical specifications, component design, implementation considerations, and testing strategy."
  },
  {
    title: "Workflow Optimization",
    description: "Streamlines Cursor development processes to maximize productivity",
    icon: "⚡",
    details: "Trident analyzes your current workflow and suggests optimizations specific to Cursor development. It identifies bottlenecks, redundant steps, and opportunities for automation to help your team work more efficiently."
  },
  {
    title: "Implementation Planning",
    description: "Maps out detailed execution plans with clear milestones and deliverables",
    icon: "🗺️",
    details: "Trident creates detailed implementation roadmaps with realistic timelines, resource requirements, and measurable milestones. It breaks down complex features into manageable tasks to ensure smooth execution."
  }
];

const FeaturesSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number | null>(0);

  return (
    <section id="features" className="scroll-mt-24 my-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Core Features</h2>
      <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
        Trident combines project management expertise with development guidance to streamline your entire Cursor workflow. It's not just documentation—it's your AI partner for planning, building, and optimizing projects.
      </p>
      
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {coreFeatures.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setActiveFeature(activeFeature === index ? null : index)}
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">{feature.icon}</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            
            {activeFeature === index && (
              <div className="mt-4 pt-4 border-t border-blue-100 animate-fadeIn">
                <p className="text-gray-700">{feature.details}</p>
              </div>
            )}
            
            <div className="text-blue-600 text-sm mt-3 flex items-center">
              {activeFeature === index ? 'Show less' : 'Learn more'}
              <svg 
                className={`w-4 h-4 ml-1 transition-transform ${activeFeature === index ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection; 