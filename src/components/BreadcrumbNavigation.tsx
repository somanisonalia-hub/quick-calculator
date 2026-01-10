'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbNavigationProps {
  breadcrumbs: BreadcrumbItem[];
  currentLang?: string;
}

const searchTranslations = {
  en: { placeholder: 'Search calculators...', button: 'Search' },
  es: { placeholder: 'Buscar calculadoras...', button: 'Buscar' },
  pt: { placeholder: 'Buscar calculadoras...', button: 'Buscar' },
  fr: { placeholder: 'Rechercher des calculateurs...', button: 'Rechercher' }
};

export default function BreadcrumbNavigation({ breadcrumbs, currentLang = 'en' }: BreadcrumbNavigationProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const t = searchTranslations[currentLang as keyof typeof searchTranslations] || searchTranslations.en;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${currentLang}?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  return (
    <>
      <nav aria-label="Breadcrumb" className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            {/* Breadcrumbs - Left Side */}
            <div className="flex-1 min-w-0">
              {/* Desktop Breadcrumb */}
              <ol className="hidden md:flex items-center list-none p-0 text-sm">
                {breadcrumbs.map((crumb, index) => (
                  <li key={index} className="flex items-center">
                    {index > 0 && <span className="px-2 text-gray-400">›</span>}
                    {index === breadcrumbs.length - 1 ? (
                      <span className="font-bold text-gray-900">
                        {crumb.name.length > 20 ? crumb.name.substring(0, 18) + '...' : crumb.name}
                      </span>
                    ) : (
                      <a href={crumb.href} className="text-blue-600 hover:text-blue-800 no-underline">
                        {crumb.name}
                      </a>
                    )}
                  </li>
                ))}
              </ol>

              {/* Mobile Breadcrumb */}
              <ol className="md:hidden flex items-center overflow-x-auto list-none p-0 text-xs">
                {breadcrumbs.map((crumb, index) => (
                  <li key={index} className="flex items-center flex-shrink-0">
                    {index > 0 && <span className="px-1 text-gray-400">›</span>}
                    {index === breadcrumbs.length - 1 ? (
                      <span className="font-bold text-gray-900">
                        {crumb.name.length > 12 ? crumb.name.substring(0, 10) + '...' : crumb.name}
                      </span>
                    ) : (
                      <a href={crumb.href} className="text-blue-600 hover:text-blue-800 no-underline whitespace-nowrap">
                        {crumb.name}
                      </a>
                    )}
                  </li>
                ))}
              </ol>
            </div>

            {/* Search Form - Right Side */}
            <div className="flex-shrink-0 ml-4">
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.placeholder}
                    className="w-56 lg:w-80 px-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* Breadcrumb JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((crumb, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": crumb.name,
              "item": `https://quick-calculator.org${crumb.href}`
            }))
          })
        }}
      />
    </>
  );
}