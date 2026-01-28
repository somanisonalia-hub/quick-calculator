# Translation Validator - Usage Guide

## Overview

The translation validator automatically checks your translations for:
- ✅ Missing translation keys across languages
- ✅ English text leaking into non-English files
- ✅ Structural inconsistencies between language files
- ✅ Empty or placeholder translations

## Usage

### Run the Validator

```bash
npm run validate-translations
```

### Exit Codes
- `0` = All translations valid, no issues
- `1` = Errors or warnings found

---

## Current Status

### ✅ **Common Translation Files - CLEAN**
All `public/locales/{lang}/common.json` files are now **100% validated**:
- **226 keys** in each language (EN, ES, PT, FR)
- **0 missing keys**
- **0 English leaks**

### ⚠️ **Calculator Content Files - 15 Errors Remaining**

The following calculator files have missing translations:

#### **High Priority (Missing entire seoContent)**
1. `bmi-calculator.json` - Portuguese missing `seoContent`
2. `circle-circumference-calculator.json` - Portuguese missing `seoContent`
3. `scientific-calculator.json` - Portuguese missing `seoContent`

#### **Medium Priority (Missing summary field)**
4. `credit-card-calculator.json` - ES, PT, FR missing `summary`
5. `sales-tax-calculator.json` - ES, PT, FR missing `summary`

#### **Low Priority (Missing multiple SEO fields)**
6. `quadratic-equation-calculator.json` - ES, PT, FR missing: seoTitle, metaDescription, keywords, etc.
7. `surface-area-calculator.json` - ES, PT, FR missing: seoTitle, metaDescription, keywords, etc.

#### **Warnings (Optional SEO keys)**
8. `mortgage-calculator.json` - PT, FR missing: `howDoesWork`, `completeGuide`

---

## How to Fix Issues

### 1. **Missing Keys in common.json**
If you see errors like:
```
❌ [es/common.json] Missing 2 keys:
   - calculator.someKey
```

**Fix:** Add the key to `/public/locales/{lang}/common.json`:

```json
{
  "calculator": {
    "someKey": "Traducción aquí"
  }
}
```

### 2. **Missing Keys in Calculator Files**
If you see errors like:
```
❌ [loan-calculator.json/es] Missing keys: summary
```

**Fix:** Add the missing key to `/content/calculators/loan-calculator.json`:

```json
{
  "es": {
    "title": "Calculadora de Préstamos",
    "summary": "Nueva traducción aquí"
  }
}
```

### 3. **English Leakage Detection**
If you see errors like:
```
❌ [es/common.json] English text detected:
   - calculator.someKey: "Calculate your monthly payment..."
```

**Fix:** Replace with proper Spanish translation.

The validator uses a heuristic that checks if >20% of words are common English words.

---

## Features

### **1. Recursive Key Detection**
Finds missing keys in nested objects:
```json
{
  "calculator": {
    "nested": {
      "deepKey": "value"  // Detected as "calculator.nested.deepKey"
    }
  }
}
```

### **2. Smart English Detection**
Allows technical terms and brand names:
- ✅ Allowed: "EMI", "GPA", "BMI", "Quick Calculator", "Google"
- ❌ Flagged: "Calculate your monthly payment for the loan"

### **3. Structure Validation**
Ensures all languages have the same structure:
- Same top-level keys (title, description, seoContent, etc.)
- Same nested keys in seoContent (introduction, benefits, steps, etc.)

### **4. Empty Value Detection**
Warns about empty strings, null, or undefined values that need translation.

---

## Integration with CI/CD

### Pre-commit Hook (Recommended)
Add to `.husky/pre-commit`:
```bash
#!/bin/sh
npm run validate-translations
```

### GitHub Actions
Add to `.github/workflows/ci.yml`:
```yaml
- name: Validate Translations
  run: npm run validate-translations
```

### Pre-build Check
In `package.json`:
```json
{
  "scripts": {
    "prebuild": "npm run validate-translations"
  }
}
```

---

## Remaining Work

### Immediate (Before Production Launch)
- [ ] Fix 3 Portuguese calculators missing `seoContent`
- [ ] Add `summary` field to 6 calculator files (3 calculators × 3 languages)

### Optional (Nice to Have)
- [ ] Complete `quadratic-equation-calculator.json` translations
- [ ] Complete `surface-area-calculator.json` translations
- [ ] Add `howDoesWork` and `completeGuide` to mortgage calculator PT/FR

**Estimated Time:** 2-3 hours of translation work

---

## Statistics

### Last Validation Run
```
📊 Statistics:
   Total keys checked: 226
   Files checked: 96
   Missing keys: 75
   English leaks: 0
   Empty values: 0

✅ Errors: 15 (down from 24)
⚠️  Warnings: 2
```

### Progress
- ✅ **Common files:** 100% complete (0 errors)
- 🟨 **Calculator files:** 92% complete (15 errors in 8/93 files)

---

## Configuration

Edit `scripts/validate-translations.js` to customize:

```javascript
// Change languages
const LANGUAGES = ['en', 'es', 'pt', 'fr', 'de'];  // Add German

// Add allowed technical terms
const ALLOWED_ENGLISH_WORDS = new Set([
  'email', 'online', 'calculator', 'EMI', 'GPS'
]);

// Adjust English detection sensitivity
return (englishWordCount / words.length) > 0.2;  // 20% threshold
```

---

## Support

For issues or questions:
1. Check this README
2. Review validation error messages (they're detailed!)
3. Run with verbose logging: `NODE_ENV=development npm run validate-translations`

---

**Last Updated:** January 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅
