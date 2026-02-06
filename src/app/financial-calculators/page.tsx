import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Financial Calculators - Loan, Mortgage, Investment | Free Online',
  description: 'Free financial calculators for loans, mortgages, investments, taxes, and retirement planning. Calculate payments, interest rates, ROI, and more.',
  alternates: {
    canonical: 'https://quick-calculator.org/financial-calculators',
  },
};

export default function FinancialCalculatorsRedirect() {
  redirect('/en/categories/financial');
}
