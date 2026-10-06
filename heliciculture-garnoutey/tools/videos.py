"""Prépare les vidéos du site à partir des films tournés à l'élevage (videos/sources, non publiés) :
stabilisation (vidstab), léger ralenti par interpolation, étalonnage commun (table 3D tirée de grade.py),
boucle sans à-coup (la fin se fond dans le début), encodage H.264 (MP4) et VP9 (WebM), image d'attente (poster).
Sortie : source/video/<nom>.mp4 et .webm, source/img/<nom>-poster-<largeur>.webp, build/videos.json

Usage : python3 tools/videos.py [nom ...]   (sans argument : toutes les vidéos)
"""
import base64, hashlib, io, json, os, subprocess, sys
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)
from grade import write_cube

FF = os.environ.get('FFMPEG', '/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2')
SRC = os.path.join(ROOT, 'videos', 'sources')
OUT_V = os.path.join(ROOT, 'source', 'video')
OUT_I = os.path.join(ROOT, 'source', 'img')
TMP = os.path.join(ROOT, 'build', 'travail')     # fichiers intermédiaires (non publiés)

# nom -> (film, début en s, durée en s, vitesse, texte alternatif du poster)
CLIPS = {
    'tunnel': ('v3.mp4', 64.55, 3.6, 0.62, "Allée d'une serre d'élevage sous filet d'ombrage, planches couvertes d'escargots, champ au loin"),
    'allee':  ('v3.mp4', 26.7, 3.0, 0.62, "Rangées de planches en bois couvertes d'escargots sous le filet d'ombrage"),
    'auge':   ('v1.mp4', 22.9, 3.3, 0.62, "Gros plan sur des escargots petits-gris rassemblés au bord d'une auge"),
}
FADE = 0.8        # durée du fondu de bouclage (s, après ralenti)
W, H = 720, 1280


def run(args):
    r = subprocess.run([FF, '-hide_banner', '-loglevel', 'error', '-y'] + args, capture_output=True, text=True)
    if r.returncode:
        raise SystemExit('ffmpeg : ' + r.stderr[-2000:])


def duration(path):
    r = subprocess.run([FF, '-hide_banner', '-i', path], capture_output=True, text=True)
    for line in r.stderr.splitlines():
        if 'Duration:' in line:
            h, m, s = line.split('Duration:')[1].split(',')[0].strip().split(':')
            return int(h) * 3600 + int(m) * 60 + float(s)
    raise SystemExit('durée introuvable : ' + path)


def build(name, spec, cube):
    film, start, dur, speed, alt = spec
    src = os.path.join(SRC, film)
    trf = os.path.join(TMP, f'{name}-{start}-{dur}.trf')
    # 1. analyse des secousses (une fois par passage)
    if not os.path.exists(trf):
        run(['-ss', str(start), '-t', str(dur), '-i', src, '-an', '-vf', f'vidstabdetect=shakiness=7:accuracy=15:result={trf}', '-f', 'null', '-'])
    # 2. stabilisation, ralenti interpolé, étalonnage, mise à la taille (étape longue : refaite seulement si un réglage change)
    slow = '' if speed >= 0.999 else f'setpts=PTS/{speed},minterpolate=fps=30:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,'
    vf = (f'vidstabtransform=input={trf}:smoothing=40:optzoom=1:zoomspeed=0.25:interpol=bicubic,'
          f'{slow}lut3d=file={cube}:interp=tetrahedral,'
          f'scale={W}:{H}:force_original_aspect_ratio=increase:flags=lanczos,crop={W}:{H},unsharp=5:5:0.35:5:5:0,fps=30,format=yuv420p')
    mid = os.path.join(TMP, name + '-mid.mp4')
    key = hashlib.sha256(repr((film, start, dur, speed, vf.replace(trf, ''))).encode() + open(cube, 'rb').read()).hexdigest()
    cle = mid + '.cle'
    if not (os.path.exists(mid) and os.path.exists(cle) and open(cle).read() == key):
        run(['-ss', str(start), '-t', str(dur), '-i', src, '-an', '-vf', vf, '-c:v', 'libx264', '-crf', '12', '-preset', 'medium', mid])
        open(cle, 'w').write(key)
    # 3. boucle : la fin se fond dans le début, la dernière image rejoint la première (intermédiaire de qualité)
    L = duration(mid)
    loop = os.path.join(TMP, name + '-boucle.mp4')
    fc = (f'[0:v]fps=30,split[a][b];[a]trim=start={FADE},setpts=PTS-STARTPTS,fps=30[a1];[b]trim=end={FADE},setpts=PTS-STARTPTS,fps=30[b1];'
          f'[a1][b1]xfade=transition=fade:duration={FADE}:offset={L - 2 * FADE:.3f},format=yuv420p[v]')
    run(['-i', mid, '-filter_complex', fc, '-map', '[v]', '-an', '-c:v', 'libx264', '-crf', '12', '-preset', 'medium', '-r', '30', loop])
    # 4. deux formats pour le web : H.264 (lu partout) et VP9 en WebM (navigateurs sans H.264)
    out = os.path.join(OUT_V, name + '.mp4')
    run(['-i', loop, '-an', '-c:v', 'libx264', '-crf', '26', '-preset', 'veryslow', '-profile:v', 'high', '-level', '4.0',
         '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out])
    webm = os.path.join(OUT_V, name + '.webm')
    log = os.path.join(TMP, name + '-vp9')
    common = ['-i', loop, '-an', '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '37', '-row-mt', '1', '-tile-columns', '1', '-pix_fmt', 'yuv420p', '-passlogfile', log]
    run(common + ['-pass', '1', '-deadline', 'good', '-cpu-used', '4', '-f', 'webm', os.devnull])
    run(common + ['-pass', '2', '-deadline', 'good', '-cpu-used', '1', webm])
    # 5. image d'attente : première image de la boucle
    png = os.path.join(TMP, name + '.png')
    run(['-i', out, '-frames:v', '1', png])
    im = Image.open(png).convert('RGB')
    for wd in (360, 720):
        im.resize((wd, round(H * wd / W)), Image.LANCZOS).save(os.path.join(OUT_I, f'{name}-poster-{wd}.webp'), 'WEBP', quality=74, method=6)
    tiny = im.resize((18, 32), Image.LANCZOS)
    b = io.BytesIO(); tiny.save(b, 'WEBP', quality=40)
    return {'w': W, 'h': H, 'duration': round(duration(out), 2), 'bytes': os.path.getsize(out), 'bytes_webm': os.path.getsize(webm), 'poster_sizes': [360, 720],
            'alt': alt, 'lqip': 'data:image/webp;base64,' + base64.b64encode(b.getvalue()).decode()}


def main():
    for p in (OUT_V, OUT_I, TMP):
        os.makedirs(p, exist_ok=True)
    manifest_path = os.path.join(ROOT, 'build', 'videos.json')
    manifest = json.load(open(manifest_path, encoding='utf-8')) if os.path.exists(manifest_path) else {}
    cube = os.path.join(TMP, 'grade.cube')
    write_cube(cube)
    for n in sys.argv[1:] or list(CLIPS):
        manifest[n] = build(n, CLIPS[n], cube)
        print(n, manifest[n]['duration'], 's, mp4', round(manifest[n]['bytes'] / 1e6, 2), 'Mo, webm', round(manifest[n]['bytes_webm'] / 1e6, 2), 'Mo', flush=True)
    manifest = {k: manifest[k] for k in CLIPS if k in manifest}
    json.dump(manifest, open(manifest_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)


if __name__ == '__main__':
    main()
