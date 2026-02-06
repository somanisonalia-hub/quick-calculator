# Calculator Testing Guide

This project includes automated Playwright tests to validate all calculators and detect layout issues on mobile devices.

## Test Files

### 1. `quick-calculator-test.spec.ts` 
**Recommended for quick validation**
- Tests a sample of 10 key calculators
- Runs in ~20 seconds
- Checks for:
  - Calculator component availability
  - Mobile layout issues (horizontal overflow)
  - Buttons extending beyond viewport
  - Missing interactive elements

### 2. `test-all-calculators.spec.ts`
**Comprehensive test for all calculators**
- Discovers and tests ALL calculator links from homepage (~150+ calculators)
- Takes 2-5 minutes to complete
- Generates detailed JSON report
- Takes screenshots of calculators with issues
- Checks for:
  - Missing calculator components
  - Error pages
  - Layout issues on mobile (375px width)
  - Horizontal overflow
  - Elements cut off on the right side

## Prerequisites

```bash
# Make sure dev server is running on port 3000
npm run dev

# In another terminal, run tests
```

## Running Tests

### Quick Test (Recommended)
Test a sample of 10 calculators to quickly identify issues:

```bash
npx playwright test quick-calculator-test.spec.ts --config=playwright-calculator-test.config.ts
```

### Full Test
Test all calculators (takes longer):

```bash
npx playwright test test-all-calculators.spec.ts --config=playwright-calculator-test.config.ts
```

### With Browser UI (headed mode)
See the tests running in a real browser:

```bash
npx playwright test quick-calculator-test.spec.ts --config=playwright-calculator-test.config.ts --headed
```

### Run Specific Test
```bash
npx playwright test --config=playwright-calculator-test.config.ts -g "401k"
```

## Test Output

### Console Output
- ✅ SUCCESS - Calculator loaded and working properly
- ❌ MISSING - Calculator component not yet implemented  
- ⚠️ ERROR - Error loading calculator
- 📱 Layout Issue - Elements extending beyond mobile viewport

### Generated Files

1. **`calculator-test-results.json`**
   - Detailed JSON report of all test results
   - Includes status, errors, and layout issues for each calculator
   - Timestamp and summary statistics

2. **`playwright-screenshots/`**
   - Screenshots of calculators with layout issues
   - Named by calculator URL
   - Full mobile viewport captures

3. **`test-output.log`**
   - Complete console output from test run

## Understanding Results

### Layout Issues
Layout issues are detected when:
- Page content extends beyond viewport width (horizontal scroll needed)
- Buttons extend beyond the right edge of the screen
- Input fields are cut off on the right side

Common causes:
- Using `flex gap-4` instead of `flex flex-col sm:flex-row gap-4`
- Using `grid grid-cols-3` instead of `grid grid-cols-1 sm:grid-cols-3`
- Fixed widths without responsive breakpoints
- Missing mobile-first CSS classes

### Missing Components
If a calculator shows as missing:
1. Check that the component file exists in `src/components/calculators/`
2. Verify it's registered in `CalculatorRegistry.tsx`
3. Ensure the `component` field in the JSON matches the registered name
4. Run `node validate-calculators.js` to check configuration

## CI/CD Integration

Add to your GitHub Actions workflow:

```yaml
- name: Run Calculator Tests
  run: |
    npm run dev &
    sleep 10
    npx playwright test quick-calculator-test.spec.ts --config=playwright-calculator-test.config.ts
```

## Troubleshooting

### Port Already in Use
```bash
# Kill existing Next.js processes
pkill -f "next dev"
sleep 3
npm run dev
```

### Tests Timing Out
- Increase timeout in `playwright-calculator-test.config.ts`
- Check that server is fully started before running tests
- Use `--headed` mode to see what's happening

### Screenshots Not Generated
- Check `playwright-screenshots/` directory exists
- Ensure you have write permissions
- Screenshots only generate for tests with issues

## Best Practices

1. **Run quick test after changes** to catch issues early
2. **Run full test before deployment** to ensure all calculators work
3. **Check screenshots** when layout issues are reported
4. **Update tests** when adding new calculators to the quick test sample
5. **Keep test timeouts reasonable** - if tests timeout, there's likely a real issue

## Mobile Testing

All tests use a mobile viewport (375x667px - iPhone SE size) to catch:
- Responsive design issues
- Touch target sizing problems
- Horizontal scrolling issues
- Button overflow problems

The fixes we implemented use Tailwind's responsive classes:
- `flex-col sm:flex-row` - Stack vertically on mobile, horizontally on larger screens
- `grid-cols-1 sm:grid-cols-3` - Single column on mobile, three columns otherwise
- `text-sm sm:text-base` - Smaller text on mobile

## Example Output

```
📱 Testing: /en/amortization-schedule-calculator
   Found 12 interactive elements
   Not implemented: ✅ NO
   Has inputs: ✅ YES
   Horizontal overflow: ✅ NO
   Buttons outside view: ✅ NO

✅ SUCCESS
```

## Adding New Calculators to Quick Test

Edit `quick-calculator-test.spec.ts` and add to the `sampleCalculators` array:

```typescript
const sampleCalculators = [
  '/en/401k-calculator',
  '/en/your-new-calculator',  // Add here
  // ... rest of calculators
];
```
