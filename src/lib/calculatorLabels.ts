/**
 * Calculator Labels and Summaries in Multiple Languages
 * Used for dynamic content like related calculator widgets
 * Loaded at build time, served as static content
 */

interface CalculatorLabel {
  name: string;
  summary: string;
}

interface CalculatorLabelsMap {
  en: CalculatorLabel;
  es: CalculatorLabel;
  pt: CalculatorLabel;
  fr: CalculatorLabel;
}

/**
 * Comprehensive multilingual labels for all calculators
 * Used in related calculators widgets and dynamic content
 */
export const calculatorLabels: Record<string, CalculatorLabelsMap> = {
  'mortgage-calculator': {
    en: { name: 'Mortgage Calculator', summary: 'Calculate home loan payments and amortization schedules' },
    es: { name: 'Calculadora de Hipotecas', summary: 'Calcular pagos de préstamos hipotecarios' },
    pt: { name: 'Calculadora de Hipotecas', summary: 'Calcular pagamentos de hipotecas' },
    fr: { name: 'Calculatrice de Prêt Hypothécaire', summary: 'Calculer les paiements hypothécaires' },
  },
  'bmi-calculator': {
    en: { name: 'BMI Calculator', summary: 'Calculate your body mass index and health category' },
    es: { name: 'Calculadora de IMC', summary: 'Calcular tu índice de masa corporal' },
    pt: { name: 'Calculadora de IMC', summary: 'Calcular seu índice de massa corporal' },
    fr: { name: 'Calculatrice IMC', summary: 'Calculer votre indice de masse corporelle' },
  },
  'investment-calculator': {
    en: { name: 'Investment Calculator', summary: 'Track investment growth and returns' },
    es: { name: 'Calculadora de Inversiones', summary: 'Seguimiento del crecimiento de inversiones' },
    pt: { name: 'Calculadora de Investimentos', summary: 'Rastrear crescimento de investimentos' },
    fr: { name: 'Calculatrice D\'investissement', summary: 'Suivre la croissance des investissements' },
  },
  'retirement-calculator': {
    en: { name: 'Retirement Calculator', summary: 'Plan for retirement savings' },
    es: { name: 'Calculadora de Jubilación', summary: 'Planificar ahorros para la jubilación' },
    pt: { name: 'Calculadora de Aposentadoria', summary: 'Planejar poupanças de aposentadoria' },
    fr: { name: 'Calculatrice de Retraite', summary: 'Planifier l\'épargne-retraite' },
  },
  'loan-calculator': {
    en: { name: 'Loan Calculator', summary: 'Calculate personal, auto, and business loans' },
    es: { name: 'Calculadora de Préstamos', summary: 'Calcular préstamos personales y comerciales' },
    pt: { name: 'Calculadora de Empréstimos', summary: 'Calcular empréstimos pessoais e comerciais' },
    fr: { name: 'Calculatrice de Prêt', summary: 'Calculer les prêts personnels et commerciaux' },
  },
  'tax-calculator': {
    en: { name: 'Tax Calculator', summary: 'Estimate income taxes and deductions' },
    es: { name: 'Calculadora de Impuestos', summary: 'Estimar impuestos sobre la renta' },
    pt: { name: 'Calculadora de Impostos', summary: 'Estimar imposto de renda' },
    fr: { name: 'Calculatrice D\'impôt', summary: 'Estimer l\'impôt sur le revenu' },
  },
  'salary-calculator': {
    en: { name: 'Salary Calculator', summary: 'Calculate take-home pay' },
    es: { name: 'Calculadora de Salario', summary: 'Calcular salario neto' },
    pt: { name: 'Calculadora de Salário', summary: 'Calcular salário líquido' },
    fr: { name: 'Calculatrice de Salaire', summary: 'Calculer le salaire net' },
  },
  'compound-interest-calculator': {
    en: { name: 'Compound Interest Calculator', summary: 'Calculate compound interest growth' },
    es: { name: 'Calculadora de Interés Compuesto', summary: 'Calcular crecimiento por interés compuesto' },
    pt: { name: 'Calculadora de Juros Compostos', summary: 'Calcular crescimento de juros compostos' },
    fr: { name: 'Calculatrice D\'intérêt Composé', summary: 'Calculer la croissance des intérêts composés' },
  },
  'percentage-calculator': {
    en: { name: 'Percentage Calculator', summary: 'Calculate percentages and percentage change' },
    es: { name: 'Calculadora de Porcentajes', summary: 'Calcular porcentajes y cambios porcentuales' },
    pt: { name: 'Calculadora de Percentuais', summary: 'Calcular percentuais e mudanças percentuais' },
    fr: { name: 'Calculatrice de Pourcentage', summary: 'Calculer les pourcentages et les changements' },
  },
  'discount-calculator': {
    en: { name: 'Discount Calculator', summary: 'Calculate discounts and final prices' },
    es: { name: 'Calculadora de Descuentos', summary: 'Calcular descuentos y precios finales' },
    pt: { name: 'Calculadora de Descontos', summary: 'Calcular descontos e preços finais' },
    fr: { name: 'Calculatrice de Remise', summary: 'Calculer les remises et les prix finaux' },
  },
  'calorie-calculator': {
    en: { name: 'Calorie Calculator', summary: 'Track daily calorie intake' },
    es: { name: 'Calculadora de Calorías', summary: 'Rastrear la ingesta diaria de calorías' },
    pt: { name: 'Calculadora de Calorias', summary: 'Rastrear a ingestão diária de calorias' },
    fr: { name: 'Calculatrice de Calories', summary: 'Suivre l\'apport calorique quotidien' },
  },
  'tdee-calculator': {
    en: { name: 'TDEE Calculator', summary: 'Calculate daily calorie needs' },
    es: { name: 'Calculadora de TDEE', summary: 'Calcular necesidades calóricas diarias' },
    pt: { name: 'Calculadora de TDEE', summary: 'Calcular necessidades calóricas diárias' },
    fr: { name: 'Calculatrice TDEE', summary: 'Calculer les besoins caloriques quotidiens' },
  },
  'debt-payoff-calculator': {
    en: { name: 'Debt Payoff Calculator', summary: 'Plan your debt repayment' },
    es: { name: 'Calculadora de Liquidación de Deudas', summary: 'Planificar el reembolso de deudas' },
    pt: { name: 'Calculadora de Quitação de Dívidas', summary: 'Planejar reembolso de dívidas' },
    fr: { name: 'Calculatrice de Remboursement de Dette', summary: 'Planifier le remboursement de la dette' },
  },
  'simple-interest-calculator': {
    en: { name: 'Simple Interest Calculator', summary: 'Calculate simple interest' },
    es: { name: 'Calculadora de Interés Simple', summary: 'Calcular interés simple' },
    pt: { name: 'Calculadora de Juros Simples', summary: 'Calcular juros simples' },
    fr: { name: 'Calculatrice D\'intérêt Simple', summary: 'Calculer l\'intérêt simple' },
  },
  'ideal-weight-calculator': {
    en: { name: 'Ideal Weight Calculator', summary: 'Find your ideal weight' },
    es: { name: 'Calculadora de Peso Ideal', summary: 'Encontrar tu peso ideal' },
    pt: { name: 'Calculadora de Peso Ideal', summary: 'Encontrar seu peso ideal' },
    fr: { name: 'Calculatrice du Poids Idéal', summary: 'Trouver votre poids idéal' },
  },
  'body-fat-calculator': {
    en: { name: 'Body Fat Calculator', summary: 'Calculate body fat percentage' },
    es: { name: 'Calculadora de Grasa Corporal', summary: 'Calcular porcentaje de grasa corporal' },
    pt: { name: 'Calculadora de Gordura Corporal', summary: 'Calcular percentual de gordura corporal' },
    fr: { name: 'Calculatrice de Masse Grasse', summary: 'Calculer le pourcentage de graisse corporelle' },
  },
  'protein-intake-calculator': {
    en: { name: 'Protein Intake Calculator', summary: 'Calculate daily protein needs' },
    es: { name: 'Calculadora de Ingesta de Proteínas', summary: 'Calcular necesidades diarias de proteínas' },
    pt: { name: 'Calculadora de Ingestão de Proteínas', summary: 'Calcular necessidades diárias de proteínas' },
    fr: { name: 'Calculatrice D\'apport en Protéines', summary: 'Calculer les besoins en protéines quotidiens' },
  },
  'pregnancy-calculator': {
    en: { name: 'Pregnancy Calculator', summary: 'Calculate your due date' },
    es: { name: 'Calculadora de Embarazo', summary: 'Calcular tu fecha de vencimiento' },
    pt: { name: 'Calculadora de Gravidez', summary: 'Calcular sua data de vencimento' },
    fr: { name: 'Calculatrice de Grossesse', summary: 'Calculer votre date d\'accouchement' },
  },
  'grade-calculator': {
    en: { name: 'Grade Calculator', summary: 'Calculate your grades and GPA' },
    es: { name: 'Calculadora de Calificaciones', summary: 'Calcular tus calificaciones y GPA' },
    pt: { name: 'Calculadora de Notas', summary: 'Calcular suas notas e GPA' },
    fr: { name: 'Calculatrice de Notes', summary: 'Calculer vos notes et votre GPA' },
  },
  'date-calculator': {
    en: { name: 'Date Calculator', summary: 'Calculate days between dates' },
    es: { name: 'Calculadora de Fechas', summary: 'Calcular días entre fechas' },
    pt: { name: 'Calculadora de Datas', summary: 'Calcular dias entre datas' },
    fr: { name: 'Calculatrice de Dates', summary: 'Calculer les jours entre les dates' },
  },
  'unit-converter': {
    en: { name: 'Unit Converter', summary: 'Convert between different units' },
    es: { name: 'Conversor de Unidades', summary: 'Convertir entre diferentes unidades' },
    pt: { name: 'Conversor de Unidades', summary: 'Converter entre diferentes unidades' },
    fr: { name: 'Convertisseur D\'unités', summary: 'Convertir entre différentes unités' },
  },
  'concrete-calculator': {
    en: { name: 'Concrete Calculator', summary: 'Calculate concrete needed' },
    es: { name: 'Calculadora de Hormigón', summary: 'Calcular hormigón necesario' },
    pt: { name: 'Calculadora de Concreto', summary: 'Calcular concreto necessário' },
    fr: { name: 'Calculatrice de Béton', summary: 'Calculer le béton nécessaire' },
  },
};

/**
 * Get translated label for a calculator
 * @param slug - Calculator slug
 * @param language - Language code (en, es, pt, fr)
 * @returns Label object with name and summary in the specified language
 */
export function getCalculatorLabel(slug: string, language: string = 'en'): CalculatorLabel {
  const labels = calculatorLabels[slug];
  
  if (!labels) {
    return {
      name: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      summary: 'Use this calculator to get instant results'
    };
  }

  return labels[language as keyof CalculatorLabelsMap] || labels.en;
}

/**
 * Get labels for multiple calculators at once
 * @param slugs - Array of calculator slugs
 * @param language - Language code
 * @returns Array of label objects
 */
export function getCalculatorLabels(slugs: string[], language: string = 'en'): CalculatorLabel[] {
  return slugs.map(slug => getCalculatorLabel(slug, language));
}
