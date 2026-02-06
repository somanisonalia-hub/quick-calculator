/**
 * Calculator Relationships Mapping
 * Defines which calculators are related to each other for cross-promotion
 * 
 * Uses smart auto-mapping:
 * 1. Groups calculators by category (financial, health, math, lifestyle, utility)
 * 2. For unmapped calculators, intelligently suggests others from same category
 * 3. Includes manual relationships for high-value correlations
 * 4. Language-aware: Only shows calculators available in the current language
 * 5. Uses centralized translations from calculatorLabels.ts
 */

import { CALCULATOR_CATEGORIES } from './categoryUtils';
import { loadCalculatorContent } from './contentRegistry';
import { getAvailableCalculators } from './contentRegistry';
import { getCalculatorLabel } from './calculatorLabels';

interface CalculatorRelation {
  slug: string;
  name: string;
  summary: string;
}

/**
 * Manual calculator relationships for high-value cross-promotions
 * These take precedence over auto-generated relationships
 */
export const manualCalculatorRelationships: Record<string, CalculatorRelation[]> = {
  // FINANCIAL CALCULATORS
  'mortgage-calculator': [
    { slug: 'home-affordability-calculator', name: 'Home Affordability Calculator', summary: 'Determine how much home you can afford' },
    { slug: 'rent-vs-buy-calculator', name: 'Rent vs Buy Calculator', summary: 'Compare renting vs buying costs' },
    { slug: 'loan-calculator', name: 'Loan Calculator', summary: 'Calculate personal and business loans' },
    { slug: 'interest-only-mortgage-calculator', name: 'Interest-Only Mortgage Calculator', summary: 'Calculate interest-only mortgage payments' },
    { slug: 'property-tax-calculator', name: 'Property Tax Calculator', summary: 'Estimate property tax payments' },
  ],

  'loan-calculator': [
    { slug: 'mortgage-calculator', name: 'Mortgage Calculator', summary: 'Calculate home loan payments' },
    { slug: 'car-loan-calculator', name: 'Car Loan Calculator', summary: 'Calculate auto loan payments' },
    { slug: 'advanced-loan-calculator', name: 'Advanced Loan Calculator', summary: 'Advanced loan calculations' },
    { slug: 'debt-payoff-calculator', name: 'Debt Payoff Calculator', summary: 'Plan your debt repayment' },
    { slug: 'emi-calculator', name: 'EMI Calculator', summary: 'Calculate equated monthly installments' },
  ],

  'compound-interest-calculator': [
    { slug: 'simple-interest-calculator', name: 'Simple Interest Calculator', summary: 'Calculate simple interest' },
    { slug: 'investment-calculator', name: 'Investment Calculator', summary: 'Track investment growth' },
    { slug: 'future-value-calculator', name: 'Future Value Calculator', summary: 'Calculate future investment value' },
    { slug: 'savings-calculator', name: 'Savings Calculator', summary: 'Plan your savings growth' },
    { slug: 'retirement-calculator', name: 'Retirement Calculator', summary: 'Plan for retirement' },
  ],

  'investment-calculator': [
    { slug: 'compound-interest-calculator', name: 'Compound Interest Calculator', summary: 'Understand compound growth' },
    { slug: 'stock-return-calculator', name: 'Stock Return Calculator', summary: 'Calculate stock investment returns' },
    { slug: 'retirement-calculator', name: 'Retirement Calculator', summary: 'Plan for retirement' },
    { slug: 'savings-goal-calculator', name: 'Savings Goal Calculator', summary: 'Set and track savings goals' },
  ],

  'debt-payoff-calculator': [
    { slug: 'loan-calculator', name: 'Loan Calculator', summary: 'Calculate loan payments' },
    { slug: 'credit-card-payoff', name: 'Credit Card Payoff Calculator', summary: 'Plan credit card debt elimination' },
    { slug: 'debt-consolidation-calculator', name: 'Debt Consolidation Calculator', summary: 'Evaluate consolidation options' },
    { slug: 'budget-calculator', name: 'Budget Calculator', summary: 'Create and manage your budget' },
  ],

  'salary-calculator': [
    { slug: 'hourly-to-salary-calculator', name: 'Hourly to Salary Calculator', summary: 'Convert hourly wage to salary' },
    { slug: 'tax-calculator', name: 'Tax Calculator', summary: 'Estimate income taxes' },
    { slug: 'paycheck-calculator', name: 'Paycheck Calculator', summary: 'Calculate take-home pay' },
    { slug: 'net-income-calculator', name: 'Net Income Calculator', summary: 'Calculate after-tax income' },
  ],

  'retirement-calculator': [
    { slug: 'savings-calculator', name: 'Savings Calculator', summary: 'Calculate retirement savings' },
    { slug: 'compound-interest-calculator', name: 'Compound Interest Calculator', summary: 'Understand compound growth' },
    { slug: 'social-security-calculator', name: 'Social Security Calculator', summary: 'Estimate social security benefits' },
    { slug: 'investment-calculator', name: 'Investment Calculator', summary: 'Track investment growth' },
  ],

  // HEALTH CALCULATORS
  'bmi-calculator': [
    { slug: 'ideal-weight-calculator', name: 'Ideal Weight Calculator', summary: 'Find your ideal weight' },
    { slug: 'body-fat-calculator', name: 'Body Fat Calculator', summary: 'Calculate body fat percentage' },
    { slug: 'tdee-calculator', name: 'TDEE Calculator', summary: 'Calculate daily calorie needs' },
    { slug: 'calorie-calculator', name: 'Calorie Calculator', summary: 'Track daily calories' },
  ],

  'calorie-calculator': [
    { slug: 'tdee-calculator', name: 'TDEE Calculator', summary: 'Calculate daily calorie needs' },
    { slug: 'protein-intake-calculator', name: 'Protein Intake Calculator', summary: 'Calculate daily protein needs' },
    { slug: 'maintenance-calories-calculator', name: 'Maintenance Calories Calculator', summary: 'Calculate maintenance calories' },
    { slug: 'bmi-calculator', name: 'BMI Calculator', summary: 'Calculate body mass index' },
  ],

  'tdee-calculator': [
    { slug: 'calorie-calculator', name: 'Calorie Calculator', summary: 'Track daily calorie intake' },
    { slug: 'maintenance-calories-calculator', name: 'Maintenance Calories Calculator', summary: 'Find your maintenance calories' },
    { slug: 'protein-intake-calculator', name: 'Protein Intake Calculator', summary: 'Calculate protein needs' },
    { slug: 'bmr-calculator', name: 'BMR Calculator', summary: 'Calculate basal metabolic rate' },
  ],

  'pregnancy-calculator': [
    { slug: 'due-date-calculator', name: 'Due Date Calculator', summary: 'Calculate your due date' },
    { slug: 'ovulation-calculator', name: 'Ovulation Calculator', summary: 'Track ovulation cycle' },
    { slug: 'ideal-weight-calculator', name: 'Ideal Weight Calculator', summary: 'Track pregnancy weight' },
  ],

  // MATH CALCULATORS
  'grade-calculator': [
    { slug: 'gpa-calculator', name: 'GPA Calculator', summary: 'Calculate your GPA' },
    { slug: 'exam-score-predictor', name: 'Exam Score Predictor', summary: 'Predict exam scores needed' },
    { slug: 'percentage-calculator', name: 'Percentage Calculator', summary: 'Calculate percentages' },
  ],

  'tip-calculator': [
    { slug: 'percentage-calculator', name: 'Percentage Calculator', summary: 'Calculate percentages' },
    { slug: 'discount-calculator', name: 'Discount Calculator', summary: 'Calculate discounts' },
    { slug: 'budget-calculator', name: 'Budget Calculator', summary: 'Manage your budget' },
  ],

  'date-calculator': [
    { slug: 'age-calculator', name: 'Age Calculator', summary: 'Calculate your exact age' },
    { slug: 'pregnancy-calculator', name: 'Pregnancy Calculator', summary: 'Calculate due date' },
    { slug: 'due-date-calculator', name: 'Due Date Calculator', summary: 'Calculate due dates' },
  ],

  'unit-converter': [
    { slug: 'temperature-converter', name: 'Temperature Converter', summary: 'Convert temperatures' },
    { slug: 'weight-converter', name: 'Weight Converter', summary: 'Convert weight units' },
    { slug: 'length-converter', name: 'Length Converter', summary: 'Convert length units' },
    { slug: 'percentage-calculator', name: 'Percentage Calculator', summary: 'Percentage calculations' },
  ],

  'percentage-calculator': [
    { slug: 'percentage-change-calculator', name: 'Percentage Change Calculator', summary: 'Calculate percentage change' },
    { slug: 'discount-calculator', name: 'Discount Calculator', summary: 'Calculate discounts' },
    { slug: 'tip-calculator', name: 'Tip Calculator', summary: 'Calculate tips' },
    { slug: 'tax-calculator', name: 'Tax Calculator', summary: 'Calculate taxes' },
  ],

  'percentage-change-calculator': [
    { slug: 'percentage-calculator', name: 'Percentage Calculator', summary: 'Basic percentage calculations' },
    { slug: 'inflation-calculator', name: 'Inflation Calculator', summary: 'Calculate inflation impact' },
    { slug: 'investment-calculator', name: 'Investment Calculator', summary: 'Track investment changes' },
  ],

  // UTILITY CALCULATORS
  'concrete-calculator': [
    { slug: 'square-footage-calculator', name: 'Square Footage Calculator', summary: 'Calculate area' },
    { slug: 'volume-calculator', name: 'Volume Calculator', summary: 'Calculate volume' },
    { slug: 'paint-calculator', name: 'Paint Calculator', summary: 'Calculate paint needed' },
  ],

  'protein-intake-calculator': [
    { slug: 'macro-calculator', name: 'Macro Calculator', summary: 'Calculate macronutrients' },
    { slug: 'calorie-calculator', name: 'Calorie Calculator', summary: 'Calculate calories' },
    { slug: 'tdee-calculator', name: 'TDEE Calculator', summary: 'Calculate daily calorie needs' },
    { slug: 'water-intake-calculator', name: 'Water Intake Calculator', summary: 'Calculate water needs' },
  ],
};

/**
 * Get related calculators for a specific calculator
 * Language-aware: Only returns calculators available in the specified language
 * PRIORITIZES high-traffic calculators from getPopularCalculators
 * @param slug - The calculator slug
 * @param language - The language code (en, es, pt, fr)
 * @param limit - Maximum number of related calculators to return
 * @returns Array of related calculator objects
 */
export function getRelatedCalculators(slug: string, language: string = 'en', limit: number = 6): CalculatorRelation[] {
  // Get all available calculators in this language
  const availableInLanguage = getAvailableCalculators(language);
  
  // Start with high-traffic popular calculators (prioritized)
  const popular = getPopularCalculators(language, limit * 2); // Get more to filter from
  let result: CalculatorRelation[] = [];
  const addedSlugs = new Set<string>();
  
  // Exclude the current calculator
  addedSlugs.add(slug);
  
  // Add popular calculators first (high-traffic priority)
  for (const calc of popular) {
    if (!addedSlugs.has(calc.slug) && result.length < limit) {
      result.push(calc);
      addedSlugs.add(calc.slug);
    }
  }
  
  // If we still need more, add from manual relationships
  const manualRelations = manualCalculatorRelationships[slug] || [];
  for (const calc of manualRelations) {
    if (!addedSlugs.has(calc.slug) && availableInLanguage.includes(calc.slug) && result.length < limit) {
      result.push(calc);
      addedSlugs.add(calc.slug);
    }
  }

  return result.slice(0, limit);
}

/**
 * Get a curated list of popular calculators for cross-promotion
 * Language-aware: Only returns calculators available in the specified language
 * Category-aware: Shows 5-8 popular calculators from EACH category for better internal linking
 * Used for calculators without specific relationships or as fallback
 */
export function getPopularCalculators(language: string = 'en', limit: number = 6): CalculatorRelation[] {
  // Get all available calculators in this language
  const availableInLanguage = getAvailableCalculators(language);
  
  // Pre-defined popular calculators from each category for better cross-promotion
  // Ordered by traffic potential (monthly searches) based on HIGH-TRAFFIC-CALCULATORS-PLAN.md
  const categoryPopulars: Record<string, string[]> = {
    financial: [
      'mortgage-calculator',          // 150K searches - High CPC $2-5
      'compound-interest-calculator', // 90K searches - CPC $1-3
      'loan-calculator',              // 60K searches - High CPC $2-4
      'debt-payoff-calculator',       // 55K searches - High CPC $2-4
      'investment-calculator',        // High value
      'retirement-calculator',        // Repeat visitors
      'tax-calculator',               // Seasonal traffic
      'salary-calculator',            // Regular searches
    ],
    health: [
      'bmi-calculator',               // 250K searches - Highest traffic
      'pregnancy-calculator',         // 110K searches - Dedicated audience
      'calorie-deficit-calculator',   // 65K searches - Weight loss focus
      'protein-calculator',           // 45K searches - Fitness audience
      'tdee-calculator',              // Popular fitness tool
      'calorie-calculator',           // Daily use
      'body-fat-calculator',          // Health metrics
      'ideal-weight-calculator',      // Goal setting
      'bmr-calculator',               // Metabolism tracking
    ],
    math: [
      'percentage-change-calculator', // 110K searches - Business + students
      'grade-calculator',             // 80K searches - Student traffic
      'percentage-calculator',        // Broad audience
      'tip-calculator',               // 90K searches - Daily use
      'discount-calculator',          // 85K searches - Shopping seasons
      'date-calculator',              // 75K searches - Planning tool
      'unit-converter',               // 200K+ searches - Essential tool
      'average-calculator',           // Student traffic
      'fraction-calculator',          // Math students
    ],
    lifestyle: [
      'pregnancy-calculator',         // 110K searches - Dedicated audience
      'pet-age-calculator',           // 40K searches - Pet owners
      'tip-calculator',               // 90K searches - Daily dining
      'date-calculator',              // 75K searches - Event planning
      'age-calculator',               // Personal interest
      'ovulation-calculator',         // Family planning
      'sleep-calculator',             // Health conscious
      'water-intake-calculator',      // Fitness tracking
    ],
    utility: [
      'unit-converter',               // 200K+ searches - Most popular
      'tip-calculator',               // 90K searches - Daily use
      'discount-calculator',          // 85K searches - Shopping tool
      'date-calculator',              // 75K searches - Planning
      'paint-calculator',             // 65K searches - High CPC $1-2.5
      'fuel-economy-calculator',      // 60K searches - Gas prices
      'electricity-cost-calculator',  // 50K searches - High CPC $2-4
      'concrete-calculator',          // 45K searches - Construction
      'roof-pitch-calculator',        // 35K searches - High CPC $2-4
      'currency-converter',           // International travel
      'password-generator',           // Security tool
      'word-counter',                 // Content creators
    ],
  };

  // Collect popular calculators from each category
  const result: CalculatorRelation[] = [];
  const addedSlugs = new Set<string>();

  // Pick 5-8 from each category for diverse internal linking
  for (const [category, populars] of Object.entries(categoryPopulars)) {
    let categoryCount = 0;
    const categoryLimit = 7; // 5-8 per category
    
    for (const slug of populars) {
      if (categoryCount >= categoryLimit) break;
      if (availableInLanguage.includes(slug) && !addedSlugs.has(slug)) {
        try {
          const label = getCalculatorLabel(slug, language);
          result.push({
            slug,
            name: label.name,
            summary: label.summary
          });
          addedSlugs.add(slug);
          categoryCount++;
        } catch (err) {
          // Skip if label can't be loaded
          console.log(`Could not load label for ${slug}`);
        }
      }
    }
  }

  // Return diverse results across all categories (minimum 12 for good distribution)
  return result.slice(0, Math.max(limit, 12));
}
