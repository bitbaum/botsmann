'use client';

import React from 'react';
import Link from 'next/link';
import bots from '../../../data/bots';
import BotPageHeader from '../../../components/BotPageHeader';
import './styles.css';

import HeroSection from './components/hero/HeroSection';
import DisclaimerSection from './components/disclaimer/DisclaimerSection';
import FeaturesSection from './components/features/FeaturesSection';
import TestimonialsSection from './components/testimonials/TestimonialsSection';
import VisionSection from './components/vision/VisionSection';
import TechSection from './components/tech/TechSection';
import CallToActionSection from './components/cta/CallToActionSection';

export default function LegalExpert() {
  const bot = bots.find(b => b.slug === 'legal-expert');

  const getTryLink = () => bot?.tryLink || 'https://chat.openai.com/';

  const menuItems = [
    { id: 'features', label: 'Features', icon: '⚡', section: 'features' },
    { id: 'testimonials', label: 'Testimonials', icon: '💬', section: 'testimonials' },
    { id: 'vision', label: 'Vision', icon: '🚀', section: 'vision' },
    { id: 'tech', label: 'Technology', icon: '🔧', section: 'tech' },
  ];

  if (!bot) {
    return <div className="p-8 text-center">Lex configuration not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <BotPageHeader
        botTitle="Lex"
        botEmoji="⚖️"
        botSlug="legal-expert"
        menuItems={menuItems}
        accentColor="blue"
      />
      <main className="mx-auto max-w-screen-xl px-6">
        <HeroSection title="Lex" overview={bot.overview} getTryLink={getTryLink} />
        <DisclaimerSection />

        {/* Demo CTA Section */}
        <section className="my-20">
          <div className="bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-8 py-16 md:px-16 md:py-20 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
                <span className="mr-2">✨</span>
                Interactive Experience
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Try Lex Now - Free Demo
              </h2>
              <p className="text-xl text-blue-50 mb-10 max-w-3xl mx-auto">
                Experience the complete Lex workflow: AI legal analysis, lawyer matching, and secure workspace.
                See how we're democratizing access to legal services.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/bots/legal-expert/demo"
                  className="px-10 py-5 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 inline-flex items-center text-lg"
                >
                  Launch Demo
                  <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <span className="text-blue-100 text-sm">No signup required • Takes 3 minutes</span>
              </div>
            </div>
          </div>
        </section>

        <FeaturesSection />
        <TestimonialsSection />
        <VisionSection />
        <TechSection />
        <CallToActionSection getTryLink={getTryLink} />
      </main>
    </div>
  );
}
