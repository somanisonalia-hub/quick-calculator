const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'http://localhost:3002';
const LANGUAGES = ['en', 'es', 'pt', 'fr'];
const TIMEOUT = 10000; // 10 seconds per page

// Get all calculator slugs
function getAllCalculatorSlugs() {
  const calculatorsDir = path.join(__dirname, '..', 'content', 'calculators');
  return fs.readdirSync(calculatorsDir)
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''));
}

// Test a single calculator page
async function testCalculatorPage(page, lang, slug) {
  const url = `${BASE_URL}/${lang}/${slug}/`;
  const errors = [];
  
  // Capture console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`Console Error: ${msg.text()}`);
    }
  });
  
  // Capture page errors
  page.on('pageerror', error => {
    errors.push(`Page Error: ${error.message}`);
  });
  
  try {
    const response = await page.goto(url, { 
      waitUntil: 'networkidle0',
      timeout: TIMEOUT 
    });
    
    // Check HTTP status
    if (!response.ok()) {
      return {
        url,
        status: 'fail',
        errors: [`HTTP ${response.status()}: ${response.statusText()}`]
      };
    }
    
    // Wait a bit for React to render
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check for "Component not yet implemented" error
    const hasNotImplementedError = await page.evaluate(() => {
      const body = document.body.innerText;
      return body.includes('Calculator component not yet implemented') || 
             body.includes('Component: Unknown');
    });
    
    if (hasNotImplementedError) {
      errors.push('Component not yet implemented error detected');
    }
    
    // Check for React error boundaries
    const hasReactError = await page.evaluate(() => {
      const body = document.body.innerText;
      return body.includes('TypeError') || 
             body.includes('Cannot read properties') ||
             body.includes('Runtime Error');
    });
    
    if (hasReactError) {
      errors.push('React runtime error detected on page');
    }
    
    // Check if calculator component loaded
    const hasCalculator = await page.evaluate(() => {
      const calculatorSection = document.querySelector('#calculator-section');
      return calculatorSection && calculatorSection.textContent.length > 100;
    });
    
    if (!hasCalculator) {
      errors.push('Calculator component appears to be empty or not loaded');
    }
    
    return {
      url,
      status: errors.length === 0 ? 'pass' : 'fail',
      errors: errors.length > 0 ? errors : null
    };
    
  } catch (error) {
    return {
      url,
      status: 'fail',
      errors: [`Navigation Error: ${error.message}`]
    };
  }
}

// Main test function
async function runTests() {
  console.log('\n🚀 Starting Calculator Test Suite...\n');
  console.log(`   Base URL: ${BASE_URL}`);
  console.log(`   Languages: ${LANGUAGES.join(', ')}`);
  console.log(`   Timeout: ${TIMEOUT}ms per page\n`);
  
  const calculators = getAllCalculatorSlugs();
  const totalTests = calculators.length * LANGUAGES.length;
  
  console.log(`📋 Found ${calculators.length} calculators`);
  console.log(`🧪 Total tests to run: ${totalTests} (${calculators.length} × ${LANGUAGES.length} languages)\n`);
  console.log(`${'='.repeat(80)}\n`);
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const results = {
    passed: [],
    failed: [],
    startTime: new Date(),
  };
  
  let testCount = 0;
  
  try {
    const page = await browser.newPage();
    
    // Test each calculator in each language
    for (const slug of calculators) {
      for (const lang of LANGUAGES) {
        testCount++;
        const progressBar = `[${testCount}/${totalTests}]`;
        
        process.stdout.write(`${progressBar} Testing ${lang}/${slug}...`);
        
        const result = await testCalculatorPage(page, lang, slug);
        
        if (result.status === 'pass') {
          results.passed.push(result);
          process.stdout.write(` ✅\n`);
        } else {
          results.failed.push(result);
          process.stdout.write(` ❌\n`);
          // Print errors immediately
          result.errors.forEach(err => {
            console.log(`   ⚠️  ${err}`);
          });
        }
      }
    }
    
    await page.close();
    
  } finally {
    await browser.close();
  }
  
  results.endTime = new Date();
  results.duration = ((results.endTime - results.startTime) / 1000).toFixed(2);
  
  // Print summary
  console.log(`\n${'='.repeat(80)}\n`);
  console.log(`📊 Test Results Summary\n`);
  console.log(`   Total Tests: ${totalTests}`);
  console.log(`   ✅ Passed: ${results.passed.length}`);
  console.log(`   ❌ Failed: ${results.failed.length}`);
  console.log(`   ⏱️  Duration: ${results.duration}s`);
  console.log(`   📈 Success Rate: ${((results.passed.length / totalTests) * 100).toFixed(1)}%\n`);
  
  if (results.failed.length > 0) {
    console.log(`${'='.repeat(80)}\n`);
    console.log(`❌ Failed Tests (${results.failed.length}):\n`);
    
    // Group failures by calculator
    const failuresByCalculator = {};
    results.failed.forEach(result => {
      const match = result.url.match(/\/(en|es|pt|fr)\/([^/]+)\//);
      if (match) {
        const [, lang, slug] = match;
        if (!failuresByCalculator[slug]) {
          failuresByCalculator[slug] = [];
        }
        failuresByCalculator[slug].push({ lang, errors: result.errors });
      }
    });
    
    Object.keys(failuresByCalculator).sort().forEach(slug => {
      console.log(`\n📛 ${slug}`);
      failuresByCalculator[slug].forEach(({ lang, errors }) => {
        console.log(`   [${lang}]`);
        errors.forEach(err => console.log(`      - ${err}`));
      });
    });
    
    console.log(`\n${'='.repeat(80)}\n`);
    process.exit(1);
  } else {
    console.log(`${'='.repeat(80)}\n`);
    console.log(`✅ All tests passed! All ${calculators.length} calculators working across all ${LANGUAGES.length} languages.\n`);
    console.log(`${'='.repeat(80)}\n`);
    process.exit(0);
  }
}

// Check if server is running
async function checkServer() {
  try {
    const http = require('http');
    return new Promise((resolve) => {
      const req = http.get(BASE_URL, (res) => {
        resolve(true);
      });
      req.on('error', () => {
        resolve(false);
      });
      req.setTimeout(3000, () => {
        req.destroy();
        resolve(false);
      });
    });
  } catch (error) {
    return false;
  }
}

// Run the tests
(async () => {
  console.log('\n🔍 Checking if dev server is running...');
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.log(`\n❌ Dev server is not running at ${BASE_URL}`);
    console.log(`\n   Please start the dev server first:\n`);
    console.log(`   npm run dev\n`);
    process.exit(1);
  }
  
  console.log('✅ Dev server is running!\n');
  
  await runTests();
})();
