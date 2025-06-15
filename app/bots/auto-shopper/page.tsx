'use client';

import React, { useState } from 'react';
import bots from '../../../data/bots';
import BotNavigation from '../BotNavigation';

interface ProductResult {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  url: string;
  platform: 'Amazon' | 'Ricardo';
}

export default function AutoShopper() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ProductResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const bot = bots.find(b => b.slug === 'auto-shopper');

  if (!bot) {
    return <div>Bot not found</div>;
  }

  // Menu items for navigation
  const menuItems = [
    { id: 'search', label: 'Search Products', icon: '🔍', section: 'search' },
    { id: 'results', label: 'Results', icon: '🛍️', section: 'results' },
    { id: 'how-it-works', label: 'How It Works', icon: '📖', section: 'how-it-works' },
    { id: 'features', label: 'Features', icon: '✨', section: 'features' }
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch('/api/products/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query.trim() })
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Search error:', error);
      // TODO: Add error handling UI
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Bot-specific Navigation */}
      <BotNavigation
        botTitle="AutoShopper"
        botEmoji="🚗"
        botDescription="AI Car Shopping Assistant"
        accentColor="blue"
        menuItems={menuItems}
        chatLink={bot.tryLink || 'https://chat.openai.com/'}
      />
      
      <main className="mx-auto max-w-screen-xl px-6 pt-24">
        <section id="search">
          <h1 className="mb-8 text-4xl font-semibold tracking-tight">Professional Auto-Shopper</h1>
          
          {/* One-word query input */}
          <div className="mx-auto max-w-2xl">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl border-gray-200 bg-white px-4 py-3 pr-12 text-lg shadow-sm focus:border-openai-green focus:ring-openai-green"
                placeholder="Enter one word..."
                maxLength={50}
              />
              <button
                type="submit"
                disabled={isSearching}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-openai-green p-2 text-white hover:bg-opacity-90 disabled:opacity-50"
              >
                {isSearching ? '...' : '→'}
              </button>
            </form>
          </div>

          {/* Results grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((product) => (
              <div key={product.id} className="flex flex-col rounded-xl border border-gray-200 bg-white p-6">
                <img src={product.image} alt={product.title} className="mb-4 h-48 w-full rounded-lg object-cover" />
                <h3 className="mb-2 text-lg font-medium">{product.title}</h3>
                <p className="mb-4 text-sm text-gray-600">{product.description}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-semibold">${product.price}</span>
                  <span className="text-sm text-gray-500">{product.platform}</span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-openai-green hover:underline"
                  >
                    View on {product.platform} →
                  </a>
                  <button className="rounded-md bg-openai-green px-4 py-1 text-sm font-medium text-white hover:bg-opacity-90">
                    Support Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
