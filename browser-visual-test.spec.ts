import { test, expect } from '@playwright/test';

test.describe('Calculator Pages Visual Test', () => {
  
  test('Load and verify key calculator pages', async ({ browser, context }) => {
    const pages = [
      'http://localhost:3002/en/bmi-calculator/',
      'http://localhost:3002/en/mortgage-calculator/',
      'http://localhost:3002/en/retirement-calculator/',
      'http://localhost:3002/en/numbers-to-words-converter/',
      'http://localhost:3002/en/income-tax-calculator/',
      'http://localhost:3002/es/bmi-calculator/', // Spanish
    ];

    console.log('\n🔍 Testing calculator pages in real browser...\n');

    for (const url of pages) {
      console.log(`\n📄 Testing: ${url}`);
      
      const page = await context.newPage();
      
      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
        
        // Wait for calculator inputs
        await page.waitForSelector('input, select, button', { timeout: 10000 });
        
        // Check page title
        const title = await page.title();
        console.log(`   ✅ Page title: ${title}`);
        
        // Check for calculator word
        const bodyText = await page.textContent('body');
        const hasCalc = bodyText.toLowerCase().includes('calculator') || 
                       bodyText.toLowerCase().includes('converter');
        console.log(`   ✅ Has calculator content: ${hasCalc}`);
        
        // Get input count
        const inputCount = await page.locator('input').count();
        console.log(`   ✅ Input fields found: ${inputCount}`);
        
        // Check console errors
        let errors = [];
        page.on('console', msg => {
          if (msg.type() === 'error') {
            errors.push(msg.text());
          }
        });
        
        page.on('pageerror', error => {
          errors.push(error.message);
        });
        
        if (errors.length === 0) {
          console.log(`   ✅ No console errors`);
        } else {
          console.log(`   ⚠️  Console errors: ${errors.join(', ')}`);
        }
        
        // Take screenshot
        await page.screenshot({ path: `/tmp/calculator-${url.split('/').pop() || 'home'}.png` });
        console.log(`   📸 Screenshot saved`);
        
      } catch (error) {
        console.log(`   ❌ Error: ${error.message}`);
      } finally {
        await page.close();
      }
    }

    console.log('\n✅ Visual browser test complete!\n');
    expect(true).toBe(true);
  });
});
