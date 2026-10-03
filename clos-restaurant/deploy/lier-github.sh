#!/usr/bin/env bash
# =====================================================================
# CLOS : relier le site du VPS au dépôt GitHub (mise à jour automatique).
#
#   curl -fsSL https://raw.githubusercontent.com/DrissRedOne/prisma-automobiles/main/clos-restaurant/deploy/lier-github.sh | sudo bash
#
# À lancer une seule fois sur le VPS qui sert déjà le site avec nginx. Ensuite, toutes les 5 minutes,
# le VPS vérifie GitHub et publie toute nouvelle version du dossier clos-restaurant/site.
#
# Ce que fait le script :
#   - retrouve le dossier du site dans la configuration nginx (server_name clos.reydenweb.fr) ;
#   - récupère le site depuis GitHub (seulement ce dossier) dans /opt/clos-restaurant ;
#   - remplace le dossier du site par un lien vers la dernière version (bascule instantanée,
#     les 3 dernières versions sont gardées, l'ancien dossier est conservé en sauvegarde) ;
#   - garde l'en-tête de sécurité (CSP) de nginx aligné sur la construction, en vérifiant avec
#     « nginx -t » avant de recharger, et en revenant en arrière en cas de refus ;
#   - ne touche à aucun autre site du VPS.
#
# Options : un chemin (dossier du site, si la détection ne convient pas), --domaine NOM,
#           --supprimer (arrête la mise à jour automatique ; le site reste en ligne tel quel).
# Journal : /var/log/clos-restaurant-maj.log   Mise à jour immédiate : sudo clos-restaurant-maj
# =====================================================================
# Tout le script est dans main() : lu en entier avant de s'exécuter (sûr avec « curl ... | bash »).
main() {
set -euo pipefail

REPO_URL="${CLOS_REPO_URL:-https://github.com/DrissRedOne/prisma-automobiles.git}"
NAME="clos-restaurant"
BASE="/opt/$NAME"
MAJ="/usr/local/bin/$NAME-maj"
CRON="/etc/cron.d/$NAME"
LOG="/var/log/$NAME-maj.log"
DOMAIN="clos.reydenweb.fr"
ROOT=""
REMOVE=0

say() { printf '\n\033[1;33m» %s\033[0m\n' "$*"; }
ok() { printf '\033[1;32m✔ %s\033[0m\n' "$*"; }
die() { printf '\n\033[1;31m✖ %s\033[0m\n' "$*" >&2; exit 1; }

while [ $# -gt 0 ]; do
  case "$1" in
    --supprimer) REMOVE=1 ;;
    --domaine) shift; DOMAIN="${1:-}" ;;
    --domaine=*) DOMAIN="${1#*=}" ;;
    -*) die "Option inconnue : $1" ;;
    *) ROOT="$1" ;;
  esac
  shift
done
[ -n "$DOMAIN" ] || die "Domaine vide."
[ "$(id -u)" -eq 0 ] || die "Lancez le script avec sudo (droits administrateur)."

if [ "$REMOVE" = 1 ]; then
  rm -f "$CRON" "$MAJ"
  ok "Mise à jour automatique arrêtée. Le site reste en ligne dans sa dernière version."
  exit 0
fi

say "Préparation"
if command -v apt-get >/dev/null; then
  export DEBIAN_FRONTEND=noninteractive
  command -v git >/dev/null && command -v flock >/dev/null && { command -v cron >/dev/null || command -v crond >/dev/null; } || {
    apt-get update -qq || true
    apt-get install -y -qq git cron util-linux >/dev/null
  }
fi
command -v git >/dev/null || die "git est introuvable : installez-le puis relancez."
command -v nginx >/dev/null || die "nginx est introuvable : ce script relie un site déjà servi par nginx."

# ---------------------------------------------------------------- configuration nginx et dossier du site
DOM_RE="$(printf '%s' "$DOMAIN" | sed 's/\./\\./g')"
CONF=""
for f in $(grep -RlE "server_name[^;]*[[:space:]]$DOM_RE([[:space:];]|$)" /etc/nginx/sites-enabled /etc/nginx/conf.d 2>/dev/null || true); do
  CONF="$(readlink -f "$f")"; break
done
if [ -z "$ROOT" ] && [ -n "$CONF" ]; then
  ROOT="$(grep -E '^[[:space:]]*root[[:space:]]' "$CONF" | head -1 | awk '{print $2}' | tr -d ';')"
fi
[ -n "$ROOT" ] || die "Dossier du site introuvable dans nginx pour $DOMAIN. Relancez en indiquant le dossier, par exemple : ... | sudo bash -s -- /var/www/clos-restaurant/site"
ROOT="${ROOT%/}"
case "$ROOT" in /|/etc*|/usr*|/bin*|/sbin*|/boot*|/proc*|/sys*|/dev*|/root|/home) die "Dossier refusé : $ROOT" ;; esac
ok "Site : https://$DOMAIN, dossier $ROOT${CONF:+, configuration $CONF}"

# ---------------------------------------------------------------- dépôt GitHub (seulement le dossier du site)
say "Liaison avec GitHub"
mkdir -p "$BASE"
if [ ! -d "$BASE/repo/.git" ]; then
  rm -rf "$BASE/repo"
  git clone -q --depth 1 --filter=blob:none --no-checkout "$REPO_URL" "$BASE/repo"
  git -C "$BASE/repo" sparse-checkout set --no-cone "/$NAME/site/" "/$NAME/nginx-clos-restaurant.conf" 2>/dev/null || true
fi
printf 'ROOT=%q\nDOMAIN=%q\nCONF=%q\n' "$ROOT" "$DOMAIN" "$CONF" > "$BASE/config"

cat > "$MAJ" <<'MAJEOF'
#!/usr/bin/env bash
# Met à jour le site du Clos depuis GitHub (lancé toutes les 5 minutes par cron).
set -euo pipefail
B=/opt/clos-restaurant; R="$B/repo"; P=clos-restaurant
. "$B/config"
exec 9>"$B/.verrou"; flock -n 9 || exit 0
git -C "$R" fetch -q --depth 1 --filter=blob:none origin main
TREE="$(git -C "$R" rev-parse "FETCH_HEAD:$P/site")"
if [ "$TREE" != "$(cat "$B/publie" 2>/dev/null || true)" ] || [ ! -L "$ROOT" ]; then
  git -C "$R" -c advice.detachedHead=false checkout -q --force FETCH_HEAD
  [ -f "$R/$P/site/index.html" ] || { echo "$(date '+%F %T') version incomplète, rien n'a changé"; exit 1; }
  V="$ROOT-versions"; mkdir -p "$V"
  D="$V/${TREE:0:12}-$(date +%s)"
  mkdir -p "$D"; cp -a "$R/$P/site/." "$D/"
  # adresses absolues (partage, plan du site) : celles du VPS
  grep -rlZ 'https://clos-restaurant.vercel.app' "$D" 2>/dev/null | xargs -0 -r sed -i "s#https://clos-restaurant.vercel.app#https://$DOMAIN#g" || true
  chmod -R a+rX "$V"
  # premier passage : l'ancien dossier, déposé à la main, est gardé en sauvegarde
  if [ -e "$ROOT" ] && [ ! -L "$ROOT" ]; then mv "$ROOT" "$ROOT.avant-github-$(date +%Y%m%d-%H%M%S)"; fi
  ln -sfn "$D" "$ROOT.tmp" && mv -Tf "$ROOT.tmp" "$ROOT"
  echo "$TREE" > "$B/publie"
  ls -1dt "$V"/* | tail -n +4 | xargs -r rm -rf
  echo "$(date '+%F %T') version ${TREE:0:12} publiée"
fi
# en-tête de sécurité : même empreinte de script que la construction (sinon l'intro du site serait bloquée)
N="$R/$P/nginx-clos-restaurant.conf"
if [ -n "${CONF:-}" ] && [ -f "$CONF" ] && [ -f "$N" ] && grep -q 'Content-Security-Policy' "$CONF"; then
  NEW="$(grep -m1 'Content-Security-Policy' "$N" | sed 's/^[[:space:]]*//')"
  if [ -n "$NEW" ] && ! grep -qF -- "$NEW" "$CONF"; then
    cp -a "$CONF" "$B/nginx-avant-maj.conf"
    awk -v new="$NEW" '{ if ($0 ~ /add_header[[:space:]]+Content-Security-Policy/) { match($0, /^[[:space:]]*/); print substr($0, 1, RLENGTH) new } else print }' "$CONF" > "$B/nginx-nouveau.conf"
    cat "$B/nginx-nouveau.conf" > "$CONF"
    if nginx -t >/dev/null 2>&1; then
      { systemctl reload nginx 2>/dev/null || nginx -s reload; } && echo "$(date '+%F %T') en-tête de sécurité mis à jour"
    else
      cat "$B/nginx-avant-maj.conf" > "$CONF"; echo "$(date '+%F %T') en-tête refusé par nginx : configuration remise comme avant"
    fi
  fi
fi
MAJEOF
chmod 755 "$MAJ"
touch "$LOG"
if ! "$MAJ" 2>&1 | tee -a "$LOG"; then die "Le site n'a pas pu être publié depuis GitHub (voir $LOG). Rien d'autre n'a été modifié."; fi
[ -L "$ROOT" ] && [ -f "$ROOT/index.html" ] || die "Le site n'a pas pu être publié depuis GitHub (voir $LOG)."
printf 'SHELL=/bin/bash\nPATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\n*/5 * * * * root %s >> %s 2>&1\n' "$MAJ" "$LOG" > "$CRON"
chmod 644 "$CRON"
ok "Mise à jour automatique toutes les 5 minutes"

say "C'est relié"
echo "  Site :            https://$DOMAIN"
echo "  Dossier du site : $ROOT  ->  $(readlink "$ROOT")"
echo "  Mise à jour :     automatique, ou tout de suite avec : sudo $MAJ"
echo "  Journal :         $LOG"
echo "  Arrêter :         curl -fsSL https://raw.githubusercontent.com/DrissRedOne/prisma-automobiles/main/clos-restaurant/deploy/lier-github.sh | sudo bash -s -- --supprimer"
}
main "$@"
