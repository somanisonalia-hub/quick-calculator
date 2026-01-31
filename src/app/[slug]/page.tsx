import { redirect } from 'next/navigation';
import { Metadata } from 'next';

const calculatorSlugs = [
  'mortgage-calculator',
  'loan-calculator',
  'emi-calculator',
  'percentage-calculator',
  'investment-calculator',
  'bmi-calculator',
  'calorie-calculator',
  'savings-calculator'
];

export async function generateStaticParams() {
  return calculatorSlugs.map(slug => ({
    slug
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `${slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} | Quick Calculator`,
    alternates: {
      canonical: `https://quick-calculator.org/${slug}`,
    }
  };
}

export default async function CalculatorRedirectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Redirect to the English version of the calculator
  redirect(`/en/${slug}`);
}
