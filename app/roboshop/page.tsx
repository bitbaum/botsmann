'use client';

import React, { useState } from 'react';

interface ProductResult {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  url: string;
  platform: 'Amazon' | 'Ricardo';
}

export default function Roboshop() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ProductResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

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
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-screen-xl px-6 py-16">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-gray-900">Roboshop</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Enter a single word and let our AI find exactly what you need across multiple platforms.
          </p>
        </div>

        <div className="mx-auto mb-16 max-w-2xl">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border-2 border-gray-200 bg-transparent px-4 py-3 text-lg text-gray-900 outline-none transition-colors focus:border-green-600"
              placeholder="Enter one word..."
              maxLength={50}
            />
            <button
              type="submit"
              disabled={isSearching}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-green-600 p-2 text-white transition-opacity hover:bg-opacity-90 disabled:opacity-50"
            >
              {isSearching ? (
                <span className="block h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <span className="block px-2">→</span>
              )}
            </button>
          </form>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((product) => (
            <div
              key={product.id}
              className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-video">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 text-lg font-medium text-gray-900">{product.title}</h3>
                <p className="mb-4 flex-1 text-sm text-gray-600">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">{product.platform}</span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-green-600 hover:underline"
                  >
                    View on {product.platform} →
                  </a>
                  <button className="rounded-md bg-green-600 px-4 py-1 text-sm font-medium text-white transition-opacity hover:bg-opacity-90">
                    Support Project
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
