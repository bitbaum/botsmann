import React from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { Offering } from '@/data/offerings';

interface Props {
  offering: Offering;
}

export default function SolutionCard({ offering }: Props) {
  const { slug, title, overview, icon } = offering;
  return (
    <Link
      href={`/solutions/${slug}` as Route}
      className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-transform hover:shadow-md hover:-translate-y-1"
    >
      <div className="mb-4 text-3xl">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mb-4 text-gray-600 flex-1">{overview}</p>
      <span className="text-sm font-medium text-openai-green group-hover:underline">
        Learn more →
      </span>
    </Link>
  );
}
