/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const tsParser = '@typescript-eslint/parser';
const tsParserOpts = {
  emaVersion: 2018,
  tsconfigRootDir: __dirname,
  project: './tsconfig.json',
};

module.exports = {
  parser: tsParser,
  parserOptions: tsParserOpts,
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: ['@typescript-eslint'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname)],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        project: path.resolve(__dirname, './tsconfig.json'),
      },
    },
  },
  env: {
    node: true,
  },
  rules: {
    'import/newline-after-import': ['error', { count: 2 }],
    'import/order': ['error', { 'newlines-between': 'always' }],
    'import/named': 'off',
    'no-undef': 'off',
    'quotes': ['error', 'single', { avoidEscape: true }],
    'import/prefer-default-export': 'off'
  },
  // For *.ts files
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn', // or 'error'
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
        'react/react-in-jsx-scope': 'off',
        'react/jsx-no-target-blank': 'warn',
        semi: ['error', 'always'],
        indent: 'off',
        '@typescript-eslint/indent': ['error', 'tab', { SwitchCase: 1 }],
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-namespace': 'off',
        'import/no-unresolved': 'off',
        '@typescript-eslint/naming-convention': [
          'error',
          // Enforce that all vars, funcs and props are camelCase
          {
            selector: 'variableLike',
            format: ['camelCase', 'PascalCase'],
          },
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          },
          {
            selector: 'parameter',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
          // Enforce that all private members are prefix with an underscore
          {
            selector: 'memberLike',
            modifiers: ['private'],
            format: ['camelCase'],
            leadingUnderscore: 'require',
          },
          // Enforce that boolean vars are prefixed with an allowed verb
          {
            selector: 'variable',
            types: ['boolean'],
            format: ['PascalCase'],
            prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
          },
          // Enforce that type parameters (generics) are prefix with T
          {
            selector: 'typeParameter',
            format: ['PascalCase'],
            prefix: ['T'],
          },
          // Enforce that interfaces name prefix with I
          {
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
              regex: '^I[A-Z]',
              match: true,
            },
          },
        ],
        '@typescript-eslint/member-delimiter-style': [
          'error',
          {
            multiline: {
              delimiter: 'comma',
              requireLast: true,
            },
            singleline: {
              delimiter: 'comma',
              requireLast: false,
            },
            overrides: {
              interface: {
                multiline: {
                  delimiter: 'semi',
                  requireLast: true,
                },
              },
            },
          },
        ],
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          {
            accessibility: 'explicit',
            overrides: {
              constructors: 'no-public',
            },
          },
        ],
      },
    },
    {
      files: ['**/*.tsx'],
      rules: {
        'max-lines': ['error', 250],
        'max-lines-per-function': ['error', { max: 80 }],
        'semi': ['error', 'never']
      },
    },
  ],
};
