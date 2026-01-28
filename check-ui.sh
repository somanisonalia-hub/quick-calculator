#!/bin/bash

echo "✅ UI Load Test - Checking if pages load correctly"
echo "=================================================="
echo ""

# Test URLs
urls=(
  "http://localhost:3000/ (Homepage)"
  "http://localhost:3000/en/bmi-calculator/ (BMI - English)"
  "http://localhost:3000/es/mortgage-calculator/ (Mortgage - Spanish)"
  "http://localhost:3000/pt/retirement-calculator/ (Retirement - Portuguese)"
  "http://localhost:3000/fr/salary-calculator/ (Salary - French)"
)

passed=0
failed=0

for url_desc in "${urls[@]}"; do
  # Split URL and description
  url=$(echo "$url_desc" | sed 's/ (.*)//')
  desc=$(echo "$url_desc" | sed 's/.*(\(.*\))/\1/')
  
  # Get HTTP status
  http_code=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  
  if [ "$http_code" = "200" ]; then
    echo "✓ $desc - HTTP 200 ✓"
    passed=$((passed + 1))
  else
    echo "✗ $desc - HTTP $http_code ✗"
    failed=$((failed + 1))
  fi
done

echo ""
echo "=================================================="
echo "Results: $passed passed, $failed failed"
echo ""

if [ $failed -eq 0 ]; then
  echo "🎉 All pages loading successfully!"
  echo ""
  echo "📝 UI is working correctly!"
  echo "Open in browser: http://localhost:3000"
else
  echo "⚠️  Some pages failed to load"
  exit 1
fi
