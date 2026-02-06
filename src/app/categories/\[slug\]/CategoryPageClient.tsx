'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCategoryData, CategoryData, CalculatorInfo, CALCULATOR_CATEGORIES } from '@/lib/categoryUtils';

interface CategoryPageClientProps {
  lang: string;
  category: string;
  initialCalculators?: CalculatorInfo[];
  categoryData?: CategoryData | null;
}

export default function CategoryPageClient({ lang, category, initialCalculators, categoryData: initialCategoryData }: CategoryPageClientProps) {
  const [categoryContent, setCategoryContent] = useState<CategoryData | null>(initialCategoryData || null);
  const [allCalculators, setAllCalculators] = useState<CalculatorInfo[]>(initialCalculators || []);
  const [loading, setLoading] = useState(!initialCalculators);

  useEffect(() => {
    if (!initialCalculators || !initialCategoryData) {
      const loadCategoryContent = async () => {
        setLoading(true);
        try {
          const data = getCategoryData(lang, category);
          setCategoryContent(data);
          if (data) {
            setAllCalculators(data.calculators);
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
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  if (!categoryContent) {
    return (
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-6">The category "{category}" could not be loaded.</p>
        </div>
      </main>
    );
  }

  const categoryCalcs = allCalculators.filter(calc => {
    const calcCategory = (CALCULATOR_CATEGORIES as any)[calc.slug] || 'utility';
    return calcCategory === category;
  });

  const otherCalcs = allCalculators.filter(calc => {
    const calcCategory = (CALCULATOR_CATEGORIES as any)[calc.slug] || 'utility';
    return calcCategory !== category;
  });

  const categoryColors: Record<string, { bg: string; border: string; text: string; buttonBg: string; buttonHover: string }> = {
    financial: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', buttonBg: 'bg-blue-600', buttonHover: 'hover:bg-blue-700' },
    health: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', buttonBg: 'bg-green-600', buttonHover: 'hover:bg-green-700' },
    math: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', buttonBg: 'bg-purple-600', buttonHover: 'hover:bg-purple-700' },
    lifestyle: { bg: 'bg-pink-50', border: 'border-pink-200', text: 'text-pink-700', buttonBg: 'bg-pink-600', buttonHover: 'hover:bg-pink-700' },
    utility: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', buttonBg: 'bg-orange-600', buttonHover: 'hover:bg-orange-700' },
  };
  
  const colors = categoryColors[category] || categoryColors.utility;
  
  const translations = {
    en: { allOthers: 'Other Calculators', backHome: 'Back to Homepage' },
    es: { allOthers: 'Otras Calculadoras', backHome: 'Volver a la página de inicio' },
    pt: { allOthers: 'Outras Calculadoras', backHome: 'Voltar para a página inicial' },
    fr: { allOthers: 'Autres Calculateurs', backHome: 'Retour à l\'accueil' },
  } as Record<string, { allOthers: string; backHome: string }>;
  
  const t = translations[lang] || translations.en;

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {categoryContent && (
        <>
          <div className="mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{categoryContent.title}</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-3">{categoryContent.description}</p>
            <div className="text-sm text-gray-500">{categoryCalcs.length} calculator{categoryCalcs.length !== 1 ? 's' : ''}</div>
          </div>

          <section className={`p-6 rounded-lg border-2 ${colors.bg} ${colors.border} mb-10`}>
            <div className="text-center mb-6">
              <h2 className={`text-2xl font-bold mb-3 ${colors.text}`}>{categoryContent.title}</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2">
              {categoryCalcs.map((calc) => (
                <Link 
                    key={calc.slug} 
                    href={`/${lang}/${calc.slug}`} 
                    className="text-blue-600 hover:underline text-xs sm:text-sm"
                    aria-label={`${calc.name} - ${calc.summary}`}
                    title={`${calc.name}`}
                  >
                    1{calc.name}
                  </Link>
              ))}
            </div>
          </section>

          {allCalculators.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t.allOthers}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2">
                {allCalculators.sort((a, b) => a.name.localeCompare(b.name)).map((calc) => (
                  <Link 
                    key={calc.slug} 
                    href={`/${lang}/${calc.slug}`} 
                    className="text-blue-600 hover:underline text-xs sm:text-sm"
                    aria-label={`${calc.name} - ${calc.summary}`}
                    title={`${calc.name} - ${calc.summary}`}
                  >
                    {calc.name}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="text-center mt-10 pb-6">
            <Link href={`/${lang === 'en' ? '' : lang}`} className={`inline-flex items-center px-6 py-3 ${colors.buttonBg} text-white font-semibold rounded-lg ${colors.buttonHover} transition-colors`}>
              ← {t.backHome}
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
