import fetch from 'node-fetch';

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

const BASE_URL = 'http://localhost:3000';
let passed = 0;
let failed = 0;
const failedPages = [];

async function testPage(slug, index) {
  const url = `${BASE_URL}/en/${slug}/`;
  try {
    const response = await fetch(url, { timeout: 10000 });
    if (response.status === 200) {
      const html = await response.text();
      if (html.length > 1000) {
        passed++;
        process.stdout.write('.');
        if ((index + 1) % 50 === 0) console.log(` ${index + 1}/${ALL_CALCULATORS.length}`);
        return true;
      }
    }
    failed++;
    failedPages.push(slug);
    process.stdout.write('✗');
    return false;
  } catch (error) {
    failed++;
    failedPages.push(slug);
    process.stdout.write('✗');
    return false;
  }
}

async function runTests() {
  console.log(`Testing ${ALL_CALCULATORS.length} calculator pages...\n`);
  
  // Test with controlled concurrency (5 at a time)
  for (let i = 0; i < ALL_CALCULATORS.length; i += 5) {
    const batch = ALL_CALCULATORS.slice(i, i + 5);
    await Promise.all(batch.map((slug, idx) => testPage(slug, i + idx)));
  }
  
  console.log(`\n\n=============== RESULTS ===============`);
  console.log(`✅ Passed: ${passed}/${ALL_CALCULATORS.length}`);
  console.log(`❌ Failed: ${failed}/${ALL_CALCULATORS.length}`);
  
  if (failedPages.length > 0) {
    console.log(`\nFailed pages:`);
    failedPages.forEach(page => console.log(`  - ${page}`));
  } else {
    console.log(`\n🎉 ALL PAGES LOADED SUCCESSFULLY!`);
  }
  
  console.log(`========================================\n`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
