import { defineConfig } from 'vitest/config';
import path from 'node:path';

/**
 * Replaces jest.config.js + next/jest.
 *
 * next/jest supplied the path alias, the next/server mock and the jsdom
 * environment implicitly; vitest wants them stated, so they are visible here
 * rather than inherited.
 *
 * The old config carried a transformIgnorePatterns override for ESM-only
 * packages (ai-kit), because jest runs CJS and died on `Unexpected token
 * 'export'`. vitest loads ESM natively, so that workaround is gone rather
 * than translated.
 */
export default defineConfig({
  test: {
    // Keeps describe/it/expect/beforeEach/vi global, so the migration touched
    // only the jest.* API names and not every import line in the suite.
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['tests/**/*.test.{ts,tsx,js,jsx}'],
  },
  resolve: {
    alias: [
      // was moduleNameMapper: '^next/server$'
      {
        find: /^next\/server$/,
        replacement: path.resolve(__dirname, './__mocks__/next/server.ts'),
      },
      // was moduleNameMapper: '^@/(.*)$'
      { find: /^@\//, replacement: path.resolve(__dirname, './') + '/' },
    ],
  },
});
