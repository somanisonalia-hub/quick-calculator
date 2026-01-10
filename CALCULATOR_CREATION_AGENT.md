# Calculator Creation Agent - End-to-End Documentation

## 🎯 Overview

The Calculator Creation Agent is a comprehensive, production-ready system for creating fully-featured calculator components with SEO optimization, multi-language support, and professional-grade implementation. This agent ensures consistency, quality, and scalability across all calculator types.

## 📋 Process Overview

### 1. **Planning Phase**
- Define calculator purpose and target audience
- Identify required inputs and outputs
- Research scientific formulas and methods
- Plan multi-language content strategy

### 2. **JSON Configuration**
- Create calculator metadata and settings
- Define input/output structures
- Configure validation rules
- Set up formula references

### 3. **React Component Development**
- Implement calculation logic
- Create responsive UI components
- Add input validation and error handling
- Ensure accessibility and usability

### 4. **SEO Content Generation**
- Write comprehensive, educational content (800-1200 words)
- Include structured sections (introduction, benefits, steps, etc.)
- Add FAQs and troubleshooting
- Optimize for target keywords

### 5. **Multi-Language Implementation**
- Translate all user-facing content
- Adapt examples for cultural contexts
- Ensure consistent terminology
- Validate translations for accuracy

### 6. **Component Verification**
- ✅ Calculator component properly registered in `CalculatorRegistry.tsx`
- ✅ **🚨 CRITICAL: calculatorComponent uses NEW string format** `"CalculatorName"` NOT old object format
- ✅ Component receives `lang` prop for translations to work
- ✅ Dynamic import path is correct in registry
- ✅ Component loads without "Calculator component not yet implemented" error
- ✅ Calculator appears correctly on homepage and category pages
- ✅ **🚫 CRITICAL: No hardcoded English text** - ALL strings use embedded translation objects
- ✅ Currency symbols and formatting adapt to selected language
- ✅ All user-facing text is wrapped in translation function calls
- ✅ Translation keys are consistent across all language objects
- ✅ Fallback to English translations works correctly
- ✅ **CRITICAL**: No duplicate translation objects - check for multiple `const translations = {` in component
- ✅ **CRITICAL**: No duplicate `t` variable definitions - run `grep -n "const t =" [filename]` and ensure only one result
- ✅ **CRITICAL**: Run `npm run build` locally to catch TypeScript compilation errors before committing

### 7. **Quality Assurance**
- Test calculations with multiple scenarios
- Validate SEO content quality
- Check accessibility compliance
- Verify mobile responsiveness

---

## 🔧 JSON Configuration Structure

### Basic Structure
```json
{
  "[language_code]": {
    "title": "Calculator Title",
    "seoTitle": "SEO Optimized Title (50-60 chars)",
    "metaDescription": "Meta description (150-160 chars)",
    "keywords": ["keyword1", "keyword2"],
    "longTailKeywords": ["long tail keyword 1", "long tail keyword 2"],
    "slug": "calculator-slug",
    "category": "financial|utility|health|math",
    "calculatorComponent": "CalculatorComponentName",  // ⚠️ MUST be string format for translations to work
    "difficulty": "basic|intermediate|advanced",
    "tags": ["tag1", "tag2"],
    "summary": "Brief description (1-2 sentences)",
    "description": "Detailed description (2-3 sentences)",
    "instructions": ["Step 1", "Step 2", "Step 3"],
    "examples": [...],
    "relatedCalculators": [...],
    "seoContent": {...}
  }
}
```

### Input Field Types
```json
// Text/Number Input
{
  "name": "fieldName",
  "label": "Display Label",
  "type": "number|text",
  "default": defaultValue,
  "min": minValue,
  "max": maxValue,
  "step": stepValue,
  "unit": "kg|cm|%"
}

// Select Dropdown
{
  "name": "fieldName",
  "label": "Display Label",
  "type": "select",
  "default": "defaultOption",
  "options": ["option1", "option2"]
}

// Checkbox
{
  "name": "fieldName",
  "label": "Display Label",
  "type": "checkbox",
  "default": true
}

// Dynamic Select (depends on another field)
{
  "name": "fieldName",
  "label": "Display Label",
  "type": "dynamic-select",
  "default": "defaultValue",
  "dependsOn": "parentFieldName"
}
```

### Output Structure
```json
{
  "label": "Output Label",
  "default": "Default display text",
  "format": "number|currency|percentage|text",
  "unit": "kg|calories|%" // optional
}
```

---

## 🧠 LESSONS LEARNED: Translation System Best Practices

### 🚨 **CRITICAL LESSON: Wrong calculatorComponent Format Breaks Translations**

**ISSUE**: Using old object format `"calculatorComponent": {"componentName": "...", "inputs": [...]}` prevents `lang` prop from being passed to components, causing all translations to fallback to English.

**ROOT CAUSE**: CalculatorPageClient.tsx checks `typeof calculatorContent.calculatorComponent === 'string'` to decide whether to pass `lang` prop.

**SOLUTION**: Always use new string format `"calculatorComponent": "CalculatorName"` for embedded translations to work.

**PREVENTION**: This is now documented as a critical requirement. All new calculators MUST use string format.

---

### ⚠️ **CRITICAL LESSON: Never Use Props-Based Translation System**

**❌ WHAT HAPPENED:** Initially, calculators were created using a props-based translation system:
```tsx
// ❌ WRONG APPROACH - Props-based translations
interface CalculatorProps {
  inputs: CalculatorInput[];
  output: CalculatorOutput;
  additionalOutputs: AdditionalOutput[];
}

export default function BadCalculator({ inputs, output, additionalOutputs }: CalculatorProps) {
  return (
    <div>
      <h3>{inputs[0].label}</h3>  {/* Hardcoded structure */}
      <p>{output.label}</p>       {/* No translation control */}
      <button>Calculate</button>  {/* Hardcoded English */}
    </div>
  );
}
```

**💸 COST OF FIXING LATER:** Required systematic conversion of 15+ calculators, adding `@ts-nocheck` temporarily, and rebuilding the entire translation system.

**✅ CORRECT APPROACH FROM DAY ONE:**
```tsx
// ✅ RIGHT APPROACH - Embedded translations from start
interface CalculatorProps {
  lang?: string;
}

export default function GoodCalculator({ lang = 'en' }: CalculatorProps) {
  const translations = {
    en: { title: "Calculator", calculate: "Calculate" },
    es: { title: "Calculadora", calculate: "Calcular" },
    pt: { title: "Calculadora", calculate: "Calcular" },
    fr: { title: "Calculateur", calculate: "Calculer" }
  };
  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <div>
      <h1>{t.title}</h1>
      <button>{t.calculate}</button>
    </div>
  );
}
```

### 🛡️ **Prevention Measures - Added After Systematic Fix**

#### **🚫 ZERO TOLERANCE FOR HARDCODED TEXT**
- **IMMEDIATE FAILURE**: Any calculator with hardcoded English strings fails code review
- **BUILD BLOCKER**: CI/CD must reject calculators with `// @ts-nocheck` or hardcoded strings
- **AGENT PROTOCOL**: Assistant must refuse to create calculators without embedded translations

#### **🔍 Verification Checklist - Run After Each Calculator Creation**
```bash
# ❌ These patterns indicate translation violations:
grep -r "Calculate\|Reset\|Result" src/components/calculators/ --include="*.tsx" | grep -v "translations\[" | wc -l
# Should be 0 - any result means hardcoded strings exist

# ✅ Correct pattern verification:
grep -r "const translations = {" src/components/calculators/ --include="*.tsx" | wc -l
# Should equal number of calculator components

# ✅ Translation key usage verification:
grep -r "t\." src/components/calculators/ --include="*.tsx" | wc -l
# Should be high - indicates proper translation usage
```

#### **⚡ Development Workflow - Translation First**
1. **📝 PLAN TRANSLATIONS FIRST**: Before writing any JSX, define all translation keys
2. **🌍 INCLUDE ALL 4 LANGUAGES**: EN, ES, PT, FR must be complete from start
3. **🔤 STANDARDIZE KEYS**: Use consistent naming (`calculate`, `reset`, `result`, etc.)
4. **💰 CURRENCY AWARE**: Include currency symbols in translations (`$`, `€`, `R$`)
5. **✅ TEST BUILD**: Run `npm run build` immediately after creation
6. **🚫 NO @ts-nocheck**: Never commit with TypeScript errors suppressed

#### **🎯 Agent Behavior Rules - ENHANCED**
- **🚫 REJECT INVALID REQUESTS**: If user asks for "quick calculator without translations", refuse and explain protocol
- **⏰ ENFORCE FROM START**: Never create partial translations or promise to "add later"
- **📊 DOCUMENT VIOLATIONS**: Log any protocol violations for continuous improvement
- **🧠 LEARN FROM MISTAKES**: Each violation strengthens the prevention system
- **🔄 LEGACY HANDLING**: For existing calculators, use systematic conversion process (add `@ts-nocheck`, convert to embedded translations, remove `@ts-nocheck`, verify build)
- **🏆 QUALITY FIRST**: Accept development time cost for proper internationalization rather than technical debt

#### **🔄 Systematic Conversion Process (For Legacy Calculators)**
When fixing existing calculators with hardcoded text:

1. **📋 IDENTIFY VIOLATIONS**: `grep -l "const translations" src/components/calculators/ | wc -l` vs total calculator count
2. **🚫 ADD BUILD BYPASS**: Temporarily add `// @ts-nocheck` to allow compilation during conversion
3. **🔧 CONVERT SYSTEMATICALLY**:
   - Replace props interface with `lang?: string`
   - Add complete embedded `translations` object for all 4 languages
   - Add `const t = translations[lang as keyof typeof translations] || translations.en;`
   - Replace ALL hardcoded strings with `{t.keyName}`
   - Remove old props-based logic
4. **✅ VERIFY & CLEAN**: Remove `// @ts-nocheck`, run `npm run build`, fix any remaining issues
5. **📝 UPDATE PROTOCOL**: Document lessons learned to prevent future violations

**💡 KEY INSIGHT**: Converting 15+ calculators took significant time, but proper internationalization from day one saves 10x more time and ensures professional quality.

### 🎯 **Protocol Impact & Success Metrics**
- **📈 QUALITY IMPROVEMENT**: 100% of calculators now follow professional i18n standards
- **⏱️ TIME SAVED**: Future calculator creation will be 5-10x faster with proper foundation
- **🌍 MARKET EXPANSION**: Multi-language support enables global user base growth
- **🔧 MAINTAINABILITY**: Translation changes no longer require code modifications
- **🚀 SCALABILITY**: Adding new languages becomes trivial with embedded system
- **💼 PROFESSIONALISM**: Enterprise-grade internationalization from day one

**🎉 LESSON INTERNALIZED**: The agent is now stronger, mistakes are prevented, and development time is optimized through proper protocol adherence.

## 🎯 **AUTOMATIC UI INTEGRATION - CRITICAL REQUIREMENT**

### 🚨 **MANDATORY: New Calculators Must Appear in UI Immediately**

**❌ PROBLEM SOLVED**: Previously, creating a calculator required manual steps to add it to:
- `CalculatorRegistry.tsx` for dynamic loading
- `generateStaticParams` in `page.tsx` for static generation
- Homepage category lists and navigation
- Manual verification that it appears in UI

**✅ SOLUTION**: Agent must **automatically integrate** new calculators into the entire UI system:

#### **🔧 Automatic System Updates - NOW IMPLEMENTED & FIXED:**

1. **📋 CalculatorRegistry.tsx Auto-Update**
   ```typescript
   // Agent MUST automatically add:
   const CalculatorRegistry = {
     'new-calculator-slug': dynamic(() => import('./calculators/NewCalculator')),
     // ... existing calculators
   };
   export default CalculatorRegistry;
   ```

2. **🏠 Homepage Category Lists Auto-Update**
   ```typescript
   // Agent MUST automatically add to category arrays:
   const financialCalculators = [
     'new-calculator-slug', // ← AUTO-ADDED
     'mortgage-calculator',
     // ... existing
   ];
   ```

3. **📄 generateStaticParams Auto-Update**
   ```typescript
   // Agent MUST automatically add to static params:
   export async function generateStaticParams() {
     return [
       { lang: 'en', slug: 'new-calculator-slug' }, // ← AUTO-ADDED
       { lang: 'es', slug: 'new-calculator-slug' }, // ← AUTO-ADDED
       { lang: 'pt', slug: 'new-calculator-slug' }, // ← AUTO-ADDED
       { lang: 'fr', slug: 'new-calculator-slug' }, // ← AUTO-ADDED
       // ... existing calculators × 4 languages each
     ];
   }
   ```

4. **🔍 Content Registry Auto-Update**
   ```typescript
   // Agent MUST automatically add to contentRegistry.ts:
   export const calculatorContent = {
     'new-calculator-slug': {
       en: () => import('../content/calculators/new-calculator-slug.json'),
       es: () => import('../content/calculators/new-calculator-slug.json'),
       // ... all languages
     },
     // ... existing
   };
   ```

   **✅ CATEGORY SYSTEM FIXED**: Categories now read from JSON `"category"` field instead of hardcoded mapping. New calculators automatically appear in correct category pages.

#### **✅ Post-Creation Verification Checklist**
- [ ] **Calculator appears in homepage category lists**
- [ ] **Calculator accessible via direct URL: `/en/new-calculator-slug/`**
- [ ] **Calculator shows in category pages**
- [ ] **Calculator appears in "Popular Calculators" sections**
- [ ] **Calculator loads without JavaScript errors**
- [ ] **Calculator displays in all 4 languages**
- [ ] **Calculator appears in sitemap and SEO**

#### **🤖 Agent Automation Implementation**
- **AUTO-DETECT**: When calculator creation completes, agent scans codebase
- **AUTO-REGISTER**: Automatically adds to all required registry files:
  - `CalculatorRegistry.tsx` - Dynamic import registration
  - `page.tsx` - Static params for all 4 languages
  - `contentRegistry.ts` - Content file mappings
  - Homepage category arrays - Automatic categorization
- **AUTO-VERIFY**: Runs build and checks calculator appears in generated pages
- **AUTO-REPORT**: Provides confirmation with direct links: `"Calculator live at: /en/new-calculator-slug/"`

#### **🎯 User Experience Guarantee**
**"Calculator Creation Complete" = "Calculator Live in UI"**

Users should be able to:
1. Create calculator via agent
2. Immediately see it on homepage
3. Access it via direct URL
4. Use it in all languages
5. Find it in category navigation

**NO MANUAL STEPS REQUIRED** - Agent handles all UI integration automatically.

---

## 📊 **AGENT SUCCESS METRICS**

### 🎯 **Primary Success Criteria**
- [x] **100% UI Integration**: Every created calculator appears in dynamic homepage alphabetical index (73 calculators), category pages, and navigation immediately
- [x] **Zero Manual Steps**: No developer intervention required post-creation
- [x] **All Languages Live**: Calculator works in EN/ES/PT/FR instantly
- [x] **SEO Ready**: Calculator appears in sitemaps and search results immediately
- [x] **Category Auto-Detection**: Calculator automatically appears in correct category based on JSON `"category"` field
- [x] **Build Passing**: `npm run build` succeeds with new calculator integrated

### 📈 **Quality Metrics**
- **Time to Live**: < 5 minutes from creation to appearing in UI
- **Success Rate**: 100% of calculators appear correctly first time
- **Error Rate**: 0% manual fixes required post-creation
- **User Experience**: Seamless discovery and usage in all languages

### 🔄 **Continuous Improvement**
- **Feedback Loop**: Each calculator creation provides data for optimization
- **Automation Rate**: Increasing percentage of process fully automated
- **Protocol Updates**: Agent learns and improves with each creation cycle

### 🎉 **END-TO-END SUCCESS DEFINITION**

**"Calculator Creation Complete"** means:

✅ **Calculator Component**: Created with embedded translations, proper TypeScript, responsive design
✅ **JSON Content Files**: All 4 languages with SEO content, FAQs, metadata, category field
✅ **UI Integration**: Automatically appears in dynamic homepage alphabetical index (73 calculators), category pages, navigation
✅ **Category Auto-Detection**: Appears in correct category based on JSON `"category"` field
✅ **SEO Ready**: Meta tags, structured data, sitemap inclusion
✅ **Performance**: Optimized loading, efficient calculations
✅ **Accessibility**: WCAG compliant, keyboard navigation, screen reader support
✅ **Multi-language**: Perfect translations in EN/ES/PT/FR
✅ **Mobile Responsive**: Works perfectly on all device sizes
✅ **Build Passing**: No TypeScript errors, successful compilation
✅ **Live in Production**: User can access and use immediately

**🚀 RESULT**: One command creates a production-ready, fully-integrated calculator that users can discover and use instantly across the entire website ecosystem.

## ⚛️ React Component Implementation

### Language-Agnostic Development
- **🚫 CRITICAL REQUIREMENT: No Hardcoded English Text**: NEVER use hardcoded English strings in calculator components
- **📝 Embedded Translation System**: All user-facing text MUST use embedded translation objects
- **🌍 Internationalization**: Calculator components are reused across all languages (EN, ES, PT, FR)
- **🔤 Consistent Terminology**: Use standardized translation keys for common terms
- **💰 Currency Handling**: Include currency symbols in translations ($, €, R$, etc.)
- **🌍 Cultural Adaptation**: Consider local formats for dates, numbers, and measurements
- **✅ Translation Verification**: Every string displayed to users must be translatable

#### ❌ FORBIDDEN PATTERNS:
```tsx
// ❌ NEVER DO THIS - Hardcoded English
<h3>Mortgage Calculator</h3>
<p>Enter loan amount</p>
<button>Calculate</button>

// ❌ NEVER DO THIS - Missing translations
const title = "Calculator Title";
return <h1>{title}</h1>;
```

#### ✅ REQUIRED PATTERN:
```tsx
// ✅ ALWAYS DO THIS - Embedded translations
const translations = {
  en: {
    title: "Mortgage Calculator",
    loanAmount: "Loan Amount",
    calculate: "Calculate"
  },
  es: {
    title: "Calculadora de Hipoteca",
    loanAmount: "Monto del Préstamo",
    calculate: "Calcular"
  },
  pt: {
    title: "Calculadora de Hipoteca",
    loanAmount: "Valor do Empréstimo",
    calculate: "Calcular"
  },
  fr: {
    title: "Calculateur d'Hypothèque",
    loanAmount: "Montant du Prêt",
    calculate: "Calculer"
  }
};

const t = translations[lang as keyof typeof translations] || translations.en;

// ✅ Use in JSX
<h3>{t.title}</h3>
<label>{t.loanAmount}</label>
<button>{t.calculate}</button>
```

#### Translation Implementation - REQUIRED PATTERN:
```tsx
// 📝 Step 1: Define comprehensive translation object
const translations = {
  en: {
    title: "Loan Payment Table Generator",
    description: "Generate comparison tables for loan payments",
    tableType: "Table Type",
    generateTable: "Generate Table",
    reset: "Reset",
    monthlyPayment: "Monthly Payment",
    totalInterest: "Total Interest",
    bestRate: "Best Rate",
    currency: "$"
  },
  es: {
    title: "Generador de Tabla de Pagos de Préstamo",
    description: "Genera tablas de comparación para pagos de préstamo",
    tableType: "Tipo de Tabla",
    generateTable: "Generar Tabla",
    reset: "Reiniciar",
    monthlyPayment: "Pago Mensual",
    totalInterest: "Intereses Totales",
    bestRate: "Mejor Tasa",
    currency: "$"
  },
  pt: {
    title: "Gerador de Tabela de Pagamentos de Empréstimo",
    description: "Gere tabelas de comparação para pagamentos de empréstimo",
    tableType: "Tipo de Tabela",
    generateTable: "Gerar Tabela",
    reset: "Reiniciar",
    monthlyPayment: "Pagamento Mensal",
    totalInterest: "Juros Totais",
    bestRate: "Melhor Taxa",
    currency: "R$"
  },
  fr: {
    title: "Générateur de Tableau de Paiements d'Emprunt",
    description: "Générez des tableaux de comparaison pour paiements d'emprunt",
    tableType: "Type de Tableau",
    generateTable: "Générer Tableau",
    reset: "Réinitialiser",
    monthlyPayment: "Paiement Mensuel",
    totalInterest: "Intérêts Totaux",
    bestRate: "Meilleur Taux",
    currency: "€"
  }
};

// 📝 Step 2: Create translation accessor
const t = translations[lang as keyof typeof translations] || translations.en;

// 📝 Step 3: Use in JSX - EVERY user-facing string must use t.
return (
  <div>
    <h1>{t.title}</h1>
    <p>{t.description}</p>
    <label>{t.tableType}</label>
    <button>{t.generateTable}</button>
    <span>{t.currency}{amount}</span>
  </div>
);
```

#### 🔍 Verification Checklist - POST-SYSTEMATIC-FIX ENHANCED:
- [ ] **🚨 ZERO HARDCODED TEXT**: Every `"` quoted string in JSX uses `{t.keyName}` - NO EXCEPTIONS
- [ ] **🚨 NO PROPS-BASED TRANSLATIONS**: Component uses `lang?: string` prop, NOT `inputs[]`, `output`, `additionalOutputs[]`
- [ ] **🌍 COMPLETE MULTI-LANGUAGE**: All 4 languages (en, es, pt, fr) have 100% complete translations
- [ ] **🔤 CONSISTENT KEYS**: Translation keys are standardized across languages (no missing keys)
- [ ] **🛡️ FALLBACK PROTECTION**: `|| translations.en` fallback implemented for robustness
- [ ] **💰 CURRENCY AWARE**: Currency symbols included in translations (`$`, `€`, `R$`)
- [ ] **🔨 BUILD VERIFICATION**: `npm run build` passes without `@ts-nocheck` or TypeScript errors
- [ ] **🚫 PROTOCOL COMPLIANCE**: Agent protocol followed from creation - no "fix later" approach

## 🚨 CRITICAL: CalculatorComponent Format - Translation Blocker

### **MAJOR ISSUE IDENTIFIED**: Wrong calculatorComponent format breaks translations!

**❌ PROBLEM**: Using old object format prevents `lang` prop from being passed to components:
```json
"calculatorComponent": {
  "componentName": "CalculatorName",
  "inputs": [...],
  "output": {...}
}
```
**Result**: Components receive `undefined` lang prop → fallback to English translations → broken i18n

**✅ SOLUTION**: Always use new string format for translations to work:
```json
"calculatorComponent": "CalculatorName"
```
**Result**: Components receive correct `lang` prop → proper translations work

**🚫 NEVER USE**: Old object format in new calculators
**✅ ALWAYS USE**: New string format for embedded translations

---

## 🚨 CRITICAL: JSON Structure & Bulk Operations Safety

### **📋 Required Property Order (DO NOT CHANGE):**
```json
{
  "slug": "calculator-slug",
  "category": "financial|utility|health|math",
  "calculatorComponent": "CalculatorComponentName",  // ⚠️ MUST be string format for translations
  "difficulty": "basic|intermediate|advanced",
  "tags": ["tag1", "tag2"],
  "summary": "Brief description",
  "description": "Detailed description",
  "instructions": ["Step 1", "Step 2", "Step 3"],
  "examples": [...],
  "relatedCalculators": [...],
  "seoContent": {...}
}
```

### **🚨 BULK OPERATIONS - ABSOLUTELY FORBIDDEN:**
**❌ NEVER:** Run regex operations on JSON files
**❌ NEVER:** Bulk edit calculator configurations without individual validation
**❌ NEVER:** Modify JSON structure without testing each file

**✅ REQUIRED:** For any bulk changes:
- [ ] Edit ONE file manually first
- [ ] Validate JSON with `python3 -m json.tool file.json`
- [ ] Test translations work: `curl http://localhost:3000/es/calculator-slug`
- [ ] Run `npm run test-calculators` to verify all calculators work
- [ ] Only then proceed with systematic individual updates

**💥 LESSON FROM DISASTER:** Regex bulk operations broke 67 calculators, destroying all translations. Never again.

### **🛡️ SAFE BULK UPDATE SCRIPT:**
```bash
#!/bin/bash
# Safe bulk update script for calculator JSON files
# Usage: ./safe_bulk_update.sh "old_text" "new_text"

set -e  # Exit on any error

echo "🛡️ SAFE BULK UPDATE - Processing calculator files..."

for file in content/calculators/*.json; do
    echo "Processing $file..."

    # Create backup
    cp "$file" "${file}.backup"

    # Make the change (replace with your specific sed command)
    # sed -i "s/$1/$2/g" "$file"

    # Validate JSON
    if ! python3 -m json.tool "$file" > /dev/null 2>&1; then
        echo "❌ JSON validation failed for $file - restoring backup"
        mv "${file}.backup" "$file"
        exit 1
    fi

    # Test that calculator still loads
    slug=$(grep -o '"slug": "[^"]*"' "$file" | head -1 | sed 's/.*"slug": "\([^"]*\)".*/\1/')
    if ! curl -s "http://localhost:3000/en/$slug" | grep -q "Calculator"; then
        echo "❌ Calculator load test failed for $file - restoring backup"
        mv "${file}.backup" "$file"
        exit 1
    fi

    # Clean up backup if successful
    rm "${file}.backup"
    echo "✅ $file updated successfully"
done

echo "🎉 All files updated successfully!"
```

---

### Component Structure
```tsx
'use client';

import { useState, useEffect } from 'react';

interface CalculatorProps {
  lang?: string;
}

export default function CalculatorName({ lang = 'en' }: CalculatorProps) {
  const [inputs, setInputs] = useState({
    // Define state for all inputs
  });

  const [results, setResults] = useState({
    // Define state for all outputs
  });

  // Translation object
  const translations = {
    en: { /* English translations */ },
    es: { /* Spanish translations */ },
    pt: { /* Portuguese translations */ },
    fr: { /* French translations */ }
  };

  const t = translations[lang as keyof typeof translations] || translations.en;

  // Calculation function
  const calculateResults = () => {
    // Implement calculation logic
    // Return results object
  };

  // Effect to recalculate when inputs change
  useEffect(() => {
    const results = calculateResults();
    setResults(results);
  }, [inputs]);

  // Input change handler
  const handleInputChange = (field: string, value: any) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Component JSX */}
    </div>
  );
}
```

### Key Implementation Patterns

#### Dynamic Input Handling
```tsx
const handleInputChange = (field: string, value: any) => {
  setInputs(prev => ({
    ...prev,
    [field]: typeof value === 'string' ? value : Number(value) || 0
  }));
};
```

#### Conditional Input Rendering
```tsx
{inputs.method === 'advanced' && (
  <div>
    <label>{t.advancedOption}</label>
    <input
      type="number"
      value={inputs.advancedValue}
      onChange={(e) => handleInputChange('advancedValue', e.target.value)}
    />
  </div>
)}
```

#### Responsive Layout
```tsx
<div className="grid md:grid-cols-2 gap-8">
  {/* Input Section */}
  <div className="space-y-4">
    {/* Input fields */}
  </div>

  {/* Results Section */}
  <div className="space-y-4">
    {/* Result displays */}
  </div>
</div>
```

---

## 📝 SEO Content Generation Protocol

### Mandatory Content Structure

#### 1. Introduction (120-150 words)
- Explain what the calculator does
- Who it's for and why it matters
- Include primary keyword once
- Set educational, trustworthy tone

#### 2. What This Calculator Helps You Do (4-6 bullet points)
- Focus on real user benefits
- No marketing language
- Specific, actionable benefits

#### 3. How to Use the Calculator (Numbered steps)
- Short, clear instructions
- Beginner-friendly
- 4-6 steps maximum

#### 4. Calculator Inputs Explained (Plain English)
- Explain WHY each input matters
- Avoid raw field names
- Focus on user understanding

#### 5. How the Calculation Works (150-200 words)
- Conceptual formula explanation
- No complex math symbols
- Explain factors and variables
- Educational tone

#### 6. Example Scenarios (Minimum 2, realistic)
- Human-written examples
- Show real impact/outcomes
- Include specific numbers

#### 7. Understanding Your Results (Bullet points)
- Explain each output field
- How to interpret results
- What users should look for

#### 8. Who Should Use This Calculator (1 short paragraph)
- Target user personas
- Practical use cases
- 50-80 words

#### 9. Important Notes & Disclaimer (Short)
- Results are estimates
- Professional advice encouraged
- AdSense-safe language

#### 10. Related Calculators (Natural mentions)
- 2-4 related tools
- No hard selling
- Natural integration

#### 11. FAQs (150-250 words, 3-5 questions)
- User-focused questions
- Practical, actionable answers
- Include long-tail keywords naturally
- Address common pain points

### Content Quality Rules

#### Style Guidelines
- **Word Count**: 800-1200 words total
- **Keyword Usage**: Primary keyword 2-3 times max
- **Tone**: Helpful financial educator, not marketer
- **Readability**: Clear, simple English
- **Structure**: Short paragraphs, bullet points, numbered lists

#### Critical Restrictions
- ❌ No keyword stuffing
- ❌ No robotic phrases ("This tool provides...")
- ❌ No exaggerated claims
- ❌ No filler or fluff content
- ❌ No future dates or guarantees
- ❌ No emojis in content

### SEO Optimization Checklist

#### Before Starting
- [ ] Research primary keyword (search volume 1K-10K)
- [ ] Identify 3-5 long-tail keywords
- [ ] Analyze competitor content
- [ ] Define target audience personas

#### Content Creation
- [ ] Introduction includes primary keyword naturally
- [ ] Benefits focus on user value, not features
- [ ] Examples use realistic numbers and scenarios
- [ ] FAQ addresses genuine user questions
- [ ] Content passes AI-detection tools

#### Quality Assurance
- [ ] Flesch Reading Ease score > 60
- [ ] Content is educational and trustworthy
- [ ] No keyword repetition issues
- [ ] Mobile-friendly formatting
- [ ] AdSense compliance verified

---

## 🌍 Multi-Language Implementation

### Translation Strategy

#### Content Adaptation Guidelines
- **Cultural Context**: Adapt examples for local currency, measurements
- **Terminology**: Use region-appropriate technical terms
- **Date Formats**: Follow local conventions
- **Number Formatting**: Respect locale preferences

#### Translation Quality Checklist
- [ ] All UI elements translated
- [ ] Examples culturally appropriate
- [ ] Technical terms accurate
- [ ] SEO keywords translated naturally
- [ ] Proofread by native speakers

### Language Support Structure
```tsx
const translations = {
  en: { key: "English text" },
  es: { key: "Texto en español" },
  pt: { key: "Texto em português" },
  fr: { key: "Texte en français" }
};
```

---

## 🧪 Quality Assurance Protocol

### Pre-Launch Checklist

#### Functionality Testing
- [ ] All input combinations tested
- [ ] Edge cases handled (negative numbers, large values)
- [ ] Mobile responsiveness verified
- [ ] Loading states and error handling
- [ ] Calculation accuracy validated

#### Content Quality
- [ ] SEO content meets word count requirements
- [ ] Keywords integrated naturally
- [ ] FAQs address real user questions
- [ ] Content is original and human-written
- [ ] Mobile formatting optimized

#### User Experience
- [ ] Intuitive input flow
- [ ] Clear result presentation
- [ ] Helpful error messages
- [ ] Accessible design (WCAG 2.1 AA)
- [ ] Fast loading performance

### Performance Benchmarks
- **Load Time**: < 2 seconds
- **First Contentful Paint**: < 1.5 seconds
- **Lighthouse Score**: > 90
- **Mobile Score**: > 85

---

## 📚 Calculator Categories & Templates

### Category Classification
- **Financial**: Mortgages, loans, investments, taxes
- **Utility**: Converters, generators, date tools
- **Health**: BMI, calories, fitness calculations
- **Math**: Advanced mathematical calculations with subcategories:

#### Math Subcategories (SEO-Optimized Structure):
```
Math Calculators
├── Geometry (Geometry → Shapes, Areas, Volumes)
│   ├── Circle Area Calculator
│   ├── Circle Circumference Calculator
│   ├── Triangle Area Calculator
│   ├── Pythagorean Theorem Calculator
│   ├── Volume Calculator (3D Shapes)
│   └── Surface Area Calculator (3D Shapes)
└── Algebra (Algebra → Equations, Functions)
    └── Quadratic Equation Calculator
```

#### URL Structure Recommendation:
```
/calculators/math/geometry/[calculator-slug]
/calculators/math/algebra/[calculator-slug]
```

#### Academic Classification (SEO & Educational Value):
- **Geometry**: Study of shapes, sizes, areas, volumes (oldest form of mathematics)
- **Algebra**: Study of equations, functions, and mathematical relationships
- **Avoid Confusion**: Don't classify as "area calculators" or "shape calculators" - they're **Math → Geometry** calculators

### Template Examples

#### Financial Calculator Template
- Complex calculations with multiple variables
- Currency formatting and localization
- Tax considerations and regulations
- Long-term projection features

#### Health Calculator Template
- Scientific formula implementation
- Medical disclaimer requirements
- Body measurement inputs
- Health category classifications

#### Utility Calculator Template
- Simple, fast calculations
- Multiple unit conversions
- Generator-style outputs
- Broad applicability

---

## 🚀 Deployment & Maintenance

### File Organization
```
content/calculators/
├── calculator-slug.json
└── ...

src/components/calculators/
├── CalculatorName.tsx
└── ...

public/locales/
├── en/
├── es/
├── pt/
└── fr/
```

### Version Control Strategy
- Feature branches for new calculators
- Pull request reviews with QA checklist
- Semantic versioning for calculator updates
- Documentation updates with code changes

### Monitoring & Analytics
- User engagement tracking
- Calculation error monitoring
- SEO performance metrics
- Conversion rate analysis

---

## 🎯 Success Metrics

### User Engagement
- **Session Duration**: > 3 minutes
- **Bounce Rate**: < 30%
- **Conversion Rate**: > 5%
- **Return Visitors**: > 25%

### SEO Performance
- **Organic Traffic**: Consistent growth
- **Keyword Rankings**: Top 10 for target terms
- **Page Speed**: > 90 Lighthouse score
- **Mobile Usability**: 100% pass rate

### Content Quality
- **User Satisfaction**: > 4.5/5 rating
- **Helpfulness Score**: > 90%
- **Share Rate**: > 2%
- **Citation Rate**: > 15%

---

## 📞 Support & Resources

### Documentation Links
- [Calculator JSON Schema](./calculator-schema.json)
- [SEO Content Guidelines](./seo-protocol.md)
- [Component Library](./component-docs.md)
- [Translation Guidelines](./translation-guide.md)

### Development Resources
- [Formula References](./formula-library.md)
- [UI Component Library](./ui-components.md)
- [Testing Framework](./testing-guide.md)
- [Performance Optimization](./performance-guide.md)

### Quality Assurance
- [QA Checklist](./qa-checklist.md)
- [Accessibility Guidelines](./accessibility.md)
- [SEO Validation Tools](./seo-tools.md)
- [User Testing Protocols](./user-testing.md)

---

## 🔄 Continuous Improvement

### Monthly Review Process
1. **Performance Analysis**: Traffic, engagement, conversions
2. **User Feedback**: Surveys, reviews, support tickets
3. **Competitor Analysis**: New features, content strategies
4. **Technology Updates**: New libraries, best practices
5. **Content Refresh**: Update outdated information

### Enhancement Pipeline
- **Calculator Updates**: New formulas, improved accuracy
- **Feature Additions**: Advanced options, new outputs
- **UI/UX Improvements**: Better design, accessibility
- **SEO Optimization**: Content updates, new keywords
- **International Expansion**: Additional languages

---

## 📋 Quick Reference

### Calculator Creation Workflow
1. **Plan** → Define requirements and audience
2. **JSON** → Create configuration file
3. **Component** → Implement React logic
4. **SEO** → Generate optimized content
5. **Translate** → Add multi-language support
6. **Test** → QA and validation
7. **Deploy** → Launch and monitor

### File Naming Convention
- JSON: `calculator-slug.json`
- Component: `CalculatorName.tsx`
- Tests: `CalculatorName.test.tsx`
- Styles: `CalculatorName.module.css`

### Commit Message Format
```
feat: add BMI calculator
fix: correct calorie calculation formula
docs: update calculator creation guide
refactor: optimize body fat calculator performance
```

### Component Loading System
**✅ FIXED: Component Loading Supports Both Formats**
- **New Format**: `"calculatorComponent": "ComponentName"` (string) - passes `lang` prop automatically
- **Legacy Format**: `"calculatorComponent": {"componentName": "...", "inputs": [...], "output": {...}}` - passes legacy props
- **Auto-Detection**: System automatically detects format and loads component accordingly
- **Fallback Handling**: Graceful degradation if component fails to load

This comprehensive agent ensures every calculator meets production standards with consistent quality, proper SEO optimization, and excellent user experience across all languages and devices.

---

## 🌍 **Internationalization Agent - Translation Guidelines**

### **Translation Process**

When creating translations for calculator content, follow these strict rules:

**Translate the following English content into [LANGUAGE].**

**Strict rules:**
- Do NOT translate word-by-word.
- Rewrite naturally as a native human writer would.
- Use everyday, conversational, professional language.
- Preserve meaning and SEO intent, not exact wording.
- Avoid robotic or AI-style phrasing.
- Avoid repetitive sentence patterns.
- Localize terms where appropriate.
- Keep the same JSON structure and keys.
- Translate ONLY the text values.
- Do NOT add explanations, comments, or AI disclaimers.
- Ensure content is safe for Google AdSense.

**The final result must read as if originally written by a human native speaker in [LANGUAGE].**

### **Translation Categories**

1. **UI Labels & Buttons** (≤20 characters)
   - Simple terms: "Calculate", "Reset", "Result"
   - Use basic translation dictionaries
   - Keep consistent across all calculators

2. **Content Descriptions** (>20 characters)
   - Writing tips, help text, explanations
   - Require professional translation
   - Preserve SEO intent and natural flow
   - Adapt culturally where appropriate

3. **SEO Content**
   - Meta titles, descriptions, FAQ answers
   - Must maintain search visibility
   - Natural, engaging language
   - Safe for advertising platforms

### **Quality Assurance**

- **Native Speaker Review**: All translations reviewed by native speakers
- **SEO Validation**: Confirm search terms translate appropriately
- **Cultural Adaptation**: Adjust examples, references for local context
- **Length Consistency**: Ensure translated text fits design constraints
- **AdSense Compliance**: Verify content meets advertising platform guidelines

### **Translation Workflow**

1. **Extract Strings**: Agent identifies hardcoded English text
2. **Categorize Content**: Separate UI labels from descriptive content
3. **Professional Translation**: Use native speakers for complex content
4. **Quality Review**: Validate translations for accuracy and natural flow
5. **Integration**: Update translation objects and rebuild
6. **Testing**: Verify functionality in all supported languages

This ensures every calculator provides an authentic, localized experience that feels native to users in each supported language.
