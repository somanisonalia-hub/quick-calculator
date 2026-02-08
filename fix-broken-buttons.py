#!/usr/bin/env python3
"""
Remove broken recalculate buttons from calculators that don't have setResults state.
"""

import os
import re

calc_dir = '/Users/asomani16/Repository/quick-calculator-v3/src/components/calculators'

# Button pattern to find
button_pattern = r'^\s*<button\s*\n\s*onClick=\{\(\) => \{ setResults\(\(prev: any\) => \(\{ \.\.\.prev \}\)\); \}\}\s*\n\s*className="[^"]*"\s*\n\s*>\s*\n\s*\{t\.recalculate\}\s*\n\s*</button>\s*\n'

fixed_count = 0
kept_count = 0

for filename in os.listdir(calc_dir):
    if not filename.endswith('.tsx') or filename in ['CalculatorRegistry.tsx', 'CompactInputField.tsx', 'CompactResultsDisplay.tsx']:
        continue
    
    filepath = os.path.join(calc_dir, filename)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if file has setResults state
    has_set_results = 'setResults' in content and re.search(r'useState.*setResults', content)
    
    # Check if file has the button pattern  
    has_button_with_set_results = 'onClick={() => { setResults((prev: any) => ({ ...prev })); }}' in content
    
    if has_button_with_set_results and not has_set_results:
        # Remove the button
        # Find and remove button block before {/* Results
        pattern1 = r'\n\s*<button[^>]*\n\s*onClick=\{\(\) => \{ setResults\(\(prev: any\) => \(\{ \.\.\.prev \}\)\); \}\}[^>]*>[^<]*<[^/]*{t\.recalculate}[^<]*</button>\s*\n'
        
        new_content = re.sub(pattern1, '\n', content)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'✓ Fixed: {filename} (removed broken button)')
            fixed_count += 1
        else:
            print(f'⚠ Warning: {filename} has setResults button but couldn\'t remove')
    elif has_button_with_set_results and has_set_results:
        kept_count += 1
        # print(f'○ Kept: {filename} (has setResults state)')

print(f'\n Summary:')
print(f'  Fixed (removed): {fixed_count}')
print(f'  Kept (valid): {kept_count}')
