import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

interface Language {
  code: string;
  name: string;
  flag: string;
  direction: 'ltr' | 'rtl';
}

const ALL_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧', direction: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', direction: 'rtl' },
  { code: 'ps', name: 'پښتو', flag: '🇦🇫', direction: 'rtl' },
  { code: 'fa-AF', name: 'دری', flag: '🇦🇫', direction: 'rtl' },
  { code: 'fa', name: 'فارسی', flag: '🇮🇷', direction: 'rtl' },
  { code: 'es', name: 'Español', flag: '🇪🇸', direction: 'ltr' },
  { code: 'zh-CN', name: '中文', flag: '🇨🇳', direction: 'ltr' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', direction: 'ltr' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', direction: 'ltr' },
  { code: 'ku', name: 'Kurdî', flag: '🇮🇶', direction: 'ltr' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', direction: 'ltr' },
  { code: 'tl', name: 'Tagalog', flag: '🇵🇭', direction: 'ltr' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦', direction: 'ltr' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳', direction: 'ltr' },
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
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotatingIndex, setRotatingIndex] = useState(0);
  const getCookieLanguage = () => {
    if (typeof document === 'undefined') return 'en';
    const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
    if (!match?.[1]) return 'en';
    const value = decodeURIComponent(match[1]);
    const parts = value.split('/');
    const last = parts[parts.length - 1];
    return last || 'en';
  };

  const [rotationEnabled, setRotationEnabled] = useState(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return true;
    const cookieLang = getCookieLanguage();
    return cookieLang.toLowerCase() === 'en';
  });
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const itemRefs = React.useRef<HTMLButtonElement[]>([]);

  const getStoredLanguage = () => {
    if (typeof document === 'undefined') return 'en';
    const cookieLang = getCookieLanguage();
    return cookieLang || 'en';
  };

  const [selectedLanguage, setSelectedLanguage] = useState(getStoredLanguage);

  const currentLanguage = useMemo(() => {
    const code = (selectedLanguage || 'en').toLowerCase();
    return ALL_LANGUAGES.find((l) => l.code.toLowerCase() === code) || ALL_LANGUAGES[0];
  }, [selectedLanguage]);

  const ensureGoogleTranslate = () => {
    if (typeof document === 'undefined') return;
    type TranslateElementCtor = new (
      options: { pageLanguage: string; autoDisplay: boolean },
      elementId: string
    ) => void;
    type GoogleTranslate = { translate?: { TranslateElement?: TranslateElementCtor } };
    type WindowWithGoogle = Window & {
      google?: GoogleTranslate;
      googleTranslateElementInit?: () => void;
    };
    const win = window as WindowWithGoogle;
    const containerId = 'google_translate_element';
    if (!document.getElementById(containerId)) {
      const container = document.createElement('div');
      container.id = containerId;
      container.style.display = 'none';
      document.body.appendChild(container);
    }

    const initTranslate = () => {
      const google = win.google;
      if (google && google.translate && google.translate.TranslateElement) {
        new google.translate.TranslateElement(
          { pageLanguage: 'en', autoDisplay: false },
          containerId
        );
      }
    };

    if (win.google?.translate) {
      initTranslate();
      return;
    }

    if (!document.getElementById('google-translate-script')) {
      win.googleTranslateElementInit = initTranslate;
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
  };

  const changeLanguage = (langCode: string) => {
    setIsOpen(false);
    if (langCode === 'en') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
      localStorage.removeItem('preferred-language');
      window.location.reload();
      return;
    }

    document.cookie = `googtrans=/en/${langCode}; path=/`;
    localStorage.setItem('preferred-language', langCode);
    setSelectedLanguage(langCode);
    setRotationEnabled(false);
    ensureGoogleTranslate();
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  const visibleLanguages = useMemo(() => (
    query
      ? ALL_LANGUAGES.filter(
          (l) =>
            l.name.toLowerCase().includes(query.toLowerCase()) ||
            l.code.toLowerCase().includes(query.toLowerCase())
        )
      : ALL_LANGUAGES
  ), [query]);

  useEffect(() => {
    const code = (selectedLanguage || 'en').toLowerCase();
    const idx = ALL_LANGUAGES.findIndex((l) => l.code.toLowerCase() === code);
    setRotatingIndex(idx >= 0 ? idx : 0);
  }, [selectedLanguage]);

  useEffect(() => {
    setRotationEnabled((selectedLanguage || 'en').toLowerCase() === 'en');
  }, [selectedLanguage]);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
    const cookieLang = match?.[1] ? match[1].toLowerCase() : 'en';
    setSelectedLanguage(cookieLang);
    setRotationEnabled(cookieLang === 'en');
    if (cookieLang === 'en') {
      localStorage.removeItem('preferred-language');
    } else {
      localStorage.setItem('preferred-language', cookieLang);
    }
  }, []);

  useEffect(() => {
    if (isOpen || !rotationEnabled) return;
    const id = window.setInterval(() => {
      setRotatingIndex((prev) => {
        const next = (prev + 1) % ALL_LANGUAGES.length;
        return next;
      });
    }, 3000);
    return () => window.clearInterval(id);
  }, [isOpen, rotationEnabled]);


  useEffect(() => {
    if (isOpen) {
      setActiveIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedLanguage !== 'en') {
      ensureGoogleTranslate();
    }
  }, [selectedLanguage]);

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
    if (!rotationEnabled || isOpen) return currentLanguage;
    const boundedIndex = Math.min(
      Math.max(rotatingIndex, 0),
      ALL_LANGUAGES.length - 1
    );
    return ALL_LANGUAGES[boundedIndex];
  }, [currentLanguage, isOpen, rotationEnabled, rotatingIndex]);

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 h-11 md:h-11 min-h-[44px] px-4 rounded-md text-sm font-medium backdrop-blur-md bg-white/20 dark:bg-slate-800/30 border border-white/30 dark:border-slate-700/50 text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-slate-800/50 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
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
              {displayLanguage.name}
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
                  className="w-full rounded-md border border-input bg-background/60 px-3 py-2 text-sm text-foreground placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ocean focus:ring-offset-2 focus:ring-offset-background"
                  aria-label="Search languages"
                  ref={inputRef}
                />
              </div>
              
              <div className="max-h-60 overflow-y-auto">
                {ALL_LANGUAGES.length === 0 ? (
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
                        selectedLanguage.toLowerCase() === language.code.toLowerCase() &&
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
                          <span>{language.name}</span>
                        </div>
                      </div>
                      {selectedLanguage.toLowerCase() === language.code.toLowerCase() && (
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
                {ALL_LANGUAGES.length} languages available
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;
