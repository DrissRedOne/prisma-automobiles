"""Mail de présentation du site à Joël (même facture que les mails CLOS, PRISMA et Grandes Tables d'Aquitaine).
HTML en tableaux de 600 px, styles en ligne, images hébergées avec le site (/mail/), couleurs du site.
Version courte (demande de Driss, 06/10/2026) : sans la section vidéo, l'essentiel en un écran ou deux.
Usage : python3 mail.py [adresse du site]   (défaut : https://heliciculture-garnoutey.vercel.app)
Écrit Garnoutey-mail.html (images en ligne), Garnoutey-mail-body.html (contenu du <body>, pour le brouillon),
Garnoutey-mail.txt (version texte du brouillon) et preview.html (images locales, pour vérifier le rendu)."""
import os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
SITE = (sys.argv[1] if len(sys.argv) > 1 else 'https://heliciculture-garnoutey.vercel.app').rstrip('/')

SANS = "'Helvetica Neue',Helvetica,Arial,sans-serif"
SERIF = "Georgia,'Times New Roman',serif"
C = dict(bg='#e9e1d2', card='#f6f1e7', ink='#1d1a16', body='#3a352d', muted='#5e584d', caramel='#8a5a2b', caramel2='#a8743f',
         rule='#e2d8c5', moss='#1b241b', moss_rule='#2f3a2e', ivory='#f4eee3', soft='#d9b88c', grey='#aaa596')

INTRO = 'Tes escargots vivants, à emporter à la ferme ou livrés avec ta remorque, et la façon de les préparer. Sur ordinateur comme sur téléphone.'
POINTS = [
    ('I', 'Trouvé sur Google', '« escargots vivants Gironde », « héliciculteur Gironde », « escargots pour les fêtes »…'),
    ('II', 'Une offre pour chaque acheteur', 'Particuliers, restaurants et traiteurs, revendeurs.'),
    ('III', 'Commander en deux minutes', 'Le formulaire t’envoie la commande par e-mail, ou on t’appelle directement.'),
]
# devis 2026-HDG-001 : 950 € HT (1 690 € HT au prix habituel, liste d'acheteurs offerte), 3 fois 380 € TTC
CADEAU = 'une liste d’acheteurs près de chez toi, prête à appeler (restaurants, traiteurs, marchés).'
QUESTIONS = [
    'La remorque : jusqu’où, quels jours, quel minimum de commande ?',
    'Tes prix : à la douzaine, au kilo, et pour les pros ?',
    'Petits-gris ou gros-gris ? Vendus jeûnés ? Nourris avec quoi ?',
    'À quelle période tu en as à vendre, et quand peut-on passer à la ferme ?',
    'On affiche bien le 06 63 49 83 14 et locterra33@gmail.com ?',
    'Un nom de domaine en tête ? Des photos de toi à l’élevage ?',
]
FIN = 'Renvoie-moi le devis signé avec tes réponses, et on met le site en ligne dans la semaine.'


def button(href, label, bg, fg, pad='18px 30px'):
    return (f'<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center"><tr>'
            f'<td bgcolor="{bg}" style="background-color:{bg};border-radius:999px">'
            f'<a href="{href}" target="_blank" style="display:inline-block;padding:{pad};font-family:{SANS};font-size:12px;font-weight:bold;white-space:nowrap;'
            f'letter-spacing:2px;text-transform:uppercase;color:{fg};text-decoration:none;border-radius:999px">{label}</a>'
            f'</td></tr></table>')


def eyebrow(text, color, center=False):
    return (f'<p style="margin:0 0 8px;font-family:{SANS};font-size:10px;font-weight:bold;letter-spacing:4px;text-transform:uppercase;color:{color}'
            f'{";text-align:center" if center else ""}">{text}</p>')


def point(n, title, text):
    return (f'<tr><td width="40" valign="top" style="padding:13px 0;border-top:1px solid {C["rule"]};font-family:{SERIF};font-style:italic;'
            f'font-size:19px;line-height:1.3;color:{C["caramel2"]}">{n}.</td>'
            f'<td valign="top" style="padding:13px 0;border-top:1px solid {C["rule"]}">'
            f'<p style="margin:0;font-family:{SERIF};font-size:19px;line-height:1.3;color:{C["ink"]}">{title}</p>'
            f'<p style="margin:3px 0 0;font-size:14px;line-height:1.55;color:{C["muted"]}">{text}</p></td></tr>')


NBSP = '\u00a0'


def typo(t):
    """Espaces insécables à la française (texte seul, jamais dans les balises)."""
    t = t.replace('« ', '«' + NBSP).replace(' »', NBSP + '»')
    t = re.sub(r' ([?!:;])', NBSP + r'\1', t)
    t = re.sub(r'(\d) (\d{3})\b', r'\1' + NBSP + r'\2', t)
    t = re.sub(r'(\d) (€|%|fois)', r'\1' + NBSP + r'\2', t)
    t = re.sub(r'€ (HT|TTC)', '€' + NBSP + r'\1', t)
    return re.sub(r'0\d(?: \d\d){4}', lambda m: m.group(0).replace(' ', NBSP), t)


def typo_html(h):
    return ''.join(x if x.startswith('<') else typo(x) for x in re.split(r'(<[^>]+>)', h))


def render(img):
    s = SITE
    points = ''.join(point(*p) for p in POINTS)
    q_rows = ''.join(
        f'<tr><td width="34" valign="top" style="padding:10px 0;border-top:1px solid {C["rule"]};font-family:{SERIF};'
        f'font-style:italic;font-size:15px;color:{C["caramel2"]}">{i:02d}</td>'
        f'<td valign="top" style="padding:10px 0;border-top:1px solid {C["rule"]};font-family:{SANS};font-size:14px;line-height:1.55;color:{C["ink"]}">{t}</td></tr>'
        for i, t in enumerate(QUESTIONS, 1))
    return f'''<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Joël, ton site est prêt</title></head>
<body style="margin:0;padding:0;background-color:{C["bg"]}">
<div style="margin:0;padding:0;background-color:{C["bg"]}">
<div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:{C["bg"]}">Tes escargots vivants, à emporter ou livrés avec ta remorque. Le devis et 6 questions pour le finir.</div>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" bgcolor="{C["bg"]}" style="background-color:{C["bg"]}"><tr><td align="center" style="padding:28px 10px 34px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" bgcolor="{C["card"]}" style="width:100%;max-width:600px;background-color:{C["card"]};font-family:{SANS};color:{C["ink"]}">

<tr><td align="center" style="padding:40px 40px 0"><a href="{s}" target="_blank"><img src="{img}/logo.png" width="300" alt="Héliciculture du Garnoutey" style="display:block;width:300px;max-width:100%;height:auto;border:0;margin:0 auto"></a></td></tr>
<tr><td align="center" style="padding:18px 40px 0">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center"><tr><td width="44" height="1" bgcolor="{C["caramel2"]}" style="background-color:{C["caramel2"]};font-size:0;line-height:0">&nbsp;</td></tr></table>
<p style="margin:14px 0 0;font-size:10px;font-weight:bold;letter-spacing:4px;text-transform:uppercase;color:{C["muted"]}">Escargots élevés sous serre · Gironde</p>
</td></tr>

<tr><td align="center" style="padding:32px 44px 0">
<h1 style="margin:0 0 14px;font-family:{SERIF};font-weight:normal;font-size:36px;line-height:1.15;color:{C["ink"]}">Joël, <em style="color:{C["caramel2"]}">ton site est prêt.</em></h1>
<p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:{C["body"]}">{INTRO}</p>
{button(s, 'Découvrir mon site&nbsp;&nbsp;&rarr;', C["moss"], C["ivory"])}
</td></tr>

<tr><td style="padding:28px 0 0"><a href="{s}" target="_blank"><img src="{img}/apercu.jpg" width="600" alt="Aperçu du site sur ordinateur et sur téléphone" style="display:block;width:100%;max-width:600px;height:auto;border:0"></a></td></tr>

<tr><td style="padding:34px 44px 0">
{eyebrow('Ce que ton site va t’apporter', C["caramel"])}
<p style="margin:0 0 14px;font-family:{SERIF};font-size:27px;line-height:1.2;color:{C["ink"]}">Des acheteurs, <em style="color:{C["caramel2"]}">sans courir après.</em></p>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-bottom:1px solid {C["rule"]}">{points}</table>
</td></tr>

<tr><td style="padding:34px 0 0">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" bgcolor="{C["moss"]}" style="background-color:{C["moss"]}"><tr><td style="padding:32px 44px 34px">
{eyebrow('Le devis', C["soft"])}
<p style="margin:0 0 16px;font-family:{SERIF};font-size:27px;line-height:1.2;color:{C["ivory"]}">Un prix d’ami, <em style="color:{C["soft"]}">en 3 fois.</em></p>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-top:1px solid {C["moss_rule"]};border-bottom:1px solid {C["moss_rule"]}"><tr>
<td style="padding:16px 0 18px">
<p style="margin:0;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:{C["grey"]}">Prix habituel <span style="text-decoration:line-through;white-space:nowrap">1 690 € HT</span></p>
<p style="margin:4px 0 0;font-family:{SERIF};font-size:40px;line-height:1.1;color:{C["ivory"]};white-space:nowrap">950 € <span style="font-size:18px;color:{C["grey"]}">HT</span></p>
<p style="margin:8px 0 0;font-size:14px;line-height:1.6;color:{C["grey"]}">Soit <strong style="color:{C["ivory"]}">3 fois 380 € TTC</strong>, puis 120 € HT par an pour l’hébergement, le nom de domaine et les petites modifications.</p>
</td></tr></table>
<p style="margin:16px 0 0;font-size:14px;line-height:1.6;color:{C["grey"]}">Devis en pièce jointe. <strong style="color:{C["soft"]}">Offerte avec le site :</strong> {CADEAU}</p>
</td></tr></table>
</td></tr>

<tr><td style="padding:34px 44px 0">
{eyebrow('Pour le finir', C["caramel"])}
<p style="margin:0 0 12px;font-family:{SERIF};font-size:27px;line-height:1.2;color:{C["ink"]}">Il ne manque <em style="color:{C["caramel2"]}">que tes réponses.</em></p>
<p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:{C["muted"]}">Le site est encore caché de Google : on l’ouvre dès que tu as répondu.</p>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border-bottom:1px solid {C["rule"]}">{q_rows}</table>
</td></tr>

<tr><td style="padding:26px 44px 36px">
<p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:{C["body"]}">{FIN}</p>
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


def texte():
    pts = '\n'.join(f'{n}. {t} : {x[0].lower() + x[1:]}' for n, t, x in POINTS)
    qs = '\n'.join(f'{i}. {q}' for i, q in enumerate(QUESTIONS, 1))
    return f'''Joël, ton site est prêt.

{INTRO}
{SITE}

Ce que ton site va t’apporter :
{pts}

Le devis (en pièce jointe) : 950 € HT au lieu de 1 690 €, soit 3 fois 380 € TTC, puis 120 € HT par an (hébergement, nom de domaine, petites modifications).
Offerte avec le site : {CADEAU}

Le site est encore caché de Google : on l’ouvre dès que tu as répondu.
{qs}

{FIN}

À très vite,
Driss REDOUANE
Groupe Amane Conseils · 06 95 67 50 27
'''


IMG = os.environ.get('GARNOUTEY_MAIL_IMG', SITE + '/mail').rstrip('/')
# insécables écrites &nbsp; (visibles, donc recopiées à l'identique dans le brouillon Gmail) ; texte brut avec des espaces simples
html_online = typo_html(render(IMG)).replace(NBSP, '&nbsp;')
txt = texte()
for doc in (html_online, txt):
    assert '—' not in doc and '–' not in doc, 'tiret long ou moyen'
    assert 'comptab' not in doc.lower() and 'samuel' not in doc.lower()
open(os.path.join(HERE, 'Garnoutey-mail.html'), 'w', encoding='utf-8').write(html_online)
body = re.search(r'<body[^>]*>\n(.*)</body>', html_online, re.S).group(1)
open(os.path.join(HERE, 'Garnoutey-mail-body.html'), 'w', encoding='utf-8').write(body)
open(os.path.join(HERE, 'Garnoutey-mail.txt'), 'w', encoding='utf-8').write(txt)
open(os.path.join(HERE, 'preview.html'), 'w', encoding='utf-8').write(typo_html(render('file://' + os.path.join(ROOT, 'source', 'mail'))))
print('Garnoutey-mail.html', len(html_online), 'octets ; corps', len(body), '; texte', len(txt))
