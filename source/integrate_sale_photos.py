"""Intègre les photos des véhicules à vendre (vitrine d'occasion).

Usage : python3 integrate_sale_photos.py <dossier des photos>

Le dossier contient des JPEG nommés par identifiant d'annonce (vo-3008.jpg…), plaques déjà floutées,
avec credits.json (auteur, licence, source) et, si besoin, erase.json (zones du décor à retirer du
détourage, en coordonnées de la photo de 1920 px). Pour chaque annonce : une photo (JPEG 960 px) et une
version détourée (WebP transparent) posée sur le fond studio du site. Écrit src/sale-photos.js.
"""
import json, os, sys
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import integrate_photos as ip  # détourage et encodage communs avec la flotte de location


def main():
    folder = sys.argv[1]
    credits = {c.get('id'): {'title': c.get('titre'), 'author': c.get('auteur'), 'license': c.get('licence'), 'source': c.get('source'), 'site': 'Photo libre de droits'}
               for c in json.load(open(os.path.join(folder, 'credits.json'), encoding='utf-8'))}
    erase_path = os.path.join(folder, 'erase.json')
    if os.path.exists(erase_path):
        for k, polys in json.load(open(erase_path, encoding='utf-8')).items():
            ip.ERASE[k] = [[tuple(pt) for pt in poly] for poly in polys]
    from rembg import new_session
    session = new_session('isnet-general-use')
    out, report = {}, []
    ids = sorted(f[:-4] for f in os.listdir(folder) if f.startswith('vo-') and f.endswith('.jpg'))
    os.makedirs(os.path.join(HERE, 'shots'), exist_ok=True)
    for sid in ids:
        img = Image.open(os.path.join(folder, sid + '.jpg'))
        entry = {'src': ip.data_uri(ip.cover(img, 960), 'JPEG', quality=78, optimize=True, progressive=True)}
        cut = ip.cutout(img, session, sid)
        if cut:
            entry['cut'] = ip.data_uri(cut, 'WEBP', quality=86, method=6)
            cut.save(os.path.join(HERE, 'shots', f'cut-{sid}.png'))
        if sid in credits:
            entry['credit'] = credits[sid]
        out[sid] = entry
        report.append(f"{sid} : photo {len(entry['src']) // 1024} Ko" + (f", détourée {len(entry['cut']) // 1024} Ko" if 'cut' in entry else ', DÉTOURAGE ÉCHOUÉ'))
    with open(os.path.join(HERE, 'src', 'sale-photos.js'), 'w', encoding='utf-8') as f:
        f.write('/* Photos des véhicules à vendre (photo et version détourée), libres de droits : crédits dans chaque entrée */\nconst EMBEDDED_SALE_PHOTOS = ' + json.dumps(out) + ';\n')
    print('\n'.join(report))


if __name__ == '__main__':
    main()
