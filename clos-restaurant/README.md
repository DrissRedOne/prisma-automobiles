# CLOS : restaurant, bar et wine bar (Bordeaux Saint-Jean)

Site vitrine de démonstration pour CLOS, 78 rue Amédée Saint-Germain, 33800 Bordeaux.
Pages : accueil, la carte, bar à vins, privatisation (demande par e-mail), infos et réservation (plan du quartier,
FAQ), mentions légales, page 404. Réservation en ligne via TheFork.

- `site/` : le site publié par Vercel (projet `clos-restaurant`, dossier racine `clos-restaurant`).
- `source/` : contenus (`content.py`, seule source à modifier pour les textes, la carte, les prix, les coordonnées),
  gabarits (`templates/`), styles et script (`assets/`), bibliothèques d'animation (`vendor/` : GSAP, ScrollTrigger,
  SplitText, Lenis), polices hébergées (`fonts/`), photos préparées (`img/`), construction (`build.py`) et tests (`tests/`).
- `tools/` : préparation des photos (`photos.py` : étalonnage commun, tailles WebP), logo vectorisé (`logo/`),
  plan du quartier et itinéraire depuis la gare (`carte/`, données © contributeurs OpenStreetMap, ODbL).

Construire et publier : `./publier.sh "message"` (Python 3 avec Pillow et Jinja2 ; Node 22 et playwright-core pour les tests).
Tests : `node source/tests/serve.js source/out/web 8811`, puis `node source/tests/parcours.js`, `a11y.js`, `tailles.js`, `perf.js`.

Le site reste en `noindex` tant que le restaurant n'a pas validé le contenu. Ensuite : `python3 source/build.py --publier --indexer`
avec `CLOS_SITE_URL=https://www.clos-restaurant.com` une fois le domaine branché (garder les enregistrements MX d'IONOS).

À faire valider par le restaurant : horaires, numéro à afficher, vraies photos (celles du site sont des photos
d'illustration libres, créditées dans les mentions légales), carte complète et boissons, conditions de privatisation,
texte exact des avis cités, mention des fondateurs, accès au domaine.
