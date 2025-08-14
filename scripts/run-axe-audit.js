import puppeteer from 'puppeteer';
import fs from 'fs/promises';

async function runAxeAudit() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  const routes = [
    { path: '/', name: 'Homepage' },
    { path: '/early-access', name: 'Early Access Form' },
    { path: '/host-application', name: 'Host Application Form' }
  ];
  
  const results = [];
  
  for (const route of routes) {
    try {
      await page.goto(`http://localhost:5000${route.path}`);
      await page.waitForLoadState?.('networkidle') || page.waitForTimeout(2000);
      
      // Inject axe-core
      await page.addScriptTag({ 
        url: 'https://unpkg.com/axe-core@4.7.0/axe.min.js' 
      });
      
      // Run axe audit
      const axeResults = await page.evaluate(() => {
        return axe.run();
      });
      
      results.push({
        page: route.name,
        path: route.path,
        url: `http://localhost:5000${route.path}`,
        violations: axeResults.violations.map(violation => ({
          id: violation.id,
          impact: violation.impact,
          description: violation.description,
          help: violation.help,
          helpUrl: violation.helpUrl,
          tags: violation.tags,
          nodes: violation.nodes.length
        })),
        passes: axeResults.passes.length,
        inapplicable: axeResults.inapplicable.length,
        incomplete: axeResults.incomplete.length,
        timestamp: new Date().toISOString()
      });
      
      console.log(`✓ Audited ${route.name}: ${axeResults.violations.length} violations`);
      
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
  
  const summary = {
    total_pages: results.length,
    total_violations: results.reduce((sum, r) => sum + (r.violations?.length || 0), 0),
    critical_violations: results.reduce((sum, r) => 
      sum + (r.violations?.filter(v => v.impact === 'critical').length || 0), 0),
    serious_violations: results.reduce((sum, r) => 
      sum + (r.violations?.filter(v => v.impact === 'serious').length || 0), 0),
    results: results,
    audit_timestamp: new Date().toISOString()
  };
  
  await fs.writeFile('audit/accessibility/axe-report.json', JSON.stringify(summary, null, 2));
  console.log(`Accessibility audit complete: ${summary.total_violations} total violations`);
  
  return summary;
}

runAxeAudit().catch(console.error);