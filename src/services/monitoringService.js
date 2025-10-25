// Monitoring and Analytics Service
class MonitoringService {
  constructor() {
    this.isInitialized = false;
    this.gaId = import.meta.env.VITE_GA_ID;
    this.sentryDsn = import.meta.env.VITE_SENTRY_DSN;
  }

  // Initialize monitoring services
  async initialize() {
    if (this.isInitialized) return;

    try {
      // Initialize Google Analytics
      if (this.gaId) {
        await this.initializeGoogleAnalytics();
      }

      // Initialize Sentry for error tracking
      if (this.sentryDsn) {
        await this.initializeSentry();
      }

      this.isInitialized = true;
      console.log('✅ Monitoring services initialized');
    } catch (error) {
      console.error('❌ Error initializing monitoring services:', error);
    }
  }

  // Google Analytics initialization
  async initializeGoogleAnalytics() {
    if (typeof window === 'undefined') return;

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', this.gaId, {
      page_title: document.title,
      page_location: window.location.href,
      anonymize_ip: true, // GDPR compliance
      cookie_flags: 'SameSite=Strict;Secure'
    });
  }

  // Sentry initialization
  async initializeSentry() {
    if (typeof window === 'undefined') return;

    try {
      const { init } = await import('@sentry/react');
      const { BrowserTracing } = await import('@sentry/tracing');

      init({
        dsn: this.sentryDsn,
        environment: import.meta.env.MODE,
        integrations: [
          new BrowserTracing({
            routingInstrumentation: undefined, // Will be set up with React Router
          }),
        ],
        tracesSampleRate: import.meta.env.MODE === 'production' ? 0.1 : 1.0,
        beforeSend(event) {
          // Filter out sensitive data
          if (event.user) {
            delete event.user.email;
          }
          return event;
        }
      });
    } catch (error) {
      console.error('Failed to initialize Sentry:', error);
    }
  }

  // Track page views
  trackPageView(path, title) {
    if (window.gtag) {
      window.gtag('config', this.gaId, {
        page_path: path,
        page_title: title
      });
    }
  }

  // Track custom events
  trackEvent(eventName, parameters = {}) {
    if (window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  }

  // Track user actions
  trackUserAction(action, details = {}) {
    this.trackEvent('user_action', {
      action,
      ...details,
      timestamp: new Date().toISOString()
    });
  }

  // Track business metrics
  trackBusinessMetric(metric, value, context = {}) {
    this.trackEvent('business_metric', {
      metric_name: metric,
      metric_value: value,
      ...context,
      timestamp: new Date().toISOString()
    });
  }

  // Track errors
  trackError(error, context = {}) {
    console.error('Error tracked:', error);
    
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message || error.toString(),
        fatal: false,
        ...context
      });
    }

    // Send to Sentry if available
    if (window.Sentry) {
      window.Sentry.captureException(error, { extra: context });
    }
  }

  // Track performance
  trackPerformance(metric, value, context = {}) {
    this.trackEvent('performance_metric', {
      metric_name: metric,
      metric_value: value,
      ...context,
      timestamp: new Date().toISOString()
    });
  }

  // Track conversion events
  trackConversion(eventName, value, currency = 'EUR') {
    this.trackEvent('conversion', {
      event_name: eventName,
      value,
      currency,
      timestamp: new Date().toISOString()
    });
  }

  // Track contract-related events
  trackContractEvent(eventType, contractId, details = {}) {
    this.trackEvent('contract_event', {
      event_type: eventType,
      contract_id: contractId,
      ...details,
      timestamp: new Date().toISOString()
    });
  }

  // Track AI usage
  trackAIUsage(feature, tokens, cost, details = {}) {
    this.trackEvent('ai_usage', {
      feature,
      tokens_used: tokens,
      estimated_cost: cost,
      ...details,
      timestamp: new Date().toISOString()
    });
  }

  // Track PDF exports
  trackPDFExport(contractId, pages, fileSize, details = {}) {
    this.trackEvent('pdf_export', {
      contract_id: contractId,
      pages_count: pages,
      file_size: fileSize,
      ...details,
      timestamp: new Date().toISOString()
    });
  }

  // Track signature events
  trackSignatureEvent(eventType, contractId, signerEmail, details = {}) {
    this.trackEvent('signature_event', {
      event_type: eventType,
      contract_id: contractId,
      signer_email: signerEmail,
      ...details,
      timestamp: new Date().toISOString()
    });
  }

  // Health check
  async healthCheck() {
    const checks = {
      googleAnalytics: !!window.gtag,
      sentry: !!window.Sentry,
      timestamp: new Date().toISOString()
    };

    this.trackEvent('health_check', checks);
    return checks;
  }
}

export default new MonitoringService();
