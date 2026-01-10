import React from 'react';
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LangCalculatorClient from './LangCalculatorClient';
import { generateCalculatorSchema, CalculatorData } from '@/lib/seoContentRenderer';
import { loadCalculatorContent } from '@/lib/contentRegistry';

// Generate static params for all language + calculator combinations
export async function generateStaticParams() {
  const languages = ['en', 'es', 'pt', 'fr'];
  const calculators = [
    'advanced-loan-calculator',
    'bmi-calculator',
    'budget-calculator',
    'car-insurance-calculator',
    'car-loan-calculator',
    'compound-interest-calculator',
    'concrete-calculator',
    'credit-card-calculator',
    'crypto-roi-calculator',
    'currency-converter',
    'debt-consolidation-calculator',
    'emi-calculator',
    'equal-principal-amortization-calculator',
    'apr-calculator',
    'ear-calculator',
    'effective-interest-rate-calculator',
    'interest-rate-table-calculator',
    'basic-apr-calculator',
    'nominal-interest-rate-calculator',
    'periodic-interest-rate-calculator',
    'equivalent-interest-rate-calculator',
    'expense-calculator',
    'feet-inches-calculator',
    'fraction-calculator',
    'future-value-calculator',
    'gpa-calculator',
    'health-insurance-calculator',
      'hourly-to-salary-calculator',
      'salary-calculator',
      'overtime-pay-calculator',
      'net-income-calculator',
      'take-home-pay-calculator',
      'income-tax-calculator',
      'protein-intake-calculator',
      'water-intake-calculator',
      'lean-body-mass-calculator',
      'maintenance-calories-calculator',
      'tdee-calculator',
      'waist-to-hip-ratio-calculator',
    'inflation-calculator',
    'interest-only-mortgage-calculator',
    'investment-calculator',
    'life-insurance-calculator',
    'loan-calculator',
    'loan-payment-table-generator',
    'mean-median-mode-calculator',
    'mortgage-calculator',
    'numbers-to-words-converter',
    'paycheck-calculator',
    'percent-calculator',
    'percentage-change-calculator',
    'property-tax-calculator',
    'ratio-calculator',
    'retirement-calculator',
    'sales-tax-calculator',
    'savings-calculator',
    'simple-interest-calculator',
    'square-footage-calculator',
    'standard-deviation-calculator',
    'stock-return-calculator',
    'tank-volume-calculator',
    'tax-calculator',
    'word-counter-calculator',
    'scientific-calculator',
    'percentage-calculator',
    'average-calculator',
    'interest-calculator',
    'age-calculator',
    'unit-conversion-calculator',
    'tip-calculator',
    'password-generator-calculator',
    'date-calculator',
    'bmr-calculator',
    'body-fat-calculator',
    'calorie-calculator',
    'ideal-weight-calculator',
    'circle-area-calculator',
    'circle-circumference-calculator',
    'triangle-area-calculator',
    'pythagorean-theorem-calculator',
    'volume-calculator',
    'surface-area-calculator',
    'quadratic-equation-calculator',
    'loan-affordability-calculator',
    'car-affordability-calculator',
    'home-affordability-calculator',
    'amortization-schedule-calculator',
    'debt-ratios-calculator',
    'liquidity-ratios-calculator',
    'operations-ratios-calculator',
    'profitability-ratios-calculator',
    'stock-ratios-calculator'
  ];

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
