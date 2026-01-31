/**
 * Static data loader for build-time generation
 * This ensures all calculator data is loaded at build time for Cloudflare Pages
 */

import fs from 'fs';
import path from 'path';
import { CalculatorInfo } from './categoryUtils';

/**
 * Load all calculator slugs at build time
 * This runs ONLY during build, not at runtime
 * Returns the actual slugs from file content, not filenames
 */
export function getAllCalculatorSlugs(): string[] {
  const contentDir = path.join(process.cwd(), 'content', 'calculators');
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'));
  const slugs: string[] = [];
  
  for (const file of files) {
    try {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(fileContent);
      
      // Get slug from English content (fallback to filename without .json)
      const slug = data.en?.slug || file.replace('.json', '');
      slugs.push(slug);
    } catch (error) {
      console.warn(`Failed to read slug from: ${file}`, error);
      // Fallback to filename
      slugs.push(file.replace('.json', ''));
    }
  }
  
  return slugs;
}

/**
 * Get filename for a given slug
 * Maps slug to actual filename
 */
export function getFilenameForSlug(slug: string): string {
  const contentDir = path.join(process.cwd(), 'content', 'calculators');
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'));
  
  for (const file of files) {
    try {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(fileContent);
      
      // Check if this file's slug matches
      const fileSlug = data.en?.slug || file.replace('.json', '');
      if (fileSlug === slug) {
        return file.replace('.json', '');
      }
    } catch (error) {
      // Skip invalid files
      continue;
    }
  }
  
  // Fallback: assume slug is the filename
  return slug;
}

/**
 * Load all calculators for a specific language at build time
 * This is called during static generation
 */
export function loadAllCalculatorsStatic(lang: string): CalculatorInfo[] {
  const calculators: CalculatorInfo[] = [];
  const slugs = getAllCalculatorSlugs();
  
  for (const slug of slugs) {
    try {
      const filename = getFilenameForSlug(slug);
      const filePath = path.join(process.cwd(), 'content', 'calculators', `${filename}.json`);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(fileContent);
      
      // Get language-specific content
      const content = data[lang] || data['en'];
      
      if (content && content.title) {
        calculators.push({
          name: content.title,
          slug: content.slug || slug,
          summary: content.summary || content.description || 'Calculate various metrics',
          icon: getCalculatorIcon(slug),
          difficulty: content.difficulty || 'Beginner',
          featured: isFeaturedCalculator(slug)
        });
      }
    } catch (error) {
      console.warn(`Failed to load calculator: ${slug}`, error);
    }
  }
  
  return calculators;
}

/**
 * Get calculator icon
 */
function getCalculatorIcon(slug: string): string {
  const iconMap: Record<string, string> = {
    'mortgage-calculator': '🏠',
    'loan-calculator': '💰',
    'credit-card-calculator': '💳',
    'savings-calculator': '💸',
    'bmi-calculator': '⚖️',
    'calorie-calculator': '🍎',
    'sales-tax-calculator': '🛒',
    'age-calculator': '📅',
    'tip-calculator': '🧾',
    'car-payment-calculator': '🚗',
    'retirement-calculator': '🏖️',
    'tax-calculator': '💼',
    'paycheck-calculator': '💵',
    'percentage-calculator': '📊',
    'fraction-calculator': '½',
    'scientific-calculator': '🧮',
    'budget-calculator': '📊',
    'investment-calculator': '📈',
    'compound-interest-calculator': '📈',
    'simple-interest-calculator': '💰',
    'body-fat-calculator': '🏋️',
    'bmr-calculator': '🔥',
    'tdee-calculator': '⚡',
    'ideal-weight-calculator': '⚖️',
    'protein-intake-calculator': '💪',
    'water-intake-calculator': '💧',
    'word-counter': '📝',
    'numbers-to-words-converter': '🔤',
    'gpa-calculator': '🎓',
    'average-calculator': '📊',
    'standard-deviation-calculator': '📈',
    'pythagorean-theorem-calculator': '📐',
    'circle-area-calculator': '⭕',
    'circle-circumference-calculator': '⭕',
    'triangle-area-calculator': '📐',
    'square-footage-calculator': '📐',
    'volume-calculator': '📦',
    'surface-area-calculator': '📦',
    'concrete-calculator': '🏗️',
    'tank-volume-calculator': '🛢️',
    'feet-inches-calculator': '📏',
    'unit-converter': '🔄',
    'currency-converter': '💱',
    'inflation-calculator': '💹',
    'property-tax-calculator': '🏠',
    'income-tax-calculator': '📊',
    'hourly-to-salary-calculator': '⏰',
    'salary-calculator': '💼',
    'net-income-calculator': '💰',
    'take-home-pay-calculator': '💵',
    'overtime-pay-calculator': '⏰',
    'stock-return-calculator': '📈',
    'crypto-roi-calculator': '₿',
    'future-value-calculator': '📈',
    'debt-consolidation-calculator': '💰',
    'car-loan-calculator': '🚗',
    'emi-calculator': '💳',
    'interest-only-mortgage-calculator': '🏠',
    'advanced-loan-calculator': '📊',
    'expense-calculator': '💳',
    'life-insurance-calculator': '🛡️',
    'car-insurance-calculator': '🚗',
    'health-insurance-calculator': '🏥',
    'lean-body-mass-calculator': '⚖️',
    'maintenance-calories-calculator': '🔥',
    'waist-to-hip-ratio-calculator': '📏',
    'date-calculator': '📅',
    'ratio-calculator': '📏',
    'quadratic-equation-calculator': '🔢',
    'percentage-change-calculator': '📊',
    'stock-ratios-calculator': '📈',
    'profitability-ratios-calculator': '📈',
    'debt-payoff-calculator': '💸',
    'macro-calculator': '🍽️',
    '401k-calculator': '🏦',
    'roth-ira-calculator': '🏦',
    'social-security-calculator': '📋'
  };
  return iconMap[slug] || '🧮';
}

/**
 * Check if calculator is featured
 */
function isFeaturedCalculator(slug: string): boolean {
  const featured = [
    'mortgage-calculator',
    'loan-calculator',
    'bmi-calculator',
    'credit-card-calculator',
    'savings-calculator'
  ];
  return featured.includes(slug);
}

/**
 * Load all calculators for a specific category
 */
export function loadCalculatorsByCategory(lang: string, category: string): CalculatorInfo[] {
  const allCalculators = loadAllCalculatorsStatic(lang);
  return allCalculators.filter(calc => getCalculatorCategory(calc.slug) === category);
}

/**
 * Get calculator category mapping
 * NOTE: This is kept for backward compatibility. Use CALCULATOR_CATEGORIES from categoryUtils.ts for canonical mapping.
 */
export function getCalculatorCategory(slug: string): string {
  // Import from categoryUtils for single source of truth
  const { CALCULATOR_CATEGORIES } = require('./categoryUtils');
  return (CALCULATOR_CATEGORIES as any)[slug] || 'utility';
}

/**
 * Get translated slug for a calculator in a specific language
 * Maps English slug to language-specific slug
 */
export function getTranslatedSlug(enSlug: string, lang: string): string {
  if (lang === 'en') {
    return enSlug;
  }

  const contentDir = path.join(process.cwd(), 'content', 'calculators');
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'));
  
  for (const file of files) {
    try {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(fileContent);
      
      // Find calculator with matching English slug
      const enSlugFromFile = data.en?.slug || file.replace('.json', '');
      if (enSlugFromFile === enSlug) {
        // Get translated slug
        const translatedSlug = data[lang]?.slug || enSlug;
        return translatedSlug;
      }
    } catch (error) {
      continue;
    }
  }
  
  return enSlug; // Fallback to English slug
}

/**
 * Get all translated slugs for all languages
 * Returns array of {lang, slug} pairs for static generation
 */
export function getAllTranslatedSlugs(): Array<{ lang: string; slug: string }> {
  const languages = ['en', 'es', 'pt', 'fr'];
  const enSlugs = getAllCalculatorSlugs();
  const params: Array<{ lang: string; slug: string }> = [];

  for (const lang of languages) {
    for (const enSlug of enSlugs) {
      const translatedSlug = getTranslatedSlug(enSlug, lang);
      params.push({
        lang,
        slug: translatedSlug
      });
    }
  }

  return params;
}

/**
 * Get English slug from translated slug in a specific language
 * Used to map translated URLs back to English content keys
 */
export function getEnglishSlug(translatedSlug: string, lang: string): string {
  if (lang === 'en') {
    return translatedSlug;
  }

  const contentDir = path.join(process.cwd(), 'content', 'calculators');
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'));
  
  for (const file of files) {
    try {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(fileContent);
      
      // Check if this is the calculator with matching translated slug
      const currentTranslatedSlug = data[lang]?.slug || data.en?.slug || file.replace('.json', '');
      if (currentTranslatedSlug === translatedSlug) {
        // Return English slug
        return data.en?.slug || file.replace('.json', '');
      }
    } catch (error) {
      continue;
    }
  }
  
  return translatedSlug; // Fallback - assume it's an English slug
}
