# Schema Markup on Calculator Pages

## Overview
Each calculator page includes comprehensive structured data (JSON-LD) for SEO and rich snippets. Here's what's on every calculator page:

## Schema Types on Calculator Pages

### 1. **WebPage Schema**
Identifies the page as a web page with core information.

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://quick-calculator.org/[lang]/[calculator-slug]/#webpage",
  "name": "[Calculator Name]",
  "description": "[Description]",
  "url": "https://quick-calculator.org/[lang]/[calculator-slug]/",
  "inLanguage": "[Language Code]"
}
```

**Example**: BMI Calculator page
```json
{
  "@type": "WebPage",
  "name": "BMI Calculator",
  "description": "Use our free BMI calculator to calculate your Body Mass Index...",
  "url": "https://quick-calculator.org/en/bmi-calculator/",
  "inLanguage": "en"
}
```

---

### 2. **WebApplication Schema** (Nested in WebPage)
Marks the calculator as an interactive web application.

```json
{
  "@type": "WebApplication",
  "@id": "[calculator-url]#webapplication",
  "name": "[Calculator Name]",
  "url": "[calculator-url]",
  "description": "[Description in lowercase]",
  "potentialAction": {
    "@type": "CalculateAction",
    "@id": "[calculator-url]#calculateaction",
    "target": "[calculator-url]",
    "description": "Calculate [calculator name] online",
    "resultType": "Text"
  }
}
```

**What this does**:
- ✅ Tells Google this is a calculator tool
- ✅ Indicates the action is "calculate"
- ✅ Shows results are text-based
- ✅ Helps with rich snippets

---

### 3. **BreadcrumbList Schema**
Navigation structure showing the path to the page.

```json
{
  "@type": "BreadcrumbList",
  "@id": "[calculator-url]#breadcrumblist",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://quick-calculator.org/[lang]/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "[Category Name]",
      "item": "https://quick-calculator.org/[lang]/categories/[category]/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "[Calculator Name]",
      "item": "https://quick-calculator.org/[lang]/[calculator-slug]/"
    }
  ]
}
```

**Example**: BMI Calculator breadcrumb
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "position": 1,
      "name": "Home",
      "item": "https://quick-calculator.org/en/"
    },
    {
      "position": 2,
      "name": "Health",
      "item": "https://quick-calculator.org/en/categories/health/"
    },
    {
      "position": 3,
      "name": "BMI Calculator",
      "item": "https://quick-calculator.org/en/bmi-calculator/"
    }
  ]
}
```

**What this does**:
- ✅ Shows search engine the page hierarchy
- ✅ Enables breadcrumb navigation in search results
- ✅ Improves click-through rate from search
- ✅ Helps with site structure understanding

---

### 4. **FAQPage Schema** (Optional - if FAQs exist)
When a calculator has FAQ content, it gets FAQPage schema.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "[calculator-url]#faqpage",
  "inLanguage": "[Language Code]",
  "mainEntity": [
    {
      "@type": "Question",
      "@id": "[calculator-url]#question1",
      "name": "[FAQ Question]",
      "acceptedAnswer": {
        "@type": "Answer",
        "@id": "[calculator-url]#answer1",
        "text": "[FAQ Answer]"
      }
    }
    // ... more Q&A pairs
  ]
}
```

**Example**: BMI Calculator FAQs
```json
{
  "@type": "Question",
  "name": "What is a healthy BMI?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "A healthy BMI is between 18.5 and 24.9. Below 18.5 is underweight, 25-29.9 is overweight, and 30+ is obese."
  }
}
```

**What this does**:
- ✅ Eligible for FAQ rich snippets in search
- ✅ Shows common questions directly in search results
- ✅ Increases click-through rate
- ✅ Reduces bounce rate (answers visible in SERP)

---

## Real Example: Complete Schema Bundle for Calculator Page

When you visit a calculator page like `/en/bmi-calculator/`, the page includes:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "name": "BMI Calculator",
      "description": "Calculate your body mass index...",
      "url": "https://quick-calculator.org/en/bmi-calculator/",
      "mainEntity": {
        "@type": "WebApplication",
        "name": "BMI Calculator",
        "potentialAction": {
          "@type": "CalculateAction",
          "description": "Calculate BMI online"
        }
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {"position": 1, "name": "Home"},
        {"position": 2, "name": "Health"},
        {"position": 3, "name": "BMI Calculator"}
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "name": "What is BMI?",
          "acceptedAnswer": {"text": "..."}
        }
      ]
    }
  ]
}
</script>
```

---

## Multi-Language Support

All schemas are generated in the page's language:

- ✅ English: `/en/bmi-calculator/` → Schema in English
- ✅ Spanish: `/es/calculadora-imc/` → Schema in Spanish
- ✅ Portuguese: `/pt/calculadora-imc/` → Schema in Portuguese
- ✅ French: `/fr/calculatrice-imc/` → Schema in French

Each schema includes `"inLanguage": "[language-code]"` to help search engines.

---

## SEO Benefits

These schemas provide:

1. **Rich Snippets** 
   - FAQs appear in search results
   - Breadcrumbs show in search
   - Better visual presentation

2. **Better Understanding**
   - Google knows it's a calculator tool
   - Knows the page structure
   - Understands the category relationship

3. **Higher CTR**
   - Breadcrumbs help users navigate
   - FAQs answer questions directly in search
   - More visibility in search results

4. **Ranking Signals**
   - Proper schema improves indexing
   - Helps Google rank for relevant queries
   - May boost featured snippet chances

---

## Verification

You can verify schemas are present:

```bash
# Check homepage schema
curl https://quick-calculator.org/en/ | grep "application/ld+json" | head -1 | jq '.'

# Check calculator schema
curl https://quick-calculator.org/en/bmi-calculator/ | grep "application/ld+json" | head -1 | jq '.'
```

Or use [Google's Rich Results Test](https://search.google.com/test/rich-results):
1. Go to https://search.google.com/test/rich-results
2. Paste a calculator URL
3. See all detected schemas

---

## Status

✅ **All 445+ calculator pages** include comprehensive schema markup
✅ **Multi-language support** for all 4 languages
✅ **Breadcrumbs** on every page
✅ **FAQs** included when available
✅ **WebApplication** type for calculator identification

---

**Result**: Your calculator pages are fully optimized for search engines and rich snippet display! 🎉
