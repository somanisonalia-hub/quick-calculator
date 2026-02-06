const fs = require('fs');
const path = require('path');

// Map of calculator JSON files to their component names
const componentMap = {
  'calorie-deficit-calculator': 'CalorieDeficitCalculator',
  'decimal-to-fraction-calculator': 'DecimalToFractionCalculator',
  'due-date-calculator': 'DueDateCalculator',
  'electricity-cost-calculator': 'ElectricityCostCalculator',
  'exponent-calculator': 'ExponentCalculator',
  'factorial-calculator': 'FactorialCalculator',
  'fraction-decimal': 'FractionCalculator',
  'gcd-lcm-calculator': 'GcdLcmCalculator',
  'goal-based-investment-calculator': 'GoalBasedInvestmentCalculator',
  'height-calculator': 'HeightCalculator',
  'investment-planner': 'InvestmentCalculator',
  'investment-return': 'InvestmentCalculator',
  'loan-affordability': 'LoanAffordabilityCalculator',
  'loan-repayment': 'LoanCalculator',
  'logarithm-calculator': 'LogarithmCalculator',
  'long-division-calculator': 'LongDivisionCalculator',
  'love-calculator': 'LoveCalculator',
  'lumpsum-investment-calculator': 'LumpsumInvestmentCalculator',
  'mutual-fund-inflation-calculator': 'MutualFundInflationCalculator',
  'mutual-fund-xirr-calculator': 'MutualFundXIRRCalculator',
  'number-base-converter': 'NumberBaseConverter',
  'pace-calculator': 'PaceCalculator',
  'percentile-calculator': 'PercentileCalculator',
  'personal-budget': 'BudgetCalculator',
  'probability-calculator': 'ProbabilityCalculator',
  'ratio-proportion': 'RatioCalculator',
  'retirement-plan': 'RetirementCalculator',
  'roman-numeral-converter': 'RomanNumeralConverter',
  'salary-payroll': 'SalaryCalculator',
  'salary-tax': 'TaxCalculator',
  'savings-interest': 'SavingsCalculator',
  'sip-calculator': 'SIPCalculator',
  'xirr-vs-absolute-return-calculator': 'XIRRVsAbsoluteReturnCalculator'
};

const calculatorsDir = path.join(__dirname, 'content/calculators');

let updated = 0;
let skipped = 0;

for (const [filename, componentName] of Object.entries(componentMap)) {
  const filepath = path.join(calculatorsDir, `${filename}.json`);
  
  if (!fs.existsSync(filepath)) {
    console.log(`⚠️  File not found: ${filename}.json`);
    skipped++;
    continue;
  }

  try {
    const content = fs.readFileSync(filepath, 'utf8');
    const data = JSON.parse(content);
    
    // Check if already has component field in any language
    const hasComponent = Object.keys(data).some(lang => {
      if (typeof data[lang] === 'object' && data[lang] !== null) {
        return 'component' in data[lang];
      }
      return false;
    });
    
    if (hasComponent) {
      console.log(`✓ ${filename}.json already has component field`);
      skipped++;
      continue;
    }
    
    // Add component field to each language
    let modified = false;
    for (const lang of Object.keys(data)) {
      if (typeof data[lang] === 'object' && data[lang] !== null && !Array.isArray(data[lang])) {
        // Add component field after slug
        const newData = {};
        for (const [key, value] of Object.entries(data[lang])) {
          newData[key] = value;
          if (key === 'slug') {
            newData['component'] = componentName;
          }
        }
        data[lang] = newData;
        modified = true;
      }
    }
    
    if (modified) {
      fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
      console.log(`✅ Updated ${filename}.json with component: ${componentName}`);
      updated++;
    }
    
  } catch (error) {
    console.error(`❌ Error processing ${filename}.json:`, error.message);
    skipped++;
  }
}

console.log(`\n📊 Summary:`);
console.log(`   ✅ Updated: ${updated} files`);
console.log(`   ⏭️  Skipped: ${skipped} files`);
