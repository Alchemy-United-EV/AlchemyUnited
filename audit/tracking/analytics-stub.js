/**
 * Analytics Stub - Lightweight GA4 replacement for testing
 * Logs the same event payloads that would be sent to Google Analytics
 */

class AnalyticsStub {
  constructor() {
    this.events = [];
    this.isDebug = process.env.NODE_ENV === 'development';
  }

  // Mock gtag function
  gtag(command, ...args) {
    const timestamp = new Date().toISOString();
    const event = {
      timestamp,
      command,
      args: args
    };

    // Log event
    if (command === 'event') {
      const [eventName, parameters] = args;
      const logEntry = {
        timestamp,
        event_name: eventName,
        parameters: parameters || {},
        page_location: window.location.href,
        page_title: document.title,
        user_agent: navigator.userAgent
      };

      this.events.push(logEntry);
      
      if (this.isDebug) {
        console.log('[Analytics Stub]', eventName, parameters);
      }

      // Send to server for logging
      this.sendToServer(logEntry);
    }

    if (command === 'config') {
      const [measurementId, config] = args;
      const logEntry = {
        timestamp,
        config_id: measurementId,
        config: config || {},
        page_location: window.location.href,
        page_title: document.title
      };

      this.events.push(logEntry);
      
      if (this.isDebug) {
        console.log('[Analytics Stub Config]', measurementId, config);
      }

      this.sendToServer(logEntry);
    }
  }

  // Send events to server for logging
  async sendToServer(eventData) {
    try {
      await fetch('/api/analytics/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      });
    } catch (error) {
      console.warn('[Analytics Stub] Failed to log to server:', error);
    }
  }

  // Get all collected events
  getEvents() {
    return this.events;
  }

  // Clear events
  clearEvents() {
    this.events = [];
  }

  // Export events for testing
  exportEvents() {
    return JSON.stringify(this.events, null, 2);
  }
}

// Initialize global analytics stub
window.analyticsStub = new AnalyticsStub();
window.gtag = window.analyticsStub.gtag.bind(window.analyticsStub);

// Helper functions for common events
window.trackCTAClick = function(buttonId, buttonText, section = '', variant = 'primary') {
  gtag('event', 'cta_click', {
    'button_id': buttonId,
    'button_text': buttonText,
    'page_location': window.location.href,
    'page_title': document.title,
    'section': section,
    'variant': variant
  });
};

window.trackFormStart = function(formId, formType = 'lead_generation') {
  gtag('event', 'form_start', {
    'form_id': formId,
    'form_type': formType,
    'page_location': window.location.href
  });
};

window.trackFormSubmit = function(formId, formType = 'lead_generation') {
  gtag('event', 'form_submit', {
    'form_id': formId,
    'form_type': formType,
    'page_location': window.location.href
  });
};

window.trackFormSuccess = function(formId, applicationId, formType = 'lead_generation', value = 300) {
  gtag('event', 'form_success', {
    'form_id': formId,
    'form_type': formType,
    'application_id': applicationId,
    'value': value,
    'currency': 'USD'
  });
};

window.trackFormError = function(formId, errorType, errorMessage) {
  gtag('event', 'form_error', {
    'form_id': formId,
    'error_type': errorType,
    'error_message': errorMessage,
    'page_location': window.location.href
  });
};

// Auto-track page views
gtag('config', 'STUB-MEASUREMENT-ID', {
  'page_title': document.title,
  'page_location': window.location.href,
  'content_group1': 'Marketing',
  'content_group2': 'Landing Page'
});

console.log('[Analytics Stub] Initialized and ready to track events');