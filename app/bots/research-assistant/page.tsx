/**
 * Nerd - AI Research Assistant Page
 * 
 * This is the main page component for the Nerd AI Research Assistant.
 * It orchestrates all the sections and components that make up the tool's interface,
 * providing a comprehensive research assistant experience.
 * 
 * The page includes sections for all six core functions:
 * 1. Research Organization - organizing existing research
 * 2. Real-time Updates - keeping researchers up-to-date
 * 3. Content Creation - generating drafts for articles and social media
 * 4. Engagement - providing stimulating questions and discovery mode
 * 5. Collaboration - connecting with other researchers
 * 6. Independent Research - anonymous research, fundraising, finding collaborators
 * 
 * @module NerdPage
 */

'use client';

import React from 'react';
import bots from '../../../data/bots';
import BotPageHeader from '../../../components/BotPageHeader';
// Import the styles
import './styles.css';

// Basic component imports
import HeroSection from './components/hero/HeroSection';
import FeaturesSection from './components/features/FeaturesSection';
import ResearchSystemSection from './components/features/ResearchSystemSection';
import WebScrapingSection from './components/features/WebScrapingSection';
import DraftGenerationSection from './components/features/DraftGenerationSection';
import QuestionsSection from './components/questions/QuestionsSection';
import DiscoverySection from './components/discovery/DiscoverySection';
import IntegrationSection from './components/integration/IntegrationSection';
import DevelopmentRoadmap from './components/integration/DevelopmentRoadmap';

/**
 * Main page component for the Nerd AI Research Assistant
 * with organized sections for the six core functions
 * 
 * @returns {JSX.Element} The rendered page
 */
export default function ResearchAssistant() {
  // Find bot data from the global bots configuration
  const bot = bots.find(b => b.slug === 'research-assistant');

  // Function to get the waitlist URL
  const getTryLink = () => {
    return 'https://nerd.ai/waitlist';
  };

  // Menu items organized by section
  const menuItems = [
    { id: 'core-features', label: 'Features', icon: '⭐', section: 'core-features' },
    { id: 'research-system', label: 'Organization', icon: '📚', section: 'research-system' },
    { id: 'web-scraping', label: 'Real-time Updates', icon: '🔄', section: 'web-scraping' },
    { id: 'draft-generation', label: 'Content Creation', icon: '✍️', section: 'draft-generation' },
    { id: 'daily-questions', label: 'Engagement', icon: '🔍', section: 'daily-questions' },
    { id: 'integration', label: 'Collaboration', icon: '👥', section: 'integration' },
    { id: 'roadmap', label: 'Roadmap', icon: '🚀', section: 'roadmap' }
  ];

  // If bot data is not found, show error
  if (!bot) {
    return <div className="p-8 text-center">Nerd configuration not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <BotPageHeader
        botTitle="Nerd"
        botEmoji="🤓"
        botSlug="research-assistant"
        menuItems={menuItems}
        accentColor="indigo"
      />
      <main className="mx-auto max-w-screen-xl px-6">
        {/* Hero Section */}
        <HeroSection
          title="Nerd"
          overview="Your AI companion for organized research, real-time updates, and groundbreaking discoveries"
          getTryLink={getTryLink}
        />
        
        {/* Core Features Overview */}
        <section id="core-features" className="scroll-mt-24 mt-16">
          <FeaturesSection 
            features={bot.features || []}
          />
        </section>
        
        {/* 1. Research Organization Section */}
        <section id="research-system" className="scroll-mt-24 my-16">
          <ResearchSystemSection />
        </section>
        
        {/* 2. Real-time Updates Section */}
        <section id="web-scraping" className="scroll-mt-24 my-16">
          <WebScrapingSection />
        </section>
        
        {/* 3. Content Creation Section */}
        <section id="draft-generation" className="scroll-mt-24 my-16">
          <DraftGenerationSection />
        </section>
        
        {/* 4. Research Engagement Section */}
        <section id="daily-questions" className="scroll-mt-24 my-16">
          <QuestionsSection getTryLink={getTryLink} />
        </section>
        
        {/* 4. Discovery Mode Section (part of Engagement) */}
        <section id="discovery-mode" className="scroll-mt-24 my-16">
          <DiscoverySection />
        </section>
        
        {/* 5. Collaboration & 6. Independent Research Section */}
        <section id="integration" className="scroll-mt-24 my-16">
          <IntegrationSection />
        </section>
        
        {/* Development Roadmap Section */}
        <section id="roadmap" className="scroll-mt-24 my-16 mb-24">
          <DevelopmentRoadmap />
        </section>
      </main>
    </div>
  );
} 