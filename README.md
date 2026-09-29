# PRISMA AUTOMOBILES : application de location

Site client (réservation, paiement, espace client) et logiciel du loueur (réservations, planning, flotte, clients, tarifs), en démonstration.

- **En ligne** : https://prisma-automobiles.vercel.app. Vercel publie automatiquement chaque envoi sur `main`.
- **Installable** (PWA) : depuis Chrome sur Android, menu ⋮ puis « Installer l'application » ; depuis Safari sur iPhone, Partager puis « Sur l'écran d'accueil ». L'appli fonctionne ensuite hors connexion.
- Les données de démonstration restent dans le navigateur (aucun serveur).

## Achat, vente et dépôt-vente

- Vitrine des véhicules à vendre (`/vehicules-occasion`) avec filtres et tri, fiche par annonce
  (`/vehicule-occasion/…`), demande d'information, de rendez-vous ou de réservation avec reprise éventuelle.
- Pages dépôt-vente, rachat, achat-vente et guide des démarches de vente.
- Logiciel du loueur, rubrique **Ventes** : ajout et modification des annonces, photo, statut (disponible,
  réservé, vendu), stock de l'agence ou dépôt-vente, demandes reçues par annonce.
- Les annonces livrées avec la démonstration sont des exemples (`seedSales` dans `source/src/sales.js`) ;
  leurs photos viennent de Wikimedia Commons (`integrate_sale_photos.py`, crédits sur chaque annonce).

## Référencement (SEO)

Chaque page publique est un vrai fichier HTML pré-rendu, lisible par Google sans exécuter le JavaScript :
accueil, catalogue, 19 pages de location (voiture, utilitaire, camion de déménagement, minibus, SUV,
électrique, gare Saint-Jean, aéroport de Mérignac, Yvrac, rive droite…), 11 fiches véhicules,
9 guides pratiques, FAQ, conditions de location, points de retrait, professionnels, contact.
Chaque page a son title, sa description, son adresse canonique, ses données structurées
(AutoRental, Product/Car, FAQPage, Article, BreadcrumbList), son image de partage 1200 x 630,
et figure dans `sitemap.xml` et `llms.txt`.

**Le site n'est pas indexé** (balise et en-tête `noindex`) tant qu'il est en démonstration.
Pour l'ouvrir à Google, une fois le site validé, les réservations réelles et le nom de domaine en place :

```bash
cd source
PRISMA_SITE_URL=https://www.nom-de-domaine.fr python3 build.py --indexer --publier
```

Les textes sont dans `source/seo/content/*.js` (cahier des charges : `source/seo/BRIEF.md`),
les gabarits des pages dans `source/src/seo.js`.

## Dossiers

- `site/` : le site publié. Ne pas le modifier à la main, c'est le résultat de la construction.
- `source/` : les sources, les textes, les icônes et les tests.

## Modifier et publier

```bash
cd source
python3 build.py --publier   # reconstruit, pré-rend les pages, puis remplace site/ et vercel.json
```

Python 3 avec Pillow, Node.js et `playwright-core` (pré-rendu des pages et images de partage :
`cd source/tests && npm install`). `pwa_assets.py` (icônes, écrans de démarrage) demande aussi numpy et scipy.
La construction produit aussi `source/out/PRISMA-AUTOMOBILES-application.html`, la version en un seul
fichier qui s'ouvre d'un double-clic (adresses en « # »).

## Tests

- Parcours complet (Playwright, Chromium) : `cd source/tests && node parcours.js ordi` (puis `mobile`) sur le
  fichier unique ; `PRISMA_URL=http://127.0.0.1:8790 node parcours.js ordi` sur le site construit, servi par
  `node serve.js` (serveur local qui imite Vercel).
- Contrôle SEO des pages construites : `node tests/seo-audit.js` (title, description, H1, canonical,
  données structurées, liens internes, plan du site).
- Application installable : `node pwa.js` et `node pwa-install.js` ; débordements : `node overflow.js`.

Les photos des véhicules viennent de Wikimedia Commons (licences Creative Commons) ; les crédits sont dans l'application, pied de page, « Crédits photos ».
