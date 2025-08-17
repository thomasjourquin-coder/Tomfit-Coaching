# TomFit Coaching - Site Web Professionnel

Site vitrine complet pour coaching sportif personnalisé avec design moderne, responsive et optimisé SEO.

## 🚀 Fonctionnalités

- **Design responsive** : Mobile-first, couleurs rouge/noir/blanc
- **Navigation fluide** : Menu hamburger mobile, scroll doux
- **Formulaire de contact** : Validation front-end, simulation d'envoi
- **Système d'avis** : Notes étoiles, stockage localStorage, modération
- **Galerie interactive** : Lightbox, lazy loading, placeholders photos/vidéos
- **Conformité RGPD** : Bannière cookies, mentions légales, politique confidentialité
- **SEO optimisé** : Balises meta, JSON-LD, Open Graph, sitemap
- **Accessibilité** : WAI-ARIA, contrastes AA, navigation clavier

## 📁 Structure des fichiers

```
tomfit-coaching-site/
├── index.html              # Page d'accueil
├── seances-tarifs.html     # Tarifs et packages
├── galerie.html           # Photos et vidéos
├── avis.html              # Témoignages clients  
├── contact.html           # Formulaire de contact
├── mentions-legales.html  # Mentions légales
├── politique-confidentialite.html # RGPD
├── style.css              # Styles principaux
├── app.js                 # JavaScript fonctionnel
└── README.md              # Documentation
```

## ⚙️ Déploiement rapide

### Option 1: GitHub Pages (Gratuit)
1. Créer un repository GitHub
2. Upload des fichiers via GitHub Desktop ou interface web
3. Activer GitHub Pages dans Settings > Pages
4. Le site sera accessible à `username.github.io/repository-name`

### Option 2: Netlify (Gratuit avec domaine personnalisé)
1. Zipper tous les fichiers
2. Aller sur [netlify.com](https://netlify.com)
3. Drag & drop le zip sur Netlify
4. Site déployé instantanément avec URL temporaire
5. Connecter un domaine personnalisé si souhaité

### Option 3: Autres hébergeurs
Compatible avec tout hébergeur de fichiers statiques :
- Vercel, Surge.sh, Firebase Hosting
- Hébergeurs traditionnels (OVH, Ionos, etc.)

## 🛠️ Personnalisation

### Contenu à modifier

**Mentions légales (mentions-legales.html)** :
```html
<!-- À COMPLÉTER -->
<p><strong>N° d'entreprise :</strong> [Votre numéro d'entreprise]</p>
<p><strong>N° TVA :</strong> [Si applicable]</p>
<p><strong>Hébergeur :</strong> [Nom hébergeur], [Adresse], [Téléphone]</p>
```

**Contact (contact.html)** :
- Remplacer le placeholder Google Maps par vraie carte
- Configurer l'envoi du formulaire avec un service (Formspree, Netlify Forms)

**Galerie (galerie.html)** :
- Remplacer les images placeholder par vraies photos
- Ajouter liens YouTube/Vimeo pour les vidéos

### Couleurs et design (style.css)

Variables CSS à modifier si besoin :
```css
:root {
  --color-primary: #C0152F;    /* Rouge principal */
  --color-secondary: #1F2121;  /* Noir/charcoal */
  --color-accent: #FF5459;     /* Rouge accent */
}
```

## 📈 Optimisations SEO

**Images** :
- Compresser toutes les images (WebP recommandé)
- Ajouter attributs `alt` descriptifs
- Tailles optimales : 1200x800px pour bannières, 600x400px pour galerie

**Contenu** :
- Personnaliser les méta-descriptions de chaque page
- Ajouter votre ville/région dans les titres pour SEO local
- Créer un sitemap.xml si besoin

**Analytics** :
- Ajouter Google Analytics 4
- Configurer Google Search Console
- Suivre les conversions (formulaires, clics téléphone)

## 🔧 Fonctionnalités JavaScript

**Avis clients** :
- Stockage localStorage (données perdues si cache vidé)
- Pour persistence vraie : utiliser Airtable, Firebase ou backend

**Formulaire contact** :
- Actuellement en simulation
- Pour envoi réel : intégrer Formspree, EmailJS ou Netlify Forms

**Cookies** :
- Bannière basique conforme RGPD
- Pour analytics : ajouter Google Analytics avec consentement

## 📱 Tests recommandés

**Performance** :
- PageSpeed Insights Google
- GTmetrix pour temps de chargement
- Test sur différents appareils/navigateurs

**Accessibilité** :
- WAVE Web Accessibility Evaluator
- Test navigation au clavier uniquement
- Vérification contrastes

**SEO** :
- Google Search Console après mise en ligne
- Test des rich snippets
- Vérification mobile-friendly

## 🚨 À faire avant mise en ligne

1. **Compléter mentions légales** avec vraies informations légales
2. **Configurer l'envoi de formulaire** avec service tiers
3. **Ajouter vraies photos/vidéos** dans la galerie
4. **Tester sur mobile et desktop** - différents navigateurs
5. **Optimiser images** pour vitesse de chargement
6. **Configurer domaine personnalisé** (ex: tomfitcoaching.be)
7. **Ajouter Google Analytics** pour suivi
8. **Sauvegarder régulièrement** le site complet

## 🎯 Prochaines améliorations possibles

- **Réservation en ligne** : intégration Calendly ou système custom
- **Blog/actualités** : section conseils fitness
- **Espace client** : suivi des séances, programmes
- **Paiement en ligne** : Stripe, PayPal pour les packages
- **Chat en direct** : support client instantané

## 📞 Support

Pour questions techniques sur le site :
- Modifier le contenu : éditer directement les fichiers HTML
- Problèmes CSS : vérifier le fichier style.css
- Bugs JavaScript : consulter la console navigateur (F12)

Site créé avec HTML5, CSS3, JavaScript vanilla - aucune dépendance externe complexe.

## 📝 Licence

Site créé pour TomFit Coaching. Libre modification pour usage personnel.