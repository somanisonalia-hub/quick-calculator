'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCategoryData, CategoryData, CalculatorInfo, CALCULATOR_CATEGORIES } from '@/lib/categoryUtils';
import { getPopularCalculatorsForCategory } from '@/lib/popularCalculators';

interface CategoryPageClientProps {
  lang: string;
  category: string;
  initialCalculators?: CalculatorInfo[];
  allCalculators?: CalculatorInfo[];
  categoryData?: CategoryData | null;
}

export default function CategoryPageClient({ lang, category, initialCalculators, allCalculators, categoryData: initialCategoryData }: CategoryPageClientProps) {
  const [categoryContent, setCategoryContent] = useState<CategoryData | null>(initialCategoryData || null);
  const [currentCategoryCalcs, setCurrentCategoryCalcs] = useState<CalculatorInfo[]>(initialCalculators || []);
  const [loading, setLoading] = useState(!initialCalculators);

  useEffect(() => {
    if (!initialCalculators || !initialCategoryData) {
      const loadCategoryContent = async () => {
        setLoading(true);
        try {
          const data = getCategoryData(lang, category);
          setCategoryContent(data);
          if (data) {
            setCurrentCategoryCalcs(data.calculators);
          }
        } catch (error) {
          console.error('Failed to load category content:', error);
          setCategoryContent(null);
        } finally {
          setLoading(false);
        }
      };
      loadCategoryContent();
    }
  }, [lang, category, initialCalculators, initialCategoryData]);

  if (loading) {
    return (
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  if (!categoryContent) {
    return (
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-6">The category "{category}" could not be loaded.</p>
        </div>
      </main>
    );
  }

  const categoryCalcs = currentCategoryCalcs.filter(calc => {
    const calcCategory = (CALCULATOR_CATEGORIES as any)[calc.slug] || 'utility';
    return calcCategory === category;
  });

  const categoryColors: Record<string, { bg: string; border: string; text: string; buttonBg: string; buttonHover: string }> = {
    financial: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', buttonBg: 'bg-blue-600', buttonHover: 'hover:bg-blue-700' },
    health: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', buttonBg: 'bg-green-600', buttonHover: 'hover:bg-green-700' },
    math: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', buttonBg: 'bg-purple-600', buttonHover: 'hover:bg-purple-700' },
    lifestyle: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-700', buttonBg: 'bg-pink-600', buttonHover: 'hover:bg-pink-700' },
    utility: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', buttonBg: 'bg-orange-600', buttonHover: 'hover:bg-orange-700' },
  };
  
  const colors = categoryColors[category] || categoryColors.utility;
  
  const translations = {
    en: { popular: 'Popular Calculators', otherCalculators: 'Other Calculators', backHome: 'Back to Homepage', mostUsed: 'Most used and trusted calculators in the', category: 'category for quick and accurate calculations.', essential: 'Essential tools from the', calculator: 'calculator', calculators: 'calculators', explore: 'Explore calculators from other categories to find more tools for your calculation needs.' },
    es: { popular: 'Calculadoras Populares', otherCalculators: 'Otras Calculadoras', backHome: 'Volver a la página de inicio', mostUsed: 'Calculadoras más utilizadas y confiables en la', category: 'categoría para cálculos rápidos y precisos.', essential: 'Herramientas esenciales de la', calculator: 'calculadora', calculators: 'calculadoras', explore: 'Explora calculadoras de otras categorías para encontrar más herramientas para tus necesidades de cálculo.' },
    pt: { popular: 'Calculadoras Populares', otherCalculators: 'Outras Calculadoras', backHome: 'Voltar para a página inicial', mostUsed: 'Calculadoras mais usadas e confiáveis na', category: 'categoria para cálculos rápidos e precisos.', essential: 'Ferramentas essenciais da', calculator: 'calculadora', calculators: 'calculadoras', explore: 'Explore calculadoras de outras categorias para encontrar mais ferramentas para suas necessidades de cálculo.' },
    fr: { popular: 'Calculatrices Populaires', otherCalculators: 'Autres Calculatrices', backHome: 'Retour à l\'accueil', mostUsed: 'Calculatrices les plus utilisées et fiables de la', category: 'catégorie pour des calculs rapides et précis.', essential: 'Outils essentiels de la', calculator: 'calculatrice', calculators: 'calculatrices', explore: 'Explorez des calculatrices d\'autres catégories pour trouver plus d\'outils pour vos besoins de calcul.' },
  } as Record<string, { popular: string; otherCalculators: string; backHome: string; mostUsed: string; category: string; essential: string; calculator: string; calculators: string; explore: string }>;
  
  const t = translations[lang] || translations.en;

  // Category names for grouping
  const categoryNames: Record<string, Record<string, string>> = {
    financial: { en: 'Financial Calculators', es: 'Calculadoras Financieras', pt: 'Calculadoras Financeiras', fr: 'Calculateurs Financiers' },
    health: { en: 'Health & Fitness Calculators', es: 'Calculadoras de Salud y Fitness', pt: 'Calculadoras de Saúde e Fitness', fr: 'Calculateurs Santé et Fitness' },
    math: { en: 'Math Calculators', es: 'Calculadoras Matemáticas', pt: 'Calculadoras Matemáticas', fr: 'Calculateurs Mathématiques' },
    utility: { en: 'Utility Calculators', es: 'Calculadoras de Utilidad', pt: 'Calculadoras de Utilitários', fr: 'Calculateurs Utilitaires' },
    lifestyle: { en: 'Lifestyle Calculators', es: 'Calculadoras de Estilo de Vida', pt: 'Calculadoras de Estilo de Vida', fr: 'Calculateurs Style de Vie' }
  };

  // Group all calculators by category  
  const calculatorsToGroup = allCalculators || currentCategoryCalcs;
  
  const calulatorsByCategory: Record<string, CalculatorInfo[]> = {
    financial: [],
    health: [],
    math: [],
    utility: [],
    lifestyle: []
  };

  calculatorsToGroup.forEach(calc => {
    const calcCategory = (CALCULATOR_CATEGORIES as any)[calc.slug] || 'utility';
    if (calulatorsByCategory[calcCategory]) {
      calulatorsByCategory[calcCategory].push(calc);
    }
  });

  // Get popular calculators for this category
  const popularSlugs = getPopularCalculatorsForCategory(category);
  const popularCalcs = categoryCalcs
    .filter(calc => popularSlugs.includes(calc.slug))
    .sort((a, b) => popularSlugs.indexOf(a.slug) - popularSlugs.indexOf(b.slug))
    .slice(0, 20);

  // Get slugs to exclude from 'Other Calculators' section
  const currentCategorySlugs = new Set(categoryCalcs.map(c => c.slug));
  const popularSlugSet = new Set(popularCalcs.map(c => c.slug));
  const excludeSlugs = new Set([...currentCategorySlugs, ...popularSlugSet]);

  return (
    <main className="min-h-screen bg-gray-50">
      {categoryContent && (
        <>
          {/* Hero Section - Blue Gradient */}
          <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-2 sm:py-4">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-xl sm:text-2xl font-bold mb-1 leading-tight">{categoryContent.title}</h1>
              </div>
            </div>
          </section>

          {/* Description Section */}
          <section className="bg-white py-2 sm:py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed text-center max-w-3xl mx-auto">{categoryContent.description}</p>
              <div className="text-xs text-gray-400 text-center mt-2">{categoryCalcs.length} {categoryCalcs.length !== 1 ? t.calculators : t.calculator}</div>
            </div>
          </section>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <section className={`p-6 rounded-lg border-2 ${colors.bg} ${colors.border} mb-10`}>
            <div className="text-center mb-6">
              <h2 className={`text-2xl font-bold mb-3 ${colors.text}`}>{categoryContent.title}</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2">
              {categoryCalcs.map((calc) => {
                const shortName = calc.name.split(/\s+[-–]\s+/)[0].trim();
                return (
                  <Link 
                    key={calc.slug} 
                    href={`/${lang}/${calc.slug}`} 
                    className="text-blue-600 hover:underline text-xs sm:text-sm"
                    aria-label={`${calc.name} - ${calc.summary}`}
                    title={`${calc.name} - ${calc.summary}`}
                  >
                    {shortName}
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Popular Calculators Section */}
          {popularCalcs.length > 0 && (
            <section className="bg-white py-6 sm:py-8 mb-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                    Popular {categoryContent?.name?.replace(' Calculators', '') || category.charAt(0).toUpperCase() + category.slice(1)} Calculators
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-4xl">
                    {t.mostUsed} {categoryContent?.name?.toLowerCase() || category} {t.category}
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {popularCalcs.map((calc) => {
                    const shortName = calc.name.split(/\s+[-–]\s+/)[0].trim();
                    return (
                      <Link 
                        key={calc.slug} 
                        href={`/${lang}/${calc.slug}`} 
                        className="text-blue-600 hover:text-blue-800 hover:underline text-xs sm:text-sm font-medium transition-colors"
                        aria-label={`${calc.name} - ${calc.summary}`}
                        title={`${calc.name} - ${calc.summary}`}
                      >
                        ⭐ {shortName}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Other Calculators Section - organized by OTHER categories, excluding duplicates */}
          <section className="mb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{t.otherCalculators}</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-4xl">
                {t.explore}
              </p>
            </div>
            <div className="space-y-8">
              {Object.entries(calulatorsByCategory).map(([categoryKey, calcs]) => {
                // Skip the current category entirely
                if (categoryKey === category) return null;
                // Filter out calculators already shown in Popular or current category sections
                const filteredCalcs = calcs.filter(calc => !excludeSlugs.has(calc.slug));
                if (filteredCalcs.length === 0) return null;
                const categoryTitle = categoryNames[categoryKey]?.[lang as keyof (typeof categoryNames.financial)] || categoryKey;
                const categoryColor = categoryColors[categoryKey] || categoryColors.utility;
                
                return (
                  <div key={categoryKey} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-4">
                      <h3 className={`text-xl sm:text-2xl font-semibold mb-2 ${categoryColor.text}`}>{categoryTitle}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{t.essential} {categoryTitle.toLowerCase()}</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {filteredCalcs.sort((a, b) => a.name.localeCompare(b.name)).map((calc) => {
                        const shortName = calc.name.split(/\s+[-–]\s+/)[0].trim();
                        return (
                          <Link 
                            key={calc.slug} 
                            href={`/${lang}/${calc.slug}`} 
                            className="text-blue-600 hover:text-blue-800 hover:underline text-xs sm:text-sm transition-colors"
                            aria-label={`${calc.name} - ${calc.summary}`}
                            title={`${calc.name} - ${calc.summary}`}
                          >
                            {shortName}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="text-center mt-10 pb-6">
            <Link href={`/${lang === 'en' ? '' : lang}`} className={`inline-flex items-center px-6 py-3 ${colors.buttonBg} text-white font-semibold rounded-lg ${colors.buttonHover} transition-colors`}>
              ← {t.backHome}
            </Link>
          </div>
          </div>
        </>
      )}
    </main>
  );
}
