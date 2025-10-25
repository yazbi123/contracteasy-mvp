// src/services/analyticsService.js

export class AnalyticsService {
  constructor() {
    this.events = [];
    this.isInitialized = false;
    this.googleAnalyticsId = import.meta.env.VITE_GA_ID;
  }

  // Initialiser Google Analytics
  initialize() {
    if (this.googleAnalyticsId && typeof window !== 'undefined') {
      // Charger Google Analytics
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.googleAnalyticsId}`;
      document.head.appendChild(script);

      // Initialiser gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', this.googleAnalyticsId);

      this.isInitialized = true;
      console.log('Google Analytics initialisé');
    }
  }

  // Tracker un événement
  trackEvent(eventName, parameters = {}) {
    // Ajouter à la liste locale
    this.events.push({
      name: eventName,
      parameters,
      timestamp: new Date().toISOString()
    });

    // Envoyer à Google Analytics si disponible
    if (this.isInitialized && window.gtag) {
      window.gtag('event', eventName, parameters);
    }

    // Log pour debug
    console.log('Event tracked:', eventName, parameters);
  }

  // Événements spécifiques à ContractEasy
  trackUserRegistration(userId, method = 'email') {
    this.trackEvent('user_registration', {
      user_id: userId,
      registration_method: method,
      event_category: 'user',
      event_label: 'registration'
    });
  }

  trackUserLogin(userId, method = 'email') {
    this.trackEvent('user_login', {
      user_id: userId,
      login_method: method,
      event_category: 'user',
      event_label: 'login'
    });
  }

  trackContractCreated(userId, contractType, clientType) {
    this.trackEvent('contract_created', {
      user_id: userId,
      contract_type: contractType,
      client_type: clientType,
      event_category: 'contract',
      event_label: 'creation'
    });
  }

  trackContractSigned(userId, contractId, timeToSign) {
    this.trackEvent('contract_signed', {
      user_id: userId,
      contract_id: contractId,
      time_to_sign: timeToSign,
      event_category: 'contract',
      event_label: 'signature'
    });
  }

  trackAIGeneration(userId, clauseType, success) {
    this.trackEvent('ai_generation', {
      user_id: userId,
      clause_type: clauseType,
      success: success,
      event_category: 'ai',
      event_label: 'generation'
    });
  }

  trackPDFExport(userId, exportType, contractCount) {
    this.trackEvent('pdf_export', {
      user_id: userId,
      export_type: exportType,
      contract_count: contractCount,
      event_category: 'export',
      event_label: 'pdf'
    });
  }

  trackPageView(pageName, userId = null) {
    this.trackEvent('page_view', {
      page_name: pageName,
      user_id: userId,
      event_category: 'navigation',
      event_label: 'page_view'
    });
  }

  trackFeatureUsage(featureName, userId, context = {}) {
    this.trackEvent('feature_usage', {
      feature_name: featureName,
      user_id: userId,
      context: JSON.stringify(context),
      event_category: 'feature',
      event_label: 'usage'
    });
  }

  trackError(errorType, errorMessage, userId = null) {
    this.trackEvent('error_occurred', {
      error_type: errorType,
      error_message: errorMessage,
      user_id: userId,
      event_category: 'error',
      event_label: 'occurrence'
    });
  }

  trackPerformance(metricName, value, userId = null) {
    this.trackEvent('performance_metric', {
      metric_name: metricName,
      metric_value: value,
      user_id: userId,
      event_category: 'performance',
      event_label: 'metric'
    });
  }

  // Métriques business
  trackBusinessMetric(metricName, value, userId = null) {
    this.trackEvent('business_metric', {
      metric_name: metricName,
      metric_value: value,
      user_id: userId,
      event_category: 'business',
      event_label: 'metric'
    });
  }

  // Conversion funnel
  trackFunnelStep(step, userId, additionalData = {}) {
    this.trackEvent('funnel_step', {
      step: step,
      user_id: userId,
      ...additionalData,
      event_category: 'funnel',
      event_label: 'step'
    });
  }

  // Engagement
  trackEngagement(action, duration, userId) {
    this.trackEvent('user_engagement', {
      action: action,
      duration: duration,
      user_id: userId,
      event_category: 'engagement',
      event_label: 'action'
    });
  }

  // Obtenir les événements locaux
  getEvents() {
    return this.events;
  }

  // Exporter les événements
  exportEvents() {
    const eventsData = {
      events: this.events,
      exportDate: new Date().toISOString(),
      totalEvents: this.events.length
    };

    const blob = new Blob([JSON.stringify(eventsData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contracteasy-analytics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Nettoyer les anciens événements
  cleanOldEvents(daysToKeep = 30) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);
    
    this.events = this.events.filter(event => 
      new Date(event.timestamp) > cutoffDate
    );
  }

  // Obtenir des statistiques
  getStats() {
    const totalEvents = this.events.length;
    const eventsByCategory = this.events.reduce((acc, event) => {
      const category = event.parameters.event_category || 'unknown';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    const uniqueUsers = new Set(
      this.events
        .map(event => event.parameters.user_id)
        .filter(Boolean)
    ).size;

    return {
      totalEvents,
      eventsByCategory,
      uniqueUsers,
      dateRange: {
        start: this.events[0]?.timestamp,
        end: this.events[this.events.length - 1]?.timestamp
      }
    };
  }
}

// Instance singleton
export const analyticsService = new AnalyticsService();

// Initialiser automatiquement
if (typeof window !== 'undefined') {
  analyticsService.initialize();
}
