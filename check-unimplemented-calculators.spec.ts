import { test, expect } from '@playwright/test';

test.describe('Check for Unimplemented Calculators', () => {
  const BASE_URL = 'http://localhost:3000';
  
  test('should check all calculator links for unimplemented components', async ({ page }) => {
    console.log('\n🔍 Checking for unimplemented calculators...\n');
    
    // Go to home page
    console.log(`📄 Loading home page: ${BASE_URL}`);
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    
    // Get all calculator links
    const links = await page.locator('a[href*="/en/"][href$="/"]').all();
    console.log(`\n✅ Found ${links.length} links on home page\n`);
    
    // Extract unique calculator URLs
    const calculatorUrls: string[] = [];
    const seenUrls = new Set<string>();
    
    for (const link of links) {
      const href = await link.getAttribute('href');
      if (href && href.includes('/en/') && !seenUrls.has(href)) {
        // Skip non-calculator links
        if (href === '/' || href === '/en/' || href.includes('#')) {
          continue;
        }
        seenUrls.add(href);
        const fullUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`;
        calculatorUrls.push(fullUrl);
      }
    }
    
    console.log(`📊 Unique calculator URLs to check: ${calculatorUrls.length}\n`);
    console.log('━'.repeat(80));
    
    const unimplementedCalculators: string[] = [];
    const workingCalculators: string[] = [];
    const erroredPages: Array<{ url: string, error: string }> = [];
    
    let count = 0;
    
    // Check each calculator URL
    for (const url of calculatorUrls) {
      count++;
      const calculatorName = url.split('/en/')[1]?.replace('/', '') || url;
      
      process.stdout.write(`\n[${count}/${calculatorUrls.length}] Checking: ${calculatorName}`);
      
      try {
        const response = await page.goto(url, { 
          waitUntil: 'networkidle', 
          timeout: 20000 
        });
        
        // Check HTTP status
        if (!response || response.status() >= 400) {
          erroredPages.push({ 
            url: calculatorName, 
            error: `HTTP ${response?.status() || 'unknown'}` 
          });
          console.log(` ❌ ERROR: HTTP ${response?.status()}`);
          continue;
        }
        
        // Wait a bit for content to load
        await page.waitForTimeout(500);
        
        // Check for "Calculator component not yet implemented"
        const pageContent = await page.textContent('body');
        
        if (pageContent?.includes('Calculator component not yet implemented') ||
            pageContent?.includes('not yet implemented') ||
            pageContent?.includes('Component not found')) {
          unimplementedCalculators.push(calculatorName);
          console.log(' ⚠️  NOT IMPLEMENTED');
        } else {
          workingCalculators.push(calculatorName);
          console.log(' ✅');
        }
        
      } catch (error: any) {
        erroredPages.push({ 
          url: calculatorName, 
          error: error.message?.substring(0, 50) || 'Unknown error' 
        });
        console.log(` ❌ ERROR: ${error.message?.substring(0, 40)}`);
      }
    }
    
    // Print summary report
    console.log('\n' + '━'.repeat(80));
    console.log('\n📊 SUMMARY REPORT\n');
    console.log('━'.repeat(80));
    
    console.log(`\n✅ Working Calculators: ${workingCalculators.length}`);
    console.log(`⚠️  Unimplemented Calculators: ${unimplementedCalculators.length}`);
    console.log(`❌ Pages with Errors: ${erroredPages.length}`);
    console.log(`📝 Total Checked: ${calculatorUrls.length}`);
    
    if (unimplementedCalculators.length > 0) {
      console.log('\n' + '━'.repeat(80));
      console.log('\n⚠️  UNIMPLEMENTED CALCULATORS (need manual fix):\n');
      unimplementedCalculators.forEach((calc, idx) => {
        console.log(`   ${idx + 1}. ${calc}`);
      });
    }
    
    if (erroredPages.length > 0) {
      console.log('\n' + '━'.repeat(80));
      console.log('\n❌ PAGES WITH ERRORS:\n');
      erroredPages.forEach((item, idx) => {
        console.log(`   ${idx + 1}. ${item.url}`);
        console.log(`      Error: ${item.error}`);
      });
    }
    
    console.log('\n' + '━'.repeat(80));
    console.log('\n✅ Analysis complete!\n');
    
    // Save detailed report to file
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total: calculatorUrls.length,
        working: workingCalculators.length,
        unimplemented: unimplementedCalculators.length,
        errors: erroredPages.length
      },
      unimplementedCalculators,
      erroredPages,
      allUrls: calculatorUrls.map(url => url.split('/en/')[1]?.replace('/', '') || url)
    };
    
    const fs = require('fs');
    fs.writeFileSync(
      'calculator-implementation-report.json',
      JSON.stringify(report, null, 2)
    );
    console.log('📄 Detailed report saved to: calculator-implementation-report.json\n');
  });
});
