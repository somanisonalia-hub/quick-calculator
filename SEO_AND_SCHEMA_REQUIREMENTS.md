# SEO & Schema Requirements for Calculators

## Complete seoContent Structure (REQUIRED)

Every calculator JSON file MUST have a complete `seoContent` object for each language with these fields:

```typescript
seoContent: {
  en: {
    introduction: string;              // 150-200 words, opening paragraph
    benefits: string[];                // 5-7 benefits as bullet points
    steps: string[];                   // 4-6 step-by-step guide
    inputsExplained: string[];         // Explain each input field (2-4 fields)
    formulaExplanation: string;        // Mathematical explanation
    whoItsFor: string;                 // 100+ word paragraph on target audience
    disclaimer: string;                // Legal/accuracy disclaimer
    relatedTools: string[];            // 3-5 related calculator names
    faqs: Array<{
      question: string;               // User-friendly question
      answer: string;                 // 50-100 word answer
    }>;                               // Minimum 3 FAQs, maximum 8
  },
  es: { /* identical structure */ },
  pt: { /* identical structure */ },
  fr: { /* identical structure */ }
}
```

### Field Specifications

| Field | Min | Max | Content Type | Required |
|-------|-----|-----|--------------|----------|
| introduction | 150 | 300 | Paragraph | ✅ Yes |
| benefits | 5 | 8 | Array of strings | ✅ Yes |
| steps | 3 | 6 | Array of strings | ✅ Yes |
| inputsExplained | 2 | 5 | Array of strings | ✅ Yes |
| formulaExplanation | 100 | 300 | Paragraph | ✅ Yes |
| whoItsFor | 100 | 250 | Paragraph | ✅ Yes |
| disclaimer | 50 | 200 | Paragraph | ✅ Yes |
| relatedTools | 3 | 5 | Array of strings | ✅ Yes |
| faqs | 3 | 8 | Array of objects | ✅ Yes |
| faq.question | 10 | 100 | Question text | ✅ Yes |
| faq.answer | 50 | 150 | Answer text | ✅ Yes |

---

## Complete JSON File Structure (ALL FIELDS REQUIRED)

Every calculator JSON file must include:

```json
{
  "en": {
    // SEO Meta Tags
    "title": "String",                          // Max 60 characters
    "seoTitle": "String",                       // 50-65 chars with keyword
    "metaDescription": "String",                // 150-160 characters
    "slug": "kebab-case-calculator",            // Must match URL
    
    // Categorization
    "category": "utility|financial|health|math|lifestyle",
    "difficulty": "basic|intermediate|advanced",
    "tags": ["tag1", "tag2", "tag3"],          // 3-5 tags
    "emoji": "🎨",                             // One emoji for visual ID
    
    // Keywords for SEO
    "keywords": [                              // Exactly 5
      "primary keyword",
      "keyword 2",
      "keyword 3",
      "keyword 4",
      "keyword 5"
    ],
    "longTailKeywords": [                      // Exactly 5
      "long tail keyword 1",
      "long tail keyword 2",
      "long tail keyword 3",
      "long tail keyword 4",
      "long tail keyword 5"
    ],
    
    // Descriptions
    "summary": "String",                        // 1 sentence (< 100 chars)
    "description": "String",                   // 2-3 sentences
    "instructions": [                          // 3-5 steps
      "Step 1",
      "Step 2",
      "Step 3"
    ],
    
    // Calculator Configuration
    "calculatorComponent": "ComponentName",    // PascalCase
    "component": "ComponentName",              // Same as above
    
    // Related Content
    "relatedCalculators": [                    // 3-5 slug references
      "related-calculator-1",
      "related-calculator-2",
      "related-calculator-3"
    ],
    
    // Rich Content
    "seoContent": {
      "introduction": "String (150-200 words)",
      "benefits": ["benefit1", "benefit2", "benefit3"],
      "steps": ["step1", "step2", "step3"],
      "inputsExplained": ["input1 explained", "input2 explained"],
      "formulaExplanation": "String (100+ words)",
      "whoItsFor": "String (100+ words)",
      "disclaimer": "String (50+ words)",
      "relatedTools": ["tool1", "tool2", "tool3"],
      "faqs": [
        {
          "question": "Question?",
          "answer": "Answer (50-150 words)"
        }
      ]
    },
    
    // Component Configuration (Optional but Recommended)
    "calculatorComponent": {
      "inputs": [
        {
          "name": "fieldName",
          "label": "Field Label",
          "type": "number|text|select",
          "default": 0,
          "min": 0,
          "max": 100,
          "step": 1,
          "unit": "$"
        }
      ],
      "formula": "Mathematical formula explanation",
      "outputs": [
        {
          "name": "outputName",
          "label": "Output Label",
          "unit": "$",
          "format": "decimal|integer|currency|percentage"
        }
      ]
    },
    
    // Examples (Optional but Recommended)
    "examples": [
      {
        "title": "Example Title",
        "input": {
          "field": "value"
        },
        "output": {
          "result": "value"
        },
        "explanation": "Why this is an example"
      }
    ]
  },
  "es": { /* All fields in Spanish */ },
  "pt": { /* All fields in Portuguese */ },
  "fr": { /* All fields in French */ }
}
```

---

## Structured Data / Schema Requirements

### JSON-LD Schema (Required for SEO)

Every calculator page MUST include these in the page's `<head>` via StructuredData component:

```typescript
// Schema should be generated dynamically based on calculator data
const schemaData = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",  // or "Tool"
  "name": "{calculator.title}",
  "description": "{calculator.description}",
  "url": "{full_url_with_language}",
  "inLanguage": "en",  // or es, pt, fr
  "author": {
    "@type": "Organization",
    "name": "Quick Calculator"
  },
  "creator": {
    "@type": "Organization",
    "name": "Quick Calculator"
  },
  "datePublished": "2025-01-01",
  "dateModified": "{last_update_date}",
  "image": {
    "@type": "ImageObject",
    "url": "{calculator_icon_or_image}",
    "width": 200,
    "height": 200
  },
  "keywords": "{keywords.join(', ')}",
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web"
}
```

### Calculator-Specific Schema

```typescript
const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "CalculatorTool",  // Custom type
  "name": "{calculator.title}",
  "description": "{calculator.description}",
  "category": "{calculator.category}",
  "difficulty": "{calculator.difficulty}",
  "inputs": calculator.inputs.map(input => ({
    "@type": "PropertyValue",
    "name": input.label,
    "type": input.type,
    "unit": input.unit || "None"
  })),
  "outputs": calculator.outputs.map(output => ({
    "@type": "PropertyValue",
    "name": output.label,
    "unit": output.unit || "None"
  }))
}
```

### FAQ Schema

```typescript
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": calculator.seoContent.faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
}
```

---

## Component Requirements for SEO

### Meta Tags (Next.js Metadata)

```typescript
export const metadata = {
  title: calculator.seoTitle,           // 50-65 chars
  description: calculator.metaDescription, // 150-160 chars
  keywords: calculator.keywords.join(', '),
  openGraph: {
    title: calculator.seoTitle,
    description: calculator.metaDescription,
    type: 'website',
    images: [{
      url: `/images/calculators/${calculator.slug}.png`,
      width: 1200,
      height: 630
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: calculator.seoTitle,
    description: calculator.metaDescription,
    image: `/images/calculators/${calculator.slug}.png`
  },
  alternates: {
    canonical: `/en/calculators/${calculator.slug}`,
    languages: {
      'es': `/es/calculators/${calculator.slug}`,
      'pt': `/pt/calculators/${calculator.slug}`,
      'fr': `/fr/calculators/${calculator.slug}`
    }
  }
}
```

### Structured Data Component Placement

```typescript
// In calculator component, before closing </main> or at end of component
<StructuredData 
  data={[
    createSchema(calculator, language),
    createCalculatorSchema(calculator),
    createFaqSchema(calculator.seoContent.faqs)
  ]}
/>

// StructuredData component renders JSON-LD in <script> tags
const StructuredData = ({ data }) => (
  <>
    {data.map((schema, idx) => (
      <script
        key={idx}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    ))}
  </>
)
```

---

## SEO Content Best Practices

### Introduction Section
- ✅ Start with the problem the calculator solves
- ✅ Mention the tool name within first 50 words
- ✅ Include primary keyword naturally
- ✅ 150-200 words minimum
- ❌ Don't keyword stuff
- ❌ Don't use clickbait language

### Benefits Section
- ✅ List 5-7 specific, tangible benefits
- ✅ User-focused language (how it helps THEM)
- ✅ Quantifiable when possible ("Save 30 min per calculation")
- ❌ Marketing hyperbole
- ❌ Generic benefits that apply to any tool

### Steps Section
- ✅ 4-6 clear, numbered steps
- ✅ Action-oriented verbs (Enter, Specify, Review)
- ✅ Specific field names from calculator
- ✅ Short sentences (one action per step)
- ❌ Technical jargon
- ❌ Assumption of prior knowledge

### Formula Explanation
- ✅ Explain the math in plain English
- ✅ Break down components
- ✅ Explain what each variable means
- ✅ Real-world context
- ❌ Just show the formula
- ❌ Assume advanced math knowledge

### FAQs
- ✅ Address common user misconceptions
- ✅ Include variations of primary keywords
- ✅ Answer in 50-150 words (complete but concise)
- ✅ 3-8 FAQs per calculator
- ✅ Start with question format users search
- ❌ Duplicate Google's answers
- ❌ Create fake questions
- ❌ Vague or unhelpful answers

---

## QA Checklist for seoContent Completeness

Before registering a calculator, verify:

### Content Completeness (All 4 Languages)
- [ ] English introduction: 150-200 words
- [ ] Spanish introduction: 150-200 words
- [ ] Portuguese introduction: 150-200 words
- [ ] French introduction: 150-200 words
- [ ] All 4 languages have identical seoContent structure
- [ ] No field is missing from any language version

### Keywords
- [ ] Exactly 5 primary keywords per language
- [ ] Exactly 5 long-tail keywords per language
- [ ] Keywords are unique (not duplicates)
- [ ] Keywords match search volume research
- [ ] Primary keyword appears in seoTitle

### Description/Meta
- [ ] seoTitle is 50-65 characters
- [ ] seoTitle includes primary keyword
- [ ] metaDescription is 150-160 characters
- [ ] metaDescription is compelling and includes keyword
- [ ] All 4 languages have different translations (not English defaults)

### Rich Content
- [ ] Benefits: exactly 5-7 per language
- [ ] Steps: exactly 3-6 per language
- [ ] FAQs: 3-8 per language (must be 3 minimum)
- [ ] Each FAQ has question + answer (50-150 words)
- [ ] Related tools listed (3-5 per language)
- [ ] Disclaimer present and comprehensive

### Schema & Markup
- [ ] Component will render JSON-LD schemas
- [ ] canonical URLs correct for all language variants
- [ ] og: tags specified
- [ ] hreflang tags present for all 4 language versions

### Structure Verification
```bash
# Command to verify seoContent completeness
jq 'to_entries[] | .key as $lang | .value.seoContent | 
  if (.introduction | length) > 150 then "✓" else "✗" end, 
  (.benefits | length), 
  (.steps | length), 
  (.faqs | length)' content/calculators/your-calculator.json
```

Expected output for each language:
```
✓
6-7 (benefits count)
3-6 (steps count)
3-8 (faqs count)
```

---

## Missing seoContent Audit

To find calculators missing complete seoContent:

```bash
# Find calculators with missing or incomplete seoContent
cd content/calculators
for file in *.json; do
  if ! grep -q '"introduction"' "$file"; then
    echo "❌ $file - Missing introduction"
  fi
  
  if ! grep -q '"benefits"' "$file"; then
    echo "❌ $file - Missing benefits"
  fi
  
  if ! grep -q '"faqs"' "$file"; then
    echo "❌ $file - Missing FAQs"
  fi
done

# Count FAQs in each file
for file in *.json; do
  count=$(grep -c '"question"' "$file")
  if [ "$count" -lt 3 ]; then
    echo "⚠️  $file - Only $count FAQs (minimum 3 required)"
  fi
done
```

---

## Schema Validation

### Testing JSON-LD Schema

Use Google's structured data tester:
1. Copy JSON-LD from rendered page source
2. Paste into: https://schema.org/validate/
3. Verify no errors or warnings
4. Check all recommended properties included

### Testing Rich Snippets

Use Google Search Console:
1. Submit calculator URLs
2. Check "Rich Results" report
3. Verify FAQPage, Calculator, and CreativeWork appear
4. Monitor CTR improvement from rich snippets

---

## Revenue Impact of Complete SEO

Calculators with complete seoContent see:
- **+30% better Click-Through Rate (CTR)** from SERPs (rich snippets)
- **+25% longer time on page** (from FAQs and related tools)
- **+40% lower bounce rate** (users find answers)
- **+2-3x AdSense RPM** (higher quality, engaged visitors)

**Example**: 
- Electricity Calculator (50k searches)
- Without complete seoContent: ~$50-80/month
- With complete seoContent: ~$120-180/month
- Difference: **+$70-100/month from single calculator**

---

## Agent Task: seoContent Verification

When adding a new calculator, agent MUST:

1. **Verify All 4 Languages**
   ```typescript
   const languages = ['en', 'es', 'pt', 'fr'];
   languages.forEach(lang => {
     if (!data[lang].seoContent) throw new Error(`Missing seoContent for ${lang}`);
     if (data[lang].seoContent.introduction.length < 150) throw new Error(`Introduction too short for ${lang}`);
   });
   ```

2. **Check Field Completeness**
   ```typescript
   const requiredSeoFields = [
     'introduction', 'benefits', 'steps', 'inputsExplained',
     'formulaExplanation', 'whoItsFor', 'disclaimer', 'relatedTools', 'faqs'
   ];
   ```

3. **Validate FAQs**
   ```typescript
   if (data.seoContent.faqs.length < 3) throw new Error('Need at least 3 FAQs');
   data.seoContent.faqs.forEach(faq => {
     if (!faq.question || !faq.answer) throw new Error('FAQ missing question or answer');
     if (faq.answer.length < 50) throw new Error('FAQ answer too short');
   });
   ```

4. **Verify Keywords**
   ```typescript
   if (data.keywords.length !== 5) throw new Error('Need exactly 5 keywords');
   if (data.longTailKeywords.length !== 5) throw new Error('Need exactly 5 long-tail keywords');
   ```

---

## Migration Task: Fix Incomplete Calculators

For existing calculators with missing seoContent:

```bash
# Identify which calculators need seoContent updates
grep -L '"introduction"' content/calculators/*.json | wc -l

# These calculators need complete seoContent for all 4 languages
# Priority: Financial calculators (highest CPC)
# Timeline: 2-3 per week
# Impact: 30-40% revenue increase when completed
```

