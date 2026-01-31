import { Metadata } from 'next';
import HomePageSimple from '@/components/HomePageSimple';
import { generateHomepageSchema } from '@/lib/seoContentRenderer';
import { loadAllCalculatorsStatic } from '@/lib/staticDataLoader';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://quick-calculator.org',
    languages: {
      'en': 'https://quick-calculator.org',
      'es': 'https://quick-calculator.org/es',
      'fr': 'https://quick-calculator.org/fr',
      'pt': 'https://quick-calculator.org/pt',
      'x-default': 'https://quick-calculator.org',
    },
  },
  other: {
    'application/ld+json': JSON.stringify(generateHomepageSchema('en')),
  },
};

export default function Home() {
  // Load all calculators at BUILD TIME for static generation
  const allCalculators = loadAllCalculatorsStatic('en');
  const homepageSchema = generateHomepageSchema('en');
  
  return (
    <>
      <StructuredData data={homepageSchema} />
      <HomePageSimple language="en" initialCalculators={allCalculators} />
    </>
  );
}
