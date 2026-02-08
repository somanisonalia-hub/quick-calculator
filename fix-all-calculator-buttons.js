const fs = require('fs');
const path = require('path');

const calculatorsDir = 'src/components/calculators';

// Standard button translations
const buttonTranslations = {
  en: { calculate: '🔄 Recalculate', reset: 'Reset' },
  es: { calculate: '🔄 Recalcular', reset: 'Restablecer' },
  pt: { calculate: '🔄 Recalcular', reset: 'Redefinir' },
  fr: { calculate: '🔄 Recalculer', reset: 'Réinitialiser' },
  de: { calculate: '🔄 Neu berechnen', reset: 'Zurücksetzen' },
  nl: { calculate: '🔄 Herberekenen', reset: 'Resetten' }
};

function addButtonTranslations(content, existingLangs) {
  // Find the translations object
  const translationsMatch = content.match(/const translations = \{[\s\S]*?\n  \};/);
  if (!translationsMatch) return content;

  let translationsBlock = translationsMatch[0];
  
  existingLangs.forEach(lang => {
    // Check if this language block exists
    const langRegex = new RegExp(`(${lang}:\\s*\\{[\\s\\S]*?)(\\n\\s+\\}[,]?)`, 'g');
    const langMatch = translationsBlock.match(langRegex);
    
    if (langMatch && langMatch[0]) {
      let langBlock = langMatch[0];
      
      // Check if calculate key exists
      if (!/calculate:\s*['"]/g.test(langBlock)) {
        // Add calculate before the closing brace
        langBlock = langBlock.replace(
          /(\n\s+)\}/,
          `,\n      calculate: "${buttonTranslations[lang].calculate}"$1}`
        );
      }
      
      // Check if reset key exists
      if (!/reset:\s*['"]/g.test(langBlock)) {
        langBlock = langBlock.replace(
          /(\n\s+)\}/,
          `,\n      reset: "${buttonTranslations[lang].reset}"$1}`
        );
      }
      
      translationsBlock = translationsBlock.replace(langMatch[0], langBlock);
    }
  });

  return content.replace(translationsMatch[0], translationsBlock);
}

function removeUseEffectAutoCalc(content, calculateFuncName) {
  // Remove useEffect that calls calculate function
  const useEffectRegex = new RegExp(
    `useEffect\\(\\s*\\(\\)\\s*=>\\s*\\{[\\s\\S]*?${calculateFuncName}\\(\\);?[\\s\\S]*?\\},\\s*\\[[^\\]]*\\]\\);?`,
    'g'
  );
  return content.replace(useEffectRegex, '');
}

function extractCalculateFunctionName(content) {
  // Try to find the main calculate function name
  const patterns = [
    /const\s+(\w*calculate\w*)\s*=\s*\(/i,
    /function\s+(\w*calculate\w*)\s*\(/i,
  ];
  
  for (const pattern of patterns) {
    const match = content.match(pattern);
    if (match && match[1]) return match[1];
  }
  return null;
}

function addResetFunction(content, calculateFuncName) {
  // Check if reset function already exists
  if (/const\s+reset/i.test(content) || /function\s+reset/i.test(content)) {
    return content;
  }

  // Find where to insert reset function (after calculate function or after state declarations)
  const insertAfterCalc = new RegExp(`(const\\s+${calculateFuncName}[\\s\\S]*?\\};)`, 'g');
  const match = content.match(insertAfterCalc);
  
  if (match) {
    const resetFunc = `\n\n  const resetCalculator = () => {\n    // Reset all input values to defaults\n    const initial: Record<string, number> = {};\n    inputs?.forEach(input => {\n      initial[input.name] = input.default || 0;\n    });\n    setValues(initial);\n    setResults({});\n  };`;
    
    return content.replace(match[0], match[0] + resetFunc);
  }
  
  return content;
}

function addButtonsToJSX(content, hasCalculate, hasReset, calculateFuncName) {
  // Find common insertion points for buttons
  const patterns = [
    // After last input in a grid or space-y div
    /([\s\S]*?)(<\/div>\s*<\/div>\s*\n\s*<\/div>\s*\n\s*{\/\*\s*Results)/,
    // Before results section
    /([\s\S]*?)(\n\s*{\/\*\s*Results\s*\*\/})/,
    // After inputs and before closing main div
    /([\s\S]*<input[\s\S]*?\/>\s*<\/div>\s*\n)(\s*<\/div>\s*\n\s*{\/\*\s*Results)/,
  ];

  let buttonsAdded = false;
  
  for (const pattern of patterns) {
    if (pattern.test(content)) {
      const buttons = `
          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            ${!hasCalculate ? `<button
              onClick={${calculateFuncName || 'calculateResults'}}
              className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.calculate}
            </button>` : ''}${!hasCalculate && !hasReset ? '\n            ' : ''}${!hasReset ? `<button
              onClick={resetCalculator}
              className="flex-1 bg-gray-200 text-gray-800 py-2.5 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-semibold transition-colors duration-200"
            >
              {t.reset}
            </button>` : ''}
          </div>
`;
      
      content = content.replace(pattern, `$1${buttons}\n$2`);
      buttonsAdded = true;
      break;
    }
  }

  return { content, buttonsAdded };
}

function fixCalculator(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath, '.tsx');
  
  // Skip utility files
  if (fileName.includes('Registry') || fileName.includes('Compact')) {
    return { fixed: false, reason: 'utility file' };
  }

  // Check current button status
  const hasCalculateButton = /onClick=\{.*calculate/i.test(content) || /\{t\.calculate/i.test(content);
  const hasResetButton = /onClick=\{.*reset/i.test(content) || /\{t\.reset/i.test(content);
  
  if (hasCalculateButton && hasResetButton) {
    return { fixed: false, reason: 'already has both buttons' };
  }

  // Detect languages used
  const existingLangs = [];
  if (/en:\s*\{/.test(content)) existingLangs.push('en');
  if (/es:\s*\{/.test(content)) existingLangs.push('es');
  if (/pt:\s*\{/.test(content)) existingLangs.push('pt');
  if (/fr:\s*\{/.test(content)) existingLangs.push('fr');
  if (/de:\s*\{/.test(content)) existingLangs.push('de');
  if (/nl:\s*\{/.test(content)) existingLangs.push('nl');

  if (existingLangs.length === 0) {
    return { fixed: false, reason: 'no translations found' };
  }

  let changes = [];

  // 1. Add button translations
  const beforeTranslations = content;
  content = addButtonTranslations(content, existingLangs);
  if (content !== beforeTranslations) changes.push('translations');

  // 2. Find calculate function name
  const calculateFuncName = extractCalculateFunctionName(content);
  
  if (!calculateFuncName && !hasCalculateButton) {
    return { fixed: false, reason: 'no calculate function found' };
  }

  // 3. Remove auto-calc useEffect if exists
  if (calculateFuncName && /useEffect[\s\S]*?${calculateFuncName}/i.test(content)) {
    const beforeEffect = content;
    content = removeUseEffectAutoCalc(content, calculateFuncName);
    if (content !== beforeEffect) changes.push('removed-useEffect');
  }

  // 4. Add reset function if missing
  if (!hasResetButton && !/const\s+reset|function\s+reset/i.test(content)) {
    const beforeReset = content;
    content = addResetFunction(content, calculateFuncName);
    if (content !== beforeReset) changes.push('reset-function');
  }

  // 5. Add button JSX
  const result = addButtonsToJSX(content, hasCalculateButton, hasResetButton, calculateFuncName);
  content = result.content;
  if (result.buttonsAdded) changes.push('buttons-jsx');

  if (changes.length > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    return { fixed: true, changes };
  }

  return { fixed: false, reason: 'no changes needed' };
}

// Main execution
console.log('\n🔧 BATCH FIXING CALCULATOR BUTTONS\n');
console.log('='.repeat(60));

const files = fs.readdirSync(calculatorsDir)
  .filter(f => f.endsWith('.tsx'))
  .map(f => path.join(calculatorsDir, f));

const results = {
  fixed: [],
  skipped: [],
  errors: []
};

files.forEach(filePath => {
  const fileName = path.basename(filePath, '.tsx');
  try {
    const result = fixCalculator(filePath);
    if (result.fixed) {
      results.fixed.push({ name: fileName, changes: result.changes });
      console.log(`✅ ${fileName}: ${result.changes.join(', ')}`);
    } else {
      results.skipped.push({ name: fileName, reason: result.reason });
    }
  } catch (error) {
    results.errors.push({ name: fileName, error: error.message });
    console.log(`❌ ${fileName}: ${error.message}`);
  }
});

console.log('\n' + '='.repeat(60));
console.log(`\n✅ Fixed: ${results.fixed.length}`);
console.log(`⏭️  Skipped: ${results.skipped.length}`);
console.log(`❌ Errors: ${results.errors.length}`);
console.log(`\n📁 Total processed: ${files.length}\n`);

if (results.errors.length > 0) {
  console.log('\n⚠️  ERRORS:');
  results.errors.forEach(e => console.log(`  - ${e.name}: ${e.error}`));
}
