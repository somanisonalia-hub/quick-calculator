'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCategoryData, CategoryData, CalculatorInfo } from '@/lib/categoryUtils';

interface CategoryPageClientProps {
  lang: string;
  category: string;
  initialCalculators?: CalculatorInfo[];
  categoryData?: CategoryData | null;
}

export default function CategoryPageClient({ lang, category, initialCalculators, categoryData: initialCategoryData }: CategoryPageClientProps) {
  const [categoryContent, setCategoryContent] = useState<CategoryData | null>(initialCategoryData || null);
  const [calculators, setCalculators] = useState<CalculatorInfo[]>(initialCalculators || []);
  const [loading, setLoading] = useState(!initialCalculators);

  useEffect(() => {
    // Only load if not provided by server
    if (!initialCalculators || !initialCategoryData) {
      const loadCategoryContent = async () => {
        setLoading(true);
        try {
          const data = getCategoryData(lang, category);
          setCategoryContent(data);
          if (data) {
            setCalculators(data.calculators);
          }
        } catch (error) {
          console.error('Failed to load category content:', error);
          setCategoryContent(null);
        } finally {
          setLoading(false);
        }
      };

      loadCategoryContent();
    }
  }, [lang, category, initialCalculators, initialCategoryData]);

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

  // Category colors matching homepage
  const categoryColors = {
    financial: { 
      bg: 'bg-blue-50', 
      border: 'border-blue-300', 
      text: 'text-blue-800', 
      hover: 'hover:bg-blue-100', 
      icon: '💰',
      buttonBg: 'bg-blue-600',
      buttonHover: 'hover:bg-blue-700'
    },
    health: { 
      bg: 'bg-green-50', 
      border: 'border-green-300', 
      text: 'text-green-800', 
      hover: 'hover:bg-green-100', 
      icon: '🏥',
      buttonBg: 'bg-green-600',
      buttonHover: 'hover:bg-green-700'
    },
    math: { 
      bg: 'bg-purple-50', 
      border: 'border-purple-300', 
      text: 'text-purple-800', 
      hover: 'hover:bg-purple-100', 
      icon: '🧮',
      buttonBg: 'bg-purple-600',
      buttonHover: 'hover:bg-purple-700'
    },
    lifestyle: { 
      bg: 'bg-indigo-50', 
      border: 'border-indigo-300', 
      text: 'text-indigo-800', 
      hover: 'hover:bg-indigo-100', 
      icon: '🏠',
      buttonBg: 'bg-indigo-600',
      buttonHover: 'hover:bg-indigo-700'
    },
    utility: { 
      bg: 'bg-teal-50', 
      border: 'border-teal-300', 
      text: 'text-teal-800', 
      hover: 'hover:bg-teal-100', 
      icon: '🛠️',
      buttonBg: 'bg-teal-600',
      buttonHover: 'hover:bg-teal-700'
    }
  };
  
  const colors = categoryColors[category as keyof typeof categoryColors] || categoryColors.utility;

  return (
    <main className="py-10 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {categoryContent ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <span className="mr-3 text-4xl">{colors.icon}</span>
                {categoryContent.title}
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
                {categoryContent.description}
              </p>
              <div className="text-sm text-gray-500">
                {calculators.length} calculator{calculators.length !== 1 ? 's' : ''} available
              </div>
            </div>

            {/* Display ALL calculators with same layout as homepage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
              {calculators.map((calculator) => (
                <Link key={calculator.slug} href={`/${lang}/${calculator.slug}`} className="block">
                  <div className={`${colors.bg} rounded-lg p-3 border ${colors.border} ${colors.hover} transition-all cursor-pointer h-full`}>
                    <div className="flex items-start">
                      <span className="text-xl mr-2 flex-shrink-0">{calculator.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-semibold ${colors.text} text-sm mb-1 leading-tight`}>
                          {calculator.name}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {calculator.summary}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Back to Homepage Button */}
            <div className="text-center">
              <Link 
                href={`/${lang}`} 
                className={`inline-flex items-center px-6 py-3 ${colors.buttonBg} text-white font-semibold rounded-lg ${colors.buttonHover} transition-colors`}
              >
                ← {lang === 'en' ? 'Back to Homepage' : lang === 'es' ? 'Volver a la página de inicio' : lang === 'pt' ? 'Voltar para a página inicial' : 'Retour à l\'accueil'}
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
