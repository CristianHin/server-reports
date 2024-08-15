module.exports = {
    // Otras configuraciones...
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1',
    },
    moduleFileExtensions: ['js', 'json', 'ts'],
    testEnvironment: 'node',
    collectCoverage: true,
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    coverageDirectory: 'coverage',
    coverageReporters: ['lcov', 'text', 'cobertura']
  };