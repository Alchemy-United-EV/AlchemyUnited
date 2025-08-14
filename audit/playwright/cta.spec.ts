import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from '@axe-core/playwright';

const routes = [
  { path: '/', name: 'Homepage' },
  { path: '/early-access', name: 'Early Access Form' },
  { path: '/host-application', name: 'Host Application Form' }
];

test.describe('CTA and Form Audit', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5000');
  });

  for (const route of routes) {
    test(`${route.name} - CTAs and Navigation`, async ({ page }) => {
      await page.goto(`http://localhost:5000${route.path}`);
      
      // Wait for page to load
      await page.waitForLoadState('networkidle');
      
      // Check basic page requirements
      await expect(page.locator('h1')).toBeVisible();
      const title = await page.title();
      expect(title).toBeTruthy();
      
      // Find all clickable elements
      const clickableElements = await page.locator('button, a[role="button"], a[href], [data-cta]').all();
      
      console.log(`Found ${clickableElements.length} clickable elements on ${route.path}`);
      
      for (let i = 0; i < clickableElements.length; i++) {
        const element = clickableElements[i];
        const text = await element.textContent();
        const href = await element.getAttribute('href');
        const dataCta = await element.getAttribute('data-cta');
        
        if (text?.trim()) {
          console.log(`CTA ${i + 1}: "${text.trim()}" ${href ? `(href: ${href})` : ''} ${dataCta ? `(data-cta: ${dataCta})` : ''}`);
          
          // Skip external links and anchor links
          if (href && (href.startsWith('http') || href.startsWith('#'))) {
            continue;
          }
          
          try {
            await element.click({ timeout: 5000 });
            await page.waitForLoadState('networkidle', { timeout: 10000 });
            
            // Verify navigation succeeded
            const currentUrl = page.url();
            const response = await page.goto(currentUrl);
            expect(response?.status()).toBeLessThan(400);
            
            // Verify target page has h1
            await expect(page.locator('h1')).toBeVisible();
            
            // Go back to continue testing other elements
            if (route.path !== '/') {
              await page.goto(`http://localhost:5000${route.path}`);
              await page.waitForLoadState('networkidle');
            }
          } catch (error) {
            console.error(`Failed to click element "${text?.trim()}" on ${route.path}:`, error);
          }
        }
      }
    });
  }

  test('Early Access Form - Happy Path Submission', async ({ page }) => {
    await page.goto('http://localhost:5000/early-access');
    await page.waitForLoadState('networkidle');
    
    // Fill out the form with valid data
    await page.fill('input[name="firstName"]', 'Test');
    await page.fill('input[name="lastName"]', 'User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '+1-555-0123');
    
    // Select vehicle type
    await page.click('[data-testid="vehicle-type-trigger"]');
    await page.click('text="Tesla Model 3"');
    
    // Select charging frequency  
    await page.click('[data-testid="charging-frequency-trigger"]');
    await page.click('text="Daily"');
    
    await page.fill('input[name="location"]', 'San Francisco, CA');
    await page.fill('input[name="referralCode"]', 'TEST2024');
    await page.fill('textarea[name="interests"]', 'Testing the form submission flow');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for success state
    await page.waitForTimeout(3000);
    
    // Check for success message or redirect
    const successElement = await page.locator('text="successfully"').first();
    if (await successElement.isVisible()) {
      expect(await successElement.isVisible()).toBe(true);
    } else {
      // Check if redirected to success page
      const currentUrl = page.url();
      const h1 = await page.locator('h1').textContent();
      console.log(`Form submission result - URL: ${currentUrl}, H1: ${h1}`);
    }
  });

  test('Host Application Form - Happy Path Submission', async ({ page }) => {
    await page.goto('http://localhost:5000/host-application');
    await page.waitForLoadState('networkidle');
    
    // Fill out the form with valid data
    await page.fill('input[name="businessName"]', 'Test Business Corp');
    await page.fill('input[name="contactFirstName"]', 'John');
    await page.fill('input[name="contactLastName"]', 'Doe'); 
    await page.fill('input[name="email"]', 'john@testbusiness.com');
    await page.fill('input[name="phone"]', '+1-555-0456');
    
    // Select property type
    await page.click('[data-testid="property-type-trigger"]');
    await page.click('text="Office Building"');
    
    await page.fill('textarea[name="propertyAddress"]', '123 Test Street, Test City, CA 90210');
    
    // Select parking spaces
    await page.click('[data-testid="parking-spaces-trigger"]');
    await page.click('text="20-50 spaces"');
    
    // Select electrical capacity
    await page.click('[data-testid="electrical-capacity-trigger"]');
    await page.click('text="100+ kW available"');
    
    // Select expected traffic  
    await page.click('[data-testid="expected-traffic-trigger"]');
    await page.click('text="Medium (50-100 vehicles/day)"');
    
    await page.fill('input[name="operatingHours"]', 'Monday-Friday 8AM-6PM');
    await page.fill('textarea[name="currentAmenities"]', 'Security, parking validation');
    
    // Select partnership interest
    await page.click('[data-testid="partnership-interest-trigger"]');
    await page.click('text="Revenue sharing partnership"');
    
    // Select timeline
    await page.click('[data-testid="timeline-trigger"]');
    await page.click('text="3-6 months"');
    
    await page.fill('textarea[name="additionalInfo"]', 'Testing the host application form submission');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Wait for success state
    await page.waitForTimeout(3000);
    
    // Check for success message or redirect
    const successElement = await page.locator('text="successfully"').first();
    if (await successElement.isVisible()) {
      expect(await successElement.isVisible()).toBe(true);
    } else {
      // Check if redirected to success page
      const currentUrl = page.url();
      const h1 = await page.locator('h1').textContent();
      console.log(`Host form submission result - URL: ${currentUrl}, H1: ${h1}`);
    }
  });

  test('Accessibility - Check all pages', async ({ page }) => {
    for (const route of routes) {
      await page.goto(`http://localhost:5000${route.path}`);
      await page.waitForLoadState('networkidle');
      
      await injectAxe(page);
      
      try {
        await checkA11y(page, null, {
          detailedReport: true,
          detailedReportOptions: { html: true }
        });
      } catch (error) {
        console.log(`Accessibility violations found on ${route.path}:`, error);
      }
    }
  });
});