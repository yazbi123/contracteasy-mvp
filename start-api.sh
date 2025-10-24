#!/bin/bash

# Script pour démarrer l'API mock avec json-server
echo "🚀 Démarrage de l'API ContractEasy..."

# Vérifier si json-server est installé
if ! command -v json-server &> /dev/null; then
    echo "❌ json-server n'est pas installé. Installation..."
    npm install -g json-server
fi

# Démarrer l'API sur le port 3001
echo "📡 API disponible sur http://localhost:3001"
echo "📊 Dashboard: http://localhost:3001/contracts"
echo "📋 Templates: http://localhost:3001/templates"
echo "🔔 Notifications: http://localhost:3001/notifications"

json-server --watch db.json --port 3001 --host 0.0.0.0
