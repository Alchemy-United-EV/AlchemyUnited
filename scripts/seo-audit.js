import puppeteer from 'puppeteer';
import fs from 'fs/promises';

async function runSEOAudit() {
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
      
      const seoData = await page.evaluate(() => {
        // Title
        const title = document.title;
        
        // Meta description
        const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
        
        // Canonical URL
        const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
        
        // Headings
        const h1Elements = Array.from(document.querySelectorAll('h1')).map(h => h.textContent?.trim());
        const h2Elements = Array.from(document.querySelectorAll('h2')).map(h => h.textContent?.trim());
        
        // Robots meta
        const robotsMeta = document.querySelector('meta[name="robots"]')?.getAttribute('content');
        
        // Open Graph
        const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
        const ogDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
        const ogType = document.querySelector('meta[property="og:type"]')?.getAttribute('content');
        const ogUrl = document.querySelector('meta[property="og:url"]')?.getAttribute('content');
        
        // Structured Data
        const jsonLdScripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
        const structuredData = jsonLdScripts.map(script => {
          try {
            return JSON.parse(script.textContent);
          } catch (e) {
            return null;
          }
        }).filter(Boolean);
        
        // Performance hints
        const lcpElement = document.querySelector('img, video, [data-lcp]');
        
        return {
          title,
          titleLength: title?.length || 0,
          metaDescription,
          metaDescriptionLength: metaDescription?.length || 0,
          canonical,
          h1Elements,
          h1Count: h1Elements.length,
          h2Elements,
          robotsMeta,
          openGraph: {
            title: ogTitle,
            description: ogDescription,
            type: ogType,
            url: ogUrl
          },
          structuredData,
          structuredDataCount: structuredData.length,
          lcpElementTag: lcpElement?.tagName,
          url: window.location.href
        };
      });
      
      // SEO scoring
      const issues = [];
      const recommendations = [];
      
      if (!seoData.title || seoData.titleLength === 0) {
        issues.push('Missing title tag');
      } else if (seoData.titleLength > 60) {
        issues.push('Title too long (>60 chars)');
      }
      
      if (!seoData.metaDescription || seoData.metaDescriptionLength === 0) {
        issues.push('Missing meta description');
      } else if (seoData.metaDescriptionLength > 160) {
        issues.push('Meta description too long (>160 chars)');
      }
      
      if (!seoData.canonical) {
        issues.push('Missing canonical URL');
        recommendations.push(`Add: <link rel="canonical" href="${seoData.url}" />`);
      }
      
      if (seoData.h1Count === 0) {
        issues.push('Missing H1 tag');
      } else if (seoData.h1Count > 1) {
        issues.push('Multiple H1 tags found');
      }
      
      if (seoData.structuredDataCount === 0) {
        issues.push('No structured data found');
        recommendations.push('Add JSON-LD structured data for Organization/LocalBusiness');
      }
      
      if (!seoData.robotsMeta) {
        recommendations.push('Add robots meta tag: <meta name="robots" content="index, follow" />');
      }
      
      results.push({
        page: route.name,
        path: route.path,
        ...seoData,
        issues,
        recommendations,
        seoScore: Math.max(0, 100 - (issues.length * 15)),
        timestamp: new Date().toISOString()
      });
      
      console.log(`✓ SEO audit ${route.name}: ${issues.length} issues, score ${Math.max(0, 100 - (issues.length * 15))}/100`);
      
    } catch (error) {
      console.log(`✗ Failed SEO audit ${route.name}:`, error.message);
      results.push({
        page: route.name,
        path: route.path,
        error: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }
  
  await browser.close();
  
  // Generate markdown report
  let markdown = '# SEO Pages Report\n\n';
  markdown += `Generated: ${new Date().toISOString()}\n\n`;
  
  for (const result of results) {
    if (result.error) {
      markdown += `## ${result.page} - ERROR\n\nFailed to audit: ${result.error}\n\n`;
      continue;
    }
    
    markdown += `## ${result.page}\n\n`;
    markdown += `**Path:** ${result.path}  \n`;
    markdown += `**SEO Score:** ${result.seoScore}/100  \n`;
    markdown += `**Issues:** ${result.issues.length}  \n\n`;
    
    markdown += '### Current SEO Elements\n\n';
    markdown += `- **Title:** ${result.title || 'MISSING'} (${result.titleLength} chars)\n`;
    markdown += `- **Meta Description:** ${result.metaDescription || 'MISSING'} (${result.metaDescriptionLength} chars)\n`;
    markdown += `- **Canonical URL:** ${result.canonical || 'MISSING'}\n`;
    markdown += `- **H1 Count:** ${result.h1Count} (${result.h1Elements.join(', ')})\n`;
    markdown += `- **H2 Count:** ${result.h2Elements.length}\n`;
    markdown += `- **Structured Data:** ${result.structuredDataCount} schemas\n`;
    markdown += `- **Robots Meta:** ${result.robotsMeta || 'MISSING'}\n\n`;
    
    if (result.issues.length > 0) {
      markdown += '### Issues to Fix\n\n';
      result.issues.forEach(issue => {
        markdown += `- ❌ ${issue}\n`;
      });
      markdown += '\n';
    }
    
    if (result.recommendations.length > 0) {
      markdown += '### Recommended Fixes\n\n';
      result.recommendations.forEach(rec => {
        markdown += `- ✅ ${rec}\n`;
      });
      markdown += '\n';
    }
    
    markdown += '### Open Graph Data\n\n';
    markdown += `- **og:title:** ${result.openGraph.title || 'MISSING'}\n`;
    markdown += `- **og:description:** ${result.openGraph.description || 'MISSING'}\n`;
    markdown += `- **og:type:** ${result.openGraph.type || 'MISSING'}\n`;
    markdown += `- **og:url:** ${result.openGraph.url || 'MISSING'}\n\n`;
    
    markdown += '---\n\n';
  }
  
  // Summary
  const totalIssues = results.reduce((sum, r) => sum + (r.issues?.length || 0), 0);
  const avgScore = results.reduce((sum, r) => sum + (r.seoScore || 0), 0) / results.length;
  
  markdown += `## Summary\n\n`;
  markdown += `- **Total Pages:** ${results.length}\n`;
  markdown += `- **Total Issues:** ${totalIssues}\n`;
  markdown += `- **Average SEO Score:** ${avgScore.toFixed(1)}/100\n`;
  
  await fs.writeFile('audit/seo/seo-pages-report.md', markdown);
  console.log(`SEO audit complete: ${totalIssues} total issues, avg score ${avgScore.toFixed(1)}/100`);
  
  return results;
}

runSEOAudit().catch(console.error);