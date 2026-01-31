#!/usr/bin/env python3

# Fix WaistToHipRatioCalculator
filepath = '/Users/asomani16/Repository/quick-calculator-v3/src/components/calculators/WaistToHipRatioCalculator.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Add keys after riskLevelOptions in each language section
# EN
content = content.replace(
    '      riskLevelOptions: {\n        low: "Low",\n        moderate: "Moderate",\n        high: "High"\n      }\n    },\n    es: {',
    '      riskLevelOptions: {\n        low: "Low",\n        moderate: "Moderate",\n        high: "High"\n      },\n      waistMeasurement: "Waist: Measure at narrowest point",\n      hipsMeasurement: "Hips: Measure at widest point",\n      womenRisk: "Women: Low <0.80, Moderate 0.80-0.84, High ≥0.85",\n      menRisk: "Men: Low <0.90, Moderate 0.90-0.99, High ≥1.00",\n      noteWHR: "Note: WHR is a valuable health indicator that measures body fat distribution. Values in the high-risk range are associated with increased risk of cardiovascular disease and other health conditions."\n    },\n    es: {'
)

# ES
content = content.replace(
    '      riskLevelOptions: {\n        low: "Bajo",\n        moderate: "Moderado",\n        high: "Alto"\n      }\n    },\n    pt: {',
    '      riskLevelOptions: {\n        low: "Bajo",\n        moderate: "Moderado",\n        high: "Alto"\n      },\n      waistMeasurement: "Cintura: Medir en el punto más estrecho",\n      hipsMeasurement: "Caderas: Medir en el punto más ancho",\n      womenRisk: "Mujeres: Bajo <0.80, Moderado 0.80-0.84, Alto ≥0.85",\n      menRisk: "Hombres: Bajo <0.90, Moderado 0.90-0.99, Alto ≥1.00",\n      noteWHR: "Nota: La RCC es un valioso indicador de salud que mide la distribución de grasa corporal. Los valores en el rango de alto riesgo están asociados con un mayor riesgo de enfermedad cardiovascular y otras condiciones de salud."\n    },\n    pt: {'
)

# PT
content = content.replace(
    '      riskLevelOptions: {\n        low: "Baixo",\n        moderate: "Moderado",\n        high: "Alto"\n      }\n    },\n    fr: {',
    '      riskLevelOptions: {\n        low: "Baixo",\n        moderate: "Moderado",\n        high: "Alto"\n      },\n      waistMeasurement: "Cintura: Medir no ponto mais estreito",\n      hipsMeasurement: "Quadris: Medir no ponto mais largo",\n      womenRisk: "Mulheres: Baixo <0.80, Moderado 0.80-0.84, Alto ≥0.85",\n      menRisk: "Homens: Baixo <0.90, Moderado 0.90-0.99, Alto ≥1.00",\n      noteWHR: "Nota: A RCQ é um valioso indicador de saúde que mede a distribuição de gordura corporal. Valores na faixa de alto risco estão associados com maior risco de doença cardiovascular e outras condições de saúde."\n    },\n    fr: {'
)

# FR
content = content.replace(
    '      riskLevelOptions: {\n        low: "Faible",\n        moderate: "Modéré",\n        high: "Élevé"\n      }\n    }\n  };',
    '      riskLevelOptions: {\n        low: "Faible",\n        moderate: "Modéré",\n        high: "Élevé"\n      },\n      waistMeasurement: "Taille: Mesurer au point le plus étroit",\n      hipsMeasurement: "Hanches: Mesurer au point le plus large",\n      womenRisk: "Femmes: Faible <0.80, Modéré 0.80-0.84, Élevé ≥0.85",\n      menRisk: "Hommes: Faible <0.90, Modéré 0.90-0.99, Élevé ≥1.00",\n      noteWHR: "Remarque: Le RTH est un indicateur de santé précieux qui mesure la distribution de la graisse corporelle. Les valeurs dans la plage à haut risque sont associées à un risque accru de maladie cardiovasculaire et d\'autres problèmes de santé."\n    }\n  };'
)

with open(filepath, 'w') as f:
    f.write(content)

print("Fixed WaistToHipRatioCalculator")

# Fix LoanPaymentTableGenerator
filepath = '/Users/asomani16/Repository/quick-calculator-v3/src/components/calculators/LoanPaymentTableGenerator.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Find where to add keys - look for percentage: "%" pattern for each language
# This calculator might have different structure, let me add after last key in each section

# Try to find the pattern and add before the closing of each language section
import re

# Find all occurrences and add keys
# EN
content = re.sub(
    r'(en:\s*\{[^}]*percentage:\s*"%")\n(\s*\},)',
    r'\1,\n      interestRateComparison: "Interest Rate Comparison: $300K loan, 30 years - compare 5.5% vs 7.5% ($425 difference)",\n      loanTermComparison: "Loan Term Comparison: $250K at 6.5% - 15 vs 30 years ($475 difference)",\n      loanAmountComparison: "Loan Amount Comparison: 6.5% for 30 years - $200K vs $300K ($664 difference)"\n\2',
    content,
    count=1,
    flags=re.DOTALL
)

# ES  
content = re.sub(
    r'(es:\s*\{[^}]*percentage:\s*"%")\n(\s*\},)',
    r'\1,\n      interestRateComparison: "Comparación de Tasas de Interés: Préstamo de $300K, 30 años - comparar 5.5% vs 7.5% ($425 diferencia)",\n      loanTermComparison: "Comparación de Plazos de Préstamo: $250K al 6.5% - 15 vs 30 años ($475 diferencia)",\n      loanAmountComparison: "Comparación de Monto de Préstamo: 6.5% por 30 años - $200K vs $300K ($664 diferencia)"\n\2',
    content,
    count=1,
    flags=re.DOTALL
)

# PT
content = re.sub(
    r'(pt:\s*\{[^}]*percentage:\s*"%")\n(\s*\},)',
    r'\1,\n      interestRateComparison: "Comparação de Taxas de Juros: Empréstimo de $300K, 30 anos - comparar 5,5% vs 7,5% ($425 diferença)",\n      loanTermComparison: "Comparação de Prazos de Empréstimo: $250K a 6,5% - 15 vs 30 anos ($475 diferença)",\n      loanAmountComparison: "Comparação de Valor de Empréstimo: 6,5% por 30 anos - $200K vs $300K ($664 diferença)"\n\2',
    content,
    count=1,
    flags=re.DOTALL
)

# FR
content = re.sub(
    r'(fr:\s*\{[^}]*percentage:\s*"%")\n(\s*\}\n\s*\};)',
    r'\1,\n      interestRateComparison: "Comparaison des Taux d\'Intérêt: Prêt de 300K$, 30 ans - comparer 5,5% vs 7,5% (425$ différence)",\n      loanTermComparison: "Comparaison des Durées de Prêt: 250K$ à 6,5% - 15 vs 30 ans (475$ différence)",\n      loanAmountComparison: "Comparaison des Montants de Prêt: 6,5% pendant 30 ans - 200K$ vs 300K$ (664$ différence)"\n\2',
    content,
    count=1,
    flags=re.DOTALL
)

with open(filepath, 'w') as f:
    f.write(content)

print("Fixed LoanPaymentTableGenerator")

print("All files fixed!")
