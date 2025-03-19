'use client';

import React from 'react';
import bots from '../../../data/bots';
import BotNavigation from '../BotNavigation';

export default function GovernmentSpendingTracker() {
  const bot = bots.find(b => b.slug === 'government-spending-tracker');

  if (!bot) {
    return <div>Bot not found</div>;
  }

  // Menu items for navigation
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: '📊', section: 'overview' },
    { id: 'payments', label: 'Payments', icon: '💸', section: 'payments' },
    { id: 'insights', label: 'Insights', icon: '📈', section: 'insights' },
    { id: 'reports', label: 'Reports', icon: '📄', section: 'reports' },
    { id: 'transparency', label: 'Transparency', icon: '🔍', section: 'transparency' }
  ];
  
  return (
    <div className="min-h-screen bg-white">
      <BotNavigation
        botTitle="GovTrack"
        botEmoji="💰"
        botDescription="Government Spending Tracker"
        accentColor="blue"
        menuItems={menuItems}
        chatLink={bot.tryLink || 'https://chat.openai.com/'}
      />
      
      <main className="mx-auto max-w-screen-xl px-6 pt-24">
        <section id="overview">
          <h1 className="mb-8 text-4xl font-semibold tracking-tight">{bot?.title}</h1>
          <div className="mb-12">
            <p className="text-lg text-gray-600">{bot?.overview}</p>
          </div>
        </section>
        
        {/* Timeline UI */}
        <section id="payments" className="scroll-mt-24 my-16">
          <h2 className="mb-6 text-2xl font-semibold">Recent Government Payments</h2>
          <div className="space-y-4">
            {/* Example payment entry - will be replaced with real data */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="flex items-start justify-between">
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">Payment ID: #GOV-2024-001</p>
                    <p className="text-sm text-gray-500">Feb 8, 2024</p>
                  </div>
                  <div className="mt-2">
                    <p className="font-medium">
                      <span className="text-openai-green">Department of Transportation</span>
                      {' → '}
                      <span>Acme Construction Co.</span>
                    </p>
                    <p className="mt-1 text-2xl font-semibold">$1,250,000</p>
                  </div>
                  <div className="mt-3">
                    <p className="text-gray-600">Road maintenance and repair - Highway 101 Section B</p>
                    <p className="mt-1 text-sm text-gray-500">Legal basis: Contract #DOT-2024-789</p>
                  </div>
                  
                  {/* Social interactions */}
                  <div className="mt-4 flex items-center space-x-6 border-t border-gray-100 pt-4">
                    <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-openai-green">
                      <span>👍</span>
                      <span>Like</span>
                      <span className="text-gray-400">(24)</span>
                    </button>
                    <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-openai-green">
                      <span>💬</span>
                      <span>Comment</span>
                      <span className="text-gray-400">(8)</span>
                    </button>
                    <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-openai-green">
                      <span>↗️</span>
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* More payment entries would go here */}
          </div>
        </section>
      </main>
    </div>
  );
}
