import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['app.js'],
    languageOptions: {
      // app.js is loaded with a plain <script> tag, not as a module
      sourceType: 'script',
      globals: globals.browser,
    },
  },
  {
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': 'error',
    },
  },
];
