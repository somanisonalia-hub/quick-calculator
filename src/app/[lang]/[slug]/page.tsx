import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LangCalculatorClient from './LangCalculatorClient';
import { generateCalculatorSchema, CalculatorData } from '@/lib/seoContentRenderer';
import { loadCalculatorContent } from '@/lib/contentRegistry';

// Generate static params for all language + calculator combinations
export async function generateStaticParams() {
  const { getAllCalculatorSlugs } = await import('@/lib/staticDataLoader');
  
  const languages = ['en', 'es', 'pt', 'fr'];
  const calculators = getAllCalculatorSlugs();

  const params = [];
  for (const lang of languages) {
    for (const calc of calculators) {
      params.push({
        lang,
        slug: calc
      });
    }
  }

  return params;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { lang, slug } = resolvedParams;

  // Get calculator data for schema generation
  const calculatorContent = loadCalculatorContent(lang, slug);
  let calculatorSchema = null;

  if (calculatorContent && calculatorContent.title) {
    const calculatorData: CalculatorData = {
      title: calculatorContent.title,
      slug: calculatorContent.slug || slug,
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentLang={lang} />
      <LangCalculatorClient lang={lang} slug={slug} />
      <Footer currentLang={lang} />
    </div>
  );
}
