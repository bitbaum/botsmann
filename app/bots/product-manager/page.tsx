'use client';

/**
 * Trident - Product Manager for Cursor Workflow
 * 
 * This is the main page component for Trident, an AI-powered product manager
 * designed to streamline the Cursor workflow. It leverages the unique strengths
 * of multiple AI models to provide comprehensive product documentation, 
 * development guidance, and workflow optimization for Cursor projects.
 * 
 * @module TridentPage
 */

import React from 'react';
import bots from '../../../data/bots';
import BotPageHeader from '../../../components/BotPageHeader';
import HeroSection from './components/hero/HeroSection';
import FeaturesSection from './components/features/FeaturesSection';
import TryItSection from './components/workflow/TryItSection';
import BenefitsSection from './components/benefits/BenefitsSection';
import ExampleSection from './components/examples/ExampleSection';
import ShowcaseSection from './components/showcase/ShowcaseSection';
import IntegrationSection from './components/integration/IntegrationSection';
import DevelopmentRoadmap from './components/roadmap/DevelopmentRoadmap';
import VisionSection from './components/vision/VisionSection';
import JoinSection from './components/join/JoinSection';
import './styles.css';

export default function ProductManager() {
  const bot = bots.find((b: { slug: string }) => b.slug === 'product-manager');

  if (!bot) {
    return <div>Bot not found</div>;
  }

  // Menu items organized by value proposition
  const menuItems = [
    { id: 'features', label: 'Features', icon: '🛠️', section: 'features' },
    { id: 'examples', label: 'Examples', icon: '📝', section: 'examples' },
    { id: 'showcase', label: 'Showcase', icon: '🔍', section: 'showcase' },
    { id: 'try-it', label: 'Try It', icon: '🚀', section: 'try-it' },
    { id: 'integrations', label: 'Integrations', icon: '🔄', section: 'integrations' },
    { id: 'benefits', label: 'Benefits', icon: '✅', section: 'benefits' },
    { id: 'roadmap', label: '2025 Roadmap', icon: '📊', section: 'roadmap' },
    { id: 'vision', label: 'Vision', icon: '🔮', section: 'vision' },
    { id: 'join', label: 'Join Us', icon: '👥', section: 'join' }
  ];
  
  return (
    <div className="min-h-screen bg-white">
      <BotPageHeader
        botTitle="Trident"
        botEmoji="🔱"
        botSlug="product-manager"
        menuItems={menuItems}
        accentColor="indigo"
      />
      <main className="max-w-screen-xl mx-auto px-6">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Features Section */}
        <section id="features" className="scroll-mt-24 my-16">
          <FeaturesSection />
        </section>
        
        {/* Examples Section */}
        <section id="examples" className="scroll-mt-24 my-16">
          <ExampleSection />
        </section>
        
        {/* Showcase Section */}
        <section id="showcase" className="scroll-mt-24 my-16">
          <ShowcaseSection />
        </section>
        
        {/* Try It Section */}
        <section id="try-it" className="scroll-mt-24 my-16">
          <TryItSection />
        </section>
        
        {/* Integration Section */}
        <section id="integrations" className="scroll-mt-24 my-16">
          <IntegrationSection />
        </section>
        
        {/* Benefits Section */}
        <section id="benefits" className="scroll-mt-24 my-16">
          <BenefitsSection />
        </section>
        
        {/* Roadmap Section */}
        <section id="roadmap" className="scroll-mt-24 my-16">
          <DevelopmentRoadmap />
        </section>
        
        {/* Vision Section */}
        <section id="vision" className="scroll-mt-24 my-16">
          <VisionSection />
        </section>
        
        {/* Join Section */}
        <section id="join" className="scroll-mt-24 my-16 mb-24">
          <JoinSection />
        </section>
        
        {/* CTA Section */}
        <section className="mt-16 mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Optimize Your Cursor Workflow?</h2>
          <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
            Let Trident manage your product documentation and development process, optimized specifically for Cursor's implementation needs.
          </p>
          <button 
            onClick={() => document.getElementById('try-it')?.scrollIntoView({ behavior: 'smooth' })} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg inline-flex items-center"
          >
            <span>Start Using Trident</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 12h15" />
            </svg>
          </button>
        </section>
      </main>
    </div>
  );
} 