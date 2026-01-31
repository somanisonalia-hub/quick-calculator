#!/usr/bin/env python3

import re

# Fix WaistToHipRatioCalculator
filepath = '/Users/asomani16/Repository/quick-calculator-v3/src/components/calculators/WaistToHipRatioCalculator.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Add measurement instruction keys to all languages
keys = {
    'waistMeasurement': {
        'en': 'Waist: Measure at narrowest point',
        'es': 'Cintura: Medir en el punto más estrecho',
        'pt': 'Cintura: Medir no ponto mais estreito',
        'fr': 'Taille: Mesurer au point le plus étroit'
    },
    'hipsMeasurement': {
        'en': 'Hips: Measure at widest point',
        'es': 'Caderas: Medir en el punto más ancho',
        'pt': 'Quadris: Medir no ponto mais largo',
        'fr': 'Hanches: Mesurer au point le plus large'
    },
    'womenRisk': {
        'en': 'Women: Low <0.80, Moderate 0.80-0.84, High ≥0.85',
        'es': 'Mujeres: Bajo <0.80, Moderado 0.80-0.84, Alto ≥0.85',
        'pt': 'Mulheres: Baixo <0.80, Moderado 0.80-0.84, Alto ≥0.85',
        'fr': 'Femmes: Faible <0.80, Modéré 0.80-0.84, Élevé ≥0.85'
    },
    'menRisk': {
        'en': 'Men: Low <0.90, Moderate 0.90-0.99, High ≥1.00',
        'es': 'Hombres: Bajo <0.90, Moderado 0.90-0.99, Alto ≥1.00',
        'pt': 'Homens: Baixo <0.90, Moderado 0.90-0.99, Alto ≥1.00',
        'fr': 'Hommes: Faible <0.90, Modéré 0.90-0.99, Élevé ≥1.00'
    },
    'noteWHR': {
        'en': 'Note: WHR is a valuable health indicator that measures body fat distribution. Values in the high-risk range are associated with increased risk of cardiovascular disease and other health conditions.',
        'es': 'Nota: La RCC es un valioso indicador de salud que mide la distribución de grasa corporal. Los valores en el rango de alto riesgo están asociados con un mayor riesgo de enfermedad cardiovascular y otras condiciones de salud.',
        'pt': 'Nota: A RCQ é um valioso indicador de saúde que mede a distribuição de gordura corporal. Valores na faixa de alto risco estão associados com maior risco de doença cardiovascular e outras condições de saúde.',
        'fr': 'Remarque: Le RTH est un indicateur de santé précieux qui mesure la distribution de la graisse corporelle. Les valeurs dans la plage à haut risque sont associées à un risque accru de maladie cardiovasculaire et d\'autres problèmes de santé.'
    }
}

# Add keys to all languages
for lang in ['en', 'es', 'pt', 'fr']:
    pattern = rf'({lang}:\s*\{{[^}}]*?percentage:\s*"%")(\n\s*\}},)'
    if lang == 'fr':
        pattern = rf'({lang}:\s*\{{[^}}]*?percentage:\s*"%")(\n\s*\}}\n\s*\}};)'
    
    keys_text = ',\n      ' + ',\n      '.join([f'{k}: "{v[lang]}"' for k, v in keys.items()])
    replacement = rf'\1{keys_text}\2'
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Replace hardcoded JSX
replacements = [
    ('<strong>Waist:</strong> Measure at narrowest point', '{t.waistMeasurement}'),
    ('<strong>Hips:</strong> Measure at widest point', '{t.hipsMeasurement}'),
    ('<strong>Women:</strong> Low <0.80, Moderate 0.80-0.84, High ≥0.85', '{t.womenRisk}'),
    ('<strong>Men:</strong> Low <0.90, Moderate 0.90-0.99, High ≥1.00', '{t.menRisk}'),
    (re.compile(r'<strong>Note:</strong>\s*WHR is a valuable health indicator[^<]*'), '{t.noteWHR}')
]

for old, new in replacements:
    if isinstance(old, str):
        content = content.replace(old, new)
    else:
        content = old.sub(new, content)

with open(filepath, 'w') as f:
    f.write(content)

print("Fixed WaistToHipRatioCalculator")

# Fix LoanPaymentTableGenerator
filepath = '/Users/asomani16/Repository/quick-calculator-v3/src/components/calculators/LoanPaymentTableGenerator.tsx'
with open(filepath, 'r') as f:
    content = f.read()

keys = {
    'interestRateComparison': {
        'en': 'Interest Rate Comparison: $300K loan, 30 years - compare 5.5% vs 7.5% ($425 difference)',
        'es': 'Comparación de Tasas de Interés: Préstamo de $300K, 30 años - comparar 5.5% vs 7.5% ($425 diferencia)',
        'pt': 'Comparação de Taxas de Juros: Empréstimo de $300K, 30 anos - comparar 5,5% vs 7,5% ($425 diferença)',
        'fr': 'Comparaison des Taux d\'Intérêt: Prêt de 300K$, 30 ans - comparer 5,5% vs 7,5% (425$ différence)'
    },
    'loanTermComparison': {
        'en': 'Loan Term Comparison: $250K at 6.5% - 15 vs 30 years ($475 difference)',
        'es': 'Comparación de Plazos de Préstamo: $250K al 6.5% - 15 vs 30 años ($475 diferencia)',
        'pt': 'Comparação de Prazos de Empréstimo: $250K a 6,5% - 15 vs 30 anos ($475 diferença)',
        'fr': 'Comparaison des Durées de Prêt: 250K$ à 6,5% - 15 vs 30 ans (475$ différence)'
    },
    'loanAmountComparison': {
        'en': 'Loan Amount Comparison: 6.5% for 30 years - $200K vs $300K ($664 difference)',
        'es': 'Comparación de Monto de Préstamo: 6.5% por 30 años - $200K vs $300K ($664 diferencia)',
        'pt': 'Comparação de Valor de Empréstimo: 6,5% por 30 anos - $200K vs $300K ($664 diferença)',
        'fr': 'Comparaison des Montants de Prêt: 6,5% pendant 30 ans - 200K$ vs 300K$ (664$ différence)'
    }
}

for lang in ['en', 'es', 'pt', 'fr']:
    pattern = rf'({lang}:\s*\{{[^}}]*?percentage:\s*"%")(\n\s*\}},)'
    if lang == 'fr':
        pattern = rf'({lang}:\s*\{{[^}}]*?percentage:\s*"%")(\n\s*\}}\n\s*\}};)'
    
    keys_text = ',\n      ' + ',\n      '.join([f'{k}: "{v[lang]}"' for k, v in keys.items()])
    replacement = rf'\1{keys_text}\2'
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Replace hardcoded JSX
replacements = [
    ('<strong>Interest Rate Comparison:</strong> $300K loan, 30 years - compare 5.5% vs 7.5% ($425 difference)', '{t.interestRateComparison}'),
    ('<strong>Loan Term Comparison:</strong> $250K at 6.5% - 15 vs 30 years ($475 difference)', '{t.loanTermComparison}'),
    ('<strong>Loan Amount Comparison:</strong> 6.5% for 30 years - $200K vs $300K ($664 difference)', '{t.loanAmountComparison}')
]

for old, new in replacements:
    content = content.replace(old, new)

with open(filepath, 'w') as f:
    f.write(content)

print("Fixed LoanPaymentTableGenerator")

# Fix PregnancyCalculator
filepath = '/Users/asomani16/Repository/quick-calculator-v3/src/components/calculators/PregnancyCalculator.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# This one needs special handling as it has dynamic content
# We'll add a pregnancyProgressTemplate key
keys = {
    'pregnancyProgressWeeks': {
        'en': 'weeks',
        'es': 'semanas',
        'pt': 'semanas',
        'fr': 'semaines'
    },
    'pregnancyProgressDays': {
        'en': 'days',
        'es': 'días',
        'pt': 'dias',
        'fr': 'jours'
    },
    'pregnancyProgressOf': {
        'en': 'of',
        'es': 'de',
        'pt': 'de',
        'fr': 'de'
    }
}

for lang in ['en', 'es', 'pt', 'fr']:
    pattern = rf'({lang}:\s*\{{[^}}]*?percentage:\s*"%")(\n\s*\}},)'
    if lang == 'fr':
        pattern = rf'({lang}:\s*\{{[^}}]*?percentage:\s*"%")(\n\s*\}}\n\s*\}};)'
    
    keys_text = ',\n      ' + ',\n      '.join([f'{k}: "{v[lang]}"' for k, v in keys.items()])
    replacement = rf'\1{keys_text}\2'
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# Find and replace the hardcoded pregnancy progress string
# It should be like: "Pregnancy Progress: {results.weeksPregnant} weeks + {results.daysPregnant % 7} days / 40 weeks"
# We'll look for this pattern and replace with proper translation
content = re.sub(
    r'<strong>Pregnancy Progress:</strong> \{results\.weeksPregnant\} weeks \+ \{results\.daysPregnant % 7\} days / 40 weeks',
    '<strong>Pregnancy Progress:</strong> {results.weeksPregnant} {t.pregnancyProgressWeeks} + {results.daysPregnant % 7} {t.pregnancyProgressDays} {t.pregnancyProgressOf} 40 {t.pregnancyProgressWeeks}',
    content
)

with open(filepath, 'w') as f:
    f.write(content)

print("Fixed PregnancyCalculator")

print("All remaining files fixed!")
