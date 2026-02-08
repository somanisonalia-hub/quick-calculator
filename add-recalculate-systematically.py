#!/usr/bin/env python3
"""
Systematically add recalculate buttons to all calculators.
This script adds:
1. Translation keys for recalculate in all language blocks
2. Recalculate button before Results sections
"""

import os
import re
import sys

# Translation text for each language
TRANSLATIONS = {
    'en': '🔄 Recalculate',
    'es': '🔄 Recalcular',
    'pt': '🔄 Recalcular',
    'fr': '🔄 Recalculer',
    'de': '🔄 Neu berechnen',
    'nl': '🔄 Herberekenen'
}

def find_last_line_of_language_block(lines, start_idx):
    """Find the last line of a language block (closing brace + comma or closing brace only)"""
    brace_count = 0
    in_block = False
    
    for i in range(start_idx, len(lines)):
        line = lines[i]
        if '{' in line:
            brace_count += line.count('{')
            in_block = True
        if '}' in line:
            brace_count -= line.count('}')
            if in_block and brace_count == 0:
                # Found closing brace of this language block
                return i
    return -1

def add_recalculate_keys(filepath):
    """Add recalculate keys to all language blocks in a calculator file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        lines = content.split('\n')
    
    modified = False
    changes_made = []
    
    # Find all language blocks
    for lang_code, trans_text in TRANSLATIONS.items():
        # Look for language block pattern like "  en: {" or "    en: {"
        pattern = rf'^\s+{lang_code}:\s*{{'
        
        for i, line in enumerate(lines):
            if re.match(pattern, line):
                # Check if recalculate already exists in this block
                closing_idx = find_last_line_of_language_block(lines, i)
                if closing_idx == -1:
                    continue
                    
                block_content = '\n'.join(lines[i:closing_idx+1])
                if 'recalculate:' in block_content:
                    continue  # Already has recalculate key
                
                # Find the last property line before closing brace
                last_prop_idx = closing_idx - 1
                while last_prop_idx > i and lines[last_prop_idx].strip() == '':
                    last_prop_idx -= 1
                
                if last_prop_idx > i:
                    # Add comma to last property if missing
                    if not lines[last_prop_idx].rstrip().endswith(','):
                        lines[last_prop_idx] = lines[last_prop_idx].rstrip() + ','
                    
                    # Add recalculate key
                    indent = '      '  # Standard indent
                    new_line = f'{indent}recalculate: "{trans_text}"'
                    lines.insert(last_prop_idx + 1, new_line)
                    changes_made.append(f'Added recalculate key to {lang_code} block')
                    modified = True
                    break
    
    if modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write('\n'.join(lines))
        return True, changes_made
    return False, []

def add_recalculate_button(filepath):
    """Add recalculate button before Results sections"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Look for Results Section comments
    results_patterns = [
        r'(\s*{/\* Results Section \*/}\s*\n\s*<div)',
        r'(\s*{/\* Results \*/}\s*\n\s*<div)',
        r'(\s*{/\* Results \*/}\s*\n\s*{)',
    ]
    
    button_code = '''<button
            onClick={() => { setResults((prev: any) => ({ ...prev })); }}
            className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium"
          >
            {t.recalculate}
          </button>\n          '''
    
    modified = False
    for pattern in results_patterns:
        if re.search(pattern, content):
            # Check if button already exists
            if 't.recalculate' in content:
                return False, "Button already exists"
            
            # Add button
            replacement = r'\1\n          ' + button_code
            new_content = re.sub(pattern, replacement, content, count=1)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                modified = True
                return True, "Added recalculate button"
                
    return False, "No Results section found" if not modified else "Already modified"

def process_calculator(filepath):
    """Process a single calculator file"""
    basename = os.path.basename(filepath)
    print(f"\nProcessing: {basename}")
    
    # Add translation keys
    keys_added, key_changes = add_recalculate_keys(filepath)
    if keys_added:
        for change in key_changes:
            print(f"  ✓ {change}")
    else:
        print(f"  ○ Translation keys already present")
    
    # Add button
    button_added, button_msg = add_recalculate_button(filepath)
    if button_added:
        print(f"  ✓ {button_msg}")
    else:
        print(f"  ○ {button_msg}")
    
    return keys_added or button_added

def main():
    calc_dir = '/Users/asomani16/Repository/quick-calculator-v3/src/components/calculators'
    
    # Get all calculator files
    files = [f for f in os.listdir(calc_dir) 
             if f.endswith('.tsx') 
             and f not in ['CalculatorRegistry.tsx', 'CompactInputField.tsx', 'CompactResultsDisplay.tsx']
             and not f.startswith('fix_')
             and not f.endswith('.backup')]
    
    total = len(files)
    processed = 0
    modified = 0
    
    print(f"Found {total} calculator files to process\n")
    print("=" * 60)
    
    for filename in sorted(files):
        filepath = os.path.join(calc_dir, filename)
        if process_calculator(filepath):
            modified += 1
        processed += 1
    
    print("\n" + "=" * 60)
    print(f"\nSummary:")
    print(f"  Total files: {total}")
    print(f"  Processed: {processed}")
    print(f"  Modified: {modified}")
    print(f"  Skipped: {processed - modified}")

if __name__ == '__main__':
    main()
