/**
 * Server Component for Static Calculator Content
 * Renders complete calculator page HTML at build time for SEO
 * This ensures Google and other crawlers see all content without JavaScript
 */

import { renderStructuredSEOContent, SEOContent } from '@/lib/seoContentRenderer';
import BreadcrumbNavigation from './BreadcrumbNavigation';

interface CalculatorStaticContentProps {
  lang: string;
  calculatorContent: any;
  seoContent?: SEOContent | null;
  breadcrumbs?: Array<{ name: string; href: string }>;
  serverRenderedForm: React.ReactNode;
  calculatorInteractive?: React.ReactNode;
}

export default function CalculatorStaticContent({ 
  lang, 
  calculatorContent,
  seoContent,
  breadcrumbs,
  serverRenderedForm,
  calculatorInteractive
}: CalculatorStaticContentProps) {
  
  return (
    <>
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

      {/* Calculator Description */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" id="calculator-description">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed text-center">
            {calculatorContent.description}
          </p>
        </div>
      </section>

      {/* Main Calculator Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 sm:pb-8" id="calculator-main">
        {/* Calculator Form - Visible to Google, hidden when interactive loads */}
        <section id="calculator-section" className="bg-white rounded-lg shadow-lg p-6 mb-8">
          {serverRenderedForm}
        </section>

        {/* Interactive Calculator - Replaces static when JS loads */}
        {calculatorInteractive}

        {/* SEO Content - How to Use, Examples, etc. */}
        {seoContent && (
          <section className="bg-gradient-to-br from-slate-50 to-white rounded-xl shadow-lg border border-slate-200 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex items-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h2 className="text-sm sm:text-base md:text-lg font-bold text-white">
                  {lang === 'en' ? 'Complete Guide' :
                   lang === 'es' ? 'Guía Completa' :
                   lang === 'pt' ? 'Guia Completo' :
                   lang === 'fr' ? 'Guide Complet' :
                   lang === 'de' ? 'Vollständiger Leitfaden' :
                   'Volledige Gids'}
                </h2>
              </div>
            </div>
            <div className="p-4 sm:p-6 md:p-8 prose prose-sm max-w-none">
              <div 
                dangerouslySetInnerHTML={{
                  __html: renderStructuredSEOContent(seoContent, lang)
                }}
              />
            </div>
          </section>
        )}

        {/* Additional Context for Google */}
        <section className="max-w-4xl mx-auto mt-8 prose prose-sm">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              {lang === 'en' ? 'About This Calculator' :
               lang === 'es' ? 'Acerca de Esta Calculadora' :
               lang === 'pt' ? 'Sobre Esta Calculadora' :
               lang === 'fr' ? 'À Propos de Cette Calculatrice' :
               lang === 'de' ? 'Über Diesen Rechner' :
               'Over Deze Rekenmachine'}
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {lang === 'en' ? `This ${calculatorContent.title} is a free online tool that helps you calculate results instantly. Simply enter your values in the input fields above, and the calculator will automatically compute the results using industry-standard formulas.` :
               lang === 'es' ? `Esta ${calculatorContent.title} es una herramienta en línea gratuita que le ayuda a calcular resultados al instante. Simplemente ingrese sus valores en los campos de entrada de arriba, y la calculadora calculará automáticamente los resultados utilizando fórmulas estándar de la industria.` :
               lang === 'pt' ? `Esta ${calculatorContent.title} é uma ferramenta online gratuita que ajuda você a calcular resultados instantaneamente. Basta inserir seus valores nos campos de entrada acima, e a calculadora calculará automaticamente os resultados usando fórmulas padrão da indústria.` :
               lang === 'fr' ? `Cette ${calculatorContent.title} est un outil en ligne gratuit qui vous aide à calculer les résultats instantanément. Entrez simplement vos valeurs dans les champs de saisie ci-dessus, et la calculatrice calculera automatiquement les résultats en utilisant des formules standard de l'industrie.` :
               lang === 'de' ? `Dieser ${calculatorContent.title} ist ein kostenloses Online-Tool, das Ihnen hilft, Ergebnisse sofort zu berechnen. Geben Sie einfach Ihre Werte in die Eingabefelder oben ein, und der Rechner berechnet automatisch die Ergebnisse mit branchenüblichen Formeln.` :
               `Deze ${calculatorContent.title} is een gratis online tool die u helpt resultaten direct te berekenen. Voer simpelweg uw waarden in de invoervelden hierboven in, en de rekenmachine berekent automatisch de resultaten met behulp van industriestandaard formules.`}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
