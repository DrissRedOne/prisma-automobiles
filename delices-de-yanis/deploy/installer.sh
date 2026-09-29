#!/usr/bin/env bash
# =====================================================================
# Les Délices de Yanis : installation sur un VPS (Debian ou Ubuntu).
#
#   curl -fsSL https://raw.githubusercontent.com/DrissRedOne/prisma-automobiles/main/delices-de-yanis/deploy/installer.sh | sudo bash -s -- [domaine] [email]
#
#   domaine  facultatif, par exemple yanis.mondomaine.fr : créer d'abord un enregistrement DNS
#            de type A qui pointe vers l'adresse IP du VPS. Sans domaine, l'adresse est
#            automatique : delices-de-yanis.<ip-du-vps>.sslip.io (aucun réglage DNS).
#   email    facultatif, pour les avis de Let's Encrypt (certificat HTTPS).
#
# Ce que fait le script :
#   - récupère le site depuis GitHub dans /var/www/delices-de-yanis (seulement le dossier du site) ;
#   - le sert avec le serveur web déjà présent (nginx, Apache ou Caddy), sinon installe nginx ;
#   - ajoute un fichier de configuration à part (les autres sites du VPS ne sont pas modifiés),
#     vérifié avant tout rechargement ;
#   - obtient le certificat HTTPS (Let's Encrypt) ;
#   - vérifie les mises à jour toutes les 5 minutes : chaque nouvelle version publiée sur GitHub
#     arrive toute seule sur le VPS.
#
# Options : --sans-https (pas de certificat), --supprimer (désinstalle tout ce que ce script a ajouté).
# =====================================================================
set -euo pipefail

REPO_URL="https://github.com/DrissRedOne/prisma-automobiles.git"
SITE_PATH="delices-de-yanis/site"
NAME="delices-de-yanis"
BASE_DIR="/opt/$NAME"
WEB_DIR="/var/www/$NAME"
MAJ="/usr/local/bin/$NAME-maj"
CRON="/etc/cron.d/$NAME"
MARK_BEGIN="# >>> $NAME (installé par installer.sh)"
MARK_END="# <<< $NAME"

say() { printf '\n\033[1;33m» %s\033[0m\n' "$*"; }
ok() { printf '\033[1;32m✔ %s\033[0m\n' "$*"; }
die() { printf '\n\033[1;31m✖ %s\033[0m\n' "$*" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || die "Lancez le script avec sudo (droits administrateur)."
command -v apt-get >/dev/null || die "Ce script prend en charge Debian et Ubuntu (apt). Pour un autre système, servez le dossier $WEB_DIR/current comme site statique."

DOMAIN=""; EMAIL=""; HTTPS=1; REMOVE=0
for a in "$@"; do
  case "$a" in
    --sans-https) HTTPS=0 ;;
    --supprimer) REMOVE=1 ;;
    *@*) EMAIL="$a" ;;
    -*) die "Option inconnue : $a" ;;
    *) DOMAIN="$(printf '%s' "$a" | tr 'A-Z' 'a-z' | sed 's#^https\?://##; s#/.*$##')" ;;
  esac
done

reload_service() { # recharge un service, avec ou sans systemd
  if command -v systemctl >/dev/null && systemctl is-system-running >/dev/null 2>&1 || [ "$(systemctl is-system-running 2>/dev/null || true)" = "degraded" ]; then
    systemctl reload "$1" 2>/dev/null || systemctl restart "$1"
  else
    case "$1" in
      nginx) nginx -s reload 2>/dev/null || nginx ;;
      apache2) apachectl graceful ;;
      caddy) caddy reload --config /etc/caddy/Caddyfile ;;
    esac
  fi
}
listener80() { # programme qui écoute déjà sur le port 80 (nginx, apache2, caddy, docker-proxy...)
  ss -ltnpH 'sport = :80' 2>/dev/null | grep -o 'users:(("[^"]*' | head -1 | sed 's/users:(("//' || true
}

# ---------------------------------------------------------------- désinstallation
if [ "$REMOVE" = 1 ]; then
  say "Désinstallation"
  rm -f "$CRON" "$MAJ"
  if [ -f /etc/nginx/sites-available/$NAME ] || [ -f /etc/nginx/conf.d/$NAME.conf ]; then
    rm -f /etc/nginx/sites-enabled/$NAME /etc/nginx/sites-available/$NAME /etc/nginx/conf.d/$NAME.conf
    nginx -t >/dev/null 2>&1 && reload_service nginx
  fi
  if [ -f /etc/apache2/sites-available/$NAME.conf ]; then
    a2dissite -q $NAME >/dev/null 2>&1 || true; rm -f /etc/apache2/sites-available/$NAME.conf /etc/apache2/sites-available/$NAME-le-ssl.conf
    apachectl configtest >/dev/null 2>&1 && reload_service apache2
  fi
  if [ -f /etc/caddy/Caddyfile ] && grep -q "$MARK_BEGIN" /etc/caddy/Caddyfile; then
    sed -i "/$MARK_BEGIN/,/$MARK_END/d" /etc/caddy/Caddyfile && reload_service caddy
  fi
  rm -rf "$BASE_DIR" "$WEB_DIR"
  ok "Site retiré du VPS (les autres sites n'ont pas été modifiés)."
  exit 0
fi

# ---------------------------------------------------------------- adresse du site
say "Préparation"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq || echo "(une source de paquets ne répond pas : on continue)"
apt-get install -y -qq git curl ca-certificates iproute2 cron >/dev/null
IP="$(curl -4 -fsS --max-time 8 https://api.ipify.org 2>/dev/null || curl -4 -fsS --max-time 8 https://ifconfig.me 2>/dev/null || hostname -I | awk '{print $1}')"
[ -n "$IP" ] || die "Adresse IP publique introuvable."
[ -n "$DOMAIN" ] || DOMAIN="$NAME.${IP//./-}.sslip.io"
ok "Adresse du site : $DOMAIN (IP du VPS : $IP)"

# ---------------------------------------------------------------- récupération du site et mise à jour automatique
say "Récupération du site depuis GitHub"
mkdir -p "$BASE_DIR" "$WEB_DIR/releases"
if [ ! -d "$BASE_DIR/repo/.git" ]; then
  rm -rf "$BASE_DIR/repo"
  git clone -q --depth 1 --filter=blob:none --no-checkout "$REPO_URL" "$BASE_DIR/repo"
  git -C "$BASE_DIR/repo" sparse-checkout set --no-cone "/$SITE_PATH/" 2>/dev/null || true
fi
# même domaine qu'avant : on garde le HTTPS déjà obtenu ; nouveau domaine : on repart en HTTP le temps du certificat
SCHEME_NOW="http"
if [ -f "$BASE_DIR/config" ]; then
  OLD="$(. "$BASE_DIR/config"; printf '%s %s' "${DOMAIN:-}" "${SCHEME:-http}")"
  [ "${OLD% *}" = "$DOMAIN" ] && SCHEME_NOW="${OLD##* }"
fi
printf 'DOMAIN=%q\nSCHEME=%q\n' "$DOMAIN" "$SCHEME_NOW" > "$BASE_DIR/config"

cat > "$MAJ" <<'MAJEOF'
#!/usr/bin/env bash
# Met à jour le site des Délices de Yanis depuis GitHub (lancé toutes les 5 minutes par cron).
set -euo pipefail
B=/opt/delices-de-yanis; W=/var/www/delices-de-yanis; R="$B/repo"; P=delices-de-yanis/site
. "$B/config"
exec 9>"$B/.verrou"; flock -n 9 || exit 0
git -C "$R" fetch -q --depth 1 --filter=blob:none origin main
TREE="$(git -C "$R" rev-parse "FETCH_HEAD:$P")"
VERSION="$TREE-$SCHEME-$DOMAIN"
[ "$VERSION" = "$(cat "$B/publie" 2>/dev/null || true)" ] && [ -e "$W/current" ] && exit 0
git -C "$R" -c advice.detachedHead=false checkout -q --force FETCH_HEAD
D="$W/releases/${TREE:0:12}-$(date +%s)"
mkdir -p "$D"
cp -a "$R/$P/." "$D/"
# adresses absolues (partage, plan du site) : celles du VPS
grep -rlZ 'https://delices-de-yanis.vercel.app' "$D" | xargs -0 -r sed -i "s#https://delices-de-yanis.vercel.app#$SCHEME://$DOMAIN#g"
chmod -R a+rX "$D"
ln -sfn "$D" "$W/current.tmp" && mv -Tf "$W/current.tmp" "$W/current"
echo "$VERSION" > "$B/publie"
# on garde les 3 dernières versions (retour arrière possible)
ls -1dt "$W/releases/"* | tail -n +4 | xargs -r rm -rf
MAJEOF
chmod 755 "$MAJ"
"$MAJ"
[ -f "$WEB_DIR/current/index.html" ] || die "Le site n'a pas pu être récupéré depuis GitHub."
printf 'SHELL=/bin/bash\n*/5 * * * * root %s >/dev/null 2>&1\n' "$MAJ" > "$CRON"
chmod 644 "$CRON"
ok "Site copié dans $WEB_DIR/current, mis à jour toutes les 5 minutes"

# ---------------------------------------------------------------- serveur web
say "Serveur web"
L80="$(listener80)"
SERVER=""
case "$L80" in
  nginx*) SERVER=nginx ;;
  apache2*|httpd*) SERVER=apache ;;
  caddy*) SERVER=caddy ;;
  "") if command -v nginx >/dev/null; then SERVER=nginx; elif command -v apache2 >/dev/null; then SERVER=apache; elif command -v caddy >/dev/null; then SERVER=caddy; else
        apt-get install -y -qq nginx >/dev/null; SERVER=nginx; fi ;;
  *) SERVER=autre ;;
esac

ROOT="$WEB_DIR/current"
LISTEN6=""   # IPv6 seulement si le VPS sait vraiment l'utiliser
if [ -e /proc/net/if_inet6 ] && { ! command -v python3 >/dev/null || python3 -c 'import socket; socket.socket(socket.AF_INET6).close()' 2>/dev/null; }; then LISTEN6="listen [::]:80;"; fi
nginx_conf() {
  local robots='add_header X-Robots-Tag "noindex, nofollow" always;'
  cat <<NGINX
$MARK_BEGIN
# Site de démonstration : pages non indexées (X-Robots-Tag) tant que le restaurant n'a pas validé.
server {
    listen 80;
    $LISTEN6
    server_name $DOMAIN;
    root $ROOT;
    index index.html;
    charset utf-8;
    gzip on;
    gzip_types text/css application/javascript text/javascript application/json application/manifest+json image/svg+xml text/plain application/xml;
    $robots
    error_page 404 /404.html;

    # application : commande, suivi, mes commandes, espace restaurant (appli « Yanis Cuisine »)
    location = /commande  { $robots try_files /app.html =404; }
    location = /commandes { $robots try_files /app.html =404; }
    location = /app       { $robots try_files /app.html =404; }
    location ^~ /suivi/   { $robots try_files /app.html =404; }
    location = /cuisine   { $robots try_files /cuisine-app.html =404; }
    location ^~ /cuisine/ { $robots try_files /cuisine-app.html =404; }
    location = /cuisine-app { $robots try_files /cuisine-app.html =404; }
    location = /menu  { return 301 /carte; }
    location = /admin { return 302 /cuisine; }

    # fichiers versionnés : gardés un an ; photos : une semaine ; service worker : toujours vérifié
    location ^~ /assets/ { $robots add_header Cache-Control "public, max-age=31536000, immutable" always; try_files \$uri =404; }
    location ^~ /fonts/  { $robots add_header Cache-Control "public, max-age=31536000, immutable" always; try_files \$uri =404; }
    location ^~ /img/    { $robots add_header Cache-Control "public, max-age=604800, stale-while-revalidate=86400" always; try_files \$uri =404; }
    location = /sw.js    { $robots add_header Cache-Control "no-cache" always; try_files \$uri =404; }
    location ~ \.webmanifest\$ { $robots types { } default_type application/manifest+json; try_files \$uri =404; }

    # pages : adresses sans « .html »
    location / { try_files \$uri \$uri.html \$uri/ =404; }
}
$MARK_END
NGINX
}
apache_conf() {
  cat <<APACHE
$MARK_BEGIN
<VirtualHost *:80>
    ServerName $DOMAIN
    DocumentRoot $ROOT
    <Directory $ROOT>
        Options -Indexes +FollowSymLinks
        AllowOverride None
        Require all granted
        DirectoryIndex index.html
    </Directory>
    Header always set X-Robots-Tag "noindex, nofollow"
    ErrorDocument 404 /404.html
    AddType application/manifest+json .webmanifest
    RewriteEngine On
    RewriteRule ^/menu$ /carte [R=301,L]
    RewriteRule ^/admin$ /cuisine [R=302,L]
    RewriteRule ^/(commande|commandes|app)$ /app.html [L]
    RewriteRule ^/suivi/[^/]+$ /app.html [L]
    RewriteRule ^/(cuisine|cuisine-app)$ /cuisine-app.html [L]
    RewriteRule ^/cuisine/.+$ /cuisine-app.html [L]
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI}.html -f
    RewriteRule ^/(.+)$ /\$1.html [L]
    <LocationMatch "^/(assets|fonts)/">
        Header always set Cache-Control "public, max-age=31536000, immutable"
    </LocationMatch>
    <Location "/sw.js">
        Header always set Cache-Control "no-cache"
    </Location>
</VirtualHost>
$MARK_END
APACHE
}
caddy_conf() {
  cat <<CADDY
$MARK_BEGIN
$DOMAIN {
    root * $ROOT
    encode gzip
    header X-Robots-Tag "noindex, nofollow"
    redir /menu /carte 301
    redir /admin /cuisine 302
    @app path /commande /commandes /app /suivi/*
    rewrite @app /app.html
    @cuisine path /cuisine /cuisine/* /cuisine-app
    rewrite @cuisine /cuisine-app.html
    @longcache path /assets/* /fonts/*
    header @longcache Cache-Control "public, max-age=31536000, immutable"
    header /sw.js Cache-Control "no-cache"
    header /*.webmanifest Content-Type application/manifest+json
    try_files {path} {path}.html {path}/
    file_server
    handle_errors {
        rewrite * /404.html
        file_server
    }
}
$MARK_END
CADDY
}

case "$SERVER" in
  nginx)
    nginx -t >/dev/null 2>&1 || { nginx -t || true; die "La configuration nginx du VPS a déjà une erreur (message ci-dessus), avant toute modification : rien n'a été changé."; }
    if [ -d /etc/nginx/sites-available ]; then CONF=/etc/nginx/sites-available/$NAME; LINK=/etc/nginx/sites-enabled/$NAME; else CONF=/etc/nginx/conf.d/$NAME.conf; LINK=""; fi
    BACKUP=""; [ -f "$CONF" ] && BACKUP="$(cat "$CONF")"
    nginx_conf > "$CONF"
    [ -n "$LINK" ] && ln -sfn "$CONF" "$LINK"
    if ! nginx -t >/dev/null 2>&1; then
      if [ -n "$BACKUP" ]; then printf '%s\n' "$BACKUP" > "$CONF"; else rm -f "$CONF" ${LINK:+"$LINK"}; fi
      nginx -t || true
      die "Configuration nginx refusée : rien n'a été modifié sur les autres sites. Envoyez-moi le message ci-dessus."
    fi
    if pgrep -x nginx >/dev/null; then reload_service nginx; else (systemctl enable --now nginx 2>/dev/null || nginx); fi
    ok "nginx : site ajouté ($CONF)"
    ;;
  apache)
    a2enmod -q rewrite headers >/dev/null
    CONF=/etc/apache2/sites-available/$NAME.conf
    apache_conf > "$CONF"; a2ensite -q $NAME >/dev/null
    if ! apachectl configtest >/dev/null 2>&1; then a2dissite -q $NAME >/dev/null; rm -f "$CONF"; apachectl configtest || true; die "Configuration Apache refusée : rien n'a été modifié sur les autres sites."; fi
    reload_service apache2
    ok "Apache : site ajouté ($CONF)"
    ;;
  caddy)
    F=/etc/caddy/Caddyfile; cp -a "$F" "$F.avant-$NAME"
    sed -i "/$MARK_BEGIN/,/$MARK_END/d" "$F"; printf '\n' >> "$F"; caddy_conf >> "$F"
    if ! caddy validate --config "$F" --adapter caddyfile >/dev/null 2>&1; then cp -a "$F.avant-$NAME" "$F"; die "Configuration Caddy refusée : Caddyfile restauré."; fi
    reload_service caddy
    ok "Caddy : site ajouté (HTTPS automatique)"
    ;;
  autre)
    say "Le port 80 est déjà utilisé par « $L80 » (panneau d'hébergement ou conteneur Docker ?)."
    echo "Les fichiers du site sont prêts dans $ROOT et se mettent à jour tout seuls."
    echo "Dans votre outil d'hébergement, créez un site statique pour $DOMAIN avec ce dossier comme racine, et ces règles :"
    echo "  /commande, /commandes, /suivi/*          -> /app.html"
    echo "  /cuisine, /cuisine/*                     -> /cuisine-app.html"
    echo "  /page                                    -> /page.html (adresses sans .html)"
    echo "  page introuvable                         -> /404.html"
    exit 0
    ;;
esac

# pare-feu : ouvrir le web si ufw est actif
if command -v ufw >/dev/null && ufw status 2>/dev/null | grep -q "Status: active"; then ufw allow 80/tcp >/dev/null; ufw allow 443/tcp >/dev/null; ok "Pare-feu : ports 80 et 443 ouverts"; fi

# ---------------------------------------------------------------- HTTPS (Let's Encrypt)
SCHEME=http
if [ "$SERVER" = caddy ]; then
  SCHEME=https
elif [ "$HTTPS" = 1 ]; then
  say "Certificat HTTPS"
  RESOLVED="$(getent ahostsv4 "$DOMAIN" 2>/dev/null | awk 'NR==1{print $1}')"
  if [ "$RESOLVED" != "$IP" ]; then
    echo "Le domaine $DOMAIN ne pointe pas (encore) vers ce VPS ($IP), il pointe vers « ${RESOLVED:-rien} »."
    echo "Créez l'enregistrement DNS de type A, attendez quelques minutes, puis relancez la même commande."
  else
    PLUGIN=nginx; [ "$SERVER" = apache ] && PLUGIN=apache
    apt-get install -y -qq certbot "python3-certbot-$PLUGIN" >/dev/null
    MAIL_ARGS=(--register-unsafely-without-email); [ -n "$EMAIL" ] && MAIL_ARGS=(-m "$EMAIL")
    if certbot --"$PLUGIN" -d "$DOMAIN" --non-interactive --agree-tos "${MAIL_ARGS[@]}" --redirect --keep-until-expiring >/tmp/$NAME-certbot.log 2>&1; then
      SCHEME=https; ok "HTTPS actif (renouvellement automatique)"
    else
      echo "Le certificat n'a pas pu être obtenu (détails : /tmp/$NAME-certbot.log). Le site reste en HTTP ; relancez la commande plus tard."
    fi
  fi
fi
printf 'DOMAIN=%q\nSCHEME=%q\n' "$DOMAIN" "$SCHEME" > "$BASE_DIR/config"
"$MAJ"

say "C'est en ligne"
echo "  Site :               $SCHEME://$DOMAIN"
echo "  Appli restaurant :   $SCHEME://$DOMAIN/cuisine"
echo "  Mises à jour :       automatiques (toutes les 5 minutes), ou tout de suite avec : sudo $MAJ"
[ "$SCHEME" = https ] || echo "  Attention : sans HTTPS, l'installation en appli (téléphone, tablette) n'est pas possible."
