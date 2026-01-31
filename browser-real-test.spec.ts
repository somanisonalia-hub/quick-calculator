import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

// All 131 calculator pages to test (English URLs)
const ALL_CALCULATORS = [
  '401k-calculator', 'advanced-loan-calculator', 'age-calculator', 'amortization-schedule-calculator',
  'apr-calculator', 'average-calculator', 'basic-apr-calculator', 'biweekly-pay-calculator',
  'blood-pressure-calculator', 'bmi-calculator', 'bmr-calculator', 'body-fat-calculator',
  'budget-calculator', 'calorie-calculator', 'car-affordability-calculator', 'car-insurance-calculator',
  'car-loan-calculator', 'circle-area-calculator', 'circle-circumference-calculator', 'compound-interest-calculator',
  'concrete-calculator', 'credit-card-calculator', 'credit-card-payoff', 'crypto-roi-calculator',
  'currency-converter', 'date-calculator', 'debt-consolidation-calculator', 'debt-payoff-calculator',
  'debt-ratios-calculator', 'debt-to-income-calculator', 'ear-calculator', 'effective-interest-rate-calculator',
  'emergency-fund', 'emi-calculator', 'equal-principal-amortization-calculator', 'equivalent-interest-rate-calculator',
  'exam-score-predictor', 'expense-calculator', 'feet-inches-calculator', 'fraction-calculator',
  'fraction-decimal', 'fuel-cost', 'future-value-calculator', 'geometry-area',
  'gpa-calculator', 'grade-calculator', 'health-insurance-calculator', 'home-affordability-calculator',
  'hourly-to-salary-calculator', 'ideal-weight-calculator', 'income-tax-calculator', 'inflation-calculator',
  'interest-calculator', 'interest-only-mortgage-calculator', 'interest-rate-table-calculator', 'investment-calculator',
  'investment-planner', 'investment-return', 'lean-body-mass-calculator', 'life-insurance-calculator',
  'linear-equation', 'liquidity-ratios-calculator', 'loan-affordability', 'loan-affordability-calculator',
  'loan-calculator', 'loan-comparison', 'loan-payment-table-generator', 'loan-repayment',
  'macro-calculator', 'maintenance-calories-calculator', 'mean-median-mode-calculator', 'mortgage-calculator',
  'net-income-calculator', 'net-worth', 'nominal-interest-rate-calculator', 'numbers-to-words-converter',
  'operations-ratios-calculator', 'overtime-pay-calculator', 'ovulation-calculator', 'password-generator',
  'paycheck-calculator', 'percent-calculator', 'percentage-calculator', 'percentage-change-calculator',
  'percentile-calculator', 'periodic-interest-rate-calculator', 'personal-budget', 'pregnancy-calculator',
  'probability-calculator', 'profitability-ratios-calculator', 'property-tax-calculator', 'protein-intake-calculator',
  'pythagorean-theorem-calculator', 'quadratic-equation-calculator', 'ratio-calculator', 'ratio-proportion',
  'retirement-calculator', 'retirement-plan', 'retirement-savings', 'roth-ira-calculator',
  'salary-calculator', 'salary-payroll', 'salary-tax', 'sales-tax-calculator',
  'savings-calculator', 'savings-goal', 'savings-interest', 'scientific-calculator',
  'shipping-cost', 'simple-interest-calculator', 'sleep-calculator', 'social-security-calculator',
  'square-footage-calculator', 'standard-deviation-calculator', 'stock-ratios-calculator', 'stock-return-calculator',
  'study-hours-planner', 'surface-area-calculator', 'take-home-pay-calculator', 'tank-volume-calculator',
  'tax-calculator', 'tdee-calculator', 'tip-calculator', 'triangle-area-calculator',
  'trip-planner', 'unit-conversion-calculator', 'unit-converter', 'volume-calculator',
  'waist-to-hip-ratio-calculator', 'water-intake-calculator', 'word-counter',
];

let passCount = 0;
let failCount = 0;
const failedPages: string[] = [];

test.describe('All 131 Calculator Pages - Browser Loading Test', () => {
  test.beforeEach(async ({ page }) => {
    page.setDefaultTimeout(20000);
  });

  ALL_CALCULATORS.forEach((slug) => {
    test(`${slug} - should load with calculator content`, async ({ page }) => {
      const url = `/en/${slug}/`;
      
      try {
        // Navigate to page
        const response = await page.goto(BASE_URL + url, { waitUntil: 'networkidle' });
        
        // Verify HTTP status
        if (!response || response.status() >= 400) {
          throw new Error(`HTTP ${response?.status() || 'unknown'}`);
        }
        
        // Check page has content
        const pageContent = await page.content();
        if (pageContent.length < 1000) {
          throw new Error('Page content too short');
        }
        
        // Look for calculator-related content
        const hasCalculator = pageContent.includes('calculator') || 
                             pageContent.includes('Calculate') ||
                             pageContent.includes('result') ||
                             pageContent.includes('input');
        if (!hasCalculator) {
          throw new Error('No calculator content found');
        }
        
        // Check for input fields
        const inputs = await page.locator('input, select, textarea, button').count();
        if (inputs === 0) {
          throw new Error('No form controls found');
        }
        
        // Check for console errors
        const errors: string[] = [];
        page.on('console', msg => {
          if (msg.type() === 'error') {
            errors.push(msg.text());
          }
        });
        await page.waitForTimeout(1000);
        
        if (errors.length > 0) {
          throw new Error(`Console errors: ${errors[0]}`);
        }
        
        passCount++;
        console.log(`✅ ${slug}`);
        
      } catch (error) {
        failCount++;
        failedPages.push(slug);
        console.log(`❌ ${slug}: ${error}`);
        throw error;
      }
    });
  });
});

test.describe('Test Summary', () => {
  test('print results', async () => {
    console.log('\n\n=============== TEST RESULTS ===============');
    console.log(`✅ Passed: ${passCount}/${ALL_CALCULATORS.length}`);
    console.log(`❌ Failed: ${failCount}/${ALL_CALCULATORS.length}`);
    if (failedPages.length > 0) {
      console.log(`\nFailed pages:`);
      failedPages.forEach(page => console.log(`  - ${page}`));
    }
    console.log('==========================================\n');
    expect(failCount).toBe(0);
  });
});
