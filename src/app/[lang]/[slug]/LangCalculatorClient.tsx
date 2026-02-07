import CalculatorPageClient from '@/components/CalculatorPageClient';
import fs from 'fs';
import path from 'path';
import { CALCULATOR_CATEGORIES } from '@/lib/categoryUtils';
import { getFilenameForSlug, loadAllCalculatorsStatic } from '@/lib/staticDataLoader';
// Direct breadcrumb generation

interface LangCalculatorClientProps {
  lang: string;
  slug: string;
}

export default function LangCalculatorClient({ lang, slug }: LangCalculatorClientProps) {
  // Load calculator content, SEO content, and related calculators on server side
  let calculatorContent: any = null;
  let seoContent: any = null;
  const relatedCalculators: any[] = [];

  // Get calculator category
  const calculatorCategory = (CALCULATOR_CATEGORIES as any)[slug] || 'utility';

  try {
    // Map slug to filename
    const filename = getFilenameForSlug(slug);
    const filePath = path.join(process.cwd(), 'content', 'calculators', `${filename}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    calculatorContent = data[lang];
    seoContent = calculatorContent?.seoContent;

    // Load ALL calculators instead of just related ones
    const allCalculators = loadAllCalculatorsStatic(lang);
    const uniqueCalculators: any[] = [];
    const seenSlugs = new Set<string>();

    // Add all calculators from all categories to show variety
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
        if (uniqueCalculators.length >= 20) break; // Take first 20 of all calculators
      }
    }

    relatedCalculators.push(...uniqueCalculators);
  } catch (error) {
    console.error('Failed to load calculator content:', error);
  }

  // Generate breadcrumbs directly - Home → Category → Calculator
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

  return (
    <CalculatorPageClient
      lang={lang}
      slug={slug}
      initialCalculatorContent={calculatorContent}
      seoContent={seoContent}
      initialRelatedCalculators={relatedCalculators}
      breadcrumbs={breadcrumbs}
    />
  );
}
