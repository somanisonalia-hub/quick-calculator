import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-static'

export async function GET() {
  const baseUrl = 'https://quick-calculator.org'
  const lang = 'en'
  const sitemap: MetadataRoute.Sitemap = []

  // Load all calculators
  const contentDir = path.join(process.cwd(), 'content', 'calculators')
  const calculatorFiles = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'))
  const calculatorSlugs = calculatorFiles.map(f => f.replace('.json', ''))

  // Homepage
  sitemap.push({
    url: `${baseUrl}/${lang}/`
  })

  // All calculators
  calculatorSlugs.forEach(slug => {
    sitemap.push({
      url: `${baseUrl}/${lang}/${slug}/`
    })
  })

  // Categories
  const categories = ['financial', 'health', 'math', 'utility', 'lifestyle']
  categories.forEach(category => {
    sitemap.push({
      url: `${baseUrl}/${lang}/categories/${category}/`
    })
  })

  // Legal and static pages
  sitemap.push(
    { url: `${baseUrl}/${lang}/privacy-policy/` },
    { url: `${baseUrl}/${lang}/terms-of-service/` },
    { url: `${baseUrl}/${lang}/cookie-policy/` },
    { url: `${baseUrl}/${lang}/disclaimer/` },
    { url: `${baseUrl}/${lang}/about-us/` },
    { url: `${baseUrl}/${lang}/contact/` }
  )

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap.map(item => `  <url>
    <loc>${item.url}</loc>
  </url>`).join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
