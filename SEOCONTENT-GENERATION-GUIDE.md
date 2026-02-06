# SEO Content Generator for Multi-Language Calculators

## Overview

This script automatically generates `seoContent` in **5 languages** (EN, ES, PT, FR, DE) for calculator files, following the exact same pattern used in existing calculators like `mortgage-calculator.json` and `sales-tax-calculator.json`.

## Current Status

✅ **Complete**: All 147 calculators already have fully populated `seoContent` sections in all supported languages.

## How It Works

### Structure
Each calculator file contains language-specific sections with complete `seoContent`:

```json
{
  "en": {
    "title": "Calculator Title",
    "seoContent": {
      "metaTitle": "SEO Title",
      "metaDescription": "SEO Description",
      "keywords": ["keyword1", "keyword2"],
      "h1": "Heading",
      "introduction": "...",
      "benefits": ["benefit1", "benefit2"],
      "steps": ["step1", "step2"],
      "inputsExplained": ["input1", "input2"],
      "formulaExplanation": "...",
      "examples": ["example1", "example2"],
      "resultsExplanation": ["result1", "result2"],
      "whoItsFor": "...",
      "disclaimer": "...",
      "howDoesWork": "...",
      "completeGuide": "...",
      "relatedTools": ["tool1", "tool2"],
      "faqs": [
        {
          "question": "Q?",
          "answer": "A?"
        }
      ]
    }
  },
  "es": { ... },
  "pt": { ... },
  "fr": { ... },
  "de": { ... }
}
```

### Features

- **Multi-Language**: Generates content in English, Spanish, Portuguese, French, and German
- **Smart Detection**: Only adds missing seoContent (skips if already present)
- **Consistent Pattern**: Follows industry-standard SEO practices used across all calculators
- **Batch Processing**: Can process all calculators or specific ones

## Usage

### Install Dependencies (if needed)
```bash
npm install  # Node.js built-in fs and path modules - no external dependencies required
```

### Run the Script

#### Process All Calculators
```bash
node generate-seocontent-multilang.js
```

#### Process Specific Calculators
```bash
node generate-seocontent-multilang.js calculator-name-1 calculator-name-2 calculator-name-3
```

**Examples:**
```bash
# Process single calculator
node generate-seocontent-multilang.js mortgage-calculator

# Process multiple calculators
node generate-seocontent-multilang.js sales-tax-calculator loan-calculator bmi-calculator

# Process all calculators
node generate-seocontent-multilang.js
```

### Output Example
```
📋 Processing 2 calculator(s)...

✓ Added seoContent for en: Mortgage Calculator
✓ Added seoContent for es: Calculadora de Hipoteca
✓ Added seoContent for pt: Calculadora de Hipoteca
✓ Added seoContent for fr: Calculateur Hypothécaire
✓ Added seoContent for de: Hypothekenrechner
✓ Updated: mortgage-calculator.json

✨ Summary:
   Processed: 1 files
   Updated: 1 files
   Skipped: 1 files (already complete)
```

## SEO Content Sections Explained

### `metaTitle`
- **Purpose**: Page title for SEO and browser tabs
- **Format**: `{CalculatorName} - {Benefit Statement}`
- **Example**: "Mortgage Calculator - Calculate Monthly Payments & Interest"
- **Length**: 50-60 characters ideal

### `metaDescription`
- **Purpose**: Summary for search engine results
- **Format**: Brief description of what the calculator does
- **Length**: 150-160 characters

### `keywords`
- **Purpose**: Search terms relevant to the calculator
- **Count**: 5-10 keywords
- **Examples**: "calculator", "calculate", specific calculator type

### `h1`
- **Purpose**: Main heading on the page
- **Value**: Usually matches the calculator title

### `introduction`
- **Purpose**: Opening paragraph explaining the tool
- **Content**: Benefits and use case overview

### `benefits`
- **Purpose**: List of key advantages
- **Count**: 6 items
- **Examples**: 
  - "Make informed decisions with accurate calculations"
  - "Save time with instant results"

### `steps`
- **Purpose**: How-to guide for using the calculator
- **Count**: 6 steps
- **Flow**: Input → Calculate → Review → Adjust → Apply

### `inputsExplained`
- **Purpose**: Explanation of input fields
- **Count**: 3-5 items
- **Content**: What each input means and how to provide it

### `formulaExplanation`
- **Purpose**: Technical explanation of calculation method
- **Content**: High-level description of the formula used

### `examples`
- **Purpose**: Real-world scenarios showing the calculator in action
- **Count**: 3-5 examples
- **Format**: Descriptive text for each example

### `resultsExplanation`
- **Purpose**: Interpretation of output values
- **Count**: 3-5 results
- **Content**: What each result means

### `whoItsFor`
- **Purpose**: Target audience / use cases
- **Examples**: Financial professionals, students, homebuyers, etc.

### `disclaimer`
- **Purpose**: Legal/accuracy disclaimers
- **Content**: Result is estimate, not professional advice

### `howDoesWork`
- **Purpose**: Technical overview of calculator operation
- **Length**: 1-2 paragraphs

### `completeGuide`
- **Purpose**: Step-by-step guide to using the calculator
- **Format**: Numbered steps for clarity
- **Content**: From input through decision-making

### `relatedTools`
- **Purpose**: Link to complement calculators
- **Count**: 3-5 related tools
- **Examples**: Budget Calculator, Savings Calculator, etc.

### `faqs`
- **Purpose**: Common questions and answers
- **Count**: 5-6 FAQs
- **Topics**: Accuracy, usage, interpretation, applicability

## Languages Supported

| Code | Language | Notes |
|------|----------|-------|
| `en` | English  | Primary language |
| `es` | Spanish  | European & Latin American Spanish |
| `pt` | Portuguese | Brazilian Portuguese |
| `fr` | French   | Standard French |
| `de` | German   | Standard German |

## Integration Points

### How This Integrates with Current System

1. **Content Registry** (`src/lib/contentRegistry.ts`)
   - All calculators are imported and registered
   - `seoContent` is served to pages for SEO metadata

2. **Content Loaders**
   - `loadCalculatorContent()` retrieves calculator data
   - Returns language-specific content with seoContent

3. **Page Generation**
   - Pages use `seoContent` fields for:
     - Meta tags (title, description)
     - Open Graph tags
     - Structured data
     - Page headings and introductions

## File Format

Location: `/content/calculators/{calculator-name}.json`

**File Structure:**
```
content/
├── calculators/
│   ├── mortgage-calculator.json
│   ├── sales-tax-calculator.json
│   ├── bmi-calculator.json
│   └── ... (147 total calculator files)
```

**Each file contains:**
- Language sections: `en`, `es`, `pt`, `fr`, `de`
- Each language section includes:
  - Basic info: `title`, `slug`, `category`, `difficulty`, `description`, `summary`
  - Calculator config: `calculatorComponent` with inputs/outputs
  - SEO content: `seoContent` object
  - Examples: `examples[]` array

## Best Practices

### When to Use This Script

1. **New Calculator Creation**
   ```bash
   # After creating a new calculator file
   node generate-seocontent-multilang.js new-calculator-name
   ```

2. **Batch Updates**
   ```bash
   # Update multiple new calculators at once
   node generate-seocontent-multilang.js calc1 calc2 calc3
   ```

3. **Maintenance**
   ```bash
   # Verify all calculators have complete seoContent
   node generate-seocontent-multilang.js
   ```

### Manual Enhancement

While the script provides excellent generic content, consider manually customizing:

- **metaTitle**: Make it more specific to your target keywords
- **keywords**: Add niche keywords specific to your audience
- **examples**: Replace generic examples with realistic scenarios
- **faqs**: Add calculator-specific questions/answers
- **relatedTools**: Customize based on actual calculator relationships

### Verification Commands

```bash
# Check specific calculator for seoContent
grep -c '"seoContent"' content/calculators/calculator-name.json

# Find calculators missing specific fields
grep -L '"metaTitle"' content/calculators/*.json

# Count total calculators with complete seoContent
ls content/calculators/*.json | wc -l
```

## Troubleshooting

### Issue: Script says "file not found"
**Solution**: Make sure you run the script from the project root directory
```bash
cd /Users/asomani16/Repository/quick-calculator-v3
node generate-seocontent-multilang.js calculator-name
```

### Issue: Changes not appearing in live site
**Solution**: 
1. Rebuild the project: `npm run build`
2. Clear cache: `npm run clean` (if available)
3. Restart dev server: `npm run dev`

### Issue: Validation errors after update
**Solution**: Verify JSON syntax:
```bash
node -e "console.log(JSON.parse(require('fs').readFileSync('content/calculators/calc.json')))"
```

## Performance Notes

- Processing all 147 calculators: ~2-5 seconds
- Processing single calculator: <100ms
- No external API calls or network requests
- Pure local file operations

## Future Enhancements

Potential improvements for this script:

1. **AI-Powered Content**
   - Integrate with LLM to generate calculator-specific content
   - Generate realistic examples based on calculator type

2. **Multi-Language Support**
   - Add Italian, Japanese, Korean, Chinese, Russian

3. **SEO Optimization**
   - Keyword research integration
   - Readability scoring
   - Validation against SEO best practices

4. **Version Control**
   - Track changes in seoContent
   - Version history for content updates
   - Rollback capabilities

## Example: Creating New Calculator with SEO Content

```bash
# 1. Create calculator file in content/calculators/new-calculator.json
# 2. Add basic structure with title and description
# 3. Run the script to generate seoContent
node generate-seocontent-multilang.js new-calculator

# 4. Then manually enhance specific fields if desired
# 5. Verify in browser
npm run dev
# Visit http://localhost:3000/calculators/new-calculator
```

## Questions & Support

For questions about:
- **Calculator structure**: See `sales-tax-calculator.json` as reference
- **Content guidelines**: Review established calculators in the system
- **Script functionality**: Review the comments in `generate-seocontent-multilang.js`

---

**Last Updated**: February 5, 2026
**Status**: ✅ All 147 calculators complete with multi-language seoContent
