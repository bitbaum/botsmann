import solutions from '@/data/solutions';
import SolutionLayout from '@/components/SolutionLayout';
import { notFound } from 'next/navigation';

export default function SolutionPage({ params }: { params: { slug: string } }) {
  const solution = solutions.find((s) => s.slug === params.slug);
  if (!solution) {
    notFound();
  }
  return <SolutionLayout data={solution} />;
}
