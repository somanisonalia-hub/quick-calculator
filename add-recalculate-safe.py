#!/usr/bin/env python3
"""
Safely add recalculate buttons to all calculators.
Uses line-by-line processing to avoid breaking existing code.
"""

import os
import re

# Translation text for each language
TRANSLATIONS = {
    'en': '🔄 Recalculate',
    'es': '🔄 Recalcular',
    'pt': '🔄 Recalcular',
    'fr': '🔄 Recalculer',
    'de': '🔄 Neu berechnen',
    'nl': '🔄 Herberekenen'
}

def find_language_block_end(lines, start_idx):
    """Find the line index of the closing brace for a language block"""
    brace_count = 0
    for i in range(start_idx, len(lines)):
        brace_count += lines[i].count('{') - lines[i].count('}')
        if brace_count == 0:
            return i
    return -1

def add_recalculate_keys(lines):
    """Add recalculate keys to all language blocks"""
    modified = False
    i = 0
    
    while i < len(lines):
        line = lines[i]
        
        # Check if this is a language block start
        for lang_code, trans_text in TRANSLATIONS.items():
            if re.match(rf'^\s+{lang_code}:\s*{{', line):
                # Find end of this block
                end_idx = find_language_block_end(lines, i)
                if end_idx == -1:
                    break
                
                # Check if recalculate already exists in this block
                block_text = '\n'.join(lines[i:end_idx+1])
                if 'recalculate:' in block_text:
                    i = end_idx + 1
                    continue
                
                # Find last property line
                last_prop_idx = end_idx - 1
                while last_prop_idx > i and lines[last_prop_idx].strip() == '':
                    last_prop_idx -= 1
                
                # Add comma to last property if needed
                if not lines[last_prop_idx].rstrip().endswith(','):
                    lines[last_prop_idx] = lines[last_prop_idx].rstrip() + ','
                
                # Add recalculate key
                indent = '      '
                new_line = f'{indent}recalculate: "{trans_text}",'
                lines.insert(last_prop_idx + 1, new_line)
                modified = True
                i = last_prop_idx + 2
                break
        else:
            i += 1
    
    return modified

def add_recalculate_button(lines):
    """Add recalculate button before Results Section comment"""
    modified = False
    i = 0
    
    while i < len(lines):
        line = lines[i]
        
        # Check if button already exists near Results section
        if 't.recalculate' in line:
            return False, "Button already exists"
        
        # Look for Results Section comment
        if '{/* Results Section */}' in line or '{/* Results */}' in line:
            # Get indentation from next line
            if i + 1 < len(lines):
                next_line = lines[i + 1]
                match = re.match(r'^(\s+)', next_line)
                indent = match.group(1) if match else '          '
            else:
                indent = '          '
            
            # Create button code with proper indentation
            button_lines = [
                f'{indent}<button',
                f'{indent}  onClick={{() => {{ setResults((prev: any) => ({{ ...prev }})); }}}}',
                f'{indent}  className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium"',
                f'{indent}>',
                f'{indent}  {{t.recalculate}}',
                f'{indent}</button>',
                ''
            ]
            
            # Insert button lines before Results comment
            for j, btn_line in enumerate(button_lines):
                lines.insert(i + j, btn_line)
            
            return True, f"Added button at line {i+1}"
        
        i += 1
    
    return False, "No Results section found"

def process_calculator(filepath):
    """Process a single calculator file"""
    basename = os.path.basename(filepath)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.read().split('\n')
    
    # Add translation keys
    keys_modified = add_recalculate_keys(lines)
    
    # Add button
    button_modified, button_msg = add_recalculate_button(lines)
    
    # Write back if modified
    if keys_modified or button_modified:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write('\n'.join(lines))
        
        print(f"{basename}:")
        if keys_modified:
            print(f"  ✓ Added recalculate keys")
        if button_modified:
            print(f"  ✓ {button_msg}")
        return True
    else:
        print(f"{basename}: ○ Already complete")
        return False

def main():
    calc_dir = '/Users/asomani16/Repository/quick-calculator-v3/src/components/calculators'
    
    files = [f for f in os.listdir(calc_dir) 
             if f.endswith('.tsx') 
             and f not in ['CalculatorRegistry.tsx', 'CompactInputField.tsx', 'CompactResultsDisplay.tsx']
             and not f.startswith('fix_')]
    
    print(f"Processing {len(files)} calculator files\n")
    print("=" * 60)
    
    modified = 0
    for filename in sorted(files):
        filepath = os.path.join(calc_dir, filename)
        if process_calculator(filepath):
            modified += 1
    
    print("=" * 60)
    print(f"\nSummary:")
    print(f"  Total: {len(files)}")
    print(f"  Modified: {modified}")
    print(f"  Skipped: {len(files) - modified}")

if __name__ == '__main__':
    main()
