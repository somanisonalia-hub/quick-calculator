import Head from 'next/head';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  structuredData?: object;
  locale?: string;
  availableLanguages?: string[]; // Languages that have alternate versions of this page
}

export default function SEOHead({
  title,
  description,
  keywords,
  canonicalUrl,
  structuredData,
  locale = 'en',
  availableLanguages = ['en', 'es', 'pt', 'fr', 'de', 'nl'] // Default: all languages
}: SEOHeadProps) {
  const siteUrl = 'https://quick-calculator.org'; // Replace with your actual domain
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;

  // Define all possible hreflang entries
  const allLanguageEntries = [
    { code: 'en', path: `${siteUrl}${canonicalUrl || '/'}` },
    { code: 'es', path: `${siteUrl}/es${canonicalUrl || '/'}` },
    { code: 'pt', path: `${siteUrl}/pt${canonicalUrl || '/'}` },
    { code: 'fr', path: `${siteUrl}/fr${canonicalUrl || '/'}` },
    { code: 'de', path: `${siteUrl}/de${canonicalUrl || '/'}` },
    { code: 'nl', path: `${siteUrl}/nl${canonicalUrl || '/'}` },
  ];

  // Filter to only include languages that are available
  const availableLanguageCodes = new Set(availableLanguages);
  const hrefLangLinks = allLanguageEntries.filter(entry => availableLanguageCodes.has(entry.code));

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow" />
      <meta name="language" content={locale} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullCanonicalUrl} />
      <meta property="og:site_name" content="Quick Calculator" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={fullCanonicalUrl} />
      
      {/* Add hreflang links only for available languages */}
      {hrefLangLinks.map(entry => (
        <link 
          key={entry.code} 
          rel="alternate" 
          hrefLang={entry.code} 
          href={entry.path} 
        />
      ))}
      
      {/* x-default hreflang always points to English */}
      <link rel="alternate" hrefLang="x-default" href={`${siteUrl}${canonicalUrl || '/'}`} />

      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
    </Head>
  );
}
