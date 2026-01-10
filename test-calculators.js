#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const http = require('http');

// Configuration
const BASE_URL = 'http://localhost:3000';
const LANGUAGES = ['en', 'es', 'pt', 'fr'];
const CALCULATORS_DIR = path.join(__dirname, 'content', 'calculators');

// Get all calculator slugs
function getCalculatorSlugs() {
  const files = fs.readdirSync(CALCULATORS_DIR);
  return files
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''));
}

// Make HTTP request
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      resolve({
        url,
        statusCode: res.statusCode,
        success: res.statusCode < 400
      });
    }).on('error', (err) => {
      resolve({
        url,
        statusCode: null,
        error: err.message,
        success: false
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
    console.log('='.repeat(50));

    for (const slug of calculatorSlugs) {
      const url = `${BASE_URL}/${lang}/${slug}`;
      results.total++;

      const result = await makeRequest(url);

      if (result.success) {
        console.log(`✅ ${lang}/${slug}: ${result.statusCode}`);
        results.success++;
      } else {
        console.log(`❌ ${lang}/${slug}: ${result.statusCode || 'ERROR'} - ${result.error || 'Unknown error'}`);
        results.failures.push({
          lang,
          slug,
          url: result.url,
          statusCode: result.statusCode,
          error: result.error
        });
      }
    }
    console.log('');
  }

  // Summary
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total tests: ${results.total}`);
  console.log(`Successful: ${results.success}`);
  console.log(`Failed: ${results.failures.length}`);
  console.log(`Success rate: ${((results.success / results.total) * 100).toFixed(1)}%`);

  if (results.failures.length > 0) {
    console.log('\n❌ FAILED TESTS:');
    results.failures.forEach(failure => {
      console.log(`  - ${failure.lang}/${failure.slug}: ${failure.statusCode || 'ERROR'}`);
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
  await testAllCalculators();
}

main().catch(console.error);
