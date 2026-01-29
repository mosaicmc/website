import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import KnowledgeBasePage from '../../src/screens/company/KnowledgeBasePage';

describe('KnowledgeBasePage', () => {
  it('renders headings and policy links', () => {
    const html = renderToString(React.createElement(KnowledgeBasePage, {}));
    expect(html).toContain('Knowledge Base');
    expect(html).toContain('/policies/code-of-conduct');
    expect(html).toContain('/policies/work-health-safety');
    expect(html).toContain('/policies/diversity-inclusion');
    expect(html).toContain('/policies/whistleblower');
    expect(html).toContain('/policies/quality-management');
  });
});
