import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LangCalculatorClient from './LangCalculatorClient';
import { generateCalculatorSchema, CalculatorData } from '@/lib/seoContentRenderer';
import { loadCalculatorContent } from '@/lib/contentRegistry';
import { StructuredData } from '@/components/StructuredData';

// Generate static params for all language + calculator combinations
export async function generateStaticParams() {
  const { getAllCalculatorSlugs } = await import('@/lib/staticDataLoader');
  
  const languages = ['en', 'es', 'pt', 'fr'];
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

  // For non-English pages, we need to determine if slug is translated or English
  // For now, assume slug is always English (we'll fix slug translation later)
  const enSlug = slug;

  // Get calculator data for schema generation
  const calculatorContent = loadCalculatorContent(lang, enSlug);
  let calculatorSchema = null;

  if (calculatorContent && calculatorContent.title) {
    const calculatorData: CalculatorData = {
      title: calculatorContent.title,
      slug: calculatorContent.slug || enSlug,
      category: calculatorContent.category || 'financial',
      seoContent: calculatorContent.seoContent || {} as any
    };

    calculatorSchema = generateCalculatorSchema(calculatorData, lang);
  }

  const canonicalUrl = lang === 'en' ? `https://quick-calculator.org/${slug}` : `https://quick-calculator.org/${lang}/${slug}`;

  const metadata: Metadata = {
    title: calculatorContent?.seoTitle || calculatorContent?.title || 'Free Online Calculators',
    description: calculatorContent?.metaDescription || 'Free online calculators for math, finance, health, and more.',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `https://quick-calculator.org/${slug}`,
        'es': `https://quick-calculator.org/es/${slug}`,
        'fr': `https://quick-calculator.org/fr/${slug}`,
        'pt': `https://quick-calculator.org/pt/${slug}`,
        'x-default': `https://quick-calculator.org/${slug}`,
      },
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

  // slug is already the English slug from static params
  const enSlug = slug;

  // Generate schema for client component
  const calculatorContent = loadCalculatorContent(lang, enSlug);
  let calculatorSchema = null;

  if (calculatorContent && calculatorContent.title) {
    const calculatorData: CalculatorData = {
      title: calculatorContent.title,
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
