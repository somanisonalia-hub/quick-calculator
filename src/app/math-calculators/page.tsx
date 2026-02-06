import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Math Calculators - Algebra, Geometry, Statistics | Free Online',
  description: 'Free math calculators for algebra, geometry, statistics, and more. Scientific calculator, percentage calculator, fraction calculator, and 20+ math tools.',
  alternates: {
    canonical: 'https://quick-calculator.org/math-calculators',
  },
};

export default function MathCalculatorsRedirect() {
  redirect('/en/categories/math');
}
