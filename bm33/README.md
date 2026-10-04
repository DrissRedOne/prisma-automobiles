# BM33 Automobiles : négociant automobile (Yvrac, Bordeaux Métropole)

Site vitrine de démonstration pour BM 33 (SASU, RCS Bordeaux 808 832 786) : stock de voitures d'occasion avec
filtres, une fiche par véhicule (galerie, visionneuse, prix, essai, WhatsApp prérempli), reprise, rachat et
dépôt-vente (estimation en trois étapes), recherche sur mesure, contact et rendez-vous, mentions légales, page 404.
Charte noir, blanc et chrome ; titres Archivo étendu, texte Inter, logo Michroma.

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

À faire valider par M. Baghdad (liste tenue à jour dans `source/content.py`, `A_VALIDER`) : nom commercial, logo
et couleurs ; stock réel, photos et prix ; services proposés (révision, carte grise, livraison, financement,
extension de garantie, dépôt-vente) et leurs conditions ; lieu de rendez-vous et horaires (le siège est une
domiciliation, d'où « sur rendez-vous ») ; téléphone, e-mail et WhatsApp affichés ; activité d'atelier ;
nom de domaine ; médiateur de la consommation ; inscription ORIAS avant toute mention de financement.
