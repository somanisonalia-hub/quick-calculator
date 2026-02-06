// SEO Content Interface
export interface SEOContent {
  introduction: string;
  benefits: string[];
  steps: string[];
  inputsExplained: string[];
  formulaExplanation: string;
  examples: string[];
  resultsExplanation: string[];
  whoItsFor: string;
  disclaimer: string;
  relatedTools: string[];
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
}

// Schema generation interfaces
export interface CalculatorData {
  title: string;
  seoTitle: string;
  slug: string;
  category: string;
  seoContent: SEOContent;
}

export interface CategoryData {
  name: string;
  slug: string;
  description: string;
  calculators: Array<{
    name: string;
    slug: string;
  }>;
}

/**
 * Render structured SEO content as HTML for display
 */
export function renderStructuredSEOContent(seoContent: SEOContent, lang: string = 'en'): string {
  const translations = {
    howDoesWork: { 
      en: 'How Does', 
      es: '¿Cómo Funciona', 
      pt: 'Como Funciona', 
      fr: 'Comment Ça Marche',
      de: 'Wie funktioniert',
      nl: 'Hoe Werkt'
    },
    introduction: { 
      en: 'Introduction', 
      es: 'Introducción', 
      pt: 'Introdução', 
      fr: 'Introduction',
      de: 'Einführung',
      nl: 'Inleiding'
    },
    benefits: { 
      en: 'What This Calculator Helps You Do', 
      es: 'Qué Te Ayuda a Hacer Esta Calculadora', 
      pt: 'O Que Esta Calculadora Te Ajuda a Fazer', 
      fr: 'Ce Que Cette Calculatrice Vous Aide à Faire',
      de: 'Was Dieser Rechner Ihnen Hilft',
      nl: 'Wat Deze Rekenmachine U Helpt Doen'
    },
    howToUse: { 
      en: 'How to Use the Calculator', 
      es: 'Cómo Usar la Calculadora', 
      pt: 'Como Usar a Calculadora', 
      fr: 'Comment Utiliser la Calculatrice',
      de: 'So Verwenden Sie Den Rechner',
      nl: 'Hoe De Rekenmachine Te Gebruiken'
    },
    calculatorInputs: { 
      en: 'Calculator Inputs Explained', 
      es: 'Entradas de la Calculadora Explicadas', 
      pt: 'Entradas da Calculadora Explicadas', 
      fr: 'Entrées de la Calculatrice Expliquées',
      de: 'Rechner-Eingaben Erklärt',
      nl: 'Rekenmachine-invoer Uitgelegd'
    },
    howItWorks: { 
      en: 'How the Calculation Works', 
      es: 'Cómo Funciona el Cálculo', 
      pt: 'Como Funciona o Cálculo', 
      fr: 'Comment Fonctionne le Calcul',
      de: 'Wie Die Berechnung Funktioniert',
      nl: 'Hoe De Berekening Werkt'
    },
    exampleScenarios: { 
      en: 'Example Scenarios', 
      es: 'Escenarios de Ejemplo', 
      pt: 'Cenários de Exemplo', 
      fr: 'Scénarios d\'Exemple',
      de: 'Beispielszenarien',
      nl: 'Voorbeeldscenario\'s'
    },
    understandingResults: { 
      en: 'Understanding Your Results', 
      es: 'Entendiendo Tus Resultados', 
      pt: 'Entendendo Seus Resultados', 
      fr: 'Comprendre Vos Résultats',
      de: 'Ihre Ergebnisse Verstehen',
      nl: 'Uw Resultaten Begrijpen'
    },
    whoItsFor: { 
      en: 'Who Should Use This Calculator', 
      es: 'Quién Debería Usar Esta Calculadora', 
      pt: 'Quem Deve Usar Esta Calculadora', 
      fr: 'Qui Devrait Utiliser Cette Calculatrice',
      de: 'Wer Sollte Diesen Rechner Verwenden',
      nl: 'Wie Moet Deze Rekenmachine Gebruiken'
    },
    importantNotes: { 
      en: 'Important Notes & Disclaimer', 
      es: 'Notas Importantes y Descargo de Responsabilidad', 
      pt: 'Notas Importantes e Isenção de Responsabilidade', 
      fr: 'Notes Importantes et Avis de Non-Responsabilité',
      de: 'Wichtige Hinweise & Haftungsausschluss',
      nl: 'Belangrijke Opmerkingen & Disclaimer'
    },
    relatedTools: { 
      en: 'Related Calculators', 
      es: 'Calculadoras Relacionadas', 
      pt: 'Calculadoras Relacionadas', 
      fr: 'Calculatrices Connexes',
      de: 'Verwandte Rechner',
      nl: 'Gerelateerde Rekenmachines'
    }
  };

  const t = (key: string) => translations[key as keyof typeof translations]?.[lang as keyof typeof translations[keyof typeof translations]] || key;

  const sections = [];

  // Introduction
  if (seoContent.introduction) {
    sections.push(`
      <div class="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
        <h3 class="text-xl font-semibold text-blue-900 mb-3">${t('introduction')}</h3>
        <p class="text-gray-800 leading-relaxed">${seoContent.introduction}</p>
      </div>
    `);
  }

  // Benefits
  if (seoContent.benefits) {
    const benefits = Array.isArray(seoContent.benefits) ? seoContent.benefits : [seoContent.benefits];
    if (benefits.length > 0) {
      sections.push(`
        <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <span class="inline-block w-2 h-2 bg-green-500 rounded-full mr-3"></span>
          ${t('benefits')}
        </h3>
        <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg mb-8">
          <ul class="space-y-3">
            ${benefits.map(benefit => `
              <li class="flex items-start">
                <span class="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span class="text-gray-800 leading-relaxed">${benefit}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      `);
    }
  }

  // How to Use
  if (seoContent.steps) {
    const steps = Array.isArray(seoContent.steps) ? seoContent.steps : [seoContent.steps];
    if (steps.length > 0) {
      sections.push(`
        <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <span class="inline-block w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
          ${t('howToUse')}
        </h3>
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg mb-8">
          <ol class="space-y-3">
            ${steps.map((step, index) => `
              <li class="flex items-start">
                <span class="inline-flex items-center justify-center w-6 h-6 bg-blue-500 text-white text-sm font-bold rounded-full mr-3 flex-shrink-0 mt-0.5">${index + 1}</span>
                <span class="text-gray-800 leading-relaxed">${step}</span>
              </li>
            `).join('')}
          </ol>
        </div>
      `);
    }
  }

  // Calculator Inputs Explained
  if (seoContent.inputsExplained) {
    const inputsExplained = Array.isArray(seoContent.inputsExplained) ? seoContent.inputsExplained : [seoContent.inputsExplained];
    if (inputsExplained.length > 0) {
      sections.push(`
        <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <span class="inline-block w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
          ${t('calculatorInputs')}
        </h3>
        <div class="grid md:grid-cols-2 gap-4 mb-8">
          ${inputsExplained.map(input => `
            <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
              <p class="text-gray-800 leading-relaxed">${input}</p>
            </div>
          `).join('')}
        </div>
      `);
    }
  }

  // How the Calculation Works
  if (seoContent.formulaExplanation) {
    sections.push(`
      <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <span class="inline-block w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
        ${t('howItWorks')}
      </h3>
      <div class="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg mb-8 border-l-4 border-orange-400">
        <p class="text-gray-800 leading-relaxed">${seoContent.formulaExplanation}</p>
      </div>
    `);
  }

  // Example Scenarios
  if (seoContent.examples) {
    const examples = Array.isArray(seoContent.examples) ? seoContent.examples : [seoContent.examples];
    if (examples.length > 0) {
      sections.push(`
        <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <span class="inline-block w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
          ${t('exampleScenarios')}
        </h3>
        <div class="space-y-4 mb-8">
          ${examples.map((example, index) => `
            <div class="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-lg border border-teal-200">
              <div class="flex items-start">
                <span class="inline-flex items-center justify-center w-8 h-8 bg-teal-500 text-white text-sm font-bold rounded-full mr-4 flex-shrink-0">Ex ${index + 1}</span>
                <p class="text-gray-800 leading-relaxed">${example}</p>
              </div>
            </div>
          `).join('')}
        </div>
      `);
    }
  }

  // Understanding Your Results
  if (seoContent.resultsExplanation) {
    const resultsExplanation = Array.isArray(seoContent.resultsExplanation) ? seoContent.resultsExplanation : [seoContent.resultsExplanation];
    if (resultsExplanation.length > 0) {
      sections.push(`
        <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <span class="inline-block w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
          ${t('understandingResults')}
        </h3>
        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg mb-8">
          <ul class="space-y-3">
            ${resultsExplanation.map(result => `
              <li class="flex items-start">
                <span class="inline-block w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span class="text-gray-800 leading-relaxed">${result}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      `);
    }
  }

  // Who It's For
  if (seoContent.whoItsFor) {
    sections.push(`
      <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <span class="inline-block w-2 h-2 bg-gray-500 rounded-full mr-3"></span>
        ${t('whoItsFor')}
      </h3>
      <div class="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-lg mb-8">
        <p class="text-gray-800 leading-relaxed">${seoContent.whoItsFor}</p>
      </div>
    `);
  }

  // Important Notes & Disclaimer
  if (seoContent.disclaimer) {
    sections.push(`
      <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <span class="inline-block w-2 h-2 bg-red-500 rounded-full mr-3"></span>
        ${t('importantNotes')}
      </h3>
      <div class="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-lg mb-8 border-l-4 border-red-400">
        <p class="text-gray-800 leading-relaxed">${seoContent.disclaimer}</p>
      </div>
    `);
  }

  // Related Tools
  if (seoContent.relatedTools && seoContent.relatedTools.length > 0) {
    sections.push(`
      <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <span class="inline-block w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
        ${t('relatedTools')}
      </h3>
      <div class="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-lg">
        <ul class="space-y-2">
          ${seoContent.relatedTools.map(tool => `
            <li class="flex items-start">
              <span class="inline-block w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span class="text-gray-800 leading-relaxed">${tool}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `);
  }

  // FAQs
  if (seoContent.faqs && seoContent.faqs.length > 0) {
    sections.push(`
      <h3 class="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <span class="inline-block w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
        Frequently Asked Questions
      </h3>
      <div class="space-y-4">
        ${seoContent.faqs.map((faq) => `
          <div class="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg border border-purple-200">
            <h4 class="font-semibold text-gray-900 mb-3 text-lg">${faq.question}</h4>
            <p class="text-gray-800 leading-relaxed">${faq.answer}</p>
          </div>
        `).join('')}
      </div>
    `);
  }

  return sections.join('');
}

// =============================================================================
// SEO SCHEMA GENERATION FUNCTIONS
// =============================================================================

// Import direct breadcrumb mappings
const HOME_NAMES = {
  en: 'Home',
  es: 'Inicio',
  pt: 'Início',
  fr: 'Accueil',
  de: 'Startseite',
  nl: 'Home'
};

const CATEGORY_NAMES = {
  financial: { 
    en: 'Financial Calculators', 
    es: 'Calculadoras Financieras', 
    pt: 'Calculadoras Financeiras', 
    fr: 'Calculateurs Financiers',
    de: 'Finanzrechner',
    nl: 'Financiële Rekenmachines'
  },
  health: { 
    en: 'Health & Fitness Calculators', 
    es: 'Calculadoras de Salud y Fitness', 
    pt: 'Calculadoras de Saúde e Fitness', 
    fr: 'Calculateurs Santé et Fitness',
    de: 'Gesundheits- und Fitnessrechner',
    nl: 'Gezondheids- en Fitnessrekenmachines'
  },
  math: { 
    en: 'Math Calculators', 
    es: 'Calculadoras Matemáticas', 
    pt: 'Calculadoras Matemáticas', 
    fr: 'Calculateurs Mathématiques',
    de: 'Mathematikrechner',
    nl: 'Wiskundige Rekenmachines'
  },
  utility: { 
    en: 'Utility Calculators', 
    es: 'Calculadoras de Utilidad', 
    pt: 'Calculadoras de Utilitários', 
    fr: 'Calculateurs Utilitaires',
    de: 'Werkzeugrechner',
    nl: 'Hulpprogramma Rekenmachines'
  },
  lifestyle: { 
    en: 'Lifestyle Calculators', 
    es: 'Calculadoras de Estilo de Vida', 
    pt: 'Calculadoras de Estilo de Vida', 
    fr: 'Calculateurs Style de Vie',
    de: 'Lifestyle-Rechner',
    nl: 'Lifestyle Rekenmachines'
  }
};

// Locale mapping for inLanguage property
function getInLanguage(lang: string): string {
  const localeMap: Record<string, string> = {
    'en': 'en-US',
    'es': 'es-ES',
    'fr': 'fr-FR',
    'pt': 'pt-PT',
    'de': 'de-DE',
    'nl': 'nl-NL'
  };
  return localeMap[lang] || 'en-US';
}

/**
 * Generate WebSite schema for homepage
 */
// Direct site name and description mappings
const SITE_INFO = {
  name: {
    en: 'Quick Calculator',
    es: 'Calculadora Rápida',
    pt: 'Calculadora Rápida',
    fr: 'Calculateur Rapide',
    de: 'Schnellrechner',
    nl: 'Snelle Rekenmachine'
  },
  description: {
    en: 'Free online calculators for finance, health, math, and everyday calculations',
    es: 'Calculadoras en línea gratuitas para finanzas, salud, matemáticas y cálculos cotidianos',
    pt: 'Calculadoras online gratuitas para finanças, saúde, matemática e cálculos do dia a dia',
    fr: 'Calculateurs en ligne gratuits pour les finances, la santé, les mathématiques et les calculs quotidiens',
    de: 'Kostenlose Online-Rechner für Finanzen, Gesundheit, Mathematik und alltägliche Berechnungen',
    nl: 'Gratis online rekenmachines voor financiën, gezondheid, wiskunde en dagelijkse berekeningen'
  }
};

export function generateOrganizationSchema() {
  const baseUrl = 'https://quick-calculator.org';
  
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}#organization`,
    "name": "Quick Calculator",
    "legalName": "Quick Calculator",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "@id": `${baseUrl}#logo`,
      "url": `${baseUrl}/icon`,
      "contentUrl": `${baseUrl}/icon`,
      "caption": "Quick Calculator Logo",
      "inLanguage": "en",
      "width": "32",
      "height": "32",
      "encodingFormat": "image/svg+xml"
    },
    "image": {
      "@type": "ImageObject",
      "@id": `${baseUrl}#image`,
      "url": `${baseUrl}/og-image.png`,
      "contentUrl": `${baseUrl}/og-image.png`,
      "caption": "Quick Calculator - Free Online Calculators",
      "inLanguage": "en",
      "width": "1200",
      "height": "630"
    },
    "description": "Free online calculators for math, finance, health, and everyday calculations. Fast, accurate, and easy to use.",
    "slogan": "Calculate Everything, Instantly",
    "foundingDate": "2024",
    "sameAs": [
      `${baseUrl}/en`,
      `${baseUrl}/es`, 
      `${baseUrl}/pt`,
      `${baseUrl}/fr`,
      `${baseUrl}/de`,
      `${baseUrl}/nl`,
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/about-us`,
      `${baseUrl}/contact`
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "url": `${baseUrl}/contact`,
      "availableLanguage": ["English", "Spanish", "Portuguese", "French", "German", "Dutch"]
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function generateHomepageSchema(lang: string = 'en') {
  const baseUrl = 'https://quick-calculator.org';
  const url = lang === 'en' ? baseUrl : `${baseUrl}/${lang}`;

  const siteName = SITE_INFO.name[lang as keyof typeof SITE_INFO.name] || SITE_INFO.name.en;
  const siteDescription = SITE_INFO.description[lang as keyof typeof SITE_INFO.description] || SITE_INFO.description.en;

  // Category navigation for SiteNavigationElement
  const categorySlug = (slug: string) => lang === 'en' ? `${baseUrl}/categories/${slug}` : `${baseUrl}/${lang}/categories/${slug}`;
  const categoryNames = CATEGORY_NAMES;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        "url": url,
        "name": siteName,
        "description": siteDescription,
        "inLanguage": getInLanguage(lang),
        "isPartOf": {
          "@id": `${url}#website`
        },
        "about": {
          "@id": `${baseUrl}#organization`
        },
        "primaryImageOfPage": {
          "@id": `${baseUrl}#image`
        }
      },
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        "name": siteName,
        "url": url,
        "description": siteDescription,
        "inLanguage": getInLanguage(lang),
        "publisher": {
          "@type": "Organization",
          "@id": `${baseUrl}#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "@id": `${url}#searchaction`,
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${url}/?search={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "ItemList",
        "@id": `${url}#categories`,
        "name": "Calculator Categories",
        "description": "Browse calculators by category",
        "numberOfItems": 5,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "CollectionPage",
              "@id": `${categorySlug('financial')}#collectionpage`,
              "name": categoryNames.financial[lang as keyof typeof categoryNames.financial] || categoryNames.financial.en,
              "url": categorySlug('financial')
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "CollectionPage",
              "@id": `${categorySlug('health')}#collectionpage`,
              "name": categoryNames.health[lang as keyof typeof categoryNames.health] || categoryNames.health.en,
              "url": categorySlug('health')
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "CollectionPage",
              "@id": `${categorySlug('math')}#collectionpage`,
              "name": categoryNames.math[lang as keyof typeof categoryNames.math] || categoryNames.math.en,
              "url": categorySlug('math')
            }
          },
          {
            "@type": "ListItem",
            "position": 4,
            "item": {
              "@type": "CollectionPage",
              "@id": `${categorySlug('utility')}#collectionpage`,
              "name": categoryNames.utility[lang as keyof typeof categoryNames.utility] || categoryNames.utility.en,
              "url": categorySlug('utility')
            }
          },
          {
            "@type": "ListItem",
            "position": 5,
            "item": {
              "@type": "CollectionPage",
              "@id": `${categorySlug('lifestyle')}#collectionpage`,
              "name": categoryNames.lifestyle[lang as keyof typeof categoryNames.lifestyle] || categoryNames.lifestyle.en,
              "url": categorySlug('lifestyle')
            }
          }
        ]
      },
      generateOrganizationSchema()
    ]
  };
}

/**
 * Generate CollectionPage + ItemList schema for category pages
 */
export function generateCategorySchema(categoryData: CategoryData, lang: string = 'en') {
  const baseUrl = 'https://quick-calculator.org';
  const categoryUrl = lang === 'en' ? `${baseUrl}/categories/${categoryData.slug}` : `${baseUrl}/${lang}/categories/${categoryData.slug}`;

  // Generate breadcrumbs directly - Home → Category
  const homeName = HOME_NAMES[lang as keyof typeof HOME_NAMES] || 'Home';
  const breadcrumbs = [
    { name: homeName, href: lang === 'en' ? '/' : `/${lang}` },
    { name: categoryData.name, href: categoryUrl }
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["WebPage", "CollectionPage"],
        "@id": `${categoryUrl}#webpage`,
        "url": categoryUrl,
        "name": categoryData.name,
        "description": categoryData.description,
        "inLanguage": getInLanguage(lang),
        "isPartOf": {
          "@id": lang === 'en' ? `${baseUrl}#website` : `${baseUrl}/${lang}#website`
        },
        "breadcrumb": {
          "@id": `${categoryUrl}#breadcrumblist`
        },
        "about": {
          "@id": `${baseUrl}#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${categoryUrl}?search={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "CollectionPage",
        "@id": `${categoryUrl}#collectionpage`,
        "name": categoryData.name,
        "description": categoryData.description,
        "url": categoryUrl,
        "inLanguage": getInLanguage(lang),
        "mainEntity": {
          "@type": "ItemList",
          "@id": `${categoryUrl}#itemlist`,
          "name": categoryData.name,
          "description": categoryData.description,
          "numberOfItems": categoryData.calculators.length,
          "itemListElement": categoryData.calculators.map((calc, index) => ({
            "@type": "ListItem",
            "@id": `${categoryUrl}#item${index + 1}`,
            "position": index + 1,
            "item": {
              "@type": ["WebPage", "WebApplication"],
              "@id": `${lang === 'en' ? `${baseUrl}/${calc.slug}` : `${baseUrl}/${lang}/${calc.slug}`}#webpage`,
              "name": calc.name,
              "url": lang === 'en' ? `${baseUrl}/${calc.slug}` : `${baseUrl}/${lang}/${calc.slug}`,
              "applicationCategory": "CalculatorApplication"
            }
          }))
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${categoryUrl}#breadcrumblist`,
        "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
          "@type": "ListItem",
          "@id": `${categoryUrl}#breadcrumb${index + 1}`,
          "position": index + 1,
          "name": breadcrumb.name,
          "item": breadcrumb.href.startsWith('/') ? `${baseUrl}${breadcrumb.href}` : breadcrumb.href
        }))
      }
    ]
  };
}

/**
 * Generate WebPage + BreadcrumbList + FAQPage schema for calculator pages
 */
// Direct calculator description templates
const CALCULATOR_DESCRIPTIONS = {
  main: {
    en: "Use our {{calculatorName}} for accurate calculations",
    es: "Utilice nuestra {{calculatorName}} para cálculos precisos",
    pt: "Use nossa {{calculatorName}} para cálculos precisos",
    fr: "Utilisez notre {{calculatorName}} pour des calculs précis",
    de: "Verwenden Sie unseren {{calculatorName}} für genaue Berechnungen",
    nl: "Gebruik onze {{calculatorName}} voor nauwkeurige berekeningen"
  },
  alt: {
    en: "Calculate {{calculatorName}} online",
    es: "Calcule {{calculatorName}} en línea",
    pt: "Calcule {{calculatorName}} online",
    fr: "Calculez {{calculatorName}} en ligne",
    de: "{{calculatorName}} online berechnen",
    nl: "Bereken {{calculatorName}} online"
  }
};

export function generateCalculatorSchema(calculatorData: CalculatorData, lang: string = 'en') {
  const baseUrl = 'https://quick-calculator.org';
  const calculatorUrl = lang === 'en' ? `${baseUrl}/${calculatorData.slug}` : `${baseUrl}/${lang}/${calculatorData.slug}`;

  // Get direct description templates
  const mainDescription = CALCULATOR_DESCRIPTIONS.main[lang as keyof typeof CALCULATOR_DESCRIPTIONS.main] || CALCULATOR_DESCRIPTIONS.main.en;
  const altDescription = CALCULATOR_DESCRIPTIONS.alt[lang as keyof typeof CALCULATOR_DESCRIPTIONS.alt] || CALCULATOR_DESCRIPTIONS.alt.en;
  
  // Use seoContent introduction for richer description, fallback to template if not available
  const richDescription = calculatorData.seoContent?.introduction || altDescription.replace('{{calculatorName}}', calculatorData.title.toLowerCase());

  // Generate breadcrumbs directly - Home → Category → Calculator
  const homeName = HOME_NAMES[lang as keyof typeof HOME_NAMES] || 'Home';
  const categoryName = CATEGORY_NAMES[calculatorData.category as keyof typeof CATEGORY_NAMES]?.[lang as keyof typeof CATEGORY_NAMES.financial] || calculatorData.category;
  const breadcrumbs = [
    { name: homeName, href: lang === 'en' ? '/' : `/${lang}` },
    { name: categoryName, href: lang === 'en' ? `/categories/${calculatorData.category}` : `/${lang}/categories/${calculatorData.category}` },
    { name: calculatorData.title, href: calculatorUrl }
  ];

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${calculatorUrl}#webpage`,
      "name": calculatorData.title,
      "description": mainDescription.replace('{{calculatorName}}', calculatorData.title),
      "url": calculatorUrl,
      "inLanguage": getInLanguage(lang),
      "breadcrumb": `${calculatorUrl}#breadcrumblist`,
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": `${baseUrl}/calculator-icon.png`
      },
      "mainEntity": [
        {
          "@type": "WebApplication",
          "@id": `${calculatorUrl}#webapplication`,
          "name": `${calculatorData.title} | Quick-Calculator.org`,
          "alternateName": calculatorData.seoTitle,
          "url": calculatorUrl,
          "description": richDescription,
          "applicationCategory": "CalculationApplication",
          "operatingSystem": "Web",
          "inLanguage": getInLanguage(lang),
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          "potentialAction": {
            "@type": "CalculateAction",
            "@id": `${calculatorUrl}#calculateaction`,
            "target": calculatorUrl,
            "description": `Calculate ${calculatorData.title.toLowerCase()} online`,
            "resultType": "Text"
          }
        },
        {
          "@type": "SoftwareApplication",
          "@id": `${calculatorUrl}#softwareapplication`,
          "name": `${calculatorData.title} | Quick-Calculator.org`,
          "alternateName": calculatorData.seoTitle,
          "url": calculatorUrl,
          "description": richDescription,
          "applicationCategory": "CalculationApplication",
          "inLanguage": getInLanguage(lang),
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": 1000
          }
        }
      ]
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${calculatorUrl}#breadcrumblist`,
      "itemListElement": breadcrumbs.map((breadcrumb, index) => ({
        "@type": "ListItem",
        "@id": `${calculatorUrl}#breadcrumb${index + 1}`,
        "position": index + 1,
        "name": breadcrumb.name,
        "item": breadcrumb.href.startsWith('/') ? `${baseUrl}${breadcrumb.href}` : breadcrumb.href
      }))
    }
  ];

  // Add FAQPage schema only if FAQs exist
  if (calculatorData.seoContent?.faqs && calculatorData.seoContent.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${calculatorUrl}#faqpage`,
      "inLanguage": getInLanguage(lang),
      "mainEntity": calculatorData.seoContent.faqs.map((faq, index) => ({
        "@type": "Question",
        "@id": `${calculatorUrl}#question${index + 1}`,
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "@id": `${calculatorUrl}#answer${index + 1}`,
          "text": faq.answer
        }
      }))
    } as never);
  }

  // Add HowTo schema if steps exist
  if (calculatorData.seoContent?.steps) {
    const steps = Array.isArray(calculatorData.seoContent.steps) 
      ? calculatorData.seoContent.steps 
      : [calculatorData.seoContent.steps];
    
    if (steps.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "HowTo",
        "@id": `${calculatorUrl}#howto`,
        "name": `How to Use ${calculatorData.title}`,
        "description": calculatorData.seoContent.introduction || `Learn how to use the ${calculatorData.title} calculator`,
        "inLanguage": getInLanguage(lang),
        "step": steps.map((step, index) => ({
          "@type": "HowToStep",
          "@id": `${calculatorUrl}#step${index + 1}`,
          "position": index + 1,
          "name": `Step ${index + 1}`,
          "text": step
        }))
      } as never);
    }
  }

  // Add Article schema for richer content markup
  if (calculatorData.seoContent?.introduction) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${calculatorUrl}#article`,
      "headline": calculatorData.title,
      "description": calculatorData.seoContent.introduction,
      "articleBody": calculatorData.seoContent.formulaExplanation || calculatorData.seoContent.introduction,
      "inLanguage": getInLanguage(lang),
      "author": {
        "@type": "Organization",
        "@id": `${baseUrl}#organization`,
        "name": "Quick-Calculator.org",
        "url": baseUrl
      },
      "publisher": {
        "@type": "Organization",
        "@id": `${baseUrl}#organization`,
        "name": "Quick-Calculator.org",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/calculator-icon.png`
        }
      },
      "datePublished": "2026-01-01",
      "dateModified": "2026-02-06",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": calculatorUrl
      }
    } as never);
  }

  // Add ItemList schema for examples
  if (calculatorData.seoContent?.examples) {
    const examples = Array.isArray(calculatorData.seoContent.examples)
      ? calculatorData.seoContent.examples
      : [calculatorData.seoContent.examples];
    
    if (examples.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": `${calculatorUrl}#exampleslist`,
        "name": `${calculatorData.title} Examples`,
        "description": "Practical examples and scenarios",
        "inLanguage": getInLanguage(lang),
        "numberOfItems": examples.length,
        "itemListElement": examples.map((example, index) => ({
          "@type": "ListItem",
          "@id": `${calculatorUrl}#example${index + 1}`,
          "position": index + 1,
          "name": `Example ${index + 1}`,
          "description": example
        }))
      } as never);
    }
  }

  return schemas.length === 1 ? schemas[0] : { "@context": "https://schema.org", "@graph": schemas };
}
