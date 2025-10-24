import React, { useState } from 'react';
import { aiService } from '../services/aiService';

const AIContractEditor = () => {
  const [contractData, setContractData] = useState({
    clientName: '',
    service: '',
    amount: '',
    duration: '',
    description: ''
  });
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [contractText, setContractText] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const templates = [
    { id: 1, name: 'NDA', description: 'Accord de confidentialité', icon: '🔒' },
    { id: 2, name: 'Prestation', description: 'Contrat de prestation de service', icon: '📋' },
    { id: 3, name: 'Partenariat', description: 'Accord de partenariat', icon: '🤝' }
  ];

  const handleInputChange = (e) => {
    setContractData({
      ...contractData,
      [e.target.name]: e.target.value
    });
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    // Générer le contenu de base du template
    const baseContent = generateTemplateContent(template, contractData);
    setContractText(baseContent);
  };

  const generateTemplateContent = (template, data) => {
    const templates = {
      NDA: `CONTRAT DE CONFIDENTIALITÉ

Entre ${data.clientName || '[Nom du client]'} et ContractEasy

Article 1 - Objet
Le présent contrat a pour objet de définir les conditions de confidentialité...

Article 2 - Définitions
Les informations confidentielles comprennent...`,
      
      Prestation: `CONTRAT DE PRESTATION DE SERVICE

Entre ${data.clientName || '[Nom du client]'} et ContractEasy

Article 1 - Objet
Prestation de ${data.service || '[Type de service]'} pour un montant de ${data.amount || '[Montant]'}€

Article 2 - Modalités
Durée : ${data.duration || '[Durée]'}
Description : ${data.description || '[Description]'}`,
      
      Partenariat: `ACCORD DE PARTENARIAT

Entre ${data.clientName || '[Nom du client]'} et ContractEasy

Article 1 - Objet
Le présent accord définit les conditions du partenariat...`
    };

    return templates[template.name] || '';
  };

  const generateAIClause = async (type) => {
    setIsGenerating(true);
    try {
      const clause = await aiService.generateClause(contractData, type);
      setAiSuggestions(prev => [...prev, { type, content: clause, id: Date.now() }]);
    } catch (error) {
      console.error('Erreur génération IA:', error);
      alert('Erreur lors de la génération de la clause');
    } finally {
      setIsGenerating(false);
    }
  };

  const applySuggestion = (suggestion) => {
    setContractText(prev => prev + '\n\n' + suggestion.content);
    setAiSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
  };

  const analyzeContract = async () => {
    if (!contractText.trim()) {
      alert('Veuillez d\'abord rédiger votre contrat');
      return;
    }

    setIsGenerating(true);
    try {
      const analysis = await aiService.analyzeContract(contractText);
      setAiSuggestions(prev => [...prev, { 
        type: 'analysis', 
        content: analysis, 
        id: Date.now() 
      }]);
    } catch (error) {
      console.error('Erreur analyse IA:', error);
      alert('Erreur lors de l\'analyse du contrat');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Éditeur de contrats avec IA</h1>
            <div className="flex space-x-3">
              <button 
                onClick={analyzeContract}
                disabled={isGenerating}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50"
              >
                {isGenerating ? 'Analyse...' : '🤖 Analyser avec IA'}
              </button>
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

              {/* IA Suggestions */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggestions IA</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => generateAIClause('payment')}
                    disabled={isGenerating}
                    className="w-full text-left p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 disabled:opacity-50"
                  >
                    💰 Clause de paiement
                  </button>
                  <button
                    onClick={() => generateAIClause('confidentiality')}
                    disabled={isGenerating}
                    className="w-full text-left p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 disabled:opacity-50"
                  >
                    🔒 Clause de confidentialité
                  </button>
                  <button
                    onClick={() => generateAIClause('termination')}
                    disabled={isGenerating}
                    className="w-full text-left p-3 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 disabled:opacity-50"
                  >
                    📋 Clause de résiliation
                  </button>
                  <button
                    onClick={() => generateAIClause('liability')}
                    disabled={isGenerating}
                    className="w-full text-left p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 disabled:opacity-50"
                  >
                    ⚖️ Clause de responsabilité
                  </button>
                </div>
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
                    value={contractData.clientName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Entrez le nom du client"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type de service
                  </label>
                  <input
                    type="text"
                    name="service"
                    value={contractData.service}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Prestation de service"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Montant
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={contractData.amount}
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
                    value={contractData.duration}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Sélectionnez une durée</option>
                    <option value="1 mois">1 mois</option>
                    <option value="3 mois">3 mois</option>
                    <option value="6 mois">6 mois</option>
                    <option value="1 an">1 an</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={contractData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Description du contrat..."
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Éditeur de contrat</h2>
              <textarea
                value={contractText}
                onChange={(e) => setContractText(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg h-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Rédigez votre contrat ici ou sélectionnez un template..."
              />
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        {aiSuggestions.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Suggestions IA</h3>
            <div className="space-y-4">
              {aiSuggestions.map((suggestion) => (
                <div key={suggestion.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">
                      {suggestion.type === 'analysis' ? '🤖 Analyse IA' : `💡 Clause ${suggestion.type}`}
                    </h4>
                    {suggestion.type !== 'analysis' && (
                      <button
                        onClick={() => applySuggestion(suggestion)}
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                      >
                        Appliquer
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{suggestion.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIContractEditor;
