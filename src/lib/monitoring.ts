// Monitoring and error tracking setup
import * as Sentry from '@sentry/nextjs';

// Initialize Sentry
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  debug: process.env.NODE_ENV === 'development',

  // Performance monitoring
  enabled: process.env.NODE_ENV === 'production',

  // Error filtering
  beforeSend(event, _hint) {
    // Filter out non-actionable errors in development
    if (process.env.NODE_ENV === 'development') {
      // Don't send errors from localhost in development
      if (event.exception?.values?.[0]?.stacktrace?.frames?.[0]?.filename?.includes('localhost')) {
        return null;
      }
    }

    // Filter out common browser extension errors
    if (event.exception?.values?.[0]?.value?.includes('chrome-extension://')) {
      return null;
    }

    return event;
  },

  // Performance monitoring
  integrations: [
    Sentry.browserTracingIntegration(),
  ],

  // Release tracking
  release: process.env.VERCEL_GIT_COMMIT_SHA || process.env.GIT_COMMIT_SHA,
});

// Export Sentry for use in components
export { Sentry };

// Type for Sentry-compatible tag values
type TagValue = string | number | boolean | null | undefined;

// Helper functions for manual error tracking
export const captureException = (error: Error, context?: Record<string, TagValue>) => {
  Sentry.withScope((scope) => {
    if (context) {
      Object.keys(context).forEach((key) => {
        scope.setTag(key, context[key]);
      });
    }
    Sentry.captureException(error);
  });
};

export const captureMessage = (message: string, level: Sentry.SeverityLevel = 'info', context?: Record<string, TagValue>) => {
  Sentry.withScope((scope) => {
    scope.setLevel(level);
    if (context) {
      Object.keys(context).forEach((key) => {
        scope.setTag(key, context[key]);
      });
    }
    Sentry.captureMessage(message);
  });
};

// Performance monitoring helpers
export const startTransaction = (name: string, op: string = 'custom') => {
  return Sentry.startSpan({ name, op }, (span) => {
    return span;
  });
};

export const capturePerformance = (name: string, duration: number, tags?: Record<string, string>) => {
  Sentry.withScope((scope) => {
    if (tags) {
      Object.keys(tags).forEach((key) => {
        scope.setTag(key, tags[key]);
      });
    }
    Sentry.captureMessage(`Performance: ${name} took ${duration}ms`, 'info');
  });
};
