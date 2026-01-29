"use client";

import { useCallback, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { resolveGoogleLanguage } from '@/lib/google-translate';

const RTL_LANGS = new Set(['ar', 'fa', 'fa-af', 'ps', 'ur', 'he']);
const GOOGLE_SELECT = '.goog-te-combo';
const GOOGLE_SCRIPT_ID = 'google-translate-script';
const TRANSLATE_CONTAINER_ID = 'google_translate_element';
const MAX_WAIT_MS = 4000;
const RETRY_MS = 120;
const DOM_SETTLE_MS = 600;
const DOM_SETTLE_FORCE_MS = 320;

const readCookieLanguage = () => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  if (!match?.[1]) return null;
  const value = decodeURIComponent(match[1]);
  const parts = value.split('/');
  const last = parts[parts.length - 1];
  return (last || 'en').toLowerCase();
};

const readStoredLanguage = () => {
  if (typeof window === 'undefined') return null;
  const storedGoogle = window.localStorage.getItem('preferred-language-gt');
  if (storedGoogle) return storedGoogle.toLowerCase();
  const stored = window.localStorage.getItem('preferred-language');
  return stored ? stored.toLowerCase() : null;
};

const setGoogleTranslateCookie = (value: string, domain?: string) => {
  if (typeof document === 'undefined') return;
  const parts = [`googtrans=${value}`, 'path=/'];
  if (domain) parts.push(`domain=${domain}`);
  document.cookie = parts.join(';');
};

const clearGoogleTranslateCookie = (domain?: string) => {
  if (typeof document === 'undefined') return;
  const parts = ['googtrans='];
  parts.push('expires=Thu, 01 Jan 1970 00:00:00 GMT');
  parts.push('path=/');
  if (domain) parts.push(`domain=${domain}`);
  document.cookie = parts.join(';');
};

export function GoogleTranslateGuardrails() {
  const pathname = usePathname();
  const retryTimer = useRef<number | null>(null);
  const appliedLangRef = useRef<string | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const settleTimer = useRef<number | null>(null);

  const ensureTranslateElement = useCallback(() => {
    if (typeof document === 'undefined' || typeof window === 'undefined') return;
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
    if (!document.getElementById(TRANSLATE_CONTAINER_ID)) {
      const container = document.createElement('div');
      container.id = TRANSLATE_CONTAINER_ID;
      container.style.display = 'none';
      document.body.appendChild(container);
    }

    const initTranslate = () => {
      const google = win.google;
      if (google && google.translate && google.translate.TranslateElement) {
        if (!document.querySelector(GOOGLE_SELECT)) {
          new google.translate.TranslateElement(
            { pageLanguage: 'en', autoDisplay: false },
            TRANSLATE_CONTAINER_ID
          );
        }
      }
    };

    if (win.google?.translate?.TranslateElement) {
      initTranslate();
      return;
    }

    if (!document.getElementById(GOOGLE_SCRIPT_ID)) {
      win.googleTranslateElementInit = initTranslate;
      const script = document.createElement('script');
      script.id = GOOGLE_SCRIPT_ID;
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const applyGoogleTranslate = useCallback((targetLang: string, force = false) => {
    if (typeof document === 'undefined') return;
    if (retryTimer.current) {
      window.clearTimeout(retryTimer.current);
      retryTimer.current = null;
    }
    const target = (targetLang || 'en').toLowerCase();
    ensureTranslateElement();
    const start = Date.now();
    const attempt = () => {
      const select = document.querySelector(GOOGLE_SELECT) as HTMLSelectElement | null;
      if (select) {
        const options = Array.from(select.options).map((opt) => opt.value);
        const resolvedValue = resolveGoogleLanguage(target, options).resolved;
        if (!resolvedValue) {
          if (Date.now() - start < MAX_WAIT_MS) {
            retryTimer.current = window.setTimeout(attempt, RETRY_MS);
          }
          return;
        }
        const needsSwitch =
          force &&
          target !== 'en' &&
          appliedLangRef.current &&
          appliedLangRef.current !== target;

        if (needsSwitch) {
          select.value = 'en';
          select.dispatchEvent(new Event('input', { bubbles: true }));
          select.dispatchEvent(new Event('change', { bubbles: true }));
          window.setTimeout(() => {
            select.value = resolvedValue;
            select.dispatchEvent(new Event('input', { bubbles: true }));
            select.dispatchEvent(new Event('change', { bubbles: true }));
          }, 220);
        } else {
          if (select.value !== resolvedValue) {
            select.value = resolvedValue;
          }
          select.dispatchEvent(new Event('input', { bubbles: true }));
          select.dispatchEvent(new Event('change', { bubbles: true }));
          if (force) {
            window.setTimeout(() => {
              select.dispatchEvent(new Event('input', { bubbles: true }));
              select.dispatchEvent(new Event('change', { bubbles: true }));
            }, 180);
          }
        }
        appliedLangRef.current = target;
        return;
      }
      if (Date.now() - start < MAX_WAIT_MS) {
        retryTimer.current = window.setTimeout(attempt, RETRY_MS);
      }
    };
    attempt();
  }, [ensureTranslateElement]);

  const scheduleTranslate = useCallback((targetLang: string, force = false) => {
    if (typeof document === 'undefined') return;
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (settleTimer.current) {
      window.clearTimeout(settleTimer.current);
      settleTimer.current = null;
    }

    const schedule = () => {
      if (settleTimer.current) window.clearTimeout(settleTimer.current);
      settleTimer.current = window.setTimeout(() => {
        applyGoogleTranslate(targetLang, force);
        appliedLangRef.current = targetLang;
        if (observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = null;
        }
      }, force ? DOM_SETTLE_FORCE_MS : DOM_SETTLE_MS);
    };

    observerRef.current = new MutationObserver(() => {
      schedule();
    });
    observerRef.current.observe(document.body, { childList: true, subtree: true, characterData: true });

    schedule();
  }, [applyGoogleTranslate]);

  const syncTranslation = useCallback((preferred?: string | null, force = false) => {
    if (typeof document === 'undefined') return;
    const cookieLang = readCookieLanguage();
    const storedLang = readStoredLanguage();
    const preferredLang = preferred?.toLowerCase() || null;
    let target = 'en';

    if (preferredLang) {
      target = preferredLang;
    } else if (storedLang && storedLang !== 'en') {
      target = storedLang;
    } else if (cookieLang && cookieLang !== 'en') {
      target = cookieLang;
    } else if (storedLang) {
      target = storedLang;
    } else {
      target = cookieLang || 'en';
    }

    if (!preferredLang && storedLang && storedLang !== 'en' && cookieLang === 'en') {
      const value = `/en/${storedLang}`;
      setGoogleTranslateCookie(value);
      setGoogleTranslateCookie(value, window.location.hostname);
      setGoogleTranslateCookie(value, `.${window.location.hostname}`);
      target = storedLang;
    }

    if (target === 'en') {
      if (cookieLang && cookieLang !== 'en') {
        clearGoogleTranslateCookie();
        clearGoogleTranslateCookie(window.location.hostname);
        clearGoogleTranslateCookie(`.${window.location.hostname}`);
      }
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('preferred-language-gt');
        const storedUi = window.localStorage.getItem('preferred-language');
        if (storedUi && storedUi.toLowerCase() !== 'en') {
          window.localStorage.setItem('preferred-language', 'en');
        }
      }
      appliedLangRef.current = 'en';
    } else {
      if (cookieLang !== target) {
        const value = `/en/${target}`;
        setGoogleTranslateCookie(value);
        setGoogleTranslateCookie(value, window.location.hostname);
        setGoogleTranslateCookie(value, `.${window.location.hostname}`);
      }
      if (typeof window !== 'undefined') {
        const storedUi = window.localStorage.getItem('preferred-language');
        if (!storedUi) {
          window.localStorage.setItem('preferred-language', target);
        }
        window.localStorage.setItem('preferred-language-gt', target);
      }
    }

    document.documentElement.dir = RTL_LANGS.has(target) ? 'rtl' : 'ltr';
    document.documentElement.dataset.gtActive = target === 'en' ? 'false' : 'true';

    const html = document.documentElement;
    const hasTranslatedClass =
      html.classList.contains('translated-ltr') || html.classList.contains('translated-rtl');
    if (target === 'en') {
      html.classList.remove('translated-ltr', 'translated-rtl');
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      if (settleTimer.current) {
        window.clearTimeout(settleTimer.current);
        settleTimer.current = null;
      }
      return;
    }
    if (!force && appliedLangRef.current === target) return;
    if (target !== 'en' || hasTranslatedClass) {
      scheduleTranslate(target, force);
    }
  }, [scheduleTranslate]);

  useEffect(() => {
    appliedLangRef.current = null;
    syncTranslation(null, true);
  }, [pathname, syncTranslation]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ lang?: string; force?: boolean }>).detail;
      syncTranslation(detail?.lang ?? null, !!detail?.force);
    };
    window.addEventListener('google-translate:refresh', handler as EventListener);
    return () => {
      window.removeEventListener('google-translate:refresh', handler as EventListener);
    };
  }, [syncTranslation]);

  useEffect(() => () => {
    if (retryTimer.current) {
      window.clearTimeout(retryTimer.current);
      retryTimer.current = null;
    }
    if (settleTimer.current) {
      window.clearTimeout(settleTimer.current);
      settleTimer.current = null;
    }
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  return null;
}
