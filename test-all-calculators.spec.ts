import { test, expect, Page } from '@playwright/test';

interface CalculatorTest {
  name: string;
  url: string;
  status: 'success' | 'missing' | 'error';
  error?: string;
  hasLayoutIssue?: boolean;
}

test.describe('Calculator Availability Test', () => {
  const results: CalculatorTest[] = [];
  const baseUrl = 'http://localhost:3000';

  test('Check all calculators from homepage', async ({ page }) => {
    // Set mobile viewport for layout testing
    await page.setViewportSize({ width: 375, height: 667 });

    console.log('\n🔍 Starting calculator availability test...\n');

    // Navigate to homepage
    await page.goto(`${baseUrl}/en`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Get all calculator links from the homepage
    const calculatorLinks = await page.evaluate(() => {
      const links: { name: string; url: string }[] = [];
      const anchors = document.querySelectorAll('a[href*="/en/"]');
      
      anchors.forEach((anchor) => {
        const href = anchor.getAttribute('href');
        const text = anchor.textContent?.trim() || '';
        
        // Filter out category links and non-calculator links
        if (href && 
            !href.includes('/categories/') && 
            !href.endsWith('/en') && 
            !href.endsWith('/en/') &&
            text.length > 0 &&
            !text.toLowerCase().includes('category') &&
            !text.toLowerCase().includes('home')) {
          links.push({
            name: text,
            url: href.startsWith('http') ? href : href
          });
        }
      });
      
      // Remove duplicates
      const unique = Array.from(new Map(links.map(item => [item.url, item])).values());
      return unique;
    });

    console.log(`📊 Found ${calculatorLinks.length} calculator links\n`);

    // Test each calculator
    for (const calc of calculatorLinks) {
      try {
        console.log(`Testing: ${calc.name}...`);
        
        const fullUrl = calc.url.startsWith('http') ? calc.url : `${baseUrl}${calc.url}`;
        await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 10000 });
        await page.waitForTimeout(1000);

        // Check if calculator is missing
        const missingText = await page.locator('text=/calculator component not yet implemented|calculator.*not.*implemented|coming soon|under development/i').first().isVisible({ timeout: 2000 }).catch(() => false);
        
        // Check if there's an actual error page or error message
        const hasError = await page.locator('.text-red-500, .text-red-600, .text-red-700, [class*="error"]').filter({ hasText: /error loading|failed to load|not found|500|404/i }).first().isVisible({ timeout: 2000 }).catch(() => false);

        // Check for successful calculator load - look for typical calculator elements
        const hasCalculatorInputs = await page.locator('input[type="number"], input[type="text"], select, button').count() > 2;

        // Check for horizontal overflow (layout issue)
        const hasOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });

        // Check if inputs or buttons are cut off
        const hasCutoffElements = await page.evaluate(() => {
          const elements = document.querySelectorAll('button, input, select');
          for (const el of Array.from(elements)) {
            const rect = el.getBoundingClientRect();
            if (rect.right > window.innerWidth) {
              return true;
            }
          }
          return false;
        });

        const hasLayoutIssue = hasOverflow || hasCutoffElements;

        if (missingText) {
          results.push({
            name: calc.name,
            url: calc.url,
            status: 'missing',
            error: 'Calculator not yet implemented',
            hasLayoutIssue
          });
          console.log(`  ❌ MISSING - Component not implemented`);
        } else if (hasError) {
          results.push({
            name: calc.name,
            url: calc.url,
            status: 'error',
            error: 'Error loading calculator',
            hasLayoutIssue
          });
          console.log(`  ⚠️  ERROR - Failed to load`);
        } else if (hasCalculatorInputs) {
          results.push({
            name: calc.name,
            url: calc.url,
            status: 'success',
            hasLayoutIssue
          });
          console.log(`  ✅ SUCCESS${hasLayoutIssue ? ' (Layout Issue Detected)' : ''}`);
        } else {
          // Page loaded but no calculator found
          results.push({
            name: calc.name,
            url: calc.url,
            status: 'missing',
            error: 'Calculator UI not detected',
            hasLayoutIssue
          });
          console.log(`  ⚠️  WARNING - Page loaded but calculator not detected`);
        }

        if (hasLayoutIssue) {
          console.log(`     ⚠️  Layout issue: ${hasOverflow ? 'Horizontal overflow' : 'Elements cut off on right'}`);
          
          // Take screenshot of layout issue
          await page.screenshot({
            path: `playwright-screenshots/${calc.url.replace(/\//g, '_')}.png`,
            fullPage: false
          });
        }

      } catch (error) {
        results.push({
          name: calc.name,
          url: calc.url,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        console.log(`  ⚠️  ERROR - ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    // Generate summary report
    console.log('\n' + '='.repeat(60));
    console.log('📋 CALCULATOR TEST SUMMARY');
    console.log('='.repeat(60) + '\n');

    const successful = results.filter(r => r.status === 'success');
    const missing = results.filter(r => r.status === 'missing');
    const errors = results.filter(r => r.status === 'error');
    const layoutIssues = results.filter(r => r.hasLayoutIssue);

    console.log(`✅ Successful: ${successful.length}`);
    console.log(`❌ Missing: ${missing.length}`);
    console.log(`⚠️  Errors: ${errors.length}`);
    console.log(`📱 Layout Issues: ${layoutIssues.length}`);
    console.log(`📊 Total Tested: ${results.length}\n`);

    if (missing.length > 0) {
      console.log('❌ MISSING CALCULATORS:');
      missing.forEach(r => console.log(`   - ${r.name} (${r.url})`));
      console.log('');
    }

    if (errors.length > 0) {
      console.log('⚠️  CALCULATORS WITH ERRORS:');
      errors.forEach(r => console.log(`   - ${r.name}: ${r.error} (${r.url})`));
      console.log('');
    }

    if (layoutIssues.length > 0) {
      console.log('📱 CALCULATORS WITH LAYOUT ISSUES:');
      layoutIssues.forEach(r => console.log(`   - ${r.name} (${r.url})`));
      console.log('   Screenshots saved to playwright-screenshots/');
      console.log('');
    }

    // Save detailed results to JSON
    const fs = require('fs');
    const reportPath = 'calculator-test-results.json';
    fs.writeFileSync(reportPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      summary: {
        total: results.length,
        successful: successful.length,
        missing: missing.length,
        errors: errors.length,
        layoutIssues: layoutIssues.length
      },
      results: results
    }, null, 2));

    console.log(`📄 Detailed results saved to: ${reportPath}\n`);

    // Test should pass if at least 90% of calculators work
    const successRate = (successful.length / results.length) * 100;
    console.log(`Success Rate: ${successRate.toFixed(1)}%\n`);

    expect(successRate).toBeGreaterThan(90);
  });
});

test.describe('Specific Calculator Layout Tests', () => {
  const calculatorsToTest = [
    '/en/amortization-schedule-calculator',
    '/en/debt-consolidation-calculator',
    '/en/life-insurance-calculator',
    '/en/loan-affordability-calculator',
  ];

  for (const calcUrl of calculatorsToTest) {
    test(`Mobile layout test: ${calcUrl}`, async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto(`http://localhost:3000${calcUrl}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);

      // Check for horizontal overflow
      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      // Check if buttons extend beyond viewport
      const buttonsOutOfView = await page.evaluate(() => {
        const buttons = document.querySelectorAll('button');
        const issues: string[] = [];
        
        buttons.forEach((btn, index) => {
          const rect = btn.getBoundingClientRect();
          if (rect.right > window.innerWidth) {
            issues.push(`Button ${index + 1}: ${btn.textContent?.trim()} (right: ${rect.right}px)`);
          }
        });
        
        return issues;
      });

      // Check if inputs extend beyond viewport
      const inputsOutOfView = await page.evaluate(() => {
        const inputs = document.querySelectorAll('input');
        const issues: string[] = [];
        
        inputs.forEach((input, index) => {
          const rect = input.getBoundingClientRect();
          if (rect.right > window.innerWidth + 5) { // 5px tolerance
            issues.push(`Input ${index + 1} (right: ${rect.right}px)`);
          }
        });
        
        return issues;
      });

      console.log(`\n📱 Testing: ${calcUrl}`);
      console.log(`   Horizontal overflow: ${hasOverflow ? '❌ YES' : '✅ NO'}`);
      console.log(`   Buttons extending beyond view: ${buttonsOutOfView.length > 0 ? '❌ YES' : '✅ NO'}`);
      console.log(`   Inputs extending beyond view: ${inputsOutOfView.length > 0 ? '❌ YES' : '✅ NO'}`);

      if (buttonsOutOfView.length > 0) {
        console.log(`   Button issues:`);
        buttonsOutOfView.forEach(issue => console.log(`     - ${issue}`));
      }

      if (inputsOutOfView.length > 0) {
        console.log(`   Input issues:`);
        inputsOutOfView.forEach(issue => console.log(`     - ${issue}`));
      }

      // Take screenshot
      await page.screenshot({
        path: `playwright-screenshots/mobile-${calcUrl.replace(/\//g, '_')}.png`,
        fullPage: true
      });

      // Expect no layout issues
      expect(hasOverflow, `Horizontal overflow detected on ${calcUrl}`).toBe(false);
      expect(buttonsOutOfView.length, `Buttons extending beyond viewport on ${calcUrl}`).toBe(0);
      expect(inputsOutOfView.length, `Inputs extending beyond viewport on ${calcUrl}`).toBe(0);
    });
  }
});
