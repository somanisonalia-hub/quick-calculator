import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">🧮</span>
                </div>
                <span className="text-lg font-bold text-gray-900 hidden sm:block">Quick Calculator</span>
              </Link>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              {[
                { code: 'en', name: 'English', flag: '🇺🇸' }
              ].map((lang) => (
                <a
                  key={lang.code}
                  href={lang.code === 'en' ? '/' : `/${lang.code}/`}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                  title={lang.name}
                >
                  <span>{lang.flag}</span>
                  <span className="hidden sm:inline">{lang.code.toUpperCase()}</span>
                </a>
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
            <div className="max-w-md mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for calculators..."
                  className="w-full px-4 py-3 pl-12 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Popular Calculators
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <Link href="/en/mortgage-calculator" className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl mb-2">🏠</div>
                    <div className="text-sm font-medium text-gray-900">Mortgage</div>
                  </div>
                </Link>
                <Link href="/en/loan-calculator" className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl mb-2">💰</div>
                    <div className="text-sm font-medium text-gray-900">Loan</div>
                  </div>
                </Link>
                <Link href="/en/bmi-calculator" className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl mb-2">⚖️</div>
                    <div className="text-sm font-medium text-gray-900">BMI</div>
                  </div>
                </Link>
                <Link href="/en/emi-calculator" className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200">
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
                <Link href="/categories/financial" className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors">
                  💰 Financial
                </Link>
                <Link href="/categories/health" className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200 transition-colors">
                  🏥 Health
                </Link>
                <Link href="/categories/math" className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors">
                  🧮 Math
                </Link>
                <Link href="/categories/utility" className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors">
                  🛠️ Utility
                </Link>
                <Link href="/categories/lifestyle" className="inline-flex items-center px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-medium hover:bg-pink-200 transition-colors">
                  🏠 Lifestyle
                </Link>
              </div>
            </div>

            {/* Go Home Button */}
            <div className="mb-8">
              <Link
                href="/"
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
              <Link href="/privacy-policy" className="hover:text-blue-600 transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms-of-service" className="hover:text-blue-600 transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}