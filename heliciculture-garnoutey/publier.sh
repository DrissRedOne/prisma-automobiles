#!/bin/bash
# Construit le site de l'Héliciculture du Garnoutey, le copie dans le dépôt de démonstration
# (dossier heliciculture-garnoutey) et l'envoie sur GitHub.
# Usage : ./publier.sh "Message du commit"
set -euo pipefail
SRC=/home/user/heliciculture-garnoutey
DEST=/home/user/prisma-automobiles/heliciculture-garnoutey
# garde-fou : une autre session peut publier dans le même dépôt ; on récupère sa version et on refuse
# d'écraser des sources modifiées sur GitHub depuis notre dernière publication (à reprendre d'abord ici)
git -C /home/user/prisma-automobiles pull -q --ff-only origin main
if [ -f "$SRC/.publie" ] && ! git -C /home/user/prisma-automobiles diff --quiet "$(cat "$SRC/.publie")" HEAD -- heliciculture-garnoutey/source heliciculture-garnoutey/tools heliciculture-garnoutey/deploy; then
  echo "ARRÊT : les sources ont changé sur GitHub depuis la dernière publication :"
  git -C /home/user/prisma-automobiles diff --stat "$(cat "$SRC/.publie")" HEAD -- heliciculture-garnoutey/source heliciculture-garnoutey/tools heliciculture-garnoutey/deploy
  echo "Reprendre ces changements dans $SRC, puis : git -C /home/user/prisma-automobiles rev-parse HEAD > $SRC/.publie"
  exit 1
fi
cd "$SRC/source" && python3 build.py --publier
rm -rf "$DEST"
mkdir -p "$DEST/tools/logo" "$DEST/photos/wikimedia" "$DEST/build"
cp -r "$SRC/site" "$SRC/deploy" "$SRC/README.md" "$SRC/publier.sh" "$SRC/vercel.json" "$SRC/nginx-garnoutey.conf" "$SRC/.gitignore" "$DEST/"
tar -C "$SRC" --exclude='source/out' --exclude='source/tests/node_modules' --exclude='__pycache__' -cf - source | tar -C "$DEST" -xf -
cp "$SRC/tools/photos.py" "$SRC/tools/grade.py" "$SRC/tools/images_films.py" "$SRC/tools/videos.py" "$SRC/tools/logo.py" "$DEST/tools/"
cp "$SRC/tools/logo/logo.json" "$DEST/tools/logo/"
mkdir -p "$DEST/tools/mail" && cp "$SRC/tools/mail/visuels.py" "$SRC/tools/mail/mail.py" "$SRC/tools/mail/captures.js" "$SRC/tools/mail/Garnoutey-mail.html" "$DEST/tools/mail/"
cp "$SRC/photos/wikimedia/index.json" "$DEST/photos/wikimedia/"
cp "$SRC/build/photos.json" "$SRC/build/videos.json" "$DEST/build/"
cd /home/user/prisma-automobiles
git add -A heliciculture-garnoutey
if git diff --cached --quiet; then echo "rien à publier"; exit 0; fi
git commit -q -m "$1

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_0196nDPGppGScQdv3UFR85iJ"
for i in 1 2 3 4; do git push -u origin main && break || sleep $((2 ** i)); done
git log --oneline -1
git rev-parse HEAD > "$SRC/.publie"
