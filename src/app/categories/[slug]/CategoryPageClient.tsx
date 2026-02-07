'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCategoryData, CategoryData, CalculatorInfo, CALCULATOR_CATEGORIES, getAllCalculatorsForHomepage } from '@/lib/categoryUtils';
import { getPopularCalculatorsForCategory, isPopularCalculator } from '@/lib/popularCalculators';
import DE_NL_SELECTED_CALCULATORS from '@/lib/DE_NL_SELECTED_CALCULATORS.json';
import CategoryNavigation from '@/components/CategoryNavigation';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCalculators, setFilteredCalculators] = useState<CalculatorInfo[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [floatingSearchQuery, setFloatingSearchQuery] = useState('');
  const [floatingSearchResults, setFloatingSearchResults] = useState<CalculatorInfo[]>([]);

  // Define translations early so they can be used in loading/error states
  const translations = {
    en: { popular: 'Popular Calculators', otherCalculators: 'Other Calculators', backHome: 'Back to Homepage', mostUsed: 'Most used and trusted calculators in the', category: 'category for quick and accurate calculations.', essential: 'Essential tools from the', calculator: 'calculator', calculators: 'calculators', explore: 'Explore calculators from other categories to find more tools for your calculation needs.', loading: 'Loading...', notFound: 'Category Not Found', searchAria: 'Search calculators', searchPlaceholder: 'Search calculators...', notFoundSearch: 'No calculators found for' },
    es: { popular: 'Calculadoras Populares', otherCalculators: 'Otras Calculadoras', backHome: 'Volver a la página de inicio', mostUsed: 'Calculadoras más utilizadas y confiables en la', category: 'categoría para cálculos rápidos y precisos.', essential: 'Herramientas esenciales de la', calculator: 'calculadora', calculators: 'calculadoras', explore: 'Explora calculadoras de otras categorías para encontrar más herramientas para tus necesidades de cálculo.', loading: 'Cargando...', notFound: 'Categoría no encontrada', searchAria: 'Buscar calculadoras', searchPlaceholder: 'Buscar calculadoras...', notFoundSearch: 'No se encontraron calculadoras para' },
    pt: { popular: 'Calculadoras Populares', otherCalculators: 'Outras Calculadoras', backHome: 'Voltar para a página inicial', mostUsed: 'Calculadoras mais usadas e confiáveis na', category: 'categoria para cálculos rápidos e precisos.', essential: 'Ferramentas essenciais da', calculator: 'calculadora', calculators: 'calculadoras', explore: 'Explore calculadoras de outras categorias para encontrar mais ferramentas para suas necessidades de cálculo.', loading: 'Carregando...', notFound: 'Categoria não encontrada', searchAria: 'Buscar calculadoras', searchPlaceholder: 'Buscar calculadoras...', notFoundSearch: 'Nenhuma calculadora encontrada para' },
    fr: { popular: 'Calculatrices Populaires', otherCalculators: 'Autres Calculatrices', backHome: 'Retour à l\'accueil', mostUsed: 'Calculatrices les plus utilisées et fiables de la', category: 'catégorie pour des calculs rapides et précis.', essential: 'Outils essentiels de la', calculator: 'calculatrice', calculators: 'calculatrices', explore: 'Explorez des calculatrices d\'autres catégories pour trouver plus d\'outils pour vos besoins de calcul.', loading: 'Chargement...', notFound: 'Catégorie non trouvée', searchAria: 'Rechercher des calculatrices', searchPlaceholder: 'Rechercher des calculatrices...', notFoundSearch: 'Aucune calculatrice trouvée pour' },
    de: { popular: 'Beliebte Rechner', otherCalculators: 'Weitere Rechner', backHome: 'Zurück zur Startseite', mostUsed: 'Die am meisten genutzten und vertrauenswürdigen Rechner in der', category: 'Kategorie für schnelle und genaue Berechnungen.', essential: 'Wichtige Werkzeuge aus der', calculator: 'Rechner', calculators: 'Rechner', explore: 'Erkunde Rechner aus anderen Kategorien, um mehr Werkzeuge für deine Rechenbedürfnisse zu finden.', loading: 'Wird geladen...', notFound: 'Kategorie nicht gefunden', searchAria: 'Rechner suchen', searchPlaceholder: 'Rechner suchen...', notFoundSearch: 'Keine Rechner gefunden für' },
    nl: { popular: 'Populaire Rekenmachines', otherCalculators: 'Andere Rekenmachines', backHome: 'Terug naar startpagina', mostUsed: 'De meest gebruikte en betrouwbare rekenmachines in de', category: 'categorie voor snelle en nauwkeurige berekeningen.', essential: 'Essentiële hulpmiddelen uit de', calculator: 'rekenmachine', calculators: 'rekenmachines', explore: 'Verken rekenmachines uit andere categorieën om meer hulpmiddelen voor je rekenbehoeften te vinden.', loading: 'Laden...', notFound: 'Categorie niet gevonden', searchAria: 'Rekenmachines zoeken', searchPlaceholder: 'Rekenmachines zoeken...', notFoundSearch: 'Geen rekenmachines gevonden voor' },
  } as Record<string, { popular: string; otherCalculators: string; backHome: string; mostUsed: string; category: string; essential: string; calculator: string; calculators: string; explore: string; loading: string; notFound: string; searchAria: string; searchPlaceholder: string; notFoundSearch: string }>;
  
  const t = translations[lang] || translations.en;

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
          <p className="text-gray-600">{t.loading}</p>
        </div>
      </main>
    );
  }

  if (!categoryContent) {
    return (
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t.notFound}</h1>
          <p className="text-gray-600 mb-6">The category "{category}" could not be loaded.</p>
        </div>
      </main>
    );
  }

  let categoryCalcs = currentCategoryCalcs.filter(calc => {
    const calcCategory = (CALCULATOR_CATEGORIES as any)[calc.slug] || 'utility';
    return calcCategory === category;
  });

  // Filter to only selected calculators for DE/NL pages
  if (['de', 'nl'].includes(lang)) {
    categoryCalcs = categoryCalcs.filter(calc => 
      DE_NL_SELECTED_CALCULATORS.calculators.includes(calc.slug)
    );
  }

  const categoryColors: Record<string, { bg: string; border: string; text: string; buttonBg: string; buttonHover: string }> = {
    financial: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', buttonBg: 'bg-blue-600', buttonHover: 'hover:bg-blue-700' },
    health: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', buttonBg: 'bg-green-600', buttonHover: 'hover:bg-green-700' },
    math: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', buttonBg: 'bg-purple-600', buttonHover: 'hover:bg-purple-700' },
    lifestyle: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-700', buttonBg: 'bg-pink-600', buttonHover: 'hover:bg-pink-700' },
    utility: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', buttonBg: 'bg-orange-600', buttonHover: 'hover:bg-orange-700' },
  };
  
  const colors = categoryColors[category] || categoryColors.utility;

  // Search functionality - same logic as HomePage
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCalculators([]);
      setShowResults(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const allAvailableCalcs = allCalculators || currentCategoryCalcs;
    const filtered = allAvailableCalcs.filter(calc =>
      calc.name.toLowerCase().includes(query) ||
      calc.summary.toLowerCase().includes(query)
    );
    setFilteredCalculators(filtered);
    setShowResults(true);
  }, [searchQuery, allCalculators, currentCategoryCalcs]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.search-container')) {
        setShowResults(false);
      }
    };

    if (showResults) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showResults]);

  // Category names for grouping
  const categoryNames: Record<string, Record<string, string>> = {
    financial: { en: 'Financial Calculators', es: 'Calculadoras Financieras', pt: 'Calculadoras Financeiras', fr: 'Calculateurs Financiers', de: 'Finanzrechner', nl: 'Financiële Rekenmachines' },
    health: { en: 'Health & Fitness Calculators', es: 'Calculadoras de Salud y Fitness', pt: 'Calculadoras de Saúde e Fitness', fr: 'Calculateurs Santé et Fitness', de: 'Gesundheits- & Fitness-Rechner', nl: 'Gezondheids- & Fitness-Rekenmachines' },
    math: { en: 'Math Calculators', es: 'Calculadoras Matemáticas', pt: 'Calculadoras Matemáticas', fr: 'Calculateurs Mathématiques', de: 'Mathematikrechner', nl: 'Wiskundige Rekenmachines' },
    utility: { en: 'Utility Calculators', es: 'Calculadoras de Utilidad', pt: 'Calculadoras de Utilitários', fr: 'Calculateurs Utilitaires', de: 'Dienstprogrammrechner', nl: 'Hulpprogramma\'s-Rekenmachines' },
    lifestyle: { en: 'Lifestyle Calculators', es: 'Calculadoras de Estilo de Vida', pt: 'Calculadoras de Estilo de Vida', fr: 'Calculateurs Style de Vie', de: 'Lifestyle-Rechner', nl: 'Lifestyle-Rekenmachines' }
  };

  // Group all calculators by category  
  let calculatorsToGroup = allCalculators || currentCategoryCalcs;
  
  // Filter to only selected calculators for DE/NL pages
  if (['de', 'nl'].includes(lang)) {
    calculatorsToGroup = calculatorsToGroup.filter(calc => 
      DE_NL_SELECTED_CALCULATORS.calculators.includes(calc.slug)
    );
  }
  
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
      <CategoryNavigation lang={lang} />

      {/* Floating Search Button */}
      <button
        onClick={() => setSearchOpen(!searchOpen)}
        className="search-button fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg z-40 transition-all"
        aria-label={t.searchAria}
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
                  placeholder={t.searchPlaceholder}
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
                        const calcCategory = (CALCULATOR_CATEGORIES as any)[calc.slug] || 'utility';
                        const isPopular = isPopularCalculator(calc.slug, calcCategory);
                        return (
                          <Link
                            key={calc.slug}
                            href={`/${lang}/${calc.slug}`}
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

      {categoryContent && (
        <>
          {/* Hero Section - Blue Gradient with Search */}
          <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-3 sm:py-5">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 leading-tight">{categoryContent.title}</h1>
                
                {/* Search Bar */}
                <div className="max-w-md mx-auto relative search-container">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={`🔍 ${t.searchPlaceholder}`}
                      className="w-full px-4 py-2 pl-10 text-gray-900 bg-white border-0 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md text-sm"
                    />
                    {showResults && filteredCalculators.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
                        {filteredCalculators.slice(0, 10).map((calc) => {
                          const shortName = calc.name.split(/\s+[-–]\s+/)[0].trim();
                          const calcCategory = (CALCULATOR_CATEGORIES as any)[calc.slug] || 'utility';
                          const isPopular = isPopularCalculator(calc.slug, calcCategory);
                          return (
                            <Link
                              key={calc.slug}
                              href={`/${lang}/${calc.slug}`}
                              onClick={() => {
                                setSearchQuery('');
                                setShowResults(false);
                              }}
                              className="block px-4 py-2 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0"
                            >
                              <div className="flex items-center gap-1">
                                {isPopular && <span className="text-[10px] text-orange-500">★</span>}
                                <span className="font-medium text-gray-900 text-sm">{shortName}</span>
                              </div>
                              <p className="text-xs text-gray-600 mt-0.5">{calc.summary}</p>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                    {showResults && filteredCalculators.length === 0 && searchQuery.trim() !== '' && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50">
                        <p className="text-gray-600 text-sm">{t.notFoundSearch} "{searchQuery}"</p>
                      </div>
                    )}
                  </div>
                </div>
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
              <h2 className={`text-lg sm:text-xl md:text-2xl font-bold mb-3 ${colors.text}`}>{categoryContent.title}</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2">
              {categoryCalcs.map((calc) => {
                const shortName = calc.name.split(/\s+[-–]\s+/)[0].trim();
                const isPopular = isPopularCalculator(calc.slug, category);
                return (
                  <Link 
                    key={calc.slug} 
                    href={`/${lang}/${calc.slug}`} 
                    className="text-blue-600 hover:underline text-xs sm:text-sm flex items-center gap-1"
                    aria-label={`${calc.name} - ${calc.summary}`}
                    title={`${calc.name} - ${calc.summary}`}
                  >
                    {isPopular && <span className="text-[10px] text-orange-500" title={`Popular: ${calc.name}`}>★</span>}
                    <span>{shortName}</span>
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
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
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
                        className="text-blue-600 hover:text-blue-800 hover:underline text-xs sm:text-sm font-medium transition-colors flex items-center gap-1"
                        aria-label={`${calc.name} - ${calc.summary}`}
                        title={`${calc.name} - ${calc.summary}`}
                      >
                        <span className="text-[10px] text-orange-500" title={`Popular: ${calc.name}`}>★</span>
                        <span>{shortName}</span>
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
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">{t.otherCalculators}</h2>
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
                      <h3 className={`text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-2 ${categoryColor.text}`}>{categoryTitle}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{t.essential} {categoryTitle.toLowerCase()}</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {filteredCalcs.sort((a, b) => a.name.localeCompare(b.name)).map((calc) => {
                        const shortName = calc.name.split(/\s+[-–]\s+/)[0].trim();
                        const isPopular = isPopularCalculator(calc.slug, categoryKey);
                        return (
                          <Link 
                            key={calc.slug} 
                            href={`/${lang}/${calc.slug}`} 
                            className="text-blue-600 hover:text-blue-800 hover:underline text-xs sm:text-sm transition-colors flex items-center gap-1"
                            aria-label={`${calc.name} - ${calc.summary}`}
                            title={`${calc.name} - ${calc.summary}`}
                          >
                            {isPopular && <span className="text-[10px] text-orange-500" title={`Popular: ${calc.name}`}>★</span>}
                            <span>{shortName}</span>
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
