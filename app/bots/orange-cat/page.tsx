'use client';

import React from 'react';
import bots from '../../../data/bots';
import BotNavigation from '../BotNavigation';
import './styles.css';

import HeroSection from './components/hero/HeroSection';
import FeaturesSection from './components/features/FeaturesSection';
import CatWisdomDemo from './components/demo/CatWisdomDemo';
import PhilosophySection from './components/philosophy/PhilosophySection';
import CallToActionSection from './components/cta/CallToActionSection';

export default function OrangeCat() {
  const bot = bots.find(b => b.slug === 'orange-cat');

  const menuItems = [
    { id: 'wisdom', label: 'Wisdom', icon: '🔮', section: 'wisdom' },
    { id: 'features', label: 'Powers', icon: '✨', section: 'features' },
    { id: 'philosophy', label: 'Philosophy', icon: '🧘', section: 'philosophy' },
    { id: 'join', label: 'Join the Cult', icon: '🐱', section: 'join' }
  ];

  const getTryLink = () => bot?.tryLink || 'https://chat.openai.com/';

  if (!bot) {
    return <div className="p-8 text-center">Oscar has wandered off to find a sunbeam...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <BotNavigation
        botTitle="Oscar"
        botEmoji="🐱"
        botDescription="Orange Cat Philosopher"
        accentColor="amber"
        menuItems={menuItems}
        chatLink={getTryLink()}
      />

      <main className="mx-auto max-w-screen-xl px-6 pt-24">
        <HeroSection title={bot.title} overview={bot.overview} getTryLink={getTryLink} />

        <section id="wisdom" className="scroll-mt-24 my-16">
          <CatWisdomDemo />
        </section>

        <section id="features" className="scroll-mt-24 my-16">
          <FeaturesSection features={bot.features} />
        </section>

        <section id="philosophy" className="scroll-mt-24 my-16">
          <PhilosophySection />
        </section>

        <section id="join" className="scroll-mt-24 my-16">
          <CallToActionSection getTryLink={getTryLink} />
        </section>
      </main>
    </div>
  );
}
