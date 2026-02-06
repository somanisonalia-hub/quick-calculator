const fs = require('fs');
const path = require('path');

// Get all calculator JSON files
const calculatorsDir = path.join(__dirname, 'content/calculators');
const allCalculators = fs.readdirSync(calculatorsDir)
  .filter(file => file.endsWith('.json'))
  .map(file => file.replace('.json', ''))
  .sort();

// Read contentRegistry.ts
const registryPath = path.join(__dirname, 'src/lib/contentRegistry.ts');
let registryContent = fs.readFileSync(registryPath, 'utf-8');

// Extract already imported calculators
const importedCalculators = [];
const importRegex = /import\s+(\w+)\s+from\s+'\.\.\/\.\.\/content\/calculators\/([\w-]+)\.json'/g;
let match;
while ((match = importRegex.exec(registryContent)) !== null) {
  importedCalculators.push(match[2]);
}

// Find missing calculators
const missingCalculators = allCalculators.filter(calc => !importedCalculators.includes(calc));

console.log(`Total calculators: ${allCalculators.length}`);
console.log(`Imported calculators: ${importedCalculators.length}`);
console.log(`Missing calculators: ${missingCalculators.length}`);

if (missingCalculators.length === 0) {
  console.log('✅ All calculators are imported!');
  process.exit(0);
}

console.log('\n📝 Missing calculators:');
missingCalculators.forEach(calc => console.log(`  - ${calc}`));

// Generate import statements
const toCamelCase = (str) => {
  return str.replace(/-([a-z0-9])/g, (g) => g[1].toUpperCase());
};

const newImports = missingCalculators.map(calc => {
  const varName = toCamelCase(calc.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).replace(/\s/g, ''));
  const finalVarName = varName.charAt(0).toLowerCase() + varName.slice(1);
  return `import ${finalVarName} from '../../content/calculators/${calc}.json';`;
}).join('\n');

// Generate registry entries
const newRegistryEntries = missingCalculators.map(calc => {
  const varName = toCamelCase(calc.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).replace(/\s/g, ''));
  const finalVarName = varName.charAt(0).toLowerCase() + varName.slice(1);
  return `  'calculators-${calc}': ${finalVarName},`;
}).join('\n');

// Find the last import line for calculators
const lastImportMatch = registryContent.match(/import\s+\w+\s+from\s+'\.\.\/\.\.\/content\/calculators\/[\w-]+\.json';(\n|$)/g);
if (lastImportMatch && lastImportMatch.length > 0) {
  const lastImport = lastImportMatch[lastImportMatch.length - 1];
  const lastImportIndex = registryContent.lastIndexOf(lastImport);
  const insertPosition = lastImportIndex + lastImport.length;
  
  // Insert new imports
  registryContent = registryContent.slice(0, insertPosition) + newImports + '\n' + registryContent.slice(insertPosition);
}

// Find the contentRegistry object and add new entries
const registryMatch = registryContent.match(/export const contentRegistry[^{]*\{/);
if (registryMatch) {
  const registryStart = registryContent.indexOf(registryMatch[0]) + registryMatch[0].length;
  
  // Find the last 'calculators-' entry
  const calculatorEntryRegex = /\s+'calculators-[\w-]+':[\s\w,]+/g;
  let lastMatch;
  let lastIndex = -1;
  
  while ((match = calculatorEntryRegex.exec(registryContent)) !== null) {
    lastMatch = match[0];
    lastIndex = match.index + match[0].length;
  }
  
  if (lastIndex !== -1) {
    // Insert after the last calculator entry
    registryContent = registryContent.slice(0, lastIndex) + '\n' + newRegistryEntries + registryContent.slice(lastIndex);
  }
}

// Write back to file
fs.writeFileSync(registryPath, registryContent, 'utf-8');

console.log('\n✅ Updated contentRegistry.ts with missing imports!');
console.log('\n🔄 Run "npm run build" to verify all schemas are generated.');
