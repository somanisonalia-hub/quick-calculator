const fs = require('fs');

const files = [
  'src/components/calculators/AmortizationScheduleCalculator.tsx',
  'src/components/calculators/BasicAPRCalculator.tsx',
  'src/components/calculators/CarAffordabilityCalculator.tsx',
  'src/components/calculators/CarLoanCalculator.tsx',
  'src/components/calculators/CircleAreaCalculator.tsx',
  'src/components/calculators/CircleCircumferenceCalculator.tsx',
  'src/components/calculators/ConcreteCalculator.tsx',
  'src/components/calculators/CryptoROICalculator.tsx',
  'src/components/calculators/CurrencyConverter.tsx',
  'src/components/calculators/DateCalculator.tsx',
  'src/components/calculators/DebtConsolidationCalculator.tsx',
  'src/components/calculators/DebtRatiosCalculator.tsx',
  'src/components/calculators/EARCalculator.tsx',
  'src/components/calculators/EffectiveInterestRateCalculator.tsx',
  'src/components/calculators/EqualPrincipalAmortizationCalculator.tsx',
  'src/components/calculators/EquivalentInterestRateCalculator.tsx',
  'src/components/calculators/FeetInchesCalculator.tsx',
  'src/components/calculators/FutureValueCalculator.tsx',
  'src/components/calculators/GPACalculator.tsx',
  'src/components/calculators/HomeAffordabilityCalculator.tsx',
  'src/components/calculators/InflationCalculator.tsx',
  'src/components/calculators/InterestRateTableCalculator.tsx',
  'src/components/calculators/LiquidityRatiosCalculator.tsx',
  'src/components/calculators/LoanAffordabilityCalculator.tsx',
  'src/components/calculators/LoanPaymentTableGenerator.tsx',
  'src/components/calculators/MeanMedianModeCalculator.tsx',
  'src/components/calculators/NominalInterestRateCalculator.tsx',
  'src/components/calculators/OperationsRatiosCalculator.tsx',
  'src/components/calculators/PasswordGenerator.tsx',
  'src/components/calculators/PaycheckCalculator.tsx',
  'src/components/calculators/PercentCalculator.tsx',
  'src/components/calculators/PercentageChangeCalculator.tsx',
  'src/components/calculators/PeriodicInterestRateCalculator.tsx',
  'src/components/calculators/ProfitabilityRatiosCalculator.tsx',
  'src/components/calculators/PythagoreanTheoremCalculator.tsx',
  'src/components/calculators/QuadraticEquationCalculator.tsx',
  'src/components/calculators/RatioCalculator.tsx',
  'src/components/calculators/SalaryCalculator.tsx',
  'src/components/calculators/SalesTaxCalculator.tsx',
  'src/components/calculators/SavingsCalculator.tsx',
  'src/components/calculators/ScientificCalculator.tsx',
  'src/components/calculators/SimpleInterestCalculator.tsx',
  'src/components/calculators/SquareFootageCalculator.tsx',
  'src/components/calculators/StandardDeviationCalculator.tsx',
  'src/components/calculators/StockRatiosCalculator.tsx',
  'src/components/calculators/TankVolumeCalculator.tsx',
  'src/components/calculators/TipCalculator.tsx',
  'src/components/calculators/TriangleAreaCalculator.tsx',
  'src/components/calculators/VolumeCalculator.tsx'
];

let fixed = 0;
let failed = 0;

files.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;
    
    // Fix 1: Remove extra indentation after main return div
    content = content.replace(
      /return \(\s*\n\s*<div className="space-y-3 sm:space-y-4">\s*\n\s{8}({\/\*[^*]*\*\/})/gm,
      'return (\n    <div className="space-y-3 sm:space-y-4">\n      $1'
    );
    
    // Fix 2: Remove one extra closing div before );
    content = content.replace(
      /(\s*<\/div>\s*\n)\s*<\/div>\s*\n\s*<\/div>\s*\n\s*\);\s*\n\s*\}$/m,
      '      </div>\n    </div>\n  );\n}'
    );
    
    // Fix 3: Also handle case with just 3 closing divs and function end
    content = content.replace(
      /\s*<\/div>\s*\n\s*<\/div>\s*\n\s*<\/div>\s*\n\s*\);\s*\n\s*\}\s*$/m,
      '      </div>\n    </div>\n  );\n}\n'
    );
    
    if (content !== originalContent) {
      fs.writeFileSync(file, content);
      console.log('✓ Fixed: ' + file);
      fixed++;
    } else {
      console.log('- No change: ' + file);
    }
  } catch (e) {
    console.log('✗ Error with ' + file + ': ' + e.message);
    failed++;
  }
});

console.log(`\n✅ Fixed ${fixed} files`);
if (failed > 0) {
  console.log(`❌ Failed ${failed} files`);
}
