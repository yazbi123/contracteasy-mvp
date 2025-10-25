# 🤖 Configuration OpenAI pour ContractEasy

## 📋 Étapes détaillées

### 1. Créer un compte OpenAI
1. **Allez sur** https://platform.openai.com
2. **Cliquez** "Sign up"
3. **Créez votre compte** avec email/mot de passe
4. **Vérifiez votre email**

### 2. Obtenir une clé API
1. **Connectez-vous** à https://platform.openai.com
2. **Allez dans** "API Keys" (https://platform.openai.com/api-keys)
3. **Cliquez** "Create new secret key"
4. **Nom** : `contracteasy-mvp`
5. **Copiez la clé** (elle ne sera affichée qu'une fois !)

### 3. Configurer les crédits
1. **Allez dans** "Billing" (https://platform.openai.com/account/billing)
2. **Ajoutez une méthode de paiement**
3. **Définissez une limite** (ex: $10/mois)
4. **Les premiers $5 sont gratuits**

### 4. Mettre à jour l'application
Créez un fichier `.env` dans le dossier `prototype/components/` :

```bash
# Configuration OpenAI
VITE_OPENAI_API_KEY=sk-your-api-key-here
```

### 5. Test de l'IA
1. **Démarrez l'application** : `npm run dev`
2. **Allez sur** `/editor`
3. **Cliquez** "💰 Clause Paiement"
4. **Vérifiez** que l'IA génère une clause

## 💰 Coûts estimés
- **GPT-3.5-turbo** : ~$0.002 par 1K tokens
- **Usage typique** : $1-5/mois pour 100 utilisateurs
- **Gratuit** : $5 de crédit au début

## 🔧 Configuration avancée
Pour utiliser xAI Grok (alternative) :

1. **Allez sur** https://console.x.ai
2. **Créez un compte**
3. **Obtenez une clé API**
4. **Ajoutez dans `.env`** :
```bash
VITE_XAI_API_KEY=xai-your-api-key-here
```

## 🛡️ Sécurité
- **Ne commitez jamais** votre clé API
- **Utilisez des variables d'environnement**
- **Limitez les requêtes** par utilisateur
- **Surveillez l'usage** dans la console OpenAI
