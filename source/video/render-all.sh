#!/bin/sh
# Rendus enchaînés : pub 16:9, pub 9:16, puis reprise du film de présentation.
cd "$(dirname "$0")"
node render.js --cut=pub --from=0 --to=900 --workers=2 --out=frames-pub
node render.js --cut=pub --format=vertical --from=0 --to=900 --workers=2 --out=frames-pub-v
node render.js --from=0 --to=1500 --workers=2 --out=frames
echo "RENDUS TERMINÉS"
