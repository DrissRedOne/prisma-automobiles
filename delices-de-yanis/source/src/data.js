/* =====================================================================
   LES DÉLICES DE YANIS : données de départ (réglages, carte, options).
   La carte et les prix sont des exemples, à remplacer par ceux du
   restaurant : tout se modifie ensuite depuis l'espace gestion.
   ===================================================================== */
const DATA_VERSION = 1;   // à augmenter quand la carte ou les réglages de départ changent : les données sont recréées

const SETTINGS = {
  name: 'Les Délices de Yanis',
  short: 'Délices de Yanis',
  tagline: 'Pizzas, tacos et plats maison au cœur de Bordeaux',
  since: 2007,
  address: '26 rue du Palais Gallien',
  zip: '33000',
  city: 'Bordeaux',
  quarter: 'Palais Gallien, Jardin public, Chartrons',
  phone: '',              // à compléter dans Réglages : les boutons « Appeler » apparaissent alors
  email: '',
  legalName: 'LES DELICES DE YANIS',
  legalForm: 'SARL',
  siren: '499 121 226',
  rcs: 'RCS Bordeaux',
  vat: 10,                // TVA restauration à emporter et livraison (plats préparés)
  // horaires par jour (0 = dimanche) : plages ouvertes à la commande
  hours: {
    0: [['18:00', '23:00']],
    1: [['11:30', '14:30'], ['18:00', '23:00']],
    2: [['11:30', '14:30'], ['18:00', '23:00']],
    3: [['11:30', '14:30'], ['18:00', '23:00']],
    4: [['11:30', '14:30'], ['18:00', '23:00']],
    5: [['11:30', '14:30'], ['18:00', '23:59']],
    6: [['11:30', '14:30'], ['18:00', '23:59']],
  },
  prepMinutes: 20,        // délai pour une commande à emporter
  deliveryMinutes: 40,    // délai pour une livraison
  minDelivery: 15,        // montant minimum pour être livré
  freeDeliveryFrom: 35,   // livraison offerte à partir de ce montant
  // zones de livraison (codes postaux) et frais
  zones: [
    { zip: '33000', label: 'Bordeaux centre, Palais Gallien, Saint-Seurin, Jardin public', fee: 2.5 },
    { zip: '33300', label: 'Chartrons, Bacalan, Bassins à flot', fee: 3 },
    { zip: '33200', label: 'Caudéran, Saint-Augustin', fee: 3.5 },
    { zip: '33800', label: 'Saint-Jean, Nansouty, Saint-Michel', fee: 3.5 },
    { zip: '33100', label: 'La Bastide, rive droite', fee: 4 },
  ],
  promos: [{ code: 'YANIS10', pct: 10, label: '10 % sur votre première commande en ligne' }],
  paused: false,          // commandes en ligne mises en pause depuis l'écran cuisine
  pausedUntil: null,
  autoDemo: true,         // démonstration : le suivi de commande avance tout seul si la cuisine ne répond pas
};

const CATEGORIES = [
  ['pizzas', 'Pizzas', 'Pâte pétrie chaque matin, cuite minute'],
  ['tacos', 'Tacos', 'French tacos grillés, sauce fromagère maison'],
  ['sandwichs', 'Sandwichs et burgers', 'Servis avec frites maison'],
  ['plats', 'Plats maison', 'Cuisinés sur place chaque jour'],
  ['cote', 'À côté', 'Frites, nuggets, tenders'],
  ['desserts', 'Desserts', 'Pour finir en douceur'],
  ['boissons', 'Boissons', 'Bien fraîches'],
];

/* Groupes d'options : one = un seul choix, many = plusieurs (min, max). showIf : affiché seulement si un autre choix est fait. */
const OPTION_GROUPS = {
  'taille-pizza': { label: 'Taille', type: 'one', required: true, items: [['senior', 'Senior, 29 cm', 0], ['mega', 'Mega, 33 cm', 3.5]] },
  'base-pizza': { label: 'Base', type: 'one', required: true, items: [['tomate', 'Sauce tomate', 0], ['creme', 'Crème fraîche', 0]] },
  'supp-pizza': { label: 'Suppléments', type: 'many', max: 5, items: [['mozza', 'Mozzarella', 1.5], ['chevre', 'Chèvre', 1.5], ['poulet', 'Poulet', 2], ['merguez', 'Merguez', 2], ['kebab', 'Viande kebab', 2], ['oeuf', 'Œuf', 1], ['champi', 'Champignons', 1], ['olives', 'Olives', 1], ['jalapenos', 'Jalapeños', 1]] },
  'taille-tacos': { label: 'Taille', type: 'one', required: true, items: [['m', 'M, 1 viande', 0], ['l', 'L, 2 viandes', 2.5], ['xl', 'XL, 3 viandes', 5]] },
  'viandes': { label: 'Viandes', type: 'many', min: 1, maxFrom: { group: 'taille-tacos', m: 1, l: 2, xl: 3 }, items: [['poulet', 'Poulet mariné', 0], ['hache', 'Viande hachée', 0], ['cordon', 'Cordon bleu', 0], ['merguez', 'Merguez', 0], ['kebab', 'Kebab', 0], ['nuggets', 'Nuggets', 0], ['tenders', 'Tenders', 0]] },
  'sauces': { label: 'Sauces', type: 'many', min: 1, max: 2, items: [['blanche', 'Blanche', 0], ['algerienne', 'Algérienne', 0], ['samourai', 'Samouraï', 0], ['biggy', 'Biggy', 0], ['barbecue', 'Barbecue', 0], ['harissa', 'Harissa', 0], ['andalouse', 'Andalouse', 0], ['ketchup', 'Ketchup', 0], ['mayo', 'Mayonnaise', 0]] },
  'supp-tacos': { label: 'Suppléments', type: 'many', max: 3, items: [['fromage', 'Double fromage', 1], ['gratine', 'Gratiné au four', 1.5], ['bacon', 'Bacon de dinde', 1.5]] },
  'formule': { label: 'Formule', type: 'one', required: true, items: [['seul', 'Seul', 0], ['menu', 'En menu : frites + boisson', 3.5]] },
  'boisson-menu': { label: 'Boisson du menu', type: 'one', required: true, showIf: ['formule', 'menu'], items: [['cola', 'Cola', 0], ['cola-zero', 'Cola zéro', 0], ['orange', 'Soda orange', 0], ['the', 'Thé glacé pêche', 0], ['eau', 'Eau minérale', 0]] },
  'sans': { label: 'Retirer', type: 'many', max: 4, items: [['oignons', 'Sans oignons', 0], ['tomate', 'Sans tomate', 0], ['salade', 'Sans salade', 0], ['sauce', 'Sans sauce', 0]] },
  'cuisson-steak': { label: 'Cuisson du steak', type: 'one', required: true, items: [['apoint', 'À point', 0], ['bien', 'Bien cuit', 0]] },
  'parfum-shake': { label: 'Parfum', type: 'one', required: true, items: [['vanille', 'Vanille', 0], ['fraise', 'Fraise', 0], ['chocolat', 'Chocolat', 0], ['caramel', 'Caramel beurre salé', 0]] },
  'boisson': { label: 'Boisson', type: 'one', required: true, items: [['cola', 'Cola', 0], ['cola-zero', 'Cola zéro', 0], ['orange', 'Soda orange', 0], ['the', 'Thé glacé pêche', 0], ['tropical', 'Jus tropical', 0]] },
  'sauce-cote': { label: 'Sauce', type: 'one', required: true, items: [['barbecue', 'Barbecue', 0], ['blanche', 'Blanche', 0], ['ketchup', 'Ketchup', 0], ['biggy', 'Biggy', 0], ['sans', 'Sans sauce', 0]] },
};

/* Carte d'exemple. tags : halal, veggie, spicy, best (les plus commandés), new, maison */
const MENU = [
  // Pizzas
  { id: 'pizza-margherita', cat: 'pizzas', name: 'Margherita', desc: 'Sauce tomate, mozzarella fondante, basilic frais, huile d’olive.', price: 9, tags: ['veggie'], options: ['taille-pizza', 'supp-pizza'] },
  { id: 'pizza-reine', cat: 'pizzas', name: 'Reine', desc: 'Sauce tomate, mozzarella, jambon de dinde, champignons de Paris.', price: 11, tags: ['halal', 'best'], options: ['taille-pizza', 'supp-pizza'] },
  { id: 'pizza-orientale', cat: 'pizzas', name: 'Orientale', desc: 'Sauce tomate, mozzarella, merguez, poivrons, oignons rouges, œuf.', price: 12.5, tags: ['halal', 'spicy'], options: ['taille-pizza', 'supp-pizza'] },
  { id: 'pizza-4-fromages', cat: 'pizzas', name: '4 fromages', desc: 'Crème fraîche, mozzarella, chèvre, bleu, emmental.', price: 12.5, tags: ['veggie'], options: ['taille-pizza', 'supp-pizza'] },
  { id: 'pizza-chevre-miel', cat: 'pizzas', name: 'Chèvre miel', desc: 'Crème fraîche, mozzarella, chèvre, miel, noix.', price: 12.5, tags: ['veggie', 'best'], options: ['taille-pizza', 'supp-pizza'] },
  { id: 'pizza-kebab', cat: 'pizzas', name: 'Kebab', desc: 'Sauce tomate, mozzarella, viande kebab, oignons, sauce blanche.', price: 13, tags: ['halal'], options: ['taille-pizza', 'base-pizza', 'supp-pizza'] },
  { id: 'pizza-vegetarienne', cat: 'pizzas', name: 'Végétarienne', desc: 'Sauce tomate, mozzarella, poivrons, champignons, olives, oignons, tomates fraîches.', price: 11.5, tags: ['veggie'], options: ['taille-pizza', 'supp-pizza'] },
  { id: 'pizza-poulet-curry', cat: 'pizzas', name: 'La Yanis', desc: 'Crème fraîche, mozzarella, poulet mariné au curry, oignons, poivrons. La recette de la maison.', price: 13, tags: ['halal', 'maison', 'best'], options: ['taille-pizza', 'supp-pizza'] },
  // Tacos
  { id: 'tacos', cat: 'tacos', name: 'French tacos', desc: 'Galette grillée, frites, sauce fromagère maison, vos viandes et vos sauces.', price: 7.5, tags: ['halal', 'best'], options: ['taille-tacos', 'viandes', 'sauces', 'supp-tacos', 'formule', 'boisson-menu'] },
  // Sandwichs et burgers
  { id: 'sandwich-kebab', cat: 'sandwichs', name: 'Kebab', desc: 'Pain maison, viande kebab, salade, tomate, oignons, frites.', price: 7.5, tags: ['halal', 'best'], options: ['sauces', 'sans', 'formule', 'boisson-menu'] },
  { id: 'burger', cat: 'sandwichs', name: 'Burger Yanis', desc: 'Steak haché 150 g, cheddar, oignons caramélisés, sauce maison, frites.', price: 9.5, tags: ['halal', 'maison'], options: ['cuisson-steak', 'sans', 'formule', 'boisson-menu'] },
  { id: 'panini', cat: 'sandwichs', name: 'Panini poulet', desc: 'Poulet mariné, mozzarella, sauce au choix, frites.', price: 6.5, tags: ['halal'], options: ['sauces', 'formule', 'boisson-menu'] },
  { id: 'wrap', cat: 'sandwichs', name: 'Wrap poulet croustillant', desc: 'Tenders croustillants, cheddar, salade, tomate, sauce au choix, frites.', price: 8, tags: ['halal', 'new'], options: ['sauces', 'sans', 'formule', 'boisson-menu'] },
  // Plats maison
  { id: 'assiette-kebab', cat: 'plats', name: 'Assiette kebab', desc: 'Viande kebab, frites maison, salade fraîche, sauce au choix.', price: 12.5, tags: ['halal', 'best'], options: ['sauces', 'sans'] },
  { id: 'poulet-riz', cat: 'plats', name: 'Poulet grillé, riz et légumes', desc: 'Cuisse de poulet marinée et grillée, riz parfumé, légumes de saison.', price: 12, tags: ['halal', 'maison'], options: ['sauces'] },
  { id: 'salade-cesar', cat: 'plats', name: 'Salade César', desc: 'Romaine, poulet grillé, parmesan, croûtons, sauce César.', price: 10.5, tags: ['halal'], options: ['sans'] },
  // À côté
  { id: 'frites', cat: 'cote', name: 'Frites maison', desc: 'Coupées et cuites sur place.', price: 3, tags: ['veggie'], options: ['sauce-cote'] },
  { id: 'frites-cheddar', cat: 'cote', name: 'Frites cheddar', desc: 'Frites maison, sauce cheddar fondante.', price: 4.5, tags: ['veggie', 'new'], options: [] },
  { id: 'nuggets', cat: 'cote', name: 'Nuggets de poulet × 6', desc: 'Panure croustillante, sauce au choix.', price: 5, tags: ['halal'], options: ['sauce-cote'] },
  { id: 'tenders', cat: 'cote', name: 'Tenders × 4', desc: 'Filets de poulet croustillants, sauce au choix.', price: 6, tags: ['halal'], options: ['sauce-cote'] },
  { id: 'onion-rings', cat: 'cote', name: 'Onion rings × 8', desc: 'Rondelles d’oignon en beignet.', price: 4, tags: ['veggie'], options: ['sauce-cote'] },
  // Desserts
  { id: 'tiramisu', cat: 'desserts', name: 'Tiramisu maison', desc: 'Mascarpone, biscuit imbibé de café, cacao.', price: 4, tags: ['maison'], options: [] },
  { id: 'fondant', cat: 'desserts', name: 'Fondant au chocolat', desc: 'Cœur coulant, servi tiède.', price: 4, tags: [], options: [] },
  { id: 'milkshake', cat: 'desserts', name: 'Milkshake', desc: 'Glace et lait frais, mixés minute.', price: 4.5, tags: [], options: ['parfum-shake'] },
  { id: 'cookie', cat: 'desserts', name: 'Cookie pépites de chocolat', desc: 'Moelleux au centre, croustillant autour.', price: 2.5, tags: [], options: [] },
  // Boissons
  { id: 'canette', cat: 'boissons', name: 'Canette 33 cl', desc: 'Cola, cola zéro, soda orange, thé glacé, jus tropical.', price: 1.8, tags: [], options: ['boisson'] },
  { id: 'eau', cat: 'boissons', name: 'Eau minérale 50 cl', desc: 'Plate.', price: 1.2, tags: [], options: [] },
];

const TAGS = {
  halal: ['Halal', 't-halal'],
  veggie: ['Végétarien', 't-veggie'],
  spicy: ['Épicé', 't-spicy'],
  best: ['Le plus commandé', 't-best'],
  new: ['Nouveau', 't-new'],
  maison: ['Fait maison', 't-maison'],
};
