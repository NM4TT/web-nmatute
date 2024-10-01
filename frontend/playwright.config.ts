import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  // Pointing Playwright to your development server or build
  webServer: {
    command: 'npm run build && npm run preview', // Astro's preview command after building
    reuseExistingServer: !process.env.CI, // Reuse the server when running locally
  },

  // Directory for your tests
  testDir: './tests',

  // Test file patterns (match both .test.ts and .spec.ts files)
  testMatch: /(.+\.)?(test|spec)\.[jt]s/,

  // Maximum number of workers for parallel testing
  workers: process.env.CI ? 1 : undefined,  // Single worker on CI, more locally

  // Use the built-in reporter for test results
  reporter: 'list',

  // Setting for retries
  retries: process.env.CI ? 2 : 0,  // Retry on CI, no retry locally

  // Configuration for the browser (Chromium, Firefox, WebKit)
  use: {
    browserName: 'chromium',  // You can set this to 'firefox' or 'webkit' as well
    headless: true,  // Run in headless mode for CI or when needed
    baseURL: "http://localhost:4321",  // Base URL of the app during testing

    // Viewport settings (for responsive testing)
    viewport: { width: 1280, height: 720 },

    // Enable video recording, useful for debugging (optional)
    video: process.env.CI ? 'on' : 'off',

    // Screenshot on failure (optional)
    screenshot: 'only-on-failure',
  },
};

export default config;
