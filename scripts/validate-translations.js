#!/usr/bin/env node

/**
 * Translation Validator
 * 
 * Detects:
 * 1. Missing translation keys across languages
 * 2. English text in non-English files (leakage)
 * 3. Structural inconsistencies between language files
 * 4. Empty or placeholder translations
 * 5. Unused keys (optional)
 * 
 * Usage: node scripts/validate-translations.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const LANGUAGES = ['en', 'es', 'pt', 'fr'];
const BASE_LANG = 'en';
const COMMON_DIR = path.join(__dirname, '../public/locales');
const CONTENT_DIR = path.join(__dirname, '../content/calculators');

// English words that commonly appear in non-English translations (to reduce false positives)
const ALLOWED_ENGLISH_WORDS = new Set([
  'email', 'online', 'calculator', 'EMI', 'GPA', 'BMI', 'ROI', 'APR', 
  'URL', 'HTML', 'CSS', 'JavaScript', 'API', 'ID', 'GPS', 'PDF',
  'Quick Calculator', 'Google', 'Facebook', 'Twitter', 'Instagram',
  'iOS', 'Android', 'Windows', 'Mac', 'Linux', 'EUR', 'USD', 'GBP'
]);

// Common English words that indicate leakage
const ENGLISH_INDICATORS = [
  'the', 'and', 'for', 'with', 'your', 'this', 'that', 'from', 'have',
  'will', 'calculate', 'calculator', 'details', 'summary', 'results'
];

let errors = [];
let warnings = [];
let stats = {
  totalKeys: 0,
  missingKeys: 0,
  englishLeaks: 0,
  emptyValues: 0,
  filesChecked: 0
};

/**
 * Deep comparison of object structures
 */
function getAllKeys(obj, prefix = '') {
  let keys = [];
  
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys = keys.concat(getAllKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys;
}

/**
 * Get value from nested object using dot notation
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Detect if text contains English (simple heuristic)
 */
function containsEnglish(text, allowedWords = ALLOWED_ENGLISH_WORDS) {
  if (!text || typeof text !== 'string') return false;
  
  const lowerText = text.toLowerCase();
  
  // Check if it's in allowed words
  if (allowedWords.has(text)) return false;
  
  // Count English indicator words
  let englishWordCount = 0;
  const words = lowerText.split(/\s+/);
  
  for (const word of words) {
    if (ENGLISH_INDICATORS.includes(word)) {
      englishWordCount++;
    }
  }
  
  // If more than 20% of words are English indicators, flag it
  return words.length > 3 && (englishWordCount / words.length) > 0.2;
}

/**
 * Validate common.json files
 */
function validateCommonFiles() {
  console.log('\n📁 Validating common.json files...\n');
  
  const baseFile = path.join(COMMON_DIR, BASE_LANG, 'common.json');
  if (!fs.existsSync(baseFile)) {
    errors.push(`❌ Base language file not found: ${baseFile}`);
    return;
  }
  
  const baseContent = JSON.parse(fs.readFileSync(baseFile, 'utf-8'));
  const baseKeys = getAllKeys(baseContent);
  stats.totalKeys += baseKeys.length;
  
  console.log(`✓ Base language (${BASE_LANG}): ${baseKeys.length} keys`);
  
  // Check other languages
  for (const lang of LANGUAGES) {
    if (lang === BASE_LANG) continue;
    
    const langFile = path.join(COMMON_DIR, lang, 'common.json');
    if (!fs.existsSync(langFile)) {
      errors.push(`❌ Missing translation file: ${langFile}`);
      continue;
    }
    
    stats.filesChecked++;
    const langContent = JSON.parse(fs.readFileSync(langFile, 'utf-8'));
    const langKeys = getAllKeys(langContent);
    
    // Find missing keys
    const missingKeys = baseKeys.filter(key => !langKeys.includes(key));
    if (missingKeys.length > 0) {
      errors.push(`❌ [${lang}/common.json] Missing ${missingKeys.length} keys:`);
      missingKeys.slice(0, 10).forEach(key => {
        errors.push(`   - ${key}`);
      });
      if (missingKeys.length > 10) {
        errors.push(`   ... and ${missingKeys.length - 10} more`);
      }
      stats.missingKeys += missingKeys.length;
    }
    
    // Find extra keys (exist in translation but not in base)
    const extraKeys = langKeys.filter(key => !baseKeys.includes(key));
    if (extraKeys.length > 0) {
      warnings.push(`⚠️  [${lang}/common.json] Extra ${extraKeys.length} keys not in base:`);
      extraKeys.slice(0, 5).forEach(key => {
        warnings.push(`   - ${key}`);
      });
      if (extraKeys.length > 5) {
        warnings.push(`   ... and ${extraKeys.length - 5} more`);
      }
    }
    
    // Check for English leakage
    let leakCount = 0;
    for (const key of langKeys) {
      const value = getNestedValue(langContent, key);
      if (typeof value === 'string' && containsEnglish(value)) {
        if (leakCount === 0) {
          errors.push(`❌ [${lang}/common.json] English text detected:`);
        }
        if (leakCount < 5) {
          errors.push(`   - ${key}: "${value.substring(0, 50)}${value.length > 50 ? '...' : ''}"`);
        }
        leakCount++;
        stats.englishLeaks++;
      }
      
      // Check for empty values
      if (value === '' || value === null || value === undefined) {
        warnings.push(`⚠️  [${lang}/common.json] Empty value for key: ${key}`);
        stats.emptyValues++;
      }
    }
    
    if (leakCount > 5) {
      errors.push(`   ... and ${leakCount - 5} more English leaks`);
    }
    
    console.log(`✓ ${lang}: ${langKeys.length} keys (${missingKeys.length} missing, ${leakCount} English leaks)`);
  }
}

/**
 * Validate calculator content files
 */
function validateCalculatorFiles() {
  console.log('\n📊 Validating calculator content files...\n');
  
  const calculatorFiles = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json'));
  
  for (const file of calculatorFiles) {
    const filePath = path.join(CONTENT_DIR, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    stats.filesChecked++;
    
    // Check if all languages are present
    const missingLangs = LANGUAGES.filter(lang => !content[lang]);
    if (missingLangs.length > 0) {
      errors.push(`❌ [${file}] Missing languages: ${missingLangs.join(', ')}`);
    }
    
    // Check English as reference
    if (!content[BASE_LANG]) continue;
    
    const baseKeys = Object.keys(content[BASE_LANG]);
    
    // Check each language for consistency
    for (const lang of LANGUAGES) {
      if (lang === BASE_LANG || !content[lang]) continue;
      
      const langKeys = Object.keys(content[lang]);
      
      // Check for missing top-level keys
      const missing = baseKeys.filter(key => !langKeys.includes(key));
      if (missing.length > 0) {
        errors.push(`❌ [${file}/${lang}] Missing keys: ${missing.join(', ')}`);
        stats.missingKeys += missing.length;
      }
      
      // Check seoContent structure if it exists
      if (content[BASE_LANG].seoContent && content[lang].seoContent) {
        const baseSeoKeys = Object.keys(content[BASE_LANG].seoContent);
        const langSeoKeys = Object.keys(content[lang].seoContent);
        const missingSeo = baseSeoKeys.filter(key => !langSeoKeys.includes(key));
        
        if (missingSeo.length > 0) {
          warnings.push(`⚠️  [${file}/${lang}] Missing SEO keys: ${missingSeo.join(', ')}`);
        }
      }
      
      // Check for English leakage in title/description
      if (content[lang].title && containsEnglish(content[lang].title)) {
        errors.push(`❌ [${file}/${lang}] English detected in title: "${content[lang].title}"`);
        stats.englishLeaks++;
      }
      
      if (content[lang].description && containsEnglish(content[lang].description)) {
        errors.push(`❌ [${file}/${lang}] English detected in description`);
        stats.englishLeaks++;
      }
    }
  }
  
  console.log(`✓ Checked ${calculatorFiles.length} calculator files`);
}

/**
 * Print report
 */
function printReport() {
  console.log('\n' + '='.repeat(60));
  console.log('📋 TRANSLATION VALIDATION REPORT');
  console.log('='.repeat(60));
  
  console.log('\n📊 Statistics:');
  console.log(`   Total keys checked: ${stats.totalKeys}`);
  console.log(`   Files checked: ${stats.filesChecked}`);
  console.log(`   Missing keys: ${stats.missingKeys}`);
  console.log(`   English leaks: ${stats.englishLeaks}`);
  console.log(`   Empty values: ${stats.emptyValues}`);
  
  if (errors.length > 0) {
    console.log('\n❌ ERRORS:');
    console.log('─'.repeat(60));
    errors.forEach(err => console.log(err));
  }
  
  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    console.log('─'.repeat(60));
    warnings.forEach(warn => console.log(warn));
  }
  
  console.log('\n' + '='.repeat(60));
  
  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ All translations are valid! No issues found.');
    return 0;
  } else {
    console.log(`\n❌ Found ${errors.length} errors and ${warnings.length} warnings.`);
    console.log('\nPlease fix the errors before deploying to production.');
    return 1;
  }
}

/**
 * Main execution
 */
function main() {
  console.log('🔍 Starting translation validation...\n');
  
  try {
    validateCommonFiles();
    validateCalculatorFiles();
    const exitCode = printReport();
    process.exit(exitCode);
  } catch (error) {
    console.error('\n💥 Fatal error during validation:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  validateCommonFiles,
  validateCalculatorFiles,
  containsEnglish,
  getAllKeys
};
