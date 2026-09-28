/* =====================================================================
   MONTAGE : textures à charger, plans, transitions, calques de texte.
   Repères musicaux : 120 battements par minute, une mesure = 2 s.
   ===================================================================== */
const ASSET_LIST = {};
['v-clio', 'v-tesla', 'v-glc', 'v-kangoo', 'v-master12', 'v-master20'].forEach((id) => { ASSET_LIST['car-' + id] = ['assets/cars/' + id + '.png']; });
['m-scroll', 'm-header', 'm-fiche', 'm-options', 'm-coordonnees', 'm-paiement', 'm-confirmee', 'm-accueil', 'd-tableau', 'd-planning', 'd-flotte', 'd-fiche-reservation', 'd-kpi-1', 'd-kpi-2', 'd-kpi-3', 'd-kpi-4', 'd-aujourdhui', 'd-graphique', 'd-facture'].forEach((id) => { ASSET_LIST[id] = ['assets/app-tex/' + id + '.jpg']; });

function buildScenes() {
  const T0 = TIMING;
  // le logo se forme
  SH.intro = buildLogoScene(A, INTRO_K);
  shot('intro', ...T0.introShot);
  logoUI(INTRO_K, { tagline: VERT ? ['Location de voitures', 'et d’utilitaires', 'Bordeaux'] : 'Location de voitures et d’utilitaires · Bordeaux' });
  // la flotte, véhicule par véhicule
  SH.showroom = buildShowroom(A);
  shot('showroom', ...T0.showShot);
  trans('intro', 'showroom', ...T0.introTrans, 'flash', { power: 3, zoom: 0.3, center: [0.5, VERT ? 0.4 : 0.36] });
  showroomUI();
  // l'application client dans le téléphone
  SH.phone = buildPhoneScene(A);
  shot('phone', ...T0.phoneShot);
  trans('showroom', 'phone', ...T0.phoneTrans, 'whip', { dir: [0, 1], amount: 0.3 });
  phoneUI();
  if (CUT === 'film') {
    // le logiciel du loueur
    SH.software = buildSoftwareScene(A);
    shot('software', 27.72, 40.2);
    trans('phone', 'software', 27.72, 28.12, 'whip', { dir: [-1, 0], amount: 0.28 });
    softwareUI();
    // l'application installée sur l'écran d'accueil
    SH.install = buildInstallScene(A);
    shot('install', 39.75, 44.15);
    trans('software', 'install', 39.75, 40.2, 'whip', { dir: [-1, 0], amount: 0.28 });
    installUI();
  }
  // le logo, le slogan et les coordonnées
  SH.outro = buildLogoScene(A, OUTRO_K);
  shot('outro', ...T0.outroShot);
  trans(CUT === 'film' ? 'install' : 'phone', 'outro', ...T0.outroTrans, 'flash', { power: 2.6, zoom: 0.12 });
  logoUI(OUTRO_K, { slogan: true, contact: true, cta: CUT === 'pub', legal: CUT === 'pub' ? CREDITS_PUB : CREDITS });
}

const CREDITS = 'Photos des véhicules : Wikimedia Commons, par Alexander Migl, Charles from Port Chester, Chanokchon, M 93, Cutlass, LuvsMG481, ГП, Jebulon et Trop86 (licences CC BY-SA 4.0, CC BY-SA 3.0 DE, CC BY 2.0 et CC0), détourées et plaques floutées.<br>Interface présentée en démonstration : les clients, réservations et montants affichés sont fictifs.';
const CREDITS_PUB = 'Photos des véhicules : Wikimedia Commons, par Alexander Migl, Chanokchon, ГП, Charles from Port Chester, Cutlass et Jebulon (licences CC BY-SA 4.0, CC BY 2.0 et CC0), détourées et plaques floutées.';
function lookExtra(t, L) {}

/** Flou de bouge : plus de sous-images pendant les mouvements rapides. */
function samplesAt(t) {
  // fouettés du showroom, facettes du logo en vol, transitions : plus de sous-images
  for (const [a, b, n] of TIMING.fast) if (t > a && t < b) return n;
  return 4;
}
