import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
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

  const faqColors = {
    bg: 'bg-ocean',
    border: 'border-ocean',
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t('faqPage.meta.title')}</title>
        <meta name="description" content="Frequently asked questions about Mosaic Multicultural Connections services, volunteering, donations, and how to get support." />
      </Helmet>
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

        <div className="space-y-4 max-w-3xl mx-auto">
          {filteredFaqs.map((item, idx) => {
            const id = `faq-${idx}`;
            const isOpen = openItem === id;
            
            const answerContent = (
              <>
                <p
                  className="text-base leading-relaxed text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.answer) }}
                />
                <div className="mt-4 flex items-center gap-3">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-sand/50 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                    aria-label={t('faqPage.actions.aria.helpful')}
                    onClick={() => logFaqFeedback(item.question, true)}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" /> {t('faqPage.actions.helpful')}
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-sand/50 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                    aria-label={t('faqPage.actions.aria.needsImprovement')}
                    onClick={() => logFaqFeedback(item.question, false)}
                  >
                    <ThumbsDown className="h-3.5 w-3.5" /> {t('faqPage.actions.needsImprovement')}
                  </button>
                </div>
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

        <div className="mt-10 text-center">
          <a href="/resources" className="text-primary hover:underline">{t('faqPage.actions.backToResources')} →</a>
        </div>
      </Section>

      <RelatedServices />
    </div>
  );
}
