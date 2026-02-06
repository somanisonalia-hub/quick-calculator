'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import i18n from '@/lib/i18n';
import CalculatorLogo from '@/components/icons/CalculatorLogo';

interface HeaderProps {
  currentLang?: string;
  showLanguageSwitcher?: boolean;
}

const translations = {
  en: {
    languageNames: {
      en: 'English',
      es: 'Spanish',
      pt: 'Portuguese',
      fr: 'French'
    },
    menu: {
      financial: '💰 Financial',
      health: '🏥 Health',
      math: '🧮 Math',
      utility: '🛠️ Utility',
      lifestyle: '🏠 Lifestyle'
    }
  },
  es: {
    languageNames: {
      en: 'Inglés',
      es: 'Español',
      pt: 'Portugués',
      fr: 'Francés'
    },
    menu: {
      financial: '💰 Financiero',
      health: '🏥 Salud',
      math: '🧮 Matemáticas',
      utility: '🛠️ Utilidad',
      lifestyle: '🏠 Estilo de Vida'
    }
  },
  pt: {
    languageNames: {
      en: 'Inglês',
      es: 'Espanhol',
      pt: 'Português',
      fr: 'Francês'
    },
    menu: {
      financial: '💰 Financeiro',
      health: '🏥 Saúde',
      math: '🧮 Matemática',
      utility: '🛠️ Utilitário',
      lifestyle: '🏠 Estilo de Vida'
    }
  },
  fr: {
    languageNames: {
      en: 'Anglais',
      es: 'Espagnol',
      pt: 'Portugais',
      fr: 'Français'
    },
    menu: {
      financial: '💰 Financier',
      health: '🏥 Santé',
      math: '🧮 Mathématiques',
      utility: '🛠️ Utilitaire',
      lifestyle: '🏠 Style de Vie'
    }
  }
};

export default function Header({ currentLang = 'en', showLanguageSwitcher = true }: HeaderProps) {
  const pathname = usePathname();
  const t = translations[currentLang as keyof typeof translations] || translations.en;

  // Function to get the path for a specific language
  const getLanguagePath = (langCode: string) => {
    const currentPath = pathname || '/';
    if (!currentPath || currentPath === '/') return langCode === 'en' ? '/' : `/${langCode}/`;

    // Extract the path without any language prefix
    let pathWithoutLang = currentPath;

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
    if (typeof window !== 'undefined') {
      window.location.href = newPath;
    }
  };

  // Menu items
  const menuItems = [
    { name: t.menu.financial, slug: 'financial' },
    { name: t.menu.health, slug: 'health' },
    { name: t.menu.math, slug: 'math' },
    { name: t.menu.utility, slug: 'utility' },
    { name: t.menu.lifestyle, slug: 'lifestyle' }
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={`/${currentLang}`} className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <CalculatorLogo className="text-white" size="lg" />
              </div>
              <span className="text-sm md:text-lg font-bold text-gray-900">Quick Calculator</span>
            </Link>
          </div>

          {/* Navigation Menu - Hidden on mobile, visible on md and up */}
          <nav className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.slug}
                href={`/${currentLang}/categories/${item.slug}`}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Switcher */}
          {showLanguageSwitcher && (
            <div className="flex items-center space-x-1">
              {[
                { code: 'en', name: t.languageNames.en, flag: '🇺🇸' },
                { code: 'es', name: t.languageNames.es, flag: '🇪🇸' },
                { code: 'pt', name: t.languageNames.pt, flag: '🇵🇹' },
                { code: 'fr', name: t.languageNames.fr, flag: '🇫🇷' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex items-center space-x-1 px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    currentLang === lang.code
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  title={lang.name}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span className="hidden sm:inline text-xs">{lang.code.toUpperCase()}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
