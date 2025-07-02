"use client";

import { useState } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import offerings, { Offering } from '@/data/offerings';

interface FilterState {
  type: string[];
  useCase: string[];
  target: string[];
  status: string[];
}

const initialFilter: FilterState = {
  type: [],
  useCase: [],
  target: [],
  status: []
};

export default function SolutionsPage() {
  const [filters, setFilters] = useState<FilterState>(initialFilter);

  const toggleFilter = (category: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const values = prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value];
      return { ...prev, [category]: values };
    });
  };

  const uniqueValues = (key: keyof Offering): string[] => {
    return Array.from(new Set(offerings.map((o) => o[key] as string)));
  };

  const filtered = offerings.filter((o) => {
    return (
      (filters.type.length === 0 || filters.type.includes(o.type)) &&
      (filters.useCase.length === 0 || filters.useCase.includes(o.useCase)) &&
      (filters.target.length === 0 || filters.target.includes(o.target)) &&
      (filters.status.length === 0 || filters.status.includes(o.status))
    );
  });

  const FilterGroup = (
    { title, category }: { title: string; category: keyof FilterState }) => {
    const values = uniqueValues(category as keyof Offering);
    return (
      <div className="flex flex-wrap gap-2">
        {values.map((val) => (
          <button
            key={val}
            onClick={() => toggleFilter(category, val)}
            className={`px-3 py-1 rounded-full text-sm border transition-colors ${
              filters[category].includes(val)
                ? 'bg-openai-green text-white border-openai-green'
                : 'border-gray-300 text-gray-700 hover:bg-gray-100'
            }`}
          >
            {val}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12">
      <header className="mb-10 text-center">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight">Solutions</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Discover our bots, platforms and services. Use the filters to explore
          offerings.
        </p>
      </header>

      <section className="mb-8 space-y-4 sticky top-16 bg-white py-4 z-10">
        <FilterGroup title="Type" category="type" />
        <FilterGroup title="Use Case" category="useCase" />
        <FilterGroup title="Target" category="target" />
        <FilterGroup title="Status" category="status" />
      </section>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <Link
            key={item.slug}
            href={`/solutions/${item.slug}` as Route}
            className="group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              {item.title}
            </h2>
            <p className="mb-4 text-gray-600 min-h-[3rem]">{item.overview}</p>
            <span className="mt-auto text-sm font-medium text-openai-green group-hover:underline">
              Learn more →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
