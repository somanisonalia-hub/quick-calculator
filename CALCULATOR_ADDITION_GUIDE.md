# Calculator Addition Guide - Complete Documentation

## Overview
This guide provides step-by-step instructions for adding a new calculator to the Quick Calculator platform. Follow this guide exactly to ensure proper integration, multi-language support, and SEO optimization.

---

## Pre-Requirements Checklist
Before starting, ensure:
- [ ] Calculator meets **100k+ monthly searches** criteria (or strategic importance)
- [ ] Have search volume data
- [ ] Know the calculation formula
- [ ] Have descriptions for all 4 languages (English, Spanish, Portuguese, French)

---

## Step 1: Create Calculator Component File

**Location:** `src/components/calculators/[CalculatorName].tsx`

**File Naming Convention:** 
- PascalCase: `ElectricityCostCalculator.tsx`

**Template Structure:**

```typescript
'use client';

import React, { useState } from 'react';

interface [CalculatorName]Props {
  lang?: string;
}

const translations = {
  en: {
    title: '[Calculator Title]',
    // Input labels
    inputLabel1: '[Label]',
    inputPlaceholder1: '[Placeholder]',
    // Buttons
    calculate: 'Calculate',
    // Results
    resultLabel1: '[Result Label]',
    // Messages
    enterValues: 'Enter values to calculate',
    disclaimer: 'This is an estimate. Consult a professional for personalized advice.',
  },
  es: {
    title: '[Spanish Title]',
    // ... same keys in Spanish
  },
  pt: {
    title: '[Portuguese Title]',
    // ... same keys in Portuguese
  },
  fr: {
    title: '[French Title]',
    // ... same keys in French
  }
};

export default function [CalculatorName]({ lang = 'en' }: [CalculatorName]Props) {
  const t = translations[lang as keyof typeof translations] || translations.en;
  
  const [input1, setInput1] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const val1 = parseFloat(input1);
    if (!val1 || val1 <= 0) return;
    
    // Your calculation logic here
    const calculated = val1 * 2; // Example
    setResult(calculated);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <span className="text-5xl">🔧</span>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-4">{t.title}</h2>
      </div>

      <div className="space-y-6">
        {/* Input Section */}
        <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.inputLabel1}
              </label>
              <input
                type="number"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                placeholder={t.inputPlaceholder1}
              />
            </div>

            <button
              onClick={calculate}
              disabled={!input1}
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              {t.calculate}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {result !== null && (
          <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md">
            <p className="text-gray-600 dark:text-gray-300 text-sm">{t.resultLabel1}</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{result.toFixed(2)}</p>
          </div>
        )}
      </div>

      {!result && input1 && (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-4 text-sm">
          {t.enterValues}
        </p>
      )}

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-6 text-center">
        {t.disclaimer}
      </p>
    </div>
  );
}
```

**CRITICAL RULES:**
- ✅ Use `{t.translationKey}` for ALL UI strings - NO hardcoded English text
- ✅ Include all 4 languages (en, es, pt, fr)
- ✅ Use Tailwind classes (no CSS files)
- ✅ Dark mode support required (`dark:` classes)
- ✅ Mobile-responsive grid layouts
- ✅ Error handling for invalid inputs

---

## Step 2: Create JSON Content File

**Location:** `content/calculators/[calculator-slug].json`

**File Naming Convention:**
- Kebab-case: `electricity-cost-calculator.json`
- Must match component in kebab-case

**Required Structure (All 4 Languages):**

```json
{
  "en": {
    "title": "Calculator Name",
    "seoTitle": "Calculator Name - Subtitle for SEO",
    "metaDescription": "Brief description (155-160 chars) with main keywords",
    "keywords": [
      "keyword1",
      "keyword2",
      "keyword3",
      "keyword4",
      "keyword5"
    ],
    "longTailKeywords": [
      "how to calculate xyz",
      "when to use abc",
      "xyz calculator for beginners"
    ],
    "slug": "calculator-slug",
    "category": "utility|financial|health|math|lifestyle",
    "difficulty": "basic|intermediate|advanced",
    "tags": ["tag1", "tag2", "tag3"],
    "summary": "One-line summary of what calculator does",
    "description": "2-3 sentence description of calculator purpose",
    "instructions": [
      "Step 1: Enter first value",
      "Step 2: Enter second value",
      "Step 3: View results"
    ],
    "seoContent": {
      "introduction": "Detailed introduction paragraph (100-150 words)",
      "benefits": "Benefit 1 • Benefit 2 • Benefit 3 • Benefit 4",
      "formula": "Mathematical formula or calculation explanation",
      "faqs": [
        {
          "question": "How do I use this calculator?",
          "answer": "Detailed answer paragraph explaining usage"
        },
        {
          "question": "What is the formula?",
          "answer": "Technical explanation of the formula"
        }
      ]
    }
  },
  "es": {
    "// Same structure as en - all keys translated to Spanish"
  },
  "pt": {
    "// Same structure as en - all keys translated to Portuguese"
  },
  "fr": {
    "// Same structure as en - all keys translated to French"
  }
}
```

**CRITICAL REQUIREMENTS:**
- ✅ ALL sections must be present for all 4 languages
- ✅ Keywords: 5 primary + 5 long-tail per language
- ✅ Category must be one of: `financial`, `health`, `math`, `utility`, `lifestyle`
- ✅ Difficulty: `basic`, `intermediate`, or `advanced`
- ✅ Min 2-3 FAQs per language
- ✅ SEO content must be 500+ words total

---

## Step 3: Register in ContentRegistry

**File:** `src/lib/contentRegistry.ts`

**Step 3a: Add Import**

Find the imports section around line 70-80, locate the last calculator import:

```typescript
import waistToHipRatioCalculator from '../../content/calculators/waist-to-hip-ratio-calculator.json';
import [newCalculator]Calculator from '../../content/calculators/[calculator-slug].json';
```

**Step 3b: Add Registry Entry**

Find the registry object around line 240-250, locate the last entry:

```typescript
  'calculators-waist-to-hip-ratio-calculator': waistToHipRatioCalculator,
  'calculators-[calculator-slug]': [newCalculator]Calculator,
  // Missing calculator entries
```

**SYNTAX RULES:**
- Key format: `'calculators-[kebab-case-slug]'`
- Must be in the registry object
- Import name: `[PascalCase]Calculator`

---

## Step 4: Update Discovery Files

### 4a. Update llms.txt

**File:** `public/llms.txt`

Find the appropriate section (Financial, Health, Math, Utility, Lifestyle) and add:

```plaintext
https://quick-calculator.org/en/[calculator-slug] - Brief description of what it calculates
```

Example:
```plaintext
https://quick-calculator.org/en/electricity-cost-calculator - Electricity bill calculator
```

### 4b. Sitemaps Auto-Generate

The XML sitemaps will automatically include your calculator through the ContentRegistry. No manual changes needed.

---

## Step 5: Build & Verify

**Run Build:**
```bash
npm run build 2>&1 | head -80
```

**What to look for:**
- ✅ `✓ Compiled successfully in X.Xs`
- ✅ No TypeScript errors
- ✅ "Generating static pages" message appears

**If build fails:**
- Check for hardcoded English strings (should use `{t.key}` instead)
- Verify all 4 languages in JSON have same keys
- Check TypeScript types match parameters
- Ensure all imports in contentRegistry.ts are correct

---

## File Checklist

Complete this checklist for each new calculator:

```
Component File:
- [ ] src/components/calculators/[Name].tsx created
- [ ] All UI text uses {t.translationKey} pattern
- [ ] All 4 languages included in translations object
- [ ] Dark mode classes added (dark:)
- [ ] Mobile-responsive layout (grid/max-w-2xl)
- [ ] Error handling for invalid inputs
- [ ] 'use client' directive present

JSON Content File:
- [ ] content/calculators/[slug].json created
- [ ] All 4 languages present (en, es, pt, fr)
- [ ] Same keys in all 4 language objects
- [ ] slug field matches filename (kebab-case)
- [ ] category is valid (financial/health/math/utility/lifestyle)
- [ ] difficulty is valid (basic/intermediate/advanced)
- [ ] keywords: 5 per language
- [ ] longTailKeywords: 5 per language
- [ ] seoContent.faqs: minimum 2 per language
- [ ] All translations accurate and complete

ContentRegistry:
- [ ] Import added to src/lib/contentRegistry.ts
- [ ] Registry entry added (correct key format)
- [ ] Import filename matches JSON filename (kebab-case)

Discovery:
- [ ] Added to public/llms.txt in correct section
- [ ] Description is under 100 chars

Build:
- [ ] npm run build completes successfully
- [ ] No TypeScript errors
- [ ] "Compiled successfully" message shows
```

---

## Common Mistakes to Avoid

### ❌ Hardcoded English Text
```typescript
// WRONG ❌
<span>Final Total:</span>

// RIGHT ✅
<span>{t.finalTotal}</span>
```

### ❌ Missing Translation Keys
```typescript
// WRONG ❌
const translations = {
  en: { title: 'Title' },
  es: { title: 'Título' }, // Missing in other languages
}

// RIGHT ✅
const translations = {
  en: { title: 'Title' },
  es: { title: 'Título' },
  pt: { title: 'Título' },
  fr: { title: 'Titre' }
}
```

### ❌ Wrong Export Format
```typescript
// WRONG ❌
export default [ComponentName]

// RIGHT ✅
export default function [ComponentName]({ lang = 'en' }: [ComponentName]Props) {
  // ...
}
```

### ❌ Missing JSON Fields
```json
// WRONG ❌
{
  "en": {
    "title": "Title",
    "seoContent": { }
  }
}

// RIGHT ✅
{
  "en": {
    "title": "Title",
    "slug": "slug",
    "category": "utility",
    "tags": ["tag1"],
    "seoContent": { "introduction": "...", "faqs": [...] }
  }
}
```

---

## Testing Your Calculator

After build:

1. **Language Test:**
   - Visit `/en/calculators/[slug]`
   - Visit `/es/calculators/[slug]`
   - Verify correct language appears (no English text on Spanish page)

2. **Functionality Test:**
   - Enter valid inputs
   - Verify calculation is correct
   - Check output formatting (decimal places, units)
   - Test with invalid inputs (empty, negative, zero) - should show error message

3. **Mobile Test:**
   - Open on mobile browser
   - Inputs and buttons should be touch-friendly
   - Text should be readable
   - No horizontal scroll needed

4. **SEO Test:**
   - Check page source for meta tags
   - Verify title tag is correct
   - Check description meta tag
   - Search console: Should appear in sitemap

---

## Performance Notes

- Component size should be < 20KB
- JSON file size < 50KB
- Build time should stay under 5 seconds
- Page should load in < 2 seconds over 3G
- Mobile First - test on actual mobile device

---

## Revenue & Search Volume Expectations

Minimum requirements for new calculators:
- **Search Volume:** 50k+ monthly searches minimum (100k+ preferred)
- **CPC:** $1+ (higher for financial: $2-4, health: $1-3, utility: $0.50-2)
- **Expected Monthly Revenue:** = (searches/100) × CPC × CTR × $0.003-0.005 CPM
  - Example: 50k searches, $1 CPC = $150-250/month potential

---

## Support & Questions

When reporting issues, provide:
1. Calculator name and slug
2. Whether issue affects specific language
3. Whether issue is component or JSON
4. Build error message (if applicable)
5. Screenshot (if UI issue)

---

## Version History

- v1.0 - Initial documentation (Feb 5, 2026)
- Created based on ElectricityCostCalculator, CalorieDeficitCalculator, DiscountCalculator patterns
