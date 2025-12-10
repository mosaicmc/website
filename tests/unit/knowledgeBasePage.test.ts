import { describe, it, expect } from 'vitest';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import KnowledgeBasePage from '../../src/pages/company/KnowledgeBasePage';
import { renderToString } from 'react-dom/server';

describe('KnowledgeBasePage', () => {
  it('renders headings and policy links', () => {
    const tree = React.createElement(
      HelmetProvider,
      {},
      React.createElement(
        MemoryRouter,
        {},
        React.createElement(KnowledgeBasePage, {})
      )
    );
    const html = renderToString(tree);
    expect(html).toContain('Knowledge Base');
    expect(html).toContain('/policies/code-of-conduct');
    expect(html).toContain('/policies/work-health-safety');
    expect(html).toContain('/policies/diversity-inclusion');
    expect(html).toContain('/policies/whistleblower');
    expect(html).toContain('/policies/quality-management');
  });
});
