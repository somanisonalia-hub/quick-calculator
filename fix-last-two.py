#!/usr/bin/env python3

# Fix PregnancyCalculator
filepath = '/Users/asomani16/Repository/quick-calculator-v3/src/components/calculators/PregnancyCalculator.tsx'
with open(filepath, 'r') as f:
    content = f.read()

# Add pregnancyProgress keys before each language section's closing
content = content.replace(
    '      tip: "Tip",\n      tipText: "Standard pregnancy is 280 days (40 weeks) from LMP. Due dates are estimates - actual delivery typically occurs within 2 weeks before or after."\n    },',
    '      tip: "Tip",\n      tipText: "Standard pregnancy is 280 days (40 weeks) from LMP. Due dates are estimates - actual delivery typically occurs within 2 weeks before or after.",\n      pregnancyProgress: "Pregnancy Progress",\n      pregnancyProgressWeeks: "weeks",\n      pregnancyProgressDays: "days",\n      pregnancyProgressOf: "of"\n    },'
)

content = content.replace(
    '      tip: "Consejo",\n      tipText: "El embarazo estándar es 280 días (40 semanas) desde FUM. Las fechas de parto son estimaciones."\n    },',
    '      tip: "Consejo",\n      tipText: "El embarazo estándar es 280 días (40 semanas) desde FUM. Las fechas de parto son estimaciones.",\n      pregnancyProgress: "Progreso del Embarazo",\n      pregnancyProgressWeeks: "semanas",\n      pregnancyProgressDays: "días",\n      pregnancyProgressOf: "de"\n    },'
)

content = content.replace(
    '      tip: "Dica",\n      tipText: "A gravidez padrão é 280 dias (40 semanas) a partir da DUM. As datas de parto são estimativas."\n    },',
    '      tip: "Dica",\n      tipText: "A gravidez padrão é 280 dias (40 semanas) a partir da DUM. As datas de parto são estimativas.",\n      pregnancyProgress: "Progresso da Gravidez",\n      pregnancyProgressWeeks: "semanas",\n      pregnancyProgressDays: "dias",\n      pregnancyProgressOf: "de"\n    },'
)

content = content.replace(
    '      tip: "Astuce",\n      tipText: "La grossesse standard est 280 jours (40 semaines) à partir de DDR. Les dates d\'accouchement sont des estimations."\n    }\n  };',
    '      tip: "Astuce",\n      tipText: "La grossesse standard est 280 jours (40 semaines) à partir de DDR. Les dates d\'accouchement sont des estimations.",\n      pregnancyProgress: "Progrès de la Grossesse",\n      pregnancyProgressWeeks: "semaines",\n      pregnancyProgressDays: "jours",\n      pregnancyProgressOf: "de"\n    }\n  };'
)

# Replace the hardcoded label
content = content.replace(
    '<strong>Pregnancy Progress:</strong>',
    '<strong>{t.pregnancyProgress}:</strong>'
)

with open(filepath, 'w') as f:
    f.write(content)

print("Fixed PregnancyCalculator")

# Fix WaistToHipRatioCalculator  
filepath = '/Users/asomani16/Repository/quick-calculator-v3/src/components/calculators/WaistToHipRatioCalculator.tsx'
with open(filepath, 'r') as f:
    lines = f.readlines()

# Find and replace the two remaining lines
for i, line in enumerate(lines):
    if '• <strong>Women:</strong> Low &lt;0.80, Moderate 0.80-0.84, High ≥0.85' in line:
        lines[i] = line.replace('• <strong>Women:</strong> Low &lt;0.80, Moderate 0.80-0.84, High ≥0.85', '• {t.womenRisk}')
    elif '• <strong>Men:</strong> Low &lt;0.90, Moderate 0.90-0.99, High ≥1.00' in line:
        lines[i] = line.replace('• <strong>Men:</strong> Low &lt;0.90, Moderate 0.90-0.99, High ≥1.00', '• {t.menRisk}')

with open(filepath, 'w') as f:
    f.writelines(lines)

print("Fixed WaistToHipRatioCalculator")

print("All files fixed!")
