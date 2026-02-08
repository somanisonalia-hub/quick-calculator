#!/usr/bin/env python3
"""Fix button placement issues where button was inserted into div tag"""

import os
import re

calc_dir = '/Users/asomani16/Repository/quick-calculator-v3/src/components/calculators'

# Button code template
button_code = '''<button
            onClick={() => { setResults((prev: any) => ({ ...prev })); }}
            className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors font-medium"
          >
            {t.recalculate}
          </button>

          '''

fixed_count = 0

for filename in os.listdir(calc_dir):
    if not filename.endswith('.tsx'):
        continue
    
    filepath = os.path.join(calc_dir, filename)
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern 1: <div\n          <button (broken div)
    # Need to extract the div tag and place button before it
    pattern1 = r'(\s*{/\* Results Section \*/}\s*\n\s*)<div\s*\n(\s*)<button'
    
    if re.search(pattern1, content):
        # Extract proper indentation and fix
        new_content = re.sub(
            pattern1,
            r'\1' + button_code + r'<div\n\2',
            content
        )
        
        # Remove duplicate button that's now misplaced
        # Find and remove the button closing tag and attributes that are now orphaned
        new_content = re.sub(
            r'<button\s+onClick.*?{t\.recalculate}\s*</button>\s*\n\s*',
            '',
            new_content
        )
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f'Fixed: {filename}')
        fixed_count += 1

print(f'\nTotal files fixed: {fixed_count}')
