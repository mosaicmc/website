# Translation Fix TODO

## Status
- ✅ i18n system working (lazy-loaded, RTL support)
- ✅ 5 core languages: English, Arabic, Pashto, Dari, Persian
- ✅ Google Translate fallback for other languages
- ⚠️ Some pages have hardcoded English (Google Translate covers these for now)

## Priority Pages to Fix (hardcoded English strings)
1. src/pages/AboutPage.tsx (37 strings)
2. src/pages/ResourcesPage.tsx
3. src/pages/policies/FeedbackComplaintsPolicyPage.tsx (53 strings)
4. src/pages/policies/CodeOfConductPolicyPage.tsx (47 strings)
5. src/pages/policies/PrivacyPolicyPage.tsx (42 strings)
6. src/pages/volunteer/NewcastleVolunteerPage.tsx (43 strings)

## How to Fix a Page
1. Find hardcoded English text in JSX
2. Replace with `t('section.keyName')`
3. Add the key to all 5 translation files in `public/locales/`
4. Test in all 5 languages

## Translation Files Location
- `public/locales/en/translation.json`
- `public/locales/ar/translation.json`
- `public/locales/ps/translation.json`
- `public/locales/fa-AF/translation.json` (Dari)
- `public/locales/fa/translation.json` (Persian)

## Notes
- Dari and Persian currently use placeholder translations (copied from Pashto/Arabic)
- Real translations needed from native speakers
- Backup of original i18n setup: `src/i18n-backup/`
