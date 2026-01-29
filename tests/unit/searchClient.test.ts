import { describe, it, expect } from 'vitest';
import { LocalSearchClient, buildFacets, detectLanguage } from '@/lib/searchClient';

describe('searchClient', () => {
  it('detects Arabic and Hindi language heuristics', () => {
    expect(detectLanguage('مرحبا')).toBe('ar');
    expect(detectLanguage('नमस्ते')).toBe('hi');
    expect(detectLanguage('hello')).toBe('en');
  });

  it('builds facets from paths and tags', () => {
    const items = [
      { path: '/services/aged-care', title: 'Aged Care', body: '', tags: ['Programs'] },
      { path: '/about', title: 'About', body: '', tags: [] },
      { path: '/resources/faqs', title: 'FAQs', body: '', tags: [] },
    ];
    expect(buildFacets(items).sort()).toEqual(['About Mosaic', 'Programs', 'Resources', 'Services'].sort());
  });

  it('search ranks items with matching intents and facets', () => {
    const items = [
      { path: '/services/aged-care', title: 'Home Care', body: '', tags: ['Services', 'Aged Care'] },
      { path: '/services/family-support', title: 'Family Support', body: '', tags: ['Services'] },
      { path: '/resources/forms', title: 'Forms', body: '', tags: ['Resources'] },
    ];
    const client = new LocalSearchClient(items, 'en');
    const results = client.search('aged care', ['Services']);
    expect(results[0]?.path).toBe('/services/aged-care');
  });

  it('suggestions include intents and fuzzy matches', () => {
    const items = [
      { path: '/services/aged-care', title: 'Home Care', body: '', tags: ['Aged Care'] },
      { path: '/services/employment', title: 'Employment Services', body: '', tags: ['Employment'] },
    ];
    const client = new LocalSearchClient(items, 'en');
    const s = client.suggestions('job');
    expect(Array.isArray(s)).toBe(true);
    expect(s.length).toBeGreaterThan(0);
  });
});
