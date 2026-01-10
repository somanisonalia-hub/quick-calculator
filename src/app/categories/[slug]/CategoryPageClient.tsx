'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCategoryData, CategoryData, getPhase1Slugs } from '@/lib/categoryUtils';

interface CategoryPageClientProps {
  lang: string;
  category: string;
}

export default function CategoryPageClient({ lang, category }: CategoryPageClientProps) {
  const [categoryContent, setCategoryContent] = useState<CategoryData | null>(null);
  const [loading, setLoading] = useState(true);

  // Filter to Phase 1 calculators only (same as homepage)
  const filteredCalculators = categoryContent?.calculators.filter(calc =>
    getPhase1Slugs().includes(calc.slug)
  ) || [];

  useEffect(() => {
    const loadCategoryContent = async () => {
      setLoading(true);
      try {
        const data = getCategoryData(lang, category);
        setCategoryContent(data);
      } catch (error) {
        console.error('Failed to load category content:', error);
        setCategoryContent(null);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryContent();
  }, [lang, category]);

  if (loading) {
    return (
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  if (!categoryContent) {
    return (
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Category Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The category "{category}" could not be loaded.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {categoryContent ? (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {categoryContent.title}
            </h1>
            <p className="text-gray-600 mb-8">
              {categoryContent.description}
            </p>

            {/* Display filtered calculators - Simple cards like homepage */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {filteredCalculators.map((calculator) => {
                // Split seoTitle or use name + summary format
                const titleParts = calculator.name.includes(' - ') ?
                  calculator.name.split(' - ') :
                  [calculator.name, calculator.summary || ''];

                return (
                  <Link key={calculator.slug} href={`/${lang}/${calculator.slug}`} className="block">
                    <div className={`bg-white rounded-lg p-4 border-2 ${
                      category === 'financial' ? 'border-blue-300 hover:border-blue-400' :
                      category === 'health' ? 'border-green-300 hover:border-green-400' :
                      category === 'math' ? 'border-orange-300 hover:border-orange-400' :
                      category === 'utility' ? 'border-purple-300 hover:border-purple-400' :
                      'border-gray-300 hover:border-gray-400'
                    } hover:shadow-md transition-all cursor-pointer text-center`}>
                      <div className="font-bold text-gray-800 mb-1">{titleParts[0]}</div>
                      {titleParts[1] && (
                        <div className="text-sm text-gray-600">{titleParts[1]}</div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="text-center">
              <Link href={`/${lang}`} className={`inline-flex items-center px-6 py-3 font-semibold rounded-lg transition-colors ${
                category === 'financial' ? 'bg-blue-600 hover:bg-blue-700 text-white' :
                category === 'health' ? 'bg-green-600 hover:bg-green-700 text-white' :
                category === 'math' ? 'bg-orange-600 hover:bg-orange-700 text-white' :
                category === 'utility' ? 'bg-purple-600 hover:bg-purple-700 text-white' :
                'bg-gray-600 hover:bg-gray-700 text-white'
              }`}>
                👉 Back to Homepage
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Category Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The category "{category}" could not be loaded.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
