/**
 * Popular/High-Traffic Calculators by Category
 * These are curated lists of the most useful and frequently used calculators
 */

export const POPULAR_CALCULATORS: Record<string, string[]> = {
  financial: [
    'sip-calculator',
    'emi-calculator',
    'compound-interest-calculator',
    'mutual-fund-xirr-calculator',
    'tax-calculator',
    'take-home-pay-calculator',
    'home-affordability-calculator',
    'retirement-calculator',
    'investment-calculator',
    'mutual-fund-inflation-calculator',
    'lumpsum-investment-calculator',
    'property-tax-calculator',
    'break-even-calculator'
  ],
  health: [
    'bmi-calculator',
    'calorie-burned-calculator',
    'ideal-weight-calculator',
    'tdee-calculator',
    'water-intake-calculator',
    'pregnancy-due-date-calculator',
    'waist-to-hip-ratio-calculator',
    'macro-calculator',
    'protein-intake-calculator',
    'heart-rate-calculator',
    'body-fat-calculator'
  ],
  math: [
    'gcd-lcm-calculator',
    'prime-factorization-calculator',
    'percentage-calculator',
    'average-calculator',
    'area-volume-calculator',
    'triangle-area-calculator',
    'square-calculator',
    'circle-calculator',
    'rectangle-area-calculator',
    'surface-area-calculator',
    'mean-median-mode-calculator'
  ],
  utility: [
    'unit-conversion-calculator',
    'age-calculator',
    'date-calculator',
    'word-counter',
    'tip-calculator',
    'discount-calculator',
    'percentage-calculator',
    'ratio-calculator',
    'tank-volume-calculator',
    'password-strength-calculator'
  ],
  lifestyle: [
    'trip-planner',
    'date-calculator',
    'age-calculator',
    'rent-vs-buy-calculator',
    'study-hours-planner',
    'productivity-calculator',
    'stock-return-calculator'
  ]
};

/**
 * Get popular calculators for a specific category
 */
export function getPopularCalculatorsForCategory(category: string): string[] {
  return POPULAR_CALCULATORS[category] || [];
}

/**
 * Check if a calculator is in the popular list
 */
export function isPopularCalculator(slug: string, category: string): boolean {
  const populars = getPopularCalculatorsForCategory(category);
  return populars.includes(slug);
}
