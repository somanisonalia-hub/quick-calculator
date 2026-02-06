#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Comprehensive German translations mapping
const TRANSLATIONS = {
  de: {
    // Common keys
    title: {
      'Loan Calculator': 'Darlehensrechner',
      'Mortgage Calculator': 'Hypothekenrechner',
      'BMI Calculator': 'BMI-Rechner',
      'TDEE Calculator': 'TDEE-Rechner',
      'Calorie Deficit Calculator': 'Kaloriendefizit-Rechner',
      'Ideal Weight Calculator': 'Idealgewichtsrechner',
      'Body Fat Calculator': 'Körperfett-Rechner',
      'Protein Intake Calculator': 'Proteinaufnahme-Rechner',
      'Unit Converter': 'Einheitenumrechner',
      'Currency Converter': 'Währungsumrechner',
      'Percentage Calculator': 'Prozentrechner',
      'Trip Planner': 'Reiseplaner',
      'Tip Calculator': 'Trinkgeldrechner',
      'Date Calculator': 'Datumsrechner',
      'Average Calculator': 'Durchschnittrechner',
      'Volume Calculator': 'Volumenrechner',
      'GCD/LCM Calculator': 'GCD/KGV-Rechner',
      'Exponent Calculator': 'Potenz-Rechner',
      'Standard Deviation Calculator': 'Standardabweichungs-Rechner',
      'EMI Calculator': 'EMI-Rechner',
      'Investment Calculator': 'Anlagerechner',
      'Compound Interest Calculator': 'Zinseszins-Rechner',
      'Take-Home Pay Calculator': 'Netto-Gehalt-Rechner',
      'SIP Calculator': 'SIP-Rechner',
      'Lumpsum Investment Calculator': 'Einmalige Anlage-Rechner',
      'Retirement Calculator': 'Rentenrechner',
      'Interest Calculator': 'Zinsrechner',
      'Tax Calculator': 'Steuerrechner'
    },
    description: {
      'Calculate': 'Berechnen Sie',
      'Calculate monthly': 'Berechnen Sie monatlich',
      'Determine': 'Bestimmen Sie',
      'Convert': 'Umrechnen von'
    },
    // Common button/label keys
    calculate: 'Berechnen',
    reset: 'Zurücksetzen',
    clear: 'Löschen',
    close: 'Schließen',
    results: 'Ergebnisse',
    instructions: 'Anleitung',
    loanAmount: 'Darlehensbetrag',
    interestRate: 'Zinssatz',
    monthlyPayment: 'Monatliche Zahlung',
    totalInterest: 'Gesamtzinsen'
  },
  nl: {
    // Common keys - Dutch
    title: {
      'Loan Calculator': 'Lenenrekenmachine',
      'Mortgage Calculator': 'Hypotheekrechner',
      'BMI Calculator': 'BMI-rekenmachine',
      'TDEE Calculator': 'TDEE-rekenmachine',
      'Calorie Deficit Calculator': 'Caloriedeficitcalculator',
      'Ideal Weight Calculator': 'Ideaalgewichtcalculator',
      'Body Fat Calculator': 'Lichaamsvetcalculator',
      'Protein Intake Calculator': 'Eiwitinnamecalculator',
      'Unit Converter': 'Eenhedenomzetter',
      'Currency Converter': 'Valutaomzetter',
      'Percentage Calculator': 'Percentagecalculator',
      'Trip Planner': 'Reisplanner',
      'Tip Calculator': 'Fooicalculator',
      'Date Calculator': 'Datumcalculator',
      'Average Calculator': 'Gemiddelde Calculator',
      'Volume Calculator': 'Volumecalculator',
      'GCD/LCM Calculator': 'GCD/KGV-calculator',
      'Exponent Calculator': 'Machtscalculator',
      'Standard Deviation Calculator': 'Standaarddeviatie Calculator',
      'EMI Calculator': 'EMI-rekenmachine',
      'Investment Calculator': 'Beleggingsrekner',
      'Compound Interest Calculator': 'Samengestelde Rente Calculator',
      'Take-Home Pay Calculator': 'Nettosalaris Calculator',
      'SIP Calculator': 'SIP-rekenmachine',
      'Lumpsum Investment Calculator': 'Eenmalige Beleggings Calculator',
      'Retirement Calculator': 'Pensioencalculator',
      'Interest Calculator': 'Renterekenmachine',
      'Tax Calculator': 'Belastingrekner'
    },
    description: {
      'Calculate': 'Bereken',
      'Calculate monthly': 'Bereken maandelijks',
      'Determine': 'Bepaal',
      'Convert': 'Omzetten'
    },
    calculate: 'Berekenen',
    reset: 'Herstellen',
    clear: 'Wissen',
    close: 'Sluiten',
    results: 'Resultaten',
    instructions: 'Instructies',
    loanAmount: 'Leneningbedrag',
    interestRate: 'Rente',
    monthlyPayment: 'Maandelijkse Betaling',
    totalInterest: 'Totale Rente'
  }
};

function extractTranslationKeys(content) {
  // Extract all English translation keys
  const enMatch = content.match(/en:\s*\{([\s\S]*?)\}/);
  if (!enMatch) return [];
  
  const keys = [];
  const enBlock = enMatch[1];
  const keyPattern = /(\w+):\s*["']/g;
  let match;
  
  while ((match = keyPattern.exec(enBlock)) !== null) {
    keys.push(match[1]);
  }
  
  return [...new Set(keys)];
}

function createTranslationBlock(lang, keys, translationMap) {
  let block = `    ${lang}: {\n`;
  
  keys.forEach(key => {
    block += `      ${key}: "",\n`;
  });
  
  block = block.slice(0, -2) + '\n    }';
  return block;
}

function addTranslationsToFile(filePath, filename) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if already has both de and nl
    if (content.includes('de:') && content.includes('nl:')) {
      const hasEmptyDE = /de:\s*\{\s*\/\/ German/.test(content) || /de:\s*\{\s*title:\s*"",/.test(content);
      const hasEmptyNL = /nl:\s*\{\s*\/\/ Dutch/.test(content) || /nl:\s*\{\s*title:\s*"",/.test(content);
      
      if (!hasEmptyDE && !hasEmptyNL) {
        console.log(`✓ ${filename} - DE/NL already complete`);
        return true;
      }
    }
    
    // Find the patterns for fr, de, nl blocks and replace
    const frEndPattern = /fr:\s*\{[^}]*?\},?\s*(de:\s*\{[^}]*?\},?\s*nl:\s*\{[^}]*?\},?\s*)?/;
    
    // Simple approach: if file doesn't have proper DE/NL, add empty ones
    if (!content.includes('de:') || content.match(/de:\s*\{[\s\S]*?\/\/ German/)) {
      // Find where to insert - after FR block, before closing });
      const insertPoint = content.lastIndexOf('}');
      if (insertPoint > 0 && content[insertPoint + 1] === ';') {
        const newContent = content.slice(0, insertPoint) + 
          `,\n    de: {\n      // German translations\n    },\n    nl: {\n      // Dutch translations\n    }` + 
          content.slice(insertPoint);
        
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`+ ${filename} - Added empty translation blocks`);
        return true;
      }
    }
    
    console.log(`? ${filename} - Could not auto-patch`);
    return false;
  } catch (error) {
    console.log(`✗ ${filename} - Error: ${error.message}`);
    return false;
  }
}

// Get all calculator tsx files
const CALC_DIR = path.join(__dirname, 'src/components/calculators');
const files = fs.readdirSync(CALC_DIR).filter(f => f.endsWith('.tsx'));

console.log(`\nProcessing ${files.length} calculator files...\n`);

let count = 0;
files.forEach(file => {
  const filePath = path.join(CALC_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Only process calculators with translations pattern
  if (content.includes('translations = {') && content.includes('en: {')) {
    addTranslationsToFile(filePath, file);
    count++;
  }
});

console.log(`\nProcessed: ${count} files`);
console.log('✅ Translation structure setup complete!');
