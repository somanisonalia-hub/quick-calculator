import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3002';

test.describe('Quick Sanity Check', () => {
  
  test('Grade Calculator - English', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/grade-calculator/`, { waitUntil: 'networkidle' });
    
    const bodyText = await page.textContent('body');
    console.log('Page loaded');
    console.log('Contains error?', bodyText?.includes('TypeError'));
    console.log('Contains not implemented?', bodyText?.includes('not yet implemented'));
    
    expect(bodyText).not.toContain('TypeError');
    expect(bodyText).not.toContain('not yet implemented');
  });

  test('Blood Pressure Calculator - English', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/blood-pressure-calculator/`, { waitUntil: 'networkidle' });
    
    const bodyText = await page.textContent('body');
    expect(bodyText).not.toContain('TypeError');
    expect(bodyText).not.toContain('not yet implemented');
  });

  test('Pregnancy Calculator - English', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/pregnancy-calculator/`, { waitUntil: 'networkidle' });
    
    const bodyText = await page.textContent('body');
    expect(bodyText).not.toContain('TypeError');
    expect(bodyText).not.toContain('not yet implemented');
  });

  test('Ovulation Calculator - English', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/ovulation-calculator/`, { waitUntil: 'networkidle' });
    
    const bodyText = await page.textContent('body');
    expect(bodyText).not.toContain('TypeError');
    expect(bodyText).not.toContain('not yet implemented');
  });

  test('Biweekly Pay Calculator - English', async ({ page }) => {
    await page.goto(`${BASE_URL}/en/biweekly-pay-calculator/`, { waitUntil: 'networkidle' });
    
    const bodyText = await page.textContent('body');
    expect(bodyText).not.toContain('TypeError');
    expect(bodyText).not.toContain('not yet implemented');
  });
});
