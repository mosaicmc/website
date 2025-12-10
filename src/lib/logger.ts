export type LogLevel = 'error' | 'warn' | 'info';

function send(level: LogLevel, message: string, meta?: Record<string, unknown>) {
  try {
    console[level](message, meta);
  } catch {
    return;
  }
}

export function initMonitoring() {
  if (typeof window !== 'undefined') {
    window.addEventListener('error', (e) => {
      send('error', e.message || 'Unexpected error', { stack: (e.error && (e.error as Error).stack) || undefined });
    });
    window.addEventListener('unhandledrejection', (e) => {
      const reason = e.reason as unknown as Error | string | undefined;
      const msg = typeof reason === 'string' ? reason : reason?.message || 'Unhandled rejection';
      send('error', msg, { stack: (reason as Error)?.stack });
    });
  }
}

export const log = {
  error: (message: string, meta?: Record<string, unknown>) => send('error', message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => send('warn', message, meta),
  info: (message: string, meta?: Record<string, unknown>) => send('info', message, meta),
};
