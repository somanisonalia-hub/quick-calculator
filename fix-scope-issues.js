const fs = require('fs');
const path = require('path');

// Read the error report
const report = JSON.parse(fs.readFileSync('all-calculators-report.json', 'utf8'));

// Get only calculators with "is not defined" errors  
const brokenCalculators = report
  .filter(r => r.status === 'error' && r.errors && r.errors.some(e => e.includes('is not defined')))
  .map(r => ({
    slug: r.url,
    functionName: r.errors[0].replace(' is not defined', ''),
    fileName: r.url.split('-').map((word, i) => 
      i === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('') + '.tsx'
  }));

console.log(`\n🔧 Function Scope Fix Script\n`);
console.log(`Found ${brokenCalculators.length} calculators with scope issues\n`);

const calculatorsDir = path.join(__dirname, 'src/components/calculators');
let fixedCount = 0;
let failedCount = 0;

brokenCalculators.forEach((calc, index) => {
  const filePath = path.join(calculatorsDir, calc.fileName);
  
  process.stdout.write(`[${index + 1}/${brokenCalculators.length}] ${calc.slug.padEnd(45)}`);
  
  if (!fs.existsSync(filePath)) {
    console.log('❌ File not found');
    failedCount++;
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Check if this is a useEffect scope issue
  // Pattern: useEffect(() => { const functionName = () => { ... }; ...  }, [deps]);
  
  // Find useEffect blocks
  const useEffectRegex = /useEffect\(\(\)\s*=>\s*{([\s\S]*?)}, \[.*?\]\);/g;
  let match;
  
  while ((match = useEffectRegex.exec(content)) !== null) {
    const useEffectContent = match[1];
    const useEffectStart = match.index;
    const useEffectEnd = match.index + match[0].length;
    
    // Check if the broken function is defined inside this useEffect
    const funcDefRegex = new RegExp(`const ${calc.functionName}\\s*=\\s*\\(`, 'g');
    const resetDefRegex = /const resetCalculator\s*=\s*\(/g;
    
    const hasFuncDef = funcDefRegex.test(useEffectContent);
    const hasResetDef = resetDefRegex.test(useEffectContent);
    
    if (hasFuncDef || hasResetDef) {
      // This useEffect contains function definitions that need to be extracted
      // For now, mark it for manual review
      console.log('⚠️  Needs review (complex)');
      failedCount++;
      modified = false;
      break;
    }
  }
  
  if (!modified) {
    // Try simpler pattern - function defined just before useEffect closing
    // This is what we fixed in MortgageCalculator, BMICalculator, TaxCalculator
    
    // Pattern 1: const funcName = () => { ... }; ... } }, [deps]);
    // Extract the function, move it before useEffect
    
    const pattern1 = new RegExp(
      `(\\s*const ${calc.functionName}\\s*=\\s*\\([^)]*\\)\\s*=>\\s*{[\\s\\S]*?};)([\\s\\S]*?)}, \\[`,
      'g'
    );
    
    if (pattern1.test(content)) {
      // Found the pattern - but extraction is complex
      // For safety, just mark for manual fix
      console.log('⚠️  Pattern detected, manual fix recommended');
      failedCount++;
      return;
    }
  }
  
  console.log(modified ? '✅' : '⏭️  Skipped');
});

console.log(`\n${'='.repeat(70)}`);
console.log(`\n📊 SUMMARY\n`);
console.log(`✅ Fixed: ${fixedCount}`);
console.log(`⚠️  Needs Manual Review: ${failedCount}`);
console.log(`📝 Total: ${brokenCalculators.length}\n`);

// Output list of files needing manual fixes
if (failedCount > 0) {
  console.log(`${'='.repeat(70)}\n`);
  console.log(`📋 FILES REQUIRING MANUAL FIX:\n`);
  brokenCalculators.forEach((calc, i) => {
    console.log(`${i + 1}. src/components/calculators/${calc.fileName}`);
    console.log(`   Function: ${calc.functionName}`);
    console.log(`   URL: /en/${calc.slug}/\n`);
  });
}
