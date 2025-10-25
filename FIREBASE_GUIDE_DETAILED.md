# 🔥 Guide Firebase Détaillé pour ContractEasy

## 📋 Étape 1 : Créer un projet Firebase

### 1.1 Aller sur la console Firebase
1. **Ouvrez votre navigateur** et allez sur https://console.firebase.google.com
2. **Connectez-vous** avec votre compte Google
3. **Cliquez** sur "Créer un projet" (bouton bleu)

### 1.2 Configurer le projet
1. **Nom du projet** : `contracteasy-mvp`
2. **Description** : "Plateforme de gestion de contrats pour PME"
3. **Cliquez** "Continuer"

### 1.3 Activer Google Analytics (recommandé)
1. **Cochez** "Activer Google Analytics pour ce projet"
2. **Sélectionnez** un compte Analytics (ou créez-en un)
3. **Cliquez** "Continuer"

### 1.4 Choisir la région
1. **Sélectionnez** "Europe (europe-west1)" pour la France
2. **Cliquez** "Créer un projet"
3. **Attendez** que le projet soit créé (2-3 minutes)

## 📋 Étape 2 : Activer l'authentification

### 2.1 Aller dans Authentication
1. **Dans la console Firebase**, cliquez sur "Authentication" dans le menu de gauche
2. **Cliquez** sur "Commencer"

### 2.2 Configurer les méthodes de connexion
1. **Allez dans** l'onglet "Sign-in method"
2. **Activez "E-mail/Mot de passe"** :
   - Cliquez sur "E-mail/Mot de passe"
   - **Activez** la première option "E-mail/Mot de passe"
   - **Activez** la deuxième option "E-mail link (passwordless sign-in)"
   - **Cliquez** "Enregistrer"

### 2.3 (Optionnel) Activer Google Sign-In
1. **Cliquez** sur "Google"
2. **Activez** Google
3. **Sélectionnez** un nom de projet public : "ContractEasy"
4. **Ajoutez** une adresse e-mail de support : votre email
5. **Cliquez** "Enregistrer"

## 📋 Étape 3 : Activer Firestore Database

### 3.1 Créer la base de données
1. **Dans le menu de gauche**, cliquez sur "Firestore Database"
2. **Cliquez** sur "Créer une base de données"

### 3.2 Choisir le mode de sécurité
1. **Sélectionnez** "Commencer en mode test" (pour le développement)
2. **Lisez** l'avertissement sur les règles de sécurité
3. **Cliquez** "Suivant"

### 3.3 Choisir l'emplacement
1. **Sélectionnez** "europe-west1 (Belgium)" (le plus proche de la France)
2. **Cliquez** "Activer"

### 3.4 Configurer les règles de sécurité
1. **Allez dans** l'onglet "Règles"
2. **Remplacez** le contenu par :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Les utilisateurs peuvent seulement accéder à leurs propres données
    match /contracts/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    match /templates/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    match /notifications/{document} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Règles pour les templates publics (lecture seule)
    match /public_templates/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. **Cliquez** "Publier"

## 📋 Étape 4 : Obtenir la configuration

### 4.1 Aller dans les paramètres du projet
1. **Cliquez** sur l'icône ⚙️ (Paramètres du projet) en haut à gauche
2. **Allez dans** l'onglet "Général"

### 4.2 Ajouter une application web
1. **Dans la section "Vos applications"**, cliquez sur l'icône </> (Web)
2. **Nom de l'application** : `contracteasy-web`
3. **Cochez** "Configurer également Firebase Hosting pour cette application" (optionnel)
4. **Cliquez** "Enregistrer l'application"

### 4.3 Copier la configuration
Firebase vous affichera un objet de configuration comme ceci :

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "contracteasy-mvp.firebaseapp.com",
  projectId: "contracteasy-mvp",
  storageBucket: "contracteasy-mvp.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

**⚠️ IMPORTANT** : Copiez cette configuration, vous en aurez besoin !

## 📋 Étape 5 : Mettre à jour l'application

### 5.1 Ouvrir le fichier de configuration
1. **Ouvrez** le fichier `src/firebase/config.js` dans votre projet
2. **Remplacez** les valeurs par celles que vous avez copiées

### 5.2 Exemple de configuration complète
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuration Firebase (remplacez par vos clés)
const firebaseConfig = {
  apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "contracteasy-mvp.firebaseapp.com",
  projectId: "contracteasy-mvp",
  storageBucket: "contracteasy-mvp.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Services Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
```

## 📋 Étape 6 : Tester la configuration

### 6.1 Démarrer l'application
```bash
cd /Users/saif/contracteasy-design/prototype/components
npm run dev
```

### 6.2 Tester l'inscription
1. **Allez sur** http://localhost:5173/signup
2. **Créez un compte** avec email/mot de passe
3. **Vérifiez** que vous êtes redirigé vers `/dashboard`

### 6.3 Vérifier dans Firebase
1. **Retournez** dans la console Firebase
2. **Allez dans** Authentication → Users
3. **Vous devriez voir** votre utilisateur créé

## 📋 Étape 7 : Configuration pour la production

### 7.1 Ajouter des domaines autorisés
1. **Dans Firebase** → Authentication → Settings
2. **Onglet "Authorized domains"**
3. **Ajoutez** votre domaine de production (ex: `contracteasy.vercel.app`)

### 7.2 Configurer les règles de sécurité avancées
Pour la production, utilisez ces règles plus strictes :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contracts/{document} {
      allow read, write: if request.auth != null 
        && request.auth.uid == resource.data.userId
        && request.auth.token.email_verified == true;
    }
  }
}
```

## 🛡️ Sécurité et bonnes pratiques

### ✅ Ce qui est sécurisé
- **Authentification obligatoire** : Seuls les utilisateurs connectés peuvent accéder aux données
- **Isolation des données** : Chaque utilisateur ne voit que ses propres contrats
- **Validation des emails** : Optionnel mais recommandé pour la production

### ⚠️ Points d'attention
- **Règles de sécurité** : Testez toujours vos règles avant la production
- **Limites de quota** : Surveillez l'usage dans la console Firebase
- **Sauvegarde** : Activez les sauvegardes automatiques

## 📊 Monitoring et analytics

### Dans la console Firebase, vous pouvez voir :
- **Authentication** : Nombre d'utilisateurs, connexions
- **Firestore** : Requêtes, stockage utilisé
- **Analytics** : Événements, utilisateurs actifs
- **Performance** : Temps de réponse, erreurs

## 🎯 Prochaines étapes

1. **Testez** l'inscription et la connexion
2. **Créez** quelques contrats de test
3. **Vérifiez** que les données sont sauvegardées
4. **Configurez** les autres APIs (OpenAI, Analytics)
5. **Déployez** sur Vercel

## 🆘 Dépannage

### Problème : "Firebase: Error (auth/invalid-api-key)"
**Solution** : Vérifiez que votre clé API est correcte dans `config.js`

### Problème : "Firebase: Error (auth/unauthorized-domain)"
**Solution** : Ajoutez `localhost:5173` dans les domaines autorisés

### Problème : "Firestore: Error (permission-denied)"
**Solution** : Vérifiez vos règles de sécurité Firestore

---

**🎉 Félicitations ! Firebase est maintenant configuré pour ContractEasy !**
