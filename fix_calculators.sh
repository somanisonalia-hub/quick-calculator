#!/bin/bash

# Script to fix all calculators with undefined translation variables
# This will temporarily hardcode strings to get build working, then we can add proper translations

calculators=(
    "InterestOnlyMortgageCalculator.tsx:mortgageTerms:Mortgage Terms"
    "InvestmentCalculator.tsx:investmentDetails:Investment Details"
    "LifeInsuranceCalculator.tsx:lifeInsuranceDetails:Life Insurance Details"
    "LoanCalculator.tsx:loanDetails:Loan Details"
    "PropertyTaxCalculator.tsx:propertyDetails:Property Details"
    "RetirementCalculator.tsx:retirementPlanning:Retirement Planning"
    "SavingsCalculator.tsx:savingsDetails:Savings Details"
    "CarLoanCalculator.tsx:loanDetails:Loan Details"
    "GPACalculator.tsx:courseGrades:Course Grades"
)

for calc in "${calculators[@]}"; do
    file=$(echo $calc | cut -d: -f1)
    var=$(echo $calc | cut -d: -f2)
    text=$(echo $calc | cut -d: -f3)
    
    if [ -f "src/components/calculators/$file" ]; then
        echo "Fixing $file: {$var} -> $text"
        sed -i "s/{$var}/$text/g" "src/components/calculators/$file"
    fi
done

echo "All calculator fixes applied!"
