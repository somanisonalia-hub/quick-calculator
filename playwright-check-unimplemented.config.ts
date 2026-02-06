import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './',
  testMatch: 'check-unimplemented-calculators.spec.ts',
  fullyParallel: false,
  retries: 0,
  workers: 1,
  timeout: 300000, // 5 minutes for entire test
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'off',
    screenshot: 'off',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
