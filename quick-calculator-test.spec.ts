import { test, expect } from '@playwright/test';

test.describe('Quick Calculator Check', () => {
  // Test a sample of calculators to quickly identify issues
  const sampleCalculators = [
    '/en/401k-calculator',
    '/en/amortization-schedule-calculator',
    '/en/bmi-calculator',
    '/en/debt-consolidation-calculator',
    '/en/life-insurance-calculator',
    '/en/loan-affordability-calculator',
    '/en/loan-repayment',
    '/en/mortgage-calculator',
    '/en/percentage-calculator',
    '/en/retirement-calculator',
  ];

  for (const calcPath of sampleCalculators) {
    test(`Check ${calcPath}`, async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      console.log(`\n📱 Testing: ${calcPath}`);
      
      await page.goto(`http://localhost:3000${calcPath}`, { 
        waitUntil: 'domcontentloaded',
        timeout: 15000 
      });

      // Wait a bit for JS to load
      await page.waitForTimeout(1500);

      // Check if calculator component exists
      const hasInputs = await page.locator('input, select, button[type="button"]').count();
      console.log(`   Found ${hasInputs} interactive elements`);

      // Check for "not implemented" message
      const notImplemented = await page.locator('text=/not yet implemented|coming soon|under development/i').isVisible().catch(() => false);
      
      // Check for layout issues
      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > (document.documentElement.clientWidth + 5);
      });

      const buttonsOutside = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        return buttons.some(btn => {
          const rect = btn.getBoundingClientRect();
          return rect.right > window.innerWidth + 5;
        });
      });

      console.log(`   Not implemented: ${notImplemented ? '❌ YES' : '✅ NO'}`);
      console.log(`   Has inputs: ${hasInputs > 2 ? '✅ YES' : '❌ NO'}`);
      console.log(`   Horizontal overflow: ${hasOverflow ? '❌ YES' : '✅ NO'}`);
      console.log(`   Buttons outside view: ${buttonsOutside ? '❌ YES' : '✅ NO'}`);

      // Take screenshot if there are issues
      if (notImplemented || hasOverflow || buttonsOutside || hasInputs < 3) {
        await page.screenshot({
          path: `playwright-screenshots/issue-${calcPath.replace(/\//g, '_')}.png`,
          fullPage: false
        });
        console.log(`   📸 Screenshot saved`);
      }

      // Assertions
      expect(notImplemented, `${calcPath} showing "not implemented" message`).toBe(false);
      expect(hasInputs, `${calcPath} should have calculator inputs`).toBeGreaterThan(2);
      expect(hasOverflow, `${calcPath} has horizontal overflow on mobile`).toBe(false);
      expect(buttonsOutside, `${calcPath} has buttons extending beyond viewport`).toBe(false);
    });
  }
});
