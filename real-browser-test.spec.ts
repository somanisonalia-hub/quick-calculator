import { test, expect, chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Try both ports - Playwright will use whichever is available
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// Read all calculator slugs from JSON files
function getAllCalculatorSlugs() {
  const calculatorsDir = path.join(process.cwd(), 'content', 'calculators');
  const files = fs.readdirSync(calculatorsDir).filter(f => f.endsWith('.json'));
  const slugs = [];
  
  for (const file of files) {
    try {
      const content = JSON.parse(fs.readFileSync(path.join(calculatorsDir, file), 'utf-8'));
      const slug = content.en?.slug || file.replace('.json', '');
      slugs.push(slug);
    } catch (err) {
      // skip
    }
  }
  
  return slugs.sort();
}

const allSlugs = getAllCalculatorSlugs();

test.describe('Real Browser UI Test - All Calculator Pages', () => {
  let browser;

  test.beforeAll(async () => {
    browser = await chromium.launch();
  });

  test.afterAll(async () => {
    await browser?.close();
  });

  test(`Load and verify all ${allSlugs.length} calculator pages in browser`, async () => {
    const page = await browser.newPage();
    let passCount = 0;
    let failCount = 0;
    const failedPages = [];

    console.log(`\n🔍 Testing ${allSlugs.length} calculator pages in real browser...\n`);

    for (let i = 0; i < allSlugs.length; i++) {
      const slug = allSlugs[i];
      const url = `${BASE_URL}/en/${slug}/`;
      
      try {
        // Navigate to page
        await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
        
        // Wait for calculator content to load
        await page.waitForSelector('input, select', { timeout: 5000 });
        
        // Get page title
        const title = await page.title();
        
        // Check for "Calculator" or "Converter" in page
        const bodyText = await page.textContent('body');
        const hasCalculatorWord = bodyText.toLowerCase().includes('calculator') || 
                                  bodyText.includes('Convert');
        
        // Check console for errors
        const consoleMessages = [];
        page.on('console', msg => {
          if (msg.type() === 'error') {
            consoleMessages.push(msg.text());
          }
        });
        
        // Get page errors
        const errors = [];
        page.on('pageerror', error => {
          errors.push(error.message);
        });
        
        if (hasCalculatorWord && errors.length === 0) {
          passCount++;
          console.log(`✅ [${i+1}/${allSlugs.length}] ${slug}`);
        } else {
          failCount++;
          failedPages.push({
            slug,
            hasCalculator: hasCalculatorWord,
            errors: errors.length > 0 ? errors.join('; ') : 'Unknown error'
          });
          console.log(`❌ [${i+1}/${allSlugs.length}] ${slug} - ${!hasCalculatorWord ? 'No calculator text' : 'Console errors'}`);
        }
      } catch (error) {
        failCount++;
        failedPages.push({
          slug,
          error: error.message
        });
        console.log(`❌ [${i+1}/${allSlugs.length}] ${slug} - ${error.message.split('\n')[0]}`);
      }
    }

    await page.close();

    console.log(`\n${'='.repeat(60)}`);
    console.log(`✅ Passed: ${passCount}/${allSlugs.length}`);
    console.log(`❌ Failed: ${failCount}/${allSlugs.length}`);

    if (failedPages.length > 0) {
      console.log(`\n❌ Failed pages:`);
      failedPages.forEach(p => {
        console.log(`  - ${p.slug}: ${p.error || p.errors}`);
      });
    }

    console.log(`\n🎉 Real browser test complete!\n`);

    // Assert all passed
    expect(failCount).toBe(0);
  });
});
