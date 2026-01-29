# Translation Status

## ✅ Current Setup
- **English content**: Native (i18n with `t()` + `Trans`)
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
1. English content is stored in `src/locales/en/translation.json`.
2. `t('key')` and `<Trans i18nKey="..." />` resolve keys via `src/lib/react-i18next.tsx`.
3. When a user selects a non-English language, the Google Translate cookie is set.
4. Page reloads and Google Translate translates the rendered English content.
5. RTL languages (Arabic, Pashto, Dari, Persian) are handled by Google Translate.

## 📁 Files
- `src/lib/react-i18next.tsx` — lightweight i18n shim used by `t()` / `Trans`
- `src/locales/en/translation.json` — English translations
- `src/components/LanguageSwitcher.tsx` — Navbar language dropdown
- `src/components/FooterLanguageBar.tsx` — Footer language quick links

## ✅ Guardrails (Do Not Skip)
- **No duplicate top-level keys** in `translation.json` (JSON will silently overwrite).
- **Run key checks** before shipping changes that touch UI copy.
- **No feature creep**: do not add new translation systems, language files, or unrelated i18n features unless explicitly requested.

Commands:
- `npm run i18n:usage` — verifies every `t()` / `i18nKey` has a translation
- `npm run i18n:dupes` — detects duplicate keys in `translation.json`
- `npm run i18n:check` — runs both duplicate and usage checks
