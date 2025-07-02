import type { Solution } from '@/types/solution';
import SolutionCard from './SolutionCard';

export default function SolutionsGrid({ solutions }: { solutions: Solution[] }) {
  if (solutions.length === 0) {
    return <p>No solutions match selected filters.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {solutions.map((solution) => (
        <SolutionCard key={solution.slug} solution={solution} />
      ))}
    </div>
  );
}
