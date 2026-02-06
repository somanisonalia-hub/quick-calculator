const fs = require('fs');
const path = require('path');

const calculatorsDir = path.join(__dirname, 'content', 'calculators');

// Read all calculator JSON files
const files = fs.readdirSync(calculatorsDir).filter(f => f.endsWith('.json'));

console.log(`Checking ${files.length} calculator files for English content in non-English sections...\n`);

const issues = [];

files.forEach(file => {
  const filePath = path.join(calculatorsDir, file);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  const langs = ['es', 'pt', 'fr'];
  
  langs.forEach(lang => {
    if (content[lang] && content[lang].seoContent) {
      const seoContent = content[lang].seoContent;
      
      // Check if introduction has English indicators
      const intro = seoContent.introduction || '';
      
      // Check for common English words that shouldn't appear in other languages
      const englishIndicators = [
        'Calculate the',
        'This calculator',
        'Our calculator',
        'whether you',
        'provides accurate',
        'perfect for students',
        'access to'
      ];
      
      const foundEnglish = englishIndicators.some(indicator => 
        intro.toLowerCase().includes(indicator.toLowerCase())
      );
      
      if (foundEnglish) {
        issues.push({
          file,
          lang,
          problem: `${lang.toUpperCase()} section contains English text`,
          sample: intro.substring(0, 150)
        });
      }
      
      // Check benefits array
      if (seoContent.benefits && seoContent.benefits.length > 0) {
        const firstBenefit = seoContent.benefits[0] || '';
        const benefitHasEnglish = englishIndicators.some(indicator => 
          firstBenefit.toLowerCase().includes(indicator.toLowerCase())
        );
        
        if (benefitHasEnglish) {
          issues.push({
            file,
            lang,
            problem: `${lang.toUpperCase()} benefits contain English text`,
            sample: firstBenefit.substring(0, 100)
          });
        }
      }
    }
  });
});

console.log(`Found ${issues.length} English content issues:\n`);

if (issues.length > 0) {
  issues.forEach(issue => {
    console.log(`❌ ${issue.file}`);
    console.log(`   Language: ${issue.lang}`);
    console.log(`   Problem: ${issue.problem}`);
    console.log(`   Sample: "${issue.sample}..."`);
    console.log('');
  });
} else {
  console.log('✅ No English content found in non-English sections!');
}

// Save to file
fs.writeFileSync('english-in-translations.json', JSON.stringify(issues, null, 2));
console.log(`\nResults saved to english-in-translations.json`);
