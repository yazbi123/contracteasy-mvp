# 🎉 ContractEasy MVP

**Plateforme de gestion automatisée des contrats pour PME**

## 🚀 Démo en ligne

[![Vercel](https://img.shields.io/badge/Deploy%20on%20Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)

## 📋 Fonctionnalités

### ✅ **Interface complète**
- 🏠 **Page d'accueil** : Interface professionnelle avec CTA
- 🔐 **Connexion/Inscription** : Authentification sécurisée
- 📊 **Tableau de bord** : Statistiques des contrats
- ✏️ **Éditeur** : Création de contrats
- ✍️ **Signatures** : Gestion des signatures électroniques

### 🎯 **Objectif**
Permettre aux PME de créer, signer et gérer des contrats en moins de 5 minutes avec une UX optimisée pour desktop et mobile.

## 🛠️ Technologies

- **Frontend** : React 18 + Vite
- **Styling** : Tailwind CSS
- **Routing** : React Router DOM
- **API Mock** : JSON Server
- **Build** : Vite (optimisé pour production)

## 🚀 Installation locale

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation
```bash
# Cloner le repository
git clone https://github.com/votre-username/contracteasy-mvp.git
cd contracteasy-mvp

# Installer les dépendances
npm install

# Démarrer l'API Mock
./start-api.sh

# Démarrer l'application (dans un autre terminal)
npm run dev
```

### URLs locales
- **Application** : http://localhost:5173
- **API Mock** : http://localhost:3001
- **Contrats** : http://localhost:3001/contracts
- **Templates** : http://localhost:3001/templates

## 📱 Fonctionnalités détaillées

### 🏠 Page d'accueil
- Interface professionnelle adaptée aux PME
- CTA "Essayer gratuitement"
- Design responsive (desktop + mobile)

### 🔐 Authentification
- Formulaire de connexion
- Formulaire d'inscription
- SSO (Google/Microsoft) - en préparation
- Conformité RGPD

### 📊 Tableau de bord
- Statistiques des contrats (actifs, en attente, signés)
- Graphiques de suivi
- Notifications d'échéance

### ✏️ Éditeur de contrats
- Création de contrats
- Templates prédéfinis
- Prévisualisation
- Sauvegarde automatique

### ✍️ Gestion des signatures
- Ajout de signataires
- Suivi des statuts
- Notifications automatiques
- Export PDF

## 🎨 Design System

### Couleurs
- **Primaire** : #3B82F6 (Bleu)
- **Succès** : #10B981 (Vert)
- **Alerte** : #EF4444 (Rouge)
- **Neutre** : #4B5563 (Gris)

### Typographie
- **Police** : Inter (moderne, lisible)
- **Tailles** : 16px (texte), 24px (titres)
- **Contraste** : WCAG ≥4.5:1

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel --prod
```

### Netlify
```bash
# Build
npm run build

# Déployer le dossier dist/
```

## 📊 API Endpoints

### Contrats
- `GET /contracts` - Liste des contrats
- `POST /contracts` - Créer un contrat
- `PUT /contracts/:id` - Modifier un contrat
- `DELETE /contracts/:id` - Supprimer un contrat

### Templates
- `GET /templates` - Liste des templates
- `POST /templates` - Créer un template

### Notifications
- `GET /notifications` - Liste des notifications

## 🔮 Roadmap

### Phase 1 (MVP) ✅
- [x] Interface utilisateur complète
- [x] Navigation entre pages
- [x] Design responsive
- [x] API Mock fonctionnelle

### Phase 2 (Production)
- [ ] Authentification réelle (Firebase Auth)
- [ ] Base de données (Supabase/Firebase)
- [ ] IA intégrée (OpenAI API)
- [ ] Signatures électroniques (DocuSign API)

### Phase 3 (Avancé)
- [ ] Notifications push
- [ ] Analytics avancées
- [ ] Intégrations tierces
- [ ] Mobile app (React Native)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit (`git commit -m 'Ajouter nouvelle fonctionnalité'`)
4. Push (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

MIT License - voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 📞 Contact

- **Email** :** contact@contracteasy.fr
- **Website** : https://contracteasy.fr
- **LinkedIn** : [ContractEasy](https://linkedin.com/company/contracteasy)

---

**Développé avec ❤️ pour simplifier la gestion des contrats pour les PME**