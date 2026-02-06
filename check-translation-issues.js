const fs = require('fs');
const path = require('path');

const calculatorsDir = path.join(__dirname, 'content', 'calculators');

// Read all calculator JSON files
const files = fs.readdirSync(calculatorsDir).filter(f => f.endsWith('.json'));

console.log(`Checking ${files.length} calculator files for translation issues...\n`);

const issues = [];

files.forEach(file => {
  const filePath = path.join(calculatorsDir, file);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  const langs = ['es', 'pt', 'fr'];
  
  langs.forEach(lang => {
    if (content[lang] && content[lang].seoContent) {
      const seoContent = content[lang].seoContent;
      
      // Check if introduction has wrong language indicators
      const intro = seoContent.introduction || '';
      
      // Spanish should not have Portuguese words
      if (lang === 'es') {
        if (intro.includes('Calcule a') || intro.includes('nossa') || intro.includes('você') || intro.includes('qualquer')) {
          issues.push({
            file,
            lang: 'es',
            problem: 'Spanish section contains Portuguese text',
            sample: intro.substring(0, 100)
          });
        }
      }
      
      // Portuguese should not have Spanish words  
      if (lang === 'pt') {
        if (intro.includes('Calcule la') || intro.includes('nuestra') || intro.includes('cualquier')) {
          issues.push({
            file,
            lang: 'pt',
            problem: 'Portuguese section contains Spanish text',
            sample: intro.substring(0, 100)
          });
        }
      }
      
      // French checks
      if (lang === 'fr') {
        if (intro.includes('Calcule a') || intro.includes('Calcule la') || intro.includes('nossa') || intro.includes('nuestra')) {
          issues.push({
            file,
            lang: 'fr',
            problem: 'French section contains Spanish/Portuguese text',
            sample: intro.substring(0, 100)
          });
        }
      }
    }
  });
});

console.log(`Found ${issues.length} translation issues:\n`);

issues.forEach(issue => {
  console.log(`❌ ${issue.file}`);
  console.log(`   Language: ${issue.lang}`);
  console.log(`   Problem: ${issue.problem}`);
  console.log(`   Sample: "${issue.sample}..."`);
  console.log('');
});

// Save to file
fs.writeFileSync('translation-issues.json', JSON.stringify(issues, null, 2));
console.log(`\nResults saved to translation-issues.json`);
