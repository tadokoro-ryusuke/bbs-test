module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // pathの設定
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
};
