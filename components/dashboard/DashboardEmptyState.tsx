'use client';

import { type FC } from 'react';
import Link from 'next/link';

interface DashboardEmptyStateProps {
  displayName?: string | null;
}

/**
 * Welcoming empty state for new users with no data yet.
 * Focuses on value and guides users to their first action.
 */
export const DashboardEmptyState: FC<DashboardEmptyStateProps> = ({ displayName }) => {
  return (
    <div className="space-y-6">
      {/* Main CTA Card */}
      <div className="bg-gradient-to-br from-action-tint via-white to-action-tint rounded-2xl border border-edge p-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-action to-action-hover rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {displayName ? `Welcome, ${displayName}!` : 'Let\u2019s get you started'}
        </h2>

        <p className="text-gray-600 max-w-lg mx-auto mb-6 leading-relaxed">
          Upload your first document and ask a question. Most users get their first answer in under
          60 seconds.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/documents"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-action to-action-hover text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            Upload Your First Document
          </Link>

          <Link
            href="/professionals"
            className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-action text-gray-700 hover:text-action px-6 py-3 rounded-xl font-semibold transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Browse AI Professionals
          </Link>
        </div>
      </div>

      {/* What You Can Do Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <CapabilityCard
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          }
          iconColor="text-action"
          iconBg="bg-action-tint"
          title="Analyze Documents"
          description="Upload contracts, research papers, or any document and get instant answers"
          examples={[
            'Review a lease agreement',
            'Summarize a research paper',
            'Extract key terms from contracts',
          ]}
        />

        <CapabilityCard
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          }
          iconColor="text-green-600"
          iconBg="bg-green-100"
          title="Get Expert Advice"
          description="Chat with AI professionals trained in legal, medical, and financial domains"
          examples={['Ask legal questions', 'Understand medical terms', 'Get financial guidance']}
        />

        <CapabilityCard
          icon={<span className="text-2xl">🤖</span>}
          iconColor="text-action"
          iconBg="bg-action-tint"
          title="Build Custom Bots"
          description="Create your own AI assistant trained on your specific knowledge"
          examples={['Company FAQ bot', 'Product support assistant', 'Personal knowledge base']}
        />
      </div>

      {/* Social Proof */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          What users are saying
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <TestimonialCard
            quote="I uploaded my lease and understood the termination clause in 30 seconds. Game changer."
            author="Sarah M."
            context="Reviewed rental agreement"
          />
          <TestimonialCard
            quote="Finally, a way to ask medical questions without the anxiety of a doctor's office."
            author="Marcus T."
            context="Health consultation"
          />
        </div>
      </div>
    </div>
  );
};

interface CapabilityCardProps {
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
  title: string;
  description: string;
  examples: string[];
}

function CapabilityCard({
  icon,
  iconColor,
  iconBg,
  title,
  description,
  examples,
}: CapabilityCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div
        className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center ${iconColor} mb-3`}
      >
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <ul className="text-xs text-gray-500 space-y-1">
        {examples.map((example) => (
          <li key={example} className="flex items-center gap-1.5">
            <span className="w-1 h-1 bg-gray-400 rounded-full" />
            {example}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface TestimonialCardProps {
  quote: string;
  author: string;
  context: string;
}

function TestimonialCard({ quote, author, context }: TestimonialCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <p className="text-gray-700 text-sm mb-2 italic">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="font-medium">{author}</span>
        <span>{context}</span>
      </div>
    </div>
  );
}
