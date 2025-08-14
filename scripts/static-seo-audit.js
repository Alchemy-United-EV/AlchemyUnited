import fs from 'fs';
import * as cheerio from 'cheerio';

const routes = [
  { path: '/', name: 'homepage', file: 'audit/homepage-source.html' },
  { path: '/early-access', name: 'early-access', file: 'audit/early-access-source.html' },
  { path: '/host-application', name: 'host-application', file: 'audit/host-application-source.html' }
];

const auditResults = {
  pages: [],
  ctas: [],
  seo_issues: [],
  accessibility_issues: []
};

function auditPage(route) {
  try {
    const html = fs.readFileSync(route.file, 'utf8');
    const $ = cheerio.load(html);
    
    // SEO Analysis
    const title = $('title').text();
    const metaDescription = $('meta[name="description"]').attr('content');
    const canonical = $('link[rel="canonical"]').attr('href');
    const h1Count = $('h1').length;
    const h1Text = $('h1').first().text();
    const h2Count = $('h2').length;
    const ogTitle = $('meta[property="og:title"]').attr('content');
    const ogDescription = $('meta[property="og:description"]').attr('content');
    const htmlLang = $('html').attr('lang');
    const jsonLd = $('script[type="application/ld+json"]');
    
    // CTA Analysis
    const ctas = [];
    $('[data-cta], button, a[href]').each((i, el) => {
      const $el = $(el);
      const text = $el.text().trim();
      const dataCta = $el.attr('data-cta');
      const href = $el.attr('href');
      const ariaLabel = $el.attr('aria-label');
      const type = $el.attr('type');
      const role = $el.attr('role');
      
      if (text || dataCta) {
        ctas.push({
          page: route.path,
          text,
          dataCta,
          href,
          ariaLabel,
          type,
          role,
          tagName: el.tagName
        });
      }
    });
    
    // Image Analysis
    const images = [];
    $('img').each((i, el) => {
      const $el = $(el);
      images.push({
        src: $el.attr('src'),
        alt: $el.attr('alt'),
        hasAlt: $el.attr('alt') !== undefined,
        isEmpty: !$el.attr('alt') || $el.attr('alt').trim() === ''
      });
    });
    
    const pageResult = {
      page: route.name,
      path: route.path,
      seo: {
        title,
        titleLength: title?.length || 0,
        metaDescription,
        metaDescriptionLength: metaDescription?.length || 0,
        canonical,
        h1Count,
        h1Text,
        h2Count,
        ogTitle,
        ogDescription,
        htmlLang,
        jsonLdCount: jsonLd.length,
        jsonLdPresent: jsonLd.length > 0
      },
      ctas,
      images,
      timestamp: new Date().toISOString()
    };
    
    auditResults.pages.push(pageResult);
    auditResults.ctas.push(...ctas);
    
    // SEO Issues
    if (!title || title.length === 0) {
      auditResults.seo_issues.push({ page: route.path, issue: 'Missing title tag', severity: 'critical' });
    }
    if (title && (title.length < 40 || title.length > 60)) {
      auditResults.seo_issues.push({ page: route.path, issue: `Title length ${title.length} chars (should be 40-60)`, severity: 'warning' });
    }
    if (!metaDescription) {
      auditResults.seo_issues.push({ page: route.path, issue: 'Missing meta description', severity: 'critical' });
    }
    if (metaDescription && (metaDescription.length < 140 || metaDescription.length > 160)) {
      auditResults.seo_issues.push({ page: route.path, issue: `Meta description ${metaDescription.length} chars (should be 140-160)`, severity: 'warning' });
    }
    if (!canonical) {
      auditResults.seo_issues.push({ page: route.path, issue: 'Missing canonical link', severity: 'warning' });
    }
    if (h1Count !== 1) {
      auditResults.seo_issues.push({ page: route.path, issue: `Found ${h1Count} H1 tags (should be 1)`, severity: 'warning' });
    }
    if (!htmlLang) {
      auditResults.seo_issues.push({ page: route.path, issue: 'Missing lang attribute on html tag', severity: 'warning' });
    }
    
    // Accessibility Issues
    images.forEach(img => {
      if (!img.hasAlt && !img.src?.includes('decorative')) {
        auditResults.accessibility_issues.push({
          page: route.path,
          issue: `Image missing alt text: ${img.src}`,
          severity: 'warning'
        });
      }
    });
    
    ctas.forEach(cta => {
      if (cta.tagName === 'button' && !cta.type) {
        auditResults.accessibility_issues.push({
          page: route.path,
          issue: `Button missing type attribute: "${cta.text}"`,
          severity: 'warning'
        });
      }
      if (!cta.ariaLabel && !cta.text) {
        auditResults.accessibility_issues.push({
          page: route.path,
          issue: `Interactive element missing accessible name`,
          severity: 'critical'
        });
      }
    });
    
    return pageResult;
    
  } catch (error) {
    console.error(`Error auditing ${route.name}:`, error.message);
    return null;
  }
}

// Run audit on all pages
routes.forEach(route => {
  console.log(`Auditing ${route.name}...`);
  auditPage(route);
});

// Save results
fs.writeFileSync('audit/static-audit-results.json', JSON.stringify(auditResults, null, 2));

// Generate summary
const summary = {
  totalPages: auditResults.pages.length,
  totalCTAs: auditResults.ctas.length,
  seoIssues: auditResults.seo_issues.length,
  accessibilityIssues: auditResults.accessibility_issues.length,
  criticalSeoIssues: auditResults.seo_issues.filter(i => i.severity === 'critical').length,
  criticalA11yIssues: auditResults.accessibility_issues.filter(i => i.severity === 'critical').length,
  timestamp: new Date().toISOString()
};

console.log('Static Audit Summary:');
console.log(`- Pages audited: ${summary.totalPages}`);
console.log(`- CTAs found: ${summary.totalCTAs}`);
console.log(`- SEO issues: ${summary.seoIssues} (${summary.criticalSeoIssues} critical)`);
console.log(`- Accessibility issues: ${summary.accessibilityIssues} (${summary.criticalA11yIssues} critical)`);

fs.writeFileSync('audit/static-audit-summary.json', JSON.stringify(summary, null, 2));