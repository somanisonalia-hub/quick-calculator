#!/usr/bin/env python3
import os
import re

files_to_fix = [
    'CalorieDeficitCalculator',
    'MidpointCalculator',
    'MortgageCalculator',
    'DecimalToFractionCalculator',
    'ElectricityCostCalculator',
    'DebtConsolidationCalculator',
    'SlopeCalculator',
    'SavingsCalculator'
]

translations = {
    'en': '      recalculate: "🔄 Recalculate"',
    'es': '      recalculate: "🔄 Recalcular"',
    'pt': '      recalculate: "🔄 Recalcular"',
    'fr': '      recalculate: "🔄 Recalculer"',
    'de': '      recalculate: "🔄 Neu berechnen"',
    'nl': '      recalculate: "🔄 Herberekenen"'
}

calc_dir = 'src/components/calculators'
fixed = 0

for file_name in files_to_fix:
    file_path = os.path.join(calc_dir, f'{file_name}.tsx')
    if not os.path.exists(file_path):
        print(f"❌ Not found: {file_name}")
        continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip if already has recalculate key
    if 'recalculate:' in content:
        print(f"⏭️  Already fixed: {file_name}")
        continue
    
    # Find translation blocks and insert recalculate key
    for lang in ['en', 'es', 'pt', 'fr', 'de', 'nl']:
        # Pattern to find language block and add to last key
        # Find lines like:  key: "value", with comma and followed by newline and closing brace
        pattern = f"({lang}:[\\s\\S]*?)(\\n\\s+[^\\n{{}}]+: [^,\\n]+)(,?)\\n(\\s+[}}]){{1}}"
        
        def replace_func(match):
            before = match.group(1)
            last_key = match.group(2)
            comma = match.group(3)
            closing = match.group(4)
            
            # If no comma, add it
            if not comma:
                last_key = last_key + ','
            
            return f"{before}{last_key},\n{translations[lang]}\n{closing}}}"
        
        content = re.sub(pattern, replace_func, content)
    
    # Replace hardcoded text with i18n key
    content = re.sub(r'🔄 Recalculate(?=\s*<\/button>)', '{t.recalculate}', content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Fixed: {file_name}")
    fixed += 1

print(f"\n📊 Fixed {fixed}/{len(files_to_fix)} calculators")
