# Global Components Migration Guide

## Why Global Components?

Instead of changing styles in 120+ files, update ONE global component and all calculators inherit the changes automatically.

---

## Global Components Available

### 1. **CalculatorLayout** (wrapper)
Main container for all calculator pages
```tsx
import { CalculatorLayout } from './shared';

<CalculatorLayout>
  {/* All calculator content goes here */}
</CalculatorLayout>
```

### 2. **CalculatorSection** (sections)
Container for input/output sections with consistent styling
```tsx
<CalculatorSection title="Investment Details" compact={true}>
  {/* Inputs or outputs */}
</CalculatorSection>
```

### 3. **CompactInputField** (inputs)
Reusable input with leading zeros fix, auto-validation
```tsx
<CompactInputField
  label="Principal Amount"
  value={values.principal}
  onChange={(val) => setValues({...values, principal: val})}
  type="number"
  min="0"
  compact={true}
/>
```

### 4. **ResultItem** (single result display)
Individual result with flexible sizing and styling
```tsx
<ResultItem
  label="Final Amount"
  value={finalAmount}
  size="large"
  highlight={true}
  prefix="$"
  suffix=""
/>
```

### 5. **CalculatorButton** (buttons)
Standardized button with variants
```tsx
<CalculatorButton variant="primary" size="md" fullWidth>
  Calculate
</CalculatorButton>
```

### 6. **CompactResultsDisplay** (result grid)
Grid-based results layout (mobile responsive)
```tsx
<CompactResultsDisplay results={resultItems} />
```

---

## Migration Pattern (Example)

### BEFORE (Old Calculator)
```tsx
'use client';
import React, { useState } from 'react';

export default function MyCalculator() {
  const [values, setValues] = useState({});

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Inputs section */}
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Label</label>
          <input type="number" className="w-full px-3 py-2 rounded-md border" />
        </div>
      </div>

      {/* Results */}
      <div className="mt-6">
        <div className="p-4 bg-blue-50">
          <p className="text-xs text-gray-600">Label</p>
          <p className="text-3xl font-semibold">$1000</p>
        </div>
      </div>
    </div>
  );
}
```

### AFTER (Using Global Components)
```tsx
'use client';
import React, { useState, useEffect } from 'react';
import {
  CalculatorLayout,
  CalculatorSection,
  CompactInputField,
  ResultItem,
  CompactResultsDisplay
} from './shared';

export default function MyCalculator() {
  const [values, setValues] = useState({});
  const [results, setResults] = useState(null);

  // Auto-calculate on any input change
  useEffect(() => {
    const principal = parseFloat(values.principal) || 0;
    // ... calculation logic
    setResults({
      label: "Final Amount",
      value: finalAmount,
      size: "large",
      highlight: true,
      prefix: "$"
    });
  }, [values]);

  return (
    <CalculatorLayout>
      <CalculatorSection title="Investment Details" compact>
        <CompactInputField
          label="Principal Amount"
          value={values.principal || ''}
          onChange={(val) => setValues({...values, principal: val})}
          type="number"
          compact
        />
      </CalculatorSection>

      {results && (
        <CalculatorSection title="Results">
          <ResultItem {...results} />
        </CalculatorSection>
      )}
    </CalculatorLayout>
  );
}
```

---

## Benefits of Global Components

| Change | Before | After |
|--------|--------|-------|
| Update input size | Edit 120+ files ❌ | Edit CompactInputField.tsx ✅ |
| Change button color | Edit 120+ files ❌ | Edit CalculatorButton.tsx ✅ |
| Adjust spacing | Edit 120+ files ❌ | Edit CalculatorSection.tsx ✅ |
| Update result styling | Edit 120+ files ❌ | Edit ResultItem.tsx ✅ |
| Add new feature to all | Edit 120+ files ❌ | Add to one global component ✅ |

---

## Implementation Strategy

### Phase 1 (Complete) ✅
- Created global components
- Tested with CompoundInterestCalculator

### Phase 2 (Current) 🎯
**Option A:** Selective Migration
- Update 1-2 calculators per day
- Test thoroughly before moving to next
- Example: Start with BMICalculator, APRCalculator

**Option B:** Batch Migration
- Run automated script to update all
- Fix any issues in bulk
- Faster but higher risk

**Recommendation:** Option A (gradual, safer)

---

## Next Steps

Choose an approach:

1. **Gradual Adoption** - I'll update 5 key calculators using the pattern above
   - BMICalculator
   - CompoundInterestCalculator (done)
   - LoaCalculator
   - APRCalculator
   - IncomeTaxCalculator

2. **Full Migration** - I'll create script to update all 120+ calculators in one go

3. **Manual** - You update calculators as needed, I'll help with specific ones

**Which approach do you prefer?**
