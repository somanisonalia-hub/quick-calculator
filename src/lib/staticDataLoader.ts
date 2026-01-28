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
 */
export function getAllCalculatorSlugs(): string[] {
  const contentDir = path.join(process.cwd(), 'content', 'calculators');
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'));
  return files.map(f => f.replace('.json', ''));
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
      const filePath = path.join(process.cwd(), 'content', 'calculators', `${slug}.json`);
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
    'profitability-ratios-calculator': '📈'
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
 */
export function getCalculatorCategory(slug: string): string {
  const CALCULATOR_CATEGORIES: Record<string, string> = {
    // Financial
    'loan-calculator': 'financial',
    'mortgage-calculator': 'financial',
    'emi-calculator': 'financial',
    'car-loan-calculator': 'financial',
    'interest-only-mortgage-calculator': 'financial',
    'simple-interest-calculator': 'financial',
    'compound-interest-calculator': 'financial',
    'investment-calculator': 'financial',
    'income-tax-calculator': 'financial',
    'sales-tax-calculator': 'financial',
    'tax-calculator': 'financial',
    'savings-calculator': 'financial',
    'budget-calculator': 'financial',
    'credit-card-calculator': 'financial',
    'debt-consolidation-calculator': 'financial',
    'inflation-calculator': 'financial',
    'currency-converter': 'financial',
    'property-tax-calculator': 'financial',
    'future-value-calculator': 'financial',
    'advanced-loan-calculator': 'financial',
    'stock-return-calculator': 'financial',
    'life-insurance-calculator': 'financial',
    'car-insurance-calculator': 'financial',
    'health-insurance-calculator': 'financial',
    'hourly-to-salary-calculator': 'financial',
    'net-income-calculator': 'financial',
    'salary-calculator': 'financial',
    'overtime-pay-calculator': 'financial',
    'take-home-pay-calculator': 'financial',
    'crypto-roi-calculator': 'financial',
    'car-payment-calculator': 'financial',
    'retirement-calculator': 'financial',
    'paycheck-calculator': 'financial',
    'stock-ratios-calculator': 'financial',
    'profitability-ratios-calculator': 'financial',
    
    // Health
    'bmi-calculator': 'health',
    'bmr-calculator': 'health',
    'calorie-calculator': 'health',
    'tdee-calculator': 'health',
    'body-fat-calculator': 'health',
    'ideal-weight-calculator': 'health',
    'protein-intake-calculator': 'health',
    'water-intake-calculator': 'health',
    'lean-body-mass-calculator': 'health',
    'maintenance-calories-calculator': 'health',
    'waist-to-hip-ratio-calculator': 'health',
    
    // Math
    'percentage-calculator': 'math',
    'percentage-change-calculator': 'math',
    'fraction-calculator': 'math',
    'ratio-calculator': 'math',
    'scientific-calculator': 'math',
    'average-calculator': 'math',
    'standard-deviation-calculator': 'math',
    'pythagorean-theorem-calculator': 'math',
    'circle-area-calculator': 'math',
    'circle-circumference-calculator': 'math',
    'triangle-area-calculator': 'math',
    'quadratic-equation-calculator': 'math',
    'volume-calculator': 'math',
    'surface-area-calculator': 'math',
    
    // Lifestyle
    'age-calculator': 'lifestyle',
    'tip-calculator': 'lifestyle',
    'gpa-calculator': 'lifestyle',
    'expense-calculator': 'lifestyle',
    
    // Utility
    'square-footage-calculator': 'utility',
    'concrete-calculator': 'utility',
    'feet-inches-calculator': 'utility',
  'tank-volume-calculator': 'utility',
  'word-counter': 'utility',
  'numbers-to-words-converter': 'utility',
  'unit-converter': 'utility',
  'date-calculator': 'utility',
  'grade-calculator': 'utility',
  'biweekly-pay-calculator': 'financial',
  'pregnancy-calculator': 'health',
  'ovulation-calculator': 'health',
  'blood-pressure-calculator': 'health'
};

return CALCULATOR_CATEGORIES[slug] || 'utility';
}
