"use client";

import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search as SearchIcon, ThumbsUp, ThumbsDown } from 'lucide-react';
import DOMPurify from 'dompurify';
import FAQSchema from '@/components/FAQSchema';
import RelatedServices from '@/components/RelatedServices';
import { logFaqFeedback, logFaqView } from '@/lib/searchAnalytics';
import Section from '@/components/ui/Section';
import { AccordionItem } from '@/components/ui/AccordionItem';

type QA = { question: string; answer: string };

export default function FAQPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [openItem, setOpenItem] = useState<string | undefined>();
  const [feedback, setFeedback] = useState<Record<string, 'up' | 'down'>>({});
  
  const faqs: QA[] = useMemo(() => {
    const items = t('faqPage.items', { returnObjects: true });
    return Array.isArray(items) ? items as QA[] : [];
  }, [t]);

  const allFaqs = faqs;
  const filteredFaqs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter((i) => i.question.toLowerCase().includes(q) || i.answer.toLowerCase().includes(q));
  }, [query, faqs]);

  const midpoint = Math.ceil(filteredFaqs.length / 2);
  const leftFaqs = filteredFaqs.slice(0, midpoint);
  const rightFaqs = filteredFaqs.slice(midpoint);

  const faqColors = {
    bg: 'bg-ocean',
    border: 'border-ocean',
  };

  const sanitizeHtml = (value: string) => {
    if (typeof window === 'undefined') return value;
    if (typeof DOMPurify?.sanitize === 'function') {
      return DOMPurify.sanitize(value);
    }
    return value;
  };

  return (
    <div className="min-h-screen bg-background">
      
      <FAQSchema faqs={allFaqs} name={t('faqPage.meta.title')} />

      <Section padding="lg" center overlay overlayClassName="from-ocean/10 via-transparent to-sky/10">
        <div className="text-center mb-8">
          <h1 className="fluid-h1 text-3xl md:text-4xl font-bold tracking-tight">{t('faqPage.title')}</h1>
          <p className="fluid-p mt-3 text-muted-foreground max-w-2xl mx-auto">
            {t('faqPage.description')}
          </p>
        </div>

        <div className="mx-auto max-w-3xl mb-8">
          <label htmlFor="faq-search" className="sr-only">{t('faqPage.searchPlaceholder')}</label>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-ocean focus-within:ring-offset-2 focus-within:ring-offset-background">
            <SearchIcon className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
            <input
              id="faq-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('faqPage.searchPlaceholder')}
              className="w-full bg-transparent text-sm text-foreground focus:outline-none"
              aria-label={t('faqPage.searchPlaceholder')}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {[leftFaqs, rightFaqs].map((columnFaqs, columnIndex) => (
            <div key={columnIndex} className="space-y-4">
              {columnFaqs.map((item, idx) => {
                const globalIndex = columnIndex === 0 ? idx : idx + leftFaqs.length;
                const id = `faq-${globalIndex}`;
                const isOpen = openItem === id;

                const answerContent = (
                  <>
                    <p
                      className="text-base leading-relaxed text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.answer) }}
                    />
                    <div className="mt-4 flex items-center gap-3">
                      <button
                        type="button"
                        className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background ${
                          feedback[id] === 'up'
                            ? 'border-ocean bg-ocean/10 text-foreground'
                            : 'border-border hover:bg-sand/50'
                        } ${feedback[id] ? 'cursor-default opacity-70' : ''}`}
                        aria-label={t('faqPage.actions.aria.helpful')}
                        aria-pressed={feedback[id] === 'up'}
                        disabled={!!feedback[id]}
                        onClick={() => {
                          if (feedback[id]) return;
                          logFaqFeedback(item.question, true);
                          setFeedback((prev) => ({ ...prev, [id]: 'up' }));
                        }}
                      >
                        <ThumbsUp className="h-3.5 w-3.5" /> {t('faqPage.actions.helpful')}
                      </button>
                      <button
                        type="button"
                        className={`inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background ${
                          feedback[id] === 'down'
                            ? 'border-ocean bg-ocean/10 text-foreground'
                            : 'border-border hover:bg-sand/50'
                        } ${feedback[id] ? 'cursor-default opacity-70' : ''}`}
                        aria-label={t('faqPage.actions.aria.needsImprovement')}
                        aria-pressed={feedback[id] === 'down'}
                        disabled={!!feedback[id]}
                        onClick={() => {
                          if (feedback[id]) return;
                          logFaqFeedback(item.question, false);
                          setFeedback((prev) => ({ ...prev, [id]: 'down' }));
                        }}
                      >
                        <ThumbsDown className="h-3.5 w-3.5" /> {t('faqPage.actions.needsImprovement')}
                      </button>
                    </div>
                    {feedback[id] && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        {t('faqPage.actions.thanks')}
                      </p>
                    )}
                  </>
                );

                return (
                  <AccordionItem
                    key={id}
                    id={id}
                    question={item.question}
                    answer={answerContent}
                    isOpen={isOpen}
                    onToggle={() => {
                      const nextOpen = isOpen ? undefined : id;
                      setOpenItem(nextOpen);
                      if (nextOpen) logFaqView(item.question);
                    }}
                    colors={faqColors}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="/resources" className="text-primary hover:underline">{t('faqPage.actions.backToResources')} →</a>
        </div>
      </Section>

      <RelatedServices />
    </div>
  );
}
