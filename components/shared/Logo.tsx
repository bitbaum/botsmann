import { type FC } from 'react';
import Link from 'next/link';
import type { Route } from 'next';

interface LogoProps {
  /** Link destination. Set to null to render without a link */
  href?: Route | null;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: {
    icon: 'px-2 py-1 text-sm',
    text: 'text-lg',
  },
  md: {
    icon: 'px-4 py-2 text-xl',
    text: 'text-2xl',
  },
  lg: {
    icon: 'px-5 py-3 text-2xl',
    text: 'text-3xl',
  },
} as const;

/**
 * Botsmann Logo component
 * Single source of truth for logo styling across the app
 */
export const Logo: FC<LogoProps> = ({ href = '/' as Route, showText = true, size = 'md' }) => {
  const sizes = sizeClasses[size];

  const logoContent = (
    <div className="group flex items-center space-x-2.5">
      <div
        className={`relative bg-brand text-paper font-serif font-semibold ${sizes.icon} rounded-btn`}
      >
        B
      </div>
      {showText && (
        <span className={`${sizes.text} font-serif font-semibold tracking-tight text-ink`}>
          Botsmann
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="flex items-center">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};
