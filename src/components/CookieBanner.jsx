import React, { useState, useEffect } from 'react';

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowBanner(true);
    } else {
      const savedPreferences = JSON.parse(cookieConsent);
      setPreferences(savedPreferences);
    }
  }, []);

  const handleAcceptAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    setPreferences(newPreferences);
    savePreferences(newPreferences);
    setShowBanner(false);
    initializeAnalytics();
  };

  const handleRejectAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: false,
      marketing: false
    };
    setPreferences(newPreferences);
    savePreferences(newPreferences);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
    setShowBanner(false);
    if (preferences.analytics) {
      initializeAnalytics();
    }
  };

  const savePreferences = (prefs) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
  };

  const initializeAnalytics = () => {
    // Initialize Google Analytics if consent given
    if (preferences.analytics && import.meta.env.VITE_GA_ID) {
      // Google Analytics initialization code
      console.log('Analytics initialized with consent');
    }
  };

  const togglePreference = (key) => {
    if (key === 'necessary') return; // Can't disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              🍪 Gestion des cookies
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu. 
              Vous pouvez choisir quels cookies accepter.
            </p>
            
            {/* Cookie preferences */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-900">Cookies nécessaires</span>
                  <p className="text-xs text-gray-500">Obligatoires pour le fonctionnement du site</p>
                </div>
                <div className="w-12 h-6 bg-blue-500 rounded-full flex items-center justify-end px-1">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-900">Cookies analytiques</span>
                  <p className="text-xs text-gray-500">Google Analytics pour comprendre l'usage</p>
                </div>
                <button
                  onClick={() => togglePreference('analytics')}
                  className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                    preferences.analytics ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    preferences.analytics ? 'translate-x-6' : 'translate-x-0'
                  }`}></div>
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-900">Cookies marketing</span>
                  <p className="text-xs text-gray-500">Publicité personnalisée et réseaux sociaux</p>
                </div>
                <button
                  onClick={() => togglePreference('marketing')}
                  className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                    preferences.marketing ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    preferences.marketing ? 'translate-x-6' : 'translate-x-0'
                  }`}></div>
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleRejectAll}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Refuser tout
            </button>
            <button
              onClick={handleSavePreferences}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Personnaliser
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Accepter tout
            </button>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            En savoir plus sur notre utilisation des cookies dans notre{' '}
            <a href="/privacy" className="text-blue-500 hover:text-blue-700 underline">
              Politique de Confidentialité
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
