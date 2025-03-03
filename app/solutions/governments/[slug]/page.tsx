'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import solutionsData from '@/data/solutions.json';
import SolutionLayout, { SolutionData } from '@/components/SolutionLayout';

export default function SolutionPage() {
  const { slug } = useParams();
  const category = "governments";  // Hard-coded since this file is under governments

  const solutionData: SolutionData | undefined = solutionsData[category]?.find(
    (s: any) => s.slug === slug
  );

  if (!solutionData) {
    return <div>Solution not found</div>;
  }

  return <SolutionLayout data={solutionData} />;
}
