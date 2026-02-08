const fs = require('fs');
const path = require('path');

const calculatorsDir = 'src/components/calculators';

console.log('🔧 Fixing syntax errors in calculator files...\n');

let fixedCount = 0;

// Find all .tsx files
const files = fs.readdirSync(calculatorsDir)
  .filter(f => f.endsWith('.tsx'))
  .map(f => path.join(calculatorsDir, f));

files.forEach(filePath => {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Fix 1: Remove double commas at end of lines
    content = content.replace(/,,\s*$/gm, ',');
    
    // Fix 2: Fix HeightCalculator and PaceCalculator - remove stray {/* Buttons */} before closing
    if (content.includes('{result && (')) {
      // Fix: {result && ( {/* Buttons */} <div ...> should be {result && ( <div ...>
      content = content.replace(
        /(\{result && \()\s*\{\/\*\s*Buttons\s*\*\/\}\s*\n\s*(<div className="flex gap-3)/g,
        '$1\n        <div className="space-y-4">\n          $2'
      );
    }
    
    // Fix 3: DiscountCalculator - extra closing brace
    if (filePath.includes('DiscountCalculator.tsx')) {
      content = content.replace(
        /{\/\* Results Section \*\/}}/,
        '{/* Results Section */}'
      );
    }
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      fixedCount++;
      console.log(`✅ Fixed: ${path.basename(filePath)}`);
    }
  } catch (error) {
    console.log(`❌ Error in ${path.basename(filePath)}: ${error.message}`);
  }
});

console.log(`\n✅ Fixed ${fixedCount} files\n`);
