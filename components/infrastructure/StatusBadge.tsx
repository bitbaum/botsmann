'use client';

import { type FC } from 'react';
import { type ConnectionStatus } from '@/lib/infrastructure';
import { CONNECTION_STATUS_CONFIG } from '@/lib/config/connection-status';

interface StatusBadgeProps {
  status: ConnectionStatus;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

/**
 * Status badge component for displaying connection state
 * Used in provider cards, settings, and infrastructure page
 */
export const StatusBadge: FC<StatusBadgeProps> = ({ status, size = 'md', showLabel = true }) => {
  const config = CONNECTION_STATUS_CONFIG[status];
  const isValidating = status === 'validating';

  const sizeClasses = {
    sm: {
      container: 'px-2 py-0.5 text-xs',
      dot: 'w-1.5 h-1.5',
    },
    md: {
      container: 'px-2.5 py-1 text-sm',
      dot: 'w-2 h-2',
    },
  };

  const s = sizeClasses[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full ${config.bgColor} ${config.color} ${s.container}`}
    >
      <span className={`${s.dot} rounded-full ${config.dotColor} ${isValidating ? '' : ''}`} />
      {showLabel && <span>{config.label}</span>}
    </span>
  );
};

// Dot-only variant for compact displays
export const StatusDot: FC<{ status: ConnectionStatus }> = ({ status }) => {
  const config = CONNECTION_STATUS_CONFIG[status];

  return <span className={`w-2 h-2 rounded-full ${config.dotColor}`} title={config.label} />;
};
