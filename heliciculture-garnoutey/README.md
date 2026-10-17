# Héliciculture du Garnoutey : élevage d'escargots sous serre (Lugon-et-l'Île-du-Carnay, Gironde)

Site vitrine de démonstration pour HELICICULTURE DU GARNOUTEY (SASU, RCS Libourne 988 979 480).
Pages : accueil, l'élevage, nos escargots (produits, commande, questions, retrait), recettes (une page par recette), préparer des escargots vivants, combien d'escargots par personne (calculateur), contact et commande
(formulaire qui prépare un e-mail), mentions légales, page 404. Direction artistique « le temps de l'escargot » :
ivoire, mousse profonde et caramel des coquilles ; titres Instrument Serif, texte Manrope ; arches (la forme des
tunnels d'élevage) et spirale (la coquille, reprise dans le logo).

- `site/` : le site publié (HTML pré-rendu, lisible sans JavaScript).
- `source/` : contenus (`content.py`, seule source à modifier pour les textes, les produits, les recettes, les
  coordonnées), gabarits (`templates/`), styles et script (`assets/`), bibliothèques d'animation (`vendor/` : GSAP,
  ScrollTrigger, SplitText, Lenis), polices hébergées (`fonts/`, licence SIL OFL), photos et vidéos préparées
  (`img/`, `video/`), construction (`build.py`) et tests (`tests/`).
- `tools/` : étalonnage commun (`grade.py`), images tirées des films de l'élevage (`images_films.py`), photos
  (`photos.py`), vidéos en boucle (`videos.py` : stabilisation, léger ralenti, MP4 et WebM), logo (`logo.py`).
- `photos/wikimedia/index.json` : auteurs et licences des photos libres (plats, coquilles), repris dans les mentions légales.
- `deploy/installer-vps.sh` : installation sur un VPS avec nginx et mise à jour automatique depuis GitHub.

Les films et photos d'origine envoyés par l'éleveur ne sont pas publiés dans le dépôt (seulement leurs versions web).

Construire et publier : `./publier.sh "message"` (Python 3 avec Pillow, numpy et Jinja2 ; ffmpeg avec vidstab pour
les vidéos ; Node 22 et playwright-core pour les tests). Tests : `node source/tests/serve.js source/out/web 8844`,
puis `node source/tests/parcours.js`, `a11y.js`, `tailles.js`, `perf.js`, `shots.js`.

Sur un VPS : `curl -fsSL https://raw.githubusercontent.com/DrissRedOne/prisma-automobiles/main/heliciculture-garnoutey/deploy/installer-vps.sh | sudo bash`
(domaine par défaut garnoutey.reydenweb.fr, à faire pointer vers le VPS ; `--domaine NOM` pour un autre).

Le site est ouvert à Google depuis le 17/10/2026 : réglage `SITE['indexable']` dans `source/content.py` (True), repris
à chaque publication par `./publier.sh`. Le passer à False remet tout le site en `noindex`. Les mentions légales
(adresse du siège) et la page 404 restent toujours en `noindex`.

Référencement (17/10/2026) : un mot-clé par page, choisi d'après les suggestions réelles de Google ; une page par
recette (`/recettes/...`, générées depuis `RECIPES`), un guide `/preparer-des-escargots-vivants`, un calculateur
`/combien-d-escargots-par-personne` (même calcul dans `build.py` et `assets/main.js`). Mise en forme dans `content.py` :
`*mot*` en italique, `[texte](/adresse)` en lien interne (contrôlé à la construction). La construction signale les pages
qui reçoivent moins de 3 liens depuis le texte des autres pages. L'adresse technique heliciculture-garnoutey.vercel.app
redirige vers heliciculture.fr.

À faire valider par l'éleveur (liste tenue à jour dans `source/content.py`, `A_VALIDER`) : produits et formats,
prix, nourriture, ramassage à la main, commandes pour les fêtes, retrait et visites,
téléphone et e-mail affichés, photos d'illustration des plats, médiateur de la consommation.
Nom de domaine : heliciculture.fr (adresse par défaut de la construction).
