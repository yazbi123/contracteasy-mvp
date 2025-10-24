import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// Composant de navigation simplifié
const Navigation = () => {
  const location = useLocation();
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
            to="/signatures"
            className={`block w-full text-left px-2 py-1 text-xs rounded ${
              isActive('/signatures') ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            ✍️ Signatures
          </Link>
        </div>
      </div>
    </div>
  );
};

// Composants simplifiés pour tester
const Homepage = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
    <h1 className="text-5xl font-extrabold text-gray-900 mb-6 text-center">
      🎉 ContractEasy MVP
    </h1>
    <p className="text-xl text-gray-600 mb-10 text-center max-w-2xl">
      Application de gestion de contrats pour PME
    </p>
    <div className="flex space-x-4 mb-12">
      <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 text-lg">
        Commencer maintenant
      </button>
      <button className="bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-400 transition duration-300 text-lg">
        En savoir plus
      </button>
    </div>
  </div>
);

const Login = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Connexion</h2>
      <form className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 transition">
          Se connecter
        </button>
      </form>
    </div>
  </div>
);

const Dashboard = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Tableau de bord</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Contrats actifs</h3>
        <p className="text-3xl font-bold text-blue-600">12</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">En attente</h3>
        <p className="text-3xl font-bold text-yellow-600">3</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Signés</h3>
        <p className="text-3xl font-bold text-green-600">9</p>
      </div>
    </div>
  </div>
);

const Editor = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Éditeur de contrats</h1>
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Créer un nouveau contrat</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Nom du contrat"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Client"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Contenu du contrat..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
        />
        <button className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition">
          Sauvegarder
        </button>
      </div>
    </div>
  </div>
);

const Signatures = () => (
  <div className="min-h-screen bg-gray-50 p-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestion des signatures</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Ajouter un signataire</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nom du signataire"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition">
            Ajouter
          </button>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Statut des signatures</h2>
        <div className="space-y-2">
          <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
            <span className="text-sm">client@exemple.com</span>
            <span className="text-sm font-semibold text-yellow-600">En attente</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
            <span className="text-sm">partenaire@exemple.com</span>
            <span className="text-sm font-semibold text-green-600">Signé</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Composant principal avec routing
const AppContent = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/signatures" element={<Signatures />} />
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
