"""Contenus du site CLOS : coordonnées, carte, textes. Seule source à modifier pour mettre le site à jour.

Règles de rédaction : ni tiret long ni tiret moyen, rien d'inventé (carte, prix et services relevés sur TheFork
et PagesJaunes le 03/10/2026, identité relevée au registre des entreprises). Les éléments à faire valider par le
restaurant sont listés dans A_VALIDER.
"""

SITE = {
    'name': 'Clos',
    'legal_name': 'CLOS',
    'tagline': 'Restaurant · Bar · Wine bar',
    'street': '78 rue Amédée Saint-Germain',
    'zip': '33800',
    'city': 'Bordeaux',
    'district': 'Saint-Jean Belcier',
    'lat': 44.821371,
    'lon': -0.560582,
    # numéro publié sur TheFork et PagesJaunes : à confirmer par le restaurant
    'phone': '06 68 45 10 08',
    'phone_e164': '+33668451008',
    'email': 'commercial@clos-restaurant.com',
    'instagram': 'https://www.instagram.com/clos.restaurant/',
    'instagram_handle': '@clos.restaurant',
    'thefork': 'https://www.thefork.fr/restaurant/clos-r852927',
    'rating': '9,4',
    'rating_count': 42,
    'scores': [('Cuisine', '9,5'), ('Service', '9,6'), ('Ambiance', '9,0')],
    'languages': ['français', 'anglais', 'espagnol', 'allemand'],
    'opened': 'septembre 2025',
    'hosts': 'Maria et Mathieu Masse',
}

MAPS = {
    'google': 'https://www.google.com/maps/search/?api=1&query=Clos%2C%2078%20rue%20Am%C3%A9d%C3%A9e%20Saint-Germain%2C%2033800%20Bordeaux',
    'apple': 'https://maps.apple.com/?ll=44.821371,-0.560582&q=Clos',
    'waze': 'https://waze.com/ul?ll=44.821371,-0.560582&navigate=yes',
    'osm': 'https://www.openstreetmap.org/?mlat=44.821371&mlon=-0.560582#map=18/44.821371/-0.560582',
}

LEGAL = {
    'company': 'CLOS',
    'form': 'Société par actions simplifiée au capital de 2 000 €',
    'rcs': 'RCS Bordeaux 989 275 169',
    'siret': '989 275 169 00013',
    'vat': 'FR36 989 275 169',
    'ape': '5610A, restauration traditionnelle',
    'seat': '78 rue Amédée Saint-Germain, 33800 Bordeaux',
    'director': 'Maria Masse, présidente',
    'host': 'Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis (vercel.com)',
    'maker': 'Groupe Amane Conseils, 72 bis avenue des Tabernottes, 33370 Yvrac',
}

# carte relevée en ligne (TheFork, PagesJaunes) ; « photo » = nom d'une photo d'illustration (tools/photos.py)
MENU = [
    {'id': 'entrees', 'title': 'Entrées', 'items': [
        {'name': 'Gravlax de bœuf', 'price': 8, 'photo': 'gravlax', 'note': 'Inspiration nordique'},
        {'name': 'Ceviche de poisson', 'price': 12, 'photo': 'ceviche', 'note': 'Inspiration péruvienne'},
        {'name': 'Foie gras mi-cuit', 'price': 15, 'photo': 'foie-gras', 'note': 'Classique du Sud-Ouest'},
    ]},
    {'id': 'plats', 'title': 'Plats', 'items': [
        {'name': 'Picanha de bœuf grillé', 'price': 18, 'photo': 'picanha', 'desc': 'Chimichurri, frites maison, salade', 'note': 'Inspiration sud-américaine'},
        {'name': "T-bone d'agneau", 'price': 27, 'photo': 'agneau', 'desc': "Mariné vingt-quatre heures puis grillé, ajo blanco, huile d'herbes, légumes de saison", 'note': 'Inspiration andalouse'},
        {'name': 'Poulpe snacké', 'price': 29, 'photo': 'poulpe', 'desc': "Légumes de saison, crème de chorizo, crème d'ail au zaatar", 'note': 'Entre Espagne et Levant'},
    ]},
    {'id': 'desserts', 'title': 'Desserts', 'items': [
        {'name': 'Mousse au chocolat au siphon', 'price': 8, 'photo': 'mousse', 'note': 'Classique de la maison'},
        {'name': 'Sélection de fromages affinés', 'price': 9, 'photo': 'fromages', 'note': 'À partager avec un verre'},
        {'name': "Carpaccio d'ananas", 'price': 9, 'photo': None, 'note': 'Fraîcheur de fin de repas'},
    ]},
]

# plats mis en avant sur l'accueil (dans cet ordre)
SIGNATURES = ['Poulpe snacké', "T-bone d'agneau", 'Picanha de bœuf grillé', 'Foie gras mi-cuit', 'Ceviche de poisson', 'Mousse au chocolat au siphon']

# avis TheFork (extraits courts, 5/5) : à revérifier mot pour mot avant la mise en ligne définitive
REVIEWS = [
    {'text': 'Repas excellent, service et personnel très agréable.', 'author': 'Morgane D.', 'date': 'septembre 2026'},
    {'text': 'Je recommande les yeux fermés !', 'author': 'Elisa B.', 'date': 'septembre 2026'},
    {'text': 'Cuisine raffinée, accueil chaleureux.', 'author': 'Client TheFork', 'date': 'juillet 2026'},
    {'text': 'Un accueil très chaleureux.', 'author': 'Françoise B.', 'date': 'juin 2026'},
]

NAV = [
    {'href': '/', 'label': 'Accueil', 'photo': 'salle-bar'},
    {'href': '/la-carte', 'label': 'La carte', 'photo': 'poulpe'},
    {'href': '/bar-a-vins', 'label': 'Bar à vins', 'photo': 'vins-verres'},
    {'href': '/privatisation', 'label': 'Privatisation', 'photo': 'tablee'},
    {'href': '/infos', 'label': 'Infos & réservation', 'photo': 'table-soir'},
]

PAGES = {
    'index': {
        'path': '/', 'file': 'index.html', 'template': 'index.html', 'hero': 'dark',
        'title': 'Clos, restaurant, bar et wine bar à Bordeaux Saint-Jean',
        'description': "Cuisine généreuse et 100 % maison, vins nature et cocktails, à deux pas de la gare Saint-Jean. Réservez votre table au Clos, 78 rue Amédée Saint-Germain à Bordeaux.",
    },
    'carte': {
        'path': '/la-carte', 'file': 'la-carte.html', 'template': 'carte.html', 'hero': 'dark', 'crumb': 'La carte',
        'title': 'La carte du Clos, restaurant à Bordeaux Saint-Jean',
        'description': "Gravlax de bœuf, ceviche, foie gras mi-cuit, poulpe snacké, T-bone d'agneau, picanha grillée : la carte 100 % maison du Clos, qui change au fil des saisons.",
    },
    'bar': {
        'path': '/bar-a-vins', 'file': 'bar-a-vins.html', 'template': 'bar.html', 'hero': 'dark', 'crumb': 'Bar à vins',
        'title': 'Bar à vins et cocktails près de la gare Saint-Jean, Bordeaux | Clos',
        'description': "Vins nature, cocktails et fromages affinés au comptoir du Clos, bar et wine bar à dix minutes à pied de la gare Saint-Jean de Bordeaux.",
    },
    'privatisation': {
        'path': '/privatisation', 'file': 'privatisation.html', 'template': 'privatisation.html', 'hero': 'dark', 'crumb': 'Privatisation',
        'title': "Privatiser le Clos : repas d'équipe, dîner d'affaires, fête | Bordeaux",
        'description': "Repas d'équipe, dîner d'affaires, anniversaire : le Clos accueille vos groupes près de la gare Saint-Jean, avec un menu composé avec vous. Devis et facture au nom de votre entreprise.",
    },
    'infos': {
        'path': '/infos', 'file': 'infos.html', 'template': 'infos.html', 'hero': 'light', 'crumb': 'Infos & réservation',
        'title': 'Infos pratiques et réservation | Clos, Bordeaux Saint-Jean',
        'description': "Adresse, accès depuis la gare Saint-Jean, réservation en ligne ou par téléphone : toutes les infos pratiques du Clos, 78 rue Amédée Saint-Germain à Bordeaux.",
    },
    'mentions': {
        'path': '/mentions-legales', 'file': 'mentions-legales.html', 'template': 'mentions.html', 'hero': 'light', 'crumb': 'Mentions légales',
        'title': 'Mentions légales | Clos, Bordeaux',
        'description': "Mentions légales du site du Clos, restaurant, bar et wine bar à Bordeaux : éditeur, hébergement, crédits photos et données personnelles.",
    },
    '404': {
        'path': '/404', 'file': '404.html', 'template': '404.html', 'hero': 'dark', 'sitemap': False,
        'title': 'Page introuvable | Clos, Bordeaux',
        'description': "Cette page n'existe pas ou plus. Retrouvez la carte, le bar à vins et les infos pratiques du Clos.",
    },
}

FAQ = [
    ('Faut-il réserver ?', "C'est conseillé, surtout le soir et le week-end. Réservez en ligne sur TheFork, en quelques secondes, ou appelez-nous au {phone}."),
    ('Comment venir depuis la gare Saint-Jean ?', "Rejoignez la rue Charles Domercq, puis la rue Amédée Saint-Germain : le Clos est au numéro 78, à une dizaine de minutes à pied de la gare."),
    ('Peut-on venir en groupe ou privatiser le restaurant ?', "Oui. Pour un repas d'équipe, un dîner d'affaires ou une fête, écrivez-nous depuis la page Privatisation : nous composons le menu avec vous et vous adressons un devis."),
    ('Les allergènes sont-ils indiqués ?', "La liste des allergènes présents dans nos plats est disponible sur simple demande auprès de l'équipe. Signalez-nous vos allergies au moment de réserver."),
    ('Parlez-vous anglais ?', "Yes! On parle aussi espagnol et allemand en salle. Hablamos español, wir sprechen Deutsch."),
]

# à faire valider par le restaurant avant d'ouvrir le site à Google (rappelé dans le README)
A_VALIDER = [
    'Horaires et jours de fermeture (en attendant, le site renvoie vers TheFork)',
    'Numéro de téléphone à afficher',
    'Vraies photos des plats, de la salle et de la façade (les photos actuelles sont des photos d’illustration)',
    'Carte complète, formules, vins et cocktails',
    'Conditions de privatisation (capacité, menus de groupe, acompte)',
    'Texte exact des avis cités',
    'Mention des fondateurs sur la page d’accueil',
    'Domaine clos-restaurant.com (garder les enregistrements de messagerie)',
]
