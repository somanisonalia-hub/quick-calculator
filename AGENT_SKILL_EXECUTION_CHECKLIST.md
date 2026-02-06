# Agent Skill Execution Validation Checklist

## Pre-Execution State

Before agent runs `add-calculator-to-platform`, verify:

```bash
# Count existing calculators
find src/components/calculators -name "*.tsx" | wc -l  # Should show 167

# Check contentRegistry size
wc -l src/lib/contentRegistry.ts  # Should show ~220 lines

# Verify llms.txt
grep "utility" public/llms.txt | wc -l  # Should show ~12 entries
```

---

## Post-Execution State (Example: Adding Paint Calculator)

### File Creation Verification

```bash
# 1. Component file should exist
src/components/calculators/PaintCalculator.tsx
✅ Size: 10-15 KB
✅ Modified: within last 2 minutes
✅ Content: React component with 'use client', 4 language translations

# 2. JSON file should exist
content/calculators/paint-calculator.json
✅ Size: 25-35 KB
✅ Modified: within last 2 minutes
✅ Content: Complete metadata, all 4 languages

# Verify with:
ls -lah src/components/calculators/PaintCalculator.tsx
ls -lah content/calculators/paint-calculator.json
```

### Registry Entry Verification

```bash
# Should see new import
grep "import.*paintCalculator" src/lib/contentRegistry.ts
Expected: import paintCalculator from '../../content/calculators/paint-calculator.json';

# Should see new registry entry
grep "'calculators-paint-calculator'" src/lib/contentRegistry.ts
Expected: 'calculators-paint-calculator': paintCalculator,

# Verify with:
grep -A2 -B2 "paint-calculator" src/lib/contentRegistry.ts
```

### Discovery Update Verification

```bash
# Should see new entry in llms.txt
grep "paint-calculator" public/llms.txt
Expected: - [Paint Calculator](/calculators/paint-calculator) - Estimate paint quantity needed

# Should be in Utility section
grep -A5 "## Utility Calculators" public/llms.txt | grep paint
Should show paint-calculator entry present

# Verify with:
grep "paint-calculator" public/llms.txt
cat public/llms.txt | grep -A20 "Utility"
```

### Build Verification

```bash
# Run build
npm run build 2>&1

# Expected output sequence:
✓ Compiled successfully in 2.6-2.8s
Generating static pages using 13 workers
- Starting to render pages
- [paint-calculator] rendered in EN
- [paint-calculator] rendered in ES  
- [paint-calculator] rendered in PT
- [paint-calculator] rendered in FR

# Should NOT see:
❌ TypeScript compilation errors
❌ page not found warnings for [lang]/calculators/paint-calculator
❌ Registry resolution errors
```

### URL Accessibility Verification

```typescript
// These URLs should serve the calculator:
✅ /en/calculators/paint-calculator
✅ /es/calculators/paint-calculator
✅ /pt/calculators/paint-calculator
✅ /fr/calculators/paint-calculator

// Verify with:
npm run build && npm run start
# Visit http://localhost:3000/en/calculators/paint-calculator
# Verify component loads, all inputs functional
```

---

## Quantitative Success Metrics

| Metric | Before | After | Expected Change |
|--------|--------|-------|-----------------|
| React Components | 167 | 168 | +1 calculator |
| JSON Files | 161 | 162 | +1 content file |
| contentRegistry.ts lines | 220 | 225 | +5 lines (import + entry) |
| llms.txt entries | 161 | 162 | +1 entry |
| Total sitemaps | 4 | 4 | unchanged (dynamic) |
| Sitemap pages | 876 | 880 | +4 (×4 languages) |
| Build time | 2.7s | 2.7-2.8s | negligible |
| TypeScript errors | 0 | 0 | stay at 0 |

---

## File Content Validation Checklist

### PaintCalculator.tsx Content

```typescript
// Header
'use client'
import { useState } from 'react'

// Translations object (lines 5-80)
const translations = {
  en: {
    title: "Paint Calculator",
    areaSize: "Area Size",
    // ... all keys for EN
  },
  es: {
    title: "Calculadora de Pintura",
    // ... all keys for ES
  },
  pt: {
    title: "Calculadora de Tinta",
    // ... all keys for PT
  },
  fr: {
    title: "Calculatrice de Peinture",
    // ... all keys for FR
  }
}

// Component function (lines 85-...)
export default function PaintCalculator({ language = 'en' }) {
  const t = translations[language as keyof typeof translations] || translations.en
  // NO hardcoded English strings
  // All strings use {t.key} pattern
  // Dark mode classes present (dark:bg-gray-800, etc)
  // Mobile responsive (md:grid-cols-2, etc)
  // Proper error handling with try-catch
}
```

✅ Verification points:
- No `"Paint"`, no `"Gallon"`, no hardcoded UI text
- All language keys match across all 4 objects
- TypeScript types present (InputValue, Result types)
- Tailwind classes include dark mode
- Mobile responsive structure

### paint-calculator.json Content

```json
{
  "slug": "paint-calculator",
  "category": "utility",
  "difficulty": "basic",
  "emoji": "🎨",
  "colors": {
    "primary": "cyan",
    "background": "cyan-50"
  },
  "keywords": [
    "paint calculator",
    "how much paint needed",
    "paint coverage calculator",
    "gallons needed",
    "paint quantity"
  ],
  "longTailKeywords": [
    "how to calculate paint needed",
    "paint calculator for walls",
    "coverage rate paint",
    "square feet to gallons paint",
    "interior paint estimate"
  ],
  "seoContent": {
    "en": {
      "introduction": "150-200 word paragraph about paint calculation...",
      "benefits": [
        "Accurate estimation of paint quantity",
        "Save money on materials",
        // 5-7 total benefits
      ],
      "steps": [
        "Enter total area in square feet",
        "Input paint coverage rate",
        "Get paint quantity needed",
        // 3-6 total steps
      ],
      "inputsExplained": [
        "Area Size: Total square footage to paint...",
        "Coverage Rate: Sq ft per gallon...",
        // Explain each input
      ],
      "formulaExplanation": "Paint needed (gallons) = Total Area / Coverage Rate. For example, a 1000 sq ft wall with 350 sq ft/gallon coverage = 2.86 gallons needed...",
      "whoItsFor": "100+ word paragraph on target audience...",
      "disclaimer": "50+ word disclaimer about accuracy...",
      "relatedTools": [
        "Flooring Calculator",
        "Drywall Calculator",
        "Color Mixer"
      ],
      "faqs": [
        {
          "question": "How much coverage does paint provide?",
          "answer": "50-150 word answer..."
        },
        // 3-8 total FAQs
      ]
    },
    "es": { /* identical structure */ },
    "pt": { /* identical structure */ },
    "fr": { /* identical structure */ }
  }
}
```

✅ Verification points:
- All 4 language `seoContent` objects present
- Each has: introduction, benefits, steps, inputsExplained, formulaExplanation, whoItsFor, disclaimer, relatedTools, faqs
- No missing or null values
- introduction ≥ 150 words per language
- benefits array ≥ 5 items per language
- FAQ answers ≥ 50 words per language
- No English text in es/pt/fr sections

### contentRegistry.ts Entry

```typescript
// Search for this import near top:
import paintCalculator from '../../content/calculators/paint-calculator.json'

// Search for this entry in export default:
'calculators-paint-calculator': paintCalculator,
```

✅ Verification: `grep -n "paint-calculator" src/lib/contentRegistry.ts`
- Should show 2 matches
- Import line: usually 30-60
- Registry entry: usually 180-210

### llms.txt Entry

```markdown
## Utility Calculators
- [Paint Calculator](/calculators/paint-calculator) - Estimate paint quantity needed
```

✅ Verification: `grep -B2 -A2 "paint-calculator" public/llms.txt`
- Should show utility section context
- Markdown format with link
- Proper description present

---

## Schema & SEO Verification

### seoContent Structure Validation

After component and JSON creation, verify seoContent completeness:

```bash
# Check seoContent exists in all 4 languages
jq 'keys' content/calculators/paint-calculator.json
# Should show: ["en", "es", "fr", "pt"]

# Verify seoContent fields in English
jq '.en.seoContent | keys' content/calculators/paint-calculator.json
# Should show all 9 fields: introduction, benefits, steps, inputsExplained, 
# formulaExplanation, whoItsFor, disclaimer, relatedTools, faqs

# Check word count (introduction should be 150+ words)
jq '.en.seoContent.introduction | split(" ") | length' content/calculators/paint-calculator.json
# Should return >= 150

# Verify FAQs present (minimum 3)
jq '.en.seoContent.faqs | length' content/calculators/paint-calculator.json
# Should return >= 3

# Check keywords count (exactly 5)
jq '.en.keywords | length' content/calculators/paint-calculator.json
# Should return 5

# Verify all languages have identical seoContent structure
for lang in en es pt fr; do
  echo "=== $lang ==="
  jq ".$lang.seoContent | keys | length" content/calculators/paint-calculator.json
done
# All should return 9 (identical field count)
```

### FAQ Validation

Each FAQ must have complete question and substantial answer:

```bash
# Extract all FAQs and their structure
jq '.en.seoContent.faqs[] | {question: (.question | length), answer: (.answer | length)}' \
  content/calculators/paint-calculator.json

# Expected output for each FAQ:
# { "question": 15-100, "answer": 50-150 }
# (character counts)
```

### Keyword Distribution Check

Verify keywords are unique across languages (not English defaults):

```bash
# Check if Spanish keywords are actually in Spanish
jq '.es.keywords[]' content/calculators/paint-calculator.json | head -5

# Should NOT be:
# "paint calculator"  ← English word
# "how much paint"    ← English phrase

# Should be something like:
# "calculadora de pintura"
# "cuanta pintura necesito"
```

### Schema Rendering Check

After build, verify component includes structured data:

```bash
# Check if component imports StructuredData
grep -n "StructuredData" src/components/calculators/PaintCalculator.tsx

# Should show import and usage:
# import StructuredData from '@/components/StructuredData'
# <StructuredData data={...} />

# Verify JSON-LD renders in built page
npm run build && grep -r "application/ld+json" .next/
# Should find schema tags in built output
```

---

### Failure 1: Component TypeScript Error

```
Error: Property 'theme' does not exist on type 'TranslationValue'
```

**Root Cause**: Translation key accessed without proper type guard
**Fix**: Verify ALL translation keys exist in all 4 language objects
**Check**:
```bash
# Count keys in EN
grep -oP '(?<=")[^"]+(?=":)' content/paint-calculator.json | head -30 > /tmp/en_keys
# Verify same keys in ES, PT, FR
```

### Failure 2: Missing seoContent

```
Error: Uncaught TypeError: Cannot read property 'introduction' of undefined
```

**Root Cause**: seoContent missing from one or more languages
**Fix**: Verify all 4 languages have complete seoContent
```bash
jq '.en.seoContent | keys' content/paint-calculator.json  # All 9 fields?
jq '.es.seoContent | keys' content/paint-calculator.json  # Same as EN?
jq '.pt.seoContent | keys' content/paint-calculator.json  # Same as EN?
jq '.fr.seoContent | keys' content/paint-calculator.json  # Same as EN?
```

### Failure 3: Incomplete FAQ Structure

```
Error: FAQ missing question or answer
```

**Root Cause**: FAQ entries don't have both question and answer fields
**Fix**:
```bash
# Check FAQ structure
jq '.en.seoContent.faqs[] | select(.question == null or .answer == null)' \
  content/paint-calculator.json

# If output shows any FAQs, they're missing fields
# Ensure every FAQ object has: { "question": "...", "answer": "..." }
```

### Failure 4: Keywords Count Wrong

```
Error: Need exactly 5 keywords per language
```

**Root Cause**: Wrong number of keywords
**Fix**:
```bash
# Check current keyword count
for lang in en es pt fr; do
  echo "$lang: $(jq ".$lang.keywords | length" content/paint-calculator.json) keywords"
done

# Adjust to exactly 5 per language
jq '.en.keywords |= .[0:5]' content/paint-calculator.json  # Keep only first 5
```

### Failure 5: English Text in Spanish/Portuguese/French

```
Page shows English words on Spanish version
```

**Root Cause**: Translator missed some English phrases in seoContent
**Fix**:
```bash
# Find English words that should be translated
grep -i "calculator\|paint needed\|gallons" content/paint-calculator.json | \
  grep -E '\.es\.|\.pt\.|\.fr\.'

# If found, those sections need re-translation
```

### Failure 6: Introduction Too Short

```
Error: Introduction must be 150+ words
```

**Root Cause**: seoContent.introduction less than 150 words
**Fix**:
```bash
# Check word count
jq '.en.seoContent.introduction | split(" ") | length' \
  content/paint-calculator.json

# If < 150 words, expand the introduction
```

### Failure 7: Build Still Shows Old Calculator

```
✗ Module not found: can't resolve './paint-calculator.json'
```

**Root Cause**: Typo in import path or file not created
**Fix**: 
```bash
ls content/calculators/paint-calculator.json  # Verify exists
grep "import.*paint-calculator" src/lib/contentRegistry.ts  # Check path matches
```

### Failure 8: Registry Entry Not Found

```
Cannot find 'calculators-paint-calculator' in contentRegistry
```

**Root Cause**: Registry key doesn't match component slug
**Fix**: Key format is `'calculators-' + slug` (kebab-case)
```bash
# Verify consistency:
echo "Component: PaintCalculator"
echo "JSON slug: $(grep 'slug' content/paint-calculator.json | head -1)"
echo "Registry key should be: 'calculators-paint-calculator'"
# All three must match in spelling/casing
```

### Failure 4: Language Not Rendering

```
Page shows EN text on ES version
```

**Root Cause**: Missing language in translations object or fallback error
**Fix**:
```bash
# Verify all 4 languages in component
grep -n "const t = translations" src/components/calculators/PaintCalculator.tsx
# Verify translation key exists in all 4 objects
grep "coverageRate" content/paint-calculator.json | wc -l  # Should be 4 (once per language)
```

### Failure 5: XML Sitemap Not Generated

```
Sitemap missing paint-calculator entries
```

**Root Cause**: Calculator registered AFTER sitemap.ts builds (caching)
**Fix**:
```bash
rm -rf .next  # Clear Next.js cache
npm run build  # Full rebuild
# Verify sitemap regenerates
grep "paint-calculator" public/sitemap-*.xml
```

---

## Manual Testing Checklist

After successful build, manually verify:

### Component Functionality
- [ ] Component loads at `/en/calculators/paint-calculator`
- [ ] All input fields accept numeric input
- [ ] Calculation executes on input change
- [ ] Output displays with correct decimal places (2-3)
- [ ] Dark mode toggle works (buttons responsive)
- [ ] Mobile view stacks properly (<640px width)
- [ ] Spanish version loads at `/es/calculators/paint-calculator`
- [ ] Portuguese version loads at `/pt/calculators/paint-calculator`
- [ ] French version loads at `/fr/calculators/paint-calculator`

### Content Accuracy
- [ ] All translations appear correctly in each language
- [ ] No English text visible on Spanish page
- [ ] No English text visible on Portuguese page
- [ ] No English text visible on French page
- [ ] Formula matches calculation logic
- [ ] FAQs display properly formatted

### SEO Verification
- [ ] Meta tags present: og:title, og:description, canonical
- [ ] Canonical URL correct for each language
- [ ] Structured data (JSON-LD) includes calculator schema
- [ ] Related calculators widget shows 5-8 suggestions
- [ ] Home page lists in utility section
- [ ] Sitemap includes all 4 language versions

### Performance
- [ ] Page load < 2 seconds
- [ ] No 404 errors in console
- [ ] No TypeScript warnings
- [ ] Images optimized (if any)
- [ ] CSS classes properly applied

---

## Sign-Off Criteria

Skill execution is **COMPLETE** when:

1. ✅ All 3 files created/modified (component, JSON, registry updated, llms.txt updated)
2. ✅ Build passes: `npm run build` → "Compiled successfully"
3. ✅ Zero TypeScript errors in output
4. ✅ All 4 language URLs functional
5. ✅ Calculator computes correctly (test with sample input)
6. ✅ No English text on Spanish/Portuguese/French pages
7. ✅ Component appears in related widgets on other calculators
8. ✅ Sitemap includes all language variants (verify with grep)

**Time to Complete**: 2-3 minutes
**Verification Time**: 5-10 minutes
**Total**: 10-15 minutes per calculator

