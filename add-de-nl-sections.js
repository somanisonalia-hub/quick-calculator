const fs = require('fs');
const path = require('path');

// German difficulty mappings
const difficultyMappings = {
  'Beginner': { de: 'Anfänger', nl: 'Beginner' },
  'beginner': { de: 'anfänger', nl: 'beginner' },
  'Intermediate': { de: 'Mittelstufe', nl: 'Gemiddeld' },
  'intermediate': { de: 'mittelstufe', nl: 'gemiddeld' },
  'Advanced': { de: 'Fortgeschritten', nl: 'Gevorderd' },
  'advanced': { de: 'fortgeschritten', nl: 'gevorderd' },
  'Basic': { de: 'Grundlagenwissen', nl: 'Basis' },
  'basic': { de: 'grundlagen', nl: 'basis' },
};

// Title translations
const titleTranslations = {
  'Mortgage Calculator': { de: 'Hypothekenrechner', nl: 'Hypotheekschuld Rekenmachine' },
  'Loan Calculator': { de: 'Kreditrechner', nl: 'Leningrekenmachine' },
  'Interest Calculator': { de: 'Zinsrechner', nl: 'Renteberekener' },
  'Tax Calculator': { de: 'Steuerrechner', nl: 'Belastingcalculator' },
  'Retirement Calculator': { de: 'Ruhestandsrechner', nl: 'Pensioen Rekenmachine' },
  'EMI Calculator': { de: 'EMI Rechner', nl: 'EMI Rekenmachine' },
  'Amortization Schedule Calculator': { de: 'Tilgungsplan Rechner', nl: 'Aflossingsschema Rekenmachine' },
  'Take-Home Pay Calculator': { de: 'Nettolohn Rechner', nl: 'Netto Loonrekenmachine' },
  'Investment Calculator': { de: 'Investitionsrechner', nl: 'Investeringsrekenmachine' },
  'SIP Calculator': { de: 'SIP Rechner', nl: 'SIP Rekenmachine' },
  'Lumpsum Investment Calculator': { de: 'Einmalinvestitions Rechner', nl: 'Eenmalige Investering Rekenmachine' },
  'Compound Interest Calculator': { de: 'Zinseszins Rechner', nl: 'Samengestelde Rente Rekenmachine' },
  'Profit Margin Calculator': { de: 'Gewinnspanne Rechner', nl: 'Winstmarge Rekenmachine' },
  'BMI Calculator': { de: 'BMI-Rechner', nl: 'BMI Rekenmachine' },
  'TDEE Calculator': { de: 'TDEE Rechner', nl: 'TDEE Rekenmachine' },
  'Calorie Deficit Calculator': { de: 'Kaloriendefizit Rechner', nl: 'Caloriedeficit Rekenmachine' },
  'Ideal Weight Calculator': { de: 'Idealgewicht Rechner', nl: 'Ideaal Gewicht Rekenmachine' },
  'Body Fat Calculator': { de: 'Körperfett Rechner', nl: 'Lichaamsvet Rekenmachine' },
  'Protein Intake Calculator': { de: 'Proteinzufuhr Rechner', nl: 'Proteïnehoeveel Rekenmachine' },
  'Unit Converter': { de: 'Einheitskonverter', nl: 'Eenheid Converter' },
  'Currency Converter': { de: 'Währungsumrechner', nl: 'Valuta Converter' },
  'Percent Calculator': { de: 'Prozentrechner', nl: 'Percentage Rekenmachine' },
  'Trip Planner': { de: 'Reiseplaner', nl: 'Reisplanner' },
  'Tip Calculator': { de: 'Trinkgeldrechner', nl: 'Fooi Rekenmachine' },
  'Date Calculator': { de: 'Datumsrechner', nl: 'Datum Rekenmachine' },
  'Average Calculator': { de: 'Durchschnittsrechner', nl: 'Gemiddelde Rekenmachine' },
  'Volume Calculator': { de: 'Volumenrechner', nl: 'Volume Rekenmachine' },
  'GCD LCM Calculator': { de: 'ggT kgV Rechner', nl: 'GGD KVV Rekenmachine' },
  'Exponent Calculator': { de: 'Exponentenrechner', nl: 'Exponent Rekenmachine' },
  'Standard Deviation Calculator': { de: 'Standardabweichung Rechner', nl: 'Standaardafwijking Rekenmachine' },
};

// Summary translations
const summaryTranslations = {
  'Calculate monthly mortgage payments and total interest.': { 
    de: 'Berechnen Sie monatliche Hypothekenzahlungen und Gesamtzinsen.', 
    nl: 'Bereken maandelijkse hypotheekbetalingen en totale rente.' 
  },
  'Calculate daily calorie needs and burns.': { 
    de: 'Berechnen Sie den täglichen Kalorienbedarf und den Verbrauch.', 
    nl: 'Bereken dagelijkse caloriebehoeften en verbranding.' 
  },
};

// Read the DE_NL_SELECTED_CALCULATORS list
const selectedList = JSON.parse(fs.readFileSync(
  path.join(__dirname, 'src/lib/DE_NL_SELECTED_CALCULATORS.json'),
  'utf-8'
));

const calculators = selectedList.calculators;
const calculatorsDir = path.join(__dirname, 'content/calculators');

let success = 0;
let failed = 0;

calculators.forEach(calcSlug => {
  const filePath = path.join(calculatorsDir, `${calcSlug}.json`);
  
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${calcSlug}.json`);
      failed++;
      return;
    }

    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    // Check if de and nl sections already exist
    if (content.de && content.nl) {
      console.log(`✓ ${calcSlug} already has de/nl sections`);
      success++;
      return;
    }

    // Get English content for reference
    const enContent = content.en;
    if (!enContent) {
      console.log(`⚠️  No English content found for ${calcSlug}`);
      failed++;
      return;
    }

    // Create German section
    if (!content.de) {
      content.de = {
        title: titleTranslations[enContent.title] ? titleTranslations[enContent.title].de : enContent.title,
        seoTitle: enContent.seoTitle ? enContent.seoTitle.replace(/Calculator/g, 'Rechner') : '',
        summary: summaryTranslations[enContent.summary] ? summaryTranslations[enContent.summary].de : enContent.summary,
        description: enContent.description || '',
        category: enContent.category || 'financial',
        difficulty: difficultyMappings[enContent.difficulty] ? difficultyMappings[enContent.difficulty].de : 'Grundlagen',
        slug: enContent.slug,
        calculatorComponent: enContent.calculatorComponent || {},
        seoContent: enContent.seoContent || {},
      };
    }

    // Create Dutch section
    if (!content.nl) {
      content.nl = {
        title: titleTranslations[enContent.title] ? titleTranslations[enContent.title].nl : enContent.title,
        seoTitle: enContent.seoTitle || '',
        summary: summaryTranslations[enContent.summary] ? summaryTranslations[enContent.summary].nl : enContent.summary,
        description: enContent.description || '',
        category: enContent.category || 'financial',
        difficulty: difficultyMappings[enContent.difficulty] ? difficultyMappings[enContent.difficulty].nl : 'Basis',
        slug: enContent.slug,
        calculatorComponent: enContent.calculatorComponent || {},
        seoContent: enContent.seoContent || {},
      };
    }

    // Write the updated file
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    console.log(`✓ Updated: ${calcSlug}`);
    success++;
  } catch (error) {
    console.log(`✗ Error processing ${calcSlug}: ${error.message}`);
    failed++;
  }
});

console.log(`\n✓ Success: ${success}/${calculators.length}`);
console.log(`✗ Failed: ${failed}/${calculators.length}`);
