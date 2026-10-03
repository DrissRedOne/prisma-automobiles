import numpy as np, potrace, time
from PIL import Image
im = Image.open('logo_clos.png').convert('RGBA')
a = np.array(im).astype(float)
# where are white vs cream pixels
white = (a[...,0] > 250) & (a[...,1] > 250) & (a[...,2] > 250) & (a[...,3] > 250)
cream = (abs(a[...,0]-245) < 4) & (abs(a[...,1]-234) < 4) & (abs(a[...,2]-216) < 4)
ys, xs = np.nonzero(white); print('white y', ys.min(), ys.max(), 'x', xs.min(), xs.max())
ys, xs = np.nonzero(cream); print('cream y', ys.min(), ys.max(), 'x', xs.min(), xs.max())
# disc: alpha
al = a[...,3]
ys, xs = np.nonzero(al > 128); print('disc bbox', xs.min(), xs.max(), ys.min(), ys.max())
S = 4
from PIL import ImageFilter
big = im.resize((600*S, 600*S), Image.BICUBIC).filter(ImageFilter.GaussianBlur(radius=2.6))
b = np.array(big).astype(float)
lum = 0.299*b[...,0] + 0.587*b[...,1] + 0.114*b[...,2]
mask = (lum > 172) & (b[...,3] > 200)
mask_w = (lum > 192) & (b[...,3] > 200)
def trace(mask, name, ymin, ymax):
    m = np.zeros_like(mask); m[ymin*S:ymax*S, :] = mask[ymin*S:ymax*S, :]
    t = time.time()
    bm = potrace.Bitmap(m)
    path = bm.trace(turdsize=8, turnpolicy=potrace.POTRACE_TURNPOLICY_MINORITY, alphamax=1.0, opticurve=True, opttolerance=0.5)
    parts = []
    for curve in path:
        sx, sy = curve.start_point.x, curve.start_point.y
        d = ['M%.1f %.1f' % (sx/S, sy/S)]
        for seg in curve.segments:
            if seg.is_corner:
                d.append('L%.1f %.1f L%.1f %.1f' % (seg.c.x/S, seg.c.y/S, seg.end_point.x/S, seg.end_point.y/S))
            else:
                d.append('C%.1f %.1f %.1f %.1f %.1f %.1f' % (seg.c1.x/S, seg.c1.y/S, seg.c2.x/S, seg.c2.y/S, seg.end_point.x/S, seg.end_point.y/S))
        d.append('Z')
        parts.append(''.join(d))
    print(name, len(path), 'curves', round(time.time()-t, 1), 's')
    return ''.join(parts)
clos = trace(mask, 'CLOS', 150, 330)
rest = trace(mask_w, 'Restaurant', 340, 420)
open('clos_paths.txt', 'w').write(clos + '\n' + rest + '\n')
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><circle cx="300" cy="300" r="290" fill="#666d45"/><path fill="#f5ead8" fill-rule="evenodd" d="{clos}"/><path fill="#ffffff" fill-rule="evenodd" d="{rest}"/></svg>'''
open('logo_trace.svg', 'w').write(svg)
print(len(svg), 'bytes')
