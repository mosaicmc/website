# Translation Status

## ✅ Current Setup
- **English content**: Native (i18n with t() function)
- **All other languages**: Google Translate (automatic)
- **Language switcher**: Navbar dropdown with 14 languages + flags
- **Footer language bar**: Quick access to common languages

## 🌐 Supported Languages
| Language | Code | Flag | Method |
|----------|------|------|--------|
| English | en | 🇬🇧 | Native (i18n) |
| Arabic | ar | 🇸🇦 | Google Translate |
| Pashto | ps | 🇦🇫 | Google Translate |
| Dari | fa-AF | 🇦🇫 | Google Translate |
| Persian | fa | 🇮🇷 | Google Translate |
| Spanish | es | 🇪🇸 | Google Translate |
| Chinese | zh-CN | 🇨🇳 | Google Translate |
| Hindi | hi | 🇮🇳 | Google Translate |
| Italian | it | 🇮🇹 | Google Translate |
| Kurdish | ku | 🇮🇶 | Google Translate |
| Russian | ru | 🇷🇺 | Google Translate |
| Tagalog | tl | 🇵🇭 | Google Translate |
| Ukrainian | uk | 🇺🇦 | Google Translate |
| Vietnamese | vi | 🇻🇳 | Google Translate |

## 🔧 How It Works
1. English content is stored in `public/locales/en/translation.json`
2. All `t('key')` calls load English text
3. When user selects a non-English language, Google Translate cookie is set
4. Page reloads and Google Translate translates the entire page
5. RTL languages (Arabic, Pashto, Dari, Persian) are handled automatically by Google Translate

## 📁 Files
- `src/i18n/index.ts` — i18n configuration (English only)
- `public/locales/en/translation.json` — English translations
- `src/components/LanguageSwitcher.tsx` — Navbar language dropdown
- `src/components/FooterLanguageBar.tsx` — Footer language quick links
