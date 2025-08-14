# Tracking & Analytics Plan

## Current Analytics Status ❌ NOT IMPLEMENTED
- **Google Analytics**: Not detected
- **Google Tag Manager**: Not detected  
- **Facebook Pixel**: Not detected
- **Other Tracking**: None detected

**CRITICAL BUSINESS IMPACT**: No conversion tracking = No optimization capability

## Recommended Analytics Implementation

### Google Analytics 4 Setup

#### 1. Core Configuration
```javascript
// Google Analytics 4 Base Configuration
gtag('config', 'GA_MEASUREMENT_ID', {
  cookie_domain: 'auto',
  cookie_flags: 'SameSite=None;Secure',
  send_page_view: false // We'll send manually with more data
});
```

#### 2. Enhanced Ecommerce for Lead Generation
```javascript
// Configure as ecommerce for lead tracking
gtag('config', 'GA_MEASUREMENT_ID', {
  custom_map: {
    'custom_parameter_1': 'lead_source',
    'custom_parameter_2': 'lead_type',
    'custom_parameter_3': 'lead_quality_score'
  }
});
```

### Event Tracking Plan

## Page View Events
```javascript
// Enhanced page views with context
gtag('event', 'page_view', {
  page_title: document.title,
  page_location: window.location.href,
  content_group1: 'EV_Charging_Network', // Business category
  content_group2: getPageType(), // 'homepage', 'forms', 'info'
  custom_parameter_1: getTrafficSource(),
  send_to: 'GA_MEASUREMENT_ID'
});
```

## Conversion Events (HIGH PRIORITY)

### 1. CTA Click Tracking
```javascript
// Primary CTA clicks
gtag('event', 'select_promotion', {
  creative_name: 'Get_Early_Access_Hero',
  creative_slot: 'hero_primary_cta',
  location_id: 'homepage_above_fold',
  promotion_id: 'early_access_2025',
  promotion_name: 'Early Access Campaign'
});

// Host CTA clicks  
gtag('event', 'select_promotion', {
  creative_name: 'Become_Host_Hero', 
  creative_slot: 'hero_secondary_cta',
  location_id: 'homepage_above_fold',
  promotion_id: 'host_partnership_2025',
  promotion_name: 'Host Partnership Campaign'
});
```

### 2. Form Interaction Events
```javascript
// Form start (first field interaction)
gtag('event', 'begin_checkout', {
  currency: 'USD',
  value: 300, // Estimated lead value
  coupon: getUtmCampaign(),
  items: [{
    item_id: 'early_access_application',
    item_name: 'Early Access Application',
    item_category: 'Lead_Generation',
    item_category2: 'EV_Driver',
    quantity: 1,
    price: 300
  }]
});

// Form field completion (progressive profiling)
gtag('event', 'add_to_cart', {
  currency: 'USD', 
  value: calculateProgressValue(),
  items: [{
    item_id: 'form_field_' + fieldName,
    item_name: fieldName,
    item_category: 'Form_Progress',
    quantity: 1
  }]
});

// Form submission (conversion!)
gtag('event', 'purchase', {
  transaction_id: submissionId,
  currency: 'USD',
  value: 300, // Early access lead value
  coupon: getUtmCampaign(),
  items: [{
    item_id: 'early_access_lead',
    item_name: 'Early Access Lead', 
    item_category: 'Lead_Conversion',
    item_category2: getVehicleType(),
    quantity: 1,
    price: 300
  }]
});
```

### 3. Host Application Tracking
```javascript
// Host form submission (higher value)
gtag('event', 'purchase', {
  transaction_id: submissionId,
  currency: 'USD', 
  value: 10000, // Host partnership value
  tax: getEstimatedCommission(),
  shipping: 0,
  items: [{
    item_id: 'host_application_lead',
    item_name: 'Host Partnership Lead',
    item_category: 'B2B_Lead_Conversion', 
    item_category2: getPropertyType(),
    item_brand: getBusinessCategory(),
    quantity: 1,
    price: 10000
  }]
});
```

## Engagement Events

### 4. Social Proof Interactions
```javascript
// Testimonial engagement
gtag('event', 'select_content', {
  content_type: 'testimonial',
  content_id: testimonial.id,
  item_id: testimonial.name + '_testimonial'
});

// Partner logo interaction  
gtag('event', 'view_item', {
  currency: 'USD',
  value: 50, // Engagement value
  items: [{
    item_id: 'partner_' + partnerName.toLowerCase(),
    item_name: partnerName + ' Partnership',
    item_category: 'Social_Proof',
    item_brand: partnerName
  }]
});
```

### 5. Feature Toggle Tracking
```javascript
// Problems → Solutions flip
gtag('event', 'select_content', {
  content_type: 'feature_toggle',
  content_id: 'problem_solution_' + problemId,
  method: flipped[problemId] ? 'show_solution' : 'show_problem'
});
```

### 6. Wing Logo & Animations
```javascript
// Wing logo visibility (scroll engagement)
gtag('event', 'scroll', {
  percent_scrolled: Math.round((scrollPercent / 100) * 100),
  engagement_time_msec: Date.now() - pageStartTime
});
```

## Error & Performance Events

### 7. Form Error Tracking  
```javascript
// Form validation errors
gtag('event', 'exception', {
  description: 'Form_Validation_Error_' + fieldName,
  fatal: false,
  custom_parameter_1: errorMessage,
  custom_parameter_2: 'early_access_form'
});

// Backend submission errors (CRITICAL TO MONITOR)
gtag('event', 'exception', {
  description: 'Form_Submission_Failed',
  fatal: true, // This blocks conversions!
  custom_parameter_1: response.status + '_' + response.statusText,
  custom_parameter_2: formType
});
```

### 8. Performance Tracking
```javascript
// Image loading performance  
gtag('event', 'timing_complete', {
  name: 'image_load_time',
  value: loadTime,
  event_category: 'Performance'
});

// CLS and other Core Web Vitals
gtag('event', 'web_vital', {
  name: 'CLS',
  value: Math.round(clsValue * 1000),
  event_category: 'Web_Vitals'
});
```

## Custom Dimensions & Metrics

### Custom Dimensions
```javascript
// Set on page load
gtag('config', 'GA_MEASUREMENT_ID', {
  custom_map: {
    'custom_parameter_1': 'traffic_source',      // organic, direct, referral
    'custom_parameter_2': 'user_type',           // new_visitor, returning, lead  
    'custom_parameter_3': 'device_category',     // mobile, desktop, tablet
    'custom_parameter_4': 'user_intent',         // driver, host, researcher
    'custom_parameter_5': 'geographic_market'    // major_city, suburb, rural
  }
});
```

## Google Tag Manager Implementation

### Container Structure
```javascript
// GTM Container with enhanced dataLayer
dataLayer = [{
  'content_group1': 'EV_Charging',
  'content_group2': getPageType(),
  'user_properties': {
    'traffic_source': getTrafficSource(),
    'device_type': getDeviceType(),
    'user_intent': getUserIntent()
  }
}];
```

### Trigger Configuration

#### 1. Form Interaction Triggers
- **Form Start**: First field focus on any form
- **Form Progress**: Every 25% completion milestone
- **Form Abandon**: User leaves form with >50% completion
- **Form Submit**: Successful submission event
- **Form Error**: Any validation or submission error

#### 2. Engagement Triggers  
- **Scroll Depth**: 25%, 50%, 75%, 90% page scroll
- **Time Engagement**: 30s, 60s, 120s, 300s on page
- **CTA Visibility**: When primary CTAs enter viewport
- **Social Proof Views**: When testimonials enter viewport

#### 3. Conversion Triggers
- **CTA Clicks**: All primary and secondary CTA buttons
- **Form Completions**: Successful lead submissions
- **Exit Intent**: Mouse leaves viewport (potential lead magnet)

## Attribution & UTM Tracking

### UTM Parameter Strategy
```
Campaign Source Examples:
utm_source=google / facebook / twitter / email / organic
utm_medium=cpc / social / email / referral / organic  
utm_campaign=early_access_launch / host_recruitment / brand_awareness
utm_content=hero_cta / footer_cta / testimonial_link
utm_term=ev_charging / premium_charging / host_partnership
```

### Attribution Model
- **First-Touch Attribution**: For brand awareness measurement
- **Last-Touch Attribution**: For direct response campaigns  
- **Data-Driven Attribution**: For comprehensive journey analysis

## Success KPIs & Dashboards

### Primary Conversion Metrics
1. **Lead Generation Rate**: Applications per 100 visitors
2. **Form Completion Rate**: Submissions per form start
3. **CTA Click-Through Rate**: Clicks per impression
4. **Cost Per Lead**: Total spend ÷ qualified leads
5. **Lead-to-Customer Rate**: Applications that become customers

### Engagement Metrics
6. **Average Session Duration**: Time spent engaging with content
7. **Pages Per Session**: Depth of interest measurement
8. **Social Proof Interaction Rate**: Testimonial/partner engagement
9. **Feature Toggle Usage**: Problems→Solutions interaction rate
10. **Scroll Depth**: Content consumption measurement

### Technical Performance KPIs
11. **Page Load Speed**: Impact on conversion rates
12. **Form Error Rate**: Validation and UX issues
13. **Mobile vs Desktop Performance**: Device-specific optimization
14. **Core Web Vitals**: LCP, FID, CLS performance impact

## Implementation Priority

### Phase 1: CRITICAL (Week 1)
- **Google Analytics 4 Setup**: Base tracking configuration
- **Form Conversion Events**: Track submissions and errors  
- **CTA Click Tracking**: Measure primary action performance
- **Error Monitoring**: Identify broken form submissions

### Phase 2: HIGH IMPACT (Week 2)  
- **Enhanced Ecommerce**: Lead value tracking
- **Custom Dimensions**: User segmentation  
- **Social Proof Events**: Testimonial and partner engagement
- **Scroll & Engagement**: Content performance measurement

### Phase 3: OPTIMIZATION (Week 3-4)
- **Google Tag Manager**: Centralized tag management
- **Advanced Attribution**: Multi-touch conversion paths
- **A/B Test Integration**: Experiment performance tracking
- **Automated Reporting**: Stakeholder dashboards

## Privacy & Compliance

### GDPR/CCPA Compliance
```javascript
// Consent management
gtag('consent', 'default', {
  'analytics_storage': 'denied',
  'ad_storage': 'denied'
});

// Update consent based on user choice
gtag('consent', 'update', {
  'analytics_storage': 'granted'
});
```

### Data Retention
- **Analytics Data**: 26 months (GA4 default)
- **Conversion Data**: 2 years for LTV analysis
- **PII Data**: Follow company data retention policy
- **Cookie Consent**: Required for EU visitors

## ROI Measurement

### Analytics Investment
- **Setup Cost**: ~20 hours development + GA4 setup
- **Monthly Maintenance**: ~5 hours reporting + optimization  
- **Tool Costs**: GA4 (free), GTM (free), possible premium features

### Expected Return
- **Conversion Rate Optimization**: 15-30% improvement with data
- **Customer Acquisition Cost**: 20-40% reduction through attribution
- **Lead Quality Scoring**: 10-25% improvement in sales efficiency  
- **Campaign ROI**: 200-500% improvement through proper attribution

### Success Measurement Timeline
- **Week 1**: Basic conversion tracking active
- **Month 1**: Baseline metrics established  
- **Month 2**: First optimization recommendations
- **Month 3**: Measurable conversion rate improvements
- **Month 6**: Full attribution and LTV analysis