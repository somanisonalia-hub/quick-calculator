const fs = require('fs');
const path = require('path');

const CALCULATORS_DIR = path.join(__dirname, 'src/components/calculators');

// Files to skip
const SKIP_FILES = new Set([
  'CalculatorRegistry.tsx',
  'CalculatorPageClient.tsx',
  'CompactInputField.tsx',
  'CompactResultsDisplay.tsx'
]);

function migrateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;

  // Skip if already migrated
  if (content.includes("from './shared'")) {
    console.log(`⏭️  Already migrated: ${path.basename(filePath)}`);
    return false;
  }

  // Add import for global components if not present
  if (!content.includes("import {") || !content.includes("from './shared'")) {
    // Find the first import statement
    const importMatch = content.match(/^import\s+/m);
    if (importMatch) {
      // Add global components import after React import
      const reactImportMatch = content.match(/import\s+React[^;]*;\n/);
      if (reactImportMatch) {
        const insertPoint = reactImportMatch[0];
        const newImport = `import {
  CalculatorLayout,
  CalculatorSection,
  ResultItem,
  CompactInputField,
  CompactResultsDisplay
} from './shared';\n`;
        content = content.replace(insertPoint, insertPoint + newImport);
        modified = true;
      }
    }
  }

  // Replace old component wrapper patterns
  // Pattern 1: Replace div wrapper with CalculatorLayout
  if (content.includes('<div className="bg-white')) {
    content = content.replace(
      /<div className="[^"]*bg-white[^"]*p-[0-9]\s+sm:p-[0-9][^"]*rounded-lg[^"]*shadow-[^"]*">/g,
      '<CalculatorLayout>'
    );
    content = content.replace(/<\/div>\s*<\/div>/, '</CalculatorLayout>\n  </div>');
    modified = true;
  }

  // Pattern 2: Wrap input sections in CalculatorSection
  if (content.includes('investmentDetails') || content.includes('Inputs') || content.includes('inputs')) {
    // Check if already using CalculatorSection
    if (!content.includes('<CalculatorSection')) {
      // This will need manual review but we can add a comment
      console.log(`⚠️  Manual review needed for sections: ${path.basename(filePath)}`);
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Migrated: ${path.basename(filePath)}`);
    return true;
  }

  return false;
}

function main() {
  console.log('🚀 Starting migration to global components...\n');

  const files = fs.readdirSync(CALCULATORS_DIR).filter(f => {
    return f.endsWith('.tsx') && !SKIP_FILES.has(f);
  });

  let migratedCount = 0;
  let skippedCount = 0;

  files.forEach(file => {
    const filePath = path.join(CALCULATORS_DIR, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      if (migrateFile(filePath)) {
        migratedCount++;
      } else {
        skippedCount++;
      }
    }
  });

  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Migrated: ${migratedCount}`);
  console.log(`   ⏭️  Already migrated: ${skippedCount}`);
  console.log(`   📁 Total files: ${files.length}`);
  console.log(`\n✨ Migration complete!`);
}

main();
