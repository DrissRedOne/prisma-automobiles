/* Contenu SEO : vitrine des véhicules à vendre (page /vehicules-occasion, affichée par sales.js).
   Les annonces elles-mêmes viennent des données de l'agence (logiciel, rubrique Ventes). */
window.SEO_PAGES = (window.SEO_PAGES || []).concat([
  {
    path: '/vehicules-occasion',
    kind: 'page',
    title: 'Voitures d’occasion à vendre près de Bordeaux | PRISMA',
    description: 'Voitures et utilitaires d’occasion à vendre à Yvrac, près de Bordeaux : annonces avec photos, kilométrage et prix. Reprise de votre véhicule possible.',
    h1: 'Voitures d’occasion à vendre près de Bordeaux',
    eyebrow: 'Véhicules à vendre',
    lead: 'Citadines, compactes, SUV, berlines et utilitaires : retrouvez les véhicules à vendre à l’agence PRISMA Automobiles d’Yvrac, à environ 15 minutes de Bordeaux. Chaque annonce détaille l’année, le kilométrage, l’énergie, les équipements et le prix.',
    vehicles: [],
    sections: [
      { h2: 'Acheter une voiture d’occasion à Bordeaux avec PRISMA Automobiles', html:
        '<p>Les annonces réunissent les véhicules vendus par l’agence et ceux qu’elle vend en dépôt-vente pour le compte de leur propriétaire : la mention « Dépôt-vente » l’indique sur chaque annonce. Dans les deux cas, vous traitez avec un professionnel de l’automobile, à l’agence d’Yvrac.</p>' +
        '<p>Filtrez par catégorie, énergie, boîte de vitesses, budget ou kilométrage, puis ouvrez l’annonce pour voir les caractéristiques complètes : mise en circulation, puissance, vignette Crit’Air, nombre de propriétaires et équipements.</p>' },
      { h2: 'Voir le véhicule avant de vous décider', html:
        '<p>Un véhicule vous intéresse ? Envoyez votre demande depuis l’annonce ou appelez le 07 49 58 81 44 : nous convenons d’un rendez-vous à l’agence pour le voir, poser vos questions et consulter ses documents.</p>' +
        '<p>L’agence est ouverte du lundi au vendredi de 8 h 30 à 19 h et le samedi de 9 h à 18 h, avec un parking gratuit, à environ 15 minutes de Bordeaux par la rocade.</p>' },
      { h2: 'Les documents remis à l’achat', html:
        '<ul><li>le certificat de cession (formulaire Cerfa n° 15776), signé par le vendeur et par vous ;</li><li>la carte grise barrée, datée et signée, avec son coupon détachable ;</li><li>un certificat de situation administrative de moins de 15 jours ;</li><li>pour un véhicule de plus de 4 ans, un contrôle technique de moins de 6 mois.</li></ul>' +
        '<p>Vous disposez ensuite d’un mois pour faire immatriculer le véhicule à votre nom, en ligne sur le site de l’ANTS.</p>' },
      { h2: 'Et votre véhicule actuel ?', html:
        '<p>Vous changez de voiture ? Indiquez-le dans votre demande : nous pouvons étudier sa reprise. Vous pouvez aussi le vendre directement grâce au <a href="/rachat-voiture-bordeaux">rachat de voiture</a>, ou le confier en <a href="/depot-vente-voiture-bordeaux">dépôt-vente</a>.</p>' +
        '<p>Besoin d’un véhicule entre les deux ? La <a href="/location-voiture-au-mois-bordeaux">location au mois</a> bénéficie de tarifs dégressifs jusqu’à 30 % dès 28 jours.</p>' },
      { h2: 'Vous ne trouvez pas le bon modèle ?', html:
        '<p>Les annonces changent au fil des ventes. Décrivez-nous le véhicule que vous cherchez, votre budget et votre usage avec le formulaire de cette page : nous vous recontactons quand un modèle correspond.</p>' },
    ],
    faq: [
      { q: 'Peut-on voir un véhicule avant de l’acheter ?', a: 'Oui, sur rendez-vous à l’agence d’Yvrac, pendant les horaires d’ouverture.' },
      { q: 'Reprenez-vous mon ancien véhicule ?', a: 'Nous pouvons étudier sa reprise : indiquez-le dans votre demande, ou faites-le estimer depuis la page <a href="/rachat-voiture-bordeaux">rachat de voiture</a>.' },
      { q: 'Que veut dire « dépôt-vente » sur une annonce ?', a: 'Le véhicule est vendu par l’agence pour le compte de son propriétaire. Les documents remis à l’achat sont les mêmes.' },
      { q: 'Comment réserver un véhicule ?', a: 'Depuis l’annonce, choisissez « Réserver ce véhicule » dans le formulaire, ou appelez-nous : nous confirmons avec vous les conditions de la réservation.' },
      { q: 'Quels documents me seront remis ?', a: 'Le certificat de cession, la carte grise barrée avec son coupon, un certificat de situation administrative de moins de 15 jours et, pour un véhicule de plus de 4 ans, un contrôle technique de moins de 6 mois.' },
      { q: 'Dans quel délai immatriculer le véhicule à mon nom ?', a: 'Dans un délai d’un mois après l’achat, en ligne sur le site de l’ANTS, avec le code de cession remis par le vendeur.' },
    ],
    related: ['/achat-vente-voiture-bordeaux', '/rachat-voiture-bordeaux', '/depot-vente-voiture-bordeaux', '/guides/vendre-sa-voiture-demarches', '/location-voiture-au-mois-bordeaux'],
  },
]);
