/**
 * Dashboard Stats Hook
 *
 * Handles fetching and managing dashboard statistics.
 * Centralizes data loading logic for reusability and testing.
 */

import { useState, useEffect, useCallback } from 'react';
import { DOCUMENT_STATUS } from '@/lib/constants';
import type { Document } from '@/types/document';
import type { UsageStats } from '@/types/conversation';

export interface CustomBot {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  emoji: string;
  accent_color: string;
  is_public: boolean;
  is_published: boolean;
  knowledge_count: number;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  documentsTotal: number;
  documentsReady: number;
  documentsPending: number;
  botsTotal: number;
  botsPublished: number;
  conversationsTotal: number;
  messagesTotal: number;
}

const INITIAL_STATS: DashboardStats = {
  documentsTotal: 0,
  documentsReady: 0,
  documentsPending: 0,
  botsTotal: 0,
  botsPublished: 0,
  conversationsTotal: 0,
  messagesTotal: 0,
};

interface UseDashboardStatsResult {
  stats: DashboardStats;
  documents: Document[];
  bots: CustomBot[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  isEmptyState: boolean;
}

export function useDashboardStats(userId: string | undefined): UseDashboardStatsResult {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [bots, setBots] = useState<CustomBot[]>([]);
  const [stats, setStats] = useState<DashboardStats>(INITIAL_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const [docsResponse, botsResponse, statsResponse] = await Promise.all([
        fetch('/api/documents'),
        fetch('/api/custom-bots'),
        fetch('/api/stats'),
      ]);

      const docsData = await docsResponse.json();
      const botsData = await botsResponse.json();
      const statsData = await statsResponse.json();

      if (docsData.success) {
        const docs = docsData.documents || [];
        setDocuments(docs);
        setStats((prev) => ({
          ...prev,
          documentsTotal: docs.length,
          documentsReady: docs.filter((d: Document) => d.status === DOCUMENT_STATUS.READY).length,
          documentsPending: docs.filter((d: Document) => d.status === DOCUMENT_STATUS.PENDING)
            .length,
        }));
      }

      if (botsData.success) {
        const botsList = botsData.data?.bots || botsData.bots || [];
        setBots(botsList);
        setStats((prev) => ({
          ...prev,
          botsTotal: botsList.length,
          botsPublished: botsList.filter((b: CustomBot) => b.is_published).length,
        }));
      }

      if (statsData.success && statsData.data?.stats) {
        const apiStats: UsageStats = statsData.data.stats;
        setStats((prev) => ({
          ...prev,
          conversationsTotal: apiStats.total_conversations,
          messagesTotal: apiStats.total_messages,
        }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- loads dashboard stats from the API on mount
    loadData();
  }, [loadData]);

  const isEmptyState =
    !loading &&
    stats.documentsTotal === 0 &&
    stats.conversationsTotal === 0 &&
    stats.botsTotal === 0;

  return {
    stats,
    documents,
    bots,
    loading,
    error,
    refresh: loadData,
    isEmptyState,
  };
}
