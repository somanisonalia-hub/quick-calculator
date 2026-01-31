const fs = require('fs');
const path = require('path');

const dir = './content/calculators';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

let stats = {
  total: files.length,
  withSeoContent: 0,
  withExamples: 0,
  withComponent: 0,
  withAllLanguages: 0,
  fullComplete: 0,
  under200: 0,
  under400: 0,
  over500: 0
};

files.forEach(file => {
  const content = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
  const lines = fs.readFileSync(path.join(dir, file), 'utf8').split('\n').length;
  
  if (content.en?.seoContent?.benefits && content.en.seoContent.benefits.length >= 5) stats.withSeoContent++;
  if (content.en?.examples && content.en.examples.length >= 3) stats.withExamples++;
  if (content.en?.calculatorComponent) stats.withComponent++;
  if (content.en && content.es && content.fr && content.pt) stats.withAllLanguages++;
  
  if (lines < 200) stats.under200++;
  else if (lines < 400) stats.under400++;
  else if (lines >= 500) stats.over500++;
  
  if (content.en?.seoContent?.benefits?.length >= 5 && 
      content.en?.examples?.length >= 3 && 
      content.en?.calculatorComponent &&
      lines >= 400) {
    stats.fullComplete++;
  }
});

console.log('\n📊 FINAL DEPLOYMENT READINESS REPORT\n');
console.log('═'.repeat(60));
console.log('\n📈 CONTENT COMPLETENESS:');
console.log(`   Total Calculators: ${stats.total}/131`);
console.log(`   Full seoContent:   ${stats.withSeoContent}/${stats.total} (${(stats.withSeoContent/stats.total*100).toFixed(1)}%)`);
console.log(`   3+ Examples:       ${stats.withExamples}/${stats.total} (${(stats.withExamples/stats.total*100).toFixed(1)}%)`);
console.log(`   Component defined: ${stats.withComponent}/${stats.total} (${(stats.withComponent/stats.total*100).toFixed(1)}%)`);
console.log(`   All 4 Languages:   ${stats.withAllLanguages}/${stats.total} (${(stats.withAllLanguages/stats.total*100).toFixed(1)}%)`);
console.log(`\n📏 FILE SIZE DISTRIBUTION:`);
console.log(`   Under 200 lines:  ${stats.under200}`);
console.log(`   200-400 lines:    ${stats.under400}`);
console.log(`   400-500 lines:    ${stats.total - stats.over500 - stats.under400 - stats.under200}`);
console.log(`   Over 500 lines:   ${stats.over500}`);
console.log(`\n✅ DEPLOYMENT READY:`);
console.log(`   Production Quality: ${stats.fullComplete}/${stats.total} (${(stats.fullComplete/stats.total*100).toFixed(1)}%)`);
console.log('\n═'.repeat(60));
console.log(`\n🎯 VERDICT: ${stats.fullComplete >= 125 ? '✅ READY TO DEPLOY' : '⚠️  NEEDS MORE WORK'}\n`);
