import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation data - single source of truth
const translations = {
  en: {
    nav: { home: "Home", calculators: "Calculators", about: "About", contact: "Contact" },
    categories: { math: "Math Calculators", financial: "Financial Calculators", health: "Health & Fitness Calculators", conversion: "Unit Converters", other: "Other Tools" },
    homepage: { title: "Free Online Calculators", subtitle: "Calculate anything online with our fast, accurate tools", contact: "Contact" },
    calculator: {
      sectionTitle: "Calculator", howToUse: "How to Use", examples: "Examples", input: "Input", output: "Output",
      relatedCalculators: "Related Calculators", calculatorDetails: "Calculator Details", category: "Category",
      difficulty: "Difficulty", tags: "Tags", wordCount: "Word Count", tryIt: "Try it →",
      loading: "Loading calculator...", notFound: "Calculator not found", backToHomepage: "← Back to homepage",
      notImplemented: "Calculator component not yet implemented.", component: "Component",
      loanDetails: "Loan Details", paymentSummary: "Payment Summary", monthlyPayment: "Monthly Payment",
      principalInterest: "Principal & Interest", taxesInsurance: "Taxes & Insurance", paymentBreakdown: "Payment Breakdown",
      totalInterest: "Total Interest Paid", totalAmount: "Total Amount Paid",
      enterLoanAmount: "Enter loan amount", enterInterestRate: "Enter interest rate", enterLoanTerm: "Enter loan term",
      emiCalculator: "EMI Calculator", emiDescription: "Calculate Equated Monthly Installments for loans",
      loanAmount: "Loan Amount ($)", annualInterestRate: "Annual Interest Rate (%)", loanTermYears: "Loan Term (Years)",
      emiBreakdown: "EMI Breakdown", monthlyEMI: "Monthly EMI", principalAmount: "Principal Amount",
      totalAmountPaid: "Total Amount Paid",
      investmentSummary: "Investment Summary", initialInvestment: "Initial Investment", sharesOwned: "Shares Owned",
      priceChange: "Price Change", currentValue: "Current Value", conversionResult: "Conversion Result",
      supportedFormats: "Supported Formats", numbers: "Numbers", currency: "Currency", ordinals: "Ordinals",
      note: "Note", stockInvestmentsRisk: "Stock investments involve risk. Past performance doesn't guarantee future results.",
      loanCalculator: "Loan Calculator", loanCalculatorDescription: "Calculate loan payments, interest, and payoff details",
      loanBreakdown: "Loan Breakdown", principal: "Principal",
      interestRate: "Interest Rate", term: "Term", downPayment: "Down Payment", apr: "APR",
      bmiCalculator: "BMI Calculator", bmiDescription: "Calculate your Body Mass Index and health category",
      yourMeasurements: "Your Measurements", bmiResults: "BMI Results", bmiCategories: "BMI Categories",
      underweight: "Underweight", normal: "Normal", overweight: "Overweight", obese: "Obese",
      creditCardCalculator: "Credit Card Calculator", creditCardDescription: "Calculate credit card payoff time and total interest",
      creditCardDetails: "Credit Card Details", minimumPayment: "Minimum Payment", payoffAnalysis: "Payoff Analysis",
      paymentTooLow: "Payment too low. Minimum", ofBalance: "of balance",
      savingsCalculator: "Savings Calculator", savingsDescription: "Calculate savings growth with compound interest",
      savingsPlan: "Savings Plan", savingsSummary: "Savings Summary", growthBreakdown: "Growth Breakdown",
      totalContributions: "Total Contributions", interestEarned: "Interest Earned", finalAmount: "Final Amount",
      taxCalculator: "Tax Calculator", taxDescription: "Calculate federal, state, and FICA taxes",
      taxInformation: "Tax Information", taxCalculation: "Tax Calculation", taxBreakdown: "Tax Breakdown",
      federalTax: "Federal Tax", stateTax: "State Tax", ficaTax: "FICA Tax", takeHomePay: "Take-Home Pay",
      simplifiedTaxNote: "This is a simplified calculation. Consult a tax professional for accurate tax planning.",
      retirementCalculator: "Retirement Calculator", retirementDescription: "Plan your retirement savings and calculate future needs",
      retirementPlanning: "Retirement Planning", retirementProjection: "Retirement Projection", inYears: "in {years} years",
      savingsBreakdown: "Savings Breakdown", currentSavings: "Current Savings", futureContributions: "Future Contributions",
      investmentGrowth: "Investment Growth", monthlyIncome: "Monthly Income",
      investmentCalculator: "Investment Calculator", investmentDescription: "Calculate investment growth with compound interest",
      investmentDetails: "Investment Details", performanceSummary: "Performance Summary",
      monthlyDeposits: "Monthly Deposits", investmentPeriod: "Investment Period", expectedReturn: "Expected Return",
      budgetCalculator: "Budget Calculator", budgetDescription: "Track monthly expenses and create a balanced budget",
      monthlyBudget: "Monthly Budget", budgetAnalysis: "Budget Analysis", expenseBreakdown: "Expense Breakdown",
      totalExpenses: "Total Expenses", budgetSurplus: "Budget Surplus", balancedBudget: "Balanced Budget",
      budgetDeficit: "Budget Deficit", budgetStatus: "Budget Status",
      currencyCalculator: "Currency Calculator", currencyDescription: "Convert between different currencies with live exchange rates",
      currencyConversion: "Currency Conversion", exchangeRateDetails: "Exchange Rate Details", currentRate: "Current Rate",
      inverseRate: "Inverse Rate", gpaCalculator: "GPA Calculator", gpaDescription: "Calculate your Grade Point Average (GPA)",
      courseGrades: "Course Grades", propertyTaxCalculator: "Property Tax Calculator", propertyTaxDescription: "Calculate property taxes based on assessed value",
      propertyDetails: "Property Details", propertyTaxBreakdown: "Property Tax Breakdown", assessmentRate: "Assessment Rate",
      taxExemptions: "Tax Exemptions", propertyTaxNote: "Property tax rates vary by location. This is an estimate - consult local authorities for exact rates.",
      futureValueCalculator: "Future Value Calculator", futureValueDescription: "Calculate the future value of investments with compound interest",
      futureValueProjection: "Future Value Projection", investmentBreakdown: "Investment Breakdown",
      totalFutureValue: "Total Future Value", wordCounter: "Word Counter", wordCounterDescription: "Count words, characters, sentences, and reading time",
      numbersToWordsConverter: "Numbers to Words Converter", numbersToWordsDescription: "Convert numbers to words in multiple formats and languages",
      numberInput: "Number Input", language: "Language", switchForSpanish: "Switch for Spanish",
      advancedLoanCalculator: "Advanced Loan Calculator", advancedLoanDescription: "Calculate loan payments with extra payments and property taxes",
      stockReturnCalculator: "Stock Return Calculator", stockReturnDescription: "Calculate stock investment returns and performance",
      stockInvestment: "Stock Investment", performanceAnalysis: "Performance Analysis",
      personalInformation: "Personal Information", insuranceQuote: "Insurance Quote",
      monthlyIncomeExpenses: "Monthly Income & Expenses", monthlyExpenses: "Monthly Expenses",
      personalDetails: "Personal Details", coverageOptions: "Coverage Options",
      coverageDetails: "Coverage Details", insuranceEstimate: "Insurance Estimate",
      insuranceDetails: "Insurance Details", lowRisk: "Low Risk", mediumRisk: "Medium Risk",
      highRisk: "High Risk", veryHighRisk: "Very High Risk",
      cryptoROICalculator: "Crypto ROI Calculator", cryptoROIDescription: "Calculate cryptocurrency investment returns and ROI",
      cryptoInvestment: "Crypto Investment", roiAnalysis: "ROI Analysis",
      debtConsolidationCalculator: "Debt Consolidation Calculator", debtConsolidationDescription: "Compare debt consolidation options and calculate savings",
      debtConsolidation: "Debt Consolidation", beforeVsAfter: "Before vs After",
      interestOnlyMortgageCalculator: "Interest-Only Mortgage Calculator", interestOnlyMortgageDescription: "Calculate interest-only mortgage payments and options",
      interestOnlyMortgage: "Interest-Only Mortgage", mortgageTerms: "Mortgage Terms", paymentSchedule: "Payment Schedule",
      forFirstMonths: "For first {months} months",
      concreteCalculator: "Concrete Calculator", concreteDescription: "Calculate concrete volume for construction projects",
      concreteVolume: "Concrete Volume",
      emiCalculation: "EMI Calculation", emiFormula: "EMI Formula: P × r × (1+r)^n / ((1+r)^n - 1)",
      enterLoanDetailsEMI: "Enter loan details to calculate EMI",
      carLoanCalculator: "Car Loan Calculator", carLoanDescription: "Calculate your monthly car loan payments and total cost",
      vehiclePrice: "Vehicle Price ($)", enterVehiclePrice: "Enter vehicle price",
      enterDownPayment: "Enter down payment",
      compoundInterestCalculator: "Compound Interest Calculator", compoundInterestDescription: "Calculate the power of compound interest on your investments",
      timePeriodYears: "Time Period (Years)", enterTimeInYears: "Enter time in years",
      compoundFrequency: "Compound Frequency", annually: "Annually", semiAnnually: "Semi-Annually", quarterly: "Quarterly",
      monthly: "Monthly", daily: "Daily",
      principalInvested: "Principal Invested", totalInterestEarned: "Total Interest Earned", powerOfCompounding: "Power of Compounding",
      compoundingMessage: "Your investment grows exponentially over time!", enterInvestmentDetails: "Enter investment details to see compound interest growth",
      completeGuide: "Complete Guide", howDoesWork: "How Does", guideComingSoon: "Detailed guide and formula explanation will be available soon.",
      comingSoon: "This calculator is currently under development and will be available soon."
    },
    brand: { name: "Quick Calculator" },
    footer: { description: "Free online calculators for math, finance, health, and more. All calculations are performed in your browser.", copyright: "© 2024 Quick Calculator. All rights reserved.", privacy: "Privacy Policy", terms: "Terms of Service" },
    seo: { title: "Free Online Calculators - Math, Finance, Health & More", description: "Use our free online calculators for math, finance, health, conversions and more. All calculations performed instantly in your browser with detailed explanations.", keywords: "calculator, online calculator, math calculator, financial calculator, health calculator" },
    schema: {
      siteName: "Quick Calculator",
      siteDescription: "Free online calculators for finance, health, math, and everyday calculations",
      homeBreadcrumb: "Home",
      calculatorDescription: "Use our {{calculatorName}} for accurate calculations",
      calculatorDescriptionAlt: "Calculate {{calculatorName}} online"
    }
  },
  es: {
    nav: { home: "Inicio", calculators: "Calculadoras", about: "Acerca de", contact: "Contacto" },
    categories: { math: "Calculadoras Matemáticas", financial: "Calculadoras Financieras", health: "Calculadoras de Salud y Fitness", conversion: "Convertidores de Unidades", other: "Otras Herramientas" },
    homepage: { title: "Calculadoras en Línea Gratis", subtitle: "Calcule cualquier cosa en línea con nuestras herramientas rápidas y precisas", contact: "Contacto" },
    calculator: {
      sectionTitle: "Calculadora", howToUse: "Cómo Usar", examples: "Ejemplos", input: "Entrada", output: "Salida",
      relatedCalculators: "Calculadoras Relacionadas", calculatorDetails: "Detalles de la Calculadora", category: "Categoría",
      difficulty: "Dificultad", tags: "Etiquetas", wordCount: "Conteo de Palabras", tryIt: "Pruébelo →",
      loading: "Cargando calculadora...", notFound: "Calculadora no encontrada", backToHomepage: "← Volver al inicio",
      notImplemented: "Componente de calculadora aún no implementado.", component: "Componente",
      futureValueProjection: "Proyección de Valor Futuro", investmentDetails: "Detalles de Inversión", paymentBreakdown: "Desglose de Pago",
      principalInterest: "Principal e Interés", taxesInsurance: "Impuestos y Seguro",
      completeGuide: "Guía Completa", howDoesWork: "¿Cómo Funciona", guideComingSoon: "La guía detallada y explicación de fórmula estarán disponibles pronto.",
      comingSoon: "Esta calculadora está actualmente en desarrollo y estará disponible pronto."
    },
    brand: { name: "Calculadora Rápida" },
    footer: { description: "Calculadoras en línea gratuitas para matemáticas, finanzas, salud y más. Todos los cálculos se realizan en su navegador.", copyright: "© 2024 Calculadora Rápida. Todos los derechos reservados.", privacy: "Política de Privacidad", terms: "Términos de Servicio" },
    seo: { title: "Calculadoras en Línea Gratuitas - Matemáticas, Finanzas, Salud y Más", description: "Utilice nuestras calculadoras en línea gratuitas para matemáticas, finanzas, salud, conversiones y más. Todos los cálculos se realizan al instante en su navegador con explicaciones detalladas.", keywords: "calculadora, calculadora en línea, calculadora matemática, calculadora financiera, calculadora de salud" },
    schema: {
      siteName: "Calculadora Rápida",
      siteDescription: "Calculadoras en línea gratuitas para finanzas, salud, matemáticas y cálculos cotidianos",
      homeBreadcrumb: "Inicio",
      calculatorDescription: "Utilice nuestra {{calculatorName}} para cálculos precisos",
      calculatorDescriptionAlt: "Calcule {{calculatorName}} en línea"
    }
  },
  pt: {
    nav: { home: "Início", calculators: "Calculadoras", about: "Sobre", contact: "Contato" },
    categories: { math: "Calculadoras Matemáticas", financial: "Calculadoras Financeiras", health: "Calculadoras de Saúde e Fitness", conversion: "Conversores de Unidades", other: "Outras Ferramentas" },
    homepage: { title: "Calculadoras Online Gratuitas", subtitle: "Calcule qualquer coisa online com nossas ferramentas rápidas e precisas", contact: "Contato" },
    calculator: {
      sectionTitle: "Calculadora", howToUse: "Como Usar", examples: "Exemplos", input: "Entrada", output: "Saída",
      relatedCalculators: "Calculadoras Relacionadas", calculatorDetails: "Detalhes da Calculadora", category: "Categoria",
      difficulty: "Dificuldade", tags: "Etiquetas", wordCount: "Contagem de Palavras", tryIt: "Experimente →",
      loading: "Carregando calculadora...", notFound: "Calculadora não encontrada", backToHomepage: "← Voltar ao início",
      notImplemented: "Componente da calculadora ainda não implementado.", component: "Componente",
      futureValueProjection: "Projeção de Valor Futuro", investmentDetails: "Detalhes do Investimento", paymentBreakdown: "Detalhamento do Pagamento",
      principalInterest: "Principal e Juros", taxesInsurance: "Impostos e Seguro",
      completeGuide: "Guia Completo", howDoesWork: "Como Funciona", guideComingSoon: "O guia detalhado e explicação da fórmula estarão disponíveis em breve.",
      comingSoon: "Esta calculadora está atualmente em desenvolvimento e estará disponível em breve."
    },
    brand: { name: "Calculadora Rápida" },
    footer: { description: "Calculadoras online gratuitas para matemática, finanças, saúde e mais. Todos os cálculos são realizados no seu navegador.", copyright: "© 2024 Calculadora Rápida. Todos os direitos reservados.", privacy: "Política de Privacidade", terms: "Termos de Serviço" },
    seo: { title: "Calculadoras Online Gratuitas - Matemática, Finanças, Saúde e Mais", description: "Use nossas calculadoras online gratuitas para matemática, finanças, saúde, conversões e mais. Todos os cálculos realizados instantaneamente no seu navegador com explicações detalhadas.", keywords: "calculadora, calculadora online, calculadora matemática, calculadora financeira, calculadora de saúde" },
    schema: {
      siteName: "Calculadora Rápida",
      siteDescription: "Calculadoras online gratuitas para finanças, saúde, matemática e cálculos do dia a dia",
      homeBreadcrumb: "Início",
      calculatorDescription: "Use nossa {{calculatorName}} para cálculos precisos",
      calculatorDescriptionAlt: "Calcule {{calculatorName}} online"
    }
  },
  fr: {
    nav: { home: "Accueil", calculators: "Calculateurs", about: "À propos", contact: "Contact" },
    categories: { math: "Calculateurs Mathématiques", financial: "Calculateurs Financiers", health: "Calculateurs Santé et Fitness", conversion: "Convertisseurs d'Unités", other: "Autres Outils" },
    homepage: { title: "Calculateurs en Ligne Gratuits", subtitle: "Calculez tout en ligne avec nos outils rapides et précis", contact: "Contact" },
    calculator: {
      sectionTitle: "Calculateur", howToUse: "Comment Utiliser", examples: "Exemples", input: "Entrée", output: "Sortie",
      relatedCalculators: "Calculateurs Connexes", calculatorDetails: "Détails du Calculateur", category: "Catégorie",
      difficulty: "Difficulté", tags: "Étiquettes", wordCount: "Nombre de Mots", tryIt: "Essayez →",
      loading: "Chargement du calculateur...", notFound: "Calculateur introuvable", backToHomepage: "← Retour à l'accueil",
      notImplemented: "Composant de calculateur pas encore implémenté.", component: "Composant",
      futureValueProjection: "Projection de Valeur Future", investmentDetails: "Détails d'Investissement", paymentBreakdown: "Répartition du Paiement",
      principalInterest: "Principal et Intérêts", taxesInsurance: "Impôts et Assurance",
      completeGuide: "Guide Complet", howDoesWork: "Comment Ça Marche", guideComingSoon: "Le guide détaillé et l'explication de formule seront disponibles bientôt.",
      comingSoon: "Cette calculatrice est actuellement en développement et sera disponible bientôt."
    },
    brand: { name: "Calculateur Rapide" },
    footer: { description: "Calculateurs en ligne gratuits pour les mathématiques, finances, santé et plus. Tous les calculs sont effectués dans votre navigateur.", copyright: "© 2024 Calculateur Rapide. Tous droits réservés.", privacy: "Politique de Confidentialité", terms: "Conditions d'Utilisation" },
    seo: { title: "Calculateurs en Ligne Gratuits - Mathématiques, Finances, Santé et Plus", description: "Utilisez nos calculateurs en ligne gratuits pour les mathématiques, finances, santé, conversions et plus. Tous les calculs effectués instantanément dans votre navigateur avec des explications détaillées.", keywords: "calculateur, calculateur en ligne, calculateur mathématique, calculateur financier, calculateur de santé" },
    schema: {
      siteName: "Calculateur Rapide",
      siteDescription: "Calculateurs en ligne gratuits pour les finances, santé, mathématiques et calculs quotidiens",
      homeBreadcrumb: "Accueil",
      calculatorDescription: "Utilisez notre {{calculatorName}} pour des calculs précis",
      calculatorDescriptionAlt: "Calculez {{calculatorName}} en ligne"
    }
  }
};

// Initialize i18n with synchronous resource loading
i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false,
    },

    defaultNS: 'common',
    ns: ['common'],

    resources: {
      en: { common: translations.en },
      es: { common: translations.es },
      pt: { common: translations.pt },
      fr: { common: translations.fr }
    },

    initImmediate: false,
  });

// Load initial translations synchronously
const loadInitialTranslations = () => {
  try {
    // Load common translations for all languages
    i18n.addResourceBundle('en', 'common', translations.en, true, true);
    i18n.addResourceBundle('es', 'common', translations.es, true, true);
    i18n.addResourceBundle('pt', 'common', translations.pt, true, true);
    i18n.addResourceBundle('fr', 'common', translations.fr, true, true);
  } catch (error) {
    console.error('Error loading initial translations:', error);
  }
};

// Load translations immediately
loadInitialTranslations();

// Export for use in other parts of the app
export default i18n;
