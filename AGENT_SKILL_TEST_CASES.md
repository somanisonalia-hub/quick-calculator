# Calculator Addition Skill - Test Cases

## Test Case 1: Paint Calculator (100k+ searches, Basic difficulty)

### Request
Add a Paint Calculator to estimate the amount of paint needed for a specific area.

**Parameters:**
```
calculatorName: "PaintCalculator"
slug: "paint-calculator"
searchVolume: 128000
category: "utility"
difficulty: "basic"
primaryColor: "cyan"
emoji: "🎨"

title_en: "Paint Calculator"
description_en: "Calculate how much paint you need for your project. Enter the area size and coverage rate to determine the gallons or liters required."
keywords_en: ["paint calculator", "how much paint needed", "paint coverage calculator", "gallons needed", "paint quantity"]
longTailKeywords_en: ["how to calculate paint needed", "paint calculator for walls", "coverage rate paint", "square feet to gallons paint", "interior paint estimate"]
formula_en: "Paint Needed = Total Area (sq ft) / Coverage Rate (sq ft per gallon)"
instructions_en: ["Enter the total area in square feet or square meters", "Enter the paint coverage rate", "View the amount of paint needed in gallons or liters", "Add 10% for waste and touch-ups"]
faqs_en: [
  {
    "question": "How much area does one gallon of paint cover?",
    "answer": "Typically, one gallon of quality paint covers 250-400 square feet depending on the surface. Rough surfaces need more paint than smooth ones."
  },
  {
    "question": "Should I add extra paint?",
    "answer": "Yes, add 10-15% extra for waste, touch-ups, and ensuring you have matching color if you need more later."
  }
]

title_es: "Calculadora de Pintura"
description_es: "Calcula cuánta pintura necesitas para tu proyecto. Ingresa el área y la tasa de cobertura para determinar los galones o litros requeridos."
keywords_es: ["calculadora de pintura", "cuanta pintura necesito", "calculadora de cobertura de pintura", "estimador de pintura"]
longTailKeywords_es: ["como calcular pintura necesaria", "pintura para paredes", "tasa de cobertura", "metro cuadrado a litros"]
formula_es: "Pintura Necesaria = Área Total / Tasa de Cobertura"
instructions_es: ["Ingresa el área total en metros cuadrados", "Ingresa la tasa de cobertura de pintura", "Ve la cantidad de pintura necesaria", "Añade 10% por desperdicio"]
faqs_es: [
  {
    "question": "¿Cuánta área cubre un litro de pintura?",
    "answer": "Típicamente, un litro de pintura de calidad cubre 6-10 metros cuadrados dependiendo de la superficie."
  }
]

title_pt: "Calculadora de Tinta"
description_pt: "Calcule quanto tinta você precisa para seu projeto. Digite a área e a taxa de cobertura para determinar os galões ou litros necessários."
keywords_pt: ["calculadora de tinta", "quanto tinta preciso", "calculadora de cobertura", "estimador de tinta"]
longTailKeywords_pt: ["como calcular tinta necessária", "tinta para paredes", "taxa de cobertura de tinta"]
formula_pt: "Tinta Necessária = Área Total / Taxa de Cobertura"
instructions_pt: ["Digite a área total em metros quadrados", "Digite a taxa de cobertura de tinta", "Veja a quantidade de tinta necessária"]
faqs_pt: [
  {
    "question": "Quanto um litro de tinta cobre?",
    "answer": "Tipicamente, um litro de tinta de qualidade cobre 6-10 metros quadrados dependendo da superfície."
  }
]

title_fr: "Calculatrice de Peinture"
description_fr: "Calculez la quantité de peinture dont vous avez besoin pour votre projet. Entrez la superficie et le taux de couverture pour déterminer les gallons ou litres requis."
keywords_fr: ["calculatrice de peinture", "combien de peinture", "calculatrice de couverture de peinture", "estimateur de peinture"]
longTailKeywords_fr: ["comment calculer la peinture", "peinture pour murs", "taux de couverture de peinture"]
formula_fr: "Peinture Nécessaire = Superficie Totale / Taux de Couverture"
instructions_fr: ["Entrez la superficie totale en mètres carrés", "Entrez le taux de couverture de peinture", "Consultez la quantité de peinture nécessaire"]
faqs_fr: [
  {
    "question": "Combien de superficie couvre un litre de peinture?",
    "answer": "Généralement, un litre de peinture de qualité couvre 6-10 mètres carrés selon la surface."
  }
]

inputs: [
  {
    "name": "areaSize",
    "label": "Area Size",
    "type": "number",
    "defaultValue": "100",
    "step": "0.1",
    "min": "1",
    "max": "10000"
  },
  {
    "name": "areaUnit",
    "label": "Area Unit",
    "type": "select",
    "defaultValue": "sqft"
  },
  {
    "name": "coverageRate",
    "label": "Coverage Rate",
    "type": "number",
    "defaultValue": "350",
    "step": "1",
    "min": "100",
    "max": "500"
  }
]

calculations: "
const area = parseFloat(areaSize);
const coverage = parseFloat(coverageRate);
if (!area || !coverage || area <= 0 || coverage <= 0) return null;
const paintNeeded = area / coverage;
const withWaste = paintNeeded * 1.1; // Add 10% for waste
return { paintNeeded, withWaste };
"

outputs: [
  {
    "name": "paintNeeded",
    "label": "Paint Needed",
    "format": "decimal",
    "decimalPlaces": 2
  },
  {
    "name": "withWaste",
    "label": "With 10% Waste Buffer",
    "format": "decimal",
    "decimalPlaces": 2
  }
]
```

### Expected Output Files

1. **Component:** `src/components/calculators/PaintCalculator.tsx`
2. **Content:** `content/calculators/paint-calculator.json`
3. **Registry Entry:** Added to `src/lib/contentRegistry.ts`
4. **Discovery:** Updated in `public/llms.txt`

### Verification Steps
```bash
# Check component created
ls -la src/components/calculators/PaintCalculator.tsx

# Check JSON created
ls -la content/calculators/paint-calculator.json

# Check registry updated
grep "paint-calculator" src/lib/contentRegistry.ts

# Check llms.txt updated
grep "paint-calculator" public/llms.txt

# Build verification
npm run build 2>&1 | grep "Compiled successfully"
```

### Success Criteria
- ✅ All 4 files created/modified
- ✅ Build completes with "Compiled successfully"
- ✅ Zero TypeScript errors
- ✅ Component accessible at `/calculators/paint-calculator`
- ✅ Component accessible at `/es/calculators/paint-calculator`, `/pt/calculators/paint-calculator`, `/fr/calculators/paint-calculator`
- ✅ Appears in home page utility calculators
- ✅ Included in XML sitemap
- ✅ Calculator functions properly (inputs → correct calculation → output)

---

## Test Case 2: Roof Pitch Calculator (35k searches, Intermediate difficulty)

### Request Parameters
```
calculatorName: "RoofPitchCalculator"
slug: "roof-pitch-calculator"
searchVolume: 35000
category: "utility"
difficulty: "intermediate"
primaryColor: "orange"
emoji: "🏠"

// [Follow same pattern as Test Case 1 with roof-specific content]
// Keywords: roof pitch, slope angle, rise over run, rafter angle
// Formula: Pitch = Rise / Run (expressed as ratio like 4:12 or 33 degrees)
```

### Expected Outcome
Successfully added roof calculator despite being under 100k searches (testing "intermediate" difficulty handling).

---

## Test Case 3: Invalid Input (Should Fail Gracefully)

### Request Parameters
```
calculatorName: "XYZCalculator"
slug: "xyz-calculator"
searchVolume: 15000        // ⚠️ Below 50k minimum
category: "utility"
difficulty: "basic"
// Missing Spanish/Portuguese/French content
```

### Expected Behavior
Agent should:
1. Validate against minimum 50k search volume
2. Warn about missing translations
3. Abort with error report
4. NOT create any files
5. Return clear error message

---

## Skill Success Indicators

### Immediate (After Execution)
- ✅ Build completes in < 3 seconds
- ✅ No TypeScript errors in output
- ✅ All 3 files created/modified
- ✅ grep verifies entries in registry and llms.txt

### Functional (After Deployment)
- ✅ Calculator loads at `/calculators/[slug]` URL
- ✅ All 4 languages functional
- ✅ Related calculators widget shows new calc on other pages
- ✅ Appears in home page category listings
- ✅ SEO metadata present in page source
- ✅ Sitemap includes all language variants

### SEO (After Indexing, 24-48 hours)
- ✅ Appears in Google Search Console
- ✅ Sitemap submitted and processed
- ✅ Pages crawled by Googlebot
- ✅ Searchable for primary keywords
- ✅ Featured in related calculator suggestions

---

## Performance Benchmarks

Expected metrics for successful skill execution:

```
Time to Complete: 2-3 minutes
Build Time: 2.6-2.8 seconds
File Size (Component): 8-15 KB
File Size (JSON): 20-40 KB
Total New Content: 28-55 KB

Memory Used: < 50 MB
CPU: Minimal (I/O bound)
Network: None required
```

---

## Troubleshooting Guide

If Test Case 1 (Paint Calculator) fails, check:

| Issue | Check | Fix |
|-------|-------|-----|
| Component not created | ls src/components/calculators/ | Review step 3 file creation |
| TypeScript errors | npm run build output | Check translation keys, types |
| Registry entry missing | grep "paint-calculator" contentRegistry.ts | Verify import and entry format |
| llms.txt not updated | grep "paint-calculator" public/llms.txt | Ensure proper Section placement |
| Build still fails | npm run build full output | Review all error messages |

---

## Next Steps After Successful Test

1. Run Paint Calculator through full QA
2. Test all 4 language variants manually
3. Verify mobile responsiveness
4. Check calculator accuracy with known inputs
5. Monitor Google Search Console for crawl/index status
6. Measure traffic once indexed (2-3 weeks)
7. Track revenue contribution from new calculator
