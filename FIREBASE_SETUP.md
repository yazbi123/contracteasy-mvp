# 🔥 Configuration Firebase pour ContractEasy

## 📋 Étapes de configuration

### 1. Créer un projet Firebase
1. Allez sur https://console.firebase.google.com
2. Cliquez "Créer un projet"
3. Nom : `contracteasy-mvp`
4. Activez Google Analytics (optionnel)

### 2. Activer l'authentification
1. Dans la console Firebase, allez dans "Authentication"
2. Cliquez "Commencer"
3. Onglet "Sign-in method"
4. Activez "Email/Password"
5. Activez "Google" (optionnel)

### 3. Activer Firestore Database
1. Allez dans "Firestore Database"
2. Cliquez "Créer une base de données"
3. Choisissez "Mode test" (pour le développement)
4. Sélectionnez une région (europe-west1 pour l'Europe)

### 4. Obtenir la configuration
1. Allez dans "Paramètres du projet" (icône ⚙️)
2. Onglet "Général"
3. Section "Vos applications"
4. Cliquez "Web" (icône </>)
5. Nom de l'app : `contracteasy-web`
6. Copiez la configuration

### 5. Mettre à jour le fichier de configuration
Remplacez les valeurs dans `src/firebase/config.js` :

```javascript
const firebaseConfig = {
  apiKey: "VOTRE_CLE_API",
  authDomain: "contracteasy-mvp.firebaseapp.com",
  projectId: "contracteasy-mvp",
  storageBucket: "contracteasy-mvp.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

## 🔒 Règles de sécurité Firestore

Ajoutez ces règles dans l'onglet "Règles" de Firestore :

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

## 🚀 Test de l'application

1. **Démarrez l'application** :
   ```bash
   npm run dev
   ```

2. **Testez l'inscription** :
   - Allez sur `/signup`
   - Créez un compte avec email/mot de passe
   - Vous devriez être redirigé vers `/dashboard`

3. **Testez la sauvegarde** :
   - Créez un nouveau contrat
   - Rafraîchissez la page
   - Le contrat devrait être conservé

## 🔧 Dépannage

### Erreur "Firebase not initialized"
- Vérifiez que les clés Firebase sont correctes
- Redémarrez le serveur de développement

### Erreur "Permission denied"
- Vérifiez les règles de sécurité Firestore
- Assurez-vous que l'utilisateur est connecté

### Erreur "Network request failed"
- Vérifiez votre connexion internet
- Vérifiez que le projet Firebase est actif

## 📊 Monitoring

Dans la console Firebase, vous pouvez voir :
- **Authentication** : Utilisateurs connectés
- **Firestore** : Données sauvegardées
- **Analytics** : Utilisation de l'app

## 🎯 Prochaines étapes

1. **Production** : Changez les règles Firestore pour la production
2. **Backup** : Configurez les sauvegardes automatiques
3. **Monitoring** : Ajoutez des alertes pour les erreurs
4. **Performance** : Optimisez les requêtes Firestore

---

**🎉 Votre application ContractEasy est maintenant persistante !**
