import Link from 'next/link';
import { type FC, type InputHTMLAttributes, type ReactNode } from 'react';
import { ClockIcon } from '@/components/icons';

/**
 * The page frame every auth screen shares: the brand, an optional line under
 * it, the card, and the way back home.
 */
export const AuthShell: FC<{ subtitle?: string; children: ReactNode }> = ({
  subtitle,
  children,
}) => (
  <div className="min-h-screen bg-gradient-to-b from-action-tint to-white flex items-center justify-center px-4">
    <div className="max-w-md w-full">
      <div className="text-center mb-8">
        <Link href="/" className="text-3xl font-bold text-gray-900">
          Botsmann
        </Link>
        {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">{children}</div>

      <div className="mt-6 text-center">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
          Back to Home
        </Link>
      </div>
    </div>
  </div>
);

/**
 * The form's error line. While a rate limit is counting down it turns amber
 * and shows the countdown instead of the message.
 */
export const AuthAlert: FC<{ error: string; rateLimitSeconds: number }> = ({
  error,
  rateLimitSeconds,
}) => {
  if (!error) return null;
  const limited = rateLimitSeconds > 0;
  return (
    <div
      className={`p-3 rounded-lg text-sm ${limited ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-600'}`}
    >
      {limited ? (
        <div className="flex items-center gap-2">
          <ClockIcon className="w-5 h-5 flex-shrink-0" />
          <span>Too many attempts. Try again in {rateLimitSeconds}s</span>
        </div>
      ) : (
        error
      )}
    </div>
  );
};

type AuthFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: ReactNode;
  /** Something to sit at the label's right edge (e.g. a "Forgot password?" link). */
  labelExtra?: ReactNode;
};

/** A labelled input in the auth forms' one style. */
export const AuthField: FC<AuthFieldProps> = ({ id, label, labelExtra, ...input }) => (
  <div>
    {labelExtra ? (
      <div className="flex items-center justify-between mb-1">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {labelExtra}
      </div>
    ) : (
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
    )}
    <input
      id={id}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-action disabled:bg-gray-50 disabled:text-gray-500"
      {...input}
    />
  </div>
);

/** The form's primary button: busy label while submitting, countdown while limited. */
export const AuthSubmitButton: FC<{
  loading: boolean;
  loadingLabel: string;
  rateLimitSeconds: number;
  children: ReactNode;
}> = ({ loading, loadingLabel, rateLimitSeconds, children }) => (
  <button
    type="submit"
    disabled={loading || rateLimitSeconds > 0}
    className="w-full py-3 bg-action text-white rounded-lg font-medium hover:bg-action-hover disabled:opacity-50 transition-colors"
  >
    {loading ? loadingLabel : rateLimitSeconds > 0 ? `Wait ${rateLimitSeconds}s` : children}
  </button>
);
