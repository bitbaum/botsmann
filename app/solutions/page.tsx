'use client';
import { useState, useMemo } from 'react';
import solutions from '@/data/solutions';
import SolutionsGrid from '@/components/SolutionsGrid';
import SolutionSidebarFilters, { Filters } from '@/components/SolutionSidebarFilters';

export default function SolutionsPage() {
  const [filters, setFilters] = useState<Filters>({
    type: [],
    audience: [],
    domain: [],
    status: [],
  });

  const filtered = useMemo(() => {
    return solutions.filter((s) =>
      (filters.type.length ? filters.type.includes(s.type) : true) &&
      (filters.audience.length ? filters.audience.some((a) => s.audience.includes(a)) : true) &&
      (filters.domain.length ? filters.domain.some((d) => s.domain.includes(d)) : true) &&
      (filters.status.length ? filters.status.includes(s.status) : true)
    );
  }, [filters]);

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-2 text-4xl font-semibold">Explore All Our Bots & Platforms</h1>
        <p className="text-gray-600">AI companions, tools & services</p>
      </div>
      <div className="flex gap-8">
        <aside className="hidden lg:block w-60">
          <SolutionSidebarFilters filters={filters} setFilters={setFilters} />
        </aside>
        <div className="flex-1">
          <SolutionsGrid solutions={filtered} />
        </div>
      </div>
    </div>
  );
}
