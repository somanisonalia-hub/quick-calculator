import { test, expect } from '@playwright/test';

test.describe('Study Hours Planner Calculator Test', () => {
  const BASE_URL = 'http://localhost:3000';
  
  test('should load and verify Study Hours Planner calculator', async ({ page }) => {
    console.log('\n🔍 Testing Study Hours Planner Calculator...\n');
    
    const url = `${BASE_URL}/en/study-hours-planner/`;
    
    // Navigate to the calculator page
    console.log(`📄 Loading: ${url}`);
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 });
    
    // Check HTTP status
    expect(response?.status()).toBeLessThan(400);
    console.log(`✅ HTTP Status: ${response?.status()}`);
    
    // Check page title
    const title = await page.title();
    console.log(`✅ Page Title: ${title}`);
    expect(title.toLowerCase()).toContain('study');
    
    // Check for calculator inputs
    console.log('\n🔍 Checking for form inputs...');
    const inputs = await page.locator('input[type="text"], input[type="number"]').count();
    console.log(`✅ Found ${inputs} input fields`);
    expect(inputs).toBeGreaterThan(0);
    
    // Check for button
    const buttons = await page.locator('button').count();
    console.log(`✅ Found ${buttons} button(s)`);
    expect(buttons).toBeGreaterThan(0);
    
    // Check for calculator-related text
    const pageContent = await page.textContent('body');
    const hasStudyContent = pageContent?.toLowerCase().includes('study') || 
                            pageContent?.toLowerCase().includes('exam') ||
                            pageContent?.toLowerCase().includes('topics');
    console.log(`✅ Has study-related content: ${hasStudyContent}`);
    expect(hasStudyContent).toBe(true);
    
    // Test the calculator functionality
    console.log('\n🧪 Testing calculator functionality...');
    
    // Fill in the form
    const inputFields = await page.locator('input[type="text"], input[type="number"]').all();
    
    if (inputFields.length >= 3) {
      await inputFields[0].fill('15'); // Total topics
      console.log('   ✏️  Entered total topics: 15');
      
      await inputFields[1].fill('10'); // Days until exam
      console.log('   ✏️  Entered days until exam: 10');
      
      await inputFields[2].fill('3'); // Hours per day
      console.log('   ✏️  Entered hours per day: 3');
      
      // Click the calculate button
      const calculateButton = page.locator('button').first();
      await calculateButton.click();
      console.log('   🖱️  Clicked calculate button');
      
      // Wait a bit for calculation
      await page.waitForTimeout(1000);
      
      // Check if results are displayed
      const resultsVisible = await page.locator('text=/topics per day|study hours|total/i').count();
      console.log(`   ✅ Results displayed: ${resultsVisible > 0 ? 'Yes' : 'No'}`);
    }
    
    // Check for console errors
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    page.on('pageerror', error => {
      errors.push(error.message);
    });
    
    await page.waitForTimeout(1000);
    
    if (errors.length === 0) {
      console.log('\n✅ No console errors detected');
    } else {
      console.log('\n⚠️  Console errors detected:');
      errors.forEach(err => console.log(`   - ${err}`));
    }
    
    // Take a screenshot
    const screenshotPath = '/tmp/study-hours-planner-test.png';
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`\n📸 Screenshot saved to: ${screenshotPath}`);
    
    console.log('\n✅ Study Hours Planner Calculator Test Complete!\n');
    
    expect(errors.length).toBe(0);
  });
});
