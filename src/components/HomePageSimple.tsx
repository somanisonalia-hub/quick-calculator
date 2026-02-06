'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CalculatorInfo, CALCULATOR_CATEGORIES, getAllCalculatorsForHomepage } from '@/lib/categoryUtils';
import { isPopularCalculator } from '@/lib/popularCalculators';
import CategoryNavigation from '@/components/CategoryNavigation';

interface HomePageSimpleProps {
  language?: string;
  initialCalculators?: CalculatorInfo[];
}

export default function HomePageSimple({ language = 'en', initialCalculators = [] }: HomePageSimpleProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [floatingSearchQuery, setFloatingSearchQuery] = useState('');
  const [floatingSearchResults, setFloatingSearchResults] = useState<CalculatorInfo[]>([]);

  // Group calculators by category
  const categorizedCalculators = initialCalculators.reduce((acc, calc) => {
    const category = CALCULATOR_CATEGORIES[calc.slug as keyof typeof CALCULATOR_CATEGORIES] || 'utility';
    if (!acc[category]) {
      acc[category] = [];
    }
    // Avoid duplicates within the same category
    if (!acc[category].some(c => c.slug === calc.slug)) {
      acc[category].push(calc);
    }
    return acc;
  }, {} as Record<string, CalculatorInfo[]>);

  // Filter calculators based on search
  const filteredBySearch = searchQuery.trim()
    ? initialCalculators.filter(calc => {
        const query = searchQuery.toLowerCase();
        return calc.name.toLowerCase().includes(query) ||
          calc.summary.toLowerCase().includes(query) ||
          calc.keywords?.some(keyword => keyword.toLowerCase().includes(query)) ||
          calc.tags?.some(tag => tag.toLowerCase().includes(query));
      })
    : [];

  // Update search results visibility
  useEffect(() => {
    setShowResults(searchQuery.trim() !== '');
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.search-container')) {
        setShowResults(false);
      }
      if (!target.closest('.search-modal') && !target.closest('.search-button')) {
        setSearchOpen(false);
      }
    };

    if (showResults || searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showResults, searchOpen]);

  // Floating search functionality
  useEffect(() => {
    if (floatingSearchQuery.trim() === '') {
      setFloatingSearchResults([]);
      return;
    }

    const allCalcs = getAllCalculatorsForHomepage(language);
    const query = floatingSearchQuery.toLowerCase();
    const filtered = allCalcs.filter(calc =>
      calc.name.toLowerCase().includes(query) ||
      calc.summary.toLowerCase().includes(query)
    );
    setFloatingSearchResults(filtered);
  }, [floatingSearchQuery, language]);

  const content = {
    en: {
      title: 'Calculators',
      heroTitle: 'Free Online Calculators',
      heroDescription: 'Quick and accurate calculators for your everyday needs. From financial planning to health tracking, find the perfect calculator for any calculation.',
      search: 'Search calculators...',
      categories: {
        financial: 'Financial Calculators',
        health: 'Health & Fitness Calculators',
        math: 'Math Calculators',
        utility: 'Utility Calculators',
        lifestyle: 'Lifestyle Calculators'
      },
      categoryDescriptions: {
        financial: 'Manage your money with calculators for budgeting, loans, mortgages, taxes, salary conversions, and investments',
        health: 'Track your fitness goals with BMI, calorie, and body composition calculators',
        math: 'Solve mathematical problems with our scientific and statistical calculators',
        utility: 'Convert units, calculate time, and handle everyday measurements',
        lifestyle: 'Helpful tools for daily life including age, tip, and discount calculators'
      },
      allCalculators: 'All Calculators',
      results: 'results',
      noResults: 'No calculators found matching your search.',
      whyUse: 'Why Use Our Free Online Calculators?',
      benefits: {
        fast: { 
          title: 'Fast & Accurate Calculations', 
          desc: 'Get instant, precise results with our professionally programmed online calculators. Each calculator uses verified formulas and algorithms to ensure accuracy. No need to download apps, install software, or create accounts - simply open your browser and start calculating immediately. Perfect for quick calculations at work, school, or home.'
        },
        mobile: { 
          title: 'Mobile-Friendly & Cross-Platform', 
          desc: 'All our calculators are fully responsive and work seamlessly on any device - smartphones (iPhone, Android), tablets (iPad, Samsung), laptops, and desktop computers. Whether you\'re using Chrome, Safari, Firefox, or Edge, our calculators provide the same smooth experience. Calculate anywhere, anytime, on any device with an internet connection.'
        },
        free: { 
          title: '100% Free - No Hidden Costs', 
          desc: 'Completely free to use with no hidden fees, premium subscriptions, or paywalls. No annoying ads blocking your calculations or interrupting your work flow. Unlimited access to all calculators - use them as many times as you need for personal, educational, or professional purposes. Free online tools designed to help everyone.'
        },
        privacy: { 
          title: 'Privacy-Focused & Secure', 
          desc: 'Your data privacy is our priority. We don\'t store, save, or track your calculation inputs or results. No registration required means your personal information stays private. All calculations are performed locally in your browser for maximum security. No data collection, no cookies tracking your activity, no selling your information to third parties.'
        }
      },
      popularCategories: 'Popular Calculator Categories for Every Need',
      popularCategoriesDesc: 'Our comprehensive online calculator collection covers every aspect of daily life, work, and education:',
      categoryDetails: {
        financial: 'Financial planning tools including mortgage calculators, loan payment calculators, compound interest calculators, investment return calculators, retirement planning, budget management, tax estimation, salary and income calculators, EMI calculators, and ROI calculators.',
        health: 'Health and fitness calculators including BMI (Body Mass Index), BMR (Basal Metabolic Rate), TDEE (Total Daily Energy Expenditure), calorie counters, macro calculators, body fat percentage, ideal weight, pregnancy due date, water intake, and nutrition tracking tools.',
        math: 'Mathematical tools for students and professionals including scientific calculators, percentage calculators, fraction calculators, algebra solvers, geometry calculators (area, volume, perimeter), statistics calculators (mean, median, mode, standard deviation), and trigonometry calculators.',
        utility: 'Everyday utility tools including unit converters (length, weight, temperature, currency), time zone converters, date calculators, age calculators, word counters, number converters, and measurement conversion tools.',
        lifestyle: 'Daily life helpers including age calculators, tip calculators, discount calculators, GPA calculators, love calculators, and other practical tools for everyday situations and quick calculations.'
      }
    },
    es: {
      title: 'Calculadoras',
      heroTitle: 'Calculadoras Gratuitas en Línea',
      heroDescription: 'Calculadoras rápidas y precisas para sus necesidades diarias. Desde planificación financiera hasta seguimiento de salud, encuentre la calculadora perfecta para cualquier cálculo.',
      search: 'Buscar calculadoras...',
      categories: {
        financial: 'Calculadoras Financieras',
        health: 'Calculadoras de Salud y Fitness',
        math: 'Calculadoras Matemáticas',
        utility: 'Calculadoras de Utilidad',
        lifestyle: 'Calculadoras de Estilo de Vida'
      },
      categoryDescriptions: {
        financial: 'Administre su dinero con calculadoras para presupuestos, préstamos, hipotecas, impuestos, conversiones de salario e inversiones',
        health: 'Rastree sus objetivos de fitness con calculadoras de IMC, calorías y composición corporal',
        math: 'Resuelva problemas matemáticos con nuestras calculadoras científicas y estadísticas',
        utility: 'Convierta unidades, calcule tiempo y maneje medidas cotidianas',
        lifestyle: 'Herramientas útiles para la vida diaria incluyendo calculadoras de edad, propinas y descuentos'
      },
      allCalculators: 'Todas las Calculadoras',
      results: 'resultados',
      noResults: 'No se encontraron calculadoras que coincidan con su búsqueda.',
      whyUse: '¿Por Qué Usar Nuestras Calculadoras?',
      benefits: {
        fast: { title: 'Rápido y Preciso', desc: 'Obtenga resultados instantáneos con nuestras calculadoras programadas con precisión. No necesita descargar aplicaciones ni crear cuentas, solo comience a calcular de inmediato.' },
        mobile: { title: 'Compatible con Móviles', desc: 'Todas las calculadoras funcionan perfectamente en teléfonos inteligentes, tabletas y computadoras. Calcule sobre la marcha, dondequiera que esté.' },
        free: { title: '100% Gratis', desc: 'Sin tarifas ocultas, sin suscripciones, sin anuncios que bloqueen sus cálculos. Use cualquier calculadora tantas veces como necesite, completamente gratis.' },
        privacy: { title: 'Privacidad Primero', desc: 'Sus cálculos permanecen privados. No almacenamos sus datos ni rastreamos sus entradas. Calcule con confianza y tranquilidad.' }
      },
      popularCategories: 'Categorías Populares de Calculadoras',
      popularCategoriesDesc: 'Nuestra colección de calculadoras cubre una amplia gama de necesidades:',
      categoryDetails: {
        financial: 'Planificación de presupuestos, cálculos de préstamos, conversiones de salarios, estimaciones de impuestos y planificación de inversiones.',
        health: 'IMC, seguimiento de calorías, porcentaje de grasa corporal, peso ideal y planificación de objetivos de fitness.',
        math: 'Cálculos científicos, cálculos de porcentajes, geometría, álgebra y estadísticas.',
        utility: 'Conversiones de unidades, cálculos de zona horaria, cálculos de fechas y herramientas de medición.',
        lifestyle: 'Cálculos de edad, calculadoras de propinas, cálculos de descuentos y ayudantes para la vida cotidiana.'
      }
    },
    pt: {
      title: 'Calculadoras',
      heroTitle: 'Calculadoras Online Gratuitas',
      heroDescription: 'Calculadoras rápidas e precisas para suas necessidades diárias. Do planejamento financeiro ao acompanhamento de saúde, encontre a calculadora perfeita para qualquer cálculo.',
      search: 'Pesquisar calculadoras...',
      categories: {
        financial: 'Calculadoras Financeiras',
        health: 'Calculadoras de Saúde e Fitness',
        math: 'Calculadoras Matemáticas',
        utility: 'Calculadoras de Utilitários',
        lifestyle: 'Calculadoras de Estilo de Vida'
      },
      categoryDescriptions: {
        financial: 'Gerencie seu dinheiro com calculadoras para orçamento, empréstimos, hipotecas, impostos, conversões de salário e investimentos',
        health: 'Acompanhe suas metas de fitness com calculadoras de IMC, calorias e composição corporal',
        math: 'Resolva problemas matemáticos com nossas calculadoras científicas e estatísticas',
        utility: 'Converta unidades, calcule tempo e lide com medidas do dia a dia',
        lifestyle: 'Ferramentas úteis para a vida diária incluindo calculadoras de idade, gorjeta e desconto'
      },
      allCalculators: 'Todas as Calculadoras',
      results: 'resultados',
      noResults: 'Nenhuma calculadora encontrada correspondente à sua pesquisa.',
      whyUse: 'Por Que Usar Nossas Calculadoras?',
      benefits: {
        fast: { title: 'Rápido e Preciso', desc: 'Obtenha resultados instantâneos com nossas calculadoras programadas com precisão. Não é necessário baixar aplicativos ou criar contas - apenas comece a calcular imediatamente.' },
        mobile: { title: 'Compatível com Dispositivos Móveis', desc: 'Todas as calculadoras funcionam perfeitamente em smartphones, tablets e computadores. Calcule em movimento, onde quer que esteja.' },
        free: { title: '100% Gratuito', desc: 'Sem taxas ocultas, sem assinaturas, sem anúncios bloqueando seus cálculos. Use qualquer calculadora quantas vezes precisar, completamente grátis.' },
        privacy: { title: 'Privacidade em Primeiro Lugar', desc: 'Seus cálculos permanecem privados. Não armazenamos seus dados nem rastreamos suas entradas. Calcule com confiança e tranquilidade.' }
      },
      popularCategories: 'Categorias Populares de Calculadoras',
      popularCategoriesDesc: 'Nossa coleção de calculadoras cobre uma ampla gama de necessidades:',
      categoryDetails: {
        financial: 'Planejamento de orçamento, cálculos de empréstimos, conversões de salário, estimativas de impostos e planejamento de investimentos.',
        health: 'IMC, rastreamento de calorias, percentual de gordura corporal, peso ideal e planejamento de metas de fitness.',
        math: 'Cálculos científicos, cálculos de porcentagem, geometria, álgebra e estatísticas.',
        utility: 'Conversões de unidades, cálculos de fuso horário, cálculos de data e ferramentas de medição.',
        lifestyle: 'Cálculos de idade, calculadoras de gorjeta, cálculos de desconto e auxiliares para a vida diária.'
      }
    },
    fr: {
      title: 'Calculateurs',
      heroTitle: 'Calculateurs Gratuits en Ligne',
      heroDescription: 'Calculateurs rapides et précis pour vos besoins quotidiens. De la planification financière au suivi de la santé, trouvez le calculateur parfait pour tout calcul.',
      search: 'Rechercher des calculateurs...',
      categories: {
        financial: 'Calculateurs Financiers',
        health: 'Calculateurs Santé et Fitness',
        math: 'Calculateurs Mathématiques',
        utility: 'Calculateurs Utilitaires',
        lifestyle: 'Calculateurs Style de Vie'
      },
      categoryDescriptions: {
        financial: 'Gérez votre argent avec des calculateurs pour le budget, les prêts, les hypothèques, les impôts, les conversions de salaire et les investissements',
        health: 'Suivez vos objectifs de fitness avec des calculateurs d\'IMC, de calories et de composition corporelle',
        math: 'Résolvez des problèmes mathématiques avec nos calculateurs scientifiques et statistiques',
        utility: 'Convertissez des unités, calculez le temps et gérez les mesures quotidiennes',
        lifestyle: 'Outils utiles pour la vie quotidienne incluant des calculateurs d\'âge, de pourboire et de réduction'
      },
      allCalculators: 'Tous les Calculateurs',
      results: 'résultats',
      noResults: 'Aucun calculateur trouvé correspondant à votre recherche.',
      whyUse: 'Pourquoi Utiliser Nos Calculateurs?',
      benefits: {
        fast: { title: 'Rapide et Précis', desc: 'Obtenez des résultats instantanés avec nos calculateurs programmés avec précision. Pas besoin de télécharger des applications ou de créer des comptes - commencez simplement à calculer immédiatement.' },
        mobile: { title: 'Compatible Mobile', desc: 'Tous les calculateurs fonctionnent parfaitement sur les smartphones, tablettes et ordinateurs. Calculez en déplacement, où que vous soyez.' },
        free: { title: '100% Gratuit', desc: 'Pas de frais cachés, pas d\'abonnements, pas de publicités bloquant vos calculs. Utilisez n\'importe quel calculateur autant de fois que nécessaire, complètement gratuit.' },
        privacy: { title: 'Confidentialité d\'Abord', desc: 'Vos calculs restent privés. Nous ne stockons pas vos données ni ne suivons vos entrées. Calculez en toute confiance et tranquillité d\'esprit.' }
      },
      popularCategories: 'Catégories Populaires de Calculateurs',
      popularCategoriesDesc: 'Notre collection de calculateurs couvre un large éventail de besoins:',
      categoryDetails: {
        financial: 'Planification budgétaire, calculs de prêts, conversions de salaires, estimations fiscales et planification d\'investissements.',
        health: 'IMC, suivi des calories, pourcentage de graisse corporelle, poids idéal et planification des objectifs de fitness.',
        math: 'Calculs scientifiques, calculs de pourcentage, géométrie, algèbre et statistiques.',
        utility: 'Conversions d\'unités, calculs de fuseau horaire, calculs de date et outils de mesure.',
        lifestyle: 'Calculs d\'âge, calculateurs de pourboire, calculs de réduction et aides pour la vie quotidienne.'
      }
    }
  };

  const t = content[language as keyof typeof content] || content.en;

  // Category order
  const categoryOrder = ['financial', 'health', 'math', 'utility', 'lifestyle'];

  return (
    <div className="min-h-screen bg-white">
      <Header currentLang={language} />
      <CategoryNavigation lang={language} />

      {/* Floating Search Button */}
      <button
        onClick={() => setSearchOpen(!searchOpen)}
        className="search-button fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg z-40 transition-all"
        aria-label="Search calculators"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* Search Modal */}
      {searchOpen && (
        <div className="search-modal fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={floatingSearchQuery}
                  onChange={(e) => setFloatingSearchQuery(e.target.value)}
                  placeholder="Search calculators..."
                  className="flex-1 text-lg border-0 focus:ring-0 outline-none"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setFloatingSearchQuery('');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {floatingSearchQuery.trim() && (
                <div className="border-t border-gray-200 max-h-96 overflow-y-auto">
                  {floatingSearchResults.length > 0 ? (
                    <div>
                      {floatingSearchResults.slice(0, 15).map((calc) => {
                        const shortName = calc.name.split(/\s+[-–]\s+/)[0].trim();
                        const category = (CALCULATOR_CATEGORIES as any)[calc.slug] || 'utility';
                        const isPopular = isPopularCalculator(calc.slug, category);
                        return (
                          <Link
                            key={calc.slug}
                            href={`/${language}/${calc.slug}`}
                            onClick={() => {
                              setSearchOpen(false);
                              setFloatingSearchQuery('');
                            }}
                            className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                          >
                            <div className="flex items-center gap-1">
                              {isPopular && <span className="text-[10px] text-orange-500">★</span>}
                              <span className="font-medium text-gray-900 text-sm">{shortName}</span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">{calc.summary}</p>
                          </Link>
                        );
                      })}
                      {floatingSearchResults.length > 15 && (
                        <div className="px-4 py-2 text-xs text-gray-500 text-center border-t">
                          +{floatingSearchResults.length - 15} more results
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-500">
                      No calculators found for "{floatingSearchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section with Search */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6 sm:py-8 px-4 sm:px-6 rounded-lg mb-12">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">{t.heroTitle}</h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 max-w-3xl mx-auto opacity-90">
              {t.heroDescription}
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative search-container">
              <div className="relative">
                <input
                  type="text"
                  placeholder={`🔍 ${t.search}`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 sm:px-6 py-2 sm:py-3 pl-10 sm:pl-12 text-gray-900 bg-white border-0 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md text-sm sm:text-base"
                />
                {showResults && filteredBySearch.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
                    {filteredBySearch.slice(0, 15).map((calc) => {
                      const shortName = calc.name.split(/\s+[-–]\s+/)[0].trim();
                      const category = CALCULATOR_CATEGORIES[calc.slug as keyof typeof CALCULATOR_CATEGORIES] || 'utility';
                      const isPopular = isPopularCalculator(calc.slug, category);
                      return (
                        <Link
                          key={calc.slug}
                          href={`/${language}/${calc.slug}`}
                          onClick={() => {
                            setSearchQuery('');
                            setShowResults(false);
                          }}
                          className="block px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0"
                        >
                          <div className="flex items-center gap-1">
                            {isPopular && <span className="text-[10px] text-orange-500">★</span>}
                            <span className="font-medium text-gray-900 text-sm">{shortName}</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{calc.summary}</p>
                        </Link>
                      );
                    })}
                    {filteredBySearch.length > 15 && (
                      <div className="px-4 py-2 text-xs text-gray-500 text-center border-t border-gray-100">
                        +{filteredBySearch.length - 15} more results
                      </div>
                    )}
                  </div>
                )}
                {showResults && filteredBySearch.length === 0 && searchQuery.trim() !== '' && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
                    <p className="text-gray-600 text-sm text-center">{t.noResults}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-12">
            {categoryOrder.map((categoryKey) => {
              const calcs = categorizedCalculators[categoryKey] || [];
              if (calcs.length === 0) return null;

              const categoryColors = {
                financial: 'bg-blue-50 border-blue-200',
                health: 'bg-green-50 border-green-200',
                math: 'bg-purple-50 border-purple-200',
                utility: 'bg-orange-50 border-orange-200',
                lifestyle: 'bg-pink-50 border-pink-200'
              };

              const titleColors = {
                financial: 'text-blue-700',
                health: 'text-green-700',
                math: 'text-purple-700',
                utility: 'text-orange-700',
                lifestyle: 'text-pink-700'
              };

              return (
                <section key={categoryKey} className={`p-6 rounded-lg border-2 ${categoryColors[categoryKey as keyof typeof categoryColors]}`}>
                  <div className="text-center mb-6">
                    <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold mb-3 ${titleColors[categoryKey as keyof typeof titleColors]}`}>
                      {t.categories[categoryKey as keyof typeof t.categories]}
                    </h2>
                    <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
                      {t.categoryDescriptions[categoryKey as keyof typeof t.categoryDescriptions]}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2">
                    {calcs.map((calc) => {
                      const isPopular = isPopularCalculator(calc.slug, categoryKey);
                      return (
                        <Link
                          key={calc.slug}
                          href={`/${language}/${calc.slug}`}
                          className="text-blue-600 hover:underline text-xs sm:text-sm flex items-center gap-1"
                          aria-label={`${calc.name} - ${calc.summary}`}
                          title={`${calc.name} - ${calc.summary}`}
                        >
                          {isPopular && <span className="text-[10px] text-orange-500" title={`Popular: ${calc.name}`}>★</span>}
                          {calc.name}
                        </Link>
                      );
                    })}
                  </div>
                </section>
              );
            })}

            {/* All Calculators Section */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t.allCalculators}
              </h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2">
                {initialCalculators
                  .filter((calc, index, self) => 
                    index === self.findIndex(c => c.slug === calc.slug)
                  )
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((calc) => {
                    const category = CALCULATOR_CATEGORIES[calc.slug as keyof typeof CALCULATOR_CATEGORIES] || 'utility';
                    const isPopular = isPopularCalculator(calc.slug, category);
                    return (
                      <Link
                        key={calc.slug}
                        href={`/${language}/${calc.slug}`}
                        className="text-blue-600 hover:underline text-xs sm:text-sm flex items-center gap-1"
                        aria-label={`${calc.name} - ${calc.summary}`}
                        title={`${calc.name} - ${calc.summary}`}
                      >
                        {isPopular && <span className="text-[10px] text-orange-500" title={`Popular: ${calc.name}`}>★</span>}
                        {calc.name}
                      </Link>
                    );
                  })}
              </div>
            </section>
          </div>

        {/* Why Use Our Calculators */}
        <div className="mt-16 mb-12 prose max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.whyUse}</h2>
            
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.benefits.fast.title}</h3>
                <p className="text-sm leading-relaxed">
                  {t.benefits.fast.desc}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.benefits.mobile.title}</h3>
                <p className="text-sm leading-relaxed">
                  {t.benefits.mobile.desc}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.benefits.free.title}</h3>
                <p className="text-sm leading-relaxed">
                  {t.benefits.free.desc}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.benefits.privacy.title}</h3>
                <p className="text-sm leading-relaxed">
                  {t.benefits.privacy.desc}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.popularCategories}</h3>
              <p className="text-base leading-relaxed mb-3">
                {t.popularCategoriesDesc}
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li><strong>{t.categories.financial}:</strong> {t.categoryDetails.financial}</li>
                <li><strong>{t.categories.health}:</strong> {t.categoryDetails.health}</li>
                <li><strong>{t.categories.math}:</strong> {t.categoryDetails.math}</li>
                <li><strong>{t.categories.utility}:</strong> {t.categoryDetails.utility}</li>
                <li><strong>{t.categories.lifestyle}:</strong> {t.categoryDetails.lifestyle}</li>
              </ul>
            </div>
          </div>
      </main>

      <Footer currentLang={language} />
    </div>
  );
}
