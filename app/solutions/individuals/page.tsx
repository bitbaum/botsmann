'use client';

import React from 'react';
import Link from 'next/link';
import rawData from '@/data/solutions.json';
import type { Solution } from '@/types/solution';

const data = rawData as Record<string, Solution[]>;

export default function IndividualsSolutions() {
  const genericInfo =
    'We provide personalized AI solutions for individuals to manage daily life, learn new skills, and get tailored insights.';
  const individuals: Solution[] = data.individuals;

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Solutions for Individuals</h1>
        <p className="text-lg text-gray-700 mt-4">{genericInfo}</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {individuals.map((solution) => (
          <Link
            key={solution.slug}
            href={`/solutions/individuals/${solution.slug}`}
            className="block bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-2">{solution.title}</h2>
            <p className="text-gray-600">{solution.overview}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
