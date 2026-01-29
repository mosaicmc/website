'use client';

import type { ReactNode } from 'react';
import { cloneElement, isValidElement, useMemo, Fragment, useCallback } from 'react';
import translations from '@/locales/en/translation.json';
import { getTranslationTarget } from '@/lib/google-translate';

type TranslationOptions = {
  returnObjects?: boolean;
  [key: string]: unknown;
};

type I18nShim = {
  language: string;
};

const getCookieLanguage = () => {
  const target = getTranslationTarget();
  return target || 'en';
};

const interpolate = (input: string, options?: TranslationOptions) => {
  if (!options) return input;
  return input.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => {
    const value = options[key];
    if (value == null) return '';
    return String(value);
  });
};

const normalizeObjectValue = (value: Record<string, unknown>) => {
  const keys = Object.keys(value);
  const numericKeys = keys.filter((key) => /^\d+$/.test(key));
  if (numericKeys.length && numericKeys.length === keys.length) {
    return numericKeys
      .sort((a, b) => Number(a) - Number(b))
      .map((key) => value[key]);
  }
  return value;
};

const getValue = (key: string): unknown => {
  const parts = key.split('.');
  let current: unknown = translations;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return current;
};

type TranslationObjects = Record<string, unknown> | unknown[];
type TranslationResult = string | TranslationObjects;

type TFunction = {
  (key: string, options?: TranslationOptions | string): string;
  (key: string, options: TranslationOptions & { returnObjects: true }): TranslationObjects;
};

export function useTranslation(): {
  t: TFunction;
  i18n: I18nShim;
} {
  const language = getCookieLanguage();

  const t = useCallback(((key: string, options?: TranslationOptions | string): TranslationResult => {
    const value = getValue(key);
    if (typeof options === 'string') {
      if (value == null) return options;
      if (typeof value === 'string') return value;
      return value == null ? options : String(value);
    }
    if (options?.returnObjects) {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return normalizeObjectValue(value as Record<string, unknown>);
      }
      return value as TranslationResult;
    }
    if (Array.isArray(value)) return String(value);
    if (typeof value === 'string') return interpolate(value, options);
    return value == null ? key : String(value);
  }) as TFunction, []);

  const i18n: I18nShim = useMemo(() => ({ language }), [language]);

  return { t, i18n };
}

type TransProps = {
  i18nKey: string;
  components?: Record<string, ReactNode> | ReactNode[];
  children?: ReactNode;
};

export function Trans({ i18nKey, components }: TransProps) {
  const raw = getValue(i18nKey);
  if (typeof raw !== 'string') return <>{raw ?? i18nKey}</>;

  const parts: ReactNode[] = [];
  const regex = /<([a-zA-Z0-9_]+)>(.*?)<\/\1>/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(raw)) !== null) {
    if (match.index > lastIndex) {
      parts.push(raw.slice(lastIndex, match.index));
    }
    const key = match[1];
    const content = match[2];
    const index = Number(key);
    const component = Array.isArray(components)
      ? components[index]
      : components?.[key];
    if (component && isValidElement(component)) {
      parts.push(cloneElement(component, component.props, content));
    } else {
      parts.push(content);
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < raw.length) {
    parts.push(raw.slice(lastIndex));
  }

  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={index}>{part}</Fragment>
      ))}
    </>
  );
}
