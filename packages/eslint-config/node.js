const base = require('./base');

module.exports = {
  ...base,

  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  settings: {
    ...base.settings,
    'import/extensions': ['.js', '.ts'],
  },
  rules: {
    ...base.rules,

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
      },
    ],
    'import/extensions': [
      'error',
      {
        js: 'never',
        ts: 'never',
      },
    ],
  },
};
