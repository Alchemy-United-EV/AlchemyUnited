import { test, expect } from '@playwright/test';

test.describe('Conversion Flow Tests', () => {
  test('Hero CTA navigation to Early Access form', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await expect(page.locator('h1')).toContainText('Premium EV Charging Network');
    
    // Click main hero CTA
    await page.click('[data-cta="hero-primary"]');
    
    // Should navigate to early access page
    await expect(page).toHaveURL('/early-access');
    await expect(page.locator('h1')).toContainText('Request Early Access');
  });

  test('Early Access form submission flow', async ({ page }) => {
    await page.goto('/early-access');
    
    // Fill out the form
    await page.fill('#firstName', 'John');
    await page.fill('#lastName', 'Doe');
    await page.fill('#email', 'john.doe@example.com');
    await page.fill('#phone', '555-123-4567');
    await page.fill('#location', 'San Francisco, CA');
    
    // Select vehicle type
    await page.click('#vehicle-type-select');
    await page.click('[data-value="tesla-model-3"]');
    
    // Select charging frequency
    await page.click('#charging-frequency-select');
    await page.click('[data-value="daily"]');
    
    // Submit form
    await page.click('[data-cta="early-access-submit"]');
    
    // Should navigate to thank you page
    await expect(page).toHaveURL(/\/thank-you\?type=early-access/);
    await expect(page.locator('h1')).toContainText('Thank You');
  });

  test('Host Application CTA navigation and form submission', async ({ page }) => {
    await page.goto('/');
    
    // Click host partnership CTA
    await page.click('[data-cta="host-partnership"]');
    
    // Should navigate to host application page
    await expect(page).toHaveURL('/host-application');
    await expect(page.locator('h1')).toContainText('Host Application');
    
    // Fill out host form
    await page.fill('#businessName', 'Test Business Inc');
    await page.fill('#contactFirstName', 'Jane');
    await page.fill('#contactLastName', 'Smith');
    await page.fill('#email', 'jane@testbusiness.com');
    await page.fill('#phone', '555-987-6543');
    await page.fill('#propertyAddress', '123 Business St, Test City, CA 90210');
    
    // Select property type
    await page.click('#property-type-select');
    await page.click('[data-value="hotel"]');
    
    // Select parking spaces
    await page.click('#parking-spaces-select');
    await page.click('[data-value="21-50"]');
    
    // Select electrical capacity
    await page.click('#electrical-capacity-select');
    await page.click('[data-value="commercial-medium"]');
    
    // Select traffic volume
    await page.click('#expected-traffic-select');
    await page.click('[data-value="high"]');
    
    // Select operating hours
    await page.click('#operating-hours-select');
    await page.click('[data-value="24-7"]');
    
    // Select partnership type
    await page.click('#partnership-interest-select');
    await page.click('[data-value="revenue-share"]');
    
    // Select timeline
    await page.click('#timeline-select');
    await page.click('[data-value="3-6-months"]');
    
    // Agree to terms
    await page.check('#agreeToTerms');
    
    // Submit form
    await page.click('[data-cta="host-application-submit"]');
    
    // Should navigate to thank you page
    await expect(page).toHaveURL(/\/thank-you\?type=host-application/);
    await expect(page.locator('h1')).toContainText('Thank You');
  });

  test('Analytics tracking events are fired', async ({ page }) => {
    // Listen for network requests to analytics endpoint
    const analyticsRequests: any[] = [];
    
    page.on('request', request => {
      if (request.url().includes('/api/analytics/log')) {
        analyticsRequests.push({
          url: request.url(),
          method: request.method(),
          postData: request.postData()
        });
      }
    });
    
    await page.goto('/');
    
    // Click a tracked CTA
    await page.click('[data-cta="hero-primary"]');
    
    // Wait a bit for the request to be sent
    await page.waitForTimeout(500);
    
    // Check that analytics was called
    expect(analyticsRequests.length).toBeGreaterThan(0);
    expect(analyticsRequests[0].url).toContain('/api/analytics/log');
    expect(analyticsRequests[0].method).toBe('POST');
  });

  test('UTM parameter capture and retention', async ({ page }) => {
    // Visit with UTM parameters
    await page.goto('/?utm_source=test&utm_medium=email&utm_campaign=launch');
    
    // Navigate to form
    await page.click('[data-cta="hero-primary"]');
    await expect(page).toHaveURL('/early-access');
    
    // Check localStorage for UTM data
    const utmData = await page.evaluate(() => {
      return localStorage.getItem('alchemy_attribution');
    });
    
    expect(utmData).toBeTruthy();
    const parsedData = JSON.parse(utmData);
    expect(parsedData.utm_source).toBe('test');
    expect(parsedData.utm_medium).toBe('email');
    expect(parsedData.utm_campaign).toBe('launch');
  });

  test('Form accessibility - keyboard navigation', async ({ page }) => {
    await page.goto('/early-access');
    
    // Test skip link
    await page.keyboard.press('Tab');
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeVisible();
    
    // Press Enter to use skip link
    await page.keyboard.press('Enter');
    
    // Should focus main content
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });

  test('Form validation errors display correctly', async ({ page }) => {
    await page.goto('/early-access');
    
    // Try to submit empty form
    await page.click('[data-cta="early-access-submit"]');
    
    // Should show validation errors
    await expect(page.locator('.text-red-400')).toBeVisible();
    
    // Fill in one field and check error disappears
    await page.fill('#firstName', 'John');
    await page.blur('#firstName');
    
    // First name error should be gone
    const firstNameError = page.locator('#firstName + .text-red-400');
    await expect(firstNameError).not.toBeVisible();
  });
});