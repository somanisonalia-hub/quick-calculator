import Link from 'next/link';

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
      financial: 'Financial',
      health: 'Health',
      math: 'Math',
      utility: 'Utility',
      lifestyle: 'Lifestyle'
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
      financial: 'Financiero',
      health: 'Salud',
      math: 'Matemáticas',
      utility: 'Utilidad',
      lifestyle: 'Estilo de Vida'
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
      financial: 'Financeiro',
      health: 'Saúde',
      math: 'Matemática',
      utility: 'Utilitário',
      lifestyle: 'Estilo de Vida'
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
      financial: 'Financier',
      health: 'Santé',
      math: 'Mathématiques',
      utility: 'Utilitaire',
      lifestyle: 'Style de Vie'
    }
  }
};

export default function Header({ currentLang = 'en', showLanguageSwitcher = true }: HeaderProps) {
  const t = translations[currentLang as keyof typeof translations] || translations.en;

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
                <span className="text-white font-bold text-lg">🧮</span>
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
            <div className="flex items-center space-x-2">
              {[
                { code: 'en', name: t.languageNames.en, flag: '🇺🇸' }
              ].map((lang) => (
                <a
                  key={lang.code}
                  href={lang.code === 'en' ? '/' : `/${lang.code}/`}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentLang === lang.code
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                  title={lang.name}
                >
                  <span>{lang.flag}</span>
                  <span className="hidden sm:inline">{lang.code.toUpperCase()}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
