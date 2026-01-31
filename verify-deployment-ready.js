#!/usr/bin/env node

/**
 * Deployment Readiness Verification Script
 * Verifies all 131 calculators are properly categorized
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 DEPLOYMENT READINESS VERIFICATION\n');
console.log('=' .repeat(60));

// 1. Count JSON files
const contentDir = path.join(__dirname, 'content', 'calculators');
const jsonFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'));
const allSlugs = jsonFiles.map(f => f.replace('.json', '')).sort();

console.log(`\n✅ JSON Files Found: ${jsonFiles.length}`);

// 2. Load CALCULATOR_CATEGORIES
const categoryUtilsPath = path.join(__dirname, 'src', 'lib', 'categoryUtils.ts');
const categoryUtilsContent = fs.readFileSync(categoryUtilsPath, 'utf8');

// Extract CALCULATOR_CATEGORIES
const match = categoryUtilsContent.match(/export const CALCULATOR_CATEGORIES = \{([^}]+)\}/s);
if (!match) {
  console.error('❌ ERROR: Could not find CALCULATOR_CATEGORIES');
  process.exit(1);
}

const categoriesText = match[0];
const categoryEntries = categoriesText.match(/'([^']+)':\s*'([^']+)'/g) || [];
const categorizedSlugs = {};

categoryEntries.forEach(entry => {
  const [, slug, category] = entry.match(/'([^']+)':\s*'([^']+)'/) || [];
  if (slug && category) {
    categorizedSlugs[slug] = category;
  }
});

console.log(`✅ Categorized Calculators: ${Object.keys(categorizedSlugs).length}`);

// 3. Find missing calculators
const missing = allSlugs.filter(slug => !categorizedSlugs[slug]);

if (missing.length > 0) {
  console.log(`\n❌ MISSING FROM CATEGORIES: ${missing.length}`);
  missing.forEach(slug => console.log(`   - ${slug}`));
  console.log('\n⚠️  DEPLOYMENT NOT READY - Fix missing categories first!');
  process.exit(1);
} else {
  console.log('✅ All calculators categorized!');
}

// 4. Category distribution
const distribution = {};
Object.values(categorizedSlugs).forEach(cat => {
  distribution[cat] = (distribution[cat] || 0) + 1;
});

console.log('\n📊 CATEGORY DISTRIBUTION:');
Object.entries(distribution)
  .sort((a, b) => b[1] - a[1])
  .forEach(([cat, count]) => {
    const pct = ((count / allSlugs.length) * 100).toFixed(1);
    console.log(`   ${cat.padEnd(12)} ${count.toString().padStart(3)} (${pct}%)`);
  });

// 5. Verify new calculators
const newCalculators = [
  'retirement-savings',
  'savings-goal',
  'credit-card-payoff',
  'emergency-fund',
  'net-worth',
  'exam-score-predictor',
  'trip-planner',
  'sleep-calculator',
  'debt-to-income'
];

console.log('\n🆕 NEW CALCULATORS STATUS:');
let allNewCategorized = true;
newCalculators.forEach(slug => {
  const hasJSON = allSlugs.includes(slug);
  const category = categorizedSlugs[slug];
  const status = hasJSON && category ? '✅' : '❌';
  console.log(`   ${status} ${slug.padEnd(25)} → ${category || 'NOT CATEGORIZED'}`);
  if (!category) allNewCategorized = false;
});

// 6. Check for duplicates
const duplicates = allSlugs.filter((slug, idx, arr) => arr.indexOf(slug) !== idx);
if (duplicates.length > 0) {
  console.log(`\n❌ DUPLICATE SLUGS: ${duplicates.length}`);
  duplicates.forEach(slug => console.log(`   - ${slug}`));
}

// 7. Final verdict
console.log('\n' + '='.repeat(60));
if (missing.length === 0 && allNewCategorized && duplicates.length === 0) {
  console.log('🟢 DEPLOYMENT READY - ALL CHECKS PASSED ✅');
  console.log('\nSummary:');
  console.log(`  • ${allSlugs.length} calculators with JSON files`);
  console.log(`  • ${Object.keys(categorizedSlugs).length} properly categorized`);
  console.log(`  • ${newCalculators.length} new calculators included`);
  console.log(`  • ${Object.keys(distribution).length} categories active`);
  console.log('\nYou can now deploy to production! 🚀');
  process.exit(0);
} else {
  console.log('🔴 DEPLOYMENT NOT READY - ISSUES FOUND ⚠️');
  process.exit(1);
}
