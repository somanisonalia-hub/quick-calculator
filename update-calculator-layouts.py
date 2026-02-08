#!/usr/bin/env python3
"""
Update calculator layouts to standard pattern:
- Change md:grid-cols-2 to lg:grid-cols-2
- Ensure space-y-6 container
"""

import os
import re
from pathlib import Path

def update_grid_layout(content):
    """Update grid layout from md:grid-cols-2 to lg:grid-cols-2"""
    modified = False
    
    # Pattern 1: md:grid-cols-2 -> lg:grid-cols-2
    if 'md:grid-cols-2' in content:
        content = content.replace('md:grid-cols-2', 'lg:grid-cols-2')
        modified = True
    
    # Pattern 2: grid-cols-1 md:grid-cols-2 -> grid lg:grid-cols-2
    pattern1 = r'grid\s+grid-cols-1\s+md:grid-cols-2'
    if re.search(pattern1, content):
        content = re.sub(pattern1, 'grid lg:grid-cols-2', content)
        modified = True
    
    return content, modified

def process_calculator(file_path):
    """Process a single calculator file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Update grid layout
        content, modified = update_grid_layout(content)
        
        # Write back if modified
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return {
                'path': file_path.name,
                'modified': True
            }
        
        return {
            'path': file_path.name,
            'modified': False
        }
    
    except Exception as e:
        return {
            'path': file_path.name,
            'error': str(e),
            'modified': False
        }

def main():
    # Get all calculator files
    calculators_dir = Path('src/components/calculators')
    calculator_files = list(calculators_dir.glob('*Calculator.tsx'))
    
    print(f"Processing {len(calculator_files)} calculator files...")
    print("=" * 60)
    
    modified_count = 0
    
    for calc_file in sorted(calculator_files):
        result = process_calculator(calc_file)
        
        if 'error' in result:
            print(f"❌ ERROR: {result['path']}: {result['error']}")
        elif result['modified']:
            print(f"✅ {result['path']}: Updated layout")
            modified_count += 1
    
    print("\n" + "=" * 60)
    print(f"SUMMARY: Updated {modified_count} calculator layouts")

if __name__ == '__main__':
    main()
