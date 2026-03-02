/**
 * Connection Status Configuration - SINGLE SOURCE OF TRUTH
 *
 * All status display config (colors, labels, dot colors) lives here.
 * Components import from this module instead of defining their own mappings.
 */

import { type ConnectionStatus } from '@/lib/infrastructure';

export interface StatusDisplayConfig {
  color: string;
  bgColor: string;
  label: string;
  dotColor: string;
}

/**
 * Status display configuration for badges, cards, and indicators.
 */
export const CONNECTION_STATUS_CONFIG: Record<ConnectionStatus, StatusDisplayConfig> = {
  connected: {
    color: 'text-green-700',
    bgColor: 'bg-green-100',
    label: 'Connected',
    dotColor: 'bg-green-500',
  },
  'not-configured': {
    color: 'text-gray-500',
    bgColor: 'bg-gray-100',
    label: 'Not Configured',
    dotColor: 'bg-gray-300',
  },
  validating: {
    color: 'text-amber-700',
    bgColor: 'bg-amber-100',
    label: 'Validating...',
    dotColor: 'bg-amber-500 animate-pulse',
  },
  error: {
    color: 'text-red-700',
    bgColor: 'bg-red-100',
    label: 'Error',
    dotColor: 'bg-red-500',
  },
};

/**
 * Get display config for a connection status.
 */
export function getStatusConfig(status: ConnectionStatus): StatusDisplayConfig {
  return CONNECTION_STATUS_CONFIG[status];
}
