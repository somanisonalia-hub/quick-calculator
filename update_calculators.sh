#!/bin/bash

# Script to update calculator components with auto-calculation UI

CALCULATORS_DIR="src/components/calculators"
UPDATED_CALCULATORS=("LoanCalculator" "SavingsCalculator" "InterestCalculator" "AverageCalculator" "FractionCalculator" "CarLoanCalculator" "EMICalculator")

echo "Finding calculators that need updating..."

# Find all calculator files that contain calculate buttons and haven't been updated
find "$CALCULATORS_DIR" -name "*.tsx" -exec grep -l "calculate\|Calculate" {} \; | while read -r file; do
    filename=$(basename "$file" .tsx)

    # Check if this calculator has already been updated
    should_update=true
    for updated in "${UPDATED_CALCULATORS[@]}"; do
        if [[ "$filename" == "$updated" ]]; then
            should_update=false
            break
        fi
    done

    if [[ "$should_update" == true ]]; then
        echo "Need to update: $filename"
    fi
done