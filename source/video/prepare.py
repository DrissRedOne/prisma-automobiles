"""
Prépare les images utilisées par le film à partir de l'application :
  - véhicules détourés (extraits de src/photos.js) + boîtes englobantes (assets/cars/bbox.js) ;
  - captures de l'appli (faites par capture.js) converties en textures (assets/app-tex/*.jpg),
    dont la page d'accueil défilante recollée (m-scroll) et son en-tête fixe (m-header).
Usage : python3 prepare.py   (après python3 ../build.py et node capture.js)
"""
import base64
import io
import json
import os
from PIL import Image
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, '..', 'src')
A = os.path.join(HERE, 'assets')

# ---------- véhicules détourés ----------
os.makedirs(os.path.join(A, 'cars'), exist_ok=True)
s = open(os.path.join(SRC, 'photos.js'), encoding='utf-8').read()
photos = json.loads(s[s.index('{'):s.rindex('}') + 1])
bbox, credits = {}, []
for vid, v in photos.items():
    im = Image.open(io.BytesIO(base64.b64decode(v['cut'].split(',')[1]))).convert('RGBA')
    im.save(os.path.join(A, 'cars', vid + '.png'))
    ys, xs = np.nonzero(np.asarray(im.getchannel('A')) > 128)
    bbox[vid] = [int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1]
    credits.append({'id': vid, **v['credit']})
with open(os.path.join(A, 'cars', 'bbox.js'), 'w', encoding='utf-8') as f:
    f.write('/* Boîte englobante de chaque véhicule détouré (pixels, alpha > 50 %) */\nconst CAR_BBOX = ' + json.dumps(bbox) + ';\n')
json.dump(credits, open(os.path.join(A, 'cars', 'credits.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

# ---------- captures de l'application ----------
app, tex = os.path.join(A, 'app'), os.path.join(A, 'app-tex')
os.makedirs(tex, exist_ok=True)
for name in sorted(os.listdir(app)):
    if name.endswith('.png') and name not in ('m-scroll.png', 'm-defilement.png'):
        Image.open(os.path.join(app, name)).convert('RGB').save(os.path.join(tex, name[:-4] + '.jpg'), quality=93)
# page d'accueil défilante : captures successives recollées (l'en-tête est rendu à part, fixe)
parts = json.load(open(os.path.join(app, 'scroll', 'parts.json')))
H = parts['endY'] * 3
page = Image.new('RGB', (1170, H), (0, 0, 0))
for p in parts['parts']:
    page.paste(Image.open(p['f']).convert('RGB'), (0, p['y'] * 3))
# pleine définition ; on garde les 6,2 premières largeurs d'écran (le défilement s'arrête à 3,25) : < 8192 px
page.crop((0, 0, 1170, min(H, round(1170 * 6.2)))).save(os.path.join(tex, 'm-scroll.jpg'), quality=94)
print('véhicules :', len(bbox), '· textures :', len(os.listdir(tex)))
