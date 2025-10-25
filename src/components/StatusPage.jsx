import React, { useState, useEffect } from 'react';

const StatusPage = () => {
  const [status, setStatus] = useState({
    overall: 'operational',
    services: {
      api: 'operational',
      database: 'operational',
      authentication: 'operational',
      email: 'operational',
      storage: 'operational',
      payments: 'operational'
    },
    incidents: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate status check
    const checkStatus = async () => {
      try {
        // In a real implementation, this would call your status API
        const response = await fetch('/api/status');
        const data = await response.json();
        setStatus(data);
      } catch (error) {
        console.error('Error checking status:', error);
        // Set fallback status
        setStatus(prev => ({
          ...prev,
          overall: 'degraded'
        }));
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'text-green-500 bg-green-100';
      case 'degraded': return 'text-yellow-500 bg-yellow-100';
      case 'outage': return 'text-red-500 bg-red-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'operational': return 'Opérationnel';
      case 'degraded': return 'Dégradé';
      case 'outage': return 'Indisponible';
      default: return 'Inconnu';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification du statut...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Statut des Services ContractEasy
          </h1>
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(status.overall)}`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${
              status.overall === 'operational' ? 'bg-green-500' : 
              status.overall === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></div>
            {getStatusText(status.overall)}
          </div>
        </div>

        {/* Services Status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Services</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {Object.entries(status.services).map(([service, serviceStatus]) => (
              <div key={service} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 capitalize">
                    {service === 'api' ? 'API' : 
                     service === 'database' ? 'Base de données' :
                     service === 'authentication' ? 'Authentification' :
                     service === 'email' ? 'Service email' :
                     service === 'storage' ? 'Stockage' :
                     service === 'payments' ? 'Paiements' : service}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {serviceStatus === 'operational' ? 'Tous les systèmes fonctionnent normalement' :
                     serviceStatus === 'degraded' ? 'Performance réduite détectée' :
                     serviceStatus === 'outage' ? 'Service temporairement indisponible' : ''}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(serviceStatus)}`}>
                  {getStatusText(serviceStatus)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Incidents */}
        {status.incidents.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Incidents récents</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {status.incidents.map((incident, index) => (
                <div key={index} className="px-6 py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{incident.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{incident.description}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(incident.timestamp).toLocaleString('fr-FR')}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ml-4 ${
                      incident.status === 'resolved' ? 'text-green-500 bg-green-100' :
                      incident.status === 'investigating' ? 'text-yellow-500 bg-yellow-100' :
                      'text-red-500 bg-red-100'
                    }`}>
                      {incident.status === 'resolved' ? 'Résolu' :
                       incident.status === 'investigating' ? 'En cours' : 'En cours'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Performance Metrics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Métriques de performance</h2>
          </div>
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">99.9%</div>
                <div className="text-sm text-gray-600">Uptime (30 derniers jours)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">&lt;200ms</div>
                <div className="text-sm text-gray-600">Temps de réponse moyen</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">24/7</div>
                <div className="text-sm text-gray-600">Monitoring</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Besoin d'aide ?</h3>
          <p className="text-gray-600 mb-4">
            Si vous rencontrez des problèmes, n'hésitez pas à nous contacter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="mailto:support@contracteasy.com" 
              className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              📧 support@contracteasy.com
            </a>
            <a 
              href="/dashboard" 
              className="inline-flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
            >
              🏠 Retour au tableau de bord
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Dernière mise à jour : {new Date().toLocaleString('fr-FR')}</p>
          <p className="mt-2">
            <a href="/" className="text-blue-500 hover:text-blue-700">← Retour à l'accueil</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusPage;
