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
              <a href="#testimonials" className="text-gray-600 hover:text-blue-500">Témoignages</a>
              <a href="#contact" className="text-gray-600 hover:text-blue-500">Contact</a>
            </nav>
            <Link to="/login" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
              Se connecter
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Simplifiez vos contrats avec ContractEasy
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Créez, signez et suivez vos contrats en quelques clics avec des templates validés et des rappels automatiques.
          </p>
          <Link to="/signup" className="bg-blue-500 text-white font-bold py-4 px-8 rounded-lg hover:bg-blue-700 transition duration-300 text-lg inline-block">
            Essayer gratuitement
          </Link>
          
          {/* Mockup */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-2xl p-8 border border-gray-200">
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-lg mx-auto mb-4"></div>
                  <p className="text-gray-600">Mockup du tableau de bord ContractEasy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Fonctionnalités
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Templates IA</h3>
              <p className="text-gray-600">Génération automatique de contrats avec intelligence artificielle</p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Signatures</h3>
              <p className="text-gray-600">Signature électronique sécurisée et conforme</p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Suivi</h3>
              <p className="text-gray-600">Tableau de bord avec notifications et rappels</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Ce que disent nos clients
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <p className="text-lg text-gray-600 italic mb-4">
                "J'ai gagné 10h/mois ! L'interface est intuitive et mes clients adorent la simplicité."
              </p>
              <p className="text-sm font-semibold text-gray-900">- Consultant PME</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
              <p className="text-lg text-gray-600 italic mb-4">
                "Plus de paperasse, plus d'efficacité. ContractEasy a révolutionné notre gestion."
              </p>
              <p className="text-sm font-semibold text-gray-900">- Manager Startup</p>
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
            </div>
            <p className="text-gray-400 text-sm">© 2024 ContractEasy. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
