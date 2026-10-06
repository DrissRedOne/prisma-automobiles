# Contenus du site de l'Héliciculture du Garnoutey : seule source à modifier pour les textes, les produits,
# les recettes et les coordonnées. Règles de rédaction : phrases courtes et simples, ni tiret long ni tiret moyen.
# Tout ce qui reste à confirmer par l'éleveur est listé dans A_VALIDER (en bas de ce fichier).

SITE = {
    'name': 'Héliciculture du Garnoutey',
    'short': 'Garnoutey',
    'tagline': 'Escargots élevés en plein air, en Gironde',
    'street': '9 bis rue Florence Arthaud',
    'zip': '33240',
    'city': "Lugon-et-l'Île-du-Carnay",
    'area': "entre Libourne et Saint-André-de-Cubzac",
    'phone': '06 63 49 83 14',
    'phone_e164': '+33663498314',
    'email': 'locterra33@gmail.com',
    'lat': 44.9484, 'lon': -0.3625,
    'hours': 'Sur rendez-vous, du lundi au samedi',
}
MAPS = 'https://www.google.com/maps/search/?api=1&query=9+bis+rue+Florence+Arthaud+33240+Lugon-et-l%27%C3%8Ele-du-Carnay'

NAV = [
    {'label': 'Accueil', 'href': '/', 'photo': 'nuit'},
    {'label': "L'élevage", 'href': '/l-elevage', 'photo': 'tunnel'},
    {'label': 'Nos escargots', 'href': '/nos-escargots', 'photo': 'plat-staub'},
    {'label': 'Recettes', 'href': '/recettes', 'photo': 'cassolette'},
    {'label': 'Contact', 'href': '/contact', 'photo': 'auge'},
]

LEGAL = {
    'company': 'HELICICULTURE DU GARNOUTEY',
    'form': 'société par actions simplifiée unipersonnelle (SASU) au capital de 100 €',
    'seat': "9 bis rue Florence Arthaud, 33240 Lugon-et-l'Île-du-Carnay",
    'rcs': 'RCS Libourne 988 979 480',
    'siret': '988 979 480 00015',
    'ape': '01.50Z',
    'vat': 'FR34 988 979 480',
    'director': 'Joël David, président',
    'host': 'Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis (vercel.com)',
    'maker': 'Groupe Amane Conseils, Yvrac (Gironde)',
    # à remplacer par les coordonnées du médiateur choisi par l'éleveur
    'mediator': "Les coordonnées du médiateur retenu seront indiquées ici.",
}

# ------------------------------------------------------------------ accueil
HOME = {
    'eyebrow': 'Héliciculture en Gironde',
    'title_a': 'Des escargots élevés',
    'title_em': 'en plein air,',
    'title_b': 'sans se presser.',
    'lead': "À Lugon-et-l'Île-du-Carnay, nos escargots grandissent dans des parcs ouverts, sous des filets d'ombrage, au rythme des saisons.",
    'badge': 'Élevage en plein air · Gironde · Petit-gris · ',
    'manifesto': "Ici, on ne force rien. L'escargot sort la nuit, quand l'air est humide. Le jour, il se repose sous ses planches de bois, à l'abri du soleil. Notre métier, c'est de lui laisser le temps.",
    'pillars': [
        {'num': 'I', 'title': 'En plein air', 'text': "Des parcs ouverts sur la campagne, protégés par des filets d'ombrage et des clôtures."},
        {'num': 'II', 'title': 'Nourris simplement', 'text': "Des plantes semées dans les parcs et un complément de céréales. Rien d'autre."},
        {'num': 'III', 'title': 'Ramassés à la main', 'text': "Chaque escargot est ramassé à la main, une fois adulte. Pas avant."},
    ],
    'gallery': [
        {'photo': 'allee', 'caption': 'Les allées, sous les filets'},
        {'photo': 'auge', 'caption': "Au bord de l'auge", 'video': True},
        {'photo': 'repos', 'caption': 'Le repos, sur les planches'},
        {'photo': 'detail', 'caption': 'Les plus jeunes'},
    ],
}

# le cycle de l'année (accueil et page « L'élevage »)
CYCLE = [
    {'num': 'I', 'season': 'Printemps', 'title': 'Les jeunes arrivent dans les parcs',
     'text': "Quand les nuits redeviennent douces, les jeunes escargots rejoignent les parcs. L'herbe et les plantes semées les attendent.",
     'photo': 'tige'},
    {'num': 'II', 'season': 'Été', 'title': 'Ils grandissent, la nuit',
     'text': "Le jour, ils se reposent sous les planches, à l'ombre des filets. La nuit, ils sortent manger. Nous veillons à l'humidité et à la propreté des parcs.",
     'photo': 'planches'},
    {'num': 'III', 'season': "Fin de l'été", 'title': 'Le ramassage, à la main',
     'text': "Quand le bord de la coquille s'épaissit, l'escargot est adulte. C'est le signe qu'on attend pour le ramasser.",
     'photo': 'coquille'},
    {'num': 'IV', 'season': 'Hiver', 'title': "L'heure de la table",
     'text': "Vient la saison des fêtes. Les escargots se préparent pour vos repas, à la maison comme au restaurant.",
     'photo': 'plat-sombre'},
]

# ------------------------------------------------------------------ l'élevage
ELEVAGE = {
    'lead': "Un élevage à taille humaine, près de la Dordogne. Des parcs en plein air, des gestes simples, et beaucoup de patience.",
    'blocks': [
        {'title': 'Des parcs sous filets', 'photo': 'tunnel',
         'text': ["Nos escargots vivent dehors, dans des parcs couverts de filets d'ombrage. Les filets laissent passer l'air et la pluie, et les protègent du plein soleil.",
                  "Des clôtures fines les gardent à l'intérieur et tiennent les prédateurs à distance."]},
        {'title': 'Des planches pour se reposer', 'photo': 'repos',
         'text': ["Dans chaque parc, des planches en bois sont dressées au-dessus de l'herbe. Le jour, les escargots s'y abritent, serrés les uns contre les autres.",
                  "C'est là qu'on les voit le mieux, au petit matin, avant qu'ils ne se cachent."]},
        {'title': 'Une nourriture simple', 'photo': 'auge',
         'text': ["Ils mangent les plantes semées dans les parcs, et un complément de céréales servi dans des auges.",
                  "Une alimentation simple et régulière, pour une chair fine."]},
    ],
    'promise_title': 'Ce que nous ne faisons pas',
    'promise': [
        "Nous ne pressons pas la croissance.",
        "Nous ne ramassons pas un escargot qui n'est pas adulte.",
        "Nous ne vendons pas d'escargots d'ailleurs sous notre nom.",
    ],
}

# ------------------------------------------------------------------ nos escargots
PRODUCTS = [
    {'key': 'vivants', 'name': 'Escargots vivants', 'photo': 'macro',
     'text': "Pour ceux qui aiment tout faire eux-mêmes : jeûne, cuisson et préparation. Vendus à la douzaine ou au kilo.",
     'tags': ['Sur commande', 'Retrait à la ferme']},
    {'key': 'cuits', 'name': 'Escargots cuits, sans coquille', 'photo': 'sauce',
     'text': "Déjà cuits au court-bouillon. Il ne reste qu'à les cuisiner : à la bordelaise, en cassolette, en persillade.",
     'tags': ['Prêts à cuisiner', 'En bocal']},
    {'key': 'persilles', 'name': 'Au beurre persillé', 'photo': 'plat-assiette',
     'text': "En coquille, garnis de beurre, d'ail et de persil. Dix minutes au four, et c'est prêt.",
     'tags': ['Prêts à cuire', 'Pour les fêtes']},
    {'key': 'pros', 'name': 'Pour les professionnels', 'photo': 'plat-pince',
     'text': "Restaurants, traiteurs, épiceries fines : des escargots élevés près de chez vous, en quantités régulières.",
     'tags': ['Sur devis', 'Toute l\'année']},
]
ORDER_STEPS = [
    {'title': 'Appelez-nous ou écrivez-nous', 'text': 'Dites-nous ce que vous voulez, en quelle quantité, et pour quand.'},
    {'title': 'Nous fixons la date ensemble', 'text': 'Nous confirmons la commande, le prix et le jour du retrait.'},
    {'title': 'Vous passez à la ferme', 'text': "Votre commande est prête à l'heure dite, à Lugon-et-l'Île-du-Carnay."},
]
FAQ = [
    ("Combien d'escargots prévoir par personne ?",
     "En entrée, comptez 6 à 12 escargots par personne. Une douzaine pour les vrais amateurs."),
    ('Petit-gris ou gros-gris, quelle différence ?',
     "Ce sont deux variétés de la même espèce, Helix aspersa. Le gros-gris est plus gros. Le petit-gris est plus petit, avec une chair très fine."),
    ('Quand commander pour les fêtes ?',
     "Le plus tôt possible. Les quantités sont limitées et décembre arrive vite. Appelez-nous dès novembre."),
    ('Peut-on visiter l’élevage ?',
     "Oui, sur rendez-vous. Appelez-nous avant de passer : nous sommes souvent dans les parcs."),
    ('Livrez-vous ?',
     "Les commandes se retirent à la ferme. Pour les restaurants et les épiceries, demandez-nous : nous étudions chaque cas."),
    ('Vos escargots viennent-ils vraiment d’ici ?',
     "Oui. Ils sont élevés dans nos parcs, à Lugon-et-l'Île-du-Carnay, en Gironde."),
]
SEASON = {
    'marquee': 'Commandes pour les fêtes · Noël · Nouvel An · ',
    'title': 'Les fêtes approchent.',
    'text': "Pour Noël et le Nouvel An, réservez tôt : nos quantités sont limitées.",
}

# ------------------------------------------------------------------ recettes
RECIPES = [
    {'key': 'beurre-persille', 'name': 'Escargots au beurre persillé', 'photo': 'plat-staub',
     'intro': "Le grand classique des fêtes. Préparez le beurre la veille : il n'en sera que meilleur.",
     'serves': 4, 'prep': 25, 'cook': 10, 'level': 'Facile',
     'ingredients': ['48 escargots cuits, sans coquille', '48 coquilles propres', '250 g de beurre mou',
                     "3 gousses d'ail", '1 échalote', '1 bouquet de persil plat', 'Sel, poivre'],
     'steps': ["Hachez finement l'ail, l'échalote et le persil.",
               'Mélangez-les au beurre mou, avec une pincée de sel et un tour de poivre.',
               "Mettez un peu de beurre au fond de chaque coquille, puis un escargot. Fermez avec une belle noisette de beurre.",
               "Rangez les coquilles dans un plat à escargots, l'ouverture vers le haut.",
               'Enfournez 8 à 10 minutes à 200 °C, jusqu’à ce que le beurre grésille. Servez tout de suite, avec du pain.']},
    {'key': 'bordelaise', 'name': 'Escargots à la bordelaise', 'photo': 'sauce',
     'intro': "La recette de chez nous : jambon, échalotes, vin blanc et une longue cuisson douce. Encore meilleure réchauffée.",
     'serves': 4, 'prep': 20, 'cook': 50, 'level': 'Facile',
     'ingredients': ['48 escargots cuits, sans coquille', '150 g de jambon de Bayonne', '2 échalotes', "3 gousses d'ail",
                     '1 bouquet de persil plat', '1 cuillère à soupe de farine', '25 cl de vin blanc sec',
                     '25 cl de bouillon de volaille', "2 cuillères à soupe d'huile d'olive", "Poivre, piment d'Espelette"],
     'steps': ["Hachez les échalotes, l'ail et le persil. Coupez le jambon en petits dés.",
               "Dans une cocotte, faites revenir le jambon et les échalotes dans l'huile, 5 minutes.",
               "Ajoutez l'ail, puis la farine. Remuez 1 minute.",
               "Versez le vin blanc et le bouillon. Ajoutez les escargots, le poivre et une pincée de piment.",
               "Couvrez et laissez mijoter 45 minutes à feu doux, en remuant de temps en temps.",
               "Ajoutez le persil à la fin. Goûtez avant de saler : le jambon l'est déjà. Servez avec des tranches de pain grillé."]},
    {'key': 'cassolettes', 'name': "Cassolettes d'escargots à la crème d'ail", 'photo': 'cassolette',
     'intro': "Une entrée chaude, crémeuse et dorée. Prête en trente minutes.",
     'serves': 4, 'prep': 15, 'cook': 15, 'level': 'Facile',
     'ingredients': ['36 escargots cuits, sans coquille', '2 échalotes', "2 gousses d'ail", '20 cl de crème épaisse',
                     '10 cl de vin blanc sec', '30 g de beurre', '1 cuillère à soupe de persil haché', '40 g de chapelure', 'Sel, poivre'],
     'steps': ["Faites fondre le beurre dans une poêle. Ajoutez les échalotes et l'ail hachés. Laissez cuire 3 minutes, sans colorer.",
               'Ajoutez les escargots, puis le vin blanc. Laissez réduire 3 minutes.',
               'Versez la crème, salez et poivrez. Laissez épaissir 5 minutes à feu doux, puis ajoutez le persil.',
               'Répartissez dans 4 cassolettes et couvrez de chapelure.',
               'Passez 5 minutes sous le gril du four, jusqu’à ce que le dessus soit doré.']},
]

# ------------------------------------------------------------------ pages (titre de 60 caractères et description de 155 au plus)
PAGES = {
    'index': {'template': 'index.html', 'file': 'index.html', 'path': '/', 'crumb': None, 'hero': 'dark',
              'title': "Héliciculture du Garnoutey, escargots de Gironde",
              'description': "Escargots élevés en plein air à Lugon-et-l'Île-du-Carnay, près de Libourne. Vivants, cuits ou au beurre persillé, sur commande."},
    'elevage': {'template': 'elevage.html', 'file': 'l-elevage.html', 'path': '/l-elevage', 'crumb': "L'élevage", 'hero': 'dark',
                'title': "L'élevage : parcs en plein air sous filets, Gironde",
                'description': "Comment nous élevons nos escargots : parcs en plein air sous filets d'ombrage, planches de repos, nourriture simple et ramassage à la main."},
    'escargots': {'template': 'escargots.html', 'file': 'nos-escargots.html', 'path': '/nos-escargots', 'crumb': 'Nos escargots', 'hero': 'light',
                  'title': 'Nos escargots : vivants, cuits ou au beurre persillé',
                  'description': "Escargots vivants, cuits ou au beurre persillé, élevés en Gironde. Commandes pour les fêtes, les particuliers et les restaurants."},
    'recettes': {'template': 'recettes.html', 'file': 'recettes.html', 'path': '/recettes', 'crumb': 'Recettes', 'hero': 'light',
                 'title': "Recettes d'escargots : beurre persillé, bordelaise",
                 'description': "Trois recettes simples pour cuisiner les escargots : au beurre persillé, à la bordelaise et en cassolette à la crème d'ail."},
    'contact': {'template': 'contact.html', 'file': 'contact.html', 'path': '/contact', 'crumb': 'Contact', 'hero': 'light',
                'title': "Contact et commandes, Héliciculture du Garnoutey",
                'description': "Commandez vos escargots ou prenez rendez-vous à l'élevage, à Lugon-et-l'Île-du-Carnay. Par téléphone ou par e-mail."},
    'mentions': {'template': 'mentions.html', 'file': 'mentions-legales.html', 'path': '/mentions-legales', 'crumb': 'Mentions légales', 'hero': 'light',
                 'title': 'Mentions légales, Héliciculture du Garnoutey',
                 'description': "Mentions légales du site de l'Héliciculture du Garnoutey : éditeur, hébergeur, médiation, données personnelles et crédits photos."},
    '404': {'template': '404.html', 'file': '404.html', 'path': '/404', 'crumb': None, 'hero': 'dark', 'sitemap': False,
            'title': 'Page introuvable, Héliciculture du Garnoutey',
            'description': "Cette page n'existe pas ou a changé d'adresse."},
}

# ------------------------------------------------------------------ à faire valider par l'éleveur (compte rendu et README)
A_VALIDER = [
    "Produits vendus et formats (vivants, cuits en bocal, au beurre persillé, offre aux professionnels), prix",
    "Nourriture : plantes semées dans les parcs et complément de céréales",
    "Ramassage à la main, une fois adulte",
    "Variétés élevées (petit-gris, gros-gris)",
    "Commandes pour les fêtes, retrait à la ferme, livraison, visites sur rendez-vous et jours d'ouverture",
    "Téléphone et e-mail à afficher (aujourd'hui : 06 63 49 83 14 et locterra33@gmail.com)",
    "Phrase « Nous ne vendons pas d'escargots d'ailleurs sous notre nom »",
    "Photos des plats et des coquilles : photos libres d'illustration, à remplacer par les vôtres",
    "Médiateur de la consommation (obligatoire pour vendre aux particuliers)",
    "Nom de domaine",
]
