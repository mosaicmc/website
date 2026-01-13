import React from 'react';
import { cn } from '@/lib/utils';

export type AccordionColors = {
  bg: string;
  border: string;
};

export type AccordionItemProps = {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  colors: AccordionColors;
  className?: string;
  id?: string;
};

export function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  colors,
  className,
  id,
}: AccordionItemProps) {
  const panelId = id ? `${id}-panel` : undefined;

  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden transition-all duration-300 border backdrop-blur-md bg-white/60 dark:bg-white/10",
        isOpen ? cn(colors.border, "shadow-xl") : "border-white/40 dark:border-white/20",
        className
      )}
    >
      <button
        type="button"
        className={cn(
          "w-full text-left px-6 py-5 flex items-start justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900",
          isOpen ? "rounded-t-2xl" : "rounded-2xl"
        )}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        id={id}
      >
        <div className="flex items-start gap-3">
          <span className={cn("mt-1 h-2 w-2 rounded-full flex-shrink-0", colors.bg)}></span>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">{question}</span>
        </div>
        <span
          className={cn(
            "inline-flex items-center justify-center h-8 w-8 rounded-full border transition-colors flex-shrink-0",
            isOpen
              ? cn(colors.bg, "text-white", colors.border)
              : "border-white/40 dark:border-white/20 text-gray-600 dark:text-white/70"
          )}
        >
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <div
        id={panelId}
        className={cn(
          "px-6 pt-0 pb-6 text-gray-700 dark:text-gray-100 transition-all duration-300",
          isOpen ? "block" : "hidden"
        )}
      >
        {answer}
      </div>
    </div>
  );
}
