import React from 'react';
import { log } from '../lib/logger';

type Props = { children: React.ReactNode };
type State = { hasError: boolean };

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    log.error('Knowledge Base render error', { error: error.message, stack: error.stack });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="doc-container section-spacing">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Something went wrong</h2>
            <p className="mt-2 text-sm text-muted-foreground">Please try refreshing the page.</p>
          </div>
        </div>
      );
    }
    return this.props.children as React.ReactElement;
  }
}
