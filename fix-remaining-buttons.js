const fs = require('fs');
const path = require('path');

const calculatorsDir = 'src/components/calculators';

// Calculators that still need fixes based on audit
const needsFix = [
  // No buttons (28)
  'BMICalculator', 'BMRCalculator', 'BodyFatCalculator', 'CalorieCalculator', 
  'CarLoanCalculator', 'DecimalToFractionCalculator', 'DiscountCalculator', 
  'FractionCalculator', 'HealthInsuranceCalculator', 'IdealWeightCalculator',
  'InterestCalculator', 'InterestOnlyMortgageCalculator', 'NumberBaseConverter',
  'NumbersToWordsConverter', 'PasswordGenerator', 'PropertyTaxCalculator',
  'QuadraticEquationCalculator', 'RomanNumeralConverter', 'ScientificCalculator',
  'SlopeCalculator', 'StockReturnCalculator', 'SurfaceAreaCalculator',
  'UnitConverter', 'VolumeCalculator', 'WordCounter',
  // Missing Calculate (7)
  'CaloriesBurnedCalculator', 'CurrencyConverter', 'LoanPaymentTableGenerator',
  'ROICalculator', 'RentVsBuyCalculator', 'SavingsCalculator', 'StudentLoanCalculator',
  // Missing Reset (43)
  'BodyCompositionCalculator', 'Calculator401k', 'CreditCardPayoffCalculator',
  'DateCalculator', 'DebtToIncomeCalculator', 'DueDateCalculator',
  'EmergencyFundCalculator', 'EnergyExpenditureCalculator', 'ExamScorePredictorCalculator',
  'ExponentCalculator', 'FactorialCalculator', 'FeetInchesCalculator',
  'FitnessMetricsCalculator', 'FuelCostCalculator', 'GcdLcmCalculator',
  'GeometryAreaCalculator', 'GoalBasedInvestmentCalculator', 'HeightCalculator',
  'LinearEquationCalculator', 'LogarithmCalculator', 'LongDivisionCalculator',
  'LoveCalculator', 'LumpsumInvestmentCalculator', 'MeanMedianModeCalculator',
  'MidpointCalculator', 'MutualFundInflationCalculator', 'NetWorthCalculator',
  'NutritionAnalysisCalculator', 'PaceCalculator', 'PercentileCalculator',
  'PrimeFactorizationCalculator', 'ProbabilityCalculator', 'RetirementSavingsCalculator',
  'RothIRACalculator', 'SIPCalculator', 'SavingsGoalCalculator',
  'ShippingCostCalculator', 'SleepCalculator', 'SocialSecurityCalculator',
  'StudyHoursPlannerCalculator', 'TipCalculator', 'WellnessTrackerCalculator',
  'XIRRVsAbsoluteReturnCalculator'
];

function findCalculateFunction(content) {
  const patterns = [
    /const\s+(\w*[Cc]alculate\w*)\s*=\s*\(/g,
    /function\s+(\w*[Cc]alculate\w*)\s*\(/g,
    /const\s+(handle[A-Z]\w*)\s*=\s*\(/g
  ];
  
  for (const pattern of patterns) {
    const matches = Array.from(content.matchAll(pattern));
    if (matches.length > 0) {
      // Find the most likely main calculate function
      const calcFuncs = matches.map(m => m[1]);
      const mainCalc = calcFuncs.find(f => 
        f.toLowerCase().includes('calculate') && 
        !f.toLowerCase().includes('reset')
      );
      if (mainCalc) return mainCalc;
      return calcFuncs[0];
    }
  }
  return null;
}

function hasResetButton(content) {
  return /onClick=\{.*reset/i.test(content) || /\{t\.reset\}/i.test(content);
}

function hasCalculateButton(content) {
  return /onClick=\{.*calculate/i.test(content) || /\{t\.calculate\}/i.test(content);
}

function findButtonInsertionPoint(content) {
  // Try multiple patterns to find where to insert buttons
  
  // Pattern 1: Find last input closing div before results
  const pattern1 = /([\s\S]*<input[\s\S]*?\/>\s*<\/div>\s*\n)(\s*<\/div>\s*\n\s*<\/div>)/;
  if (pattern1.test(content)) {
    return { pattern: pattern1, type: 'after-input' };
  }
  
  // Pattern 2: Before results section comment
  const pattern2 = /([\s\S]*?)(\n\s*{\/\*\s*[Rr]esults?\s*\*\/})/;
  if (pattern2.test(content)) {
    return { pattern: pattern2, type: 'before-results-comment' };
  }
  
  // Pattern 3: Before Results title
  const pattern3 = /([\s\S]*?)(\n\s*<h[23][^>]*>[^<]*[Rr]esults?[^<]*<\/h[23]>)/;
  if (pattern3.test(content)) {
    return { pattern: pattern3, type: 'before-results-title' };
  }
  
  // Pattern 4: Before results div
  const pattern4 = /([\s\S]*?)(\n\s*<div[^>]*space-y[^>]*>\s*\n\s*<div[^>]*bg-)/;
  if (pattern4.test(content)) {
    return { pattern: pattern4, type: 'before-results-div' };
  }
  
  // Pattern 5: End of inputs grid
  const pattern5 = /([\s\S]*<div[^>]*grid[^>]*>[\s\S]*?<\/div>\s*\n)(\s*<\/div>\s*\n)/;
  if (pattern5.test(content)) {
    return { pattern: pattern5, type: 'end-of-grid' };
  }
  
  return null;
}

function createButtonsJSX(hasCalc, hasReset, calcFunc) {
  const indent = '          ';
  let jsx = `\n${indent}{/* Buttons */}\n${indent}<div className="flex gap-3 pt-3">`;
  
  if (!hasCalc && calcFunc) {
    jsx += `\n${indent}  <button
${indent}    onClick={${calcFunc}}
${indent}    className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
${indent}  >
${indent}    {t.calculate}
${indent}  </button>`;
  }
  
  if (!hasReset) {
    jsx += `\n${indent}  <button
${indent}    onClick={resetCalculator}
${indent}    className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
${indent}  >
${indent}    {t.reset}
${indent}  </button>`;
  }
  
  jsx += `\n${indent}</div>\n`;
  return jsx;
}

function fixCalculator(filePath) {
  const fileName = path.basename(filePath, '.tsx');
  
  if (!needsFix.includes(fileName)) {
    return { fixed: false, reason: 'not in needs-fix list' };
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  const hasCalc = hasCalculateButton(content);
  const hasReset = hasResetButton(content);
  
  if (hasCalc && hasReset) {
    return { fixed: false, reason: 'already has both buttons' };
  }
  
  const calcFunc = findCalculateFunction(content);
  if (!hasCalc && !calcFunc) {
    return { fixed: false, reason: 'no calculate function found' };
  }
  
  // Check if reset function exists
  if (!hasReset && !/const\s+reset|function\s+reset/i.test(content)) {
    return { fixed: false, reason: 'no reset function found - run main script first' };
  }
  
  const insertPoint = findButtonInsertionPoint(content);
  if (!insertPoint) {
    return { fixed: false, reason: 'no insertion point found' };
  }
  
  const buttonsJSX = createButtonsJSX(hasCalc, hasReset, calcFunc);
  
  try {
    const newContent = content.replace(insertPoint.pattern, `$1${buttonsJSX}$2`);
    
    if (newContent === content) {
      return { fixed: false, reason: 'replacement failed' };
    }
    
    fs.writeFileSync(filePath, newContent, 'utf8');
    return { fixed: true, insertType: insertPoint.type };
  } catch (error) {
    return { fixed: false, reason: error.message };
  }
}

// Main execution
console.log('\n🔧 FIXING REMAINING CALCULATOR BUTTONS\n');
console.log('='.repeat(60));

const results = {
  fixed: [],
  skipped: [],
  errors: []
};

needsFix.forEach(fileName => {
  const filePath = path.join(calculatorsDir, `${fileName}.tsx`);
  
  if (!fs.existsSync(filePath)) {
    results.skipped.push({ name: fileName, reason: 'file not found' });
    return;
  }
  
  try {
    const result = fixCalculator(filePath);
    if (result.fixed) {
      results.fixed.push({ name: fileName, type: result.insertType });
      console.log(`✅ ${fileName}: ${result.insertType}`);
    } else {
      results.skipped.push({ name: fileName, reason: result.reason });
      if (result.reason !== 'not in needs-fix list' && result.reason !== 'already has both buttons') {
        console.log(`⏭️  ${fileName}: ${result.reason}`);
      }
    }
  } catch (error) {
    results.errors.push({ name: fileName, error: error.message });
    console.log(`❌ ${fileName}: ${error.message}`);
  }
});

console.log('\n' + '='.repeat(60));
console.log(`\n✅ Fixed: ${results.fixed.length}`);
console.log(`⏭️  Skipped: ${results.skipped.length}`);
console.log(`❌ Errors: ${results.errors.length}`);
console.log(`\n📁 Total attempted: ${needsFix.length}\n`);

if (results.fixed.length > 0) {
  console.log('✅ Fixed calculators:');
  results.fixed.forEach(r => console.log(`   - ${r.name} (${r.type})`));
}

if (results.skipped.length > 0) {
  console.log('\n⏭️  Skipped (may need manual fix):');
  const important = results.skipped.filter(s => 
    s.reason !== 'not in needs-fix list' && 
    s.reason !== 'already has both buttons'
  );
  important.forEach(r => console.log(`   - ${r.name}: ${r.reason}`));
}
