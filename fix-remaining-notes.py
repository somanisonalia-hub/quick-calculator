#!/usr/bin/env python3

import re

# Fix IncomeTaxCalculator
with open('/Users/asomani16/Repository/quick-calculator-v3/src/components/calculators/IncomeTaxCalculator.tsx', 'r') as f:
    content = f.read()

# Add noteDisclaimer to ES (after currency: "$", percentage: "%")
content = re.sub(
    r'(es:\s*\{[^}]*percentage:\s*"%")\n(\s*\},)',
    r'\1,\n      noteDisclaimer: "Nota: Esta calculadora proporciona estimaciones basadas en los tramos impositivos de 2024 y tasas impositivas estatales simplificadas. Los impuestos reales pueden variar según circunstancias específicas, fuentes de ingresos adicionales, fórmulas exactas de impuestos estatales y reglas del IRS. Las exenciones personales están suspendidas hasta 2025. Consulte a un profesional de impuestos para asesoramiento personalizado."\n\2',
    content,
    flags=re.DOTALL
)

# Add noteDisclaimer to PT (after currency: "R$", percentage: "%")
content = re.sub(
    r'(pt:\s*\{[^}]*currency:\s*"R\$",\s*percentage:\s*"%")\n(\s*\},)',
    r'\1,\n      noteDisclaimer: "Nota: Esta calculadora fornece estimativas baseadas nas faixas de impostos de 2024 e taxas de impostos estaduais simplificadas. Os impostos reais podem variar com base em circunstâncias específicas, fontes de renda adicionais, fórmulas exatas de impostos estaduais e regras do IRS. As isenções pessoais estão suspensas até 2025. Consulte um profissional de impostos para aconselhamento personalizado."\n\2',
    content,
    flags=re.DOTALL
)

# Add noteDisclaimer to FR (after currency: "€", percentage: "%")
content = re.sub(
    r'(fr:\s*\{[^}]*currency:\s*"€",\s*percentage:\s*"%")\n(\s*\}\n\s*\};)',
    r'\1,\n      noteDisclaimer: "Remarque: Cette calculatrice fournit des estimations basées sur les tranches d\'imposition de 2024 et les taux d\'imposition d\'État simplifiés. Les impôts réels peuvent varier en fonction de circonstances spécifiques, de sources de revenus supplémentaires, de formules exactes d\'imposition des États et de règles de l\'IRS. Les exemptions personnelles sont suspendues jusqu\'en 2025. Consultez un professionnel de la fiscalité pour des conseils personnalisés."\n\2',
    content,
    flags=re.DOTALL
)

# Replace hardcoded JSX Note
content = content.replace(
    '          <strong>Note:</strong> This calculator provides estimates based on 2024 tax brackets and simplified state tax rates.\n          Actual taxes may vary based on specific circumstances, additional income sources, exact state tax formulas, and IRS rules.\n          Personal exemptions are suspended through 2025. Consult a tax professional for personalized tax advice.',
    '          {t.noteDisclaimer}'
)

with open('/Users/asomani16/Repository/quick-calculator-v3/src/components/calculators/IncomeTaxCalculator.tsx', 'w') as f:
    f.write(content)

print("Fixed IncomeTaxCalculator")

# Fix remaining calculators with similar patterns
files_to_fix = [
    ('MaintenanceCaloriesCalculator.tsx', 'noteDisclaimer', {
        'en': 'Note: These calculations provide estimates based on established formulas. Individual metabolic rates can vary significantly based on genetics, muscle mass, and other factors. Consult a healthcare professional for personalized nutrition advice.',
        'es': 'Nota: Estos cálculos proporcionan estimaciones basadas en fórmulas establecidas. Las tasas metabólicas individuales pueden variar significativamente según la genética, masa muscular y otros factores. Consulte a un profesional de la salud para asesoramiento nutricional personalizado.',
        'pt': 'Nota: Estes cálculos fornecem estimativas baseadas em fórmulas estabelecidas. As taxas metabólicas individuais podem variar significativamente com base na genética, massa muscular e outros fatores. Consulte um profissional de saúde para aconselhamento nutricional personalizado.',
        'fr': 'Remarque: Ces calculs fournissent des estimations basées sur des formules établies. Les taux métaboliques individuels peuvent varier considérablement en fonction de la génétique, de la masse musculaire et d\'autres facteurs. Consultez un professionnel de la santé pour des conseils nutritionnels personnalisés.'
    }),
    ('TDEECalculator.tsx', 'noteDisclaimer', {
        'en': 'Note: TDEE calculations provide estimates based on established formulas. Individual metabolic rates can vary significantly. For weight management or fitness goals, consult a healthcare or fitness professional.',
        'es': 'Nota: Los cálculos de TDEE proporcionan estimaciones basadas en fórmulas establecidas. Las tasas metabólicas individuales pueden variar significativamente. Para el manejo del peso o metas de condición física, consulte a un profesional de la salud o acondicionamiento físico.',
        'pt': 'Nota: Os cálculos de TDEE fornecem estimativas baseadas em fórmulas estabelecidas. As taxas metabólicas individuais podem variar significativamente. Para gerenciamento de peso ou metas de condicionamento físico, consulte um profissional de saúde ou condicionamento físico.',
        'fr': 'Remarque: Les calculs TDEE fournissent des estimations basées sur des formules établies. Les taux métaboliques individuels peuvent varier considérablement. Pour la gestion du poids ou les objectifs de condition physique, consultez un professionnel de la santé ou de la condition physique.'
    }),
    ('TakeHomePayCalculator.tsx', 'noteDisclaimer', {
        'en': 'Note: This calculator provides estimates based on 2024 federal withholding tables and standard deduction. State taxes, local taxes, additional deductions, and other payroll factors are not included. Actual take-home pay may vary.',
        'es': 'Nota: Esta calculadora proporciona estimaciones basadas en las tablas de retención federal de 2024 y la deducción estándar. No se incluyen impuestos estatales, impuestos locales, deducciones adicionales y otros factores de nómina. El pago neto real puede variar.',
        'pt': 'Nota: Esta calculadora fornece estimativas baseadas nas tabelas de retenção federal de 2024 e dedução padrão. Impostos estaduais, impostos locais, deduções adicionais e outros fatores de folha de pagamento não estão incluídos. O pagamento líquido real pode variar.',
        'fr': 'Remarque: Cette calculatrice fournit des estimations basées sur les tables de retenue fédérales de 2024 et la déduction standard. Les impôts d\'État, les impôts locaux, les déductions supplémentaires et d\'autres facteurs de paie ne sont pas inclus. Le salaire net réel peut varier.'
    }),
    ('NetIncomeCalculator.tsx', 'noteDisclaimer', {
        'en': 'Note: This calculator provides estimates based on 2024 tax brackets and standard deduction. State taxes, additional deductions, credits, and other factors are not included. Consult a tax professional for accurate calculations.',
        'es': 'Nota: Esta calculadora proporciona estimaciones basadas en los tramos impositivos de 2024 y la deducción estándar. No se incluyen impuestos estatales, deducciones adicionales, créditos y otros factores. Consulte a un profesional de impuestos para cálculos precisos.',
        'pt': 'Nota: Esta calculadora fornece estimativas baseadas nas faixas de impostos de 2024 e dedução padrão. Impostos estaduais, deduções adicionais, créditos e outros fatores não estão incluídos. Consulte um profissional de impostos para cálculos precisos.',
        'fr': 'Remarque: Cette calculatrice fournit des estimations basées sur les tranches d\'imposition de 2024 et la déduction standard. Les impôts d\'État, les déductions supplémentaires, les crédits et d\'autres facteurs ne sont pas inclus. Consultez un professionnel de la fiscalité pour des calculs précis.'
    })
]

for filename, key, translations in files_to_fix:
    filepath = f'/Users/asomani16/Repository/quick-calculator-v3/src/components/calculators/{filename}'
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        
        # Add keys to all languages
        for lang in ['en', 'es', 'pt', 'fr']:
            # Find the right place to add (before the closing brace of each language section)
            pattern = rf'({lang}:\s*\{{[^}}]*?percentage:\s*"%")(\n\s*\}},)'
            if lang == 'fr':
                pattern = rf'({lang}:\s*\{{[^}}]*?percentage:\s*"%")(\n\s*\}}\n\s*\}};)'
            
            replacement = rf'\1,\n      {key}: "{translations[lang]}"\2'
            content = re.sub(pattern, replacement, content, flags=re.DOTALL)
        
        # Replace hardcoded JSX
        content = re.sub(
            r'<strong>Note:</strong>[^<]*',
            '{t.noteDisclaimer}',
            content
        )
        
        with open(filepath, 'w') as f:
            f.write(content)
        
        print(f"Fixed {filename}")
    except Exception as e:
        print(f"Error fixing {filename}: {e}")

print("All note disclaimers fixed!")
