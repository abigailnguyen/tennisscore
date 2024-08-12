module.exports = {
  rootDir: '.',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json'
    }]
  },
  testMatch: ['<rootDir>/src/**/*.test.(ts|tsx|js)'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
  clearMocks: true,
  restoreMocks: true,
  verbose: true
};
