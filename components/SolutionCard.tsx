import Link from 'next/link';
import type { Solution } from '@/types/solution';

interface Props {
  solution: Solution;
}

export default function SolutionCard({ solution }: Props) {
  const isExternal = solution.link?.startsWith('http');
  const href = solution.link ?? `/solutions/${solution.slug}`;
  return (
    <Link
      href={href as any}
      target={isExternal ? '_blank' : undefined}
      className="group flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="text-3xl mb-2">{solution.icon}</div>
      <h3 className="text-xl font-semibold mb-1">{solution.title}</h3>
      <p className="text-gray-600 mb-2">{solution.overview}</p>
      <div className="flex flex-wrap gap-2 mb-2">
        <span className="inline-block bg-gray-100 text-xs px-2 py-1 rounded">
          {solution.type}
        </span>
        {solution.status !== 'Available' && (
          <span className="inline-block bg-openai-green text-white text-xs px-2 py-1 rounded">
            {solution.status}
          </span>
        )}
      </div>
      <span className="mt-auto text-sm font-medium text-openai-green group-hover:underline">
        Learn more →
      </span>
    </Link>
  );
}
