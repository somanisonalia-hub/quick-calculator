// Test schema generation
const { generateHomepageSchema, generateCategorySchema, generateCalculatorSchema } = require('./src/lib/seoContentRenderer.ts');

// Test homepage schema
console.log('=== Homepage Schema ===');
const homepageSchema = generateHomepageSchema('en');
console.log(JSON.stringify(homepageSchema, null, 2));

// Test category schema
console.log('\n=== Category Schema ===');
const categoryData = {
  name: 'Financial Calculators',
  slug: 'financial',
  description: 'Calculate loans, mortgages, savings and more',
  calculators: [
    { name: 'Mortgage Calculator', slug: 'mortgage-calculator' },
    { name: 'Loan Calculator', slug: 'loan-calculator' }
  ]
};
const categorySchema = generateCategorySchema(categoryData, 'en');
console.log(JSON.stringify(categorySchema, null, 2));

// Test calculator schema
console.log('\n=== Calculator Schema ===');
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
const calculatorSchema = generateCalculatorSchema(calculatorData, 'en');
console.log(JSON.stringify(calculatorSchema, null, 2));