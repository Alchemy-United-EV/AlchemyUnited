import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';

async function crawlRoutes() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  const routes = [];
  const visited = new Set();
  const baseUrl = 'http://localhost:5000';
  
  async function crawlPage(url, depth = 0) {
    if (depth > 2 || visited.has(url)) return;
    visited.add(url);
    
    try {
      await page.goto(url);
      const title = await page.title();
      
      routes.push({
        path: url.replace(baseUrl, '') || '/',
        title,
        status: 'active',
        depth
      });
      
      // Find internal links
      const links = await page.$$eval('a[href]', anchors => 
        anchors
          .map(a => a.href)
          .filter(href => href.startsWith('http://localhost:5000') || href.startsWith('/'))
          .filter(href => !href.includes('#'))
      );
      
      for (const link of links) {
        const fullUrl = link.startsWith('/') ? baseUrl + link : link;
        await crawlPage(fullUrl, depth + 1);
      }
    } catch (error) {
      console.log(`Failed to crawl ${url}:`, error.message);
    }
  }
  
  await crawlPage(baseUrl);
  await browser.close();
  
  const result = {
    routes: [...new Set(routes.map(r => JSON.stringify(r)))].map(r => JSON.parse(r)),
    crawled_at: new Date().toISOString(),
    total_routes: routes.length,
    discovery_method: 'puppeteer_crawl'
  };
  
  await fs.writeFile('audit/crawl-routes.json', JSON.stringify(result, null, 2));
  console.log(`Crawled ${result.total_routes} routes`);
}

crawlRoutes().catch(console.error);