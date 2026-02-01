import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import HomePageSimple from '@/components/HomePageSimple';
import { generateHomepageSchema } from '@/lib/seoContentRenderer';
import { loadAllCalculatorsStatic } from '@/lib/staticDataLoader';
import { StructuredData } from '@/components/StructuredData';

// Valid languages
const validLanguages = ['en', 'es', 'pt', 'fr'];

export async function generateStaticParams() {
  return validLanguages.map(lang => ({
    lang
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  if (!validLanguages.includes(lang)) {
    return {};
  }

  const homepageSchema = generateHomepageSchema(lang);
  const canonicalUrl = `https://quick-calculator.org/${lang}`;

  return {
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': 'https://quick-calculator.org/en',
        'es': 'https://quick-calculator.org/es',
        'fr': 'https://quick-calculator.org/fr',
        'pt': 'https://quick-calculator.org/pt',
        'x-default': 'https://quick-calculator.org/en',
      },
    },
    other: {
      'application/ld+json': JSON.stringify(homepageSchema)
    }
  };
}

interface HomePageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function DynamicHome({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  // Validate language
  if (!validLanguages.includes(lang)) {
    notFound();
  }

  // Load all calculators at BUILD TIME for static generation
  const allCalculators = loadAllCalculatorsStatic(lang);
  const homepageSchema = generateHomepageSchema(lang);

  return (
    <>
      <StructuredData data={homepageSchema} />
      <HomePageSimple language={lang} initialCalculators={allCalculators} />
    </>
  );
}