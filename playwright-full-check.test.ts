import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';
const LANGUAGES = ['en', 'es', 'pt', 'fr'];

// Hardcoded list of all calculators (from content/calculators)
const allCalculators = [
  'addition', 'age-calculator', 'advanced-loan-calculator', 'apr-calculator',
  'bmi-calculator', 'basic-apr-calculator', 'blood-pressure-calculator',
  'body-fat-calculator', 'budget-calculator', 'car-insurance-calculator',
  'car-loan-calculator', 'calorie-calculator', 'compound-interest-calculator',
  'credit-card-calculator', 'currency-converter', 'crypto-roi-calculator',
  'date-calculator', 'debt-consolidation-calculator', 'debt-payoff-calculator',
  'debt-ratio-calculator', 'effective-interest-rate-calculator', 'emi-calculator',
  'equal-principal-amortization-calculator', 'equivalent-interest-rate-calculator',
  'expense-calculator', 'future-value-calculator', 'gpa-calculator',
  'grade-calculator', 'health-insurance-calculator', 'hourly-to-salary-calculator',
  'income-tax-calculator', 'interest-calculator', 'interest-rate-table-calculator',
  'investment-calculator', 'lean-body-mass-calculator', 'liquidity-ratio-calculator',
  'loan-calculator', 'loan-payment-table-generator', 'macro-calculator',
  'margin-calculator', 'markup-calculator', 'mortgage-calculator',
  'net-income-calculator', 'net-profit-margin-calculator', 'nominal-interest-rate-calculator',
  'numbers-to-words-converter', 'operating-ratio-calculator', 'ovulation-calculator',
  'password-generator', 'percentage-calculator', 'periodic-interest-rate-calculator',
  'pregnancy-calculator', 'profitability-ratio-calculator', 'protein-intake-calculator',
  'property-tax-calculator', 'ratio-calculator', 'retirement-calculator',
  'return-on-investment-calculator', 'roth-ira-calculator', 'salary-calculator',
  'sales-tax-calculator', 'savings-calculator', 'simple-interest-calculator',
  'social-security-calculator', 'stock-return-calculator', 'take-home-pay-calculator',
  'tax-calculator', 'tdee-calculator', 'tip-calculator', 'unit-converter',
  'water-intake-calculator', 'waist-to-hip-ratio-calculator',
  'biweekly-pay-calculator', '401k-calculator'
];

console.log(`\n🔍 Testing ${allCalculators.length * LANGUAGES.length} pages (${allCalculators.length} calculators × ${LANGUAGES.length} languages)\n`);

test.describe('Full Site Runtime Error Check', () => {
  
  test('Homepage in all languages', async ({ page }) => {
    for (const lang of LANGUAGES) {
      const url = lang === 'en' ? `${BASE_URL}/` : `${BASE_URL}/${lang}/`;
      console.log(`📄 Testing ${url}`);
      await page.goto(url, { waitUntil: 'networkidle' });
      
      // Check for runtime errors
      const bodyText = await page.textContent('body');
      expect(bodyText).not.toContain('TypeError');
      expect(bodyText).not.toContain('ReferenceError');
      expect(bodyText).not.toContain('not yet implemented');
      expect(bodyText).not.toContain('is not defined');
    }
  });

  // Test all calculators
  test('All calculators for runtime errors', async ({ page }) => {
    const results = {
      success: 0,
      failed: 0,
      errors: [] as Array<{ url: string; error: string }>,
      total: allCalculators.length * LANGUAGES.length,
    };

    console.log(`\n📊 Checking ${results.total} calculator pages...\n`);

    for (const slug of allCalculators) {
      for (const lang of LANGUAGES) {
        const url = `${BASE_URL}/${lang}/${slug}/`;
        try {
          await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });
          const bodyText = await page.textContent('body');
          
          // Check for common errors
          const errors = [];
          if (bodyText?.includes('TypeError')) errors.push('TypeError');
          if (bodyText?.includes('ReferenceError')) errors.push('ReferenceError');
          if (bodyText?.includes('is not defined')) errors.push('is not defined');
          if (bodyText?.includes('not yet implemented')) errors.push('not yet implemented');
          if (bodyText?.includes('Cannot read properties')) errors.push('Cannot read properties');
          
          if (errors.length > 0) {
            results.failed++;
            results.errors.push({ url, error: errors.join(', ') });
            console.log(`❌ ${url} - ${errors.join(', ')}`);
          } else {
            results.success++;
            process.stdout.write('.');
          }
        } catch (e) {
          results.failed++;
          results.errors.push({ url, error: String(e).substring(0, 100) });
          console.log(`❌ ${url} - Timeout/Error`);
        }
      }
    }

    console.log(`\n\n📊 Test Results:`);
    console.log(`✅ Success: ${results.success}/${results.total} pages`);
    console.log(`❌ Failed: ${results.failed}/${results.total} pages`);
    
    if (results.errors.length > 0) {
      console.log(`\n🚨 Errors found:\n`);
      results.errors.slice(0, 20).forEach(({ url, error }) => {
        console.log(`  ${url}`);
        console.log(`  └─ ${error}\n`);
      });
      if (results.errors.length > 20) {
        console.log(`  ... and ${results.errors.length - 20} more errors\n`);
      }
    } else {
      console.log(`\n🎉 All calculator pages passed with no runtime errors!\n`);
    }

    expect(results.failed).toBe(0);
  });

  // Test category pages
  test('Category pages in all languages', async ({ page }) => {
    const categories = ['financial', 'health', 'math', 'conversion', 'utility', 'lifestyle'];
    
    console.log(`\n📂 Checking category pages...\n`);

    for (const lang of LANGUAGES) {
      for (const category of categories) {
        const url = `${BASE_URL}/${lang}/categories/${category}/`;
        await page.goto(url, { waitUntil: 'networkidle' });
        
        const bodyText = await page.textContent('body');
        expect(bodyText).not.toContain('TypeError');
        expect(bodyText).not.toContain('is not defined');
        process.stdout.write('.');
      }
    }

    console.log(`\n✅ All category pages passed!\n`);
  });
});
