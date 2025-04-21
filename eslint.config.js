import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.mocha,
        ...globals.node,
        $: 'readonly',
        browser: 'readonly',
        expect: 'readonly',
      },
    },
  },

  {
    files: ['**/*.test.js', '**/*.spec.js', '**/*.steps.js'],
    languageOptions: {
      globals: {
        ...globals.mocha,
        browser: 'readonly',
        expect: 'readonly',
      },
    },
  },

  {
    files: ['config/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        exports: 'writable',
      },
    },
  },
];
