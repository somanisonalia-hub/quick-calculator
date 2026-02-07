'use client';

import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { renderStructuredSEOContent, SEOContent } from '@/lib/seoContentRenderer';
import { getCalculatorComponent } from '@/components/calculators/CalculatorRegistry';
import { getRelatedCalculators } from '@/lib/calculatorRelationships';
import { getAllCalculatorsForHomepage, CALCULATOR_CATEGORIES } from '@/lib/categoryUtils';
import { isPopularCalculator } from '@/lib/popularCalculators';
import BreadcrumbNavigation from './BreadcrumbNavigation';
// import AdSenseUnit from './AdSenseUnit'; // TODO: Enable after AdSense approval
import RelatedCalculatorsWidget from './RelatedCalculatorsWidget';

interface CalculatorPageClientProps {
  lang: string;
  slug: string;
  seoContent?: SEOContent | null;
  initialCalculatorContent?: any;
  initialRelatedCalculators?: any[];
  breadcrumbs?: Array<{ name: string; href: string }>;
  serverRenderedForm?: React.ReactNode;
}

export default function CalculatorPageClient({ lang, slug, seoContent, initialCalculatorContent, initialRelatedCalculators, breadcrumbs, serverRenderedForm }: CalculatorPageClientProps) {
  const { t, i18n } = useTranslation('common');

  const [calculatorContent, setCalculatorContent] = useState<any>(null);
  const [relatedCalculators, setRelatedCalculators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Generate FAQ schema for SEO
  const generateFAQSchema = () => {
    const faqTranslations: Record<string, any> = {
      en: {
        q1: `How do I use the ${calculatorContent?.title}?`,
        a1: `Enter your values in the input fields above, and the calculator will automatically compute the results. All calculations are performed instantly in your browser.`,
        q2: `Is this calculator free to use?`,
        a2: `Yes, all our calculators are completely free to use. No registration or payment required.`,
        q3: `Are the calculations accurate?`,
        a3: `Our calculators use industry-standard formulas and are thoroughly tested for accuracy. However, results should be used for informational purposes only.`
      },
      es: {
        q1: `¿Cómo uso la ${calculatorContent?.title}?`,
        a1: `Ingrese sus valores en los campos de entrada de arriba, y la calculadora calculará automáticamente los resultados. Todos los cálculos se realizan instantáneamente en su navegador.`,
        q2: `¿Es gratis usar esta calculadora?`,
        a2: `Sí, todas nuestras calculadoras son completamente gratuitas. No se requiere registro ni pago.`,
        q3: `¿Son precisos los cálculos?`,
        a3: `Nuestras calculadoras utilizan fórmulas estándar de la industria y están exhaustivamente probadas para precisión. Sin embargo, los resultados deben usarse solo con fines informativos.`
      },
      pt: {
        q1: `Como uso a ${calculatorContent?.title}?`,
        a1: `Digite seus valores nos campos de entrada acima, e a calculadora computará automaticamente os resultados. Todos os cálculos são realizados instantaneamente no seu navegador.`,
        q2: `Esta calculadora é gratuita?`,
        a2: `Sim, todas as nossas calculadoras são completamente gratuitas. Nenhum registro ou pagamento necessário.`,
        q3: `Os cálculos são precisos?`,
        a3: `Nossas calculadoras usam fórmulas padrão da indústria e são minuciosamente testadas para precisão. No entanto, os resultados devem ser usados apenas para fins informativos.`
      },
      fr: {
        q1: `Comment utiliser la ${calculatorContent?.title}?`,
        a1: `Entrez vos valeurs dans les champs de saisie ci-dessus, et la calculatrice calculera automatiquement les résultats. Tous les calculs sont effectués instantanément dans votre navigateur.`,
        q2: `Cette calculatrice est-elle gratuite?`,
        a2: `Oui, toutes nos calculatrices sont entièrement gratuites. Aucune inscription ou paiement requis.`,
        q3: `Les calculs sont-ils précis?`,
        a3: `Nos calculatrices utilisent des formules standard de l'industrie et sont rigoureusement testées pour la précision. Cependant, les résultats doivent être utilisés à titre informatif uniquement.`
      },
      de: {
        q1: `Wie verwende ich den ${calculatorContent?.title}?`,
        a1: `Geben Sie Ihre Werte in die Eingabefelder oben ein, und der Rechner berechnet automatisch die Ergebnisse. Alle Berechnungen werden sofort in Ihrem Browser durchgeführt.`,
        q2: `Ist dieser Rechner kostenlos?`,
        a2: `Ja, alle unsere Rechner sind völlig kostenlos. Keine Registrierung oder Zahlung erforderlich.`,
        q3: `Sind die Berechnungen genau?`,
        a3: `Unsere Rechner verwenden branchenübliche Formeln und sind gründlich auf Genauigkeit getestet. Die Ergebnisse sollten jedoch nur zu Informationszwecken verwendet werden.`
      },
      nl: {
        q1: `Hoe gebruik ik de ${calculatorContent?.title}?`,
        a1: `Voer uw waarden in de invoervelden hierboven in, en de rekenmachine berekent automatisch de resultaten. Alle berekeningen worden direct in uw browser uitgevoerd.`,
        q2: `Is deze rekenmachine gratis?`,
        a2: `Ja, al onze rekenmachines zijn volledig gratis. Geen registratie of betaling vereist.`,
        q3: `Zijn de berekeningen nauwkeurig?`,
        a3: `Onze rekenmachines gebruiken industriestandaard formules en zijn grondig getest op nauwkeurigheid. Resultaten moeten echter alleen voor informatieve doeleinden worden gebruikt.`
      }
    };

    const faq = faqTranslations[lang] || faqTranslations.en;

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": faq.q1,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a1
          }
        },
        {
          "@type": "Question",
          "name": faq.q2,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a2
          }
        },
        {
          "@type": "Question",
          "name": faq.q3,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a3
          }
        }
      ]
    };
  };

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
      'calculator.notFound': { es: 'Calculadora no encontrada', pt: 'Calculadora não encontrada', fr: 'Calculatrice introuvable', de: 'Rechner nicht gefunden', nl: 'Rekenmachine niet gevonden', en: 'Calculator not found' },
      'calculator.loading': { es: 'Cargando calculadora...', pt: 'Carregando calculadora...', fr: 'Chargement de la calculatrice...', de: 'Rechner wird geladen...', nl: 'Rekenmachine laden...', en: 'Loading calculator...' },
      'calculator.backToHomepage': { es: '← Volver a la página de inicio', pt: '← Voltar à página inicial', fr: '← Retour à la page d\'accueil', de: '← Zurück zur Startseite', nl: '← Terug naar startpagina', en: '← Back to homepage' }
    };

    return translations[key]?.[lang] || fallback || key;
  };

  // For SSG pages, set language synchronously to ensure correct translations
  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  // Track when client-side JavaScript has loaded
  useEffect(() => {
    setIsClient(true);
  }, []);

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

  // Load calculator content and related calculators
  useEffect(() => {
    if (calculatorContent && relatedCalculators.length > 0) return; // Already loaded

    try {
      // Use initialCalculatorContent and initialRelatedCalculators (should always be provided now)
      let content = initialCalculatorContent;
      let related = initialRelatedCalculators || [];

      // If no related calculators provided, get them from the relationships mapping
      if (related.length === 0) {
        related = getRelatedCalculators(slug, lang, 20) as any[];
      }

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{tLang('calculator.notFound', 'Calculator not found')}</h1>
          <p className="text-gray-600 mb-8">{lang === 'en' ? 'The calculator you\'re looking for doesn\'t exist or may have been moved.' : lang === 'es' ? 'La calculadora que buscas no existe o puede haber sido movida.' : lang === 'pt' ? 'A calculadora que você está procurando não existe ou pode ter sido movida.' : lang === 'fr' ? 'La calculatrice que vous recherchez n\'existe pas ou peut avoir été déplacée.' : lang === 'de' ? 'Der gesuchte Rechner existiert nicht oder wurde möglicherweise verschoben.' : 'De rekenmachine die je zoekt bestaat niet of is mogelijk verplaatst.'}</p>
          <div className="flex flex-col gap-3">
            <a href={`/${lang}`} className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
              {tLang('calculator.backToHomepage', '← Back to homepage')}
            </a>
            <a href={`/${lang}/categories/financial`} className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg transition-colors">
              {lang === 'en' ? 'Browse Calculators' : lang === 'es' ? 'Explorar Calculadoras' : lang === 'pt' ? 'Procurar Calculadoras' : lang === 'fr' ? 'Parcourir les Calculatrices' : lang === 'de' ? 'Rechner durchsuchen' : 'Rekenmachines bekijken'}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
                      No calculators found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <BreadcrumbNavigation breadcrumbs={breadcrumbs} currentLang={lang} />
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-2 sm:py-4" id="calculator-hero">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 leading-tight">
              {(() => {
                const titleText = calculatorContent.seoTitle || calculatorContent.title;
                if (titleText.includes(' - ')) {
                  const [mainTitle, subtitle] = titleText.split(' - ');
                  return (
                    <>
                      <span className="block">{mainTitle}</span>
                      <span className="block text-base sm:text-lg md:text-xl font-normal mt-1">{subtitle}</span>
                    </>
                  );
                }
                return titleText;
              })()}
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Description - Hidden visually but available for SEO */}
      <section className="sr-only" id="calculator-description">
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
            <section id="calculator-section" className="overflow-hidden mb-6">
              <div>
                {/* Server-rendered form for SEO - visible until JS loads */}
                {!isClient && serverRenderedForm && (
                  <div className="calculator-ssr-wrapper">
                    {serverRenderedForm}
                    <noscript>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4 text-center">
                        <p className="text-blue-800 text-sm">
                          {lang === 'en' ? 'Enable JavaScript for interactive calculations' : 
                           lang === 'es' ? 'Habilite JavaScript para cálculos interactivos' :
                           lang === 'pt' ? 'Ative o JavaScript para cálculos interativos' :
                           lang === 'fr' ? 'Activez JavaScript pour les calculs interactifs' :
                           lang === 'de' ? 'Aktivieren Sie JavaScript für interaktive Berechnungen' :
                           'Schakel JavaScript in voor interactieve berekeningen'}
                        </p>
                      </div>
                    </noscript>
                  </div>
                )}
                
                {/* Client-side interactive calculator - only after JS loads */}
                {isClient && (() => {
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
                          lang={lang}
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
              <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h2 className="text-sm sm:text-base md:text-lg font-bold text-white">{tLang('calculator.completeGuide')}</h2>
                </div>
              </div>
              <div className="p-4 sm:p-6 md:p-8">
                {(() => {
                  // Use pre-generated structured SEO content if available
                  if (seoContent) {
                    // Render the structured SEO content
                    return (
                      <div className="space-y-4 sm:space-y-6">
                        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                          {tLang('calculator.howDoesWork')} {calculatorContent?.title || 'Calculator'} Work?
                        </h2>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: renderStructuredSEOContent(seoContent, lang)
                          }}
                        />
                      </div>
                    );
                  } else {
                    return (
                      <div className="text-center py-6 sm:py-8 text-gray-500">
                        <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-2">{tLang('calculator.howDoesWork')} {calculatorContent?.title || 'Calculator'} Work?</h2>
                        <p className="mt-2 text-sm sm:text-base">{tLang('calculator.guideComingSoon')}</p>
                      </div>
                    );
                  }
                })()}
              </div>
            </section>
            

            {/* Related Calculators Widget */}
            <RelatedCalculatorsWidget 
              calculators={relatedCalculators} 
              currentCalculatorName={calculatorContent?.title}
              lang={lang}
            />

            {/* Internal Linking - Explore More Calculators */}
            {calculatorContent && (
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
            )}

        </div>
      </main>

      {/* FAQ Schema for SEO */}
      {calculatorContent && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFAQSchema())
          }}
        />
      )}

    </div>
  );
}
