#!/usr/bin/env node

/**
 * Quick fix script to register unregistered calculator components
 * This adds the missing component registrations to CalculatorRegistry.tsx
 */

const fs = require('fs');
const path = require('path');

const registryPath = path.join(__dirname, 'src/components/calculators/CalculatorRegistry.tsx');
const componentsToRegister = [
  'BreakEvenCalculator',
  'CaloriesBurnedCalculator',
  'DecimalToFractionCalculator',
  'DiscountCalculator',
  'DueDateCalculator',
  'HeightCalculator',
  'LoveCalculator',
  'PaceCalculator',
  'RentVsBuyCalculator',
  'ROICalculator',
  'StudentLoanCalculator',
];

console.log('\n🔧 Auto-registering unregistered calculator components...\n');

// Read the registry file
let registryContent = fs.readFileSync(registryPath, 'utf8');

// Find the location where we add dynamic imports (after existing imports, before registry object)
const lastImportMatch = registryContent.lastIndexOf('const TripPlannerCalculator = dynamic');
const insertImportsAt = registryContent.indexOf('\n', lastImportMatch) + 1;

// Find the location where we add registry entries (before the closing brace of calculatorComponents)
const registryObjectEnd = registryContent.indexOf('};', registryContent.indexOf('export const calculatorComponents'));

// Generate import statements
const importStatements = componentsToRegister.map(componentName => {
  return `const ${componentName} = dynamic(() => import('./${componentName}'), {
  loading: () => <div className="flex items-center justify-center p-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>
});
`;
}).join('\n');

// Generate registry entries
const registryEntries = componentsToRegister.map(componentName => {
  return `  '${componentName}': ${componentName},`;
}).join('\n');

// Insert the imports
registryContent = registryContent.slice(0, insertImportsAt) + 
                 '\n' + importStatements + 
                 registryContent.slice(insertImportsAt);

// Insert the registry entries (before the closing brace)
const updatedRegistryObjectEnd = registryContent.indexOf('};', registryContent.indexOf('export const calculatorComponents'));
registryContent = registryContent.slice(0, updatedRegistryObjectEnd) + 
                 '\n' + registryEntries + '\n' +
                 registryContent.slice(updatedRegistryObjectEnd);

// Write back to file
fs.writeFileSync(registryPath, registryContent);

console.log('✅ Successfully registered the following components:\n');
componentsToRegister.forEach(comp => console.log(`   • ${comp}`));
console.log('\n📝 Updated: src/components/calculators/CalculatorRegistry.tsx\n');
console.log('🎯 Next steps:');
console.log('   1. Review the changes in CalculatorRegistry.tsx');
console.log('   2. Run: npm run validate-calculators');
console.log('   3. Test the affected calculators\n');
