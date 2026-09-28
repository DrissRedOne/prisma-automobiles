# Film de présentation PRISMA AUTOMOBILES

Film de 50 s en 1920 × 1080, 30 images par seconde, entièrement généré par code :
3D temps réel (three.js), typographie HTML, musique et bruitages synthétisés.

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
4. `node render.js --workers=2` : rendu image par image dans `frames/` (reprise possible) ;
5. `python3 music.py out/music.wav` puis `./encode.sh` : MP4 haute qualité et version légère dans `out/`.

Outils de travail : `node preview.js 4.0 12.5 --mb=1` (quelques images) et
`node review.js --step=0.5` (planches contact du film entier).

## Organisation

- `compo.html`, `compo.js` : page de composition, ligne de temps, transitions, étalonnage ;
- `lib/core.js` : moteur de rendu (HDR, flou de bouge par sous-images, bloom, ACES, grain) ;
- `lib/prism.js` : le P du logo en 3D ; `lib/devices.js` : téléphone, écran, particules ;
- `scenes/*.js` et `scenes.js` : les scènes et le montage ; `ui.js`, `ui.css` : textes à l'écran ;
- `music.py` : musique (120 BPM, une mesure = 2 s = un plan) et bruitages calés sur l'image.

Les données visibles dans l'interface (clients, réservations, montants) sont celles de la démonstration.
Photos des véhicules : Wikimedia Commons, licences CC BY-SA, CC BY et CC0 (auteurs crédités en fin de film).
Polices : Michroma et Inter (licence SIL Open Font).
