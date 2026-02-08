const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all calculator files with hardcoded Recalculate
const calculatorsDir = path.join(__dirname, 'src/components/calculators');
const files = fs.readdirSync(calculatorsDir)
  .filter(f => f.endsWith('.tsx'))
  .map(f => path.join(calculatorsDir, f));

const recalculateTranslations = {
  en: '      recalculate: "🔄 Recalculate"',
  es: '      recalculate: "🔄 Recalcular"',
  pt: '      recalculate: "🔄 Recalcular"',
  fr: '      recalculate: "🔄 Recalculer"',
  de: '      recalculate: "🔄 Neu berechnen"',
  nl: '      recalculate: "🔄 Herberekenen"'
};

let fixed = 0;
let skipped = 0;

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if already has translation key
  if (content.includes('recalculate:') || !content.includes('🔄 Recalculate')) {
    skipped++;
    return;
  }

  // Find each language section and add recalculate key
  let modified = false;
  
  ['en', 'es', 'pt', 'fr', 'de', 'nl'].forEach(lang => {
    // Pattern: find the last line before closing brace of each language section
    const patterns = [
      // Pattern 1: Simple key ending with comma before },
      new RegExp(`(${lang}:\\s*{[\\s\\S]*?)(\\n\\s+[\\w]+:\\s*"[^"]*")\\n(\\s+)}`, 'm'),
      // Pattern 2: Key with special chars      new RegExp(`(${lang}:\\s*{[\\s\\S]*?)(\\n\\s+[\\w]+:\\s*"[^"]*",?)\\n(\\s+)}`, 'm')
    ];
    
    for (const pattern of patterns) {
      if (pattern.test(content)) {
        content = content.replace(pattern, `$1$2,\n${recalculateTranslations[lang]}\n$3}`);
        modified = true;
        break;
      }
    }
  });

  if (modified) {
    // Replace hardcoded button text with translation
    content = content.replace(/(\s+)🔄 Recalculate(\s+<\/button>)/g, '$1{t.recalculate}$2');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${path.basename(filePath)}`);
    fixed++;
  } else {
    console.log(`⚠️  Could not auto-fix: ${path.basename(filePath)}`);
  }
});

console.log(`\n📊 Summary:`);
console.log(`   Fixed: ${fixed}`);
console.log(`   Skipped (already has translation): ${skipped}`);
console.log(`   Total: ${files.length}`);
