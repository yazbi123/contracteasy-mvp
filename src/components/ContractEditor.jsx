import React, { useState } from 'react';
import { aiService } from '../services/aiService';
import { exportService } from '../services/exportService';
import { analyticsService } from '../services/analyticsService';
import { useAuth } from '../hooks/useAuth';

const ContractEditor = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({
    clientName: '',
    amount: '',
    duration: '',
    description: ''
  });
  const [showAISuggestion, setShowAISuggestion] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [contractContent, setContractContent] = useState('');
  const [aiProvider, setAiProvider] = useState('openai');
  const { user } = useAuth();

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
    analyticsService.trackFeatureUsage('template_selection', user?.uid, { template: template.name });
  };

  // Générer une clause avec l'IA
  const generateAIClause = async (clauseType) => {
    setAiLoading(true);
    try {
      const context = {
        service: formData.description,
        client: formData.clientName,
        amount: formData.amount,
        duration: formData.duration
      };

      const suggestion = await aiService.generateClause(context, clauseType, aiProvider);
      setAiSuggestion(suggestion);
      
      analyticsService.trackAIGeneration(user?.uid, clauseType, true);
    } catch (error) {
      console.error('Erreur génération IA:', error);
      analyticsService.trackAIGeneration(user?.uid, clauseType, false);
    } finally {
      setAiLoading(false);
    }
  };

  // Analyser le contrat avec l'IA
  const analyzeContract = async () => {
    if (!contractContent.trim()) return;
    
    setAiLoading(true);
    try {
      const analysis = await aiService.analyzeContract(contractContent, aiProvider);
      setAiSuggestion(analysis);
      analyticsService.trackFeatureUsage('contract_analysis', user?.uid);
    } catch (error) {
      console.error('Erreur analyse:', error);
    } finally {
      setAiLoading(false);
    }
  };

  // Vérifier la conformité RGPD
  const checkGDPRCompliance = async () => {
    if (!contractContent.trim()) return;
    
    setAiLoading(true);
    try {
      const compliance = await aiService.checkGDPRCompliance(contractContent, aiProvider);
      setAiSuggestion(compliance);
      analyticsService.trackFeatureUsage('gdpr_check', user?.uid);
    } catch (error) {
      console.error('Erreur vérification RGPD:', error);
    } finally {
      setAiLoading(false);
    }
  };

  // Exporter en PDF
  const exportToPDF = async () => {
    try {
      const contractData = {
        name: selectedTemplate?.name || 'Contrat',
        client: formData.clientName,
        content: contractContent,
        status: 'draft',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };

      const result = await exportService.exportContractToPDF(contractData, {
        filename: `contrat-${contractData.name}-${Date.now()}.pdf`
      });

      if (result.success) {
        analyticsService.trackPDFExport(user?.uid, 'single_contract', 1);
        alert('PDF exporté avec succès !');
      } else {
        alert('Erreur lors de l\'export PDF');
      }
    } catch (error) {
      console.error('Erreur export PDF:', error);
      analyticsService.trackError('pdf_export_error', error.message, user?.uid);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Éditeur de contrats</h1>
            <div className="flex space-x-3">
              <button 
                onClick={exportToPDF}
                className="px-4 py-2 text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50"
              >
                📄 Exporter PDF
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

                {/* Section IA Avancée */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    🤖 Assistant IA
                    {aiLoading && <span className="ml-2 animate-spin">⏳</span>}
                  </h3>
                  
                  {/* Sélecteur de fournisseur IA */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fournisseur IA
                    </label>
                    <select
                      value={aiProvider}
                      onChange={(e) => setAiProvider(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="openai">OpenAI GPT</option>
                      <option value="xai">xAI Grok</option>
                    </select>
                  </div>

                  {/* Boutons d'action IA */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button
                      onClick={() => generateAIClause('payment')}
                      disabled={aiLoading}
                      className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 text-sm"
                    >
                      💰 Clause Paiement
                    </button>
                    <button
                      onClick={() => generateAIClause('confidentiality')}
                      disabled={aiLoading}
                      className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 text-sm"
                    >
                      🔒 Clause Confidentialité
                    </button>
                    <button
                      onClick={() => generateAIClause('termination')}
                      disabled={aiLoading}
                      className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 text-sm"
                    >
                      🚪 Clause Résiliation
                    </button>
                    <button
                      onClick={() => generateAIClause('liability')}
                      disabled={aiLoading}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 text-sm"
                    >
                      ⚖️ Clause Responsabilité
                    </button>
                  </div>

                  {/* Actions avancées */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button
                      onClick={analyzeContract}
                      disabled={aiLoading || !contractContent.trim()}
                      className="px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 text-sm"
                    >
                      🔍 Analyser Contrat
                    </button>
                    <button
                      onClick={checkGDPRCompliance}
                      disabled={aiLoading || !contractContent.trim()}
                      className="px-3 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 text-sm"
                    >
                      🛡️ Vérifier RGPD
                    </button>
                  </div>

                  {/* Affichage des suggestions IA */}
                  {aiSuggestion && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Suggestion IA :</h4>
                      <div className="text-sm text-gray-700 whitespace-pre-wrap">
                        {aiSuggestion}
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <button
                          onClick={() => setContractContent(contractContent + '\n\n' + aiSuggestion)}
                          className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                        >
                          Ajouter au contrat
                        </button>
                        <button
                          onClick={() => setAiSuggestion('')}
                          className="px-3 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600"
                        >
                          Fermer
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Éditeur de contenu */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contenu du contrat</h2>
              <textarea
                value={contractContent}
                onChange={(e) => setContractContent(e.target.value)}
                className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Rédigez votre contrat ici... Vous pouvez utiliser l'IA pour générer des clauses automatiquement."
              />
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
