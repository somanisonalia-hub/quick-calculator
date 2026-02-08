import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemapIndex(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://quick-calculator.org/sitemap-en.xml',
    },
    {
      url: 'https://quick-calculator.org/sitemap-es.xml',
    },
    {
      url: 'https://quick-calculator.org/sitemap-pt.xml',
    },
    {
      url: 'https://quick-calculator.org/sitemap-fr.xml',
    },
    {
      url: 'https://quick-calculator.org/sitemap-de.xml',
    },
    {
      url: 'https://quick-calculator.org/sitemap-nl.xml',
    },
  ]
}
