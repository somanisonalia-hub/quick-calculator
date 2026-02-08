#!/usr/bin/env python3
import os
import re

translations = {
    'en': '      autoCalcMessage: "📊 Calculations update automatically as you change values"',
    'es': '      autoCalcMessage: "📊 Los cálculos se actualizan automáticamente cuando cambias valores"',
    'pt': '      autoCalcMessage: "📊 Os cálculos são atualizados automaticamente conforme você altera os valores"',
    'fr': '      autoCalcMessage: "📊 Les calculs se mettent à jour automatiquement au fur et à mesure que vous modifiez les valeurs"',
    'de': '      autoCalcMessage: "📊 Berechnungen werden automatisch aktualisiert, wenn Sie Werte ändern"',
    'nl': '      autoCalcMessage: "📊 Berekeningen worden automatisch bijgewerkt als u waarden wijzigt"'
}

calc_dir = 'src/components/calculators'
fixed = 0
skipped = 0

files = [f for f in os.listdir(calc_dir) if f.endswith('.tsx')]

for file_name in files:
    file_path = os.path.join(calc_dir, file_name)
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip if doesn't have hardcoded message
    if 'Calculations update automatically' not in content:
        continue
    
    # Skip if already has i18n key
    if 'autoCalcMessage:' in content:
        print(f"⏭️  Already fixed: {file_name}")
        skipped += 1
        continue
    
    # Add translations to each language block
    for lang in ['en', 'es', 'pt', 'fr', 'de', 'nl']:
        # Find last key in language block before closing brace
        pattern = f"({lang}:[\\s\\S]*?)(\\n\\s+[^\\n{{}}]+: [^,\\n]+)(,?)\\n(\\s+)[}}]"
        
        def replace_func(match):
            before = match.group(1)
            last_key = match.group(2)
            comma = match.group(3)
            indent = match.group(4)
            
            # Ensure last_key has comma
            if not comma:
                last_key = last_key + ','
            
            return f"{before}{last_key},\n{translations[lang]}\n{indent}}}"
        
        content = re.sub(pattern, replace_func, content)
    
    # Replace hardcoded messages with i18n key
    content = re.sub(
        r'📊 Calculations update automatically as you change values',
        '{t.autoCalcMessage}',
        content
    )
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Fixed: {file_name}")
    fixed += 1

print(f"\n📊 Fixed {fixed} | Skipped {skipped}")
