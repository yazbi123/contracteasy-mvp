import React, { useState } from 'react';

const ContractEditor = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({
    clientName: '',
    amount: '',
    duration: '',
    description: ''
  });
  const [showAISuggestion, setShowAISuggestion] = useState(false);

  const templates = [
    { id: 1, name: 'NDA', description: 'Accord de confidentialité', icon: '🔒' },
    { id: 2, name: 'Prestation', description: 'Contrat de prestation de service', icon: '📋' },
    { id: 3, name: 'Partenariat', description: 'Accord de partenariat', icon: '🤝' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setShowAISuggestion(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Éditeur de contrats</h1>
            <div className="flex space-x-3">
              <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                Annuler
              </button>
              <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                Prévisualiser
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Templates Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Templates</h2>
              <div className="space-y-3">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className={`p-4 border rounded-lg cursor-pointer transition duration-200 ${
                      selectedTemplate?.id === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{template.icon}</span>
                      <div>
                        <h3 className="font-medium text-gray-900">{template.name}</h3>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Détails du contrat</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du client
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Entrez le nom du client"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Montant
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Montant en €"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Durée
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionnez une durée</option>
                    <option value="1-month">1 mois</option>
                    <option value="3-months">3 mois</option>
                    <option value="6-months">6 mois</option>
                    <option value="1-year">1 an</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Description du contrat..."
                  />
                </div>

                {/* AI Suggestion */}
                {showAISuggestion && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">🤖</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-blue-900">Suggestion IA</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Ajouter une clause de paiement ? Je peux générer automatiquement les termes de paiement.
                        </p>
                        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-2">
                          Appliquer la suggestion
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Prévisualisation</h2>
              <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto">
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedTemplate ? `${selectedTemplate.name} - ` : ''}Contrat
                    </h3>
                    <p className="text-sm text-gray-600">Date: {new Date().toLocaleDateString('fr-FR')}</p>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium">Client:</span> {formData.clientName || 'Nom du client'}
                    </div>
                    <div>
                      <span className="font-medium">Montant:</span> {formData.amount ? `${formData.amount}€` : 'Montant'}
                    </div>
                    <div>
                      <span className="font-medium">Durée:</span> {formData.duration || 'Durée'}
                    </div>
                    <div>
                      <span className="font-medium">Description:</span>
                      <p className="mt-1 text-gray-600">{formData.description || 'Description du contrat...'}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between">
                      <div className="text-center">
                        <div className="w-24 h-16 border border-gray-300 rounded mb-2"></div>
                        <p className="text-xs text-gray-600">Signature client</p>
                      </div>
                      <div className="text-center">
                        <div className="w-24 h-16 border border-gray-300 rounded mb-2"></div>
                        <p className="text-xs text-gray-600">Votre signature</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractEditor;
