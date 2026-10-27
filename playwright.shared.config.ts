import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './browser-tests',
  fullyParallel: false,
  workers: 1,
  use: { baseURL: 'http://127.0.0.1:3919', trace: 'retain-on-failure' },
  projects: [
    { name: 'phone', use: { viewport: { width: 390, height: 844 } } },
    { name: 'desktop', use: { viewport: { width: 1280, height: 900 } } },
  ],
  webServer: {
    command: 'pnpm exec next dev --webpack --hostname 127.0.0.1 --port 3919',
    url: 'http://127.0.0.1:3919/blog/welcome-post',
    timeout: 180_000,
    reuseExistingServer: false,
  },
});
