import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of all calculator slugs
const calculatorSlugs = [
  '401k-calculator',
  'advanced-loan-calculator',
  'age-calculator',
  'amortization-schedule-calculator',
  'apr-calculator',
  'average-calculator',
  'basic-apr-calculator',
  'biweekly-pay-calculator',
  'blood-pressure-calculator',
  'bmi-calculator',
  'bmr-calculator',
  'body-fat-calculator',
  'budget-calculator',
  'calorie-calculator',
  'car-affordability-calculator',
  'car-insurance-calculator',
  'car-loan-calculator',
  'circle-area-calculator',
  'circle-circumference-calculator',
  'compound-interest-calculator',
  'concrete-calculator',
  'credit-card-calculator',
  'crypto-roi-calculator',
  'currency-converter',
  'date-calculator',
  'debt-consolidation-calculator',
  'debt-payoff-calculator',
  'debt-ratios-calculator',
  'ear-calculator',
  'effective-interest-rate-calculator',
  'emi-calculator',
  'equal-principal-amortization-calculator',
  'equivalent-interest-rate-calculator',
  'expense-calculator',
  'feet-inches-calculator',
  'fraction-calculator',
  'future-value-calculator',
  'gpa-calculator',
  'grade-calculator',
  'health-insurance-calculator',
  'home-affordability-calculator',
  'hourly-to-salary-calculator',
  'ideal-weight-calculator',
  'income-tax-calculator',
  'inflation-calculator',
  'interest-calculator',
  'interest-only-mortgage-calculator',
  'interest-rate-table-calculator',
  'investment-calculator',
  'lean-body-mass-calculator',
  'life-insurance-calculator',
  'liquidity-ratios-calculator',
  'loan-affordability-calculator',
  'loan-calculator',
  'loan-comparison-calculator',
  'loan-payment-table-generator',
  'macro-calculator',
  'maintenance-calories-calculator',
  'mean-median-mode-calculator',
  'mortgage-calculator',
  'net-income-calculator',
  'nominal-interest-rate-calculator',
  'numbers-to-words-converter',
  'operations-ratios-calculator',
  'overtime-pay-calculator',
  'ovulation-calculator',
  'password-generator',
  'paycheck-calculator',
  'percent-calculator',
  'percentage-calculator',
  'percentage-change-calculator',
  'periodic-interest-rate-calculator',
  'pregnancy-calculator',
  'profitability-ratios-calculator',
  'property-tax-calculator',
  'protein-intake-calculator',
  'pythagorean-theorem-calculator',
  'quadratic-equation-calculator',
  'ratio-calculator',
  'retirement-calculator',
  'roth-ira-calculator',
  'salary-calculator',
  'sales-tax-calculator',
  'savings-calculator',
  'savings-goal-calculator',
  'scientific-calculator',
  'simple-interest-calculator',
  'social-security-calculator',
  'square-footage-calculator',
  'standard-deviation-calculator',
  'stock-ratios-calculator',
  'stock-return-calculator',
  'surface-area-calculator',
  'take-home-pay-calculator',
  'tank-volume-calculator',
  'tax-calculator',
  'tdee-calculator',
  'tip-calculator',
  'triangle-area-calculator',
  'unit-conversion-calculator',
  'unit-converter',
  'volume-calculator',
  'waist-to-hip-ratio-calculator',
  'water-intake-calculator',
  'word-counter',
  'personal-budget-calculator',
  'investment-return-calculator',
  'credit-card-payoff-calculator',
  'roi-calculator'
];

const categorySlugs = ['financial', 'health', 'math', 'utility', 'lifestyle'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is a calculator slug without language prefix
  if (calculatorSlugs.some(slug => pathname === `/${slug}` || pathname === `/${slug}/`)) {
    const slug = pathname.replace(/^\/|\/$/g, '');
    const newUrl = new URL(`/en/${slug}`, request.url);
    return NextResponse.redirect(newUrl, { status: 301 });
  }

  // Check if the path is a category without language prefix
  if (categorySlugs.some(category => pathname === `/categories/${category}` || pathname === `/categories/${category}/`)) {
    const category = pathname.replace(/^\/categories\/|\/$/g, '');
    const newUrl = new URL(`/en/categories/${category}`, request.url);
    return NextResponse.redirect(newUrl, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};