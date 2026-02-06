# Calculator Component Validation Guide

## Problem Overview

Some calculators show **"Calculator component not yet implemented"** when accessed because:

1. **Missing Components**: JSON files reference components that don't exist
2. **Unregistered Components**: Components exist but aren't registered in CalculatorRegistry.tsx
3. **Missing Component Names**: JSON files don't specify which component to use

## Current Issues (From Latest Validation)

### ❌ Missing Components (14 Total)
These components are referenced in JSON but the .tsx files don't exist:

- BodyCompositionCalculator
- EnergyExpenditureCalculator  
- ExponentCalculator
- FactorialCalculator
- FitnessMetricsCalculator
- GcdLcmCalculator
- LogarithmCalculator
- LongDivisionCalculator
- NutritionAnalysisCalculator
- PercentileCalculator
- ProbabilityCalculator
- profitability_ratios_calculator (naming issue)
- stock_ratios_calculator (naming issue)
- WellnessTrackerCalculator

### ⚠️ Unregistered Components (11 Total)
These components exist but aren't in CalculatorRegistry.tsx:

- BreakEvenCalculator
- CaloriesBurnedCalculator
- DecimalToFractionCalculator
- DiscountCalculator
- DueDateCalculator
- HeightCalculator
- LoveCalculator
- PaceCalculator
- RentVsBuyCalculator
- ROICalculator
- StudentLoanCalculator

### 🟡 Missing Component Names (4 Total)
These JSON files don't specify which component to use:

- calorie-deficit-calculator.json
- electricity-cost-calculator.json
- percentile-calculator.json
- probability-calculator.json

## How Calculator System Works

1. **JSON File** (`content/calculators/*.json`): Defines calculator metadata
   ```json
   {
     "en": {
       "title": "BMI Calculator",
       "slug": "bmi-calculator",
       "calculatorComponent": {
         "componentName": "BMICalculator"  // ← Must match component file & registry
       }
     }
   }
   ```

2. **Component File** (`src/components/calculators/BMICalculator.tsx`): The React component
   ```tsx
   export default function BMICalculator({ lang }: { lang?: string }) {
     // Calculator implementation
   }
   ```

3. **Registry** (`src/components/calculators/CalculatorRegistry.tsx`): Maps names to components
   ```tsx
   const BMICalculator = dynamic(() => import('./BMICalculator'));
   
   export const calculatorComponents = {
     'BMICalculator': BMICalculator,  // ← Must be registered here
   };
   ```

## Prevention Steps

### 1. Run Validation Before Deployment

```bash
# Check all calculators
npm run validate-calculators

# Or directly
node validate-calculators.js
```

### 2. Add to Build Process (Already Done!)

The validation now runs automatically before every build:

```json
{
  "scripts": {
    "prebuild": "npm run validate-calculators"
  }
}
```

This ensures builds fail if there are missing/unregistered components.

###3. When Creating a New Calculator

**Step 1**: Create the component file
```bash
# Create file: src/components/calculators/MyCalculator.tsx
```

**Step 2**: Add to CalculatorRegistry.tsx
```tsx
// Add dynamic import at top
const MyCalculator = dynamic(() => import('./MyCalculator'), {
  loading: () => <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
});

// Add to registry object
export const calculatorComponents = {
  // ... existing components
  'MyCalculator': MyCalculator,  // ← Add this line
};
```

**Step 3**: Create JSON file with component reference
```json
{
  "en": {
    "title": "My Calculator",
    "slug": "my-calculator",
    "calculatorComponent": {
      "componentName": "MyCalculator"  // ← Must match registry key
    }
  }
}
```

**Step 4**: Validate
```bash
npm run validate-calculators
```

### 4. Fix Existing Issues

#### Option A: Create Missing Components

For calculators that need implementation:

```bash
# Example: Create BodyCompositionCalculator
touch src/components/calculators/BodyCompositionCalculator.tsx
```

Then implement the calculator following existing patterns.

#### Option B: Use Placeholder/Existing Component

If a calculator isn't ready yet, update JSON to use a placeholder:

```json
{
  "en": {
    "calculatorComponent": {
      "componentName": "ScientificCalculator"  // Use existing component temporarily
    }
  }
}
```

#### Option C: Register Existing Components

For the 11 unregistered components, add them to CalculatorRegistry.tsx:

```bash
# Example fix for ROICalculator
cd src/components/calculators
```

Then add to CalculatorRegistry.tsx:
```tsx
const ROICalculator = dynamic(() => import('./ROICalculator'), {
  loading: () => <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
});

// In calculatorComponents object:
export const calculatorComponents = {
  // ... existing
  'ROICalculator': ROICalculator,
};
```

## Naming Conventions

✅ **Good Examples:**
- Component File: `BMICalculator.tsx`
- Registry Key: `'BMICalculator'`
- JSON reference: `"BMICalculator"`

❌ **Bad Examples:**
- `bmi_calculator.tsx` (use PascalCase)
- `BMI-Calculator.tsx` (no hyphens)
- `bmiCalculator.tsx` (must start with capital)

## CI/CD Integration

Add to your CI/CD pipeline:

```yaml
# .github/workflows/ci.yml
- name: Validate Calculators
  run: npm run validate-calculators

- name: Build
  run: npm run build
```

## Quick Fix Commands

```bash
# 1. Find all missing/unregistered components
npm run validate-calculators

# 2. List all calculator JSON files
ls content/calculators/*-calculator.json | wc -l

# 3. List all component files  
ls src/components/calculators/*.tsx | wc -l

# 4. Check if component is registered
grep -r "MyCalculator" src/components/calculators/CalculatorRegistry.tsx

# 5. Find which JSON files reference a component
grep -r "MyCalculator" content/calculators/*.json
```

## Summary

**To prevent "Calculator component not yet implemented" errors:**

1. ✅ Always run `npm run validate-calculators` before committing
2. ✅ Create component file first, then register it, then create JSON
3. ✅ Follow naming conventions (PascalCase)
4. ✅ Keep JSON, component file, and registry in sync
5. ✅ Validation now runs automatically before builds

**Current Status:**
- 📊 Total Calculators: 128
- ❌ Need Fixing: 29 (14 missing + 11 unregistered + 4 no name)
- ✅ Working: 99 (77%)
