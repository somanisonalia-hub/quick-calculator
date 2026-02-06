import { test, expect } from '@playwright/test';

test.describe('Check All Calculators for Console Errors', () => {
  const BASE_URL = 'http://localhost:3000';
  
  test('should check all calculator pages for runtime errors', async ({ page }) => {
    console.log('\n🔍 Checking ALL calculator pages for console errors...\n');
    
    // First, get all links from home page
    await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
    
    const links = await page.locator('a[href*="/en/"]').evaluateAll(elements => 
      elements.map(el => el.getAttribute('href')).filter(Boolean)
    );
    
    const uniqueUrls = [...new Set(links)].filter(href => 
      href && href.includes('/en/') && !href.includes('#')
    );
    
    console.log(`📊 Total unique URLs to check: ${uniqueUrls.length}\n`);
    console.log('━'.repeat(80));
    
    const pagesWithErrors: Array<{
      url: string,
      errors: string[],
      referenceErrors: string[]
    }> = [];
    
    const cleanPages: string[] = [];
    let count = 0;
    
    for (const href of uniqueUrls) {
      count++;
      const fullUrl = href.startsWith('http') ? href : `${BASE_URL}${href}`;
      const displayUrl = href.replace('/en/', '').replace(/\/$/, '') || 'home';
      
      process.stdout.write(`\n[${count}/${uniqueUrls.length}] ${displayUrl.substring(0, 45).padEnd(45)}`);
      
      const consoleErrors: string[] = [];
      const referenceErrors: string[] = [];
      
      // Listen for console messages
      page.on('console', msg => {
        if (msg.type() === 'error') {
          const text = msg.text();
          consoleErrors.push(text);
          if (text.toLowerCase().includes('referenceerror') || 
              text.toLowerCase().includes('is not defined')) {
            referenceErrors.push(text);
          }
        }
      });
      
      // Listen for page errors
      page.on('pageerror', error => {
        const errorMsg = error.message;
        consoleErrors.push(errorMsg);
        if (errorMsg.toLowerCase().includes('referenceerror') || 
            errorMsg.toLowerCase().includes('is not defined')) {
          referenceErrors.push(errorMsg);
        }
      });
      
      try {
        await page.goto(fullUrl, { 
          waitUntil: 'domcontentloaded',
          timeout: 15000 
        });
        
        // Wait a bit for any runtime errors to appear
        await page.waitForTimeout(1500);
        
        // Remove listeners
        page.removeAllListeners('console');
        page.removeAllListeners('pageerror');
        
        if (referenceErrors.length > 0) {
          pagesWithErrors.push({
            url: displayUrl,
            errors: consoleErrors,
            referenceErrors
          });
          console.log(` ⚠️  ${referenceErrors.length} ReferenceError(s)`);
        } else if (consoleErrors.length > 0) {
          pagesWithErrors.push({
            url: displayUrl,
            errors: consoleErrors,
            referenceErrors: []
          });
          console.log(` ⚠️  ${consoleErrors.length} error(s)`);
        } else {
          cleanPages.push(displayUrl);
          console.log(' ✅');
        }
        
      } catch (error: any) {
        console.log(` ❌ ${error.message?.substring(0, 30)}`);
        page.removeAllListeners('console');
        page.removeAllListeners('pageerror');
      }
    }
    
    // Print summary
    console.log('\n' + '━'.repeat(80));
    console.log('\n📊 CONSOLE ERRORS REPORT\n');
    console.log('━'.repeat(80));
    
    const pagesWithReferenceErrors = pagesWithErrors.filter(p => p.referenceErrors.length > 0);
    
    console.log(`\n✅ Clean Pages: ${cleanPages.length}`);
    console.log(`⚠️  Pages with ReferenceErrors: ${pagesWithReferenceErrors.length}`);
    console.log(`⚠️  Pages with Other Errors: ${pagesWithErrors.length - pagesWithReferenceErrors.length}`);
    console.log(`📝 Total Checked: ${uniqueUrls.length}`);
    
    if (pagesWithReferenceErrors.length > 0) {
      console.log('\n' + '━'.repeat(80));
      console.log('\n⚠️  PAGES WITH RUNTIME REFERENCEERRORS:\n');
      
      pagesWithReferenceErrors.forEach((item, idx) => {
        console.log(`\n${idx + 1}. ${item.url}`);
        console.log(`   URL: http://localhost:3000/en/${item.url}/`);
        console.log(`   ReferenceErrors:`);
        item.referenceErrors.forEach((err, i) => {
          const shortErr = err.length > 100 ? err.substring(0, 100) + '...' : err;
          console.log(`      ${i + 1}. ${shortErr}`);
        });
      });
    }
    
    if (pagesWithErrors.length > pagesWithReferenceErrors.length) {
      console.log('\n' + '━'.repeat(80));
      console.log('\n⚠️  PAGES WITH OTHER CONSOLE ERRORS:\n');
      
      const otherErrors = pagesWithErrors.filter(p => p.referenceErrors.length === 0);
      otherErrors.slice(0, 10).forEach((item, idx) => {
        console.log(`\n${idx + 1}. ${item.url}`);
        console.log(`   First error: ${item.errors[0]?.substring(0, 80) || 'Unknown'}`);
      });
      
      if (otherErrors.length > 10) {
        console.log(`\n   ... and ${otherErrors.length - 10} more pages with errors`);
      }
    }
    
    console.log('\n' + '━'.repeat(80));
    
    // Save detailed report
    const fs = require('fs');
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total: uniqueUrls.length,
        clean: cleanPages.length,
        withReferenceErrors: pagesWithReferenceErrors.length,
        withOtherErrors: pagesWithErrors.length - pagesWithReferenceErrors.length
      },
      pagesWithReferenceErrors: pagesWithReferenceErrors.map(p => ({
        url: `http://localhost:3000/en/${p.url}/`,
        slug: p.url,
        referenceErrors: p.referenceErrors,
        allErrors: p.errors
      })),
      pagesWithOtherErrors: pagesWithErrors
        .filter(p => p.referenceErrors.length === 0)
        .map(p => ({
          url: `http://localhost:3000/en/${p.url}/`,
          slug: p.url,
          errors: p.errors
        })),
      cleanPages: cleanPages
    };
    
    fs.writeFileSync(
      'console-errors-report.json',
      JSON.stringify(report, null, 2)
    );
    
    console.log('\n📄 Detailed report saved to: console-errors-report.json\n');
    
    if (pagesWithReferenceErrors.length > 0) {
      console.log(`\n⚠️  ACTION REQUIRED: ${pagesWithReferenceErrors.length} pages have ReferenceErrors!\n`);
    } else {
      console.log('\n✅ No ReferenceErrors found across all pages!\n');
    }
  });
});
