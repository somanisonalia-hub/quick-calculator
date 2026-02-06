import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './',
  testMatch: ['test-all-calculators.spec.ts', 'quick-calculator-test.spec.ts'],
  fullyParallel: false,
  retries: 0,
  workers: 1,
  timeout: 180000, // 3 minutes for the whole test
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    navigationTimeout: 15000, // 15 seconds per page
    actionTimeout: 10000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Don't start a web server - assume it's already running
});
