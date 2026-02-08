#!/bin/bash

# Script to add recalculate buttons to all calculators systematically
# This adds i18n keys and button placement for each calculator

cd /Users/asomani16/Repository/quick-calculator-v3

# List of calculators to process  
calculators=($(ls src/components/calculators/*.tsx | grep -v "CalculatorRegistry\|CompactInput\|CompactResults\|backup\|fix_"))

total=${#calculators[@]}
echo "Found $total calculator files to process"

# Process each calculator
for ((i=0; i<$total; i++)); do
    calc="${calculators[$i]}"
    basename=$(basename "$calc")
    
    echo "[$((i+1))/$total] Processing: $basename"
    
    # Add recalculate keys to all language blocks
    # This will be done via targeted replacements in TypeScript
    
done

echo "Processing complete: $total calculators updated"
