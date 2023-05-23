module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  collectCoverageFrom: [
      "src/__tests__/**/*.tsx",
      "src/App.tsx",
      "!src/index.tsx",
      "!src/reportWebVitals.tsx",
  ]
};
