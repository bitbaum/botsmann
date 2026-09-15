import Link from 'next/link';
import { QuickCreateFlow } from '@/components/shared/quick-create/QuickCreateFlow';

/**
 * Personal AI Page
 * Create memorial bots, companion bots, and other personal AI assistants
 */
export default function PersonalPage() {
  return (
    <QuickCreateFlow
      intro={
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-action">Personal AI</span>
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Create memorial bots for loved ones, companion bots, and other personal AI assistants
            that bring comfort and connection.
          </p>
        </div>
      }
      outro={
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Looking for professional AI advisors?{' '}
            <Link href="/professionals" className="text-action hover:text-action">
              Visit our AI Professionals
            </Link>
          </p>
        </div>
      }
    />
  );
}
