const fs = require('fs');
const path = require('path');

// Files with the problematic resetCalculator pattern
const files = [
  'src/components/calculators/PaceCalculator.tsx',
  'src/components/calculators/SIPCalculator.tsx',
  'src/components/calculators/SquareRootCalculator.tsx',
  'src/components/calculators/PrimeFactorizationCalculator.tsx',
  'src/components/calculators/TripPlannerCalculator.tsx',
  'src/components/calculators/SleepCalculator.tsx',
  'src/components/calculators/AdvancedLoanCalculator.tsx',
  'src/components/calculators/MortgageCalculator.tsx',
  'src/components/calculators/CompoundInterestCalculator.tsx',
  'src/components/calculators/RetirementCalculator.tsx',
  'src/components/calculators/ShippingCostCalculator.tsx',
  'src/components/calculators/XIRRVsAbsoluteReturnCalculator.tsx',
  'src/components/calculators/TDEECalculator.tsx',
  'src/components/calculators/RothIRACalculator.tsx',
  'src/components/calculators/VolumeCalculator.tsx',
  'src/components/calculators/SocialSecurityCalculator.tsx',
  'src/components/calculators/InvestmentCalculator.tsx',
  'src/components/calculators/PythagoreanTheoremCalculator.tsx',
  'src/components/calculators/TipCalculator.tsx',
  'src/components/calculators/CarInsuranceCalculator.tsx',
  'src/components/calculators/WordCounter.tsx',
  'src/components/calculators/TriangleAreaCalculator.tsx',
  'src/components/calculators/PercentageCalculator.tsx',
  'src/components/calculators/CreditCardCalculator.tsx',
  'src/components/calculators/TaxCalculator.tsx',
  'src/components/calculators/PercentCalculator.tsx'
];

// Pattern to match and remove the broken resetCalculator
const brokenPattern = /  const resetCalculator = \(\) => \{\s*\/\/ Reset all input values to defaults\s*const initial: Record<string, number> = \{\};?\s*inputs\?\.forEach\(input => \{\s*initial\[input\.name\] = input\.default \|\| 0;\s*\}\);?\s*setValues\(initial\);?\s*setResults\(\{\}\);?\s*\};/g;

let fixedCount = 0;
let errorCount = 0;

files.forEach((file) => {
  const filePath = path.join(__dirname, file);
  
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${file}`);
      errorCount++;
      return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if the file has the broken pattern
    if (content.match(brokenPattern)) {
      // Remove the broken resetCalculator function
      content = content.replace(brokenPattern, '');
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${file}`);
      fixedCount++;
    } else {
      console.log(`⏭️  Skipped (no match): ${file}`);
   }
  } catch (err) {
    console.error(`❌ Error processing ${file}:`, err.message);
    errorCount++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`   Fixed: ${fixedCount}`);
console.log(`   Errors: ${errorCount}`);
console.log(`   Skipped: ${files.length - fixedCount - errorCount}`);
