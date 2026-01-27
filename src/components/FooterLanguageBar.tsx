import React from 'react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

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

  const [selectedLanguage, setSelectedLanguage] = useState(getStoredLanguage);

  const setGoogleTranslateCookie = (value: string, domain?: string) => {
    const parts = [`googtrans=${encodeURIComponent(value)}`, 'path=/'];
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
    if (code === 'en') {
      clearGoogleTranslateCookie();
      clearGoogleTranslateCookie('.google.com');
      clearGoogleTranslateCookie('.googletrans.com');
      window.location.reload();
      return;
    }
    const value = `/en/${code}`;
    setGoogleTranslateCookie(value);
    setGoogleTranslateCookie(value, '.google.com');
    setGoogleTranslateCookie(value, '.googletrans.com');
    window.location.reload();
  };

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
          {languages.map((lang) => (
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
      </div>
    </div>
  );
};

export default FooterLanguageBar;
