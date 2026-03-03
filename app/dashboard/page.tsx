'use client';

import { useRequireAuth } from '@/lib/auth';
import { useDashboardStats } from '@/lib/hooks/useDashboardStats';
import { PageLoading } from '@/components/shared/LoadingSpinner';
import { OnboardingChecklist } from '@/components/onboarding';
import {
  DashboardEmptyState,
  WelcomeHeader,
  StatsGrid,
  QuickActions,
  RecentActivity,
} from '@/components/dashboard';

export default function DashboardPage() {
  const { user, loading: authLoading, displayName, avatarUrl } = useRequireAuth();
  const { stats, documents, bots, loading, isEmptyState } = useDashboardStats(user?.id);

  if (authLoading || !user) {
    return <PageLoading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <WelcomeHeader
          user={user}
          displayName={displayName}
          avatarUrl={avatarUrl}
          isEmptyState={isEmptyState}
        />

        {isEmptyState ? (
          <DashboardEmptyState displayName={displayName} />
        ) : (
          <>
            <div className="mb-8">
              <OnboardingChecklist
                documentsCount={stats.documentsTotal}
                readyDocumentsCount={stats.documentsReady}
                conversationsCount={stats.conversationsTotal}
                botsCount={stats.botsTotal}
              />
            </div>

            <StatsGrid stats={stats} loading={loading} />
            <QuickActions />
            <RecentActivity documents={documents} bots={bots} loading={loading} />
          </>
        )}
      </div>
    </div>
  );
}
