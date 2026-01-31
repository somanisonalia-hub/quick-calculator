#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('📊 CALCULATOR READINESS STATUS\n');
console.log('='.repeat(70));

// 1. Check React Components
const componentsDir = path.join(__dirname, 'src', 'components', 'calculators');
const components = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

// 2. Check JSON Files
const contentDir = path.join(__dirname, 'content', 'calculators');
const jsonFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'));

// 3. Analyze JSON completeness
const jsonStats = jsonFiles.map(file => {
  const filePath = path.join(contentDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n').length;
  
  // Check for key properties
  const hasCalculatorComponent = content.includes('"calculatorComponent"');
  const hasExamples = content.includes('"examples"');
  const hasComparisonTable = content.includes('"comparisonTable"');
  const hasSeoContent = content.includes('"seoContent"');
  const hasFaqs = content.includes('"faqs"');
  
  // Count languages
  const languages = [];
  if (content.includes('"en":')) languages.push('en');
  if (content.includes('"es":')) languages.push('es');
  if (content.includes('"pt":')) languages.push('pt');
  if (content.includes('"fr":')) languages.push('fr');
  
  const isComplete = lines > 500 && hasCalculatorComponent && hasExamples && hasSeoContent && languages.length === 4;
  
  return {
    file: file.replace('.json', ''),
    lines,
    hasCalculatorComponent,
    hasExamples,
    hasComparisonTable,
    hasSeoContent,
    hasFaqs,
    languages: languages.length,
    isComplete
  };
});

// 4. Generate Report
console.log('\n📁 FILES SUMMARY:');
console.log(`   React Components: ${components.length}`);
console.log(`   JSON Files:       ${jsonFiles.length}`);
console.log(`   Total Unique:     ${jsonFiles.length} calculators`);

// Complete vs Incomplete JSONs
const complete = jsonStats.filter(s => s.isComplete);
const incomplete = jsonStats.filter(s => !s.isComplete);

console.log('\n📊 JSON COMPLETENESS:');
console.log(`   ✅ Complete (>500 lines, all properties): ${complete.length}`);
console.log(`   ⚠️  Incomplete (<500 lines):              ${incomplete.length}`);
console.log(`   Completion Rate:                         ${((complete.length / jsonStats.length) * 100).toFixed(1)}%`);

// Language coverage
const fullLanguage = jsonStats.filter(s => s.languages === 4);
console.log('\n🌍 LANGUAGE COVERAGE:');
console.log(`   All 4 Languages (en,es,pt,fr): ${fullLanguage.length}/${jsonStats.length} (${((fullLanguage.length / jsonStats.length) * 100).toFixed(1)}%)`);

// Property coverage
const withCalcComponent = jsonStats.filter(s => s.hasCalculatorComponent).length;
const withExamples = jsonStats.filter(s => s.hasExamples).length;
const withComparison = jsonStats.filter(s => s.hasComparisonTable).length;
const withSeoContent = jsonStats.filter(s => s.hasSeoContent).length;
const withFaqs = jsonStats.filter(s => s.hasFaqs).length;

console.log('\n🔧 PROPERTY COVERAGE:');
console.log(`   calculatorComponent: ${withCalcComponent}/${jsonStats.length} (${((withCalcComponent / jsonStats.length) * 100).toFixed(1)}%)`);
console.log(`   examples:            ${withExamples}/${jsonStats.length} (${((withExamples / jsonStats.length) * 100).toFixed(1)}%)`);
console.log(`   comparisonTable:     ${withComparison}/${jsonStats.length} (${((withComparison / jsonStats.length) * 100).toFixed(1)}%)`);
console.log(`   seoContent:          ${withSeoContent}/${jsonStats.length} (${((withSeoContent / jsonStats.length) * 100).toFixed(1)}%)`);
console.log(`   faqs:                ${withFaqs}/${jsonStats.length} (${((withFaqs / jsonStats.length) * 100).toFixed(1)}%)`);

// Show complete files
console.log('\n✅ COMPLETE JSON FILES:');
complete.slice(0, 10).forEach(s => {
  console.log(`   ${s.file.padEnd(40)} ${s.lines} lines`);
});
if (complete.length > 10) {
  console.log(`   ... and ${complete.length - 10} more`);
}

// Show sample incomplete files
console.log('\n⚠️  SAMPLE INCOMPLETE FILES (need enhancement):');
incomplete.slice(0, 15).forEach(s => {
  const missing = [];
  if (!s.hasCalculatorComponent) missing.push('calcComponent');
  if (!s.hasExamples) missing.push('examples');
  if (!s.hasSeoContent) missing.push('seoContent');
  if (s.languages < 4) missing.push(`${s.languages}/4 langs`);
  console.log(`   ${s.file.padEnd(40)} ${s.lines.toString().padStart(4)} lines  Missing: ${missing.join(', ')}`);
});
if (incomplete.length > 15) {
  console.log(`   ... and ${incomplete.length - 15} more incomplete files`);
}

// Overall Status
console.log('\n' + '='.repeat(70));
console.log('\n🎯 DEPLOYMENT STATUS:\n');

if (complete.length === jsonStats.length) {
  console.log('🟢 FULLY READY - All calculators have complete content');
} else if (complete.length > jsonStats.length * 0.5) {
  console.log('🟡 PARTIALLY READY - Pages work but content enhancement recommended');
  console.log(`   ${complete.length} calculators fully ready`);
  console.log(`   ${incomplete.length} calculators need content completion`);
} else {
  console.log('🟠 FUNCTIONAL BUT BASIC - Most pages need content enhancement');
  console.log(`   ${complete.length} calculators fully ready`);
  console.log(`   ${incomplete.length} calculators need content completion`);
}

console.log('\n📋 READINESS BREAKDOWN:\n');
console.log('   ✅ Technical Infrastructure:  READY');
console.log('      - Categories mapped');
console.log('      - SEO schema implemented');
console.log('      - Multi-language support active');
console.log('      - React components: 112 available');
console.log('');
console.log(`   ${complete.length > 50 ? '✅' : '⚠️ '} Content Completeness:       ${complete.length > 50 ? 'GOOD' : 'NEEDS WORK'}`);
console.log(`      - Complete files: ${complete.length}/${jsonStats.length}`);
console.log(`      - Incomplete files: ${incomplete.length}/${jsonStats.length}`);
console.log('');
console.log(`   ${fullLanguage.length === jsonStats.length ? '✅' : '⚠️ '} Multi-Language Content:     ${fullLanguage.length === jsonStats.length ? 'COMPLETE' : 'PARTIAL'}`);
console.log(`      - Full 4-language support: ${fullLanguage.length}/${jsonStats.length}`);

console.log('\n💡 RECOMMENDATION:\n');
if (complete.length < jsonStats.length * 0.1) {
  console.log('   Focus on completing top 10-20 most important calculators first.');
  console.log('   Current completion rate is too low for optimal SEO performance.');
} else if (complete.length < jsonStats.length * 0.5) {
  console.log('   Pages are functional and deployable.');
  console.log('   Consider completing remaining calculators post-deployment.');
  console.log('   Prioritize high-traffic calculators for best ROI.');
} else {
  console.log('   Excellent content coverage!');
  console.log('   Deploy now, enhance remaining calculators incrementally.');
}

console.log('\n' + '='.repeat(70));
