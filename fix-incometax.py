#!/usr/bin/env python3

filepath = '/Users/asomani16/Repository/quick-calculator-v3/src/components/calculators/IncomeTaxCalculator.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Add noteDisclaimer to EN (first occurrence of currency: "$", percentage: "%")
content = content.replace(
    '      currency: "$",\n      percentage: "%"\n    },\n    es: {',
    '      currency: "$",\n      percentage: "%",\n      noteDisclaimer: "Note: This calculator provides estimates based on 2024 tax brackets and simplified state tax rates. Actual taxes may vary based on specific circumstances, additional income sources, exact state tax formulas, and IRS rules. Personal exemptions are suspended through 2025. Consult a tax professional for personalized tax advice."\n    },\n    es: {',
    1  # Replace only first occurrence
)

# Add noteDisclaimer to ES
content = content.replace(
    '      currency: "$",\n      percentage: "%"\n    },\n    pt: {',
    '      currency: "$",\n      percentage: "%",\n      noteDisclaimer: "Nota: Esta calculadora proporciona estimaciones basadas en los tramos impositivos de 2024 y tasas impositivas estatales simplificadas. Los impuestos reales pueden variar según circunstancias específicas, fuentes de ingresos adicionales, fórmulas exactas de impuestos estatales y reglas del IRS. Las exenciones personales están suspendidas hasta 2025. Consulte a un profesional de impuestos para asesoramiento personalizado."\n    },\n    pt: {',
    1  # Replace only first occurrence
)

with open(filepath, 'w') as f:
    f.write(content)

print("Fixed IncomeTaxCalculator EN and ES")
