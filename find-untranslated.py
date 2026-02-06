#!/usr/bin/env python3
import json
import os
import glob

english_patterns = [
    'Loan Amount', 'Interest Rate', 'Payment', 'Amount', 'Rate', 'Term',
    'Primary', 'Secondary', 'Value', 'Enter', 'Calculate', 'Total', 
    'Monthly', 'Annual', 'Current', 'Minimum', 'Extra', 'Number of',
    'Down Payment', 'Property Tax', 'Insurance'
]

files_needing_translation = []

for filepath in sorted(glob.glob('content/calculators/*.json')):
    try:
        with open(filepath, 'r') as f:
            data = json.load(f)
        
        needs_fix = False
        for lang in ['es', 'pt', 'fr']:
            if lang in data and 'calculatorComponent' in data[lang]:
                comp = data[lang]['calculatorComponent']
                
                # Check inputs
                if 'inputs' in comp:
                    for inp in comp['inputs']:
                        label = inp.get('label', '')
                        if any(pattern in label for pattern in english_patterns):
                            needs_fix = True
                            break
                
                # Check output
                if 'output' in comp and 'label' in comp['output']:
                    label = comp['output']['label']
                    if any(pattern in label for pattern in english_patterns):
                        needs_fix = True
                
                # Check additionalOutputs
                if 'additionalOutputs' in comp:
                    for out in comp['additionalOutputs']:
                        label = out.get('label', '')
                        if any(pattern in label for pattern in english_patterns):
                            needs_fix = True
                            break
        
        if needs_fix:
            files_needing_translation.append(os.path.basename(filepath))
    except Exception as e:
        pass

print(f"Found {len(files_needing_translation)} files with English labels in non-English sections:")
for filename in files_needing_translation:
    print(f"  - {filename}")
