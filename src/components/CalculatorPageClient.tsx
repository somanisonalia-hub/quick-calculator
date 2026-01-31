'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { renderStructuredSEOContent, SEOContent } from '@/lib/seoContentRenderer';
import { getCalculatorComponent } from '@/components/calculators/CalculatorRegistry';
import BreadcrumbNavigation from './BreadcrumbNavigation';

interface CalculatorPageClientProps {
  lang: string;
  slug: string;
  seoContent?: SEOContent | null;
  initialCalculatorContent?: any;
  initialRelatedCalculators?: any[];
  breadcrumbs?: Array<{ name: string; href: string }>;
}

export default function CalculatorPageClient({ lang, slug, seoContent, initialCalculatorContent, initialRelatedCalculators, breadcrumbs }: CalculatorPageClientProps) {
  const { t, i18n } = useTranslation('common');

  const [calculatorContent, setCalculatorContent] = useState<any>(null);
  const [relatedCalculators, setRelatedCalculators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create a translation function that uses the lang prop
  const tLang = (key: string, fallback?: string) => {
    // For calculator UI elements, use simple language-based translation
    const translations: Record<string, Record<string, string>> = {
      'calculator.sectionTitle': { es: 'Calculadora', pt: 'Calculadora', fr: 'Calculateur', en: 'Calculator' },
      'calculator.howToUse': { es: 'Cómo Usar', pt: 'Como Usar', fr: 'Comment Utiliser', en: 'How to Use' },
      'calculator.examples': { es: 'Ejemplos', pt: 'Exemplos', fr: 'Exemples', en: 'Examples' },
      'calculator.relatedCalculators': { es: 'Calculadoras Relacionadas', pt: 'Calculadoras Relacionadas', fr: 'Calculateurs Connexes', en: 'Related Calculators' },
      'calculator.calculatorDetails': { es: 'Detalles de la Calculadora', pt: 'Detalhes da Calculadora', fr: 'Détails du Calculateur', en: 'Calculator Details' },
      'calculator.howDoesWork': { es: '¿Cómo Funciona', pt: 'Como Funciona', fr: 'Comment Ça Marche', en: 'How Does' },
      'calculator.completeGuide': { es: 'Guía Completa', pt: 'Guia Completo', fr: 'Guide Complet', en: 'Complete Guide' },
      'calculator.input': { es: 'Entrada', pt: 'Entrada', fr: 'Entrée', en: 'Input' },
      'calculator.output': { es: 'Salida', pt: 'Saída', fr: 'Sortie', en: 'Output' },
      'calculator.comingSoon': { es: 'Esta calculadora está actualmente en desarrollo y estará disponible pronto.', pt: 'Esta calculadora está atualmente em desenvolvimento e estará disponível em breve.', fr: 'Cette calculatrice est actuellement en développement et sera disponible bientôt.', en: 'This calculator is currently under development and will be available soon.' },
      'calculator.guideComingSoon': { es: 'La guía detallada y explicación de fórmula estarán disponibles pronto.', pt: 'O guia detalhado e explicação da fórmula estarão disponíveis em breve.', fr: 'Le guide détaillé et l\'explication de formule seront disponibles bientôt.', en: 'Detailed guide and formula explanation will be available soon.' },
      'calculator.notFound': { es: 'Calculadora no encontrada', pt: 'Calculadora não encontrada', fr: 'Calculatrice introuvable', en: 'Calculator not found' },
      'calculator.loading': { es: 'Cargando calculadora...', pt: 'Carregando calculadora...', fr: 'Chargement de la calculatrice...', en: 'Loading calculator...' }
    };

    return translations[key]?.[lang] || fallback || key;
  };

  // For SSG pages, set language synchronously to ensure correct translations
  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
      // Clear content when language changes so it reloads for the new language
      setCalculatorContent(null);
      setLoading(true);
      setError(null);
    }
  }, [lang, i18n]);

  // Load calculator content and related calculators
  useEffect(() => {
    if (calculatorContent && relatedCalculators.length > 0) return; // Already loaded

    try {
      // Use initialCalculatorContent and initialRelatedCalculators (should always be provided now)
      const content = initialCalculatorContent;
      const related = initialRelatedCalculators || [];

      if (content && content.title) {
        setCalculatorContent(content);
        setRelatedCalculators(related);
        setLoading(false);
      } else {
        setError(`${tLang("calculator.notFound", "Calculator not found")}`);
        setLoading(false);
      }
    } catch (err) {
      console.error('Error loading calculator content:', err);
      setError('Error loading calculator');
      setLoading(false);
    }
  }, [lang, slug, calculatorContent, relatedCalculators.length, initialCalculatorContent, initialRelatedCalculators]);

  // Function to get the correct URL for related calculators
  const getCalculatorUrl = (calcSlug: string) => {
    return `/${lang}/${calcSlug}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">{tLang('calculator.loading', 'Loading calculator...')}</p>
        </div>
      </div>
    );
  }

  if (error || !calculatorContent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-gray-600">{error || '{t("calculator.notFound", "Calculator not found")}'}</p>
          <a href="/" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            {t("calculator.backToHomepage", "← Back to homepage")}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <BreadcrumbNavigation breadcrumbs={breadcrumbs} currentLang={lang} />
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-2 sm:py-4" id="calculator-hero">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold mb-1 leading-tight">
              {calculatorContent.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Description */}
      <section className="bg-white py-2 sm:py-3" id="calculator-description">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed text-center max-w-3xl mx-auto">
            {calculatorContent.description}
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8" id="calculator-main">
        <div>
          {/* Main Calculator Section */}
            {/* Calculator Component */}
            <section id="calculator-section" className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-6">
              <div className="p-6">
                {(() => {
                  // Handle both old object format and new string format
                  // Check for 'component' field first (new standard), then 'calculatorComponent' (legacy)
                  const componentName = calculatorContent.component 
                    || (typeof calculatorContent.calculatorComponent === 'string'
                      ? calculatorContent.calculatorComponent
                      : calculatorContent.calculatorComponent?.componentName);

                  const CalculatorComponent = getCalculatorComponent(componentName);

                  if (CalculatorComponent) {
                    // If calculatorComponent is an object with inputs, use old format (pass inputs/output)
                    if (calculatorContent.calculatorComponent && typeof calculatorContent.calculatorComponent === 'object' && calculatorContent.calculatorComponent.inputs) {
                      return (
                        <CalculatorComponent
                          inputs={calculatorContent.calculatorComponent.inputs || []}
                          output={calculatorContent.calculatorComponent.output || {}}
                          additionalOutputs={calculatorContent.calculatorComponent.additionalOutputs || []}
                        />
                      );
                    }
                    // New format: component is a string, pass lang prop only
                    else {
                      return <CalculatorComponent lang={lang} />;
                    }
                  } else {
                    return (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
                        <svg className="w-12 h-12 text-amber-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <h3 className="text-lg font-semibold text-amber-800 mb-2">
                          {t("calculator.notImplemented", "Calculator Coming Soon")}
                        </h3>
                        <p className="text-amber-700 mb-4">
                          {tLang('calculator.comingSoon')}
                        </p>
                        <p className="text-sm text-amber-600">
                          Component: {componentName || 'Unknown'}
                        </p>
                      </div>
                    );
                  }
                })()}
              </div>
            </section>

            {/* Instructions Section */}
            {/* {calculatorContent && calculatorContent.instructions && calculatorContent.instructions.length > 0 && (
              <section id="instructions-section" className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {tLang('calculator.howToUse')}
                  </h2>
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-600 leading-relaxed">
                    {calculatorContent.instructions.map((instruction: string, index: number) => (
                      <p key={index} className="mb-2">{index + 1}. {instruction}</p>
                    ))}
                  </div>
                </div>
              </section>
            )} */}

            {/* SEO Content Section */}
            <section className="bg-gradient-to-br from-slate-50 to-white rounded-xl shadow-lg border border-slate-200 overflow-hidden mb-6">
              <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 px-6 py-4">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h2 className="text-xl font-bold text-white">{tLang('calculator.completeGuide')}</h2>
                </div>
              </div>
              <div className="p-[50px]">
                {(() => {
                  // Use pre-generated structured SEO content if available
                  if (seoContent) {
                    // Render the structured SEO content
                    return (
                      <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                          {tLang('calculator.howDoesWork')} {calculatorContent?.title || 'Calculator'} Work?
                        </h2>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: renderStructuredSEOContent(seoContent, lang, calculatorContent?.title)
                          }}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div className="text-center py-8 text-gray-500">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h2 className="text-2xl font-semibold mb-2">{tLang('calculator.howDoesWork')} {calculatorContent?.title || 'Calculator'} Work?</h2>
                        <p className="mt-2">{tLang('calculator.guideComingSoon')}</p>
                      </div>
                    );
                  }
                })()}
              </div>
            </section>
            

            {/* Related Calculators */}
            {relatedCalculators.length > 0 && (
              <section id="related-section" className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-6">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-3 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    {tLang('calculator.relatedCalculators')}
                  </h2>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    {relatedCalculators.map((calc: any, index: number) => (
                      <a
                        key={index}
                        href={getCalculatorUrl(calc.slug)}
                        className="block p-3 bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-lg hover:shadow-md hover:border-purple-300 transition-all duration-200 hover:bg-purple-50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 text-sm">{calc.name}</h3>
                            <p className="text-gray-600 text-xs mt-1 line-clamp-2">{calc.summary}</p>
                          </div>
                          <svg className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </section>
            )}

        </div>
      </main>

    </div>
  );
}
