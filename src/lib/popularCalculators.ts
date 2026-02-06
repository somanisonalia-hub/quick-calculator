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
    'break-even-calculator',
    'mortgage-calculator',
    'loan-calculator',
    'savings-calculator',
    'car-loan-calculator',
    '401k-calculator',
    'budget-calculator',
    'credit-card-calculator'
  ],
  health: [
    'bmi-calculator',
    'calorie-burned-calculator',
    'ideal-weight-calculator',
    'tdee-calculator',
    'water-intake-calculator',
    'pregnancy-calculator',
    'waist-to-hip-ratio-calculator',
    'macro-calculator',
    'protein-intake-calculator',
    'body-fat-calculator',
    'bmr-calculator',
    'calorie-calculator',
    'calorie-deficit-calculator',
    'due-date-calculator',
    'sleep-calculator',
    'wellness-tracker-calculator',
    'fitness-metrics-calculator',
    'height-calculator',
    'pace-calculator'
  ],
  math: [
    'percentage-calculator',
    'average-calculator',
    'fraction-calculator',
    'scientific-calculator',
    'pythagorean-theorem-calculator',
    'standard-deviation-calculator',
    'ratio-calculator',
    'gcd-lcm-calculator',
    'prime-factorization-calculator',
    'triangle-area-calculator',
    'circle-area-calculator',
    'circle-circumference-calculator',
    'surface-area-calculator',
    'volume-calculator',
    'mean-median-mode-calculator',
    'exponent-calculator',
    'logarithm-calculator',
    'quadratic-equation-calculator'
  ],
  utility: [
    'word-counter',
    'unit-converter',
    'date-calculator',
    'percentage-calculator',
    'discount-calculator',
    'currency-converter',
    'numbers-to-words-converter',
    'password-generator',
    'ratio-calculator',
    'electricity-cost-calculator',
    'tank-volume-calculator',
    'sales-tax-calculator',
    'overtime-pay-calculator',
    'roman-numeral-converter'
  ],
  lifestyle: [
    'age-calculator',
    'tip-calculator',
    'gpa-calculator',
    'love-calculator',
    'rent-vs-buy-calculator'
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
