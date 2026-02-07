'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useMemo } from 'react';
import { getAllCalculatorsMetadata } from '@/lib/contentRegistry';

export default function NotFound() {
  const pathname = usePathname();
  const { i18n } = useTranslation('common');
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Get current language from pathname
  const getCurrentLang = (path: string) => {
    if (path.startsWith('/es/') || path === '/es') return 'es';
    if (path.startsWith('/pt/') || path === '/pt') return 'pt';
    if (path.startsWith('/fr/') || path === '/fr') return 'fr';
    if (path.startsWith('/de/') || path === '/de') return 'de';
    if (path.startsWith('/nl/') || path === '/nl') return 'nl';
    if (path.startsWith('/en/') || path === '/en') return 'en';
    return 'en'; // Default to English
  };

  const currentLang = getCurrentLang(pathname);

  // Get all calculators for current language
  const allCalculators = useMemo(() => getAllCalculatorsMetadata(currentLang), [currentLang]);

  // Search functionality
  const filteredCalculators = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return allCalculators
      .filter(calc => 
        calc.name.toLowerCase().includes(query) ||
        calc.slug.toLowerCase().includes(query) ||
        (calc.summary && calc.summary.toLowerCase().includes(query))
      )
      .slice(0, 10);
  }, [searchQuery, allCalculators]);

  // Effect to show/hide results
  useEffect(() => {
    setShowResults(searchQuery.trim().length > 0);
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.search-container')) {
        setShowResults(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchQuery('');
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // Function to get the path for a specific language
  const getLanguagePath = (langCode: string) => {
    if (!pathname) return langCode === 'en' ? '/' : `/${langCode}/`;

    // Extract the path without any language prefix
    let pathWithoutLang = pathname;

    // Remove any existing language prefix (es, pt, fr, en, de, nl)
    pathWithoutLang = pathWithoutLang.replace(/^\/(es|pt|fr|en|de|nl)/, '');

    // Ensure we have a leading slash
    if (!pathWithoutLang.startsWith('/')) {
      pathWithoutLang = '/' + pathWithoutLang;
    }

    // Handle home page
    if (pathWithoutLang === '/' || pathWithoutLang === '') {
      pathWithoutLang = '/';
    }

    // Always add language prefix for consistency with routing
    return `/${langCode}${pathWithoutLang}`;
  };

  // Function to handle language change
  const changeLanguage = async (langCode: string) => {
    if (langCode === currentLang) return;

    // Change the i18n language
    await i18n.changeLanguage(langCode);

    // Navigate to the new language path
    const newPath = getLanguagePath(langCode);
    window.location.href = newPath;
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href={currentLang === 'en' ? '/' : `/${currentLang}/`} className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">🧮</span>
                </div>
                <span className="text-lg font-bold text-gray-900 hidden sm:block">Quick Calculator</span>
              </Link>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              {[
                { code: 'en', name: 'English', flag: '🇺🇸' },
                { code: 'es', name: 'Spanish', flag: '🇪🇸' },
                { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
                { code: 'fr', name: 'French', flag: '🇫🇷' },
                { code: 'de', name: 'German', flag: '🇩🇪' },
                { code: 'nl', name: 'Dutch', flag: '🇳🇱' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentLang === lang.code
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  title={lang.name}
                >
                  <span>{lang.flag}</span>
                  <span className="hidden sm:inline">{lang.code.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            {/* 404 Illustration */}
            <div className="mb-8">
              <div className="text-8xl mb-4">🔍</div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                Oops! Page Not Found
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Looks like this calculator took a vacation! 🏖️
                <br />
                <span className="text-lg">Don&apos;t worry, let&apos;s find what you&apos;re looking for.</span>
              </p>
            </div>

            {/* Search Box */}
            <div className="max-w-md mx-auto mb-12 relative search-container">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for calculators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim().length > 0 && setShowResults(true)}
                  className="w-full px-4 py-3 pl-12 pr-10 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setShowResults(false);
                    }}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              {searchQuery.trim().length > 0 && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto">
                  {filteredCalculators.length > 0 ? (
                    filteredCalculators.map((calc) => (
                      <Link
                        key={calc.slug}
                        href={`/${currentLang}/${calc.slug}`}
                        className="block px-4 py-3 hover:bg-blue-50 border-b border-gray-100 last:border-0"
                        onClick={() => {
                          setSearchQuery('');
                          setShowResults(false);
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 flex items-center gap-2">
                              <span>{calc.icon || '🧮'}</span>
                              <span>{calc.name}</span>
                              {calc.featured && <span className="text-yellow-500 text-xs">★</span>}
                            </div>
                            {calc.summary && (
                              <p className="text-sm text-gray-600 mt-1">{calc.summary}</p>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-center text-gray-500">
                      No calculators found for &quot;{searchQuery}&quot;
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Popular Calculators
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <Link href={`/${currentLang}/mortgage-calculator`} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🏠</div>
                    <div className="text-sm font-medium text-gray-900">Mortgage</div>
                  </div>
                </Link>
                <Link href={`/${currentLang}/loan-calculator`} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl mb-2">💰</div>
                    <div className="text-sm font-medium text-gray-900">Loan</div>
                  </div>
                </Link>
                <Link href={`/${currentLang}/bmi-calculator`} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl mb-2">⚖️</div>
                    <div className="text-sm font-medium text-gray-900">BMI</div>
                  </div>
                </Link>
                <Link href={`/${currentLang}/emi-calculator`} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl mb-2">📊</div>
                    <div className="text-sm font-medium text-gray-900">EMI</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Explore Our Categories
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href={`/${currentLang}/categories/financial`} className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
                  💰 Financial
                </Link>
                <Link href={`/${currentLang}/categories/health`} className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200 transition-colors">
                  🏥 Health
                </Link>
                <Link href={`/${currentLang}/categories/math`} className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors">
                  🧮 Math
                </Link>
                <Link href={`/${currentLang}/categories/utility`} className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors">
                  🛠️ Utility
                </Link>
                <Link href={`/${currentLang}/categories/lifestyle`} className="inline-flex items-center px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-medium hover:bg-pink-200 transition-colors">
                  🏠 Lifestyle
                </Link>
              </div>
            </div>

            {/* Go Home Button */}
            <div className="mb-8">
              <Link
                href={currentLang === 'en' ? '/' : `/${currentLang}/`}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                🏠 Go to Homepage
              </Link>
            </div>

            {/* Fun Message */}
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              &ldquo;Math may not teach us how to add love or subtract hate, but it gives us hope that every problem has a solution.&rdquo; ✨
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-600 font-medium">
                Quick Calculator
              </p>
              <p className="text-sm text-gray-500 mt-1">
                © 2026 Quick Calculator. All rights reserved.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
              <Link href={`/${currentLang}/privacy-policy`} className="hover:text-blue-600 transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href={`/${currentLang}/terms-of-service`} className="hover:text-blue-600 transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href={`/${currentLang}/contact`} className="hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}