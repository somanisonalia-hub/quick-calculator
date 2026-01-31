#!/usr/bin/env python3

files_to_fix = [
    ('MaintenanceCaloriesCalculator.tsx', {
        'en': 'Note: These calculations provide estimates based on established formulas. Individual metabolic rates can vary significantly based on genetics, muscle mass, and other factors. Consult a healthcare professional for personalized nutrition advice.',
        'es': 'Nota: Estos cálculos proporcionan estimaciones basadas en fórmulas establecidas. Las tasas metabólicas individuales pueden variar significativamente según la genética, masa muscular y otros factores. Consulte a un profesional de la salud para asesoramiento nutricional personalizado.',
        'pt': 'Nota: Estes cálculos fornecem estimativas baseadas em fórmulas estabelecidas. As taxas metabólicas individuais podem variar significativamente com base na genética, massa muscular e outros fatores. Consulte um profissional de saúde para aconselhamento nutricional personalizado.',
        'fr': 'Remarque: Ces calculs fournissent des estimations basées sur des formules établies. Les taux métaboliques individuels peuvent varier considérablement en fonction de la génétique, de la masse musculaire et d\'autres facteurs. Consultez un professionnel de la santé pour des conseils nutritionnels personnalisés.'
    }),
    ('TDEECalculator.tsx', {
        'en': 'Note: TDEE calculations provide estimates based on established formulas. Individual metabolic rates can vary significantly. For weight management or fitness goals, consult a healthcare or fitness professional.',
        'es': 'Nota: Los cálculos de TDEE proporcionan estimaciones basadas en fórmulas establecidas. Las tasas metabólicas individuales pueden variar significativamente. Para el manejo del peso o metas de condición física, consulte a un profesional de la salud o acondicionamiento físico.',
        'pt': 'Nota: Os cálculos de TDEE fornecem estimativas baseadas em fórmulas estabelecidas. As taxas metabólicas individuais podem variar significativamente. Para gerenciamento de peso ou metas de condicionamento físico, consulte um profissional de saúde ou condicionamento físico.',
        'fr': 'Remarque: Les calculs TDEE fournissent des estimations basées sur des formules établies. Les taux métaboliques individuels peuvent varier considérablement. Pour la gestion du poids ou les objectifs de condition physique, consultez un professionnel de la santé ou de la condition physique.'
    }),
    ('TakeHomePayCalculator.tsx', {
        'en': 'Note: This calculator provides estimates based on 2024 federal withholding tables and standard deduction. State taxes, local taxes, additional deductions, and other payroll factors are not included. Actual take-home pay may vary.',
        'es': 'Nota: Esta calculadora proporciona estimaciones basadas en las tablas de retención federal de 2024 y la deducción estándar. No se incluyen impuestos estatales, impuestos locales, deducciones adicionales y otros factores de nómina. El pago neto real puede variar.',
        'pt': 'Nota: Esta calculadora fornece estimativas baseadas nas tabelas de retenção federal de 2024 e dedução padrão. Impostos estaduais, impostos locais, deduções adicionais e outros fatores de folha de pagamento não estão incluídos. O pagamento líquido real pode variar.',
        'fr': 'Remarque: Cette calculatrice fournit des estimations basées sur les tables de retenue fédérales de 2024 et la déduction standard. Les impôts d\'État, les impôts locaux, les déductions supplémentaires et d\'autres facteurs de paie ne sont pas inclus. Le salaire net réel peut varier.'
    }),
    ('NetIncomeCalculator.tsx', {
        'en': 'Note: This calculator provides estimates based on 2024 tax brackets and standard deduction. State taxes, additional deductions, credits, and other factors are not included. Consult a tax professional for accurate calculations.',
        'es': 'Nota: Esta calculadora proporciona estimaciones basadas en los tramos impositivos de 2024 y la deducción estándar. No se incluyen impuestos estatales, deducciones adicionales, créditos y otros factores. Consulte a un profesional de impuestos para cálculos precisos.',
        'pt': 'Nota: Esta calculadora fornece estimativas baseadas nas faixas de impostos de 2024 e dedução padrão. Impostos estaduais, deduções adicionais, créditos e outros fatores não estão incluídos. Consulte um profissional de impostos para cálculos precisos.',
        'fr': 'Remarque: Cette calculatrice fournit des estimations basées sur les tranches d\'imposition de 2024 et la déduction standard. Les impôts d\'État, les déductions supplémentaires, les crédits et d\'autres facteurs ne sont pas inclus. Consultez un professionnel de la fiscalité pour des calculs précis.'
    })
]

for filename, translations in files_to_fix:
    filepath = f'/Users/asomani16/Repository/quick-calculator-v3/src/components/calculators/{filename}'
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Find the translations object and add noteDisclaimer to each language
    # Look for patterns like: }  or }, before the next language or end of translations
    
    # For EN - add before },\n    es: {
    content = content.replace(
        '    },\n    es: {',
        f',\n      noteDisclaimer: "{translations["en"]}"\n    }},\n    es: {{'
    )
    
    # For ES - add before },\n    pt: {
    content = content.replace(
        '    },\n    pt: {',
        f',\n      noteDisclaimer: "{translations["es"]}"\n    }},\n    pt: {{'
    )
    
    # For PT - add before },\n    fr: {
    content = content.replace(
        '    },\n    fr: {',
        f',\n      noteDisclaimer: "{translations["pt"]}"\n    }},\n    fr: {{'
    )
    
    # For FR - add before }\n  };
    content = content.replace(
        '    }\n  };',
        f',\n      noteDisclaimer: "{translations["fr"]}"\n    }}\n  }};'
    )
    
    with open(filepath, 'w') as f:
        f.write(content)
    
    print(f"Fixed {filename}")

print("All files fixed!")
