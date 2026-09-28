/* =====================================================================
   MONTAGE : textures à charger, plans, transitions, calques de texte.
   Repères musicaux : 120 battements par minute, une mesure = 2 s.
   ===================================================================== */
const ASSET_LIST = {};
['v-clio', 'v-tesla', 'v-glc', 'v-kangoo', 'v-master12', 'v-master20'].forEach((id) => { ASSET_LIST['car-' + id] = ['assets/cars/' + id + '.png']; });
['m-scroll', 'm-header', 'm-fiche', 'm-options', 'm-coordonnees', 'm-paiement', 'm-confirmee', 'm-accueil', 'd-tableau', 'd-planning', 'd-flotte', 'd-fiche-reservation', 'd-kpi-1', 'd-kpi-2', 'd-kpi-3', 'd-kpi-4', 'd-aujourdhui', 'd-graphique', 'd-facture'].forEach((id) => { ASSET_LIST[id] = ['assets/app-tex/' + id + '.jpg']; });

function buildScenes() {
  // 0 à 8 s : le logo se forme
  SH.intro = buildLogoScene(A, INTRO_K);
  shot('intro', 0, 8.2);
  logoUI(INTRO_K, { tagline: 'Location de voitures et d’utilitaires · Bordeaux' });
  // 8 à 16 s : la flotte, véhicule par véhicule
  SH.showroom = buildShowroom(A);
  shot('showroom', 7.75, 16.1);
  trans('intro', 'showroom', 7.75, 8.2, 'flash', { power: 3, zoom: 0.3, center: [0.5, 0.36] });
  showroomUI();
  // 16 à 28 s : l'application client dans le téléphone
  SH.phone = buildPhoneScene(A);
  shot('phone', 15.78, 28.3);
  trans('showroom', 'phone', 15.78, 16.08, 'whip', { dir: [0, 1], amount: 0.3 });
  phoneUI();
  // 28 à 40 s : le logiciel du loueur
  SH.software = buildSoftwareScene(A);
  shot('software', 27.72, 40.2);
  trans('phone', 'software', 27.72, 28.12, 'whip', { dir: [-1, 0], amount: 0.28 });
  softwareUI();
  // 40 à 44 s : l'application installée sur l'écran d'accueil
  SH.install = buildInstallScene(A);
  shot('install', 39.75, 44.15);
  trans('software', 'install', 39.75, 40.2, 'whip', { dir: [-1, 0], amount: 0.28 });
  installUI();
  // 44 à 50 s : le logo, le slogan et les coordonnées
  SH.outro = buildLogoScene(A, OUTRO_K);
  shot('outro', 43.8, 50.01);
  trans('install', 'outro', 43.8, 44.15, 'flash', { power: 2.6, zoom: 0.12 });
  logoUI(OUTRO_K, { slogan: true, contact: true, legal: CREDITS });
}

const CREDITS = 'Photos des véhicules : Wikimedia Commons, par Alexander Migl, Charles from Port Chester, Chanokchon, M 93, Cutlass, LuvsMG481, ГП, Jebulon et Trop86 (licences CC BY-SA 4.0, CC BY-SA 3.0 DE, CC BY 2.0 et CC0), détourées et plaques floutées.<br>Interface présentée en démonstration : les clients, réservations et montants affichés sont fictifs.';
function lookExtra(t, L) {}

/** Flou de bouge : plus de sous-images pendant les mouvements rapides. */
function samplesAt(t) {
  // fouettés du showroom (autour de 10, 12 et 14 s) et transitions : plus de sous-images
  for (const c of [10, 12, 14]) if (Math.abs(t - c) < 0.36) return 8;
  for (const [a, b] of [[7.6, 8.3], [15.55, 16.3], [27.3, 28.4], [39.6, 40.4], [43.6, 44.2]]) if (t > a && t < b) return 6;
  return 4;
}
