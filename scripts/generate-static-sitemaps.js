#!/usr/bin/env node

/**
 * Generate Static Sitemaps
 * Creates sitemap.xml (index) and language-specific sitemaps in public/ folder
 * DE and NL have limited calculators (30 selected ones)
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://quick-calculator.org';
const PUBLIC_DIR = path.join(__dirname, '../public');
const CONTENT_DIR = path.join(__dirname, '../content/calculators');

// Languages to generate sitemaps for
const LANGUAGES = ['en', 'es', 'pt', 'fr', 'de', 'nl'];

// Selected calculators for DE/NL (limited set)
const DE_NL_SELECTED = require('../src/lib/DE_NL_SELECTED_CALCULATORS.json');

// Categories
const CATEGORIES = ['financial', 'health', 'math', 'utility', 'lifestyle'];

// Static pages
const STATIC_PAGES = [
  'about-us',
  'contact',
  'privacy-policy',
  'terms-of-service',
  'cookie-policy',
  'disclaimer'
];

/**
 * Get all calculator slugs from content directory
 */
function getAllCalculatorSlugs() {
  const calculators = [];
  
  if (fs.existsSync(CONTENT_DIR)) {
    const files = fs.readdirSync(CONTENT_DIR);
    files.forEach(file => {
      if (file.endsWith('.json') && !file.includes('translation') && !file.includes('english-in')) {
        calculators.push(file.replace('.json', ''));
      }
    });
  }
  
  return calculators.sort();
}

/**
 * Generate sitemap XML for a language
 */
function generateLanguageSitemap(lang, calculatorSlugs) {
  const langPrefix = `/${lang}`;
  const urls = [];
  
  // Add home page
  urls.push({
    loc: `${BASE_URL}${langPrefix}/`
  });
  
  // Add calculator pages
  calculatorSlugs.forEach(slug => {
    urls.push({
      loc: `${BASE_URL}${langPrefix}/${slug}/`
    });
  });
  
  // Add category pages
  CATEGORIES.forEach(category => {
    urls.push({
      loc: `${BASE_URL}${langPrefix}/categories/${category}/`
    });
  });
  
  // Add static pages
  STATIC_PAGES.forEach(page => {
    urls.push({
      loc: `${BASE_URL}${langPrefix}/${page}/`
    });
  });
  
  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
}

/**
 * Generate sitemap index
 */
function generateSitemapIndex() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  LANGUAGES.forEach(lang => {
    xml += '  <sitemap>\n';
    xml += `    <loc>${BASE_URL}/sitemap-${lang}.xml</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += '  </sitemap>\n';
  });
  
  xml += '</sitemapindex>';
  
  return xml;
}

/**
 * Main function
 */
function main() {
  console.log('🗺️  Generating static sitemaps...\n');
  
  // Get all calculator slugs
  const allCalculators = getAllCalculatorSlugs();
  console.log(`📊 Found ${allCalculators.length} total calculators\n`);
  
  // Generate language-specific sitemaps
  LANGUAGES.forEach(lang => {
    let calculators;
    
    // Use limited set for DE/NL
    if (lang === 'de' || lang === 'nl') {
      calculators = DE_NL_SELECTED.calculators;
      console.log(`📝 Generating sitemap-${lang}.xml (${calculators.length} calculators - LIMITED)`);
    } else {
      calculators = allCalculators;
      console.log(`📝 Generating sitemap-${lang}.xml (${calculators.length} calculators)`);
    }
    
    const xml = generateLanguageSitemap(lang, calculators);
    const filePath = path.join(PUBLIC_DIR, `sitemap-${lang}.xml`);
    fs.writeFileSync(filePath, xml, 'utf-8');
    
    // Count URLs
    const urlCount = (xml.match(/<url>/g) || []).length;
    console.log(`   ✅ Generated with ${urlCount} URLs\n`);
  });
  
  // Generate sitemap index
  console.log('📝 Generating sitemap.xml (index)');
  const indexXml = generateSitemapIndex();
  const indexPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  fs.writeFileSync(indexPath, indexXml, 'utf-8');
  console.log('   ✅ Generated sitemap index\n');
  
  console.log('✨ All sitemaps generated successfully!\n');
  console.log('📊 Summary:');
  console.log(`   • EN, ES, PT, FR: ${allCalculators.length} calculators each`);
  console.log(`   • DE, NL: ${DE_NL_SELECTED.calculators.length} calculators each (limited set)`);
  console.log(`   • Sitemaps location: public/sitemap*.xml`);
}

// Run
main();
