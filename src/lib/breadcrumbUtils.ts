export interface BreadcrumbItem {
  name: string;
  href: string;
}

// Direct category name mappings based on page structure
const CATEGORY_NAMES = {
  financial: { en: 'Financial Calculators', es: 'Calculadoras Financieras', pt: 'Calculadoras Financeiras', fr: 'Calculateurs Financiers' },
  health: { en: 'Health & Fitness Calculators', es: 'Calculadoras de Salud y Fitness', pt: 'Calculadoras de Saúde e Fitness', fr: 'Calculateurs Santé et Fitness' },
  math: { en: 'Math Calculators', es: 'Calculadoras Matemáticas', pt: 'Calculadoras Matemáticas', fr: 'Calculateurs Mathématiques' },
  utility: { en: 'Utility Calculators', es: 'Calculadoras de Utilidad', pt: 'Calculadoras de Utilitários', fr: 'Calculateurs Utilitaires' },
  lifestyle: { en: 'Lifestyle Calculators', es: 'Calculadoras de Estilo de Vida', pt: 'Calculadoras de Estilo de Vida', fr: 'Calculateurs Style de Vie' }
};

// Direct home breadcrumb mappings
const HOME_NAMES = {
  en: 'Home',
  es: 'Inicio',
  pt: 'Início',
  fr: 'Accueil'
};

function getCategoryName(lang: string, category: string): string {
  const categoryData = CATEGORY_NAMES[category as keyof typeof CATEGORY_NAMES];
  return categoryData?.[lang as keyof typeof categoryData] || category.charAt(0).toUpperCase() + category.slice(1) + ' Calculators';
}

function getHomeBreadcrumb(lang: string): string {
  return HOME_NAMES[lang as keyof typeof HOME_NAMES] || 'Home';
}

/**
 * Generate breadcrumbs for calculator pages
 */
export function generateCalculatorBreadcrumbs(
  lang: string,
  slug: string,
  calculatorCategory: string,
  calculatorContent: any
): BreadcrumbItem[] {
  const homeName = getHomeBreadcrumb(lang);
  const categoryName = getCategoryName(lang, calculatorCategory);

  return [
    { name: homeName, href: lang === 'en' ? '/' : `/${lang}` },
    { name: categoryName, href: lang === 'en' ? `/categories/${calculatorCategory}` : `/${lang}/categories/${calculatorCategory}` },
    { name: calculatorContent?.title || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), href: lang === 'en' ? `/${slug}` : `/${lang}/${slug}` }
  ];
}

/**
 * Generate breadcrumbs for category pages
 */
export function generateCategoryBreadcrumbs(lang: string, category: string, categoryContent: any): BreadcrumbItem[] {
  const homeName = getHomeBreadcrumb(lang);
  const categoryName = getCategoryName(lang, category);

  return [
    { name: homeName, href: lang === 'en' ? '/' : `/${lang}` },
    { name: categoryName, href: lang === 'en' ? `/categories/${category}` : `/${lang}/categories/${category}` }
  ];
}