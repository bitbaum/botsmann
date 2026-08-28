import { type FC, useState } from 'react';

type UserAvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface UserAvatarProps {
  /** User's email to extract initial from */
  email?: string | null;
  /** Optional custom initial override */
  initial?: string;
  /** Optional avatar image URL */
  avatarUrl?: string | null;
  size?: UserAvatarSize;
  className?: string;
}

const sizeClasses: Record<UserAvatarSize, string> = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
} as const;

/**
 * Authenticated user avatar with gradient background
 * SSOT for user avatar styling in auth navigation
 *
 * Displays avatar image if URL provided, falls back to initial
 */
export const UserAvatar: FC<UserAvatarProps> = ({
  email,
  initial,
  avatarUrl,
  size = 'sm',
  className = '',
}) => {
  const [imageError, setImageError] = useState(false);
  const displayInitial = initial || email?.[0]?.toUpperCase() || 'U';
  const sizeClass = sizeClasses[size];

  // Show avatar image if URL is valid and hasn't errored
  // Using img tag for external URLs from any domain (avatars can be user-provided)
  if (avatarUrl && !imageError) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarUrl}
        alt="User avatar"
        className={`${sizeClass} rounded-full object-cover ${className}`}
        onError={() => setImageError(true)}
      />
    );
  }

  // Fallback to initial with gradient background
  return (
    <div
      className={`${sizeClass} rounded-full bg-action flex items-center justify-center text-white font-bold ${className}`}
    >
      {displayInitial}
    </div>
  );
};
