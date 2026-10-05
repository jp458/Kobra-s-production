# Kobra's Productions — site

Site statique (HTML/CSS/JS, sans build ni dépendance). Fonctionne tel quel sur
n'importe quel hébergeur statique ; ce dépôt est prêt pour GitHub + Vercel.

## Fichiers

- `index.html` — toutes les pages (une seule page, navigation en JavaScript via `#/...`)
- `style.css`, `app.js` — mise en forme et logique
- `vercel.json` — en-têtes de sécurité (CSP, anti-clickjacking, etc.)
- `robots.txt` — autorise l'indexation par les moteurs de recherche

## Mettre en ligne (GitHub → Vercel, gratuit)

1. Crée un nouveau dépôt sur GitHub et pousse ces fichiers :
   ```
   git init
   git add .
   git commit -m "Site Kobra's Productions"
   git branch -M main
   git remote add origin <URL_DU_DEPOT_GITHUB>
   git push -u origin main
   ```
2. Sur [vercel.com](https://vercel.com), *Add New → Project*, choisis ce dépôt GitHub.
3. Aucune configuration de build à indiquer (site statique) : laisse les champs
   « Build Command » et « Output Directory » vides, Vercel sert les fichiers tels quels.
4. Déploie. Vercel donne une adresse gratuite du type `kobras-productions.vercel.app`.
5. Chaque `git push` sur `main` republie automatiquement le site.

## Sécurité déjà en place

- **CSP stricte** : aucun script externe, aucun script en ligne autorisé
  (`script-src 'self'` seulement) — limite fortement les risques d'injection.
- Miniatures YouTube chargées uniquement depuis `i.ytimg.com` / `img.youtube.com`,
  seuls domaines externes autorisés pour les images.
- `X-Frame-Options: DENY` et `frame-ancestors 'none'` : le site ne peut pas être
  affiché dans un `<iframe>` sur un autre site (anti-clickjacking).
- `Strict-Transport-Security` : force le HTTPS pour toutes les visites suivantes.
- `Referrer-Policy` et `Permissions-Policy` restrictives, aucun tiers ne peut
  activer caméra, micro ou géolocalisation depuis cette page.
- Formulaire de devis encore **simulé** (aucune donnée envoyée nulle part) :
  `form-action 'none'` dans la CSP le rappelle. Le jour où il enverra un vrai
  mail ou passera par un service (Formspree, etc.), il faudra autoriser cette
  destination précise dans `vercel.json`.

## Reste à faire avant mise en ligne définitive

- Tarifs réels (actuellement `XX €`)
- Lien de « I AM » et bandes démo, dès qu'elles seront montées
- Couleur d'accent à valider avec la cliente (violet par défaut, sélecteur de test
  visible en bas à gauche du site — à retirer une fois le choix fait)
- Formulaire de devis à brancher sur un vrai envoi (mail ou service tiers)
