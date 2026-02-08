const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  console.log('\n🔍 Quick Console Error Check - All Calculators\n');
  console.log('='.repeat(70));
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const errors = [];
  const warnings = [];
  
  // Listen for console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    } else if (msg.type() === 'warning') {
      warnings.push(msg.text());
    }
  });
  
  // Listen for page errors
  page.on('pageerror', error => {
    errors.push(error.message);
  });
  
  // Test calculators
  const testUrls = [
    '/en/mortgage-calculator/',
    '/en/budget-calculator/',
    '/en/bmi-calculator/',
    '/en/loan-calculator/',
    '/en/savings-calculator/',
    '/en/tax-calculator/',
    '/en/percentage-calculator/',
    '/en/age-calculator/',
    '/en/date-calculator/',
    '/en/discount-calculator/'
  ];
  
  const results = [];
  
  for (const url of testUrls) {
    const fullUrl = `http://localhost:3000${url}`;
    const slug = url.replace('/en/', '').replace('/', '');
    
    process.stdout.write(`\n[${testUrls.indexOf(url) + 1}/${testUrls.length}] ${slug.padEnd(35)}`);
    
    errors.length = 0;
    warnings.length = 0;
    
    try {
      await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await page.waitForTimeout(2000); // Wait for interactive calculator
      
      if (errors.length > 0) {
        results.push({ url: slug, status: 'error', errors: [...errors] });
        console.log(` ❌ ${errors.length} error(s)`);
      } else if (warnings.length > 0) {
        results.push({ url: slug, status: 'warning', warnings: [...warnings] });
        console.log(` ⚠️  ${warnings.length} warning(s)`);
      } else {
        results.push({ url: slug, status: 'ok' });
        console.log(' ✅');
      }
    } catch (error) {
      results.push({ url: slug, status: 'failed', error: error.message });
      console.log(` ❌ Failed to load`);
    }
  }
  
  await browser.close();
  
  console.log('\n' + '='.repeat(70));
  console.log('\n📊 SUMMARY\n');
  
  const okCount = results.filter(r => r.status === 'ok').length;
  const errorCount = results.filter(r => r.status === 'error').length;
  const warningCount = results.filter(r => r.status === 'warning').length;
  const failedCount = results.filter(r => r.status === 'failed').length;
  
  console.log(`✅ OK: ${okCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`⚠️  Warnings: ${warningCount}`);
  console.log(`💥 Failed to Load: ${failedCount}`);
  console.log(`📝 Total: ${testUrls.length}`);
  
  if (errorCount > 0) {
    console.log('\n' + '='.repeat(70));
    console.log('\n❌ PAGES WITH ERRORS:\n');
    
    results.filter(r => r.status === 'error').forEach((r, i) => {
      console.log(`\n${i + 1}. ${r.url}`);
      console.log(`   URL: http://localhost:3000/en/${r.url}/`);
      console.log(`   Errors:`);
      r.errors.slice(0, 3).forEach((err, ei) => {
        const shortErr = err.length > 100 ? err.substring(0, 100) + '...' : err;
        console.log(`      ${ei + 1}. ${shortErr}`);
      });
      if (r.errors.length > 3) {
        console.log(`      ... and ${r.errors.length - 3} more errors`);
      }
    });
  }
  
  console.log('\n' + '='.repeat(70) + '\n');
  
  // Save full report
  fs.writeFileSync('quick-console-check-report.json', JSON.stringify(results, null, 2));
  console.log('📄 Full report: quick-console-check-report.json\n');
})();
