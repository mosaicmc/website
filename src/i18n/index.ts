import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import en from './translations/en.json';
import ar from './translations/ar.json';
import zh from './translations/zh.json';
import es from './translations/es.json';
import uk from './translations/uk.json';
import ru from './translations/ru.json';
import ps from './translations/ps.json';
import ku from './translations/ku.json';
import vi from './translations/vi.json';
import hi from './translations/hi.json';
import tl from './translations/tl.json';
import it from './translations/it.json';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
  zh: { translation: zh },
  es: { translation: es },
  uk: { translation: uk },
  ru: { translation: ru },
  ps: { translation: ps },
  ku: { translation: ku },
  vi: { translation: vi },
  hi: { translation: hi },
  tl: { translation: tl },
  it: { translation: it },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en', // fallback language
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    detection: {
      // Detection options
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    debug: false, // Set to true for development debugging
  });

export default i18n;