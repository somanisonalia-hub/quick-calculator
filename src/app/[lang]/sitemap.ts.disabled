import { MetadataRoute } from 'next';
import { getAvailableCalculators } from '@/lib/contentRegistry';
import DE_NL_SELECTED_CALCULATORS from '@/lib/DE_NL_SELECTED_CALCULATORS.json';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'es' },
    { lang: 'pt' },
    { lang: 'fr' },
    { lang: 'de' },
    { lang: 'nl' },
  ];
}

export default async function sitemap(props?: { 
  params?: Promise<{ lang: string }> 
}): Promise<MetadataRoute.Sitemap> {
  let lang = 'en';
  
  if (props?.params) {
    const params = await props.params;
    lang = params?.lang || 'en';
  }
  const baseUrl = 'https://quick-calculator.org';
  const langPrefix = lang === 'en' ? '' : `/${lang}`;

  const sitemap: MetadataRoute.Sitemap = [];

  // Add home page
  sitemap.push({
    url: `${baseUrl}${langPrefix}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  });

  // Add all calculator pages
  try {
    let calculators = getAvailableCalculators(lang);
    
    // Filter to only selected calculators for DE/NL pages
    if (['de', 'nl'].includes(lang)) {
      calculators = calculators.filter(slug =>
        DE_NL_SELECTED_CALCULATORS.calculators.includes(slug)
      );
    }
    
    calculators.forEach(slug => {
      sitemap.push({
        url: `${baseUrl}${langPrefix}/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    });
  } catch (error) {
    console.warn(`Failed to load calculators for language ${lang}:`, error);
  }

  // Add category pages
  const categories = ['financial', 'health', 'math', 'utility', 'lifestyle'];
  categories.forEach(category => {
    sitemap.push({
      url: `${baseUrl}${langPrefix}/category/${category}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  });

  return sitemap;
}
