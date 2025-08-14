import lighthouse from 'lighthouse';
import { launch } from 'puppeteer';
import fs from 'fs/promises';

async function runLighthouseAudit() {
  const browser = await launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const routes = [
    { path: '/', name: 'homepage' },
    { path: '/early-access', name: 'early-access' },
    { path: '/host-application', name: 'host-application' }
  ];

  const results = [];

  for (const route of routes) {
    try {
      console.log(`Running Lighthouse audit for ${route.name}...`);
      
      const result = await lighthouse(
        `http://localhost:5000${route.path}`,
        {
          port: browser.wsEndpoint().split(':').pop().split('/')[0],
          output: ['json', 'html'],
          logLevel: 'info',
          onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo']
        },
        {
          extends: 'lighthouse:default',
          settings: {
            formFactor: 'mobile',
            throttling: {
              rttMs: 40,
              throughputKbps: 10240,
              cpuSlowdownMultiplier: 1,
              requestLatencyMs: 0,
              downloadThroughputKbps: 0,
              uploadThroughputKbps: 0
            },
            screenEmulation: {
              mobile: true,
              width: 375,
              height: 667,
              deviceScaleFactor: 2,
              disabled: false
            }
          }
        }
      );

      const scores = {
        performance: Math.round(result.lhr.categories.performance.score * 100),
        accessibility: Math.round(result.lhr.categories.accessibility.score * 100),
        bestPractices: Math.round(result.lhr.categories['best-practices'].score * 100),
        seo: Math.round(result.lhr.categories.seo.score * 100)
      };

      const metrics = {
        firstContentfulPaint: result.lhr.audits['first-contentful-paint'].numericValue,
        largestContentfulPaint: result.lhr.audits['largest-contentful-paint'].numericValue,
        cumulativeLayoutShift: result.lhr.audits['cumulative-layout-shift'].numericValue,
        totalBlockingTime: result.lhr.audits['total-blocking-time'].numericValue,
        speedIndex: result.lhr.audits['speed-index'].numericValue
      };

      results.push({
        page: route.name,
        path: route.path,
        scores,
        metrics,
        timestamp: new Date().toISOString()
      });

      // Save HTML report
      await fs.writeFile(
        `audit/lighthouse/${route.name}-report.html`,
        result.report[1]
      );

      // Save JSON report
      await fs.writeFile(
        `audit/lighthouse/${route.name}-report.json`,
        JSON.stringify(result.lhr, null, 2)
      );

      console.log(`✓ ${route.name}: Performance ${scores.performance}, A11y ${scores.accessibility}, SEO ${scores.seo}`);

    } catch (error) {
      console.log(`✗ Failed to audit ${route.name}:`, error.message);
      results.push({
        page: route.name,
        path: route.path,
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }

  await browser.close();

  // Save summary
  await fs.writeFile(
    'audit/lighthouse-summary.json',
    JSON.stringify(results, null, 2)
  );

  console.log(`Lighthouse audit complete. Results saved to audit/lighthouse/`);
  return results;
}

runLighthouseAudit().catch(console.error);