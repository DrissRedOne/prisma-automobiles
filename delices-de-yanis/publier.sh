#!/bin/bash
# Construit le site, le copie dans le dépôt de démonstration (dossier delices-de-yanis) et l'envoie sur GitHub.
# Usage : ./publier.sh "Message du commit"
set -euo pipefail
SRC=/home/user/delices-de-yanis
DEST=/home/user/prisma-automobiles/delices-de-yanis
cd "$SRC/source" && python3 build.py --publier
rm -rf "$DEST/site" "$DEST/source"
mkdir -p "$DEST"
tar -C "$SRC" --exclude='source/out' --exclude='source/video' --exclude='source/photos/_work' --exclude='source/tests/node_modules' --exclude='__pycache__' -cf - . | tar -C "$DEST" -xf -
cd /home/user/prisma-automobiles
git add -A delices-de-yanis .gitignore
if git diff --cached --quiet; then echo "rien à publier"; exit 0; fi
git commit -q -m "$1

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_0196nDPGppGScQdv3UFR85iJ"
for i in 1 2 3 4; do git push -u origin main && break || sleep $((2 ** i)); done
git log --oneline -1
