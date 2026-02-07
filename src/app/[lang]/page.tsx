import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import HomePageSimple from '@/components/HomePageSimple';
import { generateHomepageSchema } from '@/lib/seoContentRenderer';
import { loadAllCalculatorsStatic } from '@/lib/staticDataLoader';
import { StructuredData } from '@/components/StructuredData';

// Valid languages for homepage
// All 6 languages have UI support (de/nl don't have calculator content, but homepage is fine)
const validLanguages = ['en', 'es', 'pt', 'fr', 'de', 'nl'];

export async function generateStaticParams() {
  return validLanguages.map(lang => ({
    lang
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  const supportedLanguages = ['en', 'es', 'pt', 'fr', 'de', 'nl'];
  if (!supportedLanguages.includes(lang)) {
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
        'pt': 'https://quick-calculator.org/pt',
        'fr': 'https://quick-calculator.org/fr',
        'de': 'https://quick-calculator.org/de',
        'nl': 'https://quick-calculator.org/nl',
        'x-default': 'https://quick-calculator.org/en',
      },
    },
    other: {
      'application/ld+json': JSON.stringify(homepageSchema)
    }
  };
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