"""Tire des films de l'élevage (videos/sources, non publiés) l'image la plus nette de chaque passage choisi.
Sortie : photos/films/<nom>.jpg (720 x 1280, avant étalonnage ; tools/photos.py fait le reste)."""
import glob, os, subprocess, sys, tempfile
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FF = os.environ.get('FFMPEG', '/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2')
# nom -> (film, début, fin) en secondes
PASSAGES = {
    'tunnel':   ('v3.mp4', 64.5, 68.0),   # allée sous le filet, champ au loin
    'allee':    ('v3.mp4', 26.6, 29.6),   # rangées de planches
    'auge':     ('v1.mp4', 22.9, 26.2),   # gros plan, escargots au bord de l'auge
    'planches': ('v1.mp4', 12.4, 16.4),   # planches dressées et auge
    'repos':    ('v3.mp4', 19.4, 21.4),   # planches couvertes d'escargots, filet au-dessus
    'detail':   ('v3.mp4', 47.4, 49.6),   # gros plan d'une planche
}


def nettete(path):
    a = np.asarray(Image.open(path).convert('L'), np.float32)
    lap = a[1:-1, 1:-1] * 4 - a[:-2, 1:-1] - a[2:, 1:-1] - a[1:-1, :-2] - a[1:-1, 2:]
    return float(lap.var())


os.makedirs(os.path.join(ROOT, 'photos', 'films'), exist_ok=True)
for nom, (film, t0, t1) in PASSAGES.items():
    if sys.argv[1:] and nom not in sys.argv[1:]:
        continue
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run([FF, '-hide_banner', '-loglevel', 'error', '-ss', str(t0), '-t', str(t1 - t0), '-i',
                        os.path.join(ROOT, 'videos', 'sources', film), '-an', os.path.join(tmp, 'f%04d.png')], check=True)
        fs = sorted(glob.glob(os.path.join(tmp, 'f*.png')))
        scores = [(nettete(f), f) for f in fs]
        best = max(scores)
        Image.open(best[1]).convert('RGB').save(os.path.join(ROOT, 'photos', 'films', nom + '.jpg'), quality=95, subsampling=0)
        i = fs.index(best[1])
        print(f'{nom} : image {i + 1}/{len(fs)} (t = {t0 + i / 30:.2f} s), netteté {best[0]:.0f} (médiane {np.median([s for s, _ in scores]):.0f})')
