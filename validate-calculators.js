#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get all calculator JSON files
const calculatorsDir = path.join(__dirname, 'content/calculators');
const componentsDir = path.join(__dirname, 'src/components/calculators');

// Read CalculatorRegistry.tsx to get registered components
const registryPath = path.join(componentsDir, 'CalculatorRegistry.tsx');
const registryContent = fs.readFileSync(registryPath, 'utf8');

// Extract registered component names from the registry
const registeredComponents = new Set();
const registryMatch = registryContent.match(/export const calculatorComponents[^{]*\{([^}]+)\}/s);
if (registryMatch) {
  const entries = registryMatch[1].match(/'([^']+)':/g);
  if (entries) {
    entries.forEach(entry => {
      const name = entry.match(/'([^']+)':/)[1];
      registeredComponents.add(name);
    });
  }
}

// Get all existing component files
const componentFiles = fs.readdirSync(componentsDir)
  .filter(file => file.endsWith('.tsx') && file !== 'CalculatorRegistry.tsx')
  .map(file => file.replace('.tsx', ''));

const existingComponents = new Set(componentFiles);

// Check each calculator JSON file
const calculatorFiles = fs.readdirSync(calculatorsDir)
  .filter(file => file.endsWith('.json') && file.endsWith('-calculator.json'));

const issues = {
  missingComponents: [],
  unregisteredComponents: [],
  inconsistentNames: []
};

calculatorFiles.forEach(file => {
  const filePath = path.join(calculatorsDir, file);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // Check each language
  ['en', 'es', 'pt', 'fr'].forEach(lang => {
    if (content[lang]) {
      const calc = content[lang];
      let componentName = null;
      
      // Check calculatorComponent field
      if (calc.calculatorComponent) {
        if (typeof calc.calculatorComponent === 'string') {
          componentName = calc.calculatorComponent;
        } else if (calc.calculatorComponent.componentName) {
          componentName = calc.calculatorComponent.componentName;
        }
      }
      
      // Check component field (alternative)
      if (!componentName && calc.component) {
        componentName = calc.component;
      }
      
      if (componentName) {
        // Check if component file exists
        if (!existingComponents.has(componentName)) {
          const issue = {
            file,
            lang,
            component: componentName,
            slug: calc.slug
          };
          
          if (!issues.missingComponents.find(i => i.component === componentName)) {
            issues.missingComponents.push(issue);
          }
        }
        
        // Check if component is registered
        if (existingComponents.has(componentName) && !registeredComponents.has(componentName)) {
          const issue = {
            file,
            lang,
            component: componentName,
            slug: calc.slug
          };
          
          if (!issues.unregisteredComponents.find(i => i.component === componentName)) {
            issues.unregisteredComponents.push(issue);
          }
        }
      } else if (lang === 'en') {
        // Only check English version for missing component name
        issues.inconsistentNames.push({
          file,
          lang,
          slug: calc.slug,
          issue: 'No component name specified'
        });
      }
    }
  });
});

// Print report
console.log('\n╔═══════════════════════════════════════════════════════════════╗');
console.log('║         CALCULATOR COMPONENT VALIDATION REPORT               ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');

console.log(`📊 Total calculators checked: ${calculatorFiles.length}`);
console.log(`📁 Existing component files: ${existingComponents.size}`);
console.log(`📋 Registered in CalculatorRegistry: ${registeredComponents.size}\n`);

if (issues.missingComponents.length > 0) {
  console.log('❌ MISSING COMPONENTS (referenced but file doesn\'t exist):');
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  const grouped = {};
  issues.missingComponents.forEach(issue => {
    if (!grouped[issue.component]) {
      grouped[issue.component] = [];
    }
    grouped[issue.component].push(issue.file);
  });
  
  Object.entries(grouped).forEach(([component, files]) => {
    console.log(`  🔴 ${component}`);
    console.log(`     Files: ${files[0]}`);
    console.log(`     Status: Component file NOT FOUND at src/components/calculators/${component}.tsx`);
    console.log(`     Action: Create component file or update JSON to reference existing component\n`);
  });
}

if (issues.unregisteredComponents.length > 0) {
  console.log('\n⚠️  UNREGISTERED COMPONENTS (file exists but not in registry):');
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  const grouped = {};
  issues.unregisteredComponents.forEach(issue => {
    if (!grouped[issue.component]) {
      grouped[issue.component] = [];
    }
    grouped[issue.component].push(issue.file);
  });
  
  Object.entries(grouped).forEach(([component, files]) => {
    console.log(`  🟡 ${component}`);
    console.log(`     Files: ${files[0]}`);
    console.log(`     Status: Component exists but NOT REGISTERED in CalculatorRegistry.tsx`);
    console.log(`     Action: Add to CalculatorRegistry.tsx\n`);
  });
}

if (issues.inconsistentNames.length > 0) {
  console.log('\n⚠️  MISSING COMPONENT NAMES:');
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  issues.inconsistentNames.forEach(issue => {
    console.log(`  🟡 ${issue.file}`);
    console.log(`     Slug: ${issue.slug}`);
    console.log(`     Issue: ${issue.issue}\n`);
  });
}

if (issues.missingComponents.length === 0 && 
    issues.unregisteredComponents.length === 0 && 
    issues.inconsistentNames.length === 0) {
  console.log('✅ All calculators are properly configured!\n');
  console.log('   • All referenced components exist');
  console.log('   • All components are registered');
  console.log('   • All component names are specified\n');
} else {
  console.log('\n📝 SUMMARY:');
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log(`  Missing components: ${issues.missingComponents.length}`);
  console.log(`  Unregistered components: ${issues.unregisteredComponents.length}`);
  console.log(`  Missing component names: ${issues.inconsistentNames.length}\n`);
  
  console.log('💡 HOW TO PREVENT THIS:');
  console.log('═══════════════════════════════════════════════════════════════\n');
  console.log('  1. Run this script before deploying: node validate-calculators.js');
  console.log('  2. Add to package.json scripts: "validate": "node validate-calculators.js"');
  console.log('  3. Run in CI/CD pipeline: npm run validate');
  console.log('  4. Add pre-commit hook to check before commits\n');
  
  process.exit(1);
}
