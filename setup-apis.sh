#!/bin/bash

echo "🚀 Configuration des APIs pour ContractEasy MVP"
echo "================================================"

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Installez Node.js 18+ d'abord."
    exit 1
fi

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé. Installez npm d'abord."
    exit 1
fi

echo "✅ Node.js et npm sont installés"

# Créer le fichier .env s'il n'existe pas
if [ ! -f .env ]; then
    echo "📝 Création du fichier .env..."
    cp env.local .env
    echo "✅ Fichier .env créé"
else
    echo "⚠️  Le fichier .env existe déjà"
fi

echo ""
echo "🔧 Configuration requise :"
echo "=========================="
echo ""
echo "1. 🔥 FIREBASE :"
echo "   - Allez sur https://console.firebase.google.com"
echo "   - Créez un projet 'contracteasy-mvp'"
echo "   - Activez Authentication (Email/Password)"
echo "   - Activez Firestore Database"
echo "   - Copiez la configuration dans .env"
echo ""
echo "2. 🤖 OPENAI :"
echo "   - Allez sur https://platform.openai.com"
echo "   - Créez un compte et obtenez une clé API"
echo "   - Ajoutez VITE_OPENAI_API_KEY dans .env"
echo ""
echo "3. 📊 GOOGLE ANALYTICS :"
echo "   - Allez sur https://analytics.google.com"
echo "   - Créez une propriété pour votre site"
echo "   - Copiez l'ID de mesure (G-XXXXXXXXXX)"
echo "   - Ajoutez VITE_GA_ID dans .env"
echo ""
echo "4. 🚀 DÉPLOIEMENT :"
echo "   - Configurez les variables d'environnement sur Vercel"
echo "   - Déployez avec 'npm run build'"
echo ""

# Vérifier les dépendances
echo "📦 Vérification des dépendances..."
if [ ! -d "node_modules" ]; then
    echo "📥 Installation des dépendances..."
    npm install
else
    echo "✅ Dépendances déjà installées"
fi

echo ""
echo "🎯 Prochaines étapes :"
echo "======================"
echo "1. Configurez les APIs selon les guides ci-dessus"
echo "2. Testez l'application : npm run dev"
echo "3. Déployez sur Vercel : npm run build"
echo ""
echo "📚 Guides détaillés :"
echo "- Firebase : FIREBASE_SETUP_COMPLETE.md"
echo "- OpenAI : OPENAI_SETUP.md"
echo "- Analytics : ANALYTICS_SETUP.md"
echo ""
echo "🎉 Configuration terminée !"
