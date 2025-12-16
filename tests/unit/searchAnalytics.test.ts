import { describe, it, expect, beforeEach, vi } from 'vitest';
import { logSearchQuery, getMonthlyTop, getMonthlyTopByLanguage, logFaqView, logFaqFeedback, getTopFaqs } from '@/lib/searchAnalytics';

describe('searchAnalytics', () => {
  beforeEach(() => {
    const store: Record<string, string> = {};
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => store[k] ?? null,
      setItem: (k: string, v: string) => { store[k] = v; },
      removeItem: (k: string) => { delete store[k]; },
      clear: () => { for (const k of Object.keys(store)) delete store[k]; },
      key: (i: number) => Object.keys(store)[i] ?? null,
      length: 0,
    } as unknown as Storage);
  });

  it('logs queries and returns top for current month', () => {
    logSearchQuery('Home Care', 'en');
    logSearchQuery('Home Care', 'en');
    const top = getMonthlyTop();
    expect(top[0]?.query).toBe('home care');
    expect(top[0]?.count).toBeGreaterThanOrEqual(2);
  });

  it('tracks language-specific stats', () => {
    logSearchQuery('Trabajo', 'es');
    const topEs = getMonthlyTopByLanguage('es');
    expect(topEs[0]?.query).toBe('trabajo');
  });

  it('tracks FAQ views and feedback', () => {
    logFaqView('What is Mosaic?');
    logFaqView('What is Mosaic?');
    logFaqFeedback('What is Mosaic?', true);
    const faqs = getTopFaqs();
    expect(faqs[0]?.question).toBe('what is mosaic?');
    expect(faqs[0]?.views).toBeGreaterThanOrEqual(2);
  });
});
