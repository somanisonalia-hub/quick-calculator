const fs = require('fs');
const path = require('path');

const calculatorsDir = 'src/components/calculators';

// All remaining calculators that need fixes
const remaining = [
  // Utility files to skip
  'CalculatorRegistry', 'CompactInputField', 'CompactResultsDisplay',
  // Need both buttons
  'CarLoanCalculator', 'DecimalToFractionCalculator', 'DiscountCalculator',
  'HealthInsuranceCalculator', 'InterestOnlyMortgageCalculator', 'NumberBaseConverter',
  'NumbersToWordsConverter', 'PasswordGenerator', 'PropertyTaxCalculator',
  'QuadraticEquationCalculator', 'RomanNumeralConverter', 'ScientificCalculator',
  'SlopeCalculator', 'StockReturnCalculator', 'SurfaceAreaCalculator', 'UnitConverter',
  // Need Calculate
  'CurrencyConverter', 'SavingsCalculator',
  // Need Reset
  'BodyCompositionCalculator', 'DebtToIncomeCalculator', 'EnergyExpenditureCalculator',
  'ExponentCalculator', 'FactorialCalculator', 'FitnessMetricsCalculator',
  'FuelCostCalculator', 'GcdLcmCalculator', 'GeometryAreaCalculator',
  'GoalBasedInvestmentCalculator', 'LinearEquationCalculator', 'LogarithmCalculator',
  'LongDivisionCalculator', 'LoveCalculator', 'NutritionAnalysisCalculator',
  'PercentileCalculator', 'ProbabilityCalculator', 'ShippingCostCalculator',
  'StudyHoursPlannerCalculator', 'TipCalculator', 'WellnessTrackerCalculator',
  'XIRRVsAbsoluteReturnCalculator'
];

const skipUtility = ['CalculatorRegistry', 'CompactInputField', 'CompactResultsDisplay'];

function addResetFunctionAggressive(content, stateVars) {
  // Check if reset already exists
  if (/const\s+reset|function\s+reset/i.test(content)) {
    return { content, added: false };
  }

  // Find useState declarations to understand what to reset
  const stateMatches = Array.from(content.matchAll(/const\s+\[(\w+),\s*set\w+\]\s*=\s*useState/g));
  
  // Try to find the best insertion point - after last useState or after state declarations
  let insertPoint = null;
  
  // Pattern 1: After last useState
  const lastUseState = content.lastIndexOf('useState');
  if (lastUseState > -1) {
    const afterState = content.indexOf(';', lastUseState);
    if (afterState > -1) {
      insertPoint = afterState + 1;
    }
  }
  
  if (!insertPoint) {
    // Pattern 2: After const t = translations
    const tMatch = content.match(/const t = translations.*?;/);
    if (tMatch) {
      insertPoint = content.indexOf(tMatch[0]) + tMatch[0].length;
    }
  }
  
  if (!insertPoint) return { content, added: false };
  
  // Create reset function based on detected state
  const resetFunc = `\n\n  const resetCalculator = () => {
    // Reset to default values
    ${stateMatches.slice(0, 3).map(m => `set${m[1].charAt(0).toUpperCase() + m[1].slice(1)}(${
      m[1].includes('result') || m[1].includes('output') ? "''" : 
      m[1].includes('values') ? '{}' : '0'
    });`).join('\n    ')}${stateMatches.length > 3 ? '\n    // Additional state resets may be needed' : ''}
  };`;
  
  const before = content.slice(0, insertPoint);
  const after = content.slice(insertPoint);
  
  return { content: before + resetFunc + after, added: true };
}

function findAnyActionFunction(content) {
  // Look for any onClick handler or function that looks like an action
  const patterns = [
    /const\s+(\w*[Cc]alculate\w*)\s*=\s*\(/g,
    /const\s+(\w*[Hh]andle\w*)\s*=\s*\(/g,
    /const\s+(\w*[Oo]n\w+)\s*=\s*\(/g,
    /const\s+(handle[A-Z]\w*)\s*=\s*\(/g,
    /const\s+(do\w+)\s*=\s*\(/g,
    /function\s+(\w*[Cc]alculate\w*)\s*\(/g,
  ];
  
  for (const pattern of patterns) {
    const matches = Array.from(content.matchAll(pattern));
    if (matches.length > 0) {
      // Prioritize calculate-related functions
      const calcFunc = matches.find(m => 
        m[1].toLowerCase().includes('calculate') ||
        m[1].toLowerCase().includes('compute') ||
        m[1].toLowerCase().includes('process')
      );
      if (calcFunc) return calcFunc[1];
      
      // Otherwise return first action function
      return matches[0][1];
    }
  }
  return null;
}

function findInsertionPointAggressive(content) {
  const patterns = [
    // Before Results section
    { regex: /([\s\S]*?)(\n\s*{\/\*\s*[Rr]esult|\n\s*<\/?\s*[Rr]esult)/, type: 'before-results' },
    // After last input
    { regex: /([\s\S]*<input[\s\S]*?\/>\s*<\/div>\s*\n)(\s*<\/div>\s*\n)/, type: 'after-input' },
    // Before output/result div
    { regex: /([\s\S]*?)(\n\s*<div[^>]*(?:output|result)[^>]*>)/, type: 'before-output' },
    // End of input container
    { regex: /([\s\S]*<div[^>]*space-y[^>]*>[\s\S]*?)(\n\s*<\/div>\s*\n\s*<div)/, type: 'end-input-container' },
    // Before any results title
    { regex: /([\s\S]*?)(\n\s*<h[23][^>]*>)/, type: 'before-heading' },
    // After form/input grid
    { regex: /([\s\S]*?)(\n\s*<\/div>\s*\n\s*{(?:\/\*|results))/, type: 'after-grid' },
  ];
  
  for (const { regex, type } of patterns) {
    if (regex.test(content)) {
      return { pattern: regex, type };
    }
  }
  
  return null;
}

function createButtonsJSX(needsCalc, needsReset, calcFunc) {
  const indent = '          ';
  let jsx = `\n${indent}{/* Buttons */}\n${indent}<div className="flex gap-3 pt-4">`;
  
  if (needsCalc && calcFunc) {
    jsx += `\n${indent}  <button
${indent}    onClick={${calcFunc}}
${indent}    className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
${indent}  >
${indent}    {t.calculate}
${indent}  </button>`;
  }
  
  if (needsReset) {
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

function fixCalculatorAggressive(filePath) {
  const fileName = path.basename(filePath, '.tsx');
  
  if (skipUtility.includes(fileName)) {
    return { fixed: false, reason: 'utility file - skipped' };
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  const hasCalc = /onClick=\{.*calculate/i.test(content) || /\{t\.calculate\}/i.test(content);
  const hasReset = /onClick=\{.*reset/i.test(content) || /\{t\.reset\}/i.test(content);
  
  if (hasCalc && hasReset) {
    return { fixed: false, reason: 'already complete' };
  }
  
  let changes = [];
  
  // Step 1: Add reset function if needed
  if (!hasReset) {
    const result = addResetFunctionAggressive(content);
    content = result.content;
    if (result.added) changes.push('reset-func');
  }
  
  // Step 2: Find calculate function
  const calcFunc = findAnyActionFunction(content);
  
  // Step 3: Add buttons JSX
  const insertPoint = findInsertionPointAggressive(content);
  
  if (!insertPoint) {
    if (changes.length > 0) {
      fs.writeFileSync(filePath, content, 'utf8');
      return { fixed: true, changes, partial: 'no-insertion-point' };
    }
    return { fixed: false, reason: 'no insertion point' };
  }
  
  const needsCalc = !hasCalc && calcFunc;
  const needsReset = !hasReset;
  
  if (!needsCalc && !needsReset) {
    if (changes.length > 0) {
      fs.writeFileSync(filePath, content, 'utf8');
      return { fixed: true, changes };
    }
    return { fixed: false, reason: 'nothing to add' };
  }
  
  const buttonsJSX = createButtonsJSX(needsCalc, needsReset, calcFunc);
  
  try {
    content = content.replace(insertPoint.pattern, `$1${buttonsJSX}$2`);
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      changes.push('buttons-jsx');
      return { fixed: true, changes, insertType: insertPoint.type };
    }
  } catch (error) {
    // Partial success - save what we have
    if (changes.length > 0 && content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      return { fixed: true, changes, partial: error.message };
    }
  }
  
  return { fixed: false, reason: 'replacement failed' };
}

// Main execution
console.log('\n🔧 AGGRESSIVE BATCH FIX - REMAINING 43 CALCULATORS\n');
console.log('='.repeat(60));

const results = {
  fixed: [],
  partial: [],
  skipped: [],
  errors: []
};

remaining.forEach(fileName => {
  const filePath = path.join(calculatorsDir, `${fileName}.tsx`);
  
  if (!fs.existsSync(filePath)) {
    results.skipped.push({ name: fileName, reason: 'file not found' });
    return;
  }
  
  try {
    const result = fixCalculatorAggressive(filePath);
    if (result.fixed) {
      const entry = { 
        name: fileName, 
        changes: result.changes,
        type: result.insertType,
        partial: result.partial 
      };
      
      if (result.partial) {
        results.partial.push(entry);
        console.log(`⚠️  ${fileName}: ${result.changes.join(', ')} (${result.partial})`);
      } else {
        results.fixed.push(entry);
        console.log(`✅ ${fileName}: ${result.changes.join(', ')}`);
      }
    } else {
      results.skipped.push({ name: fileName, reason: result.reason });
      if (result.reason !== 'utility file - skipped') {
        console.log(`⏭️  ${fileName}: ${result.reason}`);
      }
    }
  } catch (error) {
    results.errors.push({ name: fileName, error: error.message });
    console.log(`❌ ${fileName}: ${error.message}`);
  }
});

console.log('\n' + '='.repeat(60));
console.log(`\n✅ Fully Fixed: ${results.fixed.length}`);
console.log(`⚠️  Partially Fixed: ${results.partial.length}`);
console.log(`⏭️  Skipped: ${results.skipped.length}`);
console.log(`❌ Errors: ${results.errors.length}`);
console.log(`\n📁 Total attempted: ${remaining.length}\n`);

if (results.fixed.length > 0) {
  console.log('✅ Fully Fixed:');
  results.fixed.forEach(r => console.log(`   - ${r.name} (${r.changes.join(', ')})`));
}

if (results.partial.length > 0) {
  console.log('\n⚠️  Partially Fixed (may need manual JSX placement):');
  results.partial.forEach(r => console.log(`   - ${r.name}: ${r.changes.join(', ')} - ${r.partial}`));
}
