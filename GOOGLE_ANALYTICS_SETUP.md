# 📊 Configuration Google Analytics pour ContractEasy

## 📋 Étapes détaillées

### 1. Créer un compte Google Analytics
1. **Allez sur** [https://analytics.google.com](https://analytics.google.com)
2. **Cliquez** sur "Commencer la mesure" ou "Créer un compte"
3. **Remplissez** le formulaire d'inscription
4. **Acceptez** les conditions d'utilisation

### 2. Créer une propriété
1. **Nom du compte** : "ContractEasy" (ou votre nom d'entreprise)
2. **Nom de la propriété** : "ContractEasy MVP"
3. **URL du site** : `http://localhost:5173` (pour le développement)
4. **Industrie** : "Technologie" ou "Services professionnels"
5. **Fuseau horaire** : "Europe/Paris"
6. **Devise** : "Euro (€)"

### 3. Obtenir l'ID de mesure
1. **Après la création**, vous verrez l'ID de mesure
2. **Format** : `G-XXXXXXXXXX` (commence par G-)
3. **Copiez** cet ID précieusement
4. **Exemple** : `G-ABC123DEF4`

### 4. Ajouter l'ID dans votre projet
1. **Ouvrez** le fichier `.env` dans votre projet
2. **Remplacez** `your_ga_id_here` par votre vrai ID
3. **Exemple** : `VITE_GA_ID=G-ABC123DEF4`
4. **Sauvegardez** le fichier

### 5. Redémarrer l'application
```bash
# L'application va redémarrer automatiquement
# Google Analytics sera activé
```

## 📊 Fonctionnalités Analytics disponibles

### Suivi automatique
- **Pages vues** - Nombre de visites sur chaque page
- **Sessions** - Temps passé sur l'application
- **Utilisateurs** - Nombre d'utilisateurs uniques
- **Taux de rebond** - Pourcentage de visites courtes

### Événements personnalisés (déjà configurés)
- **Connexion utilisateur** - Quand un utilisateur se connecte
- **Création de contrat** - Quand un contrat est créé
- **Export PDF** - Quand un PDF est généré
- **Utilisation IA** - Quand l'IA est utilisée
- **Erreurs** - Suivi des erreurs système

## 🔧 Configuration avancée (optionnel)

### Filtres de développement
1. **Allez** dans "Administration" > "Filtres"
2. **Créez** un filtre pour exclure le trafic local
3. **Nom** : "Exclure localhost"
4. **Type** : "Pré-défini"
5. **Sélectionnez** : "Exclure le trafic d'adresses IP"

### Objectifs de conversion
1. **Allez** dans "Administration" > "Objectifs"
2. **Créez** des objectifs pour :
   - Inscription d'utilisateur
   - Création de premier contrat
   - Export PDF réussi

## 📈 Métriques importantes à surveiller

### Pour le MVP
- **Taux de conversion** - Visiteurs → Utilisateurs inscrits
- **Engagement** - Temps passé dans l'éditeur
- **Fonctionnalités populaires** - Quelles pages sont les plus visitées
- **Erreurs** - Problèmes techniques à résoudre

### Tableaux de bord recommandés
- **Vue d'ensemble** - Métriques principales
- **Comportement** - Parcours utilisateur
- **Acquisition** - Sources de trafic
- **Conversions** - Objectifs atteints

## 🚨 Important

- **Données en temps réel** - Peuvent prendre 24-48h à apparaître
- **Mode développement** - Les données localhost peuvent être limitées
- **RGPD** - Assurez-vous de respecter les réglementations
- **Anonymisation** - Les IPs sont automatiquement anonymisées

## 📞 Support

Si vous avez des problèmes :
- **Documentation GA4** : [https://support.google.com/analytics](https://support.google.com/analytics)
- **Vérification** : Utilisez l'extension "Google Analytics Debugger"
- **Test** : Vérifiez que les événements sont envoyés dans la console
