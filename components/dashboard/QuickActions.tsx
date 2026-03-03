'use client';

import Link from 'next/link';
import type { Route } from 'next';

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <QuickActionCard
          href="/documents"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          }
          label="Upload Document"
          color="blue"
        />
        <QuickActionCard
          href="/bots/create"
          icon={<span className="text-2xl">🤖</span>}
          label="Create Bot"
          color="purple"
        />
        <QuickActionCard
          href="/documents"
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
          label="Chat with Docs"
          color="green"
        />
        <QuickActionCard
          href="/bots/mine"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          }
          label="My Bots"
          color="indigo"
        />
        <QuickActionCard
          href="/infrastructure"
          icon={
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          }
          label="AI Settings"
          color="orange"
        />
      </div>
    </div>
  );
}

interface QuickActionCardProps {
  href: Route;
  icon: React.ReactNode;
  label: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'indigo';
}

function QuickActionCard({ href, icon, label, color }: QuickActionCardProps) {
  const colorClasses = {
    blue: 'hover:bg-blue-50 hover:border-blue-200',
    green: 'hover:bg-green-50 hover:border-green-200',
    purple: 'hover:bg-purple-50 hover:border-purple-200',
    orange: 'hover:bg-orange-50 hover:border-orange-200',
    indigo: 'hover:bg-indigo-50 hover:border-indigo-200',
  };

  const iconColorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
    indigo: 'text-indigo-600',
  };

  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl transition-colors ${colorClasses[color]}`}
    >
      <div className={iconColorClasses[color]}>{icon}</div>
      <p className="text-sm font-medium text-gray-700 mt-2 text-center">{label}</p>
    </Link>
  );
}
