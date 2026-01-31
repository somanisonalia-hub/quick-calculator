const fs = require('fs');
const path = require('path');

// Get all registered components
const registryContent = fs.readFileSync('src/components/calculators/CalculatorRegistry.tsx', 'utf8');
const registered = new Set();
registryContent.match(/'([A-Z][^']+)':/g)?.forEach(m => {
  registered.add(m.replace(/[':]/g, ''));
});

console.log('Total registered components:', registered.size);

// Check all calculator JSON files
const contentDir = 'content/calculators';
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'));

let noComponent = [];
let wrongComponent = [];
let working = [];

files.forEach(file => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(contentDir, file), 'utf8'));
    const enData = data.en;
    
    if (!enData.component) {
      noComponent.push(file);
    } else if (!registered.has(enData.component)) {
      wrongComponent.push({ file, component: enData.component });
    } else {
      working.push(file);
    }
  } catch (err) {
    console.error('Error reading', file, err.message);
  }
});

console.log('\n=== RESULTS ===');
console.log('✅ Working calculators:', working.length);
console.log('❌ Missing component field:', noComponent.length);
console.log('⚠️  Component not registered:', wrongComponent.length);

if (noComponent.length > 0) {
  console.log('\n--- Missing component field ---');
  noComponent.forEach(f => console.log('  -', f));
}

if (wrongComponent.length > 0) {
  console.log('\n--- Component not in registry ---');
  wrongComponent.forEach(({file, component}) => console.log('  -', file, '->', component));
}

console.log('\nTotal calculators:', files.length);
console.log('\n' + (noComponent.length === 0 && wrongComponent.length === 0 ? '✅ ALL CALCULATORS WILL WORK!' : '⚠️  Some calculators need fixes'));
