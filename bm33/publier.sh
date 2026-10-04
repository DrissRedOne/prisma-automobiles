#!/bin/bash
# Construit le site BM33 Automobiles, le copie dans le dépôt de démonstration (dossier bm33) et l'envoie sur GitHub.
# Usage : ./publier.sh "Message du commit"
set -euo pipefail
SRC=/home/user/bm33
DEST=/home/user/prisma-automobiles/bm33
# garde-fou : une autre session peut publier dans le même dépôt ; on récupère sa version et on refuse
# d'écraser des sources modifiées sur GitHub depuis notre dernière publication (à reprendre d'abord ici)
git -C /home/user/prisma-automobiles pull -q --ff-only origin main
if [ -f "$SRC/.publie" ] && ! git -C /home/user/prisma-automobiles diff --quiet "$(cat "$SRC/.publie")" HEAD -- bm33/source bm33/tools bm33/deploy; then
  echo "ARRÊT : les sources ont changé sur GitHub depuis la dernière publication :"
  git -C /home/user/prisma-automobiles diff --stat "$(cat "$SRC/.publie")" HEAD -- bm33/source bm33/tools bm33/deploy
  echo "Reprendre ces changements dans $SRC, puis : git -C /home/user/prisma-automobiles rev-parse HEAD > $SRC/.publie"
  exit 1
fi
cd "$SRC/source" && python3 build.py --publier
rm -rf "$DEST"
mkdir -p "$DEST/tools/logo" "$DEST/tools/ttf" "$DEST/photos" "$DEST/build"
cp -r "$SRC/site" "$SRC/deploy" "$SRC/README.md" "$SRC/publier.sh" "$SRC/vercel.json" "$SRC/nginx-bm33.conf" "$DEST/"
tar -C "$SRC" --exclude='source/out' --exclude='source/tests/node_modules' --exclude='__pycache__' --exclude='source/vendor' -cf - source | tar -C "$DEST" -xf -
cp "$SRC/tools/photos.py" "$DEST/tools/"
cp "$SRC/tools/logo/logo.py" "$SRC/tools/logo/logo.json" "$SRC/tools/logo/logo-clair.svg" "$SRC/tools/logo/logo-sombre.svg" "$DEST/tools/logo/"
cp "$SRC/tools/ttf/"*.ttf "$DEST/tools/ttf/"
cp "$SRC/photos/raw/credits.json" "$SRC/photos/plaques.json" "$DEST/photos/"
cp "$SRC/build/photos.json" "$DEST/build/"
cd /home/user/prisma-automobiles
git add -A bm33
if git diff --cached --quiet; then echo "rien à publier"; exit 0; fi
git commit -q -m "$1

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_0196nDPGppGScQdv3UFR85iJ"
for i in 1 2 3 4; do git push -u origin main && break || sleep $((2 ** i)); done
git log --oneline -1
git rev-parse HEAD > "$SRC/.publie"
