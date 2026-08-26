const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^next/server$': '<rootDir>/__mocks__/next/server.ts',
  },
  testMatch: [
    '<rootDir>/tests/**/*.test.ts',
    '<rootDir>/tests/**/*.test.tsx',
    '<rootDir>/tests/**/*.test.js',
    '<rootDir>/tests/**/*.test.jsx',
  ],
  collectCoverageFrom: ['lib/**/*.{ts,tsx}', '!lib/**/*.d.ts', '!lib/**/index.ts'],
};

/**
 * Packages that must be transformed rather than required.
 *
 * `ai-kit` is ESM-only ("type": "module", no require condition). Jest runs CJS,
 * so without this it dies on `Unexpected token 'export'` the moment anything
 * imports it.
 *
 * This list is for packages this repo imports DIRECTLY and on purpose. If an
 * entry is ever needed for something no file here imports, that is a dependency
 * leaking through someone's re-export, and the fix belongs in that package
 * rather than in this list — `ai-kit` shipped exactly that bug once, dragging
 * `ai-forms` in behind its root export, and it was fixed there.
 */
const ESM_PACKAGES = ['ai-kit'];

// createJestConfig is exported this way to ensure that next/jest can load the
// Next.js config which is async. The transformIgnorePatterns override has to
// happen AFTER it resolves: next/jest builds its own, and anything set in
// customJestConfig above is replaced wholesale rather than merged.
module.exports = async () => {
  const config = await createJestConfig(customJestConfig)();

  config.transformIgnorePatterns = [
    `/node_modules/(?!(${ESM_PACKAGES.join('|')})/)`,
    ...(config.transformIgnorePatterns ?? []).filter((p) => !/node_modules/.test(p)),
  ];

  return config;
};
