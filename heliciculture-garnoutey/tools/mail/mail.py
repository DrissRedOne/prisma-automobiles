"""Mail de présentation du site à Joël (même facture que les mails CLOS, PRISMA et Grandes Tables d'Aquitaine).
HTML en tableaux de 600 px, styles en ligne, images hébergées avec le site (/mail/), couleurs du site.
Usage : python3 mail.py [adresse du site]   (défaut : https://heliciculture-garnoutey.vercel.app)
Écrit Garnoutey-mail.html (images en ligne) et preview.html (images locales, pour vérifier le rendu)."""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
SITE = (sys.argv[1] if len(sys.argv) > 1 else 'https://heliciculture-garnoutey.vercel.app').rstrip('/')

SANS = "'Helvetica Neue',Helvetica,Arial,sans-serif"
SERIF = "Georgia,'Times New Roman',serif"
C = dict(bg='#e9e1d2', card='#f6f1e7', ink='#1d1a16', body='#3a352d', muted='#5e584d', caramel='#8a5a2b', caramel2='#a8743f',
         rule='#e2d8c5', moss='#1b241b', moss_rule='#2f3a2e', ivory='#f4eee3', soft='#d9b88c', grey='#aaa596')

SEARCHES = ['escargots vivants Gironde', 'acheter des escargots près de Libourne', 'héliciculteur Gironde',
            'escargots pour les fêtes Bordeaux', 'escargots à la bordelaise recette', 'préparer des escargots vivants']
QUESTIONS = [
    'Jusqu’où tu livres avec la remorque ? Quels jours ? Il y a un minimum de commande ?',
    'Tes prix : à la douzaine, au kilo, et pour les pros ?',
    'Tu vends tes escargots déjà jeûnés, ou pas ?',
    'À quelle période de l’année tu as des escargots à vendre ?',
    'Tu élèves des petits-gris, des gros-gris, ou les deux ?',
    'Ils mangent bien des plantes semées dans la serre et des céréales ?',
    'Les jours et heures où on peut venir les chercher à la ferme ?',
    'Le téléphone et l’e-mail à afficher : 06 63 49 83 14 et locterra33@gmail.com, c’est bon ?',
    'Tu as un nom de domaine en tête ? Par exemple heliciculture-garnoutey.fr.',
    'Tu as des photos de toi à l’élevage, ou de tes escargots cuisinés ?',
    'Tu voudras un jour vendre des escargots cuisinés ? Il faudrait des démarches sanitaires (DDPP), on peut regarder ensemble.',
]


def button(href, label, bg, fg, pad='18px 30px'):
    return (f'<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center"><tr>'
            f'<td bgcolor="{bg}" style="background-color:{bg};border-radius:999px">'
            f'<a href="{href}" target="_blank" style="display:inline-block;padding:{pad};font-family:{SANS};font-size:12px;font-weight:bold;white-space:nowrap;'
            f'letter-spacing:2px;text-transform:uppercase;color:{fg};text-decoration:none;border-radius:999px">{label}</a>'
            f'</td></tr></table>')


def eyebrow(text, color, center=False):
    return (f'<p style="margin:0 0 8px;font-family:{SANS};font-size:10px;font-weight:bold;letter-spacing:4px;text-transform:uppercase;color:{color}'
            f'{";text-align:center" if center else ""}">{text}</p>')


def numbered(n, title):
    return (f'<p style="margin:0;padding:16px 0 4px;border-top:1px solid {C["rule"]};font-family:{SERIF};font-size:20px;'
            f'color:{C["ink"]}"><span style="color:{C["caramel2"]};font-style:italic">{n}.</span>&nbsp;&nbsp;{title}</p>')


def render(img):
    s = SITE
    searches = '<br>'.join(f'<span style="color:{C["caramel2"]}">&bull;</span>&nbsp;&nbsp;{q}' for q in SEARCHES)
    q_rows = ''.join(
        f'<tr><td width="34" valign="top" style="padding:10px 0;border-top:1px solid {C["rule"]};font-family:{SERIF};'
        f'font-style:italic;font-size:15px;color:{C["caramel2"]}">{i:02d}</td>'
        f'<td valign="top" style="padding:10px 0;border-top:1px solid {C["rule"]};font-family:{SANS};font-size:14px;line-height:1.55;color:{C["ink"]}">{t}</td></tr>'
        for i, t in enumerate(QUESTIONS, 1))
    photos = ''.join(
        f'<td width="{w}" valign="top" style="padding:{pad}"><a href="{s}/l-elevage" target="_blank"><img src="{img}/{f}" width="164" '
        f'alt="{alt}" style="display:block;width:100%;height:auto;border:0"></a></td>'
        for f, alt, w, pad in (('photo-serre.jpg', 'Une allée de la serre', '33%', '0 6px 0 0'),
                               ('photo-auge.jpg', 'Les escargots au bord de l’auge', '34%', '0 6px'),
                               ('photo-nuit.jpg', 'La nuit, ils sortent', '33%', '0 0 0 6px')))
    return f'''<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Joël, ton site est prêt</title></head>
<body style="margin:0;padding:0;background-color:{C["bg"]}">
<div style="margin:0;padding:0;background-color:{C["bg"]}">
<div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:{C["bg"]}">Ton site est en ligne : tes vidéos de la serre, tes escargots vivants à emporter ou livrés, une offre pour les particuliers et pour les pros.</div>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" bgcolor="{C["bg"]}" style="background-color:{C["bg"]}"><tr><td align="center" style="padding:28px 10px 34px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" bgcolor="{C["card"]}" style="width:100%;max-width:600px;background-color:{C["card"]};font-family:{SANS};color:{C["ink"]}">

<tr><td align="center" style="padding:40px 40px 0"><a href="{s}" target="_blank"><img src="{img}/logo.png" width="300" alt="Héliciculture du Garnoutey" style="display:block;width:300px;max-width:100%;height:auto;border:0;margin:0 auto"></a></td></tr>
<tr><td align="center" style="padding:18px 40px 0">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center"><tr><td width="44" height="1" bgcolor="{C["caramel2"]}" style="background-color:{C["caramel2"]};font-size:0;line-height:0">&nbsp;</td></tr></table>
<p style="margin:14px 0 0;font-size:10px;font-weight:bold;letter-spacing:4px;text-transform:uppercase;color:{C["muted"]}">Escargots élevés sous serre · Gironde</p>
</td></tr>

<tr><td align="center" style="padding:34px 44px 0">
<h1 style="margin:0 0 14px;font-family:{SERIF};font-weight:normal;font-size:36px;line-height:1.15;color:{C["ink"]}">Joël, <em style="color:{C["caramel2"]}">ton site est prêt.</em></h1>
<p style="margin:0 0 26px;font-size:15px;line-height:1.7;color:{C["body"]}">On a créé le site de l’Héliciculture du Garnoutey à l’image de ton élevage : tes vidéos de la serre, tes escargots vivants à emporter ou livrés avec ta remorque, et une page pour chaque acheteur. Il est déjà en ligne, sur ordinateur comme sur téléphone.</p>
{button(s, 'Découvrir mon site&nbsp;&nbsp;&rarr;', C["moss"], C["ivory"])}
<p style="margin:16px 0 0;font-size:14px"><a href="{s}/nos-escargots" target="_blank" style="color:{C["caramel"]}">Voir la page « Nos escargots » &rarr;</a></p>
</td></tr>

<tr><td style="padding:30px 0 0"><a href="{s}" target="_blank"><img src="{img}/apercu.jpg" width="600" alt="Aperçu du site sur ordinateur et sur téléphone" style="display:block;width:100%;max-width:600px;height:auto;border:0"></a></td></tr>

<tr><td style="padding:36px 0 0">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" bgcolor="{C["moss"]}" style="background-color:{C["moss"]}"><tr><td style="padding:36px 40px 38px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
<td width="160" valign="middle" style="width:160px;padding:0 26px 0 0"><a href="{s}/video/tunnel.mp4" target="_blank"><img src="{img}/video-serre.jpg" width="160" alt="Regarder la vidéo de la serre" style="display:block;width:160px;height:auto;border:0"></a></td>
<td valign="middle">
{eyebrow('Tes vidéos', C["soft"])}
<p style="margin:0 0 14px;font-family:{SERIF};font-size:26px;line-height:1.2;color:{C["ivory"]}">Ta serre, <em style="color:{C["soft"]}">en vrai.</em></p>
<p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:{C["grey"]}">Tes vidéos tournent en boucle en haut du site : les allées sous les filets, les planches, les escargots au bord de l’auge. On les a stabilisées et on a repris les couleurs. Rien de plus parlant pour donner confiance.</p>
<p style="margin:0;font-size:14px"><a href="{s}/video/tunnel.mp4" target="_blank" style="color:{C["soft"]}">Regarder la vidéo &#9658;</a></p>
</td></tr></table>
</td></tr></table>
</td></tr>

<tr><td style="padding:36px 44px 0">
{eyebrow('Ce que ton site va t’apporter', C["caramel"])}
<p style="margin:0 0 18px;font-family:{SERIF};font-size:27px;line-height:1.2;color:{C["ink"]}">Des acheteurs, <em style="color:{C["caramel2"]}">sans courir après.</em></p>
{numbered('I', 'Particuliers et pros, chacun sa page')}
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
<td valign="middle" style="padding:0 18px 16px 0;font-size:14px;line-height:1.6;color:{C["muted"]}">Une offre pour les particuliers, une pour les restaurants et les traiteurs, une pour les revendeurs et les conserveurs. Chacun voit tout de suite ce que tu proposes, et te contacte en un clic.</td>
<td width="112" valign="middle" style="width:112px;padding:0 0 16px"><a href="{s}/nos-escargots" target="_blank"><img src="{img}/escargots-mobile.jpg" width="112" alt="La page Nos escargots sur téléphone" style="display:block;width:112px;height:auto;border:0"></a></td>
</tr></table>
{numbered('II', 'Commander en deux minutes')}
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>
<td valign="middle" style="padding:0 18px 16px 0;font-size:14px;line-height:1.6;color:{C["muted"]}">À emporter à la ferme ou livré avec ta remorque : le formulaire prépare la commande (quantité, date, commune de livraison) et te l’envoie par e-mail. Ou bien on t’appelle directement, ton numéro est partout.</td>
<td width="112" valign="middle" style="width:112px;padding:0 0 16px"><a href="{s}/contact" target="_blank"><img src="{img}/commande-mobile.jpg" width="112" alt="Le formulaire de commande sur téléphone" style="display:block;width:112px;height:auto;border:0"></a></td>
</tr></table>
{numbered('III', 'Trouvé sur Google')}
<p style="margin:0 0 8px;font-size:14px;line-height:1.6;color:{C["muted"]}">Chaque page vise ce que les gens cherchent vraiment :</p>
<p style="margin:0;padding:0 0 18px;border-bottom:1px solid {C["rule"]};font-size:14px;line-height:1.9;color:{C["ink"]}">{searches}</p>
</td></tr>

<tr><td style="padding:30px 44px 0">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr>{photos}</tr></table>
<p style="margin:12px 0 0;text-align:center;font-family:{SERIF};font-style:italic;font-size:16px;color:{C["muted"]}">Ta serre, tes escargots, leurs nuits.</p>
</td></tr>

<tr><td style="padding:36px 0 0">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" bgcolor="{C["moss"]}" style="background-color:{C["moss"]}"><tr><td align="center" style="padding:36px 44px 38px">
{eyebrow('Préparation et recettes', C["soft"], True)}
<p style="margin:0 0 20px;font-family:{SERIF};font-size:26px;line-height:1.2;color:{C["ivory"]}">Tes escargots vivants, <em style="color:{C["soft"]}">et la façon de les préparer.</em></p>
<a href="{s}/recettes" target="_blank"><img src="{img}/recettes.jpg" width="512" alt="La page Recettes du site" style="display:block;width:100%;max-width:512px;height:auto;border:0;margin:0 auto"></a>
<p style="margin:16px 0 20px;font-size:14px;line-height:1.6;color:{C["grey"]}">Le jeûne, la cuisson, puis trois recettes : au beurre persillé, à la bordelaise, en cassolette. Tes clients achètent des escargots vivants l’esprit tranquille.</p>
{button(s + '/recettes', 'Voir les recettes&nbsp;&nbsp;&rarr;', C["soft"], C["moss"], '16px 28px')}
</td></tr></table>
</td></tr>

<tr><td style="padding:36px 44px 0">
{eyebrow('Le devis', C["caramel"])}
<p style="margin:0 0 16px;font-family:{SERIF};font-size:27px;line-height:1.2;color:{C["ink"]}">Un prix d’ami, <em style="color:{C["caramel2"]}">en 3 fois.</em></p>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-top:1px solid {C["rule"]};border-bottom:1px solid {C["rule"]}"><tr>
<td valign="middle" style="padding:18px 0">
<p style="margin:0;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:{C["muted"]}">Prix habituel <span style="text-decoration:line-through">1 600 € HT</span></p>
<p style="margin:4px 0 0;font-family:{SERIF};font-size:40px;line-height:1.1;color:{C["ink"]}">590 € <span style="font-size:18px;color:{C["muted"]}">HT</span></p>
</td>
<td valign="middle" align="right" style="padding:18px 0;font-size:14px;line-height:1.7;color:{C["body"]}">Soit <strong style="color:{C["ink"]}">3 fois 236 € TTC</strong><br>puis 120 € HT par an<br><span style="color:{C["muted"]}">hébergement, nom de domaine, petites modifications</span></td>
</tr></table>
<p style="margin:16px 0 0;font-size:14px;line-height:1.6;color:{C["muted"]}">Le devis est en pièce jointe. <strong style="color:{C["ink"]};font-weight:bold">En option, 90 € HT :</strong> une liste d’acheteurs prête à l’emploi, avec des restaurants de Gironde qui servent déjà des escargots, des traiteurs, des conserveries, des épiceries fines et les marchés près de chez toi. Coordonnées, exemple de message et tableau pour suivre tes appels. C’est le moment : ils préparent leurs menus de fêtes.</p>
</td></tr>

<tr><td style="padding:36px 44px 0">
{eyebrow('Pour le finaliser', C["caramel"])}
<p style="margin:0 0 12px;font-family:{SERIF};font-size:27px;line-height:1.2;color:{C["ink"]}">Il ne manque <em style="color:{C["caramel2"]}">que tes réponses.</em></p>
<p style="margin:0 0 14px;font-size:14px;line-height:1.6;color:{C["muted"]}">Le site n’apparaît pas encore sur Google : on l’ouvre dès que tu valides. Réponds simplement à ces questions :</p>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-bottom:1px solid {C["rule"]}">{q_rows}</table>
<p style="margin:16px 0 0;font-size:14px;line-height:1.6;color:{C["muted"]}">Pour vendre aux particuliers, la loi demande aussi d’avoir un médiateur de la consommation : on s’en occupe avec toi.</p>
</td></tr>

<tr><td style="padding:28px 44px 36px">
<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:{C["body"]}">Renvoie-moi le devis signé avec tes réponses, ou appelle-moi : on met le site en ligne dans la semaine.</p>
<p style="margin:0 0 4px;font-size:15px;color:{C["ink"]}">À très vite,</p>
<p style="margin:0;font-family:{SERIF};font-size:22px;color:{C["ink"]}">Driss REDOUANE</p>
<p style="margin:3px 0 0;font-size:13px;color:{C["muted"]}">Groupe Amane Conseils · <a href="tel:+33695675027" style="color:{C["caramel"]};text-decoration:none">06 95 67 50 27</a></p>
</td></tr>

<tr><td align="center" bgcolor="{C["moss"]}" style="background-color:{C["moss"]};padding:28px 30px 24px">
<a href="{s}" target="_blank"><img src="{img}/logo-sombre.png" width="200" alt="Héliciculture du Garnoutey" style="display:block;width:200px;height:auto;border:0;margin:0 auto 14px"></a>
<p style="margin:0;font-size:11px;line-height:1.6;color:{C["grey"]}">Site conçu par Groupe Amane Conseils · <a href="https://www.amaneconseils.com" target="_blank" style="color:{C["grey"]}">amaneconseils.com</a></p>
</td></tr>

</table>
</td></tr></table>
</div>
</body></html>
'''


IMG = os.environ.get('GARNOUTEY_MAIL_IMG', SITE + '/mail').rstrip('/')
html_online = render(IMG)
assert '—' not in html_online and '–' not in html_online, 'tiret long ou moyen'
open(os.path.join(HERE, 'Garnoutey-mail.html'), 'w', encoding='utf-8').write(html_online)
open(os.path.join(HERE, 'preview.html'), 'w', encoding='utf-8').write(render('file://' + os.path.join(ROOT, 'source', 'mail')))
print('Garnoutey-mail.html', len(html_online), 'octets')
