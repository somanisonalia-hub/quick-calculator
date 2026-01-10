import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import HomePage from '@/components/HomePage';
import { generateHomepageSchema } from '@/lib/seoContentRenderer';

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
  const canonicalUrl = lang === 'en' ? 'https://quick-calculator.org' : `https://quick-calculator.org/${lang}`;

  return {
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': 'https://quick-calculator.org',
        'es': 'https://quick-calculator.org/es',
        'fr': 'https://quick-calculator.org/fr',
        'pt': 'https://quick-calculator.org/pt',
        'x-default': 'https://quick-calculator.org',
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

  return <HomePage language={lang} />;
}