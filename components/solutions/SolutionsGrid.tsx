import React from 'react';
import { Offering } from '@/data/offerings';
import SolutionCard from './SolutionCard';

interface Props {
  offerings: Offering[];
}

export default function SolutionsGrid({ offerings }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {offerings.map((o) => (
        <SolutionCard key={o.slug} offering={o} />
      ))}
    </div>
  );
}
