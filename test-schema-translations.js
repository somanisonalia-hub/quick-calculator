// Test schema generation with translations
const { generateHomepageSchema, generateCategorySchema, generateCalculatorSchema } = require('./src/lib/seoContentRenderer.ts');

// Test homepage schema for different languages
console.log('=== Homepage Schema Translations ===');
console.log('English:', JSON.stringify(generateHomepageSchema('en'), null, 2));
console.log('\nSpanish:', JSON.stringify(generateHomepageSchema('es'), null, 2));
console.log('\nPortuguese:', JSON.stringify(generateHomepageSchema('pt'), null, 2));
console.log('\nFrench:', JSON.stringify(generateHomepageSchema('fr'), null, 2));

// Test category schema
console.log('\n=== Category Schema Translations ===');
const categoryData = {
  name: 'Financial Calculators',
  slug: 'financial',
  description: 'Calculate loans, mortgages, savings and more',
  calculators: [
    { name: 'Mortgage Calculator', slug: 'mortgage-calculator' },
    { name: 'Loan Calculator', slug: 'loan-calculator' }
  ]
};
console.log('English:', JSON.stringify(generateCategorySchema(categoryData, 'en'), null, 2));
console.log('\nSpanish:', JSON.stringify(generateCategorySchema(categoryData, 'es'), null, 2));

// Test calculator schema
console.log('\n=== Calculator Schema Translations ===');
const calculatorData = {
  title: 'Mortgage Calculator',
  slug: 'mortgage-calculator',
  category: 'financial',
  seoContent: {
    introduction: 'Calculate your mortgage payments',
    benefits: ['Save money', 'Plan ahead'],
    steps: ['Enter loan amount', 'Select interest rate'],
    inputsExplained: [],
    formulaExplanation: 'Formula explanation',
    examples: [],
    resultsExplanation: [],
    whoItsFor: 'Home buyers',
    disclaimer: 'Disclaimer',
    relatedTools: [],
    faqs: [
      {
        question: 'What is a mortgage?',
        answer: 'A mortgage is a loan for buying property.'
      }
    ]
  }
};
console.log('English:', JSON.stringify(generateCalculatorSchema(calculatorData, 'en'), null, 2));
console.log('\nSpanish:', JSON.stringify(generateCalculatorSchema(calculatorData, 'es'), null, 2));