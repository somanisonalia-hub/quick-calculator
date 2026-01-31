import fs from 'fs';
import path from 'path';

// Slug translation mappings
const slugTranslations = {
  // Format: 'en-slug': { es: 'spanish-slug', pt: 'portuguese-slug', fr: 'french-slug' }
  'bmi-calculator': { es: 'calculadora-imc', pt: 'calculadora-imc', fr: 'calculatrice-imc' },
  'mortgage-calculator': { es: 'calculadora-hipotecaria', pt: 'calculadora-hipotecaria', fr: 'calculatrice-hypothecaire' },
  'loan-calculator': { es: 'calculadora-prestamos', pt: 'calculadora-emprestimos', fr: 'calculatrice-prets' },
  'retirement-calculator': { es: 'calculadora-jubilacion', pt: 'calculadora-aposentadoria', fr: 'calculatrice-retraite' },
  'retirement-savings': { es: 'ahorros-jubilacion', pt: 'poupanca-aposentadoria', fr: 'epargne-retraite' },
  'retirement-plan': { es: 'plan-jubilacion', pt: 'plano-aposentadoria', fr: 'plan-retraite' },
  'salary-calculator': { es: 'calculadora-salario', pt: 'calculadora-salario', fr: 'calculatrice-salaire' },
  'age-calculator': { es: 'calculadora-edad', pt: 'calculadora-idade', fr: 'calculatrice-age' },
  'credit-card-calculator': { es: 'calculadora-tarjeta-credito', pt: 'calculadora-cartao-credito', fr: 'calculatrice-carte-credit' },
  'calorie-calculator': { es: 'calculadora-calorias', pt: 'calculadora-calorias', fr: 'calculatrice-calories' },
  'numbers-to-words-converter': { es: 'convertidor-numeros-palabras', pt: 'conversor-numeros-palavras', fr: 'convertisseur-nombres-mots' },
  'body-fat-calculator': { es: 'calculadora-porcentaje-grasa', pt: 'calculadora-percentual-gordura', fr: 'calculatrice-pourcentage-graisse' },
  'date-calculator': { es: 'calculadora-fecha', pt: 'calculadora-data', fr: 'calculatrice-date' },
  'income-tax-calculator': { es: 'calculadora-impuesto-renta', pt: 'calculadora-imposto-renda', fr: 'calculatrice-impot-revenu' },
  'compound-interest-calculator': { es: 'calculadora-interes-compuesto', pt: 'calculadora-juros-compostos', fr: 'calculatrice-interet-compose' },
  'simple-interest-calculator': { es: 'calculadora-interes-simple', pt: 'calculadora-juros-simples', fr: 'calculatrice-interet-simple' },
  'investment-calculator': { es: 'calculadora-inversion', pt: 'calculadora-investimento', fr: 'calculatrice-investissement' },
  'tip-calculator': { es: 'calculadora-propina', pt: 'calculadora-gorjeta', fr: 'calculatrice-pourboire' },
  'percentage-calculator': { es: 'calculadora-porcentaje', pt: 'calculadora-percentual', fr: 'calculatrice-pourcentage' },
  'fraction-calculator': { es: 'calculadora-fracciones', pt: 'calculadora-fracoes', fr: 'calculatrice-fractions' },
  'gpa-calculator': { es: 'calculadora-promedio', pt: 'calculadora-media', fr: 'calculatrice-moyenne' },
  'tdee-calculator': { es: 'calculadora-tdee', pt: 'calculadora-tdee', fr: 'calculatrice-tdee' },
  'bmr-calculator': { es: 'calculadora-tmb', pt: 'calculadora-tmb', fr: 'calculatrice-tmb' },
  'currency-converter': { es: 'conversor-moneda', pt: 'conversor-moeda', fr: 'convertisseur-devise' },
  'unit-converter': { es: 'conversor-unidades', pt: 'conversor-unidades', fr: 'convertisseur-unites' },
  'word-counter': { es: 'contador-palabras', pt: 'contador-palavras', fr: 'compteur-mots' },
  'scientific-calculator': { es: 'calculadora-cientifica', pt: 'calculadora-cientifica', fr: 'calculatrice-scientifique' },
  'square-footage-calculator': { es: 'calculadora-area', pt: 'calculadora-area', fr: 'calculatrice-superficie' },
  'sales-tax-calculator': { es: 'calculadora-impuesto-ventas', pt: 'calculadora-imposto-vendas', fr: 'calculatrice-taxe-vente' },
};

// Slugs without translations (keep English)
const noTranslationSlugs = [
  '401k-calculator', 'advanced-loan-calculator', 'amortization-schedule-calculator', 'apr-calculator',
  'average-calculator', 'basic-apr-calculator', 'biweekly-pay-calculator', 'blood-pressure-calculator',
  'bmr-calculator', 'budget-calculator', 'car-affordability-calculator', 'car-insurance-calculator',
  'car-loan-calculator', 'circle-area-calculator', 'circle-circumference-calculator', 'concrete-calculator',
  'credit-card-payoff', 'crypto-roi-calculator', 'debt-consolidation-calculator', 'debt-payoff-calculator',
  'debt-ratios-calculator', 'debt-to-income-calculator', 'ear-calculator', 'effective-interest-rate-calculator',
  'emergency-fund', 'emi-calculator', 'equal-principal-amortization-calculator', 'equivalent-interest-rate-calculator',
  'exam-score-predictor', 'expense-calculator', 'feet-inches-calculator', 'fraction-decimal',
  'fuel-cost', 'future-value-calculator', 'geometry-area', 'grade-calculator', 'health-insurance-calculator',
  'home-affordability-calculator', 'hourly-to-salary-calculator', 'ideal-weight-calculator', 'inflation-calculator',
  'interest-calculator', 'interest-only-mortgage-calculator', 'interest-rate-table-calculator', 'investment-planner',
  'investment-return', 'lean-body-mass-calculator', 'life-insurance-calculator', 'linear-equation',
  'liquidity-ratios-calculator', 'loan-affordability', 'loan-affordability-calculator', 'loan-comparison',
  'loan-payment-table-generator', 'loan-repayment', 'macro-calculator', 'maintenance-calories-calculator',
  'mean-median-mode-calculator', 'net-income-calculator', 'net-worth', 'nominal-interest-rate-calculator',
  'operations-ratios-calculator', 'overtime-pay-calculator', 'ovulation-calculator', 'password-generator',
  'paycheck-calculator', 'percent-calculator', 'percentage-change-calculator', 'percentile-calculator',
  'periodic-interest-rate-calculator', 'personal-budget', 'pregnancy-calculator', 'probability-calculator',
  'profitability-ratios-calculator', 'property-tax-calculator', 'protein-intake-calculator', 'pythagorean-theorem-calculator',
  'quadratic-equation-calculator', 'ratio-calculator', 'ratio-proportion', 'roth-ira-calculator',
  'salary-payroll', 'salary-tax', 'savings-calculator', 'savings-goal', 'savings-interest', 'shipping-cost',
  'sleep-calculator', 'social-security-calculator', 'standard-deviation-calculator', 'stock-ratios-calculator',
  'stock-return-calculator', 'study-hours-planner', 'surface-area-calculator', 'take-home-pay-calculator',
  'tank-volume-calculator', 'tax-calculator', 'triangle-area-calculator', 'trip-planner', 'unit-conversion-calculator',
  'volume-calculator', 'waist-to-hip-ratio-calculator', 'water-intake-calculator',
];

function updateCalculatorSlugs() {
  const contentDir = path.join(process.cwd(), 'content', 'calculators');
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'));
  let updated = 0;

  for (const file of files) {
    try {
      const filePath = path.join(contentDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(content);
      
      // Get English slug
      const enSlug = data.en?.slug || file.replace('.json', '');
      
      // Check if this calculator has translations
      const translations = slugTranslations[enSlug];
      
      if (translations) {
        // Update Spanish slug
        if (data.es) data.es.slug = translations.es;
        // Update Portuguese slug
        if (data.pt) data.pt.slug = translations.pt;
        // Update French slug
        if (data.fr) data.fr.slug = translations.fr;
        
        // Write back
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        updated++;
        console.log(`✅ Updated ${file}`);
      }
    } catch (error) {
      console.log(`❌ Error with ${file}: ${error.message}`);
    }
  }

  console.log(`\n📊 Total updated: ${updated}/${files.length}`);
}

updateCalculatorSlugs();
