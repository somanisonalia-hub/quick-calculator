'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { getAllCalculatorsForHomepage, CALCULATOR_CATEGORIES } from '@/lib/categoryUtils';
import { isPopularCalculator } from '@/lib/popularCalculators';
import { getCalculatorComponent } from '@/components/calculators/CalculatorRegistry';
import RelatedCalculatorsWidget from '@/components/RelatedCalculatorsWidget';

interface CalculatorInteractiveProps {
  lang: string;
  slug: string;
  calculatorContent: any;
  relatedCalculators: any[];
}

export default function CalculatorInteractive({ 
  lang, 
  slug, 
  calculatorContent,
  relatedCalculators 
}: CalculatorInteractiveProps) {
  const { i18n } = useTranslation('common');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [calculatorMounted, setCalculatorMounted] = useState(false);

  // Track when client-side JavaScript has loaded
  useEffect(() => {
    setIsClient(true);
    // Ensure i18n is set to correct language
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    // Mount calculator and add ready class for smooth transition
    setCalculatorMounted(true);
    document.body.classList.add('calculator-ready');
  }, [lang, i18n]);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const allCalcs = getAllCalculatorsForHomepage(lang);
    const query = searchQuery.toLowerCase();
    const filtered = allCalcs.filter(calc =>
      calc.name.toLowerCase().includes(query) ||
      calc.summary.toLowerCase().includes(query)
    );
    setSearchResults(filtered);
  }, [searchQuery, lang]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.search-modal') && !target.closest('.search-button')) {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [searchOpen]);

  // Get category label for internal linking
  const getCategoryLabel = (category: string) => {
    const labels: Record<string, Record<string, string>> = {
      financial: { en: 'Financial Calculators', es: 'Calculadoras Financieras', pt: 'Calculadoras Financeiras', fr: 'Calculateurs Financiers', de: 'Finanzrechner', nl: 'Financiële Rekenmachines' },
      health: { en: 'Health Calculators', es: 'Calculadoras de Salud', pt: 'Calculadoras de Saúde', fr: 'Calculateurs de Santé', de: 'Gesundheitsrechner', nl: 'Gezondheidsrekenmachines' },
      math: { en: 'Math Calculators', es: 'Calculadoras Matemáticas', pt: 'Calculadoras Matemáticas', fr: 'Calculateurs Mathématiques', de: 'Mathematikrechner', nl: 'Wiskunderekenmachines' },
      utility: { en: 'Utility Calculators', es: 'Calculadoras de Utilidad', pt: 'Calculadoras de Utilidade', fr: 'Calculateurs Utilitaires', de: 'Nützlichkeitsrechner', nl: 'Hulpmiddelrekenmachines' },
      lifestyle: { en: 'Lifestyle Calculators', es: 'Calculadoras de Estilo de Vida', pt: 'Calculadoras de Estilo de Vida', fr: 'Calculateurs de Style de Vie', de: 'Lebensstilrechner', nl: 'Levensstijlrekenmachines' }
    };
    return labels[category]?.[lang] || labels[category]?.en || category;
  };

  if (!isClient) {
    return null; // Don't render anything on server
  }

  return (
    <>
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search calculators..."
                  className="flex-1 text-lg border-0 focus:ring-0 outline-none"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {searchQuery.trim() && (
                <div className="border-t border-gray-200 max-h-96 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div>
                      {searchResults.slice(0, 15).map((calc) => {
                        const shortName = calc.name.split(/\s+[-–]\s+/)[0].trim();
                        const category = (CALCULATOR_CATEGORIES as any)[calc.slug] || 'utility';
                        const isPopular = isPopularCalculator(calc.slug, category);
                        return (
                          <Link
                            key={calc.slug}
                            href={`/${lang}/${calc.slug}`}
                            onClick={() => {
                              setSearchOpen(false);
                              setSearchQuery('');
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
                      {searchResults.length > 15 && (
                        <div className="px-4 py-2 text-xs text-gray-500 text-center border-t">
                          +{searchResults.length - 15} more results
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-500">
                      No calculators found for &quot;{searchQuery}&quot;
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hide SSR form when interactive loads */}
      {calculatorMounted && calculatorContent && (
        <>
          <style jsx global>{`
            #calculator-section {
              display: none !important;
            }
          `}</style>
        </>
      )}

      {/* Related Calculators Widget & Additional Sections */}
      {calculatorContent && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Interactive Calculator - Only show when mounted */}
          {calculatorMounted && (
            <div id="interactive-calculator-overlay" className="bg-white rounded-lg shadow-lg p-6 mb-8 relative">
              {(() => {
                const componentName = calculatorContent.component 
                  || (typeof calculatorContent.calculatorComponent === 'string'
                    ? calculatorContent.calculatorComponent
                    : calculatorContent.calculatorComponent?.componentName);

                const CalculatorComponent = getCalculatorComponent(componentName);

                if (CalculatorComponent) {
                  return (
                    <div className="calculator-interactive-wrapper">
                      {calculatorContent.calculatorComponent && typeof calculatorContent.calculatorComponent === 'object' && calculatorContent.calculatorComponent.inputs ? (
                        <CalculatorComponent
                          inputs={calculatorContent.calculatorComponent.inputs || []}
                          output={calculatorContent.calculatorComponent.output || {}}
                          additionalOutputs={calculatorContent.calculatorComponent.additionalOutputs || []}
                          lang={lang}
                        />
                      ) : (
                        <CalculatorComponent lang={lang} />
                      )}
                    </div>
                  );
                }
                return null;
              })()}
            </div>
          )}

          {/* Related Calculators Widget */}
          <RelatedCalculatorsWidget 
            calculators={relatedCalculators} 
            currentCalculatorName={calculatorContent?.title}
            lang={lang}
          />

          {/* Internal Linking - Explore More Calculators */}
          <section className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                {lang === 'en' ? 'Explore More Calculators' : 
                 lang === 'es' ? 'Explorar Más Calculadoras' :
                 lang === 'pt' ? 'Explorar Mais Calculadoras' :
                 lang === 'fr' ? 'Explorer Plus de Calculateurs' :
                 lang === 'de' ? 'Weitere Rechner entdecken' :
                 'Ontdek meer rekenmachines'}
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Current Category */}
                {calculatorContent.category && (
                  <Link
                    href={`/${lang}/categories/${calculatorContent.category}`}
                    className="flex items-center p-4 bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 transition-colors group"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-blue-900 group-hover:text-blue-700">
                        {getCategoryLabel(calculatorContent.category)}
                      </div>
                      <div className="text-xs text-blue-600 mt-1">
                        {lang === 'en' ? 'View all' : lang === 'es' ? 'Ver todo' : lang === 'pt' ? 'Ver tudo' : lang === 'fr' ? 'Voir tout' : lang === 'de' ? 'Alle anzeigen' : 'Bekijk alles'} →
                      </div>
                    </div>
                  </Link>
                )}
                {/* All Calculators */}
                <Link
                  href={`/${lang}`}
                  className="flex items-center p-4 bg-gray-50 border-2 border-gray-200 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900 group-hover:text-gray-700">
                      {lang === 'en' ? 'All Calculators' : lang === 'es' ? 'Todas las Calculadoras' : lang === 'pt' ? 'Todas as Calculadoras' : lang === 'fr' ? 'Tous les Calculateurs' : lang === 'de' ? 'Alle Rechner' : 'Alle rekenmachines'}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {lang === 'en' ? 'Browse all →' : lang === 'es' ? 'Explorar →' : lang === 'pt' ? 'Navegar →' : lang === 'fr' ? 'Parcourir →' : lang === 'de' ? 'Durchsuchen →' : 'Bladeren →'}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
