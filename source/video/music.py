"""
Bande son du film PRISMA (50 s) : musique électronique « cinéma » à 120 BPM
(une mesure = 2 s), synthétisée entièrement ici (aucun échantillon externe),
et bruitages calés sur les repères de l'image (voir scenes.js et scenes/*.js).

Usage : python3 music.py [sortie.wav]
"""
import sys
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve

SR = 48000
DUR = 50.0
N = int((DUR + 0.5) * SR)
BEAT = 0.5
BAR = 2.0
rng = np.random.default_rng(7)


def buf():
    return np.zeros((N, 2), np.float32)


BUS = {k: buf() for k in ('drums', 'bass', 'pad', 'arp', 'bell', 'fx', 'sub')}
SEND = buf()          # départ vers la réverbération


def mtof(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def pan(sig, p=0.0):
    """p de -1 (gauche) à 1 (droite), loi à puissance constante."""
    a = (p + 1) * np.pi / 4
    return np.stack([sig * np.cos(a), sig * np.sin(a)], 1)


def add(bus, t0, st, gain=1.0, send=0.0):
    i0 = int(round(t0 * SR))
    if st.ndim == 1:
        st = pan(st, 0)
    # fondu de 25 ms en fin de tampon : aucune coupure sèche (clic)
    nf = min(len(st), int(0.025 * SR))
    st = st.copy()
    st[-nf:] *= np.linspace(1, 0, nf)[:, None]
    if i0 < 0:
        st = st[-i0:]
        i0 = 0
    n = min(len(st), N - i0)
    if n <= 0:
        return
    BUS[bus][i0:i0 + n] += st[:n] * gain
    if send:
        SEND[i0:i0 + n] += st[:n] * gain * send


def lp(x, fc, order=2):
    sos = butter(order, min(fc, SR * 0.45) / (SR / 2), 'low', output='sos')
    return sosfilt(sos, x, axis=0)


def hp(x, fc, order=2):
    sos = butter(order, fc / (SR / 2), 'high', output='sos')
    return sosfilt(sos, x, axis=0)


def bp(x, lo, hi, order=2):
    sos = butter(order, [lo / (SR / 2), min(hi, SR * 0.45) / (SR / 2)], 'band', output='sos')
    return sosfilt(sos, x, axis=0)


def tv(d):
    return np.arange(int(d * SR)) / SR


def env_adsr(n, a, d, s, r, sus_len):
    t = np.arange(n) / SR
    e = np.where(t < a, t / max(a, 1e-4), 0)
    e = np.where((t >= a) & (t < a + d), 1 - (1 - s) * (t - a) / max(d, 1e-4), e)
    e = np.where((t >= a + d) & (t < sus_len), s, e)
    e = np.where(t >= sus_len, s * np.exp(-(t - sus_len) / max(r, 1e-4)), e)
    return e


def saw_blep(freq, t):
    """Dent de scie à bande limitée (PolyBLEP)."""
    dt = freq / SR
    ph = (np.cumsum(np.broadcast_to(dt, t.shape)) + rng.random()) % 1.0
    y = 2 * ph - 1
    m1 = ph < dt
    x = ph[m1] / dt
    y[m1] -= x + x - x * x - 1
    m2 = ph > 1 - dt
    x = (ph[m2] - 1) / dt
    y[m2] -= x * x + x + x + 1
    return y


# ---------------------------------------------------------------- instruments
def kick(t0, g=1.0):
    t = tv(0.55)
    f = 44 + 120 * np.exp(-t / 0.028) + 30 * np.exp(-t / 0.12)
    ph = 2 * np.pi * np.cumsum(f) / SR
    body = np.sin(ph) * np.exp(-t / 0.3)
    click = hp(rng.standard_normal(len(t)) * np.exp(-t / 0.004), 2500) * 0.3
    x = np.tanh((body + click) * 1.6) * 0.7
    add('drums', t0, pan(x), g)
    SC.append((t0, g))


def clap(t0, g=1.0):
    t = tv(0.45)
    n = rng.standard_normal(len(t))
    e = np.zeros(len(t))
    for k, off in enumerate((0, 0.011, 0.022, 0.034)):
        e += np.where(t >= off, np.exp(-(t - off) / (0.012 if k < 3 else 0.16)), 0)
    x = bp(n * e, 900, 5200) * 0.9
    body = np.sin(2 * np.pi * 190 * t) * np.exp(-t / 0.05) * 0.3
    add('drums', t0, pan(x + body, 0.05), g * 0.8, send=0.35)


def hat(t0, g=1.0, open_=False, p=0.25):
    t = tv(0.4 if open_ else 0.08)
    x = hp(rng.standard_normal(len(t)), 7500) * np.exp(-t / (0.14 if open_ else 0.022))
    add('drums', t0, pan(x, p), g * 0.32)


def shaker(t0, g=1.0):
    t = tv(0.12)
    e = (1 - np.exp(-t / 0.012)) * np.exp(-t / 0.04)
    x = bp(rng.standard_normal(len(t)), 5000, 12000) * e
    add('drums', t0, pan(x, -0.35), g * 0.22)


def bass_note(t0, m, dur, g=1.0):
    t = tv(dur + 0.2)
    f = mtof(m)
    x = 0.55 * saw_blep(f, t) + 0.45 * saw_blep(f * 1.004, t)
    cut = 220 + 900 * np.exp(-t / 0.09)
    # filtre à balayage par blocs
    y = np.zeros_like(x)
    blk = 480
    for i in range(0, len(x), blk):
        y[i:i + blk] = lp(x[max(0, i - 960):i + blk], cut[i])[-len(x[i:i + blk]):]
    sub = np.sin(2 * np.pi * f * t) * 0.65
    e = env_adsr(len(t), 0.004, 0.12, 0.7, 0.05, dur)
    add('bass', t0, pan((y * 0.7 + sub) * e), g * 0.34)


def pad_chord(t0, notes, dur, g=1.0, bright=1.0, attack=0.6):
    t = tv(dur + 3.2)
    L = np.zeros(len(t))
    R = np.zeros(len(t))
    for m in notes:
        f = mtof(m)
        for k, det in enumerate((-0.11, -0.05, 0.0, 0.05, 0.11)):
            s = saw_blep(f * 2 ** (det / 12), t)
            if k % 2:
                L += s
            else:
                R += s
            if k == 2:
                L += s * 0.5
                R += s * 0.5
    x = np.stack([L, R], 1) / (len(notes) * 3.5)
    x = lp(x, 1400 + 2600 * bright, 2)
    e = env_adsr(len(t), attack, 0.4, 0.85, 0.7, dur)
    add('pad', t0, x * e[:, None], g * 0.72, send=0.4)


def pluck(t0, m, g=1.0, p=0.0, dec=0.22, bright=1.0):
    t = tv(0.9)
    f = mtof(m)
    x = saw_blep(f, t) * 0.6 + np.sin(2 * np.pi * f * 2 * t) * 0.25
    x = lp(x, 900 + 5000 * bright * np.exp(-0.0) , 2) * np.exp(-t / dec)
    x = lp(x, 6000)
    add('arp', t0, pan(x, p), g * 0.34, send=0.3)
    # écho (croche pointée), en ping-pong
    for k, (dt_, pp) in enumerate(((0.375, -p - 0.5), (0.75, p + 0.5))):
        add('arp', t0 + dt_, pan(lp(x, 2500) * 0.35 ** (k + 1), max(-1, min(1, pp))), g * 0.34, send=0.2)


def bell(t0, m, g=1.0, p=0.0, dec=1.4):
    t = tv(dec * 3)
    f = mtof(m)
    idx = 2.2 * np.exp(-t / 0.5)
    x = np.sin(2 * np.pi * f * t + idx * np.sin(2 * np.pi * f * 3.5 * t)) * np.exp(-t / dec)
    x += 0.3 * np.sin(2 * np.pi * f * 2 * t) * np.exp(-t / (dec * 0.5))
    add('bell', t0, pan(x, p), g * 0.2, send=0.55)


def noise_sweep(t0, dur, f0, f1, g=1.0, shape='rise', p0=0.0, p1=0.0, q=0.35):
    """Bruit filtré dont la fréquence glisse de f0 à f1 (whoosh, montée)."""
    t = tv(dur)
    n = rng.standard_normal(len(t))
    out = np.zeros(len(t))
    blk = 960
    for i in range(0, len(t), blk):
        u = i / max(1, len(t) - 1)
        fc = f0 * (f1 / f0) ** u
        seg = n[max(0, i - 2400):i + blk]
        y = bp(seg, fc * (1 - q), fc * (1 + q))[-len(n[i:i + blk]):]
        out[i:i + blk] = y
    u = t / dur
    if shape == 'rise':
        e = u ** 2.2
    elif shape == 'fall':
        e = (1 - u) ** 2
    else:
        e = np.sin(np.pi * u) ** 1.5
    pp = np.interp(u, [0, 1], [p0, p1])
    a = (pp + 1) * np.pi / 4
    x = out * e
    add('fx', t0, np.stack([x * np.cos(a), x * np.sin(a)], 1), g * 0.5, send=0.25)


def whoosh(tc, dur=0.6, g=1.0, up=True, p0=-0.6, p1=0.6):
    noise_sweep(tc - dur / 2, dur, 350 if up else 3500, 3500 if up else 350, g, 'bell', p0, p1, 0.5)


def riser(t0, t1, g=1.0):
    d = t1 - t0
    noise_sweep(t0, d, 250, 7000, g * 0.8, 'rise', 0, 0, 0.3)
    t = tv(d)
    f = 180 * (8 ** (t / d))
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * (t / d) ** 2.5 * (1 + 0.3 * np.sin(2 * np.pi * 7 * t))
    x += 0.5 * np.sin(2 * np.pi * np.cumsum(f * 1.5) / SR) * (t / d) ** 3
    add('fx', t0, pan(x * 0.22), g, send=0.3)


def reverse_swell(t_end, dur=1.6, g=1.0):
    t = tv(dur)
    x = hp(rng.standard_normal(len(t)), 2500) * np.exp(-t / 0.45)
    x = x[::-1] * 0.7
    st = np.stack([x, np.roll(x, 37)], 1)
    add('fx', t_end - dur, st, g * 0.45, send=0.5)


def impact(t0, g=1.0, low=40):
    t = tv(3.0)
    f = low + 60 * np.exp(-t / 0.08)
    boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.9)
    thump = lp(rng.standard_normal(len(t)), 180) * np.exp(-t / 0.18) * 1.8
    crack = hp(rng.standard_normal(len(t)), 1800) * np.exp(-t / 0.05) * 0.35
    x = np.tanh((boom * 1.1 + thump + crack) * 1.3)
    add('sub', t0, pan(x), g * 0.85, send=0.4)
    SC.append((t0, g * 1.4))


def shimmer(t0, dur=1.5, g=1.0, base=84):
    for k, m in enumerate((base, base + 7, base + 12, base + 16, base + 19)):
        bell(t0 + k * 0.05, m, g * 0.55, p=(-0.6 + 0.3 * k), dec=dur * 0.5)


def tick(t0, g=1.0, f=2600):
    t = tv(0.05)
    x = np.sin(2 * np.pi * f * t) * np.exp(-t / 0.008) + hp(rng.standard_normal(len(t)), 4000) * np.exp(-t / 0.003) * 0.3
    add('fx', t0, pan(x, 0.2), g * 0.35, send=0.1)


def pop(t0, g=1.0, f0=420, f1=980):
    t = tv(0.16)
    f = f0 + (f1 - f0) * (1 - np.exp(-t / 0.02))
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.045)
    add('fx', t0, pan(x, 0.3), g * 0.3, send=0.2)


def tink(t0, g=1.0, m=96, p=0.0):
    t = tv(0.6)
    f = mtof(m)
    x = (np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * f * 2.76 * t)) * np.exp(-t / 0.12)
    add('bell', t0, pan(x, p), g * 0.12, send=0.5)


def laser(t0, dur, g=1.0):
    t = tv(dur)
    f = 1800 + 2400 * (t / dur)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / dur) ** 2 * 0.25
    x += bp(rng.standard_normal(len(t)), 3000, 9000) * np.sin(np.pi * t / dur) ** 2 * 0.2
    add('fx', t0, pan(x, -0.3), g * 0.45, send=0.5)


SC = []   # déclencheurs de compression latérale (grosse caisse, impacts)

# ------------------------------------------------------------------ harmonie
# Ré mineur : Dm9, Si bémol maj9, Fa maj9, Do add9
CH = {
    'Dm': (38, [50, 57, 60, 64, 65]),
    'Bb': (34, [46, 53, 57, 60, 62]),
    'F': (41, [53, 57, 60, 64, 67]),
    'C': (36, [48, 55, 62, 64, 67]),
}
ARP = {
    'Dm': [62, 65, 69, 72, 74, 72, 69, 65],
    'Bb': [58, 62, 65, 69, 70, 69, 65, 62],
    'F': [60, 65, 69, 72, 76, 72, 69, 65],
    'C': [60, 64, 67, 72, 74, 72, 67, 64],
}
BARS = ['Dm', 'Dm', 'Dm', 'Bb',           # 0-8 s : logo
        'Dm', 'Bb', 'F', 'C',             # 8-16 s : showroom
        'Dm', 'Bb', 'F', 'C', 'Dm', 'Bb',  # 16-28 s : application
        'F', 'C', 'Dm', 'Bb', 'F', 'C',   # 28-40 s : logiciel
        'Bb', 'C',                        # 40-44 s : installation
        'F', 'F', 'F']                    # 44-50 s : final

for b, name in enumerate(BARS):
    t0 = b * BAR
    root, notes = CH[name]
    if b < 2:
        if b == 0:
            pad_chord(0.0, notes, 3.9, g=0.7, bright=0.25, attack=2.2)
        continue
    if b >= 22:
        if b == 22:
            pad_chord(t0, notes + [72, 76], 4.6, g=1.15, bright=0.9, attack=0.02)
            bass_note(t0, root, 4.4, g=0.9)
            bass_note(t0, root - 12, 4.4, g=0.5)
        continue
    bright = {2: 0.5, 3: 0.55}.get(b, 0.75 if b < 20 else 0.45)
    pad_chord(t0, notes, BAR - 0.05, g=0.85 if b >= 4 else 0.75, bright=bright, attack=0.25 if b != 2 else 0.02)
    # basse : croches à partir du showroom (sauf installation)
    if 4 <= b < 20:
        pat = [0, 0, 12, 0, 0, 12, 0, 7] if b >= 14 else [0, 0, 0, 12, 0, 0, 7, 0]
        for k in range(8):
            bass_note(t0 + k * 0.25, root + pat[k], 0.2, g=1.0 if b >= 4 else 0.7)
    elif b in (2, 3):
        bass_note(t0, root, 1.9, g=0.55)
    elif b in (20, 21):
        bass_note(t0, root, 1.9, g=0.5)
    # arpège en doubles croches
    if b >= 2 and b != 21:
        seq = ARP[name]
        for k in range(16):
            if b in (2, 3) and k % 2:
                continue
            m = seq[k % 8] + (12 if (b >= 14 and b < 20 and k >= 8) else 0)
            g = (0.55 if b in (2, 3) else 0.8 if b < 8 else 1.0 if b < 14 else 1.05) * (1.0 if k % 4 == 0 else 0.72)
            if b >= 20:
                g *= 0.6
            pluck(t0 + k * 0.125, m, g=g, p=(-0.35 if k % 2 else 0.35), bright=0.6 if b < 8 else 0.9)

# batterie
for b in range(4, 20):
    t0 = b * BAR
    full = b < 8 or b >= 14
    for k in range(4):
        tb = t0 + k * BEAT
        if full or k in (0, 2):
            kick(tb, 1.0 if full else 0.85)
        if k in (1, 3):
            clap(tb, 0.9 if full else 0.7)
        hat(tb + 0.25, 0.9, open_=(full and k % 2 == 1), p=0.3)
        for s in (0.125, 0.375):
            hat(tb + s, 0.45 if full else 0.35, p=-0.2)
        if b >= 14:
            shaker(tb + 0.0625, 0.9); shaker(tb + 0.3125, 0.7)
    if not full and b % 2 == 1:
        kick(t0 + 1.75, 0.7)          # relance sur le « et » du 4
# roulement de caisse claire avant le changement de partie
for tb in np.arange(15.0, 16.0, 0.125):
    clap(tb, 0.25 + 0.45 * (tb - 15.0))
for tb in np.arange(39.0, 39.75, 0.125):
    clap(tb, 0.2 + 0.4 * (tb - 39.0))

# ------------------------------------------------------------- design sonore
# ouverture : trait de lumière, facettes, impact du logo
laser(0.25, 1.6, 0.6)
shimmer(0.3, 2.4, 0.5, base=86)
riser(1.2, 4.0, 0.9)
reverse_swell(4.0, 1.8, 1.0)
for i in range(8):
    tink(2.21 + 0.173 * i, 1.0, m=[91, 94, 96, 98, 99, 101, 103, 104][i], p=[-0.7, 0.6, -0.4, 0.5, -0.2, 0.3, -0.5, 0.7][i])
    whoosh(2.05 + 0.173 * i, 0.35, 0.18, True, -0.8 + 0.2 * i, 0.8 - 0.2 * i)
impact(4.0, 1.2, low=38)
shimmer(4.0, 3.0, 1.0, base=81)
laser(4.2, 0.9, 0.7)
for k, m in enumerate((74, 77, 81, 84, 86, 89, 93)):
    bell(4.62 + k * 0.12, m, 0.5, p=-0.5 + k * 0.17, dec=1.2)
whoosh(5.5, 1.0, 0.45, True, -0.2, 0.2)
bell(5.35, 81, 0.6, dec=2.0); bell(5.36, 88, 0.45, p=0.3, dec=2.0)
riser(6.1, 7.95, 1.1)
reverse_swell(7.98, 1.2, 0.9)
impact(8.0, 1.1, low=42)
noise_sweep(7.7, 0.6, 5000, 300, 0.5, 'fall')
# showroom : chaque véhicule s'allume sur le temps fort, fouettés entre deux
for i, tc in enumerate((8.0, 10.0, 12.0, 14.0)):
    if i:
        whoosh(tc, 0.66, 1.0, True, -0.9, 0.9)
    laser(tc + 0.02, 0.9, 0.35)
    bell(tc + 0.05, [74, 77, 81, 76][i], 0.45, p=0.2, dec=1.6)
impact(12.0, 0.45, low=48)
whoosh(15.85, 0.7, 0.9, True, 0.0, 0.0)
riser(14.9, 15.95, 0.6)
impact(16.0, 0.8, low=44)
# application : entrée du téléphone, défilement, navigation, validations
whoosh(16.5, 1.0, 0.45, True, 0.5, 0.0)
noise_sweep(17.55, 1.0, 1800, 700, 0.18, 'bell', 0.3, 0.3)
noise_sweep(18.75, 0.9, 1800, 700, 0.18, 'bell', 0.3, 0.3)
for tp in (19.8, 21.4, 23.0, 24.6, 26.2):
    tick(tp - 0.04, 1.0)
    noise_sweep(tp, 0.5, 2500, 900, 0.3, 'bell', 0.7, -0.4)
for i, tc in enumerate((21.65, 23.25, 24.85, 26.45)):
    bell(tc, [81, 84, 86, 88][i], 0.55, p=-0.5, dec=0.9)
for k, m in enumerate((72, 76, 79, 84, 88)):
    bell(26.45 + k * 0.07, m, 0.6, p=-0.3 + k * 0.15, dec=1.5)
for tc in (18.2, 20.0, 21.6, 23.2, 24.8, 26.45):
    pop(tc + 0.05, 0.45, 500, 900)
whoosh(27.7, 0.9, 0.9, True, 0.8, -0.8)
# logiciel
impact(28.0, 0.7, low=46)
whoosh(28.6, 1.3, 0.5, True, 0.8, 0.0)
whoosh(29.9, 1.0, 0.35, True, 0.3, -0.1)
for i in range(4):
    pop(30.0 + i * 0.1, 0.8, 420 + 80 * i, 900 + 120 * i)
noise_sweep(31.3, 0.45, 3000, 600, 0.35, 'bell', 0.3, -0.3)
pop(31.55, 0.8, 380, 820); pop(31.67, 0.8, 460, 980)
noise_sweep(32.9, 0.5, 3000, 600, 0.35, 'bell', -0.3, 0.3)
for tp in (33.15, 35.2, 37.0):
    tick(tp - 0.04, 0.9, 2200)
    noise_sweep(tp, 0.55, 2500, 800, 0.32, 'bell', 0.7, -0.5)
whoosh(33.8, 1.2, 0.3, True, -0.5, 0.5)
noise_sweep(37.35, 0.8, 900, 5200, 0.5, 'bell', -0.2, 0.4, 0.6)
kick(38.35, 0.5)
whoosh(39.95, 0.75, 1.0, True, 0.9, -0.9)
# installation
impact(40.0, 0.5, low=50)
whoosh(40.3, 0.9, 0.4, True, 0.6, 0.0)
shimmer(40.9, 1.2, 0.55, base=88)
tick(41.2, 1.3, 1800)
noise_sweep(41.3, 0.6, 400, 4200, 0.45, 'bell', 0.2, 0.0, 0.5)
for k, m in enumerate((77, 81, 84)):
    bell(41.86 + k * 0.08, m, 0.55, p=-0.2 + 0.2 * k, dec=1.3)
pop(41.72, 0.4, 480, 900)
riser(42.4, 44.0, 1.4)
reverse_swell(44.0, 2.0, 1.1)
# final
impact(44.0, 1.4, low=36)
shimmer(44.0, 3.5, 1.1, base=84)
laser(44.15, 0.8, 0.6)
for k, m in enumerate((77, 81, 84, 88, 89, 93, 96)):
    bell(44.45 + k * 0.11, m, 0.45, p=-0.6 + k * 0.2, dec=1.8)
bell(45.0, 84, 0.6, dec=2.5); bell(45.01, 91, 0.4, p=0.4, dec=2.5)
whoosh(45.2, 1.0, 0.35, True, -0.2, 0.2)
bell(45.8, 88, 0.45, p=-0.3, dec=2.5)
bell(46.5, 81, 0.4, p=0.3, dec=3.0)

# ---------------------------------------------------------------- mixage
t = np.arange(N) / SR
duck = np.ones(N)
for t0, g in SC:
    i0 = int(t0 * SR)
    n = min(int(0.4 * SR), N - i0)
    d = 1 - min(0.65, 0.5 * g) * np.exp(-np.arange(n) / SR / 0.11)
    duck[i0:i0 + n] = np.minimum(duck[i0:i0 + n], d)
for k in ('bass', 'pad', 'arp'):
    BUS[k] *= duck[:, None].astype(np.float32)

# réverbération : réponse impulsionnelle synthétique (2,4 s), stéréo décorrélée
ir_t = np.arange(int(2.6 * SR)) / SR
irL = rng.standard_normal(len(ir_t)) * np.exp(-ir_t / 0.55)
irR = rng.standard_normal(len(ir_t)) * np.exp(-ir_t / 0.55)
pre = int(0.022 * SR)
irL = np.concatenate([np.zeros(pre), lp(irL, 6000)])
irR = np.concatenate([np.zeros(pre + 29), lp(irR, 6000)])
irL /= np.sqrt(np.sum(irL ** 2)); irR /= np.sqrt(np.sum(irR ** 2))
send = hp(SEND, 180)
rev = np.stack([fftconvolve(send[:, 0], irL)[:N], fftconvolve(send[:, 1], irR)[:N]], 1) * 0.55

mix = (BUS['drums'] * 0.5 + BUS['bass'] * 0.95 + BUS['pad'] * 0.8 + BUS['arp'] * 0.8
       + BUS['bell'] * 0.9 + BUS['fx'] * 0.85 + BUS['sub'] * 1.0 + rev)
# égalisation douce : coupe des infra-basses, léger adoucissement des aigus
mix = hp(mix, 28, 2)
# fondu final
fade = np.clip((DUR - 0.1 - t) / 1.2, 0, 1) ** 1.5
mix *= fade[:, None]
mix = mix[:int(DUR * SR)]
# bus master : compression douce puis limiteur
rms = np.sqrt(np.mean(mix ** 2))
mix = mix / (rms * 8.0)      # environ -18 dB RMS avant saturation
mix = np.tanh(mix * 1.25) / np.tanh(1.25)
peak = np.max(np.abs(mix))
mix = mix / peak * 0.89     # crête à -1 dBFS
out = sys.argv[1] if len(sys.argv) > 1 else 'music.wav'
import wave
with wave.open(out, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype('<i2').tobytes())
print('écrit', out, f'{len(mix) / SR:.2f} s', 'RMS dBFS', round(20 * np.log10(np.sqrt(np.mean(mix ** 2))), 1))
