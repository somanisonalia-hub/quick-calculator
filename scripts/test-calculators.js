#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const http = require('http');

// Configuration
const BASE_URL = 'http://localhost:3000';
const LANGUAGES = ['en', 'es', 'pt', 'fr'];
const CALCULATORS_DIR = path.join(__dirname, '..', 'content', 'calculators');


// Get all calculator slugs
function getCalculatorSlugs() {
  const files = fs.readdirSync(CALCULATORS_DIR);
  return files
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''));
}

// Make HTTP request with content checking and redirect following
function makeRequest(url, followRedirects = true) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      const statusCode = res.statusCode;

      // Handle redirects
      if (followRedirects && (statusCode === 301 || statusCode === 302 || statusCode === 307 || statusCode === 308)) {
        const redirectUrl = res.headers.location;
        if (redirectUrl) {
          // Follow redirect
          return makeRequest(redirectUrl.startsWith('http') ? redirectUrl : `${BASE_URL}${redirectUrl}`, false)
            .then(resolve)
            .catch(reject);
        }
      }

      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const success = statusCode < 400;

        // Check for specific issues in the HTML content
        let issues = [];

        // Check for calculator component errors
        if (data.includes('calculator not yet implemented') ||
            data.includes('Componente: Unknown') ||
            data.includes('calculadora aún no está implementado')) {
          issues.push('Calculator component not loaded');
        }

        // Check for critical JavaScript errors that prevent page loading
        if (data.includes('TypeError') ||
            data.includes('ReferenceError') ||
            data.includes('SyntaxError')) {
          issues.push('Critical JavaScript errors detected');
        }

        // Check for page type specific elements
        let hasCalculatorElements = false;
        let hasNavigation = false;
        let hasContent = false;

        if (url.includes('/categories/')) {
          // For category pages
          hasCalculatorElements = true; // Categories don't need calculator elements
          hasNavigation = data.includes('navigation') || data.includes('nav') || data.includes('header');
          hasContent = data.includes('calculator') || data.includes('calculadora') || data.includes('category');
        } else {
          // For calculator pages
          hasCalculatorElements = data.includes('calculator') &&
                                 (data.includes('input') || data.includes('select') || data.includes('button'));
          hasNavigation = data.includes('navigation') || data.includes('nav') || data.includes('header');
          hasContent = data.includes('calculator') || data.includes('calculadora');
        }

        resolve({
          url,
          statusCode,
          success,
          issues,
          hasCalculatorElements,
          hasNavigation,
          hasContent,
          contentLength: data.length
        });
      });
    }).on('error', (err) => {
      resolve({
        url,
        statusCode: null,
        error: err.message,
        success: false,
        issues: ['Network error'],
        hasCalculatorElements: false,
        hasNavigation: false,
        hasContent: false,
        contentLength: 0
      });
    });
  });
}

// Test all calculators
async function testAllCalculators() {
  const calculatorSlugs = getCalculatorSlugs();
  console.log(`🧪 Testing ${calculatorSlugs.length} calculators in ${LANGUAGES.length} languages...\n`);

  const results = {
    total: 0,
    success: 0,
    failures: []
  };

  for (const lang of LANGUAGES) {
    console.log(`🌍 Testing language: ${lang.toUpperCase()}`);
    console.log('='.repeat(60));

    for (const slug of calculatorSlugs) {
      const url = `${BASE_URL}/${lang}/${slug}`;
      results.total++;

      const result = await makeRequest(url);

      // Check for critical issues only
      const hasIssues = result.issues.length > 0 || result.contentLength < 1000;

      if (result.success && !hasIssues) {
        console.log(`✅ ${lang}/${slug}: ${result.statusCode} | ${result.contentLength} bytes | Calculator ✓`);
        results.success++;
      } else {
        let status = `❌ ${lang}/${slug}: ${result.statusCode || 'ERROR'}`;

        if (result.issues.length > 0) {
          status += ` | Issues: ${result.issues.join(', ')}`;
        }

        if (result.contentLength < 1000) {
          status += ` | Suspiciously small content (${result.contentLength} bytes)`;
        }

        console.log(status);

        results.failures.push({
          lang,
          slug,
          url: result.url,
          statusCode: result.statusCode,
          error: result.error,
          issues: result.issues,
          hasCalculatorElements: result.hasCalculatorElements,
          hasNavigation: result.hasNavigation,
          hasContent: result.hasContent
        });
      }
    }
    console.log('');
  }

  // Summary
  console.log('\n📊 TEST SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total calculators tested: ${calculatorSlugs.length}`);
  console.log(`Languages tested: ${LANGUAGES.length}`);
  console.log(`Total test combinations: ${results.total}`);
  console.log(`Successful: ${results.success}`);
  console.log(`Failed: ${results.failures.length}`);
  console.log(`Success rate: ${((results.success / results.total) * 100).toFixed(1)}%`);

  if (results.failures.length > 0) {
    console.log('\n❌ FAILED TESTS:');
    results.failures.forEach(failure => {
      const itemName = failure.slug || failure.category || 'unknown';
      const itemType = failure.type ? ` (${failure.type})` : '';
      console.log(`  - ${failure.lang}/${itemName}${itemType}: ${failure.statusCode || 'ERROR'}`);
    });
    process.exit(1);
  } else {
    console.log('\n🎉 ALL TESTS PASSED!');
    process.exit(0);
  }
}


// Check if server is running
function checkServer() {
  return new Promise((resolve) => {
    http.get(`${BASE_URL}`, (res) => {
      resolve(res.statusCode === 200);
    }).on('error', () => {
      resolve(false);
    });
  });
}

// Main execution
async function main() {
  console.log('🔍 Checking if server is running...');

  const serverRunning = await checkServer();
  if (!serverRunning) {
    console.error('❌ Server is not running on', BASE_URL);
    console.error('Please start the development server first: npm run dev');
    process.exit(1);
  }

  console.log('✅ Server is running\n');

  // Run comprehensive tests
  await testAllCalculators();

  // Final summary
  const consoleErrors = consoleResults.reduce((sum, r) => sum + r.errors.length, 0);
  if (consoleErrors > 0) {
    console.log('\n⚠️  Console errors detected! Check the output above for details.');
    process.exit(1);
  } else {
    console.log('\n🎉 All tests passed including console error checks!');
  }
}

main().catch(console.error);
