import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { auSpelling } from '@/lib/auSpelling';
import en from '../../public/locales/en/translation.json';

i18n
  .use({
    type: 'postProcessor',
    name: 'auSpelling',
    process(value: string, _key: string, _options: unknown, translator: { language?: string } | undefined) {
      const lng = translator && translator.language ? translator.language : i18n.language;
      if (lng === 'en') return auSpelling(value);
      return value;
    },
  })
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // fallback language
    supportedLngs: ['en'],
    resources: {
      en: { translation: en },
    },
    initImmediate: false,

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    react: {
      useSuspense: false,
    },

    debug: false, // Set to true for development debugging
    postProcess: ['auSpelling'],
  });

export default i18n;
