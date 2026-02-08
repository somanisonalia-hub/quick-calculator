const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  console.log('\n🔍 Comprehensive Console Error Check - All 156 Calculators\n');
  console.log('='.repeat(70));
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // First, get all calculator URLs from homepage
  console.log('\n📋 Step 1: Discovering calculator URLs from homepage...\n');
  
  await page.goto('http://localhost:3000/', { waitUntil: 'domcontentloaded' });
  
  const calculatorLinks = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href*="/en/"][href*="calculator"]'));
    return links
      .map(link => link.getAttribute('href'))
      .filter(href => href && href.includes('/en/') && href.includes('calculator'))
      .filter((href, index, self) => self.indexOf(href) === index) // unique
      .map(href => href.replace('http://localhost:3000', ''));
  });
  
  console.log(`Found ${calculatorLinks.length} calculator URLs\n`);
  
  const errors = [];
  const warnings = [];
  const results = [];
  
  // Test each calculator
  console.log('📊 Step 2: Testing each calculator...\n');
  
  let okCount = 0;
  let errorCount = 0;
  
  for (const url of calculatorLinks) {
    const fullUrl = `http://localhost:3000${url}`;
    const slug = url.replace('/en/', '').replace('/', '');
    
    const index = calculatorLinks.indexOf(url) + 1;
    process.stdout.write(`[${index}/${calculatorLinks.length}] ${slug.padEnd(40)}`);
    
    errors.length = 0;
    warnings.length = 0;
    
    // Listen for console errors
    const errorListener = msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    };
    
    const pageErrorListener = error => {
      errors.push(error.message);
    };
    
    page.on('console', errorListener);
    page.on('pageerror', pageErrorListener);
    
    try {
      await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(2000); // Wait for interactive calculator
      
      if (errors.length > 0) {
        results.push({ url: slug, fullUrl, status: 'error', errors: [...errors] });
        console.log(` ❌`);
        errorCount++;
      } else {
        results.push({ url: slug, fullUrl, status: 'ok' });
        console.log(` ✅`);
        okCount++;
      }
    } catch (error) {
      results.push({ url: slug, fullUrl, status: 'failed', error: error.message });
      console.log(` ❌ Failed`);
      errorCount++;
    }
    
    page.off('console', errorListener);
    page.off('pageerror', pageErrorListener);
  }
  
  await browser.close();
  
  console.log('\n' + '='.repeat(70));
  console.log('\n📊 FINAL SUMMARY\n');
  
  console.log(`✅ OK: ${okCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📝 Total: ${calculatorLinks.length}`);
  console.log(`📈 Success Rate: ${((okCount / calculatorLinks.length) * 100).toFixed(1)}%`);
  
  if (errorCount > 0) {
    console.log('\n' + '='.repeat(70));
    console.log('\n❌ CALCULATORS WITH ERRORS:\n');
    
    const errorResults = results.filter(r => r.status === 'error' || r.status === 'failed');
    
    errorResults.forEach((r, i) => {
      console.log(`\n${i + 1}. ${r.url}`);
      console.log(`   URL: ${r.fullUrl}`);
      
      if (r.errors && r.errors.length > 0) {
        console.log(`   Errors:`);
        r.errors.slice(0, 2).forEach((err, ei) => {
          const shortErr = err.length > 80 ? err.substring(0, 80) + '...' : err;
          console.log(`      ${ei + 1}. ${shortErr}`);
        });
        if (r.errors.length > 2) {
          console.log(`      ... and ${r.errors.length - 2} more errors`);
        }
      } else if (r.error) {
        console.log(`   Error: ${r.error}`);
      }
    });
  }
  
  console.log('\n' + '='.repeat(70) + '\n');
  
  // Save full report
  fs.writeFileSync('all-calculators-report.json', JSON.stringify(results, null, 2));
  console.log('📄 Full report: all-calculators-report.json\n');
  
  process.exit(errorCount > 0 ? 1 : 0);
})();
