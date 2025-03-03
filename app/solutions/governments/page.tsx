'use client';

import React from 'react';
import Link from 'next/link';
import solutionsData from '@/data/solutions.json';

export default function GovernmentsSolutions() {
  const genericInfo = "Our solutions for governments focus on transparency, efficiency, and public accountability through advanced AI tools.";
  const governments = solutionsData.governments;

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold">Solutions for Governments</h1>
        <p className="text-lg text-gray-700 mt-4">{genericInfo}</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {governments.map((solution: any) => (
          <Link
            key={solution.slug}
            href={`/solutions/governments/${solution.slug}`}
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
