"""Mail de présentation du site à CLOS (même facture que les mails PRISMA et Grandes Tables d'Aquitaine).
HTML en tableaux de 600 px, styles en ligne, images hébergées avec le site (/mail/), à coller dans Gmail :
ouvrir le fichier dans Chrome, tout sélectionner, copier, coller dans le message.
Usage : python3 mail.py [adresse du site]   (défaut : https://clos.reydenweb.fr ; images : variable CLOS_MAIL_IMG)
Écrit CLOS-mail.html (images en ligne) et preview.html (images locales, pour vérifier le rendu)."""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
SITE = (sys.argv[1] if len(sys.argv) > 1 else 'https://clos.reydenweb.fr').rstrip('/')

SANS = "'Century Gothic',Futura,'Trebuchet MS',Arial,sans-serif"
SERIF = "Georgia,'Times New Roman',serif"
C = dict(bg='#ece4d3', card='#faf4e9', ink='#1d1e16', body='#3d3f30', muted='#5d604c', olive='#666d45',
         rule='#e3d9c6', night='#15160f', cream='#f5ead8', brass='#b8955f', brass_soft='#d9c49c', grey='#a9a690')

SEARCHES = ['restaurant gare Saint-Jean Bordeaux', 'bar à vins Bordeaux Saint-Jean', 'restaurant fait maison Bordeaux',
            'vins nature Bordeaux', 'privatisation restaurant Bordeaux', 'repas d’affaires Bordeaux']
TODO = ['Tes horaires et tes jours de fermeture',
        'Le numéro à afficher (on a mis le 06 68 45 10 08, celui de TheFork)',
        'Quelques photos de tes plats, de la salle et de la façade',
        'Ta carte complète, avec les vins et les cocktails',
        'Tes conditions pour les groupes (couverts, menus)',
        'Ton accord pour la phrase « Ouvert en septembre 2025 par Maria et Mathieu Masse »']


def button(href, label, bg, fg, pad='18px 30px'):
    return (f'<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center"><tr>'
            f'<td bgcolor="{bg}" style="background-color:{bg};border-radius:999px">'
            f'<a href="{href}" target="_blank" style="display:inline-block;padding:{pad};font-family:{SANS};font-size:12px;white-space:nowrap;'
            f'letter-spacing:2px;text-transform:uppercase;color:{fg};text-decoration:none;border-radius:999px">{label}</a>'
            f'</td></tr></table>')


def eyebrow(text, color, center=False):
    return (f'<p style="margin:0 0 6px;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:{color}'
            f'{";text-align:center" if center else ""}">{text}</p>')


def numbered(n, title, extra=''):
    return (f'<p style="margin:0;padding:16px 0 4px;border-top:1px solid {C["rule"]};font-family:{SERIF};font-size:19px;'
            f'color:{C["ink"]}"><span style="color:{C["olive"]};font-style:italic">{n}.</span>&nbsp;&nbsp;{title}{extra}</p>')


def render(img):
    s = SITE
    searches = '<br>'.join(f'<span style="color:{C["olive"]}">•</span>&nbsp;&nbsp;{q}' for q in SEARCHES)
    todo_rows = ''.join(
        f'<tr><td width="34" valign="top" style="padding:10px 0;border-top:1px solid {C["rule"]};font-family:{SERIF};'
        f'font-style:italic;font-size:15px;color:{C["olive"]}">{i:02d}</td>'
        f'<td valign="top" style="padding:10px 0;border-top:1px solid {C["rule"]};font-size:14px;line-height:1.55;color:{C["ink"]}">{t}</td></tr>'
        for i, t in enumerate(TODO, 1))
    photos = ''.join(
        f'<td width="{w}" valign="top" style="padding:{pad}"><a href="{s}" target="_blank"><img src="{img}/{f}" width="164" '
        f'alt="{alt}" style="display:block;width:100%;height:auto;border:0"></a></td>'
        for f, alt, w, pad in (('photo-cuisine.jpg', 'Poulpe snacké, crème de chorizo', '33%', '0 5px 0 0'),
                               ('photo-comptoir.jpg', 'Le comptoir', '34%', '0 5px'),
                               ('photo-vins.jpg', 'Les vins nature', '33%', '0 0 0 5px')))
    return f'''<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Maria, ton site du Clos est prêt</title></head>
<body style="margin:0;padding:0;background-color:{C["bg"]}">
<div style="margin:0;padding:0;background-color:{C["bg"]}">
<div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:{C["bg"]}">Ton site est en ligne : ta carte, ton bar à vins, la privatisation et la réservation en un clic.</div>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" bgcolor="{C["bg"]}" style="background-color:{C["bg"]}"><tr><td align="center" style="padding:28px 10px 34px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" bgcolor="{C["card"]}" style="width:100%;max-width:600px;background-color:{C["card"]};font-family:{SANS};color:{C["ink"]}">

<tr><td align="center" style="padding:40px 40px 0"><a href="{s}" target="_blank"><img src="{img}/logo.png" width="120" height="120" alt="CLOS Restaurant" style="display:block;width:120px;height:120px;border:0;margin:0 auto"></a></td></tr>
<tr><td align="center" style="padding:18px 40px 0">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center"><tr><td width="44" height="1" bgcolor="{C["olive"]}" style="background-color:{C["olive"]};font-size:0;line-height:0">&nbsp;</td></tr></table>
<p style="margin:14px 0 0;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:{C["muted"]}">Restaurant · Bar · Wine bar · Bordeaux</p>
</td></tr>

<tr><td align="center" style="padding:34px 44px 0">
<h1 style="margin:0 0 14px;font-family:{SERIF};font-weight:400;font-size:34px;line-height:1.15;color:{C["ink"]}">Maria, <em style="color:{C["olive"]}">ton site est prêt.</em></h1>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;color:{C["body"]}">On a créé le site du Clos à l’image de ta maison : ton logo, tes couleurs, ta carte, ton bar à vins et la réservation TheFork en un clic. Il est déjà en ligne, sur ordinateur comme sur téléphone.</p>
{button(s, 'Découvrir mon site&nbsp;&nbsp;→', C["olive"], C["cream"])}
<p style="margin:16px 0 0;font-size:14px"><a href="{s}/la-carte" target="_blank" style="color:{C["olive"]}">Voir ta carte en ligne →</a></p>
</td></tr>

<tr><td style="padding:30px 0 0"><a href="{s}" target="_blank"><img src="{img}/apercu.jpg" width="600" alt="Aperçu du site du Clos sur ordinateur et sur téléphone" style="display:block;width:100%;max-width:600px;height:auto;border:0"></a></td></tr>

<tr><td style="padding:36px 44px 0">
{eyebrow('Ce que ton site va t’apporter', C["olive"])}
<p style="margin:0 0 18px;font-family:{SERIF};font-size:26px;line-height:1.2;color:{C["ink"]}">Plus de tables réservées, <em style="color:{C["olive"]}">sans effort.</em></p>
{numbered('I', 'Trouvé par ceux qui cherchent où manger')}
<p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:{C["muted"]}">Chaque page vise une recherche précise sur Google :</p>
<p style="margin:0 0 16px;font-size:14px;line-height:1.9;color:{C["ink"]}">{searches}</p>
{numbered('II', 'Réserver en un clic, partout')}
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
<td valign="middle" style="padding:0 18px 16px 0;font-size:14px;line-height:1.6;color:{C["muted"]}">TheFork, appel direct, itinéraire à pied depuis la gare Saint-Jean : tes clients réservent en quelques secondes, sur téléphone comme sur ordinateur. Et ta carte se consulte d’un pouce, plat par plat, avec les prix.</td>
<td width="112" valign="middle" style="width:112px;padding:0 0 16px"><a href="{s}/la-carte" target="_blank"><img src="{img}/carte-mobile.jpg" width="112" alt="La carte du Clos sur téléphone" style="display:block;width:112px;height:auto;border:0"></a></td>
</tr></table>
{numbered('III', 'Les entreprises aussi', f'&nbsp;&nbsp;<span style="font-family:{SANS};font-size:10px;letter-spacing:2px;text-transform:uppercase;color:{C["cream"]};background-color:{C["olive"]};padding:3px 8px;vertical-align:middle">Privatisation</span>')}
<p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:{C["muted"]}">Une page dédiée aux repas d’équipe, aux dîners d’affaires et aux anniversaires, avec un formulaire de demande. Devis et facture au nom de l’entreprise : de quoi remplir la salle en semaine.</p>
<p style="margin:0;padding:0 0 18px;border-bottom:1px solid {C["rule"]};font-size:14px"><a href="{s}/privatisation" target="_blank" style="color:{C["olive"]}">Voir la page Privatisation →</a></p>
</td></tr>

<tr><td style="padding:30px 44px 0">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>{photos}</tr></table>
<p style="margin:12px 0 0;text-align:center;font-family:{SERIF};font-style:italic;font-size:15px;color:{C["muted"]}">Ta cuisine, ton comptoir, tes vins.</p>
<p style="margin:4px 0 0;text-align:center;font-size:11px;color:{C["grey"]}">Photos d’illustration, en attendant les tiennes.</p>
</td></tr>

<tr><td style="padding:36px 0 0">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" bgcolor="{C["night"]}" style="background-color:{C["night"]}"><tr><td align="center" style="padding:36px 44px 38px">
<p style="margin:0 0 8px;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:{C["brass_soft"]}">Le bar &amp; le wine bar</p>
<p style="margin:0 0 20px;font-family:{SERIF};font-size:26px;line-height:1.2;color:{C["cream"]}">Vins nature et cocktails, <em style="color:{C["brass_soft"]}">au comptoir.</em></p>
<a href="{s}/bar-a-vins" target="_blank"><img src="{img}/bar.jpg" width="512" alt="La page Bar à vins du site du Clos" style="display:block;width:100%;max-width:512px;height:auto;border:0;margin:0 auto"></a>
<p style="margin:16px 0 20px;font-size:14px;line-height:1.6;color:{C["grey"]}">Une page rien que pour ton comptoir : vins nature, cocktails, fromages affinés, et l’adresse idéale pour un verre avant le train.</p>
{button(s + '/bar-a-vins', 'Voir le bar à vins&nbsp;&nbsp;→', C["brass_soft"], C["night"], '16px 28px')}
</td></tr></table>
</td></tr>

<tr><td style="padding:36px 44px 0">
{eyebrow('Pour le finaliser', C["olive"])}
<p style="margin:0 0 12px;font-family:{SERIF};font-size:26px;line-height:1.2;color:{C["ink"]}">Il ne manque <em style="color:{C["olive"]}">que toi.</em></p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.6;color:{C["muted"]}">Le site n’apparaît pas encore sur Google : on l’ouvre dès que tu valides. Envoie-nous simplement :</p>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-bottom:1px solid {C["rule"]}">{todo_rows}</table>
<p style="margin:16px 0 0;font-size:14px;line-height:1.6;color:{C["muted"]}">Ensuite, on le met à ton adresse <strong style="color:{C["ink"]};font-weight:normal">clos-restaurant.com</strong> : il nous faudra un accès à ton compte IONOS, et ta messagerie ne sera pas touchée.</p>
</td></tr>

<tr><td style="padding:28px 44px 36px">
<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:{C["body"]}">Réponds simplement à ce mail avec tout ça, ou appelle-moi : on ajuste tout ce que tu veux.</p>
<p style="margin:0 0 4px;font-size:15px;color:{C["ink"]}">À très vite,</p>
<p style="margin:0;font-family:{SERIF};font-size:22px;color:{C["ink"]}">Driss REDOUANE</p>
<p style="margin:3px 0 0;font-size:13px;color:{C["muted"]}">Groupe Amane Conseils · <a href="tel:+33695675027" style="color:{C["olive"]};text-decoration:none">06 95 67 50 27</a></p>
</td></tr>

<tr><td align="center" bgcolor="{C["night"]}" style="background-color:{C["night"]};padding:28px 30px 24px">
<a href="{s}" target="_blank"><img src="{img}/logo.png" width="64" height="64" alt="CLOS Restaurant" style="display:block;width:64px;height:64px;border:0;margin:0 auto 14px"></a>
<p style="margin:0;font-size:11px;line-height:1.6;color:{C["grey"]}">Site conçu par Groupe Amane Conseils · <a href="https://www.amaneconseils.com" target="_blank" style="color:{C["grey"]}">amaneconseils.com</a></p>
</td></tr>

</table>
</td></tr></table>
</div>
</body></html>
'''


# images : sur le site (/mail/) par défaut ; CLOS_MAIL_IMG permet de les servir depuis une autre adresse
# (par exemple les fichiers du dépôt GitHub à une version figée, tant que le VPS n'a pas le dossier /mail/)
IMG = os.environ.get('CLOS_MAIL_IMG', SITE + '/mail').rstrip('/')
html_online = render(IMG)
assert '—' not in html_online and '–' not in html_online, 'tiret long ou moyen'
open(os.path.join(HERE, 'CLOS-mail.html'), 'w', encoding='utf-8').write(html_online)
open(os.path.join(HERE, 'preview.html'), 'w', encoding='utf-8').write(render('file://' + os.path.join(ROOT, 'source', 'mail')))
print('CLOS-mail.html', len(html_online), 'octets')
