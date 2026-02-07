import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LangCalculatorClient from './LangCalculatorClient';
import { generateCalculatorSchema, CalculatorData } from '@/lib/seoContentRenderer';
import { loadCalculatorContent } from '@/lib/contentRegistry';
import { StructuredData } from '@/components/StructuredData';
import DE_NL_SELECTED_CALCULATORS from '@/lib/DE_NL_SELECTED_CALCULATORS.json';

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

  return (
    <div className="min-h-screen bg-gray-50">
      {calculatorSchema && <StructuredData data={calculatorSchema} />}
      <Header currentLang={lang} />
      <LangCalculatorClient lang={lang} slug={enSlug} />
      <Footer currentLang={lang} />
    </div>
  );
}
