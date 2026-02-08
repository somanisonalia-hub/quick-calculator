#!/usr/bin/env python3
"""
Remove ALL broken recalculate buttons that reference setResults when it doesn't exist.
"""

import os
import re

calc_dir = '/Users/asomani16/Repository/quick-calculator-v3/src/components/calculators'

fixed_files = []

for filename in os.listdir(calc_dir):
    if not filename.endswith('.tsx') or filename in ['CalculatorRegistry.tsx', 'CompactInputField.tsx', 'CompactResultsDisplay.tsx']:
        continue
    
    filepath = os.path.join(calc_dir, filename)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Check if has setResults state definition
    content = ''.join(lines)
    has_set_results_state = bool(re.search(r'const\s*\[\s*\w+\s*,\s*setResults\s*\]', content))
    
    # Check if has button with setResults
    has_button = 'onClick={() => { setResults((prev: any) => ({ ...prev })); }}' in content
    
    if has_button and not has_set_results_state:
        # Remove button block
        new_lines = []
        i = 0
        while i < len(lines):
            # Check if this line starts a button block with setResults
            if '<button' in lines[i] and i + 1 < len(lines) and 'onClick={() => { setResults((prev: any) => ({ ...prev })); }}' in lines[i+1]:
                # Skip the entire button block (typically 6 lines)
                # <button
                # onClick...
                # className...
                # >
                # {t.recalculate}
                # </button>
                while i < len(lines) and '</button>' not in lines[i]:
                    i += 1
                i += 1  # Skip the </button> line
                # Skip any blank lines after button
                while i < len(lines) and lines[i].strip() == '':
                    i += 1
            else:
                new_lines.append(lines[i])
                i += 1
        
        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        
        fixed_files.append(filename)
        print(f'✓ Fixed: {filename}')

print(f'\nTotal files fixed: {len(fixed_files)}')
