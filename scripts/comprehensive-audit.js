import fs from 'fs';
import * as cheerio from 'cheerio';

const routes = [
  { path: '/', name: 'homepage', file: '/tmp/homepage-test.html' },
  { path: '/early-access', name: 'early-access', file: '/tmp/early-access-test.html' },
  { path: '/host-application', name: 'host-application', file: '/tmp/host-application-test.html' }
];

const auditResults = {
  timestamp: new Date().toISOString(),
  overall_health: {},
  pages: [],
  ctas: [],
  forms: [],
  seo: {
    issues: [],
    passes: []
  },
  accessibility: {
    violations: [],
    passes: []
  },
  performance: {
    metrics: [],
    issues: []
  },
  backend: {
    endpoints: [],
    status: 'healthy'
  }
};

// SEO analysis function
function analyzeSEO(route, $) {
  const title = $('title').text().trim();
  const metaDescription = $('meta[name="description"]').attr('content');
  const canonical = $('link[rel="canonical"]').attr('href');
  const htmlLang = $('html').attr('lang');
  const h1Elements = $('h1');
  const h2Elements = $('h2');
  const h3Elements = $('h3');
  const images = $('img');
  const jsonLd = $('script[type="application/ld+json"]');
  const ogTags = {
    title: $('meta[property="og:title"]').attr('content'),
    description: $('meta[property="og:description"]').attr('content'),
    image: $('meta[property="og:image"]').attr('content'),
    type: $('meta[property="og:type"]').attr('content')
  };

  const seoData = {
    page: route.path,
    title: {
      present: !!title,
      content: title,
      length: title.length,
      unique: true, // Will be determined later by comparing across pages
      optimal: title.length >= 40 && title.length <= 60
    },
    metaDescription: {
      present: !!metaDescription,
      content: metaDescription,
      length: metaDescription?.length || 0,
      optimal: metaDescription && metaDescription.length >= 140 && metaDescription.length <= 160
    },
    canonical: {
      present: !!canonical,
      url: canonical
    },
    htmlLang: {
      present: !!htmlLang,
      value: htmlLang
    },
    headings: {
      h1: {
        count: h1Elements.length,
        content: h1Elements.map((i, el) => $(el).text().trim()).get(),
        optimal: h1Elements.length === 1
      },
      h2: {
        count: h2Elements.length,
        content: h2Elements.map((i, el) => $(el).text().trim()).get()
      },
      h3: {
        count: h3Elements.length,
        content: h3Elements.map((i, el) => $(el).text().trim()).get()
      }
    },
    images: {
      total: images.length,
      withAlt: images.filter((i, el) => $(el).attr('alt')).length,
      missingAlt: images.length - images.filter((i, el) => $(el).attr('alt')).length
    },
    structuredData: {
      present: jsonLd.length > 0,
      count: jsonLd.length
    },
    openGraph: ogTags
  };

  // Track SEO issues
  if (!title) {
    auditResults.seo.issues.push({
      page: route.path,
      issue: 'Missing title tag',
      severity: 'critical',
      impact: 'high'
    });
  } else if (!seoData.title.optimal) {
    auditResults.seo.issues.push({
      page: route.path,
      issue: `Title length ${title.length} chars (optimal: 40-60)`,
      severity: 'warning',
      impact: 'medium'
    });
  }

  if (!metaDescription) {
    auditResults.seo.issues.push({
      page: route.path,
      issue: 'Missing meta description',
      severity: 'critical',
      impact: 'high'
    });
  } else if (!seoData.metaDescription.optimal) {
    auditResults.seo.issues.push({
      page: route.path,
      issue: `Meta description ${metaDescription.length} chars (optimal: 140-160)`,
      severity: 'warning',
      impact: 'medium'
    });
  }

  if (h1Elements.length !== 1) {
    auditResults.seo.issues.push({
      page: route.path,
      issue: `Found ${h1Elements.length} H1 tags (should be 1)`,
      severity: 'warning',
      impact: 'medium'
    });
  }

  if (!canonical) {
    auditResults.seo.issues.push({
      page: route.path,
      issue: 'Missing canonical link',
      severity: 'warning',
      impact: 'low'
    });
  }

  if (!htmlLang) {
    auditResults.seo.issues.push({
      page: route.path,
      issue: 'Missing lang attribute on html tag',
      severity: 'warning',
      impact: 'medium'
    });
  }

  return seoData;
}

// CTA analysis function
function analyzeCTAs(route, $) {
  const ctas = [];
  
  // Find all potential CTAs
  const ctaSelectors = [
    '[data-cta]',
    'button:not([type="submit"])',
    'a[role="button"]',
    'a[href^="/"]',
    'button[type="submit"]'
  ];

  ctaSelectors.forEach(selector => {
    $(selector).each((i, element) => {
      const $el = $(element);
      const text = $el.text().trim();
      const dataCta = $el.attr('data-cta');
      const href = $el.attr('href');
      const type = $el.attr('type');
      const ariaLabel = $el.attr('aria-label');
      const role = $el.attr('role');
      
      if (text || dataCta) {
        ctas.push({
          page: route.path,
          selector,
          text,
          dataCta,
          href,
          type,
          ariaLabel,
          role,
          hasDataCta: !!dataCta,
          hasAriaLabel: !!ariaLabel,
          isAccessible: !!(text || ariaLabel),
          tagName: element.tagName.toLowerCase()
        });
      }
    });
  });

  return ctas;
}

// Accessibility analysis function
function analyzeAccessibility(route, $) {
  const violations = [];
  const passes = [];

  // Check form labels
  $('input, select, textarea').each((i, element) => {
    const $el = $(element);
    const id = $el.attr('id');
    const ariaLabel = $el.attr('aria-label');
    const ariaLabelledBy = $el.attr('aria-labelledby');
    const hasLabel = id && $(`label[for="${id}"]`).length > 0;
    const type = $el.attr('type');
    const placeholder = $el.attr('placeholder');

    if (!hasLabel && !ariaLabel && !ariaLabelledBy) {
      violations.push({
        page: route.path,
        element: element.tagName.toLowerCase(),
        issue: 'Form element missing accessible label',
        severity: 'critical',
        selector: $el.attr('name') || $el.attr('data-testid') || 'unknown',
        fix: 'Add aria-label or associate with label element'
      });
    } else {
      passes.push({
        page: route.path,
        element: element.tagName.toLowerCase(),
        check: 'Form element has accessible label'
      });
    }
  });

  // Check button accessibility
  $('button').each((i, element) => {
    const $el = $(element);
    const text = $el.text().trim();
    const ariaLabel = $el.attr('aria-label');
    const type = $el.attr('type');

    if (!text && !ariaLabel) {
      violations.push({
        page: route.path,
        element: 'button',
        issue: 'Button missing accessible name',
        severity: 'critical',
        selector: $el.attr('class') || 'unknown',
        fix: 'Add visible text or aria-label'
      });
    }

    if (!type) {
      violations.push({
        page: route.path,
        element: 'button',
        issue: 'Button missing type attribute',
        severity: 'warning',
        selector: text || 'unknown',
        fix: 'Add type="button" or type="submit"'
      });
    }
  });

  // Check image alt text
  $('img').each((i, element) => {
    const $el = $(element);
    const alt = $el.attr('alt');
    const src = $el.attr('src');
    const isDecorative = src && (src.includes('decoration') || src.includes('background'));

    if (!alt && !isDecorative) {
      violations.push({
        page: route.path,
        element: 'img',
        issue: 'Image missing alt text',
        severity: 'serious',
        selector: src || 'unknown',
        fix: 'Add descriptive alt attribute'
      });
    }
  });

  // Check color contrast (basic detection)
  $('[class*="text-white/"], [class*="text-gray/"]').each((i, element) => {
    const $el = $(element);
    const classes = $el.attr('class');
    if (classes && classes.includes('text-white/60')) {
      violations.push({
        page: route.path,
        element: element.tagName.toLowerCase(),
        issue: 'Potential low color contrast',
        severity: 'serious',
        selector: classes,
        fix: 'Increase opacity or use darker background'
      });
    }
  });

  return { violations, passes };
}

// Main audit function
function auditPage(route) {
  try {
    console.log(`Auditing ${route.name}...`);
    const html = fs.readFileSync(route.file, 'utf8');
    const $ = cheerio.load(html);
    
    // SEO Analysis
    const seoData = analyzeSEO(route, $);
    
    // CTA Analysis
    const ctas = analyzeCTAs(route, $);
    
    // Accessibility Analysis
    const a11yData = analyzeAccessibility(route, $);
    
    const pageData = {
      page: route.name,
      path: route.path,
      seo: seoData,
      ctas: ctas.length,
      ctasWithTracking: ctas.filter(c => c.hasDataCta).length,
      accessibility: {
        violations: a11yData.violations.length,
        passes: a11yData.passes.length,
        score: Math.round((a11yData.passes.length / (a11yData.passes.length + a11yData.violations.length)) * 100)
      },
      timestamp: new Date().toISOString()
    };
    
    auditResults.pages.push(pageData);
    auditResults.ctas.push(...ctas);
    auditResults.accessibility.violations.push(...a11yData.violations);
    auditResults.accessibility.passes.push(...a11yData.passes);
    
    return pageData;
    
  } catch (error) {
    console.error(`Error auditing ${route.name}:`, error.message);
    return null;
  }
}

// Run audit on all pages
console.log('Starting comprehensive audit...');

routes.forEach(route => {
  auditPage(route);
});

// Calculate overall scores
const totalSeoIssues = auditResults.seo.issues.length;
const criticalSeoIssues = auditResults.seo.issues.filter(i => i.severity === 'critical').length;
const totalA11yViolations = auditResults.accessibility.violations.length;
const criticalA11yViolations = auditResults.accessibility.violations.filter(v => v.severity === 'critical').length;

auditResults.overall_health = {
  seo_score: Math.max(0, 100 - (criticalSeoIssues * 20) - ((totalSeoIssues - criticalSeoIssues) * 5)),
  accessibility_score: Math.max(0, 100 - (criticalA11yViolations * 25) - ((totalA11yViolations - criticalA11yViolations) * 10)),
  cta_coverage: Math.round((auditResults.ctas.filter(c => c.hasDataCta).length / auditResults.ctas.length) * 100),
  total_issues: totalSeoIssues + totalA11yViolations,
  critical_issues: criticalSeoIssues + criticalA11yViolations
};

// Save results
fs.writeFileSync('audit/comprehensive-audit-results.json', JSON.stringify(auditResults, null, 2));

console.log('\nAudit Summary:');
console.log(`- Pages audited: ${auditResults.pages.length}`);
console.log(`- CTAs found: ${auditResults.ctas.length} (${auditResults.overall_health.cta_coverage}% tracked)`);
console.log(`- SEO issues: ${totalSeoIssues} (${criticalSeoIssues} critical)`);
console.log(`- A11y violations: ${totalA11yViolations} (${criticalA11yViolations} critical)`);
console.log(`- SEO score: ${auditResults.overall_health.seo_score}/100`);
console.log(`- Accessibility score: ${auditResults.overall_health.accessibility_score}/100`);
console.log('\nResults saved to audit/comprehensive-audit-results.json');