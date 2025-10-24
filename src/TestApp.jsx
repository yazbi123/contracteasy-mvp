import React from 'react';

const TestApp = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          🎉 ContractEasy fonctionne !
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          L'application est maintenant opérationnelle
        </p>
        <div className="space-y-4">
          <div className="p-4 bg-green-100 rounded-lg">
            <h2 className="font-semibold text-green-800">✅ React</h2>
            <p className="text-green-600">Composants chargés</p>
          </div>
          <div className="p-4 bg-blue-100 rounded-lg">
            <h2 className="font-semibold text-blue-800">✅ Tailwind CSS</h2>
            <p className="text-blue-600">Styles appliqués</p>
          </div>
          <div className="p-4 bg-purple-100 rounded-lg">
            <h2 className="font-semibold text-purple-800">✅ Vite</h2>
            <p className="text-purple-600">Serveur de développement</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-sm text-gray-500">
            URL: http://localhost:5173
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestApp;
