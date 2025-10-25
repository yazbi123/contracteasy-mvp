import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getContracts, saveContract } from '../services/firestoreService';
import { notificationService } from '../services/notificationService';
import { analyticsService } from '../services/analyticsService';

const Dashboard = () => {
  const [filter, setFilter] = useState('all');
  const [showNewContract, setShowNewContract] = useState(false);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newContract, setNewContract] = useState({ name: '', client: '', content: '' });
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();

  // Charger les contrats et notifications depuis Firestore
  useEffect(() => {
    const loadData = async () => {
      if (user) {
        setLoading(true);
        
        // Charger les contrats
        const contractsResult = await getContracts(user.uid);
        if (contractsResult.success) {
          setContracts(contractsResult.contracts);
          
          // Vérifier les contrats qui expirent bientôt
          await notificationService.checkExpiringContracts(contractsResult.contracts, user.uid);
          await notificationService.checkPendingSignatures(contractsResult.contracts, user.uid);
        }
        
        // Charger les notifications
        const notificationsResult = await notificationService.getUserNotifications(user.uid);
        if (notificationsResult.success) {
          setNotifications(notificationsResult.notifications);
          setUnreadCount(notificationService.getUnreadCount());
        }
        
        // Tracker la visite du dashboard
        analyticsService.trackPageView('dashboard', user.uid);
        
        setLoading(false);
      }
    };
    
    loadData();
  }, [user]);

  const handleSaveContract = async () => {
    if (user && newContract.name && newContract.client) {
      const contractData = {
        name: newContract.name,
        client: newContract.client,
        content: newContract.content,
        status: 'pending',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };
      
      const result = await saveContract(contractData, user.uid);
      if (result.success) {
        setContracts([{ id: result.id, ...contractData }, ...contracts]);
        setNewContract({ name: '', client: '', content: '' });
        setShowNewContract(false);
        
        // Notifier la création du contrat
        await notificationService.notifyContractCreated(user.uid, contractData.name);
        
        // Tracker l'événement
        analyticsService.trackContractCreated(user.uid, contractData.name, 'new');
      }
    }
  };

  // Notifications sont maintenant chargées depuis Firebase via notificationService

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      signed: 'bg-green-100 text-green-800',
      expired: 'bg-red-100 text-red-800',
      renewal: 'bg-blue-100 text-blue-800'
    };
    
    const labels = {
      pending: 'En attente',
      signed: 'Signé',
      expired: 'Expiré',
      renewal: 'À renouveler'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const filteredContracts = filter === 'all' 
    ? contracts 
    : contracts.filter(contract => contract.status === filter);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-blue-500">ContractEasy</h1>
          <p className="text-sm text-gray-600">demo@contracteasy.com</p>
        </div>
        
        <nav className="p-4">
          <a href="#" className="flex items-center space-x-3 p-3 bg-blue-50 text-blue-600 rounded-lg mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            <span className="font-medium">Dashboard</span>
          </a>
          
          <a href="#" className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Contrats</span>
          </a>
          
          <a href="#" className="flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Paramètres</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
            <p className="text-gray-600">Vue d'ensemble de vos contrats</p>
          </div>
          <button 
            onClick={() => setShowNewContract(true)}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            <span>Nouveau contrat</span>
          </button>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 flex items-start space-x-3 ${
                  notification.type === 'urgent' ? 'bg-red-50 border-l-4 border-red-400' : 
                  notification.type === 'warning' ? 'bg-yellow-50 border-l-4 border-yellow-400' : ''
                }`}
              >
                <svg className="w-5 h-5 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contracts List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Mes contrats</h2>
                <select 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="signed">Signés</option>
                  <option value="expired">Expirés</option>
                  <option value="renewal">À renouveler</option>
                </select>
              </div>
              
              <div className="divide-y divide-gray-200">
                {filteredContracts.map((contract) => (
                  <div key={contract.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{contract.name}</h3>
                        <p className="text-sm text-gray-600">Client: {contract.client}</p>
                        <p className="text-sm text-gray-600">Échéance: {contract.dueDate}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        {getStatusBadge(contract.status)}
                        <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                          Voir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.slice(0, 5).map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border-l-4 ${
                        notification.priority === 'high' 
                          ? 'bg-red-50 border-red-400' 
                          : notification.priority === 'medium'
                          ? 'bg-yellow-50 border-yellow-400'
                          : 'bg-blue-50 border-blue-400'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        <div className="flex-shrink-0">
                          {notification.priority === 'high' && <span className="text-red-500">🚨</span>}
                          {notification.priority === 'medium' && <span className="text-yellow-500">⚠️</span>}
                          {notification.priority === 'normal' && <span className="text-blue-500">ℹ️</span>}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                          <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(notification.createdAt).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500 text-sm">Aucune notification</p>
                  </div>
                )}
              </div>
              
              {notifications.length > 5 && (
                <button className="w-full mt-3 text-sm text-blue-600 hover:text-blue-800">
                  Voir toutes les notifications
                </button>
              )}
            </div>
          </div>

          {/* Chart */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition des contrats</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Graphique pie chart</p>
                  <p className="text-sm text-gray-500">En attente: 1, Signés: 1, Expirés: 1, À renouveler: 1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Contract Modal */}
      {showNewContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Nouveau contrat</h3>
            <p className="text-gray-600 mb-4">Fonctionnalité à implémenter...</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowNewContract(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Annuler
              </button>
              <button 
                onClick={() => {
                  setShowNewContract(false);
                  alert('Nouveau contrat créé !');
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
