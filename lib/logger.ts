/* eslint-disable no-console */
/**
 * Structured Logger
 * @module lib/logger
 *
 * Lightweight logging wrapper. Dev: console output. Prod: structured JSON.
 * No dependencies. This is the ONLY file allowed to use console directly.
 */

type LogLevel = 'debug' | 'log' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: string;
}

const isDev = process.env.NODE_ENV !== 'production';

function emit(level: LogLevel, message: string, data?: unknown): void {
  if (isDev) {
    const args = data !== undefined ? [message, data] : [message];
    console[level === 'log' ? 'log' : level](...args);
    return;
  }

  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
  };
  if (data !== undefined) entry.data = data;

  const method = level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log';
  console[method](JSON.stringify(entry));
}

export const logger = {
  debug: (message: string, data?: unknown) => emit('debug', message, data),
  log: (message: string, data?: unknown) => emit('log', message, data),
  warn: (message: string, data?: unknown) => emit('warn', message, data),
  error: (message: string, data?: unknown) => emit('error', message, data),
};
