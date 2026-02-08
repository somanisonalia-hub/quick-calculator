#!/usr/bin/env python3
"""
Systematic calculator updater:
1. Updates button text to "🔄 Recalculate" in all languages
2. Ensures standard layout pattern (lg:grid-cols-2)
"""

import os
import re
from pathlib import Path

# Translation mappings for "Recalculate"
RECALCULATE_TRANSLATIONS = {
    'en': '🔄 Recalculate',
    'es': '🔄 Recalcular',
    'pt': '🔄 Recalcular',
    'fr': '🔄 Recalculer',
    'de': '🔄 Neu berechnen',
    'nl': '🔄 Herberekenen'
}

def update_button_text(content):
    """Update calculate button text to Recalculate in all language blocks"""
    
    # Pattern to find calculate button translations
    patterns = [
        (r'(calculate\w*:\s*)"Calculate[^"]*"', 'en'),
        (r'(calculate\w*:\s*)"Calcular[^"]*"', 'es'),
        (r'(calculate\w*:\s*)"Calcular[^"]*"', 'pt'),
        (r'(calculate\w*:\s*)"Calculer[^"]*"', 'fr'),
        (r'(calculate\w*:\s*)"Berechnen[^"]*"', 'de'),
        (r'(calculate\w*:\s*)"Berekenen[^"]*"', 'nl'),
    ]
    
    # Track if we made any changes
    modified = False
    
    for pattern, lang in patterns:
        if re.search(pattern, content):
            replacement = f'\\1"{RECALCULATE_TRANSLATIONS[lang]}"'
            new_content = re.sub(pattern, replacement, content)
            if new_content != content:
                content = new_content
                modified = True
    
    return content, modified

def check_layout_pattern(content):
    """Check if calculator has standard layout pattern"""
    has_standard_layout = 'lg:grid-cols-2' in content and 'space-y-6' in content
    return has_standard_layout

def process_calculator(file_path):
    """Process a single calculator file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Update button text
        content, button_modified = update_button_text(content)
        
        # Check layout
        has_standard_layout = check_layout_pattern(content)
        
        # Write back if modified
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            return {
                'path': file_path,
                'button_updated': button_modified,
                'has_standard_layout': has_standard_layout,
                'modified': True
            }
        
        return {
            'path': file_path,
            'button_updated': False,
            'has_standard_layout': has_standard_layout,
            'modified': False
        }
    
    except Exception as e:
        return {
            'path': file_path,
            'error': str(e),
            'modified': False
        }

def main():
    # Get all calculator files
    calculators_dir = Path('src/components/calculators')
    calculator_files = list(calculators_dir.glob('*Calculator.tsx'))
    
    print(f"Found {len(calculator_files)} calculator files")
    print("=" * 60)
    
    results = {
        'button_updated': 0,
        'already_has_recalculate': 0,
        'needs_layout_update': 0,
        'has_standard_layout': 0,
        'errors': 0
    }
    
    needs_layout_attention = []
    
    for calc_file in sorted(calculator_files):
        result = process_calculator(calc_file)
        
        if 'error' in result:
            print(f"❌ ERROR: {calc_file.name}: {result['error']}")
            results['errors'] += 1
        else:
            if result['button_updated']:
                print(f"✅ {calc_file.name}: Button text updated to Recalculate")
                results['button_updated'] += 1
            else:
                results['already_has_recalculate'] += 1
            
            if result['has_standard_layout']:
                results['has_standard_layout'] += 1
            else:
                results['needs_layout_update'] += 1
                needs_layout_attention.append(calc_file.name)
    
    print("\n" + "=" * 60)
    print("SUMMARY:")
    print(f"  Button text updated: {results['button_updated']}")
    print(f"  Already had Recalculate: {results['already_has_recalculate']}")
    print(f"  Has standard layout: {results['has_standard_layout']}")
    print(f"  Needs layout review: {results['needs_layout_update']}")
    print(f"  Errors: {results['errors']}")
    
    if needs_layout_attention:
        print("\n" + "=" * 60)
        print("CALCULATORS NEEDING LAYOUT REVIEW:")
        for name in needs_layout_attention[:20]:  # Show first 20
            print(f"  - {name}")
        if len(needs_layout_attention) > 20:
            print(f"  ... and {len(needs_layout_attention) - 20} more")

if __name__ == '__main__':
    main()
