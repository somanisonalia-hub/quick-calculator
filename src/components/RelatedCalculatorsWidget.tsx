'use client';

import Link from 'next/link';
import { isPopularCalculator } from '@/lib/popularCalculators';
import { CALCULATOR_CATEGORIES } from '@/lib/categoryUtils';

interface RelatedCalculator {
  slug: string;
  name: string;
  summary: string;
}

interface RelatedCalculatorsWidgetProps {
  calculators: RelatedCalculator[];
  currentCalculatorName?: string;
  lang: string;
  title?: string;
}

/**
 * Related Calculators Widget
 * Shows 10-15 high-traffic calculator links in a simple grid
 * Maximizes interlinking and keeps users exploring the site
 */
export default function RelatedCalculatorsWidget({ 
  calculators, 
  currentCalculatorName = '',
  lang,
  title
}: RelatedCalculatorsWidgetProps) {
  if (!calculators || calculators.length === 0) {
    return null;
  }

  const tTitles: Record<string, Record<string, string>> = {
    'en': { default: 'You Might Also Like' },
    'es': { default: 'También Podrías Disfrutar' },
    'pt': { default: 'Você Também Pode Gostar' },
    'fr': { default: 'Vous Aimerez Aussi' }
  };

  const widgetTitle = title || tTitles[lang]?.default || 'You Might Also Like';

  // Take first 20 calculators for the grid
  const displayCalculators = calculators.slice(0, 20);

  return (
    <section className="my-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {widgetTitle}
      </h2>

      {/* Simple Grid - 5 columns x 4 rows for 20 links */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {displayCalculators.map((calc) => {
          const shortName = calc.name.split(/\s+[-–]\s+/)[0].trim();
          const category = (CALCULATOR_CATEGORIES as any)[calc.slug] || 'utility';
          const isPopular = isPopularCalculator(calc.slug, category);
          return (
            <Link
              key={calc.slug}
              href={`/${lang}/${calc.slug}`}
              className="text-blue-600 hover:text-blue-800 hover:underline text-xs sm:text-sm leading-tight flex items-center gap-1"
              aria-label={`${calc.name} - ${calc.summary}`}
              title={`${calc.name} - ${calc.summary}`}
            >
              {isPopular && <span className="text-[10px] text-orange-500" title={`Popular: ${calc.name}`}>★</span>}
              <span>{shortName}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
