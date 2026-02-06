# Compact Results Display Guide

## Overview
The `CompactResultsDisplay` component provides a mobile-friendly, compact layout for displaying calculator results.

## Features
✅ Mobile-responsive grid layout (1 column on mobile, 2 columns on desktop)
✅ Compact spacing and typography (optimized for mobile viewing)
✅ Customizable highlight colors (blue, green, purple, red)
✅ Support for main output + multiple additional outputs
✅ Built-in info message section
✅ Easy value formatting with custom formatter function

## Usage Example

### Before (Verbose Layout)
```tsx
<div className="space-y-4">
  <h3 className="text-lg font-semibold text-gray-900 mb-4">{t.results}</h3>
  
  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
    <div className="text-sm text-gray-600 mb-1">{mainLabel}</div>
    <div className="text-3xl font-bold text-blue-600">{mainValue}</div>
  </div>
  
  {additionalOutputs.map(output => (
    <div key={output.field} className="bg-gray-50 p-3 rounded-lg">
      <div className="text-sm text-gray-600 mb-1">{output.label}</div>
      <div className="text-lg font-semibold text-gray-900">{value}</div>
    </div>
  ))}
</div>
```

### After (Compact Layout)
```tsx
<CompactResultsDisplay
  title={t.results}
  mainLabel="Final Amount"
  mainValue={formatCurrency(mainResult)}
  mainHighlight="blue"
  additionalOutputs={[
    { label: "Interest Earned", field: "interest", format: "currency" },
    { label: "Time Period", field: "time", format: "number" }
  ]}
  results={results}
  formatValue={formatCurrency}
  infoMessage="💡 Your investment details..."
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | string | ✓ | Section title (e.g., "Results", "Investment Growth") |
| `mainLabel` | string | ✓ | Label for main output value |
| `mainValue` | string/number/null | ✓ | The main result value to display |
| `mainDefault` | string | - | Fallback text if mainValue is null (default: "—") |
| `mainHighlight` | 'blue' / 'green' / 'purple' / 'red' | - | Color theme for main result (default: 'blue') |
| `additionalOutputs` | ResultOutput[] | - | Array of additional result outputs |
| `results` | Record | - | Object containing result values keyed by field name |
| `formatValue` | function | - | Custom formatter function: (value, format) => string |
| `infoMessage` | ReactNode | - | Optional info/help message to display below results |
| `className` | string | - | Additional CSS classes for wrapper |

## Responsive Behavior

- **Mobile (< 640px)**: 1 column grid for additional outputs
- **Desktop (≥ 640px)**: 2 column grid for additional outputs
- **All sizes**: Compact padding and font sizes optimized for readability

## Integration Steps

1. Import the component:
   ```tsx
   import CompactResultsDisplay from '@/components/calculators/CompactResultsDisplay';
   ```

2. Replace your results section with the component

3. Pass your data and formatting functions as props

4. Build and test on mobile devices

## Example: Complete Calculator Integration

```tsx
import CompactResultsDisplay from '@/components/calculators/CompactResultsDisplay';

export default function MyCalculator() {
  const [results, setResults] = useState<Record<string, number>>({});
  
  const formatCurrency = (value: number) => `$${value.toFixed(2)}`;
  
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Inputs side */}
      <div>{/* inputs here */}</div>
      
      {/* Results side - Now Compact */}
      <CompactResultsDisplay
        title="Results"
        mainLabel="Total Amount"
        mainValue={formatCurrency(results.total)}
        mainHighlight="green"
        additionalOutputs={[
          { label: "Principal", field: "principal", format: "currency" },
          { label: "Interest", field: "interest", format: "currency" }
        ]}
        results={results}
        formatValue={(value, format) => 
          format === 'currency' ? formatCurrency(value) : String(value)
        }
        infoMessage="💡 These are calculated results based on your inputs."
      />
    </div>
  );
}
```

## Benefits for Mobile Users

✅ **Less Scrolling**: Compact layout reduces vertical space
✅ **Better Visibility**: Important values are larger and more visible
✅ **Grid Alignment**: Additional outputs align neatly
✅ **Responsive**: Automatically adapts to screen size
✅ **Consistent UX**: All calculators have the same result layout

## Next Steps

Apply this component to:
- [ ] BMICalculator
- [ ] MortgageCalculator
- [ ] LoanCalculator
- [ ] All remaining 140+ calculators

See CompoundInterestCalculator.tsx for a complete implementation example.
