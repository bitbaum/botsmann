'use client';

import type { User } from '@supabase/supabase-js';
import { UserAvatar } from '@/components/shared/UserAvatar';

interface WelcomeHeaderProps {
  user: User;
  displayName: string | null;
  avatarUrl: string | null;
  isEmptyState: boolean;
}

export function WelcomeHeader({ user, displayName, avatarUrl, isEmptyState }: WelcomeHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-2">
        <UserAvatar email={user.email} initial={displayName?.[0]} avatarUrl={avatarUrl} size="lg" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEmptyState
              ? `Welcome${displayName ? `, ${displayName}` : ''}!`
              : `Welcome back${displayName ? `, ${displayName}` : ''}`}
          </h1>
          <p className="text-gray-600">
            {isEmptyState
              ? 'Your AI workspace is ready. Let\u2019s get started!'
              : 'Here\u2019s what\u2019s happening with your AI workspace'}
          </p>
        </div>
      </div>
    </div>
  );
}
