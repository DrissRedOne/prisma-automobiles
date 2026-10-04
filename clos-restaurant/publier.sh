#!/bin/bash
# Construit le site, le copie dans le dépôt de démonstration (dossier clos-restaurant) et l'envoie sur GitHub.
# Usage : ./publier.sh "Message du commit"
set -euo pipefail
SRC=/home/user/clos-restaurant
DEST=/home/user/prisma-automobiles/clos-restaurant
# garde-fou : une autre session peut publier dans le même dépôt ; on récupère sa version et on refuse
# d'écraser des sources modifiées sur GitHub depuis notre dernière publication (à reprendre d'abord ici)
git -C /home/user/prisma-automobiles pull -q --ff-only origin main
if [ -f "$SRC/.publie" ] && ! git -C /home/user/prisma-automobiles diff --quiet "$(cat "$SRC/.publie")" HEAD -- clos-restaurant/source clos-restaurant/tools clos-restaurant/deploy; then
  echo "ARRÊT : les sources ont changé sur GitHub depuis la dernière publication :"
  git -C /home/user/prisma-automobiles diff --stat "$(cat "$SRC/.publie")" HEAD -- clos-restaurant/source clos-restaurant/tools clos-restaurant/deploy
  echo "Reprendre ces changements dans $SRC, puis : git -C /home/user/prisma-automobiles rev-parse HEAD > $SRC/.publie"
  exit 1
fi
cd "$SRC/source" && python3 build.py --publier
rm -rf "$DEST"
mkdir -p "$DEST/tools/logo" "$DEST/tools/carte" "$DEST/tools/ttf" "$DEST/photos/originaux" "$DEST/photos/wikimedia" "$DEST/build"
cp -r "$SRC/site" "$SRC/deploy" "$SRC/README.md" "$SRC/publier.sh" "$SRC/vercel.json" "$SRC/nginx-clos-restaurant.conf" "$DEST/"
tar -C "$SRC" --exclude='source/out' --exclude='source/tests/node_modules' --exclude='__pycache__' -cf - source | tar -C "$DEST" -xf -
cp "$SRC/tools/photos.py" "$DEST/tools/"
mkdir -p "$DEST/tools/mail" && cp "$SRC/tools/mail/visuels.py" "$SRC/tools/mail/video.py" "$SRC/tools/mail/mail.py" "$SRC/tools/mail/captures.js" "$SRC/tools/mail/CLOS-mail.html" "$DEST/tools/mail/"
cp "$SRC/tools/logo/trace.py" "$SRC/tools/logo/logo_clos.png" "$SRC/tools/logo/logo_paths.json" "$DEST/tools/logo/"
cp "$SRC/tools/carte/carte.py" "$SRC/tools/carte/itineraire.py" "$SRC/tools/carte/q.txt" "$SRC/tools/carte/osm.json" "$SRC/tools/carte/carte.json" "$SRC/tools/carte/itineraire.json" "$DEST/tools/carte/"
cp "$SRC/tools/ttf/Outfit.ttf" "$DEST/tools/ttf/"
cp "$SRC/photos/originaux/credits.json" "$DEST/photos/originaux/"
cp "$SRC/photos/wikimedia/index.json" "$DEST/photos/wikimedia/"
cp "$SRC/build/photos.json" "$DEST/build/"
cd /home/user/prisma-automobiles
git add -A clos-restaurant
if git diff --cached --quiet; then echo "rien à publier"; exit 0; fi
git commit -q -m "$1

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_0196nDPGppGScQdv3UFR85iJ"
for i in 1 2 3 4; do git push -u origin main && break || sleep $((2 ** i)); done
git log --oneline -1
git rev-parse HEAD > "$SRC/.publie"
