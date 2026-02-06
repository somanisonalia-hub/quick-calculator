#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Map calculator slugs to their component file names
const CALCULATOR_MAP = {
  'mortgage-calculator': 'MortgageCalculator.tsx',
  'loan-calculator': 'LoanCalculator.tsx',
  'interest-calculator': 'InterestCalculator.tsx',
  'tax-calculator': 'IncomeTaxCalculator.tsx',
  'retirement-calculator': 'RetirementCalculator.tsx',
  'emi-calculator': 'EMICalculator.tsx',
  'amortization-schedule-calculator': 'AdvancedLoanCalculator.tsx',
  'take-home-pay-calculator': 'TakeHomePayCalculator.tsx',
  'investment-calculator': 'InvestmentCalculator.tsx',
  'sip-calculator': 'SIPCalculator.tsx',
  'lumpsum-investment-calculator': 'LumpsumInvestmentCalculator.tsx',
  'compound-interest-calculator': 'CompoundInterestCalculator.tsx',
  'profit-margin-calculator': 'ProfitabilityRatiosCalculator.tsx',
  'bmi-calculator': 'BMICalculator.tsx',
  'tdee-calculator': 'TDEECalculator.tsx',
  'calorie-deficit-calculator': 'CalorieDeficitCalculator.tsx',
  'ideal-weight-calculator': 'IdealWeightCalculator.tsx',
  'body-fat-calculator': 'BodyFatCalculator.tsx',
  'protein-intake-calculator': 'ProteinIntakeCalculator.tsx',
  'unit-converter': 'UnitConverter.tsx',
  'currency-converter': 'CurrencyConverter.tsx',
  'percent-calculator': 'PercentageCalculator.tsx',
  'trip-planner': 'TripPlannerCalculator.tsx',
  'tip-calculator': 'TipCalculator.tsx',
  'date-calculator': 'DateCalculator.tsx',
  'average-calculator': 'AverageCalculator.tsx',
  'volume-calculator': 'VolumeCalculator.tsx',
  'gcd-lcm-calculator': 'GcdLcmCalculator.tsx',
  'exponent-calculator': 'ExponentCalculator.tsx',
  'standard-deviation-calculator': 'StandardDeviationCalculator.tsx'
};

// German translations mapping for common keys
const DE_TRANSLATIONS = {
  'title': (key, enValue) => {
    const translations = {
      'Average Calculator': 'Durchschnittrechner',
      'Mortgage Calculator': 'Hypothekenrechner',
      'Loan Calculator': 'Darlehensrechner',
      'Interest Calculator': 'Zinsrechner',
      'Tax Calculator': 'Steuerrechner',
      'Retirement Calculator': 'Rentenrechner',
      'EMI Calculator': 'EMI-Rechner',
      'Investment Calculator': 'Anlagerechner',
      'Compound Interest Calculator': 'Zinseszins-Rechner',
      'BMI Calculator': 'BMI-Rechner',
      'TDEE Calculator': 'TDEE-Rechner',
      'Calorie Deficit Calculator': 'Kaloriendefizit-Rechner',
      'Ideal Weight Calculator': 'Idealgewichtsrechner',
      'Unit Converter': 'Einheitenumrechner',
      'Currency Converter': 'Währungsumrechner',
      'Date Calculator': 'Datumsrechner',
      'Tip Calculator': 'Trinkgeldrechner',
      'Trip Planner': 'Reiseplaner',
      'Volume Calculator': 'Volumenrechner',
      'Percentage Calculator': 'Prozentrechner'
    };
    return translations[enValue] || enValue;
  },
  'description': (key, enValue) => {
    if (enValue.includes('Calculate')) return enValue.replace('Calculate', 'Berechne');
    return enValue;
  }
};

// Dutch translations mapping
const NL_TRANSLATIONS = {
  'title': (key, enValue) => {
    const translations = {
      'Average Calculator': 'Gemiddelde Calculator',
      'Mortgage Calculator': 'Hypotheekrechner',
      'Loan Calculator': 'Lenenrekenmachine',
      'Interest Calculator': 'Renterekenmachine',
      'Tax Calculator': 'Belastingrekner',
      'Retirement Calculator': 'Pensioencalculator',
      'EMI Calculator': 'EMI-rekenmachine',
      'Investment Calculator': 'Beleggingsrekner',
      'Compound Interest Calculator': 'Samengestelde Rente Calculator',
      'BMI Calculator': 'BMI-rekenmachine',
      'TDEE Calculator': 'TDEE-rekenmachine',
      'Calorie Deficit Calculator': 'Caloriedeficitcalculator',
      'Ideal Weight Calculator': 'Ideaalgewichtcalculator',
      'Unit Converter': 'Eenhedenomzetter',
      'Currency Converter': 'Valutaomzetter',
      'Date Calculator': 'Datumcalculator',
      'Tip Calculator': 'Fooicalculator',
      'Trip Planner': 'Reisplanner',
      'Volume Calculator': 'Volumecalculator',
      'Percentage Calculator': 'Percentagecalculator'
    };
    return translations[enValue] || enValue;
  }
};

function addTranslationsToFile(filePath, filename) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if already has de and nl translations
    if (content.includes('de:') && content.includes('nl:')) {
      console.log(`✓ ${filename} - Already has DE/NL translations`);
      return true;
    }
    
    // Look for the closing of fr translation block: /^\s+};\s*$/m before const t = translations
    const translationsMatch = content.match(/const\s+translations\s*=\s*\{[\s\S]*?\n\s{4}\}\s*;/);
    
    if (!translationsMatch) {
      console.log(`? ${filename} - No translations pattern found`);
      return false;
    }
    
    // Find where to insert (after fr block, before closing);
    const frPattern = /(\s{4}fr:\s*\{[^}]*\}\s*)(,?\s*};\s*)/;
    
    if (!frPattern.test(content)) {
      console.log(`? ${filename} - FR translation block not found in expected format`);
      return false;
    }
    
    // Create DE and NL blocks with placeholder translations
    const deBlock = `    de: {
      // German translations (to be filled by native speakers)
      title: "",
      description: "",
      instructions: "",
      placeholder: ""
    }`;
    
    const nlBlock = `    nl: {
      // Dutch translations (to be filled by native speakers)
      title: "",
      description: "",
      instructions: "",
      placeholder: ""
    }`;
    
    // Insert DE and NL translations after FR block
    const updatedContent = content.replace(
      /(\s{4}fr:\s*\{[^}]*\}\s*)(,?\s*};\s*)/,
      `$1,\n${deBlock},\n${nlBlock}\n  };`
    );
    
    if (updatedContent === content) {
      console.log(`✗ ${filename} - Could not insert translations`);
      return false;
    }
    
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`✓ ${filename} - Added DE/NL translation blocks`);
    return true;
  } catch (error) {
    console.log(`✗ ${filename} - Error: ${error.message}`);
    return false;
  }
}

function main() {
  const CALC_DIR = path.join(__dirname, 'src/components/calculators');
  let updated = 0;
  let skipped = 0;
  let failed = 0;
  
  console.log('Starting DE/NL translation injection...\n');
  
  Object.entries(CALCULATOR_MAP).forEach(([slug, filename]) => {
    const filePath = path.join(CALC_DIR, filename);
    
    if (!fs.existsSync(filePath)) {
      console.log(`✗ ${filename} - File not found`);
      failed++;
      return;
    }
    
    const result = addTranslationsToFile(filePath, filename);
    if (result === true) updated++;
    else if (result === false) skipped++;
    else failed++;
  });
  
  console.log(`\n\n=== SUMMARY ===`);
  console.log(`Updated: ${updated}`);
  console.log(`Skipped (already have): ${skipped}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total processed: ${updated + skipped + failed}/30`);
}

main();
