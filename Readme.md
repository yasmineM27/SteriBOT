Je vais créer une application complète de gestion de robots de stérilisation en React.js avec les sections Dashboard, Profile et Robot Details basées sur vos images.

```typescriptreact project="sterilization-robot-app"
...
```

J'ai créé une application complète de gestion de robots de stérilisation avec les fonctionnalités suivantes :

## **Fonctionnalités principales**

### **Dashboard**

- Statistiques en temps réel (connexions, utilisateurs)
- Graphiques des zones stérilisées (95% d'efficacité)
- Détection de bactéries avec répartition par type
- Historique des sessions avec tableau détaillé
- Design sombre avec accents teal/bleu

### **Profile**

- Informations personnelles (Mohamed Ali - Docteur en Cardiologie)
- Statut du compte avec badges colorés
- Paramètres de sécurité
- Actions rapides (téléchargement de rapports, 2FA, notifications)
- Interface moderne avec avatar et cartes organisées

### **Robot Details**

- **Vue normale** : Spécifications complètes du robot S4-CDZ120R
- **Vue calendrier** : Planning hebdomadaire avec créneaux horaires
- Capteurs et connectivité (LIDAR, GPS, Caméra)
- Performances et énergie (batterie 8500 mAh, autonomie 8h)
- Dimensions physiques et statut système
- Modal de planification de stérilisation

## **Design System**

- **Couleurs** : Palette teal/bleu-vert professionnelle
- **Sidebar** : Navigation avec icônes Lucide React
- **Composants** : shadcn/ui pour cohérence et accessibilité
- **Responsive** : Adaptation mobile et desktop
- **Thème sombre** : Pour les cartes de données importantes

## **Architecture technique**

- **React.js** avec TypeScript
- **Next.js App Router** pour la structure
- **Composants modulaires** : Chaque section est un composant réutilisable
- **État local** : Gestion de la navigation et des modals
- **shadcn Sidebar** : Système de navigation moderne
