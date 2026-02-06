import Link from 'next/link';
import CalculatorLogo from '@/components/icons/CalculatorLogo';

interface FooterProps {
  currentLang?: string;
}

const translations = {
  en: {
    // Legal Links
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    contact: 'Contact',
    cookie: 'Cookie Policy',
    disclaimer: 'Disclaimer',
    about: 'About Us',
    copyright: '© 2026 Quick Calculator. All rights reserved.',

    // Footer Content
    footerDescription: 'Professional online calculators for financial, health, and everyday calculations.',
    madeWithLove: 'Made with ❤️ for accurate calculations worldwide',
    allRightsReserved: 'All rights reserved',

    // Sections
    popularCalculators: 'Popular Calculators',
    categories: 'Categories',
    legal: 'Legal',
    sitemap: 'Sitemap',

    // Category names
    financial: 'Financial',
    health: 'Health',
    math: 'Math',
    utility: 'Utility',
    lifestyle: 'Lifestyle',

    // Calculator names
    mortgageCalc: 'Mortgage Calculator',
    loanCalc: 'Loan Calculator',
    emiCalc: 'EMI Calculator',
    investmentCalc: 'Investment Calculator',
    bmiCalc: 'BMI Calculator',
    calorieCalc: 'Calorie Calculator',
    savingsCalc: 'Savings Calculator',
    percentageCalc: 'Percentage Calculator',
    fractionCalc: 'Fraction Calculator',
    unitConverterCalc: 'Unit Converter',
    ageCalc: 'Age Calculator',
    tipCalc: 'Tip Calculator',
    squareFootageCalc: 'Square Footage Calculator',
    concreteCalc: 'Concrete Calculator'
  },
  es: {
    // Legal Links
    privacy: 'Política de Privacidad',
    terms: 'Términos de Servicio',
    contact: 'Contacto',
    cookie: 'Política de Cookies',
    disclaimer: 'Descargo de Responsabilidad',
    about: 'Sobre Nosotros',
    copyright: '© 2026 Calculadora Rápida. Todos los derechos reservados.',

    // Footer Content
    footerDescription: 'Calculadoras online profesionales para finanzas, salud y cálculos cotidianos.',
    madeWithLove: 'Hecho con ❤️ para cálculos precisos en todo el mundo',
    allRightsReserved: 'Todos los derechos reservados',

    // Sections
    popularCalculators: 'Calculadoras Populares',
    categories: 'Categorías',
    legal: 'Legal',
    sitemap: 'Mapa del Sitio',

    // Category names
    financial: 'Financiero',
    health: 'Salud',
    math: 'Matemáticas',
    utility: 'Utilidad',
    lifestyle: 'Estilo de Vida',

    // Calculator names
    mortgageCalc: 'Calculadora de Hipoteca',
    loanCalc: 'Calculadora de Préstamos',
    emiCalc: 'Calculadora EMI',
    investmentCalc: 'Calculadora de Inversiones',
    bmiCalc: 'Calculadora IMC',
    calorieCalc: 'Calculadora de Calorías',
    savingsCalc: 'Calculadora de Ahorros',
    percentageCalc: 'Calculadora de Porcentajes',
    fractionCalc: 'Calculadora de Fracciones',
    unitConverterCalc: 'Conversor de Unidades',
    ageCalc: 'Calculadora de Edad',
    tipCalc: 'Calculadora de Propinas',
    squareFootageCalc: 'Calculadora de Metros Cuadrados',
    concreteCalc: 'Calculadora de Concreto'
  },
  pt: {
    // Legal Links
    privacy: 'Política de Privacidade',
    terms: 'Termos de Serviço',
    contact: 'Contato',
    cookie: 'Política de Cookies',
    disclaimer: 'Isenção de Responsabilidade',
    about: 'Sobre Nós',
    copyright: '© 2026 Calculadora Rápida. Todos os direitos reservados.',

    // Footer Content
    footerDescription: 'Calculadoras online profissionais para finanças, saúde e cálculos cotidianos.',
    madeWithLove: 'Feito com ❤️ para cálculos precisos em todo o mundo',
    allRightsReserved: 'Todos os direitos reservados',

    // Sections
    popularCalculators: 'Calculadoras Populares',
    categories: 'Categorias',
    legal: 'Legal',
    sitemap: 'Mapa do Site',

    // Category names
    financial: 'Financeiro',
    health: 'Saúde',
    math: 'Matemática',
    utility: 'Utilitário',
    lifestyle: 'Estilo de Vida',

    // Calculator names
    mortgageCalc: 'Calculadora de Hipoteca',
    loanCalc: 'Calculadora de Empréstimos',
    emiCalc: 'Calculadora EMI',
    investmentCalc: 'Calculadora de Investimentos',
    bmiCalc: 'Calculadora IMC',
    calorieCalc: 'Calculadora de Calorias',
    savingsCalc: 'Calculadora de Poupança',
    percentageCalc: 'Calculadora de Porcentagens',
    fractionCalc: 'Calculadora de Frações',
    unitConverterCalc: 'Conversor de Unidades',
    ageCalc: 'Calculadora de Idade',
    tipCalc: 'Calculadora de Gorjetas',
    squareFootageCalc: 'Calculadora de Metragem Quadrada',
    concreteCalc: 'Calculadora de Concreto'
  },
  fr: {
    // Legal Links
    privacy: 'Politique de Confidentialité',
    terms: 'Conditions d\'Utilisation',
    contact: 'Contact',
    cookie: 'Politique des Cookies',
    disclaimer: 'Avis de Non-Responsabilité',
    about: 'À Propos de Nous',
    copyright: '© 2026 Calculateur Rapide. Tous droits réservés.',

    // Footer Content
    footerDescription: 'Calculateurs en ligne professionnels pour les finances, la santé et les calculs quotidiens.',
    madeWithLove: 'Fait avec ❤️ pour des calculs précis dans le monde entier',
    allRightsReserved: 'Tous droits réservés',

    // Sections
    popularCalculators: 'Calculateurs Populaires',
    categories: 'Catégories',
    legal: 'Légal',
    sitemap: 'Plan du Site',

    // Category names
    financial: 'Financier',
    health: 'Santé',
    math: 'Mathématiques',
    utility: 'Utilitaire',
    lifestyle: 'Style de Vie',

    // Calculator names
    mortgageCalc: 'Calculateur d\'Hypothèque',
    loanCalc: 'Calculateur de Prêt',
    emiCalc: 'Calculateur EMI',
    investmentCalc: 'Calculateur d\'Investissement',
    bmiCalc: 'Calculateur IMC',
    calorieCalc: 'Calculateur de Calories',
    savingsCalc: 'Calculateur d\'Épargne',
    percentageCalc: 'Calculateur de Pourcentages',
    fractionCalc: 'Calculateur de Fractions',
    unitConverterCalc: 'Convertisseur d\'Unités',
    ageCalc: 'Calculateur d\'Âge',
    tipCalc: 'Calculateur de Pourboire',
    squareFootageCalc: 'Calculateur de Superficie',
    concreteCalc: 'Calculateur de Béton'
  },
  de: {
    // Legal Links
    privacy: 'Datenschutzrichtlinie',
    terms: 'Nutzungsbedingungen',
    contact: 'Kontakt',
    cookie: 'Cookie-Richtlinie',
    disclaimer: 'Haftungsausschluss',
    about: 'Über Uns',
    copyright: '© 2026 Schnellrechner. Alle Rechte vorbehalten.',

    // Footer Content
    footerDescription: 'Professionelle Online-Rechner für Finanzen, Gesundheit und alltägliche Berechnungen.',
    madeWithLove: 'Mit ❤️ für präzise Berechnungen weltweit gemacht',
    allRightsReserved: 'Alle Rechte vorbehalten',

    // Sections
    popularCalculators: 'Beliebte Rechner',
    categories: 'Kategorien',
    legal: 'Rechtliches',
    sitemap: 'Sitemap',

    // Category names
    financial: 'Finanziell',
    health: 'Gesundheit',
    math: 'Mathematik',
    utility: 'Nützlich',
    lifestyle: 'Lebensstil',

    // Calculator names
    mortgageCalc: 'Hypothekenrechner',
    loanCalc: 'Kreditrechner',
    emiCalc: 'EMI-Rechner',
    investmentCalc: 'Investitionsrechner',
    bmiCalc: 'BMI-Rechner',
    calorieCalc: 'Kalorienrechner',
    savingsCalc: 'Sparrechner',
    percentageCalc: 'Prozentrechner',
    fractionCalc: 'Bruchrechner',
    unitConverterCalc: 'Einheitenumrechner',
    ageCalc: 'Altersrechner',
    tipCalc: 'Trinkgeldrechner',
    squareFootageCalc: 'Quadratmeterrechner',
    concreteCalc: 'Betonrechner'
  },
  nl: {
    // Legal Links
    privacy: 'Privacybeleid',
    terms: 'Servicevoorwaarden',
    contact: 'Contact',
    cookie: 'Cookiebeleid',
    disclaimer: 'Disclaimer',
    about: 'Over Ons',
    copyright: '© 2026 Snelle Calculator. Alle rechten voorbehouden.',

    // Footer Content
    footerDescription: 'Professionele online calculators voor financiën, gezondheid en dagelijkse berekeningen.',
    madeWithLove: 'Met ❤️ gemaakt voor nauwkeurige berekeningen wereldwijd',
    allRightsReserved: 'Alle rechten voorbehouden',

    // Sections
    popularCalculators: 'Populaire Calculators',
    categories: 'Categorieën',
    legal: 'Juridisch',
    sitemap: 'Sitemap',

    // Category names
    financial: 'Financieel',
    health: 'Gezondheid',
    math: 'Wiskunde',
    utility: 'Hulpmiddel',
    lifestyle: 'Levensstijl',

    // Calculator names
    mortgageCalc: 'Hypotheekcalculator',
    loanCalc: 'Leningcalculator',
    emiCalc: 'EMI-calculator',
    investmentCalc: 'Investeringscalculator',
    bmiCalc: 'BMI-calculator',
    calorieCalc: 'Calorieëncalculator',
    savingsCalc: 'Spaarcalculator',
    percentageCalc: 'Percentagecalculator',
    fractionCalc: 'Breukcalculator',
    unitConverterCalc: 'Eenhedenconverter',
    ageCalc: 'Leeftijdscalculator',
    tipCalc: 'Fooiencalculator',
    squareFootageCalc: 'Vierkante Meter Calculator',
    concreteCalc: 'Betoncalculator'
  }
};

export default function Footer({ currentLang = 'en' }: FooterProps) {
  const t = translations[currentLang as keyof typeof translations] || translations.en;

  // Popular calculators data
  const popularCalculators = [
    { name: t.mortgageCalc, slug: 'mortgage-calculator' },
    { name: t.loanCalc, slug: 'loan-calculator' },
    { name: t.emiCalc, slug: 'emi-calculator' },
    { name: t.investmentCalc, slug: 'investment-calculator' },
    { name: t.bmiCalc, slug: 'bmi-calculator' },
    { name: t.calorieCalc, slug: 'calorie-calculator' },
    { name: t.savingsCalc, slug: 'savings-calculator' },
    { name: t.percentageCalc, slug: 'percentage-calculator' },
    { name: t.fractionCalc, slug: 'fraction-calculator' },
    { name: t.unitConverterCalc, slug: 'unit-converter' },
    { name: t.ageCalc, slug: 'age-calculator' },
    { name: t.tipCalc, slug: 'tip-calculator' },
    { name: t.squareFootageCalc, slug: 'square-footage-calculator' },
    { name: t.concreteCalc, slug: 'concrete-calculator' }
  ];

  // Category links
  const categories = [
    { name: t.financial, slug: 'financial' },
    { name: t.health, slug: 'health' },
    { name: t.math, slug: 'math' },
    { name: t.utility, slug: 'utility' },
    { name: t.lifestyle, slug: 'lifestyle' }
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">

          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <CalculatorLogo className="text-white" size="md" />
              </div>
              <span className="text-lg font-bold text-gray-900">Quick Calculator</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {t.footerDescription}
            </p>
            <p className="text-xs text-gray-500">
              {t.copyright}
            </p>
          </div>

          {/* Popular Calculators */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              {t.popularCalculators}
            </h3>
            <div className="flex flex-wrap gap-2 text-sm">
              {popularCalculators.slice(0, 8).map((calc, index) => (
                <span key={index} className="flex items-center">
                  <Link
                    href={`/${currentLang}/${calc.slug}`}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {calc.name}
                  </Link>
                  {index < 7 && <span className="ml-2 text-gray-400">|</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              {t.categories}
            </h3>
            <div className="flex flex-wrap gap-2 text-sm">
              {categories.map((category, index) => (
                <span key={index} className="flex items-center">
                  <Link
                    href={`/${currentLang}/categories/${category.slug}`}
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {category.name}
                  </Link>
                  {index < categories.length - 1 && <span className="ml-2 text-gray-400">|</span>}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <p>
              {t.madeWithLove}
            </p>
            <div className="flex items-center space-x-2">
              <span>🇺🇸</span>
              <span>•</span>
              <span>{t.allRightsReserved}</span>
            </div>
          </div>

          {/* Legal Links */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-500">
              <Link href={`/${currentLang}/privacy-policy`} className="hover:text-blue-600 transition-colors">
                {t.privacy}
              </Link>
              <span className="text-gray-400">|</span>
              <Link href={`/${currentLang}/terms-of-service`} className="hover:text-blue-600 transition-colors">
                {t.terms}
              </Link>
              <span className="text-gray-400">|</span>
              <Link href={`/${currentLang}/cookie-policy`} className="hover:text-blue-600 transition-colors">
                {t.cookie}
              </Link>
              <span className="text-gray-400">|</span>
              <Link href={`/${currentLang}/disclaimer`} className="hover:text-blue-600 transition-colors">
                {t.disclaimer}
              </Link>
              <span className="text-gray-400">|</span>
              <Link href={`/${currentLang}/about-us`} className="hover:text-blue-600 transition-colors">
                {t.about}
              </Link>
              <span className="text-gray-400">|</span>
              <Link href={`/${currentLang}/contact`} className="hover:text-blue-600 transition-colors">
                {t.contact}
              </Link>
              <span className="text-gray-400">|</span>
              <Link href={`/sitemap-${currentLang}.xml`} className="hover:text-blue-600 transition-colors" target="_blank" rel="noopener">
                {t.sitemap}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
