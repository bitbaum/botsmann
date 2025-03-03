import { Bot } from '@/data/bots';
import bots from '@/data/bots';

export default function GovSpendingTracker() {
  const bot = bots.find(b => b.slug === 'gov-spending-tracker');
  
  return (
    <div className="mx-auto max-w-screen-xl px-6 py-12">
      <h1 className="mb-8 text-4xl font-semibold tracking-tight">{bot?.title}</h1>
      <div className="mb-12">
        <p className="text-lg text-gray-600">{bot?.overview}</p>
      </div>
      
      {/* Timeline UI */}
      <div className="space-y-4">
        {/* Example payment entry - will be replaced with real data */}
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-start justify-between">
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Payment ID: #GOV-2024-001</p>
                <p className="text-sm text-gray-500">Feb 8, 2024</p>
              </div>
              <div className="mt-2">
                <p className="font-medium">
                  <span className="text-openai-green">Department of Transportation</span>
                  {' → '}
                  <span>Acme Construction Co.</span>
                </p>
                <p className="mt-1 text-2xl font-semibold">$1,250,000</p>
              </div>
              <div className="mt-3">
                <p className="text-gray-600">Road maintenance and repair - Highway 101 Section B</p>
                <p className="mt-1 text-sm text-gray-500">Legal basis: Contract #DOT-2024-789</p>
              </div>
              
              {/* Social interactions */}
              <div className="mt-4 flex items-center space-x-6 border-t border-gray-100 pt-4">
                <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-openai-green">
                  <span>👍</span>
                  <span>Like</span>
                  <span className="text-gray-400">(24)</span>
                </button>
                <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-openai-green">
                  <span>💬</span>
                  <span>Comment</span>
                  <span className="text-gray-400">(8)</span>
                </button>
                <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-openai-green">
                  <span>↗️</span>
                  <span>Share</span>
                </button>
                <button className="ml-auto flex items-center space-x-2 rounded-md bg-openai-green px-4 py-1 text-sm font-medium text-white hover:bg-opacity-90">
                  <span>💝</span>
                  <span>Donate</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy notice */}
        <div className="rounded-md bg-gray-50 p-4">
          <p className="text-sm text-gray-600">
            🔒 Some recipient names may be altered to protect individual privacy, particularly for welfare recipients.
            This ensures transparency while maintaining personal data protection.
          </p>
        </div>
      </div>
    </div>
  );
}
