const js = require('@eslint/js');
const tseslint = require('typescript-eslint');

module.exports = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/triple-slash-reference": "off"
    },
    ignores: [
      'eslint.config.js',
      'jest.config.js',
    ],
  },
];

