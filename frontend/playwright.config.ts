import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:8080/',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:8080/',
    viewport: { width: 1280, height: 720 },
  },

  // Directory for your tests
  testDir: './tests',

  // Test file patterns (match both .test.ts and .spec.ts files)
  testMatch: /(.+\.)?(test|spec)\.[t]s/,

  // Maximum number of workers for parallel testing
  workers: process.env.CI ? 1 : undefined,  // Single worker on CI, more locally

  // Use the built-in reporter for test results
  reporter: 'list',
};

export default config;
