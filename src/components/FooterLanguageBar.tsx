"use client";

import React from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  getGoogleTranslateOptions,
  resolveGoogleLanguage,
} from '@/lib/google-translate';

type Lang = {
  code: string;
  label: string; // short code shown under the flag
  flag: string;  // emoji flag for visual
  direction: 'ltr' | 'rtl';
};

// Inspired by mosaicmc.org.au footer language strip
// Uses emojis for simplicity (no external assets). Maps to Google Translate via cookies.
const languages: Lang[] = [
  { code: 'en', label: 'EN', flag: '🇬🇧', direction: 'ltr' },
  { code: 'ar', label: 'AR', flag: '🇸🇦', direction: 'rtl' },
  { code: 'ps', label: 'PS', flag: '🇦🇫', direction: 'rtl' },
  { code: 'fa-AF', label: 'DR', flag: '🇦🇫', direction: 'rtl' },
  { code: 'fa', label: 'FA', flag: '🇮🇷', direction: 'rtl' },
  { code: 'es', label: 'ES', flag: '🇪🇸', direction: 'ltr' },
  { code: 'zh-CN', label: 'ZH', flag: '🇨🇳', direction: 'ltr' },
  { code: 'hi', label: 'HI', flag: '🇮🇳', direction: 'ltr' },
  { code: 'it', label: 'IT', flag: '🇮🇹', direction: 'ltr' },
  { code: 'ku', label: 'KU', flag: '🇮🇶', direction: 'ltr' },
  { code: 'ru', label: 'RU', flag: '🇷🇺', direction: 'ltr' },
  { code: 'tl', label: 'TL', flag: '🇵🇭', direction: 'ltr' },
  { code: 'uk', label: 'UK', flag: '🇺🇦', direction: 'ltr' },
  { code: 'vi', label: 'VI', flag: '🇻🇳', direction: 'ltr' },
];


export const FooterLanguageBar: React.FC<{ className?: string }> = ({ className }) => {
  const getStoredLanguage = () => {
    if (typeof document === 'undefined') return 'en';
    const stored = localStorage.getItem('preferred-language');
    if (stored) return stored;
    const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
    if (match && match[1]) {
      const value = decodeURIComponent(match[1]);
      const parts = value.split('/');
      const last = parts[parts.length - 1];
      if (last) return last;
    }
    return 'en';
  };

  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [googleOptions, setGoogleOptions] = useState<string[] | null>(null);
  const [availableLanguages, setAvailableLanguages] = useState(languages);
  const [languagesReady, setLanguagesReady] = useState(false);
  const notifyTranslateRefresh = (langCode?: string) => {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(
      new CustomEvent('google-translate:refresh', { detail: { lang: langCode, force: true } })
    );
  };

  const setGoogleTranslateCookie = (value: string, domain?: string) => {
    const parts = [`googtrans=${value}`, 'path=/'];
    if (domain) parts.push(`domain=${domain}`);
    document.cookie = parts.join(';');
  };

  const clearGoogleTranslateCookie = (domain?: string) => {
    const parts = ['googtrans='];
    parts.push('expires=Thu, 01 Jan 1970 00:00:00 GMT');
    parts.push('path=/');
    if (domain) parts.push(`domain=${domain}`);
    document.cookie = parts.join(';');
  };

  const changeLanguage = (code: string) => {
    localStorage.setItem('preferred-language', code);
    setSelectedLanguage(code);
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (code === 'en') {
      clearGoogleTranslateCookie();
      clearGoogleTranslateCookie(window.location.hostname);
      clearGoogleTranslateCookie(`.${window.location.hostname}`);
      localStorage.removeItem('preferred-language-gt');
    if (select) {
      select.value = 'en';
      select.dispatchEvent(new Event('change', { bubbles: true }));
      notifyTranslateRefresh('en');
    } else {
      window.location.reload();
    }
    return;
  }
    const options = googleOptions ?? getGoogleTranslateOptions();
    const resolved = resolveGoogleLanguage(code, options).resolved || code;
    const value = `/en/${resolved}`;
    setGoogleTranslateCookie(value);
    setGoogleTranslateCookie(value, window.location.hostname);
    setGoogleTranslateCookie(value, `.${window.location.hostname}`);
    localStorage.setItem('preferred-language-gt', resolved);
    if (select) {
      select.value = resolved;
      select.dispatchEvent(new Event('input', { bubbles: true }));
      select.dispatchEvent(new Event('change', { bubbles: true }));
    } else {
      window.location.reload();
    }
    notifyTranslateRefresh(resolved);
  };

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const update = () => {
      const options = getGoogleTranslateOptions();
      if (options && options.length > 0) {
        setGoogleOptions(options);
        setAvailableLanguages(languages);
        setLanguagesReady(true);
        return true;
      }
      return false;
    };
    if (update()) return;
    const id = window.setInterval(() => {
      if (update()) window.clearInterval(id);
    }, 400);
    return () => window.clearInterval(id);
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    setSelectedLanguage(getStoredLanguage());
  }, []);

  return (
    <div
      className={cn(
        'w-full bg-transparent text-foreground dark:text-white',
        className
      )}
      aria-label="Language selection"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-4">
        {/* Responsive: center on mobile, evenly spaced on larger screens; wraps to multiple lines */}
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-x-3 gap-y-2 py-3">
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={cn(
                'flex flex-col items-center justify-center',
                'px-2 py-1 rounded-md transition-colors',
                'hover:bg-foreground/10 dark:hover:bg-white/10',
                'focus:outline-none focus:ring-2 focus:ring-foreground/30 dark:focus:ring-white/30',
                selectedLanguage === lang.code && 'bg-foreground/10 dark:bg-white/10'
              )}
              aria-label={`Change language to ${lang.label}`}
              dir={lang.direction}
            >
              <span className="text-base sm:text-lg leading-none">{lang.flag}</span>
              <span className="text-[10px] sm:text-xs mt-1 tracking-wide font-semibold">{lang.label}</span>
            </button>
          ))}
        </div>
        <div className="pb-2 text-center text-[10px] uppercase tracking-wide text-muted-foreground">
          {languagesReady ? 'Translated by Google' : 'Loading languages...'}
        </div>
      </div>
    </div>
  );
};

export default FooterLanguageBar;
