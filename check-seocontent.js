const fs = require('fs');
const path = require('path');

const dir = './content/calculators';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort();

let withComplete = 0;
let withPartial = 0;
let missing = 0;

console.log('\n📋 SEO CONTENT VERIFICATION\n');

files.forEach(file => {
  const content = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
  const seo = content.en?.seoContent;
  
  if (seo && seo.introduction && seo.benefits && seo.steps && seo.faqs) {
    const benefitsCount = seo.benefits.length || 0;
    const stepsCount = seo.steps.length || 0;
    const faqsCount = seo.faqs.length || 0;
    
    if (benefitsCount >= 5 && stepsCount >= 5 && faqsCount >= 5) {
      withComplete++;
    } else {
      console.log(`⚠️  ${file.padEnd(40)} - Partial (benefits:${benefitsCount}, steps:${stepsCount}, faqs:${faqsCount})`);
      withPartial++;
    }
  } else {
    console.log(`❌ ${file.padEnd(40)} - Missing seoContent`);
    missing++;
  }
});

console.log('\n' + '═'.repeat(70));
console.log('\n📊 SUMMARY:');
console.log(`   ✅ Complete seoContent:  ${withComplete}/${files.length} (${(withComplete/files.length*100).toFixed(1)}%)`);
console.log(`   ⚠️  Partial seoContent:   ${withPartial}/${files.length}`);
console.log(`   ❌ Missing seoContent:   ${missing}/${files.length}`);
console.log('\n' + '═'.repeat(70));
console.log(`\n${withComplete === files.length ? '🎉 ALL CALCULATORS HAVE COMPLETE SEO CONTENT!' : '⚠️  Some calculators need enhancement'}\n`);
