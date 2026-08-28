'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Route } from 'next';
import { useRequireAuth } from '@/lib/auth';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { PageLoading, InlineLoading } from '@/components/shared/LoadingSpinner';
import { EditIcon, HomeIcon, DocumentIcon, SettingsIcon, UserIcon } from '@/components/icons';
import { getAccentBorderClass } from '@/lib/config/colors';

interface CustomBot {
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

interface ProfileStats {
  documentsCount: number;
  botsCount: number;
  publishedBotsCount: number;
}

export default function ProfilePage() {
  const { user, loading: authLoading, displayName, avatarUrl } = useRequireAuth();
  const [bots, setBots] = useState<CustomBot[]>([]);
  const [stats, setStats] = useState<ProfileStats>({
    documentsCount: 0,
    botsCount: 0,
    publishedBotsCount: 0,
  });
  const [loading, setLoading] = useState(true);

  // Load profile data
  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      try {
        const [docsResponse, botsResponse] = await Promise.all([
          fetch('/api/documents'),
          fetch('/api/custom-bots'),
        ]);

        const docsData = await docsResponse.json();
        const botsData = await botsResponse.json();

        if (docsData.success) {
          setStats((prev) => ({
            ...prev,
            documentsCount: docsData.documents?.length || 0,
          }));
        }

        if (botsData.success) {
          const botsList: CustomBot[] = botsData.bots || [];
          setBots(botsList);
          setStats((prev) => ({
            ...prev,
            botsCount: botsList.length,
            publishedBotsCount: botsList.filter((b) => b.is_published).length,
          }));
        }
      } catch (err) {
        // Silently handle
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  if (authLoading || !user) {
    return <PageLoading />;
  }

  const publishedBots = bots.filter((b) => b.is_published);
  const draftBots = bots.filter((b) => !b.is_published);

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return 'Unknown';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-action-tint to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <UserAvatar
              email={user.email}
              initial={displayName?.[0]}
              avatarUrl={avatarUrl}
              size="xl"
            />
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900">
                {displayName || 'Anonymous User'}
              </h1>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-sm text-gray-400 mt-1">
                Member since {formatDate(user.created_at)}
              </p>

              <div className="flex flex-wrap gap-4 mt-4 justify-center sm:justify-start">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{stats.documentsCount}</p>
                  <p className="text-xs text-gray-500">Documents</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{stats.botsCount}</p>
                  <p className="text-xs text-gray-500">Bots</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{stats.publishedBotsCount}</p>
                  <p className="text-xs text-gray-500">Published</p>
                </div>
              </div>

              <div className="mt-4">
                <Link
                  href="/settings"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <EditIcon />
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Published Bots */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Published Bots</h2>
            <Link href="/bots/create" className="text-action hover:text-action text-sm font-medium">
              Create new
            </Link>
          </div>

          {loading ? (
            <InlineLoading />
          ) : publishedBots.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-5xl">🤖</span>
              <p className="text-gray-500 mt-4">No published bots yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Create and publish bots to share them with others
              </p>
              <Link
                href="/bots/create"
                className="inline-block mt-4 px-4 py-2 bg-action text-white rounded-lg text-sm font-medium hover:bg-action-hover transition-colors"
              >
                Create Your First Bot
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {publishedBots.map((bot) => (
                <BotCard key={bot.id} bot={bot} />
              ))}
            </div>
          )}
        </div>

        {/* Draft Bots */}
        {draftBots.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Drafts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {draftBots.map((bot) => (
                <BotCard key={bot.id} bot={bot} isDraft />
              ))}
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickLink href="/dashboard" icon={<HomeIcon />} label="Dashboard" />
            <QuickLink href="/documents" icon={<DocumentIcon />} label="Documents" />
            <QuickLink href="/infrastructure" icon={<SettingsIcon />} label="AI Settings" />
            <QuickLink href="/settings" icon={<UserIcon />} label="Settings" />
          </div>
        </div>
      </div>
    </div>
  );
}

function BotCard({ bot, isDraft }: { bot: CustomBot; isDraft?: boolean }) {
  const borderColor = getAccentBorderClass(bot.accent_color);

  return (
    <Link
      href={`/bots/custom/${bot.slug}`}
      className={`block p-4 border-2 rounded-xl transition-all hover:shadow-md ${borderColor}`}
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl flex-shrink-0">{bot.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 truncate">{bot.title}</h3>
            {isDraft && (
              <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                Draft
              </span>
            )}
          </div>
          {bot.description && (
            <p className="text-sm text-gray-500 line-clamp-2 mt-1">{bot.description}</p>
          )}
          <p className="text-xs text-gray-400 mt-2">{bot.knowledge_count} knowledge chunks</p>
        </div>
      </div>
    </Link>
  );
}

function QuickLink({ href, icon, label }: { href: Route; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
    >
      <div className="text-gray-600">{icon}</div>
      <p className="text-sm font-medium text-gray-700 mt-2">{label}</p>
    </Link>
  );
}
