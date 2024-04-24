module.exports = {
  extends: ['@packages/eslint-config/nextjs.js', 'plugin:storybook/recommended'],
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    ecmaFeatures: {jsx: true},
  },
};
