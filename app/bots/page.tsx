import React from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { Bot } from '@/data/bots';
import bots from '@/data/bots';

// Bot display names and types
const botDisplayData: Record<string, { name: string, type: string, emoji: string }> = {
  'swiss-german-teacher': { name: 'Heidi', type: 'Swiss German Teacher', emoji: '🇨🇭' },
  'research-assistant': { name: 'Nerd', type: 'Research Assistant', emoji: '🧠' },
  'medical-expert': { name: 'Imhotep', type: 'Medical Expert', emoji: '⚕️' },
  'legal-expert': { name: 'Lex', type: 'Legal Assistant', emoji: '⚖️' },
  'artistic-advisor': { name: 'Artr', type: 'Creative Assistant', emoji: '🎨' },
  'product-manager': { name: 'Trident', type: 'Product Manager', emoji: '🔱' },
};

export default function BotsList() {
  // Define which bots are ready (not coming soon)
  const readyBots = ['swiss-german-teacher'];
  
  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-semibold tracking-tight">Our AI Bots</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {bots.map((bot) => {
          const displayData = botDisplayData[bot.slug] || { 
            name: bot.title, 
            type: bot.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            emoji: '🤖'
          };
          
          return (
            <Link 
              key={bot.slug} 
              href={`/bots/${bot.slug}`}
              className="group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md relative"
            >
              {!readyBots.includes(bot.slug) && (
                <span className="absolute right-4 top-4 inline-block bg-brand-500 text-white text-xs font-medium px-2 py-1 rounded">
                  Coming Soon
                </span>
              )}
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 bg-gray-100">
                  <span className="text-2xl">{displayData.emoji}</span>
                </div>
                <div>
                  <h2 className="mb-1 text-xl font-semibold text-gray-900">{displayData.name}</h2>
                  <p className="text-sm text-gray-500">{displayData.type}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4 mt-2">
                {bot.features.slice(0, 3).map((feature, index) => (
                  <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    {feature.split(':')[0]}
                  </span>
                ))}
              </div>
              <span className="text-sm font-medium text-brand-500 group-hover:underline mt-auto inline-flex items-center">
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
