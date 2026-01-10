const puppeteer = require('puppeteer');

async function testConsoleError() {
  console.log('Testing console error on /pt/budget-calculator/');

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false, // Set to false to see the browser
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Listen for console messages
    page.on('console', msg => {
      console.log(`CONSOLE ${msg.type()}: ${msg.text()}`);
    });

    // Listen for page errors
    page.on('pageerror', error => {
      console.log(`PAGE ERROR: ${error.message}`);
    });

    console.log('Navigating to page...');
    await page.goto('http://localhost:3000/pt/budget-calculator/', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    console.log('Page loaded, waiting for errors...');
    await page.waitForTimeout(5000);

    console.log('Test complete');
    await browser.close();

  } catch (error) {
    console.error('Test failed:', error.message);
    if (browser) await browser.close();
  }
}

testConsoleError();

