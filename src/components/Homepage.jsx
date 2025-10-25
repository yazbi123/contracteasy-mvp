import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-500">ContractEasy</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-500">Fonctionnalités</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-500">Tarifs</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-500">Témoignages</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-500">Contact</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-blue-500 transition duration-300">
                Se connecter
              </Link>
              <Link to="/signup" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Créez, signez et renouvelez vos contrats 3× plus vite
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Modèles juridiques prêts à l'emploi, signature électronique conforme eIDAS et rappels de renouvellement — le tout en une seule appli.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signup" className="bg-blue-500 text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 transition duration-300 text-lg inline-block">
              Essai gratuit 14 jours — sans CB
            </Link>
            <button className="border-2 border-blue-500 text-blue-500 font-bold py-4 px-8 rounded-lg hover:bg-blue-50 transition duration-300 text-lg">
              Voir la démo (2 min)
            </button>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Conforme eIDAS & RGPD
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Hébergement UE
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Chiffrement bout en bout
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Comment ça marche
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-500">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Créer</h3>
              <p className="text-gray-600">Choisissez un modèle validé par juristes ou générez avec l'IA</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-500">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Envoyer</h3>
              <p className="text-gray-600">Partagez le contrat par email avec signature électronique</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-500">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Signer & Suivre</h3>
              <p className="text-gray-600">Signature conforme eIDAS + rappels automatiques</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Fonctionnalités détaillées
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Modèles et variables */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Modèles validés</h3>
              <p className="text-sm text-gray-600">NDA, prestations, devis, RH — variables dynamiques</p>
            </div>

            {/* Signature électronique */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Signature eIDAS</h3>
              <p className="text-sm text-gray-600">Horodatage, empreinte, preuve, multi-signataires</p>
            </div>

            {/* Suivi & renouvellements */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Suivi intelligent</h3>
              <p className="text-sm text-gray-600">Timeline, relances, alertes 30/7/1 jours</p>
            </div>

            {/* Intégrations */}
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Intégrations</h3>
              <p className="text-sm text-gray-600">Drive, HubSpot, Slack, Zapier + export PDF</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Tarifs simples et transparents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Solo Plan */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Solo</h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">19€<span className="text-sm font-normal text-gray-500">/mois</span></div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-sm text-gray-600">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                  5 modèles de contrats
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                  20 signatures/mois
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                  Support email
                </li>
              </ul>
              <Link to="/signup" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-center block">
                Essayer gratuitement
              </Link>
            </div>

            {/* Team Plan */}
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-blue-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">Populaire</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Team</h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">49€<span className="text-sm font-normal text-gray-500">/mois</span></div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-sm text-gray-600">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                  Modèles illimités
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                  100 signatures/mois
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                  Jusqu'à 5 utilisateurs
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                  Support prioritaire
                </li>
              </ul>
              <Link to="/signup" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-center block">
                Essayer gratuitement
              </Link>
            </div>

            {/* Business Plan */}
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Business</h3>
              <div className="text-3xl font-bold text-gray-900 mb-4">99€<span className="text-sm font-normal text-gray-500">/mois</span></div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-sm text-gray-600">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                  Tout de Team
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                  Signatures illimitées
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                  Utilisateurs illimités
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                  Support téléphonique
                </li>
              </ul>
              <Link to="/signup" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-center block">
                Essayer gratuitement
              </Link>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              <span className="font-semibold">-10%</span> avec l'abonnement annuel • <span className="font-semibold">Sans CB</span> pendant l'essai
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Ce que disent nos clients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-500 font-bold">M</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Marie Dubois</p>
                  <p className="text-sm text-gray-500">Consultante PME</p>
                </div>
              </div>
              <p className="text-lg text-gray-600 italic mb-4">
                "J'ai gagné 10h/mois ! L'interface est intuitive et mes clients adorent la simplicité."
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-500 font-bold">P</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Pierre Martin</p>
                  <p className="text-sm text-gray-500">Manager Startup</p>
                </div>
              </div>
              <p className="text-lg text-gray-600 italic mb-4">
                "Plus de paperasse, plus d'efficacité. ContractEasy a révolutionné notre gestion."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Compliance Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Confiance & Conformité
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Conforme eIDAS</h3>
              <p className="text-sm text-gray-600">Signature électronique reconnue juridiquement en Europe</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">RGPD Compliant</h3>
              <p className="text-sm text-gray-600">Hébergement UE, chiffrement bout en bout, DPA signé</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Sécurité Enterprise</h3>
              <p className="text-sm text-gray-600">Audit de sécurité, sauvegarde quotidienne, monitoring 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">ContractEasy</h3>
            <div className="flex justify-center space-x-8 mb-4">
              <a href="#contact" className="text-gray-300 hover:text-white">Contact</a>
              <a href="#rgpd" className="text-gray-300 hover:text-white">RGPD</a>
              <a href="#mentions" className="text-gray-300 hover:text-white">Mentions légales</a>
              <a href="#security" className="text-gray-300 hover:text-white">Sécurité</a>
            </div>
            <p className="text-gray-400 text-sm">© 2024 ContractEasy. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
