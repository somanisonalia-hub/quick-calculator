#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:3000"
LANGUAGES=("en" "es" "pt" "fr")

# Sample calculators to test
CALCULATORS=(
  "bmi-calculator"
  "mortgage-calculator"
  "retirement-calculator"
  "loan-calculator"
  "tax-calculator"
  "salary-calculator"
)

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║        UI TITLE & LOAD TEST - Quick Verification      ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}\n"

# Test homepage
echo -e "${YELLOW}Testing Homepage:${NC}"
for lang in "${LANGUAGES[@]}"; do
  if [ "$lang" = "en" ]; then
    url="$BASE_URL/"
  else
    url="$BASE_URL/$lang/"
  fi
  
  title=$(curl -s "$url" | grep -o "<title>[^<]*</title>" | sed 's/<[^>]*>//g')
  if [ -n "$title" ]; then
    echo -e "${GREEN}✓${NC} $lang homepage: ${GREEN}$title${NC}"
  else
    echo -e "${RED}✗${NC} $lang homepage: Failed to load"
  fi
done

echo ""
echo -e "${YELLOW}Testing Sample Calculators:${NC}"

# Test sample calculators
passed=0
failed=0
total=0

for calc in "${CALCULATORS[@]}"; do
  for lang in "${LANGUAGES[@]}"; do
    url="$BASE_URL/$lang/$calc/"
    total=$((total + 1))
    
    # Fetch page and check title
    response=$(curl -s "$url" 2>&1)
    
    if echo "$response" | grep -q "<title>"; then
      title=$(echo "$response" | grep -o "<title>[^<]*</title>" | sed 's/<[^>]*>//g' | head -1)
      
      # Check for errors
      if echo "$response" | grep -qi "error\|cannot\|undefined\|typeerror"; then
        echo -e "${RED}✗${NC} $lang/$calc - ERRORS FOUND"
        failed=$((failed + 1))
      else
        echo -e "${GREEN}✓${NC} $lang/$calc"
        passed=$((passed + 1))
      fi
    else
      echo -e "${RED}✗${NC} $lang/$calc - Failed to load"
      failed=$((failed + 1))
    fi
  done
done

echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                    Test Results                        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo -e "${GREEN}✓ Passed: $passed/$total${NC}"
if [ $failed -gt 0 ]; then
  echo -e "${RED}✗ Failed: $failed/$total${NC}"
else
  echo -e "${GREEN}✗ Failed: $failed/$total${NC}"
fi

echo ""
echo -e "${YELLOW}Summary:${NC}"
if [ $failed -eq 0 ]; then
  echo -e "${GREEN}🎉 All pages loaded successfully!${NC}"
  exit 0
else
  echo -e "${RED}⚠️  Some pages had issues${NC}"
  exit 1
fi
