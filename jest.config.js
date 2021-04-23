module.exports = {
  preset: 'ts-jest',
  bail: true,
  testEnvironment: 'node',
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  collectCoverageFrom: [
    'src/external/**',
    'src/business/**',
    'src/index.ts'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/__tests__/.*',
    '<rootDir>/src/config/.*',
    '<rootDir>/src/util/.*',
    '<rootDir>/src/plugins/.*'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/config/.*',
    '<rootDir>/src/util/.*',
    '<rootDir>/src/plugins/.*'
  ],
  moduleDirectories: [
    'src',
    'node_modules'
  ],
  coverageReporters: ['lcov', 'json', 'text', 'html'],
  testMatch: null,
  testRegex: '(/__tests__/|(\\.|/)(test|spec))\\.ts$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  testResultsProcessor: 'jest-sonar-reporter',

  globals: {
    'ts-jest': {
      babelConfig: true
    }
  }
}
