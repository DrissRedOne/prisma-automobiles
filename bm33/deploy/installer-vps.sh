#!/usr/bin/env bash
# =====================================================================
# BM33 Automobiles : installer le site sur le VPS (nginx) et le relier au dépôt GitHub.
#
#   curl -fsSL https://raw.githubusercontent.com/DrissRedOne/prisma-automobiles/main/bm33/deploy/installer-vps.sh | sudo bash
#
# Avant de lancer : le nom de domaine (par défaut bm33.reydenweb.fr) doit pointer vers l'adresse IP du VPS
# (enregistrement DNS de type A), sinon le certificat HTTPS ne pourra pas être obtenu.
#
# Ce que fait le script :
#   - récupère le site depuis GitHub (seulement le dossier bm33/site) dans /opt/bm33 ;
#   - publie la dernière version dans /var/www/bm33/site (lien vers la version, bascule instantanée,
#     les 3 dernières versions sont gardées) ;
#   - crée la configuration nginx du domaine (adresses sans .html, page 404, en-têtes de sécurité, cache,
#     noindex) si elle n'existe pas, la vérifie avec « nginx -t » avant de recharger ;
#   - demande le certificat HTTPS avec certbot (si certbot est installé) ;
#   - vérifie GitHub toutes les 5 minutes et publie toute nouvelle version ;
#   - ne touche à aucun autre site du VPS.
#
# Options : --domaine NOM, --email ADRESSE (pour certbot), --supprimer (arrête la mise à jour automatique ;
#           le site reste en ligne tel quel).
# Journal : /var/log/bm33-maj.log   Mise à jour immédiate : sudo bm33-maj
# =====================================================================
# Tout le script est dans main() : lu en entier avant de s'exécuter (sûr avec « curl ... | bash »).
main() {
set -euo pipefail

REPO_URL="${BM33_REPO_URL:-https://github.com/DrissRedOne/prisma-automobiles.git}"
NAME="bm33"
BASE="/opt/$NAME"
ROOT="/var/www/$NAME/site"
MAJ="/usr/local/bin/$NAME-maj"
CRON="/etc/cron.d/$NAME"
LOG="/var/log/$NAME-maj.log"
DOMAIN="bm33.reydenweb.fr"
EMAIL=""
REMOVE=0

say() { printf '\n\033[1;33m» %s\033[0m\n' "$*"; }
ok() { printf '\033[1;32m✔ %s\033[0m\n' "$*"; }
warn() { printf '\033[1;35m! %s\033[0m\n' "$*"; }
die() { printf '\n\033[1;31m✖ %s\033[0m\n' "$*" >&2; exit 1; }

while [ $# -gt 0 ]; do
  case "$1" in
    --supprimer) REMOVE=1 ;;
    --domaine) shift; DOMAIN="${1:-}" ;;
    --domaine=*) DOMAIN="${1#*=}" ;;
    --email) shift; EMAIL="${1:-}" ;;
    --email=*) EMAIL="${1#*=}" ;;
    *) die "Option inconnue : $1" ;;
  esac
  shift
done
[ -n "$DOMAIN" ] || die "Domaine vide."
printf '%s' "$DOMAIN" | grep -Eq '^[A-Za-z0-9.-]+$' || die "Domaine invalide : $DOMAIN"
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
command -v nginx >/dev/null || die "nginx est introuvable : installez-le (apt install nginx) puis relancez."

# ---------------------------------------------------------------- dépôt GitHub (seulement le dossier du site)
say "Liaison avec GitHub"
mkdir -p "$BASE"
if [ ! -d "$BASE/repo/.git" ]; then
  rm -rf "$BASE/repo"
  git clone -q --depth 1 --filter=blob:none --no-checkout "$REPO_URL" "$BASE/repo"
  git -C "$BASE/repo" sparse-checkout set --no-cone "/$NAME/site/" "/$NAME/nginx-bm33.conf" 2>/dev/null || true
fi

# configuration nginx du domaine : créée si absente, jamais écrasée ensuite (certbot la complète)
DOM_RE="$(printf '%s' "$DOMAIN" | sed 's/\./\\./g')"
CONF=""
for f in $(grep -RlE "server_name[^;]*[[:space:]]$DOM_RE([[:space:];]|$)" /etc/nginx/sites-enabled /etc/nginx/conf.d 2>/dev/null || true); do
  CONF="$(readlink -f "$f")"; break
done
printf 'ROOT=%q\nDOMAIN=%q\nCONF=%q\n' "$ROOT" "$DOMAIN" "${CONF:-/etc/nginx/sites-available/$NAME}" > "$BASE/config"

cat > "$MAJ" <<'MAJEOF'
#!/usr/bin/env bash
# Met à jour le site BM33 depuis GitHub (lancé toutes les 5 minutes par cron).
set -euo pipefail
B=/opt/bm33; R="$B/repo"; P=bm33
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
  # adresses absolues (partage, plan du site) : celles du domaine servi par ce VPS
  grep -rlZ 'https://bm33-automobiles.vercel.app' "$D" 2>/dev/null | xargs -0 -r sed -i "s#https://bm33-automobiles.vercel.app#https://$DOMAIN#g" || true
  chmod -R a+rX "$V"
  if [ -e "$ROOT" ] && [ ! -L "$ROOT" ]; then mv "$ROOT" "$ROOT.avant-github-$(date +%Y%m%d-%H%M%S)"; fi
  mkdir -p "$(dirname "$ROOT")"
  ln -sfn "$D" "$ROOT.tmp" && mv -Tf "$ROOT.tmp" "$ROOT"
  echo "$TREE" > "$B/publie"
  ls -1dt "$V"/* | tail -n +4 | xargs -r rm -rf
  echo "$(date '+%F %T') version ${TREE:0:12} publiée"
fi
# en-tête de sécurité : même empreinte de script que la construction (sinon le script de la page serait bloqué)
N="$R/$P/nginx-bm33.conf"
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
if ! "$MAJ" 2>&1 | tee -a "$LOG"; then die "Le site n'a pas pu être récupéré depuis GitHub (voir $LOG). Rien d'autre n'a été modifié."; fi
[ -L "$ROOT" ] && [ -f "$ROOT/index.html" ] || die "Le site n'a pas pu être publié (voir $LOG)."
ok "Site publié dans $ROOT"

# ---------------------------------------------------------------- nginx
say "Configuration nginx"
if [ -n "$CONF" ]; then
  ok "Configuration existante gardée : $CONF"
else
  AV=/etc/nginx/sites-available; EN=/etc/nginx/sites-enabled
  [ -d "$AV" ] && [ -d "$EN" ] || { AV=/etc/nginx/conf.d; EN=""; }
  CONF="$AV/$NAME$([ -z "$EN" ] && echo .conf)"
  sed -e "s#server_name DOMAINE;#server_name $DOMAIN;#" -e "s#root /var/www/bm33/site;#root $ROOT;#" "$BASE/repo/$NAME/nginx-bm33.conf" > "$CONF"
  [ -n "$EN" ] && ln -sfn "$CONF" "$EN/$NAME"
  if nginx -t >/dev/null 2>&1; then
    { systemctl reload nginx 2>/dev/null || nginx -s reload; }
    ok "Site servi par nginx : http://$DOMAIN"
  else
    rm -f "$CONF"; [ -n "$EN" ] && rm -f "$EN/$NAME"
    nginx -t || true
    die "nginx refuse la configuration : elle a été retirée, les autres sites ne sont pas touchés."
  fi
  printf 'ROOT=%q\nDOMAIN=%q\nCONF=%q\n' "$ROOT" "$DOMAIN" "$CONF" > "$BASE/config"
fi

# ---------------------------------------------------------------- HTTPS
say "Certificat HTTPS"
if grep -q 'ssl_certificate' "$CONF" 2>/dev/null; then
  ok "HTTPS déjà configuré"
elif command -v certbot >/dev/null; then
  if certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos --redirect ${EMAIL:+-m "$EMAIL"} $([ -z "$EMAIL" ] && echo --register-unsafely-without-email); then
    ok "HTTPS actif : https://$DOMAIN"
  else
    warn "Certificat non obtenu : vérifiez que $DOMAIN pointe vers ce VPS, puis : sudo certbot --nginx -d $DOMAIN"
  fi
else
  warn "certbot est absent : installez-le (apt install certbot python3-certbot-nginx), puis : sudo certbot --nginx -d $DOMAIN"
fi

# ---------------------------------------------------------------- mise à jour automatique
printf 'SHELL=/bin/bash\nPATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\n*/5 * * * * root %s >> %s 2>&1\n' "$MAJ" "$LOG" > "$CRON"
chmod 644 "$CRON"
ok "Mise à jour automatique toutes les 5 minutes"

say "C'est en ligne"
echo "  Site :            https://$DOMAIN"
echo "  Dossier du site : $ROOT  ->  $(readlink "$ROOT")"
echo "  Mise à jour :     automatique, ou tout de suite avec : sudo $MAJ"
echo "  Journal :         $LOG"
echo "  Arrêter :         curl -fsSL https://raw.githubusercontent.com/DrissRedOne/prisma-automobiles/main/bm33/deploy/installer-vps.sh | sudo bash -s -- --supprimer"
}
main "$@"
