import React from 'react';

const MinimalApp = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-2xl">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          🎉 ContractEasy MVP
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Application de gestion de contrats pour PME
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">📊 Tableau de bord</h3>
            <p className="text-blue-600 text-sm">Gérez vos contrats</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">✏️ Éditeur</h3>
            <p className="text-green-600 text-sm">Créez des contrats</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">🤖 IA</h3>
            <p className="text-purple-600 text-sm">Suggestions intelligentes</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <h3 className="font-semibold text-orange-800 mb-2">✍️ Signatures</h3>
            <p className="text-orange-600 text-sm">Signatures électroniques</p>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition">
            Commencer maintenant
          </button>
          <button className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition">
            En savoir plus
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>✅ React + Tailwind CSS fonctionnent</p>
          <p>✅ Vite serveur de développement</p>
          <p>✅ API Mock disponible sur http://localhost:3001</p>
        </div>
      </div>
    </div>
  );
};

export default MinimalApp;
