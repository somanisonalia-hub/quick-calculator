import { test, expect } from '@playwright/test';

const TIMEOUT_CALCULATORS = [
  'ratio-proportion',
  'scientific-calculator',
  'standard-deviation-calculator',
  'surface-area-calculator',
  'triangle-area-calculator',
  'volume-calculator',
  'body-composition-calculator',
  'calorie-deficit-calculator',
  'calories-burned-calculator',
  'concrete-calculator',
  'date-calculator',
  'decimal-to-fraction-calculator',
  'discount-calculator',
  'due-date-calculator',
  'electricity-cost-calculator',
  'energy-expenditure-calculator',
  'exponent-calculator',
  'factorial-calculator',
  'feet-inches-calculator',
  'fitness-metrics-calculator',
  'gcd-lcm-calculator',
  'height-calculator',
  'logarithm-calculator',
  'long-division-calculator',
  'love-calculator',
  'number-base-converter',
  'numbers-to-words-converter',
  'nutrition-analysis-calculator',
  'pace-calculator',
  'password-generator-calculator',
  'rent-vs-buy-calculator',
  'roi-calculator',
  'roman-numeral-converter',
  'square-footage-calculator',
  'student-loan-calculator',
  'tank-volume-calculator',
  'unit-converter',
  'wellness-tracker-calculator',
  'word-counter-calculator',
  'age-calculator',
  'budget-calculator',
  'credit-card-calculator',
  'exam-score-predictor',
  'expense-calculator',
  'gpa-calculator',
  'grade-calculator',
  'personal-budget',
  'savings-calculator',
  'study-hours-planner',
  'tip-calculator',
  'trip-planner',
];

test.describe('Recheck Timeout Calculators', () => {
  const BASE_URL = 'http://localhost:3000';
  
  test('should check previously timed out calculators', async ({ page }) => {
    console.log('\n🔍 Rechecking 51 calculators that timed out...\n');
    console.log('━'.repeat(80));
    
    const unimplementedCalculators: string[] = [];
    const workingCalculators: string[] = [];
    const erroredPages: Array<{ url: string, error: string }> = [];
    
    let count = 0;
    
    for (const slug of TIMEOUT_CALCULATORS) {
      count++;
      const url = `${BASE_URL}/en/${slug}/`;
      
      process.stdout.write(`\n[${count}/${TIMEOUT_CALCULATORS.length}] ${slug.padEnd(40)}`);
      
      try {
        const response = await page.goto(url, { 
          waitUntil: 'domcontentloaded',
          timeout: 15000 
        });
        
        // Check HTTP status
        const status = response?.status() || 0;
        if (status >= 400) {
          erroredPages.push({ url: slug, error: `HTTP ${status}` });
          console.log(` ❌ HTTP ${status}`);
          continue;
        }
        
        // Wait for body
        await page.waitForSelector('body', { timeout: 5000 });
        
        // Check for "not yet implemented" text
        const pageText = await page.textContent('body');
        
        if (pageText?.includes('Calculator component not yet implemented') ||
            pageText?.includes('not yet implemented') ||
            pageText?.includes('Component not found')) {
          unimplementedCalculators.push(slug);
          console.log(' ⚠️  NOT IMPLEMENTED');
        } else {
          workingCalculators.push(slug);
          console.log(' ✅ WORKING');
        }
        
      } catch (error: any) {
        const errorMsg = error.message?.substring(0, 60) || 'Unknown error';
        erroredPages.push({ url: slug, error: errorMsg });
        console.log(` ❌ ${errorMsg.substring(0, 30)}`);
      }
      
      // Small delay between requests
      await page.waitForTimeout(200);
    }
    
    // Print summary
    console.log('\n' + '━'.repeat(80));
    console.log('\n📊 RECHECK SUMMARY\n');
    console.log('━'.repeat(80));
    
    console.log(`\n✅ Working Calculators: ${workingCalculators.length}`);
    console.log(`⚠️  Unimplemented: ${unimplementedCalculators.length}`);
    console.log(`❌ Errors: ${erroredPages.length}`);
    console.log(`📝 Total Checked: ${TIMEOUT_CALCULATORS.length}`);
    
    if (unimplementedCalculators.length > 0) {
      console.log('\n' + '━'.repeat(80));
      console.log('\n⚠️  UNIMPLEMENTED CALCULATORS:\n');
      unimplementedCalculators.forEach((calc, idx) => {
        console.log(`   ${idx + 1}. ${calc}`);
        console.log(`      → http://localhost:3000/en/${calc}/`);
      });
    }
    
    if (erroredPages.length > 0) {
      console.log('\n' + '━'.repeat(80));
      console.log('\n❌ PAGES WITH ERRORS:\n');
      erroredPages.forEach((item, idx) => {
        console.log(`   ${idx + 1}. ${item.url}`);
        console.log(`      → http://localhost:3000/en/${item.url}/`);
        console.log(`      Error: ${item.error}`);
      });
    }
    
    if (workingCalculators.length === TIMEOUT_CALCULATORS.length) {
      console.log('\n🎉 ALL CALCULATORS ARE WORKING!\n');
    }
    
    console.log('\n' + '━'.repeat(80));
    
    // Save report
    const fs = require('fs');
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total: TIMEOUT_CALCULATORS.length,
        working: workingCalculators.length,
        unimplemented: unimplementedCalculators.length,
        errors: erroredPages.length
      },
      unimplementedCalculators,
      workingCalculators,
      erroredPages
    };
    
    fs.writeFileSync(
      'recheck-timeout-report.json',
      JSON.stringify(report, null, 2)
    );
    console.log('\n📄 Report saved to: recheck-timeout-report.json\n');
  });
});
