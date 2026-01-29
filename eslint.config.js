import js from '@eslint/js';
import globals from 'globals';
import next from '@next/eslint-plugin-next';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'coverage', '.next'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      next.configs.recommended,
      next.configs['core-web-vitals'],
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@next/next/no-img-element': 'off',
      '@next/next/no-page-custom-font': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  {
    files: [
      'src/app/layout.tsx',
      'src/app/**/*.tsx',
      'src/lib/react-i18next.tsx',
      'src/lib/react-router-dom.tsx',
    ],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  }
);
