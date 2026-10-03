import sys, glob, os
from PIL import Image
d = sys.argv[1]; prefix = sys.argv[2]; scale = float(sys.argv[3]) if len(sys.argv) > 3 else 0.5
fs = sorted(glob.glob(os.path.join(d, prefix + '-[0-9][0-9].jpg')))
ims = [Image.open(f) for f in fs]
ims = [im.resize((int(im.width * scale), int(im.height * scale))) for im in ims]
W = max(im.width for im in ims); H = sum(im.height for im in ims) + 6 * (len(ims) - 1)
out = Image.new('RGB', (W, H), 'red'); y = 0
for im in ims: out.paste(im, (0, y)); y += im.height + 6
out.save(os.path.join(d, prefix + '-all.jpg'), quality=72)
print(prefix, len(ims), out.size)
