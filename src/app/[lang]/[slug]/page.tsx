import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CalculatorStaticContent from '@/components/CalculatorStaticContent';
import CalculatorInteractive from './CalculatorInteractive';
import CalculatorFormSSR from '@/components/CalculatorFormSSR';
import { generateCalculatorSchema, CalculatorData } from '@/lib/seoContentRenderer';
import { loadCalculatorContent } from '@/lib/contentRegistry';
import { loadAllCalculatorsStatic, getFilenameForSlug } from '@/lib/staticDataLoader';
import { CALCULATOR_CATEGORIES } from '@/lib/categoryUtils';
import { StructuredData } from '@/components/StructuredData';
import DE_NL_SELECTED_CALCULATORS from '@/lib/DE_NL_SELECTED_CALCULATORS.json';
import fs from 'fs';
import path from 'path';

// Generate static params for all language + calculator combinations
export async function generateStaticParams() {
  const { getAllCalculatorSlugs } = await import('@/lib/staticDataLoader');
  
  const languages = ['en', 'es', 'pt', 'fr', 'de', 'nl'];
  const slugs = getAllCalculatorSlugs();
  
  const params: Array<{ lang: string; slug: string }> = [];
  
  for (const lang of languages) {
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }
  
  return params;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { lang, slug } = resolvedParams;

  // Only allow calculators for languages with content (en, es, pt, fr, de, nl)
  const supportedLanguages = ['en', 'es', 'pt', 'fr', 'de', 'nl'];
  if (!supportedLanguages.includes(lang)) {
    return {};
  }

  // For non-English pages, we need to determine if slug is translated or English
  // For now, assume slug is always English (we'll fix slug translation later)
  const enSlug = slug;

  // Get calculator data for schema generation
  const calculatorContent = loadCalculatorContent(lang, enSlug);
  let calculatorSchema = null;

  if (calculatorContent && calculatorContent.title) {
    const calculatorData: CalculatorData = {
      title: calculatorContent.title,
      seoTitle: calculatorContent.seoTitle || calculatorContent.title,
      slug: calculatorContent.slug || enSlug,
      category: calculatorContent.category || 'financial',
      seoContent: calculatorContent.seoContent || {} as any
    };

    calculatorSchema = generateCalculatorSchema(calculatorData, lang);
  }

  const canonicalUrl = `https://quick-calculator.org/${lang}/${slug}`;

  // Check if this calculator is in the DE/NL selected list
  const hasDeNlSupport = DE_NL_SELECTED_CALCULATORS.calculators.includes(enSlug);

  // Build hreflang alternates - only include de/nl if calculator is in selected list
  const languages: Record<string, string> = {
    'en': `https://quick-calculator.org/en/${slug}`,
    'es': `https://quick-calculator.org/es/${slug}`,
    'fr': `https://quick-calculator.org/fr/${slug}`,
    'pt': `https://quick-calculator.org/pt/${slug}`,
    'x-default': `https://quick-calculator.org/en/${slug}`,
  };

  // Only add de/nl if this calculator is in the selected list
  if (hasDeNlSupport) {
    languages['de'] = `https://quick-calculator.org/de/${slug}`;
    languages['nl'] = `https://quick-calculator.org/nl/${slug}`;
  }

  const metadata: Metadata = {
    title: calculatorContent?.seoTitle || calculatorContent?.title || 'Free Online Calculators',
    description: calculatorContent?.metaDescription || 'Free online calculators for math, finance, health, and more.',
    alternates: {
      canonical: canonicalUrl,
      languages,
    }
  };

  if (calculatorSchema) {
    metadata.other = {
      'application/ld+json': JSON.stringify(calculatorSchema)
    };
  }

  return metadata;
}

export default async function LangCalculatorPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const resolvedParams = await params;
  const { lang, slug } = resolvedParams;

  // Calculators only available for en, es, pt, fr, de, nl
  const supportedLanguages = ['en', 'es', 'pt', 'fr', 'de', 'nl'];
  if (!supportedLanguages.includes(lang)) {
    notFound();
  }

  // slug is already the English slug from static params
  const enSlug = slug;

  // Generate schema for client component
  const calculatorContent = loadCalculatorContent(lang, enSlug);
  
  if (!calculatorContent || !calculatorContent.title) {
    notFound();
  }

  let calculatorSchema = null;

  if (calculatorContent && calculatorContent.title) {
    const calculatorData: CalculatorData = {
      title: calculatorContent.title,
      seoTitle: calculatorContent.seoTitle || calculatorContent.title,
      slug: calculatorContent.slug || enSlug,
      category: calculatorContent.category || 'financial',
      seoContent: calculatorContent.seoContent || {} as any
    };

    calculatorSchema = generateCalculatorSchema(calculatorData, lang);
  }

  // Get calculator category
  const calculatorCategory = (CALCULATOR_CATEGORIES as any)[slug] || 'utility';

  // Load related calculators
  const allCalculators = loadAllCalculatorsStatic(lang);
  const relatedCalculators: any[] = [];
  const uniqueCalculators: any[] = [];
  const seenSlugs = new Set<string>();

  for (const calculator of allCalculators) {
    if (calculator.slug !== slug && !seenSlugs.has(calculator.slug)) {
      uniqueCalculators.push({
        name: calculator.name,
        slug: calculator.slug,
        summary: calculator.summary || 'Calculate various metrics',
        icon: 'calculator',
        difficulty: 'basic',
        featured: false
      });
      seenSlugs.add(calculator.slug);
      if (uniqueCalculators.length >= 20) break;
    }
  }
  relatedCalculators.push(...uniqueCalculators);

  // Generate breadcrumbs
  const homeNames = { en: 'Home', es: 'Inicio', pt: 'Início', fr: 'Accueil', de: 'Startseite', nl: 'Home' };
  const categoryNames = {
    financial: { en: 'Financial Calculators', es: 'Calculadoras Financieras', pt: 'Calculadoras Financeiras', fr: 'Calculateurs Financiers', de: 'Finanzrechner', nl: 'Financiële Rekenmachines' },
    health: { en: 'Health & Fitness Calculators', es: 'Calculadoras de Salud y Fitness', pt: 'Calculadoras de Saúde e Fitness', fr: 'Calculateurs Santé et Fitness', de: 'Gesundheits- und Fitnessrechner', nl: 'Gezondheids- en Fitness Rekenmachines' },
    math: { en: 'Math Calculators', es: 'Calculadoras Matemáticas', pt: 'Calculadoras Matemáticas', fr: 'Calculateurs Mathématiques', de: 'Mathematische Rechner', nl: 'Wiskundige Rekenmachines' },
    utility: { en: 'Utility Calculators', es: 'Calculadoras de Utilidad', pt: 'Calculadoras de Utilitários', fr: 'Calculateurs Utilitaires', de: 'Nützliche Rechner', nl: 'Hulpmiddel Rekenmachines' },
    lifestyle: { en: 'Lifestyle Calculators', es: 'Calculadoras de Estilo de Vida', pt: 'Calculadoras de Estilo de Vida', fr: 'Calculateurs Style de Vie', de: 'Lebensstil Rechner', nl: 'Levensstijl Rekenmachines' }
  };

  const homeName = homeNames[lang as keyof typeof homeNames] || 'Home';
  const categoryName = categoryNames[calculatorCategory as keyof typeof categoryNames]?.[lang as keyof typeof categoryNames.financial] || calculatorCategory;
  const calculatorName = calculatorContent?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const breadcrumbs = [
    { name: homeName, href: `/${lang}` },
    { name: categoryName, href: `/${lang}/categories/${calculatorCategory}` },
    { name: calculatorName, href: `/${lang}/${slug}` }
  ];

  // Create server-rendered form
  const serverRenderedForm = calculatorContent?.calculatorComponent ? (
    <CalculatorFormSSR
      inputs={calculatorContent.calculatorComponent.inputs || []}
      formula={calculatorContent.calculatorComponent.formula}
      output={calculatorContent.calculatorComponent.output}
      additionalOutputs={calculatorContent.calculatorComponent.additionalOutputs}
      lang={lang}
      calculatorName={calculatorContent.title}
    />
  ) : null;

  const seoContent = calculatorContent?.seoContent;

  // Generate FAQ schema for SEO
  const generateFAQSchema = () => {
    const faqTranslations: Record<string, any> = {
      en: {
        q1: `How do I use the ${calculatorContent?.title}?`,
        a1: `Enter your values in the input fields, and the calculator will automatically compute the results. All calculations are performed instantly in your browser.`,
        q2: `Is this calculator free to use?`,
        a2: `Yes, all our calculators are completely free to use. No registration or payment required.`,
        q3: `Are the calculations accurate?`,
        a3: `Our calculators use industry-standard formulas and are thoroughly tested for accuracy. However, results should be used for informational purposes only.`
      },
      es: {
        q1: `¿Cómo uso la ${calculatorContent?.title}?`,
        a1: `Ingrese sus valores en los campos de entrada, y la calculadora calculará automáticamente los resultados. Todos los cálculos se realizan instantáneamente en su navegador.`,
        q2: `¿Es gratis usar esta calculadora?`,
        a2: `Sí, todas nuestras calculadoras son completamente gratuitas. No se requiere registro ni pago.`,
        q3: `¿Son precisos los cálculos?`,
        a3: `Nuestras calculadoras utilizan fórmulas estándar de la industria y están exhaustivamente probadas para precisión. Sin embargo, los resultados deben usarse solo con fines informativos.`
      },
      pt: {
        q1: `Como uso a ${calculatorContent?.title}?`,
        a1: `Digite seus valores nos campos de entrada, e a calculadora computará automaticamente os resultados. Todos os cálculos são realizados instantaneamente no seu navegador.`,
        q2: `Esta calculadora é gratuita?`,
        a2: `Sim, todas as nossas calculadoras são completamente gratuitas. Nenhum registro ou pagamento necessário.`,
        q3: `Os cálculos são precisos?`,
        a3: `Nossas calculadoras usam fórmulas padrão da indústria e são minuciosamente testadas para precisão. No entanto, os resultados devem ser usados apenas para fins informativos.`
      },
      fr: {
        q1: `Comment utiliser la ${calculatorContent?.title}?`,
        a1: `Entrez vos valeurs dans les champs de saisie, et la calculatrice calculera automatiquement les résultats. Tous les calculs sont effectués instantanément dans votre navigateur.`,
        q2: `Cette calculatrice est-elle gratuite?`,
        a2: `Oui, toutes nos calculatrices sont entièrement gratuites. Aucune inscription ou paiement requis.`,
        q3: `Les calculs sont-ils précis?`,
        a3: `Nos calculatrices utilisent des formules standard de l'industrie et sont rigoureusement testées pour la précision. Cependant, les résultats doivent être utilisés à titre informatif uniquement.`
      },
      de: {
        q1: `Wie verwende ich den ${calculatorContent?.title}?`,
        a1: `Geben Sie Ihre Werte in die Eingabefelder ein, und der Rechner berechnet automatisch die Ergebnisse. Alle Berechnungen werden sofort in Ihrem Browser durchgeführt.`,
        q2: `Ist dieser Rechner kostenlos?`,
        a2: `Ja, alle unsere Rechner sind völlig kostenlos. Keine Registrierung oder Zahlung erforderlich.`,
        q3: `Sind die Berechnungen genau?`,
        a3: `Unsere Rechner verwenden branchenübliche Formeln und sind gründlich auf Genauigkeit getestet. Die Ergebnisse sollten jedoch nur zu Informationszwecken verwendet werden.`
      },
      nl: {
        q1: `Hoe gebruik ik de ${calculatorContent?.title}?`,
        a1: `Voer uw waarden in de invoervelden in, en de rekenmachine berekent automatisch de resultaten. Alle berekeningen worden direct in uw browser uitgevoerd.`,
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

  const faqSchema = generateFAQSchema();

  return (
    <div className="min-h-screen bg-gray-50">
      {calculatorSchema && <StructuredData data={calculatorSchema} />}
      {faqSchema && <StructuredData data={faqSchema} />}
      <Header currentLang={lang} />
      
      {/* Static content rendered at build time - visible to Google */}
      <CalculatorStaticContent
        lang={lang}
        calculatorContent={calculatorContent}
        seoContent={seoContent}
        breadcrumbs={breadcrumbs}
        serverRenderedForm={serverRenderedForm || <div />}
      />

      {/* Interactive features loaded client-side */}
      <CalculatorInteractive 
        lang={lang}
        slug={enSlug}
        calculatorContent={calculatorContent}
        relatedCalculators={relatedCalculators}
      />
      
      <Footer currentLang={lang} />
    </div>
  );
}
