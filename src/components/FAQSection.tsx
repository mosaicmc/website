import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import FAQSchema from '@/components/FAQSchema';
import { AccordionItem } from '@/components/ui/AccordionItem';

export type FAQItemData = {
  question: string;
  answer: React.ReactNode;
  schemaAnswer?: string;
};

export type FAQSectionProps = {
  title: string;
  badge?: string;
  subtitle?: string;
  items: FAQItemData[];
  accentColor?: 'care' | 'leaf' | 'sun' | 'sky' | 'earth';
  className?: string;
};

const colorMap = {
  care: {
    bg: 'bg-care',
    text: 'text-care-text',
    border: 'border-care',
    overlay: 'bg-care/10 dark:bg-care/15',
    pulse: 'bg-care',
  },
  leaf: {
    bg: 'bg-leaf',
    text: 'text-leaf-text',
    border: 'border-leaf',
    overlay: 'bg-leaf/10 dark:bg-leaf/15',
    pulse: 'bg-leaf',
  },
  sun: {
    bg: 'bg-sun',
    text: 'text-sun-text',
    border: 'border-sun',
    overlay: 'bg-sun/10 dark:bg-sun/15',
    pulse: 'bg-sun',
  },
  sky: {
    bg: 'bg-sky',
    text: 'text-sky-text',
    border: 'border-sky',
    overlay: 'bg-sky/10 dark:bg-sky/15',
    pulse: 'bg-sky',
  },
  earth: {
    bg: 'bg-earth',
    text: 'text-earth-text',
    border: 'border-earth',
    overlay: 'bg-earth/10 dark:bg-earth/15',
    pulse: 'bg-earth',
  },
};

export function FAQSection({
  title,
  badge,
  subtitle,
  items,
  accentColor = 'care',
  className,
}: FAQSectionProps) {
  const [leftColumnValue, setLeftColumnValue] = useState<string | undefined>();
  const [rightColumnValue, setRightColumnValue] = useState<string | undefined>('right-0');

  const colors = colorMap[accentColor];

  // Split FAQs into two columns
  const midpoint = Math.ceil(items.length / 2);
  const leftColumnFaqs = items.slice(0, midpoint);
  const rightColumnFaqs = items.slice(midpoint);

  // Prepare schema data (using schemaAnswer or falling back to a stringified answer if needed)
  const schemaFaqs = items
    .map(i => {
      if (i.schemaAnswer) return { question: i.question, answer: i.schemaAnswer };
      if (typeof i.answer === 'string') return { question: i.question, answer: i.answer };
      return null;
    })
    .filter((i): i is { question: string; answer: string } => i !== null);

  return (
    <section className={cn(
      "relative py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300 overflow-hidden",
      className
    )}>
      {schemaFaqs.length > 0 && <FAQSchema faqs={schemaFaqs} name={`${title} FAQs`} />}
      
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 pointer-events-none"></div>
      <div className={cn("absolute inset-0 mix-blend-multiply pointer-events-none", colors.overlay)}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          {badge && (
            <div className="inline-flex items-center rounded-full backdrop-blur-md bg-white/60 dark:bg-white/10 border border-white/40 dark:border-white/20 px-6 py-2 text-sm shadow-lg mb-6">
              <span className={cn("mr-2 h-2 w-2 rounded-full animate-pulse", colors.pulse)}></span>
              <span className="text-gray-700 dark:text-white/90 font-medium">{badge}</span>
            </div>
          )}
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
          {subtitle && (
            <p className="text-xl text-gray-600 dark:text-white/70 max-w-3xl mx-auto">{subtitle}</p>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            {leftColumnFaqs.map((faq, index) => {
              const itemValue = `left-${index}`;
              const isOpen = leftColumnValue === itemValue;
              return (
                <AccordionItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={isOpen}
                  onToggle={() => setLeftColumnValue(isOpen ? undefined : itemValue)}
                  colors={colors}
                  id={`left-faq-${index}`}
                />
              );
            })}
          </div>

          <div className="space-y-6">
            {rightColumnFaqs.map((faq, index) => {
              const itemValue = `right-${index}`;
              const isOpen = rightColumnValue === itemValue;
              return (
                <AccordionItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={isOpen}
                  onToggle={() => setRightColumnValue(isOpen ? undefined : itemValue)}
                  colors={colors}
                  id={`right-faq-${index}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

