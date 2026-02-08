#!/usr/bin/env python3
"""
Update all calculator 'Calculate' buttons to 'Recalculate' buttons across all languages.
"""

import os
import re

calc_dir = '/Users/asomani16/Repository/quick-calculator-v3/src/components/calculators'

# Mapping of calculate patterns to recalculate replacements for each language
replacements = {
    'en': [
        ('Calculate', '🔄 Recalculate'),
        ('Calculate APR', '🔄 Recalculate'),
        ('Calculate BMI', '🔄 Recalculate'),
        ('Calculate ROI', '🔄 Recalculate'),
        ('Calculate Interest', '🔄 Recalculate'),
        ('Calculate Loan', '🔄 Recalculate'),
        ('Calculate Average', '🔄 Recalculate'),
        ('Calculate Total', '🔄 Recalculate'),
        ('Calculate Result', '🔄 Recalculate'),
        ('Calculate Now', '🔄 Recalculate'),
    ],
    'es': [
        ('Calcular', '🔄 Recalcular'),
        ('Calcular TAE', '🔄 Recalcular'),
        ('Calcular IMC', '🔄 Recalcular'),
        ('Calcular ROI', '🔄 Recalcular'),
        ('Calcular Interés', '🔄 Recalcular'),
        ('Calcular Préstamo', '🔄 Recalcular'),
        ('Calcular Promedio', '🔄 Recalcular'),
        ('Calcular Total', '🔄 Recalcular'),
        ('Calcular Resultado', '🔄 Recalcular'),
        ('Calcular Ahora', '🔄 Recalcular'),
    ],
    'pt': [
        ('Calcular', '🔄 Recalcular'),
        ('Calcular CET', '🔄 Recalcular'),
        ('Calcular IMC', '🔄 Recalcular'),
        ('Calcular ROI', '🔄 Recalcular'),
        ('Calcular Juros', '🔄 Recalcular'),
        ('Calcular Empréstimo', '🔄 Recalcular'),
        ('Calcular Média', '🔄 Recalcular'),
        ('Calcular Total', '🔄 Recalcular'),
        ('Calcular Resultado', '🔄 Recalcular'),
        ('Calcular Agora', '🔄 Recalcular'),
    ],
    'fr': [
        ('Calculer', '🔄 Recalculer'),
        ('Calculer TAEG', '🔄 Recalculer'),
        ('Calculer IMC', '🔄 Recalculer'),
        ('Calculer ROI', '🔄 Recalculer'),
        ('Calculer Intérêt', '🔄 Recalculer'),
        ('Calculer Prêt', '🔄 Recalculer'),
        ('Calculer Moyenne', '🔄 Recalculer'),
        ('Calculer Total', '🔄 Recalculer'),
        ('Calculer Résultat', '🔄 Recalculer'),
        ('Calculer Maintenant', '🔄 Recalculer'),
    ],
    'de': [
        ('Berechnen', '🔄 Neu berechnen'),
        ('APR Berechnen', '🔄 Neu berechnen'),
        ('BMI Berechnen', '🔄 Neu berechnen'),
        ('ROI Berechnen', '🔄 Neu berechnen'),
        ('Zinsen Berechnen', '🔄 Neu berechnen'),
        ('Darlehen Berechnen', '🔄 Neu berechnen'),
        ('Durchschnitt Berechnen', '🔄 Neu berechnen'),
        ('Gesamt Berechnen', '🔄 Neu berechnen'),
        ('Ergebnis Berechnen', '🔄 Neu berechnen'),
        ('Jetzt Berechnen', '🔄 Neu berechnen'),
    ],
    'nl': [
        ('Berekenen', '🔄 Herberekenen'),
        ('APR Berekenen', '🔄 Herberekenen'),
        ('BMI Berekenen', '🔄 Herberekenen'),
        ('ROI Berekenen', '🔄 Herberekenen'),
        ('Rente Berekenen', '🔄 Herberekenen'),
        ('Lening Berekenen', '🔄 Herberekenen'),
        ('Gemiddelde Berekenen', '🔄 Herberekenen'),
        ('Totaal Berekenen', '🔄 Herberekenen'),
        ('Resultaat Berekenen', '🔄 Herberekenen'),
        ('Nu Berekenen', '🔄 Herberekenen'),
    ],
}

updated_count = 0
skipped_count = 0

for filename in sorted(os.listdir(calc_dir)):
    if not filename.endswith('.tsx') or filename in ['CalculatorRegistry.tsx', 'CompactInputField.tsx', 'CompactResultsDisplay.tsx']:
        continue
    
    filepath = os.path.join(calc_dir, filename)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    modified = False
    
    # Apply replacements for all languages
    for lang, patterns in replacements.items():
        for old_text, new_text in patterns:
            # Match pattern: key: "Calculate..." (with proper escaping for quotes)
            pattern = rf'(\s+calculate[A-Za-z]*:\s*"){re.escape(old_text)}(")'
            if re.search(pattern, content):
                content = re.sub(pattern, rf'\g<1>{new_text}\g<2>', content)
                modified = True
    
    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'✓ Updated: {filename}')
        updated_count += 1
    else:
        skipped_count += 1

print(f'\n═══════════════════════════════════════')
print(f'Summary:')
print(f'  ✓ Updated: {updated_count} calculators')
print(f'  ○ Skipped: {skipped_count} calculators')
print(f'═══════════════════════════════════════')
