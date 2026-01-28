import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';
// Direct breadcrumb generation
import { generateCategorySchema, CategoryData } from '@/lib/seoContentRenderer';
import { getCategoryData } from '@/lib/categoryUtils';
import { loadCalculatorsByCategory } from '@/lib/staticDataLoader';
import CategoryPageClient from '@/app/categories/[slug]/CategoryPageClient';

// Valid languages and categories
const validLanguages = ['en', 'es', 'pt', 'fr'];
const validCategories = ['financial', 'health', 'math', 'utility', 'lifestyle'];

export async function generateStaticParams() {
  const params = [];

  // Generate all combinations of languages and categories
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

// Generate metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { lang, category } = await params;

  if (!validLanguages.includes(lang) || !validCategories.includes(category)) {
    return {};
  }

  // Get category data for schema generation
  const categoryData = getCategoryData(category, lang);
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
        'fr': `https://quick-calculator.org/fr/categories/${category}`,
        'pt': `https://quick-calculator.org/pt/categories/${category}`,
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
  const homeNames = { en: 'Home', es: 'Inicio', pt: 'Início', fr: 'Accueil' };
  const categoryNames = {
    financial: { en: 'Financial Calculators', es: 'Calculadoras Financieras', pt: 'Calculadoras Financeiras', fr: 'Calculateurs Financiers' },
    health: { en: 'Health & Fitness Calculators', es: 'Calculadoras de Salud y Fitness', pt: 'Calculadoras de Saúde e Fitness', fr: 'Calculateurs Santé et Fitness' },
    math: { en: 'Math Calculators', es: 'Calculadoras Matemáticas', pt: 'Calculadoras Matemáticas', fr: 'Calculateurs Mathématiques' },
    utility: { en: 'Utility Calculators', es: 'Calculadoras de Utilidad', pt: 'Calculadoras de Utilitários', fr: 'Calculateurs Utilitaires' },
    lifestyle: { en: 'Lifestyle Calculators', es: 'Calculadoras de Estilo de Vida', pt: 'Calculadoras de Estilo de Vida', fr: 'Calculateurs Style de Vie' }
  };

  const homeName = homeNames[lang as keyof typeof homeNames] || 'Home';
  const categoryName = categoryNames[category as keyof typeof categoryNames]?.[lang as keyof typeof categoryNames.financial] || category;

  const breadcrumbs = [
    { name: homeName, href: lang === 'en' ? '/' : `/${lang}` },
    { name: categoryName, href: lang === 'en' ? `/categories/${category}` : `/${lang}/categories/${category}` }
  ];

  // Load ALL calculators for this category at BUILD TIME
  const categoryCalculators = loadCalculatorsByCategory(lang, category);
  
  // Get category data for title and description
  const categoryData = getCategoryData(category, lang);

  return (
    <div className="min-h-screen bg-gray-50">
        <Header currentLang={lang} />

        <BreadcrumbNavigation breadcrumbs={breadcrumbs} currentLang={lang} />

        <CategoryPageClient 
          lang={lang} 
          category={category}
          initialCalculators={categoryCalculators}
          categoryData={categoryData}
        />

        <Footer currentLang={lang} />
      </div>
  );
}
