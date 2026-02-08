#!/usr/bin/env python3
"""
Remove broken recalculate buttons from calculators that don't have setResults state.
"""

import os
import re

calc_dir = '/Users/asomani16/Repository/quick-calculator-v3/src/components/calculators'

fixed_count = 0
kept_count = 0

for filename in os.listdir(calc_dir):
    if not filename.endswith('.tsx') or filename in ['CalculatorRegistry.tsx', 'CompactInputField.tsx', 'CompactResultsDisplay.tsx']:
        continue
    
    filepath = os.path.join(calc_dir, filename)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if file has setResults state
    has_set_results = 'setResults' in content and re.search(r'useState.*setResults|setResults.*useState', content, re.DOTALL)
    
    # Check if file has the button pattern  
    has_button_with_set_results = 'onClick={() => { setResults((prev: any) => ({ ...prev })); }}' in content
    
    if has_button_with_set_results and not has_set_results:
        # Remove the button - use DOTALL to match across newlines
        pattern = r'\s*<button[^>]*onClick=\{\(\) => \{ setResults\(\(prev: any\) => \(\{ \.\.\.prev \}\)\); \}\}[^>]*>.*?\{t\.recalculate\}.*?</button>\s*\n'
        
        new_content = re.sub(pattern, '\n', content, flags=re.DOTALL)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'✓ Fixed: {filename}')
            fixed_count += 1
        else:
            print(f'⚠ Could not fix: {filename}')
    elif has_button_with_set_results and has_set_results:
        kept_count += 1

print(f'\nSummary:')
print(f'  Fixed (removed broken buttons): {fixed_count}')
print(f'  Kept (valid buttons): {kept_count}')
