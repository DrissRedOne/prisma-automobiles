# Les Délices de Yanis : site de démonstration

Site de commande en ligne pour Les Délices de Yanis (26 rue du Palais Gallien, 33000 Bordeaux) :
carte avec options (tailles, viandes, sauces, menus), panier, livraison par code postal, code promo,
commande et suivi en direct, application installable (PWA), écran cuisine avec commandes en direct,
tableau de bord, ruptures et prix, réglages. Démonstration sans serveur : les données restent dans le navigateur.

- `site/` : le site publié par Vercel (projet `delices-de-yanis`, dossier racine `delices-de-yanis`).
- `source/` : les sources (`src/`), les photos des plats (`photos/`), la construction (`build.py`, `prerender.js`),
  les icônes (`pwa_assets.js`) et les tests (`tests/`).

Construire et publier : `cd source && python3 build.py --publier` (Python 3 avec Pillow, Node 22 et playwright-core).
Tests : `node tests/serve.js out/web 8791` puis `node tests/parcours.js`.

Espace restaurant : `/cuisine`. Le site reste en `noindex` tant que le restaurant n'a pas validé le contenu
(carte, prix, horaires, photos) : ensuite `python3 build.py --publier --indexer`.
