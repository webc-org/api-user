const globals = require('globals');
const tseslint = require('typescript-eslint');

module.exports = [
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
        ...globals.jest,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      // Add your custom rules here
    },
    extends: [
      'eslint:recommended',
      ...tseslint.configs.recommended,
    ],
  },
];
