'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CalculatorInfo, CALCULATOR_CATEGORIES } from '@/lib/categoryUtils';

interface HomePageSimpleProps {
  language?: string;
  initialCalculators?: CalculatorInfo[];
}

export default function HomePageSimple({ language = 'en', initialCalculators = [] }: HomePageSimpleProps) {
  const [searchQuery, setSearchQuery] = useState('');

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
    ? initialCalculators.filter(calc =>
        calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.summary.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

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
      whyUse: 'Why Use Our Calculators?',
      benefits: {
        fast: { title: 'Fast & Accurate', desc: 'Get instant results with our precisely programmed calculators. No need to download apps or create accounts - just start calculating immediately.' },
        mobile: { title: 'Mobile Friendly', desc: 'All calculators work seamlessly on smartphones, tablets, and computers. Calculate on the go, wherever you are.' },
        free: { title: '100% Free', desc: 'No hidden fees, no subscriptions, no ads blocking your calculations. Use any calculator as many times as you need, completely free.' },
        privacy: { title: 'Privacy First', desc: 'Your calculations stay private. We don\'t store your data or track your inputs. Calculate with confidence and peace of mind.' }
      },
      popularCategories: 'Popular Calculator Categories',
      popularCategoriesDesc: 'Our calculator collection covers a wide range of needs:',
      categoryDetails: {
        financial: 'Budget planning, loan calculations, salary conversions, tax estimations, and investment planning.',
        health: 'BMI, calorie tracking, body fat percentage, ideal weight, and fitness goal planning.',
        math: 'Scientific calculations, percentage calculations, geometry, algebra, and statistics.',
        utility: 'Unit conversions, time zone calculations, date calculations, and measurement tools.',
        lifestyle: 'Age calculations, tip calculators, discount calculations, and everyday life helpers.'
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

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{t.heroTitle}</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t.heroDescription}
          </p>
          
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* Search Results */}
        {filteredBySearch && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {filteredBySearch.length} {t.results}
            </h2>
            {filteredBySearch.length === 0 ? (
              <p className="text-gray-600">{t.noResults}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {filteredBySearch.map((calc) => (
                  <Link
                    key={calc.slug}
                    href={`/${language}/${calc.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {calc.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Categories */}
        {!filteredBySearch && (
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
                    <h2 className={`text-3xl font-bold mb-3 ${titleColors[categoryKey as keyof typeof titleColors]}`}>
                      {t.categories[categoryKey as keyof typeof t.categories]}
                    </h2>
                    <p className="text-gray-700 text-lg max-w-3xl mx-auto">
                      {t.categoryDescriptions[categoryKey as keyof typeof t.categoryDescriptions]}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
                    {calcs.map((calc) => (
                      <Link
                        key={calc.slug}
                        href={`/${language}/${calc.slug}`}
                        className="text-blue-600 hover:underline text-base"
                      >
                        {calc.name}
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}

            {/* All Calculators Section */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {t.allCalculators}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {initialCalculators
                  .filter((calc, index, self) => 
                    index === self.findIndex(c => c.slug === calc.slug)
                  )
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((calc) => (
                    <Link
                      key={calc.slug}
                      href={`/${language}/${calc.slug}`}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {calc.name}
                    </Link>
                  ))}
              </div>
            </section>
          </div>
        )}

        {/* Why Use Our Calculators - only show when not searching */}
        {!filteredBySearch && (
          <div className="mt-16 mb-12 prose max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t.whyUse}</h2>
            
            <div className="grid md:grid-cols-2 gap-8 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.benefits.fast.title}</h3>
                <p className="leading-relaxed">
                  {t.benefits.fast.desc}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.benefits.mobile.title}</h3>
                <p className="leading-relaxed">
                  {t.benefits.mobile.desc}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.benefits.free.title}</h3>
                <p className="leading-relaxed">
                  {t.benefits.free.desc}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t.benefits.privacy.title}</h3>
                <p className="leading-relaxed">
                  {t.benefits.privacy.desc}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{t.popularCategories}</h3>
              <p className="text-lg leading-relaxed mb-4">
                {t.popularCategoriesDesc}
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li><strong>{t.categories.financial}:</strong> {t.categoryDetails.financial}</li>
                <li><strong>{t.categories.health}:</strong> {t.categoryDetails.health}</li>
                <li><strong>{t.categories.math}:</strong> {t.categoryDetails.math}</li>
                <li><strong>{t.categories.utility}:</strong> {t.categoryDetails.utility}</li>
                <li><strong>{t.categories.lifestyle}:</strong> {t.categoryDetails.lifestyle}</li>
              </ul>
            </div>
          </div>
        )}
      </main>

      <Footer currentLang={language} />
    </div>
  );
}
