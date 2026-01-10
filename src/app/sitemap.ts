import { MetadataRoute } from 'next'
import { getAllCalculatorsForHomepage } from '../lib/categoryUtils'

const baseUrl = 'https://quick-calculator.com'

// Supported languages
const languages = ['en']

// Static pages that should be included
const staticPages = [
  { slug: '', priority: 1.0, changefreq: 'weekly' }, // Homepage
  { slug: 'contact', priority: 0.5, changefreq: 'monthly' },
  { slug: 'about', priority: 0.5, changefreq: 'monthly' },
  { slug: 'privacy-policy', priority: 0.3, changefreq: 'yearly' },
  { slug: 'terms-of-service', priority: 0.3, changefreq: 'yearly' },
  { slug: 'disclaimer', priority: 0.3, changefreq: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = []

  // Get Phase 1 calculators (only these should be indexed)
  const calculators = getAllCalculatorsForHomepage('en')

  // Add calculator pages for each language
  languages.forEach(lang => {
    // Calculator pages
    calculators.forEach(calc => {
      sitemap.push({
        url: `${baseUrl}/${lang}/${calc.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: calc.featured ? 0.9 : 0.8,
      })
    })

    // Static pages
    staticPages.forEach(page => {
      sitemap.push({
        url: `${baseUrl}/${lang}${page.slug ? '/' + page.slug : ''}`,
        lastModified: new Date(),
        changeFrequency: page.changefreq as any,
        priority: page.priority,
      })
    })
  })

  return sitemap
}
