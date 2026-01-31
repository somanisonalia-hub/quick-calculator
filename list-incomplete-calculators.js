#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, 'content', 'calculators');
const jsonFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'));

const incomplete = [];

jsonFiles.forEach(file => {
  const filePath = path.join(contentDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n').length;
  
  const hasCalculatorComponent = content.includes('"calculatorComponent"');
  const hasExamples = content.includes('"examples"');
  const hasSeoContent = content.includes('"seoContent"');
  const hasFaqs = content.includes('"faqs"');
  
  const languages = [];
  if (content.includes('"en":')) languages.push('en');
  if (content.includes('"es":')) languages.push('es');
  if (content.includes('"pt":')) languages.push('pt');
  if (content.includes('"fr":')) languages.push('fr');
  
  const isComplete = lines > 500 && hasCalculatorComponent && hasExamples && hasSeoContent && languages.length === 4;
  
  if (!isComplete) {
    const missing = [];
    if (!hasCalculatorComponent) missing.push('calculatorComponent');
    if (!hasExamples) missing.push('examples');
    if (!hasSeoContent) missing.push('seoContent');
    if (!hasFaqs) missing.push('faqs');
    if (languages.length < 4) missing.push(`langs:${languages.length}/4`);
    
    incomplete.push({
      file: file.replace('.json', ''),
      lines,
      missing,
      priority: lines < 100 ? 'HIGH' : lines < 300 ? 'MEDIUM' : 'LOW'
    });
  }
});

// Sort by priority and lines
incomplete.sort((a, b) => {
  const priorityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
  if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  }
  return a.lines - b.lines;
});

console.log('INCOMPLETE CALCULATORS TO COMPLETE\n');
console.log('='.repeat(80));
console.log(`\nTotal: ${incomplete.length} calculators need completion\n`);

const high = incomplete.filter(c => c.priority === 'HIGH');
const medium = incomplete.filter(c => c.priority === 'MEDIUM');
const low = incomplete.filter(c => c.priority === 'LOW');

console.log(`🔴 HIGH PRIORITY (< 100 lines): ${high.length} calculators`);
console.log(`🟡 MEDIUM PRIORITY (100-300 lines): ${medium.length} calculators`);
console.log(`🟢 LOW PRIORITY (300-500 lines): ${low.length} calculators\n`);

console.log('='.repeat(80));
console.log('\n🔴 HIGH PRIORITY - Complete These First:\n');
high.forEach((c, i) => {
  console.log(`${(i+1).toString().padStart(2)}. ${c.file.padEnd(45)} ${c.lines.toString().padStart(4)} lines  Missing: ${c.missing.join(', ')}`);
});

console.log('\n🟡 MEDIUM PRIORITY - Complete Next:\n');
medium.slice(0, 15).forEach((c, i) => {
  console.log(`${(i+1).toString().padStart(2)}. ${c.file.padEnd(45)} ${c.lines.toString().padStart(4)} lines  Missing: ${c.missing.join(', ')}`);
});
if (medium.length > 15) {
  console.log(`... and ${medium.length - 15} more`);
}

console.log('\n🟢 LOW PRIORITY - Complete Last:\n');
low.slice(0, 10).forEach((c, i) => {
  console.log(`${(i+1).toString().padStart(2)}. ${c.file.padEnd(45)} ${c.lines.toString().padStart(4)} lines  Missing: ${c.missing.join(', ')}`);
});
if (low.length > 10) {
  console.log(`... and ${low.length - 10} more`);
}

// Export list for automation
const output = {
  high: high.map(c => c.file),
  medium: medium.map(c => c.file),
  low: low.map(c => c.file),
  all: incomplete.map(c => c.file)
};

fs.writeFileSync('incomplete-calculators.json', JSON.stringify(output, null, 2));
console.log('\n✅ List saved to incomplete-calculators.json\n');
