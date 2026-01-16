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
  const [languages, setLanguages] = useState<Language[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotatingIndex, setRotatingIndex] = useState(0);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const itemRefs = React.useRef<HTMLButtonElement[]>([]);

  const rtlLangs = useMemo(() => new Set(['ar', 'fa', 'he', 'ur', 'ps']), []);
  const gtToApp = useMemo(
    () =>
      ({
        'zh-CN': 'zh',
        'zh-TW': 'zh-tw',
      }) as Record<string, string>,
    []
  );
  const appToGt = useMemo(
    () =>
      ({
        zh: 'zh-CN',
        'zh-tw': 'zh-TW',
      }) as Record<string, string>,
    []
  );
  const nativeEndonyms = useMemo(
    () =>
      ({
        ar: 'العربية',
        zh: '简体中文',
        'zh-tw': '繁體中文',
        tl: 'Tagalog',
        hi: 'हिन्दी',
        it: 'Italiano',
        ku: 'Kurdî',
        ps: 'پښتو',
        fa: 'فارسی',
        pt: 'Português',
        ru: 'Русский',
        es: 'Español',
        sw: 'Kiswahili',
        th: 'ไทย',
        uk: 'Українська',
        vi: 'Tiếng Việt',
      }) as Record<string, string>,
    []
  );
  const flagMap = useMemo(
    () =>
      ({
        ar: '🇸🇦',
        zh: '🇨🇳',
        'zh-tw': '🇹🇼',
        en: '🇦🇺',
        tl: '🇵🇭',
        hi: '🇮🇳',
        it: '🇮🇹',
        ku: '🏳️',
        ps: '🏳️',
        fa: '🇮🇷',
        pt: '🇵🇹',
        ru: '🇷🇺',
        es: '🇪🇸',
        sw: '🇰🇪',
        th: '🇹🇭',
        uk: '🇺🇦',
        vi: '🇻🇳',
        sm: '🇼🇸',
      }) as Record<string, string>,
    []
  );

  useEffect(() => {
    const extract = () => {
      const hidden = document.querySelector('#google_translate_element_hidden select.goog-te-combo') as HTMLSelectElement | null;
      const visible = document.querySelector('#google_translate_element select.goog-te-combo') as HTMLSelectElement | null;
      const select = hidden || visible;
      if (!select) return;
      const opts = Array.from(select.options).filter(o => o.value && o.value !== 'auto');
      const list = opts.map(o => {
        const gt = o.value;
        const code = (gtToApp[gt] || gt).toLowerCase();
        const name = o.text;
        const direction: 'ltr' | 'rtl' = rtlLangs.has(code) ? 'rtl' : 'ltr';
        const nativeName = nativeEndonyms[code] || name;
        const flag = flagMap[code] || '';
        return { code, name, nativeName, flag, direction } as Language;
      });
      setLanguages(list);
    };
    extract();
    const target = document.getElementById('google_translate_element_hidden');
    if (target) {
      const obs = new MutationObserver(() => extract());
      obs.observe(target, { childList: true, subtree: true });
      return () => obs.disconnect();
    }
  }, [rtlLangs, gtToApp, nativeEndonyms, flagMap]);

  const currentLanguage = useMemo(() => {
    const code = (i18n.language || 'en').toLowerCase();
    return (
      languages.find((l) => l.code === code) || {
        code,
        name: code === 'en' ? 'English' : code,
        nativeName: code === 'en' ? 'English' : code,
        flag: flagMap[code] || '',
        direction: rtlLangs.has(code) ? 'rtl' : 'ltr',
      }
    );
  }, [i18n.language, languages, rtlLangs, flagMap]);

  const setGoogTransCookie = (targetLang: string) => {
    const lang = appToGt[targetLang] || targetLang;
    const cookieVal = `/auto/${lang}`;
    const hostname = window.location.hostname;
    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `googtrans=${cookieVal}; expires=${expires}; path=/;`;
    document.cookie = `googtrans=${cookieVal}; expires=${expires}; domain=.${hostname}; path=/;`;
  };

  const clearGoogTransCookie = () => {
    const hostname = window.location.hostname;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=.${hostname}; path=/;`;
  };
  
  const changeLanguage = (langCode: string) => {
    const selectedLang = languages.find(lang => lang.code === langCode) || {
      code: langCode,
      direction: rtlLangs.has(langCode) ? 'rtl' : 'ltr',
    } as Language;
    i18n.changeLanguage(langCode);
    document.documentElement.dir = selectedLang.direction;
    document.documentElement.lang = langCode;
    localStorage.setItem('preferred-language', langCode);
    if (langCode === 'en') {
      clearGoogTransCookie();
    } else {
      setGoogTransCookie(langCode);
    }
    setTimeout(() => {
      window.location.reload();
    }, 50);
    setIsOpen(false);
  };

  const visibleLanguages = useMemo(() => (
    query
      ? languages.filter(
          (l) =>
            l.name.toLowerCase().includes(query.toLowerCase()) ||
            l.nativeName.toLowerCase().includes(query.toLowerCase()) ||
            l.code.toLowerCase().includes(query.toLowerCase())
        )
      : languages
  ), [languages, query]);

  useEffect(() => {
    if (!languages.length) return;
    const code = (i18n.language || 'en').toLowerCase();
    const idx = languages.findIndex((l) => l.code === code);
    setRotatingIndex(idx >= 0 ? idx : 0);
  }, [languages, i18n.language]);

  useEffect(() => {
    if (!languages.length || isOpen) return;
    const id = window.setInterval(() => {
      setRotatingIndex((prev) => {
        if (!languages.length) return prev;
        const next = (prev + 1) % languages.length;
        return next;
      });
    }, 3000);
    return () => window.clearInterval(id);
  }, [languages, isOpen]);

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
    if (!languages.length) return currentLanguage;
    const boundedIndex = Math.min(
      Math.max(rotatingIndex, 0),
      languages.length - 1
    );
    return languages[boundedIndex];
  }, [languages, rotatingIndex, currentLanguage]);

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center h-9 md:h-10 px-4 rounded-md text-sm font-medium backdrop-blur-md bg-white/20 dark:bg-slate-800/30 border border-white/30 dark:border-slate-700/50 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-slate-800/50 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
        aria-label={t('common.changeLanguage')}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
      >
        <span
          className="text-base sm:text-lg leading-none mr-2"
          aria-hidden="true"
        >
          {displayLanguage.flag || '🏳️'}
        </span>
        {showText && (
          <>
            <span className="text-sm font-medium">
              {displayLanguage.nativeName}
            </span>
            <ChevronDown className={cn(
              'h-4 w-4 transition-transform duration-300',
              isOpen && 'rotate-180'
            )} />
          </>
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
                {languages.length === 0 ? (
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
                          {language.flag || flagMap[language.code] || '🏳️'}
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
                {languages.length} languages available
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
