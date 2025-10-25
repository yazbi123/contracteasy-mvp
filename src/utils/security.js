// Security utilities for production
export const SECURITY_CONFIG = {
  // Rate limiting
  RATE_LIMIT: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Trop de requêtes, veuillez réessayer plus tard.'
  },
  
  // CORS configuration
  CORS_OPTIONS: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://contracteasy-mvp.vercel.app', 'https://www.contracteasy-mvp.vercel.app']
      : ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200
  },
  
  // Content Security Policy
  CSP: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://www.googletagmanager.com", "https://www.google-analytics.com"],
    'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    'font-src': ["'self'", "https://fonts.gstatic.com"],
    'img-src': ["'self'", "data:", "https:"],
    'connect-src': ["'self'", "https://www.google-analytics.com", "https://analytics.google.com", "https://vitals.vercel-insights.com"],
    'frame-src': ["'none'"]
  }
};

// Environment validation
export const validateEnvironment = () => {
  const requiredEnvVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID',
    'VITE_FIREBASE_MEASUREMENT_ID'
  ];
  
  const missing = requiredEnvVars.filter(envVar => !import.meta.env[envVar]);
  
  if (missing.length > 0) {
    console.error('❌ Variables d\'environnement manquantes:', missing);
    return false;
  }
  
  console.log('✅ Toutes les variables d\'environnement sont configurées');
  return true;
};

// Logging utility
export const logSecurityEvent = (event, details) => {
  const timestamp = new Date().toISOString();
  console.log(`[SECURITY] ${timestamp} - ${event}:`, details);
  
  // In production, send to monitoring service
  if (process.env.NODE_ENV === 'production') {
    // Send to Sentry or other monitoring service
    // Example: Sentry.captureMessage(`Security Event: ${event}`, 'info');
  }
};
