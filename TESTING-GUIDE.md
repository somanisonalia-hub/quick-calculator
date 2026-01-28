# Automated Browser Testing Guide

## Quick Runtime Error Check (All 445 Pages)

To verify all calculators work without runtime errors, use Playwright:

### Step 1: Start the Development Server
```bash
npm run dev
# Server will run on http://localhost:3000
```

Wait for it to start (~30 seconds)

### Step 2: Run the Full Site Check
```bash
npx playwright test playwright-full-check.test.ts --headed
```

**What it checks**:
- ✅ All 103 calculators × 4 languages = 412 calculator pages
- ✅ All category pages (6 categories × 4 languages = 24 pages)
- ✅ Homepage in all 4 languages
- ✅ **Total: 445+ pages**

**For errors**:
- TypeError
- ReferenceError
- "is not defined"
- "not yet implemented"
- "Cannot read properties"

### Step 3: View Results
The test outputs:
- ✅ Success count
- ❌ Failed count  
- 🚨 Specific errors with URLs if any fail

### Example Output
```
📊 Results:
✅ Success: 445/445
❌ Failed: 0/445

🎉 All pages passed!
```

## Quick Sanity Check (Just 10 Pages)
If you just want a quick check of a few calculators:

```bash
npx playwright test playwright.test.ts --headed
```

This runs the fast version with just the top 10 new calculators.

## Full Test with Screenshots
To capture screenshots of any errors:

```bash
npx playwright test playwright-full-check.test.ts --headed --screenshot=only-on-failure
```

Screenshots will be in `test-results/` folder

## Run Without UI
If you want faster headless testing:

```bash
npx playwright test playwright-full-check.test.ts
```

## Installation (if needed)
If Playwright browsers aren't installed:

```bash
npx playwright install
```

## Browser Selection
The config tests in Chromium by default. To test all browsers:

```bash
npx playwright test playwright-full-check.test.ts --headed --project=webkit
npx playwright test playwright-full-check.test.ts --headed --project=firefox
```

## Continuous Integration
To use in CI/CD (GitHub Actions, etc):

```bash
npm run build
npm run dev &  # Start server in background
sleep 10       # Wait for server
npx playwright test playwright-full-check.test.ts
```

## Performance Note
- Each page takes ~2-3 seconds to load and check
- 445 pages = ~30-40 minutes total
- Consider running overnight or in parallel with CI

## Troubleshooting

**Port 3000 already in use?**
```bash
lsof -i :3000
kill -9 <PID>
npm run dev
```

**Timeout errors?**
Increase timeout in `playwright.config.ts`:
```typescript
webServer: {
  timeout: 300 * 1000, // 5 minutes
}
```

**Need to test specific calculator?**
Edit the test file and add specific calculator to the list or modify the URL directly.

---

**TL;DR**: Start server → Run `npx playwright test playwright-full-check.test.ts --headed` → Check results ✅
