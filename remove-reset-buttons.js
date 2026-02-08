const fs = require('fs');
const path = require('path');

// Files that had resetCalculator removed
const files = [
  'src/components/calculators/PaceCalculator.tsx',
  'src/components/calculators/SIPCalculator.tsx',
  'src/components/calculators/SquareRootCalculator.tsx',
  'src/components/calculators/PrimeFactorizationCalculator.tsx',
  'src/components/calculators/TripPlannerCalculator.tsx',
  'src/components/calculators/SleepCalculator.tsx',
  'src/components/calculators/MortgageCalculator.tsx',
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
  'src/components/calculators/WordCounter.tsx',
  'src/components/calculators/TriangleAreaCalculator.tsx',
  'src/components/calculators/PercentageCalculator.tsx',
  'src/components/calculators/TaxCalculator.tsx',
  'src/components/calculators/PercentCalculator.tsx'
];

// Pattern to match the reset button block
const resetButtonPattern = /\s*<button\s+onClick=\{resetCalculator\}\s+className="[^"]*"\s*>\s*\{t\.reset\}\s*<\/button>/g;

// Also try to match the wrapping div if it exists
const resetButtonDivPattern = /\s*{\/\* Buttons? \*\/}\s*<div className="flex gap-3[^"]*">\s*(?:<button[^>]*onClick=\{calculate[^}]*\}[^>]*>[\s\S]*?<\/button>\s*)?<button\s+onClick=\{resetCalculator\}\s+className="[^"]*"\s*>\s*\{t\.reset\}\s*<\/button>\s*<\/div>/g;

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
    const originalContent = content;
    
    // Try to remove the button div pattern first
    content = content.replace(resetButtonDivPattern, '');
    
    // If that didn't work,try removing just the button
    if (content === originalContent) {
      content = content.replace(resetButtonPattern, '');
    }
    
    if (content !== originalContent) {
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
