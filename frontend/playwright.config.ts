import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  webServer: {
    command: 'npm run preview',
    port: 4173,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:4173/',
  },

  // Directory for your tests
  testDir: './e2e',

  // Test file patterns (match both .test.ts and .spec.ts files)
  testMatch: /(.+\.)?(test|spec)\.[t]s/,

  // Maximum number of workers for parallel testing
  workers: process.env.CI ? 1 : undefined,  // Single worker on CI, more locally

  // Use the built-in reporter for test results
  reporter: 'list',
};

export default config;
