import React from 'react';
import { Link } from 'react-router-dom';

// CGU - Conditions Générales d'Utilisation
export const CGU = () => (
  <div className="min-h-screen bg-white py-12">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link to="/" className="text-blue-500 hover:text-blue-700">← Retour à l'accueil</Link>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Conditions Générales d'Utilisation</h1>
      
      <div className="prose prose-lg max-w-none">
        <h2>1. Objet</h2>
        <p>Les présentes conditions générales d'utilisation (CGU) régissent l'utilisation de la plateforme ContractEasy, service de gestion de contrats en ligne.</p>
        
        <h2>2. Définitions</h2>
        <ul>
          <li><strong>Service</strong> : Plateforme ContractEasy accessible via contracteasy-mvp.vercel.app</li>
          <li><strong>Utilisateur</strong> : Toute personne physique ou morale utilisant le Service</li>
          <li><strong>Contrat</strong> : Document juridique créé via la plateforme</li>
        </ul>
        
        <h2>3. Acceptation des CGU</h2>
        <p>L'utilisation du Service implique l'acceptation pleine et entière des présentes CGU.</p>
        
        <h2>4. Services proposés</h2>
        <ul>
          <li>Création de contrats à partir de modèles</li>
          <li>Signature électronique conforme eIDAS</li>
          <li>Suivi et rappels de renouvellement</li>
          <li>Stockage sécurisé des documents</li>
        </ul>
        
        <h2>5. Obligations de l'Utilisateur</h2>
        <ul>
          <li>Fournir des informations exactes et à jour</li>
          <li>Respecter la législation applicable</li>
          <li>Ne pas utiliser le Service à des fins illégales</li>
          <li>Maintenir la confidentialité de ses identifiants</li>
        </ul>
        
        <h2>6. Tarifs et facturation</h2>
        <p>Les tarifs sont indiqués sur la page de tarification. La facturation s'effectue mensuellement ou annuellement selon l'abonnement choisi.</p>
        
        <h2>7. Données personnelles</h2>
        <p>Le traitement des données personnelles est régi par notre <Link to="/privacy" className="text-blue-500">Politique de Confidentialité</Link>.</p>
        
        <h2>8. Responsabilité</h2>
        <p>ContractEasy s'engage à fournir le Service avec diligence mais ne peut garantir un fonctionnement sans interruption.</p>
        
        <h2>9. Propriété intellectuelle</h2>
        <p>L'Utilisateur conserve la propriété de ses contrats. ContractEasy conserve les droits sur la plateforme.</p>
        
        <h2>10. Résiliation</h2>
        <p>L'Utilisateur peut résilier son abonnement à tout moment. ContractEasy peut suspendre le Service en cas de non-respect des CGU.</p>
        
        <h2>11. Droit applicable</h2>
        <p>Les présentes CGU sont régies par le droit français. Tout litige relève de la compétence des tribunaux français.</p>
        
        <p className="text-sm text-gray-500 mt-8">
          Dernière mise à jour : 19 décembre 2024
        </p>
      </div>
    </div>
  </div>
);

// Politique de Confidentialité
export const PrivacyPolicy = () => (
  <div className="min-h-screen bg-white py-12">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link to="/" className="text-blue-500 hover:text-blue-700">← Retour à l'accueil</Link>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Politique de Confidentialité</h1>
      
      <div className="prose prose-lg max-w-none">
        <h2>1. Responsable du traitement</h2>
        <p>ContractEasy, société française, est responsable du traitement de vos données personnelles.</p>
        
        <h2>2. Données collectées</h2>
        <ul>
          <li><strong>Données d'identification</strong> : Nom, email, entreprise</li>
          <li><strong>Données de facturation</strong> : Adresse, informations de paiement</li>
          <li><strong>Données d'usage</strong> : Logs d'accès, actions sur la plateforme</li>
          <li><strong>Contrats</strong> : Documents créés et signés</li>
        </ul>
        
        <h2>3. Finalités du traitement</h2>
        <ul>
          <li>Fourniture du service ContractEasy</li>
          <li>Gestion de la facturation</li>
          <li>Support client</li>
          <li>Amélioration du service</li>
          <li>Respect des obligations légales</li>
        </ul>
        
        <h2>4. Base légale</h2>
        <ul>
          <li><strong>Exécution du contrat</strong> : Fourniture du service</li>
          <li><strong>Intérêt légitime</strong> : Amélioration du service</li>
          <li><strong>Obligation légale</strong> : Conservation des données</li>
        </ul>
        
        <h2>5. Conservation des données</h2>
        <ul>
          <li><strong>Données de compte</strong> : Durée de l'abonnement + 3 ans</li>
          <li><strong>Contrats</strong> : 10 ans (obligation légale)</li>
          <li><strong>Logs</strong> : 1 an</li>
        </ul>
        
        <h2>6. Partage des données</h2>
        <p>Vos données ne sont partagées qu'avec :</p>
        <ul>
          <li>Nos sous-traitants (hébergement, paiement)</li>
          <li>Autorités compétentes si requis par la loi</li>
        </ul>
        
        <h2>7. Vos droits</h2>
        <ul>
          <li><strong>Accès</strong> : Obtenir une copie de vos données</li>
          <li><strong>Rectification</strong> : Corriger des données inexactes</li>
          <li><strong>Effacement</strong> : Supprimer vos données</li>
          <li><strong>Portabilité</strong> : Récupérer vos données</li>
          <li><strong>Opposition</strong> : S'opposer au traitement</li>
        </ul>
        
        <h2>8. Sécurité</h2>
        <ul>
          <li>Chiffrement bout en bout</li>
          <li>Hébergement en Europe</li>
          <li>Accès restreint aux données</li>
          <li>Audits de sécurité réguliers</li>
        </ul>
        
        <h2>9. Cookies</h2>
        <p>Nous utilisons des cookies techniques et analytiques. Vous pouvez les désactiver dans les paramètres de votre navigateur.</p>
        
        <h2>10. Contact</h2>
        <p>Pour exercer vos droits ou toute question : <a href="mailto:privacy@contracteasy.com" className="text-blue-500">privacy@contracteasy.com</a></p>
        
        <p className="text-sm text-gray-500 mt-8">
          Dernière mise à jour : 19 décembre 2024
        </p>
      </div>
    </div>
  </div>
);

// Page Sécurité
export const SecurityPage = () => (
  <div className="min-h-screen bg-white py-12">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link to="/" className="text-blue-500 hover:text-blue-700">← Retour à l'accueil</Link>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Sécurité & Conformité</h1>
      
      <div className="prose prose-lg max-w-none">
        <h2>🔒 Sécurité des données</h2>
        <ul>
          <li><strong>Chiffrement</strong> : AES-256 au repos, TLS 1.3 en transit</li>
          <li><strong>Hébergement</strong> : Serveurs européens certifiés ISO 27001</li>
          <li><strong>Accès</strong> : Authentification multi-facteurs obligatoire</li>
          <li><strong>Audits</strong> : Tests de pénétration trimestriels</li>
        </ul>
        
        <h2>📋 Conformité réglementaire</h2>
        <ul>
          <li><strong>RGPD</strong> : Conformité totale avec le Règlement Général sur la Protection des Données</li>
          <li><strong>eIDAS</strong> : Signatures électroniques reconnues juridiquement</li>
          <li><strong>ISO 27001</strong> : Certification sécurité de l'information</li>
          <li><strong>SOC 2</strong> : Contrôles de sécurité audités</li>
        </ul>
        
        <h2>🛡️ Mesures de protection</h2>
        <ul>
          <li>Firewall applicatif (WAF) avec règles personnalisées</li>
          <li>Détection d'intrusion en temps réel</li>
          <li>Monitoring 24/7 des accès et activités</li>
          <li>Sauvegardes chiffrées quotidiennes</li>
        </ul>
        
        <h2>📊 Transparence</h2>
        <ul>
          <li>Rapports de sécurité disponibles sur demande</li>
          <li>Notification immédiate en cas d'incident</li>
          <li>DPA (Data Processing Agreement) fourni</li>
          <li>Audits tiers disponibles</li>
        </ul>
        
        <h2>🔍 Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">RGPD Compliant</h3>
            <p className="text-sm text-gray-600">Conformité totale au RGPD</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">eIDAS Certified</h3>
            <p className="text-sm text-gray-600">Signatures électroniques légales</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">ISO 27001</h3>
            <p className="text-sm text-gray-600">Sécurité de l'information</p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold">SOC 2 Type II</h3>
            <p className="text-sm text-gray-600">Contrôles de sécurité audités</p>
          </div>
        </div>
        
        <h2>📞 Contact sécurité</h2>
        <p>Pour toute question relative à la sécurité : <a href="mailto:security@contracteasy.com" className="text-blue-500">security@contracteasy.com</a></p>
        
        <p className="text-sm text-gray-500 mt-8">
          Dernière mise à jour : 19 décembre 2024
        </p>
      </div>
    </div>
  </div>
);

// Mentions Légales
export const LegalMentions = () => (
  <div className="min-h-screen bg-white py-12">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link to="/" className="text-blue-500 hover:text-blue-700">← Retour à l'accueil</Link>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mentions Légales</h1>
      
      <div className="prose prose-lg max-w-none">
        <h2>Éditeur</h2>
        <p><strong>ContractEasy</strong><br />
        Société par actions simplifiée<br />
        RCS Paris 123 456 789<br />
        Capital social : 10 000 €<br />
        Siège social : 123 Avenue des Champs-Élysées, 75008 Paris<br />
        Téléphone : +33 1 23 45 67 89<br />
        Email : contact@contracteasy.com</p>
        
        <h2>Directeur de publication</h2>
        <p>M. Jean Dupont, Président</p>
        
        <h2>Hébergement</h2>
        <p>Vercel Inc.<br />
        340 S Lemon Ave #4133<br />
        Walnut, CA 91789, USA</p>
        
        <h2>Propriété intellectuelle</h2>
        <p>L'ensemble du contenu de ce site (textes, images, vidéos, etc.) est protégé par le droit d'auteur et appartient à ContractEasy.</p>
        
        <h2>Responsabilité</h2>
        <p>ContractEasy s'efforce de fournir des informations exactes et à jour, mais ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition.</p>
        
        <h2>Liens externes</h2>
        <p>Le site peut contenir des liens vers d'autres sites. ContractEasy n'est pas responsable du contenu de ces sites externes.</p>
        
        <h2>Cookies</h2>
        <p>Ce site utilise des cookies pour améliorer l'expérience utilisateur. Consultez notre <Link to="/privacy" className="text-blue-500">Politique de Confidentialité</Link> pour plus d'informations.</p>
        
        <p className="text-sm text-gray-500 mt-8">
          Dernière mise à jour : 19 décembre 2024
        </p>
      </div>
    </div>
  </div>
);
