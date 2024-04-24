module.exports = {
  extends: ['@packages/eslint-config/node.js'],
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'max-classes-per-file': 'off',
    '@typescript-eslint/require-await': 'off',
    'class-methods-use-this': 'off',
  },
};
