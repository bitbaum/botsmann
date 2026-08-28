/**
 * Loading Spinner Component
 *
 * SSOT for loading spinners across the app.
 * Use this instead of duplicating spinner markup.
 */

interface LoadingSpinnerProps {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to center in full screen */
  fullScreen?: boolean;
  /** Custom className for the spinner */
  className?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
} as const;

export function LoadingSpinner({
  size = 'lg',
  fullScreen = false,
  className,
}: LoadingSpinnerProps) {
  const spinner = (
    <div
      className={`animate-spin rounded-full border-b-2 border-action ${sizeClasses[size]} ${className || ''}`}
    />
  );

  if (fullScreen) {
    return <div className="min-h-screen flex items-center justify-center">{spinner}</div>;
  }

  return spinner;
}

/**
 * Full page loading state - use for page-level loading
 */
export function PageLoading() {
  return <LoadingSpinner size="lg" fullScreen />;
}

/**
 * Inline loading state - use within sections
 */
export function InlineLoading({ className }: { className?: string }) {
  return (
    <div className={`flex justify-center py-8 ${className || ''}`}>
      <LoadingSpinner size="md" />
    </div>
  );
}
