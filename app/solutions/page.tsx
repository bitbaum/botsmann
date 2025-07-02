"use client";

import { useState, useMemo } from 'react';
import offerings from '@/data/offerings';
import HeroSection from '@/components/solutions/HeroSection';
import FilterBar, { Filters } from '@/components/solutions/FilterBar';
import SolutionsGrid from '@/components/solutions/SolutionsGrid';

const initialFilter: Filters = {
  type: [],
  useCase: [],
  target: [],
  status: []
};

export default function SolutionsPage() {
  const [filters, setFilters] = useState<Filters>(initialFilter);

  const toggleFilter = (category: keyof Filters, value: string) => {
    setFilters((prev) => {
      const values = prev[category].includes(value)
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value];
      return { ...prev, [category]: values };
    });
  };

  const filtered = useMemo(
    () =>
      offerings.filter(
        (o) =>
          (filters.type.length === 0 || filters.type.includes(o.type)) &&
          (filters.useCase.length === 0 || filters.useCase.includes(o.useCase)) &&
          (filters.target.length === 0 || filters.target.includes(o.target)) &&
          (filters.status.length === 0 || filters.status.includes(o.status))
      ),
    [filters]
  );

  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12 flex flex-col space-y-10">
      <HeroSection />

      <FilterBar filters={filters} toggle={toggleFilter} offerings={offerings} />

      <SolutionsGrid offerings={filtered} />
    </div>
  );
}
