const fs = require('fs');
const path = require('path');

const calculatorsDir = 'src/components/calculators';
const files = fs.readdirSync(calculatorsDir).filter(f => f.endsWith('.tsx'));

const results = {
  noButtons: [],
  noCalculate: [],
  noReset: [],
  hasReset: [],
  hasBoth: []
};

files.forEach(file => {
  const filePath = path.join(calculatorsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check for button elements
  const hasAnyButton = /<button/.test(content);
  
  // Check for calculate button (look for onClick with calculate function or t.calculate text)
  const hasCalculateButton = /onClick=\{.*calculate/i.test(content) || /\{t\.calculate/i.test(content);
  
  // Check for reset button
  const hasResetButton = /onClick=\{.*reset/i.test(content) || /\{t\.reset/i.test(content);
  
  const name = file.replace('.tsx', '');
  
  if (!hasAnyButton) {
    results.noButtons.push(name);
  } else if (!hasCalculateButton && !hasResetButton) {
    results.noButtons.push(name);
  } else if (!hasCalculateButton) {
    results.noCalculate.push(name);
  } else if (!hasResetButton) {
    results.noReset.push(name);
  } else {
    results.hasBoth.push(name);
  }
});

console.log('\n📊 CALCULATOR BUTTON AUDIT\n');
console.log('=' .repeat(60));

console.log(`\n✅ Calculators with BOTH buttons: ${results.hasBoth.length}`);

console.log(`\n❌ Calculators with NO buttons: ${results.noButtons.length}`);
if (results.noButtons.length > 0) {
  results.noButtons.forEach(name => console.log(`  - ${name}`));
}

console.log(`\n⚠️  Calculators MISSING Calculate button: ${results.noCalculate.length}`);
if (results.noCalculate.length > 0) {
  results.noCalculate.forEach(name => console.log(`  - ${name}`));
}

console.log(`\n⚠️  Calculators MISSING Reset button: ${results.noReset.length}`);
if (results.noReset.length > 0) {
  results.noReset.forEach(name => console.log(`  - ${name}`));
}

const needsFix = results.noButtons.length + results.noCalculate.length + results.noReset.length;
console.log(`\n🔧 Total calculators needing fixes: ${needsFix}`);
console.log(`\n✓ Total calculators OK: ${results.hasBoth.length}`);
console.log(`\n📁 Total calculators checked: ${files.length}`);
console.log('\n' + '='.repeat(60) + '\n');
