# Google Analytics 4 Implementation Plan

## Event Tracking Strategy

### Core Conversion Events

#### 1. CTA Click Events
**Event Name**: `cta_click`
```javascript
gtag('event', 'cta_click', {
  'button_id': 'get-early-access', // semantic button identifier
  'button_text': 'Get Early Access', // visible text
  'page_location': window.location.href,
  'page_title': document.title,
  'section': 'hero', // hero, features, social-proof, footer
  'variant': 'primary' // primary, secondary, text
});
```

#### 2. Form Interaction Events
**Event Name**: `form_start`
```javascript
gtag('event', 'form_start', {
  'form_id': 'early-access-form',
  'form_type': 'lead_generation',
  'page_location': window.location.href
});
```

**Event Name**: `form_submit`
```javascript
gtag('event', 'form_submit', {
  'form_id': 'early-access-form', 
  'form_type': 'lead_generation',
  'page_location': window.location.href
});
```

**Event Name**: `form_success`
```javascript
gtag('event', 'form_success', {
  'form_id': 'early-access-form',
  'form_type': 'lead_generation', 
  'application_id': response.id, // server response ID
  'value': 300, // estimated lead value
  'currency': 'USD'
});
```

**Event Name**: `form_error`
```javascript
gtag('event', 'form_error', {
  'form_id': 'early-access-form',
  'error_type': 'validation', // validation, server, network
  'error_message': 'Email is required',
  'page_location': window.location.href
});
```

### Page View Events

#### Enhanced Page Views
```javascript
gtag('config', 'GA_MEASUREMENT_ID', {
  'page_title': document.title,
  'page_location': window.location.href,
  'content_group1': 'Marketing', // content category
  'content_group2': 'Landing Page' // page type
});
```

#### Custom Page Events
**Event Name**: `page_scroll`
```javascript
gtag('event', 'scroll', {
  'percent_scrolled': 25, // 25, 50, 75, 90
  'page_location': window.location.href
});
```

### Conversion Setup

#### Conversion Events Configuration
1. **form_success** - Primary conversion (Lead Generation)
   - Value: $300 (estimated LTV)
   - Attribution: Last Click
   
2. **cta_click** - Micro-conversion (Engagement) 
   - Value: $0
   - Attribution: Last Click

#### Enhanced Ecommerce (Lead Tracking)
```javascript
// Track lead as "purchase" for value attribution
gtag('event', 'purchase', {
  'transaction_id': response.id,
  'value': 300.00,
  'currency': 'USD',
  'items': [{
    'item_id': 'early-access-lead',
    'item_name': 'Early Access Application',
    'category': 'Lead Generation',
    'quantity': 1,
    'price': 300.00
  }]
});
```

## Implementation Checklist

### Phase 1: GA4 Setup (Week 1)
- [ ] Create GA4 Property 
- [ ] Install Global Site Tag (gtag.js)
- [ ] Configure Enhanced Ecommerce
- [ ] Set up Conversion Events
- [ ] Test in GA4 DebugView

### Phase 2: Event Implementation (Week 1) 
- [ ] Add data-cta attributes to all buttons
- [ ] Implement CTA click tracking
- [ ] Add form interaction tracking
- [ ] Set up scroll depth tracking
- [ ] Configure error tracking

### Phase 3: Advanced Tracking (Week 2)
- [ ] Implement audience segmentation
- [ ] Set up custom dimensions
- [ ] Create attribution models
- [ ] Build conversion funnel reports
- [ ] Implement A/B testing framework

## Data-CTA Attribute Mapping

### Homepage CTAs
```html
<button data-cta="hero-early-access" data-cta-section="hero" data-cta-variant="primary">
  Get Early Access
</button>

<button data-cta="hero-host-partner" data-cta-section="hero" data-cta-variant="secondary">
  Become a Host Partner  
</button>

<button data-cta="features-learn-more" data-cta-section="features" data-cta-variant="text">
  Learn More
</button>
```

### Form CTAs
```html
<button data-cta="early-access-submit" data-cta-section="form" data-cta-variant="primary" type="submit">
  Request Early Access
</button>

<button data-cta="host-application-submit" data-cta-section="form" data-cta-variant="primary" type="submit">
  Submit Application
</button>
```

## Analytics Dashboard Goals

### Key Performance Indicators
1. **Conversion Rate**: Form submissions / Page views
2. **Cost Per Lead**: Marketing spend / Total leads  
3. **Lead Quality Score**: Approved applications / Total applications
4. **Funnel Drop-off**: Page views → CTA clicks → Form starts → Form submissions

### Custom Reports
1. **CTA Performance Report**: Click-through rates by button and section
2. **Form Conversion Funnel**: Step-by-step form completion analysis
3. **Page Performance Report**: Engagement metrics by page
4. **Lead Value Analysis**: Revenue attribution by traffic source

## Privacy & Compliance

### GDPR/CCPA Considerations
- Implement consent management (if EU/CA traffic)
- Anonymize IP addresses 
- Respect Do Not Track signals
- Provide opt-out mechanisms

### Data Retention
- Set appropriate data retention periods (26 months default)
- Implement data deletion procedures
- Document data processing activities

## Testing & Validation

### GA4 DebugView Testing
1. Enable debug mode: `gtag('config', 'GA_MEASUREMENT_ID', { debug_mode: true });`
2. Test each event type manually
3. Verify parameter accuracy
4. Confirm conversion tracking

### Automated Testing
1. Create Playwright tests for event firing
2. Mock GA4 requests in test environment  
3. Validate event parameters and frequency
4. Test error scenarios and edge cases

## Success Metrics

### Week 1 Targets
- [ ] 100% CTA click tracking coverage
- [ ] 100% form interaction tracking  
- [ ] 0 tracking errors in console
- [ ] GA4 receiving events in real-time

### Month 1 Targets  
- [ ] 95%+ data accuracy vs server logs
- [ ] Complete conversion funnel visibility
- [ ] Actionable insights for optimization
- [ ] Automated reporting dashboard

This implementation will provide comprehensive visibility into user behavior and conversion performance, enabling data-driven optimization of the Alchemy Network platform.