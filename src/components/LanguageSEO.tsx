import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export const LanguageSEO: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  
  // Base URL from environment or default
  const baseUrl = window.location.origin;
  const currentPath = window.location.pathname;

  // List of supported languages
  const languages = ['en', 'ar', 'zh', 'es', 'uk', 'ru', 'ps', 'ku', 'vi', 'hi', 'tl', 'it'];

  useEffect(() => {
    // Update the document lang attribute
    document.documentElement.lang = currentLang;
    document.documentElement.dir = ['ar', 'ps', 'ku'].includes(currentLang) ? 'rtl' : 'ltr';
  }, [currentLang]);

  return (
    <Helmet>
      {/* Current Language */}
      <html lang={currentLang} dir={['ar', 'ps', 'ku'].includes(currentLang) ? 'rtl' : 'ltr'} />
      
      {/* Hreflang Tags for SEO */}
      {languages.map((lang) => (
        <link 
          key={lang} 
          rel="alternate" 
          hrefLang={lang} 
          href={`${baseUrl}${currentPath}?lng=${lang}`} 
        />
      ))}
      <link 
        rel="alternate" 
        hrefLang="x-default" 
        href={`${baseUrl}${currentPath}?lng=en`} 
      />
    </Helmet>
  );
};
