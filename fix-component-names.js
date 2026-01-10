#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Component name mappings based on the CalculatorRegistry
const componentNameMap = {
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
  'life-insurance-calculator': 'LifeInsuranceCalculator',
  'expense-calculator': 'ExpenseCalculator',
  'car-insurance-calculator': 'CarInsuranceCalculator',
  'health-insurance-calculator': 'HealthInsuranceCalculator',
  'crypto-roi-calculator': 'CryptoROICalculator',
  'debt-consolidation-calculator': 'DebtConsolidationCalculator',
  'interest-only-mortgage-calculator': 'InterestOnlyMortgageCalculator',
  'car-loan-calculator': 'CarLoanCalculator',
  'compound-interest-calculator': 'CompoundInterestCalculator',
  'concrete-calculator': 'ConcreteCalculator',
  'emi-calculator': 'EMICalculator',
  'feet-inches-calculator': 'FeetInchesCalculator',
  'fraction-calculator': 'FractionCalculator',
  'inflation-calculator': 'InflationCalculator',
  'mean-median-mode-calculator': 'MeanMedianModeCalculator',
  'paycheck-calculator': 'PaycheckCalculator',
  'percent-calculator': 'PercentCalculator',
  'percentage-change-calculator': 'PercentageChangeCalculator',
  'ratio-calculator': 'RatioCalculator',
  'sales-tax-calculator': 'SalesTaxCalculator',
  'simple-interest-calculator': 'SimpleInterestCalculator',
  'square-footage-calculator': 'SquareFootageCalculator',
  'standard-deviation-calculator': 'StandardDeviationCalculator',
  'tank-volume-calculator': 'TankVolumeCalculator'
};

const calculatorsDir = path.join(__dirname, 'content', 'calculators');
const languages = ['en', 'es', 'pt', 'fr'];

function fixCalculatorFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let json = JSON.parse(content);
  let modified = false;

  const filename = path.basename(filePath, '.json');
  const componentName = componentNameMap[filename];

  if (!componentName) {
    console.log(`⚠️  No component mapping found for ${filename}`);
    return;
  }

  languages.forEach(lang => {
    if (json[lang] && json[lang].calculatorComponent && !json[lang].calculatorComponent.componentName) {
      json[lang].calculatorComponent.componentName = componentName;
      modified = true;
      console.log(`✅ Added componentName "${componentName}" to ${lang} section of ${filename}`);
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
    console.log(`💾 Updated ${filePath}`);
  }
}

function main() {
  const files = fs.readdirSync(calculatorsDir)
    .filter(file => file.endsWith('.json'))
    .map(file => path.join(calculatorsDir, file));

  console.log(`🔧 Fixing componentName fields in ${files.length} calculator files...\n`);

  files.forEach(fixCalculatorFile);

  console.log('\n🎉 Component name fixing completed!');
}

main();

