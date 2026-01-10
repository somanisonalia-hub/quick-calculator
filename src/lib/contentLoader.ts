// Dynamic content loader for modular content system
export type ContentType = 'calculators' | 'categories' | 'homepage' | 'labels';

export interface ContentLoaderOptions {
  language: string;
  type: ContentType;
  slug?: string;
}

/**
 * Load content dynamically based on language and content type
 * For static export compatibility, this uses a mapping approach
 */
export async function loadContent({ language, type, slug }: ContentLoaderOptions): Promise<any> {
  try {
    let contentPath: string;

    switch (type) {
      case 'labels':
        contentPath = `/content/${language}/labels.json`;
        break;
      case 'homepage':
        contentPath = `/content/${language}/homepage.json`;
        break;
      case 'calculators':
        if (!slug) throw new Error('Slug required for calculator content');
        contentPath = `/content/${language}/calculators/${slug}.json`;
        break;
      case 'categories':
        if (!slug) throw new Error('Slug required for category content');
        contentPath = `/content/${language}/categories/${slug}.json`;
        break;
      default:
        throw new Error(`Unknown content type: ${type}`);
    }

    // Use dynamic import for client-side loading
    const response = await fetch(contentPath);
    if (!response.ok) {
      throw new Error(`Failed to load content: ${contentPath}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading content:', error);
    // Return default/fallback content or throw
    throw error;
  }
}

/**
 * Load calculator content
 */
export async function loadCalculatorContent(language: string, slug: string) {
  return loadContent({ language, type: 'calculators', slug });
}

/**
 * Load category content
 */
export async function loadCategoryContent(language: string, slug: string) {
  return loadContent({ language, type: 'categories', slug });
}

/**
 * Load homepage content
 */
export async function loadHomepageContent(language: string) {
  return loadContent({ language, type: 'homepage' });
}

/**
 * Load UI labels
 */
export async function loadLabels(language: string) {
  return loadContent({ language, type: 'labels' });
}

/**
 * Get available languages
 */
export function getAvailableLanguages(): string[] {
  return ['en', 'es', 'fr', 'de', 'pt', 'it', 'ja', 'ko', 'zh', 'ru'];
}

/**
 * Get available calculators for a language
 */
export async function getAvailableCalculators(language: string): Promise<string[]> {
  // In a real implementation, this might fetch from an API or index file
  // For now, return known calculators
  return ['addition-calculator'];
}

/**
 * Get available categories for a language
 */
export async function getAvailableCategories(language: string): Promise<string[]> {
  // In a real implementation, this might fetch from an API or index file
  return ['math', 'financial', 'health'];
}
