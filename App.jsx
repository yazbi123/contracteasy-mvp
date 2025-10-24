import React, { useState } from 'react';
import Homepage from './Homepage';
import { LoginForm, SignupForm } from './AuthComponents';
import Dashboard from './Dashboard';
import ContractEditor from './ContractEditor';
import SignatureManagement from './SignatureManagement';
import { MobileDashboard, MobileContractEditor } from './MobileComponents';

const App = () => {
  const [currentPage, setCurrentPage] = useState('homepage');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Détection de la taille d'écran
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'homepage':
        return <Homepage />;
      case 'login':
        return <LoginForm />;
      case 'signup':
        return <SignupForm />;
      case 'dashboard':
        return isMobile ? <MobileDashboard /> : <Dashboard />;
      case 'contract-editor':
        return isMobile ? <MobileContractEditor /> : <ContractEditor />;
      case 'signature-management':
        return <SignatureManagement />;
      default:
        return <Homepage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation de démonstration */}
      <div className="fixed top-4 left-4 z-50">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Démo ContractEasy</h3>
          <div className="space-y-1">
            <button
              onClick={() => setCurrentPage('homepage')}
              className={`block w-full text-left px-2 py-1 text-xs rounded ${
                currentPage === 'homepage' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🏠 Page d'accueil
            </button>
            <button
              onClick={() => setCurrentPage('login')}
              className={`block w-full text-left px-2 py-1 text-xs rounded ${
                currentPage === 'login' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              🔐 Connexion
            </button>
            <button
              onClick={() => setCurrentPage('signup')}
              className={`block w-full text-left px-2 py-1 text-xs rounded ${
                currentPage === 'signup' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              📝 Inscription
            </button>
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`block w-full text-left px-2 py-1 text-xs rounded ${
                currentPage === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              📊 Tableau de bord
            </button>
            <button
              onClick={() => setCurrentPage('contract-editor')}
              className={`block w-full text-left px-2 py-1 text-xs rounded ${
                currentPage === 'contract-editor' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              ✏️ Éditeur
            </button>
            <button
              onClick={() => setCurrentPage('signature-management')}
              className={`block w-full text-left px-2 py-1 text-xs rounded ${
                currentPage === 'signature-management' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              ✍️ Signatures
            </button>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              {isMobile ? '📱 Mobile' : '🖥️ Desktop'}
            </p>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      {renderPage()}

      {/* Footer de démonstration */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
          <div className="text-xs text-gray-600">
            <p className="font-semibold">ContractEasy MVP</p>
            <p>Composants React/Tailwind</p>
            <p className="text-gray-500">Prêt pour développement</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
