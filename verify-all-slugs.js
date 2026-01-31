const fs = require('fs');
const path = require('path');

const dir = 'content/calculators';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

let totalFiles = 0;
let issuesFound = 0;
let filesWithIssues = [];

console.log('🔍 Checking all calculator slugs...\n');

files.forEach(file => {
  const filePath = path.join(dir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  const enSlug = data.en?.slug;
  const esSlug = data.es?.slug;
  const frSlug = data.fr?.slug;
  const ptSlug = data.pt?.slug;
  
  totalFiles++;
  
  let hasIssue = false;
  
  if (esSlug && esSlug !== enSlug) {
    console.log(`❌ ${file}:`);
    console.log(`   ES slug: '${esSlug}' != EN '${enSlug}'`);
    hasIssue = true;
  }
  
  if (frSlug && frSlug !== enSlug) {
    console.log(`❌ ${file}:`);
    console.log(`   FR slug: '${frSlug}' != EN '${enSlug}'`);
    hasIssue = true;
  }
  
  if (ptSlug && ptSlug !== enSlug) {
    console.log(`❌ ${file}:`);
    console.log(`   PT slug: '${ptSlug}' != EN '${enSlug}'`);
    hasIssue = true;
  }
  
  if (hasIssue) {
    issuesFound++;
    filesWithIssues.push(file);
  }
});

console.log('\n' + '='.repeat(60));
console.log('📊 VERIFICATION SUMMARY');
console.log('='.repeat(60));
console.log(`Total files checked: ${totalFiles}`);
console.log(`Files with issues:   ${issuesFound}`);
console.log(`Files verified ✅:    ${totalFiles - issuesFound}`);
console.log('='.repeat(60));

if (issuesFound === 0) {
  console.log('\n✅ SUCCESS! All ' + totalFiles + ' calculator files have consistent English-only slugs across all languages!');
  console.log('\nAll URLs will work correctly:');
  console.log('  /en/[calculator] ✅');
  console.log('  /es/[calculator] ✅');
  console.log('  /fr/[calculator] ✅');
  console.log('  /pt/[calculator] ✅');
} else {
  console.log('\n⚠️  Files needing attention:');
  filesWithIssues.forEach(f => console.log(`   - ${f}`));
}
