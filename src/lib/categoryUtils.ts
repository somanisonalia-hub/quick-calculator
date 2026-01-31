import { loadCalculatorContent, contentRegistry } from './contentRegistry';

// SEO Content Generation Interface
export interface SEOContent {
  introduction: string;
  benefits: string[];
  steps: string[];
  inputsExplained: string[];
  formulaExplanation: string;
  examples: string[];
  resultsExplanation: string[];
  whoItsFor: string;
  disclaimer: string;
  relatedTools: string[];
}

export interface CalculatorInfo {
  name: string;
  slug: string;
  summary: string;
  icon: string;
  difficulty: string;
  featured: boolean;
}

export interface CategoryData {
  name: string;
  slug: string;
  title: string;
  description: string;
  metaDescription: string;
  keywords: string[];
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  calculators: CalculatorInfo[];
}

// Available calculators with their categories (ALL 131 calculators mapped)
export const CALCULATOR_CATEGORIES = {
  // ========================================
  // FINANCIAL CALCULATORS (~75)
  // ========================================
  
  // Loans & Mortgages
  'loan-calculator': 'financial',
  'mortgage-calculator': 'financial',
  'emi-calculator': 'financial',
  'car-loan-calculator': 'financial',
  'car-affordability-calculator': 'financial',
  'interest-only-mortgage-calculator': 'financial',
  'advanced-loan-calculator': 'financial',
  'home-affordability-calculator': 'financial',
  'amortization-schedule-calculator': 'financial',
  'apr-calculator': 'financial',
  'basic-apr-calculator': 'financial',
  'ear-calculator': 'financial',
  'effective-interest-rate-calculator': 'financial',
  'nominal-interest-rate-calculator': 'financial',
  'periodic-interest-rate-calculator': 'financial',
  'equivalent-interest-rate-calculator': 'financial',
  'equal-principal-amortization-calculator': 'financial',
  'interest-calculator': 'financial',
  'interest-rate-table-calculator': 'financial',
  'loan-payment-table-generator': 'financial',
  'loan-repayment': 'financial',
  'loan-comparison': 'financial',
  'loan-affordability': 'financial',
  'loan-affordability-calculator': 'financial',
  
  // Investments & Savings
  'simple-interest-calculator': 'financial',
  'compound-interest-calculator': 'financial',
  'investment-calculator': 'financial',
  'future-value-calculator': 'financial',
  'retirement-calculator': 'financial',
  'retirement-savings': 'financial',
  'savings-goal': 'financial',
  'savings-interest': 'financial',
  'retirement-plan': 'financial',
  '401k-calculator': 'financial',
  'roth-ira-calculator': 'financial',
  'investment-return': 'financial',
  'investment-planner': 'financial',
  
  // Stocks & Bonds
  'stock-return-calculator': 'financial',
  'bond-duration-calculator': 'financial',
  'bond-yield-calculator': 'financial',
  'dividend-calculator': 'financial',
  'capital-gains-calculator': 'financial',
  'stock-ratios-calculator': 'financial',
  'profitability-ratios-calculator': 'financial',
  'crypto-roi-calculator': 'financial',
  
  // Taxes
  'income-tax-calculator': 'financial',
  'sales-tax-calculator': 'financial',
  'tax-calculator': 'financial',
  'property-tax-calculator': 'financial',
  'salary-tax': 'financial',
  'business-tax': 'financial',
  
  // Credit & Debt
  'credit-card-payoff': 'financial',
  'debt-consolidation-calculator': 'financial',
  'debt-payoff-calculator': 'financial',
  'debt-to-income': 'financial',
  'debt-to-income-calculator': 'financial',
  'emergency-fund': 'financial',
  
  // Salary & Payroll
  'hourly-to-salary-calculator': 'financial',
  'net-income-calculator': 'financial',
  'salary-calculator': 'financial',
  'overtime-pay-calculator': 'financial',
  'take-home-pay-calculator': 'financial',
  'paycheck-calculator': 'financial',
  'biweekly-pay-calculator': 'financial',
  'salary-payroll': 'financial',
  'employee-bonus': 'financial',
  
  // Insurance
  'life-insurance-calculator': 'financial',
  'car-insurance-calculator': 'financial',
  'health-insurance-calculator': 'financial',
  
  // Business & Finance
  'working-capital-calculator': 'financial',
  'ebit-calculator': 'financial',
  'roe-calculator': 'financial',
  'liquidity-ratios-calculator': 'financial',
  'operations-ratios-calculator': 'financial',
  'debt-ratios-calculator': 'financial',
  'startup-cost': 'financial',
  'revenue-growth': 'financial',
  'inventory': 'financial',
  'invoice-total': 'financial',
  'net-worth': 'financial',
  
  // Other Financial
  'inflation-calculator': 'financial',
  'currency-converter': 'financial',
  'social-security-calculator': 'financial',
  'car-payment-calculator': 'financial',
  'shipping-cost': 'financial',
  'fuel-cost': 'financial',
  'parking-cost': 'financial',
  'toll-cost': 'financial',

  // ========================================
  // HEALTH & FITNESS CALCULATORS (~16)
  // ========================================
  'bmi-calculator': 'health',
  'bmr-calculator': 'health',
  'calorie-calculator': 'health',
  'tdee-calculator': 'health',
  'body-fat-calculator': 'health',
  'ideal-weight-calculator': 'health',
  'protein-intake-calculator': 'health',
  'water-intake-calculator': 'health',
  'lean-body-mass-calculator': 'health',
  'maintenance-calories-calculator': 'health',
  'waist-to-hip-ratio-calculator': 'health',
  'macro-calculator': 'health',
  'pregnancy-calculator': 'health',
  'ovulation-calculator': 'health',
  'blood-pressure-calculator': 'health',
  'sleep-calculator': 'health',

  // ========================================
  // MATH CALCULATORS (~19)
  // ========================================
  'percentage-calculator': 'math',
  'percent-calculator': 'math',
  'percentage-change-calculator': 'math',
  'fraction-calculator': 'math',
  'ratio-calculator': 'math',
  'scientific-calculator': 'math',
  'average-calculator': 'math',
  'mean-median-mode-calculator': 'math',
  'standard-deviation-calculator': 'math',
  'percentile': 'math',
  'percentile-calculator': 'math',
  'probability': 'math',
  'probability-calculator': 'math',
  'ratio-proportion': 'math',
  'fraction-decimal': 'math',
  'linear-equation': 'math',
  'geometry-area': 'math',
  'circle-area-calculator': 'math',
  'circle-circumference-calculator': 'math',
  'triangle-area-calculator': 'math',
  'volume-calculator': 'math',
  'surface-area-calculator': 'math',
  'pythagorean-theorem-calculator': 'math',
  'quadratic-equation-calculator': 'math',

  // ========================================
  // LIFESTYLE CALCULATORS (~13)
  // ========================================
  'age-calculator': 'lifestyle',
  'tip-calculator': 'lifestyle',
  'gpa-calculator': 'lifestyle',
  'grade-calculator': 'lifestyle',
  'expense-calculator': 'lifestyle',
  'budget-calculator': 'lifestyle',
  'personal-budget': 'lifestyle',
  'savings-calculator': 'lifestyle',
  'credit-card-calculator': 'lifestyle',
  'exam-score-predictor': 'lifestyle',
  'study-hours-planner': 'lifestyle',
  'trip-planner': 'lifestyle',
  'travel-budget': 'lifestyle',
  'taxi-fare': 'lifestyle',
  'flight-carbon': 'lifestyle',

  // ========================================
  // UTILITY CALCULATORS (~8)
  // ========================================
  'square-footage-calculator': 'utility',
  'concrete-calculator': 'utility',
  'feet-inches-calculator': 'utility',
  'tank-volume-calculator': 'utility',
  'word-counter': 'utility',
  'numbers-to-words-converter': 'utility',
  'unit-converter': 'utility',
  'unit-conversion-calculator': 'utility',
  'date-calculator': 'utility',
  'speed-time': 'utility',
  'fuel-efficiency': 'utility',
  'password-generator': 'utility'
};

// Phase 1 Calculator Configuration - Common data source for consistent behavior across all pages
export const PHASE_1_CALCULATORS = [
  // 💰 FINANCIAL CALCULATORS (6 calculators - highest priority)
  { slug: 'mortgage-calculator', category: 'financial', name: 'Mortgage Calculator', summary: 'Calculate mortgage payments, interest rates, and total cost', icon: '🏠', difficulty: 'Beginner', featured: true },
  { slug: 'loan-calculator', category: 'financial', name: 'Loan Calculator', summary: 'Calculate loan payments, interest, and amortization schedules', icon: '💰', difficulty: 'Beginner', featured: true },
  { slug: 'savings-calculator', category: 'financial', name: 'Savings Calculator', summary: 'Calculate savings growth and goal planning', icon: '💰', difficulty: 'Beginner', featured: false },
  { slug: 'investment-calculator', category: 'financial', name: 'Investment Calculator', summary: 'Calculate investment returns and growth projections', icon: '📈', difficulty: 'Intermediate', featured: false },
  { slug: 'budget-calculator', category: 'financial', name: 'Budget Calculator', summary: 'Create and manage personal or business budgets', icon: '📊', difficulty: 'Beginner', featured: false },
  { slug: 'credit-card-calculator', category: 'financial', name: 'Credit Card Calculator', summary: 'Calculate credit card payments and interest', icon: '💳', difficulty: 'Beginner', featured: false },

  // 🏥 HEALTH & FITNESS CALCULATORS (5 calculators)
  { slug: 'bmi-calculator', category: 'health', name: 'BMI Calculator', summary: 'Calculate Body Mass Index and health category', icon: '⚖️', difficulty: 'Beginner', featured: true },
  { slug: 'bmr-calculator', category: 'health', name: 'BMR Calculator', summary: 'Calculate Basal Metabolic Rate and calorie needs', icon: '🔥', difficulty: 'Beginner', featured: false },
  { slug: 'calorie-calculator', category: 'health', name: 'Calorie Calculator', summary: 'Calculate daily calorie requirements and burn', icon: '🍎', difficulty: 'Beginner', featured: false },
  { slug: 'body-fat-calculator', category: 'health', name: 'Body Fat Calculator', summary: 'Calculate body fat percentage and composition', icon: '🏋️', difficulty: 'Beginner', featured: false },
  { slug: 'ideal-weight-calculator', category: 'health', name: 'Ideal Weight Calculator', summary: 'Calculate healthy weight range for your height', icon: '⚖️', difficulty: 'Beginner', featured: false },

  // 🔢 MATH & EVERYDAY CALCULATORS (8 calculators)
  { slug: 'percentage-calculator', category: 'math', name: 'Percentage Calculator', summary: 'Calculate percentages, percentage change, and ratios', icon: '📐', difficulty: 'Beginner', featured: false },
  { slug: 'fraction-calculator', category: 'math', name: 'Fraction Calculator', summary: 'Perform fraction arithmetic and conversions', icon: '🔢', difficulty: 'Beginner', featured: false },
  { slug: 'average-calculator', category: 'math', name: 'Average Calculator', summary: 'Calculate mean, median, and mode of numbers', icon: '📊', difficulty: 'Beginner', featured: false },
  { slug: 'unit-converter', category: 'math', name: 'Unit Converter', summary: 'Convert between different units of measurement', icon: '🔄', difficulty: 'Beginner', featured: false },
  { slug: 'scientific-calculator', category: 'math', name: 'Scientific Calculator', summary: 'Advanced scientific calculations and functions', icon: '🧮', difficulty: 'Intermediate', featured: false },
  { slug: 'pythagorean-theorem-calculator', category: 'math', name: 'Pythagorean Theorem Calculator', summary: 'Calculate missing sides of right triangles', icon: '📐', difficulty: 'Intermediate', featured: false },
  { slug: 'standard-deviation-calculator', category: 'math', name: 'Standard Deviation Calculator', summary: 'Calculate standard deviation and variance', icon: '📈', difficulty: 'Intermediate', featured: false },
  { slug: 'circle-area-calculator', category: 'math', name: 'Circle Area Calculator', summary: 'Calculate the area of circles and sectors', icon: '⭕', difficulty: 'Beginner', featured: false },

  // 🎭 LIFESTYLE CALCULATORS (4 calculators)
  { slug: 'age-calculator', category: 'lifestyle', name: 'Age Calculator', summary: 'Calculate exact age in years, months, and days', icon: '🎂', difficulty: 'Beginner', featured: false },
  { slug: 'tip-calculator', category: 'lifestyle', name: 'Tip Calculator', summary: 'Calculate tips and split bills at restaurants', icon: '🍽️', difficulty: 'Beginner', featured: false },
  { slug: 'gpa-calculator', category: 'lifestyle', name: 'GPA Calculator', summary: 'Calculate Grade Point Average for students', icon: '🎓', difficulty: 'Beginner', featured: false },
  { slug: 'budget-calculator', category: 'lifestyle', name: 'Budget Calculator', summary: 'Create and manage personal or business budgets', icon: '📊', difficulty: 'Beginner', featured: false },

  // 📅 UTILITY CALCULATORS (3 calculators)
  { slug: 'word-counter', category: 'utility', name: 'Word Counter', summary: 'Count words, characters, and reading time', icon: '📝', difficulty: 'Beginner', featured: false },
  { slug: 'numbers-to-words-converter', category: 'utility', name: 'Numbers to Words Converter', summary: 'Convert numbers to written words', icon: '🔤', difficulty: 'Beginner', featured: false },
  { slug: 'date-calculator', category: 'utility', name: 'Date Calculator', summary: 'Calculate date differences and future dates', icon: '📅', difficulty: 'Beginner', featured: false }
];

// Helper functions for Phase 1 data
export function getPhase1Slugs(): string[] {
  return PHASE_1_CALCULATORS.map(calc => calc.slug);
}

export function getPhase1CalculatorsByCategory(category: string) {
  return PHASE_1_CALCULATORS.filter(calc => calc.category === category);
}

export function isPhase1Calculator(slug: string): boolean {
  return getPhase1Slugs().includes(slug);
}

// Get all calculators for homepage display
// This function should be called server-side only
export function getAllCalculatorsForHomepage(lang: string): CalculatorInfo[] {
  const calculators: CalculatorInfo[] = [];
  
  // Check if we're in a server environment
  if (typeof window === 'undefined') {
    try {
      const fs = require('fs');
      const path = require('path');
      
      // Dynamically load ALL calculators from content directory
      const contentDir = path.join(process.cwd(), 'content', 'calculators');
      const files = fs.readdirSync(contentDir).filter((f: string) => f.endsWith('.json'));
      
      for (const file of files) {
        const slug = file.replace('.json', '');
        try {
          const content = loadCalculatorContent(lang, slug);
          if (content && content.title) {
            calculators.push({
              name: content.title,
              slug: content.slug || slug,
              summary: content.summary || content.description || 'Calculate various metrics',
              icon: getCalculatorIcon(slug),
              difficulty: content.difficulty || 'Beginner',
              featured: isFeaturedCalculator(slug)
            });
          }
        } catch (error) {
          // Skip calculators that fail to load
        }
      }
      
      return calculators;
    } catch (error) {
      console.error('Error loading calculators:', error);
    }
  }
  
  // Fallback to Phase 1 calculators for client-side or if error
  return PHASE_1_CALCULATORS.map(calc => ({
    name: calc.name,
    slug: calc.slug,
    summary: calc.summary,
    icon: calc.icon,
    difficulty: calc.difficulty,
    featured: calc.featured
  }));
}

export function getCategoryData(lang: string, categorySlug: string): CategoryData | null {
  const calculators = getCalculatorsForCategory(lang, categorySlug);
  if (calculators.length === 0) return null;

  return generateCategoryData(lang, categorySlug, calculators);
}

function getCalculatorsForCategory(lang: string, categorySlug: string): CalculatorInfo[] {
  const calculators: CalculatorInfo[] = [];

  // Dynamic approach: Read all calculator JSON files and filter by category
  // This replaces the hardcoded CALCULATOR_CATEGORIES mapping

  // For now, we'll use the existing mapping but also check JSON files dynamically
  // In the future, this should be fully dynamic

  // First, try the existing hardcoded mapping
  const categorySlugs = Object.entries(CALCULATOR_CATEGORIES)
    .filter(([, category]) => category === categorySlug)
    .map(([slug]) => slug);

  // Also dynamically discover calculators from JSON files
  // This ensures new calculators are automatically included
  try {
    // This is a simplified approach - in production you'd scan the directory
    // For now, we'll load known calculators dynamically
    const knownSlugs = [
      'mortgage-calculator', 'loan-calculator', 'savings-calculator', 'investment-calculator',
      'retirement-calculator', 'budget-calculator', 'tax-calculator', 'credit-card-calculator',
      'bmi-calculator', 'life-insurance-calculator', 'car-insurance-calculator', 'health-insurance-calculator',
      'crypto-roi-calculator', 'currency-converter', 'word-counter', 'numbers-to-words-converter',
      'debt-consolidation-calculator', 'advanced-loan-calculator', 'stock-return-calculator',
      'property-tax-calculator', 'future-value-calculator', 'gpa-calculator', 'expense-calculator'
      // Add more calculator slugs here as they're created
    ];

    for (const slug of knownSlugs) {
      try {
        const content = loadCalculatorContent(lang, slug);
        if (content && content.category?.toLowerCase() === categorySlug) {
          // Check if not already added from hardcoded mapping
          if (!calculators.find(calc => calc.slug === slug)) {
            calculators.push({
              name: content.seoTitle || content.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              slug: content.slug || slug,
              summary: content.summary || content.description || 'Calculate various metrics',
              icon: getCalculatorIcon(slug),
              difficulty: content.difficulty || 'Beginner',
              featured: isFeaturedCalculator(slug)
            });
          }
        }
      } catch (error) {
        // Skip calculators that fail to load
      }
    }
  } catch (error) {
    console.warn('Error in dynamic category loading:', error);
  }

  // Also add from hardcoded mapping for backward compatibility
  for (const slug of categorySlugs) {
    try {
      const content = loadCalculatorContent(lang, slug);
      if (content && content.title) {
        // Check if not already added
        if (!calculators.find(calc => calc.slug === slug)) {
          calculators.push({
            name: content.seoTitle || content.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            slug: content.slug || slug,
            summary: content.summary || content.description || 'Calculate various metrics',
            icon: getCalculatorIcon(slug),
            difficulty: content.difficulty || 'Beginner',
            featured: isFeaturedCalculator(slug)
          });
        }
      }
    } catch (error) {
      // Skip calculators that fail to load
    }
  }

  // Remove duplicates based on slug
  const uniqueCalculators = calculators.filter((calc, index, self) =>
    index === self.findIndex(c => c.slug === calc.slug)
  );

  return uniqueCalculators;
}

function generateCategoryData(lang: string, categorySlug: string, calculators: CalculatorInfo[]): CategoryData {
  const categoryNames = {
    financial: {
      en: 'Financial Calculators',
      es: 'Calculadoras Financieras',
      pt: 'Calculadoras Financeiras',
      fr: 'Calculatrices Financières'
    },
    health: {
      en: 'Health Calculators',
      es: 'Calculadoras de Salud',
      pt: 'Calculadoras de Saúde',
      fr: 'Calculatrices de Santé'
    },
    math: {
      en: 'Math Calculators',
      es: 'Calculadoras Matemáticas',
      pt: 'Calculadoras Matemáticas',
      fr: 'Calculatrices Mathématiques'
    },
    utility: {
      en: 'Utility Calculators',
      es: 'Calculadoras de Utilidad',
      pt: 'Calculadoras de Utilitários',
      fr: 'Calculatrices Utiles'
    },
    lifestyle: {
      en: 'Lifestyle Calculators',
      es: 'Calculadoras de Estilo de Vida',
      pt: 'Calculadoras de Estilo de Vida',
      fr: 'Calculatrices de Style de Vie'
    }
  };

  const categoryTitles = {
    financial: {
      en: 'Financial Calculators - Money Management Tools',
      es: 'Calculadoras Financieras - Herramientas de Gestión del Dinero',
      pt: 'Calculadoras Financeiras - Ferramentas de Gestão de Dinheiro',
      fr: 'Calculatrices Financières - Outils de Gestion d\'Argent'
    },
    health: {
      en: 'Health Calculators - Wellness and Fitness Tools',
      es: 'Calculadoras de Salud - Herramientas de Bienestar y Fitness',
      pt: 'Calculadoras de Saúde - Ferramentas de Bem-Estar e Fitness',
      fr: 'Calculatrices de Santé - Outils de Bien-être et Fitness'
    },
    math: {
      en: 'Math Calculators - Everyday Problem Solving',
      es: 'Calculadoras Matemáticas - Resolución de Problemas Cotidianos',
      pt: 'Calculadoras Matemáticas - Resolução de Problemas Cotidianos',
      fr: 'Calculatrices Mathématiques - Résolution de Problèmes Quotidiens'
    },
    utility: {
      en: 'Utility Calculators - Productivity and Daily Tasks',
      es: 'Calculadoras de Utilidad - Productividad y Tareas Diarias',
      pt: 'Calculadoras de Utilitários - Produtividade e Tarefas Diárias',
      fr: 'Calculatrices Utilitaires - Productivité et Tâches Quotidiennes'
    },
    lifestyle: {
      en: 'Lifestyle Calculators - Personal Planning Tools',
      es: 'Calculadoras de Estilo de Vida - Herramientas de Planificación Personal',
      pt: 'Calculadoras de Estilo de Vida - Ferramentas de Planejamento Pessoal',
      fr: 'Calculatrices de Style de Vie - Outils de Planification Personnelle'
    }
  };

  const categoryDescriptions = {
    financial: {
      en: 'Comprehensive collection of financial calculators for loans, savings, investments, taxes, and debt management. Make informed financial decisions with our accurate calculation tools.',
      es: 'Colección completa de calculadoras financieras para préstamos, ahorros, inversiones, impuestos y gestión de deudas. Tome decisiones financieras informadas con nuestras herramientas de cálculo precisas.',
      pt: 'Coleção completa de calculadoras financeiras para empréstimos, poupanças, investimentos, impostos e gestão de dívidas. Tome decisões financeiras informadas com nossas ferramentas de cálculo precisas.',
      fr: 'Collection complète de calculatrices financières pour les prêts, épargnes, investissements, impôts et gestion de dettes. Prenez des décisions financières éclairées avec nos outils de calcul précis.'
    },
    health: {
      en: 'Track your health metrics with our collection of wellness calculators. Calculate BMI, calorie needs, and other important health indicators for optimal fitness and well-being.',
      es: 'Rastree sus métricas de salud con nuestra colección de calculadoras de bienestar. Calcule IMC, necesidades calóricas y otros indicadores importantes de salud para un fitness y bienestar óptimos.',
      pt: 'Acompanhe suas métricas de saúde com nossa coleção de calculadoras de bem-estar. Calcule IMC, necessidades calóricas e outros indicadores importantes de saúde para fitness e bem-estar ótimos.',
      fr: 'Suivez vos métriques de santé avec notre collection de calculatrices de bien-être. Calculez l\'IMC, les besoins caloriques et d\'autres indicateurs importants de santé pour un fitness et bien-être optimaux.'
    },
    math: {
      en: 'Solve everyday math problems with our comprehensive collection of mathematical calculators. From percentages and fractions to unit conversions and averages, get accurate results instantly.',
      es: 'Resuelva problemas matemáticos cotidianos con nuestra completa colección de calculadoras matemáticas. Desde porcentajes y fracciones hasta conversiones de unidades y promedios, obtenga resultados precisos al instante.',
      pt: 'Resolva problemas matemáticos cotidianos com nossa coleção completa de calculadoras matemáticas. De porcentagens e frações até conversões de unidades e médias, obtenha resultados precisos instantaneamente.',
      fr: 'Résolvez les problèmes mathématiques quotidiens avec notre collection complète de calculatrices mathématiques. Des pourcentages et fractions aux conversions d\'unités et moyennes, obtenez des résultats précis instantanément.'
    },
    utility: {
      en: 'Essential utility calculators for everyday tasks and productivity. From age calculations and GPA tracking to tip calculations and word counting, streamline your daily activities with accurate results.',
      es: 'Calculadoras de utilidad esenciales para tareas cotidianas y productividad. Desde cálculos de edad y seguimiento de GPA hasta cálculos de propinas y conteo de palabras, optimice sus actividades diarias con resultados precisos.',
      pt: 'Calculadoras de utilitários essenciais para tarefas cotidianas e produtividade. De cálculos de idade e acompanhamento de GPA até cálculos de gorjetas e contagem de palavras, otimize suas atividades diárias com resultados precisos.',
      fr: 'Calculatrices utilitaires essentielles pour les tâches quotidiennes et la productivité. Des calculs d\'âge et du suivi GPA aux calculs de pourboires et au comptage de mots, rationalisez vos activités quotidiennes avec des résultats précis.'
    },
    lifestyle: {
      en: 'Lifestyle calculators for personal and everyday planning. From budgeting and tipping to academic performance tracking, make informed decisions about your personal finances and daily activities.',
      es: 'Calculadoras de estilo de vida para planificación personal y cotidiana. Desde presupuestos y propinas hasta seguimiento del rendimiento académico, tome decisiones informadas sobre sus finanzas personales y actividades diarias.',
      pt: 'Calculadoras de estilo de vida para planejamento pessoal e cotidiano. De orçamentos e gorjetas até acompanhamento do desempenho acadêmico, tome decisões informadas sobre suas finanças pessoais e atividades diárias.',
      fr: 'Calculatrices de style de vie pour la planification personnelle et quotidienne. Des budgets et pourboires au suivi des performances académiques, prenez des décisions éclairées concernant vos finances personnelles et vos activités quotidiennes.'
    }
  };

  const heroData = {
    financial: {
      en: { title: 'Financial Calculators', subtitle: 'Plan your finances with confidence', description: 'From mortgages to retirement planning, our financial calculators help you make smart money decisions.' },
      es: { title: 'Calculadoras Financieras', subtitle: 'Planee sus finanzas con confianza', description: 'Desde hipotecas hasta planificación de jubilación, nuestras calculadoras financieras le ayudan a tomar decisiones inteligentes sobre el dinero.' },
      pt: { title: 'Calculadoras Financeiras', subtitle: 'Planeje suas finanças com confiança', description: 'De hipotecas ao planejamento de aposentadoria, nossas calculadoras financeiras ajudam você a tomar decisões inteligentes sobre dinheiro.' },
      fr: { title: 'Calculatrices Financières', subtitle: 'Planifiez vos finances avec confiance', description: 'Des hypothèques à la planification de retraite, nos calculatrices financières vous aident à prendre des décisions intelligentes sur l\'argent.' }
    },
    health: {
      en: { title: 'Health Calculators', subtitle: 'Track your wellness journey', description: 'Monitor your health metrics and make informed decisions about fitness, nutrition, and overall well-being.' },
      es: { title: 'Calculadoras de Salud', subtitle: 'Rastree su viaje de bienestar', description: 'Monitoree sus métricas de salud y tome decisiones informadas sobre fitness, nutrición y bienestar general.' },
      pt: { title: 'Calculadoras de Saúde', subtitle: 'Acompanhe sua jornada de bem-estar', description: 'Monitore suas métricas de saúde e tome decisões informadas sobre fitness, nutrição e bem-estar geral.' },
      fr: { title: 'Calculatrices de Santé', subtitle: 'Suivez votre voyage de bien-être', description: 'Surveillez vos métriques de santé et prenez des décisions éclairées concernant le fitness, la nutrition et le bien-être général.' }
    }
  };

  return {
    name: (categoryNames as any)[categorySlug]?.[lang] || (categoryNames as any)[categorySlug]?.['en'] || `${categorySlug} Calculators`,
    slug: categorySlug,
    title: (categoryTitles as any)[categorySlug]?.[lang] || (categoryTitles as any)[categorySlug]?.['en'] || `${categorySlug} Calculators`,
    description: (categoryDescriptions as any)[categorySlug]?.[lang] || (categoryDescriptions as any)[categorySlug]?.['en'] || `Collection of ${categorySlug} calculators.`,
    metaDescription: (categoryDescriptions as any)[categorySlug]?.[lang] || (categoryDescriptions as any)[categorySlug]?.['en'] || `Free ${categorySlug} calculators.`,
    keywords: [`${categorySlug} calculator`, `${categorySlug} tools`, `online ${categorySlug} calculators`],
    hero: (heroData as any)[categorySlug]?.[lang] || (heroData as any)[categorySlug]?.['en'] || { title: `${categorySlug} Calculators`, subtitle: `Explore ${categorySlug} tools`, description: `Discover our collection of ${categorySlug} calculators.` },
    calculators
  };
}

function getCalculatorIcon(slug: string): string {
  const iconMap: Record<string, string> = {
    'mortgage-calculator': '🏠',
    'loan-calculator': '💰',
    'credit-card-calculator': '💳',
    'savings-calculator': '💸',
    'bmi-calculator': '⚖️',
    'calorie-calculator': '🍎',
    'sales-tax-calculator': '🛒',
    'age-calculator': '📅',
    'tip-calculator': '🧾',
    'car-payment-calculator': '🚗',
    'retirement-calculator': '🏖️',
    'tax-calculator': '💼',
    'paycheck-calculator': '💵',
    'addition-calculator': '➕',
    'fraction-calculator': '½',
    'percent-calculator': '%',
    'percentage-change-calculator': '📊',
    'ratio-calculator': '📏',
    'feet-inches-calculator': '📏',
    'mean-median-mode-calculator': '📊',
    'standard-deviation-calculator': '📈',
    'tank-volume-calculator': '🛢️',
    'inflation-calculator': '💹',
    'currency-converter': '💱',
    'gpa-calculator': '🎓',
    'property-tax-calculator': '🏠',
    'future-value-calculator': '📈',
    'word-counter': '📝',
    'numbers-to-words-converter': '🔤',
    'advanced-loan-calculator': '📊',
    'stock-return-calculator': '📈',
    'life-insurance-calculator': '🛡️',
    'expense-calculator': '💳',
    'car-insurance-calculator': '🚗',
    'health-insurance-calculator': '🏥',
    'hourly-to-salary-calculator': '⏰',
    'net-income-calculator': '💰',
    'take-home-pay-calculator': '💵',
    'income-tax-calculator': '📊',
    'protein-intake-calculator': '💪',
    'water-intake-calculator': '💧',
    'lean-body-mass-calculator': '⚖️',
    'maintenance-calories-calculator': '🔥',
    'tdee-calculator': '⚡',
    'waist-to-hip-ratio-calculator': '📏',
    'salary-calculator': '💼',
    'overtime-pay-calculator': '⏰',
    'crypto-roi-calculator': '₿',
    'debt-consolidation-calculator': '💰',
    'interest-only-mortgage-calculator': '🏠',
    'concrete-calculator': '🏗️',
    'square-footage-calculator': '📐',
    'simple-interest-calculator': '💰',
    'compound-interest-calculator': '📈',
    'emi-calculator': '💳',
    'budget-calculator': '📊'
  };
  return iconMap[slug] || '🧮';
}

function isFeaturedCalculator(slug: string): boolean {
  const featured = [
    'mortgage-calculator',
    'loan-calculator',
    'bmi-calculator',
    'credit-card-calculator',
    'savings-calculator'
  ];
  return featured.includes(slug);
}

export function getAvailableCategories(): string[] {
  return ['financial', 'health', 'math', 'utility', 'lifestyle'];
}

export function getCategoryTitle(lang: string, categorySlug: string): string {
  const titles = {
    financial: { en: 'Financial Calculators', es: 'Calculadoras Financieras', pt: 'Calculadoras Financeiras', fr: 'Calculatrices Financières' },
    health: { en: 'Health Calculators', es: 'Calculadoras de Salud', pt: 'Calculadoras de Saúde', fr: 'Calculatrices de Santé' },
    math: { en: 'Math Calculators', es: 'Calculadoras Matemáticas', pt: 'Calculadoras Matemáticas', fr: 'Calculatrices Mathématiques' },
    utility: { en: 'Utility Calculators', es: 'Calculadoras de Utilidad', pt: 'Calculadoras de Utilitários', fr: 'Calculatrices Utiles' },
    lifestyle: { en: 'Lifestyle Calculators', es: 'Calculadoras de Estilo de Vida', pt: 'Calculadoras de Estilo de Vida', fr: 'Calculatrices de Style de Vie' }
  };
  return (titles as any)[categorySlug]?.[lang] || (titles as any)[categorySlug]?.['en'] || `${categorySlug} Calculators`;
}

export function getRelatedCalculators(lang: string, currentCalculatorSlug: string, maxRelated: number = 8): CalculatorInfo[] {
  const currentCategory = (CALCULATOR_CATEGORIES as any)[currentCalculatorSlug];
  const relatedCalculators: CalculatorInfo[] = [];

  if (!currentCategory) return relatedCalculators;

  // 1. Add all calculators from the same category (excluding current)
  const sameCategorySlugs = Object.entries(CALCULATOR_CATEGORIES)
    .filter(([slug, category]) => category === currentCategory && slug !== currentCalculatorSlug)
    .map(([slug]) => slug);

  for (const slug of sameCategorySlugs) {
    try {
      const content = loadCalculatorContent(lang, slug);
      if (content && content.title) {
        relatedCalculators.push({
          name: content.title,
          slug: content.slug || slug,
          summary: content.summary || content.description || 'Calculate various metrics',
          icon: getCalculatorIcon(slug),
          difficulty: content.difficulty || 'Beginner',
          featured: isFeaturedCalculator(slug)
        });
      }
    } catch (error) {
      // Skip calculators that fail to load
    }
  }

  // 2. If we need more, add some popular calculators from other categories
  if (relatedCalculators.length < maxRelated) {
    const popularCalculators = [
      'mortgage-calculator',
      'bmi-calculator',
      'loan-calculator',
      'tax-calculator',
      'budget-calculator',
      'currency-converter',
      'savings-calculator',
      'investment-calculator'
    ];

    for (const slug of popularCalculators) {
      if (relatedCalculators.length >= maxRelated) break;
      if (slug !== currentCalculatorSlug && (CALCULATOR_CATEGORIES as any)[slug] !== currentCategory) {
        try {
          const content = loadCalculatorContent(lang, slug);
          if (content && content.title) {
            relatedCalculators.push({
              name: content.title,
              slug: content.slug || slug,
              summary: content.summary || content.description || 'Calculate various metrics',
              icon: getCalculatorIcon(slug),
              difficulty: content.difficulty || 'Beginner',
              featured: isFeaturedCalculator(slug)
            });
          }
        } catch (error) {
          // Skip calculators that fail to load
        }
      }
    }
  }

  return relatedCalculators.slice(0, maxRelated);
}

/**
 * Generate structured SEO content for a calculator using the production-ready Cursor prompt approach
 */
export function generateStructuredSEOContent(calculatorContent: any): SEOContent {
  const content = calculatorContent;
  if (!content) {
    return {
      introduction: '',
      benefits: [],
      steps: [],
      inputsExplained: [],
      formulaExplanation: '',
      examples: [],
      resultsExplanation: [],
      whoItsFor: '',
      disclaimer: '',
      relatedTools: []
    };
  }

  const keywords = content.keywords || [];
  const longTailKeywords = content.longTailKeywords || [];
  const primaryKeyword = keywords[0] || content.title?.toLowerCase() || 'calculator';

  // Generate introduction (120-150 words)
  const introduction = `${content.summary || ''} ${content.description || ''} This comprehensive tool helps students, educators, and academic professionals track and calculate grade point averages with precision and ease. Whether you're a high school student planning your college applications, a college student monitoring your academic progress, or an educator helping students understand their performance, this GPA calculator provides accurate calculations based on standard grading systems. The tool supports multiple grading scales and both weighted and unweighted calculations, making it suitable for different educational institutions and academic requirements.`;

  // Generate benefits (4-6 bullet points)
  const benefits = [
    `Provides precise GPA calculations using standard academic formulas`,
    `Supports multiple grading scales commonly used in educational institutions`,
    `Handles both weighted and unweighted calculations for different academic contexts`,
    `Offers instant results with detailed breakdowns of academic performance`,
    `Helps students track progress toward academic goals and graduation requirements`,
    `Enables educators to demonstrate GPA concepts through practical calculations`
  ];

  // Generate steps (numbered list)
  const steps = [
    `Choose your grading scale (4.0, 5.0, or other standard scales)`,
    `Select whether you want weighted or unweighted GPA calculation`,
    `Enter each course grade and its corresponding credit hours`,
    `Review the calculated GPA and detailed breakdown of your academic performance`
  ];

  // Generate inputs explanation
  const inputsExplained = [
    `Grading scale determines the maximum possible GPA and how letter grades convert to numeric values`,
    `Course grades represent your actual performance in each class, converted to grade points`,
    `Credit hours indicate the weight or importance of each course in your academic load`,
    `Calculation type affects how honors or advanced placement courses impact your final GPA`
  ];

  // Generate formula explanation
  const formulaExplanation = `The GPA calculation follows a straightforward mathematical approach that considers both your performance in each course and the credit value of those courses. Grade points are assigned based on your letter grades (typically A=4, B=3, C=2, D=1, F=0), then multiplied by the credit hours for each course. These weighted grade points are summed and divided by the total credit hours attempted. Weighted calculations give additional points for honors or advanced courses, while unweighted calculations treat all courses equally. This method ensures that courses with higher credit values have more impact on your overall academic average.`;

  // Generate examples
  const examples = [
    `A college student with courses: Calculus (A, 4 credits), English (B+, 3 credits), Biology (A-, 4 credits), and History (B, 2 credits) would calculate: (16 + 9.9 + 14.8 + 6) ÷ 13 = 3.58 GPA`,
    `A high school student in weighted courses: AP Physics (A, 5 credits), Honors Chemistry (B+, 4 credits), Regular Math (A, 3 credits) calculates: (20 + 13.2 + 12) ÷ 12 = 4.03 weighted GPA`
  ];

  // Generate results explanation
  const resultsExplanation = [
    `GPA displays your overall academic average on the selected scale`,
    `Total credits shows the cumulative credit hours you've attempted`,
    `Grade classification indicates your academic standing based on standard ranges`,
    `Letter grade equivalent provides a simple translation of your numeric GPA`
  ];

  // Generate who it's for
  const whoItsFor = `This calculator is designed for high school and college students who need to track their academic performance, educators teaching GPA concepts, academic advisors helping students with course planning, and parents assisting their children with educational planning. It's particularly useful for students preparing for college applications, monitoring progress toward graduation requirements, or understanding how different courses impact their overall academic standing.`;

  // Generate disclaimer
  const disclaimer = `This calculator provides estimates based on standard academic formulas and common grading practices. Actual GPA calculations may vary by institution due to specific grading policies, course weighting systems, or academic regulations. For official academic records, always consult your school's registrar or academic advisor. This tool is for educational purposes and should not replace official university calculations.`;

  // Generate related tools
  const relatedTools = [
    `Percentage calculators for grade conversions and academic planning`,
    `Average calculators for understanding statistical concepts in education`,
    `Grade tracking tools for comprehensive academic performance monitoring`
  ];

  return {
    introduction,
    benefits,
    steps,
    inputsExplained,
    formulaExplanation,
    examples,
    resultsExplanation,
    whoItsFor,
    disclaimer,
    relatedTools
  };
}


/**
 * Render structured SEO content as HTML for display
 */
export function renderStructuredSEOContent(seoContent: SEOContent, lang: string = 'en', calculatorName?: string): string {
  const translations = {
    howDoesWork: { en: 'How Does', es: '¿Cómo Funciona', pt: 'Como Funciona', fr: 'Comment Ça Marche' },
    introduction: { en: 'Introduction', es: 'Introducción', pt: 'Introdução', fr: 'Introduction' },
    benefits: { en: 'What This Calculator Helps You Do', es: 'Qué Te Ayuda a Hacer Esta Calculadora', pt: 'O Que Esta Calculadora Te Ajuda a Fazer', fr: 'Ce Que Cette Calculatrice Vous Aide à Faire' },
    howToUse: { en: 'How to Use the Calculator', es: 'Cómo Usar la Calculadora', pt: 'Como Usar a Calculadora', fr: 'Comment Utiliser la Calculatrice' },
    calculatorInputs: { en: 'Calculator Inputs Explained', es: 'Entradas de la Calculadora Explicadas', pt: 'Entradas da Calculadora Explicadas', fr: 'Entrées de la Calculatrice Expliquées' },
    howItWorks: { en: 'How the Calculation Works', es: 'Cómo Funciona el Cálculo', pt: 'Como Funciona o Cálculo', fr: 'Comment Fonctionne le Calcul' },
    exampleScenarios: { en: 'Example Scenarios', es: 'Escenarios de Ejemplo', pt: 'Cenários de Exemplo', fr: 'Scénarios d\'Exemple' },
    understandingResults: { en: 'Understanding Your Results', es: 'Entendiendo Tus Resultados', pt: 'Entendendo Seus Resultados', fr: 'Comprendre Vos Résultats' },
    whoItsFor: { en: 'Who Should Use This Calculator', es: 'Quién Debería Usar Esta Calculadora', pt: 'Quem Deve Usar Esta Calculadora', fr: 'Qui Devrait Utiliser Cette Calculatrice' },
    importantNotes: { en: 'Important Notes & Disclaimer', es: 'Notas Importantes y Descargo de Responsabilidad', pt: 'Notas Importantes e Isenção de Responsabilidade', fr: 'Notes Importantes et Avis de Non-Responsabilité' },
    relatedTools: { en: 'Related Calculators', es: 'Calculadoras Relacionadas', pt: 'Calculadoras Relacionadas', fr: 'Calculatrices Connexes' }
  };

  const t = (key: string) => translations[key as keyof typeof translations]?.[lang as keyof typeof translations[keyof typeof translations]] || key;

  const sections = [];

  // Introduction
  if (seoContent.introduction) {
    sections.push(`
      <div class="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
        <h3 class="text-xl font-semibold text-blue-900 mb-3">${t('introduction')}</h3>
        <p class="text-gray-800 leading-relaxed">${seoContent.introduction}</p>
      </div>
    `);
  }

  // Benefits
  if (seoContent.benefits && seoContent.benefits.length > 0) {
    sections.push(`
      <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <span class="inline-block w-2 h-2 bg-green-500 rounded-full mr-3"></span>
        ${t('benefits')}
      </h3>
      <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg mb-8">
        <ul class="space-y-3">
          ${seoContent.benefits.map(benefit => `
            <li class="flex items-start">
              <span class="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span class="text-gray-800 leading-relaxed">${benefit}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `);
  }

  // How to Use
  if (seoContent.steps && seoContent.steps.length > 0) {
    sections.push(`
      <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <span class="inline-block w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
       ${t('howToUse')}
      </h3>
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-8">
        <ol class="space-y-3">
          ${seoContent.steps.map((step, index) => `
            <li class="flex items-start">
              <span class="inline-flex items-center justify-center w-6 h-6 bg-blue-500 text-white text-sm font-bold rounded-full mr-3 flex-shrink-0 mt-0.5">${index + 1}</span>
              <span class="text-gray-800 leading-relaxed">${step}</span>
            </li>
          `).join('')}
        </ol>
      </div>
    `);
  }

  // Calculator Inputs Explained
  if (seoContent.inputsExplained && seoContent.inputsExplained.length > 0) {
    sections.push(`
      <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <span class="inline-block w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
        ${t('calculatorInputs')}
      </h3>
      <div class="grid md:grid-cols-2 gap-4 mb-8">
        ${seoContent.inputsExplained.map(input => `
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
            <p class="text-gray-800 leading-relaxed">${input}</p>
          </div>
        `).join('')}
      </div>
    `);
  }

  // How the Calculation Works
  if (seoContent.formulaExplanation) {
    sections.push(`
      <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <span class="inline-block w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
        ${t('howItWorks')}
      </h3>
      <div class="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg mb-8 border-l-4 border-orange-400">
        <p class="text-gray-800 leading-relaxed">${seoContent.formulaExplanation}</p>
      </div>
    `);
  }

  // Example Scenarios
  if (seoContent.examples && seoContent.examples.length > 0) {
    sections.push(`
      <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <span class="inline-block w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
        ${t('exampleScenarios')}
      </h3>
      <div class="space-y-4 mb-8">
        ${seoContent.examples.map((example, index) => `
          <div class="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg border border-teal-200">
            <div class="flex items-start">
              <span class="inline-flex items-center justify-center w-8 h-8 bg-teal-500 text-white text-sm font-bold rounded-full mr-4 flex-shrink-0">Ex ${index + 1}</span>
              <p class="text-gray-800 leading-relaxed">${example}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `);
  }

  // Understanding Your Results
  if (seoContent.resultsExplanation && seoContent.resultsExplanation.length > 0) {
    sections.push(`
      <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <span class="inline-block w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
        ${t('understandingResults')}
      </h3>
      <div class="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg mb-8">
        <ul class="space-y-3">
          ${seoContent.resultsExplanation.map(result => `
            <li class="flex items-start">
              <span class="inline-block w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span class="text-gray-800 leading-relaxed">${result}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `);
  }

  // Who It's For
  if (seoContent.whoItsFor) {
    sections.push(`
      <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <span class="inline-block w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
        ${t('whoItsFor')}
      </h3>
      <div class="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-lg mb-8">
        <p class="text-gray-800 leading-relaxed">${seoContent.whoItsFor}</p>
      </div>
    `);
  }

  // Important Notes & Disclaimer
  if (seoContent.disclaimer) {
    sections.push(`
      <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <span class="inline-block w-2 h-2 bg-red-500 rounded-full mr-3"></span>
        ${t('importantNotes')}
      </h3>
      <div class="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-lg mb-8 border-l-4 border-red-400">
        <p class="text-gray-800 leading-relaxed">${seoContent.disclaimer}</p>
      </div>
    `);
  }

  // Related Tools
  if (seoContent.relatedTools && seoContent.relatedTools.length > 0) {
    sections.push(`
      <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <span class="inline-block w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
        ${t('relatedTools')}
      </h3>
      <div class="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg">
        <ul class="space-y-2">
          ${seoContent.relatedTools.map(tool => `
            <li class="flex items-start">
              <span class="inline-block w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span class="text-gray-800 leading-relaxed">${tool}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `);
  }

  return sections.join('');
}

export function generateCalculatorSEOContent(calculatorContent: any, relatedCalculators: CalculatorInfo[] = [], lang: string = 'en'): string {
  // calculatorContent is already the language-specific content from loadCalculatorContent
  const content = calculatorContent;
  if (!content) return '';

  const sections: string[] = [];

  // 1. Introductory Paragraph (50-70 words) - Include long-tail keywords
  const keywords = content.keywords || [];
  const longTailKeywords = content.longTailKeywords || [];

  // Translation mappings for SEO content sections
  const translations = {
    // Section headers
    howToUse: { en: 'How to Use the', es: 'Cómo Usar la', pt: 'Como Usar a', fr: 'Comment Utiliser le' },
    purposeAndBenefits: { en: 'Purpose and Benefits', es: 'Propósito y Beneficios', pt: 'Propósito e Benefícios', fr: 'Objectif et Avantages' },
    stepByStepInstructions: { en: 'Step-by-Step Instructions', es: 'Instrucciones Paso a Paso', pt: 'Instruções Passo a Passo', fr: 'Instructions Étape par Étape' },
    calculatorInputsExplained: { en: 'Calculator Inputs Explained', es: 'Entradas de la Calculadora Explicadas', pt: 'Entradas da Calculadora Explicadas', fr: 'Entrées de la Calculatrice Expliquées' },
    formulaWorks: { en: 'Formula Works', es: 'Funciona la Fórmula', pt: 'Funciona a Fórmula', fr: 'Fonctionne la Formule' },
    understandingYourResults: { en: 'Understanding Your Results', es: 'Entendiendo Tus Resultados', pt: 'Entendendo Seus Resultados', fr: 'Comprendre Vos Résultats' },
    exampleScenarios: { en: 'Example Scenarios', es: 'Escenarios de Ejemplo', pt: 'Cenários de Exemplo', fr: 'Scénarios d\'Exemple' },
    popularSearchTerms: { en: 'Popular Search Terms', es: 'Términos de Búsqueda Populares', pt: 'Termos de Pesquisa Populares', fr: 'Termes de Recherche Populaires' },
    relatedTools: { en: 'Related Tools', es: 'Herramientas Relacionadas', pt: 'Ferramentas Relacionadas', fr: 'Outils Connexes' },
    getStartedToday: { en: 'Get Started Today', es: 'Comienza Hoy', pt: 'Comece Hoje', fr: 'Commencez Aujourd\'hui' },

    // Benefit labels
    accurateCalculations: { en: 'Accurate Calculations', es: 'Cálculos Precisos', pt: 'Cálculos Precisos', fr: 'Calculs Précis' },
    timeSaving: { en: 'Time-Saving', es: 'Ahorro de Tiempo', pt: 'Economia de Tempo', fr: 'Gain de Temps' },
    educationalValue: { en: 'Educational Value', es: 'Valor Educativo', pt: 'Valor Educativo', fr: 'Valeur Éducative' },
    seoOptimized: { en: 'SEO Optimized', es: 'Optimizado para SEO', pt: 'Otimizado para SEO', fr: 'Optimisé pour le SEO' },
    decisionSupport: { en: 'Decision Support', es: 'Apoyo en Decisiones', pt: 'Suporte de Decisão', fr: 'Support de Décision' },

    // Explanatory text
    ourCalculatorConsiders: { en: 'Our calculator considers', es: 'Nuestra calculadora considera', pt: 'Nossa calculadora considera', fr: 'Notre calculatrice considère' },
    keyInputs: { en: 'key inputs to provide accurate results:', es: 'entradas clave para proporcionar resultados precisos:', pt: 'entradas-chave para fornecer resultados precisos:', fr: 'entrées clés pour fournir des résultats précis:' },
    theseFactors: { en: 'These factors are carefully considered to ensure your calculations reflect real-world conditions.', es: 'Estos factores se consideran cuidadosamente para asegurar que tus cálculos reflejen condiciones del mundo real.', pt: 'Estes fatores são cuidadosamente considerados para garantir que seus cálculos reflitam condições do mundo real.', fr: 'Ces facteurs sont soigneusement pris en compte pour garantir que vos calculs reflètent les conditions du monde réel.' },
    mathematicalFormula: { en: 'This mathematical formula ensures accurate results based on established', es: 'Esta fórmula matemática asegura resultados precisos basados en principios establecidos de', pt: 'Esta fórmula matemática garante resultados precisos baseados em princípios estabelecidos de', fr: 'Cette formule mathématique garantit des résultats précis basés sur des principes établis de' },
    principles: { en: 'principles and industry standards.', es: 'y estándares de la industria.', pt: 'e padrões da indústria.', fr: 'et normes de l\'industrie.' },
    primaryResult: { en: 'Primary Result:', es: 'Resultado Principal:', pt: 'Resultado Principal:', fr: 'Résultat Principal:' },
    yourMainResult: { en: 'Your main result is displayed in', es: 'Tu resultado principal se muestra en', pt: 'Seu resultado principal é exibido em', fr: 'Votre résultat principal est affiché en' },
    format: { en: 'format for easy interpretation.', es: 'formato para fácil interpretación.', pt: 'formato para fácil interpretação.', fr: 'format pour une interprétation facile.' },
    additionalDetails: { en: 'Additional Details:', es: 'Detalles Adicionales:', pt: 'Detalhes Adicionais:', fr: 'Détails Supplémentaires:' },
    providesDetailedInfo: { en: 'Provides detailed breakdown information', es: 'Proporciona información detallada del desglose', pt: 'Fornece informações detalhadas da análise', fr: 'Fournit des informations détaillées de ventilation' },

    // Popular search terms and related tools
    peopleFrequentlySearch: { en: 'People frequently search for these related terms when looking for', es: 'Las personas buscan con frecuencia estos términos relacionados cuando buscan', pt: 'As pessoas frequentemente pesquisam estes termos relacionados ao procurar por', fr: 'Les gens recherchent fréquemment ces termes connexes lorsqu\'ils cherchent' },
    ourCalculatorCovers: { en: 'Our calculator covers all these search queries and more, providing comprehensive', es: 'Nuestra calculadora cubre todas estas consultas de búsqueda y más, proporcionando capacidades integrales de', pt: 'Nossa calculadora cobre todas essas consultas de pesquisa e mais, fornecendo capacidades abrangentes de', fr: 'Notre calculatrice couvre toutes ces requêtes de recherche et plus, offrant des capacités complètes de' },
    capabilities: { en: 'capabilities.', es: '.', pt: '.', fr: '.' },
    youMayAlsoFind: { en: 'You may also find these related calculators useful:', es: 'También puedes encontrar útiles estas calculadoras relacionadas:', pt: 'Você também pode achar úteis estas calculadoras relacionadas:', fr: 'Vous pouvez également trouver utiles ces calculatrices connexes:' },
    readyToUse: { en: 'Ready to use our', es: '¿Listo para usar nuestra', pt: 'Pronto para usar nossa', fr: 'Prêt à utiliser notre' },
    providesClarity: { en: 'provides clarity and accurate calculations to help you make informed decisions.', es: 'proporciona claridad y cálculos precisos para ayudarte a tomar decisiones informadas.', pt: 'fornece clareza e cálculos precisos para ajudá-lo a tomar decisões informadas.', fr: 'fournit clarté et calculs précis pour vous aider à prendre des décisions éclairées.' },
    tryNow: { en: 'Try', es: 'Prueba', pt: 'Experimente', fr: 'Essayez' },
    now: { en: 'Now', es: 'Ahora', pt: 'Agora', fr: 'Maintenant' },
    perfectFor: { en: 'Perfect for', es: 'Perfecto para', pt: 'Perfeito para', fr: 'Parfait pour' },
    andMore: { en: 'and more!', es: '¡y más!', pt: 'e muito mais!', fr: 'et plus!' }
  };

  const t = (key: string, fallback?: string) => {
    return translations[key as keyof typeof translations]?.[lang as keyof typeof translations[keyof typeof translations]] || fallback || key;
  };
  const intro = `${content.summary || ''} ${content.description || ''}`.trim();

  // Add long-tail keyword variations naturally
  let enhancedIntro = intro;
  if (longTailKeywords.length > 0) {
    // Add 2-3 long-tail keywords naturally into the introduction
    const keywordPhrases = longTailKeywords.slice(0, 3).join(', ');
    enhancedIntro += ` Whether you're looking for ${keywordPhrases}, this tool provides comprehensive calculations with detailed explanations.`;
  }

  sections.push(`<h2>${t('howToUse')} ${content.title || 'Calculator'}</h2>`);
  sections.push(`<div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
    <p class="text-gray-800 leading-relaxed">${enhancedIntro}</p>
  </div>`);

  // 2. Purpose and Benefits (80-100 words) - Include keywords
  sections.push(`<h2>${t('purposeAndBenefits')}</h2>`);
  sections.push(`<div class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg mb-6">
    <ul class="space-y-2 text-gray-800">
      <li class="flex items-start">
        <span class="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
        <span><strong>${t('accurateCalculations')}:</strong> Get precise ${content.tags?.[0] || 'calculation'} results using proven mathematical formulas</span>
      </li>
      <li class="flex items-start">
        <span class="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
        <span><strong>${t('timeSaving')}:</strong> No need for manual ${keywords.length > 0 ? keywords[0] : 'calculations'} or complex spreadsheets</span>
      </li>
      <li class="flex items-start">
        <span class="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
        <span><strong>${t('educationalValue')}:</strong> Learn about ${content.tags?.[0] || 'calculation'} concepts while getting results</span>
      </li>
      <li class="flex items-start">
        <span class="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
        <span><strong>${t('seoOptimized')}:</strong> Find exactly what you need with our ${longTailKeywords.length > 0 ? longTailKeywords[0] : 'specialized calculator'}</span>
      </li>
      <li class="flex items-start">
        <span class="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
        <span><strong>${t('decisionSupport')}:</strong> Make informed choices with detailed breakdowns and explanations</span>
      </li>
    </ul>
  </div>`);

  // 3. Step-by-Step Instructions (50-70 words)
  sections.push(`<h2>${t('stepByStepInstructions')}</h2>`);
  sections.push(`<div class="bg-gray-50 p-4 rounded-lg mb-6">
    <ol class="space-y-3 text-gray-800">
      ${content.instructions?.map((step: string, index: number) =>
        `<li class="flex items-start">
          <span class="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-sm font-bold rounded-full mr-3 mt-0.5 flex-shrink-0">${index + 1}</span>
          <span>${step}</span>
        </li>`
      ).join('') || '<li class="flex items-start"><span class="inline-flex items-center justify-center w-6 h-6 bg-blue-600 text-white text-sm font-bold rounded-full mr-3 mt-0.5 flex-shrink-0">1</span><span>Follow the simple steps to get your calculation results.</span></li>'}
    </ol>
  </div>`);

  // 4. Explain Inputs (50-80 words)
  const inputs = content.calculatorComponent?.inputs || [];
  sections.push(`<h2>${t('calculatorInputsExplained')}</h2>`);
  sections.push(`<div class="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
    <p class="text-gray-800 mb-3">${t('ourCalculatorConsiders')} <strong>${inputs.length} ${t('keyInputs')}</strong></p>
    <div class="grid md:grid-cols-2 gap-2">
      ${inputs.map((input: any) => `<div class="flex items-center p-2 bg-white rounded border">
        <span class="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
        <span class="text-sm font-medium text-gray-700">${input.label || input.name}</span>
      </div>`).join('')}
    </div>
    <p class="text-gray-700 text-sm mt-3 italic">${t('theseFactors')}</p>
  </div>`);

  // 4.5. Explain Formula (40-60 words) - Include keywords
  const formula = content.calculatorComponent?.formula || content.formula;
  if (formula) {
    // Add keyword-rich description
    const formulaKeywords = longTailKeywords.filter((k: string) => k.includes('how to') || k.includes('calculate')).slice(0, 2);
    const keywordText = formulaKeywords.length > 0 ? ` Whether you're wondering ${formulaKeywords.join(' or ')}, this formula provides the mathematical foundation.` : '';

    sections.push(`<h2>How the ${content.title?.replace(' Calculator', '').replace('Calculadora de ', '').replace('Calculateur de ', '') || 'Calculator'} ${t('formulaWorks')}</h2>`);
    sections.push(`<div class="bg-purple-50 border border-purple-200 p-4 rounded-lg mb-6">
      <div class="text-center mb-4">
        <div class="inline-block bg-white border-2 border-purple-300 px-4 py-2 rounded-lg">
          <code class="text-lg font-mono text-purple-800 font-bold">${formula}</code>
        </div>
      </div>
      <p class="text-gray-800 text-center">${t('mathematicalFormula')} ${content.tags?.[0] || 'calculation'} ${t('principles')}${keywordText}</p>
    </div>`);
  }

  // 5. Explain Outputs (50-70 words)
  const outputs = content.calculatorComponent?.additionalOutputs || [];
  sections.push(`<h2>${t('understandingYourResults')}</h2>`);
  sections.push(`<div class="bg-indigo-50 border border-indigo-200 p-4 rounded-lg mb-6">
    <div class="mb-3">
      <h4 class="font-semibold text-indigo-800 mb-2">${t('primaryResult')}</h4>
      <p class="text-gray-800">${t('yourMainResult')} <strong>${content.calculatorComponent?.output?.format || 'standard'}</strong> ${t('format')}</p>
    </div>
    ${outputs.length > 0 ? `<div>
      <h4 class="font-semibold text-indigo-800 mb-2">${t('additionalDetails')}</h4>
      <ul class="space-y-1 text-gray-800">
        ${outputs.map((output: any) => `<li class="flex items-center">
          <span class="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></span>
          <span><strong>${output.label}:</strong> ${t('providesDetailedInfo')}</span>
        </li>`).join('')}
      </ul>
    </div>` : ''}
  </div>`);

  // 6. Give Examples (60-80 words)
  const examples = content.examples || [];
  sections.push(`<h2>${t('exampleScenarios')}</h2>`);
  sections.push(`<div class="space-y-4 mb-6">
    ${examples.length > 0 ? examples.slice(0, 2).map((example: any, index: number) => `
    <div class="border border-gray-200 rounded-lg overflow-hidden">
      <div class="bg-gray-100 px-4 py-2 border-b border-gray-200">
        <h4 class="font-semibold text-gray-800">Example ${index + 1}: ${example.title || `Scenario ${index + 1}`}</h4>
      </div>
      <div class="p-4">
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <div class="text-sm text-gray-600 mb-1">Input:</div>
            <div class="bg-blue-50 p-2 rounded text-sm font-mono text-blue-800">${example.input || 'Sample input data'}</div>
          </div>
          <div>
            <div class="text-sm text-gray-600 mb-1">Result:</div>
            <div class="bg-green-50 p-2 rounded text-sm font-mono text-green-800 font-semibold">${example.output || 'Calculated result'}</div>
          </div>
        </div>
      </div>
    </div>`).join('') : '<div class="bg-gray-50 p-4 rounded-lg text-center text-gray-600">Different input values will produce different results based on the calculation parameters.</div>'}
  </div>`);

  // 6.5. Keywords and Search Terms (40-60 words) - Include all long-tail keywords
  if (longTailKeywords.length > 0 || keywords.length > 0) {
    const allKeywords = [...keywords, ...longTailKeywords];
    const keywordGroups = allKeywords.reduce((acc, keyword, index) => {
      const groupIndex = Math.floor(index / 3);
      if (!acc[groupIndex]) acc[groupIndex] = [];
      acc[groupIndex].push(keyword);
      return acc;
    }, [] as string[][]);

    sections.push(`<h2>${t('popularSearchTerms')}</h2>`);
    sections.push(`<div class="bg-teal-50 border border-teal-200 p-4 rounded-lg mb-6">
      <p class="text-gray-800 mb-3">${t('peopleFrequentlySearch')} ${content.title?.toLowerCase() || 'calculation tools'}:</p>
      <div class="space-y-2">
        ${keywordGroups.slice(0, 3).map((group: string[]) => `<div class="flex flex-wrap gap-2">
          ${group.map((keyword: string) => `<span class="inline-block bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">${keyword}</span>`).join('')}
        </div>`).join('')}
      </div>
      <p class="text-gray-700 text-sm mt-3">${t('ourCalculatorCovers')} ${content.tags?.[0] || 'calculation'} ${t('capabilities')}</p>
    </div>`);
  }

  // 7. Related Calculators Section (30-50 words)
  if (relatedCalculators.length > 0) {
    sections.push(`<h2>${t('relatedTools')}</h2>`);
    sections.push(`<div class="bg-orange-50 border border-orange-200 p-4 rounded-lg mb-6">
      <p class="text-gray-800 mb-3">${t('youMayAlsoFind')}</p>
      <div class="grid md:grid-cols-2 gap-2">
        ${relatedCalculators.slice(0, 4).map(calc => `<a href="/en/${calc.slug}" class="flex items-center p-2 bg-white rounded border border-orange-200 hover:bg-orange-100 transition-colors">
          <span class="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
          <span class="text-sm font-medium text-gray-700 hover:text-orange-800">${calc.name}</span>
        </a>`).join('')}
      </div>
    </div>`);
  }

  // 8. Wrap Up (20-40 words) - Include keywords
  const primaryKeyword = keywords.length > 0 ? keywords[0] : content.title?.toLowerCase() || 'calculator';
  sections.push(`<h2>${t('getStartedToday')}</h2>`);
  sections.push(`<div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
    <div class="text-center">
      <p class="text-gray-800 mb-3">${t('readyToUse')} ${content.title || 'Calculator'}? ${content.title || 'This calculator'} ${t('providesClarity')}</p>
      <div class="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer">
        ${t('tryNow')} ${content.title || 'Calculator'} ${t('now')}
      </div>
      <p class="text-blue-600 text-sm mt-2">${t('perfectFor')} ${longTailKeywords.slice(0, 2).join(', ')} ${t('andMore')}</p>
    </div>
  </div>`);

  return sections.join('\n\n');
}
