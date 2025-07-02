'use client';

import React from 'react';
import FilterPill from './FilterPill';
import { Offering } from '@/data/offerings';

export interface Filters {
  type: string[];
  useCase: string[];
  target: string[];
  status: string[];
}

interface FilterBarProps {
  filters: Filters;
  toggle: (category: keyof Filters, value: string) => void;
  offerings: Offering[];
}

export default function FilterBar({ filters, toggle, offerings }: FilterBarProps) {
  const uniqueValues = (key: keyof Offering) =>
    Array.from(new Set(offerings.map((o) => o[key] as string)));

  const renderGroup = (category: keyof Filters, title: string) => (
    <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2">
      {uniqueValues(category as keyof Offering).map((val) => (
        <FilterPill
          key={val}
          label={val}
          active={filters[category].includes(val)}
          onClick={() => toggle(category, val)}
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-3">
      {renderGroup('type', 'Type')}
      {renderGroup('useCase', 'Use Case')}
      {renderGroup('target', 'Target')}
      {renderGroup('status', 'Status')}
    </div>
  );
}
