# Schema Coverage Report

**Generated:** February 5, 2026

## Summary
- **Total Pages:** 152
- **With Schema:** 136 ✅
- **Without Schema:** 16 ❌
- **Coverage:** 89.4%

## Pages Missing JSON-LD Schema

### Calculators Missing seoContent (10)
These calculator JSON files need `seoContent` field added:
1. `401k-calculator`
2. `debt-payoff-calculator`
3. `macro-calculator`
4. `midpoint-calculator`
5. `prime-factorization-calculator`
6. `roth-ira-calculator`
7. `slope-calculator`
8. `social-security-calculator`
9. `square-root-calculator`

### Non-Calculator Pages Without Schema (6)
These are policy/info pages that don't need calculator schema:
1. `about-us` - Info page
2. `contact` - Contact form
3. `cookie-policy` - Policy page
4. `disclaimer` - Policy page
5. `privacy-policy` - Policy page
6. `terms-of-service` - Policy page

## Next Steps

### Fix Missing Calculator Schemas
For each calculator in the "Calculators Missing seoContent" list:

1. Open `content/calculators/{calculator-name}.json`
2. Add a complete `seoContent` object with:
   - `introduction` (1-2 sentences)
   - `benefits` (array of 3-5 bullet points)
   - `steps` (array of 4-5 steps)
   - `inputsExplained` (array describing each input)
   - `formulaExplanation` (how the calculation works)
   - `examples` (array of 2-3 examples)
   - `resultsExplanation` (array describing outputs)
   - `whoItsFor` (target audience)
   - `disclaimer` (important caveats)
   - `relatedTools` (array of related calculators)
   - `faqs` (array of FAQ objects with question/answer)

### Example seoContent Structure
```json
{
  "seoContent": {
    "introduction": "Brief intro",
    "benefits": ["Benefit 1", "Benefit 2"],
    "steps": ["Step 1", "Step 2"],
    "inputsExplained": ["Input 1 description", "Input 2 description"],
    "formulaExplanation": "How the formula works",
    "examples": ["Example 1", "Example 2"],
    "resultsExplanation": ["Result 1 desc", "Result 2 desc"],
    "whoItsFor": "Target audience",
    "disclaimer": "Important notes",
    "relatedTools": ["Related calculator 1"],
    "faqs": [
      {
        "question": "Question?",
        "answer": "Answer"
      }
    ]
  }
}
```

## Verification Command

To re-verify schema coverage after fixes, run:
```bash
./verify-schemas.sh
```

This will show the updated coverage percentage.
