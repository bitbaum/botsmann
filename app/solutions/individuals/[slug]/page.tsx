'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import rawData from '@/data/solutions.json';
import SolutionLayout, { SolutionData } from '@/components/SolutionLayout';
import type { Solution } from '@/types/solution';

const data = rawData as Record<string, Solution[]>;

export default function SolutionPage() {
  const { slug } = useParams();
  const category = 'individuals'; // Hard-coded since this file is under individuals

  const solutionData: SolutionData | undefined = data[category]?.find(
    (s) => s.slug === slug
  );

  if (!solutionData) {
    return <div>Solution not found</div>;
  }

  return <SolutionLayout data={solutionData} />;
}
