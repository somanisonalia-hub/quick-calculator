'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CategoryNavigationProps {
  lang: string;
  className?: string;
}

const categories = {
  en: [
    { key: 'financial', icon: '💰', name: 'Financial', color: 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' },
    { key: 'health', icon: '🏥', name: 'Health', color: 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100' },
    { key: 'math', icon: '🧮', name: 'Math', color: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100' },
    { key: 'utility', icon: '🛠️', name: 'Utility', color: 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100' },
    { key: 'lifestyle', icon: '🏠', name: 'Lifestyle', color: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100' }
  ],
  es: [
    { key: 'financial', icon: '💰', name: 'Financiero', color: 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' },
    { key: 'health', icon: '🏥', name: 'Salud', color: 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100' },
    { key: 'math', icon: '🧮', name: 'Matemáticas', color: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100' },
    { key: 'utility', icon: '🛠️', name: 'Utilidad', color: 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100' },
    { key: 'lifestyle', icon: '🏠', name: 'Estilo de Vida', color: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100' }
  ],
  pt: [
    { key: 'financial', icon: '💰', name: 'Financeiro', color: 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' },
    { key: 'health', icon: '🏥', name: 'Saúde', color: 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100' },
    { key: 'math', icon: '🧮', name: 'Matemática', color: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100' },
    { key: 'utility', icon: '🛠️', name: 'Utilitário', color: 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100' },
    { key: 'lifestyle', icon: '🏠', name: 'Estilo de Vida', color: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100' }
  ],
  fr: [
    { key: 'financial', icon: '💰', name: 'Financier', color: 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' },
    { key: 'health', icon: '🏥', name: 'Santé', color: 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100' },
    { key: 'math', icon: '🧮', name: 'Mathématiques', color: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100' },
    { key: 'utility', icon: '🛠️', name: 'Utilitaire', color: 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100' },
    { key: 'lifestyle', icon: '🏠', name: 'Style de Vie', color: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100' }
  ],
  de: [
    { key: 'financial', icon: '💰', name: 'Finanziell', color: 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' },
    { key: 'health', icon: '🏥', name: 'Gesundheit', color: 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100' },
    { key: 'math', icon: '🧮', name: 'Mathematik', color: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100' },
    { key: 'utility', icon: '🛠️', name: 'Nützlichkeit', color: 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100' },
    { key: 'lifestyle', icon: '🏠', name: 'Lebensstil', color: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100' }
  ],
  nl: [
    { key: 'financial', icon: '💰', name: 'Financieel', color: 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' },
    { key: 'health', icon: '🏥', name: 'Gezondheid', color: 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100' },
    { key: 'math', icon: '🧮', name: 'Wiskunde', color: 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100' },
    { key: 'utility', icon: '🛠️', name: 'Hulpmiddel', color: 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100' },
    { key: 'lifestyle', icon: '🏠', name: 'Levensstijl', color: 'bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100' }
  ]
};

export default function CategoryNavigation({ lang, className = '' }: CategoryNavigationProps) {
  const pathname = usePathname();
  const categoryList = categories[lang as keyof typeof categories] || categories.en;

  const getCategoryPath = (categoryKey: string) => {
    const basePath = lang === 'en' ? '' : `/${lang}`;
    return `${basePath}/categories/${categoryKey}`;
  };

  const isActive = (categoryKey: string) => {
    return pathname?.includes(`/categories/${categoryKey}`);
  };

  return (
    <nav className={`bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm ${className}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-3 scrollbar-hide">
          {categoryList.map((category) => (
            <Link
              key={category.key}
              href={getCategoryPath(category.key)}
              className={`flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full border text-[10px] sm:text-xs md:text-sm font-medium whitespace-nowrap transition-all ${
                isActive(category.key)
                  ? `${category.color} ring-2 ring-offset-2 ${category.color.split(' ')[1].replace('border-', 'ring-')}`
                  : `${category.color}`
              }`}
            >
              <span className="text-sm sm:text-base">{category.icon}</span>
              <span>{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
