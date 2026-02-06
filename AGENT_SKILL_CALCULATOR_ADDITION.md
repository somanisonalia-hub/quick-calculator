# Calculator Addition Agent Skill

## Skill Name
`add-calculator-to-platform`

## Skill Description
Adds a new calculator to the Quick Calculator platform following the established pattern. The agent autonomously handles:
1. Creating the calculator component (TypeScript + translations)
2. Creating the JSON content file with **complete SEO metadata and seoContent** (see SEO_AND_SCHEMA_REQUIREMENTS.md)
3. Registering in contentRegistry.ts
4. Updating discovery files (llms.txt)
5. Verifying schema and structured data
6. Verifying the build succeeds

**Critical**: Every calculator MUST include complete seoContent for all 4 languages (introduction, benefits, steps, FAQs, formula explanation) or it will fail QA.

## Skill Input Parameters

```typescript
interface CalculatorAddRequest {
  // Basic Info
  calculatorName: string;           // PascalCase: "PaintCalculator"
  slug: string;                      // kebab-case: "paint-calculator"
  searchVolume: number;              // e.g., 65000
  category: 'financial'|'health'|'math'|'utility'|'lifestyle';
  difficulty: 'basic'|'intermediate'|'advanced';
  primaryColor: string;              // Tailwind class: 'blue', 'orange', 'purple'
  emoji: string;                     // Single emoji for header: '🎨'
  
  // English Content
  title_en: string;
  description_en: string;            // 2-3 sentences
  keywords_en: string[];             // 5 primary keywords
  longTailKeywords_en: string[];     // 5 long-tail keywords
  formula_en: string;
  faqs_en: Array<{question: string, answer: string}>;
  instructions_en: string[];         // Step-by-step guide
  
  // Translations (Spanish, Portuguese, French)
  title_es: string;
  description_es: string;
  keywords_es: string[];              // 5 keywords (DIFFERENT from EN)
  longTailKeywords_es: string[];     // 5 long-tail keywords (DIFFERENT)
  // ... same fields for es, pt, fr with _es, _pt, _fr suffixes
  
  // SEO CRITICAL: Complete seoContent for ALL languages
  // See SEO_AND_SCHEMA_REQUIREMENTS.md for complete structure
  seoContent_en: {
    introduction: string;              // 150-200 words
    benefits: string[];                // 5-7 benefits
    steps: string[];                   // 3-6 steps
    inputsExplained: string[];         // Explain each input
    formulaExplanation: string;        // 100+ word explanation
    whoItsFor: string;                 // 100+ words target audience
    disclaimer: string;                // 50+ word disclaimer
    relatedTools: string[];            // 3-5 related calculator names
    faqs: Array<{
      question: string;               // User-friendly question
      answer: string;                 // 50-150 word answer
    }>;                               // MINIMUM 3 FAQs, maximum 8
  };
  seoContent_es: object;              // Same structure as above
  seoContent_pt: object;              // Same structure as above
  seoContent_fr: object;              // Same structure as above
  
  // Schema/Structured Data
  schema_type: 'CreativeWork'|'Tool'|'CalculatorTool';  // Default: 'CreativeWork'
  includeCalculatorSchema: boolean;   // Whether to include custom calculator schema
  includeFAQSchema: boolean;          // Whether to include FAQ schema (default: true)
  
  // Component Logic
  inputs: Array<{
    name: string;
    label: string;
    type: 'number'|'text'|'select';
    defaultValue: string|number;
    step?: string;
    min?: string;
    max?: string;
  }>;
  calculations: string;              // TypeScript calculation logic
  outputs: Array<{
    name: string;
    label: string;
    format?: 'decimal'|'integer'|'currency'|'percentage';
    decimalPlaces?: number;
  }>;
}
```

## Skill Execution Steps

1. **Read CALCULATOR_ADDITION_GUIDE.md**
   - Load the complete guide from workspace
   - Extract all templates and requirements

2. **Validate Input**
   - Search volume >= 50,000 (warn if < 100,000)
   - All 4 languages provided
   - Category is valid
   - All required fields present
   - **seoContent complete for all 4 languages**:
     - introduction: 150+ words
     - benefits: 5-7 items
     - steps: 3-6 items
     - FAQs: 3-8 items with questions and 50-150 word answers
     - keywords: exactly 5 per language
     - longTailKeywords: exactly 5 per language
   - See: SEO_AND_SCHEMA_REQUIREMENTS.md for complete validation

3. **Create Component File**
   - File: `src/components/calculators/[Name].tsx`
   - Use template with:
     - All translations (en, es, pt, fr)
     - Input validation
     - Calculation logic
     - Results display
     - Error handling
   - NO hardcoded English strings
   - Dark mode support required

4. **Create JSON Content File**
   - File: `content/calculators/[slug].json`
   - Structure for all 4 languages:
     - Basic metadata (title, slug, category, difficulty, tags)
     - SEO fields (seoTitle, metaDescription, keywords, longTailKeywords)
     - Content (description, instructions, formula, relatedCalculators)
     - **seoContent with all required fields** (see SEO_AND_SCHEMA_REQUIREMENTS.md):
       - introduction (150-200 words per language)
       - benefits (5-7 per language)
       - steps (3-6 per language)
       - inputsExplained (2-5 per language)
       - formulaExplanation (100+ words per language)
       - whoItsFor (100+ words per language)
       - disclaimer (50+ words per language)
       - relatedTools (3-5 per language)
       - faqs (3-8 with question + answer per language)
   - Validate all keys match across languages (identical structure)
   - Verify keywords are unique per language (not English defaults)

4b. **Validate Schema Requirements**
   - Verify seoContent completeness: `jq '.en.seoContent | keys' content/calculators/[slug].json`
   - Check word counts: introduction ≥ 150, answers ≥ 50
   - Verify FAQ count ≥ 3
   - Confirm keyword count = 5 per language
   - Ensure no English strings appear in Spanish/Portuguese/French content

5. **Register in ContentRegistry**
   - Add import at top: `import [Name]Calculator from '../../content/calculators/[slug].json'`
   - Add registry entry: `'calculators-[slug]': [Name]Calculator`
   - Maintain alphabetical order by name

6. **Update Discovery Files**
   - Add to `public/llms.txt` in appropriate section
   - Format: `https://quick-calculator.org/en/[slug] - Description`
   - Add for all 4 languages if available

7. **Verify Build**
   - Run: `npm run build 2>&1 | head -80`
   - Check for: `✓ Compiled successfully`
   - Abort if TypeScript errors found
   - Verify file creation with `ls` commands

8. **Return Success Report**
   - File locations created
   - Build status
   - Any warnings or issues
   - Next steps for testing

## Validation Checklist

Before reporting success, verify with agent execution checklist:
- [ ] Component file exists at correct path
- [ ] Component has 'use client' directive
- [ ] All UI strings use {t.key} pattern (no hardcoded English)
- [ ] All 4 languages in translations object
- [ ] JSON file exists with complete structure (all 4 languages)
- [ ] **SEO/Schema requirements met**:
  - [ ] seoContent present in all 4 languages
  - [ ] introduction: 150+ words in each language
  - [ ] benefits: 5-7 items in each language
  - [ ] steps: 3-6 items in each language
  - [ ] FAQs: 3-8 entries per language
  - [ ] Each FAQ answer: 50-150 words
  - [ ] keywords: exactly 5 per language
  - [ ] longTailKeywords: exactly 5 per language
  - [ ] No English text appearing in non-English sections
- [ ] Registry entries added (import + catalog entry)
- [ ] llms.txt updated with new calculator entry
- [ ] Build completes: `npm run build 2>&1 | grep "Compiled successfully"`
- [ ] Zero TypeScript errors in build output
- [ ] All 4 language URLs would be valid (en, es, pt, fr)
- [ ] ContentRegistry imports and entries added
- [ ] llms.txt updated
- [ ] Build completes with "Compiled successfully"
- [ ] npm run build shows no TypeScript errors

## Error Handling

If any step fails:
1. Report which step failed
2. Show error message
3. Suggest fix based on guide
4. Do NOT continue to next step
5. Abort with clear error report

## Expected Outcomes

✅ New calculator fully functional and live:
- Appears in home page calculator list
- Shows in related calculators widget on other pages
- Accessible in all 4 languages (/en/, /es/, /pt/, /fr/)
- SEO-optimized (appears in sitemaps, searchable)
- Indexed by Google via sitemap
- AI-discoverable via llms.txt

## Related Resources

- **Guide Location:** `/CALCULATOR_ADDITION_GUIDE.md`
- **Template Examples:** 
  - ElectricityCostCalculator.tsx (utility)
  - CalorieDeficitCalculator.tsx (health)
  - DiscountCalculator.tsx (financial/utility)
- **Registry:** `src/lib/contentRegistry.ts`
- **Discovery:** `public/llms.txt`

## Test Commands

```bash
# Verify component file created
ls -la src/components/calculators/[Name].tsx

# Verify JSON file created  
ls -la content/calculators/[slug].json

# Verify registry entry
grep "calculators-[slug]" src/lib/contentRegistry.ts

# Verify llms.txt updated
grep "[slug]" public/llms.txt

# Build verification
npm run build 2>&1 | grep "Compiled successfully"
```

## Success Indicators

- Build completes in < 3 seconds
- No TypeScript errors
- File creation confirmed via ls
- Registry entries verified via grep
- Calculator accessible at `/calculators/[slug]` routes
- Appears in home page listings
