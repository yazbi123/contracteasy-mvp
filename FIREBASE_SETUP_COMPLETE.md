# 🔥 Configuration Firebase Complète pour ContractEasy

## 📋 Étapes détaillées

### 1. Créer un projet Firebase
1. **Allez sur** https://console.firebase.google.com
2. **Cliquez** "Créer un projet"
3. **Nom du projet** : `contracteasy-mvp`
4. **Activez Google Analytics** (recommandé)
5. **Région** : Europe (europe-west1)

### 2. Activer l'authentification
1. **Dans la console Firebase** → "Authentication"
2. **Cliquez** "Commencer"
3. **Onglet "Sign-in method"**
4. **Activez "Email/Password"** :
   - ✅ Email/Password
   - ✅ Email link (passwordless sign-in)
5. **Activez "Google"** (optionnel) :
   - ✅ Google
   - Configurez le nom du projet public
   - Ajoutez votre domaine (localhost pour dev)

### 3. Activer Firestore Database
1. **Allez dans** "Firestore Database"
2. **Cliquez** "Créer une base de données"
3. **Choisissez** "Mode test" (pour le développement)
4. **Sélectionnez** une région (europe-west1)
5. **Règles de sécurité** (copiez-collez) :

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
  }
}
```

### 4. Obtenir la configuration
1. **Allez dans** "Paramètres du projet" (icône ⚙️)
2. **Onglet "Général"**
3. **Section "Vos applications"**
4. **Cliquez** "Web" (icône </>)
5. **Nom de l'app** : `contracteasy-web`
6. **Copiez la configuration** et remplacez dans `src/firebase/config.js`

### 5. Mettre à jour le fichier de configuration
Remplacez les valeurs dans `src/firebase/config.js` :

```javascript
const firebaseConfig = {
  apiKey: "VOTRE_CLE_API_ICI",
  authDomain: "contracteasy-mvp.firebaseapp.com",
  projectId: "contracteasy-mvp",
  storageBucket: "contracteasy-mvp.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

## 🧪 Test de l'authentification
1. **Démarrez l'application** : `npm run dev`
2. **Allez sur** `/signup`
3. **Créez un compte** avec email/mot de passe
4. **Vérifiez** que vous êtes redirigé vers `/dashboard`

## 🔒 Sécurité en production
Pour la production, changez les règles Firestore :

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

## 📊 Monitoring
Dans la console Firebase, vous pouvez voir :
- **Authentication** : Utilisateurs connectés
- **Firestore** : Données sauvegardées
- **Analytics** : Utilisation de l'app
- **Performance** : Temps de réponse
