const fs = require('fs');
const path = require('path');

const fixes = [
  {
    file: 'CarInsuranceCalculator.tsx',
    functionName: 'calculateInsurance',
    hasReset: true
  },
  {
    file: 'CarLoanCalculator.tsx',
    functionName: 'monthlyPayment', // or calculateLoan
    hasReset: true
  },
  {
    file: 'CompoundInterestCalculator.tsx',
    functionName: 'calculateCompoundInterest',
    hasReset: true
  },
  {
    file: 'CreditCardCalculator.tsx',
    functionName: 'calculatePayoff',
    hasReset: true
  },
  {
    file: 'HealthInsuranceCalculator.tsx',
    functionName: 'calculateInsurance',
    hasReset: true
  },
  {
    file: 'InterestOnlyMortgageCalculator.tsx',
    functionName: 'calculateInterestOnlyMortgage',
    hasReset: true
  },
  {
    file: 'InvestmentCalculator.tsx',
    functionName: 'calculateInvestment',
    hasReset: true
  },
  {
    file: 'PropertyTaxCalculator.tsx',
    functionName: 'calculatePropertyTax',
    hasReset: true
  },
  {
    file: 'RetirementCalculator.tsx',
    functionName: 'calculateRetirement',
    hasReset: true
  },
  {
    file: 'StockReturnCalculator.tsx',
    functionName: 'calculateReturns',
    hasReset: true
  },
  {
    file: 'BmrCalculator.tsx',
    functionName: 'calculateBMR',
    hasReset: true
  },
  {
    file: 'BodyFatCalculator.tsx',
    functionName: 'calculateBodyFat',  // might be different
    hasReset: true
  },
  {
    file: 'IdealWeightCalculator.tsx',
    functionName: 'calculateIdealWeight',  // might be different
    hasReset: true
  },
  {
    file: 'LeanBodyMassCalculator.tsx',
    functionName: 'calculateLeanBodyMass',  // might be different
    hasReset: true
  },
  {
    file: 'MaintenanceCaloriesCalculator.tsx',
    functionName: 'calculateMaintenanceCalories',  // might be different
    hasReset: true
  },
  {
    file: 'ProteinIntakeCalculator.tsx',
    functionName: 'calculateProteinIntake',  // might be different
    hasReset: true
  },
  {
    file: 'TdeeCalculator.tsx',
    functionName: 'calculateTDEE',  // might be different
    hasReset: true
  },
  {
    file: 'WaistToHipRatioCalculator.tsx',
    functionName: 'calculateWaistToHipRatio',  // might be different
    hasReset: true
  },
  {
    file: 'WaterIntakeCalculator.tsx',
    functionName: 'calculateWaterIntake',  // might be different
    hasReset: true
  },
  {
    file: 'FractionCalculator.tsx',
    functionName: 'calculateFraction',  // might be different
    hasReset: true
  },
  {
    file: 'MeanMedianModeCalculator.tsx',
    functionName: 'calculateStats',  // might be different
    hasReset: true
  },
  {
    file: 'MutualFundXirrCalculator.tsx',
    functionName: 'calculateXIRR',  // might be different
    hasReset: true
  }
];

console.log('\n📋 Analysis of 22 Calculators Needing Fix\n');
console.log('='.repeat(70) + '\n');

const calculatorsDir = path.join(__dirname, 'src/components/calculators');

fixes.forEach((fix, index) => {
  const filePath = path.join(calculatorsDir, fix.file);
  
  process.stdout.write(`[${(index + 1).toString().padStart(2, ' ')}/${fixes.length}] ${fix.file.padEnd(45)}`);
  
  if (!fs.existsSync(filePath)) {
    console.log('❌ Not found');
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check if useEffect contains function definition
  const useEffectMatch = content.match(/useEffect\(\(\)\s*=>\s*{[\s\S]*?}, \[/);
  if (!useEffectMatch) {
    console.log('⏭️  No useEffect found');
    return;
  }
  
  const useEffectContent = useEffectMatch[0];
  
  // Check if function is defined inside useEffect
  const funcDefPattern = new RegExp(`const\\s+\\w+\\s*=\\s*\\(`, 'g');
  const matches = [...useEffectContent.matchAll(funcDefPattern)];
  
  if (matches.length > 0) {
    console.log(`✅ Found ${matches.length} function(s) in useEffect`);
  } else {
    console.log('⏭️  Already fixed or different pattern');
  }
});

console.log(`\n${'='.repeat(70)}\n`);
console.log('All 22 files need the same fix as MortgageCalculator:\n');
console.log('Move calculate and reset functions OUTSIDE useEffect\n');
