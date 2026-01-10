'use client';

import { useTranslation } from 'react-i18next';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navigation() {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();
  const pathname = usePathname();

  // Get current language from pathname
  const getCurrentLang = (path: string) => {
    if (path.startsWith('/es/') || path === '/es') return 'es';
    if (path.startsWith('/pt/') || path === '/pt') return 'pt';
    if (path.startsWith('/fr/') || path === '/fr') return 'fr';
    if (path.startsWith('/en/') || path === '/en') return 'en';
    return 'en'; // Default to English
  };

  const currentLang = getCurrentLang(pathname);

  // Languages available (English only for now)
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const changeLanguage = (langCode: string) => {
    if (langCode === currentLang) return;

    // Extract the path without any language prefix
    let pathWithoutLang = pathname;

    // Remove any existing language prefix (es, pt, fr, en)
    pathWithoutLang = pathWithoutLang.replace(/^\/(es|pt|fr|en)/, '');

    // Ensure we have a leading slash
    if (!pathWithoutLang.startsWith('/')) {
      pathWithoutLang = '/' + pathWithoutLang;
    }

    // Handle home page
    if (pathWithoutLang === '/' || pathWithoutLang === '') {
      pathWithoutLang = '/';
    }

    // Always add language prefix for consistency
    const newPath = `/${langCode}${pathWithoutLang}`;

    router.push(newPath);
  };

  // Create language-aware links
  const createLink = (path: string) => {
    return `/${currentLang}${path}`;
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href={createLink('/')} className="text-xl font-bold text-gray-800">
                {t('brand.name')}
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href={createLink('/')}
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                {t('nav.home')}
              </Link>
              <Link
                href={`/categories/${currentLang}/financial`}
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                {t('categories.financial')}
              </Link>
              <Link
                href={`/categories/${currentLang}/health`}
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                {t('categories.health')}
              </Link>
              <Link
                href={createLink('/contact')}
                className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                {t('nav.contact')}
              </Link>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center space-x-2">
            {languages.map((lang) => (
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
    </nav>
  );
}
