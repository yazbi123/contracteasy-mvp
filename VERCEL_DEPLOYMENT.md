# 🚀 Déploiement ContractEasy sur Vercel

## 📋 Étapes de déploiement

### 1. Préparer l'application
```bash
# Dans le dossier prototype/components
npm run build
```

### 2. Créer un compte Vercel
1. **Allez sur** https://vercel.com
2. **Cliquez** "Sign up"
3. **Connectez** votre compte GitHub
4. **Autorisez** l'accès à vos repositories

### 3. Déployer depuis GitHub
1. **Dans Vercel** → "New Project"
2. **Importez** votre repository `contracteasy-mvp`
3. **Configuration automatique** :
   - Framework: Vite (détecté automatiquement)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 4. Configurer les variables d'environnement
Dans Vercel → Settings → Environment Variables :

```bash
# Firebase
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=contracteasy-mvp.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=contracteasy-mvp
VITE_FIREBASE_STORAGE_BUCKET=contracteasy-mvp.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890

# OpenAI
VITE_OPENAI_API_KEY=sk-your-openai-api-key

# Analytics
VITE_GA_ID=G-XXXXXXXXXX
```

### 5. Configurer Firebase pour la production
1. **Dans Firebase Console** → Authentication
2. **Onglet "Authorized domains"**
3. **Ajoutez** votre domaine Vercel : `votre-projet.vercel.app`

### 6. Tester le déploiement
1. **Vercel déploie automatiquement** à chaque push
2. **Testez** votre URL de production
3. **Vérifiez** que l'authentification fonctionne
4. **Testez** l'IA et les exports PDF

## 🔧 Configuration avancée

### Domaine personnalisé
1. **Dans Vercel** → Settings → Domains
2. **Ajoutez** votre domaine personnalisé
3. **Configurez** les DNS selon les instructions

### Variables d'environnement par environnement
- **Development** : Variables locales
- **Preview** : Variables de test
- **Production** : Variables de production

### Monitoring
- **Vercel Analytics** : Métriques de performance
- **Google Analytics** : Métriques business
- **Firebase Analytics** : Métriques d'utilisation

## 🛡️ Sécurité en production

### Règles Firestore
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

### Limites de taux
- **OpenAI** : Limitez les requêtes par utilisateur
- **Firebase** : Surveillez l'usage dans la console
- **Vercel** : Surveillez les limites de bande passante

## 📊 Monitoring post-déploiement

### Métriques importantes
- **Temps de réponse** : < 2 secondes
- **Taux d'erreur** : < 1%
- **Disponibilité** : > 99.9%
- **Utilisateurs actifs** : Croissance mensuelle

### Alertes à configurer
- **Erreurs 500** : > 5% des requêtes
- **Temps de réponse** : > 5 secondes
- **Usage Firebase** : > 80% des limites
- **Usage OpenAI** : > 90% du budget

## 🎯 Checklist de déploiement

- [ ] Application build sans erreurs
- [ ] Variables d'environnement configurées
- [ ] Firebase configuré pour la production
- [ ] Domaine personnalisé (optionnel)
- [ ] Monitoring configuré
- [ ] Tests de fonctionnalités
- [ ] Documentation mise à jour
- [ ] Backup des données
