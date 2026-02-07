import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
import { StructuredData } from '@/components/StructuredData';
// Direct breadcrumb generation
import { generateCategorySchema, CategoryData } from '@/lib/seoContentRenderer';
import { getCategoryData } from '@/lib/categoryUtils';
import { loadCalculatorsByCategory, loadAllCalculatorsStatic } from '@/lib/staticDataLoader';
import CategoryPageClient from '@/app/categories/[slug]/CategoryPageClient';

// Valid languages and categories
// Generate for all languages: en, es, pt, fr (with all calculators) and de, nl (with selected calculators)
const validLanguages = ['en', 'es', 'pt', 'fr', 'de', 'nl'];
const validCategories = ['financial', 'health', 'math', 'utility', 'lifestyle'];

export async function generateStaticParams() {
  const params = [];

  // Generate all combinations of languages and categories (all 6 languages)
  for (const lang of validLanguages) {
    for (const category of validCategories) {
      params.push({
        lang,
        category
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { lang, category } = await params;

  if (!validLanguages.includes(lang) || !validCategories.includes(category)) {
    return {};
  }

  // Get category data for schema generation
  const categoryData = getCategoryData(lang, category);
  let categorySchema = null;

  if (categoryData) {
    const categorySchemaData: CategoryData = {
      name: categoryData.title,
      slug: category,
      description: categoryData.description,
      calculators: categoryData.calculators.map(calc => ({
        name: calc.name,
        slug: calc.slug
      }))
    };

    // Generate schema
    categorySchema = generateCategorySchema(categorySchemaData, lang);
  }

  const canonicalUrl = lang === 'en' ? `https://quick-calculator.org/categories/${category}` : `https://quick-calculator.org/${lang}/categories/${category}`;

  const metadata: Metadata = {
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `https://quick-calculator.org/categories/${category}`,
        'es': `https://quick-calculator.org/es/categories/${category}`,
        'pt': `https://quick-calculator.org/pt/categories/${category}`,
        'fr': `https://quick-calculator.org/fr/categories/${category}`,
        'de': `https://quick-calculator.org/de/categories/${category}`,
        'nl': `https://quick-calculator.org/nl/categories/${category}`,
        'x-default': `https://quick-calculator.org/categories/${category}`,
      },
    }
  };

  if (categorySchema) {
    metadata.other = {
      'application/ld+json': JSON.stringify(categorySchema)
    };
  }

  return metadata;
}

interface CategoryPageProps {
  params: Promise<{
    lang: string;
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { lang, category } = await params;

  // Validate language
  if (!validLanguages.includes(lang)) {
    notFound();
  }

  // Validate category exists
  if (!validCategories.includes(category)) {
    notFound();
  }

  // Generate breadcrumbs directly - Home → Category
  const homeNames = { en: 'Home', es: 'Inicio', pt: 'Início', fr: 'Accueil', de: 'Startseite', nl: 'Home' };
  const categoryNames = {
    financial: { en: 'Financial Calculators', es: 'Calculadoras Financieras', pt: 'Calculadoras Financeiras', fr: 'Calculateurs Financiers', de: 'Finanzrechner', nl: 'Financiële Rekenmachines' },
    health: { en: 'Health & Fitness Calculators', es: 'Calculadoras de Salud y Fitness', pt: 'Calculadoras de Saúde e Fitness', fr: 'Calculateurs Santé et Fitness', de: 'Gesundheits- & Fitness-Rechner', nl: 'Gezondheids- & Fitness-Rekenmachines' },
    math: { en: 'Math Calculators', es: 'Calculadoras Matemáticas', pt: 'Calculadoras Matemáticas', fr: 'Calculateurs Mathématiques', de: 'Mathematikrechner', nl: 'Wiskundige Rekenmachines' },
    utility: { en: 'Utility Calculators', es: 'Calculadoras de Utilidad', pt: 'Calculadoras de Utilitários', fr: 'Calculateurs Utilitaires', de: 'Nützlichkeitsrechner', nl: 'Hulpmiddel Rekenmachines' },
    lifestyle: { en: 'Lifestyle Calculators', es: 'Calculadoras de Estilo de Vida', pt: 'Calculadoras de Estilo de Vida', fr: 'Calculateurs Style de Vie', de: 'Lebensstil-Rechner', nl: 'Levensstijl Rekenmachines' }
  };

  const homeName = homeNames[lang as keyof typeof homeNames] || 'Home';
  const categoryName = categoryNames[category as keyof typeof categoryNames]?.[lang as keyof typeof categoryNames.financial] || category;

  const breadcrumbs = [
    { name: homeName, href: lang === 'en' ? '/' : `/${lang}` },
    { name: categoryName, href: lang === 'en' ? `/categories/${category}` : `/${lang}/categories/${category}` }
  ];

  // Load ALL calculators for this category at BUILD TIME
  const categoryCalculators = loadCalculatorsByCategory(lang, category);
  
  // Load ALL calculators from ALL categories for "Other Calculators" section
  const allCalculators = loadAllCalculatorsStatic(lang);
  
  // Get category data for title and description
  const categoryData = getCategoryData(lang, category);
  
  // Generate schema for rendering
  let categorySchema = null;
  if (categoryData) {
    const categorySchemaData: CategoryData = {
      name: categoryData.title,
      slug: category,
      description: categoryData.description,
      calculators: categoryData.calculators.map(calc => ({
        name: calc.name,
        slug: calc.slug
      }))
    };
    categorySchema = generateCategorySchema(categorySchemaData, lang);
  }

  return (
    <div className="min-h-screen bg-gray-50">
        {categorySchema && <StructuredData data={categorySchema} />}
        <Header currentLang={lang} />

        <BreadcrumbNavigation breadcrumbs={breadcrumbs} currentLang={lang} />

        <CategoryPageClient 
          lang={lang} 
          category={category}
          initialCalculators={categoryCalculators}
          allCalculators={allCalculators}
          categoryData={categoryData}
        />

        <Footer currentLang={lang} />
      </div>
  );
}
