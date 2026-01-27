import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  direction: 'ltr' | 'rtl';
}

const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇦🇺', direction: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', direction: 'rtl' },
  { code: 'zh', name: 'Chinese', nativeName: '简体中文', flag: '🇨🇳', direction: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', direction: 'ltr' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', direction: 'ltr' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', direction: 'ltr' },
  { code: 'ku', name: 'Kurdish', nativeName: 'Kurdî', flag: '🏳️', direction: 'ltr' },
  { code: 'ps', name: 'Pashto', nativeName: 'پښتو', flag: '🏳️', direction: 'rtl' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', direction: 'ltr' },
  { code: 'tl', name: 'Tagalog', nativeName: 'Tagalog', flag: '🇵🇭', direction: 'ltr' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦', direction: 'ltr' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', direction: 'ltr' },
];

interface LanguageSwitcherProps {
  className?: string;
  showText?: boolean;
  menuId?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  className = '',
  showText = true,
  menuId = 'language-menu'
}) => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [rotatingIndex, setRotatingIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const itemRefs = React.useRef<HTMLButtonElement[]>([]);

  const currentLanguage = useMemo(() => {
    const code = (i18n.language || 'en').toLowerCase();
    return LANGUAGES.find((l) => l.code === code) || LANGUAGES[0];
  }, [i18n.language]);

  const changeLanguage = (langCode: string) => {
    const selectedLang = LANGUAGES.find(lang => lang.code === langCode) || LANGUAGES[0];
    i18n.changeLanguage(langCode);
    document.documentElement.dir = selectedLang.direction;
    document.documentElement.lang = langCode;
    localStorage.setItem('preferred-language', langCode);
    setIsOpen(false);
  };

  const visibleLanguages = useMemo(() => (
    query
      ? LANGUAGES.filter(
          (l) =>
            l.name.toLowerCase().includes(query.toLowerCase()) ||
            l.nativeName.toLowerCase().includes(query.toLowerCase()) ||
            l.code.toLowerCase().includes(query.toLowerCase())
        )
      : LANGUAGES
  ), [query]);

  useEffect(() => {
    const code = (i18n.language || 'en').toLowerCase();
    const idx = LANGUAGES.findIndex((l) => l.code === code);
    setRotatingIndex(idx >= 0 ? idx : 0);
  }, [i18n.language]);

  useEffect(() => {
    if (isOpen) return;
    const id = window.setInterval(() => {
      setRotatingIndex((prev) => {
        const next = (prev + 1) % LANGUAGES.length;
        return next;
      });
    }, 3000);
    return () => window.clearInterval(id);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  const onMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!visibleLanguages.length) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => {
        const ni = Math.min(visibleLanguages.length - 1, i + 1);
        const el = itemRefs.current[ni];
        if (el) el.focus();
        return ni;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => {
        const ni = Math.max(0, i - 1);
        const el = itemRefs.current[ni];
        if (el) el.focus();
        return ni;
      });
    } else if (e.key === 'Home') {
      e.preventDefault();
      const el = itemRefs.current[0];
      if (el) el.focus();
      setActiveIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      const last = visibleLanguages.length - 1;
      const el = itemRefs.current[last];
      if (el) el.focus();
      setActiveIndex(last);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const lang = visibleLanguages[activeIndex];
      if (lang) changeLanguage(lang.code);
    }
  };

  const displayLanguage = useMemo(() => {
    if (!LANGUAGES.length) return currentLanguage;
    const boundedIndex = Math.min(
      Math.max(rotatingIndex, 0),
      LANGUAGES.length - 1
    );
    return LANGUAGES[boundedIndex];
  }, [rotatingIndex, currentLanguage]);

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 h-9 md:h-10 px-4 rounded-md text-sm font-medium backdrop-blur-md bg-white/20 dark:bg-slate-800/30 border border-white/30 dark:border-slate-700/50 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-slate-800/50 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
        aria-label={t('common.changeLanguage')}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
      >
        <div className="flex items-center gap-2">
          <span
            className="text-base sm:text-lg leading-none w-6 text-center inline-block"
            aria-hidden="true"
          >
            {displayLanguage.flag || '🏳️'}
          </span>
          {showText && (
            <span className="text-sm font-medium w-24 text-left truncate">
              {displayLanguage.nativeName}
            </span>
          )}
        </div>
        {showText && (
          <ChevronDown className={cn(
            'h-4 w-4 opacity-50 transition-transform duration-300',
            isOpen && 'rotate-180'
          )} />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div id={menuId} role="menu" className="absolute top-full right-0 mt-2 w-64 backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 rounded-lg shadow-2xl border border-white/30 dark:border-slate-700/50 z-50 overflow-hidden" tabIndex={-1} onKeyDown={onMenuKeyDown}>
            <div className="py-2">
              <div className="px-4 py-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search languages"
                  className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                  aria-label="Search languages"
                  ref={inputRef}
                />
              </div>
              
              <div className="max-h-60 overflow-y-auto">
                {LANGUAGES.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-muted-foreground" aria-live="polite">
                    Loading languages...
                  </div>
                ) : (
                  visibleLanguages.map((language, idx) => (
                    <button
                      key={language.code}
                      onClick={() => changeLanguage(language.code)}
                      className={cn(
                        'w-full flex items-center justify-between px-3.5 py-2.5 text-left hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-200',
                        i18n.language.toLowerCase() === language.code.toLowerCase() &&
                          'bg-white/70 dark:bg-slate-800/70 text-ocean dark:text-sky'
                      )}
                      dir={language.direction}
                      role="menuitem"
                      tabIndex={-1}
                      ref={(el) => {
                        if (el) itemRefs.current[idx] = el;
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <span
                          className="text-base leading-none"
                          aria-hidden="true"
                        >
                          {language.flag || '🏳️'}
                        </span>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          <span>{language.nativeName}</span>
                          <span className="mx-1" aria-hidden="true">-</span>
                          <span dir="ltr" className="text-xs text-gray-600 dark:text-gray-400">
                            {language.name}
                          </span>
                        </div>
                      </div>
                      {i18n.language.toLowerCase() === language.code.toLowerCase() && (
                        <div className="w-2 h-2 rounded-full bg-ocean dark:bg-sky animate-pulse" />
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
            
            {/* Footer */}
            <div className="px-4 py-2 border-t border-gray-200/30 dark:border-slate-700/30 bg-gray-50/50 dark:bg-slate-800/50">
              <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                {LANGUAGES.length} languages available
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
