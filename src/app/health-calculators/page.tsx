import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Health Calculators - BMI, Calories, Body Fat | Free Online',
  description: 'Free health and fitness calculators. Calculate BMI, calories, body fat percentage, ideal weight, BMR, TDEE, and more. Track your health goals.',
  alternates: {
    canonical: 'https://quick-calculator.org/health-calculators',
  },
};

export default function HealthCalculatorsRedirect() {
  redirect('/en/categories/health');
}
