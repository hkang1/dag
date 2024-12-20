const path = require('path');

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parserOptions: {
        project: true,
        tsconfigRootDir: path.resolve(__dirname, '../../../'),
      },
      rules: {
        '@typescript-eslint/switch-exhaustiveness-check': 'error',
        'no-fallthrough': 'off',
      },
    },
    {
      files: ['**/streams/*.ts'],
      rules: {
        'sort-keys-fix/sort-keys-fix': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: [
    'import',
    'sort-keys-fix',
  ],
  rules: {
    // Can disagree with @typescript-eslint/member-ordering.
    '@typescript-eslint/adjacent-overload-signatures': 'off',
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-nocheck': 'allow-with-description' }],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/prefer-optional-chain': ['error'],
    'array-element-newline': ['error', 'consistent'],
    'arrow-parens': ['error', 'always'],
    'arrow-spacing': ['error', { after: true, before: true }],
    'block-spacing': ['error', 'always'],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': ['error', { after: true, before: false }],
    'eol-last': ['error', 'always'],
    'eqeqeq': ['error', 'smart'],
    'import/extensions': ['warn', { ts: 'never', tsx: 'never', css: 'always', scss: 'always' }],
    'import/order': [
      'error',
      {
        'alphabetize': { caseInsensitive: true, order: 'asc' },
        'pathGroups': [{ pattern: '@/**', group: 'external', position: 'after' }],
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
    'indent': 'off',
    'jsx-quotes': ['error', 'prefer-double'],
    'key-spacing': [
      'error',
      {
        multiLine: {
          afterColon: true,
          beforeColon: false,
          mode: 'strict',
        },
        singleLine: {
          afterColon: true,
          beforeColon: false,
        },
      },
    ],
    'keyword-spacing': ['error'],
    'no-console': ['error', { allow: ['error', 'warn'] }],
    'no-constant-condition': 'off',
    'no-duplicate-imports': 'error',
    'no-empty': ['error', { allowEmptyCatch: false }],
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    'no-restricted-imports': ['error', {}],
    'no-throw-literal': 'error',
    'no-trailing-spaces': ['error', {}],
    'no-unused-vars': 'off',
    'object-curly-spacing': ['error', 'always'],
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    'quote-props': ['error', 'consistent-as-needed'],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'require-await': 'error',
    'semi': ['error', 'always'],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
      },
    ],
    'sort-keys-fix/sort-keys-fix': ['error', 'asc', { caseSensitive: false, natural: true }],
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': ['error', { int32Hint: true }],
  },
  settings: {
    'import/resolver': { typescript: {} }, // This loads <rootdir>/tsconfig.json to eslint
  },
};