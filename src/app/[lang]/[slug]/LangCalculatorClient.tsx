import CalculatorPageClient from '@/components/CalculatorPageClient';
import fs from 'fs';
import path from 'path';
import { CALCULATOR_CATEGORIES } from '@/lib/categoryUtils';
import { getFilenameForSlug } from '@/lib/staticDataLoader';
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
    console.log(`LangCalculatorClient: Loaded seoContent for ${slug} (${lang}):`, !!seoContent, 'Keys:', seoContent ? Object.keys(seoContent) : 'none');

    // Load related calculators (simple implementation)
    const relatedSlugs = calculatorContent?.relatedCalculators || [];
    for (const relatedSlug of relatedSlugs.slice(0, 6)) { // Limit to 6
      try {
        const relatedFilename = getFilenameForSlug(relatedSlug);
        const relatedFilePath = path.join(process.cwd(), 'content', 'calculators', `${relatedFilename}.json`);
        const relatedFileContent = fs.readFileSync(relatedFilePath, 'utf-8');
        const relatedData = JSON.parse(relatedFileContent);
        const relatedContent = relatedData[lang];
        if (relatedContent && relatedContent.title) {
          relatedCalculators.push({
            name: relatedContent.title,
            slug: relatedContent.slug || relatedSlug,
            summary: relatedContent.summary || relatedContent.description || 'Calculate various metrics',
            icon: 'calculator', // Default icon
            difficulty: relatedContent.difficulty || 'basic',
            featured: false
          });
        }
      } catch (error) {
        // Skip if related calculator can't be loaded
        console.warn(`Could not load related calculator: ${relatedSlug}`);
      }
    }
  } catch (error) {
    console.error('Failed to load calculator content:', error);
  }

  // Generate breadcrumbs directly - Home → Category → Calculator
  const homeNames = { en: 'Home', es: 'Inicio', pt: 'Início', fr: 'Accueil' };
  const categoryNames = {
    financial: { en: 'Financial Calculators', es: 'Calculadoras Financieras', pt: 'Calculadoras Financeiras', fr: 'Calculateurs Financiers' },
    health: { en: 'Health & Fitness Calculators', es: 'Calculadoras de Salud y Fitness', pt: 'Calculadoras de Saúde e Fitness', fr: 'Calculateurs Santé et Fitness' },
    math: { en: 'Math Calculators', es: 'Calculadoras Matemáticas', pt: 'Calculadoras Matemáticas', fr: 'Calculateurs Mathématiques' },
    utility: { en: 'Utility Calculators', es: 'Calculadoras de Utilidad', pt: 'Calculadoras de Utilitários', fr: 'Calculateurs Utilitaires' },
    lifestyle: { en: 'Lifestyle Calculators', es: 'Calculadoras de Estilo de Vida', pt: 'Calculadoras de Estilo de Vida', fr: 'Calculateurs Style de Vie' }
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
