import React from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { Bot } from '@/data/bots';
import bots from '@/data/bots';

export default function BotsList() {
  // Define which bots are ready (not coming soon)
  const readyBots = ['swiss-german-teacher'];
  
  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-semibold tracking-tight">Our AI Bots</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {bots.map((bot) => (
          <Link 
            key={bot.slug} 
            href={`/bots/${bot.slug}`}
            className="group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md relative"
          >
            {!readyBots.includes(bot.slug) && (
              <span className="absolute right-4 top-4 inline-block bg-openai-green text-white text-xs font-medium px-2 py-1 rounded">
                Coming Soon
              </span>
            )}
            <div>
              <h2 className="mb-2 text-xl font-semibold text-gray-900">{bot.title}</h2>
              <p className="mb-4 text-gray-600 min-h-[3rem]">{bot.description}</p>
            </div>
            <span className="text-sm font-medium text-openai-green group-hover:underline mt-auto">
              Learn more →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
