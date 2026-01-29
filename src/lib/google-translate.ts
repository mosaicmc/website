const GOOGLE_SELECT = '.goog-te-combo';
const DEFAULT_SITE_URL = 'https://mosaicmc.org.au';

type ResolveResult = {
  resolved: string | null;
  supported: boolean;
};

const normalize = (value: string) => value.trim().toLowerCase();

const fallbackMap: Record<string, string> = {
  'zh-cn': 'zh-CN',
  'zh-hans': 'zh-CN',
  'zh': 'zh-CN',
  'zh-tw': 'zh-TW',
  'fa-af': 'fa',
  'fil': 'tl',
};

const isLocalHost = (hostname: string) => {
  const lowered = hostname.toLowerCase();
  return lowered === 'localhost' || lowered.startsWith('127.') || lowered.endsWith('.local');
};

export const buildGoogleTranslateUrl = (targetLang: string | null, currentUrl?: string) => {
  if (!targetLang || targetLang.toLowerCase() === 'en') return null;
  const url = new URL('https://translate.google.com/translate');
  url.searchParams.set('hl', 'en');
  url.searchParams.set('sl', 'en');
  url.searchParams.set('tl', targetLang);

  let destination = currentUrl;
  if (!destination) {
    if (typeof window !== 'undefined') {
      const base = isLocalHost(window.location.hostname)
        ? DEFAULT_SITE_URL
        : window.location.origin;
      destination = `${base}${window.location.pathname}${window.location.search}${window.location.hash}`;
    } else {
      destination = DEFAULT_SITE_URL;
    }
  }

  url.searchParams.set('u', destination);
  return url.toString();
};

export const getGoogleTranslateOptions = () => {
  if (typeof document === 'undefined') return null;
  const select = document.querySelector(GOOGLE_SELECT) as HTMLSelectElement | null;
  if (!select) return null;
  return Array.from(select.options).map((opt) => opt.value);
};

export const resolveGoogleLanguage = (
  code: string,
  options?: string[] | null
): ResolveResult => {
  if (!code) return { resolved: null, supported: false };
  const candidates: string[] = [];
  const raw = code;
  const normalized = normalize(code);

  candidates.push(raw, normalized, raw.replace('_', '-'), normalized.replace('_', '-'));
  if (normalized.includes('-')) {
    candidates.push(normalized.split('-')[0]);
  }
  if (normalized.includes('_')) {
    candidates.push(normalized.split('_')[0]);
  }

  const fallback = fallbackMap[normalized];
  if (fallback) candidates.push(fallback);

  if (options && options.length > 0) {
    const normalizedOptions = options.map((value) => normalize(value));
    for (const candidate of candidates) {
      const idx = normalizedOptions.indexOf(normalize(candidate));
      if (idx >= 0) {
        return { resolved: options[idx], supported: true };
      }
    }
    return { resolved: null, supported: false };
  }

  const resolved = fallback ? fallback : raw;
  return { resolved, supported: true };
};

export const getCookieLanguage = () => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  if (!match?.[1]) return null;
  const value = decodeURIComponent(match[1]);
  const parts = value.split('/');
  const last = parts[parts.length - 1];
  return (last || 'en').toLowerCase();
};

export const getStoredLanguage = () => {
  if (typeof window === 'undefined') return null;
  const storedGoogle = window.localStorage.getItem('preferred-language-gt');
  if (storedGoogle) return storedGoogle.toLowerCase();
  const stored = window.localStorage.getItem('preferred-language');
  return stored ? stored.toLowerCase() : null;
};

export const getUiLanguage = () => {
  if (typeof window === 'undefined') return null;
  const stored = window.localStorage.getItem('preferred-language');
  return stored ? stored.toLowerCase() : null;
};

export const getTranslationTarget = () => {
  const stored = getStoredLanguage();
  const cookieLang = getCookieLanguage();
  if (stored && stored !== 'en') return stored;
  if (cookieLang && cookieLang !== 'en') return cookieLang;
  return stored || cookieLang || null;
};

export const isTranslationActive = () => {
  const target = getTranslationTarget();
  return !!target && target !== 'en';
};

export const filterSupportedLanguages = <T extends { code: string }>(
  languages: T[],
  options?: string[] | null
) => {
  if (!options || options.length === 0) return languages;
  return languages.filter((lang) => {
    if (normalize(lang.code) === 'en') return true;
    return resolveGoogleLanguage(lang.code, options).supported;
  });
};
