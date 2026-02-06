# Calculator Addition - Quick Reference Card

## 🚀 Quick Start (2-3 minutes)

### For Humans: Command to Use

```
"Add a Paint Calculator (128k searches, utility category, basic difficulty)
with these features: area input, coverage rate input, paint needed output"
```

### For Agents: Skill Invocation

```
Skill: add-calculator-to-platform
Parameters: [see AGENT_SKILL_CALCULATOR_ADDITION.md section "Input Parameters"]
Expected time: 8-12 minutes total execution
```

---

## 📋 Checklist (Do This First)

```
[ ] Calculator has 100k+ monthly searches (HARD GATE - no exceptions)
[ ] Category is valid: utility, financial, health, math, lifestyle
[ ] Have translations for: English, Spanish, Portuguese, French
[ ] Difficulty level: basic, intermediate, advanced
[ ] Icon/emoji chosen from available set
[ ] 5 keywords + 5 long-tail keywords per language
[ ] 2-5 FAQs minimum per language
[ ] Formula/algorithm documented
```

---

## 5-Step Process

### Step 1: Build Component (2 min)
**File**: `src/components/calculators/PaintCalculator.tsx`
**Template**: See CALCULATOR_ADDITION_GUIDE.md section "Step 1"
**Key Rule**: NO hardcoded strings - all use `{t.translationKey}`

```typescript
const translations = {
  en: { /* all keys */ },
  es: { /* same keys */ },
  pt: { /* same keys */ },
  fr: { /* same keys */ }
}
```

### Step 2: Create JSON (2 min)
**File**: `content/calculators/paint-calculator.json`
**Template**: See CALCULATOR_ADDITION_GUIDE.md section "Step 2"
**Key Check**: All 4 languages present, identical key structure

```json
{
  "slug": "paint-calculator",
  "category": "utility",
  "seoContent": {
    "en": { "title": "...", "keywords": [...], "faqs": [...] },
    "es": { /* same structure */ },
    "pt": { /* same structure */ },
    "fr": { /* same structure */ }
  }
}
```

### Step 3: Register (1 min)
**File**: `src/lib/contentRegistry.ts`
**Action 1** - Add import (near line 50):
```typescript
import paintCalculator from '../../content/calculators/paint-calculator.json'
```

**Action 2** - Add entry (in export, ~line 200):
```typescript
'calculators-paint-calculator': paintCalculator,
```

### Step 4: Update Discovery (1 min)
**File**: `public/llms.txt`
**Add under utility section**:
```markdown
- [Paint Calculator](/calculators/paint-calculator) - Estimate paint quantity needed
```

### Step 5: Verify (2 min)
```bash
npm run build 2>&1 | head -50
# Should see: ✓ Compiled successfully
# Should NOT see: TypeScript errors, "Module not found"
```

---

## ⚡ Critical Rules

| Rule | Example | Violation |
|------|---------|-----------|
| **No English outside `{t.key}`** | `{t.title}` | `"Paint Needed"` (hardcoded) |
| **All 4 languages required** | en, es, pt, fr | Missing "fr" keys |
| **ID format consistent** | `paint-calculator` | `PaintCalc` or `paint_calc` |
| **100k+ searches minimum** | 128,000 | 95,000 (rejected) |
| **JSON keys identical** | `keywords` in all 4 | EN has `keywords`, ES has `word_list` |
| **Component uses 'use client'** | `'use client'` first line | Removed or missing |
| **Build must pass** | `✓ Compiled success` | Any `Error:` in output |

---

## 🔍 Pre-Build Validation

```bash
# Component syntax
node -c src/components/calculators/PaintCalculator.tsx

# JSON valid
cat content/calculators/paint-calculator.json | jq . > /dev/null && echo "✓ Valid JSON"

# Registry entry format
grep "paint-calculator" src/lib/contentRegistry.ts | wc -l  # Should be 2 (import + entry)

# Language completeness
grep -o '"[^"]*":' content/calculators/paint-calculator.json | sort | uniq -c | grep -v "     4 " | wc -l  # Should be 0
```

---

## 🆘 If Build Fails

### Error: "Cannot find module 'paint-calculator.json'"
```bash
# Check file exists
ls content/calculators/paint-calculator.json

# Check import path matches
grep "from.*paint-calculator" src/lib/contentRegistry.ts
```

### Error: "Property 'X' does not exist on type 'Translations'"
```bash
# Verify key exists in all 4 languages
grep '"title"' content/calculators/paint-calculator.json | wc -l  # Should be 4
```

### Error: "TS2345: Argument of type 'string' is not assignable"
```bash
# Ensure type guards are correct
grep "language as keyof typeof translations" src/components/calculators/PaintCalculator.tsx
```

### Calculator not appearing on home page
```bash
# Verify registry entry
grep "'calculators-paint-calculator'" src/lib/contentRegistry.ts

# Rebuild cache
rm -rf .next && npm run build
```

---

## 📊 File Size Guidelines

| File | Min | Good | Max |
|------|-----|------|-----|
| Component.tsx | 5 KB | 10-12 KB | 20 KB |
| JSON file | 15 KB | 25-30 KB | 50 KB |
| Total added | 20 KB | 35-42 KB | 70 KB |

---

## ✅ Post-Build Verification

```bash
# 1. Build successful
npm run build 2>&1 | tail -5  # Should say "Compiled successfully"

# 2. Component accessible
grep "getAvailableCalculators('en')" src/lib/contentRegistry.ts | wc -l  # Should be > 0

# 3. All languages in sitemap
npm run build 2>&1 | grep "paint-calculator" | wc -l  # Should show 4 (one per language)

# 4. Registry complete
grep -c "calculators-paint-calculator" src/lib/contentRegistry.ts  # Should be 2

# 5. Discovery complete
grep -c "paint-calculator" public/llms.txt  # Should be 1
```

---

## 🎯 Success Signals

After build completes, you should see:
- ✅ `✓ Compiled successfully in 2.6-2.8s`
- ✅ No "Error:" messages
- ✅ No "TypeError:" messages  
- ✅ No "Cannot find" warnings
- ✅ Pages showing: `[paint-calculator]` rendered 4 times (en, es, pt, fr)

---

## 📚 Full Documentation Links

When in doubt, refer to:
1. **Component Creation**: CALCULATOR_ADDITION_GUIDE.md → Step 1
2. **JSON Structure**: CALCULATOR_ADDITION_GUIDE.md → Step 2
3. **Registry Format**: CALCULATOR_ADDITION_GUIDE.md → Step 3
4. **Full Spec**: AGENT_SKILL_CALCULATOR_ADDITION.md
5. **Test Cases**: AGENT_SKILL_TEST_CASES.md
6. **Execution Checklist**: AGENT_SKILL_EXECUTION_CHECKLIST.md

---

## ⏱️ Time Budget

| Step | Time | Critical? |
|------|------|-----------|
| Read this card | 2 min | ✅ Yes |
| Plan calculator | 2 min | ✅ Yes |
| Build component | 3 min | Required |
| Create JSON | 2 min | Required |
| Register + discover | 2 min | Required |
| Build + test | 3 min | Required |
| Manual QA | 5-10 min | Recommended |
| **TOTAL** | **20 min** | |

---

## 🚨 Abort Conditions

Stop immediately if:

1. ❌ Calculator has < 100k monthly searches
2. ❌ Cannot get complete 4-language content
3. ❌ Category not in [utility, financial, health, math, lifestyle]
4. ❌ Build fails with TypeScript errors
5. ❌ Any hardcoded English text found after build
6. ❌ Component not accessible at `/en/calculators/[slug]`

---

## 📞 When to Escalate

Ask human review if:
- Calculator formula is complex (> 3 calculation steps)
- Multiple inputs with interdependencies
- Special UI components needed (map, date picker, etc)
- Calculation requires external data/API
- Difficulty is "Advanced"

---

## Example: Complete 2-Minute Setup

```bash
# Humans just say:
"Add Paint Calculator (128k searches, cyan color, paint area estimation)"

# Agent then:
1. Creates src/components/calculators/PaintCalculator.tsx (copy template, fill translations)
2. Creates content/calculators/paint-calculator.json (fill seoContent for all 4 languages)
3. Updates src/lib/contentRegistry.ts (add 2 lines)
4. Updates public/llms.txt (add 1 line)
5. Runs: npm run build
6. Reports: ✅ All steps completed, 880 pages generated, calculator live

# Total time: 8-12 minutes
```

---

## Next 100k+ Candidates

When ready to add next calculator, check:

- Paint Calculator: 128,000 (NEXT) ✅ Ready
- Roof Pitch: 35,000 (Skip - below 100k) ❌
- Pet Age: 45,000 (Skip - below 100k) ❌
- Need research for next 100k+ opportunity

**Approval required from** human before pursuing new candidates below 100k.

