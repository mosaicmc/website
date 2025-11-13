import * as React from 'react';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
  }
}

// Lightweight, hidden initializer for Google Translate.
// Keeps the machine translation working without rendering the default UI.
export default function GoogleTranslateInit() {
  React.useEffect(() => {
    const scriptId = 'google-translate-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }

    window.googleTranslateElementInit = () => {
      try {
        // @ts-ignore - google global provided by script
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages:
              'ar,zh-CN,zh-TW,es,uk,ru,ps,ku,vi,hi,tl,it,pt,fa,th,sw',
            autoDisplay: false,
            layout: 0,
          },
          'google_translate_element_hidden'
        );
      } catch (e) {
        // best-effort init; if script not ready yet, Google will call again
      }
    };

    // No cleanup; Google widget doesn’t provide a safe destroy.
  }, []);

  return (
    <div
      id="google_translate_element_hidden"
      style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}
      aria-hidden="true"
    />
  );
}