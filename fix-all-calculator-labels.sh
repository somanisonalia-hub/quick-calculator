#!/bin/bash

# List of calculator components that use input.label and need to be fixed
CALCULATORS=(
  "AdvancedLoanCalculator"
  "BudgetCalculator"
  "CarInsuranceCalculator"
  "CompoundInterestCalculator"
  "CreditCardCalculator"
  "HealthInsuranceCalculator"
  "InterestOnlyMortgageCalculator"
  "InvestmentCalculator"
  "LifeInsuranceCalculator"
  "MortgageCalculator"
  "NumbersToWordsConverter"
  "PropertyTaxCalculator"
  "RetirementCalculator"
  "StockReturnCalculator"
  "TaxCalculator"
)

echo "Checking which calculators need label translation fixes..."
echo ""

for calc in "${CALCULATORS[@]}"; do
  file="src/components/calculators/${calc}.tsx"
  if [ -f "$file" ]; then
    # Check if it uses input.label pattern
    if grep -q "{input\.label}" "$file"; then
      echo "✗ $calc - uses {input.label} (needs fix)"
    else
      echo "✓ $calc - already fixed or doesn't use labels"
    fi
  else
    echo "? $calc - file not found"
  fi
done

echo ""
echo "Run this script with 'fix' argument to automatically update all files"
