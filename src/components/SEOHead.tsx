import Head from 'next/head';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  structuredData?: object;
  locale?: string;
}

export default function SEOHead({
  title,
  description,
  keywords,
  canonicalUrl,
  structuredData,
  locale = 'en'
}: SEOHeadProps) {
  const siteUrl = 'https://quick-calculator.org'; // Replace with your actual domain
  const fullCanonicalUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;

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
      <link rel="alternate" hrefLang="en" href={`${siteUrl}${canonicalUrl || '/'}`} />
      <link rel="alternate" hrefLang="es" href={`${siteUrl}/es${canonicalUrl || '/'}`} />
      <link rel="alternate" hrefLang="pt" href={`${siteUrl}/pt${canonicalUrl || '/'}`} />
      <link rel="alternate" hrefLang="fr" href={`${siteUrl}/fr${canonicalUrl || '/'}`} />
      <link rel="alternate" hrefLang="de" href={`${siteUrl}/de${canonicalUrl || '/'}`} />
      <link rel="alternate" hrefLang="nl" href={`${siteUrl}/nl${canonicalUrl || '/'}`} />
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
