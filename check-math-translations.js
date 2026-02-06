const fs = require('fs');
const path = require('path');

const calculatorsDir = path.join(__dirname, 'content', 'calculators');

// Read all calculator JSON files
const files = fs.readdirSync(calculatorsDir).filter(f => f.endsWith('.json'));

console.log('Checking Math category calculators for English content in translations...\n');

const mathCalculators = [];
const englishIssues = [];

// Common English words that shouldn't appear in other languages
const englishIndicators = [
  'Calculate the',
  'This calculator',
  'Our calculator',
  'whether you',
  'provides accurate',
  'perfect for students',
  'access to'
];

files.forEach(file => {
  const filePath = path.join(calculatorsDir, file);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // Check if it's a math calculator
  if (content.en && content.en.category === 'math') {
    const calculatorName = content.en.title || file;
    mathCalculators.push({
      file,
      name: calculatorName
    });
    
    // Check Spanish, Portuguese, French for English content
    const langs = ['es', 'pt', 'fr'];
    let hasIssue = false;
    
    langs.forEach(lang => {
      if (content[lang] && content[lang].seoContent) {
        const intro = content[lang].seoContent.introduction || '';
        
        const foundEnglish = englishIndicators.some(indicator => 
          intro.toLowerCase().includes(indicator.toLowerCase())
        );
        
        if (foundEnglish) {
          hasIssue = true;
        }
      }
    });
    
    englishIssues.push({
      file,
      name: calculatorName,
      hasEnglish: hasIssue
    });
  }
});

console.log(`Found ${mathCalculators.length} Math calculators:\n`);

// Group by status
const withEnglish = englishIssues.filter(c => c.hasEnglish);
const fullyTranslated = englishIssues.filter(c => !c.hasEnglish);

console.log('✅ FULLY TRANSLATED (SEO content in all languages):');
console.log('=' .repeat(60));
fullyTranslated.forEach(calc => {
  console.log(`  ✓ ${calc.name}`);
});

console.log(`\n❌ NEEDS TRANSLATION (has English in ES/PT/FR sections):`);
console.log('=' .repeat(60));
withEnglish.forEach(calc => {
  console.log(`  ✗ ${calc.name}`);
});

console.log(`\n📊 SUMMARY:`);
console.log(`  Total Math calculators: ${mathCalculators.length}`);
console.log(`  Fully translated: ${fullyTranslated.length} (${((fullyTranslated.length/mathCalculators.length)*100).toFixed(1)}%)`);
console.log(`  Need translation: ${withEnglish.length} (${((withEnglish.length/mathCalculators.length)*100).toFixed(1)}%)`);

// Save detailed report
const report = {
  totalMathCalculators: mathCalculators.length,
  fullyTranslated: fullyTranslated,
  needsTranslation: withEnglish
};

fs.writeFileSync('math-calculators-translation-status.json', JSON.stringify(report, null, 2));
console.log(`\n📁 Detailed report saved to: math-calculators-translation-status.json`);
