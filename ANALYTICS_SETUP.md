# 📊 Configuration Google Analytics pour ContractEasy

## 📋 Étapes détaillées

### 1. Créer un compte Google Analytics
1. **Allez sur** https://analytics.google.com
2. **Cliquez** "Commencer la mesure"
3. **Créez un compte** :
   - **Nom du compte** : `ContractEasy Analytics`
   - **Nom de la propriété** : `ContractEasy MVP`
   - **URL du site web** : `https://votre-domaine.vercel.app`
   - **Industrie** : Logiciels et technologie
   - **Fuseau horaire** : Europe/Paris

### 2. Obtenir l'ID de mesure
1. **Dans Google Analytics** → "Administration"
2. **Sélectionnez votre propriété**
3. **Onglet "Flux de données"**
4. **Cliquez** "Ajouter un flux" → "Web"
5. **Copiez l'ID de mesure** (format : G-XXXXXXXXXX)

### 3. Configurer les événements
1. **Allez dans** "Événements" → "Événements personnalisés"
2. **Créez ces événements** :
   - `user_registration`
   - `user_login`
   - `contract_created`
   - `contract_signed`
   - `ai_generation`
   - `pdf_export`

### 4. Mettre à jour l'application
Ajoutez dans votre fichier `.env` :

```bash
# Configuration Google Analytics
VITE_GA_ID=G-XXXXXXXXXX
```

### 5. Test des analytics
1. **Démarrez l'application** : `npm run dev`
2. **Naviguez** dans l'application
3. **Vérifiez** dans Google Analytics → "Temps réel"
4. **Vous devriez voir** les événements en direct

## 📈 Métriques importantes
- **Utilisateurs actifs** : Nombre d'utilisateurs connectés
- **Taux de conversion** : Inscriptions / Visiteurs
- **Engagement** : Temps passé sur l'application
- **Fonctionnalités populaires** : Quelles features sont utilisées

## 🔧 Configuration avancée
Pour des métriques business :

1. **Créez des objectifs** :
   - Inscription d'utilisateur
   - Création de contrat
   - Export PDF

2. **Configurez des audiences** :
   - Utilisateurs actifs
   - Utilisateurs qui exportent des PDFs
   - Utilisateurs qui utilisent l'IA

3. **Définissez des rapports** :
   - Tableau de bord personnalisé
   - Rapports d'utilisation des fonctionnalités
   - Métriques de rétention

## 🛡️ Conformité RGPD
- **Anonymisez les IPs** : Activé par défaut
- **Consentement** : Ajoutez un banner de cookies
- **Données personnelles** : Ne trackez que les actions, pas les contenus
- **Durée de conservation** : 26 mois par défaut
