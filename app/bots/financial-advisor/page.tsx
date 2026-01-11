'use client';

import React from 'react';
import bots from '../../../data/bots';
import BotPageHeader from '../../../components/BotPageHeader';
import HeroSection from './components/hero/HeroSection';
import DisclaimerSection from './components/disclaimer/DisclaimerSection';
import FeaturesSection from './components/features/FeaturesSection';
import VisionSection from './components/vision/VisionSection';
import TechSection from './components/tech/TechSection';
import CallToActionSection from './components/cta/CallToActionSection';

export default function FinancialAdvisor() {
  const bot = bots.find(b => b.slug === 'financial-advisor');

  const getTryLink = () => bot?.tryLink || 'https://chat.openai.com/';

  const menuItems = [
    { id: 'features', label: 'Features', icon: '⚡', section: 'features' },
    { id: 'vision', label: 'Vision', icon: '🚀', section: 'vision' },
    { id: 'tech', label: 'Technology', icon: '🔧', section: 'tech' },
  ];

  if (!bot) {
    return <div className="p-8 text-center">RichCat configuration not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <BotPageHeader
        botTitle="RichCat"
        botEmoji="💰"
        botSlug="financial-advisor"
        menuItems={menuItems}
        accentColor="green"
      />
      <main className="mx-auto max-w-screen-xl px-6">
        <HeroSection title="RichCat" overview={bot.overview} getTryLink={getTryLink} />
        <DisclaimerSection />
        <FeaturesSection />
        <VisionSection />
        <TechSection />
        <CallToActionSection getTryLink={getTryLink} />
      </main>
    </div>
  );
}
