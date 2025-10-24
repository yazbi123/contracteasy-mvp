import React, { useState } from 'react';

const SignatureManagement = () => {
  const [signers, setSigners] = useState([
    { id: 1, email: 'client@exemple.com', name: 'Jean Dupont', status: 'pending' },
    { id: 2, email: 'manager@exemple.com', name: 'Marie Martin', status: 'signed' }
  ]);
  const [newSigner, setNewSigner] = useState({ email: '', name: '' });
  const [showAddSigner, setShowAddSigner] = useState(false);

  const handleAddSigner = (e) => {
    e.preventDefault();
    if (newSigner.email && newSigner.name) {
      setSigners([...signers, { 
        id: Date.now(), 
        ...newSigner, 
        status: 'pending' 
      }]);
      setNewSigner({ email: '', name: '' });
      setShowAddSigner(false);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      signed: 'bg-green-100 text-green-800',
      declined: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      pending: 'En attente',
      signed: 'Signé',
      declined: 'Refusé'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Gestion des signatures</h1>
            <div className="flex space-x-3">
              <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                Annuler
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Télécharger PDF
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Contract Upload */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contrat à signer</h2>
            
            {/* Upload Zone */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition duration-200">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-gray-600 mb-2">Glissez votre contrat ici</p>
              <p className="text-sm text-gray-500 mb-4">ou</p>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Parcourir les fichiers
              </button>
              <p className="text-xs text-gray-500 mt-2">PDF, DOC, DOCX (max 10MB)</p>
            </div>

            {/* Contract Preview */}
            <div className="mt-4 bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">contrat-prestation.pdf</p>
                    <p className="text-sm text-gray-600">2.4 MB • Ajouté il y a 2 heures</p>
                  </div>
                </div>
                <button className="text-blue-500 hover:text-blue-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Signers Management */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Signataires</h2>
              <button 
                onClick={() => setShowAddSigner(true)}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
              >
                + Ajouter
              </button>
            </div>

            {/* Add Signer Form */}
            {showAddSigner && (
              <form onSubmit={handleAddSigner} className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={newSigner.email}
                    onChange={(e) => setNewSigner({...newSigner, email: e.target.value})}
                    className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Nom"
                    value={newSigner.name}
                    onChange={(e) => setNewSigner({...newSigner, name: e.target.value})}
                    className="p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2 mt-3">
                  <button 
                    type="button"
                    onClick={() => setShowAddSigner(false)}
                    className="px-3 py-1 text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit"
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                  >
                    Ajouter
                  </button>
                </div>
              </form>
            )}

            {/* Signers List */}
            <div className="space-y-3">
              {signers.map((signer) => (
                <div key={signer.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{signer.name}</p>
                      <p className="text-sm text-gray-600">{signer.email}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(signer.status)}
                      <button className="text-blue-500 hover:text-blue-700 text-sm">
                        Modifier
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Signature Order */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Ordre de signature</h3>
              <div className="space-y-2">
                {signers.map((signer, index) => (
                  <div key={signer.id} className="flex items-center space-x-3 text-sm">
                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">
                      {index + 1}
                    </span>
                    <span className="text-gray-600">{signer.name}</span>
                    {signer.status === 'signed' && (
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Signature Status */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Statut des signatures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {signers.map((signer) => (
              <div key={signer.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{signer.name}</p>
                    <p className="text-sm text-gray-600">{signer.email}</p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(signer.status)}
                    <p className="text-xs text-gray-500 mt-1">
                      {signer.status === 'signed' ? 'Signé le 15/01/2024' : 'En attente'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-blue-900">Prêt à envoyer</h3>
              <p className="text-sm text-blue-700 mt-1">
                Tous les signataires ont été ajoutés. Cliquez sur "Envoyer" pour lancer le processus de signature.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignatureManagement;
