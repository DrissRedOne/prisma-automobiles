/* =====================================================================
   MONTAGES : « film » (présentation complète, 50 s, avec le logiciel)
   et « pub » (publicité, 30 s, tournée vers le client), choisis par
   ?cut=pub. Toutes les scènes lisent leurs repères ici.
   120 battements par minute : une mesure = 2 s.
   ===================================================================== */
const CUT = new URLSearchParams(location.search).get('cut') === 'pub' ? 'pub' : 'film';
const TIMING = CUT === 'pub' ? {
  duration: 30,
  // 0 à 6 s : le logo se forme (impact à 2 s)
  intro: { start: 0, streak: [0.1, 0.8, 1.9], asm: [0.3, 2.0], hit: 2.0, sweep: [2.0, 2.8], beam: [2.15, 2.85], spec: [2.5, 3.5], up: [2.9, 3.9], push: [5.3, 6.1] },
  introShot: [0, 6.2], introTrans: [5.75, 6.2],
  // 6 à 14 s : la flotte
  show: { t0: 6.0, step: 2.0 }, showShot: [5.75, 14.1],
  // 14 à 22 s : la réservation dans l'application, puis plongée dans l'écran
  phone: { t0: 14.0, enter: [13.82, 14.95], scroll: [[15.1, 15.95, 0, 3.25]], pushes: [[16.1, 'm-fiche'], [17.5, 'm-coordonnees'], [18.9, 'm-paiement'], [20.3, 'm-confirmee']], pushDur: 0.5, exit: [21.0, 22.1], mode: 'dive' },
  phoneShot: [13.78, 22.15], phoneTrans: [13.78, 14.08],
  // 22 à 30 s : le logo, le slogan, l'appel à l'action
  outro: { start: 21.7, streak: [21.8, 22.0, 22.9], asm: [21.0, 21.9], hit: 22.0, sweep: [22.05, 22.9], beam: [22.15, 22.8], spec: [22.45, 23.4], up: [22.7, 23.7], push: [99, 100], end: [29.1, 29.9] },
  outroShot: [21.8, 30.01], outroTrans: [21.8, 22.15],
  logoSpans: [[0, 6.2], [21.7, 30.1]], deviceSpans: [[14.0, 21.7]],
  fast: [[7.64, 8.36, 8], [9.64, 10.36, 8], [11.64, 12.36, 8], [0.25, 2.05, 10], [5.6, 6.3, 6], [13.55, 14.3, 6], [21.1, 22.2, 24], [20.6, 21.1, 12]],
} : {
  duration: 50,
  intro: { start: 0, streak: [0.25, 1.35, 2.7], asm: [0.85, 4.0], hit: 4.0, sweep: [4.0, 4.85], beam: [4.2, 4.95], spec: [4.6, 5.8], up: [5.05, 6.05], push: [7.3, 8.1] },
  introShot: [0, 8.2], introTrans: [7.75, 8.2],
  show: { t0: 8.0, step: 2.0 }, showShot: [7.75, 16.1],
  phone: { t0: 16.0, enter: [15.82, 16.95], scroll: [[17.55, 18.55, 0, 1.2], [18.75, 19.65, 1.2, 3.25]], pushes: [[19.8, 'm-fiche'], [21.4, 'm-options'], [23.0, 'm-coordonnees'], [24.6, 'm-paiement'], [26.2, 'm-confirmee']], pushDur: 0.5, exit: [27.35, 28.15], mode: 'fly' },
  phoneShot: [15.78, 28.3], phoneTrans: [15.78, 16.08],
  outro: { start: 43.7, streak: [43.8, 44.0, 44.9], asm: [43.0, 43.9], hit: 44.0, sweep: [44.05, 44.9], beam: [44.15, 44.8], spec: [44.45, 45.4], up: [44.7, 45.7], push: [99, 100], end: [49.1, 49.9] },
  outroShot: [43.8, 50.01], outroTrans: [43.8, 44.15],
  logoSpans: [[0, 8.2], [43.5, 50.1]], deviceSpans: [[16.0, 43.5]],
  fast: [[9.64, 10.36, 8], [11.64, 12.36, 8], [13.64, 14.36, 8], [0.8, 4.05, 10], [7.6, 8.3, 6], [15.55, 16.3, 6], [27.3, 28.4, 6], [39.6, 40.4, 6], [43.0, 44.2, 20], [42.55, 43.0, 10]],
};
