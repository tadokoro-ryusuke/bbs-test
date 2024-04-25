module.exports = {
  extends: ["@packages/eslint-config/nextjs.js"],
  parserOptions: {
    project: ["./tsconfig.eslint.json"],
    sourceType: "module",
    tsconfigRootDir: __dirname,
    ecmaFeatures: { jsx: true },
  },
};
