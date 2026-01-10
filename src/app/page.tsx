import { Metadata } from 'next';
import HomePage from '@/components/HomePage';
import { generateHomepageSchema } from '@/lib/seoContentRenderer';

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
  return <HomePage language="en" />;
}
