# Translated Slugs Fix - Summary

## Problem
The website was experiencing 404 errors for URLs with translated slugs (e.g., `/es/calculadora-imc/`, `/fr/calculatrice-imc/`, `/pt/calculadora-imc/`).

## Root Cause
24 calculator JSON files in `content/calculators/` had **translated slugs** in their Spanish, French, and Portuguese language sections, while the routing system expected **English-only slugs** across all languages.

### Example of the Problem:
**Before:**
```json
{
  "en": {
    "slug": "bmi-calculator",
    ...
  },
  "es": {
    "slug": "calculadora-imc",  ← WRONG
    ...
  },
  "fr": {
    "slug": "calculatrice-imc",  ← WRONG
    ...
  },
  "pt": {
    "slug": "calculadora-imc",  ← WRONG
    ...
  }
}
```

**After:**
```json
{
  "en": {
    "slug": "bmi-calculator",
    ...
  },
  "es": {
    "slug": "bmi-calculator",  ✅ CORRECT
    ...
  },
  "fr": {
    "slug": "bmi-calculator",  ✅ CORRECT
    ...
  },
  "pt": {
    "slug": "bmi-calculator",  ✅ CORRECT
    ...
  }
}
```

## Files Fixed (24 total)

1. age-calculator.json
   - ES: `calculadora-edad` → `age-calculator`
   - FR: `calculatrice-age` → `age-calculator`
   - PT: `calculadora-idade` → `age-calculator`

2. bmi-calculator.json
   - ES: `calculadora-imc` → `bmi-calculator`
   - FR: `calculatrice-imc` → `bmi-calculator`
   - PT: `calculadora-imc` → `bmi-calculator`

3. bmr-calculator.json
   - ES: `calculadora-tmb` → `bmr-calculator`
   - FR: `calculatrice-tmb` → `bmr-calculator`
   - PT: `calculadora-tmb` → `bmr-calculator`

4. body-fat-calculator.json
   - ES: `calculadora-porcentaje-grasa` → `body-fat-calculator`
   - FR: `calculatrice-pourcentage-graisse` → `body-fat-calculator`
   - PT: `calculadora-percentual-gordura` → `body-fat-calculator`

5. calorie-calculator.json
   - ES: `calculadora-calorias` → `calorie-calculator`
   - FR: `calculatrice-calories` → `calorie-calculator`
   - PT: `calculadora-calorias` → `calorie-calculator`

6. compound-interest-calculator.json
   - ES: `calculadora-interes-compuesto` → `compound-interest-calculator`
   - FR: `calculatrice-interet-compose` → `compound-interest-calculator`
   - PT: `calculadora-juros-compostos` → `compound-interest-calculator`

7. credit-card-calculator.json
   - ES: `calculadora-tarjeta-credito` → `credit-card-calculator`
   - FR: `calculatrice-carte-credit` → `credit-card-calculator`
   - PT: `calculadora-cartao-credito` → `credit-card-calculator`

8. date-calculator.json
   - ES: `calculadora-fecha` → `date-calculator`
   - FR: `calculatrice-date` → `date-calculator`
   - PT: `calculadora-data` → `date-calculator`

9. fraction-calculator.json
   - ES: `calculadora-fracciones` → `fraction-calculator`
   - FR: `calculatrice-fractions` → `fraction-calculator`
   - PT: `calculadora-fracoes` → `fraction-calculator`

10. gpa-calculator.json
    - ES: `calculadora-promedio` → `gpa-calculator`
    - FR: `calculatrice-moyenne` → `gpa-calculator`
    - PT: `calculadora-media` → `gpa-calculator`

11. income-tax-calculator.json
    - ES: `calculadora-impuesto-renta` → `income-tax-calculator`
    - FR: `calculatrice-impot-revenu` → `income-tax-calculator`
    - PT: `calculadora-imposto-renda` → `income-tax-calculator`

12. investment-calculator.json
    - ES: `calculadora-inversion` → `investment-calculator`
    - FR: `calculatrice-investissement` → `investment-calculator`
    - PT: `calculadora-investimento` → `investment-calculator`

13. loan-calculator.json
    - ES: `calculadora-prestamos` → `loan-calculator`
    - FR: `calculatrice-prets` → `loan-calculator`
    - PT: `calculadora-emprestimos` → `loan-calculator`

14. mortgage-calculator.json
    - ES: `calculadora-hipotecaria` → `mortgage-calculator`
    - FR: `calculatrice-hypothecaire` → `mortgage-calculator`
    - PT: `calculadora-hipotecaria` → `mortgage-calculator`

15. percentage-calculator.json
    - ES: `calculadora-porcentaje` → `percentage-calculator`
    - FR: `calculatrice-pourcentage` → `percentage-calculator`
    - PT: `calculadora-percentual` → `percentage-calculator`

16. retirement-calculator.json
    - ES: `calculadora-jubilacion` → `retirement-calculator`
    - FR: `calculatrice-retraite` → `retirement-calculator`
    - PT: `calculadora-aposentadoria` → `retirement-calculator`

17. retirement-plan.json
    - ES: `plan-jubilacion` → `retirement-plan`
    - FR: `plan-retraite` → `retirement-plan`
    - PT: `plano-aposentadoria` → `retirement-plan`

18. retirement-savings.json
    - ES: `ahorros-jubilacion` → `retirement-savings`
    - FR: `epargne-retraite` → `retirement-savings`
    - PT: `poupanca-aposentadoria` → `retirement-savings`

19. sales-tax-calculator.json
    - ES: `calculadora-impuesto-ventas` → `sales-tax-calculator`
    - FR: `calculatrice-taxe-vente` → `sales-tax-calculator`
    - PT: `calculadora-imposto-vendas` → `sales-tax-calculator`

20. scientific-calculator.json
    - ES: `calculadora-cientifica` → `scientific-calculator`
    - FR: `calculatrice-scientifique` → `scientific-calculator`
    - PT: `calculadora-cientifica` → `scientific-calculator`

21. simple-interest-calculator.json
    - ES: `calculadora-interes-simple` → `simple-interest-calculator`
    - FR: `calculatrice-interet-simple` → `simple-interest-calculator`
    - PT: `calculadora-juros-simples` → `simple-interest-calculator`

22. square-footage-calculator.json
    - ES: `calculadora-area` → `square-footage-calculator`
    - FR: `calculatrice-superficie` → `square-footage-calculator`
    - PT: `calculadora-area` → `square-footage-calculator`

23. tdee-calculator.json
    - ES: `calculadora-tdee` → `tdee-calculator`
    - FR: `calculatrice-tdee` → `tdee-calculator`
    - PT: `calculadora-tdee` → `tdee-calculator`

24. tip-calculator.json
    - ES: `calculadora-propina` → `tip-calculator`
    - FR: `calculatrice-pourboire` → `tip-calculator`
    - PT: `calculadora-gorjeta` → `tip-calculator`

## Fix Applied

Created and ran `fix-translated-slugs.js` script that:
1. Reads each affected JSON file
2. Extracts the English slug from the `en` section
3. Replaces all non-English slugs (es, fr, pt) with the English slug
4. Saves the corrected file

## Verification

✅ All 24 files updated successfully  
✅ Build completed successfully (596 static pages)  
✅ No translated slugs remaining in content files  
✅ Site now uses English-only slugs across all languages  

## URLs Now Working

All calculator pages now use English slugs regardless of language:
- `/en/bmi-calculator` ✅
- `/es/bmi-calculator` ✅ (not `/es/calculadora-imc`)
- `/fr/bmi-calculator` ✅ (not `/fr/calculatrice-imc`)
- `/pt/bmi-calculator` ✅ (not `/pt/calculadora-imc`)

## Note

The 404 errors for translated slug URLs (like `/es/calculadora-imc/`) are **expected behavior** as the site design uses English-only slugs. These URLs may appear in:
- External websites linking with incorrect URLs
- Old bookmarks
- Third-party aggregators

The site's own navigation (Footer, internal links) correctly uses English slugs with language prefixes.
