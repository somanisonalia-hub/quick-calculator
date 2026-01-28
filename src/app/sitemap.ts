import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

// Mark as static for static export
export const dynamic = 'force-static'

const baseUrl = 'https://quick-calculator.org'

// Supported languages (EN first for prioritization)
const languages = ['en', 'es', 'pt', 'fr']

// High-traffic calculators (prioritize for faster indexing)
const highTrafficCalculators = new Set([
  'loan-calculator', 'mortgage-calculator', 'bmi-calculator', 'tax-calculator',
  'percentage-calculator', 'salary-calculator', 'calorie-calculator', 
  'compound-interest-calculator', 'budget-calculator', 'savings-calculator',
  'car-loan-calculator', 'retirement-calculator', 'credit-card-calculator',
  'investment-calculator', 'tip-calculator', 'age-calculator'
])

// Medium-traffic calculators
const mediumTrafficCalculators = new Set([
  'emi-calculator', 'simple-interest-calculator', 'property-tax-calculator',
  'paycheck-calculator', 'hourly-to-salary-calculator', 'bmr-calculator',
  'body-fat-calculator', 'unit-converter', 'currency-converter',
  'gpa-calculator', 'debt-consolidation-calculator', 'stock-return-calculator'
])

// Static pages configuration
const staticPages = [
  { slug: '', priority: 1.0, changefreq: 'daily' }, // Homepage - highest priority
  { slug: 'contact', priority: 0.5, changefreq: 'monthly' },
  { slug: 'about', priority: 0.5, changefreq: 'monthly' },
  { slug: 'privacy-policy', priority: 0.3, changefreq: 'yearly' },
  { slug: 'terms-of-service', priority: 0.3, changefreq: 'yearly' },
  { slug: 'disclaimer', priority: 0.3, changefreq: 'yearly' },
]

// Category pages (if they exist)
const categories = [
  { slug: 'financial', priority: 0.8, changefreq: 'weekly' },
  { slug: 'health', priority: 0.8, changefreq: 'weekly' },
  { slug: 'math', priority: 0.7, changefreq: 'weekly' },
  { slug: 'conversion', priority: 0.7, changefreq: 'weekly' },
]

/**
 * Get priority for calculator based on traffic potential
 */
function getCalculatorPriority(slug: string): number {
  if (highTrafficCalculators.has(slug)) return 0.9
  if (mediumTrafficCalculators.has(slug)) return 0.8
  return 0.7
}

/**
 * Get change frequency for calculator
 */
function getCalculatorChangeFreq(slug: string): 'daily' | 'weekly' | 'monthly' {
  if (highTrafficCalculators.has(slug)) return 'weekly'
  return 'monthly'
}

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = []

  // Load all calculators dynamically from content directory
  const contentDir = path.join(process.cwd(), 'content', 'calculators')
  const calculatorFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'))
  const calculatorSlugs = calculatorFiles.map(f => f.replace('.json', ''))

  // Prioritize English pages first (helps with crawl budget)
  const prioritizedLanguages = ['en', 'es', 'pt', 'fr']

  prioritizedLanguages.forEach(lang => {
    // Homepage for each language
    sitemap.push({
      url: `${baseUrl}/${lang}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    })

    // High-traffic calculators first (crawl these first)
    const highTrafficCalcs = calculatorSlugs.filter(slug => highTrafficCalculators.has(slug))
    highTrafficCalcs.forEach(slug => {
      sitemap.push({
        url: `${baseUrl}/${lang}/${slug}/`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      })
    })

    // Medium-traffic calculators
    const mediumTrafficCalcs = calculatorSlugs.filter(slug => mediumTrafficCalculators.has(slug))
    mediumTrafficCalcs.forEach(slug => {
      sitemap.push({
        url: `${baseUrl}/${lang}/${slug}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    })

    // Remaining calculators
    const remainingCalcs = calculatorSlugs.filter(slug => 
      !highTrafficCalculators.has(slug) && !mediumTrafficCalculators.has(slug)
    )
    remainingCalcs.forEach(slug => {
      sitemap.push({
        url: `${baseUrl}/${lang}/${slug}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    })

    // Static pages
    staticPages.forEach(page => {
      if (page.slug === '' && lang !== 'en') return // Already added homepage above
      sitemap.push({
        url: `${baseUrl}/${lang}${page.slug ? '/' + page.slug : ''}/`,
        lastModified: new Date(),
        changeFrequency: page.changefreq as any,
        priority: page.priority,
      })
    })
  })

  return sitemap
}
