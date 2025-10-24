import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Homepage from './components/Homepage';
import { LoginForm, SignupForm } from './components/AuthComponents';
import Dashboard from './components/Dashboard';
import ContractEditor from './components/ContractEditor';
import AIContractEditor from './components/AIContractEditor';
import SignatureManagement from './components/SignatureManagement';
import { MobileDashboard, MobileContractEditor } from './components/MobileComponents';

// Composant de navigation
const Navigation = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Démo ContractEasy</h3>
        <div className="space-y-1">
          <Link
            to="/"
            className={`block w-full text-left px-2 py-1 text-xs rounded ${
              isActive('/') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            🏠 Page d'accueil
          </Link>
          <Link
            to="/login"
            className={`block w-full text-left px-2 py-1 text-xs rounded ${
              isActive('/login') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            🔐 Connexion
          </Link>
          <Link
            to="/signup"
            className={`block w-full text-left px-2 py-1 text-xs rounded ${
              isActive('/signup') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📝 Inscription
          </Link>
          <Link
            to="/dashboard"
            className={`block w-full text-left px-2 py-1 text-xs rounded ${
              isActive('/dashboard') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📊 Tableau de bord
          </Link>
          <Link
            to="/editor"
            className={`block w-full text-left px-2 py-1 text-xs rounded ${
              isActive('/editor') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            ✏️ Éditeur
          </Link>
          <Link
            to="/ai-editor"
            className={`block w-full text-left px-2 py-1 text-xs rounded ${
              isActive('/ai-editor') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            🤖 Éditeur IA
          </Link>
          <Link
            to="/signatures"
            className={`block w-full text-left px-2 py-1 text-xs rounded ${
              isActive('/signatures') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            ✍️ Signatures
          </Link>
        </div>
        <div className="mt-2 pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            {isMobile ? '📱 Mobile' : '🖥️ Desktop'}
          </p>
        </div>
      </div>
    </div>
  );
};

// Composant principal avec routing
const AppContent = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={isMobile ? <MobileDashboard /> : <Dashboard />} />
        <Route path="/editor" element={isMobile ? <MobileContractEditor /> : <ContractEditor />} />
        <Route path="/ai-editor" element={<AIContractEditor />} />
        <Route path="/signatures" element={<SignatureManagement />} />
      </Routes>

      {/* Footer de démonstration */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
          <div className="text-xs text-gray-600">
            <p className="font-semibold">ContractEasy MVP</p>
            <p>React Router + Tailwind</p>
            <p className="text-gray-500">Prêt pour production</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
