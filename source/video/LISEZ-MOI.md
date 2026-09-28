# Films PRISMA AUTOMOBILES : pub et présentation

Entièrement générés par code : 3D temps réel (three.js), typographie HTML, musique et
bruitages synthétisés. 30 images par seconde.

| Montage | Durée | Formats | Pour |
|---|---|---|---|
| **pub** (`?cut=pub`) | 30 s | 1920 × 1080 et 1080 × 1920 (`&format=vertical`) | publicité : réseaux sociaux, site, écrans |
| **film** (par défaut) | 50 s | 1920 × 1080 | présentation complète, y compris le logiciel du loueur |

La pub : logo 3D (0 à 6 s), la flotte en showroom (6 à 14 s), la réservation dans
l'application jusqu'à la confirmation (14 à 22 s), logo, slogan et appel à l'action (22 à 30 s).
En vertical, les textes restent dans la zone visible des Reels, Stories et TikTok.

## Déroulé

| Temps | Scène |
|---|---|
| 0 à 8 s | Les facettes du P arrivent et s'assemblent, faisceau et spectre, wordmark du logo d'origine |
| 8 à 16 s | Showroom : Clio V, Tesla Model 3, Mercedes GLC, puis les utilitaires de 3 à 20 m³ |
| 16 à 28 s | Application client dans un téléphone 3D : réservation en 4 étapes, jusqu'à la confirmation |
| 28 à 40 s | Logiciel du loueur : tableau de bord, planning, flotte, contrat et facture |
| 40 à 44 s | Application installable depuis le site, même hors connexion |
| 44 à 50 s | Logo, slogan « Un autre regard sur l'automobile », coordonnées, crédits photos |

## Refaire le film

Depuis `source/` : `python3 build.py`, puis dans `source/video/` :

1. `node capture.js` : captures de l'application (téléphone et ordinateur) ;
2. `python3 prepare.py` : véhicules détourés et textures ;
3. `python3 -m http.server 8766 --directory ..` (dans un autre terminal) ;
4. rendu image par image (reprise possible) :
   `node render.js --cut=pub --to=900 --out=frames-pub` (pub 16:9),
   `node render.js --cut=pub --format=vertical --to=900 --out=frames-pub-v` (pub 9:16),
   `node render.js --out=frames` (film) ; ou tout d'un coup : `./render-all.sh` ;
5. `./encode.sh pub`, `./encode.sh pub-v`, `./encode.sh film` : MP4 haute qualité et version légère dans `out/`
   (la musique est générée au besoin par `python3 music.py out/music-pub.wav pub`).

Outils de travail : `node preview.js 4.0 12.5 --mb=1 [--cut=pub] [--format=vertical]` (quelques images)
et `node review.js --step=0.5 [--cut=pub] [--format=vertical]` (planches contact du montage entier).

## Organisation

- `compo.html`, `compo.js` : page de composition, ligne de temps, transitions, étalonnage ;
- `lib/core.js` : moteur de rendu (HDR, flou de bouge par sous-images, bloom, ACES, grain) ;
- `lib/prism.js` : le P du logo en 3D ; `lib/devices.js` : téléphone, écran, particules ;
- `timing.js` : les repères de temps des deux montages ; `scenes/*.js` et `scenes.js` : les scènes et le montage ;
- `ui.js`, `ui.css` : textes à l'écran (mises en page horizontale et verticale) ;
- `music.py` : musique (120 BPM, une mesure = 2 s = un plan) et bruitages calés sur l'image.

Les données visibles dans l'interface (clients, réservations, montants) sont celles de la démonstration.
Photos des véhicules : Wikimedia Commons, licences CC BY-SA, CC BY et CC0 (auteurs crédités en fin de film).
Polices : Michroma et Inter (licence SIL Open Font).
