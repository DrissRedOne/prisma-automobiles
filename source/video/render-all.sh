#!/bin/sh
# Rendus et encodages enchaînés : pub 16:9, pub 9:16, film de présentation.
# Les images déjà présentes sont conservées (supprimer celles à refaire avant de lancer).
cd "$(dirname "$0")"
node render.js --cut=pub --from=0 --to=900 --workers=2 --out=frames-pub && echo "RENDU PUB 16:9 OK"
./encode.sh pub && echo "ENCODAGE PUB 16:9 OK"
node render.js --cut=pub --format=vertical --from=0 --to=900 --workers=2 --out=frames-pub-v && echo "RENDU PUB 9:16 OK"
./encode.sh pub-v && echo "ENCODAGE PUB 9:16 OK"
node render.js --from=0 --to=1500 --workers=2 --out=frames && echo "RENDU FILM OK"
./encode.sh film && echo "ENCODAGE FILM OK"
echo "RENDUS TERMINÉS"
