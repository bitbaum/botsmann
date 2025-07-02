'use client';
import type { Solution } from '@/types/solution';
import { useMemo } from 'react';

export interface Filters {
  type: string[];
  audience: string[];
  domain: string[];
  status: string[];
}

interface Props {
  filters: Filters;
  setFilters: (f: Filters) => void;
}

function toggle(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

const OPTIONS = {
  type: ['Bot', 'Platform', 'Tool', 'Service'],
  audience: ['Personal', 'Business', 'Public'],
  status: ['Available', 'Coming Soon', 'In Concept'],
};

export default function SolutionSidebarFilters({ filters, setFilters }: Props) {
  return (
    <div className="space-y-6">
      {(Object.keys(OPTIONS) as Array<keyof typeof OPTIONS>).map((category) => (
        <div key={category}>
          <h4 className="font-medium mb-2 capitalize">{category}</h4>
          {OPTIONS[category].map((opt) => (
            <label key={opt} className="flex items-center space-x-2 text-sm mb-1">
              <input
                type="checkbox"
                checked={filters[category].includes(opt)}
                onChange={() =>
                  setFilters({
                    ...filters,
                    [category]: toggle(filters[category], opt),
                  })
                }
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}
