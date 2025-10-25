# 🤖 Configuration OpenAI pour ContractEasy

## 📋 Étapes détaillées

### 1. Créer un compte OpenAI
1. **Allez sur** [https://platform.openai.com](https://platform.openai.com)
2. **Cliquez** sur "Sign up" (ou "Log in" si vous avez déjà un compte)
3. **Remplissez** le formulaire d'inscription
4. **Vérifiez** votre email

### 2. Obtenir une clé API
1. **Connectez-vous** à votre compte OpenAI
2. **Allez** dans le menu de gauche → "API Keys"
3. **Cliquez** sur "Create new secret key"
4. **Donnez un nom** à votre clé (ex: "ContractEasy MVP")
5. **Copiez** la clé API (elle commence par `sk-...`)
6. **⚠️ Important** : Sauvegardez cette clé, elle ne sera plus visible !

### 3. Ajouter la clé dans votre projet
1. **Ouvrez** le fichier `.env` dans votre projet
2. **Remplacez** `your_openai_api_key_here` par votre vraie clé
3. **Sauvegardez** le fichier

### 4. Redémarrer l'application
```bash
# L'application va redémarrer automatiquement
# Les nouvelles variables d'environnement seront chargées
```

## 💰 Coûts OpenAI

### Plan gratuit
- **$5 de crédit** offert pour les nouveaux comptes
- **Suffisant** pour tester ContractEasy pendant plusieurs semaines

### Plan payant
- **$0.002/1K tokens** pour GPT-3.5-turbo
- **~$0.01-0.05** par génération de clause
- **Très économique** pour un MVP

## 🔧 Test de la configuration

Une fois configuré, testez dans ContractEasy :
1. **Allez** dans l'éditeur de contrats
2. **Cliquez** sur "🤖 Éditeur IA"
3. **Essayez** de générer une clause
4. **Vérifiez** que l'IA répond

## 🚨 Sécurité

- **Ne committez jamais** votre fichier `.env` sur GitHub
- **Gardez** votre clé API secrète
- **Utilisez** des variables d'environnement en production

## 📞 Support

Si vous avez des problèmes :
- **Documentation OpenAI** : [https://platform.openai.com/docs](https://platform.openai.com/docs)
- **Limites de taux** : Vérifiez votre usage dans le dashboard
- **Erreurs** : Vérifiez que votre clé est correcte
