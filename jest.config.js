// module.exports = {
//   testEnvironment: 'node', // Use Node.js environment
//   coveragePathIgnorePatterns: ['/node_modules/'], // Ignore node_modules for coverage
//   testMatch: ['**/__tests__/**/*.test.js'], // Look for test files in __tests__ folders
// };

module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/__tests__/**/*.test.js'],
  collectCoverage: true, // Enable coverage collection
  coverageReporters: ['text', 'lcov'], // Generate text and lcov reports
};