#!/bin/bash

# Script to verify all calculators have schema markup

TOTAL=0
WITH_SCHEMA=0
WITHOUT_SCHEMA=0

echo "🔍 Scanning calculator pages for JSON-LD schema..."
echo "================================================"

# Get all calculator directories in English
for dir in out/en/*/; do
    calc_name=$(basename "$dir")
    TOTAL=$((TOTAL + 1))
    
    html_file="$dir/index.html"
    
    if [ ! -f "$html_file" ]; then
        echo "❌ $calc_name - NO HTML FILE"
        WITHOUT_SCHEMA=$((WITHOUT_SCHEMA + 1))
        continue
    fi
    
    if grep -q 'application/ld+json' "$html_file"; then
        schema_count=$(grep -o 'application/ld+json' "$html_file" | wc -l)
        echo "✅ $calc_name - $schema_count schemas"
        WITH_SCHEMA=$((WITH_SCHEMA + 1))
    else
        echo "❌ $calc_name - NO SCHEMA"
        WITHOUT_SCHEMA=$((WITHOUT_SCHEMA + 1))
    fi
done

echo ""
echo "================================================"
echo "📊 Schema Coverage Report:"
echo "================================================"
echo "Total calculators:        $TOTAL"
echo "With schema:              $WITH_SCHEMA"
echo "Without schema:           $WITHOUT_SCHEMA"
echo "Coverage:                 $(echo "scale=1; 100*$WITH_SCHEMA/$TOTAL" | bc)%"

if [ $WITHOUT_SCHEMA -gt 0 ]; then
    echo ""
    echo "❌ ACTION NEEDED: $WITHOUT_SCHEMA calculators are missing schemas!"
    echo "These calculators likely don't have seoContent defined in their JSON files."
fi
