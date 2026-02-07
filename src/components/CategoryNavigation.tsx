'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface CategoryNavigationProps {
  lang: string;
  className?: string;
}

const categories = {
  en: [
    { key: 'financial', icon: '💰', name: 'Financial', color: 'bg-emerald-100 border-emerald-400 text-emerald-800 hover:bg-emerald-200 font-semibold' },
    { key: 'health', icon: '🏥', name: 'Health', color: 'bg-rose-100 border-rose-400 text-rose-800 hover:bg-rose-200 font-semibold' },
    { key: 'math', icon: '🧮', name: 'Math', color: 'bg-blue-100 border-blue-400 text-blue-800 hover:bg-blue-200 font-semibold' },
    { key: 'utility', icon: '🛠️', name: 'Utility', color: 'bg-amber-100 border-amber-400 text-amber-800 hover:bg-amber-200 font-semibold' },
    { key: 'lifestyle', icon: '🏠', name: 'Lifestyle', color: 'bg-purple-100 border-purple-400 text-purple-800 hover:bg-purple-200 font-semibold' }
  ],
  es: [
    { key: 'financial', icon: '💰', name: 'Financiero', color: 'bg-emerald-100 border-emerald-400 text-emerald-800 hover:bg-emerald-200 font-semibold' },
    { key: 'health', icon: '🏥', name: 'Salud', color: 'bg-rose-100 border-rose-400 text-rose-800 hover:bg-rose-200 font-semibold' },
    { key: 'math', icon: '🧮', name: 'Matemáticas', color: 'bg-blue-100 border-blue-400 text-blue-800 hover:bg-blue-200 font-semibold' },
    { key: 'utility', icon: '🛠️', name: 'Utilidad', color: 'bg-amber-100 border-amber-400 text-amber-800 hover:bg-amber-200 font-semibold' },
    { key: 'lifestyle', icon: '🏠', name: 'Estilo de Vida', color: 'bg-purple-100 border-purple-400 text-purple-800 hover:bg-purple-200 font-semibold' }
  ],
  pt: [
    { key: 'financial', icon: '💰', name: 'Financeiro', color: 'bg-emerald-100 border-emerald-400 text-emerald-800 hover:bg-emerald-200 font-semibold' },
    { key: 'health', icon: '🏥', name: 'Saúde', color: 'bg-rose-100 border-rose-400 text-rose-800 hover:bg-rose-200 font-semibold' },
    { key: 'math', icon: '🧮', name: 'Matemática', color: 'bg-blue-100 border-blue-400 text-blue-800 hover:bg-blue-200 font-semibold' },
    { key: 'utility', icon: '🛠️', name: 'Utilitário', color: 'bg-amber-100 border-amber-400 text-amber-800 hover:bg-amber-200 font-semibold' },
    { key: 'lifestyle', icon: '🏠', name: 'Estilo de Vida', color: 'bg-purple-100 border-purple-400 text-purple-800 hover:bg-purple-200 font-semibold' }
  ],
  fr: [
    { key: 'financial', icon: '💰', name: 'Financier', color: 'bg-emerald-100 border-emerald-400 text-emerald-800 hover:bg-emerald-200 font-semibold' },
    { key: 'health', icon: '🏥', name: 'Santé', color: 'bg-rose-100 border-rose-400 text-rose-800 hover:bg-rose-200 font-semibold' },
    { key: 'math', icon: '🧮', name: 'Mathématiques', color: 'bg-blue-100 border-blue-400 text-blue-800 hover:bg-blue-200 font-semibold' },
    { key: 'utility', icon: '🛠️', name: 'Utilitaire', color: 'bg-amber-100 border-amber-400 text-amber-800 hover:bg-amber-200 font-semibold' },
    { key: 'lifestyle', icon: '🏠', name: 'Style de Vie', color: 'bg-purple-100 border-purple-400 text-purple-800 hover:bg-purple-200 font-semibold' }
  ],
  de: [
    { key: 'financial', icon: '💰', name: 'Finanziell', color: 'bg-emerald-100 border-emerald-400 text-emerald-800 hover:bg-emerald-200 font-semibold' },
    { key: 'health', icon: '🏥', name: 'Gesundheit', color: 'bg-rose-100 border-rose-400 text-rose-800 hover:bg-rose-200 font-semibold' },
    { key: 'math', icon: '🧮', name: 'Mathematik', color: 'bg-blue-100 border-blue-400 text-blue-800 hover:bg-blue-200 font-semibold' },
    { key: 'utility', icon: '🛠️', name: 'Nützlichkeit', color: 'bg-amber-100 border-amber-400 text-amber-800 hover:bg-amber-200 font-semibold' },
    { key: 'lifestyle', icon: '🏠', name: 'Lebensstil', color: 'bg-purple-100 border-purple-400 text-purple-800 hover:bg-purple-200 font-semibold' }
  ],
  nl: [
    { key: 'financial', icon: '💰', name: 'Financieel', color: 'bg-emerald-100 border-emerald-400 text-emerald-800 hover:bg-emerald-200 font-semibold' },
    { key: 'health', icon: '🏥', name: 'Gezondheid', color: 'bg-rose-100 border-rose-400 text-rose-800 hover:bg-rose-200 font-semibold' },
    { key: 'math', icon: '🧮', name: 'Wiskunde', color: 'bg-blue-100 border-blue-400 text-blue-800 hover:bg-blue-200 font-semibold' },
    { key: 'utility', icon: '🛠️', name: 'Hulpmiddel', color: 'bg-amber-100 border-amber-400 text-amber-800 hover:bg-amber-200 font-semibold' },
    { key: 'lifestyle', icon: '🏠', name: 'Levensstijl', color: 'bg-purple-100 border-purple-400 text-purple-800 hover:bg-purple-200 font-semibold' }
  ]
};

export default function CategoryNavigation({ lang, className = '' }: CategoryNavigationProps) {
  const pathname = usePathname();
  const categoryList = categories[lang as keyof typeof categories] || categories.en;

  const getCategoryPath = (categoryKey: string) => {
    const basePath = lang === 'en' ? '' : `/${lang}`;
    return `${basePath}/categories/${categoryKey}/`;
  };

  const isActive = (categoryKey: string) => {
    const path = pathname?.replace(/\/$/, ''); // Remove trailing slash
    return path?.includes(`/categories/${categoryKey}`);
  };

  return (
    <nav className={`bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm ${className}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-center gap-3 overflow-x-auto py-3 scrollbar-hide">
          {categoryList.map((category) => (
            <Link
              key={category.key}
              href={getCategoryPath(category.key)}
              className={`px-2 py-1 rounded-full border-2 text-[11px] md:text-xs font-normal whitespace-nowrap transition-all ${category.color} ${
                isActive(category.key) ? 'ring-2 ring-offset-2' : ''
              }`}
            >
              <span className="mr-1 text-sm">{category.icon}</span>
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
