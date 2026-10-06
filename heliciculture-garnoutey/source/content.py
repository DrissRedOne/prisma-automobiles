# Contenus du site de l'Héliciculture du Garnoutey : seule source à modifier pour les textes, les produits,
# les recettes et les coordonnées. Règles de rédaction : phrases courtes et simples, ni tiret long ni tiret moyen.
# Tout ce qui reste à confirmer par l'éleveur est listé dans A_VALIDER (en bas de ce fichier).

SITE = {
    'name': 'Héliciculture du Garnoutey',
    'short': 'Garnoutey',
    'tagline': 'Escargots élevés sous serre, en Gironde',
    'zip': '33240',
    'city': "Lugon-et-l'Île-du-Carnay",
    'area': "entre Libourne et Saint-André-de-Cubzac",
    'phone': '06 63 49 83 14',
    'phone_e164': '+33663498314',
    'email': 'locterra33@gmail.com',
    'hours': 'Sur rendez-vous, du lundi au samedi',
    # l'adresse exacte de la ferme n'est donnée qu'au rendez-vous (demande de Joël : peur des vols)
    'pickup': 'L’adresse exacte vous est donnée quand nous fixons le rendez-vous.',
    'delivery': 'Livraison en Gironde avec notre remorque',
}

NAV = [
    {'label': 'Accueil', 'href': '/', 'photo': 'nuit'},
    {'label': "L'élevage", 'href': '/l-elevage', 'photo': 'tunnel'},
    {'label': 'Nos escargots', 'href': '/nos-escargots', 'photo': 'macro'},
    {'label': 'Recettes', 'href': '/recettes', 'photo': 'cassolette'},
    {'label': 'Contact', 'href': '/contact', 'photo': 'auge'},
]

LEGAL = {
    'company': 'HELICICULTURE DU GARNOUTEY',
    'form': 'société par actions simplifiée unipersonnelle (SASU) au capital de 100 €',
    # seul endroit du site avec l'adresse exacte : obligatoire dans les mentions légales (siège social, LCEN art. 6 III).
    # Pour la retirer aussi, il faut transférer le siège (domiciliation).
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
    'title_em': 'sous serre,',
    'title_b': 'sans se presser.',
    'lead': "Élevés sous serre à Lugon-et-l'Île-du-Carnay, nos escargots sont vendus vivants : à emporter à la ferme, ou livrés chez vous avec notre remorque.",
    'products_intro': "Vendus vivants, à la douzaine ou au kilo. Pour les particuliers comme pour les professionnels. À emporter, ou livrés.",
    'badge': 'Élevage sous serre · Gironde · Petit-gris · ',
    'manifesto': "Ici, on ne force rien. L'escargot sort la nuit, quand l'air est humide. Le jour, il se repose sous ses planches de bois, à l'abri du soleil. Notre métier, c'est de lui laisser le temps.",
    'pillars': [
        {'num': 'I', 'title': 'Sous serre', 'text': "Des serres tunnels couvertes de filets d'ombrage : à l'abri du plein soleil, du vent et des prédateurs."},
        {'num': 'II', 'title': 'Nourris simplement', 'text': "Des plantes semées dans les serres et un complément de céréales. Rien d'autre."},
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
    {'num': 'I', 'season': 'Printemps', 'title': 'Les jeunes arrivent dans les serres',
     'text': "Quand les nuits redeviennent douces, les jeunes escargots rejoignent les serres. L'herbe et les plantes semées les attendent.",
     'photo': 'tige'},
    {'num': 'II', 'season': 'Été', 'title': 'Ils grandissent, la nuit',
     'text': "Le jour, ils se reposent sous les planches, à l'ombre des filets. La nuit, ils sortent manger. Nous veillons à l'humidité et à la propreté des serres.",
     'photo': 'planches'},
    {'num': 'III', 'season': "Fin de l'été", 'title': 'Le ramassage, à la main',
     'text': "Quand le bord de la coquille s'épaissit, l'escargot est adulte. C'est le signe qu'on attend pour le ramasser.",
     'photo': 'coquille'},
    {'num': 'IV', 'season': 'Hiver', 'title': "L'heure de la table",
     'text': "Vient la saison des fêtes. Nos escargots partent vers vos cuisines, à la maison comme au restaurant.",
     'photo': 'plat-sombre'},
]

# ------------------------------------------------------------------ l'élevage
ELEVAGE = {
    'lead': "Un élevage à taille humaine, près de la Dordogne. Des serres, des gestes simples, et beaucoup de patience.",
    'blocks': [
        {'title': 'Des serres sous filets', 'photo': 'tunnel',
         'text': ["Nos escargots vivent dans des serres tunnels, couvertes de filets d'ombrage. Ils y sont à l'abri du plein soleil, du vent et des prédateurs.",
                  "À l'intérieur, des clôtures fines délimitent les parcs et gardent chaque escargot à sa place."]},
        {'title': 'Des planches pour se reposer', 'photo': 'repos',
         'text': ["Dans chaque serre, des planches en bois sont dressées au-dessus de l'herbe. Le jour, les escargots s'y abritent, serrés les uns contre les autres.",
                  "C'est là qu'on les voit le mieux, au petit matin, avant qu'ils ne se cachent."]},
        {'title': 'Une nourriture simple', 'photo': 'auge',
         'text': ["Ils mangent les plantes semées au sol des serres, et un complément de céréales servi dans des auges.",
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
# Nous vendons nos escargots vivants (pas de produits cuisinés : il faudrait des démarches sanitaires en plus).
PRODUCTS = [
    {'key': 'particuliers', 'name': 'Pour les particuliers', 'photo': 'macro', 'cta': 'Commander',
     'text': "Des escargots vivants, à la douzaine ou au kilo. À emporter à la ferme, ou livrés chez vous avec notre remorque.",
     'tags': ['Vivants', 'À emporter', 'Livraison']},
    {'key': 'restaurants', 'name': 'Pour les restaurants et les traiteurs', 'photo': 'plat-assiette', 'cta': 'Devenir acheteur',
     'text': "Des escargots vivants, en quantité régulière, livrés par l'éleveur lui-même. Vous les préparez à votre façon.",
     'tags': ['Vivants', 'Sur devis', 'Livraison']},
    {'key': 'revendeurs', 'name': 'Pour les revendeurs et les conserveurs', 'photo': 'auge', 'cta': 'Devenir acheteur',
     'text': "Épiceries fines, marchés, conserveries : nos escargots vivants au kilo, livrés avec notre remorque.",
     'tags': ['Au kilo', 'Gros volumes', 'Livraison']},
]
ORDER_STEPS = [
    {'title': 'Appelez-nous ou écrivez-nous', 'text': "Dites-nous combien d'escargots il vous faut, et pour quand."},
    {'title': 'Nous fixons le jour ensemble', 'text': 'Nous confirmons la commande, le prix et le jour.'},
    {'title': 'À emporter ou livrés', 'text': "Vous passez à la ferme, ou nous venons vous livrer avec notre remorque."},
]
FAQ = [
    ('Vendez-vous des escargots cuisinés ?',
     "Non : nous vendons nos escargots vivants. Pas d'inquiétude, les préparer est simple : nous vous expliquons tout sur la page Recettes."),
    ('Livrez-vous ?',
     "Oui. Nous livrons nous-mêmes, avec notre remorque, en Gironde. Vous pouvez aussi venir les chercher à la ferme, sur rendez-vous."),
    ("Vous êtes restaurateur ou revendeur ?",
     "Appelez-nous : nous pouvons vous livrer régulièrement, au kilo. Prix et quantités sur devis."),
    ("Combien d'escargots prévoir par personne ?",
     "En entrée, comptez 6 à 12 escargots par personne. Une douzaine pour les vrais amateurs."),
    ('Quand commander pour les fêtes ?',
     "Le plus tôt possible. Les quantités sont limitées, et il faut quelques jours pour préparer des escargots vivants. Appelez-nous dès novembre."),
    ('Petit-gris ou gros-gris, quelle différence ?',
     "Ce sont deux variétés de la même espèce, Helix aspersa. Le gros-gris est plus gros. Le petit-gris est plus petit, avec une chair très fine."),
    ('Peut-on visiter l’élevage ?',
     "Oui, sur rendez-vous. Appelez-nous avant de passer : nous sommes souvent dans les serres."),
    ('Vos escargots viennent-ils vraiment d’ici ?',
     "Oui. Ils sont élevés dans nos serres, à Lugon-et-l'Île-du-Carnay, en Gironde."),
]
SEASON = {
    'marquee': 'Commandes pour les fêtes · Noël · Nouvel An · ',
    'title': 'Les fêtes approchent.',
    'text': "Pour Noël et le Nouvel An, réservez tôt vos escargots vivants : les quantités sont limitées.",
}

# ------------------------------------------------------------------ recettes
# la méthode pour préparer des escargots vivants (en tête de la page Recettes)
PREPARATION = {
    'key': 'preparer', 'name': 'Préparer des escargots vivants', 'photo': 'nocturne',
    'intro': "Nos escargots sont vendus vivants. Voici la méthode classique pour les préparer avant de les cuisiner. Elle demande surtout un peu de patience.",
    'meta': [('clock', 'Jeûne : 5 à 7 jours'), ('flame', 'Cuisson : 1 h 30 à 2 h'), ('knife', 'Facile')],
    'needs': ['Les escargots vivants', 'Une caisse ou un panier aéré, avec un couvercle', 'Gros sel et vinaigre (facultatif)',
              '1 litre de vin blanc sec', '1 carotte, 1 oignon, 1 bouquet garni', 'Sel, poivre'],
    'steps': [
        ('Le jeûne', "Mettez les escargots dans une caisse aérée, avec un couvercle, sans nourriture, pendant 5 à 7 jours. Ils se vident."),
        ('Le lavage', "Rincez-les plusieurs fois à l'eau claire. Jetez ceux qui ne bougent plus et ceux dont la coquille est cassée."),
        ('Le dégorgement (facultatif)', "Couvrez-les de gros sel et d'un filet de vinaigre pendant 2 heures, puis rincez-les longuement."),
        ('Le blanchiment', "Plongez-les 5 minutes dans une grande casserole d'eau bouillante, puis égouttez-les."),
        ('Le décoquillage', "Sortez chaque escargot de sa coquille avec une petite fourchette. Retirez le petit bout noir, le tortillon, si vous le souhaitez."),
        ('La cuisson', "Faites-les cuire 1 h 30 à 2 h à petits frémissements, dans un court-bouillon : moitié vin blanc, moitié eau, la carotte, l'oignon, le bouquet garni, du sel et du poivre."),
        ('Le repos', "Laissez-les refroidir dans le bouillon. Ils sont prêts pour les recettes ci-dessous. Ils se gardent 2 jours au réfrigérateur, et se congèlent très bien."),
        ('Les coquilles', "Pour les garder, faites-les bouillir 20 minutes dans de l'eau avec un peu de bicarbonate, puis laissez-les sécher."),
    ],
}
RECIPES = [
    {'key': 'beurre-persille', 'name': 'Escargots au beurre persillé', 'photo': 'plat-staub',
     'intro': "Le grand classique des fêtes. Préparez le beurre la veille : il n'en sera que meilleur.",
     'serves': 4, 'prep': 25, 'cook': 10, 'level': 'Facile',
     'ingredients': ['48 escargots préparés, sans coquille', '48 coquilles propres', '250 g de beurre mou',
                     "3 gousses d'ail", '1 échalote', '1 bouquet de persil plat', 'Sel, poivre'],
     'steps': ["Hachez finement l'ail, l'échalote et le persil.",
               'Mélangez-les au beurre mou, avec une pincée de sel et un tour de poivre.',
               "Mettez un peu de beurre au fond de chaque coquille, puis un escargot. Fermez avec une belle noisette de beurre.",
               "Rangez les coquilles dans un plat à escargots, l'ouverture vers le haut.",
               'Enfournez 8 à 10 minutes à 200 °C, jusqu’à ce que le beurre grésille. Servez tout de suite, avec du pain.']},
    {'key': 'bordelaise', 'name': 'Escargots à la bordelaise', 'photo': 'sauce',
     'intro': "La recette de chez nous : jambon, échalotes, vin blanc et une longue cuisson douce. Encore meilleure réchauffée.",
     'serves': 4, 'prep': 20, 'cook': 50, 'level': 'Facile',
     'ingredients': ['48 escargots préparés, sans coquille', '150 g de jambon de Bayonne', '2 échalotes', "3 gousses d'ail",
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
     'ingredients': ['36 escargots préparés, sans coquille', '2 échalotes', "2 gousses d'ail", '20 cl de crème épaisse',
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
              'description': "Escargots élevés sous serre à Lugon-et-l'Île-du-Carnay, près de Libourne. Vendus vivants, à emporter à la ferme ou livrés en Gironde."},
    'elevage': {'template': 'elevage.html', 'file': 'l-elevage.html', 'path': '/l-elevage', 'crumb': "L'élevage", 'hero': 'dark',
                'title': "L'élevage : nos escargots élevés sous serre, Gironde",
                'description': "Comment nous élevons nos escargots : serres sous filets d'ombrage, planches de repos, nourriture simple et ramassage à la main."},
    'escargots': {'template': 'escargots.html', 'file': 'nos-escargots.html', 'path': '/nos-escargots', 'crumb': 'Nos escargots', 'hero': 'light',
                  'title': 'Nos escargots vivants, pour particuliers et pros',
                  'description': "Escargots vivants élevés en Gironde, à la douzaine ou au kilo. À emporter à la ferme ou livrés avec notre remorque, aux particuliers et aux pros."},
    'recettes': {'template': 'recettes.html', 'file': 'recettes.html', 'path': '/recettes', 'crumb': 'Recettes', 'hero': 'light',
                 'title': 'Préparer et cuisiner les escargots : nos recettes',
                 'description': "Comment préparer des escargots vivants, puis trois recettes simples : au beurre persillé, à la bordelaise et en cassolette à la crème d'ail."},
    'contact': {'template': 'contact.html', 'file': 'contact.html', 'path': '/contact', 'crumb': 'Contact', 'hero': 'light',
                'title': "Contact et commandes, Héliciculture du Garnoutey",
                'description': "Commandez vos escargots vivants, à emporter à la ferme ou livrés en Gironde. Par téléphone, par e-mail ou avec le formulaire."},
    'mentions': {'template': 'mentions.html', 'file': 'mentions-legales.html', 'path': '/mentions-legales', 'crumb': 'Mentions légales', 'hero': 'light',
                 'title': 'Mentions légales, Héliciculture du Garnoutey',
                 'description': "Mentions légales du site de l'Héliciculture du Garnoutey : éditeur, hébergeur, médiation, données personnelles et crédits photos."},
    '404': {'template': '404.html', 'file': '404.html', 'path': '/404', 'crumb': None, 'hero': 'dark', 'sitemap': False,
            'title': 'Page introuvable, Héliciculture du Garnoutey',
            'description': "Cette page n'existe pas ou a changé d'adresse."},
}

# ------------------------------------------------------------------ à faire valider par l'éleveur (compte rendu et README)
A_VALIDER = [
    "Vente d'escargots vivants seulement (pour vendre des escargots cuisinés, il faudrait des démarches sanitaires auprès de la DDPP)",
    "Clients visés : particuliers, restaurants et traiteurs, revendeurs et conserveurs",
    "Livraison avec la remorque : zone, jours, minimum de commande ; retrait à la ferme et visites sur rendez-vous",
    "Prix à la douzaine et au kilo ; escargots vendus déjà jeûnés ou non",
    "Méthode de préparation des escargots vivants (page Recettes)",
    "Élevage sous serre (serres tunnels sous filets d'ombrage) ; nourriture : plantes semées et complément de céréales",
    "Ramassage à la main, une fois adulte ; variétés élevées (petit-gris, gros-gris)",
    "Téléphone et e-mail à afficher (aujourd'hui : 06 63 49 83 14 et locterra33@gmail.com)",
    "Phrase « Nous ne vendons pas d'escargots d'ailleurs sous notre nom »",
    "Photos des plats et des coquilles : photos libres d'illustration, à remplacer par les vôtres",
    "Médiateur de la consommation (obligatoire pour vendre aux particuliers)",
    "Nom de domaine",
]
