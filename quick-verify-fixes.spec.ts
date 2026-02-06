import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000/en';

// Test only the previously failing calculators
const FIXED_CALCULATORS = [
  // ReferenceError fixes
  'property-tax-calculator',
  'salary-tax',
  'stock-return-calculator',
  'tax-calculator',
  
  // SEO mapping error fixes
  'break-even-calculator',
  'calorie-deficit-calculator',
  'calories-burned-calculator',
  'discount-calculator',
  'electricity-cost-calculator',
  'rent-vs-buy-calculator',
  'roi-calculator',
  'student-loan-calculator',
  
  // Infinite re-render fixes
  'bmi-calculator',
  'bmr-calculator',
];

test.describe('Verify Fixed Calculators', () => {
  test('should verify all 14 fixed calculators have no errors', async ({ page }) => {
    const results: any[] = [];
    
    for (const slug of FIXED_CALCULATORS) {
      const errors: string[] = [];
      
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      page.on('pageerror', (error) => {
        errors.push(error.message);
      });
      
      try {
        await page.goto(`${BASE_URL}/${slug}/`, { waitUntil: 'networkidle', timeout: 30000 });
        await page.waitForTimeout(2000);
        
        results.push({
          slug,
          status: errors.length === 0 ? '✅' : '❌',
          errorCount: errors.length,
          firstError: errors[0] || null
        });
        
        console.log(`[${slug}] ${errors.length === 0 ? '✅ FIXED' : `❌ ${errors.length} error(s)`}`);
        
      } catch (err: any) {
        results.push({
          slug,
          status: '❌',
          error: err.message
        });
        console.log(`[${slug}] ❌ ERROR: ${err.message}`);
      }
    }
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 FIX VERIFICATION SUMMARY');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    const fixed = results.filter(r => r.status === '✅').length;
    const stillBroken = results.filter(r => r.status === '❌').length;
    
    console.log(`✅ Fixed: ${fixed}/${FIXED_CALCULATORS.length}`);
    console.log(`❌ Still Broken: ${stillBroken}/${FIXED_CALCULATORS.length}\n`);
    
    if (stillBroken > 0) {
      console.log('⚠️  STILL BROKEN:\n');
      results.filter(r => r.status === '❌').forEach(r => {
        console.log(`  - ${r.slug}: ${r.firstError || r.error || 'Unknown error'}`);
      });
    }
    
    // Test passes if all are fixed
    expect(stillBroken).toBe(0);
  });
});
