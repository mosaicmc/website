# Translation Fix TODO

## Status
- ✅ English copy lives in `src/locales/en/translation.json`
- ✅ Google Translate handles non-English languages at runtime
- ⚠️ No additional language files should be added unless explicitly requested

## Notes for Contributors
- The app uses a lightweight `t()` shim to read English copy.
- Do not introduce new i18n frameworks or additional locale files.
- Run `npm run i18n:check` after modifying UI copy.

## How to Fix a Page
1. Find hardcoded English text in JSX
2. Replace with `t('section.keyName')`
3. Add the key to all 5 translation files in `public/locales/`
4. Test in all 5 languages

## Translation Files Location
- `src/locales/en/translation.json`

## Notes
- Google Translate provides non-English language rendering.
