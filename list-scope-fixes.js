const fs = require('fs');
const path = require('path');

const calculatorsToFix = [
  'AdvancedLoanCalculator.tsx',
  'CarInsuranceCalculator.tsx',
  'CarLoanCalculator.tsx',
  'CompoundInterestCalculator.tsx',
  'CreditCardCalculator.tsx',
  'HealthInsuranceCalculator.tsx',
  'InterestOnlyMortgageCalculator.tsx',
  'InvestmentCalculator.tsx',
  'MutualFundXirrCalculator.tsx',
  'PropertyTaxCalculator.tsx',
  'RetirementCalculator.tsx',
  'StockReturnCalculator.tsx',
  'BmrCalculator.tsx',
  'BodyFatCalculator.tsx',
  'IdealWeightCalculator.tsx',
  'LeanBodyMassCalculator.tsx',
  'MaintenanceCaloriesCalculator.tsx',
  'ProteinIntakeCalculator.tsx',
  'TdeeCalculator.tsx',
  'WaistToHipRatioCalculator.tsx',
  'WaterIntakeCalculator.tsx',
  'FractionCalculator.tsx',
  'MeanMedianModeCalculator.tsx'
];

console.log(`\n🔧 Batch Function Scope Fix - 23 Calculators\n`);
console.log('='.repeat(70) + '\n');

const calculatorsDir = path.join(__dirname, 'src/components/calculators');
let fixedCount = 0;

calculatorsToFix.forEach((fileName, index) => {
  const filePath = path.join(calculatorsDir, fileName);
  
  process.stdout.write(`[${index + 1}/${calculatorsToFix.length}] ${fileName.padEnd(45)}`);
  
  if (!fs.existsSync(filePath)) {
    console.log('❌ Not found');
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix Pattern 1: Move calculate function outside useEffect
  // Look for: useEffect(() => { const calculateX = () => { ... }; ... calculateX(); }, [deps]);
  // Transform to: const calculateX = () => { ... }; useEffect(() => { calculateX(); }, [deps]);
  
  const useEffectPattern = /(\s*)(\/\/.*\n\s*)?useEffect\(\(\)\s*=>\s*{\s*\n\s*const\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*{/;
  const match = content.match(useEffectPattern);
  
  if (match) {
    const funcName = match[3];
    
    // Extract the function from inside useEffect (complex regex)
    // For manual safety, just report
    console.log(`⚠️  Found ${funcName}, manual fix needed`);
    return;
  }
  
  console.log('⏭️  Pattern not matched');
});

console.log(`\n${'='.repeat(70)}\n`);
console.log(`These 23 calculators need the same fix we applied to:\n`);
console.log(`- MortgageCalculator.tsx`);
console.log(`- BMICalculator.tsx`);
console.log(`- TaxCalculator.tsx\n`);
console.log(`The fix: Move function definitions OUTSIDE useEffect, keep only function call inside.\n`);
