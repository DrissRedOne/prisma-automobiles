# BM33 Automobiles : petit garage et voitures d'occasion (Yvrac, Bordeaux rive droite)

Site vitrine de démonstration pour BM 33 (SASU, RCS Bordeaux 808 832 786), positionné en petit garage indépendant :
atelier toutes marques (entretien, freinage, pneus, mécanique, diagnostic, climatisation, carrosserie, préparation au
contrôle technique) avec demande de devis en trois étapes, un petit stock de voitures d'occasion (fiches avec galerie,
prix, essai, WhatsApp prérempli) et recherche sur demande, reprise, rachat et dépôt-vente, contact et rendez-vous,
mentions légales, page 404. Charte noir, blanc et chrome ; titres Archivo étendu, texte Inter, logo Michroma.

- `site/` : le site publié (HTML pré-rendu, lisible sans JavaScript).
- `source/` : contenus (`content.py`, seule source à modifier pour les textes, le stock, les prix, les coordonnées),
  gabarits (`templates/`), styles et script (`assets/`), polices hébergées (`fonts/`), photos préparées (`img/`),
  construction (`build.py`) et tests (`tests/`).
- `tools/` : préparation des photos (`photos.py` : plaque « BM33 », détourage de la vue avant, tailles WebP),
  logo vectorisé (`logo/`).
- `photos/` : crédits des photos d'origine (`credits.json`) et position des plaques (`plaques.json`).
- `deploy/installer-vps.sh` : installation sur un VPS avec nginx et mise à jour automatique depuis GitHub.

Construire et publier : `./publier.sh "message"` (Python 3 avec Pillow, Jinja2 et numpy ; rembg pour le détourage ;
Node 22 et playwright-core pour les tests). Tests : `node source/tests/serve.js source/out/web 8833`, puis
`node source/tests/parcours.js`, `a11y.js`, `tailles.js`, `perf.js`.

Sur un VPS : `curl -fsSL https://raw.githubusercontent.com/DrissRedOne/prisma-automobiles/main/bm33/deploy/installer-vps.sh | sudo bash`
(domaine par défaut bm33.reydenweb.fr, à faire pointer vers le VPS ; `--domaine NOM` pour un autre).

Le site reste en `noindex` tant que M. Baghdad n'a pas validé le contenu. Ensuite :
`BM33_SITE_URL=https://www.bm33-automobiles.fr python3 source/build.py --publier --indexer`.

Le stock affiché est un stock d'exemple : vraies photos publiées sur Wikimedia Commons sous licence libre
(CC BY, CC BY-SA), plaques remplacées par une plaque « BM33 », crédits dans les mentions légales.

À faire valider par M. Baghdad (liste tenue à jour dans `source/content.py`, `A_VALIDER`) : prestations réellement
assurées à l'atelier, adresse de l'atelier et des essais (le siège est une domiciliation, d'où « sur rendez-vous »),
taux horaire et tarifs, stock réel, photos et prix, conditions de reprise et de dépôt-vente, coordonnées affichées,
nom commercial, logo et couleurs, nom de domaine, médiateur de la consommation.
