# 🔥 Test Firebase avec ContractEasy

## 📋 Configuration rapide

### 1. Créer un projet Firebase
- Allez sur [console.firebase.google.com](https://console.firebase.google.com)
- Créez un nouveau projet : `contracteasy-test`
- Désactivez Google Analytics

### 2. Ajouter une application Web
- Cliquez sur l'icône `</>` (Web)
- Nom : `ContractEasy Web`
- Copiez la configuration

### 3. Mettre à jour `src/firebase/config.js`
Remplacez les valeurs par votre configuration Firebase :

```javascript
const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "contracteasy-test.firebaseapp.com",
  projectId: "contracteasy-test",
  storageBucket: "contracteasy-test.appspot.com",
  messagingSenderId: "VOTRE_SENDER_ID",
  appId: "VOTRE_APP_ID"
};
```

### 4. Activer les services

#### Authentication
- Allez dans "Authentication" > "Démarrer"
- Onglet "Méthode de connexion"
- Activez "E-mail/Mot de passe"

#### Firestore Database
- Allez dans "Firestore Database" > "Créer une base de données"
- Choisissez "Démarrer en mode test"
- Sélectionnez une région

### 5. Tester l'application

1. **Démarrez l'application** :
   ```bash
   cd /Users/saif/contracteasy-design/prototype/components
   npm run dev
   ```

2. **Allez sur** http://localhost:5173

3. **Testez l'inscription** :
   - Cliquez sur "📝 Inscription"
   - Entrez un email et mot de passe
   - Cliquez sur "S'inscrire"

4. **Vérifiez dans Firebase** :
   - Console Firebase > Authentication > Utilisateurs
   - Vous devriez voir votre utilisateur créé

### 6. Tester la connexion

1. **Cliquez sur "🔐 Connexion"**
2. **Entrez** les mêmes identifiants
3. **Cliquez** sur "Se connecter"
4. **Vérifiez** que vous êtes redirigé vers le dashboard

## 🐛 Dépannage

### Erreur "Firebase: Error (auth/invalid-api-key)"
- Vérifiez que votre clé API est correcte dans `config.js`

### Erreur "Firebase: Error (auth/domain-not-authorized)"
- Dans Firebase Console > Authentication > Settings > Authorized domains
- Ajoutez `localhost` à la liste

### Erreur "Firebase: Error (auth/too-many-requests)"
- Attendez quelques minutes avant de réessayer

## 📊 Vérification des données

### Firestore
- Console Firebase > Firestore Database
- Vous devriez voir les collections `contracts` et `notifications`

### Authentication
- Console Firebase > Authentication > Utilisateurs
- Liste des utilisateurs inscrits

## 🚀 Prochaines étapes

1. **Configurer les règles de sécurité** Firestore
2. **Ajouter la validation** des formulaires
3. **Implémenter** la gestion d'erreurs
4. **Tester** toutes les fonctionnalités

## 📝 Notes importantes

- **Mode test** : Permet toutes les opérations (développement uniquement)
- **Production** : Configurez les règles de sécurité
- **Sauvegarde** : Vos données sont persistantes
- **Coût** : Firebase a un plan gratuit généreux
