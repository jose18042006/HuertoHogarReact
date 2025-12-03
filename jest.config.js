
module.exports = {
  testEnvironment: 'jsdom',
  transform: { '^.+\\.[tj]sx?$': 'babel-jest' },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleNameMapper: {
    '\\.(css|scss|sass|less)$': 'identity-obj-proxy'
  }
}
