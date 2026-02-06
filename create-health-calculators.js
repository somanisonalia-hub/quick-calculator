const fs = require('fs');
const path = require('path');

const calculators = [
  {
    slug: 'body-composition-calculator',
    title: 'Body Composition Calculator',
    en: {
      title: 'Body Composition Calculator',
      seoTitle: 'Body Composition Calculator - Measure Body Fat Percentage Online',
      metaDescription: 'Calculate your body composition including body fat percentage, lean body mass, and fat mass using the U.S. Navy method.',
      summary: 'Calculate body composition including body fat percentage, fat mass, and lean mass using circumference measurements.',
      description: 'Advanced body composition calculator using circumference-based formulas for detailed body metrics.',
    },
    es: {
      title: 'Calculadora de Composición Corporal',
      seoTitle: 'Calculadora de Composición Corporal - Mide Porcentaje de Grasa Corporal',
      metaDescription: 'Calcula tu composición corporal incluyendo porcentaje de grasa, masa magra y masa gorda.',
      summary: 'Calcula tu composición corporal incluyendo porcentaje de grasa corporal usando mediciones de circunferencia.',
    },
  },
  {
    slug: 'energy-expenditure-calculator',
    title: 'Energy Expenditure Calculator',
    en: {
      title: 'Energy Expenditure Calculator',
      seoTitle: 'Energy Expenditure Calculator - Calculate Daily Calorie Burn',
      metaDescription: 'Calculate your daily energy expenditure, BMR and TDEE with activity level adjustments for accurate calorie calculations.',
      summary: 'Calculate your daily energy expenditure including basal metabolic rate and total daily energy expenditure.',
      description: 'Accurate energy expenditure calculator determining BMR, TDEE, and calorie needs based on activity level.',
    },
    es: {
      title: 'Calculadora de Gasto Energético',
      seoTitle: 'Calculadora de Gasto Energético - Calcula Quema de Calorías Diaria',
      metaDescription: 'Calcula tu gasto energético diario, TMB y TDEE con ajustes de nivel de actividad.',
      summary: 'Calcula tu gasto energético diario incluyendo tasa metabólica basal y gasto total.',
    },
  },
  {
    slug: 'fitness-metrics-calculator',
    title: 'Fitness Metrics Calculator',
    en: {
      title: 'Fitness Metrics Calculator',
      seoTitle: 'Fitness Metrics Calculator - Calculate VO2 Max and Aerobic Fitness',
      metaDescription: 'Calculate key fitness metrics including VO2 max, aerobic fitness levels, and athletic performance indicators.',
      summary: 'Calculate key fitness metrics including VO2 max and aerobic fitness levels from test results.',
      description: 'Comprehensive fitness metrics calculator assessing cardiovascular fitness and athletic performance.',
    },
    es: {
      title: 'Calculadora de Métricas de Fitness',
      seoTitle: 'Calculadora de Métricas de Fitness - Calcula VO2 Máximo',
      metaDescription: 'Calcula métricas clave de fitness incluyendo VO2 máximo y nivel de aptitud aeróbica.',
      summary: 'Calcula métricas de fitness clave incluyendo VO2 máximo desde resultados de pruebas.',
    },
  },
  {
    slug: 'nutrition-analysis-calculator',
    title: 'Nutrition Analysis Calculator',
    en: {
      title: 'Nutrition Analysis Calculator',
      seoTitle: 'Nutrition Analysis Calculator - Analyze Macronutrients and Calories',
      metaDescription: 'Analyze your nutrition with detailed macronutrient breakdown, calorie calculations, and dietary recommendations.',
      summary: 'Analyze your nutrition including macronutrient distribution, calorie content, and dietary recommendations.',
      description: 'Comprehensive nutrition analysis tool providing detailed macronutrient breakdown and personalized nutritional guidance.',
    },
    es: {
      title: 'Calculadora de Análisis de Nutrición',
      seoTitle: 'Calculadora de Análisis de Nutrición - Analiza Macronutrientes',
      metaDescription: 'Analiza tu nutrición con desglose detallado de macronutrientes y recomendaciones dietéticas.',
      summary: 'Analiza tu nutrición incluyendo distribución de macronutrientes y recomendaciones dietéticas.',
    },
  },
  {
    slug: 'wellness-tracker-calculator',
    title: 'Wellness Tracker Calculator',
    en: {
      title: 'Wellness Tracker Calculator',
      seoTitle: 'Wellness Tracker Calculator - Track Health and Wellness Metrics',
      metaDescription: 'Track your wellness with comprehensive health metrics including sleep, water intake, stress levels, and fitness progress.',
      summary: 'Track comprehensive wellness metrics including sleep, hydration, stress levels and fitness progress.',
      description: 'All-in-one wellness tracker for monitoring health metrics, lifestyle factors, and overall well-being.',
    },
    es: {
      title: 'Calculadora de Seguimiento de Bienestar',
      seoTitle: 'Calculadora de Seguimiento de Bienestar - Monitorea Métricas de Salud',
      metaDescription: 'Monitorea tu bienestar con métricas de salud comprehensive incluyendo sueño, ingesta de agua y estrés.',
      summary: 'Monitorea métricas de bienestar integral incluyendo sueño, hidratación y progreso de fitness.',
    },
  },
];

const sharedKeywords = {
  'body-composition-calculator': ['body composition', 'body fat percentage', 'lean mass', 'body metrics', 'fitness assessment'],
  'energy-expenditure-calculator': ['energy expenditure', 'BMR', 'TDEE', 'calorie burn', 'daily energy needs'],
  'fitness-metrics-calculator': ['fitness metrics', 'VO2 max', 'aerobic fitness', 'athletic performance', 'fitness assessment'],
  'nutrition-analysis-calculator': ['nutrition analysis', 'macronutrients', 'calorie calculator', 'dietary analysis', 'nutrition tracker'],
  'wellness-tracker-calculator': ['wellness tracker', 'health metrics', 'lifestyle tracking', 'well-being', 'health monitoring'],
};

const categories = {
  'body-composition-calculator': 'health',
  'energy-expenditure-calculator': 'health',
  'fitness-metrics-calculator': 'health',
  'nutrition-analysis-calculator': 'health',
  'wellness-tracker-calculator': 'health',
};

function createCalculatorObject(calculator) {
  const keywords = sharedKeywords[calculator.slug];
  const category = categories[calculator.slug];

  return {
    en: {
      title: calculator.en.title,
      seoTitle: calculator.en.seoTitle,
      metaDescription: calculator.en.metaDescription,
      keywords: keywords.slice(0, 5),
      longTailKeywords: [
        `how to ${calculator.slug.replace(/-/g, ' ')}`,
        `${calculator.slug.replace(/-/g, ' ')} for health`,
        `best ${calculator.slug.replace(/-/g, ' ')}`,
        `${calculator.slug.replace(/-/g, ' ')} guide`,
        `understanding ${calculator.slug.replace(/-/g, ' ')}`,
      ],
      slug: calculator.slug,
      category: category,
      difficulty: 'intermediate',
      tags: keywords,
      summary: calculator.en.summary,
      description: calculator.en.description,
      instructions: [
        'Enter your personal information accurately',
        'Provide required measurements or values',
        'Review calculated results',
        'Use results for health planning',
        'Consult professionals for personalized advice',
      ],
      examples: [
        {
          title: 'Example 1',
          input: 'Sample input values',
          output: 'Sample calculated result',
        },
      ],
      relatedCalculators: [
        'bmi-calculator',
        'bmr-calculator',
        'body-fat-calculator',
        'healthy-weight-calculator',
      ],
      seoContent: {
        introduction: `Our ${calculator.title} helps you understand and track important ${category} metrics. This comprehensive calculator provides detailed insights using proven scientific formulas and methods.`,
        benefits: [
          `Calculate key metrics using scientifically validated methods`,
          `Get detailed analysis and recommendations`,
          `Track progress over time`,
          `Make informed health decisions`,
          `Understand your health status comprehensively`,
        ],
        steps: [
          'Prepare required information or measurements',
          'Enter values in the calculator fields',
          'Review calculated results',
          'Interpret results using provided guidelines',
          'Take action based on recommendations',
        ],
        inputsExplained: [
          'Each input field measures a specific health metric',
          'Values are used in scientifically accepted formulas',
          'Accuracy of inputs affects result reliability',
          'All fields work together for complete assessment',
        ],
        formulaExplanation: `Our ${calculator.title} uses evidence-based formulas developed by health professionals. The calculations combine multiple factors for accurate results.`,
        examples: ['Example scenarios showing typical calculations and results'],
        resultsExplanation: [
          'Results indicate your current health status',
          'Compare results to health standards',
          'Track changes over time',
          'Use results for goal setting',
        ],
        whoItsFor: 'Individuals seeking health information, fitness enthusiasts, healthcare professionals, and anyone interested in comprehensive health assessment.',
        disclaimer: 'This calculator provides estimates for educational purposes. Consult healthcare professionals for medical diagnosis and personalized recommendations.',
        relatedTools: [
          'BMI calculator for weight status',
          'Health tracking tools for ongoing monitoring',
          'Nutrition guides for dietary planning',
        ],
        faqs: [
          {
            question: `What is ${calculator.title} used for?`,
            answer: `This calculator helps you assess and understand important ${category} metrics relevant to your overall health and wellness.`,
          },
          {
            question: 'How accurate are these calculations?',
            answer: 'Results are estimates based on scientifically validated formulas. Accuracy depends on input accuracy and individual variations.',
          },
          {
            question: 'How often should I use this calculator?',
            answer: 'Use regularly to track progress, but frequency depends on your specific goals and health situation.',
          },
          {
            question: 'Should I share these results with my doctor?',
            answer: 'Yes, sharing results can help your healthcare provider understand your health status and provide personalized recommendations.',
          },
          {
            question: 'Can this replace professional medical advice?',
            answer: 'No, this is an educational tool. Always consult healthcare professionals for medical diagnosis and treatment.',
          },
        ],
      },
      component: calculator.title.replace(/\s+/g, ''),
    },
    es: {
      title: calculator.es.title,
      seoTitle: calculator.es.seoTitle,
      metaDescription: calculator.es.metaDescription,
      keywords: keywords.map(k => k === 'body composition' ? 'composición corporal' : k),
      slug: calculator.slug,
      category: category,
      summary: calculator.es.summary,
      description: 'Descripción en español',
      instructions: [
        'Ingresa tu información personal con precisión',
        'Proporciona medidas o valores requeridos',
        'Revisa los resultados calculados',
        'Usa los resultados para planificación de salud',
      ],
    },
    fr: {
      title: calculator.en.title,
      slug: calculator.slug,
      category: category,
      description: 'Description en français',
    },
    de: {
      title: calculator.en.title,
      slug: calculator.slug,
      category: category,
      description: 'Beschreibung auf Deutsch',
    },
    pt: {
      title: calculator.en.title,
      slug: calculator.slug,
      category: category,
      description: 'Descrição em português',
    },
  };
}

// Create calculator files
calculators.forEach(calc => {
  const content = createCalculatorObject(calc);
  const filePath = path.join(__dirname, `${calc.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
  console.log(`Created: ${calc.slug}.json`);
});

console.log('All calculator files created successfully!');
