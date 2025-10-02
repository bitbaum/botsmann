'use client';

import React from 'react';
import bots from '../../../data/bots';
import BotNavigation from '../BotNavigation';
import './styles.css';

import HeroSection from './components/hero/HeroSection';
import DisclaimerSection from './components/disclaimer/DisclaimerSection';
import DemoOrchestrator from './components/demo/DemoOrchestrator';
import FeaturesSection from './components/features/FeaturesSection';
import TestimonialsSection from './components/testimonials/TestimonialsSection';
import VisionSection from './components/vision/VisionSection';
import TechSection from './components/tech/TechSection';
import CallToActionSection from './components/cta/CallToActionSection';

export default function LegalExpert() {
  const bot = bots.find(b => b.slug === 'legal-expert');

  const menuItems = [
    { id: 'demo', label: 'Demo', icon: '💻', section: 'demo' },
    { id: 'features', label: 'Features', icon: '⚖️', section: 'features' },
    { id: 'testimonials', label: 'Testimonials', icon: '💬', section: 'testimonials' },
    { id: 'vision', label: 'Vision', icon: '🚀', section: 'vision' },
    { id: 'technology', label: 'Technology', icon: '⚙️', section: 'technology' },
    { id: 'get-started', label: 'Join Waitlist', icon: '✨', section: 'get-started' }
  ];

  const getTryLink = () => bot?.tryLink || 'https://chat.openai.com/';

  if (!bot) {
    return <div className="p-8 text-center">Lex configuration not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <BotNavigation
        botTitle="Lex"
        botEmoji="⚖️"
        botDescription="AI Legal Assistant"
        accentColor="blue"
        menuItems={menuItems}
        chatLink={getTryLink()}
      />

      <main className="mx-auto max-w-screen-xl px-6 pt-24">
        <HeroSection title="Lex" overview={bot.overview} getTryLink={getTryLink} />
        <DisclaimerSection />
        <DemoOrchestrator />
        <FeaturesSection />
        <TestimonialsSection />
        <VisionSection />
        <TechSection />
        <CallToActionSection getTryLink={getTryLink} />
      </main>
    </div>
  );
}
