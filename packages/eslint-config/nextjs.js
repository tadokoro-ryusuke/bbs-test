const react = require('./react-ui');

module.exports = {
  ...react,

  env: {
    ...react.env,

    'jest/globals': true,
  },

  plugins: [...react.plugins, 'jest'],
  extends: [...react.extends, 'next', 'next/core-web-vitals'],
  rules: {
    ...react.rules,

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
            pattern: '{@/components/**,@/pages/**}',
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
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.stories.*', '**/.storybook/**/*.*'],
        peerDependencies: true,
      },
    ],
  },
  overrides: [
    // Next.js needs default exports for pages and API points
    {
      files: ['*/pages/**/*'],
      rules: {
        'import/no-default-export': 'off',
        'import/prefer-default-export': 'error',
      },
    },
  ],
};
