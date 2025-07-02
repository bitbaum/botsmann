import { notFound } from 'next/navigation';
import offerings from '@/data/offerings';

interface Props {
  params: { slug: string };
}

export default function SolutionDetail({ params }: Props) {
  const solution = offerings.find((o) => o.slug === params.slug);
  if (!solution) return notFound();

  return (
    <div className="mx-auto max-w-screen-md px-6 py-12">
      <h1 className="mb-4 text-4xl font-semibold text-gray-900">
        {solution.title}
      </h1>
      <p className="text-gray-700 mb-6">{solution.overview}</p>
      <div className="space-y-2 text-sm">
        <div>
          <strong>Type:</strong> {solution.type}
        </div>
        <div>
          <strong>Use Case:</strong> {solution.useCase}
        </div>
        <div>
          <strong>Target:</strong> {solution.target}
        </div>
        <div>
          <strong>Status:</strong> {solution.status}
        </div>
      </div>
    </div>
  );
}
