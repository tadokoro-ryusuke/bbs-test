const base = require('./base.js');

module.exports = {
  ...base,

  plugins: [...base.plugins, 'jsx-a11y', 'react', 'react-hooks', 'jest'],
  extends: [
    ...base.extends,
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'next',
    'next/core-web-vitals',
  ],
  settings: {
    ...base.settings,

    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
  },
  env: {
    'jest/globals': true,
  },
  rules: {
    ...base.rules,

    'react/display-name': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': ['off'],
    'import/extensions': [
      'error',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        gen: 'always',
      },
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/require-await': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'object',
          'type',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: {order: 'asc', caseInsensitive: true},
        pathGroups: [
          {
            pattern: '{@/components/**,@/pages/**,@/features/**,@/layouts/**}',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['*.stories.tsx'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
};
