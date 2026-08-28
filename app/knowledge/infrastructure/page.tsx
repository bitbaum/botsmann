import type { Metadata } from 'next';
import type { Route } from 'next';
import Link from 'next/link';
import { fetchInfrastructureGuides } from '@/lib/knowledge';

export const metadata: Metadata = {
  title: 'Infrastructure Guides | Botsmann Knowledge Center',
  description:
    'Compare hosting options, AI models, and deployment strategies for your AI infrastructure.',
};

export default async function InfrastructurePage() {
  // Fetch guides for future use when content is available
  const _guides = await fetchInfrastructureGuides();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-action-tint border-b border-edge">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/knowledge" className="hover:text-action">
              Knowledge
            </Link>
            <span>/</span>
            <span className="text-gray-900">Infrastructure</span>
          </nav>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">Infrastructure & Hosting</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Choose the right infrastructure for your AI projects. Compare hosting options, AI
            models, and understand the costs involved.
          </p>
        </div>
      </div>

      {/* Decision Helper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Which hosting is right for you?
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Self-Hosted Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <ServerIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Self-Hosted</h3>
              <p className="text-gray-600 mb-4">
                Full control over your infrastructure. Run on your own servers or VPS.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Maximum data privacy
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  No usage limits
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Predictable costs
                </li>
              </ul>
              <div className="text-sm text-gray-500">
                <span className="font-medium">Best for:</span> Teams with DevOps experience,
                privacy-sensitive applications
              </div>
            </div>

            {/* Cloud Managed Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-action-tint rounded-lg flex items-center justify-center mb-4">
                <CloudIcon className="w-6 h-6 text-action" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cloud Managed</h3>
              <p className="text-gray-600 mb-4">
                Let cloud providers handle infrastructure. Quick to deploy and scale.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Easy to get started
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Auto-scaling
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  No maintenance required
                </li>
              </ul>
              <div className="text-sm text-gray-500">
                <span className="font-medium">Best for:</span> Startups, rapid prototyping, teams
                without DevOps
              </div>
            </div>

            {/* Serverless Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <BoltIcon className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Serverless</h3>
              <p className="text-gray-600 mb-4">
                Pay only for what you use. Perfect for variable workloads.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-gray-600">
                  <CheckIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Pay-per-use pricing
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Zero idle costs
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <CheckIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Instant scaling
                </li>
              </ul>
              <div className="text-sm text-gray-500">
                <span className="font-medium">Best for:</span> Low-traffic apps, side projects,
                event-driven workloads
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Guides */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Detailed Comparisons</h2>
          <p className="text-gray-600 mb-8">
            In-depth guides to help you make informed decisions about your infrastructure.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Hosting Comparison */}
            <Link
              href={'/knowledge/infrastructure/hosting-comparison' as Route}
              className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-action transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-action-tint rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🏗️</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-action transition-colors mb-2">
                    Hosting Comparison
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Compare self-hosted, cloud, and serverless options. Understand the trade-offs
                    between Vercel, AWS, GCP, and running your own servers.
                  </p>
                  <div className="flex items-center text-sm text-action font-medium">
                    Read comparison
                    <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Model Comparison */}
            <Link
              href={'/knowledge/infrastructure/model-comparison' as Route}
              className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-action transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-action-tint rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🤖</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-action transition-colors mb-2">
                    AI Model Comparison
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    OpenAI vs Claude vs open source. Compare GPT-4, Claude 3, Llama 3, Mistral by
                    quality, cost, speed, and privacy.
                  </p>
                  <div className="flex items-center text-sm text-action font-medium">
                    Read comparison
                    <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Cost Estimation */}
            <Link
              href={'/knowledge/infrastructure/cost-estimation' as Route}
              className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-action transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-action transition-colors mb-2">
                    Cost Estimation Guide
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Understand token pricing, estimate monthly costs for different usage levels, and
                    discover hidden infrastructure costs.
                  </p>
                  <div className="flex items-center text-sm text-action font-medium">
                    Read guide
                    <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Security Best Practices */}
            <Link
              href={'/knowledge/infrastructure/security' as Route}
              className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-action transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🔒</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-action transition-colors mb-2">
                    Security Best Practices
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Secure your AI infrastructure. API key management, data encryption, rate
                    limiting, and compliance considerations.
                  </p>
                  <div className="flex items-center text-sm text-action font-medium">
                    Read guide
                    <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Quick Reference Tables */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Reference</h2>
          <p className="text-gray-600 mb-8">At-a-glance comparisons for common decisions.</p>

          {/* Hosting Quick Compare */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Hosting Options</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Option
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Setup
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cost
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Control
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Best For
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      Vercel / Netlify
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <DifficultyDot level="easy" /> Easy
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      $20-100/mo
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <DifficultyDot level="low" /> Limited
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">Quick deploys, small teams</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      AWS / GCP
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <DifficultyDot level="medium" /> Medium
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      $50-500/mo
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <DifficultyDot level="high" /> High
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">Scale, enterprise features</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      Self-hosted VPS
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <DifficultyDot level="hard" /> Complex
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      $10-200/mo
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <DifficultyDot level="full" /> Full
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">Privacy, cost control</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Model Quick Compare */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">AI Models</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Model
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quality
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cost
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Speed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Self-host?
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      GPT-4o
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <QualityStars stars={5} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      $5/1M tokens
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <DifficultyDot level="high" /> Fast
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">No</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      Claude 3.5 Sonnet
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <QualityStars stars={5} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      $3/1M tokens
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <DifficultyDot level="high" /> Fast
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">No</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      Llama 3 70B
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <QualityStars stars={4} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      Free (self-host)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <DifficultyDot level="medium" /> Medium
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Yes</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      Mistral Large
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <QualityStars stars={4} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      $2/1M tokens
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <DifficultyDot level="high" /> Fast
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="rounded-2xl bg-action p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Need Help Deciding?</h2>
          <p className="text-paper mb-6 max-w-xl mx-auto">
            Not sure which infrastructure is right for your project? We can help you evaluate
            options and make the right choice.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/knowledge/guides?category=infrastructure"
              className="inline-flex items-center px-6 py-3 bg-white text-action font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Browse Infrastructure Guides
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-action text-white font-semibold rounded-lg hover:bg-action-hover transition-colors"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function DifficultyDot({ level }: { level: 'easy' | 'medium' | 'hard' | 'low' | 'high' | 'full' }) {
  const colors = {
    easy: 'bg-green-500',
    medium: 'bg-amber-500',
    hard: 'bg-red-500',
    low: 'bg-amber-500',
    high: 'bg-green-500',
    full: 'bg-action',
  };

  return (
    <span className="inline-flex items-center">
      <span className={`w-2 h-2 rounded-full ${colors[level]} mr-2`} />
    </span>
  );
}

function QualityStars({ stars }: { stars: number }) {
  return (
    <span className="inline-flex text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < stars ? 'fill-current' : 'fill-gray-300'}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

// Icon Components
function ServerIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
      />
    </svg>
  );
}

function CloudIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
      />
    </svg>
  );
}

function BoltIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}
