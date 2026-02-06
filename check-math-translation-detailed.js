const fs = require('fs');
const path = require('path');

// List of Math calculators that need translation
const mathCalculatorsToTranslate = [
  'triangle-area-calculator', // Already done
  'volume-calculator',
  'pythagorean-theorem-calculator',
  'standard-deviation-calculator',
  'surface-area-calculator',
  'feet-inches-calculator',
  'quadratic-equation-calculator'
];

console.log('Math Calculators Translation Summary\n');
console.log('=====================================\n');

mathCalculatorsToTranslate.forEach(calc => {
  const filePath = path.join(__dirname, 'content', 'calculators', `${calc}.json`);
  
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    // Check translation status
    const langs = ['es', 'pt', 'fr'];
    const status = {};
    
    langs.forEach(lang => {
      if (data[lang] && data[lang].seoContent) {
        const intro = data[lang].seoContent.introduction || '';
        // Check if it has English indicators
        const hasEnglish = intro.toLowerCase().includes('calculate') && 
                          intro.toLowerCase().includes('this') &&
                          intro.toLowerCase().includes('calculator');
        status[lang] = hasEnglish ? '❌ English' : '✅ Translated';
      } else {
        status[lang] = '⚠️ Missing';
      }
    });
    
    console.log(`📄 ${data.en.title}`);
    console.log(`   ES: ${status.es}`);
    console.log(`   PT: ${status.pt}`);
    console.log(`   FR: ${status.fr}`);
    console.log('');
  } catch (error) {
    console.log(`❌ Error reading ${calc}: ${error.message}\n`);
  }
});

console.log('\n✅ Triangle Area Calculator - Already translated by Copilot');
console.log('📝 Remaining 6 calculators need translation');
console.log('\nTo complete 100% Math category translation, translate:');
console.log('  - Volume Calculator (High Priority)');
console.log('  - Pythagorean Theorem Calculator (High Priority)');
console.log('  - Standard Deviation Calculator');
console.log('  - Surface Area Calculator');
console.log('  - Feet & Inches Calculator');
console.log('  - Quadratic Equation Calculator');
