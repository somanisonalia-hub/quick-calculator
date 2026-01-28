const fs = require('fs');
const path = require('path');

// List of all registered components from CalculatorRegistry.tsx
const registeredComponents = [
  'AverageCalculator',
  'MortgageCalculator',
  'LoanCalculator',
  'LoanAffordabilityCalculator',
  'CarAffordabilityCalculator',
  'HomeAffordabilityCalculator',
  'AmortizationScheduleCalculator',
  'BMICalculator',
  'CreditCardCalculator',
  'SavingsCalculator',
  'TaxCalculator',
  'RetirementCalculator',
  'InvestmentCalculator',
  'BudgetCalculator',
  'CurrencyConverter',
  'GPACalculator',
  'PropertyTaxCalculator',
  'FutureValueCalculator',
  'WordCounter',
  'NumbersToWordsConverter',
  'AdvancedLoanCalculator',
  'StockReturnCalculator',
  'LifeInsuranceCalculator',
  'ExpenseCalculator',
  'CarInsuranceCalculator',
  'HealthInsuranceCalculator',
  'HourlyToSalaryCalculator',
  'SalaryCalculator',
  'OvertimePayCalculator',
  'CryptoROICalculator',
  'DebtConsolidationCalculator',
  'InterestOnlyMortgageCalculator',
  'CarLoanCalculator',
  'CompoundInterestCalculator',
  'ScientificCalculator',
  'PercentageCalculator',
  'FractionCalculator',
  'InterestCalculator',
  'AgeCalculator',
  'UnitConverter',
  'TipCalculator',
  'PasswordGenerator',
  'DateCalculator',
  'BMRCalculator',
  'BodyFatCalculator',
  'CalorieCalculator',
  'IdealWeightCalculator',
  'CircleAreaCalculator',
  'CircleCircumferenceCalculator',
  'PythagoreanTheoremCalculator',
  'VolumeCalculator',
  'SurfaceAreaCalculator',
  'QuadraticEquationCalculator',
  'ConcreteCalculator',
  'FeetInchesCalculator',
  'InflationCalculator',
  'MeanMedianModeCalculator',
  'PaycheckCalculator',
  'PercentCalculator',
  'TankVolumeCalculator',
  'SalesTaxCalculator',
  'PercentageChangeCalculator',
  'SimpleInterestCalculator',
  'SquareFootageCalculator',
  'RatioCalculator',
  'StandardDeviationCalculator',
  'LoanPaymentTableGenerator',
  'EqualPrincipalAmortizationCalculator',
  'APRCalculator',
  'EARCalculator',
  'EffectiveInterestRateCalculator',
  'InterestRateTableCalculator',
  'BasicAPRCalculator',
  'NominalInterestRateCalculator',
  'PeriodicInterestRateCalculator',
  'EquivalentInterestRateCalculator',
  'DebtRatiosCalculator',
  'LiquidityRatiosCalculator',
  'OperationsRatiosCalculator',
  'ProfitabilityRatiosCalculator',
  'StockRatiosCalculator',
  'NetIncomeCalculator',
  'TakeHomePayCalculator',
  'IncomeTaxCalculator',
  'ProteinIntakeCalculator',
  'WaterIntakeCalculator',
  'LeanBodyMassCalculator',
  'MaintenanceCaloriesCalculator',
  'TDEECalculator',
  'WaistToHipRatioCalculator',
  'EMICalculator',
  'TriangleAreaCalculator',
];

// Slug to component name mapping (what the JSON files should specify)
const slugToComponent = {
  'mortgage-calculator': 'MortgageCalculator',
  'loan-calculator': 'LoanCalculator',
  'bmi-calculator': 'BMICalculator',
  'credit-card-calculator': 'CreditCardCalculator',
  'savings-calculator': 'SavingsCalculator',
  'tax-calculator': 'TaxCalculator',
  'retirement-calculator': 'RetirementCalculator',
  'investment-calculator': 'InvestmentCalculator',
  'budget-calculator': 'BudgetCalculator',
  'currency-converter': 'CurrencyConverter',
  'gpa-calculator': 'GPACalculator',
  'property-tax-calculator': 'PropertyTaxCalculator',
  'future-value-calculator': 'FutureValueCalculator',
  'word-counter': 'WordCounter',
  'numbers-to-words-converter': 'NumbersToWordsConverter',
  'advanced-loan-calculator': 'AdvancedLoanCalculator',
  'stock-return-calculator': 'StockReturnCalculator',
  'loan-affordability-calculator': 'LoanAffordabilityCalculator',
  'car-affordability-calculator': 'CarAffordabilityCalculator',
  'home-affordability-calculator': 'HomeAffordabilityCalculator',
  'amortization-schedule-calculator': 'AmortizationScheduleCalculator',
  'life-insurance-calculator': 'LifeInsuranceCalculator',
  'expense-calculator': 'ExpenseCalculator',
  'car-insurance-calculator': 'CarInsuranceCalculator',
  'health-insurance-calculator': 'HealthInsuranceCalculator',
  'hourly-to-salary-calculator': 'HourlyToSalaryCalculator',
  'salary-calculator': 'SalaryCalculator',
  'overtime-pay-calculator': 'OvertimePayCalculator',
  'crypto-roi-calculator': 'CryptoROICalculator',
  'debt-consolidation-calculator': 'DebtConsolidationCalculator',
  'interest-only-mortgage-calculator': 'InterestOnlyMortgageCalculator',
  'car-loan-calculator': 'CarLoanCalculator',
  'compound-interest-calculator': 'CompoundInterestCalculator',
  'scientific-calculator': 'ScientificCalculator',
  'percentage-calculator': 'PercentageCalculator',
  'fraction-calculator': 'FractionCalculator',
  'interest-calculator': 'InterestCalculator',
  'age-calculator': 'AgeCalculator',
  'unit-converter': 'UnitConverter',
  'tip-calculator': 'TipCalculator',
  'password-generator': 'PasswordGenerator',
  'date-calculator': 'DateCalculator',
  'bmr-calculator': 'BMRCalculator',
  'body-fat-calculator': 'BodyFatCalculator',
  'calorie-calculator': 'CalorieCalculator',
  'ideal-weight-calculator': 'IdealWeightCalculator',
  'average-calculator': 'AverageCalculator',
  'circle-area-calculator': 'CircleAreaCalculator',
  'circle-circumference-calculator': 'CircleCircumferenceCalculator',
  'pythagorean-theorem-calculator': 'PythagoreanTheoremCalculator',
  'volume-calculator': 'VolumeCalculator',
  'surface-area-calculator': 'SurfaceAreaCalculator',
  'quadratic-equation-calculator': 'QuadraticEquationCalculator',
  'concrete-calculator': 'ConcreteCalculator',
  'feet-inches-calculator': 'FeetInchesCalculator',
  'inflation-calculator': 'InflationCalculator',
  'mean-median-mode-calculator': 'MeanMedianModeCalculator',
  'paycheck-calculator': 'PaycheckCalculator',
  'percent-calculator': 'PercentCalculator',
  'tank-volume-calculator': 'TankVolumeCalculator',
  'sales-tax-calculator': 'SalesTaxCalculator',
  'percentage-change-calculator': 'PercentageChangeCalculator',
  'simple-interest-calculator': 'SimpleInterestCalculator',
  'square-footage-calculator': 'SquareFootageCalculator',
  'ratio-calculator': 'RatioCalculator',
  'standard-deviation-calculator': 'StandardDeviationCalculator',
  'loan-payment-table-generator': 'LoanPaymentTableGenerator',
  'equal-principal-amortization-calculator': 'EqualPrincipalAmortizationCalculator',
  'apr-calculator': 'APRCalculator',
  'ear-calculator': 'EARCalculator',
  'effective-interest-rate-calculator': 'EffectiveInterestRateCalculator',
  'interest-rate-table-calculator': 'InterestRateTableCalculator',
  'basic-apr-calculator': 'BasicAPRCalculator',
  'nominal-interest-rate-calculator': 'NominalInterestRateCalculator',
  'periodic-interest-rate-calculator': 'PeriodicInterestRateCalculator',
  'equivalent-interest-rate-calculator': 'EquivalentInterestRateCalculator',
  'debt-ratios-calculator': 'DebtRatiosCalculator',
  'liquidity-ratios-calculator': 'LiquidityRatiosCalculator',
  'operations-ratios-calculator': 'OperationsRatiosCalculator',
  'profitability-ratios-calculator': 'ProfitabilityRatiosCalculator',
  'stock-ratios-calculator': 'StockRatiosCalculator',
  'net-income-calculator': 'NetIncomeCalculator',
  'take-home-pay-calculator': 'TakeHomePayCalculator',
  'income-tax-calculator': 'IncomeTaxCalculator',
  'protein-intake-calculator': 'ProteinIntakeCalculator',
  'water-intake-calculator': 'WaterIntakeCalculator',
  'lean-body-mass-calculator': 'LeanBodyMassCalculator',
  'maintenance-calories-calculator': 'MaintenanceCaloriesCalculator',
  'tdee-calculator': 'TDEECalculator',
  'waist-to-hip-ratio-calculator': 'WaistToHipRatioCalculator',
  'emi-calculator': 'EMICalculator',
  'triangle-area-calculator': 'TriangleAreaCalculator',
  'unit-conversion-calculator': 'UnitConverter',
};

const calculatorsDir = path.join(__dirname, '..', 'content', 'calculators');
const calculatorFiles = fs.readdirSync(calculatorsDir).filter(file => file.endsWith('.json'));

console.log(`\n🔍 Checking ${calculatorFiles.length} calculators for component registration...\n`);

const issues = [];
const missingComponents = [];

calculatorFiles.forEach(file => {
  const slug = file.replace('.json', '');
  const filePath = path.join(calculatorsDir, file);
  
  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Check English version for component field
    if (content.en) {
      const componentName = content.en.component;
      const expectedComponent = slugToComponent[slug];
      
      if (!componentName) {
        issues.push({
          slug,
          issue: 'Missing component field',
          severity: 'CRITICAL',
          expectedComponent
        });
      } else if (!registeredComponents.includes(componentName)) {
        issues.push({
          slug,
          issue: `Component "${componentName}" not registered in CalculatorRegistry`,
          severity: 'CRITICAL',
          componentName
        });
        missingComponents.push(componentName);
      } else {
        // Component is properly registered
        console.log(`✅ ${slug} -> ${componentName}`);
      }
    } else {
      issues.push({
        slug,
        issue: 'Missing English (en) section',
        severity: 'CRITICAL'
      });
    }
  } catch (error) {
    issues.push({
      slug,
      issue: `Error reading/parsing file: ${error.message}`,
      severity: 'ERROR'
    });
  }
});

console.log(`\n${'='.repeat(80)}\n`);

if (issues.length === 0) {
  console.log('✅ All calculators have valid components registered!\n');
  console.log(`✨ ${calculatorFiles.length} calculators checked successfully\n`);
} else {
  console.log(`❌ Found ${issues.length} calculator(s) with component issues:\n`);
  
  issues.forEach(({ slug, issue, severity, componentName, expectedComponent }) => {
    console.log(`❌ ${slug}`);
    console.log(`   Issue: ${issue}`);
    console.log(`   Severity: ${severity}`);
    if (expectedComponent) {
      console.log(`   Expected Component: ${expectedComponent}`);
    }
    if (componentName) {
      console.log(`   Current Component: ${componentName}`);
    }
    console.log('');
  });
  
  if (missingComponents.length > 0) {
    console.log('\n📋 Components that need to be created or registered:\n');
    [...new Set(missingComponents)].forEach(comp => {
      console.log(`   - ${comp}`);
    });
  }
  
  console.log('\n⚠️  Calculators with issues will show "Component not yet implemented" error on UI\n');
}

console.log(`${'='.repeat(80)}\n`);
