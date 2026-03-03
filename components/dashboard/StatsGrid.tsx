'use client';

import type { DashboardStats } from '@/lib/hooks/useDashboardStats';

interface StatsGridProps {
  stats: DashboardStats;
  loading: boolean;
}

export function StatsGrid({ stats, loading }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        label="Documents"
        value={stats.documentsTotal}
        subtext={`${stats.documentsReady} ready`}
        icon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        }
        color="blue"
        loading={loading}
      />
      <StatCard
        label="Conversations"
        value={stats.conversationsTotal}
        subtext={`${stats.messagesTotal} messages`}
        icon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        }
        color="green"
        loading={loading}
      />
      <StatCard
        label="Custom Bots"
        value={stats.botsTotal}
        subtext={`${stats.botsPublished} published`}
        icon={<span className="text-lg">🤖</span>}
        color="purple"
        loading={loading}
      />
      <StatCard
        label="Pending"
        value={stats.documentsPending}
        subtext="need processing"
        icon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
        color="yellow"
        loading={loading}
      />
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  subtext: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'yellow' | 'orange' | 'indigo';
  loading?: boolean;
}

function StatCard({ label, value, subtext, icon, color, loading }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    orange: 'bg-orange-50 text-orange-600',
    indigo: 'bg-indigo-50 text-indigo-600',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          {loading ? (
            <div className="h-7 w-8 bg-gray-200 rounded animate-pulse" />
          ) : (
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          )}
          <p className="text-xs text-gray-400">{subtext}</p>
        </div>
      </div>
    </div>
  );
}
