import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conversion Tools - Unit, Currency, Number Converter | Free Online',
  description: 'Free conversion tools for units, currency, numbers, dates, and more. Convert length, weight, temperature, binary, hex, and Roman numerals instantly.',
  alternates: {
    canonical: 'https://quick-calculator.org/conversion-tools',
  },
};

export default function ConversionToolsRedirect() {
  redirect('/en/categories/utility');
}
